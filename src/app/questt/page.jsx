/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { ChevronDown, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, DollarSign, Package, Sparkles, X, Download, Filter, Search, Settings, BarChart3, Target, Layers, Calendar, FileText, Plus, Play, Save, ChevronRight, RefreshCw, Eye, Edit, Lightbulb, ChevronUp, ShoppingBag, Store, MapPin, Clock, Users, Percent, ArrowUpRight, ArrowDownRight, Info, Trash2, Copy, Sliders } from 'lucide-react';

const QuesttApp = () => {
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStore, setSelectedStore] = useState('all');
  const [activeDecisionTab, setActiveDecisionTab] = useState('reorder');
  const [expandedExplainability, setExpandedExplainability] = useState({});
  
  // Saved scenarios
  const [savedScenarios, setSavedScenarios] = useState([
    {
      id: 1,
      name: 'Base Case - Conservative',
      timestamp: new Date('2025-06-01T10:30:00'),
      constraints: {
        maxUnitsReorder: 500,
        maxCapitalBudget: 5000000,
        maxTransferUnits: 100,
        minDaysOfCover: 7,
        maxMarkdownDepth: 40
      },
      markdownStrategy: {
        enabled: true,
        type: 'simple',
        depth: 30,
        duration: 3,
        stores: 15
      },
      marketingStrategy: {
        enabled: true,
        spend: 8000,
        channels: ['Social Media', 'Email']
      },
      reorderStrategy: {
        enabled: true,
        quantity: 200,
        leadTime: 21,
        supplier: 'Supplier A'
      },
      transferStrategy: {
        enabled: true,
        quantity: 50
      },
      businessRules: 'No markdown in first 6 weeks of season. Premium stores limited to 25% max discount.'
    },
    {
      id: 2,
      name: 'Aggressive Clearance',
      timestamp: new Date('2025-06-05T14:20:00'),
      constraints: {
        maxUnitsReorder: 300,
        maxCapitalBudget: 3000000,
        maxTransferUnits: 150,
        minDaysOfCover: 5,
        maxMarkdownDepth: 50
      },
      markdownStrategy: {
        enabled: true,
        type: 'conditional',
        depth: 40,
        duration: 2,
        stores: 25
      },
      marketingStrategy: {
        enabled: true,
        spend: 15000,
        channels: ['Social Media', 'Email', 'Digital Ads']
      },
      reorderStrategy: {
        enabled: false,
        quantity: 0,
        leadTime: 21,
        supplier: 'Supplier A'
      },
      transferStrategy: {
        enabled: true,
        quantity: 100
      },
      businessRules: 'Focus on aged inventory clearance. If competitor launches sale within 50km, match discount +5%.'
    }
  ]);

  const [activeScenario, setActiveScenario] = useState(savedScenarios[0]);
  const [showScenarioBuilder, setShowScenarioBuilder] = useState(false);
  const [editingScenario, setEditingScenario] = useState(null);
  
  // Playable parameters
  const [playableParams, setPlayableParams] = useState({
    budget: savedScenarios[0].constraints.maxCapitalBudget,
    maxUnits: savedScenarios[0].constraints.maxUnitsReorder,
    markdownDepth: savedScenarios[0].markdownStrategy.depth,
    markdownDuration: savedScenarios[0].markdownStrategy.duration,
    markdownStores: savedScenarios[0].markdownStrategy.stores,
    marketingSpend: savedScenarios[0].marketingStrategy.spend,
    reorderQuantity: savedScenarios[0].reorderStrategy.quantity,
    reorderLeadTime: savedScenarios[0].reorderStrategy.leadTime,
    transferQuantity: savedScenarios[0].transferStrategy.quantity
  });
  
  const [simulationRun, setSimulationRun] = useState(false);

  const brands = ['Brand A', 'Brand B', 'Brand C'];
  const categories = ['Dresses', 'Activewear', 'Accessories', 'Outerwear'];
  const stores = ['All stores', 'Palladium Store', 'Phoenix Mall', 'Central Mall', 'Luxury Boutique'];

  // Mock decisions data - SKU x Store level for reorder/transfer, SKU level for markdown/promote
  const allDecisions = [
    // REORDER - SKU x Store level
    {
      id: 1,
      type: 'reorder',
      sku: "DR-552",
      name: "Mustard Summer Dress",
      store: "Palladium Store",
      city: "Mumbai",
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop",
      brand: "Brand A",
      category: "Dresses",
      priority: "urgent",
      suggestedOrderQty: 13,
      potentialRevenue: "₹52K",
      confidence: 98.1,
      currentStock: 8,
      daysOfCover: 0.8,
      salesVelocity: 10.0,
      leadTime: 21,
      stockoutRisk: 'HIGH',
      explainability: {
        situation: "Palladium Store showing critically low stock with less than 1 day of cover. This flagship location has the highest sales velocity for this SKU.",
        factors: [
          { factor: "Store Sales Velocity", value: "10 units/day", impact: "Highest performing location for this SKU" },
          { factor: "Current Stock", value: "8 units", impact: "Will stockout in 19 hours at current rate" },
          { factor: "Store Tier", value: "A+ Flagship", impact: "Premium location - stockout here hurts brand perception" },
          { factor: "Lead Time", value: "21 days", impact: "Must order now to avoid 3-week stockout" },
          { factor: "Customer Profile", value: "High-value shoppers", impact: "Lost sale here = customer goes to competitor" }
        ],
        recommendation: "Order 13 units immediately for Palladium Store specifically. This covers 2 weeks demand (140 units) plus safety stock (20%).",
        tradeoffs: "Invest ₹19.5K now to protect ₹52K revenue opportunity and maintain brand presence in flagship store.",
        sensitivity: "If sales velocity drops 20%, still maintains adequate cover. If increases, will trigger another order in 10 days."
      }
    },
    {
      id: 2,
      type: 'reorder',
      sku: "DR-552",
      name: "Mustard Summer Dress",
      store: "Phoenix Mall",
      city: "Mumbai",
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop",
      brand: "Brand A",
      category: "Dresses",
      priority: "urgent",
      suggestedOrderQty: 8,
      potentialRevenue: "₹32K",
      confidence: 95.3,
      currentStock: 6,
      daysOfCover: 1.2,
      salesVelocity: 5.0,
      leadTime: 21,
      stockoutRisk: 'HIGH',
      explainability: {
        situation: "Phoenix Mall has moderate sales but stock will run out before next delivery cycle. Need proactive replenishment.",
        factors: [
          { factor: "Store Sales Velocity", value: "5 units/day", impact: "Second-highest for this SKU" },
          { factor: "Current Stock", value: "6 units", impact: "Below reorder point for this store tier" },
          { factor: "Store Tier", value: "A", impact: "Important metro location" },
          { factor: "Days of Cover", value: "1.2 days", impact: "Below 3-week lead time threshold" },
          { factor: "Nearby Competition", value: "2 stores within 5km", impact: "Easy for customers to switch" }
        ],
        recommendation: "Order 8 units for Phoenix Mall to maintain continuous availability through peak season.",
        tradeoffs: "₹12K investment protects ₹32K revenue stream. Lower priority than Palladium but still urgent.",
        sensitivity: "Phoenix has more stable demand pattern - lower risk than Palladium but still requires action."
      }
    },
    {
      id: 3,
      type: 'reorder',
      sku: "TS-883",
      name: "Navy Performance Tee",
      store: "Central Mall",
      city: "Delhi",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=600&fit=crop",
      brand: "Brand B",
      category: "Activewear",
      priority: "important",
      suggestedOrderQty: 18,
      potentialRevenue: "₹54K",
      confidence: 92.1,
      currentStock: 12,
      daysOfCover: 3.0,
      salesVelocity: 4.0,
      leadTime: 14,
      stockoutRisk: 'MEDIUM',
      explainability: {
        situation: "Central Mall Delhi showing strong upward trend in athleisure. Current stock adequate but below lead time threshold.",
        factors: [
          { factor: "Sales Trend", value: "+85% vs last month", impact: "Fitness trend accelerating in NCR region" },
          { factor: "Days of Cover", value: "3 days", impact: "Below 14-day lead time - need buffer" },
          { factor: "Regional Trend", value: "Delhi gym memberships +40%", impact: "Sustained demand expected" },
          { factor: "Store Performance", value: "Top 3 for activewear", impact: "Strategic location for this category" },
          { factor: "Size Distribution", value: "M/L depleting fast", impact: "Need balanced restock across sizes" }
        ],
        recommendation: "Order 18 units for Central Mall with size distribution: 4 S, 7 M, 5 L, 2 XL based on local demand curve.",
        tradeoffs: "₹21.6K investment captures ₹54K opportunity from growing fitness trend. Fast lead time (14d) allows quick response.",
        sensitivity: "If trend continues, establish bi-weekly reorder cycle for this location. If normalizes, current order provides 4-week buffer."
      }
    },

    // TRANSFER - SKU x Store level
    {
      id: 4,
      type: 'transfer',
      sku: "HB-234",
      name: "Tan Leather Handbag",
      store: "Luxury Boutique",
      city: "Mumbai",
      image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=600&fit=crop",
      brand: "Brand A",
      category: "Accessories",
      priority: "important",
      transferQty: 5,
      transferFrom: "Forum Mall",
      potentialRevenue: "₹95K",
      confidence: 89.7,
      explainability: {
        situation: "Luxury Boutique has zero stock while Forum Mall has 8 units with no sales in 3 weeks. Clear mismatch in customer profile.",
        factors: [
          { factor: "Destination Demand", value: "Luxury Boutique: 12 units/week", impact: "High-end location perfectly matched to ₹19K product" },
          { factor: "Source Stagnation", value: "Forum Mall: 0 sales in 21 days", impact: "Wrong customer demographic - needs transfer" },
          { factor: "Transfer Cost", value: "₹250/unit", impact: "Negligible vs ₹8K margin per sale" },
          { factor: "Customer Urgency", value: "3 inquiries this week", impact: "Pent-up demand at destination" },
          { factor: "Stock Age", value: "Source: 45 days old", impact: "If not moved, will require markdown" }
        ],
        recommendation: "Transfer 5 units from Forum Mall to Luxury Boutique immediately. Protects full margin and meets demonstrated demand.",
        tradeoffs: "Spend ₹1,250 transfer cost to unlock ₹95K revenue. Alternative: mark down at Forum (lose ₹24K margin) or wait (lose ₹95K sales).",
        sensitivity: "Luxury Boutique can sell these in 3 days at current rate. If demand continues, transfer remaining 3 units from Forum next week."
      }
    },
    {
      id: 5,
      type: 'transfer',
      sku: "JN-892",
      name: "Slim Fit Jeans",
      store: "Phoenix Mall",
      city: "Mumbai",
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=600&fit=crop",
      brand: "Brand B",
      category: "Denim",
      priority: "optimize",
      transferQty: 12,
      transferFrom: "Select City",
      potentialRevenue: "₹36K",
      confidence: 78.3,
      explainability: {
        situation: "Size L completely out of stock at Phoenix Mall while Select City has excess inventory in L. Pure size distribution mismatch.",
        factors: [
          { factor: "Size Stockout", value: "Phoenix: 0 units in L", impact: "Losing 4 sales/week due to size unavailability" },
          { factor: "Size Excess", value: "Select City: 18 L, selling 1/week", impact: "Wrong size mix for location" },
          { factor: "Regional Fit Preference", value: "Mumbai customers prefer L/XL", impact: "Body type variance by region" },
          { factor: "Transfer Time", value: "2 days Mumbai-to-Mumbai", impact: "Quick fix for immediate problem" },
          { factor: "Alternative Cost", value: "New order: 21 days + ₹15/unit", impact: "Transfer is faster and cheaper" }
        ],
        recommendation: "Transfer 12 units size L from Select City to Phoenix Mall. Fixes immediate stockout and optimizes inventory distribution.",
        tradeoffs: "₹3K transfer cost vs ₹36K in lost sales over next 3 weeks. Also frees up space at Select City for better-selling sizes.",
        sensitivity: "This is a low-risk arbitrage opportunity. Even if Phoenix demand slows, L size will eventually sell at full margin."
      }
    },

    // MARKDOWN - SKU level (blanket across stores)
    {
      id: 6,
      type: 'markdown',
      sku: "WJ-445",
      name: "Black Puffer Jacket",
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=600&fit=crop",
      brand: "Brand C",
      category: "Outerwear",
      priority: "urgent",
      storesAffected: 7,
      currentPrice: 89,
      suggestedPrice: 62,
      discount: 30,
      potentialRevenue: "₹1.45L",
      confidence: 87.2,
      totalInventory: 234,
      age: 87,
      explainability: {
        situation: "End-of-season winter item with 234 units aging across 7 stores. Sales velocity dropped 65% as weather warms. New SS25 collection launches in 14 days.",
        factors: [
          { factor: "Seasonal Timing", value: "87 days old, season ending", impact: "Value declining daily as spring arrives" },
          { factor: "Sales Velocity", value: "-65% vs 30 days ago", impact: "Accelerating decline as weather warms" },
          { factor: "New Collection", value: "14 days to launch", impact: "Need floor space and cash for new inventory" },
          { factor: "Carrying Cost", value: "₹208K tied up", impact: "Opportunity cost of capital for 87 days" },
          { factor: "Competitor Pricing", value: "Similar jackets 35% off", impact: "Losing price competitiveness" }
        ],
        recommendation: "Apply 30% markdown across all 7 stores immediately. Target 73% sell-through in 3 weeks. Transfer remaining 27% to outlet stores.",
        tradeoffs: "Accept 18% margin (vs 45% full price) to recover ₹145K and free space for new collection. Alternative: wait 4 weeks, need 50% markdown, recover only ₹95K.",
        sensitivity: "At 25% markdown: 58% sell-through. At 35%: 82% sell-through but margin drops to 12%. 30% is optimal balance."
      }
    },
    {
      id: 7,
      type: 'markdown',
      sku: "SN-234",
      name: "White Sneakers",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=600&fit=crop",
      brand: "Brand A",
      category: "Footwear",
      priority: "important",
      storesAffected: 12,
      currentPrice: 129,
      suggestedPrice: 103,
      discount: 20,
      potentialRevenue: "₹3.4L",
      confidence: 82.5,
      totalInventory: 412,
      age: 62,
      explainability: {
        situation: "Classic white sneaker with steady sales but 45% overstock vs plan. Not failing, just excessive inventory blocking capital and space.",
        factors: [
          { factor: "Overstock Level", value: "+45% vs original plan", impact: "Over-ordered based on trend that didn't fully materialize" },
          { factor: "Sales Rate", value: "Steady 8 units/day total", impact: "Product is fine, just too much inventory" },
          { factor: "Inventory Turn", value: "2.1x vs 4.0x target", impact: "Capital inefficiently deployed for 62 days" },
          { factor: "Fast Fashion", value: "Similar styles at ₹899", impact: "Price-sensitive segment switching to cheaper options" },
          { factor: "Display Saturation", value: "Taking 15% of footwear space", impact: "Blocking newer, higher-velocity styles" }
        ],
        recommendation: "Moderate 20% markdown across 12 stores. Positions as 'Summer Essential' rather than desperate clearance. Maintain brand value while accelerating turnover.",
        tradeoffs: "Maintain 32% margin while clearing 65% of excess in 6 weeks. Protects brand positioning better than deep discount. Alternative: 40% off moves it faster but damages brand.",
        sensitivity: "Small markdown but broad store coverage yields steady clearance. Can increase to 30% in week 4 if pace is insufficient."
      }
    },

    // PROMOTE - SKU level (blanket across stores)
    {
      id: 8,
      type: 'promote',
      sku: "FW-567",
      name: "Floral Wrap Dress",
      image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=600&fit=crop",
      brand: "Brand A",
      category: "Dresses",
      priority: "important",
      storesAffected: 8,
      marketingBudget: 12000,
      potentialRevenue: "₹3.2L",
      confidence: 81.2,
      totalInventory: 186,
      explainability: {
        situation: "New Spring arrival with excellent product-market fit (4.7★ rating) but low awareness. Good inventory position, strong early reviews, but traffic is low. Hidden gem.",
        factors: [
          { factor: "Product Quality Score", value: "4.7★ rating (89 reviews)", impact: "High customer satisfaction = word-of-mouth potential" },
          { factor: "Current Sales", value: "2.3 units/day across 8 stores", impact: "Below 8/day target for new launches - awareness issue" },
          { factor: "Store Visibility", value: "Low foot traffic placement", impact: "Great product hidden from customers - not optimized" },
          { factor: "Social Signals", value: "23 organic UGC posts", impact: "Customers love it but sample size too small to go viral" },
          { factor: "Margin Profile", value: "52% margin", impact: "High-margin item worth investing in - protects profitability" }
        ],
        recommendation: "Invest ₹12K in targeted campaign: Instagram/Facebook carousel ads featuring customer photos, email to style-conscious segment, in-store window display repositioning.",
        tradeoffs: "Spend ₹12K marketing to drive 4x sales velocity (2.3 → 9.2/day). Expected ROI: 180% in 4 weeks. Alternative: let it remain undiscovered, sell slowly, miss season window.",
        sensitivity: "If campaign drives only 2x velocity, still 45% ROI - positive. If 5x+ velocity, immediately becomes hero product - reorder and expand to more stores."
      }
    }
  ];

  // Filter decisions
  const filteredDecisions = allDecisions.filter(d => {
    const matchesTab = d.type === activeDecisionTab;
    const matchesBrand = selectedBrand === 'all' || d.brand === selectedBrand;
    const matchesCategory = selectedCategory === 'all' || d.category === selectedCategory;
    const matchesStore = selectedStore === 'all' || d.store === selectedStore;
    return matchesTab && matchesBrand && matchesCategory && matchesStore;
  });

  // Update playable params when scenario changes
  useEffect(() => {
    setPlayableParams({
      budget: activeScenario.constraints.maxCapitalBudget,
      maxUnits: activeScenario.constraints.maxUnitsReorder,
      markdownDepth: activeScenario.markdownStrategy.depth,
      markdownDuration: activeScenario.markdownStrategy.duration,
      markdownStores: activeScenario.markdownStrategy.stores,
      marketingSpend: activeScenario.marketingStrategy.spend,
      reorderQuantity: activeScenario.reorderStrategy.quantity,
      reorderLeadTime: activeScenario.reorderStrategy.leadTime,
      transferQuantity: activeScenario.transferStrategy.quantity
    });
    setSimulationRun(false);
  }, [activeScenario]);

  // Calculate simulation
  const calculateSimulation = useMemo(() => {
    if (!simulationRun) return null;

    const params = playableParams;
    const reorderRevenue = params.reorderQuantity * 400;
    const transferRevenue = params.transferQuantity * 350;
    
    return {
      reorder: activeScenario.reorderStrategy.enabled ? {
        unitsAllocated: Math.min(params.reorderQuantity, params.maxUnits),
        revenue: `₹${(reorderRevenue / 100000).toFixed(1)}L`,
        stockoutReduced: `25 → ${Math.max(5, 25 - Math.floor(params.reorderQuantity / 20))}`
      } : { unitsAllocated: 0, revenue: '₹0L', stockoutReduced: 'N/A' },
      
      transfer: activeScenario.transferStrategy.enabled ? {
        unitsAllocated: params.transferQuantity,
        revenue: `₹${(transferRevenue / 100000).toFixed(1)}L`,
        stockoutReduced: `25 → ${Math.max(15, 25 - Math.floor(params.transferQuantity / 10))}`
      } : { unitsAllocated: 0, revenue: '₹0L', stockoutReduced: 'N/A' },
      
      consolidate: {
        unitsAllocated: 30,
        revenue: '₹1.0L',
        stockoutReduced: '25 → 20'
      },
      
      mixed: {
        unitsAllocated: `${params.reorderQuantity}+${params.transferQuantity}+30`,
        revenue: `₹${((reorderRevenue + transferRevenue + 100000) / 100000).toFixed(1)}L`,
        stockoutReduced: `25 → ${Math.max(3, 25 - Math.floor((params.reorderQuantity + params.transferQuantity) / 25))}`
      }
    };
  }, [simulationRun, activeScenario, playableParams]);

  const handleRunSimulation = () => setSimulationRun(true);
  const handleScenarioSelect = (scenario) => setActiveScenario(scenario);

  const Navigation = () => (
    <div className="bg-white border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">Q</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Questt</h1>
          </div>
        </div>
      </div>
    </div>
  );

  const DecisionCenterPage = () => {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Decision Center</h2>

        {/* Top Section: Scenarios + Variables (Horizontal) */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Saved Scenarios */}
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">SAVED SCENARIOS</h3>
              <button onClick={() => setShowScenarioBuilder(true)} className="p-1.5 hover:bg-blue-50 rounded-lg text-blue-600">
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              {savedScenarios.map(scenario => (
                <div
                  key={scenario.id}
                  onClick={() => handleScenarioSelect(scenario)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    activeScenario.id === scenario.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <p className="font-semibold text-sm text-gray-900">{scenario.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{scenario.timestamp.toLocaleDateString()}</p>
                  <div className="mt-3 pt-3 border-t border-gray-200 space-y-1 text-xs text-gray-600">
                    <div className="flex justify-between">
                      <span>Budget:</span>
                      <span className="font-medium text-gray-900">₹{(scenario.constraints.maxCapitalBudget / 100000).toFixed(0)}L</span>
                    </div>
                    {scenario.markdownStrategy.enabled && (
                      <div className="flex justify-between">
                        <span>Markdown:</span>
                        <span className="font-medium text-gray-900">{scenario.markdownStrategy.depth}%</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Variables to Play */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-4">
              <Sliders className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-gray-900">Variables to Play</h3>
            </div>
            <p className="text-xs text-gray-600 mb-4">Adjust and see impact instantly</p>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <label className="font-medium text-gray-700">Budget</label>
                  <span className="text-purple-600 font-semibold">₹{(playableParams.budget / 100000).toFixed(1)}L</span>
                </div>
                <input type="range" min="1000000" max="10000000" step="100000" value={playableParams.budget}
                  onChange={(e) => { setPlayableParams({...playableParams, budget: parseInt(e.target.value)}); setSimulationRun(false); }}
                  className="w-full" />
              </div>

              {activeScenario.markdownStrategy.enabled && (
                <>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <label className="font-medium text-gray-700">Markdown %</label>
                      <span className="text-purple-600 font-semibold">{playableParams.markdownDepth}%</span>
                    </div>
                    <input type="range" min="0" max="50" value={playableParams.markdownDepth}
                      onChange={(e) => { setPlayableParams({...playableParams, markdownDepth: parseInt(e.target.value)}); setSimulationRun(false); }}
                      className="w-full" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <label className="font-medium text-gray-700">Duration</label>
                      <span className="text-purple-600 font-semibold">{playableParams.markdownDuration}w</span>
                    </div>
                    <input type="range" min="1" max="8" value={playableParams.markdownDuration}
                      onChange={(e) => { setPlayableParams({...playableParams, markdownDuration: parseInt(e.target.value)}); setSimulationRun(false); }}
                      className="w-full" />
                  </div>
                </>
              )}

              {activeScenario.marketingStrategy.enabled && (
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <label className="font-medium text-gray-700">Marketing</label>
                    <span className="text-purple-600 font-semibold">₹{(playableParams.marketingSpend / 1000).toFixed(0)}K</span>
                  </div>
                  <input type="range" min="0" max="25000" step="1000" value={playableParams.marketingSpend}
                    onChange={(e) => { setPlayableParams({...playableParams, marketingSpend: parseInt(e.target.value)}); setSimulationRun(false); }}
                    className="w-full" />
                </div>
              )}

              {activeScenario.reorderStrategy.enabled && (
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <label className="font-medium text-gray-700">Reorder Qty</label>
                    <span className="text-purple-600 font-semibold">{playableParams.reorderQuantity}</span>
                  </div>
                  <input type="range" min="0" max="500" step="10" value={playableParams.reorderQuantity}
                    onChange={(e) => { setPlayableParams({...playableParams, reorderQuantity: parseInt(e.target.value)}); setSimulationRun(false); }}
                    className="w-full" />
                </div>
              )}

              {activeScenario.transferStrategy.enabled && (
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <label className="font-medium text-gray-700">Transfer Qty</label>
                    <span className="text-purple-600 font-semibold">{playableParams.transferQuantity}</span>
                  </div>
                  <input type="range" min="0" max="200" step="5" value={playableParams.transferQuantity}
                    onChange={(e) => { setPlayableParams({...playableParams, transferQuantity: parseInt(e.target.value)}); setSimulationRun(false); }}
                    className="w-full" />
                </div>
              )}
            </div>

            <button onClick={handleRunSimulation}
              className="w-full mt-4 bg-purple-600 text-white py-2.5 rounded-lg font-medium hover:bg-purple-700 flex items-center justify-center gap-2">
              <Play className="w-4 h-4" />
              Run Simulation
            </button>
          </div>
        </div>

        {/* Simulation Results */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">SIMULATION RESULTS</h3>

          {!simulationRun ? (
            <div className="text-center py-8 text-gray-400">
              <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">Adjust parameters and run simulation</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-3 font-semibold text-gray-700">Metric</th>
                      <th className="text-left py-3 px-3 font-semibold text-gray-700">Reorder</th>
                      <th className="text-left py-3 px-3 font-semibold text-gray-700">Transfer</th>
                      <th className="text-left py-3 px-3 font-semibold text-gray-700">Consolidate</th>
                      <th className="text-left py-3 px-3 font-semibold text-gray-700 bg-blue-50">Mixed</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-3 text-gray-600">Units</td>
                      <td className="py-3 px-3">{calculateSimulation.reorder.unitsAllocated}</td>
                      <td className="py-3 px-3">{calculateSimulation.transfer.unitsAllocated}</td>
                      <td className="py-3 px-3">{calculateSimulation.consolidate.unitsAllocated}</td>
                      <td className="py-3 px-3 bg-blue-50 font-semibold">{calculateSimulation.mixed.unitsAllocated}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-3 text-gray-600">Revenue</td>
                      <td className="py-3 px-3">{calculateSimulation.reorder.revenue}</td>
                      <td className="py-3 px-3">{calculateSimulation.transfer.revenue}</td>
                      <td className="py-3 px-3">{calculateSimulation.consolidate.revenue}</td>
                      <td className="py-3 px-3 bg-blue-50 font-semibold">{calculateSimulation.mixed.revenue}</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 text-gray-600">Stockout</td>
                      <td className="py-3 px-3">{calculateSimulation.reorder.stockoutReduced}</td>
                      <td className="py-3 px-3">{calculateSimulation.transfer.stockoutReduced}</td>
                      <td className="py-3 px-3">{calculateSimulation.consolidate.stockoutReduced}</td>
                      <td className="py-3 px-3 bg-blue-50 font-semibold">{calculateSimulation.mixed.stockoutReduced}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-3 bg-yellow-50 rounded-lg flex items-start gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">
                  Mixed strategy recovers <strong>{calculateSimulation.mixed.revenue}</strong> and reduces stockouts to <strong>{calculateSimulation.mixed.stockoutReduced.split('→')[1]?.trim()}</strong> stores.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Decisions Section with Tabs */}
        <div className="bg-white border border-gray-200 rounded-lg">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex px-5">
              {[
                { id: 'reorder', label: 'Reorder', count: allDecisions.filter(d => d.type === 'reorder').length },
                { id: 'transfer', label: 'Transfer', count: allDecisions.filter(d => d.type === 'transfer').length },
                { id: 'markdown', label: 'Markdown', count: allDecisions.filter(d => d.type === 'markdown').length },
                { id: 'promote', label: 'Promote', count: allDecisions.filter(d => d.type === 'promote').length }
              ].map(tab => (
                <button key={tab.id} onClick={() => setActiveDecisionTab(tab.id)}
                  className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 ${
                    activeDecisionTab === tab.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}>
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="px-5 py-4 bg-gray-50 border-b border-gray-200">
            <div className="flex gap-3">
              <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white">
                <option value="all">All brands</option>
                {brands.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white">
                <option value="all">All categories</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              {(activeDecisionTab === 'reorder' || activeDecisionTab === 'transfer') && (
                <select value={selectedStore} onChange={(e) => setSelectedStore(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white">
                  {stores.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              )}
              <button className="ml-auto px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
            {(activeDecisionTab === 'reorder' || activeDecisionTab === 'transfer') && (
              <p className="text-xs text-gray-500 mt-2">
                📍 Showing SKU × Store level recommendations
              </p>
            )}
            {(activeDecisionTab === 'markdown' || activeDecisionTab === 'promote') && (
              <p className="text-xs text-gray-500 mt-2">
                📍 Showing SKU level recommendations (applied across stores)
              </p>
            )}
          </div>

          {/* Decision Cards */}
          <div className="p-5 space-y-4">
            {filteredDecisions.map(decision => (
              <DecisionCard key={decision.id} decision={decision} />
            ))}
          </div>
        </div>
      </div>
    );
  };

  const DecisionCard = ({ decision }) => {
    const isExplainabilityExpanded = expandedExplainability[decision.id];

    return (
      <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
        <div className="flex gap-4">
          <div className="w-24 h-32 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
            <img src={decision.image} alt={decision.name} className="w-full h-full object-cover" />
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900">{decision.sku} | {decision.name}</h3>
                  {decision.store && <span className="text-sm text-gray-600">@ {decision.store}</span>}
                  <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                    decision.priority === 'urgent' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {decision.priority.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{decision.brand} • {decision.category}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Confidence</p>
                <p className="text-lg font-bold text-green-600">{decision.confidence}%</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-3 mb-3 text-sm">
              {decision.type === 'reorder' && (
                <>
                  <div>
                    <p className="text-xs text-gray-500">Current Stock</p>
                    <p className="font-semibold text-gray-900">{decision.currentStock} units</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Order Qty</p>
                    <p className="font-semibold text-blue-600">{decision.suggestedOrderQty} units</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Days Cover</p>
                    <p className={`font-semibold ${decision.daysOfCover < 3 ? 'text-red-600' : 'text-gray-900'}`}>{decision.daysOfCover}d</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Revenue</p>
                    <p className="font-semibold text-green-600">{decision.potentialRevenue}</p>
                  </div>
                </>
              )}
              {decision.type === 'transfer' && (
                <>
                  <div>
                    <p className="text-xs text-gray-500">Transfer Qty</p>
                    <p className="font-semibold text-blue-600">{decision.transferQty} units</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">From</p>
                    <p className="font-semibold text-gray-900 text-xs">{decision.transferFrom}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">To</p>
                    <p className="font-semibold text-gray-900 text-xs">{decision.store}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Revenue</p>
                    <p className="font-semibold text-green-600">{decision.potentialRevenue}</p>
                  </div>
                </>
              )}
              {decision.type === 'markdown' && (
                <>
                  <div>
                    <p className="text-xs text-gray-500">Current Price</p>
                    <p className="font-semibold text-gray-900">₹{decision.currentPrice}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">New Price</p>
                    <p className="font-semibold text-orange-600">₹{decision.suggestedPrice} ({decision.discount}%)</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Age / Stores</p>
                    <p className="font-semibold text-gray-900">{decision.age}d / {decision.storesAffected}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Revenue</p>
                    <p className="font-semibold text-green-600">{decision.potentialRevenue}</p>
                  </div>
                </>
              )}
              {decision.type === 'promote' && (
                <>
                  <div>
                    <p className="text-xs text-gray-500">Budget</p>
                    <p className="font-semibold text-purple-600">₹{(decision.marketingBudget/1000).toFixed(0)}K</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Inventory</p>
                    <p className="font-semibold text-gray-900">{decision.totalInventory} units</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Stores</p>
                    <p className="font-semibold text-gray-900">{decision.storesAffected}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Revenue</p>
                    <p className="font-semibold text-green-600">{decision.potentialRevenue}</p>
                  </div>
                </>
              )}
            </div>

            {/* Explainability */}
            <div className="border-t border-gray-200 pt-3">
              <button
                onClick={() => setExpandedExplainability({
                  ...expandedExplainability,
                  [decision.id]: !isExplainabilityExpanded
                })}
                className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                {isExplainabilityExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                {isExplainabilityExpanded ? 'Hide' : 'Show'} AI Reasoning
              </button>

              {isExplainabilityExpanded && decision.explainability && (
                <div className="mt-4 space-y-4 bg-blue-50 rounded-lg p-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Target className="w-4 h-4 text-blue-600" />
                      Situation
                    </h4>
                    <p className="text-sm text-gray-700">{decision.explainability.situation}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-purple-600" />
                      Key Factors
                    </h4>
                    <div className="space-y-2">
                      {decision.explainability.factors.map((factor, idx) => (
                        <div key={idx} className="bg-white rounded p-2 text-sm">
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-medium text-gray-900">{factor.factor}</span>
                            <span className="text-blue-600 font-semibold text-xs">{factor.value}</span>
                          </div>
                          <p className="text-xs text-gray-600">{factor.impact}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-yellow-600" />
                      Recommendation
                    </h4>
                    <p className="text-sm text-gray-700 bg-yellow-50 rounded p-3">{decision.explainability.recommendation}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-orange-600" />
                      Tradeoffs
                    </h4>
                    <p className="text-sm text-gray-700">{decision.explainability.tradeoffs}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-green-600" />
                      Sensitivity
                    </h4>
                    <p className="text-sm text-gray-700">{decision.explainability.sensitivity}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2 mt-3">
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                Approve
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
                Modify
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen overflow-auto bg-gray-50">
      <Navigation />
      <DecisionCenterPage />
    </div>
  );
};

export default QuesttApp;
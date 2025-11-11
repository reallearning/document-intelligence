"use client"
import React, { useState } from 'react';
import { 
  LayoutDashboard, TrendingUp, ArrowRight, Package, Download, 
  Filter, X, ChevronDown, ChevronRight, Check, AlertCircle,
  MapPin, Tag, Calendar, Search, BarChart3,
  MessageSquare, Sparkles, TrendingDown, Store,
  ArrowUpRight, ArrowDownRight, Minus, Move, Archive, Activity,
  Clock, Shirt, Palette, List, Grid, Send
} from 'lucide-react';
import Image from 'next/image';

const MorrieDashboard = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedReplenishment, setSelectedReplenishment] = useState([]);
  const [selectedMovement, setSelectedMovement] = useState([]);
  const [expandedSKU, setExpandedSKU] = useState(null);
  const [aiChatOpen, setAiChatOpen] = useState(null);
  const [lifecycleModal, setLifecycleModal] = useState(null);
  const [dataModal, setDataModal] = useState(null);
  const [replenishmentView, setReplenishmentView] = useState('card');
  const [movementView, setMovementView] = useState('card');
  const [chatOpen, setChatOpen] = useState(false);
  const [expandedStores, setExpandedStores] = useState({});
   const [selectedValues, setSelectedValues] = useState([]);
  const [chatMessages, setChatMessages] = useState([
    { 
      role: 'assistant', 
      content: 'Hi! I\'m Morrie, your inventory intelligence assistant. I can help you understand any recommendation, analyze trends, or answer questions about your inventory. What would you like to know?',
      timestamp: new Date()
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatContext, setChatContext] = useState(null);

const toggleReplenishmentSelection = (id) => {
  setSelectedReplenishment((prev) =>
    prev.includes(id)
      ? prev.filter((item) => item !== id)
      : [...prev, id]
  );

  const item = replenishmentItems.find((e) => e.id === id);
  if (!item) return;

  const storeIds = item.stores.map((s) => s.storeId);

  setSelectedValues((prev) => {
    // If this item is already selected → remove its storeIds
    const isSelected = selectedReplenishment.includes(id);
    if (isSelected) {
      return prev.filter((storeId) => !storeIds.includes(storeId));
    }

    // Else → add its storeIds
    return [...prev, ...storeIds];
  });
};


   const toggleStoreExpansion = (itemId, storeId) => {
    setExpandedStores(prev => ({
      ...prev,
      [`${itemId}-${storeId}`]: !prev[`${itemId}-${storeId}`]
    }));
  };

  const toggleMovementSelection = (id) => {
    setSelectedMovement(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

const selectAllReplenishment = () => {
  const allSelected = selectedReplenishment.length === replenishmentItems.length;

  if (allSelected) {
    // Deselect everything
    setSelectedReplenishment([]);
    setSelectedValues([]);
  } else {
    // Select all replenishment items
    setSelectedReplenishment(replenishmentItems.map(item => item.id));

    // Flatten all storeIds from all items
    const allStoreIds = replenishmentItems.flatMap(item =>
      item.stores.map(store => store.storeId)
    );

    setSelectedValues(allStoreIds);
  }
};


  const selectAllMovement = () => {
    if (selectedMovement.length === movementItems.length) {
      setSelectedMovement([]);
    } else {
      setSelectedMovement(movementItems.map(item => item.id));
    }
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    
    const newMessage = {
      role: 'user',
      content: chatInput,
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, newMessage]);
    setChatInput('');
    
    // Simulate AI response
    setTimeout(() => {
      const responses = chatContext 
        ? [
            `Based on the data for ${chatContext.name}, the recommendation is driven by the high rate of sale (${chatContext.rateOfSale} units/day) and low stock coverage (${chatContext.daysToStockout} days). Would you like me to explain any specific metric?`,
            `Looking at ${chatContext.name}, the ${chatContext.aiConfidence}% confidence score comes from historical sales patterns, seasonal trends, and warehouse availability. The potential impact of ${chatContext.totalImpact} is calculated based on lost sales during stockout.`,
            `For ${chatContext.name} at ${chatContext.store}, we're seeing consistent velocity above category average. The size recommendations are optimized based on historical size mix performance at this specific location.`
          ]
        : [
            'I can help you understand any specific recommendation. Try asking "Why is the Floral Summer Dress critical?" or "Show me SKUs with high stockout risk"',
            'Looking at your overall performance, you have 4 SKUs at critical stockout risk and 6 items with stagnant inventory. Would you like me to prioritize which to address first?',
            'I notice your sell-through rate is up 8% vs last week. The SS25 launches are performing particularly well. Would you like details on any specific product line?'
          ];
      
      const aiResponse = {
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, aiResponse]);
    }, 800);
  };

    const handleCheckboxChange = (value) => {
    setSelectedValues((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value) // remove if already selected
        : [...prev, value] // add if not selected
    );
  };

  const openChatWithContext = (item, type) => {
    setChatContext({ ...item, type });
    setChatOpen(true);
    
    const contextMessage = {
      role: 'assistant',
      content: `I see you're looking at ${item.name}${item.store ? ` at ${item.store}` : ''}. This ${type === 'replenishment' ? 'replenishment recommendation' : 'movement suggestion'} is based on comprehensive analysis. What would you like to know?`,
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, contextMessage]);
  };

  const fashionSKUs = [
    {
      id: 'F25P28DRCEY',
      name: 'Indigo V-Neck Dress',
      image: '👗',
      mrp: '₹2,990',
      launchDate: '2025-01-15',
      daysSinceLaunch: 21,
      season: 'SS25',
      collection: 'Pret',
      category: 'Dresses',
      fabric: 'Cotton Blend',
      color: 'Indigo',
      ageingBucket: '0-30 days',
      lifecycle: 'Growth',
      eboInventory: 456,
      ecomInventory: 124,
      lfsInventory: 87,
      avgROS: 3.2,
      sellThrough: 68,
      margin: 52,
      stockCover: 42,
      markdownStatus: 'Full Price',
      velocityTrend: 'up',
      sizeBreakdown: [
        { size: 'XS', total: 85, ebo: 42, ecom: 18, lfs: 12, ros: 0.6, sellThrough: 52 },
        { size: 'S', total: 142, ebo: 88, ecom: 28, lfs: 16, ros: 1.2, sellThrough: 68 },
        { size: 'M', total: 198, ebo: 124, ecom: 36, lfs: 22, ros: 1.4, sellThrough: 74 },
        { size: 'L', total: 176, ebo: 106, ecom: 26, lfs: 20, ros: 1.0, sellThrough: 65 },
        { size: 'XL', total: 121, ebo: 96, ecom: 16, lfs: 17, ros: 0.6, sellThrough: 58 }
      ]
    },
    {
      id: 'F25C42TPWHT',
      name: 'Classic White Cotton Top',
      image: '👚',
      mrp: '₹1,790',
      launchDate: '2025-01-08',
      daysSinceLaunch: 28,
      season: 'SS25',
      collection: 'Core',
      category: 'Tops',
      fabric: '100% Cotton',
      color: 'White',
      ageingBucket: '0-30 days',
      lifecycle: 'Peak',
      eboInventory: 682,
      ecomInventory: 186,
      lfsInventory: 124,
      avgROS: 4.8,
      sellThrough: 78,
      margin: 58,
      stockCover: 35,
      markdownStatus: 'Full Price',
      velocityTrend: 'stable'
    },
    {
      id: 'F24W18DNMBL',
      name: 'High-Rise Denim Jeans',
      image: '👖',
      mrp: '₹2,490',
      launchDate: '2024-08-20',
      daysSinceLaunch: 138,
      season: 'AW24',
      collection: 'Denim Edit',
      category: 'Bottoms',
      fabric: 'Stretch Denim',
      color: 'Dark Blue',
      ageingBucket: '120+ days',
      lifecycle: 'Decline',
      eboInventory: 156,
      ecomInventory: 42,
      lfsInventory: 28,
      avgROS: 0.8,
      sellThrough: 88,
      margin: 42,
      stockCover: 68,
      markdownStatus: '30% Off',
      velocityTrend: 'down'
    },
    {
      id: 'F25P35BLZPK',
      name: 'Pastel Pink Linen Blazer',
      image: '🧥',
      mrp: '₹4,990',
      launchDate: '2025-01-22',
      daysSinceLaunch: 14,
      season: 'SS25',
      collection: 'Premium',
      category: 'Outerwear',
      fabric: 'Linen Blend',
      color: 'Pastel Pink',
      ageingBucket: '0-30 days',
      lifecycle: 'Launch',
      eboInventory: 324,
      ecomInventory: 58,
      lfsInventory: 22,
      avgROS: 1.2,
      sellThrough: 42,
      margin: 62,
      stockCover: 58,
      markdownStatus: 'Full Price',
      velocityTrend: 'up'
    }
  ];

   const replenishmentItems = [
    {
      id: 'SKU001',
      name: 'Floral Summer Dress',
      image: '🌺',
      skuCode: 'F25-FSD-RAY',
      category: 'Dresses',
      season: 'SS25',
      fabric: 'Rayon',
      stores: [
        {
          store: 'AND Mumbai Central',
          storeId: 'STR023',
          zone: 'West',
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
          ]
        },
        {
          store: 'AND Pune Aundh',
          storeId: 'STR089',
          zone: 'West',
          currentStock: 8,
          warehouseStock: 45,
          inTransit: 18,
          rateOfSale: 3.8,
          daysToStockout: 2.1,
          aiConfidence: 91,
          priority: 'Critical',
          totalImpact: '₹67,482',
          sizes: [
            { size: 'S', stock: 1, recommendation: 6, impact: '₹14,994' },
            { size: 'M', stock: 3, recommendation: 9, impact: '₹22,491' },
            { size: 'L', stock: 3, recommendation: 8, impact: '₹19,992' },
            { size: 'XL', stock: 1, recommendation: 5, impact: '₹12,495' }
          ]
        },
        {
          store: 'AND Bangalore Koramangala',
          storeId: 'STR067',
          zone: 'South',
          currentStock: 15,
          warehouseStock: 45,
          inTransit: 18,
          rateOfSale: 5.2,
          daysToStockout: 2.9,
          aiConfidence: 96,
          priority: 'High',
          totalImpact: '₹98,750',
          sizes: [
            { size: 'S', stock: 3, recommendation: 10, impact: '₹24,990' },
            { size: 'M', stock: 5, recommendation: 14, impact: '₹34,986' },
            { size: 'L', stock: 5, recommendation: 11, impact: '₹27,489' },
            { size: 'XL', stock: 2, recommendation: 7, impact: '₹17,493' }
          ]
        }
      ]
    },
    {
      id: 'SKU002',
      name: 'Classic White Shirt',
      image: '👔',
      skuCode: 'F25-CWS-COT',
      category: 'Tops',
      season: 'SS25',
      fabric: 'Cotton',
      stores: [
        {
          store: 'AND Delhi Saket',
          storeId: 'STR045',
          zone: 'North',
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
          ]
        }
      ]
    },
    {
      id: 'SKU003',
      name: 'Denim Skinny Jeans',
      image: '👖',
      skuCode: 'F25-DSJ-DEN',
      category: 'Bottoms',
      season: 'SS25',
      fabric: 'Stretch Denim',
      stores: [
        {
          store: 'AND Bangalore Koramangala',
          storeId: 'STR067',
          zone: 'South',
          currentStock: 15,
          warehouseStock: 58,
          inTransit: 24,
          rateOfSale: 5.2,
          daysToStockout: 2.9,
          aiConfidence: 96,
          priority: 'High',
          totalImpact: '₹131,964',
          sizes: [
            { size: '28', stock: 2, recommendation: 10, impact: '₹29,990' },
            { size: '30', stock: 5, recommendation: 14, impact: '₹41,986' },
            { size: '32', stock: 5, recommendation: 12, impact: '₹35,988' },
            { size: '34', stock: 3, recommendation: 8, impact: '₹23,992' }
          ]
        },
        {
          store: 'AND Chennai Express Avenue',
          storeId: 'STR092',
          zone: 'South',
          currentStock: 11,
          warehouseStock: 58,
          inTransit: 24,
          rateOfSale: 4.2,
          daysToStockout: 2.6,
          aiConfidence: 93,
          priority: 'High',
          totalImpact: '₹104,765',
          sizes: [
            { size: '28', stock: 2, recommendation: 8, impact: '₹23,992' },
            { size: '30', stock: 4, recommendation: 11, impact: '₹32,989' },
            { size: '32', stock: 3, recommendation: 10, impact: '₹29,990' },
            { size: '34', stock: 2, recommendation: 6, impact: '₹17,994' }
          ]
        }
      ]
    }
  ];


  const movementItems = [
    {
      id: 'SKU101',
      name: 'Wool Blend Coat',
      image: '🧥',
      store: 'AND Chennai T-Nagar',
      storeId: 'STR112',
      zone: 'South',
      season: 'FW24',
      category: 'Outerwear',
      fabric: 'Wool Blend',
      currentStock: 28,
      daysInStore: 42,
      rateOfSale: 0,
      aiConfidence: 92,
      recommendation: 'Consolidate to Warehouse',
      targetAction: 'Pull Back',
      impact: '-₹54,000',
      severity: 'High',
      reason: 'Zero sales in 42 days. Heavy outerwear category has 85% lower sell-through in South zone vs other zones.'
    },
    {
      id: 'SKU102',
      name: 'Leather Ankle Boots',
      image: '👢',
      store: 'AND Mumbai Powai',
      storeId: 'STR034',
      zone: 'West',
      season: 'FW24',
      category: 'Footwear',
      fabric: 'Genuine Leather',
      currentStock: 18,
      daysInStore: 38,
      rateOfSale: 0.2,
      aiConfidence: 88,
      recommendation: 'Move to High-Performing Stores',
      targetAction: 'Transfer',
      targetStores: [
        { store: 'AND Delhi Connaught Place', storeId: 'STR045', reason: 'Boots category ROS: 4.2/d' }
      ],
      impact: '+₹28,000',
      severity: 'Medium',
      reason: 'Minimal movement in current location. Footwear category shows 72% higher ROS in target North zone stores.'
    }
  ];

    const getHighestPriority = (stores) => {
    const priorities = { 'Critical': 3, 'High': 2, 'Medium': 1, 'Low': 0 };
    return stores.reduce((highest, store) => {
      return priorities[store.priority] > priorities[highest] ? store.priority : highest;
    }, 'Low');
  };

  const getTotalImpact = (stores) => {
    const total = stores.reduce((sum, store) => {
      const value = parseInt(store.totalImpact.replace(/[₹,]/g, ''));
      return sum + value;
    }, 0);
    return `₹${total.toLocaleString()}`;
  };

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
            { id: 'replenishment', icon: TrendingUp, label: 'Replenishment', badge: 7 },
            { id: 'movement', icon: ArrowRight, label: 'Movement', badge: 6 }
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
                    className="px-4 py-2 rounded text-sm text-black flex items-center gap-2 transition-all font-medium"
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
                    color: 'white'
                  }}
                >
                  <Check className="w-4 h-4" strokeWidth={1.5} />
                  Execute Selected ({currentView === 'replenishment' ? selectedReplenishment.length : selectedMovement.length})
                </button>
              )}
              
              {currentView !== 'dashboard' && (
                <button className="px-5 py-2.5 bg-white border-2 border-gray-200 text-black rounded text-sm flex items-center gap-2 transition-all font-medium">
                  <Download className="w-4 h-4" strokeWidth={1.5} />
                  Export
                </button>
              )}
              
              <button 
                onClick={() => setChatOpen(!chatOpen)}
                className="px-5 py-2.5 rounded text-sm flex items-center gap-2 transition-all font-medium shadow-md"
                style={{ backgroundColor: chatOpen ? '#0C2C18' : '#85A383', color: 'white' }}
              >
                <MessageSquare className="w-4 h-4" strokeWidth={1.5} />
                {chatOpen ? 'Close Chat' : 'Ask Morrie'}
              </button>
            </div>
          </div>

           {/* Filter Panel */}
          {showFilters && (
            <div className="mt-5 p-6 rounded-lg border border-gray-200" style={{ backgroundColor: '#E7DDCA30' }}>
              <div className="grid grid-cols-4 gap-6">
                {/* Season Filter */}
                <div>
                  <label className="text-xs uppercase tracking-wider font-medium text-[#0C2C18] mb-2 block">Season</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#85A383]">
                    <option>All Seasons</option>
                    <option>SS25</option>
                    <option>FW24</option>
                    <option>SS24</option>
                  </select>
                </div>

                {/* Zone Filter */}
                <div>
                  <label className="text-xs uppercase tracking-wider font-medium text-[#0C2C18] mb-2 block">Zone/Region</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#85A383]">
                    <option>All Zones</option>
                    <option>North</option>
                    <option>South</option>
                    <option>East</option>
                    <option>West</option>
                  </select>
                </div>

                {/* Lifecycle Filter */}
                <div>
                  <label className="text-xs uppercase tracking-wider font-medium text-[#0C2C18] mb-2 block">Lifecycle Stage</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#85A383]">
                    <option>All Stages</option>
                    <option>Launch</option>
                    <option>Growth</option>
                    <option>Peak</option>
                    <option>Maturity</option>
                    <option>Decline</option>
                  </select>
                </div>

                {/* Ageing Bucket Filter */}
                <div>
                  <label className="text-xs uppercase tracking-wider font-medium text-[#0C2C18] mb-2 block">Ageing Bucket</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#85A383]">
                    <option>All Ages</option>
                    <option>0-30 days</option>
                    <option>31-60 days</option>
                    <option>61-90 days</option>
                    <option>91-120 days</option>
                    <option>120+ days</option>
                  </select>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="text-xs uppercase tracking-wider font-medium text-[#0C2C18] mb-2 block">Category</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#85A383]">
                    <option>All Categories</option>
                    <option>Dresses</option>
                    <option>Tops</option>
                    <option>Bottoms</option>
                    <option>Outerwear</option>
                    <option>Ethnic</option>
                  </select>
                </div>

                {/* Price Band Filter */}
                <div>
                  <label className="text-xs uppercase tracking-wider font-medium text-[#0C2C18] mb-2 block">Price Band</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#85A383]">
                    <option>All Prices</option>
                    <option>₹0-1,500</option>
                    <option>₹1,500-2,500</option>
                    <option>₹2,500-4,000</option>
                    <option>₹4,000+</option>
                  </select>
                </div>

                {/* Store Type Filter */}
                <div>
                  <label className="text-xs uppercase tracking-wider font-medium text-[#0C2C18] mb-2 block">Store Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#85A383]">
                    <option>All Stores</option>
                    <option>EBO</option>
                    <option>MBO</option>
                    <option>LFS</option>
                  </select>
                </div>

                {/* Promotion State Filter */}
                <div>
                  <label className="text-xs uppercase tracking-wider font-medium text-[#0C2C18] mb-2 block">Promotion State</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#85A383]">
                    <option>All</option>
                    <option>Full Price</option>
                    <option>On Sale</option>
                    <option>Clearance</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-6 pt-6 border-t border-gray-300">
                <button 
                  className="px-5 py-2 rounded text-sm font-medium transition-all"
                  style={{ backgroundColor: '#85A383', color: 'white' }}
                >
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
        <div className="flex-1 overflow-y-auto px-8 py-8 bg-[#ffffff] flex gap-6">
          <div className={`transition-all duration-300 ${chatOpen ? 'flex-1' : 'w-full'}`}>
          {currentView === 'dashboard' && (
            <div>
              {/* Welcome Header */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#85A383' }}>
                    <Sparkles className="w-6 h-6 text-white" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h2 className="text-3xl text-[#0C2C18] font-light">Good morning! Here's what needs your attention</h2>
                    <p className="text-[#878B87] font-light">Thursday, November 06, 2025 • Your inventory intelligence briefing</p>
                  </div>
                </div>
              </div>

              {/* Critical Actions Banner */}
              <div className="mb-8 p-6 rounded-xl border-l-4" style={{ 
                backgroundColor: '#DF764915',
                borderLeftColor: '#DF7649'
              }}>
                <div className="flex items-start gap-4">
                  <AlertCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#DF7649' }} strokeWidth={1.5} />
                  <div className="flex-1">
                    <h3 className="text-xl text-[#0C2C18] font-medium mb-2">7 SKUs need immediate action today</h3>
                    <p className="text-[#878B87] font-light mb-4">
                      4 items are approaching stockout (2.1-2.9 days of cover left) and 3 items have been stagnant for 35+ days. 
                      Potential revenue impact: <span className="font-medium" style={{ color: '#85A383' }}>+₹482,310</span> if acted upon.
                    </p>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setCurrentView('replenishment')}
                        className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all shadow-md"
                        style={{ backgroundColor: '#85A383', color: 'white' }}
                      >
                        View Replenishment (4)
                      </button>
                      <button
                        onClick={() => setCurrentView('movement')}
                        className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all shadow-md border-2"
                        style={{ borderColor: '#DF7649', color: '#DF7649', backgroundColor: 'white' }}
                      >
                        View Movement (3)
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Insights Grid */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-md border-l-4" style={{ borderLeftColor: '#85A383' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#85A38320' }}>
                      <TrendingUp className="w-5 h-5" style={{ color: '#85A383' }} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg text-[#0C2C18] font-medium">Today's Priority</h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-[#878B87] font-light mb-1">Most Critical</div>
                      <div className="text-base text-[#0C2C18] font-medium">Classic White Shirt (STR045)</div>
                      <div className="text-sm" style={{ color: '#DF7649' }}>2.1 days to stockout</div>
                    </div>
                    <div className="pt-3 border-t border-gray-200">
                      <div className="text-xs uppercase tracking-wider font-medium text-[#878B87] mb-2">Quick Action</div>
                      <button 
                        onClick={() => setCurrentView('replenishment')}
                        className="text-sm font-medium hover:underline" 
                        style={{ color: '#85A383' }}
                      >
                        Order 28 units across sizes →
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md border-l-4" style={{ borderLeftColor: '#DF7649' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#DF764920' }}>
                      <TrendingDown className="w-5 h-5" style={{ color: '#DF7649' }} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg text-[#0C2C18] font-medium">Underperformers</h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-[#878B87] font-light mb-1">Stagnant Inventory</div>
                      <div className="text-base text-[#0C2C18] font-medium">6 SKUs • 42+ days</div>
                      <div className="text-sm text-[#878B87]">₹1.8L tied up</div>
                    </div>
                    <div className="pt-3 border-t border-gray-200">
                      <div className="text-xs uppercase tracking-wider font-medium text-[#878B87] mb-2">Recommendation</div>
                      <button 
                        onClick={() => setCurrentView('movement')}
                        className="text-sm font-medium hover:underline" 
                        style={{ color: '#85A383' }}
                      >
                        Review transfer options →
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md border-l-4" style={{ borderLeftColor: '#85A383' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#85A38320' }}>
                      <ArrowUpRight className="w-5 h-5" style={{ color: '#85A383' }} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg text-[#0C2C18] font-medium">Opportunity</h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-[#878B87] font-light mb-1">High Velocity Items</div>
                      <div className="text-base text-[#0C2C18] font-medium">Denim Skinny Jeans</div>
                      <div className="text-sm" style={{ color: '#85A383' }}>5.2 units/day ROS</div>
                    </div>
                    <div className="pt-3 border-t border-gray-200">
                      <div className="text-xs uppercase tracking-wider font-medium text-[#878B87] mb-2">Insight</div>
                      <div className="text-sm text-[#878B87] font-light">
                        Similar performance in 3 other stores. Consider increasing allocation.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Snapshot */}
              <div className="mb-8">
                <h3 className="text-2xl text-[#0C2C18] font-light mb-5">Performance Snapshot</h3>
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
                    <div className="text-xs uppercase tracking-wider font-medium text-[#878B87] mb-2">Avg Stock Cover</div>
                    <div className="text-3xl text-[#0C2C18] font-light mb-1">42 days</div>
                    <div className="flex items-center gap-2 text-sm text-[#878B87]">
                      <Minus className="w-4 h-4" strokeWidth={1.5} />
                      <span className="font-light">Stable</span>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-5 shadow-sm">
                    <div className="text-xs uppercase tracking-wider font-medium text-[#878B87] mb-2">Stockout Risk</div>
                    <div className="text-3xl font-light mb-1" style={{ color: '#DF7649' }}>4 SKUs</div>
                    <div className="flex items-center gap-2 text-sm text-[#878B87]">
                      <AlertCircle className="w-4 h-4" style={{ color: '#DF7649' }} strokeWidth={1.5} />
                      <span className="font-light">&lt;3 days cover</span>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-5 shadow-sm">
                    <div className="text-xs uppercase tracking-wider font-medium text-[#878B87] mb-2">Stagnant Stock</div>
                    <div className="text-3xl font-light mb-1" style={{ color: '#DF7649' }}>6 SKUs</div>
                    <div className="flex items-center gap-2 text-sm text-[#878B87]">
                      <Clock className="w-4 h-4" style={{ color: '#DF7649' }} strokeWidth={1.5} />
                      <span className="font-light">&gt;35 days no sale</span>
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

              <div className="space-y-5">
                {fashionSKUs.map((sku) => (
                  <div key={sku.id} className="bg-white rounded-xl border-l-4 overflow-hidden shadow-md" style={{ borderLeftColor: '#85A383' }}>
                    <div className="p-7">
                      <div className="flex gap-6">
                        <div className="w-28 h-28 rounded-lg flex items-center justify-center text-5xl border-2 flex-shrink-0" style={{ 
                          background: '#ffffff',
                          borderColor: '#85A383'
                        }}>
                          {sku.image}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-3">
                                <h3 className="text-2xl text-[#0C2C18] font-light">{sku.name}</h3>
                                <span className="text-xs text-[#878B87] font-mono font-light px-2 py-1 bg-gray-100 rounded">{sku.id}</span>
                              </div>

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
                                <span className="px-3 py-1.5 rounded-full text-xs uppercase tracking-wider font-medium" style={{
                                  backgroundColor: '#85A38320',
                                  color: '#85A383'
                                }}>
                                  {sku.lifecycle}
                                </span>
                                <span className="px-3 py-1.5 rounded-full text-xs uppercase tracking-wider font-medium" style={{
                                  backgroundColor: sku.markdownStatus === 'Full Price' ? '#E7DDCA' : '#DF764920',
                                  color: sku.markdownStatus === 'Full Price' ? '#0C2C18' : '#DF7649'
                                }}>
                                  {sku.markdownStatus}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-7 gap-3 mb-4">
                            <div className="p-3 rounded-lg" style={{ backgroundColor: '#E7DDCA50' }}>
                              <div className="text-xs uppercase tracking-wider font-light mb-1.5" style={{ color: '#878B87' }}>EBO</div>
                              <div className="text-lg text-[#0C2C18] font-light">{sku.eboInventory}</div>
                            </div>
                            <div className="p-3 rounded-lg" style={{ backgroundColor: '#E7DDCA50' }}>
                              <div className="text-xs uppercase tracking-wider font-light mb-1.5" style={{ color: '#878B87' }}>E-com</div>
                              <div className="text-lg text-[#0C2C18] font-light">{sku.ecomInventory}</div>
                            </div>
                            <div className="p-3 rounded-lg" style={{ backgroundColor: '#E7DDCA50' }}>
                              <div className="text-xs uppercase tracking-wider font-light mb-1.5" style={{ color: '#878B87' }}>LFS</div>
                              <div className="text-lg text-[#0C2C18] font-light">{sku.lfsInventory}</div>
                            </div>
                            <div className="p-3 rounded-lg" style={{ backgroundColor: '#E7DDCA50' }}>
                              <div className="text-xs uppercase tracking-wider font-light mb-1.5" style={{ color: '#878B87' }}>ROS</div>
                              <div className="text-lg text-[#0C2C18] font-light">{sku.avgROS}/d</div>
                            </div>
                            <div className="p-3 rounded-lg" style={{ backgroundColor: '#85A38315' }}>
                              <div className="text-xs uppercase tracking-wider font-light mb-1.5" style={{ color: '#878B87' }}>Sell-Thru</div>
                              <div className="text-lg font-medium" style={{ color: '#85A383' }}>{sku.sellThrough}%</div>
                            </div>
                            <div className="p-3 rounded-lg" style={{ backgroundColor: '#E7DDCA50' }}>
                              <div className="text-xs uppercase tracking-wider font-light mb-1.5" style={{ color: '#878B87' }}>Cover</div>
                              <div className="text-lg text-[#0C2C18] font-light">{sku.stockCover}d</div>
                            </div>
                            <div className="p-3 rounded-lg" style={{ backgroundColor: '#E7DDCA50' }}>
                              <div className="text-xs uppercase tracking-wider font-light mb-1.5" style={{ color: '#878B87' }}>Margin</div>
                              <div className="text-lg text-[#0C2C18] font-light">{sku.margin}%</div>
                            </div>
                          </div>

                          <button
                            onClick={() => setExpandedSKU(expandedSKU === sku.id ? null : sku.id)}
                            className="text-sm font-medium flex items-center gap-2 transition-all"
                            style={{ color: '#85A383' }}
                          >
                            {expandedSKU === sku.id ? (
                              <><ChevronDown className="w-4 h-4" strokeWidth={2} />Hide Size Breakdown</>
                            ) : (
                              <><ChevronRight className="w-4 h-4" strokeWidth={2} />View Size Breakdown</>
                            )}
                          </button>

                          {expandedSKU === sku.id && sku.sizeBreakdown && (
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
            </div>
          )}

             {currentView === 'replenishment' && (
                      <div>
                        <div className="mb-10 flex items-center justify-between">
                          <div>
                            <h2 className="text-3xl text-[#0C2C18] mb-3 font-light">Replenishment Recommendations</h2>
                            <p className="text-[#878B87] font-light">AI-powered recommendations for stockout risks</p>
                          </div>
                          <div className="flex items-center gap-3">
                            {/* View Toggle */}
                            <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg p-1">
                              <button
                                onClick={() => setReplenishmentView('card')}
                                className={`px-4 py-2 rounded flex items-center gap-2 text-sm font-medium transition-all ${
                                  replenishmentView === 'card'
                                    ? 'bg-[#85A383] text-white'
                                    : 'text-[#878B87] hover:bg-gray-100'
                                }`}
                              >
                                <Grid className="w-4 h-4" strokeWidth={1.5} />
                                Card View
                              </button>
                              <button
                                onClick={() => setReplenishmentView('table')}
                                className={`px-4 py-2 rounded flex items-center gap-2 text-sm font-medium transition-all ${
                                  replenishmentView === 'table'
                                    ? 'bg-[#85A383] text-white'
                                    : 'text-[#878B87] hover:bg-gray-100'
                                }`}
                              >
                                <List className="w-4 h-4" strokeWidth={1.5} />
                                Table View
                              </button>
                            </div>
                            
                            <button
                              onClick={selectAllReplenishment}
                              className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all border-2 flex items-center gap-2"
                              style={{ borderColor: '#85A383', color: '#85A383' }}
                            >
                              <Check className="w-4 h-4" strokeWidth={2} />
                              Select All
                            </button>
                          </div>
                        </div>
          
                        {replenishmentView === 'card' ? (
                          <div className="space-y-6">
                            {replenishmentItems.map((item) => {
                              const highestPriority = getHighestPriority(item.stores);
                              const totalImpact = getTotalImpact(item.stores);
                              
                              return (
                                <div key={item.id} className="bg-white rounded-xl border-l-4 overflow-hidden shadow-md hover:shadow-2xl transition-all" style={{ 
                                  borderLeftColor: highestPriority === 'Critical' ? '#DF7649' : '#85A383'
                                }}>
                                  <div className="p-7">
                                    <div className="flex gap-6">
                                      <div className="flex items-start pt-2">
                                        <input
                                          type="checkbox"
                                          checked={selectedReplenishment.includes(item.id)}
                                          onChange={() => toggleReplenishmentSelection(item.id)}
                                          className="w-5 h-5 rounded border-2 cursor-pointer"
                                        />
                                      </div>
                                      <div className="w-28 h-28 rounded-lg flex items-center justify-center text-5xl border-2 flex-shrink-0" style={{ 
                                        background: 'linear-gradient(135deg, #E7DDCA 0%, #D4C7B0 100%)',
                                        borderColor: highestPriority === 'Critical' ? '#DF7649' : '#85A383'
                                      }}>
                                        {item.image}
                                      </div>
                                      
                                      <div className="flex-1">
                                        <div className="flex items-start justify-between mb-4">
                                          <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-3">
                                              <h3 className="text-2xl text-[#0C2C18] font-light">{item.name}</h3>
                                              <span className="text-xs text-[#878B87] font-mono font-light px-2 py-1 bg-gray-100 rounded">{item.skuCode}</span>
                                              <span className="px-3 py-1.5 rounded-full text-xs uppercase tracking-wider font-medium" style={{
                                                backgroundColor: highestPriority === 'Critical' ? '#DF764920' : '#85A38320',
                                                color: highestPriority === 'Critical' ? '#DF7649' : '#85A383'
                                              }}>
                                                {highestPriority}
                                              </span>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm mb-3">
                                              <span className="flex items-center gap-1.5 text-[#878B87] font-light">
                                                <Store className="w-4 h-4" strokeWidth={1.5} />
                                                {item.stores.length} {item.stores.length === 1 ? 'Store' : 'Stores'} Need Replenishment
                                              </span>
                                              <span className="px-2 py-1 rounded text-xs font-medium" style={{ backgroundColor: '#E7DDCA', color: '#0C2C18' }}>
                                                {item.category} • {item.season}
                                              </span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                              <div className="text-sm">
                                                <span className="text-[#878B87] font-light">Total Impact: </span>
                                                <span className="font-medium" style={{ color: '#85A383' }}>{totalImpact}</span>
                                              </div>
                                              <div className="text-sm">
                                                <span className="text-[#878B87] font-light">Fabric: </span>
                                                <span className="font-medium text-[#0C2C18]">{item.fabric}</span>
                                              </div>
                                            </div>
                                          </div>
                                          
                                          <button
                                            onClick={() => setDataModal(item.id)}
                                            className="px-4 py-2.5 rounded-lg text-sm flex items-center gap-2 transition-all font-medium shadow-md border-2 ml-4"
                                            style={{ borderColor: '#85A383', color: '#85A383', backgroundColor: 'white' }}
                                          >
                                            <BarChart3 className="w-4 h-4" strokeWidth={1.5} />
                                            View Data
                                          </button>
                                        </div>
                                        
                                        <div className="flex items-center gap-2 mb-5">
                                          <button
                                            onClick={() => openChatWithContext(item.stores[0], 'replenishment')}
                                            className="text-sm font-medium flex items-center gap-2 transition-all hover:underline"
                                            style={{ color: '#85A383' }}
                                          >
                                            <MessageSquare className="w-4 h-4" strokeWidth={1.5} />
                                            Ask Morrie about this SKU
                                          </button>
                                        </div>
          
                                        {/* Store-by-Store Breakdown */}
                                        <div className="space-y-3">
                                          {item.stores.map((store, storeIdx) => {
                                            const isExpanded = expandedStores[`${item.id}-${store.storeId}`];
                                            
                                            return (
                                              <div key={store.storeId} className="rounded-lg border-2 overflow-hidden" style={{ 
                                                borderColor: store.priority === 'Critical' ? '#DF7649' : '#85A38330',
                                                backgroundColor: store.priority === 'Critical' ? '#DF764908' : '#85A38308'
                                              }}>
                                                {/* Store Header */}
                                                <div className="p-4">
                                                  <div className="flex items-center justify-between mb-3">
 <input
            type="checkbox"
            checked={selectedValues.includes(store.storeId)}
            onChange={() => handleCheckboxChange(store.storeId)}
            className="w-4 h-4 mr-2 rounded border-2 border-gray-300 text-blue-600 cursor-pointer focus:ring-2 focus:ring-blue-500 hover:border-blue-400"
          />

                                                    <div className="flex items-center gap-3 flex-1">
                                                      <MapPin className="w-4 h-4" style={{ color: '#878B87' }} strokeWidth={1.5} />
                                                      <div>
                                                        <div className="font-medium text-[#0C2C18]">{store.store}</div>
                                                        <div className="text-xs text-[#878B87] font-light">{store.storeId} • {store.zone} Zone</div>
                                                      </div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                      <div className="text-right">
                                                        <div className="text-xs text-[#878B87] font-light">Stockout In</div>
                                                        <div className="text-lg font-medium" style={{ color: '#DF7649' }}>{store.daysToStockout}d</div>
                                                      </div>
                                                      <div className="text-right">
                                                        <div className="text-xs text-[#878B87] font-light">Impact</div>
                                                        <div className="text-lg font-medium" style={{ color: '#85A383' }}>{store.totalImpact}</div>
                                                      </div>
                                                    </div>
                                                  </div>
          
                                                  {/* Store Metrics */}
                                                  <div className="grid grid-cols-5 gap-3 mb-3">
                                                    <div className="bg-white rounded p-2 text-center">
                                                      <div className="text-xs text-[#878B87] font-light">Stock</div>
                                                      <div className="text-base font-medium text-[#0C2C18]">{store.currentStock}</div>
                                                    </div>
                                                    <div className="bg-white rounded p-2 text-center">
                                                      <div className="text-xs text-[#878B87] font-light">Warehouse</div>
                                                      <div className="text-base font-medium text-[#0C2C18]">{store.warehouseStock}</div>
                                                    </div>
                                                    <div className="bg-white rounded p-2 text-center">
                                                      <div className="text-xs text-[#878B87] font-light">In Transit</div>
                                                      <div className="text-base font-medium text-[#0C2C18]">{store.inTransit}</div>
                                                    </div>
                                                    <div className="bg-white rounded p-2 text-center">
                                                      <div className="text-xs text-[#878B87] font-light">ROS</div>
                                                      <div className="text-base font-medium text-[#0C2C18]">{store.rateOfSale}/d</div>
                                                    </div>
                                                    <div className="bg-white rounded p-2 text-center">
                                                      <div className="text-xs text-[#878B87] font-light">AI Conf.</div>
                                                      <div className="text-base font-medium" style={{ color: '#85A383' }}>{store.aiConfidence}%</div>
                                                    </div>
                                                  </div>
          
                                                  <button
                                                    onClick={() => toggleStoreExpansion(item.id, store.storeId)}
                                                    className="text-sm font-medium flex items-center gap-2 transition-all"
                                                    style={{ color: '#85A383' }}
                                                  >
                                                    {isExpanded ? (
                                                      <><ChevronDown className="w-4 h-4" strokeWidth={2} />Hide Size Breakdown</>
                                                    ) : (
                                                      <><ChevronRight className="w-4 h-4" strokeWidth={2} />View Size Breakdown</>
                                                    )}
                                                  </button>
                                                </div>
          
                                                {/* Size Breakdown */}
                                                {isExpanded && store.sizes && (
                                                  <div className="px-4 pb-4">
                                                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                                      <table className="w-full text-sm">
                                                        <thead>
                                                          <tr className="border-b border-gray-200" style={{ backgroundColor: '#E7DDCA30' }}>
                                                            <th className="py-2 px-3 text-left text-[#0C2C18] font-medium uppercase tracking-wider text-xs">Size</th>
                                                            <th className="py-2 px-3 text-right text-[#0C2C18] font-medium uppercase tracking-wider text-xs">Stock</th>
                                                            <th className="py-2 px-3 text-right text-[#0C2C18] font-medium uppercase tracking-wider text-xs">Order</th>
                                                            <th className="py-2 px-3 text-right text-[#0C2C18] font-medium uppercase tracking-wider text-xs">Impact</th>
                                                          </tr>
                                                        </thead>
                                                        <tbody>
                                                          {store.sizes.map((size, idx) => (
                                                            <tr key={idx} className="border-b border-gray-100 last:border-0">
                                                              <td className="py-2 px-3 text-[#0C2C18] font-medium">{size.size}</td>
                                                              <td className="py-2 px-3 text-right text-[#878B87] font-light">{size.stock}</td>
                                                              <td className="py-2 px-3 text-right font-medium" style={{ color: '#85A383' }}>{size.recommendation}</td>
                                                              <td className="py-2 px-3 text-right font-medium text-[#0C2C18]">{size.impact}</td>
                                                            </tr>
                                                          ))}
                                                        </tbody>
                                                      </table>
                                                    </div>
                                                  </div>
                                                )}
                                              </div>
                                            );
                                          })}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="overflow-x-auto">
                              <table className="w-full text-sm">
                                <thead>
                                  <tr className="border-b-2 border-gray-200" style={{ backgroundColor: '#E7DDCA50' }}>
                                    <th className="py-4 px-4 text-left">
                                      <input
                                        type="checkbox"
                                        checked={selectedReplenishment.length === replenishmentItems.length}
                                        onChange={selectAllReplenishment}
                                        className="w-4 h-4 rounded border-2 cursor-pointer"
                                      />
                                    </th>
                                    <th className="py-4 px-4 text-left text-[#0C2C18] font-medium uppercase tracking-wider text-xs">SKU</th>
                                    <th className="py-4 px-4 text-left text-[#0C2C18] font-medium uppercase tracking-wider text-xs">Stores</th>
                                    <th className="py-4 px-4 text-right text-[#0C2C18] font-medium uppercase tracking-wider text-xs">Total Impact</th>
                                    <th className="py-4 px-4 text-center text-[#0C2C18] font-medium uppercase tracking-wider text-xs">Priority</th>
                                    <th className="py-4 px-4 text-center text-[#0C2C18] font-medium uppercase tracking-wider text-xs">Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {replenishmentItems.map((item) => {
                                    const highestPriority = getHighestPriority(item.stores);
                                    const totalImpact = getTotalImpact(item.stores);
                                    
                                    return (
                                      <React.Fragment key={item.id}>
                                        <tr className="border-b border-gray-200 bg-gray-50">
                                          <td className="py-4 px-4" rowSpan={item.stores.length + 1}>
                                            <input
                                              type="checkbox"
                                              checked={selectedReplenishment.includes(item.id)}
                                              onChange={() => toggleReplenishmentSelection(item.id)}
                                              className="w-4 h-4 rounded border-2 cursor-pointer"
                                            />
                                          </td>
                                          <td className="py-4 px-4" rowSpan={item.stores.length + 1}>
                                            <div className="flex items-center gap-3">
                                              <div className="w-10 h-10 rounded flex items-center justify-center text-xl" style={{ 
                                                background: 'linear-gradient(135deg, #E7DDCA 0%, #D4C7B0 100%)'
                                              }}>
                                                {item.image}
                                              </div>
                                              <div>
                                                <div className="text-[#0C2C18] font-medium">{item.name}</div>
                                                <div className="text-xs text-[#878B87]">{item.skuCode}</div>
                                              </div>
                                            </div>
                                          </td>
                                          <td className="py-2 px-4 font-medium text-[#0C2C18]" colSpan={4}>
                                            {item.stores.length} {item.stores.length === 1 ? 'Store' : 'Stores'} • {item.category} • {item.season}
                                          </td>
                                        </tr>
                                        {item.stores.map((store, storeIdx) => (
                                          <tr key={`${item.id}-${store.storeId}`} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                            <td className="py-3 px-4 pl-8">
                                              <div>
                                                <div className="text-[#0C2C18] font-medium">{store.store}</div>
                                                <div className="text-xs text-[#878B87]">{store.storeId} • {store.zone}</div>
                                                <div className="flex items-center gap-3 mt-1 text-xs">
                                                  <span className="text-[#878B87]">Stock: {store.currentStock}</span>
                                                  <span className="text-[#878B87]">ROS: {store.rateOfSale}/d</span>
                                                  <span style={{ color: '#DF7649' }} className="font-medium">Stockout: {store.daysToStockout}d</span>
                                                </div>
                                              </div>
                                            </td>
                                            <td className="py-3 px-4 text-right font-medium" style={{ color: '#85A383' }}>{store.totalImpact}</td>
                                            <td className="py-3 px-4 text-center">
                                              <span className="px-2 py-1 rounded text-xs uppercase tracking-wider font-medium" style={{
                                                backgroundColor: store.priority === 'Critical' ? '#DF764920' : '#85A38320',
                                                color: store.priority === 'Critical' ? '#DF7649' : '#85A383'
                                              }}>
                                                {store.priority}
                                              </span>
                                            </td>
                                            <td className="py-3 px-4 text-center">
                                              <button
                                                onClick={() => openChatWithContext(store, 'replenishment')}
                                                className="px-3 py-1.5 rounded text-xs flex items-center gap-1.5 transition-all font-medium mx-auto"
                                                style={{ backgroundColor: '#85A383', color: 'white' }}
                                              >
                                                <MessageSquare className="w-3 h-3" strokeWidth={1.5} />
                                                Ask
                                              </button>
                                            </td>
                                          </tr>
                                        ))}
                                        <tr className="border-b-2 border-gray-200">
                                          <td colSpan={6} className="py-0"></td>
                                        </tr>
                                      </React.Fragment>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

          {currentView === 'movement' && (
            <div>
              <div className="mb-10 flex items-center justify-between">
                <div>
                  <h2 className="text-3xl text-[#0C2C18] mb-3 font-light">Movement & Consolidation</h2>
                  <p className="text-[#878B87] font-light">Data-driven transfer recommendations for underperforming inventory</p>
                </div>
                <div className="flex items-center gap-3">
                  {/* View Toggle */}
                  <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg p-1">
                    <button
                      onClick={() => setMovementView('card')}
                      className={`px-4 py-2 rounded flex items-center gap-2 text-sm font-medium transition-all ${
                        movementView === 'card'
                          ? 'bg-[#85A383] text-white'
                          : 'text-[#878B87] hover:bg-gray-100'
                      }`}
                    >
                      <Grid className="w-4 h-4" strokeWidth={1.5} />
                      Card View
                    </button>
                    <button
                      onClick={() => setMovementView('table')}
                      className={`px-4 py-2 rounded flex items-center gap-2 text-sm font-medium transition-all ${
                        movementView === 'table'
                          ? 'bg-[#85A383] text-white'
                          : 'text-[#878B87] hover:bg-gray-100'
                      }`}
                    >
                      <List className="w-4 h-4" strokeWidth={1.5} />
                      Table View
                    </button>
                  </div>
                  
                  <button
                    onClick={selectAllMovement}
                    className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all border-2 flex items-center gap-2"
                    style={{ borderColor: '#85A383', color: '#85A383' }}
                  >
                    <Check className="w-4 h-4" strokeWidth={2} />
                    Select All
                  </button>
                </div>
              </div>

              {movementView === 'card' ? (
                <div className="space-y-6">
                  {movementItems.map((item) => (
                    <div key={item.id} className="bg-white rounded-xl border-l-4 overflow-hidden shadow-md" style={{ 
                      borderLeftColor: item.severity === 'High' ? '#DF7649' : '#F4A261'
                    }}>
                      <div className="p-7">
                        <div className="flex gap-6">
                          <div className="flex items-start pt-2">
                            <input
                              type="checkbox"
                              checked={selectedMovement.includes(item.id)}
                              onChange={() => toggleMovementSelection(item.id)}
                              className="w-5 h-5 rounded border-2 cursor-pointer"
                            />
                          </div>
                          <div className="w-28 h-28 rounded-lg flex items-center justify-center text-5xl border-2 flex-shrink-0" style={{ 
                            background: 'linear-gradient(135deg, #FFEEE0 0%, #FFE0C8 100%)',
                            borderColor: '#DF7649'
                          }}>
                            {item.image}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                  <h3 className="text-2xl text-[#0C2C18] font-light">{item.name}</h3>
                                  <span className="px-3 py-1.5 rounded-full text-xs uppercase tracking-wider font-medium" style={{
                                    backgroundColor: '#DF764920',
                                    color: '#DF7649'
                                  }}>
                                    {item.season}
                                  </span>
                                </div>
                                <div className="flex items-center gap-4 text-sm mb-3">
                                  <span className="flex items-center gap-1.5 text-[#878B87] font-light">
                                    <MapPin className="w-4 h-4" strokeWidth={1.5} />
                                    {item.store}
                                  </span>
                                  <span className="px-2 py-1 rounded text-xs font-medium" style={{ backgroundColor: '#E7DDCA', color: '#0C2C18' }}>
                                    {item.zone}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2 mb-4">
                              <button
                                onClick={() => openChatWithContext(item, 'movement')}
                                className="text-sm font-medium flex items-center gap-2 transition-all hover:underline"
                                style={{ color: '#85A383' }}
                              >
                                <MessageSquare className="w-4 h-4" strokeWidth={1.5} />
                                Ask Morrie about this recommendation
                              </button>
                            </div>
                            
                            <div className="grid grid-cols-4 gap-4 mb-5">
                              <div className="p-4 rounded-lg" style={{ backgroundColor: '#FFEEE0' }}>
                                <div className="text-xs uppercase tracking-wider font-light mb-1.5" style={{ color: '#878B87' }}>Current Stock</div>
                                <div className="text-xl text-[#0C2C18] font-light">{item.currentStock}</div>
                              </div>
                              <div className="p-4 rounded-lg" style={{ backgroundColor: '#DF764920' }}>
                                <div className="text-xs uppercase tracking-wider font-light mb-1.5" style={{ color: '#878B87' }}>Days in Store</div>
                                <div className="text-xl font-medium" style={{ color: '#DF7649' }}>{item.daysInStore}d</div>
                              </div>
                              <div className="p-4 rounded-lg" style={{ backgroundColor: '#DF764920' }}>
                                <div className="text-xs uppercase tracking-wider font-light mb-1.5" style={{ color: '#878B87' }}>ROS</div>
                                <div className="text-xl font-medium" style={{ color: '#DF7649' }}>{item.rateOfSale}/d</div>
                              </div>
                              <div className="p-4 rounded-lg" style={{ backgroundColor: '#FFEEE0' }}>
                                <div className="text-xs uppercase tracking-wider font-light mb-1.5" style={{ color: '#878B87' }}>Impact</div>
                                <div className="text-xl text-[#0C2C18] font-medium">{item.impact}</div>
                              </div>
                            </div>

                            <div className="p-5 rounded-lg border-2 mb-5" style={{ 
                              backgroundColor: '#85A38310',
                              borderColor: '#85A38330'
                            }}>
                              <div className="flex items-center gap-3 mb-3">
                                {item.targetAction === 'Pull Back' ? (
                                  <Archive className="w-5 h-5" strokeWidth={1.5} style={{ color: '#85A383' }} />
                                ) : (
                                  <Move className="w-5 h-5" strokeWidth={1.5} style={{ color: '#85A383' }} />
                                )}
                                <span className="text-lg text-[#0C2C18] font-medium">{item.recommendation}</span>
                              </div>
                              {item.targetStores && item.targetStores.length > 0 && (
                                <div className="space-y-2 mb-3">
                                  {item.targetStores.map((target, idx) => (
                                    <div key={idx} className="bg-white rounded p-3 border border-gray-200">
                                      <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm font-medium text-[#0C2C18]">{target.store}</span>
                                        <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: '#85A38320', color: '#85A383' }}>
                                          Target
                                        </span>
                                      </div>
                                      <p className="text-xs text-[#878B87] font-light">{target.reason}</p>
                                    </div>
                                  ))}
                                </div>
                              )}
                              <p className="text-sm text-[#878B87] font-light">{item.reason}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b-2 border-gray-200" style={{ backgroundColor: '#E7DDCA50' }}>
                          <th className="py-4 px-4 text-left">
                            <input
                              type="checkbox"
                              checked={selectedMovement.length === movementItems.length}
                              onChange={selectAllMovement}
                              className="w-4 h-4 rounded border-2 cursor-pointer"
                            />
                          </th>
                          <th className="py-4 px-4 text-left text-[#0C2C18] font-medium uppercase tracking-wider text-xs">SKU</th>
                          <th className="py-4 px-4 text-left text-[#0C2C18] font-medium uppercase tracking-wider text-xs">Store</th>
                          <th className="py-4 px-4 text-center text-[#0C2C18] font-medium uppercase tracking-wider text-xs">Zone</th>
                          <th className="py-4 px-4 text-right text-[#0C2C18] font-medium uppercase tracking-wider text-xs">Stock</th>
                          <th className="py-4 px-4 text-right text-[#0C2C18] font-medium uppercase tracking-wider text-xs">Days</th>
                          <th className="py-4 px-4 text-right text-[#0C2C18] font-medium uppercase tracking-wider text-xs">ROS</th>
                          <th className="py-4 px-4 text-left text-[#0C2C18] font-medium uppercase tracking-wider text-xs">Recommendation</th>
                          <th className="py-4 px-4 text-center text-[#0C2C18] font-medium uppercase tracking-wider text-xs">Severity</th>
                          <th className="py-4 px-4 text-right text-[#0C2C18] font-medium uppercase tracking-wider text-xs">Impact</th>
                          <th className="py-4 px-4 text-center text-[#0C2C18] font-medium uppercase tracking-wider text-xs">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {movementItems.map((item) => (
                          <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                            <td className="py-4 px-4">
                              <input
                                type="checkbox"
                                checked={selectedMovement.includes(item.id)}
                                onChange={() => toggleMovementSelection(item.id)}
                                className="w-4 h-4 rounded border-2 cursor-pointer"
                              />
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded flex items-center justify-center text-xl" style={{ 
                                  background: 'linear-gradient(135deg, #FFEEE0 0%, #FFE0C8 100%)'
                                }}>
                                  {item.image}
                                </div>
                                <div>
                                  <div className="text-[#0C2C18] font-medium">{item.name}</div>
                                  <div className="text-xs text-[#878B87]">{item.storeId}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-[#0C2C18] font-light">{item.store}</td>
                            <td className="py-4 px-4 text-center">
                              <span className="px-2 py-1 rounded text-xs font-medium" style={{ backgroundColor: '#E7DDCA', color: '#0C2C18' }}>
                                {item.zone}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-right text-[#0C2C18] font-light">{item.currentStock}</td>
                            <td className="py-4 px-4 text-right font-medium" style={{ color: '#DF7649' }}>{item.daysInStore}d</td>
                            <td className="py-4 px-4 text-right font-medium" style={{ color: '#DF7649' }}>{item.rateOfSale}/d</td>
                            <td className="py-4 px-4 text-[#0C2C18] font-light">{item.recommendation}</td>
                            <td className="py-4 px-4 text-center">
                              <span className="px-2 py-1 rounded text-xs uppercase tracking-wider font-medium" style={{
                                backgroundColor: item.severity === 'High' ? '#DF764920' : '#F4A26120',
                                color: item.severity === 'High' ? '#DF7649' : '#F4A261'
                              }}>
                                {item.severity}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-right font-medium text-[#0C2C18]">{item.impact}</td>
                            <td className="py-4 px-4 text-center">
                              <button
                                onClick={() => openChatWithContext(item, 'movement')}
                                className="px-3 py-1.5 rounded text-xs flex items-center gap-1.5 transition-all font-medium mx-auto"
                                style={{ backgroundColor: '#85A383', color: 'white' }}
                              >
                                <MessageSquare className="w-3 h-3" strokeWidth={1.5} />
                                Ask
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
          </div>

          {/* Chat Sidebar */}
          {chatOpen && (
            <div className="w-96 bg-white rounded-xl shadow-2xl flex flex-col" style={{ height: 'calc(100vh - 200px)' }}>
              {/* Chat Header */}
              <div className="p-5 border-b border-gray-200" style={{ backgroundColor: '#0C2C18' }}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#85A383' }}>
                      <Sparkles className="w-5 h-5 text-white" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-white">Morrie AI</h3>
                      <p className="text-xs text-[#85A383]">Inventory Intelligence Assistant</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setChatOpen(false)}
                    className="text-[#85A383] hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" strokeWidth={1.5} />
                  </button>
                </div>
                {chatContext && (
                  <div className="mt-3 p-2 rounded" style={{ backgroundColor: '#1B2A21' }}>
                    <div className="text-xs text-[#85A383] mb-1">Discussing:</div>
                    <div className="text-sm text-white font-light">{chatContext.name}</div>
                  </div>
                )}
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {chatMessages.map((message, idx) => (
                  <div key={idx} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                      {message.role === 'assistant' && (
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#85A383' }}>
                            <Sparkles className="w-3 h-3 text-white" strokeWidth={1.5} />
                          </div>
                          <span className="text-xs font-medium text-[#878B87]">Morrie</span>
                        </div>
                      )}
                      <div
                        className={`rounded-lg p-3 ${
                          message.role === 'user'
                            ? 'text-white'
                            : 'bg-gray-100 text-[#0C2C18]'
                        }`}
                        style={message.role === 'user' ? { backgroundColor: '#85A383' } : {}}
                      >
                        <p className="text-sm font-light leading-relaxed">{message.content}</p>
                      </div>
                      <div className={`text-xs text-[#878B87] mt-1 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Suggested Questions */}
              {chatMessages.length <= 2 && (
                <div className="px-5 pb-3 border-t border-gray-100">
                  <div className="text-xs uppercase tracking-wider font-medium text-[#878B87] mb-2 mt-3">Try asking:</div>
                  <div className="space-y-2">
                    {[
                      "Why is this SKU critical?",
                      "What's driving the stockout risk?",
                      "Show me similar items"
                    ].map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => setChatInput(suggestion)}
                        className="w-full text-left px-3 py-2 rounded text-xs font-light border border-gray-200 hover:border-[#85A383] hover:bg-[#85A38310] transition-all text-[#0C2C18]"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Chat Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask Morrie anything..."
                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#85A383] font-light"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!chatInput.trim()}
                    className="px-4 py-2.5 rounded-lg text-sm font-medium transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: '#85A383', color: 'white' }}
                  >
                    <Send className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Data Analysis Modal */}
      {dataModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-8">
          <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between">
              <div>
                <h3 className="text-2xl text-[#000000] font-light">Decision Data Analysis</h3>
                <p className="text-sm text-[#878B87] mt-1 font-light">
                  {replenishmentItems.find(i => i.id === dataModal)?.name} • {dataModal}
                </p>
              </div>
              <button
                onClick={() => setDataModal(null)}
                className="text-[#878B87] hover:text-[#0C2C18]"
              >
                <X className="w-6 h-6" strokeWidth={1} />
              </button>
            </div>

            <div className="p-8">
              {(() => {
                const item = replenishmentItems.find(i => i.id === dataModal);
                if (!item) return null;
                
                return (
                  <>
                    {/* Executive Summary */}
                    <div className="mb-8 p-6 rounded-xl border-l-4" style={{ 
                      backgroundColor: '#85A38315',
                      borderLeftColor: '#85A383'
                    }}>
                      <h4 className="text-lg text-[#0C2C18] font-medium mb-3 flex items-center gap-2">
                        <Sparkles className="w-5 h-5" style={{ color: '#85A383' }} strokeWidth={1.5} />
                        Executive Summary
                      </h4>
                      <p className="text-sm text-[#878B87] font-light leading-relaxed mb-4">
                        Based on comprehensive analysis of sales velocity, inventory levels, and demand patterns, we recommend immediate replenishment of <span className="font-medium text-[#0C2C18]">{item.name}</span> at {item.store}. Current stock of {item.currentStock} units will deplete in {item.daysToStockout} days at the current rate of sale ({item.rateOfSale} units/day). Failure to replenish risks stockout and potential revenue loss of {item.totalImpact}.
                      </p>
                      <div className="flex items-center gap-6">
                        <div>
                          <div className="text-xs uppercase tracking-wider font-medium text-[#878B87]">AI Confidence</div>
                          <div className="text-2xl font-light mt-1" style={{ color: '#85A383' }}>{item.aiConfidence}%</div>
                        </div>
                        <div>
                          <div className="text-xs uppercase tracking-wider font-medium text-[#878B87]">Priority Level</div>
                          <div className="text-2xl font-light mt-1 text-[#0C2C18]">{item.priority}</div>
                        </div>
                        <div>
                          <div className="text-xs uppercase tracking-wider font-medium text-[#878B87]">Revenue at Risk</div>
                          <div className="text-2xl font-light mt-1" style={{ color: '#DF7649' }}>{item.totalImpact}</div>
                        </div>
                      </div>
                    </div>

                    {/* Sales Velocity Analysis */}
                    <div className="mb-8">
                      <h4 className="text-lg text-[#0C2C18] font-medium mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" style={{ color: '#85A383' }} strokeWidth={1.5} />
                        Sales Velocity Analysis
                      </h4>
                      <div className="grid grid-cols-2 gap-6">
                        {/* Current Metrics */}
                        <div className="bg-white rounded-lg border border-gray-200 p-5">
                          <h5 className="text-sm font-medium text-[#0C2C18] mb-4 uppercase tracking-wider">Current Performance</h5>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-[#878B87] font-light">Rate of Sale</span>
                              <span className="text-lg font-medium text-[#0C2C18]">{item.rateOfSale} units/day</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-[#878B87] font-light">Days to Stockout</span>
                              <span className="text-lg font-medium" style={{ color: '#DF7649' }}>{item.daysToStockout} days</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-[#878B87] font-light">Current Stock</span>
                              <span className="text-lg font-medium text-[#0C2C18]">{item.currentStock} units</span>
                            </div>
                          </div>
                        </div>

                        {/* Comparative Metrics */}
                        <div className="bg-white rounded-lg border border-gray-200 p-5">
                          <h5 className="text-sm font-medium text-[#0C2C18] mb-4 uppercase tracking-wider">vs Category Average</h5>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-[#878B87] font-light">ROS Performance</span>
                              <span className="text-lg font-medium" style={{ color: '#85A383' }}>+38%</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-[#878B87] font-light">Store Rank</span>
                              <span className="text-lg font-medium text-[#0C2C18]">Top 15%</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-[#878B87] font-light">Velocity Trend</span>
                              <span className="text-lg font-medium" style={{ color: '#85A383' }}>Increasing</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Inventory Status */}
                    <div className="mb-8">
                      <h4 className="text-lg text-[#0C2C18] font-medium mb-4 flex items-center gap-2">
                        <Package className="w-5 h-5" style={{ color: '#85A383' }} strokeWidth={1.5} />
                        Inventory Status & Availability
                      </h4>
                      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-gray-200" style={{ backgroundColor: '#E7DDCA30' }}>
                              <th className="py-3 px-4 text-left text-[#0C2C18] font-medium uppercase tracking-wider text-xs">Location</th>
                              <th className="py-3 px-4 text-right text-[#0C2C18] font-medium uppercase tracking-wider text-xs">Units</th>
                              <th className="py-3 px-4 text-right text-[#0C2C18] font-medium uppercase tracking-wider text-xs">Status</th>
                              <th className="py-3 px-4 text-right text-[#0C2C18] font-medium uppercase tracking-wider text-xs">Lead Time</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-gray-100">
                              <td className="py-3 px-4 text-[#0C2C18] font-medium">Current Store</td>
                              <td className="py-3 px-4 text-right font-medium" style={{ color: '#DF7649' }}>{item.currentStock}</td>
                              <td className="py-3 px-4 text-right">
                                <span className="px-2 py-1 rounded text-xs font-medium" style={{ backgroundColor: '#DF764920', color: '#DF7649' }}>
                                  Critical
                                </span>
                              </td>
                              <td className="py-3 px-4 text-right text-[#878B87] font-light">-</td>
                            </tr>
                            <tr className="border-b border-gray-100">
                              <td className="py-3 px-4 text-[#0C2C18] font-medium">Warehouse</td>
                              <td className="py-3 px-4 text-right font-medium" style={{ color: '#85A383' }}>{item.warehouseStock}</td>
                              <td className="py-3 px-4 text-right">
                                <span className="px-2 py-1 rounded text-xs font-medium" style={{ backgroundColor: '#85A38320', color: '#85A383' }}>
                                  Available
                                </span>
                              </td>
                              <td className="py-3 px-4 text-right text-[#878B87] font-light">2-3 days</td>
                            </tr>
                            <tr className="border-b border-gray-100">
                              <td className="py-3 px-4 text-[#0C2C18] font-medium">In Transit</td>
                              <td className="py-3 px-4 text-right text-[#0C2C18] font-light">{item.inTransit}</td>
                              <td className="py-3 px-4 text-right">
                                <span className="px-2 py-1 rounded text-xs font-medium" style={{ backgroundColor: '#E7DDCA', color: '#0C2C18' }}>
                                  Arriving
                                </span>
                              </td>
                              <td className="py-3 px-4 text-right text-[#878B87] font-light">5-7 days</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Size-Level Recommendations */}
                    <div className="mb-8">
                      <h4 className="text-lg text-[#0C2C18] font-medium mb-4 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5" style={{ color: '#85A383' }} strokeWidth={1.5} />
                        Size-Level Analysis & Recommendations
                      </h4>
                      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-gray-200" style={{ backgroundColor: '#E7DDCA30' }}>
                              <th className="py-3 px-4 text-left text-[#0C2C18] font-medium uppercase tracking-wider text-xs">Size</th>
                              <th className="py-3 px-4 text-right text-[#0C2C18] font-medium uppercase tracking-wider text-xs">Current Stock</th>
                              <th className="py-3 px-4 text-right text-[#0C2C18] font-medium uppercase tracking-wider text-xs">Recommended Order</th>
                              <th className="py-3 px-4 text-right text-[#0C2C18] font-medium uppercase tracking-wider text-xs">Days Coverage</th>
                              <th className="py-3 px-4 text-right text-[#0C2C18] font-medium uppercase tracking-wider text-xs">Revenue Impact</th>
                            </tr>
                          </thead>
                          <tbody>
                            {item.sizes && item.sizes.map((size, idx) => (
                              <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-3 px-4 text-[#0C2C18] font-medium">{size.size}</td>
                                <td className="py-3 px-4 text-right text-[#878B87] font-light">{size.stock}</td>
                                <td className="py-3 px-4 text-right font-medium" style={{ color: '#85A383' }}>{size.recommendation}</td>
                                <td className="py-3 px-4 text-right text-[#878B87] font-light">{Math.round((size.stock + size.recommendation) / (item.rateOfSale / item.sizes.length))}d</td>
                                <td className="py-3 px-4 text-right font-medium text-[#0C2C18]">{size.impact}</td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr className="border-t-2 border-gray-200" style={{ backgroundColor: '#E7DDCA30' }}>
                              <td className="py-3 px-4 text-[#0C2C18] font-medium">Total</td>
                              <td className="py-3 px-4 text-right font-medium text-[#0C2C18]">{item.currentStock}</td>
                              <td className="py-3 px-4 text-right font-medium" style={{ color: '#85A383' }}>
                                {item.sizes && item.sizes.reduce((sum, s) => sum + s.recommendation, 0)}
                              </td>
                              <td className="py-3 px-4 text-right font-medium text-[#0C2C18]">
                                {Math.round((item.currentStock + (item.sizes ? item.sizes.reduce((sum, s) => sum + s.recommendation, 0) : 0)) / item.rateOfSale)}d
                              </td>
                              <td className="py-3 px-4 text-right font-medium" style={{ color: '#85A383' }}>{item.totalImpact}</td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>

                    {/* Historical Context */}
                    <div className="mb-8">
                      <h4 className="text-lg text-[#0C2C18] font-medium mb-4 flex items-center gap-2">
                        <Clock className="w-5 h-5" style={{ color: '#85A383' }} strokeWidth={1.5} />
                        Historical Performance
                      </h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-white rounded-lg border border-gray-200 p-5">
                          <div className="text-xs uppercase tracking-wider font-medium text-[#878B87] mb-2">Last 7 Days</div>
                          <div className="text-2xl font-light text-[#0C2C18] mb-1">32 units</div>
                          <div className="text-sm font-light" style={{ color: '#85A383' }}>+12% vs prior week</div>
                        </div>
                        <div className="bg-white rounded-lg border border-gray-200 p-5">
                          <div className="text-xs uppercase tracking-wider font-medium text-[#878B87] mb-2">Last 30 Days</div>
                          <div className="text-2xl font-light text-[#0C2C18] mb-1">126 units</div>
                          <div className="text-sm font-light" style={{ color: '#85A383' }}>Consistent velocity</div>
                        </div>
                        <div className="bg-white rounded-lg border border-gray-200 p-5">
                          <div className="text-xs uppercase tracking-wider font-medium text-[#878B87] mb-2">Stockout Risk</div>
                          <div className="text-2xl font-light" style={{ color: '#DF7649' }}>High</div>
                          <div className="text-sm text-[#878B87] font-light">Without replenishment</div>
                        </div>
                      </div>
                    </div>

                    {/* Action Footer */}
                    <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center">
                      <div className="text-sm text-[#878B87] font-light">
                        Analysis generated on {new Date().toLocaleDateString()} • Confidence: {item.aiConfidence}%
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => setDataModal(null)}
                          className="px-6 py-2.5 bg-white border-2 border-gray-300 hover:bg-gray-50 text-[#0C2C18] rounded text-sm font-medium transition-all"
                        >
                          Close
                        </button>
                        <button 
                          className="px-6 py-2.5 rounded text-sm font-medium transition-all shadow-lg flex items-center gap-2"
                          style={{ backgroundColor: '#85A383', color: 'white' }}
                        >
                          <Download className="w-4 h-4" strokeWidth={1.5} />
                          Export Report
                        </button>
                      </div>
                    </div>
                  </>
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
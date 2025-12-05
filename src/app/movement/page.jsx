"use client"
import React, { useState } from 'react';
import { 
  LayoutDashboard, TrendingUp, ArrowRight, Package, Download, 
  Filter, X, ChevronDown, ChevronRight, Check, AlertCircle,
  MapPin, Tag, Calendar, Search, RefreshCw, BarChart3, Layers,
  MessageSquare, Sparkles, TrendingDown, Store, Percent, Eye,
  ArrowUpRight, ArrowDownRight, Minus, Ruler, Move, Archive, Activity,
  Clock, TrendingUpIcon, Shirt, Palette, Edit2, Save, Settings
} from 'lucide-react';

const MorrieDashboard = () => {
  const [currentView, setCurrentView] = useState('sales');
  const [replenishmentViewMode, setReplenishmentViewMode] = useState('cards'); // 'cards' or 'table'
  const [movementViewMode, setMovementViewMode] = useState('cards'); // 'cards' or 'table'
  const [movementSubView, setMovementSubView] = useState('consolidation'); // 'consolidation' or 'transfer'
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSKUs, setSelectedSKUs] = useState([]);
  const [selectedReplenishment, setSelectedReplenishment] = useState([]);
  const [selectedConsolidation, setSelectedConsolidation] = useState([]);
  const [selectedMovement, setSelectedMovement] = useState([]);
  const [expandedSKU, setExpandedSKU] = useState(null);
  const [expandedStores, setExpandedStores] = useState({}); // { 'SKU-STORE': true/false }
  const [expandedSizes, setExpandedSizes] = useState({}); // { 'SKU-STORE': true/false }
  const [aiChatOpen, setAiChatOpen] = useState(null);
  const [lifecycleModal, setLifecycleModal] = useState(null);
  
  // Edit states
  const [editingItem, setEditingItem] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const [editReasons, setEditReasons] = useState({});
  const [overallEditReason, setOverallEditReason] = useState('');
  const [saveConfirmModal, setSaveConfirmModal] = useState(null); // { itemId, type: 'replenishment' | 'movement' }
  
  // Settings states
  const [stores, setStores] = useState([
    { 
      id: 'STR023', 
      name: 'AND Mumbai Central', 
      zone: 'West', 
      grade: 'A+', 
      active: true,
      brands: { 'AND': true, 'Global Desi': false, 'Anita Dongre': false, 'Grassroots': false }
    },
    { 
      id: 'STR045', 
      name: 'AND Delhi Connaught Place', 
      zone: 'North', 
      grade: 'A++', 
      active: true,
      brands: { 'AND': true, 'Global Desi': true, 'Anita Dongre': false, 'Grassroots': false }
    },
    { 
      id: 'STR067', 
      name: 'AND Bangalore Koramangala', 
      zone: 'South', 
      grade: 'A+', 
      active: true,
      brands: { 'AND': true, 'Global Desi': false, 'Anita Dongre': true, 'Grassroots': false }
    },
    { 
      id: 'STR089', 
      name: 'AND Pune Aundh', 
      zone: 'West', 
      grade: 'A', 
      active: true,
      brands: { 'AND': true, 'Global Desi': true, 'Anita Dongre': false, 'Grassroots': true }
    },
    { 
      id: 'STR028', 
      name: 'AND Mumbai Palladium', 
      zone: 'West', 
      grade: 'A++', 
      active: true,
      brands: { 'AND': true, 'Global Desi': false, 'Anita Dongre': true, 'Grassroots': false }
    },
    { 
      id: 'STR043', 
      name: 'AND Delhi DLF Emporio', 
      zone: 'North', 
      grade: 'A++', 
      active: true,
      brands: { 'AND': true, 'Global Desi': false, 'Anita Dongre': true, 'Grassroots': false }
    },
    { 
      id: 'STR065', 
      name: 'AND Bangalore UB City', 
      zone: 'South', 
      grade: 'A++', 
      active: true,
      brands: { 'AND': true, 'Global Desi': true, 'Anita Dongre': true, 'Grassroots': false }
    },
    { 
      id: 'STR078', 
      name: 'AND Kolkata Park Street', 
      zone: 'East', 
      grade: 'A+', 
      active: false,
      brands: { 'AND': true, 'Global Desi': true, 'Anita Dongre': false, 'Grassroots': false }
    },
  ]);

  const allBrands = ['AND', 'Global Desi', 'Anita Dongre', 'Grassroots'];

  // Logic configuration states
  const [logicConfig, setLogicConfig] = useState({
    replenishment: {
      criticalStockDays: 3,
      highPriorityStockDays: 7,
      minRateOfSale: 2.0,
      minSellThrough: 60,
      safetyStockMultiplier: 1.5
    },
    movement: {
      stagnantDays: 35,
      minRateOfSale: 0.5,
      maxStockCover: 90,
      minTransferQty: 5
    },
    consolidation: {
      slowMovingDays: 45,
      minWarehouseQty: 10,
      pullbackThreshold: 0.2
    }
  });

  const [editingLogic, setEditingLogic] = useState(null);

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

  // Edit functions
  const startEditing = (item) => {
    setEditingItem(item.id);
    const initialValues = {};
    item.sizes.forEach(size => {
      // For replenishment, use recommendation; for movement, use stock (quantity to move)
      initialValues[size.size] = size.recommendation || size.stock;
    });
    setEditedValues({ ...editedValues, [item.id]: initialValues });
  };

  const cancelEditing = () => {
    setEditingItem(null);
  };

  const saveEdits = (itemId, type) => {
    // Show modal to ask for reason
    setSaveConfirmModal({ itemId, type });
  };

  const confirmSaveEdits = () => {
    const { itemId } = saveConfirmModal;
    console.log('Saved edits for', itemId, editedValues[itemId], editReasons[itemId]);
    setEditingItem(null);
    setSaveConfirmModal(null);
    // Clear the reason for this item after saving
    const newReasons = { ...editReasons };
    delete newReasons[itemId];
    setEditReasons(newReasons);
  };

  const cancelSaveEdits = () => {
    setSaveConfirmModal(null);
  };

  const updateEditedValue = (itemId, size, value) => {
    setEditedValues({
      ...editedValues,
      [itemId]: {
        ...editedValues[itemId],
        [size]: parseInt(value) || 0
      }
    });
  };

  const updateEditReason = (itemId, reason) => {
    setEditReasons({
      ...editReasons,
      [itemId]: reason
    });
  };

  // Store management functions
  const toggleStoreActive = (storeId) => {
    setStores(stores.map(store => 
      store.id === storeId ? { ...store, active: !store.active } : store
    ));
  };

  const toggleStoreBrand = (storeId, brand) => {
    setStores(stores.map(store => 
      store.id === storeId 
        ? { 
            ...store, 
            brands: { 
              ...store.brands, 
              [brand]: !store.brands[brand] 
            } 
          } 
        : store
    ));
  };

  // Logic configuration functions
  const startEditingLogic = (logicType) => {
    setEditingLogic(logicType);
  };

  const cancelEditingLogic = () => {
    setEditingLogic(null);
  };

  const updateLogicConfig = (logicType, field, value) => {
    setLogicConfig({
      ...logicConfig,
      [logicType]: {
        ...logicConfig[logicType],
        [field]: parseFloat(value) || 0
      }
    });
  };

  const saveLogicConfig = (logicType) => {
    console.log('Saved logic config for', logicType, logicConfig[logicType]);
    setEditingLogic(null);
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
      image: '👗',
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
      image: '👚',
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
      image: '👖',
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
      sizeBreakdown: [
        { size: '26', total: 18, ebo: 12, ecom: 3, lfs: 2, rtv: 1, warehouse: 8, ros: 0.1, sellThrough: 92 },
        { size: '28', total: 38, ebo: 24, ecom: 8, lfs: 4, rtv: 2, warehouse: 14, ros: 0.2, sellThrough: 90 },
        { size: '30', total: 62, ebo: 38, ecom: 12, lfs: 8, rtv: 4, warehouse: 22, ros: 0.3, sellThrough: 88 },
        { size: '32', total: 58, ebo: 36, ecom: 10, lfs: 8, rtv: 4, warehouse: 18, ros: 0.2, sellThrough: 86 },
        { size: '34', total: 42, ebo: 28, ecom: 6, lfs: 4, rtv: 4, warehouse: 12, ros: 0.1, sellThrough: 84 },
        { size: '36', total: 26, ebo: 18, ecom: 3, lfs: 2, rtv: 3, warehouse: 8, ros: 0.1, sellThrough: 82 }
      ]
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

  // Replenishment items - SKU level with multiple stores
  const replenishmentItems = [
    {
      id: 'F25-FS0-RAY',
      name: 'Floral Summer Dress',
      image: '🌺',
      skuCode: 'F25-FS0-RAY',
      category: 'Dresses',
      subCategory: 'SS25',
      season: 'SS25',
      fabric: 'Rayon',
      priority: 'CRITICAL',
      storesNeedingReplenishment: 3,
      totalImpact: '₹256,196',
      stores: [
        {
          storeId: 'STR023',
          storeName: 'AND Mumbai Central',
          zone: 'West',
          currentStock: 12,
          warehouseStock: 45,
          inTransit: 18,
          rateOfSale: 4.5,
          stockoutIn: '2.7d',
          aiConfidence: 94,
          impact: '₹89,964',
          sizes: [
            { size: 'S', stock: 2, order: 8, impact: '₹19,992' },
            { size: 'M', stock: 4, order: 12, impact: '₹29,988' },
            { size: 'L', stock: 4, order: 10, impact: '₹24,990' },
            { size: 'XL', stock: 2, order: 6, impact: '₹14,994' }
          ]
        },
        {
          storeId: 'STR089',
          storeName: 'AND Pune Aundh',
          zone: 'West',
          currentStock: 8,
          warehouseStock: 45,
          inTransit: 18,
          rateOfSale: 3.8,
          stockoutIn: '2.1d',
          aiConfidence: 91,
          impact: '₹67,482',
          sizes: [
            { size: 'S', stock: 1, order: 6, impact: '₹14,994' },
            { size: 'M', stock: 3, order: 10, impact: '₹24,990' },
            { size: 'L', stock: 3, order: 8, impact: '₹19,992' },
            { size: 'XL', stock: 1, order: 4, impact: '₹9,996' }
          ]
        },
        {
          storeId: 'STR045',
          storeName: 'AND Delhi Connaught Place',
          zone: 'North',
          currentStock: 15,
          warehouseStock: 45,
          inTransit: 18,
          rateOfSale: 5.2,
          stockoutIn: '2.9d',
          aiConfidence: 96,
          impact: '₹98,750',
          sizes: [
            { size: 'S', stock: 3, order: 10, impact: '₹24,990' },
            { size: 'M', stock: 5, order: 14, impact: '₹34,986' },
            { size: 'L', stock: 5, order: 12, impact: '₹29,988' },
            { size: 'XL', stock: 2, order: 8, impact: '₹19,992' }
          ]
        }
      ]
    },
    {
      id: 'F25-CWS-COT',
      name: 'Classic White Shirt',
      image: '👔',
      skuCode: 'F25-CWS-COT',
      category: 'Tops',
      subCategory: 'SS25',
      season: 'SS25',
      fabric: 'Cotton',
      priority: 'CRITICAL',
      storesNeedingReplenishment: 2,
      totalImpact: '₹148,470',
      stores: [
        {
          storeId: 'STR045',
          storeName: 'AND Delhi Saket',
          zone: 'North',
          currentStock: 8,
          warehouseStock: 32,
          inTransit: 12,
          rateOfSale: 3.8,
          stockoutIn: '2.1d',
          aiConfidence: 91,
          impact: '₹69,982',
          sizes: [
            { size: 'S', stock: 1, order: 6, impact: '₹14,994' },
            { size: 'M', stock: 3, order: 10, impact: '₹24,990' },
            { size: 'L', stock: 3, order: 8, impact: '₹19,992' },
            { size: 'XL', stock: 1, order: 5, impact: '₹12,495' }
          ]
        },
        {
          storeId: 'STR067',
          storeName: 'AND Bangalore Koramangala',
          zone: 'South',
          currentStock: 11,
          warehouseStock: 32,
          inTransit: 12,
          rateOfSale: 4.2,
          stockoutIn: '2.6d',
          aiConfidence: 93,
          impact: '₹78,488',
          sizes: [
            { size: 'S', stock: 2, order: 7, impact: '₹17,493' },
            { size: 'M', stock: 4, order: 11, impact: '₹27,489' },
            { size: 'L', stock: 4, order: 9, impact: '₹22,491' },
            { size: 'XL', stock: 1, order: 6, impact: '₹14,994' }
          ]
        }
      ]
    },
    {
      id: 'F25-DNM-JNS',
      name: 'High-Rise Denim Jeans',
      image: '👖',
      skuCode: 'F25-DNM-JNS',
      category: 'Bottoms',
      subCategory: 'Jeans',
      season: 'SS25',
      fabric: 'Stretch Denim',
      priority: 'High',
      storesNeedingReplenishment: 2,
      totalImpact: '₹171,958',
      stores: [
        {
          storeId: 'STR028',
          storeName: 'AND Mumbai Palladium',
          zone: 'West',
          currentStock: 14,
          warehouseStock: 38,
          inTransit: 10,
          rateOfSale: 2.8,
          stockoutIn: '5.0d',
          aiConfidence: 87,
          impact: '₹89,976',
          sizes: [
            { size: '28', stock: 2, order: 10, impact: '₹29,990' },
            { size: '30', stock: 5, order: 14, impact: '₹41,986' },
            { size: '32', stock: 5, order: 12, impact: '₹35,988' },
            { size: '34', stock: 2, order: 8, impact: '₹23,992' }
          ]
        },
        {
          storeId: 'STR065',
          storeName: 'AND Bangalore UB City',
          zone: 'South',
          currentStock: 12,
          warehouseStock: 38,
          inTransit: 10,
          rateOfSale: 2.5,
          stockoutIn: '4.8d',
          aiConfidence: 85,
          impact: '₹81,982',
          sizes: [
            { size: '28', stock: 2, order: 9, impact: '₹26,991' },
            { size: '30', stock: 4, order: 12, impact: '₹35,988' },
            { size: '32', stock: 4, order: 10, impact: '₹29,990' },
            { size: '34', stock: 2, order: 7, impact: '₹20,993' }
          ]
        }
      ]
    },
    {
      id: 'F25-CKT-COT',
      name: 'Cotton Printed Kurta',
      image: '👘',
      skuCode: 'F25-CKT-COT',
      category: 'Ethnic',
      subCategory: 'SS25',
      season: 'SS25',
      fabric: 'Cotton',
      priority: 'High',
      storesNeedingReplenishment: 1,
      totalImpact: '₹74,970',
      stores: [
        {
          storeId: 'STR089',
          storeName: 'AND Pune Aundh',
          zone: 'West',
          currentStock: 10,
          warehouseStock: 28,
          inTransit: 15,
          rateOfSale: 4.1,
          stockoutIn: '2.4d',
          aiConfidence: 89,
          impact: '₹74,970',
          sizes: [
            { size: 'XS', stock: 1, order: 5, impact: '₹12,495' },
            { size: 'S', stock: 2, order: 8, impact: '₹19,992' },
            { size: 'M', stock: 4, order: 10, impact: '₹24,990' },
            { size: 'L', stock: 3, order: 7, impact: '₹17,493' }
          ]
        }
      ]
    }
  ];

  // Movement items
  // Consolidation items - SKU level with multiple stores contributing
  const consolidationItems = [
    {
      id: 'CON-F24-WBC',
      name: 'Wool Blend Coat',
      image: '🧥',
      skuCode: 'F24-WBC-001',
      category: 'Outerwear',
      season: 'FW24',
      fabric: 'Wool Blend',
      priority: 'High',
      storesContributing: 3,
      totalUnits: 67,
      totalImpact: '-₹128,500',
      aiConfidence: 92,
      reason: 'Zero to minimal sales across multiple stores. Consolidate to warehouse until winter demand increases.',
      stores: [
        {
          storeId: 'STR112',
          storeName: 'AND Chennai T-Nagar',
          zone: 'South',
          currentStock: 28,
          daysInStore: 42,
          rateOfSale: 0,
          pullbackQty: 28,
          sizes: [
            { size: 'S', stock: 5, pullback: 5 },
            { size: 'M', stock: 8, pullback: 8 },
            { size: 'L', stock: 10, pullback: 10 },
            { size: 'XL', stock: 5, pullback: 5 }
          ]
        },
        {
          storeId: 'STR089',
          storeName: 'AND Pune Aundh',
          zone: 'West',
          currentStock: 22,
          daysInStore: 38,
          rateOfSale: 0.1,
          pullbackQty: 22,
          sizes: [
            { size: 'S', stock: 4, pullback: 4 },
            { size: 'M', stock: 6, pullback: 6 },
            { size: 'L', stock: 8, pullback: 8 },
            { size: 'XL', stock: 4, pullback: 4 }
          ]
        },
        {
          storeId: 'STR078',
          storeName: 'AND Kolkata Park Street',
          zone: 'East',
          currentStock: 17,
          daysInStore: 45,
          rateOfSale: 0,
          pullbackQty: 17,
          sizes: [
            { size: 'S', stock: 3, pullback: 3 },
            { size: 'M', stock: 5, pullback: 5 },
            { size: 'L', stock: 6, pullback: 6 },
            { size: 'XL', stock: 3, pullback: 3 }
          ]
        }
      ]
    },
    {
      id: 'CON-F24-VDR',
      name: 'Velvet Evening Dress',
      image: '👗',
      skuCode: 'F24-VDR-002',
      category: 'Dresses',
      season: 'FW24',
      fabric: 'Velvet',
      priority: 'Medium',
      storesContributing: 2,
      totalUnits: 31,
      totalImpact: '-₹89,200',
      aiConfidence: 88,
      reason: 'Slow-moving festive inventory. Consolidate for potential online sales or markdown events.',
      stores: [
        {
          storeId: 'STR034',
          storeName: 'AND Mumbai Powai',
          zone: 'West',
          currentStock: 18,
          daysInStore: 52,
          rateOfSale: 0.2,
          pullbackQty: 18,
          sizes: [
            { size: 'XS', stock: 3, pullback: 3 },
            { size: 'S', stock: 5, pullback: 5 },
            { size: 'M', stock: 6, pullback: 6 },
            { size: 'L', stock: 4, pullback: 4 }
          ]
        },
        {
          storeId: 'STR065',
          storeName: 'AND Bangalore UB City',
          zone: 'South',
          currentStock: 13,
          daysInStore: 48,
          rateOfSale: 0.1,
          pullbackQty: 13,
          sizes: [
            { size: 'XS', stock: 2, pullback: 2 },
            { size: 'S', stock: 4, pullback: 4 },
            { size: 'M', stock: 5, pullback: 5 },
            { size: 'L', stock: 2, pullback: 2 }
          ]
        }
      ]
    }
  ];

  // Movement items - Store level with size-specific transfer details
  const movementItems = [
    {
      id: 'MOV-STR034-F24-LAB',
      name: 'Leather Ankle Boots',
      image: '👢',
      skuCode: 'F24-LAB-003',
      fromStore: 'AND Mumbai Powai',
      fromStoreId: 'STR034',
      fromZone: 'West',
      category: 'Footwear',
      season: 'FW24',
      fabric: 'Genuine Leather',
      currentStock: 18,
      daysInStore: 38,
      rateOfSale: 0.2,
      aiConfidence: 88,
      severity: 'Medium',
      totalImpact: '+₹28,000',
      reason: 'Low velocity at current location. Higher demand at target stores for footwear category.',
      sizes: [
        { 
          size: '6', 
          stock: 3, 
          transfers: [
            { toStore: 'AND Delhi CP', toStoreId: 'STR045', qty: 2 },
            { toStore: 'AND Mumbai Central', toStoreId: 'STR046', qty: 1 }
          ]
        },
        { 
          size: '7', 
          stock: 5, 
          transfers: [
            { toStore: 'AND Delhi CP', toStoreId: 'STR045', qty: 3 },
            { toStore: 'AND Bangalore UB', toStoreId: 'STR051', qty: 2 }
          ]
        },
        { 
          size: '8', 
          stock: 6, 
          transfers: [
            { toStore: 'AND Delhi CP', toStoreId: 'STR045', qty: 3 },
            { toStore: 'AND Mumbai Central', toStoreId: 'STR046', qty: 2 },
            { toStore: 'AND Bangalore UB', toStoreId: 'STR051', qty: 1 }
          ]
        },
        { 
          size: '9', 
          stock: 4, 
          transfers: [
            { toStore: 'AND Mumbai Central', toStoreId: 'STR046', qty: 2 },
            { toStore: 'AND Bangalore UB', toStoreId: 'STR051', qty: 2 }
          ]
        }
      ]
    },
    {
      id: 'MOV-STR078-SS25-PSM',
      name: 'Printed Summer Maxi',
      image: '👗',
      skuCode: 'SS25-PSM-004',
      fromStore: 'AND Kolkata Park Street',
      fromStoreId: 'STR078',
      fromZone: 'East',
      category: 'Dresses',
      season: 'SS25',
      fabric: 'Cotton Voile',
      currentStock: 22,
      daysInStore: 45,
      rateOfSale: 0.3,
      aiConfidence: 90,
      severity: 'Medium',
      totalImpact: '+₹32,500',
      reason: 'Summer styles perform better in coastal regions. Reallocate to maximize sell-through before season end.',
      sizes: [
        { 
          size: 'XS', 
          stock: 4, 
          transfers: [
            { toStore: 'AND Mumbai Palladium', toStoreId: 'STR028', qty: 2 },
            { toStore: 'AND Goa Panjim', toStoreId: 'STR092', qty: 2 }
          ]
        },
        { 
          size: 'S', 
          stock: 6, 
          transfers: [
            { toStore: 'AND Mumbai Palladium', toStoreId: 'STR028', qty: 4 },
            { toStore: 'AND Goa Panjim', toStoreId: 'STR092', qty: 2 }
          ]
        },
        { 
          size: 'M', 
          stock: 8, 
          transfers: [
            { toStore: 'AND Mumbai Palladium', toStoreId: 'STR028', qty: 4 },
            { toStore: 'AND Goa Panjim', toStoreId: 'STR092', qty: 4 }
          ]
        },
        { 
          size: 'L', 
          stock: 4, 
          transfers: [
            { toStore: 'AND Goa Panjim', toStoreId: 'STR092', qty: 4 }
          ]
        }
      ]
    },
    {
      id: 'MOV-STR112-SS25-LTO',
      name: 'Linen Tunic - Olive',
      image: '👚',
      skuCode: 'SS25-LTO-005',
      fromStore: 'AND Chennai T-Nagar',
      fromStoreId: 'STR112',
      fromZone: 'South',
      category: 'Tops',
      season: 'SS25',
      fabric: 'Linen',
      currentStock: 16,
      daysInStore: 35,
      rateOfSale: 0.4,
      aiConfidence: 85,
      severity: 'Low',
      totalImpact: '+₹18,400',
      reason: 'Moderate sales velocity. Transfer excess to stores with higher demand for this color.',
      sizes: [
        { 
          size: 'S', 
          stock: 4, 
          transfers: [
            { toStore: 'AND Delhi CP', toStoreId: 'STR045', qty: 3 },
            { toStore: 'AND Mumbai Central', toStoreId: 'STR046', qty: 1 }
          ]
        },
        { 
          size: 'M', 
          stock: 6, 
          transfers: [
            { toStore: 'AND Delhi CP', toStoreId: 'STR045', qty: 4 },
            { toStore: 'AND Pune Aundh', toStoreId: 'STR089', qty: 2 }
          ]
        },
        { 
          size: 'L', 
          stock: 4, 
          transfers: [
            { toStore: 'AND Mumbai Central', toStoreId: 'STR046', qty: 2 },
            { toStore: 'AND Pune Aundh', toStoreId: 'STR089', qty: 2 }
          ]
        },
        { 
          size: 'XL', 
          stock: 2, 
          transfers: [
            { toStore: 'AND Pune Aundh', toStoreId: 'STR089', qty: 2 }
          ]
        }
      ]
    }
  ];

  return (
    <div className="flex h-screen overflow-auto bg-[#E7DDCA]">
      {/* Sidebar */}
      <div className="w-64 bg-[#0C2C18] border-r border-[#1B2A21] flex flex-col">
        <div className="p-6 border-b border-[#1B2A21]">
          <h1 className="text-xl font-light text-[#E7DDCA] tracking-wider">MORRIE</h1>
          <p className="text-xs text-[#85A383] mt-1 font-light">Inventory Intelligence</p>
        </div>
        
        <nav className="flex-1 p-4">
          {[
            { id: 'sales', icon: BarChart3, label: 'Sales Report' },
            { id: 'overview', icon: LayoutDashboard, label: 'SKU Overview' },
            { id: 'replenishment', icon: TrendingUp, label: 'Replenishment', badge: 4 },
            { id: 'movement', icon: ArrowRight, label: 'Movement', badge: 2 },
            { id: 'config', icon: Settings, label: 'Config' }
          ].map(item => (
            <button
              key={item.id}
              type="button"
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all font-light ${
                currentView === item.id
                  ? 'bg-[#85A383] text-[#0C2C18]'
                  : 'text-[#E7DDCA] hover:bg-[#1B2A21]'
              }`}
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
              {currentView !== 'config' && (
                <>
                  <button 
                    onClick={() => setShowFilters(!showFilters)}
                    className="px-4 py-2 bg-[#E7DDCA] hover:bg-[#85A383] hover:text-white rounded text-sm text-[#0C2C18] flex items-center gap-2 transition-all font-medium"
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
                >
                  <Check className="w-4 h-4" strokeWidth={1.5} />
                  Execute Selected ({currentView === 'replenishment' ? selectedReplenishment.length : selectedMovement.length})
                </button>
              )}
              
              {currentView !== 'config' && (
                <button className="px-5 py-2.5 bg-white border-2 border-[#0C2C18] hover:bg-[#E7DDCA] text-[#0C2C18] rounded text-sm flex items-center gap-2 transition-all font-medium">
                  <Download className="w-4 h-4" strokeWidth={1.5} />
                  Export
                </button>
              )}
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && currentView !== 'config' && (
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
                  <label className="text-xs uppercase tracking-wider font-medium text-[#0C2C18] mb-2 block">Lifecycle</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#85A383]">
                    <option>All Stages</option>
                    <option>Launch</option>
                    <option>Growth</option>
                    <option>Peak</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider font-medium text-[#0C2C18] mb-2 block">Category</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#85A383]">
                    <option>All Categories</option>
                    <option>Dresses</option>
                    <option>Tops</option>
                    <option>Bottoms</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-6 pt-6 border-t border-gray-300">
                <button className="px-5 py-2 rounded text-sm font-medium" style={{ backgroundColor: '#85A383', color: 'white' }}>
                  Apply Filters
                </button>
                <button className="px-5 py-2 bg-white border border-gray-300 rounded text-sm text-[#878B87] font-medium">
                  Reset All
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-8 py-8 bg-[#E7DDCA]">
          {currentView === 'dashboard' && (
            <div>
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
                    <h3 className="text-xl text-[#0C2C18] font-medium mb-2">6 SKUs need immediate action today</h3>
                    <p className="text-[#878B87] font-light mb-4">
                      4 items approaching stockout and 2 items stagnant for 35+ days. 
                      Potential revenue impact: <span className="font-medium" style={{ color: '#85A383' }}>+₹366,880</span>
                    </p>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setCurrentView('replenishment')}
                        className="px-5 py-2.5 rounded-lg text-sm font-medium"
                        style={{ backgroundColor: '#85A383', color: 'white' }}
                      >
                        View Replenishment (4)
                      </button>
                      <button
                        onClick={() => setCurrentView('movement')}
                        className="px-5 py-2.5 rounded-lg text-sm font-medium border-2"
                        style={{ borderColor: '#DF7649', color: '#DF7649', backgroundColor: 'white' }}
                      >
                        View Movement (2)
                      </button>
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
                    <div className="text-3xl font-light mb-1" style={{ color: '#DF7649' }}>2 SKUs</div>
                    <div className="flex items-center gap-2 text-sm text-[#878B87]">
                      <Clock className="w-4 h-4" style={{ color: '#DF7649' }} strokeWidth={1.5} />
                      <span className="font-light">&gt;35 days</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentView === 'sales' && (
            <div>
              <div className="mb-10">
                <h2 className="text-3xl text-[#0C2C18] mb-3 font-light">Sales Performance Report</h2>
                <p className="text-[#878B87] font-light">Comprehensive sales analytics across seasons, categories, and regions</p>
              </div>

              {/* AI Insights Banner */}
              <div className="mb-8 p-6 rounded-xl border-2" style={{ 
                backgroundColor: '#85A38308',
                borderColor: '#85A38330'
              }}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#85A383' }}>
                    <Sparkles className="w-6 h-6 text-white" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg text-[#0C2C18] font-medium">Morrie AI Insights</h3>
                      <span className="px-3 py-1 rounded-full text-xs uppercase tracking-wider font-medium" style={{
                        backgroundColor: '#85A38320',
                        color: '#85A383'
                      }}>
                        <Activity className="w-3 h-3 inline mr-1" strokeWidth={2} />
                        Live Analysis
                      </span>
                    </div>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#85A383' }} />
                        <p className="text-sm text-[#878B87] font-light leading-relaxed">
                          <span className="font-medium text-[#0C2C18]">Strong category divergence detected:</span> Ethnic Wear (+22.4% YoY) and Dresses (+18.5%) significantly outperforming, while Outerwear declining (-2.4%). Consider reallocating floor space and inventory mix for Q2.
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#85A383' }} />
                        <p className="text-sm text-[#878B87] font-light leading-relaxed">
                          <span className="font-medium text-[#0C2C18]">Regional opportunity:</span> West zone showing 15.2% growth with only 39% contribution. Mumbai Palladium and Central stores driving performance - potential for expansion or increased allocation.
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#F4A261' }} />
                        <p className="text-sm text-[#878B87] font-light leading-relaxed">
                          <span className="font-medium text-[#0C2C18]">Alert:</span> 5 SKUs have been stagnant for 14+ days with combined stock value of ₹1.2L. Recommend immediate markdown or inter-store transfer to unlock capital.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all shadow-md" style={{ backgroundColor: '#85A383', color: 'white' }}>
                        <MessageSquare className="w-4 h-4 inline mr-2" strokeWidth={1.5} />
                        Ask Morrie AI
                      </button>
                      <button className="px-5 py-2.5 rounded-lg text-sm font-medium border-2 transition-all" style={{ borderColor: '#85A383', color: '#85A383', backgroundColor: 'white' }}>
                        View Full Analysis
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Performance Indicators */}
              <div className="grid grid-cols-3 gap-6 mb-10">
                {/* Net Sales Value KPI */}
                <div className="bg-white rounded-xl shadow-md border-l-4 overflow-hidden" style={{ borderLeftColor: '#85A383' }}>
                  <div className="p-5 border-b border-gray-100">
                    <div className="text-xs uppercase tracking-wider font-medium text-[#878B87] mb-2">Net Sales Value</div>
                    <div className="text-4xl text-[#0C2C18] font-light mb-2">₹42.8L</div>
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp className="w-4 h-4" style={{ color: '#85A383' }} strokeWidth={1.5} />
                      <span className="font-medium" style={{ color: '#85A383' }}>+12.4%</span>
                      <span className="text-[#878B87] font-light">vs LY</span>
                    </div>
                  </div>
                  <div className="p-4" style={{ backgroundColor: '#E7DDCA20' }}>
                    <div className="grid grid-cols-3 gap-3 text-xs">
                      <div>
                        <div className="text-[#878B87] font-light mb-1">LY Same Day</div>
                        <div className="text-[#0C2C18] font-medium">₹38.1L</div>
                      </div>
                      <div>
                        <div className="text-[#878B87] font-light mb-1">LY MTD</div>
                        <div className="text-[#0C2C18] font-medium">₹156.4L</div>
                      </div>
                      <div>
                        <div className="text-[#878B87] font-light mb-1">LY YTD</div>
                        <div className="text-[#0C2C18] font-medium">₹18.2Cr</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Net Units Sold KPI */}
                <div className="bg-white rounded-xl shadow-md border-l-4 overflow-hidden" style={{ borderLeftColor: '#85A383' }}>
                  <div className="p-5 border-b border-gray-100">
                    <div className="text-xs uppercase tracking-wider font-medium text-[#878B87] mb-2">Net Units Sold</div>
                    <div className="text-4xl text-[#0C2C18] font-light mb-2">8,942</div>
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp className="w-4 h-4" style={{ color: '#85A383' }} strokeWidth={1.5} />
                      <span className="font-medium" style={{ color: '#85A383' }}>+8.2%</span>
                      <span className="text-[#878B87] font-light">vs LY</span>
                    </div>
                  </div>
                  <div className="p-4" style={{ backgroundColor: '#E7DDCA20' }}>
                    <div className="grid grid-cols-3 gap-3 text-xs">
                      <div>
                        <div className="text-[#878B87] font-light mb-1">LY Same Day</div>
                        <div className="text-[#0C2C18] font-medium">8,264</div>
                      </div>
                      <div>
                        <div className="text-[#878B87] font-light mb-1">LY MTD</div>
                        <div className="text-[#0C2C18] font-medium">34,128</div>
                      </div>
                      <div>
                        <div className="text-[#878B87] font-light mb-1">LY YTD</div>
                        <div className="text-[#0C2C18] font-medium">3.96L</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ASP KPI */}
                <div className="bg-white rounded-xl shadow-md border-l-4 overflow-hidden" style={{ borderLeftColor: '#85A383' }}>
                  <div className="p-5 border-b border-gray-100">
                    <div className="text-xs uppercase tracking-wider font-medium text-[#878B87] mb-2">Average Selling Price</div>
                    <div className="text-4xl text-[#0C2C18] font-light mb-2">₹4,787</div>
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp className="w-4 h-4" style={{ color: '#85A383' }} strokeWidth={1.5} />
                      <span className="font-medium" style={{ color: '#85A383' }}>+3.8%</span>
                      <span className="text-[#878B87] font-light">vs LY</span>
                    </div>
                  </div>
                  <div className="p-4" style={{ backgroundColor: '#E7DDCA20' }}>
                    <div className="grid grid-cols-3 gap-3 text-xs">
                      <div>
                        <div className="text-[#878B87] font-light mb-1">LY Same Day</div>
                        <div className="text-[#0C2C18] font-medium">₹4,612</div>
                      </div>
                      <div>
                        <div className="text-[#878B87] font-light mb-1">LY MTD</div>
                        <div className="text-[#0C2C18] font-medium">₹4,582</div>
                      </div>
                      <div>
                        <div className="text-[#878B87] font-light mb-1">LY YTD</div>
                        <div className="text-[#0C2C18] font-medium">₹4,596</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Secondary KPIs Row */}
              <div className="grid grid-cols-3 gap-6 mb-10">
                <div className="bg-white rounded-xl p-5 shadow-md">
                  <div className="text-xs uppercase tracking-wider font-medium text-[#878B87] mb-2">Sell-Through %</div>
                  <div className="text-3xl font-light mb-1" style={{ color: '#85A383' }}>68.4%</div>
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="w-4 h-4" style={{ color: '#85A383' }} strokeWidth={1.5} />
                    <span className="font-light" style={{ color: '#85A383' }}>+5.2pp</span>
                    <span className="text-[#878B87] font-light">vs LY</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-md">
                  <div className="text-xs uppercase tracking-wider font-medium text-[#878B87] mb-2">Gross Margin %</div>
                  <div className="text-3xl text-[#0C2C18] font-light mb-1">52.8%</div>
                  <div className="flex items-center gap-2 text-sm">
                    <Minus className="w-4 h-4" strokeWidth={1.5} style={{ color: '#878B87' }} />
                    <span className="font-light text-[#878B87]">-0.4pp</span>
                    <span className="text-[#878B87] font-light">vs LY</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-md">
                  <div className="text-xs uppercase tracking-wider font-medium text-[#878B87] mb-2">Return Rate %</div>
                  <div className="text-3xl text-[#0C2C18] font-light mb-1">4.2%</div>
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingDown className="w-4 h-4" style={{ color: '#85A383' }} strokeWidth={1.5} />
                    <span className="font-light" style={{ color: '#85A383' }}>-1.1pp</span>
                    <span className="text-[#878B87] font-light">vs LY</span>
                  </div>
                </div>
              </div>

              {/* Sales Trend & Regional Performance */}
              <div className="grid grid-cols-2 gap-6 mb-10">
                {/* Sales Trend Chart */}
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h3 className="text-lg text-[#0C2C18] font-medium">Sales Trend</h3>
                      <p className="text-sm text-[#878B87] font-light">Last 12 weeks performance</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1.5 rounded text-xs font-medium" style={{ backgroundColor: '#85A383', color: 'white' }}>
                        Value
                      </button>
                      <button className="px-3 py-1.5 rounded text-xs font-medium bg-gray-100 text-[#878B87]">
                        Units
                      </button>
                    </div>
                  </div>
                  <div className="h-64 flex items-end justify-between gap-2">
                    {[62, 58, 71, 68, 75, 82, 79, 88, 92, 85, 94, 100].map((height, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                        <div className="w-full rounded-t relative group cursor-pointer transition-all hover:opacity-80" 
                          style={{ 
                            height: `${height}%`, 
                            backgroundColor: idx === 11 ? '#85A383' : idx === 9 ? '#F4A26150' : '#E7DDCA'
                          }}>
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#0C2C18] text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                            ₹{(3.2 + (height / 25)).toFixed(1)}L
                          </div>
                          {idx === 9 && (
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                              <AlertCircle className="w-4 h-4" style={{ color: '#F4A261' }} strokeWidth={2} />
                            </div>
                          )}
                        </div>
                        <span className="text-xs text-[#878B87] font-light">W{idx + 1}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* AI Anomaly Detection */}
                  <div className="mt-5 pt-5 border-t border-gray-200">
                    <div className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: '#F4A26110' }}>
                      <Sparkles className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#F4A261' }} strokeWidth={1.5} />
                      <div className="flex-1">
                        <div className="text-xs uppercase tracking-wider font-medium text-[#0C2C18] mb-1">AI Anomaly Detected</div>
                        <p className="text-xs text-[#878B87] font-light">
                          Week 10 showed unexpected 8% dip despite no markdown activity. Analysis suggests regional festival calendar overlap. Week 12 recovery confirms trend normalization.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Regional Performance */}
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <div className="mb-5">
                    <h3 className="text-lg text-[#0C2C18] font-medium">Regional Performance</h3>
                    <p className="text-sm text-[#878B87] font-light">Sales contribution by zone</p>
                  </div>
                  <div className="space-y-4">
                    {[
                      { zone: 'West', value: '₹16.8L', contribution: 39.2, growth: 15.2, stores: 12, trend: 'up', aiInsight: 'Outperforming - consider expansion' },
                      { zone: 'North', value: '₹14.2L', contribution: 33.2, growth: 11.8, stores: 10, trend: 'stable', aiInsight: 'Stable growth trajectory' },
                      { zone: 'South', value: '₹8.6L', contribution: 20.1, growth: 8.4, stores: 8, trend: 'stable', aiInsight: 'Below potential - review mix' },
                      { zone: 'East', value: '₹3.2L', contribution: 7.5, growth: 6.2, stores: 4, trend: 'down', aiInsight: 'Underperforming - needs attention' }
                    ].map((region, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-[#0C2C18] font-medium w-16">{region.zone}</span>
                            <span className="text-sm text-[#878B87] font-light">({region.stores} stores)</span>
                            {region.trend === 'up' && (
                              <span className="px-2 py-0.5 rounded text-xs font-medium" style={{ backgroundColor: '#85A38320', color: '#85A383' }}>
                                <TrendingUp className="w-3 h-3 inline" strokeWidth={2} /> Hot
                              </span>
                            )}
                            {region.trend === 'down' && (
                              <span className="px-2 py-0.5 rounded text-xs font-medium" style={{ backgroundColor: '#DF764920', color: '#DF7649' }}>
                                <TrendingDown className="w-3 h-3 inline" strokeWidth={2} /> Alert
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-[#0C2C18] font-medium">{region.value}</span>
                            <span className="text-xs font-light" style={{ color: '#85A383' }}>+{region.growth}%</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full rounded-full transition-all" 
                              style={{ 
                                width: `${region.contribution}%`, 
                                backgroundColor: region.trend === 'up' ? '#85A383' : region.trend === 'down' ? '#DF7649' : '#E7DDCA'
                              }} 
                            />
                          </div>
                          <span className="text-xs text-[#878B87] font-light w-12 text-right">{region.contribution}%</span>
                        </div>
                        <div className="flex items-start gap-2 ml-1">
                          <Sparkles className="w-3 h-3 flex-shrink-0 mt-0.5" style={{ color: '#85A383' }} strokeWidth={1.5} />
                          <p className="text-xs text-[#878B87] font-light">{region.aiInsight}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Predictive Insight */}
                  <div className="mt-5 pt-5 border-t border-gray-200">
                    <div className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: '#85A38310' }}>
                      <Activity className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#85A383' }} strokeWidth={1.5} />
                      <div className="flex-1">
                        <div className="text-xs uppercase tracking-wider font-medium text-[#0C2C18] mb-1">Predictive Insight</div>
                        <p className="text-xs text-[#878B87] font-light">
                          Based on current growth rates, West zone projected to cross ₹20L monthly run-rate by Q2. Consider opening 2-3 additional A-grade stores to capture momentum.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Category Performance */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden mb-10">
                <div className="p-6 border-b border-gray-200" style={{ backgroundColor: '#E7DDCA30' }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg text-[#0C2C18] font-medium">Category Performance</h3>
                      <p className="text-sm text-[#878B87] font-light">Sales breakdown by product category</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-4 py-2 rounded text-sm font-medium border-2" style={{ borderColor: '#85A383', color: '#85A383', backgroundColor: 'white' }}>
                        <Filter className="w-4 h-4 inline mr-2" strokeWidth={1.5} />
                        Filter by Season
                      </button>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-gray-200" style={{ backgroundColor: '#E7DDCA20' }}>
                        <th className="py-4 px-6 text-left text-xs uppercase tracking-wider font-medium text-[#0C2C18]">Category</th>
                        <th className="py-4 px-4 text-right text-xs uppercase tracking-wider font-medium text-[#0C2C18]">Net Value</th>
                        <th className="py-4 px-4 text-right text-xs uppercase tracking-wider font-medium text-[#0C2C18]">Net Units</th>
                        <th className="py-4 px-4 text-right text-xs uppercase tracking-wider font-medium text-[#0C2C18]">ASP</th>
                        <th className="py-4 px-4 text-right text-xs uppercase tracking-wider font-medium text-[#0C2C18]">Discount %</th>
                        <th className="py-4 px-4 text-right text-xs uppercase tracking-wider font-medium text-[#0C2C18]">GM %</th>
                        <th className="py-4 px-4 text-right text-xs uppercase tracking-wider font-medium text-[#0C2C18]">Sell-Through %</th>
                        <th className="py-4 px-4 text-right text-xs uppercase tracking-wider font-medium text-[#0C2C18]">vs LY</th>
                        <th className="py-4 px-4 text-center text-xs uppercase tracking-wider font-medium text-[#0C2C18]">AI Signal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { category: 'Dresses', value: '₹14.2L', units: 2842, asp: '₹4,998', discount: 8.2, gm: 54.2, sellThrough: 72.4, growth: 18.5, signal: 'hot', insight: 'Strong momentum - increase allocation' },
                        { category: 'Tops & Tunics', value: '₹11.8L', units: 2654, asp: '₹4,447', discount: 12.5, gm: 52.8, sellThrough: 68.2, growth: 12.8, signal: 'stable', insight: 'Steady performer' },
                        { category: 'Bottoms', value: '₹8.4L', units: 1842, asp: '₹4,561', discount: 10.8, gm: 51.4, sellThrough: 65.8, growth: 8.4, signal: 'stable', insight: 'On track' },
                        { category: 'Ethnic Wear', value: '₹5.6L', units: 982, asp: '₹5,703', discount: 6.2, gm: 56.8, sellThrough: 70.2, growth: 22.4, signal: 'hot', insight: 'Breakout category - expand range' },
                        { category: 'Outerwear', value: '₹2.8L', units: 622, asp: '₹4,502', discount: 15.2, gm: 48.2, sellThrough: 58.4, growth: -2.4, signal: 'alert', insight: 'Declining - review or exit' }
                      ].map((cat, idx) => (
                        <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer group">
                          <td className="py-4 px-6 text-[#0C2C18] font-medium">{cat.category}</td>
                          <td className="py-4 px-4 text-right text-[#0C2C18] font-medium">{cat.value}</td>
                          <td className="py-4 px-4 text-right text-[#878B87] font-light">{cat.units.toLocaleString()}</td>
                          <td className="py-4 px-4 text-right text-[#878B87] font-light">{cat.asp}</td>
                          <td className="py-4 px-4 text-right text-[#878B87] font-light">{cat.discount}%</td>
                          <td className="py-4 px-4 text-right text-[#878B87] font-light">{cat.gm}%</td>
                          <td className="py-4 px-4 text-right font-medium" style={{ color: '#85A383' }}>{cat.sellThrough}%</td>
                          <td className="py-4 px-4 text-right">
                            <span className={`font-medium ${cat.growth >= 0 ? 'text-[#85A383]' : 'text-[#DF7649]'}`}>
                              {cat.growth >= 0 ? '+' : ''}{cat.growth}%
                            </span>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              {cat.signal === 'hot' && (
                                <div className="group relative">
                                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#85A383' }} />
                                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                    <div className="bg-[#0C2C18] text-white text-xs px-3 py-2 rounded whitespace-nowrap">
                                      {cat.insight}
                                    </div>
                                  </div>
                                </div>
                              )}
                              {cat.signal === 'stable' && (
                                <div className="group relative">
                                  <div className="w-2 h-2 rounded-full bg-gray-400" />
                                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                    <div className="bg-[#0C2C18] text-white text-xs px-3 py-2 rounded whitespace-nowrap">
                                      {cat.insight}
                                    </div>
                                  </div>
                                </div>
                              )}
                              {cat.signal === 'alert' && (
                                <div className="group relative">
                                  <AlertCircle className="w-4 h-4" style={{ color: '#DF7649' }} strokeWidth={2} />
                                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                    <div className="bg-[#0C2C18] text-white text-xs px-3 py-2 rounded whitespace-nowrap">
                                      {cat.insight}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Category AI Summary */}
                <div className="p-5 border-t border-gray-200" style={{ backgroundColor: '#85A38308' }}>
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#85A383' }} strokeWidth={1.5} />
                    <div className="flex-1">
                      <div className="text-xs uppercase tracking-wider font-medium text-[#0C2C18] mb-2">Smart Recommendation</div>
                      <p className="text-sm text-[#878B87] font-light leading-relaxed mb-3">
                        <span className="font-medium text-[#0C2C18]">Portfolio rebalancing opportunity:</span> Ethnic Wear and Dresses showing exceptional growth (+22.4% and +18.5%) with healthy margins. 
                        Recommend shifting 15-20% inventory allocation from Outerwear (declining -2.4%) to these high-performers for Q2. 
                        Expected impact: +₹3-4L additional monthly revenue.
                      </p>
                      <button className="text-sm font-medium hover:underline" style={{ color: '#85A383' }}>
                        View detailed category analysis →
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top & Bottom Performers */}
              <div className="grid grid-cols-2 gap-6 mb-10">
                {/* Top Performers */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="p-5 border-b border-gray-200" style={{ backgroundColor: '#85A38315' }}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <TrendingUp className="w-5 h-5" style={{ color: '#85A383' }} strokeWidth={1.5} />
                        <div>
                          <h3 className="text-lg text-[#0C2C18] font-medium">Top 10 Performers</h3>
                          <p className="text-sm text-[#878B87] font-light">By net sales value (last 30 days)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="space-y-3">
                      {[
                        { sku: 'F25P28DRCEY', name: 'Indigo V-Neck Dress', value: '₹2.8L', units: 542, sellThrough: 82, velocity: 'accelerating', plc: 21, tdStr: 68 },
                        { sku: 'F25C42TPWHT', name: 'Classic White Cotton Top', value: '₹2.4L', units: 628, sellThrough: 78, velocity: 'stable', plc: 28, tdStr: 78 },
                        { sku: 'F25E18KRPNK', name: 'Pink Printed Kurta', value: '₹2.1L', units: 412, sellThrough: 76, velocity: 'accelerating', plc: 18, tdStr: 76 },
                        { sku: 'F25B22JNBLU', name: 'High-Rise Blue Jeans', value: '₹1.9L', units: 384, sellThrough: 74, velocity: 'stable', plc: 25, tdStr: 74 },
                        { sku: 'F25D15MXGRY', name: 'Grey Maxi Dress', value: '₹1.7L', units: 356, sellThrough: 71, velocity: 'stable', plc: 22, tdStr: 71 }
                      ].map((item, idx) => (
                        <div key={idx} className="p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group border border-gray-100">
                          <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0" style={{
                              backgroundColor: idx === 0 ? '#85A383' : '#E7DDCA',
                              color: idx === 0 ? 'white' : '#0C2C18'
                            }}>
                              {idx + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <div className="text-sm text-[#0C2C18] font-medium truncate">{item.name}</div>
                                {item.velocity === 'accelerating' && (
                                  <span className="px-2 py-0.5 rounded text-xs font-medium flex-shrink-0" style={{ backgroundColor: '#85A38320', color: '#85A383' }}>
                                    <TrendingUp className="w-3 h-3 inline" strokeWidth={2} />
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-[#878B87] font-light">{item.sku} • {item.units} units</div>
                              
                              {/* PLC and TD STR row */}
                              <div className="flex items-center gap-4 mt-2">
                                <div className="flex items-center gap-1.5">
                                  <Clock className="w-3 h-3 text-[#878B87]" strokeWidth={1.5} />
                                  <span className="text-xs text-[#878B87] font-light">PLC: <span className="font-medium text-[#0C2C18]">{item.plc}d</span></span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <Activity className="w-3 h-3 text-[#878B87]" strokeWidth={1.5} />
                                  <span className="text-xs text-[#878B87] font-light">TD STR: <span className="font-medium" style={{ color: '#85A383' }}>{item.tdStr}%</span></span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <div className="text-sm text-[#0C2C18] font-medium">{item.value}</div>
                              <div className="text-xs font-medium" style={{ color: '#85A383' }}>{item.sellThrough}% ST</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Top Performers AI Insight */}
                    <div className="mt-5 pt-5 border-t border-gray-200">
                      <div className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: '#85A38310' }}>
                        <Sparkles className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#85A383' }} strokeWidth={1.5} />
                        <div className="flex-1">
                          <div className="text-xs uppercase tracking-wider font-medium text-[#0C2C18] mb-1">Core Candidate Alert</div>
                          <p className="text-xs text-[#878B87] font-light">
                            Top 3 items showing consistent 78%+ TD STR with accelerating velocity at 18-28 day PLC. Strong candidates for core assortment - recommend base stocking across all A/A+ stores.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Performers / Slow Movers */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="p-5 border-b border-gray-200" style={{ backgroundColor: '#DF764915' }}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <AlertCircle className="w-5 h-5" style={{ color: '#DF7649' }} strokeWidth={1.5} />
                        <div>
                          <h3 className="text-lg text-[#0C2C18] font-medium">Slow Movers</h3>
                          <p className="text-sm text-[#878B87] font-light">Low sell-through with high stock (last 30 days)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="space-y-3">
                      {[
                        { sku: 'F24W18DNMBL', name: 'Dark Denim Jeans', value: '₹0.4L', units: 82, stock: 156, sellThrough: 22, zeroSalesDays: 12, action: 'IST to North', plc: 138, tdStr: 88 },
                        { sku: 'F24O22WLCOT', name: 'Wool Blend Coat', value: '₹0.3L', units: 48, stock: 124, sellThrough: 18, zeroSalesDays: 18, action: 'Consolidate to WH', plc: 142, tdStr: 84 },
                        { sku: 'F24T15CRPNK', name: 'Pink Crop Top', value: '₹0.2L', units: 38, stock: 98, sellThrough: 16, zeroSalesDays: 14, action: '30% markdown', plc: 156, tdStr: 72 },
                        { sku: 'F24S28SKGRY', name: 'Grey Midi Skirt', value: '₹0.2L', units: 32, stock: 86, sellThrough: 14, zeroSalesDays: 22, action: 'IST to West', plc: 168, tdStr: 68 },
                        { sku: 'F24B18PLTBK', name: 'Black Palazzo Pants', value: '₹0.1L', units: 24, stock: 72, sellThrough: 12, zeroSalesDays: 28, action: '40% markdown', plc: 178, tdStr: 62 }
                      ].map((item, idx) => (
                        <div key={idx} className="p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group border border-gray-100">
                          <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0" style={{
                              backgroundColor: '#DF764920',
                              color: '#DF7649'
                            }}>
                              <AlertCircle className="w-4 h-4" strokeWidth={2} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm text-[#0C2C18] font-medium truncate mb-1">{item.name}</div>
                              <div className="text-xs text-[#878B87] font-light mb-2">{item.sku} • Stock: {item.stock} units</div>
                              
                              {/* PLC and TD STR row */}
                              <div className="flex items-center gap-4 mb-2">
                                <div className="flex items-center gap-1.5">
                                  <Clock className="w-3 h-3 text-[#878B87]" strokeWidth={1.5} />
                                  <span className="text-xs text-[#878B87] font-light">PLC: <span className="font-medium" style={{ color: '#DF7649' }}>{item.plc}d</span></span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <Activity className="w-3 h-3 text-[#878B87]" strokeWidth={1.5} />
                                  <span className="text-xs text-[#878B87] font-light">TD STR: <span className="font-medium text-[#0C2C18]">{item.tdStr}%</span></span>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <span className="text-xs px-2 py-0.5 rounded font-medium" style={{ backgroundColor: '#85A38320', color: '#85A383' }}>
                                  {item.action}
                                </span>
                              </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <div className="text-sm text-[#878B87] font-light">{item.units} units</div>
                              <div className="text-xs font-medium" style={{ color: '#DF7649' }}>{item.sellThrough}% ST</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Slow Movers AI Action Plan */}
                    <div className="mt-5 pt-5 border-t border-gray-200">
                      <div className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: '#DF764910' }}>
                        <Activity className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#DF7649' }} strokeWidth={1.5} />
                        <div className="flex-1">
                          <div className="text-xs uppercase tracking-wider font-medium text-[#0C2C18] mb-1">AI Action Plan</div>
                          <p className="text-xs text-[#878B87] font-light mb-2">
                            5 SKUs with 138-178 day PLC showing poor recent velocity despite decent TD STR (62-88%). High PLC indicates end-of-lifecycle - ₹1.2L locked capital. Recommended: 2 for IST (better zone fit), 2 for markdown (aging 22+ days), 1 for warehouse consolidation.
                          </p>
                          <button className="text-xs font-medium hover:underline" style={{ color: '#DF7649' }}>
                            Execute recommended actions →
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <button className="w-full px-4 py-2.5 rounded-lg text-sm font-medium border-2 hover:bg-gray-50 transition-all" style={{
                        borderColor: '#DF7649',
                        color: '#DF7649'
                      }}>
                        View Full Zero-Sales Report
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Store Performance Ranking */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200" style={{ backgroundColor: '#E7DDCA30' }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg text-[#0C2C18] font-medium">Store Performance Ranking</h3>
                      <p className="text-sm text-[#878B87] font-light">Top & bottom stores by sales performance</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-4 py-2 rounded text-sm font-medium" style={{ backgroundColor: '#85A383', color: 'white' }}>
                        Net Value
                      </button>
                      <button className="px-4 py-2 rounded text-sm font-medium bg-gray-100 text-[#878B87]">
                        Sell-Through
                      </button>
                      <button className="px-4 py-2 rounded text-sm font-medium bg-gray-100 text-[#878B87]">
                        Growth
                      </button>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-gray-200" style={{ backgroundColor: '#E7DDCA20' }}>
                        <th className="py-4 px-6 text-left text-xs uppercase tracking-wider font-medium text-[#0C2C18]">Rank</th>
                        <th className="py-4 px-6 text-left text-xs uppercase tracking-wider font-medium text-[#0C2C18]">Store</th>
                        <th className="py-4 px-4 text-center text-xs uppercase tracking-wider font-medium text-[#0C2C18]">Zone</th>
                        <th className="py-4 px-4 text-center text-xs uppercase tracking-wider font-medium text-[#0C2C18]">Grade</th>
                        <th className="py-4 px-4 text-right text-xs uppercase tracking-wider font-medium text-[#0C2C18]">Net Value</th>
                        <th className="py-4 px-4 text-right text-xs uppercase tracking-wider font-medium text-[#0C2C18]">Units</th>
                        <th className="py-4 px-4 text-right text-xs uppercase tracking-wider font-medium text-[#0C2C18]">ASP</th>
                        <th className="py-4 px-4 text-right text-xs uppercase tracking-wider font-medium text-[#0C2C18]">Sell-Through %</th>
                        <th className="py-4 px-4 text-right text-xs uppercase tracking-wider font-medium text-[#0C2C18]">vs LY</th>
                        <th className="py-4 px-4 text-center text-xs uppercase tracking-wider font-medium text-[#0C2C18]">AI Signal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { rank: 1, store: 'AND Mumbai Palladium', zone: 'West', grade: 'A++', value: '₹6.2L', units: 1242, asp: '₹4,993', sellThrough: 78.4, growth: 22.5, signal: 'star', insight: 'Top performer - model store' },
                        { rank: 2, store: 'AND Delhi DLF Emporio', zone: 'North', grade: 'A++', value: '₹5.8L', units: 1184, asp: '₹4,899', sellThrough: 76.2, growth: 18.8, signal: 'star', insight: 'Excellent momentum' },
                        { rank: 3, store: 'AND Bangalore UB City', zone: 'South', grade: 'A++', value: '₹5.2L', units: 1068, asp: '₹4,869', sellThrough: 74.8, growth: 16.4, signal: 'strong', insight: 'Strong & consistent' },
                        { rank: 4, store: 'AND Mumbai Central', zone: 'West', grade: 'A+', value: '₹4.8L', units: 982, asp: '₹4,888', sellThrough: 72.4, growth: 14.2, signal: 'strong', insight: 'Solid performance' },
                        { rank: 5, store: 'AND Delhi Connaught Place', zone: 'North', grade: 'A++', value: '₹4.6L', units: 942, asp: '₹4,883', sellThrough: 71.2, growth: 12.8, signal: 'stable', insight: 'On target' },
                        { rank: 6, store: 'AND Bangalore Koramangala', zone: 'South', grade: 'A+', value: '₹3.8L', units: 782, asp: '₹4,859', sellThrough: 68.4, growth: 10.2, signal: 'stable', insight: 'Meeting expectations' },
                        { rank: 7, store: 'AND Pune Aundh', zone: 'West', grade: 'A', value: '₹3.2L', units: 658, asp: '₹4,863', sellThrough: 65.8, growth: 8.4, signal: 'watch', insight: 'Below grade potential' },
                        { rank: 8, store: 'AND Kolkata Park Street', zone: 'East', grade: 'A+', value: '₹2.8L', units: 574, asp: '₹4,878', sellThrough: 62.2, growth: 6.2, signal: 'alert', insight: 'Underperforming grade' }
                      ].map((store, idx) => (
                        <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer">
                          <td className="py-4 px-6">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium" style={{
                              backgroundColor: idx < 3 ? '#85A38330' : '#E7DDCA50',
                              color: idx < 3 ? '#85A383' : '#0C2C18'
                            }}>
                              {store.rank}
                            </div>
                          </td>
                          <td className="py-4 px-6 text-[#0C2C18] font-medium">{store.store}</td>
                          <td className="py-4 px-4 text-center">
                            <span className="px-2 py-1 rounded text-xs font-medium" style={{ backgroundColor: '#E7DDCA', color: '#0C2C18' }}>
                              {store.zone}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className="px-2 py-1 rounded text-xs font-medium" style={{
                              backgroundColor: store.grade.includes('++') ? '#85A38330' : '#E7DDCA50',
                              color: store.grade.includes('++') ? '#85A383' : '#0C2C18'
                            }}>
                              {store.grade}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-right text-[#0C2C18] font-medium">{store.value}</td>
                          <td className="py-4 px-4 text-right text-[#878B87] font-light">{store.units.toLocaleString()}</td>
                          <td className="py-4 px-4 text-right text-[#878B87] font-light">{store.asp}</td>
                          <td className="py-4 px-4 text-right font-medium" style={{ color: '#85A383' }}>{store.sellThrough}%</td>
                          <td className="py-4 px-4 text-right font-medium" style={{ color: '#85A383' }}>+{store.growth}%</td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex items-center justify-center">
                              {store.signal === 'star' && (
                                <div className="group relative">
                                  <div className="text-lg">⭐</div>
                                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                    <div className="bg-[#0C2C18] text-white text-xs px-3 py-2 rounded whitespace-nowrap">
                                      {store.insight}
                                    </div>
                                  </div>
                                </div>
                              )}
                              {store.signal === 'strong' && (
                                <div className="group relative">
                                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#85A383' }} />
                                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                    <div className="bg-[#0C2C18] text-white text-xs px-3 py-2 rounded whitespace-nowrap">
                                      {store.insight}
                                    </div>
                                  </div>
                                </div>
                              )}
                              {store.signal === 'stable' && (
                                <div className="group relative">
                                  <div className="w-2 h-2 rounded-full bg-gray-400" />
                                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                    <div className="bg-[#0C2C18] text-white text-xs px-3 py-2 rounded whitespace-nowrap">
                                      {store.insight}
                                    </div>
                                  </div>
                                </div>
                              )}
                              {store.signal === 'watch' && (
                                <div className="group relative">
                                  <Eye className="w-4 h-4" style={{ color: '#F4A261' }} strokeWidth={2} />
                                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                    <div className="bg-[#0C2C18] text-white text-xs px-3 py-2 rounded whitespace-nowrap">
                                      {store.insight}
                                    </div>
                                  </div>
                                </div>
                              )}
                              {store.signal === 'alert' && (
                                <div className="group relative">
                                  <AlertCircle className="w-4 h-4" style={{ color: '#DF7649' }} strokeWidth={2} />
                                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                    <div className="bg-[#0C2C18] text-white text-xs px-3 py-2 rounded whitespace-nowrap">
                                      {store.insight}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Store Performance AI Summary */}
                <div className="p-5 border-t border-gray-200" style={{ backgroundColor: '#85A38308' }}>
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#85A383' }} strokeWidth={1.5} />
                    <div className="flex-1">
                      <div className="text-xs uppercase tracking-wider font-medium text-[#0C2C18] mb-2">Store Network Optimization</div>
                      <p className="text-sm text-[#878B87] font-light leading-relaxed mb-3">
                        <span className="font-medium text-[#0C2C18]">Top 3 stores (Mumbai Palladium, Delhi DLF, Bangalore UB)</span> generating 40% of total sales with 78%+ sell-through. 
                        <span className="font-medium text-[#0C2C18]"> Bottom 2 stores</span> underperforming relative to grade - recommend category mix review and localized merchandising. 
                        Kolkata Park Street showing 6.2% growth vs 15%+ in West zone - potential for IST optimization from East to West.
                      </p>
                      <div className="flex items-center gap-3">
                        <button className="text-sm font-medium hover:underline" style={{ color: '#85A383' }}>
                          View store-level deep dive →
                        </button>
                        <button className="text-sm font-medium hover:underline" style={{ color: '#85A383' }}>
                          Generate IST recommendations →
                        </button>
                      </div>
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

              {/* Stats */}
              <div className="grid grid-cols-5 gap-5 mb-10">
                <div className="bg-white rounded-lg p-5 border border-gray-200">
                  <div className="text-xs text-[#878B87] uppercase tracking-wider font-light mb-2">Total SKUs</div>
                  <div className="text-3xl text-[#0C2C18] font-light">4</div>
                </div>
                <div className="bg-white rounded-lg p-5 border border-gray-200">
                  <div className="text-xs text-[#878B87] uppercase tracking-wider font-light mb-2">Total Stock</div>
                  <div className="text-3xl text-[#0C2C18] font-light">1,854</div>
                </div>
                <div className="bg-white rounded-lg p-5 border border-gray-200">
                  <div className="text-xs text-[#878B87] uppercase tracking-wider font-light mb-2">Avg ROS</div>
                  <div className="text-3xl text-[#0C2C18] font-light">2.5/d</div>
                </div>
                <div className="bg-white rounded-lg p-5 border border-gray-200">
                  <div className="text-xs text-[#878B87] uppercase tracking-wider font-light mb-2">Sell Through</div>
                  <div className="text-3xl font-light" style={{ color: '#85A383' }}>69%</div>
                </div>
                <div className="bg-white rounded-lg p-5 border border-gray-200">
                  <div className="text-xs text-[#878B87] uppercase tracking-wider font-light mb-2">Avg Margin</div>
                  <div className="text-3xl text-[#0C2C18] font-light">54%</div>
                </div>
              </div>

              {/* SKU Cards */}
              <div className="space-y-5">
                {fashionSKUs.map((sku) => (
                  <div key={sku.id} className="bg-white rounded-xl border-l-4 overflow-hidden shadow-md" style={{ borderLeftColor: '#85A383' }}>
                    <div className="p-7">
                      <div className="flex gap-6">
                        <div className="w-28 h-28 rounded-lg flex items-center justify-center text-5xl border-2 flex-shrink-0" style={{ 
                          background: 'linear-gradient(135deg, #E7DDCA 0%, #D4C7B0 100%)',
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
                            
                            <button
                              onClick={() => setLifecycleModal(sku.id)}
                              className="px-5 py-2.5 rounded-lg text-sm flex items-center gap-2 font-medium shadow-md ml-4"
                              style={{ backgroundColor: '#85A383', color: 'white' }}
                            >
                              <BarChart3 className="w-4 h-4" strokeWidth={1.5} />
                              View Lifecycle
                            </button>
                          </div>
                          
                          {/* Metrics */}
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

                          <button
                            onClick={() => setExpandedSKU(expandedSKU === sku.id ? null : sku.id)}
                            className="text-sm font-medium flex items-center gap-2"
                            style={{ color: '#85A383' }}
                          >
                            {expandedSKU === sku.id ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                            {expandedSKU === sku.id ? 'Hide' : 'View'} Size Breakdown
                          </button>

                          {expandedSKU === sku.id && (
                            <div className="mt-5 pt-5 border-t border-gray-200">
                              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
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
                                      <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
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
                              <div className="w-32 h-32 rounded-lg flex items-center justify-center text-6xl border-2" style={{ 
                                background: 'linear-gradient(135deg, #E7DDCA 0%, #D4C7B0 100%)',
                                borderColor: '#85A383'
                              }}>
                                {sku.image}
                              </div>
                              <div className="flex-1">
                                <h4 className="text-2xl text-[#0C2C18] mb-3 font-light">{sku.name}</h4>
                                <div className="grid grid-cols-4 gap-4">
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
                                    <div className="text-xs uppercase tracking-wider font-light" style={{ color: '#878B87' }}>Lifecycle</div>
                                    <div className="text-xl text-[#0C2C18] font-light">{sku.lifecycle}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {sku.storeBreakdown && (
                              <div>
                                <h5 className="text-lg text-[#0C2C18] mb-4 font-medium">Store-Level Performance</h5>
                                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                  <table className="w-full text-sm">
                                    <thead>
                                      <tr className="border-b-2 border-gray-200" style={{ backgroundColor: '#E7DDCA50' }}>
                                        <th className="py-3 px-4 text-left text-[#0C2C18] font-medium uppercase tracking-wider text-xs">Store</th>
                                        <th className="py-3 px-3 text-center text-[#0C2C18] font-medium uppercase tracking-wider text-xs">Zone</th>
                                        <th className="py-3 px-3 text-center text-[#0C2C18] font-medium uppercase tracking-wider text-xs">Grade</th>
                                        <th className="py-3 px-3 text-right text-[#0C2C18] font-medium uppercase tracking-wider text-xs">Dispatch</th>
                                        <th className="py-3 px-3 text-right font-medium uppercase tracking-wider text-xs" style={{ color: '#85A383' }}>Value (₹K)</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {sku.storeBreakdown.map((store, idx) => (
                                        <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                                          <td className="py-3 px-4 text-[#0C2C18] font-medium">{store.store}</td>
                                          <td className="py-3 px-3 text-center">
                                            <span className="px-2 py-1 rounded text-xs font-medium" style={{ backgroundColor: '#E7DDCA', color: '#0C2C18' }}>
                                              {store.zone}
                                            </span>
                                          </td>
                                          <td className="py-3 px-3 text-center">
                                            <span className="px-2 py-1 rounded text-xs font-medium" style={{
                                              backgroundColor: store.grade.includes('++') ? '#85A38330' : '#E7DDCA50',
                                              color: store.grade.includes('++') ? '#85A383' : '#0C2C18'
                                            }}>
                                              {store.grade}
                                            </span>
                                          </td>
                                          <td className="py-3 px-3 text-right text-[#0C2C18] font-light">{store.dispatch}</td>
                                          <td className="py-3 px-3 text-right font-medium" style={{ color: '#85A383' }}>{store.value}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            )}
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
                  <p className="text-[#878B87] font-light">AI-powered recommendations for stockout risks</p>
                </div>
                <div className="flex items-center gap-3">
                  {/* View Mode Toggle */}
                  <div className="flex items-center gap-2 p-1 rounded-lg bg-gray-100">
                    <button
                      onClick={() => setReplenishmentViewMode('cards')}
                      className={`px-4 py-2 rounded text-sm font-medium transition-all ${
                        replenishmentViewMode === 'cards'
                          ? 'bg-white text-[#0C2C18] shadow-sm'
                          : 'text-[#878B87]'
                      }`}
                    >
                      <Layers className="w-4 h-4 inline mr-2" strokeWidth={1.5} />
                      Cards
                    </button>
                    <button
                      onClick={() => setReplenishmentViewMode('table')}
                      className={`px-4 py-2 rounded text-sm font-medium transition-all ${
                        replenishmentViewMode === 'table'
                          ? 'bg-white text-[#0C2C18] shadow-sm'
                          : 'text-[#878B87]'
                      }`}
                    >
                      <BarChart3 className="w-4 h-4 inline mr-2" strokeWidth={1.5} />
                      Table
                    </button>
                  </div>
                  
                  <button
                    onClick={selectAllReplenishment}
                    className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all border-2 flex items-center gap-2"
                    style={{ 
                      borderColor: '#85A383', 
                      color: '#85A383',
                      backgroundColor: selectedReplenishment.length === replenishmentItems.length ? '#85A38320' : 'white'
                    }}
                  >
                    <Check className="w-4 h-4" strokeWidth={2} />
                    {selectedReplenishment.length === replenishmentItems.length ? 'Deselect All' : `Select All (${replenishmentItems.length})`}
                  </button>
                </div>
              </div>

              {Object.keys(editedValues).length > 0 && (
                <div className="mb-6 p-5 rounded-xl border-2" style={{ backgroundColor: '#85A38310', borderColor: '#85A38330' }}>
                  <div className="flex items-center gap-2 mb-3">
                    <Edit2 className="w-5 h-5" style={{ color: '#85A383' }} strokeWidth={1.5} />
                    <h4 className="text-sm text-[#0C2C18] font-medium uppercase tracking-wider">Overall Edit Reason (Optional)</h4>
                  </div>
                  <textarea
                    placeholder="Provide a reason for your edits across all SKUs..."
                    value={overallEditReason}
                    onChange={(e) => setOverallEditReason(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#85A383] font-light resize-none"
                    rows="2"
                  />
                </div>
              )}

              {/* Cards View */}
              {replenishmentViewMode === 'cards' && (
                <div className="space-y-6">
                  {replenishmentItems.map((item) => (
                    <div key={item.id} className={`bg-white rounded-xl border-l-4 overflow-hidden shadow-md transition-all ${
                      editingItem === item.id ? 'ring-2 ring-offset-2 ring-[#85A383]' : 'hover:shadow-2xl'
                    }`} style={{ 
                      borderLeftColor: item.priority === 'CRITICAL' ? '#DF7649' : '#85A383'
                    }}>
                      <div className="p-7">
                        {/* Edit Mode Banner */}
                        {editingItem === item.id && (
                          <div className="mb-5 p-4 rounded-lg border-2" style={{ backgroundColor: '#85A38310', borderColor: '#85A38330' }}>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Edit2 className="w-5 h-5" style={{ color: '#85A383' }} strokeWidth={1.5} />
                                <div>
                                  <div className="text-sm text-[#0C2C18] font-medium">Edit Mode Active</div>
                                  <div className="text-xs text-[#878B87] font-light">Modify quantities for all stores, then save changes</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={cancelEditing}
                                  className="px-4 py-2 rounded-lg text-sm flex items-center gap-2 font-medium border-2 hover:bg-gray-50"
                                  style={{ borderColor: '#878B87', color: '#878B87', backgroundColor: 'white' }}
                                >
                                  <X className="w-4 h-4" strokeWidth={1.5} />
                                  Cancel
                                </button>
                                <button
                                  onClick={() => saveEdits(item.id, 'replenishment')}
                                  className="px-5 py-2 rounded-lg text-sm flex items-center gap-2 font-medium shadow-md"
                                  style={{ backgroundColor: '#85A383', color: 'white' }}
                                >
                                  <Save className="w-4 h-4" strokeWidth={1.5} />
                                  Save Changes
                                </button>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="flex gap-6 mb-5">
                          <div className="flex items-start pt-2">
                            <input
                              type="checkbox"
                              checked={selectedReplenishment.includes(item.id)}
                              onChange={() => toggleReplenishmentSelection(item.id)}
                              disabled={editingItem === item.id}
                              className="w-5 h-5 rounded border-2 cursor-pointer disabled:opacity-50"
                              style={{ accentColor: '#85A383' }}
                            />
                          </div>
                          
                          <div className="w-20 h-20 rounded-lg flex items-center justify-center text-4xl border-2" style={{ 
                            background: 'linear-gradient(135deg, #FFEEE0 0%, #FFE0C8 100%)',
                            borderColor: '#DF7649'
                          }}>
                            {item.image}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className="text-xl text-[#0C2C18] font-light">{item.name}</h3>
                                  <span className="text-xs text-[#878B87] font-mono font-light px-2 py-1 bg-gray-100 rounded">{item.skuCode}</span>
                                  <span className="px-3 py-1 rounded text-xs uppercase tracking-wider font-medium" style={{
                                    backgroundColor: item.priority === 'CRITICAL' ? '#DF764920' : '#85A38320',
                                    color: item.priority === 'CRITICAL' ? '#DF7649' : '#85A383'
                                  }}>
                                    {item.priority}
                                  </span>
                                  {editedValues[item.id] && editingItem !== item.id && (
                                    <span className="px-3 py-1 rounded text-xs uppercase tracking-wider font-medium" style={{
                                      backgroundColor: '#F4A26120',
                                      color: '#F4A261'
                                    }}>
                                      <Edit2 className="w-3 h-3 inline mr-1" strokeWidth={2} />
                                      Edited
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-4 text-sm text-[#878B87] mb-2">
                                  <span><Store className="w-4 h-4 inline mr-1" strokeWidth={1.5} />{item.storesNeedingReplenishment} Stores Need Replenishment</span>
                                  <span>{item.category} • {item.season}</span>
                                </div>
                                <div className="text-sm text-[#878B87]">
                                  <span>Total Impact: </span>
                                  <span className="text-lg font-medium text-[#0C2C18]">{item.totalImpact}</span>
                                  <span className="ml-4">Fabric: {item.fabric}</span>
                                </div>
                              </div>
                              
                              {editingItem !== item.id && (
                                <div className="flex items-center gap-3">
                                  <button
                                    onClick={() => startEditing(item)}
                                    className="px-4 py-2 rounded-lg text-sm flex items-center gap-2 font-medium border-2 hover:bg-gray-50 transition-all"
                                    style={{ borderColor: '#85A383', color: '#85A383', backgroundColor: 'white' }}
                                  >
                                    <Edit2 className="w-4 h-4" strokeWidth={1.5} />
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => setLifecycleModal(item.id)}
                                    className="px-4 py-2 rounded-lg text-sm flex items-center gap-2 font-medium border-2 hover:bg-gray-50 transition-all"
                                    style={{ borderColor: '#85A383', color: '#85A383', backgroundColor: 'white' }}
                                  >
                                    <BarChart3 className="w-4 h-4" strokeWidth={1.5} />
                                    Lifecycle
                                  </button>
                                  <button
                                    className="px-4 py-2 rounded-lg text-sm flex items-center gap-2 font-medium border-2 hover:bg-gray-50 transition-all"
                                    style={{ borderColor: '#85A383', color: '#85A383', backgroundColor: 'white' }}
                                  >
                                    <MessageSquare className="w-4 h-4" strokeWidth={1.5} />
                                    Why This?
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Reason input when editing */}
                        {editingItem === item.id && (
                          <div className="mb-5 p-4 rounded-lg" style={{ backgroundColor: '#85A38310' }}>
                            <label className="text-xs uppercase tracking-wider font-medium text-[#0C2C18] mb-2 block">
                              Reason for Changes <span className="text-[#DF7649]">*Required</span>
                            </label>
                            <textarea
                              value={editReasons[item.id] || ''}
                              onChange={(e) => updateEditReason(item.id, e.target.value)}
                              placeholder="Explain why you're changing these recommendations..."
                              className="w-full px-4 py-3 border-2 rounded-lg text-sm resize-none focus:outline-none focus:border-[#85A383]"
                              style={{ borderColor: '#85A38350' }}
                              rows={2}
                            />
                            <p className="text-xs text-[#878B87] mt-1 font-light">This helps the team understand manual overrides</p>
                          </div>
                        )}

                        {/* Store Sections */}
                        <div className="space-y-4">
                          {item.stores.map((store) => {
                            const storeKey = `${item.id}-${store.storeId}`;
                            const isExpanded = expandedSizes[storeKey];
                            
                            return (
                              <div key={store.storeId} className="border-2 rounded-lg overflow-hidden" style={{ borderColor: '#E7DDCA' }}>
                                <div className="p-5" style={{ backgroundColor: '#E7DDCA30' }}>
                                  <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                      <input
                                        type="checkbox"
                                        className="w-4 h-4 rounded cursor-pointer"
                                        disabled={editingItem === item.id}
                                        style={{ accentColor: '#85A383' }}
                                        readOnly
                                      />
                                      <MapPin className="w-5 h-5" style={{ color: '#85A383' }} strokeWidth={1.5} />
                                      <div>
                                        <div className="text-base font-medium text-[#0C2C18]">{store.storeName}</div>
                                        <div className="text-xs text-[#878B87]">{store.storeId} • {store.zone} Zone</div>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                      <div className="text-right">
                                        <div className="text-xs text-[#878B87]">Stockout In</div>
                                        <div className="text-lg font-medium" style={{ color: '#DF7649' }}>{store.stockoutIn}</div>
                                      </div>
                                      <div className="text-right">
                                        <div className="text-xs text-[#878B87]">Impact</div>
                                        <div className="text-lg font-medium text-[#0C2C18]">{store.impact}</div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-5 gap-3">
                                    <div>
                                      <div className="text-xs text-[#878B87] mb-1">Stock</div>
                                      <div className="text-lg font-medium text-[#0C2C18]">{store.currentStock}</div>
                                    </div>
                                    <div>
                                      <div className="text-xs text-[#878B87] mb-1">Warehouse</div>
                                      <div className="text-lg font-medium text-[#0C2C18]">{store.warehouseStock}</div>
                                    </div>
                                    <div>
                                      <div className="text-xs text-[#878B87] mb-1">In Transit</div>
                                      <div className="text-lg font-medium text-[#0C2C18]">{store.inTransit}</div>
                                    </div>
                                    <div>
                                      <div className="text-xs text-[#878B87] mb-1">ROS</div>
                                      <div className="text-lg font-medium text-[#0C2C18]">{store.rateOfSale}/d</div>
                                    </div>
                                    <div>
                                      <div className="text-xs text-[#878B87] mb-1">AI Conf</div>
                                      <div className="text-lg font-medium" style={{ color: '#85A383' }}>{store.aiConfidence}%</div>
                                    </div>
                                  </div>

                                  <button
                                    onClick={() => setExpandedSizes({ ...expandedSizes, [storeKey]: !isExpanded })}
                                    className="mt-4 text-sm flex items-center gap-2 text-[#85A383] hover:text-[#6B8268] font-medium"
                                  >
                                    {isExpanded ? (
                                      <>
                                        <ChevronDown className="w-4 h-4" strokeWidth={2} />
                                        Hide Size Breakdown
                                      </>
                                    ) : (
                                      <>
                                        <ChevronRight className="w-4 h-4" strokeWidth={2} />
                                        Show Size Breakdown
                                      </>
                                    )}
                                  </button>
                                </div>

                                {isExpanded && (
                                  <div className="p-5 border-t" style={{ borderColor: '#E7DDCA' }}>
                                    <table className="w-full">
                                      <thead>
                                        <tr className="border-b" style={{ borderColor: '#E7DDCA' }}>
                                          <th className="py-2 px-3 text-left text-xs uppercase tracking-wider font-medium text-[#878B87]">Size</th>
                                          <th className="py-2 px-3 text-right text-xs uppercase tracking-wider font-medium text-[#878B87]">Stock</th>
                                          <th className="py-2 px-3 text-right text-xs uppercase tracking-wider font-medium text-[#878B87]">Order</th>
                                          <th className="py-2 px-3 text-right text-xs uppercase tracking-wider font-medium text-[#878B87]">Impact</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {store.sizes.map((size, idx) => (
                                          <tr key={idx} className="border-b" style={{ borderColor: '#E7DDCA50' }}>
                                            <td className="py-3 px-3 text-sm font-medium text-[#0C2C18]">{size.size}</td>
                                            <td className="py-3 px-3 text-right text-sm text-[#878B87]">{size.stock}</td>
                                            <td className="py-3 px-3 text-right">
                                              {editingItem === item.id ? (
                                                <input
                                                  type="number"
                                                  value={editedValues[storeKey]?.[size.size] ?? size.order}
                                                  onChange={(e) => updateEditedValue(storeKey, size.size, e.target.value)}
                                                  className="w-20 px-2 py-1 border-2 rounded text-sm font-medium text-right focus:outline-none focus:border-[#85A383]"
                                                  style={{ borderColor: '#85A383' }}
                                                />
                                              ) : (
                                                <span className="text-sm font-medium text-[#0C2C18]">
                                                  {editedValues[storeKey]?.[size.size] ?? size.order}
                                                </span>
                                              )}
                                            </td>
                                            <td className="py-3 px-3 text-right text-sm font-medium text-[#0C2C18]">{size.impact}</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {replenishmentViewMode === 'table' && (
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b-2 border-gray-200" style={{ backgroundColor: '#E7DDCA20' }}>
                          <th className="py-4 px-4 text-center">
                            <input
                              type="checkbox"
                              checked={selectedReplenishment.length === replenishmentItems.length}
                              onChange={selectAllReplenishment}
                              className="w-5 h-5 rounded cursor-pointer"
                              style={{ accentColor: '#85A383' }}
                            />
                          </th>
                          <th className="py-4 px-6 text-left text-xs uppercase tracking-wider font-medium text-[#0C2C18]">SKU</th>
                          <th className="py-4 px-4 text-left text-xs uppercase tracking-wider font-medium text-[#0C2C18]">Store</th>
                          <th className="py-4 px-4 text-center text-xs uppercase tracking-wider font-medium text-[#0C2C18]">Priority</th>
                          <th className="py-4 px-4 text-right text-xs uppercase tracking-wider font-medium text-[#0C2C18]">Stock</th>
                          <th className="py-4 px-4 text-right text-xs uppercase tracking-wider font-medium text-[#0C2C18]">ROS</th>
                          <th className="py-4 px-4 text-right text-xs uppercase tracking-wider font-medium text-[#0C2C18]">Stockout In</th>
                          <th className="py-4 px-4 text-right text-xs uppercase tracking-wider font-medium text-[#0C2C18]">Impact</th>
                          <th className="py-4 px-4 text-center text-xs uppercase tracking-wider font-medium text-[#0C2C18]">AI Conf</th>
                        </tr>
                      </thead>
                      <tbody>
                        {replenishmentItems.flatMap((item) => 
                          item.stores.map((store, storeIdx) => (
                            <tr key={`${item.id}-${store.storeId}`} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                              <td className="py-4 px-4 text-center">
                                <input
                                  type="checkbox"
                                  checked={selectedReplenishment.includes(item.id)}
                                  onChange={() => toggleReplenishmentSelection(item.id)}
                                  className="w-5 h-5 rounded cursor-pointer"
                                  style={{ accentColor: '#85A383' }}
                                />
                              </td>
                              <td className="py-4 px-6">
                                {storeIdx === 0 && (
                                  <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded flex items-center justify-center text-2xl" style={{ 
                                      background: 'linear-gradient(135deg, #FFEEE0 0%, #FFE0C8 100%)'
                                    }}>
                                      {item.image}
                                    </div>
                                    <div>
                                      <div className="text-sm text-[#0C2C18] font-medium">{item.name}</div>
                                      <div className="text-xs text-[#878B87] font-light">{item.skuCode}</div>
                                      <div className="text-xs text-[#878B87] mt-0.5">{item.storesNeedingReplenishment} stores</div>
                                    </div>
                                  </div>
                                )}
                              </td>
                              <td className="py-4 px-4">
                                <div className="text-sm text-[#0C2C18] font-medium">{store.storeName}</div>
                                <div className="text-xs text-[#878B87]">{store.storeId} • {store.zone}</div>
                              </td>
                              <td className="py-4 px-4 text-center">
                                {storeIdx === 0 && (
                                  <span className="px-2 py-1 rounded text-xs uppercase tracking-wider font-medium" style={{
                                    backgroundColor: item.priority === 'CRITICAL' ? '#DF764920' : '#85A38320',
                                    color: item.priority === 'CRITICAL' ? '#DF7649' : '#85A383'
                                  }}>
                                    {item.priority}
                                  </span>
                                )}
                              </td>
                              <td className="py-4 px-4 text-right text-[#0C2C18] font-medium">{store.currentStock}</td>
                              <td className="py-4 px-4 text-right text-[#878B87] font-light">{store.rateOfSale}/d</td>
                              <td className="py-4 px-4 text-right">
                                <span className="font-medium" style={{ color: '#DF7649' }}>{store.stockoutIn}</span>
                              </td>
                              <td className="py-4 px-4 text-right text-[#0C2C18] font-medium">{store.impact}</td>
                              <td className="py-4 px-4 text-center">
                                <span className="text-sm font-medium" style={{ color: '#85A383' }}>{store.aiConfidence}%</span>
                              </td>
                            </tr>
                          ))
                        )}
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
                  {/* View Mode Toggle */}
                  <div className="flex items-center gap-2 p-1 rounded-lg bg-gray-100">
                    <button
                      onClick={() => setMovementViewMode('cards')}
                      className={`px-4 py-2 rounded text-sm font-medium transition-all ${
                        movementViewMode === 'cards'
                          ? 'bg-white text-[#0C2C18] shadow-sm'
                          : 'text-[#878B87]'
                      }`}
                    >
                      <Layers className="w-4 h-4 inline mr-2" strokeWidth={1.5} />
                      Cards
                    </button>
                    <button
                      onClick={() => setMovementViewMode('table')}
                      className={`px-4 py-2 rounded text-sm font-medium transition-all ${
                        movementViewMode === 'table'
                          ? 'bg-white text-[#0C2C18] shadow-sm'
                          : 'text-[#878B87]'
                      }`}
                    >
                      <BarChart3 className="w-4 h-4 inline mr-2" strokeWidth={1.5} />
                      Table
                    </button>
                  </div>
                  
                  <button
                    onClick={selectAllMovement}
                    className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all border-2 flex items-center gap-2"
                    style={{ 
                      borderColor: '#85A383', 
                      color: '#85A383',
                      backgroundColor: selectedMovement.length === movementItems.length ? '#85A38320' : 'white'
                    }}
                  >
                    <Check className="w-4 h-4" strokeWidth={2} />
                    {selectedMovement.length === movementItems.length ? 'Deselect All' : `Select All (${movementItems.length})`}
                  </button>
                </div>
              </div>

              {/* Cards View */}
              {movementViewMode === 'cards' && (
                <div className="space-y-6">
                  {movementItems.map((item) => (
                    <div key={item.id} className="bg-white rounded-xl border-l-4 overflow-hidden shadow-md hover:shadow-2xl transition-all" style={{ 
                      borderLeftColor: item.severity === 'High' ? '#DF7649' : item.severity === 'Medium' ? '#F4A261' : '#85A383'
                    }}>
                      <div className="p-7">
                        <div className="flex gap-6 mb-5">
                          <div className="flex items-start pt-2">
                            <input
                              type="checkbox"
                              checked={selectedMovement.includes(item.id)}
                              onChange={() => toggleMovementSelection(item.id)}
                              className="w-5 h-5 rounded border-2 cursor-pointer"
                              style={{ accentColor: '#85A383' }}
                            />
                          </div>
                          
                          <div className="w-20 h-20 rounded-lg flex items-center justify-center text-4xl border-2" style={{ 
                            background: 'linear-gradient(135deg, #FFEEE0 0%, #FFE0C8 100%)',
                            borderColor: '#F4A261'
                          }}>
                            {item.image}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl text-[#0C2C18] font-light">{item.name}</h3>
                              <span className="text-xs text-[#878B87] font-mono font-light px-2 py-1 bg-gray-100 rounded">{item.skuCode}</span>
                              <span className="px-3 py-1 rounded text-xs uppercase tracking-wider font-medium" style={{
                                backgroundColor: item.severity === 'High' ? '#DF764920' : item.severity === 'Medium' ? '#F4A26120' : '#85A38320',
                                color: item.severity === 'High' ? '#DF7649' : item.severity === 'Medium' ? '#F4A261' : '#85A383'
                              }}>
                                {item.severity || 'Medium'}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-[#878B87] mb-2">
                              <span><MapPin className="w-4 h-4 inline mr-1" strokeWidth={1.5} />FROM: {item.fromStore} ({item.fromStoreId})</span>
                              <span>{item.category} • {item.season}</span>
                            </div>
                            <div className="text-sm text-[#878B87]">
                              <span>Stock: </span>
                              <span className="text-base font-medium text-[#0C2C18]">{item.currentStock} units</span>
                              <span className="ml-4">Days: {item.daysInStore}d</span>
                              <span className="ml-4">ROS: {item.rateOfSale}/d</span>
                            </div>
                          </div>
                        </div>

                        {/* Size Transfer Details */}
                        <div className="mb-5 p-5 rounded-xl border-2" style={{ 
                          backgroundColor: '#85A38310',
                          borderColor: '#85A38350'
                        }}>
                          <div className="flex items-center gap-3 mb-4">
                            <ArrowRight className="w-5 h-5" strokeWidth={2} style={{ color: '#85A383' }} />
                            <span className="text-lg text-[#0C2C18] font-medium">Transfer Plan by Size</span>
                          </div>
                          
                          <div className="space-y-3">
                            {item.sizes.map((sizeData, idx) => (
                              <div key={idx} className="p-4 rounded-lg border-2" style={{ 
                                backgroundColor: 'white',
                                borderColor: '#E7DDCA'
                              }}>
                                <div className="flex items-start gap-4">
                                  <div className="px-3 py-1 rounded font-medium text-sm" style={{ 
                                    backgroundColor: '#85A38320',
                                    color: '#85A383'
                                  }}>
                                    Size {sizeData.size}
                                  </div>
                                  <div className="flex-1">
                                    <div className="text-xs text-[#878B87] mb-2">{sizeData.stock} units available</div>
                                    <div className="space-y-1.5">
                                      {sizeData.transfers.map((transfer, tIdx) => (
                                        <div key={tIdx} className="flex items-center gap-2 text-sm">
                                          <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} style={{ color: '#85A383' }} />
                                          <span className="font-medium text-[#0C2C18]">{transfer.toStore}</span>
                                          <span className="text-[#878B87]">({transfer.toStoreId})</span>
                                          <span className="px-2 py-0.5 rounded text-xs font-medium" style={{
                                            backgroundColor: '#85A38320',
                                            color: '#85A383'
                                          }}>
                                            {transfer.qty} units
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: '#E7DDCA30' }}>
                          <div>
                            <div className="text-xs uppercase tracking-wider text-[#878B87] mb-1">Total Impact</div>
                            <div className="text-xl font-medium text-[#0C2C18]">{item.totalImpact}</div>
                          </div>
                          <div>
                            <div className="text-xs uppercase tracking-wider text-[#878B87] mb-1">AI Confidence</div>
                            <div className="text-xl font-medium" style={{ color: '#85A383' }}>{item.aiConfidence}%</div>
                          </div>
                        </div>

                        <div className="mt-4 p-4 rounded-lg border-l-4" style={{ 
                          backgroundColor: '#FFEEE010',
                          borderColor: '#F4A261'
                        }}>
                          <p className="text-sm text-[#878B87]">{item.reason}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Table View */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b-2 border-gray-200" style={{ backgroundColor: '#E7DDCA20' }}>
                          <th className="py-4 px-4 text-center">
                            <input type="checkbox" className="w-5 h-5 rounded cursor-pointer" style={{ accentColor: '#85A383' }} readOnly/>
                          </th>
                          <th className="py-4 px-6 text-left text-xs uppercase tracking-wider font-medium text-[#0C2C18]">SKU</th>
                          <th className="py-4 px-4 text-left text-xs uppercase tracking-wider font-medium text-[#0C2C18]">From Store</th>
                          <th className="py-4 px-4 text-left text-xs uppercase tracking-wider font-medium text-[#0C2C18]">Size</th>
                          <th className="py-4 px-4 text-left text-xs uppercase tracking-wider font-medium text-[#0C2C18]">→ Transfers</th>
                          <th className="py-4 px-4 text-right text-xs uppercase tracking-wider font-medium text-[#0C2C18]">Days</th>
                          <th className="py-4 px-4 text-right text-xs uppercase tracking-wider font-medium text-[#0C2C18]">ROS</th>
                          <th className="py-4 px-4 text-right text-xs uppercase tracking-wider font-medium text-[#0C2C18]">Impact</th>
                          <th className="py-4 px-4 text-center text-xs uppercase tracking-wider font-medium text-[#0C2C18]">AI Conf</th>
                        </tr>
                      </thead>
                      <tbody>
                        {movementItems.flatMap((item) => 
                          item.sizes.map((sizeData, sizeIdx) => (
                            <tr key={`${item.id}-${sizeIdx}`} className="border-b border-gray-100 hover:bg-gray-50">
                              {sizeIdx === 0 && (
                                <>
                                  <td rowSpan={item.sizes.length} className="py-4 px-4 text-center border-r border-gray-100">
                                    <input type="checkbox" checked={selectedMovement.includes(item.id)} readOnly className="w-5 h-5 rounded cursor-pointer" style={{ accentColor: '#85A383' }} />
                                  </td>
                                  <td rowSpan={item.sizes.length} className="py-4 px-6 border-r border-gray-100">
                                    <div className="flex items-center gap-3">
                                      <div className="w-12 h-12 rounded flex items-center justify-center text-2xl" style={{ background: 'linear-gradient(135deg, #FFEEE0 0%, #FFE0C8 100%)' }}>{item.image}</div>
                                      <div>
                                        <div className="text-sm text-[#0C2C18] font-medium">{item.name}</div>
                                        <div className="text-xs text-[#878B87]">{item.skuCode}</div>
                                      </div>
                                    </div>
                                  </td>
                                  <td rowSpan={item.sizes.length} className="py-4 px-4 border-r border-gray-100">
                                    <div className="text-sm text-[#0C2C18] font-medium">{item.fromStore}</div>
                                    <div className="text-xs text-[#878B87]">{item.fromStoreId} • {item.fromZone}</div>
                                  </td>
                                </>
                              )}
                              <td className="py-4 px-4">
                                <span className="px-3 py-1 rounded font-medium text-sm" style={{ backgroundColor: '#85A38320', color: '#85A383' }}>Size {sizeData.size}</span>
                                <span className="ml-2 text-xs text-[#878B87]">({sizeData.stock} available)</span>
                              </td>
                              <td className="py-4 px-4">
                                <div className="space-y-1">
                                  {sizeData.transfers.map((t, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-xs">
                                      <ArrowRight className="w-3 h-3" strokeWidth={2} style={{ color: '#85A383' }} />
                                      <span className="font-medium text-[#0C2C18]">{t.toStore}</span>
                                      <span className="px-2 py-0.5 rounded" style={{ backgroundColor: '#85A38320', color: '#85A383' }}>{t.qty}</span>
                                    </div>
                                  ))}
                                </div>
                              </td>
                              {sizeIdx === 0 && (
                                <>
                                  <td rowSpan={item.sizes.length} className="py-4 px-4 text-right border-l border-gray-100"><span className="font-medium" style={{ color: '#DF7649' }}>{item.daysInStore}d</span></td>
                                  <td rowSpan={item.sizes.length} className="py-4 px-4 text-right text-[#878B87]">{item.rateOfSale}/d</td>
                                  <td rowSpan={item.sizes.length} className="py-4 px-4 text-right text-[#0C2C18] font-medium">{item.totalImpact}</td>
                                  <td rowSpan={item.sizes.length} className="py-4 px-4 text-center"><span className="text-sm font-medium" style={{ color: '#85A383' }}>{item.aiConfidence}%</span></td>
                                </>
                              )}
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
            </div>
          )}

          {currentView === 'config' && (
            <div>
              <div className="mb-10">
                <h2 className="text-3xl text-[#0C2C18] mb-3 font-light">Configuration</h2>
                <p className="text-[#878B87] font-light">Manage AI logic thresholds, stores and brand operations</p>
              </div>

              {/* Logic Configuration Section */}
              <div className="mb-8 bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200" style={{ backgroundColor: '#85A38320' }}>
                  <h3 className="text-xl text-[#0C2C18] font-medium">AI Logic Configuration</h3>
                  <p className="text-sm text-[#878B87] mt-1 font-light">Configure thresholds and parameters for inventory decisions</p>
                </div>

                <div className="p-6 space-y-6">
                  {/* Replenishment Logic */}
                  <div className="border-2 rounded-xl overflow-hidden" style={{ borderColor: '#85A38330' }}>
                    <div className="p-5 flex items-center justify-between" style={{ backgroundColor: '#85A38310' }}>
                      <div>
                        <h4 className="text-lg text-[#0C2C18] font-medium">Replenishment Logic</h4>
                        <p className="text-sm text-[#878B87] font-light">Thresholds for triggering replenishment recommendations</p>
                      </div>
                      {editingLogic !== 'replenishment' && (
                        <button
                          onClick={() => startEditingLogic('replenishment')}
                          className="px-5 py-2.5 rounded-lg text-sm flex items-center gap-2 font-medium shadow-md border-2 hover:bg-gray-50"
                          style={{ borderColor: '#85A383', color: '#85A383', backgroundColor: 'white' }}
                        >
                          <Edit2 className="w-4 h-4" strokeWidth={1.5} />
                          Edit
                        </button>
                      )}
                    </div>
                    <div className="p-5 grid grid-cols-3 gap-6">
                      <div>
                        <label className="text-xs uppercase tracking-wider font-medium text-[#0C2C18] mb-2 block">
                          Critical Stock Days
                        </label>
                        {editingLogic === 'replenishment' ? (
                          <input
                            type="number"
                            step="0.1"
                            value={logicConfig.replenishment.criticalStockDays}
                            onChange={(e) => updateLogicConfig('replenishment', 'criticalStockDays', e.target.value)}
                            className="w-full px-4 py-2.5 border-2 rounded-lg text-lg font-medium focus:outline-none focus:border-[#85A383]"
                            style={{ borderColor: '#85A383' }}
                          />
                        ) : (
                          <div className="px-4 py-2.5 bg-gray-50 rounded-lg border border-gray-200">
                            <span className="text-lg text-[#0C2C18] font-medium">{logicConfig.replenishment.criticalStockDays}</span>
                            <span className="text-sm text-[#878B87] ml-2 font-light">days</span>
                          </div>
                        )}
                        <p className="text-xs text-[#878B87] mt-1 font-light">Stock below this triggers critical priority</p>
                      </div>

                      <div>
                        <label className="text-xs uppercase tracking-wider font-medium text-[#0C2C18] mb-2 block">
                          High Priority Stock Days
                        </label>
                        {editingLogic === 'replenishment' ? (
                          <input
                            type="number"
                            step="0.1"
                            value={logicConfig.replenishment.highPriorityStockDays}
                            onChange={(e) => updateLogicConfig('replenishment', 'highPriorityStockDays', e.target.value)}
                            className="w-full px-4 py-2.5 border-2 rounded-lg text-lg font-medium focus:outline-none focus:border-[#85A383]"
                            style={{ borderColor: '#85A383' }}
                          />
                        ) : (
                          <div className="px-4 py-2.5 bg-gray-50 rounded-lg border border-gray-200">
                            <span className="text-lg text-[#0C2C18] font-medium">{logicConfig.replenishment.highPriorityStockDays}</span>
                            <span className="text-sm text-[#878B87] ml-2 font-light">days</span>
                          </div>
                        )}
                        <p className="text-xs text-[#878B87] mt-1 font-light">Stock below this triggers high priority</p>
                      </div>

                      <div>
                        <label className="text-xs uppercase tracking-wider font-medium text-[#0C2C18] mb-2 block">
                          Min Rate of Sale
                        </label>
                        {editingLogic === 'replenishment' ? (
                          <input
                            type="number"
                            step="0.1"
                            value={logicConfig.replenishment.minRateOfSale}
                            onChange={(e) => updateLogicConfig('replenishment', 'minRateOfSale', e.target.value)}
                            className="w-full px-4 py-2.5 border-2 rounded-lg text-lg font-medium focus:outline-none focus:border-[#85A383]"
                            style={{ borderColor: '#85A383' }}
                          />
                        ) : (
                          <div className="px-4 py-2.5 bg-gray-50 rounded-lg border border-gray-200">
                            <span className="text-lg text-[#0C2C18] font-medium">{logicConfig.replenishment.minRateOfSale}</span>
                            <span className="text-sm text-[#878B87] ml-2 font-light">units/day</span>
                          </div>
                        )}
                        <p className="text-xs text-[#878B87] mt-1 font-light">Minimum daily sales rate for replenishment</p>
                      </div>

                      <div>
                        <label className="text-xs uppercase tracking-wider font-medium text-[#0C2C18] mb-2 block">
                          Min Sell-Through %
                        </label>
                        {editingLogic === 'replenishment' ? (
                          <input
                            type="number"
                            step="1"
                            value={logicConfig.replenishment.minSellThrough}
                            onChange={(e) => updateLogicConfig('replenishment', 'minSellThrough', e.target.value)}
                            className="w-full px-4 py-2.5 border-2 rounded-lg text-lg font-medium focus:outline-none focus:border-[#85A383]"
                            style={{ borderColor: '#85A383' }}
                          />
                        ) : (
                          <div className="px-4 py-2.5 bg-gray-50 rounded-lg border border-gray-200">
                            <span className="text-lg text-[#0C2C18] font-medium">{logicConfig.replenishment.minSellThrough}</span>
                            <span className="text-sm text-[#878B87] ml-2 font-light">%</span>
                          </div>
                        )}
                        <p className="text-xs text-[#878B87] mt-1 font-light">Minimum sell-through for replenishment eligibility</p>
                      </div>

                      <div>
                        <label className="text-xs uppercase tracking-wider font-medium text-[#0C2C18] mb-2 block">
                          Safety Stock Multiplier
                        </label>
                        {editingLogic === 'replenishment' ? (
                          <input
                            type="number"
                            step="0.1"
                            value={logicConfig.replenishment.safetyStockMultiplier}
                            onChange={(e) => updateLogicConfig('replenishment', 'safetyStockMultiplier', e.target.value)}
                            className="w-full px-4 py-2.5 border-2 rounded-lg text-lg font-medium focus:outline-none focus:border-[#85A383]"
                            style={{ borderColor: '#85A383' }}
                          />
                        ) : (
                          <div className="px-4 py-2.5 bg-gray-50 rounded-lg border border-gray-200">
                            <span className="text-lg text-[#0C2C18] font-medium">{logicConfig.replenishment.safetyStockMultiplier}</span>
                            <span className="text-sm text-[#878B87] ml-2 font-light">x</span>
                          </div>
                        )}
                        <p className="text-xs text-[#878B87] mt-1 font-light">Buffer multiplier for safety stock calculation</p>
                      </div>
                    </div>
                    {editingLogic === 'replenishment' && (
                      <div className="p-5 border-t border-gray-200 flex items-center justify-end gap-3" style={{ backgroundColor: '#E7DDCA10' }}>
                        <button
                          onClick={cancelEditingLogic}
                          className="px-5 py-2.5 rounded-lg text-sm font-medium border-2 hover:bg-gray-50"
                          style={{ borderColor: '#878B87', color: '#878B87', backgroundColor: 'white' }}
                        >
                          <X className="w-4 h-4 inline mr-2" strokeWidth={1.5} />
                          Cancel
                        </button>
                        <button
                          onClick={() => saveLogicConfig('replenishment')}
                          className="px-6 py-2.5 rounded-lg text-sm font-medium shadow-md"
                          style={{ backgroundColor: '#85A383', color: 'white' }}
                        >
                          <Save className="w-4 h-4 inline mr-2" strokeWidth={1.5} />
                          Save Changes
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Movement Logic */}
                  <div className="border-2 rounded-xl overflow-hidden" style={{ borderColor: '#F4A26130' }}>
                    <div className="p-5 flex items-center justify-between" style={{ backgroundColor: '#F4A26110' }}>
                      <div>
                        <h4 className="text-lg text-[#0C2C18] font-medium">Movement Logic</h4>
                        <p className="text-sm text-[#878B87] font-light">Thresholds for triggering movement and transfer recommendations</p>
                      </div>
                      {editingLogic !== 'movement' && (
                        <button
                          onClick={() => startEditingLogic('movement')}
                          className="px-5 py-2.5 rounded-lg text-sm flex items-center gap-2 font-medium shadow-md border-2 hover:bg-gray-50"
                          style={{ borderColor: '#F4A261', color: '#F4A261', backgroundColor: 'white' }}
                        >
                          <Edit2 className="w-4 h-4" strokeWidth={1.5} />
                          Edit
                        </button>
                      )}
                    </div>
                    <div className="p-5 grid grid-cols-3 gap-6">
                      <div>
                        <label className="text-xs uppercase tracking-wider font-medium text-[#0C2C18] mb-2 block">
                          Stagnant Days Threshold
                        </label>
                        {editingLogic === 'movement' ? (
                          <input
                            type="number"
                            step="1"
                            value={logicConfig.movement.stagnantDays}
                            onChange={(e) => updateLogicConfig('movement', 'stagnantDays', e.target.value)}
                            className="w-full px-4 py-2.5 border-2 rounded-lg text-lg font-medium focus:outline-none focus:border-[#F4A261]"
                            style={{ borderColor: '#F4A261' }}
                          />
                        ) : (
                          <div className="px-4 py-2.5 bg-gray-50 rounded-lg border border-gray-200">
                            <span className="text-lg text-[#0C2C18] font-medium">{logicConfig.movement.stagnantDays}</span>
                            <span className="text-sm text-[#878B87] ml-2 font-light">days</span>
                          </div>
                        )}
                        <p className="text-xs text-[#878B87] mt-1 font-light">Days without movement to trigger action</p>
                      </div>

                      <div>
                        <label className="text-xs uppercase tracking-wider font-medium text-[#0C2C18] mb-2 block">
                          Min Rate of Sale
                        </label>
                        {editingLogic === 'movement' ? (
                          <input
                            type="number"
                            step="0.1"
                            value={logicConfig.movement.minRateOfSale}
                            onChange={(e) => updateLogicConfig('movement', 'minRateOfSale', e.target.value)}
                            className="w-full px-4 py-2.5 border-2 rounded-lg text-lg font-medium focus:outline-none focus:border-[#F4A261]"
                            style={{ borderColor: '#F4A261' }}
                          />
                        ) : (
                          <div className="px-4 py-2.5 bg-gray-50 rounded-lg border border-gray-200">
                            <span className="text-lg text-[#0C2C18] font-medium">{logicConfig.movement.minRateOfSale}</span>
                            <span className="text-sm text-[#878B87] ml-2 font-light">units/day</span>
                          </div>
                        )}
                        <p className="text-xs text-[#878B87] mt-1 font-light">Minimum acceptable sales velocity</p>
                      </div>

                      <div>
                        <label className="text-xs uppercase tracking-wider font-medium text-[#0C2C18] mb-2 block">
                          Max Stock Cover
                        </label>
                        {editingLogic === 'movement' ? (
                          <input
                            type="number"
                            step="1"
                            value={logicConfig.movement.maxStockCover}
                            onChange={(e) => updateLogicConfig('movement', 'maxStockCover', e.target.value)}
                            className="w-full px-4 py-2.5 border-2 rounded-lg text-lg font-medium focus:outline-none focus:border-[#F4A261]"
                            style={{ borderColor: '#F4A261' }}
                          />
                        ) : (
                          <div className="px-4 py-2.5 bg-gray-50 rounded-lg border border-gray-200">
                            <span className="text-lg text-[#0C2C18] font-medium">{logicConfig.movement.maxStockCover}</span>
                            <span className="text-sm text-[#878B87] ml-2 font-light">days</span>
                          </div>
                        )}
                        <p className="text-xs text-[#878B87] mt-1 font-light">Maximum days of cover before recommending movement</p>
                      </div>

                      <div>
                        <label className="text-xs uppercase tracking-wider font-medium text-[#0C2C18] mb-2 block">
                          Min Transfer Quantity
                        </label>
                        {editingLogic === 'movement' ? (
                          <input
                            type="number"
                            step="1"
                            value={logicConfig.movement.minTransferQty}
                            onChange={(e) => updateLogicConfig('movement', 'minTransferQty', e.target.value)}
                            className="w-full px-4 py-2.5 border-2 rounded-lg text-lg font-medium focus:outline-none focus:border-[#F4A261]"
                            style={{ borderColor: '#F4A261' }}
                          />
                        ) : (
                          <div className="px-4 py-2.5 bg-gray-50 rounded-lg border border-gray-200">
                            <span className="text-lg text-[#0C2C18] font-medium">{logicConfig.movement.minTransferQty}</span>
                            <span className="text-sm text-[#878B87] ml-2 font-light">units</span>
                          </div>
                        )}
                        <p className="text-xs text-[#878B87] mt-1 font-light">Minimum quantity to warrant transfer action</p>
                      </div>
                    </div>
                    {editingLogic === 'movement' && (
                      <div className="p-5 border-t border-gray-200 flex items-center justify-end gap-3" style={{ backgroundColor: '#E7DDCA10' }}>
                        <button
                          onClick={cancelEditingLogic}
                          className="px-5 py-2.5 rounded-lg text-sm font-medium border-2 hover:bg-gray-50"
                          style={{ borderColor: '#878B87', color: '#878B87', backgroundColor: 'white' }}
                        >
                          <X className="w-4 h-4 inline mr-2" strokeWidth={1.5} />
                          Cancel
                        </button>
                        <button
                          onClick={() => saveLogicConfig('movement')}
                          className="px-6 py-2.5 rounded-lg text-sm font-medium shadow-md"
                          style={{ backgroundColor: '#F4A261', color: 'white' }}
                        >
                          <Save className="w-4 h-4 inline mr-2" strokeWidth={1.5} />
                          Save Changes
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Consolidation Logic */}
                  <div className="border-2 rounded-xl overflow-hidden" style={{ borderColor: '#DF764930' }}>
                    <div className="p-5 flex items-center justify-between" style={{ backgroundColor: '#DF764910' }}>
                      <div>
                        <h4 className="text-lg text-[#0C2C18] font-medium">Consolidation Logic</h4>
                        <p className="text-sm text-[#878B87] font-light">Thresholds for warehouse pull-back recommendations</p>
                      </div>
                      {editingLogic !== 'consolidation' && (
                        <button
                          onClick={() => startEditingLogic('consolidation')}
                          className="px-5 py-2.5 rounded-lg text-sm flex items-center gap-2 font-medium shadow-md border-2 hover:bg-gray-50"
                          style={{ borderColor: '#DF7649', color: '#DF7649', backgroundColor: 'white' }}
                        >
                          <Edit2 className="w-4 h-4" strokeWidth={1.5} />
                          Edit
                        </button>
                      )}
                    </div>
                    <div className="p-5 grid grid-cols-3 gap-6">
                      <div>
                        <label className="text-xs uppercase tracking-wider font-medium text-[#0C2C18] mb-2 block">
                          Slow Moving Days
                        </label>
                        {editingLogic === 'consolidation' ? (
                          <input
                            type="number"
                            step="1"
                            value={logicConfig.consolidation.slowMovingDays}
                            onChange={(e) => updateLogicConfig('consolidation', 'slowMovingDays', e.target.value)}
                            className="w-full px-4 py-2.5 border-2 rounded-lg text-lg font-medium focus:outline-none focus:border-[#DF7649]"
                            style={{ borderColor: '#DF7649' }}
                          />
                        ) : (
                          <div className="px-4 py-2.5 bg-gray-50 rounded-lg border border-gray-200">
                            <span className="text-lg text-[#0C2C18] font-medium">{logicConfig.consolidation.slowMovingDays}</span>
                            <span className="text-sm text-[#878B87] ml-2 font-light">days</span>
                          </div>
                        )}
                        <p className="text-xs text-[#878B87] mt-1 font-light">Days threshold for slow-moving classification</p>
                      </div>

                      <div>
                        <label className="text-xs uppercase tracking-wider font-medium text-[#0C2C18] mb-2 block">
                          Min Warehouse Quantity
                        </label>
                        {editingLogic === 'consolidation' ? (
                          <input
                            type="number"
                            step="1"
                            value={logicConfig.consolidation.minWarehouseQty}
                            onChange={(e) => updateLogicConfig('consolidation', 'minWarehouseQty', e.target.value)}
                            className="w-full px-4 py-2.5 border-2 rounded-lg text-lg font-medium focus:outline-none focus:border-[#DF7649]"
                            style={{ borderColor: '#DF7649' }}
                          />
                        ) : (
                          <div className="px-4 py-2.5 bg-gray-50 rounded-lg border border-gray-200">
                            <span className="text-lg text-[#0C2C18] font-medium">{logicConfig.consolidation.minWarehouseQty}</span>
                            <span className="text-sm text-[#878B87] ml-2 font-light">units</span>
                          </div>
                        )}
                        <p className="text-xs text-[#878B87] mt-1 font-light">Minimum quantity for warehouse consolidation</p>
                      </div>

                      <div>
                        <label className="text-xs uppercase tracking-wider font-medium text-[#0C2C18] mb-2 block">
                          Pullback ROS Threshold
                        </label>
                        {editingLogic === 'consolidation' ? (
                          <input
                            type="number"
                            step="0.1"
                            value={logicConfig.consolidation.pullbackThreshold}
                            onChange={(e) => updateLogicConfig('consolidation', 'pullbackThreshold', e.target.value)}
                            className="w-full px-4 py-2.5 border-2 rounded-lg text-lg font-medium focus:outline-none focus:border-[#DF7649]"
                            style={{ borderColor: '#DF7649' }}
                          />
                        ) : (
                          <div className="px-4 py-2.5 bg-gray-50 rounded-lg border border-gray-200">
                            <span className="text-lg text-[#0C2C18] font-medium">{logicConfig.consolidation.pullbackThreshold}</span>
                            <span className="text-sm text-[#878B87] ml-2 font-light">units/day</span>
                          </div>
                        )}
                        <p className="text-xs text-[#878B87] mt-1 font-light">ROS below this triggers pullback recommendation</p>
                      </div>
                    </div>
                    {editingLogic === 'consolidation' && (
                      <div className="p-5 border-t border-gray-200 flex items-center justify-end gap-3" style={{ backgroundColor: '#E7DDCA10' }}>
                        <button
                          onClick={cancelEditingLogic}
                          className="px-5 py-2.5 rounded-lg text-sm font-medium border-2 hover:bg-gray-50"
                          style={{ borderColor: '#878B87', color: '#878B87', backgroundColor: 'white' }}
                        >
                          <X className="w-4 h-4 inline mr-2" strokeWidth={1.5} />
                          Cancel
                        </button>
                        <button
                          onClick={() => saveLogicConfig('consolidation')}
                          className="px-6 py-2.5 rounded-lg text-sm font-medium shadow-md"
                          style={{ backgroundColor: '#DF7649', color: 'white' }}
                        >
                          <Save className="w-4 h-4 inline mr-2" strokeWidth={1.5} />
                          Save Changes
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Store Management Section */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200" style={{ backgroundColor: '#E7DDCA30' }}>
                  <h3 className="text-xl text-[#0C2C18] font-medium">Store Management</h3>
                  <p className="text-sm text-[#878B87] mt-1 font-light">Activate/deactivate stores and manage brand operations</p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200" style={{ backgroundColor: '#E7DDCA20' }}>
                        <th className="py-4 px-6 text-left text-xs uppercase tracking-wider font-medium text-[#0C2C18]">Status</th>
                        <th className="py-4 px-6 text-left text-xs uppercase tracking-wider font-medium text-[#0C2C18]">Store ID</th>
                        <th className="py-4 px-6 text-left text-xs uppercase tracking-wider font-medium text-[#0C2C18]">Store Name</th>
                        <th className="py-4 px-6 text-center text-xs uppercase tracking-wider font-medium text-[#0C2C18]">Zone</th>
                        <th className="py-4 px-6 text-center text-xs uppercase tracking-wider font-medium text-[#0C2C18]">Grade</th>
                        <th className="py-4 px-6 text-center text-xs uppercase tracking-wider font-medium text-[#0C2C18]" colSpan={allBrands.length}>
                          Operating Brands
                        </th>
                      </tr>
                      <tr className="border-b border-gray-200" style={{ backgroundColor: '#E7DDCA10' }}>
                        <th colSpan={5}></th>
                        {allBrands.map(brand => (
                          <th key={brand} className="py-2 px-3 text-center text-xs font-medium text-[#878B87]">{brand}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {stores.map((store) => (
                        <tr key={store.id} className={`border-b border-gray-100 hover:bg-gray-50 ${!store.active ? 'opacity-50' : ''}`}>
                          <td className="py-4 px-6">
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={store.active}
                                onChange={() => toggleStoreActive(store.id)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#85A383]"></div>
                            </label>
                          </td>
                          <td className="py-4 px-6 text-sm font-mono text-[#878B87]">{store.id}</td>
                          <td className="py-4 px-6 text-sm text-[#0C2C18] font-medium">{store.name}</td>
                          <td className="py-4 px-6 text-center">
                            <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: '#E7DDCA', color: '#0C2C18' }}>
                              {store.zone}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-center">
                            <span className="px-3 py-1 rounded-full text-xs font-medium" style={{
                              backgroundColor: store.grade.includes('++') ? '#85A38330' : '#E7DDCA50',
                              color: store.grade.includes('++') ? '#85A383' : '#0C2C18'
                            }}>
                              {store.grade}
                            </span>
                          </td>
                          {allBrands.map(brand => (
                            <td key={brand} className="py-4 px-3 text-center">
                              <input
                                type="checkbox"
                                checked={store.brands[brand]}
                                onChange={() => toggleStoreBrand(store.id, brand)}
                                disabled={!store.active}
                                className="w-5 h-5 rounded cursor-pointer disabled:cursor-not-allowed"
                                style={{ accentColor: '#85A383' }}
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-6 border-t border-gray-200 flex justify-between items-center" style={{ backgroundColor: '#E7DDCA10' }}>
                  <div className="text-sm text-[#878B87] font-light">
                    {stores.filter(s => s.active).length} of {stores.length} stores active
                  </div>
                  <button className="px-6 py-2.5 rounded-lg text-sm font-medium shadow-md" style={{ backgroundColor: '#85A383', color: 'white' }}>
                    <Save className="w-4 h-4 inline mr-2" strokeWidth={1.5} />
                    Save Changes
                  </button>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-4 gap-6">
                {allBrands.map(brand => {
                  const activeStores = stores.filter(s => s.active && s.brands[brand]).length;
                  return (
                    <div key={brand} className="bg-white rounded-xl p-6 shadow-md">
                      <div className="text-xs uppercase tracking-wider font-medium text-[#878B87] mb-2">{brand}</div>
                      <div className="text-3xl text-[#0C2C18] font-light mb-1">{activeStores}</div>
                      <div className="text-sm text-[#878B87] font-light">Active Stores</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Save Confirmation Modal */}
      {saveConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full mx-4">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F4A26120' }}>
                  <AlertCircle className="w-6 h-6" style={{ color: '#F4A261' }} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-xl text-[#0C2C18] font-medium">Confirm Changes</h3>
                  <p className="text-sm text-[#878B87] font-light">Please provide a reason for this edit</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <label className="text-sm text-[#0C2C18] font-medium mb-2 block">
                Why are you making these changes?
              </label>
              <textarea
                placeholder="Enter your reason for modifying the recommendations..."
                value={editReasons[saveConfirmModal.itemId] || ''}
                onChange={(e) => updateEditReason(saveConfirmModal.itemId, e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#85A383] font-light resize-none"
                rows="4"
                autoFocus
              />
              <p className="text-xs text-[#878B87] font-light mt-2">
                This helps the team understand manual overrides and improves AI recommendations over time.
              </p>
            </div>

            <div className="p-6 border-t border-gray-200 flex items-center justify-end gap-3" style={{ backgroundColor: '#E7DDCA10' }}>
              <button
                onClick={cancelSaveEdits}
                className="px-5 py-2.5 rounded-lg text-sm font-medium border-2 hover:bg-gray-50"
                style={{ borderColor: '#878B87', color: '#878B87', backgroundColor: 'white' }}
              >
                Cancel
              </button>
              <button
                onClick={confirmSaveEdits}
                disabled={!editReasons[saveConfirmModal.itemId]?.trim()}
                className="px-6 py-2.5 rounded-lg text-sm font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#85A383', color: 'white' }}
              >
                <Save className="w-4 h-4 inline mr-2" strokeWidth={1.5} />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MorrieDashboard;
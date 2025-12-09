"use client"
import React, { useState } from 'react';
import { 
  Search, Camera, User, Zap, TrendingUp, Package, 
  CheckCircle, XCircle, AlertCircle, ChevronRight, Star,
  Gift, Shield, Laptop, Smartphone, Tv, Home, X, ArrowLeft,
  ThumbsUp, Award, Target, Info, MessageSquare, Plus, Brain,
  Clock, DollarSign, TrendingDown, Sparkles, Users, Bell
} from 'lucide-react';

export default function CromaAdvisorAssist() {
  const [currentView, setCurrentView] = useState('search');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [customerProfile, setCustomerProfile] = useState(null);
  const [customerData, setCustomerData] = useState(null);
  const [showDiscountCalculator, setShowDiscountCalculator] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [advisorStats] = useState({
    todayEarnings: 1620,
    weeklyRank: 3,
    nextMilestone: 3800,
    weeklyTarget: 12000,
    weeklyEarnings: 8200
  });

  const sampleCustomers = {
    '9876543210': {
      name: 'Rahul Sharma',
      phone: '9876543210',
      segment: 'Premium',
      lifetimeValue: 184500,
      lastPurchase: {
        date: '2024-08-15',
        item: 'iPhone 14 Pro 256GB',
        amount: 119900
      },
      purchaseHistory: [
        { date: '2024-08-15', item: 'iPhone 14 Pro 256GB', amount: 119900, category: 'Smartphone' },
        { date: '2023-11-20', item: 'Samsung 55" QLED TV', amount: 64600, category: 'TV' },
        { date: '2023-03-10', item: 'MacBook Air M2', amount: 0, category: 'Laptop' }
      ],
      preferences: {
        brands: ['Apple', 'Samsung', 'Sony'],
        priceRange: 'Premium (₹50K+)',
        upgradeFrequency: '12-18 months'
      },
      aiInsights: {
        nextPurchase: 'Likely to upgrade to latest iPhone in next 3 months (upgrade cycle pattern)',
        spendingPattern: 'Prefers premium brands, willing to pay for latest tech',
        bestApproach: 'Focus on innovation & exclusivity, not price. Trade-in motivates purchases.',
        objectionHistory: 'Previously concerned about warranty coverage - highlight AppleCare+',
        conversionTips: 'Responds well to "first to get new release" messaging. Values same-day setup.'
      },
      loyaltyTier: 'Gold',
      churnRisk: 'Low'
    }
  };

  const products = {
    'LAP001': {
      id: 'LAP001',
      name: 'Dell Inspiron 15 3520',
      category: 'Laptop',
      basePrice: 45990,
      cost: 39544,
      incentiveTiers: {
        atMRP: 550,
        at2Percent: 350,
        at4Percent: 250,
        atFloor: 200
      },
      stock: 8,
      image: '💻',
      pricingRules: {
        floor: 43990,
        ceiling: 45990,
        competitorMatch: true,
        maxDiscount: 4,
        minMargin: 10
      },
      competitorPrices: {
        amazon: 44990,
        flipkart: 46990,
        relianceDigital: 45490,
        vijayaSales: 45990
      },
      specs: {
        processor: 'Intel i5-1235U (12th Gen)',
        ram: '8GB DDR4',
        storage: '512GB SSD',
        display: '15.6" FHD',
        graphics: 'Intel Iris Xe',
        weight: '1.85 kg'
      },
      usps: ['Student Friendly', 'Reliable', 'Good Battery'],
      bestFor: ['Students', 'Office Work', 'Light Browsing'],
      returnRate: 2.1,
      qualityScore: 8.4,
      recentSales: 12,
      conversionRate: 18.4,
      attachRate: {
        mouse: 45,
        bag: 38,
        office: 22,
        warranty: 18
      }
    },
    'LAP002': {
      id: 'LAP002',
      name: 'HP Pavilion 15 (Ryzen 5)',
      category: 'Laptop',
      basePrice: 54990,
      cost: 46192,
      incentiveTiers: {
        atMRP: 750,
        at2Percent: 500,
        at4Percent: 380,
        atFloor: 280
      },
      stock: 12,
      image: '💻',
      pricingRules: {
        floor: 52490,
        ceiling: 54990,
        competitorMatch: true,
        maxDiscount: 5,
        minMargin: 11
      },
      competitorPrices: {
        amazon: 53990,
        flipkart: 55990,
        relianceDigital: 54490,
        vijayaSales: 54990
      },
      specs: {
        processor: 'AMD Ryzen 5 5600H',
        ram: '16GB DDR4',
        storage: '512GB SSD',
        display: '15.6" FHD IPS',
        graphics: 'AMD Radeon',
        weight: '1.75 kg'
      },
      usps: ['Better Performance', '16GB RAM', 'IPS Display'],
      bestFor: ['Students', 'Content Creation', 'Multitasking'],
      returnRate: 1.8,
      qualityScore: 8.8,
      recentSales: 18,
      conversionRate: 22.6,
      attachRate: {
        mouse: 52,
        bag: 42,
        office: 28,
        warranty: 24
      }
    },
    'LAP003': {
      id: 'LAP003',
      name: 'Lenovo IdeaPad Gaming 3',
      category: 'Laptop',
      basePrice: 64990,
      cost: 51992,
      incentiveTiers: {
        atMRP: 900,
        at2Percent: 650,
        at4Percent: 480,
        atFloor: 330
      },
      stock: 6,
      image: '💻',
      pricingRules: {
        floor: 61990,
        ceiling: 64990,
        competitorMatch: true,
        maxDiscount: 5,
        minMargin: 15
      },
      competitorPrices: {
        amazon: 62990,
        flipkart: 66990,
        relianceDigital: 63990,
        vijayaSales: 64990
      },
      specs: {
        processor: 'AMD Ryzen 5 6600H',
        ram: '16GB DDR5',
        storage: '512GB SSD',
        display: '15.6" FHD 120Hz',
        graphics: 'NVIDIA RTX 3050 4GB',
        weight: '2.25 kg'
      },
      usps: ['Gaming Ready', 'Dedicated GPU', '120Hz Display'],
      bestFor: ['Gaming', 'Video Editing', 'Design Work'],
      returnRate: 2.4,
      qualityScore: 8.6,
      recentSales: 8,
      conversionRate: 26.2,
      attachRate: {
        mouse: 68,
        bag: 48,
        coolingPad: 35,
        warranty: 32
      }
    }
  };

  const customerProfiles = [
    { 
      id: 'student', 
      label: 'Student', 
      icon: '🎓', 
      priorities: ['Budget', 'Battery Life', 'Portability'],
      insights: 'Students in Mumbai prefer 16GB RAM (62% choose when shown comparison). Office 365 attach rate: 34%.'
    },
    { 
      id: 'professional', 
      label: 'Professional', 
      icon: '💼', 
      priorities: ['Performance', 'Build Quality', 'Display'],
      insights: 'Professionals prioritize i5/Ryzen 5+ with 16GB. Prefer lighter laptops (<1.8kg). Extended warranty attach: 42%.'
    },
    { 
      id: 'gamer', 
      label: 'Gamer', 
      icon: '🎮', 
      priorities: ['GPU', 'Refresh Rate', 'Cooling'],
      insights: 'Gamers need dedicated GPU. RTX 3050+ is baseline. Cooling pad attach: 38%. Mouse/keyboard bundle: 72%.'
    },
    { 
      id: 'creator', 
      label: 'Creator', 
      icon: '🎨', 
      priorities: ['CPU', 'RAM', 'Color Accuracy'],
      insights: 'Creators need 16GB+ RAM, good display. Ryzen 5/i5 minimum. External storage attach: 45%. Adobe Suite interest: 28%.'
    }
  ];

  const calculateDynamicPrice = (product, customerSegment) => {
    const { basePrice, pricingRules, competitorPrices } = product;
    
    const lowestCompetitor = Math.min(...Object.values(competitorPrices));
    const maxDiscountAmount = basePrice * (pricingRules.maxDiscount / 100);
    const minPriceByDiscount = basePrice - maxDiscountAmount;
    const minPriceByMargin = product.cost * (1 + pricingRules.minMargin / 100);
    const effectiveFloor = Math.max(pricingRules.floor, minPriceByDiscount, minPriceByMargin);
    
    let recommendedPrice = basePrice;
    let reason = 'Standard pricing';
    
    if (lowestCompetitor < basePrice && pricingRules.competitorMatch) {
      const matchPrice = Math.max(lowestCompetitor, effectiveFloor);
      if (matchPrice >= effectiveFloor) {
        recommendedPrice = matchPrice;
        reason = `Matching ${Object.keys(competitorPrices).find(key => competitorPrices[key] === lowestCompetitor)} (₹${lowestCompetitor.toLocaleString()})`;
      }
    }
    
    if (customerSegment === 'Premium' && recommendedPrice === basePrice) {
      const premiumDiscount = Math.min(1000, maxDiscountAmount);
      recommendedPrice = Math.max(basePrice - premiumDiscount, effectiveFloor);
      reason = 'Premium customer loyalty discount';
    }
    
    const savingsFromMRP = basePrice - recommendedPrice;
    const discountPercent = ((basePrice - recommendedPrice) / basePrice * 100).toFixed(1);
    
    return {
      recommendedPrice,
      basePrice,
      floor: effectiveFloor,
      ceiling: pricingRules.ceiling,
      lowestCompetitor,
      savingsFromMRP,
      discountPercent: parseFloat(discountPercent),
      reason,
      canDiscount: recommendedPrice > effectiveFloor,
      maxAdditionalDiscount: Math.max(0, recommendedPrice - effectiveFloor)
    };
  };

  const getIncentiveAtPrice = (product, sellingPrice) => {
    const { basePrice, incentiveTiers, pricingRules } = product;
    const discountPercent = ((basePrice - sellingPrice) / basePrice * 100);
    
    if (sellingPrice >= basePrice) return incentiveTiers.atMRP;
    if (discountPercent <= 2) return incentiveTiers.at2Percent;
    if (discountPercent <= 4) return incentiveTiers.at4Percent;
    return incentiveTiers.atFloor;
  };

  const getRecommendations = (baseProduct) => {
    if (baseProduct.id === 'LAP001') {
      return {
        good: products['LAP001'],
        better: products['LAP002'],
        best: products['LAP003']
      };
    }
    return { good: null, better: null, best: null };
  };

  const getAttachments = (product) => {
    const attachments = [
      { 
        name: 'Wireless Mouse', 
        price: 899, 
        advisorIncentive: 45,
        attachRate: product.attachRate.mouse,
        pitch: 'Includes free mousepad. Ergonomic design for all-day comfort.'
      },
      { 
        name: 'Laptop Bag', 
        price: 1499, 
        advisorIncentive: 75,
        attachRate: product.attachRate.bag,
        pitch: 'Padded protection, water-resistant. Fits up to 15.6" laptops.'
      },
      { 
        name: 'MS Office Home & Student', 
        price: 5499, 
        advisorIncentive: 330,
        attachRate: product.attachRate.office || 22,
        pitch: 'Lifetime license. Essential for students and professionals.'
      },
      { 
        name: 'Extended Warranty (2 Year)', 
        price: 3999, 
        advisorIncentive: 400,
        attachRate: product.attachRate.warranty || 20,
        pitch: 'Covers accidental damage. On-site service within 48 hours.'
      }
    ];

    if (product.attachRate.coolingPad) {
      attachments.push({
        name: 'Cooling Pad',
        price: 1299,
        advisorIncentive: 65,
        attachRate: product.attachRate.coolingPad,
        pitch: 'Reduces temperature by 10-15°C. Extends laptop life.'
      });
    }

    return attachments.sort((a, b) => b.attachRate - a.attachRate);
  };

  const getTalkingPoints = (product, profile, customerData) => {
    const points = [];
    
    if (customerData) {
      if (customerData.segment === 'Premium') {
        points.push({
          icon: '👑',
          title: `Welcome Back, ${customerData.name.split(' ')[0]}!`,
          text: customerData.aiInsights.spendingPattern,
          type: 'customer'
        });
      }
      
      const hasPreferredBrand = customerData.preferences.brands.some(brand => 
        product.name.toLowerCase().includes(brand.toLowerCase())
      );
      
      if (!hasPreferredBrand) {
        points.push({
          icon: '💡',
          title: 'Based on Your History',
          text: `You typically prefer ${customerData.preferences.brands.join(', ')}. This ${product.name.split(' ')[0]} offers similar premium quality at better value.`,
          type: 'recommendation'
        });
      }
    }
    
    if (profile === 'student') {
      points.push({
        icon: '⚡',
        title: 'Perfect for Student Life',
        text: '12th gen Intel handles classes, projects, and Netflix. Battery lasts through 6-hour college day.',
        type: 'feature'
      });
    }

    if (product.specs.ram === '16GB DDR4' || product.specs.ram === '16GB DDR5') {
      points.push({
        icon: '🚀',
        title: '16GB RAM = Future-Proof',
        text: 'Most students regret buying 8GB within 6 months. 16GB handles Chrome tabs, Zoom, coding smoothly.',
        type: 'feature'
      });
    }

    if (product.specs.graphics.includes('RTX')) {
      points.push({
        icon: '🎮',
        title: 'Game + Create',
        text: 'RTX 3050 plays AAA games at 60fps. Also great for video editing, 3D work, AI projects.',
        type: 'feature'
      });
    }

    return points;
  };

  const searchCustomer = () => {
    if (sampleCustomers[phoneNumber]) {
      setCustomerData(sampleCustomers[phoneNumber]);
      setCustomerProfile(sampleCustomers[phoneNumber].purchaseHistory[0].category.toLowerCase());
    } else {
      setCustomerData(null);
      alert('Customer not found. Showing general recommendations.');
    }
  };

  const SearchView = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 bg-white border-b">
        {/* Goal Tracking Section */}
        <div className="mb-3 p-3 rounded-lg" style={{ backgroundColor: '#F5F0E8' }}>
          <div className="flex items-center justify-between gap-3 mb-2">
            <div className="flex-1">
              <div className="text-xs text-gray-600 mb-1">Today's Earnings</div>
              <div className="text-lg font-bold" style={{ color: '#85A383' }}>₹{advisorStats.todayEarnings.toLocaleString()}</div>
            </div>
            <div className="flex-1 border-l pl-3" style={{ borderColor: '#E7DDCA' }}>
              <div className="text-xs text-gray-600 mb-1">Store Rank</div>
              <div className="text-lg font-bold text-gray-900">#{advisorStats.weeklyRank}</div>
            </div>
            <div className="flex-1 border-l pl-3" style={{ borderColor: '#E7DDCA' }}>
              <div className="text-xs text-gray-600 mb-1">Next Milestone</div>
              <div className="text-base font-bold text-orange-600">₹{advisorStats.nextMilestone.toLocaleString()}</div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
              <span>Weekly Progress</span>
              <span>₹{advisorStats.weeklyEarnings.toLocaleString()} / ₹{advisorStats.weeklyTarget.toLocaleString()}</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full" 
                style={{ 
                  backgroundColor: '#85A383',
                  width: `${(advisorStats.weeklyEarnings / advisorStats.weeklyTarget) * 100}%`
                }}
              />
            </div>
          </div>
        </div>

        {/* Customer Search */}
        <div className="mb-3 p-3 rounded-lg" style={{ backgroundColor: '#85A38310' }}>
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-4 h-4" style={{ color: '#85A383' }} />
            <span className="text-sm font-medium">AI Customer Lookup</span>
          </div>
          <div className="flex gap-2">
            <input
              type="tel"
              placeholder="Enter phone number..."
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-lg text-sm"
              style={{ borderColor: '#E7DDCA' }}
            />
            <button 
              onClick={searchCustomer}
              className="px-4 py-2 rounded-lg text-white text-sm font-medium"
              style={{ backgroundColor: '#85A383' }}
            >
              Search
            </button>
          </div>
          <div className="text-xs text-gray-500 mt-2">
            Try: 9876543210 (Premium customer with purchase history)
          </div>
        </div>

        {/* Product Search */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search product name, SKU, or scan barcode..."
            className="w-full pl-10 pr-12 py-3 border-2 rounded-lg text-base"
            style={{ borderColor: '#E7DDCA' }}
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg" style={{ backgroundColor: '#85A383' }}>
            <Camera className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {customerData && (
        <div className="mx-4 mt-4 p-4 rounded-lg border-2" style={{ borderColor: '#85A383', backgroundColor: '#85A38305' }}>
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <User className="w-4 h-4" style={{ color: '#85A383' }} />
                <span className="text-base font-semibold">{customerData.name}</span>
                <span className="px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-700">
                  {customerData.loyaltyTier}
                </span>
              </div>
              <div className="text-xs text-gray-600">
                LTV: ₹{customerData.lifetimeValue.toLocaleString()} • {customerData.purchaseHistory.length} purchases
              </div>
            </div>
            <button onClick={() => setCustomerData(null)} className="p-1 hover:bg-gray-100 rounded">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2 mb-3">
            <div className="p-2 rounded" style={{ backgroundColor: '#F5F0E8' }}>
              <div className="text-xs text-gray-600 mb-1">Last Purchase</div>
              <div className="text-sm font-medium">{customerData.lastPurchase.item}</div>
              <div className="text-xs text-gray-500">{customerData.lastPurchase.date} • ₹{customerData.lastPurchase.amount.toLocaleString()}</div>
            </div>
            
            <div className="p-2 rounded" style={{ backgroundColor: '#E7DDCA' }}>
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 mt-0.5" style={{ color: '#85A383' }} />
                <div>
                  <div className="text-xs font-medium text-gray-900 mb-1">AI Recommendation</div>
                  <div className="text-xs text-gray-700 leading-relaxed">{customerData.aiInsights.bestApproach}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t" style={{ borderColor: '#85A383' }}>
            <div className="text-xs font-medium mb-2">Preferred Brands</div>
            <div className="flex flex-wrap gap-1">
              {customerData.preferences.brands.map((brand, idx) => (
                <span key={idx} className="px-2 py-1 rounded text-xs font-medium bg-white border" style={{ borderColor: '#85A383' }}>
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4">
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Categories</h3>
          <div className="grid grid-cols-4 gap-3">
            {[
              { icon: Laptop, label: 'Laptops', count: 45 },
              { icon: Smartphone, label: 'Phones', count: 89 },
              { icon: Tv, label: 'TVs', count: 34 },
              { icon: Home, label: 'Appliances', count: 67 }
            ].map((cat, idx) => (
              <button key={idx} className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 hover:bg-gray-50" style={{ borderColor: '#E7DDCA' }}>
                <cat.icon className="w-6 h-6" style={{ color: '#85A383' }} />
                <span className="text-xs font-medium">{cat.label}</span>
                <span className="text-xs text-gray-500">{cat.count} items</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-700">Popular Right Now</h3>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <TrendingUp className="w-3 h-3" />
              <span>Hot sellers</span>
            </div>
          </div>
          <div className="space-y-2">
            {Object.values(products).map(product => (
              <button
                key={product.id}
                onClick={() => {
                  setSelectedProduct(product);
                  setCurrentView('product');
                }}
                className="w-full p-3 rounded-lg border-2 hover:bg-gray-50 text-left"
                style={{ borderColor: '#E7DDCA' }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{product.image}</span>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{product.specs.processor}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700">
                        {product.conversionRate}% conv.
                      </span>
                      <span className="text-xs text-gray-500">{product.recentSales} sold this week</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-base font-semibold" style={{ color: '#85A383' }}>₹{product.basePrice.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">You earn: ₹{product.incentiveTiers.atMRP}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const ProductView = () => {
    if (!selectedProduct) return null;

    const pricingInfo = calculateDynamicPrice(selectedProduct, customerData?.segment);
    const recommendations = customerProfile ? getRecommendations(selectedProduct) : null;
    const attachments = getAttachments(selectedProduct);
    const talkingPoints = getTalkingPoints(selectedProduct, customerProfile, customerData);

    const currentIncentive = getIncentiveAtPrice(selectedProduct, pricingInfo.recommendedPrice);

    const compareOptions = recommendations ? [
      { tier: 'Budget', product: recommendations.good, recommended: false },
      { tier: 'Recommended', product: recommendations.better, recommended: true },
      { tier: 'Premium', product: recommendations.best, recommended: false }
    ] : [];

    return (
      <div className="flex flex-col h-full">
        <div className="p-4 bg-white border-b flex items-center justify-between">
          <button onClick={() => setCurrentView('search')} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-base font-medium">Product Assistant</h2>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <MessageSquare className="w-5 h-5" />
          </button>
        </div>

        <div className="p-3 border-b" style={{ backgroundColor: '#F5F0E8' }}>
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1">
              <div className="text-xs text-gray-600 mb-1">Today's Earnings</div>
              <div className="text-lg font-bold" style={{ color: '#85A383' }}>₹{advisorStats.todayEarnings.toLocaleString()}</div>
            </div>
            <div className="flex-1 border-l pl-3" style={{ borderColor: '#E7DDCA' }}>
              <div className="text-xs text-gray-600 mb-1">Store Rank</div>
              <div className="text-lg font-bold text-gray-900">#{advisorStats.weeklyRank} <span className="text-xs font-normal text-gray-500">this week</span></div>
            </div>
            <div className="flex-1 border-l pl-3" style={{ borderColor: '#E7DDCA' }}>
              <div className="text-xs text-gray-600 mb-1">Next Milestone</div>
              <div className="text-lg font-bold text-orange-600">₹{advisorStats.nextMilestone.toLocaleString()} <span className="text-xs font-normal text-gray-500">more</span></div>
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
              <span>Weekly Progress</span>
              <span>₹{advisorStats.weeklyEarnings.toLocaleString()} / ₹{advisorStats.weeklyTarget.toLocaleString()}</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full" 
                style={{ 
                  backgroundColor: '#85A383',
                  width: `${(advisorStats.weeklyEarnings / advisorStats.weeklyTarget) * 100}%`
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 border-b" style={{ backgroundColor: '#E7F6EC' }}>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg" style={{ backgroundColor: '#85A383' }}>
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-semibold text-gray-900">Your Incentive at Different Prices</span>
                </div>

                <div className="space-y-2 mb-3">
                  <div className="p-2 rounded flex justify-between items-center" style={{ backgroundColor: 'white', border: '2px solid #85A383' }}>
                    <div>
                      <div className="text-xs text-gray-600">At MRP (₹{selectedProduct.basePrice.toLocaleString()})</div>
                      <div className="text-sm font-bold text-gray-900">You earn: ₹{selectedProduct.incentiveTiers.atMRP}</div>
                    </div>
                    <Award className="w-5 h-5" style={{ color: '#85A383' }} />
                  </div>
                  
                  <div className="p-2 rounded flex justify-between items-center" style={{ backgroundColor: 'white' }}>
                    <div>
                      <div className="text-xs text-gray-600">With 2% discount (₹{Math.round(selectedProduct.basePrice * 0.98).toLocaleString()})</div>
                      <div className="text-sm font-bold text-gray-900">You earn: ₹{selectedProduct.incentiveTiers.at2Percent}</div>
                    </div>
                  </div>
                  
                  <div className="p-2 rounded flex justify-between items-center" style={{ backgroundColor: 'white' }}>
                    <div>
                      <div className="text-xs text-gray-600">With 4% discount (₹{Math.round(selectedProduct.basePrice * 0.96).toLocaleString()})</div>
                      <div className="text-sm font-bold text-gray-900">You earn: ₹{selectedProduct.incentiveTiers.at4Percent}</div>
                    </div>
                  </div>
                  
                  <div className="p-2 rounded flex justify-between items-center" style={{ backgroundColor: '#FFF3F3' }}>
                    <div>
                      <div className="text-xs text-red-600">At floor price (₹{pricingInfo.floor.toLocaleString()})</div>
                      <div className="text-sm font-bold text-red-700">You earn: ₹{selectedProduct.incentiveTiers.atFloor}</div>
                    </div>
                    <AlertCircle className="w-4 h-4 text-red-600" />
                  </div>
                </div>

                <div className="p-2 rounded text-xs" style={{ backgroundColor: '#FFF9E6' }}>
                  <div className="font-medium text-gray-900 mb-1">💡 Recommended</div>
                  <div className="text-gray-700">Sell at ₹{pricingInfo.recommendedPrice.toLocaleString()} to earn ₹{currentIncentive}. {pricingInfo.reason}</div>
                </div>
              </div>
            </div>
          </div>

          {!customerProfile && !customerData && (
            <div className="p-4 bg-yellow-50 border-b border-yellow-200">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-yellow-900 mb-2">Select Customer Type for Better Recommendations</div>
                  <div className="grid grid-cols-2 gap-2">
                    {customerProfiles.map(profile => (
                      <button
                        key={profile.id}
                        onClick={() => setCustomerProfile(profile.id)}
                        className="p-3 bg-white rounded-lg border-2 hover:bg-yellow-50 text-left"
                        style={{ borderColor: '#E7DDCA' }}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xl">{profile.icon}</span>
                          <span className="text-sm font-medium">{profile.label}</span>
                        </div>
                        <div className="text-xs text-gray-500">{profile.priorities.join(', ')}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {(customerProfile || customerData) && (
            <div className="p-4 border-b" style={{ backgroundColor: '#85A38310' }}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {customerData ? (
                    <>
                      <User className="w-4 h-4" style={{ color: '#85A383' }} />
                      <span className="text-sm font-medium">{customerData.name}</span>
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-700">
                        {customerData.segment}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-xl">{customerProfiles.find(p => p.id === customerProfile)?.icon}</span>
                      <span className="text-sm font-medium">{customerProfiles.find(p => p.id === customerProfile)?.label} Customer</span>
                    </>
                  )}
                </div>
                <button onClick={() => { setCustomerProfile(null); setCustomerData(null); }} className="text-xs text-gray-600 hover:underline">
                  Change
                </button>
              </div>
              {customerData && (
                <div className="text-xs text-gray-600 leading-relaxed mb-2">
                  💡 {customerData.aiInsights.conversionTips}
                </div>
              )}
              {!customerData && (
                <div className="text-xs text-gray-600 leading-relaxed">
                  💡 {customerProfiles.find(p => p.id === customerProfile)?.insights}
                </div>
              )}
            </div>
          )}

          {recommendations && (
            <div className="p-4 border-b">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-4 h-4" style={{ color: '#85A383' }} />
                <h3 className="text-sm font-medium text-gray-900">Compare Options</h3>
              </div>
              
              <div className="grid grid-cols-3 gap-2 mb-3">
                {compareOptions.map(({ tier, product, recommended }) => {
                  if (!product) return null;
                  const tierPricing = calculateDynamicPrice(product, customerData?.segment);
                  const isCurrentProduct = product.id === selectedProduct.id;
                  const tierIncentive = getIncentiveAtPrice(product, tierPricing.recommendedPrice);
                  
                  return (
                    <div
                      key={tier}
                      className={`p-3 rounded-lg border-2 ${isCurrentProduct ? 'bg-yellow-50' : ''} ${recommended ? 'ring-2 ring-offset-2' : ''}`}
                      style={{ 
                        borderColor: isCurrentProduct ? '#F59E0B' : recommended ? '#85A383' : '#E7DDCA',
                        ringColor: recommended ? '#85A383' : 'transparent'
                      }}
                    >
                      <div className="mb-2">
                        <div className={`text-xs font-medium px-2 py-0.5 rounded inline-block mb-1 ${
                          tier === 'Budget' ? 'bg-gray-100 text-gray-700' :
                          tier === 'Recommended' ? 'bg-green-100 text-green-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {tier}
                        </div>
                        {recommended && (
                          <div className="text-xs font-medium text-green-600 mt-1">⭐ Best value</div>
                        )}
                      </div>
                      
                      <div className="mb-2">
                        <div className="text-xs font-medium text-gray-900 mb-1 line-clamp-2">{product.name}</div>
                        <div className="text-xs text-gray-600 line-clamp-1">{product.specs.processor}</div>
                        <div className="text-xs text-gray-600">{product.specs.ram}</div>
                      </div>

                      <div className="mb-2">
                        <div className="text-sm font-bold" style={{ color: '#85A383' }}>₹{tierPricing.recommendedPrice.toLocaleString()}</div>
                      </div>

                      <div className="p-2 rounded mb-2" style={{ backgroundColor: '#F5F0E8' }}>
                        <div className="text-xs text-gray-600">You earn</div>
                        <div className="text-base font-bold text-gray-900">₹{tierIncentive}</div>
                      </div>

                      <div className="text-xs text-gray-600 mb-2">
                        {product.usps.slice(0, 2).map((usp, idx) => (
                          <div key={idx} className="flex items-start gap-1">
                            <span className="text-green-600">✓</span>
                            <span className="line-clamp-1">{usp}</span>
                          </div>
                        ))}
                      </div>

                      {!isCurrentProduct && (
                        <button
                          onClick={() => setSelectedProduct(product)}
                          className="w-full py-1.5 rounded text-xs font-medium border"
                          style={{ 
                            borderColor: '#85A383', 
                            color: '#85A383',
                            backgroundColor: 'white'
                          }}
                        >
                          View Details
                        </button>
                      )}
                      {isCurrentProduct && (
                        <div className="text-center py-1.5 text-xs font-medium text-yellow-700">
                          Currently Viewing
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {recommendations.better && (
                <div className="p-3 rounded-lg" style={{ backgroundColor: '#E7DDCA' }}>
                  <div className="text-xs font-medium text-gray-900 mb-1">💡 Why This is Recommended</div>
                  <ul className="space-y-1">
                    <li className="text-xs text-gray-700">• Higher chance of meeting customer needs ({customerProfile || 'typical'} profile)</li>
                    <li className="text-xs text-gray-700">• Better incentive for you this week (₹{getIncentiveAtPrice(recommendations.better, calculateDynamicPrice(recommendations.better, customerData?.segment).recommendedPrice)} vs ₹{getIncentiveAtPrice(recommendations.good, calculateDynamicPrice(recommendations.good, customerData?.segment).recommendedPrice)})</li>
                  </ul>
                </div>
              )}
            </div>
          )}

          {talkingPoints.length > 0 && (
            <div className="p-4 border-b">
              <div className="flex items-center gap-2 mb-3">
                <Brain className="w-4 h-4" style={{ color: '#85A383' }} />
                <h3 className="text-sm font-medium text-gray-900">AI Talking Points</h3>
              </div>
              
              <div className="space-y-3">
                {talkingPoints.map((point, idx) => (
                  <div 
                    key={idx} 
                    className={`p-3 rounded-lg ${
                      point.type === 'customer' ? 'border-2' : ''
                    }`}
                    style={{ 
                      backgroundColor: point.type === 'customer' ? '#FFF9E6' : '#F5F0E8',
                      borderColor: point.type === 'customer' ? '#F59E0B' : 'transparent'
                    }}
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-lg">{point.icon}</span>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900 mb-1">{point.title}</div>
                        <div className="text-xs text-gray-700 leading-relaxed">{point.text}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="p-4 border-b">
            <div className="flex items-center gap-2 mb-3">
              <Gift className="w-4 h-4" style={{ color: '#85A383' }} />
              <h3 className="text-sm font-medium text-gray-900">Recommended Add-Ons</h3>
            </div>
            
            <div className="space-y-2">
              {attachments.map((item, idx) => (
                <div key={idx} className="p-3 rounded-lg border" style={{ borderColor: '#E7DDCA' }}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-gray-900">{item.name}</span>
                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-700">
                          {item.attachRate}% attach
                        </span>
                      </div>
                      <div className="text-xs text-gray-600 leading-relaxed mb-2">{item.pitch}</div>
                    </div>
                    <div className="text-right ml-3">
                      <div className="text-sm font-semibold">₹{item.price.toLocaleString()}</div>
                      <div className="text-xs font-medium" style={{ color: '#85A383' }}>+₹{item.advisorIncentive}</div>
                    </div>
                  </div>
                  <button className="w-full py-2 rounded text-xs font-medium border-2" style={{ borderColor: '#85A383', color: '#85A383' }}>
                    <Plus className="w-3 h-3 inline mr-1" />
                    Add to Quote
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-3 p-3 rounded-lg" style={{ backgroundColor: '#85A38310' }}>
              <div className="text-xs font-medium mb-1" style={{ color: '#85A383' }}>📦 Bundle Opportunity</div>
              <div className="text-xs text-gray-700 mb-2">
                Laptop + Mouse + Bag + Office = Customer saves ₹1,500. You earn extra ₹850 in add-ons.
              </div>
              <div className="text-xs font-semibold text-gray-900">
                Total earning on bundle: ₹{currentIncentive + 850}
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white border-t grid grid-cols-2 gap-3">
          <button className="py-3 rounded-lg font-medium border-2" style={{ borderColor: '#85A383', color: '#85A383' }}>
            Compare with Others
          </button>
          <button className="py-3 rounded-lg font-medium text-white" style={{ backgroundColor: '#85A383' }}>
            Create Quote
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen overflow-auto bg-gray-50 max-w-md mx-auto">
      <div className="bg-white border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#85A383' }}>
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-sm font-semibold">Advisor Assist</div>
              <div className="text-xs text-gray-500">Phoenix Mumbai</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-right">
              <div className="text-xs text-gray-500">Today's Sales</div>
              <div className="text-sm font-semibold" style={{ color: '#85A383' }}>₹2.8L</div>
            </div>
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <User className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {currentView === 'search' && <SearchView />}
      {currentView === 'product' && <ProductView />}
    </div>
  );
}
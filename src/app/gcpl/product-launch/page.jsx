"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Target, ChevronRight, TrendingUp, TrendingDown, AlertCircle, Info, Sparkles, X } from 'lucide-react';

const NPDDashboard = () => {
  const [expanded, setExpanded] = useState(false);
  const [expandedRegion, setExpandedRegion] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(null);

  const launch = {
    id: 'NPD-001',
    launchId: 'L-2024-JUN-001',
    productName: 'Cinthol Cool Surf Body Wash',
    launchDate: 'June 10, 2024',
    weeksLive: '28 weeks',
    launchScope: 'Select GT stores - South, West, East',
    schemeDetails: {
      type: 'Buy 15 Get 3% Extra | Buy 30 Get 5% Extra',
      duration: 'June 2024 - November 2024 (6 months)',
      eligibility: 'All GT channels (SMT, General Stores, Chemists)',
      terms: 'Minimum order 15 units per SKU to qualify. Extra units credited within 7 days of billing.',
      performance: {
        uptake: '58% of enrolled stores',
        leakage: '11%',
        avgOrderSize: '+22% vs non-scheme stores',
        repeatRate: '36% of scheme stores reordered within 30 days'
      }
    },
    currentMetrics: {
      totalStores: '1,420 / 4,200 target',
      totalVolume: '21,800 cases',
      avgDistribution: '34% weighted',
      weeklyRunRate: '840 cases/week'
    },
    skuPerformance: {
      sku100ml: {
        name: '100ml SKU',
        mrp: '₹85',
        target: '2,400 stores',
        actual: '820 stores',
        coverage: '34%',
        volumeTarget: '12,000 cases',
        volumeActual: '7,400 cases',
        achievement: '62%',
        revenueTarget: '₹300L',
        revenueActual: '₹185L',
        weeklyRate: '285 cases/week',
        avgSellIn: {
          smt: { target: '18 units', actual: '15 units', achievement: '83%' },
          generalStores: { target: '15 units', actual: '12 units', achievement: '80%' },
          chemists: { target: '12 units', actual: '10 units', achievement: '83%' }
        },
        repeatBuying: {
          smt: '42%',
          generalStores: '36%',
          chemists: '32%'
        },
        insight: 'Entry-level SKU performing well. Strong in South (46% coverage) but weak in East (28%). Price point at ₹85 resonates with GT channel, competing effectively against Dettol and Lifebuoy body wash formats.'
      },
      sku200ml: {
        name: '200ml SKU',
        mrp: '₹155',
        target: '2,000 stores',
        actual: '460 stores',
        coverage: '23%',
        volumeTarget: '7,500 cases',
        volumeActual: '4,200 cases',
        achievement: '56%',
        revenueTarget: '₹187.5L',
        revenueActual: '₹105L',
        weeklyRate: '162 cases/week',
        avgSellIn: {
          smt: { target: '20 units', actual: '16 units', achievement: '80%' },
          generalStores: { target: '18 units', actual: '13 units', achievement: '72%' },
          chemists: { target: '15 units', actual: '11 units', achievement: '73%' }
        },
        repeatBuying: {
          smt: '38%',
          generalStores: '31%',
          chemists: '28%'
        },
        insight: 'Mid-range SKU underperforming. Better traction in urban SMT (35% coverage) vs rural general stores (18%). Faces competition from Fiama and Nivea in this price segment. Needs aggressive push.'
      },
      sku500ml: {
        name: '500ml SKU',
        mrp: '₹349',
        target: '1,400 stores',
        actual: '140 stores',
        coverage: '10%',
        volumeTarget: '3,500 cases',
        volumeActual: '800 cases',
        achievement: '23%',
        revenueTarget: '₹87.5L',
        revenueActual: '₹20L',
        weeklyRate: '31 cases/week',
        avgSellIn: {
          smt: { target: '15 units', actual: '9 units', achievement: '60%' },
          generalStores: { target: '12 units', actual: '7 units', achievement: '58%' },
          chemists: { target: '10 units', actual: '5 units', achievement: '50%' }
        },
        repeatBuying: {
          smt: '16%',
          generalStores: '12%',
          chemists: '9%'
        },
        insight: 'Premium SKU severely underperforming. High price point (₹349) limiting GT acceptance. Only 10% coverage, mostly metro SMT. This size better suited for MT/E-commerce channels.'
      }
    },
    regionalPerformance: {
      south: { 
        stores: '680 (target: 1,500)',
        coverage: '45%',
        volume100ml: '4,100 cases',
        volume200ml: '2,200 cases',
        volume500ml: '420 cases',
        totalVolume: '6,720 cases',
        totalVolumeTarget: '10,000 cases',
        volumeAchievement: '67%',
        revenue: '₹168L',
        revenueTarget: '₹250L',
        achievement: '58%',
        asmBreakdown: [
          { asm: 'Suresh Babu (TN)', stores: '280/600', volume: '2,880 cases', achievement: '74%' },
          { asm: 'Lakshmi Menon (Kerala)', stores: '220/520', volume: '2,240 cases', achievement: '65%' },
          { asm: 'Rajesh Gowda (Karnataka)', stores: '180/380', volume: '1,600 cases', achievement: '72%' }
        ],
        insight: 'Strongest region overall. Tamil Nadu and Karnataka performing well with established Cinthol brand equity. Kerala lagging due to limited urban GT penetration and preference for traditional soap formats.'
      },
      west: { 
        stores: '440 (target: 1,600)',
        coverage: '28%',
        volume100ml: '2,200 cases',
        volume200ml: '1,400 cases',
        volume500ml: '280 cases',
        totalVolume: '3,880 cases',
        totalVolumeTarget: '11,000 cases',
        volumeAchievement: '35%',
        revenue: '₹97L',
        revenueTarget: '₹275L',
        achievement: '24%',
        asmBreakdown: [
          { asm: 'Vikram Desai (Mumbai)', stores: '220/680', volume: '1,860 cases', achievement: '46%' },
          { asm: 'Sanjay Kulkarni (Pune)', stores: '140/520', volume: '1,240 cases', achievement: '38%' },
          { asm: 'Amit Shah (Gujarat)', stores: '80/400', volume: '780 cases', achievement: '28%' }
        ],
        insight: 'Moderate performance. Maharashtra urban centers (Mumbai, Pune) showing decent traction but Gujarat significantly underperforming. Strong HUL presence in Gujarat limiting penetration. Display scheme uptake only 52%.'
      },
      east: { 
        stores: '300 (target: 1,100)',
        coverage: '27%',
        volume100ml: '1,100 cases',
        volume200ml: '600 cases',
        volume500ml: '100 cases',
        totalVolume: '1,800 cases',
        totalVolumeTarget: '7,500 cases',
        volumeAchievement: '24%',
        revenue: '₹45L',
        revenueTarget: '₹187.5L',
        achievement: '18%',
        asmBreakdown: [
          { asm: 'Abhijit Mukherjee (Kolkata)', stores: '160/480', volume: '920 cases', achievement: '34%' },
          { asm: 'Ravi Prasad (Bihar)', stores: '80/380', volume: '520 cases', achievement: '18%' },
          { asm: 'Subhash Ghosh (Odisha)', stores: '60/240', volume: '360 cases', achievement: '22%' }
        ],
        insight: 'Weakest performing region. Kolkata urban markets showing some promise but Bihar and Odisha severely lagging. Distributor network gaps in Tier-2/3 towns. Cultural preference for soap bars over body wash limiting adoption.'
      }
    },
    channelPerformance: {
      smt: {
        stores: '600 (target: 1,900)',
        coverage: '32%',
        sku100ml: { stores: '520/1,400', volume: '5,200 cases', revenue: '₹130L' },
        sku200ml: { stores: '320/1,200', volume: '3,200 cases', revenue: '₹80L' },
        sku500ml: { stores: '100/800', volume: '680 cases', revenue: '₹17L' },
        totalVolume: '9,080 cases',
        totalRevenue: '₹227L',
        avgBilling: '₹37,833/store'
      },
      generalStores: {
        stores: '540 (target: 1,500)',
        coverage: '36%',
        sku100ml: { stores: '440/1,100', volume: '4,200 cases', revenue: '₹105L' },
        sku200ml: { stores: '280/900', volume: '2,600 cases', revenue: '₹65L' },
        sku500ml: { stores: '80/500', volume: '520 cases', revenue: '₹13L' },
        totalVolume: '7,320 cases',
        totalRevenue: '₹183L',
        avgBilling: '₹33,889/store'
      },
      chemists: {
        stores: '280 (target: 800)',
        coverage: '35%',
        sku100ml: { stores: '240/600', volume: '2,100 cases', revenue: '₹52.5L' },
        sku200ml: { stores: '160/500', volume: '1,400 cases', revenue: '₹35L' },
        sku500ml: { stores: '50/300', volume: '280 cases', revenue: '₹7L' },
        totalVolume: '3,780 cases',
        totalRevenue: '₹94.5L',
        avgBilling: '₹33,750/store'
      }
    },
    underperformanceReasons: [
      {
        reason: 'Low Sales Team Productivity & Training Gaps',
        severity: 'HIGH',
        impact: '~1,100 stores not covered',
        evidence: 'Current team covering 7-9 stores/day vs target of 14 stores/day. Field audits show 72% of TSRs lack confidence in body wash category positioning and competitive differentiation vs HUL/ITC products.',
        recommendation: 'Implement 3-day intensive product training for all TSRs focusing on: (1) Body wash category benefits vs soap, (2) Cinthol Cool Surf USP - menthol + ocean minerals positioning, (3) Scheme mechanics and objection handling for ₹349 SKU resistance. Deploy beat planning app with mandatory 12 stores/day target. Introduce TSR incentive for new store acquisitions.',
        metrics: {
          currentProductivity: '7-9 stores/day',
          targetProductivity: '14 stores/day',
          trainingGap: '72% TSRs need retraining'
        }
      },
      {
        reason: 'Stocks Not Billed to SS/Distributors as per Targets',
        severity: 'HIGH',
        impact: '~₹124L revenue stuck',
        evidence: 'Secondary sales at 64% vs primary sales at 85%. East region worst affected - 22 distributors holding 2.8 months stock vs 1.3 months optimal. West region at 2.2 months stock.',
        recommendation: 'Implement weekly distributor stock audit with penalty/incentive structure. Introduce distributor scheme: "Bill 75% of lifted stock within 20 days = 2.5% additional margin". Deploy DMS tracking for real-time secondary sales monitoring.',
        metrics: {
          primarySales: '85%',
          secondarySales: '64%',
          stockValue: '₹124L stuck'
        }
      }
    ],
    rootCauses: [
      {
        issue: 'Distribution Gaps in Tier-2/3 Towns (East & West)',
        severity: 'HIGH',
        impact: '~1,180 stores not covered',
        evidence: 'East: 800 targeted stores not reached, particularly Bihar (300 stores) and Odisha (180 stores). West: Gujarat shows only 28% ASM achievement - 320 stores pending. Existing distributor network concentrated in urban centers, not extended to these semi-urban/rural markets.',
        recommendation: 'Onboard 4-5 regional distributors: 2 in Bihar/Odisha, 2 in Gujarat (Surat, Vadodara). Allocate dedicated ASM for Tier-2 expansion with aggressive first 90-day acquisition targets. Consider appointing sub-distributors in high-potential taluka towns.'
      },
      {
        issue: 'Low Display Scheme Enrollment (SFA-Tracked)',
        severity: 'MEDIUM',
        impact: '~720 stores not enrolled',
        evidence: 'SFA data shows only 48% of eligible stores enrolled in display scheme. East region worst at 38% enrollment. West at 52%. Retailer feedback in SFA: "No shelf space available" (38%), "Scheme not properly explained" (32%), "Waiting to see consumer demand first" (22%).',
        recommendation: 'Launch counter-top acrylic display fixture program - compact 12-unit display requiring minimal space. Retrain TSRs on scheme enrollment with role-play scenarios. Introduce "first 100 enrollments in each territory get ₹500 fixture bonus". Target 70% enrollment by Month 10.'
      },
      {
        issue: 'Premium 500ml SKU Acceptance Issue in GT',
        severity: 'MEDIUM',
        impact: '~560 stores rejecting 500ml',
        evidence: '500ml SKU at 10% coverage vs 34% for 100ml. Retailer feedback: "Too expensive for my customer base" (62%), "No consumer demand at ₹349" (28%). Repeat rate at only 9-16% across channels. This format showing 23% achievement vs 56-62% for other SKUs.',
        recommendation: 'Consider repositioning 500ml exclusively to MT/E-commerce channels where family packs perform better. For GT, double down on 100ml and 200ml with revised targets. Alternatively, test 250ml SKU at ₹199 price point as bridge between 200ml and 500ml.'
      }
    ],
    kpiTrends: {
      distribution: [520, 740, 920, 1100, 1240, 1340, 1420],
      volume: [2800, 3200, 3500, 3400, 3700, 4000, 4200]
    }
  };

  const InfoModal = ({ type }) => {
    const content = type === 'performance' ? 
      'Performance includes distribution achievement, volume targets, revenue generation, and growth metrics.' :
      'Return on Investment measures profitability. Formula: ROI = (Net Profit / Total Investment) × 100';

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-8 z-50" onClick={() => setShowInfoModal(null)}>
        <div className="bg-white max-w-2xl w-full p-6 rounded" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-900">{type === 'performance' ? 'Performance Metrics' : 'ROI Calculation'}</h3>
            <button onClick={() => setShowInfoModal(null)}><X className="w-5 h-5" /></button>
          </div>
          <p className="text-sm text-gray-700">{content}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
      <div className="w-60 bg-white border-r border-gray-300 flex flex-col">
        <div className="p-6 border-b border-gray-300">
          <h1 className="text-2xl font-light tracking-widest" style={{ fontFamily: 'Georgia, serif', color: '#0C2C18' }}>
            MORRIE
          </h1>
          <p className="text-xs mt-1 text-gray-500">Decision Intelligence</p>
        </div>

        <nav className="flex-1 p-4">
           <Link href={"/gcpl"}> <button className="w-full flex items-center gap-3 px-4 py-3 rounded mb-2 text-gray-700">
            <Target className="w-4 h-4" />
            <span className="text-sm font-medium">Trade Promotions</span>
          </button></Link>
         
           <button className="w-full flex items-center gap-3 px-4 py-3 rounded mb-2 text-white" style={{ backgroundColor: '#0C2C18' }}>
            <ShoppingBag className="w-4 h-4" />
            <span className="text-sm font-medium">New Product Launch</span>
          </button>
        </nav>


        <div className="p-4 text-xs border-t border-gray-300 text-gray-500">
          <div className="mb-1">GCPL Portfolio • Multi-Channel</div>
          <div>December 2025</div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">

          {/* Header */}
          <div className="bg-white sticky top-0 z-10 border-b border-gray-300">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-light mb-1" style={{ fontFamily: 'Georgia, serif', color: '#0C2C18' }}>
New Product Launch Tracking
                </h2>
                <p className="text-sm text-gray-600">Distribution metrics, volume performance, and gap analysis for GT channel</p>
              </div>
            </div>
          </div>
        </div>

      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg border-l-4 border-orange-400">
            {/* Card Header */}
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs px-3 py-1 rounded bg-gray-100 text-gray-600">{launch.launchId}</span>
                    <span className="text-xs text-gray-500">{launch.launchDate} • {launch.weeksLive}</span>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">{launch.productName}</h2>
                  <p className="text-gray-600">{launch.launchScope}</p>
                </div>
                <button className="px-5 py-3 bg-green-700 text-white text-sm rounded flex items-center gap-2 hover:bg-green-800">
                  <Sparkles className="w-4 h-4" />
                  Ask Morrie
                </button>
              </div>

              {/* Current Metrics */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                {Object.entries(launch.currentMetrics).map(([key, value]) => (
                  <div key={key} className="bg-gray-50 p-4 rounded border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase mb-2">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div className="text-base font-bold text-gray-900">{value}</div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setExpanded(!expanded)}
                className="w-full py-3 border-t-2 border-gray-200 flex items-center justify-center gap-2 text-gray-700 hover:bg-gray-50"
              >
                {expanded ? 'Hide Details' : 'View Full Analysis'}
                <ChevronRight className={`w-4 h-4 transition-transform ${expanded ? 'rotate-90' : ''}`} />
              </button>
            </div>

            {/* Expanded Content */}
            {expanded && (
              <div className="border-t border-gray-300">
                {/* Scheme Details */}
                <div className="p-6 bg-gray-50 border-b border-gray-300">
                  <h3 className="text-sm font-semibold mb-4 uppercase tracking-wide text-gray-900">Launch Scheme Details & Performance</h3>
                  <div className="grid grid-cols-2 gap-5 mb-4">
                    <div className="p-5 bg-white rounded shadow-sm border border-gray-200">
                      <div className="text-xs mb-2 uppercase tracking-wide text-gray-500 font-semibold">Scheme Type</div>
                      <div className="text-lg font-bold text-gray-900">{launch.schemeDetails.type}</div>
                    </div>
                    <div className="p-5 bg-white rounded shadow-sm border border-gray-200">
                      <div className="text-xs mb-2 uppercase tracking-wide text-gray-500 font-semibold">Duration</div>
                      <div className="text-sm font-semibold text-gray-900">{launch.schemeDetails.duration}</div>
                    </div>
                    <div className="p-5 bg-white rounded shadow-sm border border-gray-200">
                      <div className="text-xs mb-2 uppercase tracking-wide text-gray-500 font-semibold">Eligibility</div>
                      <div className="text-sm font-semibold text-gray-900">{launch.schemeDetails.eligibility}</div>
                    </div>
                    <div className="p-5 bg-white rounded shadow-sm border border-gray-200">
                      <div className="text-xs mb-2 uppercase tracking-wide text-gray-500 font-semibold">Terms & Conditions</div>
                      <div className="text-xs leading-relaxed text-gray-700">{launch.schemeDetails.terms}</div>
                    </div>
                  </div>
                  
                  {/* Scheme Performance Snapshot */}
                  <div className="p-5 bg-white rounded shadow-sm border border-gray-200">
                    <div className="text-xs mb-3 uppercase tracking-wide font-semibold text-gray-900">Scheme Performance Snapshot</div>
                    <div className="grid grid-cols-4 gap-4">
                      {Object.entries(launch.schemeDetails.performance).map(([key, value]) => (
                        <div key={key} className="p-3 rounded bg-gray-50">
                          <div className="text-xs mb-1 text-gray-500">
                            {key === 'uptake' ? 'Store Uptake' : 
                             key === 'leakage' ? 'Leakage Rate' :
                             key === 'avgOrderSize' ? 'Avg Order Lift' : 'Repeat Rate'}
                          </div>
                          <div className="text-sm font-bold text-gray-900">{value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* SKU Performance */}
                <div className="p-6 border-b border-gray-300">
                  <div className="flex items-center gap-2 mb-5">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900">SKU-Wise Performance Tracking</h3>
                    <button onClick={() => setShowInfoModal('performance')} className="p-1 hover:bg-gray-100 rounded">
                      <Info className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-6">
                    {Object.values(launch.skuPerformance).map((sku, idx) => (
                      <div key={idx} className="bg-white p-5 rounded shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-gray-100">
                          <div>
                            <div className="text-lg font-bold uppercase mb-1 text-gray-900">{sku.name}</div>
                            <div className="text-xs text-gray-500">MRP: {sku.mrp}</div>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            {parseInt(sku.achievement) >= 70 ? (
                              <TrendingUp className="w-5 h-5 text-green-600" />
                            ) : parseInt(sku.achievement) >= 50 ? (
                              <AlertCircle className="w-5 h-5 text-yellow-600" />
                            ) : (
                              <TrendingDown className="w-5 h-5 text-red-600" />
                            )}
                            <span className={`text-xs px-2 py-1 rounded font-bold ${
                              parseInt(sku.achievement) >= 70 ? 'bg-green-100 text-green-700' :
                              parseInt(sku.achievement) >= 50 ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {sku.achievement}
                            </span>
                          </div>
                        </div>

                        {/* Distribution Progress */}
                        <div className="mb-4">
                          <div className="flex justify-between text-xs mb-2">
                            <span className="text-gray-500 font-semibold">Store Coverage</span>
                            <span className="text-gray-900 font-bold">{sku.actual} / {sku.target}</span>
                          </div>
                          <div className="w-full rounded-full h-2 mb-1 bg-gray-200">
                            <div className="h-2 rounded-full bg-green-600" style={{ width: sku.coverage }} />
                          </div>
                          <div className="text-xs text-right font-bold text-gray-900">{sku.coverage} Coverage</div>
                        </div>

                        {/* Key Metrics */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="p-3 rounded bg-gray-50">
                            <div className="text-xs uppercase mb-1 text-gray-500 font-semibold">Volume</div>
                            <div className="text-sm font-bold mb-1 text-gray-900">{sku.volumeActual}</div>
                            <div className="text-xs text-gray-500">Target: {sku.volumeTarget}</div>
                          </div>
                          <div className="p-3 rounded bg-gray-50">
                            <div className="text-xs uppercase mb-1 text-gray-500 font-semibold">Revenue</div>
                            <div className="text-sm font-bold mb-1 text-gray-900">{sku.revenueActual}</div>
                            <div className="text-xs text-gray-500">Target: {sku.revenueTarget}</div>
                          </div>
                          <div className="p-3 rounded bg-gray-50 col-span-2">
                            <div className="text-xs uppercase mb-1 text-gray-500 font-semibold">Weekly Run Rate</div>
                            <div className="text-sm font-bold text-gray-900">{sku.weeklyRate}</div>
                          </div>
                        </div>

                        {/* Channel Performance */}
                        <div className="mb-4 p-3 rounded bg-gray-50">
                          <div className="text-xs font-bold mb-3 uppercase tracking-wide text-gray-900">Avg Sell-in by Channel</div>
                          <div className="space-y-2">
                            {Object.entries(sku.avgSellIn).map(([channel, data]) => (
                              <div key={channel} className="flex justify-between items-center text-xs">
                                <span className="text-gray-600 uppercase font-semibold">{channel}</span>
                                <div className="flex items-center gap-2">
                                  <span className="text-gray-900 font-bold">{data.actual} / {data.target}</span>
                                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                                    parseInt(data.achievement) >= 80 ? 'bg-green-100 text-green-700' :
                                    parseInt(data.achievement) >= 60 ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-red-100 text-red-700'
                                  }`}>
                                    {data.achievement}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Repeat Buying */}
                        <div className="mb-4 p-3 rounded bg-gray-50">
                          <div className="text-xs font-bold mb-3 uppercase tracking-wide text-gray-900">Repeat Purchase Rate</div>
                          <div className="space-y-2">
                            {Object.entries(sku.repeatBuying).map(([channel, rate]) => (
                              <div key={channel} className="flex justify-between items-center text-xs">
                                <span className="text-gray-600 uppercase font-semibold">{channel}</span>
                                <span className="text-gray-900 font-bold">{rate}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Insight */}
                        <div className="p-3 rounded bg-orange-50 border-l-3 border-orange-400">
                          <div className="text-xs font-bold mb-2 uppercase text-gray-900">Key Insight</div>
                          <p className="text-xs leading-relaxed text-gray-700">{sku.insight}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Channel Performance */}
                <div className="p-6 bg-gray-50 border-b border-gray-300">
                  <h3 className="text-sm font-semibold mb-5 uppercase tracking-wide text-gray-900">Channel-Level Performance</h3>
                  
                  <div className="grid grid-cols-3 gap-5">
                    {Object.entries(launch.channelPerformance).map(([channelKey, channel]) => {
                      const channelName = channelKey === 'smt' ? 'SMT' : 
                                         channelKey === 'generalStores' ? 'General Stores' : 'Chemists';
                      
                      return (
                        <div key={channelKey} className="bg-white p-5 rounded shadow-sm border border-gray-200">
                          <div className="mb-4 pb-3 border-b-2 border-gray-100">
                            <div className="text-base font-bold uppercase mb-2 text-gray-900">{channelName}</div>
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-xs mb-1 text-gray-500 font-semibold">Coverage</div>
                                <div className="text-2xl font-bold text-gray-900">{channel.coverage}</div>
                              </div>
                              <div className="text-right">
                                <div className="text-xs text-gray-500 font-semibold">Stores</div>
                                <div className="text-sm font-bold text-gray-900">{channel.stores}</div>
                              </div>
                            </div>
                          </div>

                          {/* SKU breakdown */}
                          <div className="space-y-3 mb-4">
                            {['sku100ml', 'sku200ml', 'sku500ml'].map((skuKey, skuIdx) => (
                              <div key={skuKey} className="p-3 rounded bg-gray-50">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="text-xs font-bold uppercase text-gray-900">
                                    {skuKey === 'sku100ml' ? '100ml SKU' : skuKey === 'sku200ml' ? '200ml SKU' : '500ml SKU'}
                                  </div>
                                  <div className={`w-2 h-2 rounded-full ${
                                    skuIdx === 0 ? 'bg-green-900' : skuIdx === 1 ? 'bg-green-600' : 'bg-orange-400'
                                  }`} />
                                </div>
                                <div className="space-y-1">
                                  <div className="flex justify-between text-xs">
                                    <span className="text-gray-500 font-semibold">Stores</span>
                                    <span className="text-gray-900 font-bold">{channel[skuKey].stores}</span>
                                  </div>
                                  <div className="flex justify-between text-xs">
                                    <span className="text-gray-500 font-semibold">Volume</span>
                                    <span className="text-gray-900 font-bold">{channel[skuKey].volume}</span>
                                  </div>
                                  <div className="flex justify-between text-xs">
                                    <span className="text-gray-500 font-semibold">Revenue</span>
                                    <span className="text-gray-900 font-bold">{channel[skuKey].revenue}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Channel Totals */}
                          <div className="pt-4 border-t-2 border-gray-200">
                            <div className="grid grid-cols-2 gap-3 mb-3">
                              <div className="p-2 rounded bg-green-50">
                                <div className="text-xs mb-1 text-green-700 font-semibold">Total Volume</div>
                                <div className="text-sm font-bold text-green-700">{channel.totalVolume}</div>
                              </div>
                              <div className="p-2 rounded bg-green-50">
                                <div className="text-xs mb-1 text-green-700 font-semibold">Total Revenue</div>
                                <div className="text-sm font-bold text-green-700">{channel.totalRevenue}</div>
                              </div>
                            </div>
                            <div className="text-xs pt-2 border-t border-gray-200 text-gray-500">
                              Avg Billing: <span className="font-bold text-gray-900">{channel.avgBilling}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Regional Performance */}
                <div className="p-6 border-b border-gray-300">
                  <h3 className="text-sm font-semibold mb-5 uppercase tracking-wide text-gray-900">Regional Performance Breakdown</h3>
                  
                  <div className="space-y-4">
                    {Object.entries(launch.regionalPerformance).map(([region, regionData]) => {
                      const achievement = parseInt(regionData.achievement);
                      
                      return (
                        <div key={region} className="bg-white rounded shadow-sm border border-gray-200">
                          <div 
                            className="p-5 cursor-pointer hover:bg-gray-50"
                            onClick={() => setExpandedRegion(expandedRegion === region ? null : region)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <span className="text-base font-bold uppercase text-gray-900">{region}</span>
                                <span className={`text-xs px-3 py-1.5 rounded font-bold ${
                                  achievement >= 50 ? 'bg-green-100 text-green-700' :
                                  achievement >= 30 ? 'bg-yellow-100 text-yellow-700' :
                                  'bg-red-100 text-red-700'
                                }`}>
                                  {achievement >= 50 ? 'ON TRACK' : achievement >= 30 ? 'NEEDS FOCUS' : 'UNDERPERFORMING'}
                                </span>
                                <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-600 font-semibold">
                                  {regionData.stores}
                                </span>
                              </div>
                              <div className="flex items-center gap-6">
                                <div className="text-center">
                                  <div className="text-xs mb-1 text-gray-500 font-semibold">Coverage</div>
                                  <div className="text-lg font-bold text-gray-900">{regionData.coverage}</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-xs mb-1 text-gray-500 font-semibold">Total Volume</div>
                                  <div className="text-base font-bold text-gray-900">{regionData.totalVolume}</div>
                                  <div className="text-xs text-gray-500">/ {regionData.totalVolumeTarget}</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-xs mb-1 text-gray-500 font-semibold">Revenue</div>
                                  <div className="text-base font-bold text-gray-900">{regionData.revenue}</div>
                                  <div className="text-xs text-gray-500">/ {regionData.revenueTarget}</div>
                                </div>
                                <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${expandedRegion === region ? 'rotate-90' : ''}`} />
                              </div>
                            </div>
                          </div>

                          {expandedRegion === region && (
                            <div className="px-5 pb-5 space-y-4 border-t border-gray-200">
                              <div className="pt-4" />
                              
                              {/* SKU Volumes */}
                              <div className="grid grid-cols-4 gap-3">
                                <div className="p-3 bg-white rounded border border-gray-200">
                                  <div className="text-xs mb-1 uppercase text-gray-500 font-semibold">100ml Volume</div>
                                  <div className="text-base font-bold text-gray-900">{regionData.volume100ml}</div>
                                </div>
                                <div className="p-3 bg-white rounded border border-gray-200">
                                  <div className="text-xs mb-1 uppercase text-gray-500 font-semibold">200ml Volume</div>
                                  <div className="text-base font-bold text-gray-900">{regionData.volume200ml}</div>
                                </div>
                                <div className="p-3 bg-white rounded border border-gray-200">
                                  <div className="text-xs mb-1 uppercase text-gray-500 font-semibold">500ml Volume</div>
                                  <div className="text-base font-bold text-gray-900">{regionData.volume500ml}</div>
                                </div>
                                <div className="p-3 rounded bg-green-50 border border-green-600">
                                  <div className="text-xs mb-1 uppercase text-green-700 font-semibold">Vol Achievement</div>
                                  <div className="text-base font-bold text-green-700">{regionData.volumeAchievement}</div>
                                </div>
                              </div>

                              {/* ASM Breakdown */}
                              <div className="p-4 bg-white rounded border border-gray-200">
                                <div className="text-xs font-bold mb-3 uppercase tracking-wide text-gray-900">ASM-Level Performance</div>
                                <div className="space-y-2">
                                  {regionData.asmBreakdown.map((asm, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 rounded bg-gray-50">
                                      <div className="flex-1">
                                        <div className="text-xs font-semibold text-gray-900">{asm.asm}</div>
                                      </div>
                                      <div className="flex items-center gap-5 text-xs">
                                        <div>
                                          <span className="text-gray-500 font-semibold">Stores: </span>
                                          <span className="text-gray-900 font-bold">{asm.stores}</span>
                                        </div>
                                        <div>
                                          <span className="text-gray-500 font-semibold">Volume: </span>
                                          <span className="text-gray-900 font-bold">{asm.volume}</span>
                                        </div>
                                        <span className={`px-2 py-1 rounded font-bold ${
                                          parseInt(asm.achievement) >= 60 ? 'bg-green-100 text-green-700' :
                                          parseInt(asm.achievement) >= 40 ? 'bg-yellow-100 text-yellow-700' :
                                          'bg-red-100 text-red-700'
                                        }`}>
                                          {asm.achievement}
                                        </span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Regional Insight */}
                              <div className="p-4 rounded bg-orange-50 border-l-4 border-orange-400">
                                <div className="flex items-center gap-2 mb-2">
                                  <Info className="w-4 h-4 text-orange-500" />
                                  <div className="text-xs font-bold uppercase tracking-wide text-gray-900">Regional Insight</div>
                                </div>
                                <p className="text-xs leading-relaxed text-gray-700">{regionData.insight}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Performance Gap Analysis */}
                <div className="p-6 border-b border-gray-300">
                  <h3 className="text-sm font-semibold mb-4 uppercase tracking-wide text-gray-900">Performance Gap Analysis</h3>
                  
                  <div className="space-y-4">
                    {launch.underperformanceReasons.map((reason, idx) => (
                      <div key={idx} className={`bg-white p-5 rounded border ${reason.severity === 'HIGH' ? 'border-red-400' : 'border-yellow-400'}`}>
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-sm font-bold text-gray-900">
                                {idx + 1}. {reason.reason}
                              </span>
                              <span className={`text-xs px-3 py-1 rounded font-bold ${
                                reason.severity === 'HIGH' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                              }`}>
                                {reason.severity} SEVERITY
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-red-700">
                              <AlertCircle className="w-4 h-4" />
                              <span className="font-semibold">Impact: {reason.impact}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mb-4 p-4 rounded bg-gray-50">
                          <div className="text-xs font-bold mb-2 uppercase tracking-wide text-gray-500">Evidence & Data Points</div>
                          <p className="text-xs leading-relaxed mb-3 text-gray-700">{reason.evidence}</p>
                          
                          {reason.metrics && (
                            <div className="grid grid-cols-3 gap-3 mt-3">
                              {Object.entries(reason.metrics).map(([key, value]) => (
                                <div key={key} className="p-2 bg-white rounded">
                                  <div className="text-xs mb-1 text-gray-500">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                  </div>
                                  <div className="text-xs font-bold text-gray-900">{value}</div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="p-4 rounded bg-green-50 border-l-3 border-green-600">
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-4 h-4 text-green-600" />
                            <div className="text-xs font-bold uppercase tracking-wide text-green-700">Recommended Action Plan</div>
                          </div>
                          <p className="text-xs leading-relaxed font-medium text-gray-700">{reason.recommendation}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Root Cause Summary */}
                <div className="p-6 border-b border-gray-300">
                  <h3 className="text-sm font-semibold mb-4 uppercase tracking-wide text-gray-900">Root Cause Summary</h3>
                  
                  <div className="space-y-3">
                    {launch.rootCauses.map((cause, idx) => (
                      <div key={idx} className={`p-4 rounded bg-gray-50 border-l-3 ${
                        cause.severity === 'HIGH' ? 'border-red-600' : 'border-yellow-600'
                      }`}>
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-sm font-semibold text-gray-900">{cause.issue}</span>
                              <span className={`text-xs px-2 py-1 rounded font-semibold ${
                                cause.severity === 'HIGH' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                              }`}>
                                {cause.severity}
                              </span>
                            </div>
                            <div className="text-xs mb-2 font-semibold text-red-700">{cause.impact}</div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <div className="text-xs font-medium mb-1 uppercase text-gray-500">Evidence</div>
                            <p className="text-xs leading-relaxed text-gray-700">{cause.evidence}</p>
                          </div>
                          <div className="p-3 bg-white rounded">
                            <div className="text-xs font-medium mb-1 uppercase text-gray-500">Action</div>
                            <p className="text-xs leading-relaxed font-medium text-gray-900">{cause.recommendation}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* KPI Trends */}
                <div className="p-6 bg-gray-50">
                  <h3 className="text-sm font-semibold mb-5 uppercase tracking-wide text-gray-900">7-Month Performance Trend</h3>
                  
                  <div className="space-y-6">
                    {/* Distribution Trend */}
                    <div className="bg-white rounded shadow-sm border border-gray-200 p-5">
                      <div className="mb-4 pb-3 border-b border-gray-200">
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-sm font-bold text-gray-900">Store Distribution Growth</div>
                          <div className="flex items-center gap-1 px-2 py-1 rounded bg-green-100">
                            <TrendingUp className="w-3 h-3 text-green-600" />
                            <span className="text-xs font-bold text-green-600">+173%</span>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">vs Month 1 baseline</div>
                      </div>
                      
                      <svg width="100%" height="200" viewBox="0 0 700 200" className="mb-3">
                        {/* Grid lines */}
                        {[0, 25, 50, 75, 100].map((y) => (
                          <line
                            key={y}
                            x1="50"
                            y1={(y * 1.4) + 20}
                            x2="650"
                            y2={(y * 1.4) + 20}
                            stroke="#E5E7EB"
                            strokeWidth="1"
                          />
                        ))}
                        
                        {/* Area gradient */}
                        <defs>
                          <linearGradient id="distGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#059669" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#059669" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        
                        {/* Area fill */}
                        <path
                          d={`M 50,160 ${launch.kpiTrends.distribution.map((val, i) => {
                            const max = Math.max(...launch.kpiTrends.distribution);
                            const x = 50 + (i * 100);
                            const y = 160 - (val / max) * 130;
                            return `L ${x},${y}`;
                          }).join(' ')} L 650,160 Z`}
                          fill="url(#distGradient)"
                        />
                        
                        {/* Line */}
                        <polyline
                          points={launch.kpiTrends.distribution.map((val, i) => {
                            const max = Math.max(...launch.kpiTrends.distribution);
                            const x = 50 + (i * 100);
                            const y = 160 - (val / max) * 130;
                            return `${x},${y}`;
                          }).join(' ')}
                          fill="none"
                          stroke="#059669"
                          strokeWidth="3"
                        />
                        
                        {/* Data points */}
                        {launch.kpiTrends.distribution.map((val, i) => {
                          const max = Math.max(...launch.kpiTrends.distribution);
                          const x = 50 + (i * 100);
                          const y = 160 - (val / max) * 130;
                          return (
                            <g key={i}>
                              <circle cx={x} cy={y} r="6" fill="white" stroke="#059669" strokeWidth="2" />
                              <circle cx={x} cy={y} r="3" fill="#059669" />
                            </g>
                          );
                        })}
                      </svg>
                      
                      {/* Labels */}
                      <div className="flex justify-between px-12">
                        {launch.kpiTrends.distribution.map((val, i) => (
                          <div key={i} className="text-center">
                            <div className="text-sm font-bold text-gray-900">{val}</div>
                            <div className="text-xs text-gray-500">M{i + 1}</div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4 p-3 rounded bg-gray-50">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-500">Current Run Rate</span>
                          <span className="font-bold text-gray-900">+150 stores/month</span>
                        </div>
                      </div>
                    </div>

                    {/* Volume Trend */}
                    <div className="bg-white rounded shadow-sm border border-gray-200 p-5">
                      <div className="mb-4 pb-3 border-b border-gray-200">
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-sm font-bold text-gray-900">Monthly Volume (Cases)</div>
                          <div className="flex items-center gap-1 px-2 py-1 rounded bg-green-100">
                            <TrendingUp className="w-3 h-3 text-green-600" />
                            <span className="text-xs font-bold text-green-600">+50%</span>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">vs Month 1 baseline</div>
                      </div>
                      
                      <svg width="100%" height="200" viewBox="0 0 700 200" className="mb-3">
                        {/* Grid lines */}
                        {[0, 25, 50, 75, 100].map((y) => (
                          <line
                            key={y}
                            x1="50"
                            y1={(y * 1.4) + 20}
                            x2="650"
                            y2={(y * 1.4) + 20}
                            stroke="#E5E7EB"
                            strokeWidth="1"
                          />
                        ))}
                        
                        {/* Area gradient */}
                        <defs>
                          <linearGradient id="volGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#16A34A" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#16A34A" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        
                        {/* Area fill */}
                        <path
                          d={`M 50,160 ${launch.kpiTrends.volume.map((val, i) => {
                            const max = Math.max(...launch.kpiTrends.volume);
                            const x = 50 + (i * 100);
                            const y = 160 - (val / max) * 130;
                            return `L ${x},${y}`;
                          }).join(' ')} L 650,160 Z`}
                          fill="url(#volGradient)"
                        />
                        
                        {/* Line */}
                        <polyline
                          points={launch.kpiTrends.volume.map((val, i) => {
                            const max = Math.max(...launch.kpiTrends.volume);
                            const x = 50 + (i * 100);
                            const y = 160 - (val / max) * 130;
                            return `${x},${y}`;
                          }).join(' ')}
                          fill="none"
                          stroke="#16A34A"
                          strokeWidth="3"
                        />
                        
                        {/* Data points */}
                        {launch.kpiTrends.volume.map((val, i) => {
                          const max = Math.max(...launch.kpiTrends.volume);
                          const x = 50 + (i * 100);
                          const y = 160 - (val / max) * 130;
                          return (
                            <g key={i}>
                              <circle cx={x} cy={y} r="6" fill="white" stroke="#16A34A" strokeWidth="2" />
                              <circle cx={x} cy={y} r="3" fill="#16A34A" />
                            </g>
                          );
                        })}
                      </svg>
                      
                      {/* Labels */}
                      <div className="flex justify-between px-12">
                        {launch.kpiTrends.volume.map((val, i) => (
                          <div key={i} className="text-center">
                            <div className="text-sm font-bold text-gray-900">{val}</div>
                            <div className="text-xs text-gray-500">M{i + 1}</div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4 p-3 rounded bg-gray-50">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-500">Avg Monthly Growth</span>
                          <span className="font-bold text-gray-900">+233 cases/month</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    

      {showInfoModal && <InfoModal type={showInfoModal} />}
    </div>
  );
};

export default NPDDashboard;
import React from 'react';
import { ArrowDown, TrendingUp, Target, Zap, CheckCircle, Clock, GitBranch, CloudRain } from 'lucide-react';
import Image from 'next/image';

const CaseStudy = () => {
  return (
    <div className="w-full h-screen overflow-auto" style={{ backgroundColor: '#E7DDCA' }}>
      {/* Hero Section */}
      <div style={{ background: 'linear-gradient(135deg, #0C2C18 0%, #1B2A21 100%)' }} className="text-white">
        <div className="max-w-5xl mx-auto px-12 pt-20 pb-24">
          {/* Header */}
          <div className="flex justify-between items-center mb-16">
            <div className="text-4xl tracking-[0.3em] font-light" style={{ fontFamily: 'Georgia, serif' }}>
              QUESTT
            </div>
            <div style={{ backgroundColor: '#DF7649' }} className="text-white px-6 py-2 text-xs tracking-[0.3em] font-bold">
              CASE STUDY
            </div>
          </div>

          {/* Category Tag */}
          <div className="inline-block text-white px-8 py-3 text-sm tracking-[0.3em] font-bold mb-12" style={{ backgroundColor: '#DF7649' }}>
            CONSUMER GOODS / FMCG
          </div>

          {/* Main Title */}
          <h1 className="text-7xl leading-[1.1] mb-8 font-light" style={{ fontFamily: 'Georgia, serif' }}>
            Always-On Weather-Driven<br />
            Inventory & Discounting<br />
            <span style={{ color: '#DF7649' }}>Decisioning</span>
          </h1>

          {/* Subtitle */}
          <p className="text-2xl leading-relaxed mb-16 max-w-3xl font-light" style={{ color: '#85A383' }}>
            Transforming a global snacks & beverages leader from reactive planning to weather-intelligent, real-time operations.
          </p>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-3 gap-6">
            <div className="backdrop-blur p-6 border-l-4" style={{ backgroundColor: 'rgba(27, 42, 33, 0.6)', borderColor: '#DF7649' }}>
              <div className="text-xs tracking-wider mb-2 font-bold" style={{ color: '#DF7649' }}>OPERATIONS</div>
              <div className="text-white text-3xl font-light">Global Scale</div>
            </div>
            <div className="backdrop-blur p-6 border-l-4" style={{ backgroundColor: 'rgba(27, 42, 33, 0.6)', borderColor: '#DF7649' }}>
              <div className="text-xs tracking-wider mb-2 font-bold" style={{ color: '#DF7649' }}>SKU VARIANTS</div>
              <div className="text-white text-3xl font-light">10,000+</div>
            </div>
            <div className="backdrop-blur p-6 border-l-4" style={{ backgroundColor: 'rgba(27, 42, 33, 0.6)', borderColor: '#DF7649' }}>
              <div className="text-xs tracking-wider mb-2 font-bold" style={{ color: '#DF7649' }}>NETWORK</div>
              <div className="text-white text-3xl font-light">Multi-Echelon</div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="max-w-5xl mx-auto px-12 -mt-12 mb-20">
          <div
                 className="relative w-full aspect-video border-4 shadow-2xl overflow-hidden"
                 style={{
                   borderColor: "#E7DDCA",
                 }}
               >
                 <Image
                   src="/images/snacks-beverages-case-study.jpg"
                   alt="Premium fashion retail store interior"
                   fill
                   className="object-cover"
                   quality={95}
                   priority
                   unoptimized
                 />
               </div>
      </div>

      {/* Impact Metrics Section */}
      <div className="py-20" style={{ backgroundColor: '#DF7649' }}>
        <div className="max-w-5xl mx-auto px-12">
          <div className="flex items-center gap-4 mb-12">
            <TrendingUp className="w-8 h-8 text-white" />
            <div className="text-white text-lg tracking-[0.3em] font-bold">
              MEASURED IMPACT
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="p-10 shadow-xl" style={{ backgroundColor: '#E7DDCA' }}>
              <div className="text-7xl mb-4 font-bold" style={{ color: '#DF7649' }}>
                +1.5–2.5%
              </div>
              <div className="text-base font-bold mb-3 tracking-wide" style={{ color: '#0C2C18' }}>
                NET REVENUE UPLIFT
              </div>
              <div className="text-sm leading-relaxed" style={{ color: '#1B2A21' }}>
                In pilot lanes through fewer weather-driven lost sales and better activation targeting
              </div>
            </div>
            
            <div className="p-10 shadow-xl border-4" style={{ backgroundColor: '#0C2C18', borderColor: '#85A383' }}>
              <div className="text-7xl mb-4 font-bold" style={{ color: '#DF7649' }}>
                +0.6–1.0pp
              </div>
              <div className="text-white text-base font-bold mb-3 tracking-wide">
                GM IMPROVEMENT
              </div>
              <div className="text-sm leading-relaxed" style={{ color: '#85A383' }}>
                Through reduced blanket discounting and fewer panic price-offs
              </div>
            </div>
            
            <div className="p-10 shadow-xl border-4" style={{ backgroundColor: '#0C2C18', borderColor: '#85A383' }}>
              <div className="text-7xl mb-4 font-bold" style={{ color: '#85A383' }}>
                10–18%
              </div>
              <div className="text-white text-base font-bold mb-3 tracking-wide">
                STOCKOUT REDUCTION
              </div>
              <div className="text-sm leading-relaxed" style={{ color: '#85A383' }}>
                In weather-sensitive categories across priority depots and markets
              </div>
            </div>
            
            <div className="p-10 shadow-xl" style={{ backgroundColor: '#E7DDCA' }}>
              <div className="text-7xl mb-4 font-bold" style={{ color: '#85A383' }}>
                8–15%
              </div>
              <div className="text-base font-bold mb-3 tracking-wide" style={{ color: '#0C2C18' }}>
                WRITE-OFF REDUCTION
              </div>
              <div className="text-sm leading-relaxed" style={{ color: '#1B2A21' }}>
                In near-expiry SKUs through earlier routing and controlled markdown ladders
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Company Context */}
      <div className="max-w-5xl mx-auto px-12 py-24">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#DF7649' }}>
            <Target className="w-6 h-6 text-white" />
          </div>
          <div className="text-lg tracking-[0.3em] font-bold" style={{ color: '#DF7649' }}>
            THE BUSINESS
          </div>
        </div>
        
        <h2 className="text-6xl mb-8 leading-tight font-light" style={{ fontFamily: 'Georgia, serif', color: '#0C2C18' }}>
          A global snacks & beverages leader losing to <span style={{ color: '#DF7649' }} className="font-normal">weather volatility</span>
        </h2>
        
        <div className="space-y-6 text-lg leading-relaxed mb-16" style={{ color: '#1B2A21' }}>
          <p>
            A <strong style={{ color: '#0C2C18' }}>global snacks & beverages leader</strong> with large-scale GT + MT distribution, 
            where demand is heavily influenced by weather and local events.
          </p>
          
          <p>
            The complexity is profound. <strong style={{ color: '#DF7649' }}>10,000+ SKUs and pack variants</strong> across 
            weather-sensitive categories (cold drinks, hydration, salty snacks, impulse packs) that show sharp demand swings 
            by micro-market and week.
          </p>
        </div>

        {/* Complexity Table */}
        <div className="bg-white border-4 shadow-xl mb-20" style={{ borderColor: '#0C2C18' }}>
          <div className="px-8 py-5 flex items-center gap-3" style={{ backgroundColor: '#0C2C18' }}>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#DF7649' }}></div>
            <h3 className="text-base tracking-wider font-bold text-white">OPERATIONAL COMPLEXITY</h3>
          </div>
          <table className="w-full">
            <tbody>
              <tr className="border-b-2" style={{ borderColor: '#E7DDCA' }}>
                <td className="px-8 py-6 font-bold text-base w-1/3" style={{ color: '#DF7649', backgroundColor: 'rgba(223, 118, 73, 0.1)' }}>Scale</td>
                <td className="px-8 py-6" style={{ color: '#1B2A21' }}>National operations across multiple categories; high volume, low unit economics</td>
              </tr>
              <tr className="border-b-2" style={{ borderColor: '#E7DDCA' }}>
                <td className="px-8 py-6 font-bold text-base" style={{ color: '#DF7649', backgroundColor: 'rgba(223, 118, 73, 0.1)' }}>Route-to-Market</td>
                <td className="px-8 py-6" style={{ color: '#1B2A21' }}>Multi-echelon network: plants → DCs → depots → distributors → outlets with variable lead times</td>
              </tr>
              <tr className="border-b-2" style={{ borderColor: '#E7DDCA' }}>
                <td className="px-8 py-6 font-bold text-base" style={{ color: '#DF7649', backgroundColor: 'rgba(223, 118, 73, 0.1)' }}>Demand Volatility</td>
                <td className="px-8 py-6" style={{ color: '#1B2A21' }}>Weather-sensitive categories show sharp swings by micro-market; temperature, rainfall, humidity drive spikes</td>
              </tr>
              <tr>
                <td className="px-8 py-6 text-white font-bold text-base" style={{ backgroundColor: '#0C2C18' }}>Real Constraint</td>
                <td className="px-8 py-6" style={{ color: '#1B2A21', backgroundColor: 'rgba(223, 118, 73, 0.05)' }}><strong style={{ color: '#DF7649' }}>Mis-timing and mis-attribution:</strong> inventory in wrong node when weather spikes; discounting blamed for shifts actually caused by weather/events</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* The Real Problem */}
      <div className="py-24" style={{ backgroundColor: 'rgba(223, 118, 73, 0.08)' }}>
        <div className="max-w-5xl mx-auto px-12">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#DF7649' }}>
              <CloudRain className="w-6 h-6 text-white" />
            </div>
            <div className="text-lg tracking-[0.3em] font-bold" style={{ color: '#DF7649' }}>
              THE DECISION PROBLEM
            </div>
          </div>
          
          <h2 className="text-6xl mb-12 leading-tight font-light" style={{ fontFamily: 'Georgia, serif', color: '#0C2C18' }}>
            Shock-driven demand that <span style={{ color: '#DF7649' }} className="font-normal">changes everything</span>
          </h2>
          
          <div className="space-y-6 text-lg leading-relaxed mb-16" style={{ color: '#1B2A21' }}>
            <p>
              In snacks & beverages, demand isn't just "trend + seasonality." It's <strong style={{ color: '#0C2C18' }}>shock-driven</strong>. 
              Weather and events create sudden spikes or drops that vary sharply by city, channel, and pack type.
            </p>
            
            <p className="font-bold text-xl" style={{ color: '#0C2C18' }}>
              Every week—sometimes every day—teams must decide:
            </p>
          </div>

          {/* Decision Flowchart */}
          <div className="space-y-4">
            <div className="bg-white border-l-8 p-8 shadow-lg flex items-start gap-6" style={{ borderColor: '#DF7649' }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0" style={{ backgroundColor: '#DF7649' }}>1</div>
              <div className="flex-1">
                <div className="font-bold text-xl mb-2" style={{ color: '#0C2C18' }}>Where will demand spike next week?</div>
                <div className="text-base" style={{ color: '#1B2A21' }}>By micro-market, not just region. Weather patterns differ drastically city to city.</div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <ArrowDown className="w-8 h-8" style={{ color: '#DF7649' }} />
            </div>
            
            <div className="p-8 shadow-lg flex items-start gap-6 border-l-8" style={{ backgroundColor: '#0C2C18', borderColor: '#85A383' }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0" style={{ backgroundColor: '#85A383', color: '#0C2C18' }}>2</div>
              <div className="flex-1">
                <div className="text-white font-bold text-xl mb-2">Do we have inventory in the right node to capture it?</div>
                <div className="text-base" style={{ color: '#85A383' }}>Depot vs DC vs distributor vs outlet? Stock in the wrong place = lost sale.</div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <ArrowDown className="w-8 h-8" style={{ color: '#DF7649' }} />
            </div>
            
            <div className="bg-white border-l-8 p-8 shadow-lg flex items-start gap-6" style={{ borderColor: '#DF7649' }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0" style={{ backgroundColor: '#DF7649' }}>3</div>
              <div className="flex-1">
                <div className="font-bold text-xl mb-2" style={{ color: '#0C2C18' }}>Should a promo run here, now?</div>
                <div className="text-base" style={{ color: '#1B2A21' }}>Or will weather do the lifting naturally? What discount depth is actually required?</div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <ArrowDown className="w-8 h-8" style={{ color: '#DF7649' }} />
            </div>
            
            <div className="p-8 shadow-lg flex items-start gap-6 border-l-8" style={{ backgroundColor: '#DF7649', borderColor: '#0C2C18' }}>
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-2xl font-bold flex-shrink-0" style={{ color: '#DF7649' }}>4</div>
              <div className="flex-1">
                <div className="text-white font-bold text-xl mb-2">Are we confusing weather-lift with promo-lift?</div>
                <div className="text-white text-base opacity-90"><strong>Wrong attribution = wrong future plans.</strong> Teams keep learning the wrong lesson.</div>
              </div>
            </div>
          </div>

          {/* Why Legacy Planning Breaks */}
          <div className="mt-16 p-10 bg-white border-4 shadow-xl" style={{ borderColor: '#0C2C18' }}>
            <h3 className="text-2xl font-bold mb-6" style={{ color: '#0C2C18' }}>Why Legacy Planning Breaks</h3>
            <ul className="space-y-4 text-base" style={{ color: '#1B2A21' }}>
              <li className="flex items-start gap-3">
                <div className="w-3 h-3 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#DF7649' }}></div>
                <span>Treats weather as a "nice-to-have overlay," not a decision driver</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-3 h-3 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#DF7649' }}></div>
                <span>Updates too slowly (weekly cadence) while weather shocks play out in days</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-3 h-3 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#DF7649' }}></div>
                <span>Can't separate why volume moved (promo vs weather vs event)</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-3 h-3 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#DF7649' }}></div>
                <span>Inventory actions and promo actions live in separate teams and timelines</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Solution Section */}
      <div className="py-24" style={{ background: 'linear-gradient(135deg, #0C2C18 0%, #1B2A21 100%)' }}>
        <div className="max-w-5xl mx-auto px-12">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#DF7649' }}>
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div className="text-lg tracking-[0.3em] font-bold" style={{ color: '#DF7649' }}>
              THE QUESTT APPROACH
            </div>
          </div>
          
          <h2 className="text-white text-6xl mb-12 leading-tight font-light" style={{ fontFamily: 'Georgia, serif' }}>
            One unified <span style={{ color: '#DF7649' }} className="font-normal">weather-driven decision layer</span>
          </h2>
          
          <p className="text-xl leading-loose mb-16" style={{ color: '#85A383' }}>
            Questt deployed an <strong className="text-white">Always-On Weather-Driven Decisioning (WDD) layer</strong> that 
            connected three loops into one system: weather-driven demand sensing, inventory positioning + replenishment actions, 
            and promo/discounting guardrails and optimization.
          </p>

          {/* Solution Components */}
          <div className="space-y-8">
            {/* Weather-Driven Inventory Positioning */}
            <div className="p-10 shadow-2xl border-l-8" style={{ backgroundColor: '#E7DDCA', borderColor: '#DF7649' }}>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#DF7649' }}></div>
                <div className="text-3xl font-bold" style={{ color: '#DF7649' }}>
                  Weather-Driven Inventory Positioning
                </div>
              </div>
              
              <div className="space-y-6 text-base">
                <div className="p-6 rounded" style={{ backgroundColor: 'rgba(223, 118, 73, 0.1)' }}>
                  <div className="font-bold mb-3 text-lg" style={{ color: '#DF7649' }}>Micro-Market Sensitivity Mapping</div>
                  <div style={{ color: '#1B2A21' }}>Heat spikes affect hydration packs differently than family packs. Rainfall impacts impulse consumption patterns differently across GT vs MT. The system models category + pack sensitivity by micro-geography.</div>
                </div>
                <div className="p-6 rounded" style={{ backgroundColor: 'rgba(223, 118, 73, 0.1)' }}>
                  <div className="font-bold mb-3 text-lg" style={{ color: '#DF7649' }}>Pre-Emptive Node Placement</div>
                  <div style={{ color: '#1B2A21' }}>Lead time and "node placement" matter more than total inventory. The right action is often repositioning before the spike hits, not reacting after—respecting lane constraints and service-level priorities.</div>
                </div>
                <div className="p-6 rounded" style={{ backgroundColor: 'rgba(223, 118, 73, 0.1)' }}>
                  <div className="font-bold mb-3 text-lg" style={{ color: '#DF7649' }}>Multi-Echelon Optimization</div>
                  <div style={{ color: '#1B2A21' }}>Inventory moves respect capacity, service-level priorities, and channel protection (some SKUs must be protected for MT, others for GT)—avoiding lost sales during weather spikes without increasing overall inventory.</div>
                </div>
              </div>
            </div>

            {/* Promo Readiness + Guardrails */}
            <div className="p-10 shadow-2xl border-l-8" style={{ backgroundColor: '#1B2A21', borderColor: '#85A383' }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#85A383' }}></div>
                <div className="text-3xl font-bold" style={{ color: '#85A383' }}>
                  Promo Readiness + Guardrails
                </div>
              </div>
              
              <div className="space-y-6 text-base leading-relaxed" style={{ color: '#85A383' }}>
                <div className="p-6 rounded" style={{ backgroundColor: 'rgba(133, 163, 131, 0.1)' }}>
                  <div className="font-bold mb-3 text-lg" style={{ color: '#85A383' }}>Promo Gating by Readiness</div>
                  <div>If projected cover is below threshold, the system recommends delay / re-scope / reposition first. Prevents promo-driven stockouts.</div>
                </div>
                <div className="p-6 rounded" style={{ backgroundColor: 'rgba(133, 163, 131, 0.1)' }}>
                  <div className="font-bold mb-3 text-lg" style={{ color: '#85A383' }}>Weather-Aware Targeting</div>
                  <div>Activate promos only in geographies where the weather shock makes conversion likely. Avoid broad activation that creates margin leakage with limited incremental lift.</div>
                </div>
                <div className="p-6 rounded" style={{ backgroundColor: 'rgba(133, 163, 131, 0.1)' }}>
                  <div className="font-bold mb-3 text-lg" style={{ color: '#85A383' }}>In-Flight Correction</div>
                  <div>If weather forecast changes mid-week, Questt recommends shift promo scope (cities/depots), shift inventory (pre-emptive moves), or pause/extend mechanisms based on outcomes.</div>
                </div>
              </div>
            </div>

            {/* Precision Discounting */}
            <div className="p-10 shadow-2xl border-l-8" style={{ backgroundColor: '#E7DDCA', borderColor: '#DF7649' }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#DF7649' }}></div>
                <div className="text-3xl font-bold" style={{ color: '#DF7649' }}>
                  Precision Discounting
                </div>
              </div>
              
              <div className="space-y-6 text-base leading-relaxed" style={{ color: '#1B2A21' }}>
                <div className="p-6 rounded" style={{ backgroundColor: 'rgba(223, 118, 73, 0.1)' }}>
                  <div className="font-bold mb-3 text-lg" style={{ color: '#DF7649' }}>Avoid Discounting into Weather Uplift</div>
                  <div>If WDD predicts natural demand lift, Questt recommends holding price or lighter activation. Prevents unnecessary gross margin surrender.</div>
                </div>
                <div className="p-6 rounded" style={{ backgroundColor: 'rgba(223, 118, 73, 0.1)' }}>
                  <div className="font-bold mb-3 text-lg" style={{ color: '#DF7649' }}>Targeted Ladders for Genuine Risk</div>
                  <div>Markdown ladders only where inventory is at risk (near-expiry, weak sell-out pockets). Depth and duration vary by channel/micro-market response.</div>
                </div>
                <div className="p-6 rounded" style={{ backgroundColor: 'rgba(223, 118, 73, 0.1)' }}>
                  <div className="font-bold mb-3 text-lg" style={{ color: '#DF7649' }}>Cannibalization Control</div>
                  <div>Prevent discounts that just shift volume from a higher-margin pack to a lower-margin pack. Protect portfolio profitability.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Solution Architecture Section */}
      <div className="py-24" style={{ backgroundColor: '#E7DDCA' }}>
        <div className="max-w-5xl mx-auto px-12">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#85A383' }}>
              <GitBranch className="w-6 h-6 text-white" />
            </div>
            <div className="text-lg tracking-[0.3em] font-bold" style={{ color: '#85A383' }}>
              TECHNICAL FOUNDATION
            </div>
          </div>

          <h2 className="text-5xl mb-16 leading-tight font-light" style={{ fontFamily: 'Georgia, serif', color: '#0C2C18' }}>
            The intelligence layer that powers <span style={{ color: '#DF7649' }}>weather-driven decisions</span>
          </h2>

          {/* Business Knowledge Graph */}
          <div className="mb-16">
            <h3 className="text-2xl mb-6 font-bold" style={{ color: '#0C2C18' }}>1. Business Knowledge Graph</h3>
            <div className="w-full bg-white border-4 shadow-xl p-8" style={{ borderColor: '#85A383' }}>
              <div className="text-center mb-6">
                <div className="text-lg tracking-wider font-bold" style={{ color: '#0C2C18' }}>UNIFIED DATA FABRIC</div>
                <div className="text-sm opacity-70" style={{ color: '#1B2A21' }}>
                  All business entities + weather signals connected in real-time
                </div>
              </div>
              
              {/* Network Visualization - Comprehensive */}
              <svg viewBox="0 0 1600 950" className="w-full h-[750px]" style={{ backgroundColor: '#E7DDCA' }}>
                {/* Dense connection web */}
                <g opacity="0.08" stroke="#0C2C18" strokeWidth="0.6">
                  {/* Product connections */}
                  <line x1="150" y1="100" x2="350" y2="100" />
                  <line x1="150" y1="100" x2="550" y2="140" />
                  <line x1="150" y1="100" x2="750" y2="100" />
                  <line x1="150" y1="100" x2="150" y2="480" />
                  
                  {/* Weather connections - more prominent */}
                  <line x1="350" y1="100" x2="550" y2="140" />
                  <line x1="350" y1="100" x2="750" y2="100" />
                  <line x1="350" y1="100" x2="1200" y2="100" />
                  <line x1="350" y1="100" x2="650" y2="670" />
                  <line x1="350" y1="100" x2="1350" y2="570" />
                  <line x1="350" y1="100" x2="950" y2="310" />
                  
                  {/* Demand driver connections */}
                  <line x1="550" y1="140" x2="750" y2="100" />
                  <line x1="550" y1="140" x2="950" y2="140" />
                  <line x1="550" y1="140" x2="1400" y2="100" />
                  
                  {/* Order connections */}
                  <line x1="750" y1="100" x2="950" y2="140" />
                  <line x1="750" y1="100" x2="1200" y2="100" />
                  <line x1="750" y1="100" x2="750" y2="310" />
                  
                  {/* Promo/RGM connections */}
                  <line x1="950" y1="140" x2="1200" y2="100" />
                  <line x1="950" y1="140" x2="750" y2="310" />
                  <line x1="950" y1="140" x2="1150" y2="310" />
                  <line x1="950" y1="140" x2="1350" y2="310" />
                  
                  {/* Customer connections */}
                  <line x1="1200" y1="100" x2="1400" y2="100" />
                  <line x1="1200" y1="100" x2="1350" y2="310" />
                  
                  {/* Channel connections */}
                  <line x1="750" y1="310" x2="950" y2="310" />
                  <line x1="750" y1="310" x2="750" y2="480" />
                  <line x1="750" y1="310" x2="1200" y2="480" />
                  <line x1="750" y1="310" x2="1500" y2="310" />
                  
                  {/* Territory connections */}
                  <line x1="950" y1="310" x2="1150" y2="310" />
                  <line x1="950" y1="310" x2="950" y2="690" />
                  <line x1="950" y1="310" x2="1200" y2="480" />
                  
                  {/* Execution connections */}
                  <line x1="1150" y1="310" x2="1350" y2="310" />
                  <line x1="1150" y1="310" x2="1200" y2="480" />
                  
                  {/* Finance connections */}
                  <line x1="1350" y1="310" x2="1500" y2="310" />
                  <line x1="1350" y1="310" x2="1350" y2="570" />
                  
                  {/* Inventory connections */}
                  <line x1="150" y1="480" x2="350" y2="530" />
                  <line x1="150" y1="480" x2="550" y2="530" />
                  <line x1="150" y1="480" x2="350" y2="690" />
                  
                  {/* Plant connections */}
                  <line x1="350" y1="530" x2="550" y2="530" />
                  <line x1="350" y1="530" x2="350" y2="690" />
                  <line x1="350" y1="530" x2="750" y2="530" />
                  
                  {/* DC connections */}
                  <line x1="550" y1="530" x2="750" y2="480" />
                  <line x1="550" y1="530" x2="950" y2="530" />
                  <line x1="550" y1="530" x2="350" y2="690" />
                  
                  {/* Depot connections */}
                  <line x1="750" y1="480" x2="950" y2="530" />
                  <line x1="750" y1="480" x2="1200" y2="480" />
                  <line x1="750" y1="480" x2="950" y2="690" />
                  
                  {/* Logistics connections */}
                  <line x1="950" y1="530" x2="1150" y2="530" />
                  <line x1="950" y1="530" x2="950" y2="690" />
                  
                  {/* Service connections */}
                  <line x1="1150" y1="530" x2="1350" y2="530" />
                  <line x1="1150" y1="530" x2="1200" y2="690" />
                  
                  {/* Outlet connections */}
                  <line x1="1200" y1="480" x2="1400" y2="480" />
                  <line x1="1200" y1="480" x2="950" y2="690" />
                  <line x1="1200" y1="480" x2="1350" y2="570" />
                  
                  {/* Planning connections */}
                  <line x1="350" y1="690" x2="600" y2="690" />
                  <line x1="600" y1="690" x2="950" y2="690" />
                  <line x1="650" y1="670" x2="950" y2="690" />
                  
                  {/* Exception/Decision connections */}
                  <line x1="1200" y1="690" x2="1350" y2="570" />
                  <line x1="1350" y1="570" x2="1500" y2="690" />
                </g>
                
                {/* ROW 1 - DEMAND DRIVERS & CUSTOMERS (Top) */}
                
                {/* PRODUCT */}
                <g>
                  <circle cx="150" cy="100" r="42" fill="#0C2C18" stroke="#DF7649" strokeWidth="3" />
                  <text x="150" y="100" textAnchor="middle" fill="#E7DDCA" fontSize="13" fontWeight="bold" dy="0.3em">Product</text>
                  
                  <circle cx="95" cy="160" r="20" fill="#1B2A21" opacity="0.9" />
                  <text x="95" y="160" textAnchor="middle" fill="#E7DDCA" fontSize="9" dy="0.3em">SKU</text>
                  
                  <circle cx="150" cy="175" r="17" fill="#85A383" opacity="0.9" />
                  <text x="150" y="175" textAnchor="middle" fill="#0C2C18" fontSize="8" dy="0.3em">Pack</text>
                  
                  <circle cx="205" cy="160" r="17" fill="#85A383" opacity="0.9" />
                  <text x="205" y="160" textAnchor="middle" fill="#0C2C18" fontSize="8" dy="0.3em">Price</text>
                  
                  <circle cx="95" cy="40" r="15" fill="#85A383" opacity="0.85" />
                  <text x="95" y="40" textAnchor="middle" fill="#0C2C18" fontSize="7" dy="0.3em">Brand</text>
                  
                  <circle cx="205" cy="40" r="15" fill="#85A383" opacity="0.85" />
                  <text x="205" y="40" textAnchor="middle" fill="#0C2C18" fontSize="7" dy="0.3em">Expiry</text>
                </g>
                
                {/* WEATHER - HIGHLIGHTED */}
                <g>
                  <circle cx="350" cy="100" r="48" fill="#DF7649" stroke="#0C2C18" strokeWidth="4" />
                  <text x="350" y="100" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" dy="0.3em">Weather</text>
                  
                  <circle cx="285" cy="175" r="21" fill="#DF7649" opacity="0.85" />
                  <text x="285" y="175" textAnchor="middle" fill="white" fontSize="9" dy="0.3em">Temp</text>
                  
                  <circle cx="350" cy="188" r="21" fill="#DF7649" opacity="0.85" />
                  <text x="350" y="188" textAnchor="middle" fill="white" fontSize="9" dy="0.3em">Rain</text>
                  
                  <circle cx="415" cy="175" r="21" fill="#DF7649" opacity="0.85" />
                  <text x="415" y="175" textAnchor="middle" fill="white" fontSize="9" dy="0.3em">Humid</text>
                  
                  <circle cx="300" cy="35" r="16" fill="#DF7649" opacity="0.75" />
                  <text x="300" y="35" textAnchor="middle" fill="white" fontSize="7" dy="0.3em">Event</text>
                  
                  <circle cx="400" cy="35" r="16" fill="#DF7649" opacity="0.75" />
                  <text x="400" y="35" textAnchor="middle" fill="white" fontSize="7" dy="0.3em">Season</text>
                </g>
                
                {/* DEMAND DRIVERS */}
                <g>
                  <circle cx="550" cy="140" r="28" fill="#1B2A21" opacity="0.9" />
                  <text x="550" y="140" textAnchor="middle" fill="#E7DDCA" fontSize="10" fontWeight="bold" dy="0.3em">Demand</text>
                  
                  <circle cx="505" cy="195" r="16" fill="#85A383" opacity="0.9" />
                  <text x="505" y="195" textAnchor="middle" fill="#0C2C18" fontSize="7" dy="0.3em">Occasion</text>
                  
                  <circle cx="595" cy="195" r="16" fill="#85A383" opacity="0.9" />
                  <text x="595" y="195" textAnchor="middle" fill="#0C2C18" fontSize="6" dy="0.3em">Elasticity</text>
                  
                  <circle cx="550" cy="213" r="14" fill="#85A383" opacity="0.85" />
                  <text x="550" y="213" textAnchor="middle" fill="#0C2C18" fontSize="6" dy="0.3em">Compet</text>
                </g>
                
                {/* ORDER */}
                <g>
                  <circle cx="750" cy="100" r="42" fill="#0C2C18" stroke="#DF7649" strokeWidth="3" />
                  <text x="750" y="100" textAnchor="middle" fill="#E7DDCA" fontSize="13" fontWeight="bold" dy="0.3em">Order</text>
                  
                  <circle cx="690" cy="35" r="20" fill="#1B2A21" opacity="0.9" />
                  <text x="690" y="35" textAnchor="middle" fill="#E7DDCA" fontSize="9" dy="0.3em">Line</text>
                  
                  <circle cx="810" cy="35" r="20" fill="#1B2A21" opacity="0.9" />
                  <text x="810" y="35" textAnchor="middle" fill="#E7DDCA" fontSize="9" dy="0.3em">PO</text>
                  
                  <circle cx="750" cy="165" r="15" fill="#85A383" opacity="0.9" />
                  <text x="750" y="165" textAnchor="middle" fill="#0C2C18" fontSize="7" dy="0.3em">Return</text>
                </g>
                
                {/* PROMO/RGM */}
                <g>
                  <circle cx="950" cy="140" r="32" fill="#DF7649" opacity="0.9" />
                  <text x="950" y="140" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" dy="0.3em">Promo</text>
                  
                  <circle cx="895" cy="200" r="18" fill="#DF7649" opacity="0.75" />
                  <text x="895" y="200" textAnchor="middle" fill="white" fontSize="8" dy="0.3em">Discount</text>
                  
                  <circle cx="950" cy="212" r="18" fill="#DF7649" opacity="0.75" />
                  <text x="950" y="212" textAnchor="middle" fill="white" fontSize="8" dy="0.3em">Scheme</text>
                  
                  <circle cx="1005" cy="200" r="18" fill="#DF7649" opacity="0.75" />
                  <text x="1005" y="200" textAnchor="middle" fill="white" fontSize="8" dy="0.3em">ROI</text>
                  
                  <circle cx="900" cy="80" r="14" fill="#DF7649" opacity="0.65" />
                  <text x="900" y="80" textAnchor="middle" fill="white" fontSize="6" dy="0.3em">Increm</text>
                  
                  <circle cx="1000" cy="80" r="14" fill="#DF7649" opacity="0.65" />
                  <text x="1000" y="80" textAnchor="middle" fill="white" fontSize="6" dy="0.3em">Canib</text>
                </g>
                
                {/* CUSTOMER */}
                <g>
                  <circle cx="1200" cy="100" r="42" fill="#0C2C18" stroke="#DF7649" strokeWidth="3" />
                  <text x="1200" y="100" textAnchor="middle" fill="#E7DDCA" fontSize="13" fontWeight="bold" dy="0.3em">Customer</text>
                  
                  <circle cx="1140" cy="160" r="20" fill="#1B2A21" opacity="0.9" />
                  <text x="1140" y="160" textAnchor="middle" fill="#E7DDCA" fontSize="9" dy="0.3em">Segment</text>
                  
                  <circle cx="1260" cy="160" r="20" fill="#1B2A21" opacity="0.9" />
                  <text x="1260" y="160" textAnchor="middle" fill="#E7DDCA" fontSize="9" dy="0.3em">Account</text>
                  
                  <circle cx="1200" cy="40" r="15" fill="#85A383" opacity="0.9" />
                  <text x="1200" y="40" textAnchor="middle" fill="#0C2C18" fontSize="7" dy="0.3em">Banner</text>
                </g>
                
                {/* PRICING */}
                <g>
                  <circle cx="1400" cy="100" r="26" fill="#1B2A21" opacity="0.9" />
                  <text x="1400" y="100" textAnchor="middle" fill="#E7DDCA" fontSize="10" fontWeight="bold" dy="0.3em">Pricing</text>
                  
                  <circle cx="1360" cy="150" r="15" fill="#85A383" opacity="0.9" />
                  <text x="1360" y="150" textAnchor="middle" fill="#0C2C18" fontSize="7" dy="0.3em">MRP</text>
                  
                  <circle cx="1440" cy="150" r="15" fill="#85A383" opacity="0.9" />
                  <text x="1440" y="150" textAnchor="middle" fill="#0C2C18" fontSize="6" dy="0.3em">NetReal</text>
                </g>
                
                {/* ROW 2 - CHANNELS, TERRITORY, EXECUTION (Middle) */}
                
                {/* CHANNEL */}
                <g>
                  <circle cx="750" cy="310" r="35" fill="#1B2A21" opacity="0.9" />
                  <text x="750" y="310" textAnchor="middle" fill="#E7DDCA" fontSize="11" fontWeight="bold" dy="0.3em">Channel</text>
                  
                  <circle cx="690" cy="375" r="19" fill="#85A383" opacity="0.9" />
                  <text x="690" y="375" textAnchor="middle" fill="#0C2C18" fontSize="8" dy="0.3em">GT</text>
                  
                  <circle cx="750" cy="388" r="19" fill="#85A383" opacity="0.9" />
                  <text x="750" y="388" textAnchor="middle" fill="#0C2C18" fontSize="8" dy="0.3em">MT</text>
                  
                  <circle cx="810" cy="375" r="19" fill="#85A383" opacity="0.9" />
                  <text x="810" y="375" textAnchor="middle" fill="#0C2C18" fontSize="8" dy="0.3em">Ecom</text>
                  
                  <circle cx="685" cy="245" r="14" fill="#85A383" opacity="0.85" />
                  <text x="685" y="245" textAnchor="middle" fill="#0C2C18" fontSize="6" dy="0.3em">Food</text>
                  
                  <circle cx="815" cy="245" r="14" fill="#85A383" opacity="0.85" />
                  <text x="815" y="245" textAnchor="middle" fill="#0C2C18" fontSize="6" dy="0.3em">Conv</text>
                </g>
                
                {/* TERRITORY */}
                <g>
                  <circle cx="950" cy="310" r="30" fill="#1B2A21" opacity="0.9" />
                  <text x="950" y="310" textAnchor="middle" fill="#E7DDCA" fontSize="10" fontWeight="bold" dy="0.3em">Territory</text>
                  
                  <circle cx="900" cy="368" r="17" fill="#85A383" opacity="0.9" />
                  <text x="900" y="368" textAnchor="middle" fill="#0C2C18" fontSize="7" dy="0.3em">Zone</text>
                  
                  <circle cx="1000" cy="368" r="17" fill="#85A383" opacity="0.9" />
                  <text x="1000" y="368" textAnchor="middle" fill="#0C2C18" fontSize="7" dy="0.3em">Beat</text>
                  
                  <circle cx="950" cy="387" r="14" fill="#85A383" opacity="0.85" />
                  <text x="950" y="387" textAnchor="middle" fill="#0C2C18" fontSize="6" dy="0.3em">Rep</text>
                </g>
                
                {/* EXECUTION */}
                <g>
                  <circle cx="1150" cy="310" r="30" fill="#1B2A21" opacity="0.9" />
                  <text x="1150" y="310" textAnchor="middle" fill="#E7DDCA" fontSize="10" fontWeight="bold" dy="0.3em">Execution</text>
                  
                  <circle cx="1095" cy="368" r="17" fill="#85A383" opacity="0.9" />
                  <text x="1095" y="368" textAnchor="middle" fill="#0C2C18" fontSize="6" dy="0.3em">Plano</text>
                  
                  <circle cx="1150" cy="380" r="17" fill="#85A383" opacity="0.9" />
                  <text x="1150" y="380" textAnchor="middle" fill="#0C2C18" fontSize="6" dy="0.3em">Cooler</text>
                  
                  <circle cx="1205" cy="368" r="17" fill="#85A383" opacity="0.9" />
                  <text x="1205" y="368" textAnchor="middle" fill="#0C2C18" fontSize="6" dy="0.3em">Shelf</text>
                </g>
                
                {/* PERFORMANCE */}
                <g>
                  <circle cx="1350" cy="310" r="28" fill="#1B2A21" opacity="0.9" />
                  <text x="1350" y="310" textAnchor="middle" fill="#E7DDCA" fontSize="9" fontWeight="bold" dy="0.3em">Perform</text>
                  
                  <circle cx="1310" cy="362" r="15" fill="#85A383" opacity="0.9" />
                  <text x="1310" y="362" textAnchor="middle" fill="#0C2C18" fontSize="6" dy="0.3em">Share</text>
                  
                  <circle cx="1390" cy="362" r="15" fill="#85A383" opacity="0.9" />
                  <text x="1390" y="362" textAnchor="middle" fill="#0C2C18" fontSize="6" dy="0.3em">Growth</text>
                </g>
                
                {/* LOST SALES */}
                <g>
                  <circle cx="1500" cy="310" r="25" fill="#DF7649" opacity="0.85" />
                  <text x="1500" y="305" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" dy="0.3em">Lost</text>
                  <text x="1500" y="318" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" dy="0.3em">Sales</text>
                </g>
                
                {/* ROW 3 - SUPPLY CHAIN (Bottom) */}
                
                {/* INVENTORY */}
                <g>
                  <circle cx="150" cy="480" r="42" fill="#0C2C18" stroke="#85A383" strokeWidth="3" />
                  <text x="150" y="480" textAnchor="middle" fill="#E7DDCA" fontSize="12" fontWeight="bold" dy="0.3em">Inventory</text>
                  
                  <circle cx="90" cy="545" r="20" fill="#1B2A21" opacity="0.9" />
                  <text x="90" y="545" textAnchor="middle" fill="#E7DDCA" fontSize="8" dy="0.3em">OnHand</text>
                  
                  <circle cx="210" cy="545" r="20" fill="#1B2A21" opacity="0.9" />
                  <text x="210" y="545" textAnchor="middle" fill="#E7DDCA" fontSize="8" dy="0.3em">Transit</text>
                  
                  <circle cx="150" cy="568" r="15" fill="#85A383" opacity="0.9" />
                  <text x="150" y="568" textAnchor="middle" fill="#0C2C18" fontSize="7" dy="0.3em">DOS</text>
                  
                  <circle cx="90" cy="415" r="14" fill="#85A383" opacity="0.85" />
                  <text x="90" y="415" textAnchor="middle" fill="#0C2C18" fontSize="6" dy="0.3em">Shrink</text>
                  
                  <circle cx="210" cy="415" r="14" fill="#85A383" opacity="0.85" />
                  <text x="210" y="415" textAnchor="middle" fill="#0C2C18" fontSize="6" dy="0.3em">Damage</text>
                </g>
                
                {/* PLANT */}
                <g>
                  <circle cx="350" cy="530" r="32" fill="#1B2A21" opacity="0.9" />
                  <text x="350" y="530" textAnchor="middle" fill="#E7DDCA" fontSize="10" fontWeight="bold" dy="0.3em">Plant</text>
                  
                  <circle cx="300" cy="590" r="17" fill="#85A383" opacity="0.9" />
                  <text x="300" y="590" textAnchor="middle" fill="#0C2C18" fontSize="7" dy="0.3em">Capacity</text>
                  
                  <circle cx="400" cy="590" r="17" fill="#85A383" opacity="0.9" />
                  <text x="400" y="590" textAnchor="middle" fill="#0C2C18" fontSize="7" dy="0.3em">Line</text>
                  
                  <circle cx="350" cy="465" r="14" fill="#85A383" opacity="0.85" />
                  <text x="350" y="465" textAnchor="middle" fill="#0C2C18" fontSize="6" dy="0.3em">Material</text>
                </g>
                
                {/* PRIMARY DC */}
                <g>
                  <circle cx="550" cy="530" r="34" fill="#1B2A21" opacity="0.9" />
                  <text x="550" y="525" textAnchor="middle" fill="#E7DDCA" fontSize="9" fontWeight="bold" dy="0.3em">Primary</text>
                  <text x="550" y="540" textAnchor="middle" fill="#E7DDCA" fontSize="8" dy="0.3em">DC</text>
                  
                  <circle cx="495" cy="593" r="17" fill="#85A383" opacity="0.9" />
                  <text x="495" y="593" textAnchor="middle" fill="#0C2C18" fontSize="7" dy="0.3em">Stock</text>
                  
                  <circle cx="605" cy="593" r="17" fill="#85A383" opacity="0.9" />
                  <text x="605" y="593" textAnchor="middle" fill="#0C2C18" fontSize="7" dy="0.3em">Alloc</text>
                  
                  <circle cx="550" cy="612" r="14" fill="#85A383" opacity="0.85" />
                  <text x="550" y="612" textAnchor="middle" fill="#0C2C18" fontSize="6" dy="0.3em">Safety</text>
                </g>
                
                {/* DEPOT */}
                <g>
                  <circle cx="750" cy="480" r="32" fill="#1B2A21" opacity="0.9" />
                  <text x="750" y="480" textAnchor="middle" fill="#E7DDCA" fontSize="10" fontWeight="bold" dy="0.3em">Depot</text>
                  
                  <circle cx="700" cy="540" r="17" fill="#85A383" opacity="0.9" />
                  <text x="700" y="540" textAnchor="middle" fill="#0C2C18" fontSize="7" dy="0.3em">Lead</text>
                  
                  <circle cx="800" cy="540" r="17" fill="#85A383" opacity="0.9" />
                  <text x="800" y="540" textAnchor="middle" fill="#0C2C18" fontSize="7" dy="0.3em">OTIF</text>
                  
                  <circle cx="750" cy="415" r="14" fill="#85A383" opacity="0.85" />
                  <text x="750" y="415" textAnchor="middle" fill="#0C2C18" fontSize="6" dy="0.3em">Cover</text>
                </g>
                
                {/* LOGISTICS */}
                <g>
                  <circle cx="950" cy="530" r="30" fill="#1B2A21" opacity="0.9" />
                  <text x="950" y="530" textAnchor="middle" fill="#E7DDCA" fontSize="9" fontWeight="bold" dy="0.3em">Logistics</text>
                  
                  <circle cx="900" cy="588" r="16" fill="#85A383" opacity="0.9" />
                  <text x="900" y="588" textAnchor="middle" fill="#0C2C18" fontSize="7" dy="0.3em">Lane</text>
                  
                  <circle cx="1000" cy="588" r="16" fill="#85A383" opacity="0.9" />
                  <text x="1000" y="588" textAnchor="middle" fill="#0C2C18" fontSize="7" dy="0.3em">Carrier</text>
                  
                  <circle cx="950" cy="465" r="14" fill="#85A383" opacity="0.85" />
                  <text x="950" y="465" textAnchor="middle" fill="#0C2C18" fontSize="6" dy="0.3em">CTS</text>
                </g>
                
                {/* SERVICE */}
                <g>
                  <circle cx="1150" cy="530" r="30" fill="#1B2A21" opacity="0.9" />
                  <text x="1150" y="530" textAnchor="middle" fill="#E7DDCA" fontSize="9" fontWeight="bold" dy="0.3em">Service</text>
                  
                  <circle cx="1095" cy="588" r="16" fill="#85A383" opacity="0.9" />
                  <text x="1095" y="588" textAnchor="middle" fill="#0C2C18" fontSize="6" dy="0.3em">Fill Rate</text>
                  
                  <circle cx="1205" cy="588" r="16" fill="#85A383" opacity="0.9" />
                  <text x="1205" y="588" textAnchor="middle" fill="#0C2C18" fontSize="6" dy="0.3em">StockOut</text>
                  
                  <circle cx="1150" cy="465" r="14" fill="#85A383" opacity="0.85" />
                  <text x="1150" y="465" textAnchor="middle" fill="#0C2C18" fontSize="6" dy="0.3em">Target</text>
                </g>
                
                {/* OUTLET */}
                <g>
                  <circle cx="1200" cy="480" r="42" fill="#0C2C18" stroke="#85A383" strokeWidth="3" />
                  <text x="1200" y="480" textAnchor="middle" fill="#E7DDCA" fontSize="12" fontWeight="bold" dy="0.3em">Outlet</text>
                  
                  <circle cx="1140" cy="545" r="20" fill="#1B2A21" opacity="0.9" />
                  <text x="1140" y="545" textAnchor="middle" fill="#E7DDCA" fontSize="8" dy="0.3em">Store</text>
                  
                  <circle cx="1260" cy="545" r="20" fill="#1B2A21" opacity="0.9" />
                  <text x="1260" y="545" textAnchor="middle" fill="#E7DDCA" fontSize="8" dy="0.3em">Format</text>
                  
                  <circle cx="1200" cy="568" r="15" fill="#85A383" opacity="0.9" />
                  <text x="1200" y="568" textAnchor="middle" fill="#0C2C18" fontSize="7" dy="0.3em">OSA</text>
                  
                  <circle cx="1200" cy="415" r="14" fill="#85A383" opacity="0.85" />
                  <text x="1200" y="415" textAnchor="middle" fill="#0C2C18" fontSize="6" dy="0.3em">Footfall</text>
                </g>
                
                {/* DISTRIBUTOR */}
                <g>
                  <circle cx="1400" cy="480" r="26" fill="#1B2A21" opacity="0.9" />
                  <text x="1400" y="480" textAnchor="middle" fill="#E7DDCA" fontSize="8" fontWeight="bold" dy="0.3em">Distributor</text>
                  
                  <circle cx="1400" cy="530" r="14" fill="#85A383" opacity="0.85" />
                  <text x="1400" y="530" textAnchor="middle" fill="#0C2C18" fontSize="6" dy="0.3em">Sub-D</text>
                </g>
                
                {/* ROW 4 - PLANNING & DECISIONS (Very Bottom) */}
                
                {/* PLANNING */}
                <g>
                  <circle cx="350" cy="690" r="26" fill="#1B2A21" opacity="0.9" />
                  <text x="350" y="690" textAnchor="middle" fill="#E7DDCA" fontSize="9" fontWeight="bold" dy="0.3em">Planning</text>
                  
                  <circle cx="310" cy="742" r="15" fill="#85A383" opacity="0.9" />
                  <text x="310" y="742" textAnchor="middle" fill="#0C2C18" fontSize="6" dy="0.3em">Baseline</text>
                  
                  <circle cx="390" cy="742" r="15" fill="#85A383" opacity="0.9" />
                  <text x="390" y="742" textAnchor="middle" fill="#0C2C18" fontSize="6" dy="0.3em">Accuracy</text>
                </g>
                
                {/* REPLENISH */}
                <g>
                  <circle cx="600" cy="690" r="26" fill="#1B2A21" opacity="0.9" />
                  <text x="600" y="690" textAnchor="middle" fill="#E7DDCA" fontSize="9" fontWeight="bold" dy="0.3em">Reorder</text>
                  
                  <circle cx="560" cy="742" r="15" fill="#85A383" opacity="0.9" />
                  <text x="560" y="742" textAnchor="middle" fill="#0C2C18" fontSize="6" dy="0.3em">Policy</text>
                  
                  <circle cx="640" cy="742" r="15" fill="#85A383" opacity="0.9" />
                  <text x="640" y="742" textAnchor="middle" fill="#0C2C18" fontSize="6" dy="0.3em">Trigger</text>
                </g>
                
                {/* FORECAST */}
                <g>
                  <circle cx="650" cy="670" r="28" fill="#DF7649" opacity="0.85" />
                  <text x="650" y="670" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" dy="0.3em">Forecast</text>
                  
                  <circle cx="610" cy="625" r="14" fill="#DF7649" opacity="0.75" />
                  <text x="610" y="625" textAnchor="middle" fill="white" fontSize="6" dy="0.3em">Uplift</text>
                  
                  <circle cx="690" cy="625" r="14" fill="#DF7649" opacity="0.75" />
                  <text x="690" y="625" textAnchor="middle" fill="white" fontSize="6" dy="0.3em">Bias</text>
                </g>
                
                {/* ALLOCATION */}
                <g>
                  <circle cx="950" cy="690" r="24" fill="#1B2A21" opacity="0.9" />
                  <text x="950" y="690" textAnchor="middle" fill="#E7DDCA" fontSize="8" fontWeight="bold" dy="0.3em">Allocation</text>
                </g>
                
                {/* EXCEPTION */}
                <g>
                  <circle cx="1200" cy="690" r="26" fill="#DF7649" opacity="0.85" />
                  <text x="1200" y="690" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" dy="0.3em">Exception</text>
                  
                  <circle cx="1160" cy="742" r="14" fill="#DF7649" opacity="0.75" />
                  <text x="1160" y="742" textAnchor="middle" fill="white" fontSize="6" dy="0.3em">Risk</text>
                  
                  <circle cx="1240" cy="742" r="14" fill="#DF7649" opacity="0.75" />
                  <text x="1240" y="742" textAnchor="middle" fill="white" fontSize="6" dy="0.3em">Opport</text>
                </g>
                
                {/* WDD DECISION */}
                <g>
                  <circle cx="1350" cy="570" r="34" fill="#DF7649" opacity="0.9" />
                  <text x="1350" y="565" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" dy="0.3em">WDD</text>
                  <text x="1350" y="582" textAnchor="middle" fill="white" fontSize="9" dy="0.3em">Decision</text>
                  
                  <circle cx="1305" cy="630" r="16" fill="#DF7649" opacity="0.75" />
                  <text x="1305" y="630" textAnchor="middle" fill="white" fontSize="7" dy="0.3em">Action</text>
                  
                  <circle cx="1395" cy="630" r="16" fill="#DF7649" opacity="0.75" />
                  <text x="1395" y="630" textAnchor="middle" fill="white" fontSize="7" dy="0.3em">Impact</text>
                </g>
                
                {/* SCENARIO */}
                <g>
                  <circle cx="1500" cy="690" r="26" fill="#DF7649" opacity="0.85" />
                  <text x="1500" y="690" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" dy="0.3em">Scenario</text>
                </g>
                
                {/* FINANCE - added to bottom area */}
                <g>
                  <circle cx="1350" cy="310" r="30" fill="#1B2A21" opacity="0.9" />
                  <text x="1350" y="310" textAnchor="middle" fill="#E7DDCA" fontSize="9" fontWeight="bold" dy="0.3em">Finance</text>
                  
                  <circle cx="1305" cy="368" r="16" fill="#85A383" opacity="0.9" />
                  <text x="1305" y="368" textAnchor="middle" fill="#0C2C18" fontSize="6" dy="0.3em">COGS</text>
                  
                  <circle cx="1350" cy="380" r="16" fill="#85A383" opacity="0.9" />
                  <text x="1350" y="380" textAnchor="middle" fill="#0C2C18" fontSize="6" dy="0.3em">Margin</text>
                  
                  <circle cx="1395" cy="368" r="16" fill="#85A383" opacity="0.9" />
                  <text x="1395" y="368" textAnchor="middle" fill="#0C2C18" fontSize="6" dy="0.3em">WC</text>
                </g>
              </svg>
            </div>
          </div>

          {/* Agentic Structure */}
          <div className="mb-12">
            <h3 className="text-2xl mb-6 font-bold" style={{ color: '#0C2C18' }}>2. The Agentic Structure</h3>
            <div className="w-full border-4 shadow-xl p-12" style={{ borderColor: '#85A383', background: 'linear-gradient(135deg, #E7DDCA 0%, #F5F0E8 100%)' }}>
              <div className="text-center mb-12">
                <div className="text-lg tracking-wider font-bold mb-2" style={{ color: '#0C2C18' }}>COORDINATED DECISION TEAM</div>
                <div className="text-sm" style={{ color: '#1B2A21', opacity: 0.7 }}>
                  Orchestrator coordinates SME agents who collaborate to deliver unified insights
                </div>
              </div>
              
              <div className="space-y-12">
                {/* ORCHESTRATOR */}
                <div className="flex justify-center">
                  <div className="relative w-[500px]">
                    <div className="absolute inset-0 blur-xl opacity-30" style={{ backgroundColor: '#DF7649' }}></div>
                    <div className="relative p-8 rounded-xl shadow-2xl border-2" style={{ 
                      background: 'linear-gradient(135deg, #0C2C18 0%, #1B2A21 100%)',
                      borderColor: '#DF7649'
                    }}>
                      <div className="text-center">
                        <div className="text-2xl font-bold mb-3" style={{ color: '#E7DDCA' }}>Orchestrator</div>
                        <div className="text-sm leading-relaxed" style={{ color: '#85A383' }}>
                          Breaks questions, assigns to SMEs, calls multiple times
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Connection Lines */}
                <div className="flex justify-center">
                  <div className="grid grid-cols-6 gap-2 w-full max-w-5xl">
                    {[1,2,3,4,5,6].map((i) => (
                      <div key={i} className="flex flex-col items-center">
                        <div className="w-0.5 h-8" style={{ backgroundColor: '#0C2C18', opacity: 0.3 }}></div>
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#DF7649' }}></div>
                        <div className="w-0.5 h-8" style={{ backgroundColor: '#0C2C18', opacity: 0.3 }}></div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* SME AGENTS */}
                <div>
                  <div className="text-center mb-6">
                    <div className="inline-block px-6 py-2 rounded-full text-xs font-bold tracking-wider" style={{ 
                      backgroundColor: '#85A383',
                      color: 'white'
                    }}>
                      SME AGENTS - Domain Experts
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-6 gap-3">
                    <div className="group">
                      <div className="relative">
                        <div className="relative p-5 rounded-lg shadow-lg border-2 transition-all group-hover:shadow-2xl" style={{ 
                          background: 'linear-gradient(135deg, rgba(12, 44, 24, 0.95) 0%, rgba(27, 42, 33, 0.95) 100%)',
                          borderColor: '#DF7649'
                        }}>
                          <div className="text-center">
                            <div className="text-sm font-bold mb-2" style={{ color: '#E7DDCA' }}>Inventory Agent</div>
                            <div className="text-xs leading-relaxed space-y-0.5" style={{ color: '#85A383' }}>
                              <div>Levels</div>
                              <div>Moves</div>
                              <div>Nodes</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="group">
                      <div className="relative">
                        <div className="relative p-5 rounded-lg shadow-lg border-2 transition-all group-hover:shadow-2xl" style={{ 
                          background: 'linear-gradient(135deg, rgba(12, 44, 24, 0.95) 0%, rgba(27, 42, 33, 0.95) 100%)',
                          borderColor: '#DF7649'
                        }}>
                          <div className="text-center">
                            <div className="text-sm font-bold mb-2" style={{ color: '#E7DDCA' }}>Product Agent</div>
                            <div className="text-xs leading-relaxed space-y-0.5" style={{ color: '#85A383' }}>
                              <div>SKUs</div>
                              <div>Packs</div>
                              <div>Pricing</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="group">
                      <div className="relative">
                        <div className="relative p-5 rounded-lg shadow-lg border-2 transition-all group-hover:shadow-2xl" style={{ 
                          background: 'linear-gradient(135deg, rgba(223, 118, 73, 0.95) 0%, rgba(191, 100, 62, 0.95) 100%)',
                          borderColor: '#0C2C18'
                        }}>
                          <div className="text-center">
                            <div className="text-sm font-bold mb-2 text-white">Weather Agent</div>
                            <div className="text-xs leading-relaxed space-y-0.5 text-white opacity-90">
                              <div>Forecasts</div>
                              <div>Patterns</div>
                              <div>Events</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="group">
                      <div className="relative">
                        <div className="relative p-5 rounded-lg shadow-lg border-2 transition-all group-hover:shadow-2xl" style={{ 
                          background: 'linear-gradient(135deg, rgba(12, 44, 24, 0.95) 0%, rgba(27, 42, 33, 0.95) 100%)',
                          borderColor: '#DF7649'
                        }}>
                          <div className="text-center">
                            <div className="text-sm font-bold mb-2" style={{ color: '#E7DDCA' }}>Sales Agent</div>
                            <div className="text-xs leading-relaxed space-y-0.5" style={{ color: '#85A383' }}>
                              <div>Orders</div>
                              <div>POS</div>
                              <div>Returns</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="group">
                      <div className="relative">
                        <div className="relative p-5 rounded-lg shadow-lg border-2 transition-all group-hover:shadow-2xl" style={{ 
                          background: 'linear-gradient(135deg, rgba(12, 44, 24, 0.95) 0%, rgba(27, 42, 33, 0.95) 100%)',
                          borderColor: '#DF7649'
                        }}>
                          <div className="text-center">
                            <div className="text-sm font-bold mb-2" style={{ color: '#E7DDCA' }}>Channel Agent</div>
                            <div className="text-xs leading-relaxed space-y-0.5" style={{ color: '#85A383' }}>
                              <div>GT/MT</div>
                              <div>Outlets</div>
                              <div>Coverage</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="group">
                      <div className="relative">
                        <div className="relative p-5 rounded-lg shadow-lg border-2 transition-all group-hover:shadow-2xl" style={{ 
                          background: 'linear-gradient(135deg, rgba(12, 44, 24, 0.95) 0%, rgba(27, 42, 33, 0.95) 100%)',
                          borderColor: '#DF7649'
                        }}>
                          <div className="text-center">
                            <div className="text-sm font-bold mb-2" style={{ color: '#E7DDCA' }}>Promo Agent</div>
                            <div className="text-xs leading-relaxed space-y-0.5" style={{ color: '#85A383' }}>
                              <div>Offers</div>
                              <div>Timing</div>
                              <div>ROI</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center mt-6">
                    <div className="text-xs italic" style={{ color: '#85A383' }}>
                      Weather Agent collaborates with all agents to separate weather-lift from promo-lift
                    </div>
                  </div>
                </div>

                {/* Connection Lines */}
                <div className="flex justify-center">
                  <div className="grid grid-cols-6 gap-2 w-full max-w-5xl">
                    {[1,2,3,4,5,6].map((i) => (
                      <div key={i} className="flex flex-col items-center">
                        <div className="w-0.5 h-8" style={{ backgroundColor: '#0C2C18', opacity: 0.3 }}></div>
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#85A383' }}></div>
                        <div className="w-0.5 h-8" style={{ backgroundColor: '#0C2C18', opacity: 0.3 }}></div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* RESPONSE COMPILER */}
                <div className="flex justify-center">
                  <div className="relative w-[700px]">
                    <div className="absolute inset-0 blur-xl opacity-30" style={{ backgroundColor: '#85A383' }}></div>
                    <div className="relative p-8 rounded-xl shadow-2xl border-2" style={{ 
                      background: 'linear-gradient(135deg, #0C2C18 0%, #1B2A21 100%)',
                      borderColor: '#85A383'
                    }}>
                      <div className="text-center">
                        <div className="text-2xl font-bold mb-3" style={{ color: '#E7DDCA' }}>Response Compiler</div>
                        <div className="text-sm leading-relaxed" style={{ color: '#85A383' }}>
                          Consolidates all SME outputs into single, consistent<br />
                          user-facing analysis with aligned recommendations
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Explanation */}
          <div className="p-8 border-l-4" style={{ backgroundColor: 'rgba(133, 163, 131, 0.1)', borderColor: '#85A383' }}>
            <p className="text-base leading-relaxed" style={{ color: '#1B2A21' }}>
              <strong style={{ color: '#0C2C18' }}>Questt works like a coordinated team:</strong> An <strong>Orchestrator</strong> takes 
              the business question, breaks it into sub-questions, and assigns them to <strong>SME Agents</strong>. Each SME owns 
              its datasets—including a dedicated <strong>Weather Agent</strong> that models micro-market sensitivity and separates 
              weather-lift from promo-lift. The <strong>Response Compiler</strong> combines all outputs into one clear answer.
            </p>
          </div>
        </div>
      </div>

      {/* Transformation */}
      <div className="max-w-5xl mx-auto px-12 py-24">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#DF7649' }}>
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div className="text-lg tracking-[0.3em] font-bold" style={{ color: '#DF7649' }}>
            OPERATIONAL TRANSFORMATION
          </div>
        </div>
        
        <h2 className="text-6xl mb-16 leading-tight font-light" style={{ fontFamily: 'Georgia, serif', color: '#0C2C18' }}>
          From weekly hindsight to <span style={{ color: '#DF7649' }} className="font-normal">in-week actioning</span>
        </h2>
        
        <div className="grid grid-cols-2 gap-8 mb-20">
          <div className="p-10 border-4" style={{ backgroundColor: 'rgba(135, 139, 135, 0.1)', borderColor: '#878B87' }}>
            <div className="font-bold mb-6 text-2xl" style={{ color: '#878B87' }}>Before</div>
            <ul className="space-y-4 text-base" style={{ color: '#1B2A21' }}>
              <li className="flex items-start gap-3">
                <div className="w-3 h-3 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#878B87' }}></div>
                <span>Weekly post-mortems, reactive planning</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-3 h-3 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#878B87' }}></div>
                <span>Weather treated as "nice-to-have overlay"</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-3 h-3 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#878B87' }}></div>
                <span>Inventory and promo teams in separate timelines</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-3 h-3 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#878B87' }}></div>
                <span>Can't separate promo-lift from weather-lift</span>
              </li>
            </ul>
          </div>

          <div className="p-10 shadow-xl border-4" style={{ backgroundColor: '#DF7649', borderColor: 'rgba(223, 118, 73, 0.5)' }}>
            <div className="text-white font-bold mb-6 text-2xl">After</div>
            <ul className="space-y-4 text-white text-base">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 flex-shrink-0" />
                <span><strong>In-week actioning</strong> based on weather signals</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 flex-shrink-0" />
                <span><strong>Weather as core decision driver</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 flex-shrink-0" />
                <span><strong>One integrated loop:</strong> positioning + promo + discounting</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 flex-shrink-0" />
                <span><strong>Clear attribution</strong> enables better future planning</span>
              </li>
            </ul>
          </div>
        </div>

        {/* What Changed */}
        <div className="bg-white border-4 shadow-xl p-10 mb-20" style={{ borderColor: '#0C2C18' }}>
          <h3 className="text-2xl font-bold mb-6" style={{ color: '#0C2C18' }}>What Changed Operationally</h3>
          <ul className="space-y-4 text-base" style={{ color: '#1B2A21' }}>
            <li className="flex items-start gap-3">
              <div className="w-3 h-3 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#DF7649' }}></div>
              <span>Supply planning, RGM, and sales operate from one integrated decision loop</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-3 h-3 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#DF7649' }}></div>
              <span>Post-event learning improved—system separates weather lift vs promo lift</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-3 h-3 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#DF7649' }}></div>
              <span>"Panic actions" reduced—fewer emergency shipments, blanket price-offs, last-minute corrections</span>
            </li>
          </ul>
        </div>

        {/* Timeline */}
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#DF7649' }}>
            <Clock className="w-6 h-6 text-white" />
          </div>
          <div className="text-lg tracking-[0.3em] font-bold" style={{ color: '#DF7649' }}>
            TIME TO VALUE
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-8">
          <div className="bg-white border-4 p-10 shadow-xl" style={{ borderColor: '#0C2C18' }}>
            <div className="text-7xl mb-4 font-bold" style={{ color: '#DF7649' }}>
              6
            </div>
            <div className="font-bold mb-3 text-xl" style={{ color: '#0C2C18' }}>WEEKS</div>
            <div className="text-base leading-relaxed" style={{ color: '#1B2A21' }}>
              First go-live with weather-aware inventory positioning decision cards in priority markets
            </div>
          </div>
          
          <div className="border-4 p-10 shadow-xl" style={{ backgroundColor: '#DF7649', borderColor: 'rgba(223, 118, 73, 0.5)' }}>
            <div className="text-white text-7xl mb-4 font-bold">
              8–12
            </div>
            <div className="text-white font-bold mb-3 text-xl">WEEKS</div>
            <div className="text-white text-base leading-relaxed opacity-90">
              Full suite live including promo readiness guardrails, precision discounting, and monitoring cadence
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-16" style={{ background: 'linear-gradient(to right, #0C2C18, #1B2A21)' }}>
        <div className="max-w-5xl mx-auto px-12">
          <div className="flex justify-between items-center">
            <div className="text-white text-4xl tracking-[0.3em] font-light" style={{ fontFamily: 'Georgia, serif' }}>
              QUESTT
            </div>
            <div className="text-base font-bold tracking-wider" style={{ color: '#DF7649' }}>
              Decisions deserve better than guesswork.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudy;
"use client"
import React, { useState } from 'react';
import { Clock, TrendingUp, MapPin, Package, Phone, Target, Award, CheckCircle, ChevronDown } from 'lucide-react';

const ASMTimeline = () => {
  const [selectedActivity, setSelectedActivity] = useState<number | null>(null);

  const colors = {
    darkGreen: '#0C2C18',
    sageGreen: '#85A383',
    cream: '#E7DDCA',
    darkestGreen: '#1B2A21',
    terracotta: '#DF7649',
    lightGrey: '#878B87'
  };

  const activities = [
    {
      id: 1,
      time: "07:30 AM",
      category: "Visit & Recover",
      action: "Visited Vishal Store",
      details: "Recovered unbilled outlet - placed order for 18 units (₹3,240)",
      impact: { coverage: "+1%", revenue: "+₹3.2k", calls: "1", lines: "+12" },
      runningTotals: { coverage: "73%", revenue: "₹3.2k", calls: "1", lines: "12" }
    },
    {
      id: 2,
      time: "08:45 AM",
      category: "Visit & Recover",
      action: "Visited Sharma Kirana",
      details: "Recovered unbilled outlet - placed order for 24 units (₹4,320)",
      impact: { coverage: "+1%", revenue: "+₹4.3k", calls: "2", lines: "+16" },
      runningTotals: { coverage: "74%", revenue: "₹7.6k", calls: "2", lines: "28" }
    },
    {
      id: 3,
      time: "10:15 AM",
      category: "Scheme Push",
      action: "Pushed Godrej No.1 scheme at Modern Retail",
      details: "Placed bulk order - 36 units with scheme (₹6,120)",
      impact: { coverage: "—", revenue: "+₹6.1k", calls: "3", lines: "+8", focusBrand: "+4%" },
      runningTotals: { coverage: "74%", revenue: "₹13.7k", calls: "3", lines: "36", focusBrand: "69%" }
    },
    {
      id: 4,
      time: "11:30 AM",
      category: "Coverage Target",
      action: "Beat coverage - 4 outlets visited",
      details: "Routine beat coverage with 3 productive calls",
      impact: { coverage: "+4%", revenue: "+₹8.5k", calls: "6", lines: "+22" },
      runningTotals: { coverage: "78%", revenue: "₹22.1k", calls: "6", lines: "58" }
    },
    {
      id: 5,
      time: "01:45 PM",
      category: "New Product Launch",
      action: "Launched new Cinthol variant at 3 outlets",
      details: "Sample distribution + initial orders placed",
      impact: { coverage: "—", revenue: "+₹2.9k", calls: "9", lines: "+6" },
      runningTotals: { coverage: "78%", revenue: "₹25.0k", calls: "9", lines: "64" }
    },
    {
      id: 6,
      time: "03:20 PM",
      category: "Cross-Sell",
      action: "Cross-sold HIT to 5 existing outlets",
      details: "Upsell opportunity - added pest control range",
      impact: { coverage: "—", revenue: "+₹4.3k", calls: "12", lines: "+10" },
      runningTotals: { coverage: "78%", revenue: "₹29.3k", calls: "12", lines: "74" }
    },
    {
      id: 7,
      time: "05:00 PM",
      category: "Scheme Push",
      action: "Evening beat - pushed Godrej No.1 at 6 outlets",
      details: "Final push for focus brand before day-end",
      impact: { coverage: "—", revenue: "+₹5.6k", calls: "16", lines: "+8", focusBrand: "+8%" },
      runningTotals: { coverage: "78%", revenue: "₹34.9k", calls: "16", lines: "82", focusBrand: "77%" }
    },
    {
      id: 8,
      time: "06:15 PM",
      category: "Visit & Recover",
      action: "Day-end recovery - 2 pending outlets",
      details: "Recovered 2 more unbilled outlets from morning list",
      impact: { coverage: "+7%", revenue: "+₹2.9k", calls: "18", lines: "—" },
      runningTotals: { coverage: "85%", revenue: "₹37.8k", calls: "18", lines: "82" }
    }
  ];

  return (
    <div className="w-full h-screen overflow-auto" style={{ backgroundColor: colors.cream }}>
      {/* Header */}
      <div style={{ backgroundColor: colors.darkGreen }} className="px-8 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-xs mb-2 uppercase tracking-widest" style={{ color: colors.sageGreen }}>
            Monday, November 18, 2025
          </div>
          <h1 className="text-4xl font-light mb-3" style={{ color: colors.cream }}>
            Activity Timeline
          </h1>
          <div className="flex items-center gap-2 text-sm" style={{ color: colors.sageGreen }}>
            <MapPin size={14} strokeWidth={1} />
            <span>Andheri West</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-12">
        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-4 mb-16">
          <div className="bg-white rounded p-6 border" style={{ borderColor: colors.darkGreen + '15' }}>
            <div className="text-xs uppercase tracking-wider mb-3" style={{ color: colors.lightGrey }}>
              Calls
            </div>
            <div className="text-3xl font-light mb-1" style={{ color: colors.darkGreen }}>18</div>
            <div className="text-xs" style={{ color: colors.sageGreen }}>Target met</div>
          </div>

          <div className="bg-white rounded p-6 border" style={{ borderColor: colors.darkGreen + '15' }}>
            <div className="text-xs uppercase tracking-wider mb-3" style={{ color: colors.lightGrey }}>
              Coverage
            </div>
            <div className="text-3xl font-light mb-1" style={{ color: colors.darkGreen }}>85%</div>
            <div className="text-xs" style={{ color: colors.sageGreen }}>Target met</div>
          </div>

          <div className="bg-white rounded p-6 border" style={{ borderColor: colors.darkGreen + '15' }}>
            <div className="text-xs uppercase tracking-wider mb-3" style={{ color: colors.lightGrey }}>
              Lines
            </div>
            <div className="text-3xl font-light mb-1" style={{ color: colors.darkGreen }}>82</div>
            <div className="text-xs" style={{ color: colors.terracotta }}>18 to go</div>
          </div>

          <div className="bg-white rounded p-6 border" style={{ borderColor: colors.darkGreen + '15' }}>
            <div className="text-xs uppercase tracking-wider mb-3" style={{ color: colors.lightGrey }}>
              Revenue
            </div>
            <div className="text-3xl font-light mb-1" style={{ color: colors.darkGreen }}>₹37.8k</div>
            <div className="text-xs" style={{ color: colors.terracotta }}>₹7.2k to go</div>
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h2 className="text-xl font-light mb-10 tracking-tight" style={{ color: colors.darkGreen }}>
            Activity Breakdown
          </h2>
          
          <div className="relative">
            {/* Vertical timeline line */}
            <div 
              className="absolute left-0 top-0 bottom-0 w-px" 
              style={{ backgroundColor: colors.sageGreen + '40' }}
            ></div>

            <div className="space-y-8">
              {activities.map((activity, index) => (
                <div key={activity.id} className="relative pl-12">
                  {/* Timeline dot */}
                  <div 
                    className="absolute left-0 w-3 h-3 rounded-full border-4"
                    style={{ 
                      backgroundColor: colors.sageGreen,
                      borderColor: colors.cream,
                      top: '8px',
                      marginLeft: '-5.5px'
                    }}
                  ></div>

                  {/* Activity card */}
                  <div 
                    className="bg-white rounded border transition-all cursor-pointer hover:shadow-sm"
                    style={{ borderColor: colors.darkGreen + '15' }}
                    onClick={() => setSelectedActivity(selectedActivity === activity.id ? null : activity.id)}
                  >
                    <div className="p-6">
                      <div className="flex items-start gap-6">
                        {/* Time */}
                        <div className="w-20 flex-shrink-0 pt-0.5">
                          <div className="text-sm font-light" style={{ color: colors.lightGrey }}>
                            {activity.time}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="text-xs uppercase tracking-widest mb-2" style={{ color: colors.sageGreen }}>
                                {activity.category}
                              </div>
                              <h3 className="text-lg font-light mb-1 tracking-tight" style={{ color: colors.darkGreen }}>
                                {activity.action}
                              </h3>
                              <p className="text-sm font-light leading-relaxed" style={{ color: colors.lightGrey }}>
                                {activity.details}
                              </p>
                            </div>
                            <div className="flex items-center gap-4 ml-6">
                              <CheckCircle size={18} strokeWidth={1} style={{ color: colors.sageGreen }} />
                              <ChevronDown 
                                size={16} 
                                strokeWidth={1} 
                                style={{ 
                                  color: colors.lightGrey,
                                  transform: selectedActivity === activity.id ? 'rotate(180deg)' : 'rotate(0deg)',
                                  transition: 'transform 0.2s'
                                }} 
                              />
                            </div>
                          </div>

                          {/* Impact metrics */}
                          <div className="flex gap-4 mt-4 text-xs">
                            {activity.impact.coverage && activity.impact.coverage !== '—' && (
                              <div>
                                <span style={{ color: colors.lightGrey }}>Coverage: </span>
                                <span style={{ color: colors.darkGreen }}>{activity.impact.coverage}</span>
                              </div>
                            )}
                            {activity.impact.revenue && (
                              <div>
                                <span style={{ color: colors.lightGrey }}>Revenue: </span>
                                <span style={{ color: colors.darkGreen }}>{activity.impact.revenue}</span>
                              </div>
                            )}
                            {activity.impact.calls && (
                              <div>
                                <span style={{ color: colors.lightGrey }}>Calls: </span>
                                <span style={{ color: colors.darkGreen }}>{activity.impact.calls}/18</span>
                              </div>
                            )}
                            {activity.impact.lines && activity.impact.lines !== '—' && (
                              <div>
                                <span style={{ color: colors.lightGrey }}>Lines: </span>
                                <span style={{ color: colors.darkGreen }}>{activity.impact.lines}</span>
                              </div>
                            )}
                            {activity.impact.focusBrand && (
                              <div>
                                <span style={{ color: colors.lightGrey }}>Focus Brand: </span>
                                <span style={{ color: colors.sageGreen }}>{activity.impact.focusBrand}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Expanded section */}
                    {selectedActivity === activity.id && (
                      <div 
                        className="border-t px-6 py-5"
                        style={{ 
                          borderColor: colors.sageGreen + '20',
                          backgroundColor: colors.cream + '40'
                        }}
                      >
                        <div className="text-xs uppercase tracking-widest mb-4" style={{ color: colors.lightGrey }}>
                          Running Totals
                        </div>
                        <div className="grid grid-cols-5 gap-6">
                          <div>
                            <div className="text-xs mb-1" style={{ color: colors.lightGrey }}>Coverage</div>
                            <div className="text-2xl font-light" style={{ color: colors.terracotta }}>
                              {activity.runningTotals.coverage}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs mb-1" style={{ color: colors.lightGrey }}>Revenue</div>
                            <div className="text-2xl font-light" style={{ color: colors.sageGreen }}>
                              {activity.runningTotals.revenue}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs mb-1" style={{ color: colors.lightGrey }}>Calls</div>
                            <div className="text-2xl font-light" style={{ color: colors.darkGreen }}>
                              {activity.runningTotals.calls}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs mb-1" style={{ color: colors.lightGrey }}>Lines</div>
                            <div className="text-2xl font-light" style={{ color: colors.darkGreen }}>
                              {activity.runningTotals.lines}
                            </div>
                          </div>
                          {activity.runningTotals.focusBrand && (
                            <div>
                              <div className="text-xs mb-1" style={{ color: colors.lightGrey }}>Godrej No.1</div>
                              <div className="text-2xl font-light" style={{ color: colors.sageGreen }}>
                                {activity.runningTotals.focusBrand}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Day Summary */}
        <div className="mt-16 bg-white rounded border p-8" style={{ borderColor: colors.sageGreen + '30' }}>
          <div className="flex items-center gap-3 mb-8">
            <Award size={24} strokeWidth={1} style={{ color: colors.darkGreen }} />
            <h3 className="text-xl font-light tracking-tight" style={{ color: colors.darkGreen }}>
              Day-End Summary
            </h3>
          </div>
          
          <div className="grid grid-cols-3 gap-8 mb-8">
            <div>
              <div className="text-xs uppercase tracking-wider mb-3" style={{ color: colors.lightGrey }}>
                Achievements
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.sageGreen }}></div>
                  <span style={{ color: colors.darkGreen }}>Calls: 18/18</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.sageGreen }}></div>
                  <span style={{ color: colors.darkGreen }}>Coverage: 85%</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.terracotta }}></div>
                  <span style={{ color: colors.darkGreen }}>Lines: 82/100</span>
                </div>
              </div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-wider mb-3" style={{ color: colors.lightGrey }}>
                Incentive Earned
              </div>
              <div className="text-3xl font-light mb-1" style={{ color: colors.darkGreen }}>₹1,200</div>
              <div className="text-xs" style={{ color: colors.lightGrey }}>
                Scheme & recovery bonus
              </div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-wider mb-3" style={{ color: colors.lightGrey }}>
                Monthly Progress
              </div>
              <div className="text-3xl font-light mb-1" style={{ color: colors.sageGreen }}>+₹8.5k</div>
              <div className="text-xs" style={{ color: colors.lightGrey }}>
                Towards monthly target
              </div>
            </div>
          </div>

          <div className="pt-6 border-t" style={{ borderColor: colors.sageGreen + '20' }}>
            <div className="text-xs uppercase tracking-wider mb-2" style={{ color: colors.sageGreen }}>
              Tomorrow's Priority
            </div>
            <div className="text-sm font-light" style={{ color: colors.darkGreen }}>
              Complete remaining 11 unbilled outlet recoveries
            </div>
            <div className="text-xs mt-1" style={{ color: colors.lightGrey }}>
              Potential: ₹6.5k additional revenue
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ASMTimeline;
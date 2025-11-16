"use client"
import React, { useState } from 'react';
import { Search, TrendingUp, TrendingDown, ChevronRight, Filter, Users, MapPin, BarChart3, Package, Calendar, Store, ArrowRight } from 'lucide-react';

const RSMDashboard = () => {
  const [selectedASM, setSelectedASM] = useState(null);
  const [selectedDistributor, setSelectedDistributor] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [healthFilter, setHealthFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const regionData = {
    name: "West Region",
    ytdAchievement: 87,
    growth: -3.2,
    asms: [
      {
        id: 'ASM001',
        name: 'Rajesh Kumar',
        territory: 'Mumbai Metro',
        health: 'critical',
        achievement: 78,
        targetShortfall: -22,
        growthVsLY: -8.5,
        contribution: -35,
        insight: 'Immediate action needed on Shah Enterprises - their manday crisis is cascading across 3 beats. Andheri West lost 8 outlets in 45 days, concentrate recovery effort there first. Personal Care SKUs down 35% while Home Care stable - suggests distribution gaps, not demand issues.',
        conversationStarters: [
          'Map exact outlet losses in Andheri to salesman beats - which TSE territories have highest recovery potential vs effort?',
          'Shah Enterprises manday root cause - is this vacancy, attendance, or routing inefficiency? Calculate revenue impact per unfilled day.',
          'Personal Care vs Home Care distribution gap - why is PC bleeding while HC stable? Channel mix or execution issue?'
        ],
        distributors: [
          {
            id: 'D1',
            name: 'Shah Enterprises',
            achievement: 72,
            health: 'critical',
            growthVsLY: -12.3,
            contribution: -45,
            insight: 'Two vacant beats for 6 weeks. Remaining salesmen stretched thin - Arjun Mehta covering 1.5x normal territory. Field hours down 40%, outlet coverage collapsing. Need emergency manpower deployment.',
            salesmen: [
              {
                id: 'S1',
                name: 'Arjun Mehta',
                beat: 'Andheri West',
                achievement: 68,
                growthVsLY: -18.2,
                health: 'critical',
                rootCauses: {
                  distribution: { value: -25, outlets: 8, label: 'Lost 8 outlets' },
                  mandays: { value: -40, days: 12, label: 'Only 12 of 20 days worked' },
                  dropSize: { value: -8, amount: '₹2.8k', label: 'Avg bill down to ₹2.8k' },
                  channel: [
                    { name: 'Chemist', achievement: 65, growth: -15, issue: 'Pricing pressure' },
                    { name: 'General Trade', achievement: 70, growth: -22, issue: 'Coverage gaps' },
                    { name: 'Wholesale', achievement: 75, growth: -12, issue: 'Competition' }
                  ]
                }
              },
              {
                id: 'S2',
                name: 'Priya Nair',
                beat: 'Andheri East',
                achievement: 75,
                growthVsLY: -8.5,
                health: 'warning',
                rootCauses: {
                  distribution: { value: -5, outlets: 2, label: 'Lost 2 outlets' },
                  mandays: { value: -15, days: 17, label: '17 of 20 days worked' },
                  dropSize: { value: -12, amount: '₹3.1k', label: 'Avg bill down to ₹3.1k' },
                  channel: [
                    { name: 'Chemist', achievement: 78, growth: -5, issue: null },
                    { name: 'General Trade', achievement: 73, growth: -12, issue: 'Drop size' },
                    { name: 'Wholesale', achievement: 76, growth: -8, issue: 'Competition' }
                  ]
                }
              }
            ]
          },
          {
            id: 'D2',
            name: 'Metro Traders',
            achievement: 85,
            health: 'warning',
            growthVsLY: -5.2,
            contribution: -18,
            insight: 'Execution solid but drop sizes declining across all beats. Retailers ordering less per visit despite stable coverage. Either pricing pressure or shift in buying patterns. Focus SKU penetration only 42%.',
            salesmen: []
          },
          {
            id: 'D3',
            name: 'West Supply Co.',
            achievement: 92,
            health: 'healthy',
            growthVsLY: 3.8,
            contribution: 8,
            insight: 'Strong performance across metrics. NPD rollout well-executed, drop sizes growing. This distributor has the playbook - document and replicate.',
            salesmen: []
          }
        ]
      },
      {
        id: 'ASM002',
        name: 'Priya Desai',
        territory: 'Pune & Nashik',
        health: 'warning',
        achievement: 89,
        targetShortfall: -11,
        growthVsLY: -2.1,
        contribution: -18,
        insight: 'Tale of two markets - Nashik executing well while Pune wholesale channel hemorrhaging. Focus SKU penetration 23 points below target in wholesale. Modern Trade growing but too small to offset wholesale drag. Competitive intensity high in Pune.',
        conversationStarters: [
          'Pune wholesale outlet-level diagnosis - are top 15 accounts losing shelf space or are order sizes shrinking? What changed?',
          'Nashik success factor analysis - distributor capability or market dynamics? Can we extract replicable tactics for Pune?',
          'Focus SKU wholesale penetration roadmap - from 45% to 65% in 60 days. Which outlets, which SKUs, what incentives needed?'
        ],
        distributors: []
      },
      {
        id: 'ASM003',
        name: 'Amit Patel',
        territory: 'Gujarat North',
        health: 'healthy',
        achievement: 103,
        targetShortfall: 3,
        growthVsLY: 12.8,
        contribution: 45,
        insight: 'Outstanding NPD execution - 78% penetration vs 55% regional average. Drop sizes up 18% YoY through better pack-mix strategy. Distributor capability exceptional. This is the benchmark territory for scaling best practices.',
        conversationStarters: [
          'Document Gujarat NPD rollout playbook - break down distributor meets, incentive structure, visibility strategy. What is replicable?',
          'Identify market-specific vs transferable success factors - what works only in Gujarat vs what scales to other ASMs?',
          'Next growth lever - already over-achieving. Where is the next 10% coming from? New channels, deeper penetration, or adjacent expansion?'
        ],
        distributors: []
      },
      {
        id: 'ASM004',
        name: 'Sneha Joshi',
        territory: 'Surat & Valsad',
        health: 'warning',
        achievement: 91,
        targetShortfall: -9,
        growthVsLY: 1.2,
        contribution: -12,
        insight: 'Chemist channel collapsing in Surat - down 8.2% while Valsad chemists flat. Competitive trade schemes more aggressive in Surat. GT and Wholesale stable. This is a channel-specific pricing/terms battle, not broad execution failure.',
        conversationStarters: [
          'Surat chemist competitive intelligence map - what are top 3 competitors offering by SKU? Where are we losing on trade terms?',
          'Valsad chemist protection strategy - what is keeping them stable? Lock in these relationships before competition attacks.',
          'Margin vs volume trade-off for Surat - cost of matching competitor schemes vs revenue loss trajectory if we do nothing. 90-day scenarios.'
        ],
        distributors: []
      },
      {
        id: 'ASM005',
        name: 'Karan Singh',
        territory: 'Rajasthan West',
        health: 'critical',
        achievement: 75,
        targetShortfall: -25,
        growthVsLY: -11.3,
        contribution: -42,
        insight: 'Crisis territory driving 42% of regional gap. Two beats vacant 6+ weeks. Jaipur Dist. Co. has structural capability issues beyond just manpower. 18 high-value outlets lost in Q2. Coverage down 25%. This needs emergency intervention and possibly distributor restructuring.',
        conversationStarters: [
          'Emergency 30/60/90 day recovery plan - fill vacant beats, recover top 10 lost outlets, stabilize coverage at 85%. What resources needed from regional?',
          'Jaipur Dist. Co. capability assessment - can they execute recovery or do we need alternate distributor strategy? Detailed SWOT.',
          'Lost outlet prioritization matrix - of 18 outlets, rank by revenue potential and recoverability. Focus effort on top 8, quantify impact if we recover them.'
        ],
        distributors: []
      }
    ]
  };

  const getHealthColor = (health) => {
    switch(health) {
      case 'critical': return '#DF7649';
      case 'warning': return '#D4A574';
      case 'healthy': return '#85A383';
      default: return '#878B87';
    }
  };

  const filteredASMs = regionData.asms
    .filter(asm => {
      const matchesSearch = asm.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           asm.territory.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesHealth = healthFilter === 'all' || asm.health === healthFilter;
      return matchesSearch && matchesHealth;
    })
    .sort((a, b) => Math.abs(b.contribution) - Math.abs(a.contribution));

  return (
    <div className='h-screen overflow-auto' style={{ 
      fontFamily: "'Hanken Grotesk', sans-serif",
      backgroundColor: '#FDFCFA',
      minHeight: '100vh',
      color: '#1B2A21'
    }}>
      <div style={{
        backgroundColor: '#0C2C18',
        padding: '24px 48px',
        borderBottom: '1px solid #85A383'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontSize: '28px',
              fontWeight: '600',
              color: '#E7DDCA',
              margin: '0 0 8px 0',
              letterSpacing: '0.01em'
            }}>
              Territory Intelligence
            </h1>
            <p style={{
              fontSize: '14px',
              color: '#85A383',
              margin: 0,
              letterSpacing: '0.02em'
            }}>
              {regionData.name} · YTD Achievement: {regionData.ytdAchievement}% · Growth: {regionData.growth}%
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', height: 'calc(100vh - 120px)' }}>
        <div style={{
          width: '28%',
          padding: '32px 24px',
          borderRight: '1px solid #E7DDCA',
          overflowY: 'auto',
          backgroundColor: '#FFFFFF'
        }}>
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#0C2C18',
              marginBottom: '8px'
            }}>
              Territory Overview
            </h2>
            <p style={{
              fontSize: '13px',
              color: '#878B87',
              margin: 0,
              lineHeight: '1.5'
            }}>
              Performance by ASM
            </p>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            {regionData.asms.map((asm) => (
              <div
                key={asm.id}
                onClick={() => {
                  setSelectedASM(asm);
                  setSelectedDistributor(null);
                }}
                style={{
                  padding: '16px',
                  backgroundColor: selectedASM?.id === asm.id ? '#F5F8F5' : '#FFFFFF',
                  border: `1px solid ${selectedASM?.id === asm.id ? '#85A383' : '#E7DDCA'}`,
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  borderLeft: `4px solid ${getHealthColor(asm.health)}`
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#0C2C18' }}>
                      {asm.name}
                    </span>
                  </div>
                  <span style={{ fontSize: '16px', fontWeight: '700', color: '#0C2C18' }}>
                    {asm.achievement}%
                  </span>
                </div>
                <div style={{ 
                  fontSize: '11px', 
                  color: '#878B87', 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '8px'
                }}>
                  <MapPin size={10} />
                  {asm.territory}
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '8px',
                  borderTop: '1px solid #E7DDCA'
                }}>
                  <span style={{ fontSize: '11px', color: '#878B87' }}>Growth</span>
                  <span style={{ 
                    fontSize: '12px', 
                    fontWeight: '600', 
                    color: asm.growthVsLY > 0 ? '#85A383' : '#DF7649'
                  }}>
                    {asm.growthVsLY > 0 ? '+' : ''}{asm.growthVsLY}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          width: '72%',
          padding: '32px 48px',
          overflowY: 'auto',
          backgroundColor: '#FDFCFA'
        }}>
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              <div style={{ 
                flex: 1,
                position: 'relative'
              }}>
                <Search size={18} style={{ 
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#878B87'
                }} />
                <input
                  type="text"
                  placeholder="Search ASM or territory..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 40px',
                    border: '1px solid #E7DDCA',
                    borderRadius: '4px',
                    fontSize: '14px',
                    fontFamily: "'Hanken Grotesk', sans-serif",
                    backgroundColor: '#FFFFFF',
                    outline: 'none'
                  }}
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                style={{
                  padding: '10px 16px',
                  border: `1px solid ${showFilters ? '#85A383' : '#E7DDCA'}`,
                  borderRadius: '4px',
                  backgroundColor: showFilters ? '#F5F8F5' : '#FFFFFF',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  color: '#0C2C18',
                  fontFamily: "'Hanken Grotesk', sans-serif",
                  fontWeight: '500'
                }}
              >
                <Filter size={16} />
                Filter
              </button>
            </div>

            {showFilters && (
              <div style={{
                padding: '16px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E7DDCA',
                borderRadius: '4px',
                marginBottom: '12px'
              }}>
                <div style={{ fontSize: '11px', color: '#878B87', marginBottom: '12px', fontWeight: '600', letterSpacing: '0.05em' }}>
                  HEALTH STATUS
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {['all', 'critical', 'warning', 'healthy'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setHealthFilter(status)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '4px',
                        border: `1px solid ${healthFilter === status ? getHealthColor(status === 'all' ? 'healthy' : status) : '#E7DDCA'}`,
                        backgroundColor: healthFilter === status ? (status === 'all' ? '#F5F8F5' : `${getHealthColor(status)}15`) : '#FFFFFF',
                        cursor: 'pointer',
                        fontSize: '13px',
                        color: '#0C2C18',
                        fontFamily: "'Hanken Grotesk', sans-serif",
                        fontWeight: healthFilter === status ? '600' : '400',
                        textTransform: 'capitalize'
                      }}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {filteredASMs.map((asm) => (
              <div key={asm.id}>
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: `1px solid ${selectedASM?.id === asm.id ? '#85A383' : '#E7DDCA'}`,
                    borderRadius: '4px',
                    padding: '24px',
                    transition: 'all 0.3s'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
                        <h3 style={{
                          fontSize: '20px',
                          fontWeight: '600',
                          color: '#0C2C18',
                          margin: 0
                        }}>
                          {asm.name}
                        </h3>
                        <div style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          backgroundColor: getHealthColor(asm.health)
                        }} />
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <MapPin size={14} color="#878B87" />
                        <p style={{
                          fontSize: '14px',
                          color: '#878B87',
                          margin: 0
                        }}>
                          {asm.territory}
                        </p>
                      </div>
                    </div>
                    <div style={{
                      backgroundColor: Math.abs(asm.contribution) > 30 ? '#FFF5F2' : '#F5F8F5',
                      padding: '8px 14px',
                      borderRadius: '4px',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: Math.abs(asm.contribution) > 30 ? '#DF7649' : '#85A383'
                    }}>
                      {asm.contribution > 0 ? '+' : ''}{asm.contribution}% impact
                    </div>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '16px',
                    marginBottom: '20px',
                    paddingBottom: '20px',
                    borderBottom: '1px solid #E7DDCA'
                  }}>
                    <div>
                      <div style={{ fontSize: '11px', color: '#878B87', marginBottom: '6px', fontWeight: '600' }}>
                        ACHIEVEMENT
                      </div>
                      <div style={{ fontSize: '24px', fontWeight: '700', color: '#0C2C18' }}>
                        {asm.achievement}%
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', color: '#878B87', marginBottom: '6px', fontWeight: '600' }}>
                        SHORTFALL
                      </div>
                      <div style={{ fontSize: '24px', fontWeight: '700', color: '#DF7649' }}>
                        {asm.targetShortfall}%
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', color: '#878B87', marginBottom: '6px', fontWeight: '600' }}>
                        GROWTH VS LY
                      </div>
                      <div style={{
                        fontSize: '24px',
                        fontWeight: '700',
                        color: asm.growthVsLY > 0 ? '#85A383' : '#DF7649',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        {asm.growthVsLY > 0 ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                        {asm.growthVsLY}%
                      </div>
                    </div>
                  </div>

                  <div style={{
                    backgroundColor: '#F5F8F5',
                    padding: '16px',
                    borderRadius: '4px',
                    marginBottom: '16px',
                    borderLeft: `3px solid ${getHealthColor(asm.health)}`
                  }}>
                    <p style={{
                      fontSize: '14px',
                      color: '#1B2A21',
                      margin: 0,
                      lineHeight: '1.6'
                    }}>
                      {asm.insight}
                    </p>
                  </div>

                  <div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '12px'
                    }}>
                      <h4 style={{
                        fontSize: '11px',
                        fontWeight: '600',
                        color: '#878B87',
                        margin: 0,
                        letterSpacing: '0.05em'
                      }}>
                        DRILL DEEPER
                      </h4>
                      {asm.distributors.length > 0 && (
                        <button
                          onClick={() => setSelectedASM(selectedASM?.id === asm.id ? null : asm)}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: '#0C2C18',
                            border: 'none',
                            borderRadius: '4px',
                            color: '#E7DDCA',
                            fontSize: '12px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontFamily: "'Hanken Grotesk', sans-serif"
                          }}
                        >
                          View Breakdown
                          <ArrowRight size={14} />
                        </button>
                      )}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {asm.conversationStarters.map((starter, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setSelectedASM(asm);
                          }}
                          style={{
                            padding: '12px 16px',
                            backgroundColor: '#FFFFFF',
                            border: '1px solid #E7DDCA',
                            borderRadius: '4px',
                            fontSize: '13px',
                            color: '#1B2A21',
                            lineHeight: '1.5',
                            textAlign: 'left',
                            cursor: 'pointer',
                            fontFamily: "'Hanken Grotesk', sans-serif",
                            transition: 'all 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#F5F8F5';
                            e.currentTarget.style.borderColor = '#85A383';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#FFFFFF';
                            e.currentTarget.style.borderColor = '#E7DDCA';
                          }}
                        >
                          <span>{starter}</span>
                          <ChevronRight size={16} color="#85A383" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {selectedASM?.id === asm.id && asm.distributors.length > 0 && (
                  <div style={{
                    marginTop: '16px',
                    marginLeft: '24px',
                    paddingLeft: '24px',
                    borderLeft: '2px solid #E7DDCA'
                  }}>
                    <div style={{
                      fontSize: '11px',
                      color: '#878B87',
                      marginBottom: '16px',
                      fontWeight: '600',
                      letterSpacing: '0.05em',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <Users size={14} />
                      DISTRIBUTOR BREAKDOWN
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {asm.distributors.map((dist) => (
                        <div key={dist.id}>
                          <div
                            onClick={() => setSelectedDistributor(selectedDistributor?.id === dist.id ? null : dist)}
                            style={{
                              padding: '16px',
                              backgroundColor: selectedDistributor?.id === dist.id ? '#F5F8F5' : '#FFFFFF',
                              border: `1px solid ${selectedDistributor?.id === dist.id ? '#85A383' : '#E7DDCA'}`,
                              borderRadius: '4px',
                              cursor: 'pointer',
                              transition: 'all 0.2s'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{
                                  width: '8px',
                                  height: '8px',
                                  borderRadius: '50%',
                                  backgroundColor: getHealthColor(dist.health)
                                }} />
                                <span style={{ fontSize: '15px', fontWeight: '600', color: '#0C2C18' }}>
                                  {dist.name}
                                </span>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <span style={{ fontSize: '12px', color: '#878B87' }}>
                                  {dist.contribution > 0 ? '+' : ''}{dist.contribution}% impact
                                </span>
                                <span style={{ fontSize: '16px', fontWeight: '700', color: '#0C2C18' }}>
                                  {dist.achievement}%
                                </span>
                                <ChevronRight 
                                  size={16} 
                                  color="#85A383"
                                  style={{
                                    transform: selectedDistributor?.id === dist.id ? 'rotate(90deg)' : 'rotate(0)',
                                    transition: 'transform 0.2s'
                                  }}
                                />
                              </div>
                            </div>
                            <div style={{
                              fontSize: '13px',
                              color: '#1B2A21',
                              backgroundColor: '#FDFCFA',
                              padding: '10px 12px',
                              borderRadius: '4px',
                              lineHeight: '1.5'
                            }}>
                              {dist.insight}
                            </div>
                          </div>

                          {selectedDistributor?.id === dist.id && dist.salesmen.length > 0 && (
                            <div style={{
                              marginTop: '12px',
                              marginLeft: '20px',
                              paddingLeft: '20px',
                              borderLeft: '2px solid #E7DDCA'
                            }}>
                              {dist.salesmen.map((salesman) => (
                                <div
                                  key={salesman.id}
                                  style={{
                                    padding: '20px',
                                    backgroundColor: '#FFFFFF',
                                    border: '1px solid #E7DDCA',
                                    borderRadius: '4px',
                                    marginBottom: '12px'
                                  }}
                                >
                                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                                    <div>
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                        <div style={{
                                          width: '8px',
                                          height: '8px',
                                          borderRadius: '50%',
                                          backgroundColor: getHealthColor(salesman.health)
                                        }} />
                                        <span style={{ fontSize: '15px', fontWeight: '600', color: '#0C2C18' }}>
                                          {salesman.name}
                                        </span>
                                      </div>
                                      <div style={{ fontSize: '12px', color: '#878B87', paddingLeft: '16px' }}>
                                        {salesman.beat}
                                      </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                      <div style={{ fontSize: '18px', fontWeight: '700', color: '#0C2C18' }}>
                                        {salesman.achievement}%
                                      </div>
                                      <div style={{ 
                                        fontSize: '12px', 
                                        color: salesman.growthVsLY < 0 ? '#DF7649' : '#85A383',
                                        fontWeight: '600'
                                      }}>
                                        {salesman.growthVsLY > 0 ? '+' : ''}{salesman.growthVsLY}% growth
                                      </div>
                                    </div>
                                  </div>

                                  <div style={{
                                    fontSize: '11px',
                                    color: '#878B87',
                                    marginBottom: '12px',
                                    fontWeight: '600',
                                    letterSpacing: '0.05em'
                                  }}>
                                    ROOT CAUSE ATTRIBUTION
                                  </div>

                                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                                    <div style={{
                                      padding: '12px',
                                      backgroundColor: salesman.rootCauses.distribution.value < -10 ? '#FFF5F2' : '#F5F8F5',
                                      borderRadius: '4px',
                                      border: `1px solid ${salesman.rootCauses.distribution.value < -10 ? '#DF764920' : '#E7DDCA'}`
                                    }}>
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                        <Store size={14} color="#878B87" />
                                        <span style={{ fontSize: '11px', color: '#878B87', fontWeight: '600' }}>DISTRIBUTION</span>
                                      </div>
                                      <div style={{ fontSize: '18px', fontWeight: '700', color: salesman.rootCauses.distribution.value < 0 ? '#DF7649' : '#85A383', marginBottom: '4px' }}>
                                        {salesman.rootCauses.distribution.value}%
                                      </div>
                                      <div style={{ fontSize: '11px', color: '#1B2A21' }}>
                                        {salesman.rootCauses.distribution.label}
                                      </div>
                                    </div>

                                    <div style={{
                                      padding: '12px',
                                      backgroundColor: salesman.rootCauses.mandays.value < -10 ? '#FFF5F2' : '#F5F8F5',
                                      borderRadius: '4px',
                                      border: `1px solid ${salesman.rootCauses.mandays.value < -10 ? '#DF764920' : '#E7DDCA'}`
                                    }}>
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                        <Calendar size={14} color="#878B87" />
                                        <span style={{ fontSize: '11px', color: '#878B87', fontWeight: '600' }}>MANDAYS</span>
                                      </div>
                                      <div style={{ fontSize: '18px', fontWeight: '700', color: salesman.rootCauses.mandays.value < 0 ? '#DF7649' : '#85A383', marginBottom: '4px' }}>
                                        {salesman.rootCauses.mandays.value}%
                                      </div>
                                      <div style={{ fontSize: '11px', color: '#1B2A21' }}>
                                        {salesman.rootCauses.mandays.label}
                                      </div>
                                    </div>

                                    <div style={{
                                      padding: '12px',
                                      backgroundColor: salesman.rootCauses.dropSize.value < -10 ? '#FFF5F2' : '#F5F8F5',
                                      borderRadius: '4px',
                                      border: `1px solid ${salesman.rootCauses.dropSize.value < -10 ? '#DF764920' : '#E7DDCA'}`,
                                      gridColumn: 'span 2'
                                    }}>
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                        <Package size={14} color="#878B87" />
                                        <span style={{ fontSize: '11px', color: '#878B87', fontWeight: '600' }}>DROP SIZE / AOV</span>
                                      </div>
                                      <div style={{ fontSize: '18px', fontWeight: '700', color: salesman.rootCauses.dropSize.value < 0 ? '#DF7649' : '#85A383', marginBottom: '4px' }}>
                                        {salesman.rootCauses.dropSize.value}%
                                      </div>
                                      <div style={{ fontSize: '11px', color: '#1B2A21' }}>
                                        {salesman.rootCauses.dropSize.label}
                                      </div>
                                    </div>
                                  </div>

                                  <div style={{
                                    fontSize: '11px',
                                    color: '#878B87',
                                    marginBottom: '10px',
                                    fontWeight: '600',
                                    letterSpacing: '0.05em',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                  }}>
                                    <BarChart3 size={14} />
                                    CHANNEL BREAKDOWN
                                  </div>
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {salesman.rootCauses.channel.map((ch, idx) => (
                                      <div
                                        key={idx}
                                        style={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'space-between',
                                          padding: '10px 12px',
                                          backgroundColor: '#FDFCFA',
                                          borderRadius: '4px',
                                          border: '1px solid #E7DDCA'
                                        }}
                                      >
                                        <div style={{ flex: 1 }}>
                                          <div style={{ fontSize: '13px', fontWeight: '600', color: '#0C2C18', marginBottom: '2px' }}>
                                            {ch.name}
                                          </div>
                                          {ch.issue && (
                                            <div style={{ fontSize: '11px', color: '#878B87' }}>
                                              Issue: {ch.issue}
                                            </div>
                                          )}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                          <span style={{ fontSize: '13px', fontWeight: '600', color: '#0C2C18' }}>
                                            {ch.achievement}%
                                          </span>
                                          <span style={{
                                            fontSize: '12px',
                                            fontWeight: '600',
                                            color: ch.growth < 0 ? '#DF7649' : '#85A383'
                                          }}>
                                            {ch.growth > 0 ? '+' : ''}{ch.growth}%
                                          </span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
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
  );
};

export default RSMDashboard;
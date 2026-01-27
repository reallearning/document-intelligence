"use client"
import React, { useState } from 'react';
import { TrendingUp, TrendingDown, MapPin, MessageSquare, Zap, Target, AlertCircle, Send, X, ChevronDown, ChevronRight, BarChart3, Activity, Users, Package } from 'lucide-react';

export default function RSMDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [conversationOpen, setConversationOpen] = useState(false);
  const [conversationContext, setConversationContext] = useState(null);
  const [expandedASM, setExpandedASM] = useState(null);
  const [expandedDist, setExpandedDist] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const chatMessagesEndRef = React.useRef(null);

  React.useEffect(() => {
    if (chatMessagesEndRef.current) {
      chatMessagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  const C = {
    darkGreen: '#0C2C18', sage: '#85A383', cream: '#E7DDCA',
    darkest: '#1B2A21', terra: '#DF7649', grey: '#878B87',
    off: '#FDFCFA', warn: '#D4A574'
  };

  const data = {
    rsmName: "Priya Sharma", region: "Mumbai & Pune Region",
    achievement: 89, gm: 38.5, targetGM: 40.0, wc: 12.5, team: 4,
    
    issues: [
      {
        id: 'I1', title: 'Mumbai Metro Revenue Shortfall', sev: 'critical',
        impact: { metric: 'Revenue', val: '-₹2.8Cr', pct: -24 },
        dims: {
          execution: { issue: '3 vacant routes, coverage 68% (from 82%)', impact: '45% of shortfall', sev: 'critical' },
          finance: { issue: 'Modern Trade 92% credit, ₹65k blocked', impact: '22% of shortfall', sev: 'high' },
          supply: { issue: 'Kurkure/Doritos stockout 8d, ₹85k backlog', impact: '18% of shortfall', sev: 'high' },
          forecast: { issue: 'Diwali forecast +18% vs flat', impact: '15% of shortfall', sev: 'medium' }
        },
        bizImpact: { revenue: '-₹2.8Cr', gm: -2.5, wc: '₹3.2Cr locked' },
        actions: [
          { act: 'Deploy 3 merchandisers to Andheri/Bandra (7d)', impact: '+₹125k', cost: '₹22k' },
          { act: 'Extend MT credit ₹4L', impact: 'Unblock ₹65k', cost: '₹4L WC' },
          { act: 'Move stock from Pune DC', impact: 'Fulfill ₹85k', cost: '₹12k' }
        ],
        outcome: { revenue: '+₹275k', ach: '+6.5%', gm: '+1.2%' },
        owner: 'Rahul Verma'
      },
      {
        id: 'I2', title: 'Margin Erosion Across Territory', sev: 'high',
        impact: { metric: 'Gross Margin', val: '-1.5%', pct: -3.8 },
        dims: {
          margin: { issue: 'GM% 40.0% → 38.5%', impact: 'Primary issue', sev: 'critical' },
          execution: { issue: 'Premium SKU 32% vs 42% target', impact: '38% of GM loss', sev: 'high' },
          finance: { issue: 'Trade discount 4.5% over budget', impact: '₹3.5L monthly', sev: 'medium' },
          forecast: { issue: 'Promotional costs 3.2% over plan', impact: 'Budget overrun', sev: 'medium' }
        },
        bizImpact: { gm: -1.5, absMargin: '-₹2.8Cr' },
        actions: [
          { act: 'Push premium pack focus (Doritos, Party pack)', impact: 'Recover 1.0% GM', cost: 'None' },
          { act: 'Tighten promotional approval', impact: 'Save ₹3.5L/mo', cost: 'None' }
        ],
        outcome: { gm: '+1.4%', absMargin: '+₹2.2Cr/mo' },
        owner: 'Multiple'
      },
      {
        id: 'I3', title: 'Working Capital Stress', sev: 'high',
        impact: { metric: 'Working Capital', val: '₹7.5Cr locked', pct: null },
        dims: {
          finance: { issue: '₹7.5Cr in receivables >50d', impact: 'Primary', sev: 'critical' },
          execution: { issue: '4 distributors near limit', impact: '₹1.8Cr blocking', sev: 'high' }
        },
        bizImpact: { revenue: '₹1.8Cr at risk', wc: '₹7.5Cr locked', dso: '48d vs 35' },
        actions: [
          { act: 'Collection drive >50d', impact: 'Free ₹7.5Cr', cost: 'None' },
          { act: 'Extend credit 4 distributors', impact: 'Protect ₹1.8Cr', cost: '₹12L WC' }
        ],
        outcome: { wc: 'Free ₹7.5Cr', dso: '→ 38d' },
        owner: 'Multiple + Finance'
      }
    ],

    asms: [
      {
        id: 'A1', name: 'Rahul Verma', territory: 'Mumbai Metro', health: 'critical',
        m: { ach: 76, gm: 37.2, credit: 'At Risk', stock: 4, wc: '₹3.2Cr' },
        trend: [70, 73, 75, 76],
        alerts: 3,
        insight: 'Multi-dimensional crisis: Route gaps (3 vacant) → credit stress (MT 92%) → margin pressure (22% promo vs 18%). Stockouts add ₹85k backlog.',
        dists: [
          {
            id: 'D1', name: 'Modern Trade Solutions', health: 'critical',
            m: { ach: 70, gm: 36.8, creditUtil: 92, dso: 48, fulfill: 85 },
            trend: [65, 68, 69, 70],
            gap: 3, 
            insight: 'Severe stress. 3 vacant routes → Vikram covers 1.8x, lost 12 outlets. 92% credit blocks ₹65k. Key SKU stockouts = ₹85k backlog.',
            rootCauseBreakdown: { execution: 45, credit: 22, supply: 18, margin: 12, forecast: 3 },
            sales: [
              { id: 'S1', name: 'Vikram Joshi', beat: 'Andheri W', ach: 65, health: 'critical', 
                rc: { dist: -28, days: -42, drop: -12 }, 
                outlets: { active: 38, lost: 12, target: 55 },
                productivity: { calls: 10, orders: 5, lines: 15 }
              },
              { id: 'S2', name: 'Neha Singh', beat: 'Bandra', ach: 72, health: 'warning', 
                rc: { dist: -8, days: -18, drop: -15 },
                outlets: { active: 48, lost: 3, target: 58 },
                productivity: { calls: 13, orders: 8, lines: 19 }
              }
            ]
          },
          {
            id: 'D2', name: 'Metro Snacks Distributors', health: 'warning',
            m: { ach: 80, gm: 37.5, creditUtil: 75, dso: 42, fulfill: 90 },
            trend: [78, 79, 80, 80],
            gap: 1,
            insight: 'Moderate underperformance. 1 vacant route affecting Powai coverage. Credit stable but DSO elevated.',
            rootCauseBreakdown: { execution: 55, credit: 18, supply: 12, margin: 10, forecast: 5 },
            sales: [
              { id: 'S3', name: 'Amit Patel', beat: 'Powai', ach: 80, health: 'warning',
                rc: { dist: -12, days: -22, drop: -8 },
                outlets: { active: 52, lost: 4, target: 62 },
                productivity: { calls: 12, orders: 7, lines: 18 }
              }
            ]
          }
        ]
      },
      {
        id: 'A2', name: 'Anjali Deshmukh', territory: 'Pune', health: 'warning',
        m: { ach: 88, gm: 39.2, credit: 'Stable', stock: 2, wc: '₹1.8Cr' },
        trend: [85, 87, 88, 88],
        alerts: 1,
        insight: 'Mixed. Pune city good but Hadapsar wholesale -12%. Premium packs 28pts below target.',
        dists: []
      },
      {
        id: 'A3', name: 'Sandeep Kumar', territory: 'Thane', health: 'healthy',
        m: { ach: 105, gm: 40.8, credit: 'Healthy', stock: 0, wc: 'Optimal' },
        trend: [99, 102, 104, 105],
        alerts: 0,
        insight: 'Outstanding. 105% via full merchandiser coverage + new pack excellence (82% vs 58% avg). Benchmark territory.',
        dists: []
      },
      {
        id: 'A4', name: 'Meera Iyer', territory: 'Navi Mumbai', health: 'warning',
        m: { ach: 90, gm: 38.8, credit: 'Stable', stock: 1, wc: '₹1.2Cr' },
        trend: [89, 90, 90, 90],
        alerts: 1,
        insight: 'Modern Trade channel -9.5% while GT/Wholesale stable. Competitive launches aggressive.',
        dists: []
      }
    ]
  };

  const hColor = h => ({ critical: C.terra, warning: C.warn, healthy: C.sage }[h] || C.grey);
  const hLabel = h => ({ critical: 'CRITICAL', warning: 'NEEDS ATTENTION', healthy: 'HEALTHY' }[h] || 'UNKNOWN');
  const sColor = s => ({ critical: C.terra, high: C.warn, medium: C.sage, low: C.grey }[s] || C.grey);

  const openConv = ctx => {
    setConversationContext(ctx);
    if (activeTab !== 'askmorrie') {
      setConversationOpen(true);
    }
    
    let msg = { type: 'ai', text: '', ts: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), sugg: [] };

    if (ctx.type === 'issue') {
      const i = ctx.data;
      msg.text = `**${i.title} Root Cause**\n\n**Situation:** ₹2.8Cr monthly revenue gap across 5 dimensions\n\n**Core issue:** Negative feedback loop, not separate problems\n• Route gap → ₹85k weekly loss\n• Revenue pressure → panic promotions → +₹18k weekly margin loss  \n• Cash generation slows → DSO +8 days → credit hits 92%\n• Orders blocked → stockouts → +₹22k weekly backlog\n• Now at ₹125k weekly total loss (accelerating 4% monthly)\n\n**Key insight:** Fixing execution breaks entire loop\n• Direct recovery: ₹125k/week\n• Indirect recovery: ₹150k/week (credit eases, margin improves, supply stabilizes)\n• Total impact: ₹275k/week, not ₹125k\n\n**Recommendation:** Deploy 3 merchandisers (₹132k) → ₹1.58Cr return over 3 months (12.0x ROI)`;
      msg.sugg = ['Why does loop accelerate vs stabilize?', 'Tipping point for unrecoverable damage?', 'What if I break loop at credit vs execution?', 'Calculate hidden costs in other metrics'];
    } else if (ctx.type === 'business') {
      if (ctx.subtype === 'growth') {
        msg.text = `**Where is growth coming from?**\n\n**MTD Mumbai + Pune: +8.2% vs LY**\n\n**Growth breakdown:**\n• +3.5% from more active outlets (~5% more outlets buying)\n• +4.2% from higher drop size per bill\n• +0.5% from bulk/one-time deals in Thane\n\n**Insight:** ~95% of growth is steady (outlets + order size), not one-off\n\n**Quality check:**\n• Drop size driven by party packs (multi-packs) not price inflation\n• Outlet growth concentrated in Modern Trade\n• Traditional retail flat at +1.5%`;
        msg.sugg = ['Which outlets drive drop size increase?', 'Is MT growth sustainable or promotion-driven?', 'Traditional retail: why flat despite more coverage?', 'Break down by ASM territory'];
      } else {
        msg.text = `**Analysis Capabilities**\n\n**Root cause forensics:** Causal chains, correlation vs causation, symptoms vs diseases\n\n**Intervention design:** ROI with second-order effects, recovery timelines, risk scenarios\n\n**Comparative intelligence:** Why similar inputs yield different outputs, capability gaps, replicability\n\nWhat do you need?`;
        msg.sugg = ['Biggest risk not visible in dashboard?', 'Success pattern worth replicating?', 'Which problem to solve first?', 'Highest ROI intervention across dimensions?'];
      }
    } else {
      msg.text = `**Analysis Capabilities**\n\n**Root cause forensics:** Causal chains, correlation vs causation, symptoms vs diseases\n\n**Intervention design:** ROI with second-order effects, recovery timelines, risk scenarios\n\n**Comparative intelligence:** Why similar inputs yield different outputs, capability gaps, replicability\n\nWhat do you need?`;
      msg.sugg = ['Biggest risk not visible in dashboard?', 'Success pattern worth replicating?', 'Which problem to solve first?', 'Highest ROI intervention across dimensions?'];
    }
    
    setChatMessages([msg]);
  };

  const sendMsg = msg => {
    if (!msg.trim()) return;

    const uMsg = { type: 'user', text: msg, ts: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    let aMsg = { type: 'ai', text: '', ts: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), sugg: [] };

    const lowerMsg = msg.toLowerCase();

    if (lowerMsg.includes('growth')) {
      aMsg.text = `**Growth Driver Analysis**\n\n**MTD Growth: +8.2% vs LY**\n\n**Primary drivers:**\n• Party pack adoption: +12% penetration\n• Modern Trade expansion: +18 new stores\n• Premium SKU mix: Doritos +22%, Lays Magic Masala +15%\n\n**Geographic mix:**\n• Mumbai: +6.5% (urban snacking occasions)\n• Pune: +11.2% (new outlet acquisition)\n• Thane: +9.8% (merchandising excellence)\n\n**Quality indicators:**\n• 85% from volume, 15% from price/mix\n• Repeat purchase rate: 78% (healthy)\n• New product contribution: 8% of growth`;
      aMsg.sugg = ['Which SKUs driving premium mix?', 'MT expansion sustainable?', 'Geographic concentration risk?', 'Forecast next quarter growth'];
    } else {
      aMsg.text = `I can help analyze this question. Based on your query, I can provide insights on:\n\n**Available analysis:**\n• Root cause diagnostics across all dimensions\n• Performance comparisons (ASMs, distributors, territories)\n• ROI calculations for interventions\n• Recovery timelines and action plans\n• Risk assessment and opportunity identification\n• Growth driver analysis\n• Efficiency and productivity gaps\n\nCould you rephrase or ask about a specific aspect you'd like me to analyze?`;
      aMsg.sugg = ['Where is growth coming from?', 'What are my biggest risks?', 'Which problems to solve first?', 'Calculate ROI for top interventions'];
    }

    setChatMessages([...chatMessages, uMsg, aMsg]);
    setInputMessage('');
  };

  const fmt = txt => {
    return txt.split('\n').map((line, i) => {
      const num = line.match(/^(\d+)\.\s*\*\*(.+?)\*\*\s*(.*)$/);
      if (num) {
        return (
          <div key={i} style={{ marginBottom: '12px', display: 'flex', gap: '12px' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: C.sage, color: 'white', fontSize: '12px', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{num[1]}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '600', color: C.darkGreen, marginBottom: '4px' }}>{num[2]}</div>
              <div style={{ color: C.darkest }}>{num[3]}</div>
            </div>
          </div>
        );
      }
      
      if (line.includes('**')) {
        const parts = [];
        let t = line, j = 0;
        while (t.includes('**')) {
          const s = t.indexOf('**'), e = t.indexOf('**', s + 2);
          if (e === -1) break;
          if (s > 0) parts.push(<span key={`t${j++}`}>{t.substring(0, s)}</span>);
          parts.push(<strong key={`b${j++}`} style={{ fontWeight: '600', color: C.darkGreen }}>{t.substring(s + 2, e)}</strong>);
          t = t.substring(e + 2);
        }
        if (t) parts.push(<span key={`t${j++}`}>{t}</span>);
        return <div key={i} style={{ marginBottom: line.trim() ? '8px' : '4px' }}>{parts}</div>;
      }
      
      return line.trim() ? <div key={i} style={{ marginBottom: '8px' }}>{line}</div> : <div key={i} style={{ height: '8px' }}></div>;
    });
  };

  const Sparkline = ({ data, color, height = 40 }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const points = data.map((val, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = height - ((val - min) / range) * height;
      return `${x},${y}`;
    }).join(' ');
    
    return (
      <svg width="100" height={height} style={{ display: 'block' }}>
        <polyline points={points} fill="none" stroke={color} strokeWidth="2" />
      </svg>
    );
  };

  return (
    <div className='overflow-auto h-screen' style={{ backgroundColor: C.cream, fontFamily: "'Inter', -apple-system, sans-serif" }}>
      {/* Header */}
      <div style={{ backgroundColor: C.darkGreen, padding: '32px', borderBottom: `1px solid ${C.sage}40` }}>
        <div style={{ maxWidth: conversationOpen ? 'none' : '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '11px', color: C.sage, marginBottom: '8px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Regional Sales Manager • PepsiCo Frito-Lay India</div>
              <h1 style={{ fontSize: '32px', fontWeight: '300', color: C.cream, marginBottom: '8px', letterSpacing: '-0.02em' }}>{data.rsmName}</h1>
              <div style={{ fontSize: '14px', color: C.sage, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={14} strokeWidth={1.5} />
                <span>{data.region}</span>
                <span style={{ margin: '0 8px', opacity: 0.4 }}>•</span>
                <span>{data.team} ASMs</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '32px' }}>
              {[
                ['Achievement', `${data.achievement}%`],
                ['Gross Margin', `${data.gm}%`],
                ['Working Capital', `₹${data.wc}Cr`]
              ].map(([l, v]) => (
                <div key={l}>
                  <div style={{ fontSize: '11px', color: C.sage, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{l}</div>
                  <div style={{ fontSize: '28px', fontWeight: '300', color: C.cream }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ backgroundColor: C.off, borderBottom: `1px solid ${C.darkGreen}15`, padding: '0 32px' }}>
        <div style={{ maxWidth: conversationOpen ? 'none' : '1400px', margin: '0 auto', display: 'flex', gap: '8px' }}>
          {['dashboard', 'deepdive', 'askmorrie'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '16px 24px',
                fontSize: '14px',
                fontWeight: activeTab === tab ? '600' : '400',
                color: activeTab === tab ? C.darkGreen : C.grey,
                backgroundColor: 'transparent',
                border: 'none',
                borderBottom: activeTab === tab ? `2px solid ${C.darkGreen}` : '2px solid transparent',
                cursor: 'pointer',
                fontFamily: "'Inter', sans-serif",
                textTransform: 'capitalize'
              }}
            >
              {tab === 'deepdive' ? 'ASM Performance' : tab === 'askmorrie' ? 'Ask Morrie' : 'Dashboard'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ display: 'flex', overflow: 'hidden', minHeight: 'calc(100vh - 190px)' }}>
        <div style={{ flex: conversationOpen ? '1 1 60%' : '1 1 100%', overflowY: 'auto', padding: '32px' }}>
          <div style={{ maxWidth: conversationOpen ? 'none' : '1400px', margin: '0 auto' }}>
            
            {activeTab === 'dashboard' && (
              <>
                {/* Critical Issues */}
                <div style={{ marginBottom: '40px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: `${C.terra}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <AlertCircle size={20} color={C.terra} />
                    </div>
                    <div>
                      <h2 style={{ fontSize: '22px', fontWeight: '500', color: C.darkGreen, margin: 0 }}>Critical Business Issues</h2>
                      <p style={{ fontSize: '13px', color: C.grey, margin: 0 }}>{data.issues.length} multi-dimensional issues requiring immediate action</p>
                    </div>
                  </div>

                  {data.issues.map(i => (
                    <div key={i.id} style={{ backgroundColor: 'white', borderRadius: '4px', border: `2px solid ${sColor(i.sev)}40`, overflow: 'hidden', marginBottom: '16px' }}>
                      <div style={{ padding: '24px', borderBottom: `1px solid ${C.darkGreen}10` }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                          <span style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '0.05em', color: sColor(i.sev), backgroundColor: `${sColor(i.sev)}20`, padding: '4px 8px', borderRadius: '2px', textTransform: 'uppercase' }}>{i.sev}</span>
                          <span style={{ fontSize: '12px', color: C.grey }}>Owner: {i.owner}</span>
                        </div>
                        <h3 style={{ fontSize: '20px', fontWeight: '600', color: C.darkGreen, marginBottom: '8px' }}>{i.title}</h3>
                        <div style={{ fontSize: '14px' }}>
                          <span style={{ color: C.grey }}>Primary Impact: </span>
                          <strong style={{ color: C.terra, fontSize: '16px' }}>{i.impact.val}</strong>
                          {i.impact.pct && <span style={{ color: C.terra, marginLeft: '6px' }}>({i.impact.pct}%)</span>}
                        </div>

                        <div style={{ padding: '16px', backgroundColor: C.off, borderRadius: '4px', marginTop: '16px', marginBottom: '16px' }}>
                          <div style={{ fontSize: '11px', fontWeight: '600', color: C.grey, marginBottom: '12px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Integrated Diagnosis Across Dimensions</div>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            {Object.entries(i.dims).map(([d, dt]) => (
                              <div key={d} style={{ padding: '12px', backgroundColor: 'white', borderRadius: '4px', borderLeft: `3px solid ${sColor(dt.sev)}` }}>
                                <div style={{ fontSize: '10px', fontWeight: '600', color: sColor(dt.sev), marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                  {d === 'execution' && '🎯 '}{d === 'finance' && '💰 '}{d === 'supply' && '📦 '}{d === 'margin' && '💹 '}{d === 'forecast' && '📊 '}{d}
                                </div>
                                <div style={{ fontSize: '12px', color: C.darkest, marginBottom: '4px', lineHeight: '1.4' }}>{dt.issue}</div>
                                <div style={{ fontSize: '11px', color: C.grey }}>{dt.impact}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px', marginBottom: '16px' }}>
                          {Object.entries(i.bizImpact).map(([k, v]) => (
                            <div key={k} style={{ padding: '12px', backgroundColor: `${C.terra}08`, borderRadius: '4px' }}>
                              <div style={{ fontSize: '10px', color: C.grey, marginBottom: '4px', textTransform: 'uppercase' }}>
                                {k === 'gm' ? 'GM Impact' : k === 'wc' ? 'Working Capital' : k}
                              </div>
                              <div style={{ fontSize: '16px', fontWeight: '600', color: C.terra }}>
                                {typeof v === 'number' ? (v > 0 ? '+' : '') + v + (k === 'gm' ? '%' : '') : v}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div style={{ padding: '16px', backgroundColor: `${C.sage}10`, borderRadius: '4px' }}>
                          <div style={{ fontSize: '11px', fontWeight: '600', color: C.sage, marginBottom: '12px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>⚡ Recommended Actions</div>
                          {i.actions.map((a, j) => (
                            <div key={j} style={{ padding: '10px 12px', backgroundColor: 'white', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: j < i.actions.length - 1 ? '8px' : 0 }}>
                              <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '13px', fontWeight: '500', color: C.darkGreen, marginBottom: '2px' }}>{j + 1}. {a.act}</div>
                                <div style={{ fontSize: '11px', color: C.grey }}>Cost: {a.cost}</div>
                              </div>
                              <div style={{ fontSize: '12px', fontWeight: '600', color: C.sage }}>{a.impact}</div>
                            </div>
                          ))}
                          {i.outcome && (
                            <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: `1px solid ${C.sage}30`, fontSize: '13px' }}>
                              <strong style={{ color: C.darkGreen }}>Expected Outcome: </strong>
                              <span style={{ color: C.darkest }}>
                                {Object.entries(i.outcome).map(([k, v], idx) => `${k}: ${v}${idx < Object.entries(i.outcome).length - 1 ? ', ' : ''}`)}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div style={{ padding: '16px 24px', backgroundColor: C.off, display: 'flex', gap: '12px' }}>
                        <button onClick={() => openConv({ type: 'issue', name: i.title, data: i })} style={{ flex: 1, padding: '12px', backgroundColor: C.darkGreen, color: 'white', border: 'none', borderRadius: '4px', fontSize: '13px', fontWeight: '500', cursor: 'pointer', fontFamily: "'Inter', sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                          <MessageSquare size={14} />Analyze with AI
                        </button>
                        <button style={{ flex: 1, padding: '12px', backgroundColor: C.sage, color: 'white', border: 'none', borderRadius: '4px', fontSize: '13px', fontWeight: '500', cursor: 'pointer', fontFamily: "'Inter', sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                          <Zap size={14} />Build Plan
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* AI Insights */}
                <div style={{ marginBottom: '40px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: `${C.sage}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Target size={20} color={C.sage} />
                      </div>
                      <div>
                        <h2 style={{ fontSize: '22px', fontWeight: '500', color: C.darkGreen, margin: 0 }}>AI Insights & Cross-Dimensional Patterns</h2>
                        <p style={{ fontSize: '13px', color: C.grey, margin: 0 }}>Patterns detected across all dimensions</p>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                    {[
                      { type: 'cascade', c: C.terra, lbl: '🔍 Root Cause Cascade', ttl: 'Route shortages triggering credit stress', dsc: 'Execution gaps → Lower revenue → Slower collections → Credit rises → Orders blocked. Affecting 55% of underperforming territories.' },
                      { type: 'margin', c: C.sage, lbl: '💡 Margin Opportunity', ttl: '₹2.8Cr margin recovery through pack mix', dsc: 'Premium packs (Doritos, Party Size) at 32% vs 42% target. Sandeep achieves 52%. Replicating recovers ₹2.8Cr in absolute margin.' },
                      { type: 'wc', c: C.warn, lbl: '⚠️ Cash Flow Risk', ttl: '₹7.5Cr locked in aged receivables', dsc: 'WC stress from >50d receivables. 4 distributors near limits risking ₹1.8Cr blocks.' },
                      { type: 'supply', c: C.sage, lbl: '📈 Quick Win', ttl: 'Fulfill ₹3.5Cr backlog via stock movement', dsc: 'Pune DC excess (680 cases) while Mumbai has ₹3.5Cr backlog. Inter-DC movement (₹48k) fulfills immediately. 73x ROI.' }
                    ].map((ins, idx) => (
                      <div key={idx} onClick={() => openConv({ type: ins.type, name: ins.ttl })} style={{ padding: '20px', backgroundColor: `${ins.c}08`, borderRadius: '4px', border: `1.5px solid ${ins.c}30`, cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                        <div style={{ fontSize: '11px', fontWeight: '600', color: ins.c, marginBottom: '10px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{ins.lbl}</div>
                        <h3 style={{ fontSize: '16px', fontWeight: '600', color: C.darkGreen, marginBottom: '10px', lineHeight: '1.3' }}>{ins.ttl}</h3>
                        <p style={{ fontSize: '13px', color: C.darkest, lineHeight: '1.6', margin: 0 }}>{ins.dsc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Performance Snapshot */}
                <div>
                  <h2 style={{ fontSize: '22px', fontWeight: '500', color: C.darkGreen, marginBottom: '20px' }}>Team Performance Snapshot</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                    {data.asms.map(a => (
                      <div key={a.id} style={{ backgroundColor: 'white', borderRadius: '4px', border: `2px solid ${hColor(a.health)}40`, padding: '20px', cursor: 'pointer', transition: 'all 0.2s', position: 'relative', overflow: 'hidden' }} onClick={() => openConv({ type: 'asm', name: a.name, data: a })} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', backgroundColor: hColor(a.health) }}></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: hColor(a.health) }}></div>
                          <span style={{ fontSize: '10px', fontWeight: '600', color: hColor(a.health), letterSpacing: '0.05em', textTransform: 'uppercase' }}>{hLabel(a.health)}</span>
                        </div>
                        <h3 style={{ fontSize: '15px', fontWeight: '600', color: C.darkGreen, marginBottom: '4px' }}>{a.name}</h3>
                        <div style={{ fontSize: '12px', color: C.grey, marginBottom: '16px' }}>{a.territory}</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                          {[
                            ['Achievement', a.m.ach + '%', a.m.ach >= 85],
                            ['GM%', a.m.gm + '%', a.m.gm >= data.targetGM],
                            ['Credit', a.m.credit, a.m.credit !== 'At Risk'],
                            ['Stock Issues', a.m.stock + ' SKUs', a.m.stock === 0]
                          ].map(([l, v, ok]) => (
                            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                              <span style={{ color: C.grey }}>{l}:</span>
                              <strong style={{ color: ok ? C.sage : C.terra }}>{v}</strong>
                            </div>
                          ))}
                        </div>
                        {a.alerts > 0 && <div style={{ padding: '8px', backgroundColor: `${C.terra}15`, borderRadius: '4px', fontSize: '11px', fontWeight: '600', color: C.terra, textAlign: 'center' }}>{a.alerts} alert{a.alerts > 1 ? 's' : ''}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'deepdive' && (
              <div>
                {data.asms.map(asm => (
                  <div key={asm.id} style={{ marginBottom: '24px', backgroundColor: 'white', borderRadius: '8px', border: `2px solid ${hColor(asm.health)}40`, overflow: 'hidden' }}>
                    {/* Rich ASM Header */}
                    <div onClick={() => setExpandedASM(expandedASM === asm.id ? null : asm.id)} style={{ padding: '24px', cursor: 'pointer', backgroundColor: C.off }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: hColor(asm.health) }}></div>
                            <h3 style={{ fontSize: '20px', fontWeight: '600', color: C.darkGreen, margin: 0 }}>{asm.name}</h3>
                            <span style={{ fontSize: '12px', color: C.grey }}>{asm.territory}</span>
                            <span style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '0.05em', color: hColor(asm.health), backgroundColor: `${hColor(asm.health)}20`, padding: '4px 8px', borderRadius: '12px', textTransform: 'uppercase' }}>{hLabel(asm.health)}</span>
                          </div>
                          <p style={{ fontSize: '13px', color: C.darkest, lineHeight: '1.6', margin: 0 }}>{asm.insight}</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '24px' }}>
                          <button onClick={(e) => { e.stopPropagation(); openConv({ type: 'asm', name: asm.name, data: asm }); }} style={{ padding: '10px 16px', backgroundColor: C.darkGreen, color: 'white', border: 'none', borderRadius: '4px', fontSize: '13px', fontWeight: '500', cursor: 'pointer', fontFamily: "'Inter', sans-serif", display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <MessageSquare size={14} />Analyze
                          </button>
                          {expandedASM === asm.id ? <ChevronDown size={20} color={C.darkGreen} /> : <ChevronRight size={20} color={C.darkGreen} />}
                        </div>
                      </div>

                      {/* Mini Performance Dashboard */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                        {[
                          { label: 'Achievement', value: asm.m.ach + '%', ok: asm.m.ach >= 85, icon: Target },
                          { label: 'GM%', value: asm.m.gm + '%', ok: asm.m.gm >= data.targetGM, icon: TrendingUp },
                          { label: 'Credit Health', value: asm.m.credit, ok: asm.m.credit !== 'At Risk', icon: Activity },
                          { label: 'Distributors', value: asm.dists.length + ' active', ok: true, icon: Users }
                        ].map((metric, i) => (
                          <div key={i} style={{ padding: '16px', backgroundColor: 'white', borderRadius: '4px', border: `1px solid ${C.darkGreen}15` }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                              <div style={{ fontSize: '11px', color: C.grey, textTransform: 'uppercase' }}>{metric.label}</div>
                              <metric.icon size={14} color={C.grey} />
                            </div>
                            <div style={{ fontSize: '24px', fontWeight: '600', color: metric.ok ? C.sage : C.terra, marginBottom: '8px' }}>{metric.value}</div>
                            <Sparkline data={asm.trend} color={metric.ok ? C.sage : C.terra} height={30} />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Expanded Distributors */}
                    {expandedASM === asm.id && asm.dists.length > 0 && (
                      <div style={{ padding: '24px', borderTop: `2px solid ${C.darkGreen}15` }}>
                        {asm.dists.map(dist => (
                          <div key={dist.id} style={{ marginBottom: '24px', padding: '20px', backgroundColor: C.off, borderRadius: '8px', border: `2px solid ${hColor(dist.health)}40` }}>
                            {/* Rich Distributor Header */}
                            <div onClick={() => setExpandedDist(expandedDist === dist.id ? null : dist.id)} style={{ cursor: 'pointer' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                <div style={{ flex: 1 }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                    <h4 style={{ fontSize: '18px', fontWeight: '600', color: C.darkGreen, margin: 0 }}>{dist.name}</h4>
                                    <span style={{ fontSize: '10px', fontWeight: '600', color: hColor(dist.health), backgroundColor: `${hColor(dist.health)}20`, padding: '3px 8px', borderRadius: '8px', textTransform: 'uppercase' }}>{hLabel(dist.health)}</span>
                                    {dist.gap > 0 && <span style={{ fontSize: '11px', color: C.terra, backgroundColor: `${C.terra}15`, padding: '3px 8px', borderRadius: '8px' }}>{dist.gap} vacant route{dist.gap > 1 ? 's' : ''}</span>}
                                  </div>
                                  <p style={{ fontSize: '13px', color: C.darkest, lineHeight: '1.5', margin: 0 }}>{dist.insight}</p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '16px' }}>
                                  <button onClick={(e) => { e.stopPropagation(); openConv({ type: 'distributor', name: dist.name, data: dist }); }} style={{ padding: '8px 14px', backgroundColor: C.sage, color: 'white', border: 'none', borderRadius: '4px', fontSize: '12px', fontWeight: '500', cursor: 'pointer', fontFamily: "'Inter', sans-serif", display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <MessageSquare size={12} />Analyze
                                  </button>
                                  {expandedDist === dist.id ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                                </div>
                              </div>

                              {/* Distributor Performance Cards */}
                              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', marginBottom: '16px' }}>
                                {[
                                  { label: 'Achievement', value: dist.m.ach + '%', ok: dist.m.ach >= 85 },
                                  { label: 'GM%', value: dist.m.gm + '%', ok: dist.m.gm >= 25 },
                                  { label: 'Credit Util', value: dist.m.creditUtil + '%', ok: dist.m.creditUtil < 90 },
                                  { label: 'DSO', value: dist.m.dso + 'd', ok: dist.m.dso <= 35 },
                                  { label: 'Fulfillment', value: dist.m.fulfill + '%', ok: dist.m.fulfill >= 95 }
                                ].map((m, i) => (
                                  <div key={i} style={{ padding: '12px', backgroundColor: 'white', borderRadius: '4px' }}>
                                    <div style={{ fontSize: '10px', color: C.grey, marginBottom: '6px', textTransform: 'uppercase' }}>{m.label}</div>
                                    <div style={{ fontSize: '20px', fontWeight: '600', color: m.ok ? C.sage : C.terra }}>{m.value}</div>
                                  </div>
                                ))}
                              </div>

                              {/* Root Cause Breakdown Chart */}
                              <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '4px' }}>
                                <div style={{ fontSize: '11px', fontWeight: '600', color: C.grey, marginBottom: '12px', textTransform: 'uppercase' }}>Root Cause Breakdown</div>
                                <div style={{ display: 'flex', gap: '4px', marginBottom: '12px', height: '24px' }}>
                                  {Object.entries(dist.rootCauseBreakdown).map(([cause, pct]) => (
                                    <div key={cause} style={{ width: `${pct}%`, backgroundColor: { execution: C.terra, credit: C.warn, supply: C.sage, margin: '#9CA3AF', forecast: '#D1D5DB' }[cause], borderRadius: '2px' }} title={`${cause}: ${pct}%`}></div>
                                  ))}
                                </div>
                                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                                  {Object.entries(dist.rootCauseBreakdown).map(([cause, pct]) => (
                                    <div key={cause} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: { execution: C.terra, credit: C.warn, supply: C.sage, margin: '#9CA3AF', forecast: '#D1D5DB' }[cause] }}></div>
                                      <span style={{ fontSize: '12px', color: C.darkest, textTransform: 'capitalize' }}>{cause}: {pct}%</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Expanded Merchandiser Details */}
                            {expandedDist === dist.id && dist.sales && dist.sales.length > 0 && (
                              <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: `1px solid ${C.darkGreen}15` }}>
                                <h5 style={{ fontSize: '16px', fontWeight: '600', color: C.darkGreen, marginBottom: '16px' }}>Merchandiser Performance Details</h5>
                                
                                {/* Merchandiser Comparison Bars */}
                                <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: 'white', borderRadius: '4px' }}>
                                  {dist.sales.map((tsr, i) => (
                                    <div key={tsr.id} style={{ marginBottom: i < dist.sales.length - 1 ? '16px' : 0 }}>
                                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                        <div>
                                          <span style={{ fontSize: '14px', fontWeight: '600', color: C.darkGreen }}>{tsr.name}</span>
                                          <span style={{ fontSize: '12px', color: C.grey, marginLeft: '8px' }}>• {tsr.beat}</span>
                                        </div>
                                        <span style={{ fontSize: '18px', fontWeight: '600', color: tsr.ach >= 85 ? C.sage : C.terra }}>{tsr.ach}%</span>
                                      </div>
                                      <div style={{ height: '32px', backgroundColor: C.cream, borderRadius: '4px', overflow: 'hidden', position: 'relative' }}>
                                        <div style={{ height: '100%', width: `${tsr.ach}%`, backgroundColor: tsr.ach >= 85 ? C.sage : C.terra, transition: 'width 0.3s' }}></div>
                                        <div style={{ position: 'absolute', left: '85%', top: 0, bottom: 0, width: '2px', backgroundColor: C.darkGreen, opacity: 0.3 }}></div>
                                      </div>
                                    </div>
                                  ))}
                                </div>

                                {/* Detailed Merchandiser Cards */}
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
                                  {dist.sales.map(tsr => (
                                    <div key={tsr.id} style={{ padding: '16px', backgroundColor: 'white', borderRadius: '4px', border: `1px solid ${hColor(tsr.health)}40` }}>
                                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                        <div>
                                          <div style={{ fontSize: '15px', fontWeight: '600', color: C.darkGreen, marginBottom: '2px' }}>{tsr.name}</div>
                                          <div style={{ fontSize: '12px', color: C.grey }}>{tsr.beat}</div>
                                        </div>
                                        <div style={{ fontSize: '24px', fontWeight: '600', color: tsr.ach >= 85 ? C.sage : C.terra }}>{tsr.ach}%</div>
                                      </div>

                                      {/* Outlet Coverage */}
                                      <div style={{ padding: '12px', backgroundColor: C.off, borderRadius: '4px', marginBottom: '12px' }}>
                                        <div style={{ fontSize: '11px', color: C.grey, marginBottom: '6px', textTransform: 'uppercase' }}>Outlet Coverage</div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                                          <span>Active: {tsr.outlets.active}</span>
                                          <span>Target: {tsr.outlets.target}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                                          <span style={{ color: C.terra }}>Lost: {tsr.outlets.lost}</span>
                                          <span>{Math.round((tsr.outlets.active / tsr.outlets.target) * 100)}% coverage</span>
                                        </div>
                                      </div>

                                      {/* Productivity Metrics */}
                                      <div style={{ padding: '12px', backgroundColor: C.off, borderRadius: '4px', marginBottom: '12px' }}>
                                        <div style={{ fontSize: '11px', color: C.grey, marginBottom: '8px', textTransform: 'uppercase' }}>Productivity</div>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                                          {[
                                            ['Calls/Day', tsr.productivity.calls],
                                            ['Orders/Day', tsr.productivity.orders],
                                            ['Lines/Order', tsr.productivity.lines]
                                          ].map(([l, v]) => (
                                            <div key={l}>
                                              <div style={{ fontSize: '9px', color: C.grey }}>{l}</div>
                                              <div style={{ fontSize: '16px', fontWeight: '600', color: C.darkGreen }}>{v}</div>
                                            </div>
                                          ))}
                                        </div>
                                      </div>

                                      {/* Root Causes */}
                                      <div style={{ fontSize: '11px', color: C.grey, marginBottom: '8px', textTransform: 'uppercase' }}>Performance Drivers</div>
                                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                                        {Object.entries(tsr.rc).map(([k, v]) => (
                                          <div key={k} style={{ padding: '8px', backgroundColor: v < -10 ? `${C.terra}10` : C.off, borderRadius: '4px' }}>
                                            <div style={{ fontSize: '9px', color: C.grey, fontWeight: '600', marginBottom: '4px', textTransform: 'uppercase' }}>{k === 'dist' ? 'Distribution' : k === 'days' ? 'Mandays' : 'Drop Size'}</div>
                                            <div style={{ fontSize: '16px', fontWeight: '700', color: v < 0 ? C.terra : C.sage }}>{v > 0 ? '+' : ''}{v}%</div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'askmorrie' && (
              <div style={{ height: 'calc(100vh - 240px)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ flex: 1, overflowY: 'auto', padding: '32px', backgroundColor: C.cream }}>
                  {chatMessages.length === 0 ? (
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                      <div style={{ marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '15px', fontWeight: '600', color: C.darkGreen, marginBottom: '12px' }}>Popular questions:</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                          {[
                            'Where is growth really coming from?',
                            'Is the business getting stronger or more risky?',
                            'Premium vs economy mix shift analysis?',
                            'Where are we working hard but not getting results?',
                            'Get extra ₹1.5 Cr without hurting margin?',
                            'Minimum levers to go from 89% → 98%?'
                          ].map((q, idx) => (
                            <button 
                              key={idx}
                              onClick={() => {
                                const typeMap = {
                                  'Where is growth really coming from?': 'growth',
                                  'Is the business getting stronger or more risky?': 'risk'
                                };
                                openConv({ type: 'business', subtype: typeMap[q] || 'general', name: q });
                              }}
                              style={{ 
                                padding: '12px 14px', 
                                backgroundColor: 'white', 
                                border: `1.5px solid ${C.darkGreen}20`, 
                                borderRadius: '6px', 
                                fontSize: '13px', 
                                color: C.darkGreen, 
                                textAlign: 'left', 
                                cursor: 'pointer', 
                                fontFamily: "'Inter', sans-serif", 
                                transition: 'all 0.2s',
                                fontWeight: '500',
                                lineHeight: '1.3'
                              }}
                              onMouseEnter={e => { 
                                e.currentTarget.style.backgroundColor = `${C.sage}08`; 
                                e.currentTarget.style.borderColor = C.sage;
                                e.currentTarget.style.transform = 'translateX(4px)';
                              }}
                              onMouseLeave={e => { 
                                e.currentTarget.style.backgroundColor = 'white'; 
                                e.currentTarget.style.borderColor = `${C.darkGreen}20`;
                                e.currentTarget.style.transform = 'translateX(0)';
                              }}
                            >
                              {q}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                      {chatMessages.map((m, i) => (
                        <div key={i} style={{ marginBottom: '24px' }}>
                          <div style={{ padding: '16px 20px', backgroundColor: m.type === 'user' ? C.darkGreen : 'white', color: m.type === 'user' ? C.cream : C.darkest, borderRadius: m.type === 'user' ? '12px 12px 4px 12px' : '12px 12px 12px 4px', fontSize: '14px', lineHeight: '1.6', boxShadow: m.type === 'user' ? '0 2px 8px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.08)', border: m.type === 'user' ? 'none' : `1px solid ${C.darkGreen}10` }}>
                            {m.type === 'user' ? m.text : fmt(m.text)}
                          </div>
                          <div style={{ fontSize: '11px', color: C.grey, marginTop: '6px', paddingLeft: m.type === 'user' ? '0' : '4px', textAlign: m.type === 'user' ? 'right' : 'left' }}>{m.ts}</div>
                          {m.sugg && (
                            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              <div style={{ fontSize: '11px', color: C.grey, fontWeight: '500', paddingLeft: '4px' }}>Suggested follow-ups:</div>
                              {m.sugg.map((s, j) => (
                                <button key={j} onClick={() => sendMsg(s)} style={{ padding: '12px 16px', backgroundColor: 'white', border: `1.5px solid ${C.darkGreen}25`, borderRadius: '8px', fontSize: '13px', color: C.darkGreen, textAlign: 'left', cursor: 'pointer', fontFamily: "'Inter', sans-serif", transition: 'all 0.2s', fontWeight: '500' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = `${C.sage}10`; e.currentTarget.style.borderColor = C.sage; e.currentTarget.style.transform = 'translateX(4px)'; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.borderColor = `${C.darkGreen}25`; e.currentTarget.style.transform = 'translateX(0)'; }}>
                                  {s}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                      <div ref={chatMessagesEndRef} />
                    </div>
                  )}
                </div>

                <div style={{ padding: '20px 32px', borderTop: `1px solid ${C.darkGreen}15`, backgroundColor: 'white' }}>
                  <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', gap: '12px' }}>
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={e => setInputMessage(e.target.value)}
                      onKeyPress={e => e.key === 'Enter' && sendMsg(inputMessage)}
                      placeholder="Ask anything about your territory..."
                      style={{
                        flex: 1,
                        padding: '14px 18px',
                        fontSize: '14px',
                        border: `1.5px solid ${C.darkGreen}30`,
                        borderRadius: '8px',
                        fontFamily: "'Inter', sans-serif",
                        outline: 'none',
                        backgroundColor: C.cream
                      }}
                    />
                    <button
                      onClick={() => sendMsg(inputMessage)}
                      disabled={!inputMessage.trim()}
                      style={{
                        padding: '14px 28px',
                        backgroundColor: inputMessage.trim() ? C.darkGreen : C.grey,
                        color: C.cream,
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: inputMessage.trim() ? 'pointer' : 'not-allowed',
                        fontFamily: "'Inter', sans-serif"
                      }}
                    >
                      Ask
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {conversationOpen && (
          <div style={{ flex: '0 0 40%', borderLeft: `1px solid ${C.darkGreen}15`, backgroundColor: 'white', display: 'flex', flexDirection: 'column', maxHeight: '100%' }}>
            <div style={{ padding: '20px', borderBottom: `1px solid ${C.darkGreen}15`, backgroundColor: C.off }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: C.sage, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: '600', color: 'white' }}>M</div>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: C.darkGreen, margin: 0 }}>Chat with Morrie</h3>
                  </div>
                  <p style={{ fontSize: '12px', color: C.grey, margin: 0, paddingLeft: '48px' }}>
                    {conversationContext?.name}
                  </p>
                </div>
                <button onClick={() => setConversationOpen(false)} style={{ padding: '6px', backgroundColor: 'transparent', color: C.grey, border: 'none', borderRadius: '4px', cursor: 'pointer' }}><X size={20} /></button>
              </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
              {chatMessages.map((m, i) => (
                <div key={i} style={{ marginBottom: '16px' }}>
                  <div style={{ padding: '16px 18px', backgroundColor: m.type === 'user' ? C.darkGreen : C.off, color: m.type === 'user' ? C.cream : C.darkest, borderRadius: m.type === 'user' ? '12px 12px 4px 12px' : '12px 12px 12px 4px', fontSize: '14px', lineHeight: '1.6', boxShadow: m.type === 'user' ? '0 2px 4px rgba(0,0,0,0.1)' : '0 1px 2px rgba(0,0,0,0.05)' }}>
                    {m.type === 'user' ? m.text : fmt(m.text)}
                  </div>
                  <div style={{ fontSize: '11px', color: C.grey, marginTop: '6px', paddingLeft: m.type === 'user' ? '0' : '4px', textAlign: m.type === 'user' ? 'right' : 'left' }}>{m.ts}</div>
                  {m.sugg && (
                    <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ fontSize: '11px', color: C.grey, fontWeight: '500', paddingLeft: '4px' }}>Suggested questions:</div>
                      {m.sugg.map((s, j) => (
                        <button key={j} onClick={() => sendMsg(s)} style={{ padding: '12px 16px', backgroundColor: 'white', border: `1.5px solid ${C.darkGreen}25`, borderRadius: '8px', fontSize: '13px', color: C.darkGreen, textAlign: 'left', cursor: 'pointer', fontFamily: "'Inter', sans-serif", transition: 'all 0.2s', fontWeight: '500' }}>
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div ref={chatMessagesEndRef} />
            </div>

            <div style={{ padding: '16px', borderTop: `1px solid ${C.darkGreen}15`, backgroundColor: C.off }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input type="text" value={inputMessage} onChange={e => setInputMessage(e.target.value)} onKeyPress={e => { if (e.key === 'Enter') sendMsg(inputMessage); }} placeholder="Ask about any dimension..." style={{ flex: 1, padding: '12px 16px', border: `1px solid ${C.darkGreen}20`, borderRadius: '8px', fontSize: '13px', fontFamily: "'Inter', sans-serif", outline: 'none' }} />
                <button onClick={() => sendMsg(inputMessage)} style={{ padding: '12px 18px', backgroundColor: C.darkGreen, color: C.cream, border: 'none', borderRadius: '8px', cursor: 'pointer' }}><Send size={16} /></button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
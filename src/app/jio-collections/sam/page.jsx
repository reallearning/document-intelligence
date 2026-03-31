"use client";
import { useState } from "react";

const C={bg:"#FAFAF8",card:"#FFFFFF",border:"#E5E2DB",borderLight:"#F0EDE7",text:"#1C1C1C",sub:"#555",muted:"#999",lt:"#CCC",
  accent:"#2D5A3D",accentPale:"#EAF2EF",copper:"#946B1A",copperPale:"#FDFAF0",
  red:"#B33A3A",redPale:"#FDF3F3",blue:"#3B6FA0",bluePale:"#EFF5FB",
  amber:"#C47D15",amberPale:"#FFF8ED",green:"#27AE60",greenPale:"#EAFAF0"};
const sn="'IBM Plex Sans',-apple-system,sans-serif";const sr="Georgia,serif";const mn="'JetBrains Mono',monospace";
const Bar=({pct,c=C.accent,h=5})=>(<div style={{height:h,background:C.borderLight,borderRadius:h/2,overflow:"hidden"}}><div style={{height:h,borderRadius:h/2,background:c,width:`${Math.min(pct,100)}%`,transition:"width 0.5s"}}/></div>);

function SrcBadge({ids}){const ds={core:{l:"Core Banking",c:C.accent},bureau:{l:"Bureau",c:C.accent},news:{l:"News",c:C.red},gst:{l:"GST",c:C.copper},callnotes:{l:"Agent calls",c:C.blue},commodity:{l:"Commodity",c:C.amber}};return(<div style={{display:"flex",gap:5,flexWrap:"wrap"}}>{ids.map(id=>{const s=ds[id];return s?(<span key={id} style={{display:"inline-flex",alignItems:"center",gap:4,padding:"2px 7px",borderRadius:4,background:s.c===C.accent?C.accentPale:s.c===C.red?C.redPale:s.c===C.blue?C.bluePale:C.copperPale,fontSize:9,fontFamily:mn}}><span style={{width:4,height:4,borderRadius:"50%",background:s.c}}/><span style={{color:C.sub}}>{s.l}</span></span>):null;})}</div>);}
function SevIcon({sev}){const m={critical:{bg:C.redPale,bc:C.red,ch:"!"},warning:{bg:C.copperPale,bc:C.copper,ch:"⏱"},positive:{bg:C.accentPale,bc:C.accent,ch:"✓"},info:{bg:C.bluePale,bc:C.blue,ch:"i"}};const s=m[sev]||m.info;return(<div style={{width:28,height:28,borderRadius:"50%",background:s.bg,border:`1.5px solid ${s.bc}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{fontSize:sev==="critical"?14:12,color:s.bc,fontWeight:700}}>{s.ch}</span></div>);}

// ═══ DECISION TRAIL MODAL ═══
function DecisionTrail({title,subtitle,steps,onClose}){
  return(<div><div onClick={onClose} style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.35)",zIndex:300,backdropFilter:"blur(2px)"}}/><div style={{position:"fixed",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:700,maxHeight:"82vh",background:C.card,borderRadius:10,boxShadow:"0 16px 64px rgba(0,0,0,0.18)",zIndex:301,display:"flex",flexDirection:"column",overflow:"hidden"}}><div style={{padding:"20px 28px",borderBottom:`1px solid ${C.border}`}}><div style={{fontSize:10,fontFamily:mn,color:C.accent,letterSpacing:"0.1em",fontWeight:600,marginBottom:10}}>AGENT DECISION TRAIL</div><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}><div style={{flex:1,paddingRight:20}}><div style={{fontFamily:sr,fontSize:17,fontWeight:700,lineHeight:1.35}}>{title}</div>{subtitle&&<div style={{fontSize:12,color:C.muted,marginTop:4}}>{subtitle}</div>}</div><button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",fontSize:22,color:C.muted,lineHeight:1}}>×</button></div></div><div style={{flex:1,overflowY:"auto",padding:"24px 28px"}}>{steps.map((s,i)=>(<div key={i} style={{display:"flex",gap:16}}><div style={{display:"flex",flexDirection:"column",alignItems:"center",width:28,flexShrink:0}}><div style={{width:28,height:28,borderRadius:"50%",border:`1.5px solid ${s.kgC||C.blue}`,background:C.card,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontSize:10,color:s.kgC||C.blue}}>◉</span></div>{i<steps.length-1&&<div style={{width:1,flex:1,minHeight:16,background:C.border}}/>}</div><div style={{flex:1,paddingBottom:i<steps.length-1?20:0}}><div style={{fontSize:14,fontWeight:600,marginBottom:3}}>{s.agent}</div>{s.source&&<div style={{background:C.bg,border:`1px solid ${C.border}`,borderRadius:6,padding:"12px 14px"}}><div style={{fontSize:10,color:C.muted,marginBottom:4}}>SOURCE: {s.source}</div>{s.finding&&<div style={{fontSize:12,lineHeight:1.5}}><strong style={{color:C.copper}}>Finding: </strong><span style={{color:C.sub}}>{s.finding}</span></div>}{s.inference&&<div style={{fontSize:12,marginTop:4}}><span style={{color:C.accent,fontStyle:"italic"}}>Inference: {s.inference}</span></div>}</div>}</div></div>))}</div></div></div>);
}

// ═══ CONV PANEL ═══
function ConvPanel({messages,onClose,onAsk}){const[q,setQ]=useState("");const send=()=>{if(q.trim()){onAsk(q.trim());setQ("");}};return(<div style={{position:"fixed",top:0,right:0,width:420,height:"100vh",background:C.card,borderLeft:`1px solid ${C.border}`,boxShadow:"-4px 0 24px rgba(0,0,0,0.08)",zIndex:200,display:"flex",flexDirection:"column"}}><div style={{padding:"14px 16px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:20,height:20,borderRadius:"50%",background:C.accent,color:"#fff",fontSize:9,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>Q</div><span style={{fontSize:13,fontWeight:600}}>Discuss with questt.</span></div><button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",fontSize:18,color:C.muted}}>×</button></div><div style={{flex:1,overflowY:"auto",padding:14}}>{messages.map((m,i)=>(<div key={i} style={{marginBottom:10}}>{m.role==="user"?(<div style={{display:"flex",justifyContent:"flex-end"}}><div style={{padding:"8px 12px",background:C.accentPale,borderRadius:8,fontSize:12,color:C.accent,maxWidth:"85%"}}>{m.text}</div></div>):(<div>{m.agents&&<div style={{display:"flex",gap:4,marginBottom:4}}>{m.agents.map((a,j)=>(<span key={j} style={{fontSize:9,fontFamily:mn,color:C.accent,padding:"2px 6px",background:C.accentPale,borderRadius:3}}>{a} Agent</span>))}</div>}<div style={{fontSize:12,color:C.sub,lineHeight:1.6,whiteSpace:"pre-line"}}>{m.text}</div>{m.followUps&&<div style={{display:"flex",flexDirection:"column",gap:4,marginTop:8}}>{m.followUps.map((f,j)=>(<button key={j} onClick={()=>onAsk(f)} style={{padding:"5px 8px",background:C.bg,border:`1px solid ${C.border}`,borderRadius:5,fontSize:10,color:C.sub,cursor:"pointer",fontFamily:sn,textAlign:"left"}}>{f}</button>))}</div>}</div>)}</div>))}</div><div style={{padding:"10px 14px",borderTop:`1px solid ${C.border}`,display:"flex",gap:8}}><input value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Ask a follow-up..." style={{flex:1,padding:"8px 10px",border:`1px solid ${C.border}`,borderRadius:6,fontSize:12,fontFamily:sn,outline:"none"}}/><button onClick={send} style={{padding:"8px 14px",background:C.accent,color:"#fff",border:"none",borderRadius:6,fontSize:11,fontWeight:600,cursor:"pointer"}}>→</button></div></div>);}

// ═══════════════════════════════════════════════════
// DATA — Portfolio-level, bucket movement, macro triggers
// ═══════════════════════════════════════════════════

const buckets=[
  {id:"b030",label:"0–30 DPD",count:4170,value:"₹2,810Cr",pct:53,prev:5017,delta:"-847",c:C.amber},
  {id:"b3060",label:"30–60 DPD",count:1847,value:"₹1,420Cr",pct:19,prev:1000,delta:"+847",c:C.copper,spike:true},
  {id:"b6090",label:"60–90 DPD",count:680,value:"₹580Cr",pct:9,prev:695,delta:"-15",c:C.red},
  {id:"b90",label:"90+ DPD",count:410,value:"₹320Cr",pct:5,prev:415,delta:"-5",c:C.red},
  {id:"npa",label:"NPA",count:230,value:"₹180Cr",pct:3,prev:228,delta:"+2",c:"#333"},
];

const segments=[
  {id:"hosp",name:"Hospitality & Travel",accounts:847,value:"₹142Cr",riskLevel:"—",trigger:"Geopolitical — Iran-Israel escalation",bucket:"30-60 (reclassified)",status:"Action required",c:C.red,
    territories:[
      {name:"Mumbai",accounts:218,value:"₹38Cr",topAccounts:["Vikram Khanna ₹2.8Cr DPD 18","Seaside Hotels ₹1.9Cr DPD 12","Gateway Restaurants ₹0.8Cr DPD 22"]},
      {name:"Delhi-NCR",accounts:195,value:"₹32Cr",topAccounts:["Priya Hospitality ₹1.2Cr DPD 35","Royal Caterers ₹0.9Cr DPD 28","Capital Tours ₹0.7Cr DPD 15"]},
      {name:"Goa",accounts:142,value:"₹18Cr",topAccounts:["Coastal Resorts ₹3.1Cr DPD 8","Beach Shack Collective ₹0.4Cr DPD 20"]},
      {name:"Rajasthan",accounts:108,value:"₹14Cr",topAccounts:["Heritage Hotels Group ₹2.2Cr DPD 25","Desert Safari Ops ₹0.6Cr DPD 18"]},
      {name:"Others",accounts:184,value:"₹40Cr",topAccounts:["Deepak Hotels (Pune) ₹4.5Cr DPD 42","Sunrise Tours (Bangalore) ₹1.8Cr DPD 25"]},
    ]},
  {id:"textile",name:"Textile MSME",accounts:89,value:"₹18Cr",riskLevel:"38%",trigger:"Commodity — Cotton +22%",bucket:"0-30",status:"Monitor",c:C.amber,
    territories:[
      {name:"Gujarat",accounts:32,value:"₹6.8Cr",topAccounts:["Surat Fabrics ₹1.2Cr DPD 8","Ahmedabad Textiles ₹0.9Cr DPD 14"]},
      {name:"Tamil Nadu",accounts:24,value:"₹4.2Cr",topAccounts:["Tirupur Exports ₹0.8Cr DPD 10","Coimbatore Mills ₹0.6Cr DPD 5"]},
      {name:"Maharashtra",accounts:18,value:"₹3.8Cr",topAccounts:["Amit Traders ₹0.15Cr DPD 12"]},
      {name:"Rajasthan",accounts:15,value:"₹3.2Cr",topAccounts:["Jaipur Weaves ₹0.5Cr DPD 8"]},
    ]},
  {id:"salaried",name:"Salaried — Job Loss / Stress",accounts:48,value:"₹22Cr",riskLevel:"64%",trigger:"Call notes + bureau signals",bucket:"0-30 / 30-60",status:"Treatment review",c:C.copper,
    territories:[
      {name:"Bangalore",accounts:14,value:"₹6.2Cr",topAccounts:["IT layoff cluster — 8 accounts from 2 employers"]},
      {name:"Mumbai",accounts:12,value:"₹5.8Cr",topAccounts:["Rahul Menon ₹0.042Cr DPD 22 — insurance payout April 10"]},
      {name:"Hyderabad",accounts:11,value:"₹5.4Cr",topAccounts:["Pharma restructuring — 6 accounts"]},
      {name:"Others",accounts:11,value:"₹4.6Cr",topAccounts:[]},
    ]},
  {id:"performing",name:"Standard Book — Performing",accounts:5210,value:"₹3,800Cr",riskLevel:"4%",trigger:"None",bucket:"0-30",status:"BAU",c:C.accent,territories:[]},
  {id:"hardcoll",name:"Hard Collections (60+ DPD)",accounts:1320,value:"₹880Cr",riskLevel:"—",trigger:"—",bucket:"60-90 / 90+ / NPA",status:"Legal + Settlement",c:C.red,
    territories:[
      {name:"Mumbai",accounts:380,value:"₹265Cr",topAccounts:["12 accounts >₹5Cr — legal proceedings active"]},
      {name:"Delhi-NCR",accounts:310,value:"₹218Cr",topAccounts:["8 accounts >₹5Cr — settlement negotiation"]},
      {name:"Others",accounts:630,value:"₹397Cr",topAccounts:[]},
    ]},
];

const topAccounts=[
  {name:"Deepak Hotels",product:"Commercial Loan",value:"₹4.5Cr",dpd:42,bucket:"30-60",territory:"Pune",trigger:"Hospitality",treatment:"RM call — restructure",flag:"Sector",prob:"84%",npaProb:"52%",
    trail:[{step:"Account snapshot",source:"Core Banking",finding:"₹4.5Cr commercial, DPD 42. Budget hotel chain, 5 properties in Pune. Revenue declining 3 consecutive quarters: ₹82L → ₹68L → ₹54L."},{step:"Structural decline",source:"GST",finding:"Declining before crisis — Pune business travel already soft from IT spending cuts. Geopolitical event accelerates existing trajectory."},{step:"Risk assessment",source:"Delinquency model",finding:"60-90 risk: 84%. NPA risk: 52% — highest in portfolio. Structural decline makes this fundamentally different from accounts healthy before the crisis."},{step:"Viability question",source:"Collections strategy",finding:"Is the business viable long-term? If yes: restructure. If no: settlement at 70% (₹3.15Cr recovery). Need RM visit to assess. LTV ~55% — recoverable."}]},
  {name:"Coastal Resorts",product:"Term Loan",value:"₹3.1Cr",dpd:8,bucket:"0-30",territory:"Goa",trigger:"Hospitality",treatment:"Proactive outreach",flag:"Sector",prob:"78%",npaProb:"34%",
    trail:[{step:"Account snapshot",source:"Core Banking",finding:"Term loan ₹3.1Cr, DPD 8. Resort property in Goa — 100% tourist revenue."},{step:"Geopolitical event",source:"News",finding:"Goa is among the most tourism-dependent territories. International visitors are 60%+ of revenue. Travel restrictions = immediate revenue collapse."},{step:"Risk assessment",source:"Delinquency model",finding:"Risk of slipping: 78% (was 15%). Tourist-dependent, single property, no diversification."},{step:"Treatment",source:"Collections strategy",finding:"Proactive outreach — assess cash reserves and willingness to restructure before DPD escalates."}]},
  {name:"Vikram Khanna",product:"Commercial Loan",value:"₹2.8Cr",dpd:18,bucket:"0-30",territory:"Mumbai",trigger:"Hospitality",treatment:"RM call this week",flag:"Sector",prob:"89%",npaProb:"38%",
    trail:[{step:"Account snapshot",source:"Core Banking",finding:"₹2.8Cr commercial, DPD 18. 3 mid-range hotels (Andheri/Bandra/Juhu). CASA ₹18L covers ~4.7 months EMI."},{step:"Revenue trajectory",source:"GST",finding:"Q4 GST already declining 15%. Post-crisis: estimated 40-50% revenue drop. Coverage ratio drops from 2.8× to 1.4×."},{step:"Risk assessment",source:"Delinquency model",finding:"30-60 risk: 89% (was 24%). NPA risk: 38%. 100% hospitality revenue, tourist locations."},{step:"Treatment",source:"Collections strategy",finding:"RM call — tenure extension (EMI -22%) or 3-month moratorium. Assigned to Ankit (Nancy's team)."}]},
  {name:"Heritage Hotels",product:"Term Loan",value:"₹2.2Cr",dpd:25,bucket:"0-30",territory:"Rajasthan",trigger:"Hospitality",treatment:"Restructure assessment",flag:"Sector",prob:"75%",npaProb:"30%",
    trail:[{step:"Account snapshot",source:"Core Banking",finding:"₹2.2Cr term loan, DPD 25. Heritage hotel group in Rajasthan — tourist segment."},{step:"Geopolitical impact",source:"News",finding:"Rajasthan heritage tourism depends on international visitors. Revenue decline 35-45% expected."},{step:"Treatment",source:"Collections strategy",finding:"Needs RM visit to assess. Preet Singh (North team) territory."}]},
  {name:"Sunrise Tours",product:"WC Facility",value:"₹1.8Cr",dpd:25,bucket:"0-30",territory:"Bangalore",trigger:"Hospitality",treatment:"Digital outreach",flag:"Sector",prob:"82%",npaProb:"40%",
    trail:[{step:"Account snapshot",source:"Core Banking",finding:"WC ₹1.8Cr, DPD 25. Travel operator — international tour packages."},{step:"Business viability",source:"Agent calls",finding:"International tours completely stopped. Zero bookings for next 2+ months. Recovery timeline 6-12 months."},{step:"Treatment question",source:"Collections strategy",finding:"Restructure or settlement? Business viability is the key question. Digital outreach to assess."}]},
  {name:"Priya Hospitality",product:"WC Facility",value:"₹1.2Cr",dpd:35,bucket:"30-60",territory:"Delhi-NCR",trigger:"Hospitality + GST decline",treatment:"Restructure — tenure ext.",flag:"Sector",prob:"72%",npaProb:"31%",
    trail:[{step:"Account snapshot",source:"Core Banking",finding:"WC ₹1.2Cr, DPD 35. Restaurant chain, 4 outlets in Mumbai."},{step:"Revenue + operational",source:"GST + Payroll",finding:"Revenue down 40%. Staff reduced 12→8. Business contracting but owner is cooperative."},{step:"Treatment",source:"Collections strategy",finding:"Tenure extension — convert WC to term loan, 36mo. External crisis, not operational failure."}]},
  {name:"Sunita Devi",product:"Business Loan",value:"₹8L",dpd:45,bucket:"30-60",territory:"Mumbai",trigger:"Call: family emergency. But FD ₹3L opened",treatment:"SMS nudge only",flag:"Call intel",prob:"35%",npaProb:"8%",
    trail:[{step:"Account snapshot",source:"Core Banking",finding:"BL ₹8L, DPD 45. 3 years perfect payments before this."},{step:"Call intelligence",source:"Agent calls",finding:"Family emergency, shop closed temporarily. Sounded stressed."},{step:"Contradicting signal",source:"Core Banking",finding:"FD ₹3L opened day after the call — she has liquidity. Not financial distress."},{step:"Treatment",source:"Collections strategy",finding:"SMS only. No calls. She has funds and will pay when personal situation stabilizes. Probability dropped from 55% to 35% after FD signal."}]},
  {name:"Rahul Menon",product:"Personal Loan",value:"₹4.2L",dpd:22,bucket:"0-30",territory:"Mumbai",trigger:"Call: lost IT job. Insurance payout April 10.",treatment:"Pause until April 12",flag:"Call intel",prob:"85%",npaProb:"12%",
    trail:[{step:"Account snapshot",source:"Core Banking",finding:"PL ₹4.2L, DPD 22. Bureau 712, clean. Only loan."},{step:"Call intelligence",source:"Agent calls",finding:"Disclosed: Infosys layoff, insurance payout April 10. Specific date, verifiable."},{step:"Treatment",source:"Nancy — 24 Mar",finding:"Pause until April 12. Will migrate to 30-60 — knowingly accepted. NPA prob only 12% because payout is expected."}]},
  {name:"Amit Traders",product:"Business Loan",value:"₹15L",dpd:12,bucket:"0-30",territory:"Maharashtra",trigger:"Cotton +22%",treatment:"Proactive restructure",flag:"Commodity",prob:"58%",npaProb:"15%",
    trail:[{step:"Account snapshot",source:"Core Banking",finding:"BL ₹15L, DPD 12. Textile trader, Ahmedabad. 15-year operator."},{step:"Commodity spike",source:"Commodity data",finding:"Cotton +22% in 14 days. 68% of input costs. Margins compressed 12%→4%."},{step:"Cash flow impact",source:"GST + model",finding:"At compressed margins, EMI coverage drops below 1×. Will miss next EMI without intervention."},{step:"Treatment",source:"Collections strategy",finding:"Proactive tenure extension (EMI -20%). Sep 2024 comparison: similar spike, 84% cure with early restructure."}]},
];

const regions=[
  {id:"west",name:"West",lead:"Arvind Kulkarni",accounts:2840,value:"₹1,980Cr",efficiency:93.8,resolution:68,mtd:"₹52Cr",trend:[65,66,67,68,68,68],
    teamLeads:[
      {name:"Nancy Sharma",territory:"Mumbai & Pune",accounts:46,resolution:67,recovered:"₹18.4L",agents:4,overdue:3,flag:"Queue rebalancing needed — Josh at 12 accounts"},
      {name:"Kavita Nair",territory:"Mumbai — Thane",accounts:38,resolution:72,recovered:"₹16.2L",agents:3,overdue:1,flag:null},
      {name:"Rajesh Patil",territory:"Pune + Goa",accounts:35,resolution:71,recovered:"₹14.8L",agents:3,overdue:0,flag:"Goa hospitality surge — 142 new accounts flowing in"},
    ]},
  {id:"north",name:"North",lead:"Meera Gupta",accounts:2180,value:"₹1,640Cr",efficiency:94.5,resolution:71,mtd:"₹48Cr",trend:[68,69,70,70,71,71],
    teamLeads:[
      {name:"Arun Sharma",territory:"Delhi-NCR",accounts:52,resolution:69,recovered:"₹22.1L",agents:5,overdue:2,flag:"195 hospitality accounts in territory — highest concentration"},
      {name:"Preet Singh",territory:"Rajasthan + UP",accounts:44,resolution:73,recovered:"₹15.6L",agents:4,overdue:1,flag:"Heritage Hotels (₹2.2Cr) needs RM visit"},
    ]},
  {id:"south",name:"South",lead:"Venkat Rao",accounts:1820,value:"₹1,280Cr",efficiency:95.2,resolution:74,mtd:"₹46Cr",trend:[70,71,72,73,74,74],
    teamLeads:[
      {name:"Deepa Menon",territory:"Bangalore + Hyderabad",accounts:48,resolution:76,recovered:"₹20.4L",agents:4,overdue:0,flag:"IT layoff cluster — 14 salaried accounts need treatment review"},
      {name:"Tamil Selvan",territory:"Tamil Nadu",accounts:40,resolution:72,recovered:"₹12.8L",agents:3,overdue:1,flag:"24 textile MSME accounts — commodity exposure"},
    ]},
  {id:"east",name:"East",lead:"Subhash Das",accounts:1147,value:"₹840Cr",efficiency:91.6,resolution:62,mtd:"₹22Cr",trend:[60,60,61,61,62,62],
    teamLeads:[
      {name:"Ananya Roy",territory:"Kolkata + Odisha",accounts:36,resolution:64,recovered:"₹8.2L",agents:3,overdue:2,flag:"Lowest efficiency region — needs capacity review"},
      {name:"Bikash Nath",territory:"NE States",accounts:28,resolution:58,recovered:"₹5.4L",agents:2,overdue:3,flag:"3 overdue contacts — territory coverage gap"},
    ]},
];

const briefs=[
  {sev:"critical",headline:"30–60 bucket increased by 847 accounts overnight — hospitality sector reclassification",
    body:"Iran-Israel escalation detected overnight. Travel restrictions expected — hotel occupancy, restaurant footfall, and tour bookings will decline significantly over the next 2-4 weeks. 847 commercial accounts with heavy hospitality exposure have been reclassified to 30-60 overnight based on updated risk assessment. ₹142Cr value at risk. Breakdown: hotel owners (₹84Cr), restaurant chains (₹38Cr), travel operators (₹20Cr).",
    sources:["news","core","gst"],
    prompts:["Which specific customers drove the ₹142Cr?","What is the hospitality exposure by territory?","How was this identified?"],
    convResp:{agents:["Portfolio","Risk"],text:"Hospitality crisis breakdown:\n\n847 commercial accounts with significant hospitality revenue are at elevated risk.\n\nBy segment:\n• Hotel owners: 312 accounts, ₹84Cr exposure. Avg DPD currently 14. Largest: Vikram Khanna (₹2.8Cr), Deepak Hotels (₹4.5Cr).\n• Restaurant chains: 285 accounts, ₹38Cr. Many already showing GST revenue decline 30-40% over last quarter.\n• Travel operators: 250 accounts, ₹20Cr. Smallest individual tickets but most exposed — almost entirely travel-dependent.\n\nTerritories with highest concentration: Mumbai (₹38Cr), Delhi-NCR (₹32Cr), Goa (₹18Cr), Rajasthan (₹14Cr). Tourist-heavy regions hit hardest.",followUps:["What's the treatment strategy for this segment?","How does this compare to COVID impact on hospitality?","Which territories have highest concentration?"]}},
  {sev:"warning",headline:"Textile MSME segment — raw material price spike detected, 89 accounts at risk",
    body:"Cotton prices up 22% in 2 weeks (₹62,400 → ₹76,100/candy). 89 textile MSME customers in 0-30 are exposed — combined ₹18Cr. At current input costs, margins compress from 12% to 4%. 34 accounts projected to miss next EMI cycle. GST filings confirm: Q4 revenue flat despite normally being peak season.",
    sources:["commodity","gst","core"],
    prompts:["Show the 34 highest-risk textile accounts","What's the commodity price trend?","Compare to last price spike in 2024"],
    convResp:{agents:["Risk"],text:"Textile MSME exposure:\n\n89 accounts, ₹18Cr total. 34 projected to miss next EMI based on:\n• Cotton price: ₹62,400/candy → ₹76,100/candy (+22% in 14 days)\n• GST filings: Q4 revenue flat (typically +15-20% seasonal)\n• Cash flow model: at current raw material costs, margins compress from 12% → 4%. 34 accounts have EMI/revenue ratio >25% at compressed margins.\n\nThis is different from hospitality — it's a slow squeeze, not a sudden shock. These accounts have 30-45 days before cash flow impact hits. Proactive restructuring window is open.",followUps:["Which accounts should we restructure proactively?","What's the right treatment — moratorium or tenure extension?","How many are in Nancy's territory?"]}},
  {sev:"positive",headline:"Q4 restructuring program delivering — 73% cure rate, ₹42Cr recovered",
    body:"Restructured accounts from January: 180 of 246 are now current (73% cure rate). ₹42Cr recovered vs ₹8Cr cost of restructuring. Best performing segment: salaried PL (82% cure). Worst: MSME working capital (58% cure). Treatment validation confirms early intervention outperforms standard collections by 32pp.",
    sources:["core"],
    prompts:["Which segments should we expand restructuring to?","Compare cure rates by treatment type","What's the cost-benefit per segment?"],
    convResp:{agents:["Collections"],text:"Restructuring performance detail:\n\nBy segment:\n• Salaried PL: 82% cure (strongest). Tenure extension works because income is stable — they just needed breathing room.\n• Secured (HL/LAP): 76% cure. Collateral gives them incentive to stay current.\n• MSME WC: 58% cure. Lower because business cash flow is harder to predict.\n• Commercial: 64% cure. Better than MSME but below salaried.\n\nBy treatment type:\n• Tenure extension: 78% cure (best)\n• Moratorium: 65% cure (helps temporary disruption)\n• Rate reduction: 71% cure\n• Settlement: 89% resolution (but at 70% recovery rate)\n\nRecommendation: expand restructuring to the 847 hospitality accounts NOW. Early restructure cure is 73% vs 41% after they slip. The ₹142Cr at risk — proactive restructuring could save ₹60-80Cr in provisions.",followUps:["Cost of restructuring the 847 accounts?","What if we wait vs act now?","Show me the treatment effectiveness data"]}},
  {sev:"info",headline:"Call center intelligence: 12 customers disclosed material information in last 7 days",
    body:"12 accounts where customers disclosed material information during calls — job loss (4), medical emergency (3), business closure (2), insurance payout pending (2), inheritance expected (1). 8 of these weren't reflected anywhere else. Treatment strategies updated.",
    sources:["callnotes","core"],
    prompts:["Show me the 12 accounts with disclosed information","Which ones changed treatment?","Which ones need treatment changes?"],
    convResp:{agents:["Risk","Collections"],text:"12 accounts with material call disclosures:\n\nJob loss (4):\n• Rahul Menon — PL ₹4.2L, DPD 22. Said lost IT job, waiting for insurance payout April 10. Don't push until April.\n• Customer B — BL ₹6L, DPD 15. Company shut down. Needs restructuring.\n• 2 others — both salaried, both in 0-30.\n\nMedical emergency (3):\n• All have medical spend data corroborating the call notes.\n\nBusiness closure (2):\n• Both MSME. GST filings confirm zero revenue last quarter.\n\nInsurance payout pending (2):\n• Rahul Menon (above) + 1 other. Both have specific dates — don't call until payout.\n\nInheritance expected (1):\n• Customer in 30-60 expecting property settlement. High probability of bulk payment.\n\nAll 12 accounts have updated treatment strategies based on what customers told us.",followUps:["Update treatment for the 4 job-loss accounts","Which accounts should we pause calls on?","Which ones changed treatment?"]}},
];

const insightCategories=[{id:"all",label:"All",count:4},{id:"bucket",label:"Bucket Movement",count:1},{id:"macro",label:"Macro Triggers",count:1},{id:"treatment",label:"Treatment",count:2}];
const insightsData=[
  {id:"i1",cat:["bucket","all"],severity:"CRITICAL",domain:"30–60 Movement · Hospitality",sources:["news","core","gst"],
    headline:"847 hospitality accounts reclassified to 30–60 overnight — ₹142Cr additional exposure in bucket",
    sub:"Geopolitical event mapped to hospitality sector exposure across the commercial portfolio.",
    metrics:[{l:"ACCOUNTS",v:"847"},{l:"VALUE AT RISK",v:"₹142Cr"},{l:"AVG PROBABILITY",v:"78%"},{l:"SEGMENTS",v:"3"}],
    narrative:"Iran-Israel escalation overnight. Impact mapped to hospitality sector — travel restrictions, hotel occupancy decline, restaurant footfall drop expected within 2-4 weeks.\n\n847 commercial accounts have been reclassified to 30-60 based on hospitality revenue exposure:\n\n• Hotel owners: 312 accounts, ₹84Cr. Largest exposures: Vikram Khanna (₹2.8Cr, DPD 18), Deepak Hotels (₹4.5Cr, DPD 42), Coastal Resorts (₹3.1Cr, DPD 8).\n• Restaurant chains: 285 accounts, ₹38Cr. GST filings already show 30-40% revenue decline in Q4 for many — the geopolitical event compounds an existing softness.\n• Travel operators: 250 accounts, ₹20Cr. Smallest individual tickets but most exposed — almost entirely dependent on international travel.\n\nAnother 353 have some hospitality exposure but are more diversified or have stronger reserves. Monitor, don't action.",
    action:"Segment the 847 into treatment tiers: (1) >₹1Cr exposure — proactive RM call this week, (2) ₹10L–₹1Cr — digital outreach + restructure offer, (3) <₹10L — automated SMS with payment flexibility options.",
    returnVal:"Proactive restructuring on 847 accounts could prevent ₹60-80Cr in provisions",
    roi:"Restructure cost: ~₹2Cr. Prevented provisions: ₹60-80Cr. ROI: 30-40×.",
    convResp:{agents:["Portfolio","Risk"],text:"The 847 hospitality accounts — full breakdown:\n\nTier 1 (>₹1Cr, 48 accounts, ₹96Cr):\nThese need RM calls this week. Top 5: Vikram Khanna (₹2.8Cr hotel, DPD 18), Deepak Hotels (₹4.5Cr chain, DPD 42), Priya Hospitality (₹1.2Cr restaurant, DPD 35), Coastal Resorts (₹3.1Cr, DPD 8), Sunrise Tours (₹1.8Cr, DPD 25).\n\nTier 2 (₹10L–₹1Cr, 340 accounts, ₹38Cr):\nDigital outreach with restructure offer. Most are small hotel owners and individual restaurant operators.\n\nTier 3 (<₹10L, 459 accounts, ₹8Cr):\nAutomated path. SMS with payment flexibility. Low individual risk but volume matters.",followUps:["Start RM calls on Tier 1 this week","What restructure terms for hospitality?","Show me territory-level concentration"]}},
  {id:"i2",cat:["treatment","all"],severity:"HIGH",domain:"Portfolio · Unstructured Intelligence",sources:["callnotes","core"],
    headline:"8 accounts have material information from call notes not captured in any structured system",
    sub:"NLP on call recordings found job loss, medical emergency, insurance payout — invisible to traditional models.",
    metrics:[{l:"ACCOUNTS",v:"8"},{l:"JOB LOSS",v:"4"},{l:"MEDICAL",v:"3"},{l:"PAYOUT PENDING",v:"2"}],
    narrative:"8 accounts have material information from recent call recordings that changes their treatment strategy:\n\n• Rahul Menon — PL ₹4.2L, DPD 22. Told agent he lost his IT job. Waiting for insurance payout on April 10. Currently being called on standard schedule despite confirmed inability to pay until payout. Treatment should be: pause calls until April 12, then follow up on payout status.\n\n• Sunita Devi — BL ₹8L, DPD 45. Agent noted 'family emergency, shop temporarily closed.' But core banking shows she opened a ₹3L FD yesterday — she has liquidity. Treatment should be: gentle SMS nudge, not aggressive calling. She can pay, she's dealing with something personal.\n\n• 3 medical emergency accounts — all corroborated by medical spend data. Under RBI vulnerability guidelines, aggressive collection is inappropriate.\n\n• 2 business closure accounts — GST filings confirm zero revenue last quarter. These need restructuring, not calls.\n\nNone of these facts appear in bureau data, DPD reports, or any structured feed. They came from what customers said during calls.",
    action:"Update treatment for all 8 accounts based on disclosed information. Pause calls on the 2 insurance-payout accounts until their stated dates.",
    returnVal:"Better treatment timing prevents unnecessary escalation on ₹12Cr exposure",roi:"Zero cost — just smarter timing.",
    convResp:{agents:["Risk","Collections"],text:"The 8 accounts with call-note intelligence:\n\n1. Rahul Menon — PL ₹4.2L, DPD 22. 'Lost IT job. Insurance payout April 10.' → Pause calls until April 12.\n2. Customer B — BL ₹6L, DPD 15. 'Company shut down last month.' → Fast-track restructuring.\n3. Customer C — PL ₹2.8L, DPD 28. 'Taking care of sick parent, back to work next month.' → SMS only.\n4. Customer D — CC ₹1.1L, DPD 18. 'Between jobs, interviewing at 3 companies.' → Light touch.\n5-7. Medical (3 accounts) — Medical spend data confirms. Treated as vulnerable — no aggressive calls.\n8. Sunita Devi — BL ₹8L, DPD 45. Call: 'family emergency, shop closed.' But FD ₹3L opened yesterday. She can pay — needs gentle nudge, not escalation.\n\nAll 8 have updated treatment strategies.",followUps:["Pause calls on Rahul until April 12","Flag the 3 medical accounts as vulnerable","Show me Sunita's full signal picture"]}},
  {id:"i3",cat:["macro","all"],severity:"MEDIUM",domain:"MSME · Commodity Exposure",sources:["commodity","gst","core"],
    headline:"Textile MSME segment — cotton price spike +22%, 34 accounts projected to miss next EMI",
    sub:"Cotton price spike mapped to 89 textile MSME accounts. Cash flow projections updated.",
    metrics:[{l:"ACCOUNTS",v:"89"},{l:"AT RISK",v:"34"},{l:"EXPOSURE",v:"₹18Cr"},{l:"MARGIN COMPRESSION",v:"12%→4%"}],
    narrative:"Cotton prices: ₹62,400 → ₹76,100 per candy in 14 days (+22%). This is the sharpest spike since September 2024 (+18%).\n\n89 textile MSME customers have >₹10L exposure. At current raw material costs, margins compress from 12% to 4%. For 34 accounts, EMI/revenue ratio exceeds 25% at compressed margins — they'll likely miss the next EMI cycle.\n\nTerritory breakdown:\n• Gujarat: 12 accounts, ₹6.8Cr (highest concentration — Surat/Ahmedabad textile belt)\n• Tamil Nadu: 9 accounts, ₹4.2Cr (Tirupur/Coimbatore)\n• Maharashtra: 8 accounts, ₹3.8Cr\n• Rajasthan: 5 accounts, ₹3.2Cr\n\nLargest exposure: Amit Traders (₹15L, DPD 12). GST filings show Q4 flat despite typically +15-20% seasonal. Cotton is 68% of his input costs.\n\nComparison to Sep 2024 spike: 28 accounts were at risk, 19 restructured proactively, 16 cured (84%). This spike is sharper and broader — 34 accounts at risk vs 28 last time.",
    action:"Offer proactive tenure extension to the 34 highest-risk accounts. Contact the remaining 55 with an awareness check.",
    returnVal:"Proactive restructuring prevents ₹6Cr in slippage to 30-60",roi:"Cost: ₹0.4Cr restructuring ops. Prevented: ₹6Cr provisions.",
    convResp:{agents:["Risk"],text:"Textile MSME detail:\n\n34 accounts at highest risk (EMI/revenue >25% at compressed margins):\n• 12 in Gujarat (₹6.8Cr)\n• 9 in Tamil Nadu (₹4.2Cr)\n• 8 in Maharashtra (₹3.8Cr)\n• 5 in Rajasthan (₹3.2Cr)\n\nAmit Traders is the largest single exposure (₹15L, DPD 12). His GST filings show Q4 flat despite typically being +15-20%. Cotton is 68% of his input costs.\n\nComparison to last spike (Sep 2024): prices rose 18%, 28 accounts were at risk, 19 restructured proactively, 16 cured (84%). This time the spike is sharper (+22%) and broader.",followUps:["Start restructuring for the 34","Compare to Sep 2024 spike outcomes","Show me Amit Traders' full profile"]}},
  {id:"i4",cat:["treatment","all"],severity:"POSITIVE",domain:"Treatment Effectiveness · Q4",sources:["core"],
    headline:"Early restructuring outperforms standard collections by 32pp — expand to hospitality segment?",
    sub:"180 of 246 restructured accounts now current. Best: salaried PL (82%). Worst: MSME WC (58%).",
    metrics:[{l:"CURE RATE",v:"73%"},{l:"RECOVERED",v:"₹42Cr"},{l:"COST",v:"₹8Cr"},{l:"ROI",v:"5.3×"}],
    narrative:"Q4 restructuring results (246 accounts):\n\nCure rate by segment:\n• Salaried PL: 82% (93 of 113 now current). Tenure extension works — income is stable, they needed breathing room.\n• Secured (HL/LAP): 76% (38 of 50). Collateral gives incentive to stay current.\n• Commercial: 64% (29 of 45). Better than standard collections (41%) but below salaried.\n• MSME WC: 58% (22 of 38). Business cash flow harder to predict.\n\nCure rate by treatment type:\n• Tenure extension: 78% (best performer)\n• Rate reduction: 71%\n• Moratorium: 65% (works for temporary disruption)\n• Settlement: 89% resolution but at 70% recovery rate\n\nApplied to the 847 hospitality accounts: 620 match profiles where restructuring works (>65% expected cure). At the commercial average cure rate of 68%, that's 422 accounts staying current and ₹58Cr in provisions prevented. If we wait and they slip, cure drops to 41% — only 254 cured, ₹36Cr additional provisions.\n\nCost of restructuring 620 accounts: ~₹1.6Cr. Cost of doing nothing: ₹36Cr+ in provisions.",
    action:"Approve expansion of restructuring to hospitality segment. Estimated 620 of 847 are good candidates based on treatment effectiveness profiles.",
    returnVal:"If 73% cure rate holds: ₹60-80Cr in prevented provisions",roi:"₹2Cr restructuring cost on 620 accounts. ₹60Cr+ prevention.",
    convResp:{agents:["Collections"],text:"Treatment effectiveness data for the restructuring expansion decision:\n\nCure rate by treatment × segment:\n• Tenure extension + salaried: 82%\n• Tenure extension + commercial: 68%\n• Moratorium + salaried: 72%\n• Moratorium + commercial: 61%\n• Rate reduction + secured: 76%\n\nFor the 847 hospitality accounts:\n• 620 match profiles where restructuring works (>65% expected cure rate)\n• 180 are in segments where settlement might be more appropriate\n• 47 need more investigation before treatment decision\n\nIf we restructure the 620 at 68% cure rate (commercial average): 422 accounts stay current. ₹58Cr in provisions prevented. Cost: ₹1.6Cr.\n\nIf we wait and they slip to 30-60: cure rate drops to 41%. Only 254 cured. ₹36Cr additional provisions.",followUps:["Approve restructuring for the 620","Which 47 need investigation?","Compare treatment costs now vs after slippage"]}},
];


// ═══ DECISION TRAIL OVERLAY ═══
function TrailOverlay({account,onClose}){
  if(!account||!account.trail)return null;
  return(<div><div onClick={onClose} style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.35)",zIndex:300,backdropFilter:"blur(2px)"}}/><div style={{position:"fixed",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:650,maxHeight:"82vh",background:C.card,borderRadius:10,boxShadow:"0 16px 64px rgba(0,0,0,0.18)",zIndex:301,display:"flex",flexDirection:"column",overflow:"hidden"}}><div style={{padding:"18px 24px",borderBottom:`1px solid ${C.border}`}}><div style={{fontSize:10,fontFamily:mn,color:C.accent,letterSpacing:"0.1em",fontWeight:600,marginBottom:6}}>DECISION TRAIL</div><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}><div><div style={{fontFamily:sr,fontSize:16,fontWeight:700}}>{account.name}</div><div style={{fontSize:12,color:C.muted,marginTop:2}}>{account.value||account.outstanding} · DPD {account.dpd}</div></div><button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",fontSize:20,color:C.muted,lineHeight:1}}>×</button></div></div><div style={{flex:1,overflowY:"auto",padding:"20px 24px"}}>{account.trail.map((t,i)=>(<div key={i} style={{display:"flex",gap:14}}><div style={{display:"flex",flexDirection:"column",alignItems:"center",width:24,flexShrink:0}}><div style={{width:24,height:24,borderRadius:"50%",background:i===account.trail.length-1?C.accent:C.bg,border:`1.5px solid ${i===account.trail.length-1?C.accent:C.border}`,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontSize:10,color:i===account.trail.length-1?"#fff":C.muted,fontWeight:700}}>{i+1}</span></div>{i<account.trail.length-1&&<div style={{width:1,flex:1,minHeight:12,background:C.border}}/>}</div><div style={{flex:1,paddingBottom:i<account.trail.length-1?16:0}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><span style={{fontSize:13,fontWeight:600}}>{t.step}</span><span style={{fontSize:9,fontFamily:mn,color:C.muted,padding:"1px 5px",background:C.bg,borderRadius:3}}>{t.source}</span></div><div style={{fontSize:12,color:C.sub,lineHeight:1.55,padding:"8px 10px",background:C.bg,borderRadius:6,borderLeft:`3px solid ${i===account.trail.length-1?C.accent:C.border}`}}>{t.finding}</div></div></div>))}</div></div></div>);
}

// ═══════════════════════════════════════════════════
// APP
// ═══════════════════════════════════════════════════
export default function App(){
  const [tab,setTab]=useState("overview");
  const [insightFilter,setInsightFilter]=useState("all");
  const [expandedInsight,setExpandedInsight]=useState(null);
  const [conv,setConv]=useState(null);
  const [trailAccount,setTrailAccount]=useState(null);
  const [selectedBucket,setSelectedBucket]=useState(null);
  const [expandedSeg,setExpandedSeg]=useState(null);
  const [expandedRegion,setExpandedRegion]=useState(null);
  const [expandedLead,setExpandedLead]=useState(null);
  const [portFilter,setPortFilter]=useState("all");

  const segConv={hosp:{agents:["Portfolio","Risk"],text:"Hospitality segment — 847 accounts, ₹142Cr:\n\nBy territory:\n• Mumbai: 218 accounts, ₹38Cr. Largest: Vikram Khanna ₹2.8Cr (hotel, DPD 18), Seaside Hotels ₹1.9Cr.\n• Delhi-NCR: 195 accounts, ₹32Cr. Largest: Priya Hospitality ₹1.2Cr (restaurant chain, DPD 35 — already in 30-60).\n• Goa: 142 accounts, ₹18Cr. Most tourist-dependent. Most exposed to travel restrictions.\n• Rajasthan: 108 accounts, ₹14Cr. Heritage Hotels ₹2.2Cr needs RM visit.\n\nTreatment recommendation:\n• 48 accounts >₹1Cr → RM call this week\n• 340 accounts ₹10L-₹1Cr → digital outreach + restructure offer\n• 459 accounts <₹10L → automated SMS with payment flexibility",followUps:["Start RM calls on the 48 large accounts","What restructure terms work for hospitality?","Compare to COVID-era hospitality treatment"]},textile:{agents:["Risk"],text:"Textile MSME — 89 accounts, ₹18Cr:\n\nCotton: ₹62,400 → ₹76,100/candy (+22% in 14 days). At this cost, margins compress from 12% to 4%.\n\n34 accounts have EMI/revenue >25% at compressed margins:\n• Gujarat: 12 accounts, ₹6.8Cr (Surat/Ahmedabad belt)\n• Tamil Nadu: 9 accounts, ₹4.2Cr (Tirupur/Coimbatore)\n• Maharashtra: 8 accounts, ₹3.8Cr\n• Rajasthan: 5 accounts, ₹3.2Cr\n\nSep 2024 comparison: 18% spike, 28 at risk, 19 restructured, 84% cured. This spike is sharper.",followUps:["Start restructuring for the 34","Which ones are in Nancy's territory?","What if cotton keeps rising?"]},salaried:{agents:["Risk","Collections"],text:"Salaried stress accounts — 48, ₹22Cr:\n\nDrivers:\n• IT layoffs: 14 accounts in Bangalore (2 employers with mass layoffs), 6 in Hyderabad (pharma restructuring)\n• Individual job loss: 4 accounts disclosed in call notes (including Rahul Menon — insurance payout April 10)\n\nTreatment differentiation:\n• Confirmed job loss with payout pending (2 accounts) → pause calls until payout date\n• Job loss, actively interviewing (4 accounts) → light touch, monthly check-in\n• Company restructuring (8 accounts) → monitor for 30 days, then assess\n• Medical emergency (3 accounts) → vulnerability treatment, no aggressive calls",followUps:["Update treatment for the 4 with call disclosures","Which employers had layoffs?","Compare to last quarter's job-loss cohort"]}};
  const regConv={west:{agents:["Collections"],text:"West region — Arvind Kulkarni:\n\n2,840 accounts, ₹1,980Cr. Efficiency 93.8%, resolution 68%.\n\n3 team leads:\n• Nancy Sharma (Mumbai-Andheri): 42 accounts, 67% resolution, 4 agents. Queue rebalancing needed — Josh has 12 accounts, overdue contacts tracking with queue volume.\n• Kavita Nair (Mumbai-Thane): 38 accounts, 72% resolution, 3 agents. Stable.\n• Rajesh Patil (Pune+Goa): 35 accounts, 71% resolution, 3 agents. Critical: 142 Goa hospitality accounts flowing in from the macro trigger. Needs temporary capacity.\n\nKey risks:\n• Goa hospitality surge will overwhelm Rajesh's team without reinforcement\n• Nancy's team has queue imbalance — Josh overloaded, Deepak underperforming\n• MTD ₹52Cr is on track but the ₹38Cr Mumbai hospitality exposure is a headwind",followUps:["How to handle Goa surge?","Redistribute Nancy's team?","Compare West to South's approach"]},north:{agents:["Collections"],text:"North region — Meera Gupta:\n\n2,180 accounts, ₹1,640Cr. Efficiency 94.5%, resolution 71%.\n\nHighest hospitality concentration: 195 accounts in Delhi-NCR (₹32Cr) + 108 in Rajasthan (₹14Cr). Arun Sharma's Delhi territory has the biggest impact.\n\nHeritage Hotels Group (₹2.2Cr, DPD 25) in Rajasthan needs RM visit — too large for standard phone collection.",followUps:["What's Arun's capacity for the hospitality surge?","Schedule RM visit for Heritage Hotels"]},south:{agents:["Collections"],text:"South region — Venkat Rao:\n\nBest performing region: 74% resolution, 95.2% efficiency.\n\nTwo specific exposure clusters:\n1. IT layoffs in Bangalore — 14 salaried accounts from 2 employers. Deepa Menon is handling these. Treatment review needed.\n2. Textile MSME in Tamil Nadu — 24 accounts exposed to cotton price spike. Tamil Selvan managing.",followUps:["What's Deepa's approach to the IT layoff cluster?","Tamil Nadu textile restructure timeline?"]},east:{agents:["Collections"],text:"East region — Subhash Das:\n\nWeakest: 62% resolution, 91.6% efficiency. 5 overdue contacts across 2 team leads.\n\nAnanya Roy (Kolkata): 64% resolution — below target but improving. Bikash Nath (NE): 58% — territory coverage is the issue, not capability. 3 overdue contacts in remote areas.\n\nNo major macro exposure in East. The underperformance is structural — needs capacity review.",followUps:["What would adding 1 agent to NE do?","Compare East's portfolio mix to other regions"]}};

  const openConv=(id,q)=>{
    const ins=insightsData.find(i=>i.id===id);
    const bd=id.startsWith?.("b")?briefs[parseInt(id.slice(1))]:null;
    const sg=segConv[id];
    const rg=regConv[id];
    const resp=ins?.convResp||bd?.convResp||sg||rg||{agents:["Portfolio"],text:"Analyzing..."};
    setConv({messages:[{role:"user",text:q},{role:"morrie",...resp}],id});
  };
  const addConvMsg=(text)=>{if(!conv)return;const ins=insightsData.find(i=>i.id===conv.id);const bd=conv.id.startsWith?.("b")?briefs[parseInt(conv.id.slice(1))]:null;const sg=segConv[conv.id];const rg=regConv[conv.id];const resp=ins?.convResp||bd?.convResp||sg||rg||{agents:["Portfolio"],text:"Continuing..."};setConv(prev=>({...prev,messages:[...prev.messages,{role:"user",text},{role:"morrie",agents:resp.agents,text:resp.text,followUps:resp.followUps}]}));};

  const filtered=insightFilter==="all"?insightsData:insightsData.filter(i=>i.cat.includes(insightFilter));
  const navItems=[{id:"overview",label:"Overview",icon:"◻"},{id:"portfolio",label:"Portfolio",icon:"▤"},{id:"team",label:"Team",icon:"♟"}];

  return(<div className="overflow-auto" style={{display:"flex",background:C.bg,height:"100vh",fontFamily:sn,color:C.text}}>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');*{box-sizing:border-box;margin:0;padding:0}button{font-family:inherit}::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#DDD;border-radius:3px}`}</style>

    {/* SIDE TABS */}
    <div style={{width:56,background:"#161616",borderRight:"1px solid #252525",position:"fixed",top:0,left:0,height:"100vh",display:"flex",flexDirection:"column",alignItems:"center",paddingTop:14,zIndex:100}}>
      <div style={{width:28,height:28,borderRadius:5,background:C.accent,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,color:"#fff",marginBottom:20}}>Q</div>
      {navItems.map(n=>(<button key={n.id} onClick={()=>{setTab(n.id);setSelectedBucket(null);}} style={{width:44,height:44,borderRadius:6,border:"none",cursor:"pointer",background:tab===n.id?"#2A2A2A":"transparent",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:2,marginBottom:4}}><span style={{fontSize:14,color:tab===n.id?C.accent:"#666"}}>{n.icon}</span><span style={{fontSize:8,color:tab===n.id?"#fff":"#666",fontWeight:tab===n.id?600:400}}>{n.label}</span></button>))}
      <div style={{flex:1}}/>
      <div style={{width:30,height:30,borderRadius:"50%",background:"#2A2A2A",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:14}}><span style={{fontSize:10,fontWeight:600,color:C.accent}}>SA</span></div>
    </div>

    {/* MAIN */}
    <div style={{marginLeft:56,flex:1}}>
      <div style={{background:C.card,borderBottom:`1px solid ${C.border}`,padding:"0 28px",position:"sticky",top:0,zIndex:50}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",height:46}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <span style={{fontFamily:sr,fontSize:16,fontWeight:700}}>questt.</span><span style={{width:1,height:16,background:C.border}}/><span style={{fontSize:12,fontWeight:600,color:C.accent}}>JIO FS</span><span style={{fontSize:12,color:C.muted}}>Collections Intelligence</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <div style={{display:"flex",gap:4}}>{["Sam","Nancy","Josh"].map((p,i)=>(<button key={p} style={{padding:"4px 10px",borderRadius:4,border:`1px solid ${i===0?C.accent:C.border}`,background:i===0?C.accentPale:C.card,color:i===0?C.accent:C.muted,fontSize:10,fontWeight:i===0?600:400,cursor:"pointer"}}>{p}</button>))}</div>
            <div style={{position:"relative"}}><span style={{fontSize:14}}>🔔</span><span style={{position:"absolute",top:-3,right:-3,width:12,height:12,borderRadius:6,background:C.red,color:"#fff",fontSize:7,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>4</span></div>
            <div style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:28,height:28,borderRadius:"50%",background:C.accentPale,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontSize:10,fontWeight:600,color:C.accent}}>SA</span></div><span style={{fontSize:12,color:C.muted}}>Sam</span></div>
          </div>
        </div>
      </div>

      <div style={{padding:"24px 28px",maxWidth:1060}}>
        {/* ═══ OVERVIEW ═══ */}
        {tab==="overview"&&<div>
          {/* KPI STRIP — Portfolio level */}
          <div style={{display:"flex",gap:1,marginBottom:28,background:C.border,borderRadius:6,overflow:"hidden"}}>
            {[{v:"₹7,500Cr",d:"YTD collections"},{v:"₹186Cr",d:"MTD collections"},{v:"94.2%",d:"collection efficiency"},{v:"-2%",d:"efficiency vs last year"},{v:"₹142Cr",d:"new value at risk",alert:true}].map((k,i)=>(<div key={i} style={{flex:1,background:C.card,padding:"12px 16px"}}><div style={{fontSize:24,fontWeight:700,fontFamily:sr,lineHeight:1.1,color:k.alert?C.red:C.text}}>{k.v}</div><div style={{fontSize:11,color:k.alert?C.red:C.muted,marginTop:3,fontWeight:k.alert?600:400}}>{k.d}</div></div>))}
          </div>

          {/* BUCKET DISTRIBUTION — visual */}
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"16px 20px",marginBottom:28}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <div style={{fontSize:14,fontWeight:600}}>Delinquency Bucket Distribution</div>
              <div style={{fontSize:11,color:C.muted}}>7,337 accounts · ₹5,210Cr total</div>
            </div>
            <div style={{display:"flex",gap:2,marginBottom:10,height:32,borderRadius:4,overflow:"hidden"}}>
              {buckets.map(b=>(<div key={b.id} style={{flex:b.pct,background:b.c,position:"relative",cursor:"pointer",transition:"opacity 0.15s"}} onClick={()=>setSelectedBucket(b)} onMouseEnter={e=>e.currentTarget.style.opacity="0.85"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>{b.spike&&<div style={{position:"absolute",top:-6,left:"50%",transform:"translateX(-50)",fontSize:10,color:C.red,fontWeight:700}}>▲</div>}</div>))}
            </div>
            <div style={{display:"flex",gap:8}}>
              {buckets.map(b=>(<div key={b.id} style={{flex:b.pct,cursor:"pointer"}} onClick={()=>setSelectedBucket(b)}>
                <div style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:8,height:8,borderRadius:2,background:b.c}}/><span style={{fontSize:10,fontWeight:600,color:C.text}}>{b.label}</span></div>
                <div style={{fontSize:13,fontWeight:700,fontFamily:sr,marginTop:2}}>{b.count.toLocaleString()}</div>
                <div style={{fontSize:10,color:C.muted}}>{b.value}</div>
                <div style={{fontSize:10,color:b.delta.startsWith("+")?C.red:C.accent,fontWeight:600}}>{b.delta} vs last month</div>
              </div>))}
            </div>
            {selectedBucket&&<div style={{marginTop:14,padding:"12px 14px",background:selectedBucket.spike?C.redPale+"60":C.bg,borderRadius:6,borderLeft:`4px solid ${selectedBucket.c}`}}>
              <div style={{fontSize:13,fontWeight:600}}>{selectedBucket.label} — {selectedBucket.count.toLocaleString()} accounts, {selectedBucket.value}</div>
              <div style={{fontSize:12,color:C.sub,marginTop:4}}>{selectedBucket.delta} vs last month ({selectedBucket.prev.toLocaleString()} → {selectedBucket.count.toLocaleString()}).{selectedBucket.spike?" 847 accounts reclassified from 0-30 overnight — hospitality sector, geopolitical escalation expected to cut revenue 30-40%.":""}</div>
              <button onClick={()=>openConv("i1","Drill into "+selectedBucket.label)} style={{marginTop:8,padding:"5px 12px",background:C.accent,color:"#fff",border:"none",borderRadius:5,fontSize:10,fontWeight:600,cursor:"pointer"}}>Investigate →</button>
            </div>}
          </div>

          {/* MORNING BRIEFING */}
          <h2 style={{fontFamily:sr,fontSize:22,fontWeight:700,marginBottom:18}}>Monday Morning Briefing</h2>
          <div style={{display:"flex",flexDirection:"column",gap:14,marginBottom:44}}>
            {briefs.map((b,bi)=>(<div key={bi} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"18px 22px"}}>
              <div style={{display:"flex",gap:14,alignItems:"flex-start"}}>
                <SevIcon sev={b.sev}/>
                <div style={{flex:1}}>
                  <div style={{fontSize:15,fontWeight:600,lineHeight:1.4,marginBottom:6}}>{b.headline}</div>
                  <div style={{fontSize:13,color:C.sub,lineHeight:1.7,marginBottom:10}}>{b.body}</div>
                  <SrcBadge ids={b.sources}/>
                  <div style={{display:"flex",gap:6,marginTop:10,flexWrap:"wrap"}}>{b.prompts.map((p,i)=>(<button key={i} onClick={()=>openConv("b"+bi,p)} style={{padding:"5px 10px",background:C.bg,border:`1px solid ${C.border}`,borderRadius:5,fontSize:10,color:C.sub,cursor:"pointer"}}>{p}</button>))}</div>
                </div>
              </div>
            </div>))}
          </div>

          {/* KEY INSIGHTS */}
          <h2 style={{fontFamily:sr,fontSize:22,fontWeight:700,marginBottom:14}}>Key Insights</h2>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:20}}>
            {insightCategories.map(cat=>(<button key={cat.id} onClick={()=>{setInsightFilter(cat.id);setExpandedInsight(null);}} style={{padding:"5px 12px",borderRadius:18,border:`1px solid ${insightFilter===cat.id?C.accent:C.border}`,background:insightFilter===cat.id?C.accent:C.card,color:insightFilter===cat.id?"#fff":C.sub,fontSize:11,cursor:"pointer",fontWeight:insightFilter===cat.id?600:400}}>{cat.label} <span style={{fontSize:9,opacity:0.7,fontFamily:mn}}>{cat.count}</span></button>))}
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:18}}>
            {filtered.map(ins=>{const isOpen=expandedInsight===ins.id;return(<div key={ins.id} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,overflow:"hidden"}}>
              <div style={{padding:"20px 24px",cursor:"pointer"}} onClick={()=>setExpandedInsight(isOpen?null:ins.id)}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                  <span style={{fontSize:10,fontWeight:700,fontFamily:mn,color:ins.severity==="CRITICAL"?C.red:ins.severity==="HIGH"?C.copper:ins.severity==="POSITIVE"?C.accent:C.amber,padding:"2px 7px",background:ins.severity==="CRITICAL"?C.redPale:ins.severity==="HIGH"?C.copperPale:ins.severity==="POSITIVE"?C.greenPale:C.amberPale,borderRadius:3}}>{ins.severity}</span>
                  <span style={{fontSize:11,color:C.muted}}>{ins.domain}</span>
                  <div style={{marginLeft:"auto"}}><SrcBadge ids={ins.sources}/></div>
                </div>
                <h3 style={{fontFamily:sr,fontSize:17,fontWeight:700,lineHeight:1.4,marginBottom:4}}>{ins.headline}</h3>
                <div style={{fontSize:12,color:C.sub}}>{ins.sub}</div>
                <div style={{display:"flex",gap:20,marginTop:14}}>{ins.metrics.map((m,j)=>(<div key={j}><div style={{fontSize:9,fontFamily:mn,color:C.muted,marginBottom:3}}>{m.l}</div><div style={{fontSize:18,fontWeight:700,fontFamily:sr}}>{m.v}</div></div>))}</div>
              </div>
              {isOpen&&<div style={{padding:"0 24px 24px",borderTop:`1px solid ${C.borderLight}`,paddingTop:16}}>
                <div style={{fontSize:13,color:C.sub,lineHeight:1.7,marginBottom:16,whiteSpace:"pre-line"}}>{ins.narrative}</div>
                <div style={{background:C.bg,borderRadius:8,padding:"14px 18px",marginBottom:14}}>
                  <div style={{fontSize:10,fontFamily:mn,color:C.accent,letterSpacing:"0.06em",fontWeight:600,marginBottom:6}}>RECOMMENDED ACTION</div>
                  <div style={{fontSize:13,fontWeight:600,lineHeight:1.5,marginBottom:10}}>{ins.action}</div>
                  <div style={{display:"flex",gap:28}}><div><div style={{fontSize:9,fontFamily:mn,color:C.muted}}>Return</div><div style={{fontSize:12,color:C.accent}}>{ins.returnVal}</div></div><div><div style={{fontSize:9,fontFamily:mn,color:C.muted}}>ROI</div><div style={{fontSize:12,color:C.accent}}>{ins.roi}</div></div></div>
                </div>
                <button onClick={e=>{e.stopPropagation();openConv(ins.id,"Deep dive: "+ins.headline);}} style={{width:"100%",padding:"9px",background:C.accent,border:"none",borderRadius:6,fontSize:11,color:"#fff",cursor:"pointer",fontWeight:600}}>Discuss with questt.</button>
              </div>}
            </div>);})}
          </div>
        </div>}

        {/* ═══ PORTFOLIO ═══ */}
        {tab==="portfolio"&&<div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:18}}>
            <div><h2 style={{fontFamily:sr,fontSize:22,fontWeight:700,margin:0}}>Portfolio Deep Dive</h2><div style={{fontSize:13,color:C.muted,marginTop:4}}>7,987 accounts · ₹5,740Cr · Drill: segment → territory → accounts</div></div>
            <div style={{display:"flex",gap:6}}>{[{id:"all",l:"All Segments"},{id:"macro",l:"Macro-Triggered"},{id:"action",l:"Action Required"},{id:"bau",l:"BAU"}].map(f=>(<button key={f.id} onClick={()=>setPortFilter(f.id)} style={{padding:"5px 12px",borderRadius:18,border:`1px solid ${portFilter===f.id?C.accent:C.border}`,background:portFilter===f.id?C.accent:C.card,color:portFilter===f.id?"#fff":C.sub,fontSize:11,cursor:"pointer",fontWeight:portFilter===f.id?600:400}}>{f.l}</button>))}</div>
          </div>

          {/* Bucket strip */}
          <div style={{display:"flex",gap:1,marginBottom:20,background:C.border,borderRadius:6,overflow:"hidden"}}>
            {buckets.map(b=>(<div key={b.id} style={{flex:b.pct,background:C.card,padding:"10px 12px",minWidth:0}}>
              <div style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:8,height:8,borderRadius:2,background:b.c,flexShrink:0}}/><span style={{fontSize:10,fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{b.label}</span></div>
              <div style={{fontSize:16,fontWeight:700,fontFamily:sr,marginTop:2}}>{b.count.toLocaleString()}</div>
              <div style={{fontSize:10,color:b.delta.startsWith("+")?C.red:C.accent,fontWeight:600}}>{b.delta}</div>
            </div>))}
          </div>

          {/* Segments */}
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {(portFilter==="all"?segments:portFilter==="macro"?segments.filter(s=>s.trigger!=="None"&&s.trigger!=="—"&&s.trigger!=="Call notes + bureau signals"):portFilter==="action"?segments.filter(s=>s.status==="Action required"||s.status==="Treatment review"):segments.filter(s=>s.status==="BAU")).map(seg=>{const isOpen=expandedSeg===seg.id;return(<div key={seg.id} style={{background:C.card,border:`1px solid ${isOpen?seg.c:C.border}`,borderRadius:8,borderLeft:`4px solid ${seg.c}`,overflow:"hidden"}}>
              <div style={{padding:"14px 18px",cursor:"pointer"}} onClick={()=>setExpandedSeg(isOpen?null:seg.id)}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <span style={{fontSize:15,fontWeight:600}}>{seg.name}</span>
                      {seg.trigger!=="None"&&seg.trigger!=="—"&&<span style={{fontSize:9,fontFamily:mn,color:seg.c===C.red?C.red:C.amber,padding:"2px 6px",background:seg.c===C.red?C.redPale:C.amberPale,borderRadius:3}}>{seg.trigger.split("—")[0].trim()}</span>}
                      <span style={{fontSize:9,fontFamily:mn,color:seg.status==="Action required"?C.red:seg.status==="BAU"?C.accent:C.copper,padding:"2px 6px",background:seg.status==="Action required"?C.redPale:seg.status==="BAU"?C.accentPale:C.copperPale,borderRadius:3}}>{seg.status}</span>
                    </div>
                    <div style={{fontSize:12,color:C.muted,marginTop:4}}>{seg.accounts.toLocaleString()} accounts · {seg.value} · Bucket: {seg.bucket}</div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:16}}>
                    <div style={{textAlign:"center"}}><div style={{fontSize:18,fontWeight:700,fontFamily:sr,color:seg.c}}>{seg.riskLevel}</div><div style={{fontSize:8,fontFamily:mn,color:C.muted}}>RISK</div></div>
                    <span style={{fontSize:11,color:C.lt,transform:isOpen?"rotate(180deg)":"none"}}>▾</span>
                  </div>
                </div>
              </div>

              {isOpen&&<div style={{padding:"0 18px 18px",borderTop:`1px solid ${C.borderLight}`}}>
                {/* Trigger detail */}
                {seg.trigger!=="None"&&seg.trigger!=="—"&&<div style={{padding:"10px 12px",background:seg.c===C.red?C.redPale+"40":C.amberPale+"40",borderRadius:6,marginTop:14,marginBottom:14}}>
                  <div style={{fontSize:10,fontFamily:mn,color:seg.c,fontWeight:600,marginBottom:4}}>TRIGGER</div>
                  <div style={{fontSize:12,color:C.sub}}>{seg.trigger}</div>
                </div>}

                {/* Territory breakdown */}
                {seg.territories&&seg.territories.length>0&&<div>
                  <div style={{fontSize:10,fontFamily:mn,color:C.muted,letterSpacing:"0.06em",fontWeight:600,marginBottom:8,marginTop:seg.trigger==="None"||seg.trigger==="—"?14:0}}>TERRITORY BREAKDOWN</div>
                  <div style={{border:`1px solid ${C.border}`,borderRadius:6,overflow:"hidden"}}>
                    <div style={{display:"flex",padding:"6px 12px",background:C.bg,borderBottom:`1px solid ${C.border}`,fontSize:9,fontFamily:mn,color:C.muted}}>
                      <span style={{flex:1}}>TERRITORY</span><span style={{width:70}}>ACCOUNTS</span><span style={{width:80}}>EXPOSURE</span><span style={{flex:1}}>TOP ACCOUNTS</span>
                    </div>
                    {seg.territories.map((t,ti)=>(<div key={ti} style={{display:"flex",alignItems:"flex-start",padding:"8px 12px",borderBottom:ti<seg.territories.length-1?`1px solid ${C.borderLight}`:"none"}}>
                      <span style={{flex:1,fontSize:12,fontWeight:600}}>{t.name}</span>
                      <span style={{width:70,fontSize:12}}>{t.accounts}</span>
                      <span style={{width:80,fontSize:12,fontWeight:600}}>{t.value}</span>
                      <div style={{flex:1}}>{t.topAccounts.map((a,ai)=>(<div key={ai} style={{fontSize:11,color:C.sub,lineHeight:1.5}}>{a}</div>))}</div>
                    </div>))}
                  </div>
                </div>}

                {/* Action */}
                <div style={{display:"flex",gap:8,marginTop:14}}>
                  <button onClick={()=>openConv(seg.id,"Deep dive: "+seg.name)} style={{padding:"7px 14px",background:C.accent,color:"#fff",border:"none",borderRadius:5,fontSize:11,fontWeight:600,cursor:"pointer"}}>Discuss with questt.</button>
                  {seg.status==="Action required"&&<button style={{padding:"7px 14px",background:C.card,color:C.accent,border:`1px solid ${C.accent}`,borderRadius:5,fontSize:11,cursor:"pointer"}}>Approve Restructure Plan</button>}
                </div>
              </div>}
            </div>);})}
          </div>

          {/* TOP ACCOUNTS — across all segments */}
          <div style={{marginTop:28}}>
            <div style={{fontSize:10,fontFamily:mn,color:C.muted,letterSpacing:"0.06em",fontWeight:600,marginBottom:10}}>TOP ACCOUNTS BY EXPOSURE — ACTION REQUIRED</div>
            <div style={{border:`1px solid ${C.border}`,borderRadius:8,overflow:"hidden"}}>
              <div style={{display:"flex",padding:"8px 14px",background:C.bg,borderBottom:`1px solid ${C.border}`,fontSize:9,fontFamily:mn,color:C.muted}}>
                <span style={{flex:1}}>ACCOUNT</span><span style={{width:80}}>PRODUCT</span><span style={{width:60}}>EXPOSURE</span><span style={{width:40}}>DPD</span><span style={{width:55}}>PROB</span><span style={{width:65}}>TERRITORY</span><span style={{width:80}}>TRIGGER</span><span style={{flex:1}}>TREATMENT</span>
              </div>
              {topAccounts.map((a,i)=>(<div key={i} onClick={()=>a.trail&&setTrailAccount(a)} style={{display:"flex",alignItems:"center",padding:"8px 14px",borderBottom:i<topAccounts.length-1?`1px solid ${C.borderLight}`:"none",cursor:a.trail?"pointer":"default"}} onMouseEnter={e=>{if(a.trail)e.currentTarget.style.background=C.bg}} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                <div style={{flex:1}}><span style={{fontSize:12,fontWeight:600}}>{a.name}</span></div>
                <span style={{width:80,fontSize:10,color:C.muted}}>{a.product.length>14?a.product.slice(0,14)+"…":a.product}</span>
                <span style={{width:60,fontSize:12,fontWeight:600}}>{a.value}</span>
                <span style={{width:40,fontSize:11,color:a.dpd>=30?C.red:C.amber}}>{a.dpd}</span>
                <span style={{width:55}}><span style={{fontSize:11,fontWeight:700,fontFamily:sr,color:parseInt(a.prob)>=70?C.red:parseInt(a.prob)>=50?C.amber:C.accent}}>{a.prob}</span></span>
                <span style={{width:65,fontSize:10,color:C.muted}}>{a.territory}</span>
                <span style={{width:80}}><span style={{fontSize:9,fontFamily:mn,color:a.flag==="Sector"?C.red:a.flag==="Commodity"?C.amber:C.blue,padding:"1px 5px",background:a.flag==="Sector"?C.redPale:a.flag==="Commodity"?C.amberPale:C.bluePale,borderRadius:3}}>{a.flag}</span></span>
                <span style={{flex:1,fontSize:11,color:C.sub}}>{a.treatment}</span>
              </div>))}
            </div>
          </div>
        </div>}

        {/* ═══ TEAM ═══ */}
        {tab==="team"&&<div>
          <h2 style={{fontFamily:sr,fontSize:22,fontWeight:700,marginBottom:4}}>Team Performance</h2>
          <div style={{fontSize:13,color:C.muted,marginBottom:18}}>4 regions · 9 team leads · 48 agents</div>

          {/* Region summary strip */}
          <div style={{display:"flex",gap:1,marginBottom:20,background:C.border,borderRadius:6,overflow:"hidden"}}>
            {regions.map(r=>(<div key={r.id} style={{flex:1,background:C.card,padding:"10px 14px",cursor:"pointer"}} onClick={()=>setExpandedRegion(expandedRegion===r.id?null:r.id)}>
              <div style={{fontSize:12,fontWeight:600}}>{r.name}</div>
              <div style={{fontSize:20,fontWeight:700,fontFamily:sr,color:r.resolution>=70?C.accent:r.resolution>=65?C.amber:C.red,lineHeight:1.2}}>{r.resolution}%</div>
              <div style={{fontSize:9,color:C.muted}}>{r.accounts.toLocaleString()} acc · {r.value}</div>
              <div style={{display:"flex",gap:1,marginTop:4}}>{r.trend.map((v,i)=>{const isLast=i===r.trend.length-1;return(<div key={i} style={{flex:1,height:Math.max(3,(v/100)*20),background:isLast?(r.resolution>=70?C.accent:r.resolution>=65?C.amber:C.red):C.borderLight,borderRadius:1}}/>);})}</div>
            </div>))}
          </div>

          {/* Region cards */}
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {regions.map(r=>{const isOpen=expandedRegion===r.id;const rc=r.resolution>=70?C.accent:r.resolution>=65?C.amber:C.red;
            return(<div key={r.id} style={{background:C.card,border:`1px solid ${isOpen?rc:C.border}`,borderRadius:8,borderLeft:`4px solid ${rc}`,overflow:"hidden"}}>
              <div style={{padding:"14px 18px",cursor:"pointer"}} onClick={()=>setExpandedRegion(isOpen?null:r.id)}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <div style={{width:40,height:40,borderRadius:"50%",background:rc+"18",color:rc,fontSize:14,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>{r.name[0]}</div>
                    <div>
                      <div style={{fontSize:16,fontWeight:700,fontFamily:sr}}>{r.name}</div>
                      <div style={{fontSize:11,color:C.muted}}>Lead: {r.lead} · {r.teamLeads.length} team leads · {r.accounts.toLocaleString()} accounts</div>
                    </div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:20}}>
                    <div style={{textAlign:"center"}}><div style={{fontSize:22,fontWeight:700,fontFamily:sr,color:rc}}>{r.resolution}%</div><div style={{fontSize:8,fontFamily:mn,color:C.muted}}>RESOLUTION</div></div>
                    <div style={{textAlign:"center"}}><div style={{fontSize:14,fontWeight:700,fontFamily:sr}}>{r.efficiency}%</div><div style={{fontSize:8,fontFamily:mn,color:C.muted}}>EFFICIENCY</div></div>
                    <div style={{textAlign:"center"}}><div style={{fontSize:14,fontWeight:700,fontFamily:sr}}>{r.mtd}</div><div style={{fontSize:8,fontFamily:mn,color:C.muted}}>MTD</div></div>
                    <span style={{fontSize:11,color:C.lt,transform:isOpen?"rotate(180deg)":"none"}}>▾</span>
                  </div>
                </div>
              </div>

              {isOpen&&<div style={{padding:"0 18px 18px",borderTop:`1px solid ${C.borderLight}`}}>
                <div style={{fontSize:10,fontFamily:mn,color:C.muted,letterSpacing:"0.06em",fontWeight:600,marginBottom:8,marginTop:14}}>TEAM LEADS</div>
                <div style={{border:`1px solid ${C.border}`,borderRadius:6,overflow:"hidden"}}>
                  {r.teamLeads.map((tl,ti)=>{const tlOpen=expandedLead===r.id+"_"+ti;const tlc=tl.resolution>=70?C.accent:tl.resolution>=65?C.amber:C.red;
                  return(<div key={ti} style={{borderBottom:ti<r.teamLeads.length-1?`1px solid ${C.borderLight}`:"none"}}>
                    <div style={{display:"flex",alignItems:"center",padding:"10px 14px",cursor:"pointer",background:tlOpen?C.bg:"transparent"}} onClick={()=>setExpandedLead(tlOpen?null:r.id+"_"+ti)}>
                      <div style={{flex:1}}>
                        <div style={{fontSize:13,fontWeight:600}}>{tl.name}</div>
                        <div style={{fontSize:11,color:C.muted}}>{tl.territory} · {tl.accounts} accounts · {tl.agents} agents</div>
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:14}}>
                        <div style={{textAlign:"center"}}><div style={{fontSize:16,fontWeight:700,color:tlc}}>{tl.resolution}%</div><div style={{fontSize:7,fontFamily:mn,color:C.muted}}>RES</div></div>
                        <div style={{textAlign:"center"}}><div style={{fontSize:13,fontWeight:600}}>{tl.recovered}</div><div style={{fontSize:7,fontFamily:mn,color:C.muted}}>REC</div></div>
                        {tl.overdue>0&&<span style={{fontSize:9,fontFamily:mn,color:C.red,padding:"2px 5px",background:C.redPale,borderRadius:3}}>{tl.overdue} overdue</span>}
                        <span style={{fontSize:10,color:C.lt}}>▾</span>
                      </div>
                    </div>
                    {tlOpen&&<div style={{padding:"8px 14px 14px",background:C.bg}}>
                      {tl.flag&&<div style={{padding:"8px 10px",background:tl.flag.includes("hospitality")||tl.flag.includes("rebalancing")?C.amberPale+"60":C.bluePale+"40",borderRadius:5,marginBottom:10,fontSize:11,color:C.sub}}>⚑ {tl.flag}</div>}
                      <div style={{display:"flex",gap:8}}>
                        <button onClick={()=>openConv(r.id,"Analysis: "+tl.name+"'s team")} style={{padding:"5px 12px",background:C.accent,color:"#fff",border:"none",borderRadius:5,fontSize:10,fontWeight:600,cursor:"pointer"}}>Discuss with questt.</button>
                        <button style={{padding:"5px 12px",background:C.card,color:C.sub,border:`1px solid ${C.border}`,borderRadius:5,fontSize:10,cursor:"pointer"}}>View Queue</button>
                      </div>
                    </div>}
                  </div>);})}
                </div>
              </div>}
            </div>);})}
          </div>
        </div>}

        <div style={{marginTop:40,paddingTop:14,borderTop:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",paddingBottom:20}}>
          <span style={{fontSize:10,color:C.muted}}>Questt AI · Intelligence Warehouse</span>
          <SrcBadge ids={["core","bureau","news","gst","callnotes","commodity"]}/>
        </div>
      </div>
    </div>

    {conv&&<ConvPanel messages={conv.messages} onClose={()=>setConv(null)} onAsk={addConvMsg}/>}
    {trailAccount&&<TrailOverlay account={trailAccount} onClose={()=>setTrailAccount(null)}/>}
  </div>);
}

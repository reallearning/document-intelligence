"use client";
import { useState } from "react";

const C={bg:"#FAFAF8",card:"#FFFFFF",border:"#E5E2DB",borderLight:"#F0EDE7",text:"#1C1C1C",sub:"#555",muted:"#999",lt:"#CCC",
  accent:"#2D5A3D",accentPale:"#EAF2EF",copper:"#946B1A",copperPale:"#FDFAF0",
  red:"#B33A3A",redPale:"#FDF3F3",blue:"#3B6FA0",bluePale:"#EFF5FB",
  amber:"#C47D15",amberPale:"#FFF8ED",green:"#27AE60",greenPale:"#EAFAF0"};
const sn="'IBM Plex Sans',-apple-system,sans-serif";const sr="Georgia,serif";const mn="'JetBrains Mono',monospace";
const Bar=({pct,c=C.accent,h=5})=>(<div style={{height:h,background:C.borderLight,borderRadius:h/2,overflow:"hidden"}}><div style={{height:h,borderRadius:h/2,background:c,width:`${Math.min(pct,100)}%`,transition:"width 0.5s"}}/></div>);
function SrcBadge({ids}){const ds={core:{l:"Core Banking",c:C.accent},bureau:{l:"Bureau",c:C.accent},news:{l:"News",c:C.red},gst:{l:"GST",c:C.copper},callnotes:{l:"Agent calls",c:C.blue},commodity:{l:"Commodity",c:C.amber}};return(<div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{ids.map(id=>{const s=ds[id];return s?(<span key={id} style={{display:"inline-flex",alignItems:"center",gap:3,padding:"2px 6px",borderRadius:4,background:s.c===C.accent?C.accentPale:s.c===C.red?C.redPale:s.c===C.blue?C.bluePale:C.copperPale,fontSize:8,fontFamily:mn}}><span style={{width:4,height:4,borderRadius:"50%",background:s.c}}/><span style={{color:C.sub}}>{s.l}</span></span>):null;})}</div>);}
function SevIcon({sev}){const m={critical:{bg:C.redPale,bc:C.red,ch:"!"},warning:{bg:C.copperPale,bc:C.copper,ch:"⏱"},positive:{bg:C.accentPale,bc:C.accent,ch:"✓"},info:{bg:C.bluePale,bc:C.blue,ch:"i"}};const s=m[sev]||m.info;return(<div style={{width:26,height:26,borderRadius:"50%",background:s.bg,border:`1.5px solid ${s.bc}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{fontSize:sev==="critical"?13:11,color:s.bc,fontWeight:700}}>{s.ch}</span></div>);}

// ═══ CONV PANEL ═══
function ConvPanel({messages,onClose,onAsk}){const[q,setQ]=useState("");const send=()=>{if(q.trim()){onAsk(q.trim());setQ("");}};return(<div style={{position:"fixed",top:0,right:0,width:420,height:"100vh",background:C.card,borderLeft:`1px solid ${C.border}`,boxShadow:"-4px 0 24px rgba(0,0,0,0.08)",zIndex:200,display:"flex",flexDirection:"column"}}><div style={{padding:"14px 16px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:20,height:20,borderRadius:"50%",background:C.accent,color:"#fff",fontSize:9,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>Q</div><span style={{fontSize:13,fontWeight:600}}>Discuss with questt.</span></div><button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",fontSize:18,color:C.muted}}>×</button></div><div style={{flex:1,overflowY:"auto",padding:14}}>{messages.map((m,i)=>(<div key={i} style={{marginBottom:10}}>{m.role==="user"?(<div style={{display:"flex",justifyContent:"flex-end"}}><div style={{padding:"8px 12px",background:C.accentPale,borderRadius:8,fontSize:12,color:C.accent,maxWidth:"85%"}}>{m.text}</div></div>):(<div>{m.agents&&<div style={{display:"flex",gap:4,marginBottom:4}}>{m.agents.map((a,j)=>(<span key={j} style={{fontSize:9,fontFamily:mn,color:C.accent,padding:"2px 6px",background:C.accentPale,borderRadius:3}}>{a} Agent</span>))}</div>}<div style={{fontSize:12,color:C.sub,lineHeight:1.6,whiteSpace:"pre-line"}}>{m.text}</div>{m.followUps&&<div style={{display:"flex",flexDirection:"column",gap:4,marginTop:8}}>{m.followUps.map((f,j)=>(<button key={j} onClick={()=>onAsk(f)} style={{padding:"5px 8px",background:C.bg,border:`1px solid ${C.border}`,borderRadius:5,fontSize:10,color:C.sub,cursor:"pointer",fontFamily:sn,textAlign:"left"}}>{f}</button>))}</div>}</div>)}</div>))}</div><div style={{padding:"10px 14px",borderTop:`1px solid ${C.border}`,display:"flex",gap:8}}><input value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Ask a follow-up..." style={{flex:1,padding:"8px 10px",border:`1px solid ${C.border}`,borderRadius:6,fontSize:12,fontFamily:sn,outline:"none"}}/><button onClick={send} style={{padding:"8px 14px",background:C.accent,color:"#fff",border:"none",borderRadius:6,fontSize:11,fontWeight:600,cursor:"pointer"}}>→</button></div></div>);}

// ═══ ACTION BAR (Nancy's CTAs) ═══
function ActionBar({account,compact}){
  const [assignOpen,setAssignOpen]=useState(false);const [assignedTo,setAssignedTo]=useState(account.agent||null);
  const [restructOpen,setRestruct]=useState(false);const [restructChoice,setRestructChoice]=useState(null);
  const [settlementOpen,setSettlementOpen]=useState(false);const [settlementPct,setSettlementPct]=useState(70);const [settlementApproved,setSettlementApproved]=useState(false);
  const [prioritized,setPrioritized]=useState(false);const [flagged,setFlagged]=useState(false);
  const closeAll=()=>{setAssignOpen(false);setRestruct(false);setSettlementOpen(false);};
  const p=compact?"4px 10px":"7px 14px";const fs=compact?10:11;const r=compact?4:5;
  const btn={padding:p,borderRadius:r,fontSize:fs,cursor:"pointer",fontFamily:sn};
  const pri={...btn,background:C.accent,color:"#fff",border:"none",fontWeight:600};
  const sec={...btn,background:C.card,color:C.sub,border:`1px solid ${C.border}`};
  const done={...btn,background:C.accentPale,color:C.accent,border:`1px solid ${C.accent}40`,fontWeight:600};

  return(<div style={{display:"flex",gap:compact?5:7,flexWrap:"wrap",alignItems:"center"}} onClick={e=>e.stopPropagation()}>
    <div style={{position:"relative"}}>
      {!assignedTo?<button onClick={()=>{closeAll();setAssignOpen(!assignOpen);}} style={pri}>Assign to ▾</button>:<button onClick={()=>{closeAll();setAssignOpen(!assignOpen);}} style={sec}>↻ {assignedTo}</button>}
      {assignOpen&&<div style={{position:"absolute",top:"100%",left:0,marginTop:4,background:C.card,border:`1px solid ${C.border}`,borderRadius:6,boxShadow:"0 4px 16px rgba(0,0,0,0.1)",zIndex:10,minWidth:160,overflow:"hidden"}}>
        <div style={{padding:"5px 10px",fontSize:9,fontFamily:mn,color:C.muted,borderBottom:`1px solid ${C.borderLight}`}}>ASSIGN TO</div>
        {["Ankit","Josh","Fatima","Deepak"].map(name=>(<button key={name} onClick={()=>{setAssignedTo(name);setAssignOpen(false);}} style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",padding:"7px 10px",background:assignedTo===name?C.accentPale:"transparent",border:"none",borderBottom:`1px solid ${C.borderLight}`,cursor:"pointer",fontFamily:sn,fontSize:11}}><span>{name}</span>{assignedTo===name&&<span style={{color:C.accent}}>✓</span>}</button>))}
      </div>}
    </div>
    {prioritized?<button style={done}>▲ Prioritized</button>:<button onClick={()=>setPrioritized(true)} style={sec}>▲ Priority</button>}
    {flagged?<button style={done}>✓ Flagged</button>:<button onClick={()=>setFlagged(true)} style={sec}>⚑ Flag</button>}
    <div style={{position:"relative"}}>
      {restructChoice?<button style={done}>✓ {restructChoice}</button>:<button onClick={()=>{closeAll();setRestruct(!restructOpen);}} style={sec}>Restructure ▾</button>}
      {restructOpen&&<div style={{position:"absolute",top:"100%",left:0,marginTop:4,background:C.card,border:`1px solid ${C.border}`,borderRadius:6,boxShadow:"0 4px 16px rgba(0,0,0,0.1)",zIndex:10,width:250,overflow:"hidden"}}>
        <div style={{padding:"5px 10px",fontSize:9,fontFamily:mn,color:C.muted,borderBottom:`1px solid ${C.borderLight}`}}>APPROVE RESTRUCTURE</div>
        {[{l:"Tenure extension",d:"Extend by 12mo, reduce EMI ~20%",id:"Tenure ext."},{l:"Moratorium 3 months",d:"Pause EMIs, resume Q3",id:"Moratorium"},{l:"Rate reduction",d:"If eligible under policy",id:"Rate cut"}].map(opt=>(<button key={opt.id} onClick={()=>{setRestructChoice(opt.id);setRestruct(false);}} style={{display:"block",width:"100%",padding:"8px 10px",background:"transparent",border:"none",borderBottom:`1px solid ${C.borderLight}`,cursor:"pointer",textAlign:"left",fontFamily:sn}}><div style={{fontSize:11,fontWeight:600}}>{opt.l}</div><div style={{fontSize:9,color:C.muted}}>{opt.d}</div></button>))}
      </div>}
    </div>
    {account.dpd>=30&&<div style={{position:"relative"}}>
      {settlementApproved?<button style={done}>✓ Settlement @ {settlementPct}%</button>:<button onClick={()=>{closeAll();setSettlementOpen(!settlementOpen);}} style={sec}>Settlement ▾</button>}
      {settlementOpen&&<div style={{position:"absolute",top:"100%",right:0,marginTop:4,background:C.card,border:`1px solid ${C.border}`,borderRadius:6,boxShadow:"0 4px 16px rgba(0,0,0,0.1)",zIndex:10,width:200,padding:12}}>
        <div style={{fontSize:10,fontFamily:mn,color:C.muted,marginBottom:6}}>SETTLEMENT</div>
        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}><input type="range" min={50} max={90} value={settlementPct} onChange={e=>setSettlementPct(Number(e.target.value))} style={{flex:1,accentColor:C.accent}}/><span style={{fontSize:14,fontWeight:700,fontFamily:mn,color:C.accent}}>{settlementPct}%</span></div>
        <button onClick={()=>{setSettlementApproved(true);setSettlementOpen(false);}} style={{...pri,width:"100%"}}>Approve</button>
      </div>}
    </div>}
  </div>);
}

// ═══════════════════════════════════════════════════
// DATA — Nancy's Mumbai-Andheri queue, hospitality crisis
// ═══════════════════════════════════════════════════
const agents=[
  {id:"ankit",name:"Ankit",rate:70,queue:10,recovered:"₹5.1L",territory:"Pune",trend:[68,68,69,69,70,70],note:"Consistent. Handles commercial accounts well."},
  {id:"josh",name:"Josh",rate:67,queue:12,recovered:"₹6.2L",territory:"Andheri",trend:[70,69,68,67,67,67],note:"Queue grew from 10 to 14 with hospitality accounts. Overdue contacts correlate with queue growth."},
  {id:"fatima",name:"Fatima",rate:73,queue:11,recovered:"₹4.8L",territory:"Ahmedabad/Surat",trend:[65,67,69,71,72,73],note:"Best improvement on team. Digital-first approach — 24% via WhatsApp/app vs 14% team avg."},
  {id:"deepak",name:"Deepak",rate:56,queue:9,recovered:"₹2.3L",territory:"Ahmedabad",trend:[62,60,58,57,56,56],note:"Struggling. Territory has 8 textile MSME accounts hit by cotton spike. Needs redistribution."},
];

const queueAccounts=[
  {id:"a1",name:"Vikram Khanna",product:"Commercial Loan",outstanding:"₹2.8Cr",dpd:18,bucket:"0-30",prob:{bucket:"89%",npa:"38%",prevBucket:"24%"},signals:["Hospitality — hotel owner","Iran-Israel impact","Revenue ↓ est. 40%","GST Q4 decline"],agent:"Ankit",action:"RM call this week — restructure assessment",daysSince:0,status:"New",flag:"Sector risk",branch:"Andheri",
    detail:"Hotel owner, 3 properties in Mumbai western suburbs. Commercial loan ₹2.8Cr, DPD 18. Geopolitical escalation means his hotels will see sharp revenue decline. GST filings show Q4 revenue already declining 15% before the crisis — the geopolitical escalation will compound this. Estimated 40% revenue impact over next 2 months based on similar events' impact on mid-range hotels.",
    history:[{date:"25 Mar",type:"SMS",note:"Payment reminder",outcome:null},{date:"18 Mar",type:"Auto-call",note:"No answer",outcome:"No answer"}],
    convResp:{agents:["Risk","Collections"],text:"Vikram Khanna — ₹2.8Cr commercial, DPD 18:\n\n3 hotels in Andheri/Bandra/Juhu. Mid-range segment (₹3,000-5,000/night). Occupancy data from GST filings: Q3 78%, Q4 dropped to 64% (already declining). Iran-Israel will push this further — similar events historically cause 30-50% drop in international tourist bookings for 3-6 months.\n\nCash flow model: at 40% revenue decline, EMI coverage ratio drops from 1.8× to 0.9× — he can't cover EMI from hotel income alone. Has personal savings (CASA ₹18L) but that covers ~4 months of EMI.\n\nRecommend: RM call, not phone agent. Tenure extension from 84mo to 108mo reduces EMI by 22%. Alternatively, 3-month moratorium to buy time for travel season recovery.",followUps:["What are the restructure options?","Compare to other hotel accounts","His personal savings runway?"]}, trail:[{step:"Account snapshot",source:"Core Banking",finding:"Commercial loan ₹2.8Cr, DPD 18. Hotel owner, 3 properties in western suburbs."},{step:"Geopolitical event",source:"News",finding:"Iran-Israel escalation → hospitality revenue decline 30-40%. Mid-range hotels heavily exposed."},{step:"Revenue assessment",source:"GST",finding:"Q4 GST already declining 15%. Geopolitical event compounds existing softness. Est. 40% revenue drop."},{step:"Cash flow",source:"Core Banking",finding:"CASA ₹18L — covers ~4 months of EMI. Not immediate default but trajectory is clear."},{step:"Treatment",source:"Collections strategy",finding:"RM-level account (₹2.8Cr). Tenure extension 84→108mo (-22% EMI) or 3-month moratorium. Ankit assigned."}]},
  {id:"a2",name:"Priya Hospitality Group",product:"WC Facility",outstanding:"₹1.2Cr",dpd:35,bucket:"30-60",prob:{bucket:"72%",npa:"31%",prevBucket:"52%"},signals:["Restaurant chain — 4 outlets","Already in 30-60","GST revenue ↓40%","Staff layoffs detected"],agent:"Ankit",action:"Restructure — tenure extension",daysSince:3,status:"In progress",flag:"Sector risk",branch:"Andheri",
    detail:"Restaurant chain with 4 outlets across Mumbai. WC facility ₹1.2Cr, DPD 35 — already in 30-60 bucket. GST filings show 40% revenue decline in Q4. Payroll data shows salary payments to staff reduced from 12 to 8 (layoffs). This is a business in active contraction. Without restructuring, will migrate to 60-90 within 30 days.",
    history:[{date:"25 Mar",type:"Phone",note:"Spoke with owner. Confirmed business stress. Willing to discuss restructure.",outcome:"Spoke — open to restructure"},{date:"18 Mar",type:"Phone",note:"No answer",outcome:"No answer"}],
    convResp:{agents:["Collections"],text:"Priya Hospitality — ₹1.2Cr WC, DPD 35:\n\n4 outlets: Andheri, Bandra, Lower Parel, Powai. Staff reduced from 12 to 8 (payroll data). GST revenue down 40%.\n\nAnkit spoke on 25 Mar — owner confirmed stress, willing to discuss restructure. This is cooperative — don't escalate.\n\nRecommend: tenure extension on WC facility. Convert to term loan structure, 36mo repayment at reduced EMI. Owner has property collateral (restaurant leases) which reduces loss-given-default.\n\nKey: the crisis is external (geopolitical), not operational mismanagement. Recovery probability is higher than typical restaurant failures.",followUps:["Draft the restructure terms","What's the collateral position?","Compare to other restaurant accounts"]}, trail:[{step:"Account snapshot",source:"Core Banking",finding:"WC facility ₹1.2Cr, DPD 35. Already in 30-60. Restaurant chain, 4 outlets."},{step:"Revenue decline",source:"GST",finding:"Revenue down 40% Q4. Staff reduced from 12 to 8 (payroll data)."},{step:"Contact history",source:"Agent calls",finding:"25 Mar: owner confirmed stress, willing to discuss restructure. Cooperative."},{step:"Treatment",source:"Collections strategy",finding:"Restructure — tenure extension. Convert WC to term loan, 36mo. Crisis is external, not operational."}]},
  {id:"a3",name:"Rahul Menon",product:"Personal Loan",outstanding:"₹4.2L",dpd:22,bucket:"0-30",prob:{bucket:"85%",npa:"12%",prevBucket:"85%"},signals:["Job loss — IT layoff","Call: insurance payout April 10","Bureau stable at 712","No other stress signals"],agent:"Josh",action:"PAUSE until April 12 — confirmed payout",daysSince:5,status:"Paused",flag:"Agent reported",branch:"Andheri",
    detail:"Salaried, was at Infosys. Laid off 3 weeks ago. Told agent during last call: waiting for insurance payout on April 10, will pay from that. Bureau 712 — clean history, no prior delinquency. PL is his only loan. This is a temporary disruption with a specific resolution date. Calling him before April 10 is counterproductive.",
    history:[{date:"23 Mar",type:"Phone",note:"Customer said: lost job 3 weeks ago. Insurance payout expected April 10. Will pay from that.",outcome:"Spoke — payout pending"},{date:"15 Mar",type:"SMS",note:"Payment reminder",outcome:null}],
    convResp:{agents:["Collections"],text:"Rahul Menon — ₹4.2L PL, DPD 22:\n\nEx-Infosys, laid off in mass layoff (12 others in our portfolio from same employer). Clean history — bureau 712, no prior delinquency. PL is only loan.\n\nHe told the agent specifically: insurance payout April 10. This is verifiable — we can check the payout status around that date.\n\nTreatment: pause all contact until April 12. If payout arrives, he'll pay. If not, then we reassess with a restructure offer.\n\nDo NOT call before then — he gave us specific information and acting on it builds trust. Calling despite knowing his situation damages the relationship and wastes agent time.",followUps:["Set April 12 reminder","How many other Infosys layoff accounts?","What if payout doesn't come through?"]}, trail:[{step:"Account snapshot",source:"Core Banking",finding:"PL ₹4.2L, DPD 22. Bureau 712, clean history. Only loan."},{step:"Call intelligence",source:"Agent calls",finding:"23 Mar: customer disclosed job loss (Infosys layoff) + insurance payout April 10."},{step:"Treatment",source:"Nancy — 24 Mar",finding:"Pause all contact until April 12. Payout is specific and verifiable."}]},
  {id:"a4",name:"Sunita Devi",product:"Business Loan",outstanding:"₹8L",dpd:45,bucket:"30-60",prob:{bucket:"35%",npa:"8%",prevBucket:"55%"},signals:["Call: family emergency, shop closed","But: FD ₹3L opened yesterday","Has liquidity — not distressed","Needs gentle approach"],agent:"Fatima",action:"SMS nudge only — she has funds",daysSince:2,status:"Active",flag:"Agent reported",branch:"Surat",
    detail:"Retail shop owner. BL ₹8L, DPD 45. Agent noted 'family emergency, temporarily closed shop' during last call. But core banking shows she opened a ₹3L FD yesterday — she has liquidity. This isn't inability to pay, it's a personal situation. Aggressive calling would be inappropriate. She needs a gentle SMS reminding her the payment is due, acknowledging the difficult time.",
    history:[{date:"26 Mar",type:"Phone",note:"Spoke. Family emergency. Shop closed temporarily. Sounded stressed.",outcome:"Spoke — personal situation"},{date:"20 Mar",type:"SMS",note:"Overdue reminder",outcome:null}],
    convResp:{agents:["Collections"],text:"Sunita Devi — ₹8L BL, DPD 45:\n\nShe has the money. FD ₹3L opened yesterday (core banking). Shop closed temporarily due to family emergency — not a business failure.\n\nTreatment: SMS only. 'We understand you're going through a difficult time. A gentle reminder that your EMI of ₹X is due. If you'd like to set up a convenient payment date, reply to this message.'\n\nDo NOT call repeatedly. Do NOT escalate. Do NOT treat this like a standard 30-60 collection. She'll pay when her personal situation stabilizes — she clearly has funds.",followUps:["Send the SMS","When did the shop close?","What's her payment history before this?"]}, trail:[{step:"Account snapshot",source:"Core Banking",finding:"BL ₹8L, DPD 45. 3 years of perfect payments before this."},{step:"Call intelligence",source:"Agent calls",finding:"26 Mar: family emergency, shop temporarily closed."},{step:"Contradicting signal",source:"Core Banking",finding:"FD ₹3L opened 27 Mar — she has liquidity. This is personal disruption, not financial distress."},{step:"Treatment",source:"Collections strategy",finding:"SMS only. No calls, no escalation. She has funds and will pay when situation stabilizes."}]},
  {id:"a5",name:"Deepak Hotels",product:"Commercial Loan",outstanding:"₹4.5Cr",dpd:42,bucket:"30-60",prob:{bucket:"84%",npa:"52%",prevBucket:"68%"},signals:["Budget hotel chain — Pune","Hospitality crisis","Already 30-60 before crisis","GST ↓ 3 consecutive quarters"],agent:null,action:"Assign to Ankit — needs RM-level handling",daysSince:0,status:"Unassigned",flag:"Sector risk",branch:"Pune",
    detail:"Budget hotel chain, 5 properties in Pune. ₹4.5Cr commercial loan, DPD 42 — was already in 30-60 before the hospitality crisis. GST declining for 3 consecutive quarters (₹82L → ₹68L → ₹54L). The geopolitical event compounds an already deteriorating business. Largest single exposure in Nancy's territory. Needs assignment to Ankit (handles Pune, experienced with commercial restructuring).",
    history:[],
    convResp:{agents:["Risk","Collections"],text:"Deepak Hotels — ₹4.5Cr, DPD 42:\n\nThis is the most concerning account. 5 budget hotels in Pune. Revenue declining 3 quarters straight (₹82L → ₹68L → ₹54L quarterly GST). Was already struggling BEFORE the geopolitical crisis — the crisis just accelerated an existing decline.\n\nBudget hotels are more vulnerable than premium — less margin buffer, more dependent on volume. Pune's business travel (their core segment) was already soft due to IT spending cuts.\n\nOptions:\n1. Restructure: extend tenure, reduce EMI. But if the business is structurally declining, this just delays.\n2. Settlement: at DPD 42 with ₹4.5Cr, a 70% settlement = ₹3.15Cr recovery. Need to assess if business will recover or not.\n3. Collateral enforcement: property values in Pune are stable. LTV is ~55%.\n\nRecommend: assign to Ankit, send for RM visit to assess business viability before deciding.",followUps:["Assign to Ankit","What's the property valuation?","Compare to other budget hotel accounts"]}, trail:[{step:"Account snapshot",source:"Core Banking",finding:"Commercial loan ₹4.5Cr, DPD 42. Budget hotel chain, 5 properties in Pune."},{step:"Revenue trajectory",source:"GST",finding:"3 consecutive quarters of GST decline: ₹82L → ₹68L → ₹54L. Structural decline, not just crisis."},{step:"Geopolitical event",source:"News",finding:"Hospitality crisis accelerates existing decline. Budget hotels more vulnerable — less margin buffer."},{step:"Treatment question",source:"Collections strategy",finding:"Restructure or settlement? Need RM visit to assess business viability. Assign to Ankit (Pune territory)."}]},
  {id:"a6",name:"Amit Traders",product:"Business Loan",outstanding:"₹15L",dpd:12,bucket:"0-30",prob:{bucket:"58%",npa:"15%",prevBucket:"22%"},signals:["Textile MSME","Cotton price +22%","Margins compressed 12%→4%","GST Q4 flat vs +15% seasonal"],agent:"Deepak",action:"Proactive restructure offer",daysSince:4,status:"In progress",flag:"Commodity risk",branch:"Ahmedabad",
    detail:"Textile trader, Ahmedabad. BL ₹15L, DPD 12. Cotton prices spiked 22% in 14 days — his raw material cost. Margins compressed from 12% to 4%. GST Q4 flat despite typically being +15-20% seasonal. At current margins, EMI coverage drops below 1×. Without restructuring, will miss next EMI cycle.",
    history:[{date:"24 Mar",type:"Phone",note:"Spoke. Customer aware of margin pressure. Worried about next quarter.",outcome:"Spoke — concerned"}],
    convResp:{agents:["Risk"],text:"Amit Traders — ₹15L BL, DPD 12:\n\nCotton is 68% of his input costs. At ₹76,100/candy (up from ₹62,400), his margins are basically gone. GST shows he's not passing costs to customers yet — volume would drop if he does.\n\nDeepak spoke on 24 Mar — customer is aware and worried. Cooperative, not avoidant.\n\nRecommend: proactive tenure extension. EMI drops ~20%, gives him 2 quarters to adjust pricing or wait for cotton to normalize. Sep 2024 spike normalized in 8 weeks — if this follows the same pattern, he'll be fine with temporary breathing room.",followUps:["Approve the restructure","How many other textile accounts in Deepak's queue?","What if cotton keeps rising?"]}, trail:[{step:"Account snapshot",source:"Core Banking",finding:"BL ₹15L, DPD 12. Textile trader, Ahmedabad."},{step:"Commodity spike",source:"Commodity data",finding:"Cotton ₹62,400 → ₹76,100/candy (+22%). Cotton is 68% of input costs."},{step:"Margin compression",source:"GST + model",finding:"Margins compressed 12% → 4%. Q4 flat vs +15% seasonal norm. EMI coverage drops below 1×."},{step:"Treatment",source:"Collections strategy",finding:"Proactive tenure extension. EMI drops ~20%. Sep 2024 comparison: similar spike, 84% cure with early restructure."}]},
];

const briefs=[
  {sev:"critical",headline:"14 hospitality accounts flowing into your territory — ₹12.8Cr exposure from macro trigger",
    body:"8 hospitality-impacted accounts added to your queue following overnight reclassification. 5 were in 0-30 (now reclassified to 30-60), 3 were already in 30-60. Largest: Deepak Hotels ₹4.5Cr (unassigned — needs Ankit), Vikram Khanna ₹2.8Cr (Ankit). Travel restrictions will compress hotel/restaurant revenue over next 2-4 weeks.",
    sources:["core","gst"],prompts:["Show all 14 hospitality accounts","Which ones need RM vs phone?","How to distribute across agents?"],
    convResp:{agents:["Collections"],text:"8 hospitality-impacted accounts in your queue:\n\nNeeds RM-level handling (>₹1Cr):\n• Deepak Hotels ₹4.5Cr DPD 42 — UNASSIGNED, Pune. Assign to Ankit.\n• Vikram Khanna ₹2.8Cr DPD 18 — assigned to Ankit (RM-level account).\n• Seaside Hotels ₹1.9Cr DPD 12 — Josh.\n\nPhone collection appropriate (<₹1Cr):\n• 11 smaller accounts, avg ₹45L, across all 4 agents.\n\nCapacity issue: Josh already has 12 accounts. Adding more hospitality will stretch him. Recommend: keep hospitality accounts <₹1Cr on Josh but redistribute 2 of his existing low-priority accounts to Fatima.",followUps:["Assign Deepak Hotels to Ankit","Redistribute Josh's queue","What restructure terms for hotels?"]}},
  {sev:"warning",headline:"Rahul Menon — insurance payout April 10, do NOT call until then",
    body:"Josh's account. PL ₹4.2L, DPD 22. Customer confirmed job loss + insurance payout April 10. Treatment set to pause. Ensure no automated calls go out before April 12.",
    sources:["callnotes","core"],prompts:["Confirm pause is set","How many other job-loss accounts?","What if payout doesn't arrive?"],
    convResp:{agents:["Collections"],text:"Rahul pause confirmation:\n\nCurrent status: pause flag set on account. Auto-dialer excluded. Next scheduled action: April 12 manual check by Josh.\n\n11 other accounts from same Infosys layoff in our broader portfolio (3 in your territory). All in 0-30, all clean bureau histories. Treatment: light touch for all, with individual payout/job-search timelines where disclosed.",followUps:["Show the other Infosys accounts","Set April 12 calendar reminder"]}},
  {sev:"info",headline:"Sunita Devi — shop closed but opened ₹3L FD. She has funds.",
    body:"BL ₹8L, DPD 45. Call notes: family emergency. Core banking: FD ₹3L opened yesterday. She can pay — treatment should be SMS only, not escalation. Fatima handling.",
    sources:["callnotes","core"],prompts:["Send the SMS","Full signal picture","Compare to her payment history"],
    convResp:{agents:["Collections"],text:"Sunita's full picture:\n\nBL ₹8L, DPD 45. Before this: 3 years of perfect payments. Zero prior delinquency.\n\nTimeline: shop closed ~2 weeks ago (transaction activity dropped to zero). Family emergency disclosed in 26 Mar call. But FD ₹3L opened 27 Mar — she has liquidity.\n\nThis is a temporary personal disruption, not financial distress. Treatment: one gentle SMS this week. If no response in 7 days, one follow-up SMS. No calls, no escalation. She'll pay when ready.",followUps:["Send the SMS now","Set 7-day follow-up"]}},
  {sev:"positive",headline:"Fatima has capacity — 73% resolution, 11 accounts, room for 3-4 more",
    body:"Resolution improved from 65% to 73% in 3 months. Digital-first approach working (24% via WhatsApp/app). Currently at 11 accounts — has capacity for 3-4 more from Josh's overflow or hospitality queue.",
    sources:["core"],prompts:["Which accounts should move to Fatima?","Compare her approach to team","Can she handle hospitality commercial?"],
    convResp:{agents:["Collections"],text:"Fatima — trending up:\n\n6-month: 65% → 67% → 69% → 71% → 72% → 73%\nDigital channel: 24% of contacts via WhatsApp/app (team avg 14%). Her SMS-before-call approach gets higher response rates on first contact.\n\nCurrent queue: 11 accounts. Can take 3-4 more. Best fit: smaller hospitality accounts (<₹50L) where digital outreach is appropriate, or textile MSME accounts from Deepak's overflow.\n\nNot ideal for: large commercial (>₹1Cr) where RM/phone relationship matters. Keep those on Ankit.",followUps:["Route 3 accounts to Fatima","Compare her digital approach","Which specific accounts?"]}},
];


// ═══ DECISION TRAIL OVERLAY ═══
function TrailOverlay({account,onClose}){
  if(!account||!account.trail)return null;
  return(<div><div onClick={onClose} style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.35)",zIndex:300,backdropFilter:"blur(2px)"}}/><div style={{position:"fixed",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:620,maxHeight:"80vh",background:C.card,borderRadius:10,boxShadow:"0 16px 64px rgba(0,0,0,0.18)",zIndex:301,display:"flex",flexDirection:"column",overflow:"hidden"}}><div style={{padding:"18px 24px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}><div><div style={{fontSize:10,fontFamily:mn,color:C.accent,letterSpacing:"0.1em",fontWeight:600,marginBottom:6}}>DECISION TRAIL</div><div style={{fontFamily:sr,fontSize:16,fontWeight:700}}>{account.name}</div><div style={{fontSize:12,color:C.muted,marginTop:2}}>{account.product} · {account.outstanding} · DPD {account.dpd}</div></div><button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",fontSize:20,color:C.muted,lineHeight:1}}>×</button></div><div style={{flex:1,overflowY:"auto",padding:"20px 24px"}}>{account.trail.map((t,i)=>(<div key={i} style={{display:"flex",gap:14}}><div style={{display:"flex",flexDirection:"column",alignItems:"center",width:24,flexShrink:0}}><div style={{width:24,height:24,borderRadius:"50%",background:i===account.trail.length-1?C.accent:C.bg,border:`1.5px solid ${i===account.trail.length-1?C.accent:C.border}`,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontSize:10,color:i===account.trail.length-1?"#fff":C.muted,fontWeight:700}}>{i+1}</span></div>{i<account.trail.length-1&&<div style={{width:1,flex:1,minHeight:12,background:C.border}}/>}</div><div style={{flex:1,paddingBottom:i<account.trail.length-1?16:0}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><span style={{fontSize:13,fontWeight:600}}>{t.step}</span><span style={{fontSize:9,fontFamily:mn,color:C.muted,padding:"1px 5px",background:C.bg,borderRadius:3}}>{t.source}</span></div><div style={{fontSize:12,color:C.sub,lineHeight:1.55,padding:"8px 10px",background:C.bg,borderRadius:6,borderLeft:`3px solid ${i===account.trail.length-1?C.accent:C.border}`}}>{t.finding}</div></div></div>))}</div></div></div>);
}
// ═══════════════════════════════════════════════════
// APP
// ═══════════════════════════════════════════════════
export default function App(){
  const [tab,setTab]=useState("overview");
  const [insightFilter,setInsightFilter]=useState("all");
  const [selectedAccount,setSelectedAccount]=useState(null);
  const [expandedAgent,setExpandedAgent]=useState(null);
  const [conv,setConv]=useState(null);
  
  const [trailAccount,setTrailAccount]=useState(null);
  const [queueFilter,setQueueFilter]=useState("all");
  const [searchTerm,setSearchTerm]=useState("");

  const openConv=(id,q)=>{
    const acc=queueAccounts.find(a=>a.id===id);
    const bd=id.startsWith?.("b")?briefs[parseInt(id.slice(1))]:null;
    const resp=acc?.convResp||bd?.convResp||{agents:["Collections"],text:"Analyzing..."};
    setConv({messages:[{role:"user",text:q},{role:"morrie",...resp}],id});
  };
  const addConvMsg=(text)=>{if(!conv)return;const acc=queueAccounts.find(a=>a.id===conv.id);const bd=conv.id.startsWith?.("b")?briefs[parseInt(conv.id.slice(1))]:null;const resp=acc?.convResp||bd?.convResp||{agents:["Collections"],text:"Continuing..."};setConv(prev=>({...prev,messages:[...prev.messages,{role:"user",text},{role:"morrie",agents:resp.agents,text:resp.text,followUps:resp.followUps}]}));};

  const filteredQueue=(()=>{let q=queueFilter==="all"?queueAccounts:queueFilter==="unassigned"?queueAccounts.filter(a=>!a.agent):queueAccounts.filter(a=>a.agent?.toLowerCase()===queueFilter);if(searchTerm){const s=searchTerm.toLowerCase();q=queueAccounts.filter(a=>a.name.toLowerCase().includes(s)||a.product.toLowerCase().includes(s));}return q;})();

  const navItems=[{id:"overview",label:"Overview",icon:"◻"},{id:"queue",label:"Queue",icon:"☰"},{id:"agents",label:"Agents",icon:"♟"}];

  return(<div className="overflow-auto" style={{display:"flex",background:C.bg,height:"100vh",fontFamily:sn,color:C.text}}>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');*{box-sizing:border-box;margin:0;padding:0}button{font-family:inherit}::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#DDD;border-radius:3px}`}</style>

    <div style={{width:56,background:"#161616",borderRight:"1px solid #252525",position:"fixed",top:0,left:0,height:"100vh",display:"flex",flexDirection:"column",alignItems:"center",paddingTop:14,zIndex:100}}>
      <div style={{width:28,height:28,borderRadius:5,background:C.accent,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,color:"#fff",marginBottom:20}}>Q</div>
      {navItems.map(n=>(<button key={n.id} onClick={()=>{setTab(n.id);setSelectedAccount(null);}} style={{width:44,height:44,borderRadius:6,border:"none",cursor:"pointer",background:tab===n.id?"#2A2A2A":"transparent",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:2,marginBottom:4}}><span style={{fontSize:14,color:tab===n.id?C.accent:"#666"}}>{n.icon}</span><span style={{fontSize:8,color:tab===n.id?"#fff":"#666",fontWeight:tab===n.id?600:400}}>{n.label}</span></button>))}
      <div style={{flex:1}}/>
      <div style={{width:30,height:30,borderRadius:"50%",background:"#2A2A2A",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:14}}><span style={{fontSize:10,fontWeight:600,color:C.accent}}>NW</span></div>
    </div>

    <div style={{marginLeft:56,flex:1}}>
      <div style={{background:C.card,borderBottom:`1px solid ${C.border}`,padding:"0 28px",position:"sticky",top:0,zIndex:50}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",height:46}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}><span style={{fontFamily:sr,fontSize:16,fontWeight:700}}>questt.</span><span style={{width:1,height:16,background:C.border}}/><span style={{fontSize:12,fontWeight:600,color:C.accent}}>JIO FS</span><span style={{fontSize:12,color:C.muted}}>Collections · West — Mumbai & Pune</span></div>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <div style={{display:"flex",gap:4}}>{["Sam","Nancy","Josh"].map((p,i)=>(<button key={p} style={{padding:"4px 10px",borderRadius:4,border:`1px solid ${i===1?C.accent:C.border}`,background:i===1?C.accentPale:C.card,color:i===1?C.accent:C.muted,fontSize:10,fontWeight:i===1?600:400,cursor:"pointer"}}>{p}</button>))}</div>
            <div style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:28,height:28,borderRadius:"50%",background:C.accentPale,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontSize:10,fontWeight:600,color:C.accent}}>NW</span></div><span style={{fontSize:12,color:C.muted}}>Nancy</span></div>
          </div>
        </div>
      </div>

      <div style={{padding:"24px 28px",maxWidth:1060}}>
        {/* ═══ OVERVIEW ═══ */}
        {tab==="overview"&&<div>
          <div style={{display:"flex",gap:1,marginBottom:28,background:C.border,borderRadius:6,overflow:"hidden"}}>
            {[{v:"46",d:"accounts in queue"},{v:"67%",d:"resolution MTD"},{v:"₹18.4L",d:"recovered MTD"},{v:"8",d:"hospitality accounts (new)",alert:true},{v:"3",d:"paused (call intel)"}].map((k,i)=>(<div key={i} style={{flex:1,background:C.card,padding:"12px 16px"}}><div style={{fontSize:24,fontWeight:700,fontFamily:sr,lineHeight:1.1,color:k.alert?C.red:C.text}}>{k.v}</div><div style={{fontSize:11,color:k.alert?C.red:C.muted,marginTop:3,fontWeight:k.alert?600:400}}>{k.d}</div></div>))}
          </div>

          <h2 style={{fontFamily:sr,fontSize:22,fontWeight:700,marginBottom:18}}>Morning Briefing</h2>
          <div style={{display:"flex",flexDirection:"column",gap:14,marginBottom:40}}>
            {briefs.map((b,bi)=>(<div key={bi} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"16px 20px"}}>
              <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                <SevIcon sev={b.sev}/>
                <div style={{flex:1}}>
                  <div style={{fontSize:14,fontWeight:600,lineHeight:1.4,marginBottom:5}}>{b.headline}</div>
                  <div style={{fontSize:12,color:C.sub,lineHeight:1.6,marginBottom:8}}>{b.body}</div>
                  <SrcBadge ids={b.sources}/>
                  <div style={{display:"flex",gap:5,marginTop:8,flexWrap:"wrap"}}>{b.prompts.map((p,i)=>(<button key={i} onClick={()=>openConv("b"+bi,p)} style={{padding:"4px 9px",background:C.bg,border:`1px solid ${C.border}`,borderRadius:5,fontSize:10,color:C.sub,cursor:"pointer"}}>{p}</button>))}</div>
                </div>
              </div>
            </div>))}
          </div>
        </div>}

        {/* ═══ QUEUE ═══ */}
        {tab==="queue"&&!selectedAccount&&<div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:16}}>
            <div><h2 style={{fontFamily:sr,fontSize:22,fontWeight:700,margin:0}}>Action Queue</h2><div style={{fontSize:13,color:C.muted,marginTop:4}}>46 accounts · 8 hospitality-flagged · Showing flagged + high-priority</div></div>
            <div style={{display:"flex",gap:8}}>
              <div style={{display:"flex",alignItems:"center",gap:6,padding:"6px 12px",background:C.card,border:`1px solid ${searchTerm?C.accent:C.border}`,borderRadius:6,width:220}}><span style={{fontSize:12,color:C.lt}}>⌕</span><input value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} placeholder="Search accounts…" style={{border:"none",outline:"none",fontSize:11,fontFamily:sn,background:"transparent",flex:1}}/>{searchTerm&&<button onClick={()=>setSearchTerm("")} style={{background:"none",border:"none",fontSize:14,color:C.muted,cursor:"pointer",lineHeight:1}}>×</button>}</div>
            </div>
          </div>
          <div style={{display:"flex",gap:6,marginBottom:16}}>
            {[{id:"all",l:"All"},{id:"josh",l:"Josh"},{id:"ankit",l:"Ankit"},{id:"fatima",l:"Fatima"},{id:"deepak",l:"Deepak"},{id:"unassigned",l:"Unassigned"}].map(f=>(<button key={f.id} onClick={()=>setQueueFilter(f.id)} style={{padding:"4px 10px",borderRadius:18,border:`1px solid ${queueFilter===f.id?C.accent:C.border}`,background:queueFilter===f.id?C.accent:C.card,color:queueFilter===f.id?"#fff":C.sub,fontSize:10,cursor:"pointer"}}>{f.l}</button>))}
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {filteredQueue.map(a=>(<div key={a.id} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,borderLeft:`4px solid ${a.flag==="Sector risk"?C.red:a.flag==="Commodity risk"?C.amber:C.blue}`,padding:"14px 18px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",cursor:"pointer",marginBottom:8}} onClick={()=>{setSelectedAccount(a);setTrailOpen(false);}}>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <span style={{fontSize:15,fontWeight:600}}>{a.name}</span>
                    <span style={{fontSize:9,fontFamily:mn,color:a.dpd>=30?C.red:C.amber,padding:"1px 5px",background:a.dpd>=30?C.redPale:C.amberPale,borderRadius:3}}>DPD {a.dpd}</span>
                    <span style={{fontSize:9,fontFamily:mn,color:a.flag==="Sector risk"?C.red:a.flag==="Commodity risk"?C.amber:C.blue,padding:"1px 5px",background:a.flag==="Sector risk"?C.redPale:a.flag==="Commodity risk"?C.amberPale:C.bluePale,borderRadius:3}}>{a.flag}</span>
                    {a.status==="Paused"&&<span style={{fontSize:9,fontFamily:mn,color:C.accent,padding:"1px 5px",background:C.accentPale,borderRadius:3}}>PAUSED</span>}
                    {!a.agent&&<span style={{fontSize:9,fontFamily:mn,color:C.red,padding:"1px 5px",background:C.redPale,borderRadius:3}}>UNASSIGNED</span>}
                  </div>
                  <div style={{fontSize:12,color:C.muted,marginTop:3}}>{a.product} · {a.outstanding} · {a.branch} · {a.agent||"Unassigned"}</div>
                  <div style={{fontSize:12,color:C.sub,marginTop:4}}>{a.action}</div>
                </div>
                <span style={{fontSize:12,color:C.accent,marginTop:4}}>→</span>
              </div>
              <div style={{borderTop:`1px solid ${C.borderLight}`,paddingTop:8}}><ActionBar account={a} compact={true}/></div>
            </div>))}
          </div>
        </div>}

        {/* ═══ ACCOUNT DEEP PAGE ═══ */}
        {tab==="queue"&&selectedAccount&&(()=>{const a=selectedAccount;return(<div>
          <button onClick={()=>{setSelectedAccount(null);setTrailOpen(false);}} style={{background:"none",border:"none",color:C.accent,cursor:"pointer",fontSize:12,marginBottom:16}}>← Back to Queue</button>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
            <div><h2 style={{fontFamily:sr,fontSize:22,fontWeight:700,margin:0}}>{a.name}</h2><div style={{fontSize:12,color:C.muted,marginTop:4}}>{a.product} · {a.branch} · Agent: {a.agent||"Unassigned"}</div></div>
            <div style={{display:"flex",gap:12}}><div style={{textAlign:"center"}}><div style={{fontSize:24,fontWeight:700,fontFamily:sr}}>{a.outstanding}</div><div style={{fontSize:9,fontFamily:mn,color:C.muted}}>EXPOSURE</div></div><div style={{textAlign:"center"}}><div style={{fontSize:20,fontWeight:700,fontFamily:sr,color:C.red}}>DPD {a.dpd}</div><div style={{fontSize:9,fontFamily:mn,color:C.muted}}>STATUS</div></div>{a.prob&&<><div style={{textAlign:"center",padding:"4px 10px",background:parseInt(a.prob.bucket)>=70?C.redPale:C.amberPale,borderRadius:6}}><div style={{fontSize:18,fontWeight:700,fontFamily:sr,color:parseInt(a.prob.bucket)>=70?C.red:C.amber}}>{a.prob.bucket}</div><div style={{fontSize:8,fontFamily:mn,color:C.muted}}>NEXT BUCKET RISK</div></div><div style={{textAlign:"center",padding:"4px 10px",background:parseInt(a.prob.npa)>=30?C.redPale:C.amberPale,borderRadius:6}}><div style={{fontSize:18,fontWeight:700,fontFamily:sr,color:parseInt(a.prob.npa)>=30?C.red:C.amber}}>{a.prob.npa}</div><div style={{fontSize:8,fontFamily:mn,color:C.muted}}>NPA RISK</div></div></>}</div>
          </div>
          <div style={{background:a.flag==="Sector risk"?C.redPale+"40":a.flag==="Agent reported"?C.bluePale+"40":C.amberPale+"40",borderRadius:8,padding:"14px 18px",marginBottom:14,borderLeft:`4px solid ${a.flag==="Sector risk"?C.red:a.flag==="Agent reported"?C.blue:C.amber}`}}>
            <div style={{fontSize:10,fontFamily:mn,color:a.flag==="Sector risk"?C.red:a.flag==="Agent reported"?C.blue:C.amber,letterSpacing:"0.06em",fontWeight:600,marginBottom:6}}>{a.flag} TRIGGER</div>
            <div style={{fontSize:13,color:C.sub,lineHeight:1.6}}>{a.detail}</div>
          </div>
          <div style={{display:"flex",gap:5,marginBottom:14,flexWrap:"wrap"}}>{a.signals.map((s,i)=>(<span key={i} style={{fontSize:9,padding:"3px 8px",background:C.bg,border:`1px solid ${C.border}`,borderRadius:4,color:C.sub,fontFamily:mn}}>{s}</span>))}</div>
          {a.history.length>0&&<div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"14px 18px",marginBottom:14}}>
            <div style={{fontSize:13,fontWeight:600,marginBottom:8}}>Contact History</div>
            {a.history.map((h,i)=>(<div key={i} style={{display:"flex",gap:8,padding:"5px 0",borderBottom:i<a.history.length-1?`1px solid ${C.borderLight}`:"none",fontSize:12}}>
              <span style={{color:C.muted,fontFamily:mn,fontSize:10,width:50,flexShrink:0}}>{h.date}</span>
              <span style={{fontSize:9,fontFamily:mn,color:C.sub,padding:"2px 5px",background:C.bg,borderRadius:3,flexShrink:0}}>{h.type}</span>
              <span style={{color:C.sub,flex:1}}>{h.note}</span>
              {h.outcome&&<span style={{fontSize:9,fontFamily:mn,color:C.accent,padding:"2px 5px",background:C.accentPale,borderRadius:3,flexShrink:0}}>{h.outcome}</span>}
            </div>))}
          </div>}
          <div style={{marginBottom:14}}><ActionBar account={a} compact={false}/></div>
          {a.trail&&<button onClick={()=>setTrailAccount(a)} style={{width:"100%",padding:"9px",background:C.bg,border:`1px solid ${C.accent}`,borderRadius:6,fontSize:11,color:C.accent,cursor:"pointer",fontWeight:600,marginBottom:8}}>View Decision Trail</button>}
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>openConv(a.id,`Full analysis: ${a.name}`)} style={{flex:1,padding:"9px",background:C.accent,border:"none",borderRadius:6,fontSize:11,color:"#fff",cursor:"pointer",fontWeight:600}}>Discuss with questt.</button>
          </div>
        </div>);})()}

        {/* ═══ AGENTS ═══ */}
        {tab==="agents"&&<div>
          <h2 style={{fontFamily:sr,fontSize:22,fontWeight:700,marginBottom:4}}>My Team</h2>
          <div style={{fontSize:13,color:C.muted,marginBottom:18}}>4 agents · 44 accounts · Mumbai-Andheri territory</div>
          <div style={{display:"flex",gap:1,marginBottom:16,background:C.border,borderRadius:6,overflow:"hidden"}}>
            {agents.map(ag=>{const ac=ag.rate>=70?C.accent:ag.rate>=55?C.amber:C.red;return(<div key={ag.id} style={{flex:1,background:C.card,padding:"10px 14px",cursor:"pointer"}} onClick={()=>setExpandedAgent(expandedAgent===ag.id?null:ag.id)}>
              <div style={{fontSize:11,fontWeight:600}}>{ag.name}</div><div style={{fontSize:20,fontWeight:700,fontFamily:sr,color:ac,lineHeight:1.2}}>{ag.rate}%</div>
              <div style={{fontSize:9,color:C.muted}}>{ag.queue} acc · {ag.territory}</div>
              <div style={{display:"flex",gap:1,marginTop:4}}>{ag.trend.map((v,i)=>{const isLast=i===ag.trend.length-1;return(<div key={i} style={{flex:1,height:Math.max(3,(v/100)*18),background:isLast?(ag.rate>=70?C.accent:ag.rate>=55?C.amber:C.red):C.borderLight,borderRadius:1}}/>);})}</div>
            </div>);})}
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {agents.map(ag=>{const isOpen=expandedAgent===ag.id;const ac=ag.rate>=70?C.accent:ag.rate>=55?C.amber:C.red;const agAccounts=queueAccounts.filter(a=>a.agent===ag.name);
            return(<div key={ag.id} style={{background:C.card,border:`1px solid ${isOpen?ac:C.border}`,borderRadius:8,borderLeft:`4px solid ${ac}`,overflow:"hidden",cursor:"pointer"}} onClick={()=>setExpandedAgent(isOpen?null:ag.id)}>
              <div style={{padding:"14px 18px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <div style={{width:38,height:38,borderRadius:"50%",background:ac+"18",color:ac,fontSize:14,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>{ag.name[0]}</div>
                    <div><div style={{fontSize:15,fontWeight:700,fontFamily:sr}}>{ag.name}</div><div style={{fontSize:11,color:C.muted}}>{ag.territory} · {ag.queue} accounts</div></div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:16}}>
                    <div style={{textAlign:"center"}}><div style={{fontSize:22,fontWeight:700,fontFamily:sr,color:ac}}>{ag.rate}%</div><div style={{fontSize:8,fontFamily:mn,color:C.muted}}>RESOLUTION</div></div>
                    <div style={{textAlign:"center"}}><div style={{fontSize:14,fontWeight:700,fontFamily:sr}}>{ag.recovered}</div><div style={{fontSize:8,fontFamily:mn,color:C.muted}}>RECOVERED</div></div>
                    <span style={{fontSize:11,color:C.lt,transform:isOpen?"rotate(180deg)":"none"}}>▾</span>
                  </div>
                </div>
                {isOpen&&<div style={{marginTop:14}} onClick={e=>e.stopPropagation()}>
                  <div style={{padding:"8px 10px",background:ag.trend[5]>=ag.trend[0]?C.accentPale+"40":C.amberPale+"40",borderRadius:5,marginBottom:12,fontSize:12,color:C.sub,lineHeight:1.5}}>{ag.note}</div>
                  {agAccounts.length>0&&<div>
                    <div style={{fontSize:9,fontFamily:mn,color:C.muted,letterSpacing:"0.06em",fontWeight:600,marginBottom:6}}>ACTIVE ACCOUNTS ({agAccounts.length})</div>
                    <div style={{border:`1px solid ${C.border}`,borderRadius:6,overflow:"hidden"}}>
                      {agAccounts.map((acc,i)=>(<div key={i} style={{display:"flex",alignItems:"center",padding:"7px 10px",borderBottom:i<agAccounts.length-1?`1px solid ${C.borderLight}`:"none",cursor:"pointer"}} onClick={()=>{setTab("queue");setSelectedAccount(acc);setTrailOpen(false);}}>
                        <div style={{flex:1}}><span style={{fontSize:12,fontWeight:600}}>{acc.name}</span><span style={{fontSize:11,color:C.muted}}> · {acc.outstanding} · DPD {acc.dpd}</span></div>
                        <span style={{fontSize:9,fontFamily:mn,color:acc.flag==="Sector risk"?C.red:acc.flag==="Commodity risk"?C.amber:C.blue,padding:"1px 5px",background:acc.flag==="Sector risk"?C.redPale:acc.flag==="Commodity risk"?C.amberPale:C.bluePale,borderRadius:3}}>{acc.flag}</span>
                      </div>))}
                    </div>
                  </div>}
                  <div style={{display:"flex",gap:6,marginTop:12}}>
                    <button style={{padding:"5px 12px",background:C.card,color:C.sub,border:`1px solid ${C.border}`,borderRadius:5,fontSize:10,cursor:"pointer"}}>Redistribute</button>
                    <button onClick={()=>openConv(ag.id,`${ag.name}'s performance`)} style={{padding:"5px 12px",background:C.accent,color:"#fff",border:"none",borderRadius:5,fontSize:10,cursor:"pointer",fontWeight:600}}>Discuss with questt.</button>
                  </div>
                </div>}
              </div>
            </div>);})}
          </div>
        </div>}

        <div style={{marginTop:40,paddingTop:14,borderTop:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",paddingBottom:20}}>
          <span style={{fontSize:10,color:C.muted}}>Questt AI · Intelligence Warehouse</span>
          <SrcBadge ids={["core","bureau","news","gst","callnotes"]}/>
        </div>
      </div>
    </div>
    {conv&&<ConvPanel messages={conv.messages} onClose={()=>setConv(null)} onAsk={addConvMsg}/>}
    {trailAccount&&<TrailOverlay account={trailAccount} onClose={()=>setTrailAccount(null)}/>}
  </div>);
}

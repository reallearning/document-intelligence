"use client"
import { useState } from "react";

const C={bg:"#FAFAF8",card:"#FFFFFF",border:"#E5E2DB",borderLight:"#F0EDE7",text:"#1C1C1C",sub:"#555",muted:"#999",lt:"#CCC",
  accent:"#2D5A3D",accentPale:"#EAF2EF",copper:"#946B1A",copperPale:"#FDFAF0",
  red:"#B33A3A",redPale:"#FDF3F3",blue:"#3B6FA0",bluePale:"#EFF5FB",
  amber:"#C47D15",amberPale:"#FFF8ED",green:"#27AE60",greenPale:"#EAFAF0"};
const sn="'IBM Plex Sans',-apple-system,sans-serif";const sr="Georgia,serif";const mn="'JetBrains Mono',monospace";
const Bar=({pct,c=C.accent,h=5})=>(<div style={{height:h,background:C.borderLight,borderRadius:h/2,overflow:"hidden"}}><div style={{height:h,borderRadius:h/2,background:c,width:`${Math.min(pct,100)}%`,transition:"width 0.5s"}}/></div>);

// ═══ CONV PANEL ═══
function ConvPanel({messages,onClose,onAsk}){const[q,setQ]=useState("");const send=()=>{if(q.trim()){onAsk(q.trim());setQ("");}};return(<div style={{position:"fixed",top:0,right:0,width:420,height:"100vh",background:C.card,borderLeft:`1px solid ${C.border}`,boxShadow:"-4px 0 24px rgba(0,0,0,0.08)",zIndex:200,display:"flex",flexDirection:"column"}}><div style={{padding:"14px 16px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:20,height:20,borderRadius:"50%",background:C.accent,color:"#fff",fontSize:9,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>Q</div><span style={{fontSize:13,fontWeight:600}}>Discuss with questt.</span></div><button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",fontSize:18,color:C.muted}}>×</button></div><div style={{flex:1,overflowY:"auto",padding:14}}>{messages.map((m,i)=>(<div key={i} style={{marginBottom:10}}>{m.role==="user"?(<div style={{display:"flex",justifyContent:"flex-end"}}><div style={{padding:"8px 12px",background:C.accentPale,borderRadius:8,fontSize:12,color:C.accent,maxWidth:"85%"}}>{m.text}</div></div>):(<div>{m.agents&&<div style={{display:"flex",gap:4,marginBottom:4}}>{m.agents.map((a,j)=>(<span key={j} style={{fontSize:9,fontFamily:mn,color:C.accent,padding:"2px 6px",background:C.accentPale,borderRadius:3}}>{a} Agent</span>))}</div>}<div style={{fontSize:12,color:C.sub,lineHeight:1.6,whiteSpace:"pre-line"}}>{m.text}</div>{m.followUps&&<div style={{display:"flex",flexDirection:"column",gap:4,marginTop:8}}>{m.followUps.map((f,j)=>(<button key={j} onClick={()=>onAsk(f)} style={{padding:"5px 8px",background:C.bg,border:`1px solid ${C.border}`,borderRadius:5,fontSize:10,color:C.sub,cursor:"pointer",fontFamily:sn,textAlign:"left"}}>{f}</button>))}</div>}</div>)}</div>))}</div><div style={{padding:"10px 14px",borderTop:`1px solid ${C.border}`,display:"flex",gap:8}}><input value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Ask a follow-up..." style={{flex:1,padding:"8px 10px",border:`1px solid ${C.border}`,borderRadius:6,fontSize:12,fontFamily:sn,outline:"none"}}/><button onClick={send} style={{padding:"8px 14px",background:C.accent,color:"#fff",border:"none",borderRadius:6,fontSize:11,fontWeight:600,cursor:"pointer"}}>→</button></div></div>);}

// ═══ LOG CONTACT ═══
function LogContact({account,onLog}){
  const [open,setOpen]=useState(false);const [type,setType]=useState("Phone");const [outcome,setOutcome]=useState(null);const [note,setNote]=useState("");const [saved,setSaved]=useState(false);
  const outcomes=["Spoke — agreed to pay","Spoke — needs restructure","Spoke — disputed","Spoke — callback requested","No answer","Number invalid","Promised payment date","Customer refused"];
  const save=()=>{setSaved(true);setOpen(false);if(onLog)onLog({type,outcome,note});};
  if(saved)return(<div style={{display:"inline-flex",alignItems:"center",gap:4,padding:"6px 12px",background:C.accentPale,borderRadius:6,fontSize:11,color:C.accent,fontWeight:600}}>✓ Logged: {outcome?.split("—")[0]||type}</div>);
  if(!open)return(<button onClick={()=>setOpen(true)} style={{padding:"6px 14px",background:C.accent,color:"#fff",border:"none",borderRadius:6,fontSize:11,fontWeight:600,cursor:"pointer"}}>Log Contact</button>);
  return(<div style={{background:C.card,border:`1px solid ${C.accent}`,borderRadius:8,padding:14,marginTop:8}}>
    <div style={{fontSize:10,fontFamily:mn,color:C.accent,letterSpacing:"0.06em",fontWeight:600,marginBottom:8}}>LOG CONTACT — {account.name}</div>
    <div style={{fontSize:10,color:C.muted,marginBottom:3}}>Channel</div>
    <div style={{display:"flex",gap:4,marginBottom:10}}>{["Phone","WhatsApp","Field visit","SMS"].map(t=>(<button key={t} onClick={()=>setType(t)} style={{padding:"3px 8px",borderRadius:4,border:`1px solid ${type===t?C.accent:C.border}`,background:type===t?C.accentPale:C.card,color:type===t?C.accent:C.sub,fontSize:10,cursor:"pointer"}}>{t}</button>))}</div>
    <div style={{fontSize:10,color:C.muted,marginBottom:3}}>Outcome</div>
    <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:10}}>{outcomes.map(o=>(<button key={o} onClick={()=>setOutcome(o)} style={{padding:"3px 8px",borderRadius:4,border:`1px solid ${outcome===o?C.accent:C.border}`,background:outcome===o?C.accentPale:C.card,color:outcome===o?C.accent:C.sub,fontSize:10,cursor:"pointer"}}>{o}</button>))}</div>
    <textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="Notes..." rows={2} style={{width:"100%",padding:"6px 8px",border:`1px solid ${C.border}`,borderRadius:4,fontSize:11,fontFamily:sn,resize:"none",outline:"none",marginBottom:8}}/>
    <div style={{display:"flex",gap:6}}><button onClick={save} disabled={!outcome} style={{padding:"5px 14px",background:outcome?C.accent:C.borderLight,color:outcome?"#fff":C.muted,border:"none",borderRadius:5,fontSize:11,fontWeight:600,cursor:outcome?"pointer":"default"}}>Save</button><button onClick={()=>setOpen(false)} style={{padding:"5px 14px",background:C.card,color:C.sub,border:`1px solid ${C.border}`,borderRadius:5,fontSize:11,cursor:"pointer"}}>Cancel</button></div>
  </div>);
}

// ═══ FLAG TO NANCY ═══
function FlagToNancy({account}){
  const [open,setOpen]=useState(false);const [reason,setReason]=useState(null);const [flagged,setFlagged]=useState(false);const [note,setNote]=useState("");
  const reasons=["Needs reassignment","Customer disclosed job loss","Customer disputes the debt","Needs legal escalation","Restructure terms insufficient","Customer uncontactable","Other"];
  if(flagged)return(<div style={{display:"inline-flex",alignItems:"center",gap:4,padding:"6px 12px",background:C.copperPale,borderRadius:6,fontSize:11,color:C.copper,fontWeight:600}}>⚑ Flagged: {reason}</div>);
  if(!open)return(<button onClick={()=>setOpen(true)} style={{padding:"6px 14px",background:C.card,color:C.copper,border:`1px solid ${C.copper}40`,borderRadius:6,fontSize:11,cursor:"pointer"}}>⚑ Flag to Nancy</button>);
  return(<div style={{background:C.card,border:`1px solid ${C.copper}`,borderRadius:8,padding:14,marginTop:8}}>
    <div style={{fontSize:10,fontFamily:mn,color:C.copper,letterSpacing:"0.06em",fontWeight:600,marginBottom:8}}>FLAG TO NANCY</div>
    <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:10}}>{reasons.map(r=>(<button key={r} onClick={()=>setReason(r)} style={{padding:"3px 8px",borderRadius:4,border:`1px solid ${reason===r?C.copper:C.border}`,background:reason===r?C.copperPale:C.card,color:reason===r?C.copper:C.sub,fontSize:10,cursor:"pointer"}}>{r}</button>))}</div>
    <textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="Details..." rows={2} style={{width:"100%",padding:"6px 8px",border:`1px solid ${C.border}`,borderRadius:4,fontSize:11,fontFamily:sn,resize:"none",outline:"none",marginBottom:8}}/>
    <div style={{display:"flex",gap:6}}><button onClick={()=>{setFlagged(true);setOpen(false);}} disabled={!reason} style={{padding:"5px 14px",background:reason?C.copper:C.borderLight,color:reason?"#fff":C.muted,border:"none",borderRadius:5,fontSize:11,fontWeight:600,cursor:reason?"pointer":"default"}}>Send Flag</button><button onClick={()=>setOpen(false)} style={{padding:"5px 14px",background:C.card,color:C.sub,border:`1px solid ${C.border}`,borderRadius:5,fontSize:11,cursor:"pointer"}}>Cancel</button></div>
  </div>);
}

// ═══ DATA ═══
const myQueue=[
  {id:"j1",name:"Ravi Sharma",product:"Personal Loan",outstanding:"₹6.8L",dpd:32,flag:"Hospitality",status:"due",daysSince:2,
    approach:"Standard PL collection. DPD 32, just crossed into 30-60. Two missed EMIs. Last call he said he'd pay 'next week' — that was 12 days ago. Be direct but professional: 'Mr. Sharma, following up on your commitment from our last call. Your account is now 32 days overdue. Can we set a specific payment date today?'",
    approved:null,
    signals:["PL — 2 missed EMIs","DPD 32","Previous promise not kept"],
    history:[{date:"26 Mar",type:"Phone",note:"Spoke. Said will pay next week.",outcome:"Spoke — promised"},{date:"18 Mar",type:"Phone",note:"No answer",outcome:"No answer"},{date:"12 Mar",type:"SMS",note:"Overdue reminder",outcome:null}],
    convResp:{agents:["Collections"],text:"Ravi Sharma — ₹6.8L PL, DPD 32:\n\nTwo missed EMIs. Last call 26 Mar — promised to pay 'next week.' That was 4 days ago and no payment received.\n\nThis is a standard follow-up. No special circumstances disclosed. Bureau shows minor decline (695 → 672). He has a CC with us at 45% utilization — no stress there.\n\nApproach: direct. 'Mr. Sharma, you mentioned on March 26 that you'd make a payment this week. I'm calling to follow up — can we confirm a specific date and amount?' Get a DATE, not a vague promise.\n\nIf he gives another vague answer: escalate tone slightly. 'Your account is now 32 days past due. We want to help you get back on track — can you commit to a payment by [specific date]?'\n\nIf he agrees to a date: log it, set follow-up reminder.\nIf he says he can't pay at all: offer restructure option and flag to Nancy.",followUps:["What if he gives another vague promise?","Should I mention the CC?","What restructure can I offer?"]}},
  {id:"j2",name:"Seaside Hotels",product:"Term Loan",outstanding:"₹1.9Cr",dpd:12,flag:"Hospitality",status:"due",daysSince:3,
    approach:"Another hospitality account. Boutique hotel, single property. DPD 12, fresher than Vikram. Nancy hasn't pre-approved terms yet — this is an assessment call. Understand their occupancy situation, cash runway, and willingness to discuss options. Report back to Nancy.",
    approved:null,signals:["Boutique hotel — single property","Hospitality crisis","DPD 12 — still early"],
    history:[{date:"25 Mar",type:"SMS",note:"Payment reminder — no response",outcome:null}],
    convResp:{agents:["Collections"],text:"Seaside Hotels — ₹1.9Cr, DPD 12:\n\nSingle boutique hotel, beach-facing. Tourist-dependent, which means the geopolitical crisis hits harder than business hotels.\n\nThis is an ASSESSMENT call — Nancy hasn't approved restructure terms yet. Goal: understand their situation and report back.\n\nQuestions to ask:\n1. What's your current occupancy? (Probably down significantly)\n2. How many months can you service EMI from reserves?\n3. Are you open to discussing a restructure if needed?\n\nDon't promise anything. Just gather information. Log detailed notes.",followUps:["What should I report back to Nancy?","How many months' reserves matter for restructure?"]}},
  {id:"j3",name:"Rahul Menon",product:"Personal Loan",outstanding:"₹4.2L",dpd:22,flag:"Job loss",status:"paused",daysSince:5,
    approach:"⚠ PAUSED — you reported insurance payout arriving April 10. Nancy confirmed: no contact until April 12. Next step: check if payout credited, then follow up.",
    approved:{type:"Treatment: Pause until April 12",detail:"Customer confirmed insurance payout April 10. Follow up April 12 to verify.",by:"Nancy",date:"24 Mar"},
    signals:["IT layoff — Infosys","Insurance payout April 10","Bureau 712 — clean history","First delinquency ever"],
    history:[{date:"23 Mar",type:"Phone",note:"Customer said: lost job 3 weeks ago. Insurance payout expected April 10. Will pay from that.",outcome:"Spoke — payout pending"},{date:"15 Mar",type:"SMS",note:"Payment reminder",outcome:null}],
    convResp:{agents:["Collections"],text:"Rahul Menon — PAUSED:\n\nDo NOT contact until April 12. He told you on March 23 that he was laid off from Infosys 3 weeks ago and has an insurance payout expected April 10.\n\nOn April 12:\n1. Check if payout has arrived (look for large credit in CASA)\n2. If yes: call to confirm payment plan\n3. If no: call to understand delay, offer restructure option if payout is further delayed\n\nHis bureau is 712, clean history. This is his first delinquency. The right approach is patience — he gave us specific information and we should respect it.",followUps:["What if payout doesn't arrive by April 12?","How many other Infosys accounts are paused?"]}},
  {id:"j4",name:"Gateway Restaurants",product:"WC Facility",outstanding:"₹82L",dpd:28,flag:"Hospitality",status:"due",daysSince:4,
    approach:"Restaurant in Andheri. WC ₹82L, DPD 28 — approaching 30-day threshold. Hospitality-flagged. Smaller ticket than Vikram/Seaside. Call to assess willingness to pay and financial position. If cooperative, propose restructure. If not, log and flag.",
    approved:null,signals:["Restaurant — Andheri","Hospitality crisis","Approaching DPD 30"],
    history:[{date:"24 Mar",type:"Phone",note:"No answer",outcome:"No answer"},{date:"20 Mar",type:"SMS",note:"Overdue reminder",outcome:null}],
    convResp:{agents:["Collections"],text:"Gateway Restaurants — ₹82L, DPD 28:\n\nApproaching the 30-day bucket boundary. 2 days. If we can get a payment commitment or restructure agreement before DPD 30, the account stays in 0-30.\n\nLast attempt was phone — no answer. Try WhatsApp first this time (higher response rate for restaurant owners — they're in the kitchen, not picking up calls). If WhatsApp no response within 4 hours, then call in the afternoon (2-4 PM is best for restaurant owners — between lunch and dinner service).",followUps:["Should I try WhatsApp first?","What if they miss the 30-day mark?"]}},
  {id:"j5",name:"Taj Residency Inn",product:"Business Loan",outstanding:"₹45L",dpd:15,flag:"Hospitality",status:"new",daysSince:0,
    approach:"Newly assigned — small hotel, hospitality-impacted. Small hotel, ₹45L, DPD 15. Standard call — assess the situation, understand impact on their business, report to Nancy. No pre-approved terms.",
    approved:null,signals:["Small hotel","Hospitality crisis","Hospitality-impacted"],
    history:[],
    convResp:{agents:["Collections"],text:"Taj Residency Inn — new in queue:\n\nNo prior contact history. This is first outreach. Standard hospitality assessment call. Gather: current occupancy, cash runway, willingness to discuss options. Report to Nancy for treatment decision.",followUps:["Standard script for new hospitality accounts?"]}},
  {id:"j6",name:"Wanderlust Tours",product:"Business Loan",outstanding:"₹38L",dpd:20,flag:"Hospitality",status:"due",daysSince:6,
    approach:"Travel operator — most directly hit by the geopolitical crisis. International tour packages are their core business. DPD 20, ₹38L. Last contact 6 days ago — overdue. This business may not recover quickly. Assess viability honestly and flag to Nancy if settlement might be more appropriate than restructuring.",
    approved:null,signals:["Travel operator","International tours — directly hit","DPD 20","6 days since contact"],
    history:[{date:"22 Mar",type:"Phone",note:"Spoke briefly. Customer said business completely stopped. No bookings for next 2 months.",outcome:"Spoke — business stopped"}],
    convResp:{agents:["Collections","Risk"],text:"Wanderlust Tours — ₹38L, DPD 20:\n\nLast call (22 Mar): customer said business 'completely stopped, no bookings for next 2 months.' International tour packages — directly impacted by travel restrictions.\n\nThis is different from hotels (which might recover with domestic travel). International tour operators could take 6-12 months to recover depending on the geopolitical situation.\n\nAssess honestly: does this business have a path to recovery? If yes → restructure (moratorium + extended tenure). If the business model is broken → flag to Nancy for settlement consideration.\n\nDon't give the customer false hope. 'We want to understand your situation fully so we can find the right option for you.'",followUps:["Flag for settlement assessment?","What's the recovery timeline for travel operators?","Compare to other travel accounts"]}},
];

const todayLog=[
  {time:"9:15 AM",account:"Gateway Restaurants",type:"WhatsApp",outcome:"Message sent — awaiting response",duration:"—"},
  {time:"9:20 AM",account:"Taj Residency Inn",type:"Phone",outcome:"Spoke — occupancy at 30%, concerned about next quarter",duration:"6 min"},
];

// ═══ APP ═══
export default function App(){
  const [tab,setTab]=useState("queue");const [selectedAccount,setSelectedAccount]=useState(null);const [conv,setConv]=useState(null);

  const openConv=(id,q)=>{const acc=myQueue.find(a=>a.id===id);const resp=acc?.convResp||{agents:["Collections"],text:"Analyzing..."};setConv({messages:[{role:"user",text:q},{role:"morrie",...resp}],id});};
  const addConvMsg=(text)=>{if(!conv)return;const acc=myQueue.find(a=>a.id===conv.id);const resp=acc?.convResp||{agents:["Collections"],text:"Continuing..."};setConv(prev=>({...prev,messages:[...prev.messages,{role:"user",text},{role:"morrie",agents:resp.agents,text:resp.text,followUps:resp.followUps}]}));};

  return(<div className="overflow-auto" style={{display:"flex",background:C.bg,height:"100vh",fontFamily:sn,color:C.text}}>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');*{box-sizing:border-box;margin:0;padding:0}button{font-family:inherit}::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#DDD;border-radius:3px}`}</style>

    <div style={{width:56,background:"#161616",borderRight:"1px solid #252525",position:"fixed",top:0,left:0,height:"100vh",display:"flex",flexDirection:"column",alignItems:"center",paddingTop:14,zIndex:100}}>
      <div style={{width:28,height:28,borderRadius:5,background:C.accent,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,color:"#fff",marginBottom:20}}>Q</div>
      {[{id:"queue",label:"My Queue",icon:"☰"},{id:"dashboard",label:"Dashboard",icon:"◻"}].map(n=>(<button key={n.id} onClick={()=>{setTab(n.id);setSelectedAccount(null);}} style={{width:44,height:44,borderRadius:6,border:"none",cursor:"pointer",background:tab===n.id?"#2A2A2A":"transparent",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:2,marginBottom:4}}><span style={{fontSize:14,color:tab===n.id?C.accent:"#666"}}>{n.icon}</span><span style={{fontSize:7,color:tab===n.id?"#fff":"#666",fontWeight:tab===n.id?600:400}}>{n.label}</span></button>))}
      <div style={{flex:1}}/>
      <div style={{width:30,height:30,borderRadius:"50%",background:"#2A2A2A",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:14}}><span style={{fontSize:10,fontWeight:600,color:C.accent}}>JS</span></div>
    </div>

    <div style={{marginLeft:56,flex:1}}>
      <div style={{background:C.card,borderBottom:`1px solid ${C.border}`,padding:"0 28px",position:"sticky",top:0,zIndex:50}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",height:46}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}><span style={{fontFamily:sr,fontSize:16,fontWeight:700}}>questt.</span><span style={{width:1,height:16,background:C.border}}/><span style={{fontSize:12,fontWeight:600,color:C.accent}}>JIO FS</span><span style={{fontSize:12,color:C.muted}}>Collections · Andheri</span></div>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <div style={{display:"flex",gap:4}}>{["Sam","Nancy","Josh"].map((p,i)=>(<button key={p} style={{padding:"4px 10px",borderRadius:4,border:`1px solid ${i===2?C.accent:C.border}`,background:i===2?C.accentPale:C.card,color:i===2?C.accent:C.muted,fontSize:10,fontWeight:i===2?600:400,cursor:"pointer"}}>{p}</button>))}</div>
            <div style={{padding:"4px 10px",background:C.accentPale,borderRadius:5,fontSize:11,color:C.accent,fontWeight:600}}>{todayLog.length} contacts today</div>
            <div style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:28,height:28,borderRadius:"50%",background:C.accentPale,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontSize:10,fontWeight:600,color:C.accent}}>JS</span></div><span style={{fontSize:12,color:C.muted}}>Josh</span></div>
          </div>
        </div>
      </div>

      <div style={{padding:"24px 28px",maxWidth:900}}>
        {/* ═══ QUEUE ═══ */}
        {tab==="queue"&&!selectedAccount&&<div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:16}}>
            <div><h2 style={{fontFamily:sr,fontSize:22,fontWeight:700,margin:0}}>My Queue</h2><div style={{fontSize:13,color:C.muted,marginTop:4}}>12 accounts total · Showing top priority · {myQueue.filter(a=>a.status==="paused").length} paused</div></div>
            <div style={{display:"flex",gap:8,fontSize:11,color:C.muted}}>
              <span><strong style={{color:C.red}}>{myQueue.filter(a=>a.flag==="Hospitality").length}</strong> travel/hotel</span>
              <span><strong style={{color:C.blue}}>{myQueue.filter(a=>a.flag==="Job loss").length}</strong> paused</span>
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {myQueue.map((a,idx)=>(<div key={a.id} onClick={()=>setSelectedAccount(a)} style={{background:C.card,border:`1px solid ${a.status==="paused"?C.accent+"60":C.border}`,borderRadius:8,borderLeft:`4px solid ${a.flag==="Hospitality"?C.red:a.flag==="Job loss"||a.flag==="Has funds"?C.blue:C.amber}`,padding:"14px 18px",cursor:"pointer",opacity:a.status==="paused"?0.65:1}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                <div style={{display:"flex",gap:10,flex:1}}>
                  <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,width:28}}>
                    <div style={{fontSize:9,fontFamily:mn,color:C.muted}}>#{idx+1}</div>
                  </div>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}>
                      <span style={{fontSize:15,fontWeight:600}}>{a.name}</span>
                      <span style={{fontSize:9,fontFamily:mn,color:a.dpd>=30?C.red:C.amber,padding:"1px 5px",background:a.dpd>=30?C.redPale:C.amberPale,borderRadius:3}}>DPD {a.dpd}</span>
                      <span style={{fontSize:9,fontFamily:mn,color:a.flag==="Hospitality"?C.red:a.flag==="Job loss"||a.flag==="Has funds"?C.blue:C.amber,padding:"1px 5px",background:a.flag==="Hospitality"?C.redPale:a.flag==="Job loss"||a.flag==="Has funds"?C.bluePale:C.amberPale,borderRadius:3}}>{a.flag}</span>
                      {a.status==="paused"&&<span style={{fontSize:9,fontFamily:mn,color:C.accent,padding:"1px 5px",background:C.accentPale,borderRadius:3}}>⏸ PAUSED</span>}
                      {a.approved&&<span style={{fontSize:9,fontFamily:mn,color:C.accent,padding:"1px 5px",background:C.accentPale,borderRadius:3}}>✓ {a.approved.type.split("—")[0].trim()}</span>}
                    </div>
                    <div style={{fontSize:11,color:C.muted}}>{a.product} · {a.outstanding}</div>
                    <div style={{fontSize:12,color:C.sub,marginTop:4,lineHeight:1.4}}>{a.approach.slice(0,130)}…</div>
                  </div>
                </div>
                <span style={{fontSize:12,color:C.accent,marginTop:4}}>→</span>
              </div>
            </div>))}
          </div>
        </div>}

        {/* ═══ ACCOUNT DEEP PAGE ═══ */}
        {tab==="queue"&&selectedAccount&&(()=>{const a=selectedAccount;return(<div>
          <button onClick={()=>setSelectedAccount(null)} style={{background:"none",border:"none",color:C.accent,cursor:"pointer",fontSize:12,marginBottom:16}}>← Back to Queue</button>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
            <div><h2 style={{fontFamily:sr,fontSize:22,fontWeight:700,margin:0}}>{a.name}</h2><div style={{fontSize:12,color:C.muted,marginTop:4}}>{a.product} · {a.outstanding}</div></div>
            <div style={{display:"flex",gap:12}}><div style={{textAlign:"center"}}><div style={{fontSize:20,fontWeight:700,fontFamily:sr,color:C.red}}>DPD {a.dpd}</div></div></div>
          </div>

          {/* SUGGESTED APPROACH — biggest element */}
          <div style={{background:a.status==="paused"?C.bluePale:C.accentPale,border:`1px solid ${a.status==="paused"?C.blue:C.accent}40`,borderRadius:8,padding:"16px 20px",marginBottom:14}}>
            <div style={{fontSize:10,fontFamily:mn,color:a.status==="paused"?C.blue:C.accent,letterSpacing:"0.06em",fontWeight:600,marginBottom:8}}>SUGGESTED APPROACH</div>
            <div style={{fontSize:14,color:C.text,lineHeight:1.6}}>{a.approach}</div>
          </div>

          {a.approved&&<div style={{background:C.card,border:`1px solid ${C.accent}`,borderRadius:8,padding:"12px 16px",marginBottom:14}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div><div style={{fontSize:10,fontFamily:mn,color:C.accent,letterSpacing:"0.06em",fontWeight:600,marginBottom:3}}>APPROVED BY NANCY · {a.approved.date}</div><div style={{fontSize:13,fontWeight:600}}>{a.approved.type}</div><div style={{fontSize:12,color:C.sub,marginTop:3}}>{a.approved.detail}</div></div>
              <span style={{fontSize:9,fontFamily:mn,color:C.accent,padding:"3px 8px",background:C.accentPale,borderRadius:4}}>READY</span>
            </div>
          </div>}

          <div style={{display:"flex",gap:5,marginBottom:14,flexWrap:"wrap"}}>{a.signals.map((s,i)=>(<span key={i} style={{fontSize:9,padding:"3px 8px",background:C.bg,border:`1px solid ${C.border}`,borderRadius:4,color:C.sub,fontFamily:mn}}>{s}</span>))}</div>

          {a.history.length>0&&<div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 16px",marginBottom:14}}>
            <div style={{fontSize:12,fontWeight:600,marginBottom:8}}>Contact History</div>
            {a.history.map((h,i)=>(<div key={i} style={{display:"flex",gap:8,padding:"5px 0",borderBottom:i<a.history.length-1?`1px solid ${C.borderLight}`:"none",fontSize:12}}>
              <span style={{color:C.muted,fontFamily:mn,fontSize:10,width:50,flexShrink:0}}>{h.date}</span>
              <span style={{fontSize:9,fontFamily:mn,color:C.sub,padding:"2px 5px",background:C.bg,borderRadius:3,flexShrink:0}}>{h.type}</span>
              <span style={{color:C.sub,flex:1}}>{h.note}</span>
              {h.outcome&&<span style={{fontSize:9,fontFamily:mn,color:C.accent,padding:"2px 5px",background:C.accentPale,borderRadius:3,flexShrink:0}}>{h.outcome}</span>}
            </div>))}
          </div>}

          <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:14}}>
            {a.status!=="paused"&&<LogContact account={a}/>}
            {a.status==="paused"&&<div style={{padding:"6px 14px",background:C.bluePale,borderRadius:6,fontSize:11,color:C.blue,fontWeight:600}}>⏸ Paused until April 12</div>}
            <FlagToNancy account={a}/>
            <button onClick={()=>openConv(a.id,`Prepare me for ${a.name}`)} style={{padding:"6px 14px",background:C.card,color:C.accent,border:`1px solid ${C.accent}40`,borderRadius:6,fontSize:11,cursor:"pointer"}}>Ask questt.</button>
          </div>
          <button onClick={()=>openConv(a.id,`Full briefing: ${a.name}`)} style={{width:"100%",padding:"9px",background:C.accent,border:"none",borderRadius:6,fontSize:11,color:"#fff",cursor:"pointer",fontWeight:600}}>Discuss with questt.</button>
        </div>);})()}

        {/* ═══ DASHBOARD ═══ */}
        {tab==="dashboard"&&<div>
          <h2 style={{fontFamily:sr,fontSize:22,fontWeight:700,marginBottom:18}}>Today's Activity</h2>
          <div style={{display:"flex",gap:14,marginBottom:20}}>
            <div style={{flex:2,background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"14px 18px"}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><span style={{fontSize:13,fontWeight:600}}>Queue Progress</span><span style={{fontSize:11,color:C.accent,fontWeight:600}}>{todayLog.length}/{myQueue.filter(a=>a.status!=="paused").length} contacted</span></div>
              <div style={{display:"flex",gap:3,marginBottom:6}}>{myQueue.filter(a=>a.status!=="paused").map((_,i)=>{const done=i<todayLog.length;return(<div key={i} style={{flex:1,height:8,borderRadius:4,background:done?C.accent:C.borderLight}}/>);})}</div>
              <div style={{fontSize:10,color:C.muted}}>{myQueue.filter(a=>a.status!=="paused").length-todayLog.length} remaining · {myQueue.filter(a=>a.status==="paused").length} paused</div>
            </div>
            <div style={{flex:1,background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"14px 18px"}}>
              <div style={{fontSize:13,fontWeight:600,marginBottom:8}}>Outcomes</div>
              {[{l:"Spoke",n:1,c:C.accent},{l:"Message sent",n:1,c:C.blue},{l:"No answer",n:0,c:C.amber},{l:"Resolved",n:0,c:C.green}].map((o,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}><div style={{width:8,height:8,borderRadius:2,background:o.c}}/><span style={{fontSize:11,color:C.sub,flex:1}}>{o.l}</span><span style={{fontSize:13,fontWeight:700,color:o.n>0?o.c:C.lt}}>{o.n}</span></div>))}
            </div>
          </div>
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"14px 18px",marginBottom:20}}>
            <div style={{fontSize:13,fontWeight:600,marginBottom:8}}>Contact Log</div>
            {todayLog.map((l,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:i<todayLog.length-1?`1px solid ${C.borderLight}`:"none"}}>
              <span style={{fontFamily:mn,fontSize:10,color:C.muted,width:55}}>{l.time}</span>
              <span style={{fontSize:13,fontWeight:600,width:140}}>{l.account}</span>
              <span style={{fontSize:9,fontFamily:mn,color:C.sub,padding:"2px 5px",background:C.bg,borderRadius:3}}>{l.type}</span>
              <span style={{fontSize:12,color:C.sub,flex:1}}>{l.outcome}</span>
            </div>))}
          </div>
          <div style={{display:"flex",gap:1,marginBottom:20,background:C.border,borderRadius:6,overflow:"hidden"}}>
            {[{l:"RESOLUTION",v:"67%",d:"target 75%"},{l:"RECOVERED MTD",v:"₹6.2L",d:"target ₹8L"},{l:"QUEUE",v:myQueue.length+"",d:myQueue.filter(a=>a.flag==="Hospitality").length+" hospitality"},{l:"AVG CALL",v:"4.2m",d:"team avg 3.8m"}].map((k,i)=>(<div key={i} style={{flex:1,background:C.card,padding:"12px 16px"}}><div style={{fontSize:9,fontFamily:mn,color:C.muted,marginBottom:3}}>{k.l}</div><div style={{fontSize:20,fontWeight:700,fontFamily:sr}}>{k.v}</div><div style={{fontSize:10,color:C.muted}}>{k.d}</div></div>))}
          </div>
          <div style={{fontSize:10,fontFamily:mn,color:C.muted,letterSpacing:"0.06em",fontWeight:600,marginBottom:8}}>REMAINING TODAY</div>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {myQueue.filter(a=>a.status!=="paused"&&!todayLog.find(t=>t.account===a.name)).map(a=>(<div key={a.id} onClick={()=>{setTab("queue");setSelectedAccount(a);}} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:6,borderLeft:`3px solid ${a.flag==="Hospitality"?C.red:a.flag==="Job loss"||a.flag==="Has funds"?C.blue:C.amber}`,padding:"8px 14px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div><span style={{fontSize:12,fontWeight:600}}>{a.name}</span><span style={{fontSize:11,color:C.muted}}> · {a.outstanding} · DPD {a.dpd}</span></div>
              <div style={{display:"flex",gap:6,alignItems:"center"}}><span style={{fontSize:9,fontFamily:mn,color:a.flag==="Hospitality"?C.red:C.amber,padding:"1px 5px",background:a.flag==="Hospitality"?C.redPale:C.amberPale,borderRadius:3}}>{a.flag}</span><span style={{fontSize:12,color:C.accent}}>→</span></div>
            </div>))}
          </div>
        </div>}

        <div style={{marginTop:40,paddingTop:14,borderTop:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",paddingBottom:20}}>
          <span style={{fontSize:10,color:C.muted}}>Questt AI · Intelligence Warehouse</span>
        </div>
      </div>
    </div>
    {conv&&<ConvPanel messages={conv.messages} onClose={()=>setConv(null)} onAsk={addConvMsg}/>}
  </div>);
}

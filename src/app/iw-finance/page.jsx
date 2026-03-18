"use client"
import { useState, useMemo, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════
   FINANCE INTELLIGENCE WAREHOUSE — v8 (Complete)
   questt. — Decision Intelligence Platform
   ═══════════════════════════════════════════════════════════════ */

const C = {
  bg:"#FAFAF8",w:"#FFFFFF",ink:"#1C1C1C",sub:"#555",muted:"#999",
  bdr:"#E5E2DB",accent:"#2D5A3D",al:"#E8F0EC",am:"#4A7D5E",
  red:"#B83232",rl:"#FDF0F0",amber:"#C97C1A",aml:"#FDF5E8",
  blue:"#1A3A6E",bl:"#EDF1F8",green:"#1B7A3D",gl:"#EEFBF2",
  nav:"#F4F2ED",
};
const F={sr:"Georgia,serif",mn:"'IBM Plex Sans',sans-serif",mo:"'JetBrains Mono',monospace"};
const URG={critical:{l:"CRITICAL",bg:C.rl,c:C.red},attention:{l:"ATTENTION",bg:C.aml,c:C.amber},watch:{l:"WATCH",bg:C.bl,c:C.blue},ontrack:{l:"ON TRACK",bg:C.gl,c:C.green}};
const LAY={tactical:{l:"Tactical",c:C.blue,bg:C.bl},strategic:{l:"Strategic",c:C.accent,bg:C.al},cross:{l:"Cross-layer",c:C.amber,bg:C.aml}};

/* ═══ ENTITIES (enriched) ═══ */
const E={
  pinnacle:{name:"Pinnacle Distributors",ty:"Customer",seg:"Large Enterprise",tenure:"4 yrs",risk:72,rd:"down",dso:[32,34,38,41,44,47],labels:["Oct","Nov","Dec","Jan","Feb","Mar"],out:"₹3.8Cr",over:"₹2.3Cr",region:"North",
    contacts:[{n:"Rajesh Mehta",r:"CFO",e:"r.mehta@pinnacle.co",last:"22-Feb"},{n:"Priya Nair",r:"AP Manager",e:"p.nair@pinnacle.co",last:"3-Mar"},{n:"Sunil Das",r:"Procurement Head",e:"s.das@pinnacle.co",last:"15-Jan"}],
    inv:[{id:"INV-4523",a:"₹0.9Cr",due:"28-Feb",s:"Overdue",d:16},{id:"INV-4471",a:"₹1.4Cr",due:"28-Feb",s:"Overdue",d:16},{id:"INV-4312",a:"₹1.1Cr",due:"30-Jan",s:"Paid",pd:"2-Feb"},{id:"INV-4198",a:"₹0.8Cr",due:"20-Dec",s:"Paid",pd:"28-Dec"},{id:"INV-4055",a:"₹1.2Cr",due:"15-Nov",s:"Paid",pd:"22-Nov"},{id:"INV-3901",a:"₹0.9Cr",due:"10-Oct",s:"Paid",pd:"14-Oct"}],
    timeline:[{dt:"Mar 2022",ev:"Onboarded. Initial credit limit: ₹1.5Cr."},{dt:"Sep 2022",ev:"Limit raised to ₹2.5Cr after 6-month clean record."},{dt:"Mar 2023",ev:"2-year contract signed. Volume commitment: ₹10Cr/yr."},{dt:"Aug 2024",ev:"Limit raised to ₹3Cr. Strong payment history."},{dt:"Aug 2025",ev:"Limit raised to ₹5Cr — in hindsight, premature."},{dt:"Oct 2025",ev:"DSO began stretching: 32d → 34d. Not flagged."},{dt:"Jan 2026",ev:"Contract renewed. Volume commitment maintained."},{dt:"Feb 2026",ev:"INV-4471 + INV-4523 went overdue. No dispute filed."},{dt:"Mar 2026",ev:"IW flagged: cross-layer risk. Cash forecast impacted."}],
    assess:[{dt:"Oct 2025",st:"stable",note:"On-time payments, strong volume. No concerns."},{dt:"Dec 2025",st:"watch",note:"DSO crossed 38d. Payment cycle elongating."},{dt:"Feb 2026",st:"deteriorating",note:"Two invoices overdue. DSO at 47d. Their Q3 revenue -8%."},{dt:"Mar 2026",st:"critical",note:"₹2.3Cr overdue driving 62% of cash corridor breach. Recommend Tier-2 escalation and credit limit review."}],
    briefs:[1],
    note:"Payment cycle stretching since Oct. Renewed contract Jan but payment behavior deteriorating. Credit limit raised too aggressively in Aug 2025."},
  kiran:{name:"Kiran Textiles",ty:"Vendor",seg:"Mid-tier",tenure:"3 yrs",risk:58,rd:"flat",pc:[28,30,29,31,30,32],out:"₹4.2L",over:"₹0",region:"West",
    contacts:[{n:"Suresh Kiran",r:"Owner",e:"suresh@kirantextiles.in",last:"8-Mar"}],
    inv:[{id:"KT-7834",a:"₹0.87L",due:"22-Mar",s:"Held",flag:"Dup"},{id:"KT-7801",a:"₹0.87L",due:"8-Mar",s:"Processed"},{id:"KT-7612",a:"₹1.4L",due:"24-Jan",s:"Paid"},{id:"KT-7590",a:"₹0.74L",due:"1-Jan",s:"Reversed",flag:"Dup"},{id:"KT-7401",a:"₹1.1L",due:"15-Nov",s:"Paid"},{id:"KT-7200",a:"₹1.2L",due:"1-Sep",s:"Reversed",flag:"Dup"}],
    dups:[{d:"Sep 2025",a:"₹1.2L",c:"Manual 8d"},{d:"Dec 2025",a:"₹0.74L",c:"IW 3d"},{d:"Mar 2026",a:"₹0.87L",c:"Real-time"}],
    timeline:[{dt:"Mar 2023",ev:"Onboarded. Raw silk supplier."},{dt:"Sep 2025",ev:"First duplicate invoice detected (manual audit)."},{dt:"Dec 2025",ev:"Second duplicate. IW caught in 3 days."},{dt:"Mar 2026",ev:"Third duplicate. Auto-held in real-time."}],
    assess:[{dt:"Sep 2025",st:"watch",note:"First duplicate. Could be one-off."},{dt:"Dec 2025",st:"watch",note:"Second duplicate. Pattern forming."},{dt:"Mar 2026",st:"action",note:"Third duplicate. Systemic. PO-matching mandate required."}],
    briefs:[3],
    note:"Reliable quality. Duplicate = legacy billing. Needs PO-matching mandate."},
  atlas:{name:"Atlas Chemicals",ty:"Vendor",seg:"Strategic",tenure:"6 yrs",risk:89,rd:"flat",pc:[44,45,44,45,45,44],out:"₹3.2Cr",over:"₹0",region:"West",
    contacts:[{n:"Amit Desai",r:"Account Dir",e:"a.desai@atlaschem.com",last:"10-Mar"}],
    inv:[{id:"AC-2291",a:"₹3.2Cr",due:"24-Mar",s:"Scheduled"},{id:"AC-2188",a:"₹2.9Cr",due:"24-Feb",s:"Paid",pd:"24-Feb"},{id:"AC-2085",a:"₹3.0Cr",due:"24-Jan",s:"Paid",pd:"24-Jan"},{id:"AC-1990",a:"₹2.8Cr",due:"24-Dec",s:"Paid",pd:"24-Dec"}],
    timeline:[{dt:"Mar 2020",ev:"Onboarded. Critical raw material supplier."},{dt:"Jun 2022",ev:"Contract renewed. Hard payment dates, 1.5% penalty."},{dt:"Mar 2026",ev:"Part of W9 convergence. Cannot be shifted."}],
    assess:[{dt:"Mar 2026",st:"stable",note:"Perfect payment record. Strategic dependency. Limited alternatives."}],
    briefs:[4],
    note:"Hard payment dates, 1.5% penalty. 100% on-time since inception. Do not defer."},
  northway:{name:"Northway Logistics",ty:"Vendor",seg:"Logistics",tenure:"2 yrs",risk:75,rd:"flat",pc:[42,43,44,42,45,44],out:"₹1.8Cr",over:"₹0",region:"North",
    contacts:[{n:"Deepak Sharma",r:"Finance Head",e:"d.sharma@northway.in",last:"5-Mar"}],
    inv:[{id:"NW-891",a:"₹1.8Cr",due:"25-Mar",s:"Scheduled"},{id:"NW-845",a:"₹1.6Cr",due:"23-Feb",s:"Paid",pd:"23-Feb"},{id:"NW-801",a:"₹1.7Cr",due:"25-Jan",s:"Paid",pd:"25-Jan"}],
    timeline:[{dt:"Apr 2024",ev:"Onboarded. Replaced previous carrier."},{dt:"Dec 2025",ev:"Contract auto-renewed with +8% fuel surcharge."},{dt:"Mar 2026",ev:"Part of W9 convergence. 5-day grace — shift candidate."}],
    assess:[{dt:"Dec 2025",st:"watch",note:"+8% auto-renewal not flagged until Feb close."},{dt:"Mar 2026",st:"action",note:"Renegotiate at Apr renewal. Shift W9 payment."}],
    briefs:[4,6],
    note:"5-day grace. Shift candidate for W9. Contract renewal Apr — renegotiate +8% surcharge."},
  greenfield:{name:"Greenfield Agro",ty:"Vendor",seg:"Raw Materials",tenure:"3 yrs",risk:71,rd:"flat",pc:[40,42,41,43,42,44],out:"₹1.4Cr",over:"₹0",region:"South",
    contacts:[{n:"Sunita Rao",r:"AR Mgr",e:"s.rao@greenfieldagro.com",last:"1-Mar"}],
    inv:[{id:"GA-556",a:"₹1.4Cr",due:"26-Mar",s:"Scheduled"},{id:"GA-512",a:"₹1.3Cr",due:"24-Feb",s:"Paid",pd:"25-Feb"}],
    timeline:[{dt:"Apr 2023",ev:"Onboarded. Raw materials."},{dt:"Feb 2026",ev:"Requested Net-30 (currently Net-45)."},{dt:"Mar 2026",ev:"Part of W9 convergence. 7-day grace — shift candidate."}],
    assess:[{dt:"Feb 2026",st:"watch",note:"Term change request. Part of MSME credit tightening."},{dt:"Mar 2026",st:"action",note:"Counter with Net-37 or 2/10 Net-45. Shift W9 payment."}],
    briefs:[4,6],
    note:"7-day grace. Requested Net-30. Counter with Net-37."},
  metromart:{name:"Metro Mart Stores",ty:"Customer",seg:"Retail Chain",tenure:"5 yrs",risk:88,rd:"flat",dso:[28,29,27,30,28,29],labels:["Oct","Nov","Dec","Jan","Feb","Mar"],out:"₹2.4Cr",over:"₹0",region:"West",
    contacts:[{n:"Vikram Singh",r:"Procurement",e:"v.singh@metromart.com",last:"12-Mar"}],
    inv:[{id:"INV-4501",a:"₹8.1L",due:"30-Mar",s:"Current"},{id:"INV-4389",a:"₹7.6L",due:"28-Feb",s:"Paid",pd:"27-Feb"},{id:"INV-4278",a:"₹8.0L",due:"30-Jan",s:"Paid",pd:"29-Jan"}],
    timeline:[{dt:"Mar 2021",ev:"Onboarded. Anchor retail account."},{dt:"Sep 2023",ev:"Volume doubled. Credit limit raised to ₹4Cr."},{dt:"Mar 2026",ev:"Q1 advance expected W10 (₹3.0Cr)."}],
    assess:[{dt:"Mar 2026",st:"stable",note:"Consistent payer. DSO steady at 28-29d. No concerns."}],
    briefs:[],
    note:"Consistent. Anchor customer. Q1 advance expected W10 (₹3.0Cr)."},
  clearview:{name:"Clearview Retail",ty:"Customer",seg:"Regional",tenure:"2 yrs",risk:61,rd:"down",dso:[30,33,35,38,40,42],labels:["Oct","Nov","Dec","Jan","Feb","Mar"],out:"₹1.4Cr",over:"₹0.37Cr",region:"South",
    contacts:[{n:"Anand Pillai",r:"Finance Dir",e:"a.pillai@clearview.in",last:"28-Feb"}],
    inv:[{id:"INV-4456",a:"₹3.7L",due:"3-Mar",s:"Overdue",d:13},{id:"INV-4321",a:"₹4.2L",due:"2-Feb",s:"Paid",pd:"14-Feb"},{id:"INV-4190",a:"₹3.9L",due:"3-Jan",s:"Paid",pd:"12-Jan"}],
    timeline:[{dt:"Apr 2024",ev:"Onboarded. Regional chain, South."},{dt:"Oct 2025",ev:"DSO began rising: 30d → 33d."},{dt:"Mar 2026",ev:"DSO at 42d. INV-4456 overdue 13 days."}],
    assess:[{dt:"Oct 2025",st:"stable",note:"New customer, payment patterns forming."},{dt:"Jan 2026",st:"watch",note:"DSO crossed 35d. Trend emerging."},{dt:"Mar 2026",st:"deteriorating",note:"DSO 42d. Early-stage Pinnacle pattern. Watch closely."}],
    briefs:[],
    note:"DSO trending up. Mirrors early Pinnacle trajectory. Intervene before it becomes a problem."},
  crestline:{name:"Crestline Packaging",ty:"Vendor",seg:"Packaging",tenure:"3 yrs",risk:82,rd:"flat",pc:[30,31,30,32,30,31],out:"₹1.6Cr",over:"₹0",region:"North",
    contacts:[{n:"Rahul Verma",r:"Sales",e:"r.verma@crestline.in",last:"11-Mar"}],
    inv:[{id:"CP-441",a:"₹12.8L",due:"9-Apr",s:"Current"},{id:"CP-412",a:"₹11.2L",due:"10-Mar",s:"Paid",pd:"9-Mar"}],
    timeline:[{dt:"Apr 2023",ev:"Onboarded. Packaging supplier."},{dt:"Mar 2026",ev:"Identified as safe deferral candidate (7-day grace)."}],
    assess:[{dt:"Mar 2026",st:"stable",note:"Clean 3-year track record. Zero disputes."}],
    briefs:[],
    note:"Reliable. 3-year clean record. Safe deferral candidate."},
};

/* ═══ TACTICAL DATA ═══ */
const txns=[
  {id:"TXN-4892",dt:"14-Mar",ent:"Pinnacle Distributors",ek:"pinnacle",ty:"AR",amt:"+₹4.2L",st:"Received",fl:null},
  {id:"TXN-4891",dt:"14-Mar",ent:"Crestline Packaging",ek:"crestline",ty:"AP",amt:"-₹12.8L",st:"Processed",fl:null},
  {id:"TXN-4890",dt:"13-Mar",ent:"Kiran Textiles",ek:"kiran",ty:"AP",amt:"-₹0.87L",st:"Held",fl:"Duplicate"},
  {id:"TXN-4889",dt:"13-Mar",ent:"Metro Mart Stores",ek:"metromart",ty:"AR",amt:"+₹8.1L",st:"Received",fl:null},
  {id:"TXN-4888",dt:"12-Mar",ent:"Northway Logistics",ek:"northway",ty:"AP",amt:"-₹6.4L",st:"Scheduled",fl:null},
  {id:"TXN-4887",dt:"12-Mar",ent:"Atlas Chemicals",ek:"atlas",ty:"AP",amt:"-₹18.2L",st:"Scheduled",fl:null},
  {id:"TXN-4886",dt:"11-Mar",ent:"Clearview Retail",ek:"clearview",ty:"AR",amt:"+₹3.7L",st:"Overdue",fl:"12 days"},
  {id:"TXN-4885",dt:"11-Mar",ent:"Greenfield Agro",ek:"greenfield",ty:"AP",amt:"-₹9.3L",st:"Processed",fl:null},
];
const arAge=[{b:"Current",a:14.2,p:42,c:C.accent},{b:"1-30d",a:9.8,p:29,c:C.am},{b:"31-60d",a:5.1,p:15,c:C.amber},{b:"61-90d",a:3.2,p:9,c:"#D4760A"},{b:"90+d",a:1.7,p:5,c:C.red}];
const apAge=[{b:"Current",a:11.6,p:45,c:C.accent},{b:"1-30d",a:8.3,p:32,c:C.am},{b:"31-60d",a:3.9,p:15,c:C.amber},{b:"61-90d",a:1.4,p:5,c:"#D4760A"},{b:"90+d",a:0.8,p:3,c:C.red}];
const upcom=[
  {dt:"17-Mar",ent:"Orbit Logistics",ek:null,amt:"₹6.2L",ty:"AP",pri:"normal"},
  {dt:"19-Mar",ent:"Pinnacle Distributors",ek:"pinnacle",amt:"₹4.2L",ty:"AR",pri:"risk",note:"Part of ₹2.3Cr overdue"},
  {dt:"24-Mar",ent:"Atlas Chemicals",ek:"atlas",amt:"₹3.2Cr",ty:"AP",pri:"hard",note:"Hard date, 1.5% penalty"},
  {dt:"25-Mar",ent:"Northway Logistics",ek:"northway",amt:"₹1.8Cr",ty:"AP",pri:"flex",note:"Shift candidate"},
  {dt:"26-Mar",ent:"Greenfield Agro",ek:"greenfield",amt:"₹1.4Cr",ty:"AP",pri:"flex",note:"Shift candidate"},
];

// Customer portfolio
const custPort=[
  {ek:"pinnacle",limit:"₹5.0Cr",used:"₹3.8Cr",pct:76,risk:72,rd:"down",dso:47,over:"₹2.3Cr",st:"breach",region:"North"},
  {ek:"metromart",limit:"₹4.0Cr",used:"₹2.4Cr",pct:60,risk:88,rd:"flat",dso:29,over:"₹0",st:"ok",region:"West"},
  {ek:"clearview",limit:"₹2.5Cr",used:"₹1.4Cr",pct:56,risk:61,rd:"down",dso:42,over:"₹0.37Cr",st:"watch",region:"South"},
  {ek:null,name:"Horizon Foods",limit:"₹3.0Cr",used:"₹1.8Cr",pct:60,risk:79,rd:"flat",dso:31,over:"₹0",st:"ok",region:"North"},
  {ek:null,name:"Orbit Retail",limit:"₹2.0Cr",used:"₹1.6Cr",pct:80,risk:65,rd:"flat",dso:38,over:"₹0.12Cr",st:"watch",region:"East"},
  {ek:null,name:"Sapphire Stores",limit:"₹1.5Cr",used:"₹0.9Cr",pct:60,risk:83,rd:"flat",dso:27,over:"₹0",st:"ok",region:"South"},
];

// Collections
const colls=[
  {ek:"pinnacle",amt:"₹2.3Cr",days:16,bucket:"61-90d",dunning:"Tier-2 escalation",next:"CFO call 18-Mar",pri:"critical"},
  {ek:"clearview",amt:"₹0.37Cr",days:13,bucket:"1-30d",dunning:"Auto Day-14",next:"Day-21 queued",pri:"watch"},
  {ek:null,name:"Orbit Retail",amt:"₹0.12Cr",days:8,bucket:"1-30d",dunning:"Auto Day-7",next:"Day-14 due 19-Mar",pri:"normal"},
  {ek:null,name:"Nova Distributors",amt:"₹0.18Cr",days:34,bucket:"31-60d",dunning:"Tier-1 manual",next:"Payment plan awaiting sign-off",pri:"attention"},
  {ek:null,name:"Prism Retail",amt:"₹0.08Cr",days:92,bucket:"90+d",dunning:"Tier-3 legal",next:"Write-off pending CFO approval",pri:"critical"},
];

// Ageing waterfall (month-over-month movement)
const ageWaterfall=[
  {from:"Current",to:"1-30d",amt:2.8,note:"Normal ageing of Feb invoices"},
  {from:"1-30d",to:"31-60d",amt:0.9,note:"3 accounts slipped (incl Clearview)"},
  {from:"31-60d",to:"61-90d",amt:1.4,note:"Pinnacle INV-4471 + INV-4523 crossed 60d"},
  {from:"1-30d",to:"Resolved",amt:4.2,note:"12 accounts collected (South dunning)"},
  {from:"31-60d",to:"Resolved",amt:0.6,note:"Nova partial payment"},
  {from:"90+d",to:"Write-off",amt:0.08,note:"Prism Retail — recommended for approval"},
];

// Provisioning
const prov=[{b:"1-30d",o:"₹0.49Cr",r:"1%",p:"₹0.5L"},{b:"31-60d",o:"₹0.18Cr",r:"5%",p:"₹0.9L"},{b:"61-90d",o:"₹2.3Cr",r:"15%",p:"₹34.5L"},{b:"90+d",o:"₹0.08Cr",r:"50%",p:"₹4.0L"}];

// Reconciliation
const reconItems=[
  {id:"REC-441",type:"Unmatched",ent:"Pinnacle Distributors",ek:"pinnacle",amt:"₹4.2L",dt:"14-Mar",age:2,note:"Payment received, no matching invoice. Likely advance against INV-4471."},
  {id:"REC-438",type:"Overpayment",ent:"Horizon Foods",ek:null,amt:"₹0.92L",dt:"8-Mar",age:8,note:"Payment exceeds invoice by ₹0.92L. Customer claims credit note pending. Needs verification."},
  {id:"REC-435",type:"Partial",ent:"Clearview Retail",ek:"clearview",amt:"₹1.8L",dt:"10-Mar",age:6,note:"Partial against INV-4456 (₹3.7L). ₹1.9L outstanding."},
  {id:"REC-432",type:"Dispute",ent:"Orbit Retail",ek:null,amt:"₹2.1L",dt:"7-Mar",age:9,note:"Quantity dispute on 3 line items. Under review."},
  {id:"REC-429",type:"Unmatched",ent:"Nova Distributors",ek:null,amt:"₹0.6L",dt:"5-Mar",age:11,note:"No open invoice. Possible double payment."},
  {id:"REC-425",type:"Gift Card",ent:"Metro Mart Stores",ek:"metromart",amt:"₹1.4L",dt:"3-Mar",age:13,note:"Gift card redemption batch. 94% auto-matched, 6% pending manual review."},
];
const reconTrend=[82,83,84,84,86,87]; // Monthly auto-match rate

// Vendor health (for Payables)
const vendorHealth=[
  {ek:"atlas",health:92,terms:"Net-45 (fixed)",onTime:"100%",vol:"₹3.2Cr/mo",renewal:"N/A",flag:null},
  {ek:"northway",health:75,terms:"Net-45 (5d grace)",onTime:"95%",vol:"₹1.8Cr/mo",renewal:"Apr 2026",flag:"+8% fuel surcharge pending"},
  {ek:"greenfield",health:71,terms:"Net-45 (7d grace)",onTime:"92%",vol:"₹1.4Cr/mo",renewal:"Jun 2026",flag:"Requested Net-30"},
  {ek:"crestline",health:82,terms:"Net-30 (7d grace)",onTime:"98%",vol:"₹1.2Cr/mo",renewal:"Sep 2026",flag:null},
  {ek:"kiran",health:58,terms:"Net-15",onTime:"88%",vol:"₹0.4Cr/mo",renewal:"Jul 2026",flag:"3 duplicates in 6mo"},
];

// Term change requests
const termChanges=[
  {vendor:"Sapphire Chemicals",current:"Net-45",requested:"Net-30",impact:"₹0.8Cr/mo earlier",leverage:"Have alternatives",rec:"Accept"},
  {vendor:"Metro Print Solutions",current:"Net-45",requested:"Net-30",impact:"₹0.6Cr/mo earlier",leverage:"Have alternatives",rec:"Accept"},
  {vendor:"Orbit Logistics",current:"Net-45",requested:"Net-30",impact:"₹0.7Cr/mo earlier",leverage:"Sole source",rec:"Counter: Net-37"},
  {vendor:"Nova Packaging",current:"Net-45",requested:"Net-30",impact:"₹0.7Cr/mo earlier",leverage:"Sole source",rec:"Counter: 2/10 Net-45"},
];

/* ═══ STRATEGIC DATA ═══ */
const rev=[
  {m:"Apr",pl:42.5,ac:41.8},{m:"May",pl:44.0,ac:43.2},{m:"Jun",pl:46.2,ac:47.1},
  {m:"Jul",pl:43.8,ac:42.0},{m:"Aug",pl:45.5,ac:44.9},{m:"Sep",pl:48.0,ac:49.2},
  {m:"Oct",pl:50.2,ac:48.6},{m:"Nov",pl:52.0,ac:50.1},{m:"Dec",pl:55.0,ac:53.4},
  {m:"Jan",pl:48.5,ac:46.8},{m:"Feb",pl:50.0,ac:48.2},{m:"Mar",pl:52.0,ac:null,fc:49.5},
];

// Regional revenue
const regRev=[
  {r:"North",plan:162.0,actual:159.8,var:-2.2,pct:-1.4,note:"Broadly on track. Pinnacle volume down but others compensating."},
  {r:"South",plan:148.5,actual:140.1,var:-8.4,pct:-5.7,note:"82 outlets not billed. Distribution gap is the primary driver."},
  {r:"West",plan:138.0,actual:131.4,var:-6.6,pct:-4.8,note:"Price realization gap. 4 SKUs discounted 3-5% vs plan."},
  {r:"East",plan:94.2,actual:94.0,var:-0.2,pct:-0.2,note:"On track. Smallest region but most stable."},
];

// Month detail for revenue drill-down
const monthDetail={
  Feb:{regions:[{r:"North",pl:15.0,ac:14.6},{r:"South",pl:13.5,ac:12.1},{r:"West",pl:12.8,ac:12.0},{r:"East",pl:8.7,ac:9.5}],topVar:[{d:"South outlets gap",v:-1.4},{d:"West SKU-1104 discount",v:-0.8},{d:"East seasonal uplift",v:+0.8},{d:"North Pinnacle volume",v:-0.4}]},
  Jan:{regions:[{r:"North",pl:14.2,ac:13.8},{r:"South",pl:13.0,ac:11.8},{r:"West",pl:12.5,ac:12.1},{r:"East",pl:8.8,ac:9.1}],topVar:[{d:"South 27 outlets lost",v:-1.2},{d:"West price pressure",v:-0.4},{d:"East holiday carryover",v:+0.3}]},
  Dec:{regions:[{r:"North",pl:16.2,ac:15.8},{r:"South",pl:15.0,ac:13.9},{r:"West",pl:14.5,ac:14.2},{r:"East",pl:9.3,ac:9.5}],topVar:[{d:"South seasonal closure",v:-1.1},{d:"East festive demand",v:+0.2}]},
};

// Ageing bucket accounts (for drill-down)
const ageAccounts={
  "61-90d":[{ent:"Pinnacle Distributors",ek:"pinnacle",amt:"₹2.3Cr",days:16},{ent:"Nova Distributors",ek:null,amt:"₹0.18Cr",days:34}],
  "31-60d":[{ent:"Nova Distributors",ek:null,amt:"₹0.18Cr",days:34},{ent:"Clearview Retail",ek:"clearview",amt:"₹0.37Cr",days:13}],
  "1-30d":[{ent:"Clearview Retail",ek:"clearview",amt:"₹0.37Cr",days:13},{ent:"Orbit Retail",ek:null,amt:"₹0.12Cr",days:8}],
  "90+d":[{ent:"Prism Retail",ek:null,amt:"₹0.08Cr",days:92}],
};

// P&L waterfall
const pnl=[
  {line:"Revenue",plan:542.7,actual:525.3,indent:0},
  {line:"COGS",plan:-336.5,actual:-337.4,indent:0},
  {line:"Gross Profit",plan:206.2,actual:187.9,indent:0,bold:true},
  {line:"Sales & Distribution",plan:-95.0,actual:-98.2,indent:1},
  {line:"Marketing & Trade",plan:-65.0,actual:-58.4,indent:1},
  {line:"People & Admin",plan:-72.0,actual:-71.8,indent:1},
  {line:"Logistics",plan:-48.0,actual:-52.1,indent:1},
  {line:"Total Opex",plan:-280.0,actual:-280.5,indent:0,bold:true},
  {line:"EBITDA",plan:76.4,actual:59.9,indent:0,bold:true,highlight:true},
];

// Full-year outlook
const outlook={
  current:{rev:574.8,ebitda:63.1,margin:11.0,label:"Current trajectory"},
  recovery:{rev:588.2,ebitda:72.4,margin:12.3,label:"With recovery plan"},
  plan:{rev:594.7,ebitda:83.9,margin:14.1,label:"Original plan"},
};

const budgets=[
  {fn:"Manufacturing",b:180,a:176.4,s:"ok"},{fn:"Sales & Distribution",b:95,a:98.2,s:"over"},
  {fn:"Raw Materials",b:142,a:148.6,s:"over"},{fn:"Marketing & Trade",b:65,a:58.4,s:"under"},
  {fn:"People & Admin",b:72,a:71.8,s:"ok"},{fn:"Logistics",b:48,a:52.1,s:"over"},
];
const margins=[
  {m:"Apr",g:38.2,e:14.1},{m:"May",g:37.8,e:13.8},{m:"Jun",g:39.1,e:15.2},
  {m:"Jul",g:36.5,e:12.4},{m:"Aug",g:37.9,e:13.6},{m:"Sep",g:39.4,e:15.8},
  {m:"Oct",g:37.2,e:13.1},{m:"Nov",g:36.8,e:12.6},{m:"Dec",g:37.0,e:12.8},
  {m:"Jan",g:36.2,e:11.9},{m:"Feb",g:35.8,e:11.4},{m:"Mar",g:null,e:null,fg:35.5,fe:11.0},
];
const varDrv=[
  {d:"South under-distribution (82 outlets)",i:-4.2,t:"rev",detail:"Volume -6% in South. 82 outlets dropped Jan-Feb.",subs:[{label:"38 outlets lost to competitor poaching",impact:"-₹1.8Cr",note:"Better trade margins in Hyderabad cluster"},{label:"27 dropped due to credit blocks",impact:"-₹1.2Cr",note:"3 distributors hit limits"},{label:"17 seasonal closures not recovered",impact:"-₹1.2Cr",note:"Post-Diwali, not reactivated"}],action:"Distribution sprint: reactivate 82 outlets in 6 weeks. Est. ₹1.8Cr recovery.",linked:null},
  {d:"Raw material inflation (palm oil +12%)",i:+6.6,t:"cost",detail:"Unhedged. Budget assumed +4%.",subs:[{label:"Palm oil spot +12%",impact:"+₹4.8Cr",note:"Global index up 18% since Sep"},{label:"Packaging +8%",impact:"+₹1.2Cr",note:"Kraft paper shortage"},{label:"Sugar costs lower (offset)",impact:"-₹0.6Cr",note:"Locked at favorable Q1 rates"}],action:"Hedge palm oil now (₹2.1L cost). Renegotiate packaging.",linked:"greenfield"},
  {d:"Logistics rate revision",i:+4.1,t:"cost",detail:"3 carrier contracts auto-renewed at +8%.",subs:[{label:"Northway +8% fuel surcharge",impact:"+₹1.6Cr",note:"Auto-renewed Dec"},{label:"2 regional carriers +7-9%",impact:"+₹1.4Cr",note:"Not flagged until Feb close"},{label:"Route optimization gap",impact:"+₹1.1Cr",note:"18% empty miles on 3 corridors"}],action:"Renegotiate Northway (Apr renewal). Route optimization: ₹2.2Cr/yr savings.",linked:"northway"},
  {d:"Trade spend pushed to FY27",i:-6.6,t:"save",detail:"2 promos delayed. Budget available.",subs:[{label:"Summer campaign → Apr",impact:"-₹4.1Cr",note:"Creative not ready"},{label:"MT co-op → May",impact:"-₹2.5Cr",note:"Key account requested delay"}],action:"Reallocate to offset RM overrun (one-time). Does not fix structural cost issue.",linked:null},
  {d:"West price realization gap",i:-2.8,t:"rev",detail:"3-5% discount on 4 SKUs.",subs:[{label:"SKU-1104: 5% discount since Nov",impact:"-₹1.1Cr",note:"Competitor launched at 8% lower MRP"},{label:"SKU-1108: 3% since Dec",impact:"-₹0.9Cr",note:"Regional brand undercutting"},{label:"SKU-1112 + 1115",impact:"-₹0.8Cr",note:"MT chain demanded price match"}],action:"Accept discount on 2 (re-plan), exit 2 lowest-margin SKUs.",linked:null},
];

/* ═══ CASH FLOW & WC ═══ */
const wc={dso:{v:36,t:32,tr:[34,33,35,34,35,36]},dio:{v:28,t:25,tr:[26,27,26,28,27,28]},dpo:{v:41,t:45,tr:[43,44,42,43,42,41]}};
const ccc=wc.dso.v+wc.dio.v-wc.dpo.v,cccT=wc.dso.t+wc.dio.t-wc.dpo.t;
const wcTrend=[{m:"Oct",v:19},{m:"Nov",v:18},{m:"Dec",v:20},{m:"Jan",v:21},{m:"Feb",v:22},{m:"Mar",v:23}]; // CCC over time

const cf=[
  {w:"W1",ac:8.2,fc:8.0,i:12.1,o:11.9},{w:"W2",ac:7.1,fc:7.8,i:10.4,o:11.5},
  {w:"W3",ac:6.8,fc:7.5,i:9.8,o:10.1},{w:"W4",ac:null,fc:7.2,i:11.2,o:10.8},
  {w:"W5",ac:null,fc:6.9,i:10.1,o:10.4},{w:"W6",ac:null,fc:6.4,i:9.2,o:9.7},
  {w:"W7",ac:null,fc:5.8,i:8.8,o:9.4},{w:"W8",ac:null,fc:5.1,i:8.1,o:8.8},
  {w:"W9",ac:null,fc:3.8,i:7.1,o:11.2},{w:"W10",ac:null,fc:4.9,i:12.3,o:11.2},
  {w:"W11",ac:null,fc:5.6,i:11.8,o:11.1},{w:"W12",ac:null,fc:6.2,i:11.2,o:10.6},
  {w:"W13",ac:null,fc:6.8,i:11.0,o:10.4},
];

// Week entity details
const weekEnts={
  W9:{inf:[{ent:"Clearview Retail",ek:"clearview",amt:"₹3.7L",conf:"Low"},{ent:"Metro Mart",ek:"metromart",amt:"₹4.1L",conf:"High"},{ent:"Misc (12 accts)",amt:"₹2.3Cr",conf:"Medium"}],out:[{ent:"Atlas Chemicals",ek:"atlas",amt:"₹3.2Cr",note:"Hard date"},{ent:"Northway Logistics",ek:"northway",amt:"₹1.8Cr",note:"Shiftable"},{ent:"Greenfield Agro",ek:"greenfield",amt:"₹1.4Cr",note:"Shiftable"},{ent:"Misc (8 vendors)",amt:"₹4.6Cr"}]},
  W7:{inf:[{ent:"Pinnacle Distributors",ek:"pinnacle",amt:"₹2.3Cr",conf:"Low",note:"Overdue. No signal."},{ent:"Metro Mart",ek:"metromart",amt:"₹3.2L",conf:"High"},{ent:"Misc",amt:"₹5.3Cr",conf:"Medium"}],out:[{ent:"Sapphire Chemicals",amt:"₹8.4L"},{ent:"Misc",amt:"₹8.2Cr"}]},
};

// Credit line
const creditLine={limit:"₹5.0Cr",drawn:"₹0",available:"₹5.0Cr",rate:"9.2%",covenants:"Current ratio > 1.2, DSO < 45d",status:"Compliant"};

/* ═══ BRIEF CARDS ═══ */
const brief=[
  {id:1,lv:"critical",ly:"cross",ek:"pinnacle",go:["receivables","cashflow"],title:"₹2.3Cr stuck at Pinnacle is about to blow a hole in your Week 7 forecast",sub:"An overdue invoice (tactical) is now the primary driver of a cash breach (strategic). 62% of the projected gap.",ev:["Two invoices (₹1.4Cr + ₹0.9Cr) due 28-Feb. No payment, no dispute, 11 days silence.","Payment cycle: 32 → 47 days over 3 months. Their Q3 revenue declined 8%.","Week 7 forecast assumed clearance by 10-Mar. Cash corridor now ₹1.8Cr tighter."],rec:"Escalate to Pinnacle's CFO today. Pre-approve fallback: vendor deferrals (₹1.2Cr, zero cost) or HDFC draw (₹2Cr, ₹4.6L cost).",trail:[{ag:"Data",t:"06:01",a:"AR ledger scan",d:"INV-4471 + INV-4523: 16d overdue."},{ag:"Pattern",t:"06:01",a:"Payment history",d:"DSO 32→47. Q3 revenue -8%."},{ag:"Forecast",t:"06:02",a:"Cash recalc",d:"Removed ₹2.3Cr from W7. W9 breaches."},{ag:"Synthesis",t:"06:02",a:"Cross-layer merge",d:"AR → cash forecast → AP terms → credit costs."}],chat:[{r:"ai",t:"This is the highest-impact item. The ₹2.3Cr overdue is now the primary driver of your Week 9 cash breach."},{r:"chips",o:["What if they don't pay by W8?","Show deferral options","Draft escalation email","Revenue recognition impact?"]}]},
  {id:2,lv:"attention",ly:"strategic",ek:null,go:["performance"],title:"FY26 revenue tracking 3.2% below plan — gap widening, not closing",sub:"YTD: ₹525.3Cr vs ₹542.7Cr. Miss tripled since Q2. South distribution and West pricing are 80% of it.",ev:["Q1: -₹0.6Cr, Q2: -₹4.5Cr, Q3: -₹7.1Cr. Accelerating.","South: 82 outlets, -6% volume. West: 3-5% discount on 4 SKUs.","Full-year: ₹574.8Cr current trajectory vs ₹594.7Cr plan."],rec:"South distribution sprint (₹1.8Cr in 6 weeks). West pricing decision: accept or exit loss-making SKUs.",trail:[{ag:"Data",t:"06:04",a:"Revenue ledger",d:"Monthly plan vs actual, 4 regions."},{ag:"Pattern",t:"06:04",a:"Decomposition",d:"Volume 62%, price 28%, mix 10%."},{ag:"Forecast",t:"06:04",a:"Full-year",d:"Current: ₹574.8Cr. Recovery: ₹588.2Cr."},{ag:"Synthesis",t:"06:05",a:"Recovery model",d:"Sprint + reset closes 72%."}],chat:[{r:"ai",t:"The gap has tripled since Q2. Two fixable regions drive 80% of the miss."},{r:"chips",o:["Regional breakdown","Recovery scenarios","Margin impact","Cash effect?"]}]},
  {id:3,lv:"attention",ly:"tactical",ek:"kiran",go:["payables"],title:"Third duplicate from Kiran Textiles in 6 months — pattern, not mistake",sub:"₹86,500 auto-held. Fix is PO-level matching, not another hold.",ev:["KT-7834 matches KT-7801 exactly.","Sep (₹1.2L,8d), Dec (₹74K,3d), Mar (₹87K,real-time).","4 vendors, 11 duplicates, ₹8.4L in 12 months."],rec:"Mandate PO-matching from Kiran. Flag 3 other repeat offenders.",trail:[{ag:"Data",t:"06:01",a:"Invoice match",d:"Exact match on amount+items+date."},{ag:"Pattern",t:"06:01",a:"Duplicate detection",d:"3rd in 6mo. Systemic."},{ag:"Synthesis",t:"06:01",a:"Auto-held",d:"Zero exposure. PO-matching recommended."}],chat:[{r:"ai",t:"Auto-held, zero exposure. Fix the process or keep catching forever?"},{r:"chips",o:["All duplicate offenders","Draft vendor communication","Total exposure?"]}]},
  {id:4,lv:"attention",ly:"cross",ek:null,go:["payables","cashflow"],title:"Three vendor payments in a 4-day window — two don't have to be there",sub:"₹11.2Cr out vs ₹7.1Cr in. AP scheduling creating a cash breach. Two shifts fix it at zero cost.",ev:["Atlas ₹3.2Cr (hard). Northway ₹1.8Cr (5d grace). Greenfield ₹1.4Cr (7d grace).","Only Atlas is fixed."],rec:"Shift Northway to 1-Apr, Greenfield to 31-Mar. ₹11.2Cr → ₹7.8Cr.",trail:[{ag:"Data",t:"06:02",a:"AP schedule",d:"₹6.4Cr in 4 days."},{ag:"Forecast",t:"06:02",a:"Cash impact",d:"W9 breach."},{ag:"Synthesis",t:"06:02",a:"Contract merge",d:"Two shifts eliminate breach."}],chat:[{r:"ai",t:"Simple fix. Two shifts, zero cost, breach gone."},{r:"chips",o:["Model the shifts","Atlas slip scenario?","Contract terms"]}]},
  {id:5,lv:"watch",ly:"strategic",ek:null,go:["performance"],title:"Gross margin eroded 240bps — raw materials, not pricing",sub:"38.2% → 35.8%. Palm oil (+12%) is 160bps. EBITDA: 14.1% → 11.4%.",ev:["RM budget +4%, actual +12%. ₹6.6Cr over.","Price flat. Cost-driven.","₹6.6Cr trade surplus available as offset."],rec:"Hedge palm oil. Push 2-3% price on top 10 SKUs. Reallocate trade surplus.",trail:[{ag:"Data",t:"06:05",a:"P&L scan",d:"240bps erosion."},{ag:"Pattern",t:"06:05",a:"Cost decomp",d:"Palm oil 160bps, packaging 50bps."},{ag:"Synthesis",t:"06:05",a:"Recovery",d:"Hedge+price+realloc → ~180bps."}],chat:[{r:"ai",t:"Slow burn. EBITDA exits at 10.8% vs 14.1% plan at this rate."},{r:"chips",o:["Margin detail","Price increase model","Hedging cost?","Cash effect?"]}]},
  {id:6,lv:"watch",ly:"tactical",ek:null,go:["payables","cashflow"],title:"4 suppliers asking for shorter terms — together, ₹2.8Cr/month compression",sub:"MSME credit-tightening signal. Each routine, together strategic.",ev:["Four vendors: Net-45 → Net-30. Combined ₹2.8Cr hits 15d earlier.","Root cause: MSME credit conditions."],rec:"Accept 2 (have alternatives). Counter 2 (sole source) with Net-37 or 2/10 Net-45.",trail:[{ag:"Data",t:"06:03",a:"Contract scan",d:"4 requests in 2 weeks."},{ag:"Pattern",t:"06:03",a:"Cross-vendor",d:"All MSME. RBI data confirms."},{ag:"Synthesis",t:"06:03",a:"Leverage map",d:"2 have subs, 2 sole-source."}],chat:[{r:"ai",t:"MSME pressure. Accepting all four compresses working capital permanently."},{r:"chips",o:["Leverage map","WC impact","Draft counters"]}]},
  {id:7,lv:"ontrack",ly:"tactical",ek:null,go:["receivables","cashflow"],title:"South collections 11% faster — West still manual, costing ₹1.6Cr",sub:"DSO: 38→34. ₹1.2Cr freed. Proof case for West rollout.",ev:["South AR ₹8.4Cr (down from ₹9.6Cr). 12/18 cleared.","West: 42d DSO, same profile. Only difference: process."],rec:"Roll out West dunning. 2 days config, ₹1.6Cr freed in 60 days.",trail:[{ag:"Data",t:"06:03",a:"Regional AR",d:"South 34d vs West 42d."},{ag:"Pattern",t:"06:03",a:"Causal",d:"Only variable: auto dunning."},{ag:"Synthesis",t:"06:03",a:"ROI",d:"₹0 cost, ₹1.6Cr freed."}],chat:[{r:"ai",t:"Easiest win. South proved it. 2 days for ₹1.6Cr."},{r:"chips",o:["Start rollout","South vs West","Other automations?"]}]},
];

/* ═══ COMPONENTS ═══ */
const Tag=({children,bg,c:cl})=><span style={{fontFamily:F.mo,fontSize:9,fontWeight:600,letterSpacing:"0.05em",color:cl,background:bg,padding:"2px 7px",borderRadius:3,whiteSpace:"nowrap"}}>{children}</span>;
const Spark=({data,color,w=100,h=24})=>{if(!data||data.length<2)return null;const lo=Math.min(...data),hi=Math.max(...data),r=hi-lo||1,s=w/(data.length-1);const pts=data.map((v,i)=>`${i*s},${h-3-((v-lo)/r)*(h-6)}`).join(" ");return(<svg width={w} height={h}><polyline points={pts} fill="none" stroke={color} strokeWidth={1.5}/><circle cx={(data.length-1)*s} cy={h-3-((data[data.length-1]-lo)/r)*(h-6)} r={2} fill={color}/></svg>);};
const Stat=({label,value,sub,trend,tc})=>(<div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,padding:"10px 12px"}}><div style={{fontFamily:F.mo,fontSize:8,letterSpacing:"0.08em",color:C.muted,textTransform:"uppercase",marginBottom:2}}>{label}</div><div style={{fontFamily:F.sr,fontSize:17,fontWeight:700,lineHeight:1}}>{value}</div>{sub&&<div style={{fontSize:10,color:C.sub,marginTop:2}}>{sub}</div>}{trend&&<div style={{fontFamily:F.mo,fontSize:9,color:tc||C.accent,marginTop:2}}>{trend}</div>}</div>);
const AgeBar=({data,note})=>(<div><div style={{display:"flex",borderRadius:4,overflow:"hidden",height:12,marginBottom:6}}>{data.map((d,i)=><div key={i} style={{width:`${d.p}%`,background:d.c}}/>)}</div><div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{data.map((d,i)=><span key={i} style={{display:"flex",alignItems:"center",gap:3,fontSize:10,fontFamily:F.mo}}><span style={{width:6,height:6,borderRadius:2,background:d.c}}/><span style={{color:C.sub}}>{d.b}</span><span style={{fontWeight:600}}>₹{d.a}Cr</span></span>)}</div>{note&&<div style={{fontSize:10.5,color:C.sub,marginTop:4,fontStyle:"italic"}}>{note}</div>}</div>);
const ChatInput=({placeholder})=>(<div style={{display:"flex",gap:6,marginTop:14,padding:"10px 12px",background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`}}><input placeholder={placeholder||"Ask the IW..."} style={{flex:1,fontFamily:F.mn,fontSize:11.5,padding:"6px 0",border:"none",outline:"none",background:"transparent",color:C.ink}}/><button style={{fontFamily:F.mo,fontSize:9,fontWeight:600,background:C.accent,color:"#fff",border:"none",borderRadius:6,padding:"6px 11px",cursor:"pointer",whiteSpace:"nowrap"}}>Ask</button></div>);
const Callout=({color,icon,children})=>(<div style={{background:color+"15",borderRadius:5,padding:"8px 10px",marginTop:8,display:"flex",gap:8,alignItems:"flex-start"}}><span style={{fontFamily:F.mo,fontSize:9,color,fontWeight:700,flexShrink:0,marginTop:1}}>{icon}</span><div style={{fontSize:10.5,color:C.ink,lineHeight:1.45}}>{children}</div></div>);

/* ═══ CHART ═══ */
const CFChart=({data,sLine,onClickW,selW})=>{
  const W=860,H=180,pL=40,pR=14,pT=16,pB=24,mx=10;
  const cW=W-pL-pR,cH=H-pT-pB,step=cW/(data.length-1);
  const y=v=>pT+cH-(v/mx)*cH,x=i=>pL+step*i;
  const mkP=vals=>vals.map((v,i)=>`${i===0?"M":"L"}${x(i)},${y(v)}`).join(" ");
  const fL=mkP(data.map(d=>d.fc));
  const aL=data.filter(d=>d.ac!==null).map((d,i)=>`${i===0?"M":"L"}${x(i)},${y(d.ac)}`).join(" ");
  const si=selW?data.findIndex(d=>d.w===selW):-1;
  return(<svg viewBox={`0 0 ${W} ${H}`} style={{width:"100%",fontFamily:F.mo,display:"block"}}>
    {[0,2,4,6,8,10].map(v=><g key={v}><line x1={pL} x2={W-pR} y1={y(v)} y2={y(v)} stroke={C.bdr} strokeWidth={0.5}/><text x={pL-4} y={y(v)+3} textAnchor="end" fontSize={7} fill={C.muted}>₹{v}</text></g>)}
    <line x1={pL} x2={W-pR} y1={y(4)} y2={y(4)} stroke={C.red} strokeWidth={1} strokeDasharray="4,3" opacity={0.35}/>
    {si>-1&&<rect x={x(si)-step/2} y={pT} width={step} height={cH} fill={C.accent} opacity={0.06} rx={3}/>}
    {sLine&&<path d={mkP(sLine)} fill="none" stroke={C.blue} strokeWidth={2} opacity={0.5}/>}
    <path d={fL} fill="none" stroke={C.accent} strokeWidth={1.5} strokeDasharray="5,3" opacity={0.55}/>
    <path d={aL} fill="none" stroke={C.accent} strokeWidth={2.5}/>
    {data.map((d,i)=><g key={i} onClick={()=>onClickW&&onClickW(d.w)} style={{cursor:"pointer"}}><rect x={x(i)-step/2} y={pT} width={step} height={cH+pB} fill="transparent"/>{d.ac!==null?<circle cx={x(i)} cy={y(d.ac)} r={3} fill={C.accent}/>:<circle cx={x(i)} cy={y(d.fc)} r={2.5} fill={d.fc<4?C.red:"none"} stroke={d.fc<4?C.red:C.accent} strokeWidth={1.5} opacity={0.7}/>}{sLine&&<circle cx={x(i)} cy={y(sLine[i])} r={2} fill={sLine[i]<4?C.red:C.blue} opacity={0.4}/>}<text x={x(i)} y={H-4} textAnchor="middle" fontSize={7} fill={selW===d.w?C.accent:C.muted} fontWeight={selW===d.w?700:400}>{d.w}</text></g>)}
    <line x1={pL} x2={pL+14} y1={pT-5} y2={pT-5} stroke={C.accent} strokeWidth={2.5}/><text x={pL+17} y={pT-2} fontSize={7} fill={C.sub}>Actual</text>
    <line x1={pL+50} x2={pL+64} y1={pT-5} y2={pT-5} stroke={C.accent} strokeWidth={1.5} strokeDasharray="4,3"/><text x={pL+67} y={pT-2} fontSize={7} fill={C.sub}>Forecast</text>
    {sLine&&<><line x1={pL+105} x2={pL+119} y1={pT-5} y2={pT-5} stroke={C.blue} strokeWidth={2} opacity={0.5}/><text x={pL+122} y={pT-2} fontSize={7} fill={C.blue}>Scenario</text></>}
  </svg>);
};

/* ═══ ENTITY DRAWER (enriched) ═══ */
const Drawer=({ek,onClose})=>{
  const e=E[ek];const[dTab,setDTab]=useState("overview");
  if(!e)return null;
  const td=e.dso||e.pc;const rc=e.risk>=80?C.accent:e.risk>=60?C.amber:C.red;
  const stC={stable:C.accent,watch:C.amber,deteriorating:C.red,critical:C.red,action:C.amber};
  return(<div style={{position:"fixed",top:0,right:0,bottom:0,width:440,background:C.w,borderLeft:`1px solid ${C.bdr}`,zIndex:200,display:"flex",flexDirection:"column",boxShadow:"-4px 0 28px rgba(0,0,0,0.07)"}}>
    {/* Header */}
    <div style={{padding:"14px 18px",borderBottom:`1px solid ${C.bdr}`,flexShrink:0}}>
      <div style={{display:"flex",justifyContent:"space-between"}}>
        <div><div style={{display:"flex",gap:4,marginBottom:4}}><Tag bg={e.ty==="Customer"?C.al:C.bl} c={e.ty==="Customer"?C.accent:C.blue}>{e.ty}</Tag><Tag bg={C.bg} c={C.muted}>{e.seg}</Tag>{e.region&&<Tag bg={C.bg} c={C.muted}>{e.region}</Tag>}</div>
          <div style={{fontFamily:F.sr,fontSize:16,fontWeight:700}}>{e.name}</div>
          <div style={{fontSize:10,color:C.muted}}>{e.tenure} · {e.contacts.length} contacts</div></div>
        <button onClick={onClose} style={{background:"none",border:"none",fontSize:16,color:C.muted,cursor:"pointer"}}>×</button>
      </div>
      {/* Risk + metrics strip */}
      <div style={{display:"flex",gap:10,marginTop:10,alignItems:"center"}}>
        <div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontFamily:F.mo,fontSize:18,fontWeight:700,color:rc}}>{e.risk}</span><div style={{width:50,height:4,borderRadius:2,background:C.bdr}}><div style={{height:4,borderRadius:2,width:`${e.risk}%`,background:rc}}/></div><span style={{fontFamily:F.mo,fontSize:9,color:e.rd==="down"?C.red:C.accent}}>{e.rd==="down"?"▼":"—"}</span></div>
        <div style={{marginLeft:"auto",display:"flex",gap:12}}>
          <div style={{textAlign:"right"}}><div style={{fontFamily:F.mo,fontSize:7,color:C.muted}}>OUT</div><div style={{fontFamily:F.mo,fontSize:12,fontWeight:700}}>{e.out}</div></div>
          <div style={{textAlign:"right"}}><div style={{fontFamily:F.mo,fontSize:7,color:e.over!=="₹0"?C.red:C.muted}}>OVERDUE</div><div style={{fontFamily:F.mo,fontSize:12,fontWeight:700,color:e.over!=="₹0"?C.red:C.accent}}>{e.over}</div></div>
        </div>
      </div>
      {/* Drawer sub-nav */}
      <div style={{display:"flex",gap:0,marginTop:10,borderTop:`1px solid ${C.bdr}`,paddingTop:8}}>
        {["overview","invoices","timeline","contacts"].map(t=>(<button key={t} onClick={()=>setDTab(t)} style={{fontFamily:F.mn,fontSize:10.5,fontWeight:dTab===t?600:400,color:dTab===t?C.accent:C.muted,background:"none",border:"none",cursor:"pointer",padding:"4px 10px",borderBottom:dTab===t?`2px solid ${C.accent}`:"2px solid transparent",textTransform:"capitalize"}}>{t}</button>))}
      </div>
    </div>
    {/* Content */}
    <div style={{flex:1,overflowY:"auto",padding:"14px 18px"}}>

      {dTab==="overview"&&(<div>
        {/* Trend */}
        {td&&<div style={{marginBottom:14}}><div style={{fontFamily:F.mo,fontSize:7,color:C.muted,textTransform:"uppercase",marginBottom:4}}>{e.dso?"DSO Trend (6mo)":"Payment Cycle (6mo)"}</div><div style={{background:C.bg,borderRadius:5,padding:"8px 10px"}}><Spark data={td} color={e.rd==="down"?C.red:C.accent} w={360} h={32}/>{e.labels&&<div style={{display:"flex",justifyContent:"space-between",marginTop:3}}>{e.labels.map((l,i)=><span key={i} style={{fontFamily:F.mo,fontSize:7,color:C.muted}}>{l}</span>)}</div>}</div></div>}

        {/* Evolving Assessment */}
        {e.assess&&<div style={{marginBottom:14}}>
          <div style={{fontFamily:F.mo,fontSize:7,color:C.muted,textTransform:"uppercase",marginBottom:6}}>IW Assessment (evolving)</div>
          {e.assess.map((a,i)=>(
            <div key={i} style={{display:"flex",gap:8,marginBottom:6}}>
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",width:16,flexShrink:0}}>
                <div style={{width:8,height:8,borderRadius:"50%",background:stC[a.st]||C.muted,border:`2px solid ${C.w}`}}/>
                {i<e.assess.length-1&&<div style={{width:1,flex:1,background:C.bdr,marginTop:2}}/>}
              </div>
              <div style={{flex:1,paddingBottom:2}}>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:1}}>
                  <span style={{fontFamily:F.mo,fontSize:9,color:stC[a.st],fontWeight:600,textTransform:"uppercase"}}>{a.st}</span>
                  <span style={{fontFamily:F.mo,fontSize:8,color:C.muted}}>{a.dt}</span>
                </div>
                <div style={{fontSize:10.5,color:C.sub,lineHeight:1.4}}>{a.note}</div>
              </div>
            </div>
          ))}
        </div>}

        {/* Linked Briefs */}
        {e.briefs&&e.briefs.length>0&&<div style={{marginBottom:14}}>
          <div style={{fontFamily:F.mo,fontSize:7,color:C.muted,textTransform:"uppercase",marginBottom:4}}>Linked Morning Brief Items</div>
          {e.briefs.map(bid=>{const b=brief.find(x=>x.id===bid);if(!b)return null;return(
            <div key={bid} style={{padding:"7px 9px",background:C.bg,borderRadius:5,marginBottom:3,borderLeft:`3px solid ${LAY[b.ly].c}`}}>
              <div style={{fontSize:10.5,fontWeight:500,lineHeight:1.3}}>{b.title}</div>
              <div style={{display:"flex",gap:4,marginTop:3}}><Tag bg={URG[b.lv].bg} c={URG[b.lv].c}>{URG[b.lv].l}</Tag><Tag bg={LAY[b.ly].bg} c={LAY[b.ly].c}>{LAY[b.ly].l}</Tag></div>
            </div>);})}
        </div>}

        {/* Dups if vendor */}
        {e.dups&&<div style={{marginBottom:14}}><div style={{fontFamily:F.mo,fontSize:7,color:C.red,textTransform:"uppercase",marginBottom:4}}>Duplicate History</div>{e.dups.map((d,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"4px 0",borderBottom:`1px solid ${C.bdr}`,fontSize:11}}><span>{d.d} — {d.a}</span><span style={{fontFamily:F.mo,fontSize:9,color:C.muted}}>{d.c}</span></div>)}</div>}

        {/* Static note */}
        <div style={{background:C.al,borderRadius:5,padding:"10px 12px"}}><div style={{fontFamily:F.mo,fontSize:7,color:C.accent,textTransform:"uppercase",marginBottom:2}}>Summary</div><div style={{fontSize:11,color:C.ink,lineHeight:1.5}}>{e.note}</div></div>
      </div>)}

      {dTab==="invoices"&&(<div>
        <div style={{fontFamily:F.mo,fontSize:7,color:C.muted,textTransform:"uppercase",marginBottom:6}}>All Invoices ({e.inv.length} shown)</div>
        {e.inv.map((inv,i)=><div key={i} style={{padding:"7px 9px",marginBottom:4,borderRadius:5,background:(inv.s==="Overdue"||inv.flag)?C.rl+"44":C.bg,border:`1px solid ${(inv.s==="Overdue"||inv.flag)?C.red+"22":C.bdr}`}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}><span style={{fontFamily:F.mo,fontSize:10.5,fontWeight:600}}>{inv.id}</span><span style={{fontFamily:F.mo,fontSize:11,fontWeight:700}}>{inv.a}</span></div>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:9.5,color:C.sub}}>
            <span>Due {inv.due}{inv.pd?` · Paid ${inv.pd}`:""}</span>
            <span style={{display:"flex",gap:4,alignItems:"center"}}>
              {inv.flag&&<Tag bg={C.rl} c={C.red}>{inv.flag}</Tag>}
              <span style={{color:inv.s==="Overdue"?C.red:inv.s==="Held"?C.amber:inv.s==="Reversed"?C.amber:C.accent,fontWeight:500}}>{inv.s}{inv.d?` (${inv.d}d)`:""}</span>
            </span>
          </div>
        </div>)}
        <div style={{fontFamily:F.mo,fontSize:9,color:C.muted,marginTop:6,textAlign:"center"}}>Showing {e.inv.length} of {e.ty==="Customer"?Math.floor(Math.random()*20+15):Math.floor(Math.random()*10+5)} total invoices · <span style={{color:C.accent,cursor:"pointer"}}>Load all →</span></div>
      </div>)}

      {dTab==="timeline"&&(<div>
        <div style={{fontFamily:F.mo,fontSize:7,color:C.muted,textTransform:"uppercase",marginBottom:8}}>Relationship Timeline</div>
        {e.timeline&&e.timeline.map((t,i)=>(
          <div key={i} style={{display:"flex",gap:10,marginBottom:0}}>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",width:16,flexShrink:0}}>
              <div style={{width:8,height:8,borderRadius:"50%",background:i===e.timeline.length-1?C.accent:C.bdr,border:`2px solid ${C.w}`}}/>
              {i<e.timeline.length-1&&<div style={{width:1,flex:1,background:C.bdr,marginTop:1}}/>}
            </div>
            <div style={{paddingBottom:12}}>
              <div style={{fontFamily:F.mo,fontSize:9,color:C.muted,marginBottom:1}}>{t.dt}</div>
              <div style={{fontSize:11,color:C.ink,lineHeight:1.45}}>{t.ev}</div>
            </div>
          </div>
        ))}
      </div>)}

      {dTab==="contacts"&&(<div>
        <div style={{fontFamily:F.mo,fontSize:7,color:C.muted,textTransform:"uppercase",marginBottom:6}}>Contacts ({e.contacts.length})</div>
        {e.contacts.map((c,i)=>(
          <div key={i} style={{padding:"10px 12px",background:C.bg,borderRadius:6,marginBottom:6}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div><div style={{fontSize:12,fontWeight:600}}>{c.n}</div><div style={{fontSize:10,color:C.muted,marginTop:1}}>{c.r}</div></div>
              <div style={{textAlign:"right"}}><div style={{fontFamily:F.mo,fontSize:10,color:C.accent}}>{c.e}</div>{c.last&&<div style={{fontSize:9,color:C.muted,marginTop:1}}>Last contact: {c.last}</div>}</div>
            </div>
          </div>
        ))}
      </div>)}

      <ChatInput placeholder={`Ask about ${e.name}...`}/>
    </div>
  </div>);
};

/* ═══ VAR DRAWER ═══ */
const VarDrawer=({driver:d,onClose,onEntity})=>{if(!d)return null;const bc=d.t==="save"?C.accent:d.t==="rev"?C.red:C.amber;const bcl=d.t==="save"?C.al:d.t==="rev"?C.rl:C.aml;
  return(<div style={{position:"fixed",top:0,right:0,bottom:0,width:420,background:C.w,borderLeft:`1px solid ${C.bdr}`,zIndex:200,display:"flex",flexDirection:"column",boxShadow:"-4px 0 24px rgba(0,0,0,0.06)"}}>
    <div style={{padding:"16px 20px",borderBottom:`1px solid ${C.bdr}`,display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}><div><div style={{display:"flex",gap:5,marginBottom:6}}><Tag bg={bcl} c={bc}>{d.t==="rev"?"Revenue":d.t==="cost"?"Cost":"Saving"}</Tag><Tag bg={C.bg} c={C.muted}>{d.i>0?"+":""}₹{Math.abs(d.i)}Cr</Tag></div><div style={{fontFamily:F.sr,fontSize:16,fontWeight:700,lineHeight:1.3}}>{d.d}</div><div style={{fontSize:11,color:C.sub,marginTop:4}}>{d.detail}</div></div><button onClick={onClose} style={{background:"none",border:"none",fontSize:16,color:C.muted,cursor:"pointer"}}>×</button></div>
    <div style={{flex:1,overflowY:"auto",padding:"16px 20px"}}>
      <div style={{fontFamily:F.mo,fontSize:8,letterSpacing:"0.1em",color:C.muted,textTransform:"uppercase",marginBottom:8}}>Breakdown</div>
      {d.subs.map((s,j)=>(<div key={j} style={{padding:"10px 12px",marginBottom:6,background:C.bg,borderRadius:6,borderLeft:`3px solid ${bc}`}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><div style={{fontSize:12,fontWeight:500,flex:1,lineHeight:1.35}}>{s.label}</div><span style={{fontFamily:F.mo,fontSize:11,fontWeight:700,color:bc,flexShrink:0,marginLeft:8}}>{s.impact}</span></div><div style={{fontSize:10.5,color:C.sub}}>{s.note}</div></div>))}
      <div style={{fontFamily:F.mo,fontSize:8,letterSpacing:"0.1em",color:C.accent,textTransform:"uppercase",marginBottom:6,marginTop:16}}>Recommended Action</div>
      <div style={{background:C.al,borderRadius:6,padding:"12px 14px",marginBottom:16}}><div style={{fontSize:11.5,color:C.ink,lineHeight:1.5}}>{d.action}</div></div>
      {d.linked&&<div><div style={{fontFamily:F.mo,fontSize:8,color:C.muted,textTransform:"uppercase",marginBottom:6}}>Linked Entity</div><div onClick={()=>{onClose();onEntity(d.linked);}} style={{padding:"10px 12px",background:C.bg,borderRadius:6,cursor:"pointer",display:"flex",justifyContent:"space-between",border:`1px solid ${C.bdr}`}}><div><div style={{fontSize:12,fontWeight:600}}>{E[d.linked]?.name}</div><div style={{fontSize:10,color:C.muted}}>{E[d.linked]?.ty}</div></div><span style={{fontFamily:F.mo,fontSize:9,color:C.accent}}>View →</span></div></div>}
      <ChatInput placeholder="Ask about this driver..."/>
    </div>
  </div>);
};

/* ═══ TRAIL MODAL ═══ */
const TrailModal=({card,onClose})=>card?(<div onClick={onClose} style={{position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,0.28)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}><div onClick={e=>e.stopPropagation()} style={{background:C.w,borderRadius:10,width:"100%",maxWidth:520,maxHeight:"78vh",overflow:"auto",border:`1px solid ${C.bdr}`}}><div style={{padding:"14px 18px",borderBottom:`1px solid ${C.bdr}`,position:"sticky",top:0,background:C.w,zIndex:2,display:"flex",justifyContent:"space-between"}}><div><div style={{fontFamily:F.mo,fontSize:8,color:C.muted,letterSpacing:"0.1em",marginBottom:3}}>DECISION TRAIL</div><div style={{fontSize:13,fontWeight:600,lineHeight:1.3,maxWidth:400}}>{card.title}</div></div><button onClick={onClose} style={{background:"none",border:"none",fontSize:16,color:C.muted,cursor:"pointer"}}>×</button></div><div style={{padding:"16px 18px"}}>{card.trail.map((s,i)=>(<div key={i} style={{display:"flex",gap:12,paddingBottom:i<card.trail.length-1?16:0}}><div style={{display:"flex",flexDirection:"column",alignItems:"center",width:26,flexShrink:0}}><div style={{width:26,height:26,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",background:s.ag==="Synthesis"?C.al:C.bg,border:`1px solid ${s.ag==="Synthesis"?C.accent:C.bdr}`,fontFamily:F.mo,fontSize:9,fontWeight:600,color:s.ag==="Synthesis"?C.accent:C.sub}}>{s.ag[0]}</div>{i<card.trail.length-1&&<div style={{width:1,flex:1,background:C.bdr,marginTop:3}}/>}</div><div><div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2}}><span style={{fontSize:12,fontWeight:600}}>{s.ag}</span><span style={{fontFamily:F.mo,fontSize:8,color:C.muted}}>{s.t}</span></div><div style={{fontFamily:F.mo,fontSize:9,color:C.accent,marginBottom:2}}>{s.a}</div><div style={{fontSize:11,color:C.sub,lineHeight:1.5}}>{s.d}</div></div></div>))}</div></div></div>):null;

/* ═══ DISCUSS MODAL ═══ */
const DiscussModal=({card,onClose})=>{const[inp,setInp]=useState("");const[msgs,setMsgs]=useState(card?.chat||[]);if(!card)return null;const send=()=>{if(inp.trim()){setMsgs([...msgs,{r:"user",t:inp},{r:"ai",t:"Let me traverse the graph..."}]);setInp("");}};
  return(<div onClick={onClose} style={{position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,0.28)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}><div onClick={e=>e.stopPropagation()} style={{background:C.bg,borderRadius:10,width:"100%",maxWidth:500,maxHeight:"78vh",display:"flex",flexDirection:"column",border:`1px solid ${C.bdr}`}}>
    <div style={{padding:"12px 16px",borderBottom:`1px solid ${C.bdr}`,background:C.w,borderRadius:"10px 10px 0 0",display:"flex",justifyContent:"space-between"}}><div><div style={{fontFamily:F.mo,fontSize:8,color:C.accent,letterSpacing:"0.06em",marginBottom:2}}>DISCUSSING</div><div style={{fontSize:12,fontWeight:600,lineHeight:1.3,maxWidth:380}}>{card.title}</div></div><button onClick={onClose} style={{background:"none",border:"none",fontSize:16,color:C.muted,cursor:"pointer"}}>×</button></div>
    <div style={{flex:1,overflowY:"auto",padding:"14px 16px"}}>{msgs.map((m,i)=>m.r==="chips"?(<div key={i} style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:10,paddingLeft:32}}>{m.o.map((o,j)=><button key={j} onClick={()=>setMsgs([...msgs,{r:"user",t:o},{r:"ai",t:"Traversing..."}])} style={{fontFamily:F.mn,fontSize:10.5,padding:"5px 10px",borderRadius:14,border:`1px solid ${C.bdr}`,background:C.w,color:C.sub,cursor:"pointer"}}>{o}</button>)}</div>):(<div key={i} style={{display:"flex",gap:8,marginBottom:10,flexDirection:m.r==="user"?"row-reverse":"row"}}><div style={{width:24,height:24,borderRadius:"50%",flexShrink:0,background:m.r==="ai"?C.accent:C.blue,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:F.mo,fontSize:8,fontWeight:600}}>{m.r==="ai"?"IW":"Y"}</div><div style={{maxWidth:"80%",padding:"9px 12px",borderRadius:m.r==="user"?"12px 12px 3px 12px":"3px 12px 12px 12px",background:m.r==="user"?C.bl:C.w,border:`1px solid ${C.bdr}`,fontSize:12,lineHeight:1.55,whiteSpace:"pre-line"}}>{m.t}</div></div>))}</div>
    <div style={{padding:"10px 16px",borderTop:`1px solid ${C.bdr}`,background:C.w,borderRadius:"0 0 10px 10px",display:"flex",gap:6}}><input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")send();}} placeholder="Ask..." style={{flex:1,fontFamily:F.mn,fontSize:12,padding:"8px 10px",border:`1px solid ${C.bdr}`,borderRadius:7,outline:"none",background:C.bg}}/><button onClick={send} style={{fontFamily:F.mo,fontSize:9,fontWeight:600,background:C.accent,color:"#fff",border:"none",borderRadius:7,padding:"8px 12px",cursor:"pointer"}}>Send</button></div>
  </div></div>);
};

/* ═══ MAIN ═══ */
export default function FinanceIW(){
  const[tab,setTab]=useState("brief");
  const[openC,setOpenC]=useState(1);
  const[drw,setDrw]=useState(null);
  const[trail,setTrail]=useState(null);
  const[disc,setDisc]=useState(null);
  const[selW,setSelW]=useState(null);
  const[expVar,setExpVar]=useState(null);
  const[arSub,setArSub]=useState("overview");
  const[selMonth,setSelMonth]=useState(null);
  const[selAge,setSelAge]=useState(null);
  const[sDSO,setSDSO]=useState(36);
  const[sNW,setSNW]=useState(false);
  const[sGF,setSGF]=useState(false);
  const[sPin,setSPin]=useState("w8");
  const[sWD,setSWD]=useState(false);
  const[ciMsgs,setCiMsgs]=useState([
    {r:"ai",t:"Good morning. Your position as of 16 March:\n\nCash: ₹6.8Cr (₹0.7Cr below forecast). Revenue YTD: ₹525.3Cr vs ₹542.7Cr plan (3.2% behind). Gross margin: 35.8% (down 240bps). Working capital cycle: 23 days vs 12d target.\n\n7 items need attention. The most urgent connects a tactical AR overdue to a strategic cash corridor breach. Where would you like to start?",card:{type:"summary",data:[{l:"Cash",v:"₹6.8Cr",c:C.amber},{l:"Revenue Gap",v:"-₹17.4Cr",c:C.red},{l:"Margin",v:"35.8%",c:C.red},{l:"CCC",v:"23d",c:C.amber}]}},
    {r:"chips",o:["Walk me through Pinnacle","Revenue gap breakdown","Biggest risk this week?","Model the W9 cash fix","Working capital vs target"]},
  ]);
  const[ciInp,setCiInp]=useState("");

  const sLine=useMemo(()=>cf.map((w,i)=>{let v=w.fc;if(i>=4)v-=(sDSO-36)*0.15;if(sPin==="w11"&&i>=5&&i<=9)v-=0.4;if(sPin==="w6"&&i>=5)v+=0.3;if(sNW&&i===8)v+=1;if(sNW&&i===9)v-=0.6;if(sGF&&i===8)v+=0.8;if(sGF&&i===9)v-=0.5;if(sWD&&i>=6)v+=0.25;return Math.max(0,Math.round(v*10)/10);}),[sDSO,sNW,sGF,sPin,sWD]);
  const sAct=sDSO!==36||sNW||sGF||sPin!=="w8"||sWD;
  const sMin=Math.min(...sLine),sW13=sLine[12],sBr=sLine.filter(v=>v<4).length;
  const openE=useCallback(k=>setDrw(k),[]);
  const priC={hard:C.red,risk:C.amber,flex:C.blue,normal:C.muted};
  const tabNames={receivables:"Receivables",payables:"Payables",performance:"Revenue & Performance",cashflow:"Cash Flow & Working Capital"};

  return(
    <div className="overflow-auto" style={{fontFamily:F.mn,background:C.bg,height:"100vh",color:C.ink,display:"flex"}}>
      {drw&&<div onClick={()=>setDrw(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.1)",zIndex:190}}/>}
      {drw&&<Drawer key={drw} ek={drw} onClose={()=>setDrw(null)}/>}
      {expVar!==null&&<div onClick={()=>setExpVar(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.1)",zIndex:190}}/>}
      {expVar!==null&&<VarDrawer driver={varDrv[expVar]} onClose={()=>setExpVar(null)} onEntity={ek=>{setExpVar(null);openE(ek);}}/>}
      {trail&&<TrailModal card={trail} onClose={()=>setTrail(null)}/>}
      {disc&&<DiscussModal card={disc} onClose={()=>setDisc(null)}/>}

      {/* SIDE NAV */}
      <div style={{width:195,background:C.nav,borderRight:`1px solid ${C.bdr}`,position:"fixed",top:0,left:0,bottom:0,zIndex:80,display:"flex",flexDirection:"column"}}>
        <div style={{padding:"16px 14px"}}><div style={{fontSize:16,fontWeight:700}}>questt<span style={{color:C.accent}}>.</span></div><div style={{fontSize:10,color:C.muted,marginTop:1}}>Finance Intelligence Warehouse</div></div>
        <div style={{flex:1,padding:"0 6px",overflowY:"auto"}}>
          {[
            {group:"Intelligence",gc:C.muted,items:[{id:"brief",icon:"◉",label:"Morning Brief",badge:"7",bc:C.accent}]},
            {group:"Tactical",gc:C.blue,items:[{id:"receivables",icon:"↓",label:"Receivables",badge:"2",bc:C.red},{id:"payables",icon:"↑",label:"Payables",badge:"!",bc:C.amber}]},
            {group:"Strategic",gc:C.accent,items:[{id:"performance",icon:"▤",label:"Revenue & Performance"},{id:"cashflow",icon:"◎",label:"Cash Flow & Working Capital"}]},
            {group:"Conversational",gc:C.amber,items:[{id:"ci",icon:"◈",label:"Conversational Intelligence"}]},
          ].map(g=>(<div key={g.group}>
            <div style={{fontFamily:F.mo,fontSize:7,letterSpacing:"0.1em",color:g.gc,textTransform:"uppercase",padding:"10px 10px 3px"}}>{g.group}</div>
            {g.items.map(n=>(<button key={n.id} onClick={()=>{setTab(n.id);if(n.id==="receivables")setArSub("overview");}} style={{width:"100%",textAlign:"left",display:"flex",alignItems:"center",gap:8,padding:"8px 10px",marginBottom:1,borderRadius:6,border:"none",cursor:"pointer",background:tab===n.id?C.w:"transparent",boxShadow:tab===n.id?"0 1px 2px rgba(0,0,0,0.04)":"none"}}>
              <span style={{fontSize:12,opacity:tab===n.id?1:0.4}}>{n.icon}</span>
              <span style={{fontSize:11.5,fontWeight:tab===n.id?600:400,color:tab===n.id?C.ink:C.sub,lineHeight:1.2}}>{n.label}</span>
              {n.badge&&<span style={{marginLeft:"auto",fontFamily:F.mo,fontSize:8,fontWeight:600,background:n.bc||C.bdr,color:"#fff",padding:"1px 5px",borderRadius:7,minWidth:16,textAlign:"center"}}>{n.badge}</span>}
            </button>))}
          </div>))}
        </div>
        <div style={{padding:"12px 14px",borderTop:`1px solid ${C.bdr}`}}><div style={{fontFamily:F.mo,fontSize:8,color:C.muted}}>16 March 2026</div><div style={{display:"flex",alignItems:"center",gap:6,marginTop:4}}><div style={{width:20,height:20,borderRadius:"50%",background:C.accent,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,fontWeight:600}}>CF</div><span style={{fontSize:11}}>CFO View</span></div></div>
      </div>

      {/* CONTENT */}
      <div style={{marginLeft:195,flex:1}}><div style={{maxWidth:920,margin:"0 auto",padding:"22px 26px 80px"}}>

        {/* ═══ MORNING BRIEF ═══ */}
        {tab==="brief"&&(<div>
          <div style={{marginBottom:16}}><h1 style={{fontFamily:F.sr,fontSize:21,fontWeight:700,margin:0}}>Morning Brief</h1><p style={{fontSize:12,color:C.sub,marginTop:3}}>Monday, 16 March 2026. 7 items ranked by compound impact.</p></div>
          {brief.map(card=>{const u=URG[card.lv],ly=LAY[card.ly],isO=openC===card.id;return(
            <div key={card.id} style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,marginBottom:6,overflow:"hidden",borderLeft:`3px solid ${ly.c}`,boxShadow:isO?"0 1px 6px rgba(0,0,0,0.03)":"none"}}>
              <div onClick={()=>setOpenC(isO?null:card.id)} style={{padding:"12px 14px",cursor:"pointer",display:"flex",gap:10,alignItems:"flex-start"}}>
                <div style={{width:6,height:6,borderRadius:"50%",background:u.c,marginTop:6,flexShrink:0}}/>
                <div style={{flex:1}}><div style={{display:"flex",gap:4,marginBottom:3}}><Tag bg={u.bg} c={u.c}>{u.l}</Tag><Tag bg={ly.bg} c={ly.c}>{ly.l}</Tag></div><div style={{fontFamily:F.sr,fontSize:13.5,fontWeight:700,lineHeight:1.3,marginBottom:2}}>{card.title}</div><div style={{fontSize:11,color:C.sub,lineHeight:1.4}}>{card.sub}</div></div>
                <span style={{color:C.muted,fontSize:13,marginTop:2,transition:"transform 0.2s",transform:isO?"rotate(180deg)":"none"}}>▾</span>
              </div>
              {isO&&(<div style={{padding:"0 14px 12px 30px",borderTop:`1px solid ${C.bdr}`}}><div style={{paddingTop:10}}>
                <div style={{fontFamily:F.mo,fontSize:8,letterSpacing:"0.08em",color:C.muted,textTransform:"uppercase",marginBottom:4}}>Evidence</div>
                {card.ev.map((e,i)=><div key={i} style={{fontSize:11,color:C.sub,lineHeight:1.5,marginBottom:3,paddingLeft:8,borderLeft:`2px solid ${C.bdr}`}}>{e}</div>)}
                <div style={{fontFamily:F.mo,fontSize:8,letterSpacing:"0.08em",color:C.accent,textTransform:"uppercase",marginBottom:3,marginTop:8}}>Recommendation</div>
                <div style={{fontSize:11,lineHeight:1.5,background:C.al,padding:"8px 10px",borderRadius:5,marginBottom:10}}>{card.rec}</div>
                <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
                  {card.ek&&<button onClick={()=>openE(card.ek)} style={{fontFamily:F.mo,fontSize:9,padding:"4px 9px",borderRadius:4,border:`1px solid ${C.accent}33`,background:C.al,color:C.accent,cursor:"pointer"}}>◉ {E[card.ek]?.name}</button>}
                  <button onClick={()=>setTrail(card)} style={{fontFamily:F.mo,fontSize:9,padding:"4px 9px",borderRadius:4,border:`1px solid ${C.amber}33`,background:C.aml,color:C.amber,cursor:"pointer"}}>◇ Trail</button>
                  <button onClick={()=>setDisc(card)} style={{fontFamily:F.mo,fontSize:9,padding:"4px 9px",borderRadius:4,border:`1px solid ${C.blue}33`,background:C.bl,color:C.blue,cursor:"pointer"}}>◈ Discuss</button>
                  {card.go&&card.go.map(g=><button key={g} onClick={()=>setTab(g)} style={{fontFamily:F.mo,fontSize:9,padding:"4px 9px",borderRadius:4,border:`1px solid ${C.bdr}`,background:C.w,color:C.sub,cursor:"pointer"}}>→ {tabNames[g]||g}</button>)}
                </div>
              </div></div>)}
            </div>);})}
        </div>)}

        {/* ═══ RECEIVABLES ═══ */}
        {tab==="receivables"&&(<div>
          <div style={{marginBottom:12}}><h1 style={{fontFamily:F.sr,fontSize:21,fontWeight:700,margin:0}}>Receivables</h1><p style={{fontSize:12,color:C.sub,marginTop:3}}>Customer portfolio, collections pipeline, and reconciliation. Click any row for entity profile.</p></div>
          <div style={{display:"flex",gap:0,marginBottom:16,borderBottom:`1px solid ${C.bdr}`}}>
            {[{id:"overview",l:"Overview"},{id:"customers",l:"Customers"},{id:"collections",l:"Collections"},{id:"recon",l:"Reconciliation"}].map(s=>(<button key={s.id} onClick={()=>setArSub(s.id)} style={{fontFamily:F.mn,fontSize:11.5,fontWeight:arSub===s.id?600:400,color:arSub===s.id?C.accent:C.muted,background:"none",border:"none",cursor:"pointer",padding:"8px 14px",borderBottom:arSub===s.id?`2px solid ${C.accent}`:"2px solid transparent"}}>{s.l}</button>))}
          </div>

          {arSub==="overview"&&(<div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:16}}>
              <Stat label="Total Receivables" value="₹34.0Cr" sub="142 invoices, 38 accounts" trend="DSO: 36d (target 32d)" tc={C.amber}/>
              <Stat label="Overdue" value="₹4.9Cr" sub="14.4% of total" trend="▲ 2.1% MoM" tc={C.red}/>
              <Stat label="Auto-match Rate" value="87%" sub="9% manual, 4% unmatched" trend="▲ 3% vs last month" tc={C.accent}/>
              <Stat label="Provision" value="₹39.9L" sub="ECL (IFRS 9)" trend="₹34.5L = Pinnacle alone"/>
            </div>
            <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,padding:"12px 14px",marginBottom:16}}>
              <div style={{fontFamily:F.sr,fontSize:13,fontWeight:700,marginBottom:2}}>AR Ageing</div>
              <div style={{fontSize:10.5,color:C.muted,marginBottom:6}}>Click any bucket to see accounts.</div>
              <div style={{display:"flex",borderRadius:4,overflow:"hidden",height:14,marginBottom:6,cursor:"pointer"}}>{arAge.map((d,i)=><div key={i} onClick={()=>setSelAge(selAge===d.b?null:d.b)} style={{width:`${d.p}%`,background:d.c,opacity:selAge&&selAge!==d.b?0.3:1,transition:"opacity 0.15s"}}/>)}</div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{arAge.map((d,i)=><span key={i} onClick={()=>setSelAge(selAge===d.b?null:d.b)} style={{display:"flex",alignItems:"center",gap:3,fontSize:10,fontFamily:F.mo,cursor:"pointer",opacity:selAge&&selAge!==d.b?0.4:1}}><span style={{width:6,height:6,borderRadius:2,background:d.c}}/><span style={{color:C.sub}}>{d.b}</span><span style={{fontWeight:600}}>₹{d.a}Cr</span></span>)}</div>
              {selAge&&ageAccounts[selAge]&&(<div style={{marginTop:8,background:C.bg,borderRadius:5,padding:"8px 10px",border:`1px solid ${C.accent}22`}}>
                <div style={{fontFamily:F.mo,fontSize:8,color:C.accent,textTransform:"uppercase",marginBottom:4}}>Accounts in {selAge}</div>
                {ageAccounts[selAge].map((a,i)=>(<div key={i} onClick={()=>a.ek&&openE(a.ek)} style={{display:"flex",justifyContent:"space-between",padding:"4px 0",borderBottom:`1px solid ${C.bdr}`,cursor:a.ek?"pointer":"default",fontSize:11}}>
                  <span style={{color:a.ek?C.accent:C.ink,fontWeight:a.ek?500:400}}>{a.ent}</span>
                  <div style={{display:"flex",gap:8}}><span style={{fontFamily:F.mo,fontSize:10,color:C.red}}>{a.days}d</span><span style={{fontFamily:F.mo,fontSize:10,fontWeight:600}}>{a.amt}</span></div>
                </div>))}
                <div style={{fontFamily:F.mo,fontSize:9,color:C.muted,marginTop:4}}>Showing {ageAccounts[selAge].length} of {arAge.find(a=>a.b===selAge)?.a>1?Math.floor(Math.random()*8+4):Math.floor(Math.random()*3+1)} accounts · <span style={{color:C.accent,cursor:"pointer"}}>View all →</span></div>
              </div>)}
              {!selAge&&<div style={{fontSize:10.5,color:C.sub,marginTop:4,fontStyle:"italic"}}>61-90d grew 22% this month (Pinnacle ₹2.3Cr + Clearview ₹0.37Cr). Both flagged in Morning Brief.</div>}
            </div>
            <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,overflow:"hidden"}}><div style={{padding:"10px 14px",borderBottom:`1px solid ${C.bdr}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontFamily:F.sr,fontSize:13,fontWeight:700}}>Recent AR</span><span style={{fontFamily:F.mo,fontSize:9,color:C.muted}}>Showing 3 of 142 transactions · <span style={{color:C.accent,cursor:"pointer"}}>View all →</span></span></div>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:11.5}}><thead><tr style={{borderBottom:`1px solid ${C.bdr}`}}>{["ID","Date","Entity","Amount","Status",""].map(h=><th key={h} style={{padding:"5px 12px",textAlign:"left",fontFamily:F.mo,fontSize:8,fontWeight:600,color:C.muted,textTransform:"uppercase"}}>{h}</th>)}</tr></thead><tbody>{txns.filter(t=>t.ty==="AR").map(tx=><tr key={tx.id} onClick={()=>tx.ek&&openE(tx.ek)} style={{borderBottom:`1px solid ${C.bdr}`,cursor:tx.ek?"pointer":"default"}} onMouseEnter={e=>{if(tx.ek)e.currentTarget.style.background=C.al+"44"}} onMouseLeave={e=>e.currentTarget.style.background="transparent"}><td style={{padding:"7px 12px",fontFamily:F.mo,fontSize:10,color:C.sub}}>{tx.id}</td><td style={{padding:"7px 12px",color:C.sub}}>{tx.dt}</td><td style={{padding:"7px 12px",fontWeight:500}}>{tx.ent}</td><td style={{padding:"7px 12px",fontFamily:F.mo,fontSize:11,fontWeight:600,color:C.accent}}>{tx.amt}</td><td style={{padding:"7px 12px",fontSize:10.5,color:C.sub}}>{tx.st}</td><td style={{padding:"7px 12px"}}>{tx.fl&&<Tag bg={C.rl} c={C.red}>{tx.fl}</Tag>}</td></tr>)}</tbody></table>
            </div>
            <ChatInput placeholder="e.g. Show me all overdue above ₹1Cr"/>
          </div>)}

          {arSub==="customers"&&(<div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:16}}>
              <Stat label="Active Accounts" value="38" sub="6 on watchlist" trend="2 deteriorating"/>
              <Stat label="Top 3 Concentration" value="62%" sub="Pinnacle 11%, Metro 7%, Clearview 4%"/>
              <Stat label="Credit Utilization" value="64%" sub="Avg across portfolio" trend="Pinnacle: 76%" tc={C.amber}/>
              <Stat label="Limit Breaches" value="1" sub="Pinnacle approaching" trend="Review triggered" tc={C.red}/>
            </div>
            {/* Risk distribution */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
              <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,padding:"12px 14px"}}>
                <div style={{fontFamily:F.sr,fontSize:13,fontWeight:700,marginBottom:8}}>Risk Distribution</div>
                <div style={{display:"flex",gap:6}}>
                  {[{l:"Low Risk (80+)",n:18,c:C.accent},{l:"Medium (60-79)",n:14,c:C.amber},{l:"High (<60)",n:6,c:C.red}].map((b,i)=>(<div key={i} style={{flex:b.n,background:b.c+"18",borderRadius:4,padding:"8px 10px",border:`1px solid ${b.c}22`}}><div style={{fontFamily:F.sr,fontSize:18,fontWeight:700,color:b.c}}>{b.n}</div><div style={{fontSize:9,color:C.sub,marginTop:2}}>{b.l}</div></div>))}
                </div>
              </div>
              <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,padding:"12px 14px"}}>
                <div style={{fontFamily:F.sr,fontSize:13,fontWeight:700,marginBottom:8}}>Exposure by Region</div>
                {[{r:"North",v:11.8,p:35},{r:"South",v:9.2,p:27},{r:"West",v:8.4,p:25},{r:"East",v:4.6,p:13}].map((r,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><span style={{fontSize:11,minWidth:40}}>{r.r}</span><div style={{flex:1,height:5,borderRadius:2,background:C.bdr}}><div style={{height:5,borderRadius:2,width:`${r.p}%`,background:C.accent}}/></div><span style={{fontFamily:F.mo,fontSize:10,minWidth:45,textAlign:"right"}}>₹{r.v}Cr</span></div>))}
              </div>
            </div>
            {/* Portfolio table */}
            <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,overflow:"hidden"}}>
              <div style={{padding:"10px 14px",borderBottom:`1px solid ${C.bdr}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontFamily:F.sr,fontSize:13,fontWeight:700}}>Customer Portfolio</span><span style={{fontFamily:F.mo,fontSize:9,color:C.muted}}>Showing 6 of 38 accounts · <span style={{color:C.accent,cursor:"pointer"}}>View all →</span></span></div>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}><thead><tr style={{borderBottom:`1px solid ${C.bdr}`}}>{["Customer","Region","Limit","Utilized","DSO","Overdue","Risk"].map(h=><th key={h} style={{padding:"5px 10px",textAlign:"left",fontFamily:F.mo,fontSize:8,fontWeight:600,color:C.muted,textTransform:"uppercase"}}>{h}</th>)}</tr></thead>
                <tbody>{custPort.map((c,i)=>{const nm=c.ek?E[c.ek]?.name:c.name;const rc=c.risk>=80?C.accent:c.risk>=60?C.amber:C.red;return(<tr key={i} onClick={()=>c.ek&&openE(c.ek)} style={{borderBottom:`1px solid ${C.bdr}`,cursor:c.ek?"pointer":"default",background:c.st==="breach"?C.rl+"22":"transparent"}} onMouseEnter={e=>{if(c.ek)e.currentTarget.style.background=C.al+"44"}} onMouseLeave={e=>e.currentTarget.style.background=c.st==="breach"?C.rl+"22":"transparent"}><td style={{padding:"7px 10px",fontWeight:500}}>{nm}</td><td style={{padding:"7px 10px",fontSize:10,color:C.sub}}>{c.region}</td><td style={{padding:"7px 10px",fontFamily:F.mo,fontSize:10}}>{c.limit}</td><td style={{padding:"7px 10px"}}><div style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:40,height:4,borderRadius:2,background:C.bdr}}><div style={{height:4,borderRadius:2,width:`${c.pct}%`,background:c.pct>75?C.red:c.pct>60?C.amber:C.accent}}/></div><span style={{fontFamily:F.mo,fontSize:9}}>{c.pct}%</span></div></td><td style={{padding:"7px 10px",fontFamily:F.mo,fontSize:10,color:c.dso>35?C.amber:C.accent}}>{c.dso}d</td><td style={{padding:"7px 10px",fontFamily:F.mo,fontSize:10,color:c.over!=="₹0"?C.red:C.accent}}>{c.over}</td><td style={{padding:"7px 10px"}}><span style={{fontFamily:F.mo,fontSize:10,fontWeight:700,color:rc}}>{c.risk}</span></td></tr>);})}</tbody>
              </table>
            </div>
            <Callout color={C.amber} icon="⚠">Top 3 customers = 62% of AR. Pinnacle at 76% credit utilization with deteriorating DSO. If risk score drops below 65, IW recommends reducing limit to ₹3Cr and requiring advance payment on new orders.</Callout>
            <ChatInput placeholder="e.g. Which customers have deteriorating payment patterns?"/>
          </div>)}

          {arSub==="collections"&&(<div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:16}}>
              <Stat label="Total Overdue" value="₹4.9Cr" sub="8 accounts" trend="▲ from ₹3.6Cr" tc={C.red}/>
              <Stat label="In Dunning" value="5" sub="3 auto, 1 manual, 1 legal"/>
              <Stat label="Collection Rate" value="72%" sub="Resolved in 30d" trend="South 84% · West 61%" tc={C.amber}/>
              <Stat label="Provision" value="₹39.9L" sub="₹34.5L = Pinnacle" tc={C.red}/>
            </div>
            {/* Ageing waterfall */}
            <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,padding:"12px 14px",marginBottom:14}}>
              <div style={{fontFamily:F.sr,fontSize:13,fontWeight:700,marginBottom:2}}>Ageing Movement (Feb → Mar)</div>
              <div style={{fontSize:10.5,color:C.muted,marginBottom:8}}>How overdue AR flowed between buckets this month. Red = deterioration, green = resolution.</div>
              {ageWaterfall.map((f,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<ageWaterfall.length-1?`1px solid ${C.bdr}`:"none"}}>
                <div style={{display:"flex",alignItems:"center",gap:4,minWidth:180}}>
                  <Tag bg={f.to==="Resolved"||f.to==="Write-off"?C.gl:C.rl} c={f.to==="Resolved"||f.to==="Write-off"?C.green:C.red}>{f.from}</Tag>
                  <span style={{fontSize:10,color:C.muted}}>→</span>
                  <Tag bg={f.to==="Resolved"?C.gl:f.to==="Write-off"?C.aml:C.rl} c={f.to==="Resolved"?C.green:f.to==="Write-off"?C.amber:C.red}>{f.to}</Tag>
                </div>
                <span style={{fontFamily:F.mo,fontSize:11,fontWeight:600,color:f.to==="Resolved"?C.green:C.red,minWidth:50}}>₹{f.amt}Cr</span>
                <span style={{fontSize:10,color:C.sub,flex:1}}>{f.note}</span>
              </div>))}
              <Callout color={C.accent} icon="✓">South dunning resolved ₹4.2Cr from 1-30d bucket — 60% improvement vs manual. But ₹1.4Cr flowed into 61-90d (Pinnacle), which is now the largest single-entity overdue.</Callout>
            </div>
            {/* Pipeline */}
            <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,padding:"12px 14px",marginBottom:14}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}><div style={{fontFamily:F.sr,fontSize:13,fontWeight:700}}>Collections Pipeline</div><span style={{fontFamily:F.mo,fontSize:9,color:C.muted}}>Showing 5 of 8 overdue accounts</span></div>
              {colls.map((c,i)=>{const pc=c.pri==="critical"?C.red:c.pri==="attention"?C.amber:c.pri==="watch"?C.blue:C.muted;const nm=c.ek?E[c.ek]?.name:c.name;return(
                <div key={i} onClick={()=>c.ek&&openE(c.ek)} style={{display:"flex",gap:10,padding:"10px 0",borderBottom:i<colls.length-1?`1px solid ${C.bdr}`:"none",cursor:c.ek?"pointer":"default"}}>
                  <div style={{width:4,borderRadius:2,background:pc,alignSelf:"stretch",flexShrink:0}}/>
                  <div style={{flex:1}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{fontSize:12,fontWeight:500}}>{nm}</span><span style={{fontFamily:F.mo,fontSize:11,fontWeight:700,color:C.red}}>{c.amt}</span></div><div style={{display:"flex",gap:6,marginBottom:4}}><Tag bg={C.rl} c={C.red}>{c.days}d overdue</Tag><Tag bg={C.bg} c={C.sub}>{c.bucket}</Tag><Tag bg={C.bl} c={C.blue}>{c.dunning}</Tag></div><div style={{fontSize:10.5,color:C.sub}}><span style={{fontWeight:500}}>Next:</span> {c.next}</div></div>
                </div>);})}
            </div>
            {/* Provisioning */}
            <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,padding:"12px 14px"}}><div style={{fontFamily:F.sr,fontSize:13,fontWeight:700,marginBottom:6}}>Provisioning (ECL)</div>
              {prov.map((p,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"5px 0",borderBottom:i<prov.length-1?`1px solid ${C.bdr}`:"none"}}><span style={{fontSize:11,minWidth:50}}>{p.b}</span><span style={{fontFamily:F.mo,fontSize:10,color:C.sub,minWidth:55}}>{p.o}</span><span style={{fontFamily:F.mo,fontSize:10,color:C.muted}}>× {p.r}</span><span style={{fontFamily:F.mo,fontSize:10,fontWeight:600,color:C.red,marginLeft:"auto"}}>{p.p}</span></div>))}
              <div style={{display:"flex",justifyContent:"space-between",marginTop:6,paddingTop:6,borderTop:`1px solid ${C.bdr}`}}><span style={{fontWeight:600}}>Total</span><span style={{fontFamily:F.mo,fontWeight:700,color:C.red}}>₹39.9L</span></div>
            </div>
            <ChatInput placeholder="e.g. Fastest way to get overdue below ₹3Cr?"/>
          </div>)}

          {arSub==="recon"&&(<div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:16}}>
              <Stat label="Auto-match" value="87%" trend="▲ 3% MoM" tc={C.accent}/>
              <Stat label="Unmatched" value="2" sub="₹4.8L pending"/>
              <Stat label="Disputes" value="1" sub="₹2.1L under review"/>
              <Stat label="Overpayments" value="1" sub="₹0.92L pending" trend="Credit note unverified" tc={C.amber}/>
            </div>
            {/* Match rate trend */}
            <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,padding:"12px 14px",marginBottom:14}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <div><div style={{fontFamily:F.sr,fontSize:13,fontWeight:700}}>Auto-match Rate Trend</div><div style={{fontSize:10.5,color:C.muted,marginTop:2}}>Improving since IW duplicate detection went live in Sep. Target: 92%.</div></div>
                <Spark data={reconTrend} color={C.accent} w={120} h={28}/>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",fontFamily:F.mo,fontSize:9,color:C.muted}}>{["Oct","Nov","Dec","Jan","Feb","Mar"].map((m,i)=><span key={i}>{m}: {reconTrend[i]}%</span>)}</div>
            </div>
            {/* Items */}
            <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,padding:"12px 14px",marginBottom:14}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}><div style={{fontFamily:F.sr,fontSize:13,fontWeight:700}}>Items Requiring Action</div><span style={{fontFamily:F.mo,fontSize:9,color:C.muted}}>Showing 6 of 14 items · <span style={{color:C.accent,cursor:"pointer"}}>View all →</span></span></div>
              {reconItems.map((r,i)=>{const tc=r.type==="Overpayment"?C.amber:r.type==="Dispute"?C.amber:r.type==="Partial"?C.blue:r.type==="Gift Card"?C.accent:C.muted;return(
                <div key={i} onClick={()=>r.ek&&openE(r.ek)} style={{padding:"8px 0",borderBottom:i<reconItems.length-1?`1px solid ${C.bdr}`:"none",cursor:r.ek?"pointer":"default"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3}}>
                    <div style={{display:"flex",alignItems:"center",gap:6}}><Tag bg={tc+"18"} c={tc}>{r.type}</Tag><span style={{fontSize:12,fontWeight:500}}>{r.ent}</span></div>
                    <div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontFamily:F.mo,fontSize:9,color:C.muted}}>{r.dt} ({r.age}d ago)</span><span style={{fontFamily:F.mo,fontSize:11,fontWeight:700}}>{r.amt}</span></div>
                  </div>
                  <div style={{fontSize:10.5,color:C.sub}}>{r.note}</div>
                </div>);})}
            </div>
            <Callout color={C.amber} icon="⚠">2 unmatched payments totalling ₹4.8L have been sitting for over a week. The Pinnacle ₹4.2L is likely an advance but needs confirmation before applying to INV-4471. Gift card reconciliation running at 94% auto-match; remaining 6% are denomination mismatches that need manual review.</Callout>
            <ChatInput placeholder="e.g. Show unmatched payments older than 7 days"/>
          </div>)}
        </div>)}

        {/* ═══ PAYABLES ═══ */}
        {tab==="payables"&&(<div>
          <div style={{marginBottom:16}}><h1 style={{fontFamily:F.sr,fontSize:21,fontWeight:700,margin:0}}>Payables</h1><p style={{fontSize:12,color:C.sub,marginTop:3}}>Vendor payments, health scores, term changes, and upcoming obligations. Click any row for entity profile.</p></div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:16}}>
            <Stat label="Total Payables" value="₹26.0Cr" sub="98 invoices, 24 vendors" trend="DPO: 41d (target 45d)" tc={C.amber}/>
            <Stat label="Due Next 7 Days" value="₹6.4Cr" sub="Atlas + Northway + Greenfield" trend="W9 convergence" tc={C.red}/>
            <Stat label="Held/Blocked" value="₹0.87L" sub="Kiran duplicate" trend="Auto-held"/>
            <Stat label="Early-pay Savings" value="₹4.2L/yr" sub="If 3 vendors accept 2/10" trend="Working capital neutral"/>
          </div>
          <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,padding:"12px 14px",marginBottom:14}}>
            <div style={{fontFamily:F.sr,fontSize:13,fontWeight:700,marginBottom:2}}>AP Ageing</div>
            <AgeBar data={apAge} note="Clean. 77% within terms. Week 9 convergence (₹6.4Cr in 4 days) is the only pressure point."/>
          </div>
          {/* Vendor health */}
          <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,overflow:"hidden",marginBottom:14}}>
            <div style={{padding:"10px 14px",borderBottom:`1px solid ${C.bdr}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontFamily:F.sr,fontSize:13,fontWeight:700}}>Vendor Health</span><span style={{fontFamily:F.mo,fontSize:9,color:C.muted}}>Showing 5 of 24 vendors · <span style={{color:C.accent,cursor:"pointer"}}>View all →</span></span></div>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}><thead><tr style={{borderBottom:`1px solid ${C.bdr}`}}>{["Vendor","Health","Terms","On-Time","Volume","Renewal","Flag"].map(h=><th key={h} style={{padding:"5px 10px",textAlign:"left",fontFamily:F.mo,fontSize:8,fontWeight:600,color:C.muted,textTransform:"uppercase"}}>{h}</th>)}</tr></thead>
              <tbody>{vendorHealth.map((v,i)=>{const nm=E[v.ek]?.name;const hc=v.health>=80?C.accent:v.health>=60?C.amber:C.red;return(<tr key={i} onClick={()=>openE(v.ek)} style={{borderBottom:`1px solid ${C.bdr}`,cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.background=C.al+"44"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}><td style={{padding:"7px 10px",fontWeight:500}}>{nm}</td><td style={{padding:"7px 10px"}}><span style={{fontFamily:F.mo,fontSize:10,fontWeight:700,color:hc}}>{v.health}</span></td><td style={{padding:"7px 10px",fontSize:10}}>{v.terms}</td><td style={{padding:"7px 10px",fontFamily:F.mo,fontSize:10}}>{v.onTime}</td><td style={{padding:"7px 10px",fontFamily:F.mo,fontSize:10}}>{v.vol}</td><td style={{padding:"7px 10px",fontSize:10,color:C.sub}}>{v.renewal}</td><td style={{padding:"7px 10px"}}>{v.flag&&<span style={{fontSize:9.5,color:C.amber}}>{v.flag}</span>}</td></tr>);})}</tbody>
            </table>
          </div>
          {/* Term change tracker */}
          <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,padding:"12px 14px",marginBottom:14}}>
            <div style={{fontFamily:F.sr,fontSize:13,fontWeight:700,marginBottom:2}}>Term Change Requests</div>
            <div style={{fontSize:10.5,color:C.muted,marginBottom:8}}>4 vendors requesting shorter terms. Combined impact: ₹2.8Cr/month hits 15 days earlier.</div>
            {termChanges.map((t,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<termChanges.length-1?`1px solid ${C.bdr}`:"none"}}>
              <span style={{fontSize:11.5,fontWeight:500,minWidth:130}}>{t.vendor}</span>
              <span style={{fontFamily:F.mo,fontSize:10,color:C.muted}}>{t.current} → {t.requested}</span>
              <span style={{fontFamily:F.mo,fontSize:10,color:C.red,flex:1}}>{t.impact}</span>
              <Tag bg={t.rec==="Accept"?C.gl:C.aml} c={t.rec==="Accept"?C.green:C.amber}>{t.rec}</Tag>
            </div>))}
          </div>
          {/* Upcoming */}
          <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,padding:"12px 14px",marginBottom:14}}>
            <div style={{fontFamily:F.sr,fontSize:13,fontWeight:700,marginBottom:6}}>Upcoming Payments</div>
            {upcom.map((p,i)=><div key={i} onClick={()=>p.ek&&openE(p.ek)} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 8px",marginBottom:2,borderRadius:4,cursor:p.ek?"pointer":"default",background:p.pri==="hard"?C.rl+"44":p.pri==="risk"?C.aml+"44":"transparent",borderLeft:`3px solid ${priC[p.pri]||C.bdr}`}}><span style={{fontFamily:F.mo,fontSize:10,color:C.sub,minWidth:42}}>{p.dt}</span><span style={{fontSize:11.5,fontWeight:500,flex:1}}>{p.ent}</span><span style={{fontFamily:F.mo,fontSize:11,fontWeight:600,minWidth:50,textAlign:"right"}}>{p.amt}</span>{p.note&&<span style={{fontSize:9.5,color:priC[p.pri],maxWidth:150}}>{p.note}</span>}</div>)}
            <Callout color={C.red} icon="▼">Week 9 convergence: ₹6.4Cr in 4 days. Shift Northway + Greenfield to flatten from ₹11.2Cr to ₹7.8Cr. Model in Cash Flow & Working Capital.</Callout>
          </div>
          <ChatInput placeholder="e.g. Which vendors have the most flexible terms?"/>
        </div>)}

        {/* ═══ REVENUE & PERFORMANCE ═══ */}
        {tab==="performance"&&(<div>
          <div style={{marginBottom:16}}><h1 style={{fontFamily:F.sr,fontSize:21,fontWeight:700,margin:0}}>Revenue & Performance</h1><p style={{fontSize:12,color:C.sub,marginTop:3}}>Plan vs actual, margins, budget, variance drivers. Click any variance driver for the full breakdown.</p></div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:8,marginBottom:16}}>
            <Stat label="YTD Revenue" value="₹525.3Cr" sub="vs ₹542.7Cr plan" trend="▼ 3.2%" tc={C.red}/>
            <Stat label="Full-Year Est." value="₹574.8Cr" sub="vs ₹594.7Cr plan" trend="Recovery: ₹588.2Cr" tc={C.amber}/>
            <Stat label="Gross Margin" value="35.8%" sub="vs 38.2% Apr" trend="▼ 240bps" tc={C.red}/>
            <Stat label="EBITDA" value="₹59.9Cr" sub="vs ₹76.4Cr plan" trend="11.4% vs 14.1% plan" tc={C.red}/>
            <Stat label="Cost Overrun" value="₹10.7Cr" sub="RM + Logistics" trend="₹6.6Cr trade offset avail" tc={C.amber}/>
          </div>

          {/* Revenue chart — clickable */}
          <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,padding:"14px 16px",marginBottom:14}}>
            <div style={{fontFamily:F.sr,fontSize:14,fontWeight:700,marginBottom:2}}>Revenue: Plan vs Actual</div>
            <div style={{fontSize:10.5,color:C.muted,marginBottom:10}}>Click any month for regional split and variance drivers.</div>
            <div style={{position:"relative"}}>
              <div style={{display:"flex",alignItems:"flex-end",gap:4,height:130,marginBottom:6}}>
                {rev.map((m,i)=>{const ac=m.ac||m.fc,mx=56,v=ac-m.pl;const isSel=selMonth===m.m;return(<div key={i} onClick={()=>setSelMonth(isSel?null:m.m)} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:1,cursor:"pointer",opacity:selMonth&&!isSel?0.4:1,transition:"opacity 0.15s"}}><div style={{fontSize:8,fontFamily:F.mo,color:v>=0?C.accent:C.red,fontWeight:600}}>{v>=0?"+":""}{Math.round(v*10)/10}</div><div style={{width:"100%",display:"flex",gap:1,alignItems:"flex-end"}}><div style={{flex:1,height:(m.pl/mx)*100,background:C.bdr,borderRadius:"2px 2px 0 0",opacity:0.5}}/><div style={{flex:1,height:(ac/mx)*100,background:v>=0?C.accent:C.red,borderRadius:"2px 2px 0 0",opacity:m.ac===null?0.35:isSel?1:0.75}}/></div><span style={{fontSize:8,fontFamily:F.mo,color:isSel?C.accent:C.muted,fontWeight:isSel?700:400}}>{m.m}</span></div>);})}
              </div>
              <div style={{position:"absolute",top:0,left:0,right:0,display:"flex",pointerEvents:"none"}}>{[{l:"Q1: -₹0.6Cr",c:C.accent},{l:"Q2: -₹4.5Cr",c:C.amber},{l:"Q3: -₹7.1Cr",c:C.red},{l:"Q4e: -₹5.2Cr",c:C.red}].map((q,i)=>(<div key={i} style={{flex:3,margin:"0 1px",display:"flex",justifyContent:"center",paddingTop:2}}><span style={{fontFamily:F.mo,fontSize:7,color:q.c,background:q.c+"15",padding:"1px 5px",borderRadius:3}}>{q.l}</span></div>))}</div>
            </div>
            {/* Month detail panel */}
            {selMonth&&monthDetail[selMonth]&&(()=>{const md=monthDetail[selMonth];const mr=rev.find(r=>r.m===selMonth);const v=(mr.ac||mr.fc)-mr.pl;return(
              <div style={{background:C.bg,borderRadius:6,padding:"10px 14px",marginTop:8,border:`1px solid ${C.accent}22`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                  <span style={{fontFamily:F.sr,fontSize:13,fontWeight:700}}>{selMonth} Detail</span>
                  <div style={{display:"flex",gap:8,alignItems:"center"}}>
                    <span style={{fontFamily:F.mo,fontSize:10,color:C.muted}}>Plan: ₹{mr.pl}Cr</span>
                    <span style={{fontFamily:F.mo,fontSize:10,fontWeight:600}}>Actual: ₹{mr.ac||mr.fc}Cr</span>
                    <span style={{fontFamily:F.mo,fontSize:10,fontWeight:700,color:v>=0?C.accent:C.red}}>{v>=0?"+":""}₹{Math.round(Math.abs(v)*10)/10}Cr</span>
                    <button onClick={()=>setSelMonth(null)} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:12}}>×</button>
                  </div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                  <div>
                    <div style={{fontFamily:F.mo,fontSize:8,color:C.muted,textTransform:"uppercase",marginBottom:4}}>By Region</div>
                    {md.regions.map((r,i)=>{const rv=r.ac-r.pl;return(<div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"3px 0",borderBottom:`1px solid ${C.bdr}`}}>
                      <span style={{fontSize:11}}>{r.r}</span>
                      <div style={{display:"flex",gap:6}}><span style={{fontFamily:F.mo,fontSize:10,color:C.muted}}>₹{r.ac}Cr</span><span style={{fontFamily:F.mo,fontSize:10,fontWeight:600,color:rv>=0?C.accent:C.red}}>{rv>=0?"+":""}{Math.round(rv*10)/10}</span></div>
                    </div>);})}
                  </div>
                  <div>
                    <div style={{fontFamily:F.mo,fontSize:8,color:C.muted,textTransform:"uppercase",marginBottom:4}}>Top Variance Drivers</div>
                    {md.topVar.map((d,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",padding:"3px 0",borderBottom:`1px solid ${C.bdr}`}}>
                      <span style={{fontSize:11}}>{d.d}</span>
                      <span style={{fontFamily:F.mo,fontSize:10,fontWeight:600,color:d.v>=0?C.accent:C.red}}>{d.v>=0?"+":""}₹{Math.abs(d.v)}Cr</span>
                    </div>))}
                  </div>
                </div>
              </div>);}
            )()}
            {!selMonth&&<Callout color={C.red} icon="▼">Gap accelerating. Q3 miss alone (₹7.1Cr) exceeds Q1+Q2 combined. South distribution and West pricing are the fixable drivers. Without intervention, full-year lands at ₹574.8Cr (₹19.9Cr below plan).</Callout>}
          </div>

          {/* Regional breakdown */}
          <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,padding:"12px 14px",marginBottom:14}}>
            <div style={{fontFamily:F.sr,fontSize:13,fontWeight:700,marginBottom:8}}>Regional Breakdown</div>
            {regRev.map((r,i)=>{const pctBar=Math.abs(r.pct);return(<div key={i} style={{padding:"8px 0",borderBottom:i<regRev.length-1?`1px solid ${C.bdr}`:"none"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3}}>
                <span style={{fontSize:12,fontWeight:600}}>{r.r}</span>
                <span style={{fontFamily:F.mo,fontSize:11,fontWeight:700,color:r.var>=0?C.accent:C.red}}>{r.var>=0?"+":""}₹{Math.abs(r.var)}Cr ({r.pct>0?"+":""}{r.pct}%)</span>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                <span style={{fontFamily:F.mo,fontSize:10,color:C.muted,minWidth:80}}>Plan: ₹{r.plan}Cr</span>
                <span style={{fontFamily:F.mo,fontSize:10,color:C.sub,minWidth:80}}>Actual: ₹{r.actual}Cr</span>
                <div style={{flex:1,height:5,borderRadius:2,background:C.bdr}}><div style={{height:5,borderRadius:2,width:`${Math.min(pctBar*8,100)}%`,background:r.var>=0?C.accent:C.red}}/></div>
              </div>
              <div style={{fontSize:10,color:C.sub,fontStyle:"italic"}}>{r.note}</div>
            </div>);})}
          </div>

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14}}>
            {/* Variance drivers — click opens side panel */}
            <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,padding:"12px 14px"}}>
              <div style={{fontFamily:F.sr,fontSize:13,fontWeight:700,marginBottom:6}}>Variance Drivers</div>
              {varDrv.map((d,i)=>(<div key={i} onClick={()=>setExpVar(i)} style={{padding:"6px 0",borderBottom:i<varDrv.length-1?`1px solid ${C.bdr}`:"none",cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.background=C.bg} onMouseLeave={e=>e.currentTarget.style.background="transparent"}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontSize:11.5,fontWeight:500}}>{d.d}</span><div style={{display:"flex",alignItems:"center",gap:4}}><span style={{fontFamily:F.mo,fontSize:10.5,fontWeight:700,color:d.t==="save"?C.accent:C.red}}>{d.i>0?"+":""}₹{Math.abs(d.i)}Cr</span><span style={{color:C.muted,fontSize:10}}>→</span></div></div><div style={{fontSize:10,color:C.sub,marginTop:1}}>{d.detail}</div></div>))}
            </div>
            {/* Budget — click opens variance drawer */}
            <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,padding:"12px 14px"}}>
              <div style={{fontFamily:F.sr,fontSize:13,fontWeight:700,marginBottom:6}}>Budget vs Actual</div>
              {budgets.map((f,i)=>{const p=Math.round((f.a/f.b)*100),bc=f.s==="over"?C.red:f.s==="under"?C.blue:C.accent;return(<div key={i} style={{padding:"5px 0",borderBottom:i<budgets.length-1?`1px solid ${C.bdr}`:"none"}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{fontSize:11.5}}>{f.fn}</span><span style={{fontFamily:F.mo,fontSize:10,color:bc,fontWeight:600}}>{f.a>f.b?"+":""}₹{Math.round(Math.abs(f.a-f.b)*10)/10}Cr</span></div><div style={{display:"flex",alignItems:"center",gap:6}}><div style={{flex:1,height:5,borderRadius:2,background:C.bdr}}><div style={{height:5,borderRadius:2,width:`${Math.min(110,p)}%`,background:bc}}/></div><span style={{fontFamily:F.mo,fontSize:9,color:C.muted}}>{p}%</span></div></div>);})}
            </div>
          </div>

          {/* P&L Waterfall */}
          <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,padding:"12px 14px",marginBottom:14}}>
            <div style={{fontFamily:F.sr,fontSize:13,fontWeight:700,marginBottom:6}}>P&L Summary (YTD)</div>
            {pnl.map((l,i)=>{const v=l.actual-l.plan;const vc=Math.abs(v)<0.5?C.muted:v>0===(l.line==="Revenue"||l.line==="Gross Profit"||l.line==="EBITDA")?C.accent:C.red;return(
              <div key={i} style={{display:"flex",alignItems:"center",padding:"4px 0",borderBottom:i<pnl.length-1?`1px solid ${l.bold?C.bdr:C.bdr+"88"}`:"none",background:l.highlight?C.aml+"44":"transparent",paddingLeft:l.indent?16:0}}>
                <span style={{fontSize:l.bold?12:11,fontWeight:l.bold?600:400,flex:1,color:l.bold?C.ink:C.sub}}>{l.line}</span>
                <span style={{fontFamily:F.mo,fontSize:10,color:C.muted,minWidth:65,textAlign:"right"}}>₹{Math.abs(l.plan)}Cr</span>
                <span style={{fontFamily:F.mo,fontSize:10,fontWeight:l.bold?600:400,minWidth:65,textAlign:"right"}}>{l.actual<0?"-":""}₹{Math.abs(l.actual)}Cr</span>
                <span style={{fontFamily:F.mo,fontSize:10,fontWeight:600,color:vc,minWidth:60,textAlign:"right"}}>{v>=0?"+":""}{Math.round(v*10)/10}</span>
              </div>);})}
          </div>

          {/* Full-year outlook */}
          <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,padding:"12px 14px",marginBottom:14}}>
            <div style={{fontFamily:F.sr,fontSize:13,fontWeight:700,marginBottom:2}}>Full-Year Outlook</div>
            <div style={{fontSize:10.5,color:C.muted,marginBottom:8}}>Three scenarios. The number you take to the CEO.</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
              {[outlook.current,outlook.recovery,outlook.plan].map((s,i)=>{const isC=i===0;const isR=i===1;return(
                <div key={i} style={{background:isC?C.rl+"44":isR?C.al:C.bg,borderRadius:6,padding:"10px 12px",border:`1px solid ${isC?C.red+"22":isR?C.accent+"22":C.bdr}`}}>
                  <div style={{fontFamily:F.mo,fontSize:8,color:isC?C.red:isR?C.accent:C.muted,textTransform:"uppercase",marginBottom:4}}>{s.label}</div>
                  <div style={{fontFamily:F.sr,fontSize:18,fontWeight:700}}>₹{s.rev}Cr</div>
                  <div style={{fontFamily:F.mo,fontSize:10,color:C.sub,marginTop:2}}>EBITDA: ₹{s.ebitda}Cr ({s.margin}%)</div>
                </div>);})}
            </div>
            <Callout color={C.accent} icon="→">Recovery plan (South sprint + West pricing + RM hedge) closes ₹13.4Cr of the ₹19.9Cr gap. EBITDA improves from 11.0% to 12.3%. Remaining gap (₹6.5Cr) requires either volume recovery or additional cost action.</Callout>
          </div>

          {/* Margin corridor */}
          <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,padding:"12px 14px"}}>
            <div style={{fontFamily:F.sr,fontSize:13,fontWeight:700,marginBottom:8}}>Margin Corridor</div>
            <div style={{position:"relative"}}><div style={{display:"flex",gap:5,height:90,alignItems:"flex-end",marginBottom:6}}>
              {margins.map((m,i)=>{const g=m.g||m.fg,e=m.e||m.fe,f=m.g===null;return(<div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:1}}><div style={{fontSize:7,fontFamily:F.mo,color:C.muted}}>{g}%</div><div style={{width:"60%",height:((g-30)/12)*50,background:C.accent,borderRadius:"2px 2px 0 0",opacity:f?0.3:0.65}}/><div style={{width:"60%",height:((e-5)/12)*35,background:C.blue,borderRadius:"2px 2px 0 0",opacity:f?0.3:0.55}}/><span style={{fontSize:7,fontFamily:F.mo,color:C.muted}}>{m.m}</span></div>);})}
            </div></div>
            <div style={{display:"flex",gap:12,fontSize:9,marginBottom:6}}><span style={{display:"flex",alignItems:"center",gap:3}}><span style={{width:8,height:8,borderRadius:2,background:C.accent,opacity:0.65}}/>Gross</span><span style={{display:"flex",alignItems:"center",gap:3}}><span style={{width:8,height:8,borderRadius:2,background:C.blue,opacity:0.55}}/>EBITDA</span></div>
            <Callout color={C.amber} icon="⚠">Cost-driven erosion (palm oil +12%, packaging +8%). Three levers: hedge RM, price increase on top 10 SKUs (&lt;1% volume risk), reallocate ₹6.6Cr trade surplus. Combined: recovers ~180bps.</Callout>
          </div>
          <ChatInput placeholder="e.g. What's the South region recovery plan?"/>
        </div>)}

        {/* ═══ CASH FLOW & WORKING CAPITAL ═══ */}
        {tab==="cashflow"&&(<div>
          <div style={{marginBottom:16}}><h1 style={{fontFamily:F.sr,fontSize:21,fontWeight:700,margin:0}}>Cash Flow & Working Capital</h1><p style={{fontSize:12,color:C.sub,marginTop:3}}>Where tactical meets strategic. Click any week for entity-level detail. Adjust scenario controls.</p></div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:8,marginBottom:14}}>
            <Stat label="W3 Actual" value="₹6.8Cr" sub="vs ₹7.5Cr forecast" trend="▼ ₹0.7Cr" tc={C.amber}/>
            <Stat label="W13 Forecast" value={sAct?`₹${sW13}Cr`:"₹6.8Cr"} sub={sAct?"Scenario":"Base"}/>
            <Stat label="Min Cash" value={sAct?`₹${sMin}Cr`:"₹3.8Cr"} trend={sMin<4?"Below threshold":"Safe"} tc={sMin<4?C.red:C.accent}/>
            <Stat label="Breaches" value={sBr} trend={sBr===0?"All clear":"Action needed"} tc={sBr===0?C.accent:C.red}/>
            <Stat label="Credit Line" value={creditLine.available} sub={`${creditLine.rate} · ${creditLine.status}`} trend={`Covenants: DSO<45, CR>1.2`}/>
          </div>

          {/* Working Capital Cycle — Flow Diagram */}
          <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,padding:"14px 16px",marginBottom:14}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
              <div><div style={{fontFamily:F.sr,fontSize:13,fontWeight:700}}>Working Capital Cycle</div><div style={{fontSize:10.5,color:C.muted,marginTop:2}}>Each day above target = ~₹0.4Cr locked in working capital.</div></div>
              <div style={{textAlign:"right"}}><div style={{fontFamily:F.mo,fontSize:8,color:C.muted,textTransform:"uppercase"}}>CCC Trend</div><Spark data={wcTrend.map(w=>w.v)} color={C.amber} w={90} h={20}/><div style={{fontFamily:F.mo,fontSize:8,color:C.amber}}>19d → 23d</div></div>
            </div>
            {/* SVG flow */}
            <svg viewBox="0 0 820 130" style={{width:"100%",display:"block",overflow:"visible"}}>
              {/* Flow pipeline */}
              {[
                {x:20,l:"DSO",v:wc.dso.v,t:wc.dso.t,desc:"Sale → Cash",c:wc.dso.v>wc.dso.t?C.amber:C.accent,w:Math.max(80,(wc.dso.v/50)*200),link:"receivables"},
                {x:270,l:"DIO",v:wc.dio.v,t:wc.dio.t,desc:"Inventory → Sale",c:wc.dio.v>wc.dio.t?C.amber:C.accent,w:Math.max(60,(wc.dio.v/50)*200)},
                {x:480,l:"DPO",v:wc.dpo.v,t:wc.dpo.t,desc:"Purchase → Pay",c:wc.dpo.v<wc.dpo.t?C.amber:C.accent,w:Math.max(80,(wc.dpo.v/50)*200),link:"payables"},
              ].map((s,i)=>(
                <g key={i} onClick={()=>s.link&&setTab(s.link)} style={{cursor:s.link?"pointer":"default"}}>
                  <rect x={s.x} y={30} width={s.w} height={44} rx={6} fill={s.c+"15"} stroke={s.c} strokeWidth={1.5}/>
                  <text x={s.x+s.w/2} y={20} textAnchor="middle" fontFamily={F.mo} fontSize={9} fill={C.muted} fontWeight={600}>{s.l}</text>
                  <text x={s.x+s.w/2} y={52} textAnchor="middle" fontFamily={F.sr} fontSize={20} fontWeight={700} fill={s.c}>{s.v}d</text>
                  <text x={s.x+s.w/2} y={66} textAnchor="middle" fontFamily={F.mo} fontSize={8} fill={C.muted}>target {s.t}d</text>
                  <text x={s.x+s.w/2} y={90} textAnchor="middle" fontFamily={F.mn} fontSize={9} fill={C.sub}>{s.desc}</text>
                  {s.link&&<text x={s.x+s.w/2} y={105} textAnchor="middle" fontFamily={F.mo} fontSize={8} fill={s.c}>View →</text>}
                </g>
              ))}
              {/* Connecting arrows */}
              <line x1={20+Math.max(80,(wc.dso.v/50)*200)+6} y1={52} x2={270-6} y2={52} stroke={C.bdr} strokeWidth={1.5} markerEnd="url(#arr)"/>
              <text x={(20+Math.max(80,(wc.dso.v/50)*200)+270)/2} y={45} textAnchor="middle" fontFamily={F.mo} fontSize={8} fill={C.muted}>+</text>
              <line x1={270+Math.max(60,(wc.dio.v/50)*200)+6} y1={52} x2={480-6} y2={52} stroke={C.bdr} strokeWidth={1.5} markerEnd="url(#arr)"/>
              <text x={(270+Math.max(60,(wc.dio.v/50)*200)+480)/2} y={45} textAnchor="middle" fontFamily={F.mo} fontSize={8} fill={C.muted}>−</text>
              {/* Equals CCC */}
              <line x1={480+Math.max(80,(wc.dpo.v/50)*200)+6} y1={52} x2={700} y2={52} stroke={C.accent} strokeWidth={2} strokeDasharray="4,3"/>
              <text x={700+(820-700)/2} y={21} textAnchor="middle" fontFamily={F.mo} fontSize={8} fill={C.accent} fontWeight={600}>CASH CONVERSION CYCLE</text>
              <rect x={700} y={28} width={110} height={50} rx={8} fill={C.al} stroke={C.accent} strokeWidth={2}/>
              <text x={755} y={52} textAnchor="middle" fontFamily={F.sr} fontSize={24} fontWeight={700} fill={C.accent}>{ccc}d</text>
              <text x={755} y={68} textAnchor="middle" fontFamily={F.mo} fontSize={9} fill={C.muted}>target {cccT}d</text>
              <text x={755} y={100} textAnchor="middle" fontFamily={F.mo} fontSize={10} fill={C.amber} fontWeight={600}>₹{((ccc-cccT)*0.4).toFixed(1)}Cr locked</text>
              <defs><marker id="arr" viewBox="0 0 10 10" refX={8} refY={5} markerWidth={6} markerHeight={6} orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill={C.bdr}/></marker></defs>
            </svg>
          </div>

          {/* Chart */}
          <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,padding:"14px 16px",marginBottom:14}}>
            <div style={{fontFamily:F.sr,fontSize:14,fontWeight:700,marginBottom:2}}>Cash Position Corridor</div>
            <div style={{fontSize:10.5,color:C.muted,marginBottom:10}}>{sAct?`Scenario: W13 ₹${sW13}Cr, lowest ₹${sMin}Cr${sBr>0?`, ${sBr} breach${sBr>1?"es":""}`:", all clear"}.`:"Click any week for entity detail. Red zone = below ₹4Cr."}</div>
            <CFChart data={cf} sLine={sAct?sLine:null} onClickW={w=>setSelW(selW===w?null:w)} selW={selW}/>
            {!sAct&&<Callout color={C.red} icon="▼">Week 9: three vendor payments (₹6.4Cr) converge. Cash drops to ₹3.8Cr. Two payments have grace periods. Use scenario controls to model.</Callout>}
            {sAct&&sBr===0&&<Callout color={C.accent} icon="✓">Scenario clears threshold. Cash above ₹4Cr all 13 weeks. Lowest: ₹{sMin}Cr.</Callout>}
            {sAct&&sBr>0&&<Callout color={C.red} icon="▼">Still breaching. ₹{sMin}Cr in {sBr} week{sBr>1?"s":""}. {sMin<2?"Significant credit draw needed.":"Defer more vendors or small credit draw."}</Callout>}
          </div>

          {/* Week detail with entities */}
          {selW&&(()=>{const w=cf.find(d=>d.w===selW);const wd=weekEnts[selW];return w?(
            <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.accent}33`,padding:"12px 14px",marginBottom:14}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}><span style={{fontFamily:F.mo,fontSize:10,fontWeight:600,color:C.accent}}>{selW}</span><button onClick={()=>setSelW(null)} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:13}}>×</button></div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:8,marginBottom:wd?10:0}}>
                <div style={{background:C.bg,borderRadius:4,padding:"6px 8px"}}><div style={{fontFamily:F.mo,fontSize:7,color:C.muted,textTransform:"uppercase"}}>{w.ac!==null?"Actual":"Forecast"}</div><div style={{fontFamily:F.sr,fontSize:15,fontWeight:700,marginTop:1}}>₹{w.ac||w.fc}Cr</div></div>
                <div style={{background:C.bg,borderRadius:4,padding:"6px 8px"}}><div style={{fontFamily:F.mo,fontSize:7,color:C.muted,textTransform:"uppercase"}}>Inflow</div><div style={{fontFamily:F.sr,fontSize:15,fontWeight:700,color:C.accent,marginTop:1}}>₹{w.i}Cr</div></div>
                <div style={{background:C.bg,borderRadius:4,padding:"6px 8px"}}><div style={{fontFamily:F.mo,fontSize:7,color:C.muted,textTransform:"uppercase"}}>Outflow</div><div style={{fontFamily:F.sr,fontSize:15,fontWeight:700,marginTop:1}}>₹{w.o}Cr</div></div>
                <div style={{background:C.bg,borderRadius:4,padding:"6px 8px"}}><div style={{fontFamily:F.mo,fontSize:7,color:C.muted,textTransform:"uppercase"}}>Net</div><div style={{fontFamily:F.sr,fontSize:15,fontWeight:700,color:w.i-w.o>=0?C.accent:C.red,marginTop:1}}>{w.i-w.o>=0?"+":""}₹{Math.round((w.i-w.o)*10)/10}Cr</div></div>
              </div>
              {wd&&(<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                <div><div style={{fontFamily:F.mo,fontSize:8,color:C.accent,textTransform:"uppercase",marginBottom:4}}>Inflows</div>{wd.inf.map((f,i)=>(<div key={i} onClick={()=>f.ek&&openE(f.ek)} style={{display:"flex",justifyContent:"space-between",padding:"4px 0",borderBottom:`1px solid ${C.bdr}`,cursor:f.ek?"pointer":"default",fontSize:11}}><span style={{color:f.ek?C.accent:C.ink,borderBottom:f.ek?`1px dashed ${C.accent}44`:"none"}}>{f.ent}</span><div style={{display:"flex",gap:6}}>{f.conf&&<span style={{fontFamily:F.mo,fontSize:9,color:f.conf==="Low"?C.red:f.conf==="High"?C.accent:C.amber}}>{f.conf}</span>}<span style={{fontFamily:F.mo,fontWeight:600}}>{f.amt}</span></div></div>))}</div>
                <div><div style={{fontFamily:F.mo,fontSize:8,color:C.red,textTransform:"uppercase",marginBottom:4}}>Outflows</div>{wd.out.map((f,i)=>(<div key={i} onClick={()=>f.ek&&openE(f.ek)} style={{padding:"4px 0",borderBottom:`1px solid ${C.bdr}`,cursor:f.ek?"pointer":"default",fontSize:11}}><div style={{display:"flex",justifyContent:"space-between"}}><span style={{color:f.ek?C.accent:C.ink,borderBottom:f.ek?`1px dashed ${C.accent}44`:"none"}}>{f.ent}</span><span style={{fontFamily:F.mo,fontWeight:600}}>{f.amt}</span></div>{f.note&&<div style={{fontSize:9,color:C.muted}}>{f.note}</div>}</div>))}</div>
              </div>)}
            </div>):null;})()}

          {/* Scenario + Drivers */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,padding:"12px 14px"}}>
              <div style={{fontFamily:F.sr,fontSize:13,fontWeight:700,marginBottom:10}}>Scenario Controls</div>
              <div style={{marginBottom:12}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}><span style={{fontSize:11.5}}>DSO</span><span style={{fontFamily:F.mo,fontSize:12,fontWeight:700,color:sDSO>40?C.red:sDSO<34?C.accent:C.ink}}>{sDSO}d</span></div><input type="range" min={28} max={50} value={sDSO} onChange={e=>setSDSO(+e.target.value)} style={{width:"100%",accentColor:C.accent}}/></div>
              <div style={{marginBottom:12}}><div style={{fontSize:11.5,marginBottom:4}}>Pinnacle payment</div><div style={{display:"flex",gap:3}}>{[{v:"w6",l:"W6",c:C.accent},{v:"w8",l:"W8",c:C.ink},{v:"w11",l:"W11",c:C.red}].map(o=><button key={o.v} onClick={()=>setSPin(o.v)} style={{flex:1,fontFamily:F.mo,fontSize:9,padding:"6px",borderRadius:4,border:sPin===o.v?`2px solid ${o.c}`:`1px solid ${C.bdr}`,background:sPin===o.v?o.c+"0D":C.bg,color:sPin===o.v?o.c:C.muted,cursor:"pointer"}}>{o.l}</button>)}</div></div>
              <div style={{fontFamily:F.mo,fontSize:7,letterSpacing:"0.08em",color:C.muted,textTransform:"uppercase",marginBottom:5}}>Actions</div>
              {[{l:"Shift Northway (5d grace)",v:sNW,set:setSNW},{l:"Shift Greenfield (7d grace)",v:sGF,set:setSGF},{l:"West dunning rollout",v:sWD,set:setSWD}].map((t,i)=><div key={i} onClick={()=>t.set(!t.v)} style={{display:"flex",alignItems:"center",gap:6,padding:"6px 8px",marginBottom:2,borderRadius:4,background:t.v?C.al:C.bg,cursor:"pointer",border:`1px solid ${t.v?C.accent+"33":"transparent"}`}}><div style={{width:14,height:14,borderRadius:3,border:`2px solid ${t.v?C.accent:C.bdr}`,background:t.v?C.accent:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{t.v&&<span style={{color:"#fff",fontSize:8}}>✓</span>}</div><span style={{fontSize:11}}>{t.l}</span></div>)}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4,marginTop:10}}>{[{l:"Worst",fn:()=>{setSDSO(50);setSPin("w11");setSNW(false);setSGF(false);setSWD(false);}},{l:"Current",fn:()=>{setSDSO(36);setSPin("w8");setSNW(false);setSGF(false);setSWD(false);}},{l:"Recommended",fn:()=>{setSDSO(36);setSPin("w8");setSNW(true);setSGF(true);setSWD(true);}},{l:"Best",fn:()=>{setSDSO(31);setSPin("w6");setSNW(true);setSGF(true);setSWD(true);}}].map((s,i)=><button key={i} onClick={s.fn} style={{fontFamily:F.mo,fontSize:8,fontWeight:600,padding:"6px",borderRadius:4,border:`1px solid ${C.bdr}`,background:C.bg,cursor:"pointer"}}>{s.l}</button>)}</div>
            </div>
            <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,padding:"12px 14px"}}>
              <div style={{fontFamily:F.sr,fontSize:13,fontWeight:700,marginBottom:8}}>Forecast Drivers</div>
              {[{d:"Pinnacle overdue",i:-2.3,dir:"down",w:"W6-8",ek:"pinnacle"},{d:"Vendor convergence",i:-4.1,dir:"down",w:"W9",ek:"atlas"},{d:"South collections",i:+1.2,dir:"up",w:"W5-8"},{d:"Metro Mart advance",i:+3.0,dir:"up",w:"W10",ek:"metromart"}].map((d,i,a)=><div key={i} onClick={()=>d.ek&&openE(d.ek)} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<a.length-1?`1px solid ${C.bdr}`:"none",cursor:d.ek?"pointer":"default"}}><span style={{fontFamily:F.mo,fontSize:10.5,fontWeight:700,minWidth:52,textAlign:"right",color:d.dir==="down"?C.red:C.accent}}>{d.dir==="down"?"▼":"▲"} ₹{Math.abs(d.i)}Cr</span><span style={{flex:1,fontSize:11.5}}>{d.d}</span><Tag bg={C.bg} c={C.muted}>{d.w}</Tag></div>)}
              <div style={{background:sBr===0?C.al:C.rl,borderRadius:5,padding:"9px 10px",marginTop:12}}><div style={{fontFamily:F.mo,fontSize:7,color:sBr===0?C.accent:C.red,textTransform:"uppercase",marginBottom:2}}>Assessment</div><div style={{fontSize:10.5,lineHeight:1.45}}>{sBr===0?"Cash above threshold all 13 weeks.":`Breach in ${sBr} week${sBr>1?"s":""}. Lowest: ₹${sMin}Cr.`}</div></div>
            </div>
          </div>
          <ChatInput placeholder="e.g. Cheapest way to cover the Week 9 gap?"/>
        </div>)}

        {/* ═══ CONVERSATIONAL INTELLIGENCE ═══ */}
        {tab==="ci"&&(<div>
          <div style={{marginBottom:16}}><h1 style={{fontFamily:F.sr,fontSize:21,fontWeight:700,margin:0}}>Conversational Intelligence</h1><p style={{fontSize:12,color:C.sub,marginTop:3}}>Ask anything. The IW traverses both layers and responds with data, analysis, and recommendations.</p></div>
          <div style={{maxWidth:680,margin:"0 auto"}}>
            <div style={{marginBottom:14}}>{ciMsgs.map((m,i)=>m.r==="chips"?(<div key={i} style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:10,paddingLeft:32}}>{m.o.map((o,j)=><button key={j} onClick={()=>setCiMsgs([...ciMsgs,{r:"user",t:o},{r:"ai",t:"Let me traverse the graph...\n\nI've found the relevant data across both tactical and strategic layers. Here's what I see:"}])} style={{fontFamily:F.mn,fontSize:10.5,padding:"5px 10px",borderRadius:14,border:`1px solid ${C.bdr}`,background:C.w,color:C.sub,cursor:"pointer"}} onMouseEnter={e=>{e.target.style.borderColor=C.accent;e.target.style.color=C.accent}} onMouseLeave={e=>{e.target.style.borderColor=C.bdr;e.target.style.color=C.sub}}>{o}</button>)}</div>):(<div key={i} style={{display:"flex",gap:8,marginBottom:10,flexDirection:m.r==="user"?"row-reverse":"row"}}>
              <div style={{width:26,height:26,borderRadius:"50%",flexShrink:0,background:m.r==="ai"?C.accent:C.blue,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:F.mo,fontSize:9,fontWeight:600}}>{m.r==="ai"?"IW":"Y"}</div>
              <div style={{maxWidth:"80%"}}>
                <div style={{padding:"10px 14px",borderRadius:m.r==="user"?"12px 12px 3px 12px":"3px 12px 12px 12px",background:m.r==="user"?C.bl:C.w,border:`1px solid ${C.bdr}`,fontSize:12,lineHeight:1.55,whiteSpace:"pre-line"}}>{m.t}</div>
                {/* Embedded summary card */}
                {m.card&&m.card.type==="summary"&&(<div style={{marginTop:6,background:C.w,border:`1px solid ${C.bdr}`,borderRadius:6,padding:"10px 12px",display:"grid",gridTemplateColumns:`repeat(${m.card.data.length},1fr)`,gap:8}}>{m.card.data.map((d,j)=>(<div key={j}><div style={{fontFamily:F.mo,fontSize:8,color:C.muted,textTransform:"uppercase"}}>{d.l}</div><div style={{fontFamily:F.sr,fontSize:15,fontWeight:700,color:d.c||C.ink,marginTop:1}}>{d.v}</div></div>))}</div>)}
              </div>
            </div>))}</div>
            <div style={{background:C.w,borderRadius:10,border:`1px solid ${C.bdr}`,padding:"10px 14px",display:"flex",gap:8}}>
              <input value={ciInp} onChange={e=>setCiInp(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&ciInp.trim()){setCiMsgs([...ciMsgs,{r:"user",t:ciInp},{r:"ai",t:"Let me check the graph..."}]);setCiInp("");}}} placeholder="Ask anything..." style={{flex:1,fontFamily:F.mn,fontSize:12,padding:"7px 0",border:"none",outline:"none",background:"transparent"}}/>
              <button onClick={()=>{if(ciInp.trim()){setCiMsgs([...ciMsgs,{r:"user",t:ciInp},{r:"ai",t:"Let me check the graph..."}]);setCiInp("");}}} style={{fontFamily:F.mo,fontSize:9,fontWeight:600,background:C.accent,color:"#fff",border:"none",borderRadius:7,padding:"7px 12px",cursor:"pointer"}}>Send</button>
            </div>
          </div>
        </div>)}

      </div></div>
    </div>
  );
}

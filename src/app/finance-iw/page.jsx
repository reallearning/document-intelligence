"use client";
import { useState, useMemo, useCallback, useEffect, useRef, Fragment } from "react";

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

// Vendor reconciliation (SOA vs ERP)
const vendorRecon=[
  {ek:"atlas",soaStatus:"Received",soaDt:"12-Mar",matched:42,total:44,rate:95,exceptions:2,excTypes:["TDS adjustment (₹1.8L)","Timing difference (₹0.4L)"],recon:"Complete",signoff:"Pending CFO"},
  {ek:"northway",soaStatus:"Received",soaDt:"10-Mar",matched:28,total:31,rate:90,exceptions:3,excTypes:["Unbooked invoice (₹2.4L)","GST mismatch (₹0.6L)","Payment not in SOA (₹1.1L)"],recon:"In Progress",signoff:null},
  {ek:"greenfield",soaStatus:"Received",soaDt:"8-Mar",matched:18,total:18,rate:100,exceptions:0,excTypes:[],recon:"Complete",signoff:"Signed 14-Mar"},
  {ek:"crestline",soaStatus:"Received",soaDt:"11-Mar",matched:22,total:24,rate:92,exceptions:2,excTypes:["Credit note not in ERP (₹0.8L)","Duplicate in SOA (₹0.4L)"],recon:"Complete",signoff:"Pending vendor"},
  {ek:"kiran",soaStatus:"Requested",soaDt:null,matched:0,total:0,rate:0,exceptions:0,excTypes:[],recon:"Awaiting SOA",signoff:null},
  {ek:null,name:"Sapphire Chemicals",soaStatus:"Received",soaDt:"9-Mar",matched:14,total:15,rate:93,exceptions:1,excTypes:["TDS rate difference (₹0.3L)"],recon:"Complete",signoff:"Signed 13-Mar"},
  {ek:null,name:"Orbit Logistics",soaStatus:"Received",soaDt:"7-Mar",matched:20,total:22,rate:91,exceptions:2,excTypes:["Freight debit note missing (₹1.2L)","Timing (₹0.5L)"],recon:"Complete",signoff:"Pending CFO"},
  {ek:null,name:"Metro Print",soaStatus:"Not requested",soaDt:null,matched:0,total:0,rate:0,exceptions:0,excTypes:[],recon:"Not started",signoff:null},
];

// AP exception categories
const apExceptions=[
  {type:"Unbooked Invoices",count:4,amt:"₹6.8L",desc:"In vendor SOA but not in ERP. Likely GRN pending.",color:C.red},
  {type:"TDS Adjustments",count:6,amt:"₹3.4L",desc:"TDS deducted but not reflected in vendor SOA or rate mismatch.",color:C.amber},
  {type:"Payment Gaps",count:3,amt:"₹2.1L",desc:"Payment in ERP but not acknowledged in vendor SOA.",color:C.blue},
  {type:"GST Mismatches",count:2,amt:"₹0.9L",desc:"GST amount or rate differs between SOA and ERP.",color:C.amber},
  {type:"Credit Notes",count:2,amt:"₹1.2L",desc:"Credit note in vendor SOA but not booked in ERP.",color:C.blue},
  {type:"Duplicates",count:1,amt:"₹0.87L",desc:"Duplicate entry in vendor SOA. Auto-flagged by IW.",color:C.red},
];

// Three-way match stats
const threeWay={poToGrn:96,grnToInv:93,fullMatch:91,exceptions:18,autoResolved:12,pending:6};

// Morrie agent status
const morrieStatus=[
  {action:"SOA request emails sent",count:22,of:24,status:"complete"},
  {action:"SOAs received and parsed",count:18,of:24,status:"in-progress"},
  {action:"Reconciliations completed",count:14,of:24,status:"in-progress"},
  {action:"Exception reports generated",count:14,of:14,status:"complete"},
  {action:"Vendor sign-offs received",count:4,of:14,status:"in-progress"},
];

// Individual exception items (drill-down from categories)
const excItems={
  "Unbooked Invoices":[
    {vendor:"Northway Logistics",ek:"northway",soaRef:"NW-INV-2241",soaAmt:"₹2.4L",erpStatus:"Not in ERP",root:"GRN pending — goods received 8-Mar, GRN not completed",age:8},
    {vendor:"Orbit Logistics",ek:null,soaRef:"OL-8812",soaAmt:"₹1.8L",erpStatus:"Not in ERP",root:"Invoice received by email, not entered in D365",age:11},
    {vendor:"Sapphire Chemicals",ek:null,soaRef:"SC-4456",soaAmt:"₹1.4L",erpStatus:"Not in ERP",root:"PO raised but invoice not yet booked against it",age:5},
    {vendor:"Northway Logistics",ek:"northway",soaRef:"NW-INV-2238",soaAmt:"₹1.2L",erpStatus:"Not in ERP",root:"Debit note from vendor, needs AP team review",age:14},
  ],
  "TDS Adjustments":[
    {vendor:"Atlas Chemicals",ek:"atlas",soaRef:"AC-2291",soaAmt:"₹3.2Cr",erpAmt:"₹3.2Cr",delta:"₹1.8L",root:"TDS @ 2% deducted in ERP but not reflected in vendor SOA",age:4},
    {vendor:"Crestline Packaging",ek:"crestline",soaRef:"CP-441",soaAmt:"₹12.8L",erpAmt:"₹12.4L",delta:"₹0.4L",root:"TDS rate difference: SOA shows 1%, ERP has 2% (correct per 194C)",age:6},
    {vendor:"Sapphire Chemicals",ek:null,soaRef:"SC-4401",soaAmt:"₹8.2L",erpAmt:"₹8.0L",delta:"₹0.3L",root:"Vendor SOA does not account for TDS Certificate issued Q3",age:9},
  ],
  "Payment Gaps":[
    {vendor:"Northway Logistics",ek:"northway",erpRef:"PAY-8814",erpAmt:"₹6.4L",soaStatus:"Not in SOA",root:"NEFT payment 12-Mar not yet acknowledged by vendor",age:4},
    {vendor:"Orbit Logistics",ek:null,erpRef:"PAY-8801",erpAmt:"₹3.2L",soaStatus:"Not in SOA",root:"Payment via cheque, not yet cleared at vendor's bank",age:9},
  ],
  "GST Mismatches":[
    {vendor:"Northway Logistics",ek:"northway",soaRef:"NW-INV-2240",soaGST:"₹1.08L (18%)",erpGST:"₹0.72L (12%)",delta:"₹0.36L",root:"Service category dispute: vendor claims 18% GST, ERP has 12% (transport)",age:6},
    {vendor:"Orbit Logistics",ek:null,soaRef:"OL-8808",soaGST:"₹0.84L",erpGST:"₹0.54L",delta:"₹0.30L",root:"IGST vs CGST+SGST classification mismatch",age:12},
  ],
  "Credit Notes":[
    {vendor:"Crestline Packaging",ek:"crestline",soaRef:"CP-CN-22",soaAmt:"₹0.8L",erpStatus:"Not booked",root:"Vendor issued credit note for damaged goods return; AP team not yet processed",age:8},
    {vendor:"Atlas Chemicals",ek:"atlas",soaRef:"AC-CN-14",soaAmt:"₹0.4L",erpStatus:"Not booked",root:"Volume discount credit note for Q3; pending verification against contract terms",age:14},
  ],
  "Duplicates":[
    {vendor:"Kiran Textiles",ek:"kiran",soaRef:"KT-7834",soaAmt:"₹0.87L",erpStatus:"Auto-held",root:"Third duplicate in 6 months. Exact match on amount, line items, delivery date. Legacy billing system.",age:8},
  ],
};

// Matching rules captured by Morrie
const matchRules=[
  {rule:"Invoice number exact match",source:"ERP Invoice No ↔ SOA Reference",confidence:"High",applied:892,matched:874},
  {rule:"UTR / payment reference match",source:"ERP Payment UTR ↔ SOA Receipt Ref",confidence:"High",applied:344,matched:338},
  {rule:"Amount + date fuzzy match",source:"±₹100 tolerance, ±3 day window",confidence:"Medium",applied:128,matched:106},
  {rule:"TDS auto-adjustment",source:"Deduct TDS @ applicable rate before matching",confidence:"High",applied:218,matched:201},
  {rule:"Credit/debit note netting",source:"Net CN/DN against open invoices before match",confidence:"Medium",applied:42,matched:36},
  {rule:"GST component split",source:"Match base amount separately from GST",confidence:"High",applied:892,matched:880},
];

/* ═══ INTERCOMPANY DATA ═══ */
const icPairs=[
  {a:"Parent Co",b:"Manufacturing Unit",bal:3.4,dir:"a>b",matched:42,total:48,rate:88,aging:[{b:"Current",a:1.8},{b:"1-30d",a:0.8},{b:"31-60d",a:0.6},{b:"60+",a:0.2}],note:"₹3.4Cr unreconciled. Mfg posted; Parent pending. Blocking consolidation."},
  {a:"Parent Co",b:"JV Partner (Kludi)",bal:1.2,dir:"b>a",matched:18,total:22,rate:82,aging:[{b:"Current",a:0.4},{b:"1-30d",a:0.3},{b:"31-60d",a:0.3},{b:"60+",a:0.2}],note:"Transfer pricing adjustment pending on 4 items. TP review needed before close."},
  {a:"Manufacturing Unit",b:"JV Partner (Kludi)",bal:0.8,dir:"a>b",matched:12,total:14,rate:86,aging:[{b:"Current",a:0.5},{b:"1-30d",a:0.2},{b:"60+",a:0.1}],note:"PO-to-SO conversion timing. 2 SOs created late."},
  {a:"Parent Co",b:"Group FCRP",bal:0.0,dir:"flat",matched:8,total:8,rate:100,aging:[],note:"Fully reconciled. Management fee and shared services."},
];
const icExceptions=[
  {pair:"Parent ↔ Manufacturing",type:"Posting gap",amt:"₹1.8Cr",desc:"Mfg posted debit 8-Mar. Parent has no corresponding credit.",age:8,root:"Journal entry prepared but not posted in Parent's SAP."},
  {pair:"Parent ↔ Kludi",type:"TP adjustment",amt:"₹0.6Cr",desc:"4 transactions flagged for transfer pricing review.",age:14,root:"Arm's-length pricing deviation on raw material supply."},
  {pair:"Parent ↔ Kludi",type:"Classification",amt:"₹0.4Cr",desc:"Parent booked as 'Services', Kludi as 'Material Supply'.",age:22,root:"GL account mapping mismatch between entities."},
  {pair:"Parent ↔ Manufacturing",type:"Timing",amt:"₹0.8Cr",desc:"Invoice in transit. Mfg dispatched 12-Mar, Parent not received.",age:4,root:"Normal transit. Will auto-resolve within cycle."},
  {pair:"Mfg ↔ Kludi",type:"PO-SO mismatch",amt:"₹0.3Cr",desc:"PO raised by Kludi but SO not yet created in Mfg system.",age:6,root:"Manual SO creation backlog. 2 items pending."},
];

/* ═══ COMPLIANCE DATA ═══ */
const compDeadlines=[
  {area:"GST/VAT Returns",entity:"All entities",due:"20-Apr-2026",daysLeft:35,status:"on-track",owner:"Tax Team",note:"Data compilation 72% complete."},
  {area:"Transfer Pricing Filing",entity:"Parent + Kludi",due:"30-Jun-2026",daysLeft:76,status:"on-track",owner:"Tax Team",note:"TP local file draft started. IC register needs cleanup."},
  {area:"Statutory Audit",entity:"All entities",due:"15-May-2026",daysLeft:60,status:"attention",owner:"Controller",note:"3 reconciliations still open. IC blocking."},
  {area:"TDS Returns (Q4)",entity:"Parent Co",due:"31-May-2026",daysLeft:48,status:"on-track",owner:"Tax Team",note:"TDS certificates issued for 89% of deductions."},
  {area:"Board Reporting",entity:"Group",due:"28-Apr-2026",daysLeft:15,status:"attention",owner:"CFO",note:"Revenue variance commentary pending from South region."},
];
const vatItems=[
  {type:"Standard (18%)",txnCount:1842,value:"₹128.4Cr",compliance:"Filed",note:"On track. Auto-computed from ERP."},
  {type:"Reduced (5%)",txnCount:312,value:"₹8.2Cr",compliance:"Filed",note:"All items verified."},
  {type:"Exempt",txnCount:88,value:"₹4.1Cr",compliance:"Under review",note:"3 items flagged as potentially misclassified."},
  {type:"Out-of-scope",txnCount:24,value:"₹1.8Cr",compliance:"Flagged",note:"▲ 14% MoM. IW flagged: 6 items may be incorrectly classified."},
];
const tpRegister=[
  {entity:"Parent → Manufacturing",type:"Raw material supply",vol:"₹42.8Cr",method:"CUP",status:"Within band",deviation:null},
  {entity:"Parent → Kludi",type:"Finished goods",vol:"₹18.4Cr",method:"TNMM",status:"Within band",deviation:null},
  {entity:"Kludi → Parent",type:"Services (shared)",vol:"₹6.2Cr",method:"Cost Plus",status:"Deviation",deviation:"+3.2% above arm's length"},
  {entity:"Manufacturing → Kludi",type:"Component supply",vol:"₹8.1Cr",method:"CUP",status:"Under review",deviation:"Pricing updated Q3, not yet validated"},
];

/* ═══ BKG (Business Knowledge Graph) ═══ */
const SG={
  payables:{color:"#185FA5",label:"Payables & Procurement",col:0,row:0},
  receivables:{color:"#2D5A3D",label:"Receivables & Collections",col:1,row:0},
  interco:{color:"#C4713B",label:"Intercompany & Consolidation",col:2,row:0},
  cashflow:{color:"#534AB7",label:"Cash & Treasury",col:0,row:1},
  compliance:{color:"#993556",label:"Compliance & Tax",col:1,row:1},
};
const BW=280,BH=310,BPX=16,BPY=22,BGX=8,BGY=16;
const sgX=c=>BPX+c*(BW+BGX),sgY=r=>BPY+r*(BH+BGY);
const meta=(by,dt,v,hist)=>({createdBy:by,createdAt:dt,version:v,history:hist||[]});
const raw={
  payables:{
    entities:[
      {id:"ap_vendor",l:"Vendor",desc:"Master record: ID, name, category, payment terms, health score, IC flag, grace period, MSME status. 24 active vendors.",src:"SAP MM / Vendor Master",...meta("AP Manager","12-Sep-2025","v2.1",[{dt:"12-Sep-2025",by:"AP Manager",v:"v2.1",note:"Added MSME flag and grace period fields"},{dt:"01-Jun-2025",by:"Controller",v:"v1.0",note:"Initial entity definition"}])},
      {id:"ap_invoice",l:"Invoice",desc:"Incoming invoice: number, vendor, amount, GST, TDS, due date, booking status, channel (email/courier/physical). ~800/month.",src:"SAP FI",...meta("AP Manager","01-Jun-2025","v1.2",[{dt:"15-Jan-2026",by:"AP Manager",v:"v1.2",note:"Added channel attribute for invoice receipt tracking"},{dt:"01-Jun-2025",by:"Controller",v:"v1.0",note:"Initial definition"}])},
      {id:"ap_po",l:"Purchase Order",desc:"PO reference: number, vendor, line items, amount, approval status, GRN linkage.",src:"SAP MM",...meta("Controller","01-Jun-2025","v1.0",[])},
      {id:"ap_grn",l:"GRN",desc:"Goods Receipt Note: PO reference, received date, quantity, quality status. Key input to three-way match.",src:"SAP MM",...meta("Controller","01-Jun-2025","v1.0",[])},
      {id:"ap_payment",l:"Payment",desc:"Outgoing payment: UTR, amount, date, bank, vendor, status. ~340 payment runs/month.",src:"SAP FI / Bank Feed",...meta("Treasury","01-Jun-2025","v1.1",[{dt:"08-Nov-2025",by:"Treasury",v:"v1.1",note:"Added bank reconciliation status field"}])},
      {id:"ap_soa",l:"Vendor SOA",desc:"Statement of Account from vendor. Parsed by Morrie. Matched line-by-line against ERP ledger.",src:"Email / Vendor Portal",...meta("AP Manager","14-Feb-2026","v1.0",[{dt:"14-Feb-2026",by:"AP Manager",v:"v1.0",note:"New entity: vendor SOA ingestion via Morrie"}])},
    ],
    metrics:[
      {id:"ap_dpo",l:"DPO",desc:"Days Payable Outstanding. Target 42-50 days.",src:"Calculated",fn:"(Trade Payables / COGS) × Days. Green: 42-50d, Amber: 35-42d, Red: <35d.",...meta("Controller","01-Jun-2025","v1.0",[])},
      {id:"ap_match",l:"SOA Match Rate",desc:"% of vendor SOA items matched to ERP. Current: 93.2%. Target: 95%.",src:"Exception Engine",fn:"Matched / Total SOA items × 100. Green: >95%, Amber: 85-95%, Red: <85%.",...meta("AP Manager","14-Feb-2026","v1.1",[{dt:"14-Feb-2026",by:"AP Manager",v:"v1.1",note:"Added tolerance-based matching (±₹100, ±3d)"},{dt:"01-Jun-2025",by:"Controller",v:"v1.0",note:"Initial metric"}])},
      {id:"ap_3way",l:"3-Way Match",desc:"PO → GRN → Invoice full match rate. Current: 91%. GRN→Invoice weakest link.",src:"Calculated",fn:"Fully matched items / Total items × 100. PO→GRN: 96%, GRN→Inv: 93%, Full: 91%.",...meta("Controller","01-Aug-2025","v1.0",[])},
    ],
    decisions:[
      {id:"ap_grir",l:"GR/IR Escalation",desc:"When to escalate unmatched GR/IR items.",src:null,fn:"ESCALATE WHEN unmatched > 15d AND value > ₹50K",...meta("AP Manager","22-Feb-2026","v1.2",[{dt:"22-Feb-2026",by:"AP Manager",v:"v1.2",note:"Added MSME 10-day threshold"},{dt:"15-Sep-2025",by:"Controller",v:"v1.0",note:"Initial rule"}]),bp:{inputs:["grn_date: date","invoice_status: enum(received|booked|matched)","po_value: currency","vendor_category: enum(strategic|standard|MSME)"],logic:"IF unmatched > 15d AND value > ₹50K → Flag + notify AP Manager.\nIF vendor on approved delay list → extend to 30d.\nIF MSME → escalate at 10d (statutory requirement).",output:"{item_id, decision: ESCALATE|EXTEND|HOLD, assigned_to, deadline}",thresholds:["age_threshold: 15d (10d MSME)","value_threshold: ₹50K","delay_extension: 30d"],constraints:["MSME vendors: must pay within 45d (statutory)","Cannot auto-close without 3-way match","AP Manager approves write-offs > ₹10K"],frequency:"Daily scan, immediate on breach"}},
      {id:"ap_dup",l:"Duplicate Detection",desc:"Catches duplicate invoices before payment.",src:null,fn:"HOLD WHEN same vendor + amount (±₹100) + date (±3d)",...meta("AP Manager","01-Sep-2025","v1.0",[]),bp:{inputs:["invoice_amount: currency","invoice_date: date","vendor_id: string","existing_invoices: array(90d)"],logic:"MATCH: same vendor + amount ±₹100 + date ±3d.\nIF exact match → auto-hold.\nALL duplicates require human confirmation.",output:"{invoice_id, decision: HOLD|RELEASE, confidence, matched_against}",thresholds:["amount_tolerance: ±₹100","date_tolerance: ±3 days","lookback: 90 days"],constraints:["Review held invoices within 48h","Cannot auto-release any duplicate","Vendor notification if held > 5d"],frequency:"Real-time on invoice booking"}},
      {id:"ap_defer",l:"Payment Deferral",desc:"Which vendors can be deferred when cash is tight?",src:null,fn:"DEFER WHEN forecast_breach AND vendor has grace_period",...meta("Treasury","10-Mar-2026","v1.0",[{dt:"10-Mar-2026",by:"Treasury",v:"v1.0",note:"New rule: triggered by W9 cash convergence analysis"}]),bp:{inputs:["cash_forecast: 13-week array","vendor_contracts: {grace_period, penalty, strategic}","payment_run_schedule: array"],logic:"IF forecast breaches ₹4Cr threshold within 2 weeks:\n  Scan vendors with grace periods.\n  RANK by grace_length DESC, risk ASC.\n  NEVER defer strategic + penalty vendors.",output:"{vendor_id, amount, original_due, new_due, cost, risk}",thresholds:["cash_threshold: ₹4Cr","min_grace: 3 days","max_deferral: 10 days"],constraints:["Strategic + penalty: never defer","MSME: cannot exceed 45d total","Notify vendor 2d before original due"],frequency:"Weekly forecast review, immediate on threshold breach"}},
    ],
  },
  receivables:{
    entities:[
      {id:"ar_customer",l:"Customer",desc:"Master: ID, name, segment, region, credit limit, risk score, DSO trend. 38 active customers.",src:"SAP AR / CRM",...meta("AR Manager","01-Jun-2025","v1.3",[{dt:"12-Jan-2026",by:"AR Manager",v:"v1.3",note:"Added risk score (0-100) and deterioration flag"},{dt:"01-Jun-2025",by:"Controller",v:"v1.0",note:"Initial definition"}])},
      {id:"ar_invoice_out",l:"Invoice (AR)",desc:"Outgoing invoice: customer, amount, due date, payment status, dunning tier. ~600/month.",src:"SAP AR",...meta("AR Manager","01-Jun-2025","v1.0",[])},
      {id:"ar_credit",l:"Credit Block",desc:"Order hold when customer exceeds credit limit or DSO threshold.",src:"Salesforce + SAP AR",...meta("Controller","01-Jun-2025","v1.0",[])},
      {id:"ar_cash_app",l:"Cash Application",desc:"Matching incoming bank payments to open invoices. Auto-match rate: 88%.",src:"SAP FI / Bank Feed",...meta("AR Manager","20-Jan-2026","v1.0",[{dt:"20-Jan-2026",by:"AR Manager",v:"v1.0",note:"New entity: auto cash application via IW matching rules"}])},
    ],
    metrics:[
      {id:"ar_dso",l:"DSO",desc:"Days Sales Outstanding. Current: 36d. Target: 32d.",src:"Calculated",fn:"(Trade Receivables / Revenue) × Days. Green: <32d, Amber: 32-40d, Red: >40d.",...meta("Controller","01-Jun-2025","v3.2",[{dt:"14-Mar-2026",by:"Controller",v:"v3.2",note:"Red threshold tightened from >42d to >40d"},{dt:"01-Jun-2025",by:"Controller",v:"v1.0",note:"Initial metric"}])},
      {id:"ar_coll",l:"Collection Rate",desc:"Cash collected / overdue at start. Current: 72%. Target: 85%.",src:"Calculated",fn:"Collected / Overdue at period start × 100. Green: >85%, Amber: 70-85%, Red: <70%.",...meta("AR Manager","01-Jun-2025","v1.0",[])},
      {id:"ar_ecl",l:"ECL Provision",desc:"IFRS 9 Expected Credit Loss. Current: ₹39.9L. Pinnacle drives 86%.",src:"ECL Model",fn:"Provision = outstanding × PD × LGD by ageing bucket. Buckets: current (0.5%), 1-30d (2%), 31-60d (5%), 61-90d (15%), 90+ (40%).",...meta("Controller","01-Aug-2025","v1.1",[{dt:"15-Feb-2026",by:"Controller",v:"v1.1",note:"Adjusted PD rates based on actual loss experience"}])},
    ],
    decisions:[
      {id:"ar_block",l:"Credit Block",desc:"When to block new customer orders.",src:null,fn:"BLOCK WHEN DSO > 45d OR outstanding > credit_limit",...meta("Controller","15-Jan-2026","v2.0",[{dt:"15-Jan-2026",by:"Controller",v:"v2.0",note:"Added strategic account CFO override"},{dt:"01-Jun-2025",by:"Controller",v:"v1.0",note:"Initial rule"}]),bp:{inputs:["customer_dso: float","credit_limit: currency","outstanding: currency","customer_segment: enum(strategic|standard|new)"],logic:"IF DSO > 45d OR outstanding > credit limit → block.\nNotify Sales + Finance.\nCFO override for strategic accounts.",output:"{customer_id, decision: BLOCK|ALLOW|OVERRIDE, blocked_value}",thresholds:["dso_trigger: 45 days","utilization: 100%","cfo_override: > ₹10L"],constraints:["CFO approves overrides > ₹10L","Government/PSU: VP approval needed","Strategic: 7-day grace before hard block"],frequency:"Real-time on order entry"}},
      {id:"ar_dunning",l:"Dunning Sequence",desc:"Automated collection escalation ladder.",src:null,fn:"D7: reminder → D14: formal → D21: escalation → D30: CFO letter",...meta("AR Manager","18-Feb-2026","v1.3",[{dt:"18-Feb-2026",by:"AR Manager",v:"v1.3",note:"Added Day 30 CFO letter step"},{dt:"01-Sep-2025",by:"AR Manager",v:"v1.0",note:"Initial 3-tier sequence"}]),bp:{inputs:["invoice_due_date: date","days_overdue: int","dispute_status: bool","customer_segment: enum"],logic:"Day 7: auto-email reminder.\nDay 14: formal notice (strategic: personal call).\nDay 21: escalation to Sales Head.\nDay 30: CFO letter.\nIF dispute active → pause dunning.",output:"{customer_id, tier, action: EMAIL|CALL|LETTER|PAUSE, template}",thresholds:["tier_1: 7d","tier_2: 14d","tier_3: 21d","tier_4: 30d"],constraints:["Disputed invoices: pause all dunning","Max 2 emails/week per customer","CFO letter needs Controller approval"],frequency:"Daily tier transition scan"}},
    ],
  },
  interco:{
    entities:[
      {id:"ic_entity",l:"IC Entity",desc:"Internal entity: Parent Co, Manufacturing Unit, JV Partner (Kludi), Group FCRP. Each with own GL, currency, TP policy.",src:"SAP FI / Group Master",...meta("Group Controller","01-Jun-2025","v1.0",[])},
      {id:"ic_txn",l:"IC Transaction",desc:"Inter-entity transaction: Entity A → Entity B, GL account, amount, posting date, recon status. ~80/month.",src:"SAP FI",...meta("Group Controller","01-Jun-2025","v1.0",[])},
      {id:"ic_journal",l:"Journal Entry",desc:"Manual/recurring journal: entity, account, amount, pattern, deviation flag. Ceramin: 180 hrs/month manual.",src:"SAP FI / Excel",...meta("Group Controller","01-Jun-2025","v1.0",[])},
      {id:"ic_balance",l:"IC Balance",desc:"Net position between entity pairs. Parent ↔ Mfg: ₹3.4Cr unreconciled. Blocking consolidation.",src:"SAP FI",...meta("Group Controller","01-Mar-2026","v1.0",[{dt:"01-Mar-2026",by:"Group Controller",v:"v1.0",note:"New entity to track bilateral IC positions"}])},
    ],
    metrics:[
      {id:"ic_recon",l:"IC Recon Rate",desc:"% of IC pairs fully reconciled. Current: 25% (1/4). Target: 90%.",src:"Calculated",fn:"Reconciled pairs / Total active × 100. Green: >90%, Amber: 75-90%, Red: <75%.",...meta("Group Controller","01-Jun-2025","v1.0",[])},
    ],
    decisions:[
      {id:"ic_esc",l:"IC Escalation",desc:"When to escalate unreconciled IC balances. Consolidation blocker.",src:null,fn:"ESCALATE WHEN balance > ₹1Cr unreconciled > 10d",...meta("Group Controller","10-Mar-2026","v1.1",[{dt:"10-Mar-2026",by:"Group Controller",v:"v1.1",note:"Added consolidation proximity trigger (3 days)"},{dt:"01-Jan-2026",by:"Group Controller",v:"v1.0",note:"Initial rule"}]),bp:{inputs:["ic_balance: currency","days_unreconciled: int","consolidation_deadline: date","timing_tag: bool"],logic:"IF balance > ₹1Cr for > 10d → notify both controllers, block consolidation.\nIF timing-tagged → extend to 20d.\nIF within 3d of consolidation → immediate regardless of amount.",output:"{entity_pair, decision: ESCALATE|EXTEND|CLEAR, blocking}",thresholds:["balance: ₹1Cr","age: 10d (20d if timing)","proximity: 3d"],constraints:["Both controllers acknowledge within 24h","Cannot force-clear without Group Controller","Timing tags need documentation"],frequency:"Daily scan, continuous near close"}},
      {id:"ic_tp",l:"TP Deviation",desc:"Flags IC pricing outside arm's length benchmark. Tax compliance critical.",src:null,fn:"FLAG WHEN deviation > 2% from benchmark",...meta("Tax Head","15-Jan-2026","v1.0",[{dt:"15-Jan-2026",by:"Tax Head",v:"v1.0",note:"Initial rule. Tolerance tightened from 5% to 2%."}]),bp:{inputs:["ic_price: currency","benchmark: currency","tp_method: enum(CUP|TNMM|CostPlus)","board_approved: array"],logic:"Compare IC price vs benchmark.\nIF deviation > 2% → flag, quarantine from filing.\nBoard-approved adjustments exempt.",output:"{txn_id, decision: CLEAR|FLAG|QUARANTINE, deviation_%}",thresholds:["tolerance: 2%","volume_flag: >₹5Cr regardless"],constraints:["Quarantined items excluded from TP local file","Tax Head + CFO approval for >3% deviation","Resolve before filing deadline"],frequency:"Monthly TP review, continuous on new IC transactions"}},
    ],
  },
  cashflow:{
    entities:[
      {id:"cf_forecast",l:"Cash Forecast",desc:"13-week rolling: weekly inflows, outflows, opening/closing balance, scenario overlays. Updated weekly.",src:"Treasury / ERP",...meta("Treasury","01-Jun-2025","v1.0",[])},
      {id:"cf_bank",l:"Bank Statement",desc:"Daily bank feed: transactions, balances, unreconciled items. 3 banks (HDFC, SBI, Citi).",src:"Bank Feed",...meta("Treasury","01-Jun-2025","v1.0",[])},
      {id:"cf_credit",l:"Credit Facility",desc:"HDFC revolving credit: ₹5Cr available at 9.2%. Draw requires Treasury Head approval.",src:"Bank Agreement",...meta("Treasury","01-Nov-2025","v1.0",[{dt:"01-Nov-2025",by:"Treasury",v:"v1.0",note:"Added as entity for cash scenario modelling"}])},
    ],
    metrics:[
      {id:"cf_ccc",l:"CCC",desc:"Cash Conversion Cycle = DSO + DIO - DPO. Current: 23d. Target: 12d.",src:"Calculated",fn:"DSO + DIO - DPO. Green: <15d, Amber: 15-25d, Red: >25d.",...meta("CFO","01-Jun-2025","v1.0",[])},
      {id:"cf_runway",l:"Cash Runway",desc:"Weeks of operating expenses covered by current cash + credit. Target: >8 weeks.",src:"Calculated",fn:"(Cash + Available credit) / Avg weekly outflow. Green: >8w, Amber: 4-8w, Red: <4w.",...meta("Treasury","01-Nov-2025","v1.0",[{dt:"01-Nov-2025",by:"Treasury",v:"v1.0",note:"New metric for board reporting"}])},
    ],
    decisions:[
      {id:"cf_alloc",l:"Cash Allocation",desc:"Weekly: how to allocate cash across payment runs, investments, reserves.",src:null,fn:"OPTIMIZE SUBJECT TO priorities AND reserve_minimum ₹4Cr",...meta("Treasury","10-Mar-2026","v1.0",[{dt:"10-Mar-2026",by:"Treasury",v:"v1.0",note:"New decision rule triggered by W9 convergence"}]),bp:{inputs:["available_cash: currency","payment_queue: [{vendor, amount, priority, due}]","reserve_minimum: ₹4Cr","credit_facility: {available, rate}","ar_expected: [{customer, amount, probability}]"],logic:"SORT: (1) statutory (MSME, tax) (2) strategic vendors (3) by due date.\nAllocate sequentially.\nIF remaining < ₹4Cr → defer non-critical.\nIF shortfall after deferral → recommend credit draw with cost.",output:"{payment_run, deferred, credit_draw, reserve_after}",thresholds:["reserve_min: ₹4Cr","credit_threshold: reserve - ₹1Cr","msme_priority: always first"],constraints:["MSME/tax cannot be deferred","Credit draw: Treasury Head approval","Cannot schedule >60% of outflows on single day"],frequency:"Weekly payment planning, daily adjustment"}},
    ],
  },
  compliance:{
    entities:[
      {id:"cx_vat",l:"VAT Return",desc:"Monthly GST/VAT: classification, entity, period, out-of-scope flags. 2,266 transactions this month.",src:"SAP FI",...meta("Tax Team","01-Jun-2025","v1.0",[])},
      {id:"cx_tp_file",l:"TP Filing",desc:"Annual transfer pricing local file: IC register, arm's length analysis. Due 30-Jun-2026.",src:"Tax Team / External",...meta("Tax Head","01-Jun-2025","v1.0",[])},
      {id:"cx_regulation",l:"Regulation",desc:"Regulatory requirements: jurisdiction, type, deadline, entity applicability.",src:"Legal / External",...meta("Tax Head","01-Jun-2025","v1.0",[])},
      {id:"cx_deadline",l:"Filing Deadline",desc:"Calendar of all compliance deadlines: GST 20th monthly, TP annual, TDS quarterly, audit annual.",src:"Tax Calendar",...meta("Tax Team","01-Sep-2025","v1.0",[{dt:"01-Sep-2025",by:"Tax Team",v:"v1.0",note:"Centralized deadline tracking entity"}])},
    ],
    metrics:[
      {id:"cx_health",l:"Compliance Health",desc:"Aggregate score: on-time filings, gap analysis, audit readiness. Current: 4/5 areas on track.",src:"Calculated",fn:"(On-time filings / Total) × 100, weighted by penalty severity. Green: >95%, Amber: 85-95%, Red: <85%.",...meta("Tax Head","01-Jun-2025","v1.0",[])},
    ],
    decisions:[
      {id:"cx_vat_class",l:"VAT Classification",desc:"Correct VAT treatment for edge-case transactions. Misclassification = audit risk.",src:null,fn:"CLASSIFY INTO standard|reduced|exempt|out_of_scope",...meta("Tax Team","15-Jan-2026","v1.0",[{dt:"15-Jan-2026",by:"Tax Team",v:"v1.0",note:"Initial rule. Auto-classifies at 80% confidence threshold."}]),bp:{inputs:["transaction_type: string","supply_type: enum(goods|services|mixed)","counterparty_location: string","prior_classifications: array"],logic:"APPLY tax rules by jurisdiction.\nIF ambiguous → check precedents.\nIF no precedent → flag for Tax review.\nIF out-of-scope but historically standard → quarantine.",output:"{txn_id, classification, confidence, review_required}",thresholds:["auto_confidence: 0.8","quarantine: out-of-scope mismatch","batch_review: 10+ items"],constraints:["Cannot auto-classify >₹5L in ambiguous categories","Tax team reviews new patterns","Full audit trail for every classification"],frequency:"Real-time on booking, monthly batch for edge cases"}},
    ],
  },
};
const iwHash=(s)=>{let h=0;for(let i=0;i<s.length;i++){h=((h<<5)-h)+s.charCodeAt(i);h|=0;}return h;};
const iwJitter=(id,ax,mg)=>{const h=iwHash(id+ax);return((h%1000)/1000-0.5)*2*mg;};
const INSET=14;
const iwNodes=[];
Object.entries(raw).forEach(([sgId,sg])=>{
  const s=SG[sgId],ox=sgX(s.col),oy=sgY(s.row);
  [[sg.entities,"entity",30,95],[sg.metrics,"metric",155,40],[sg.decisions,"decision",225,65]].forEach(([items,t,yS,yB])=>{
    if(!items?.length)return;
    const uW=BW-INSET*2,mPR=Math.ceil(Math.sqrt(items.length*2.8)),rows=Math.ceil(items.length/mPR);
    items.forEach((n,i)=>{
      const row=Math.floor(i/mPR),col=i%mPR;
      const iR=Math.min(mPR,items.length-row*mPR);
      const xS=uW/(iR+1),yStep=rows>1?yB/(rows+1):yB/2;
      const bx=ox+INSET+xS*(col+1),by=oy+yS+yStep*(row+1);
      const jx=iwJitter(n.id,"x",Math.min(xS*0.18,5)),jy=iwJitter(n.id,"y",Math.min(yStep*0.12,3));
      iwNodes.push({...n,t,sg:sgId,cx:Math.round(bx+jx),cy:Math.round(by+jy)});
    });
  });
});
const iwMap=Object.fromEntries(iwNodes.map(n=>[n.id,n]));
const iwEdges=[
  ["ap_vendor","ap_po","ORDERS_FROM"],["ap_po","ap_grn","RECEIVES"],["ap_grn","ap_invoice","MATCHES"],["ap_invoice","ap_payment","PAYS"],["ap_vendor","ap_soa","SENDS"],["ap_soa","ap_match","RECONCILES"],
  ["ap_vendor","ap_dpo","MEASURES"],["ap_invoice","ap_match","SCORES"],["ap_invoice","ap_3way","VALIDATES"],["ap_grn","ap_3way","VALIDATES"],["ap_po","ap_3way","VALIDATES"],
  ["ap_match","ap_grir","TRIGGERS"],["ap_invoice","ap_dup","CHECKS"],["ap_dpo","ap_defer","INFORMS"],["ap_payment","ap_dpo","COMPUTES"],
  ["ar_customer","ar_invoice_out","BILLS"],["ar_invoice_out","ar_credit","BLOCKS"],["ar_invoice_out","ar_cash_app","MATCHES"],["ar_cash_app","ar_coll","MEASURES"],
  ["ar_invoice_out","ar_dso","MEASURES"],["ar_customer","ar_ecl","PROVISIONS"],["ar_dso","ar_ecl","FEEDS"],
  ["ar_dso","ar_block","TRIGGERS"],["ar_coll","ar_dunning","DRIVES"],["ar_ecl","ar_block","INFORMS"],
  ["ic_entity","ic_txn","TRANSACTS"],["ic_txn","ic_journal","POSTS"],["ic_txn","ic_balance","ACCUMULATES"],
  ["ic_balance","ic_recon","MEASURES"],["ic_recon","ic_esc","TRIGGERS"],["ic_txn","ic_tp","CHECKS"],
  ["cf_bank","cf_forecast","FEEDS"],["cf_credit","cf_forecast","SUPPLEMENTS"],["cf_forecast","cf_ccc","COMPUTES"],["cf_forecast","cf_runway","COMPUTES"],["cf_ccc","cf_alloc","DRIVES"],
  ["cx_vat","cx_health","MEASURES"],["cx_tp_file","cx_health","MEASURES"],["cx_regulation","cx_vat_class","GOVERNS"],["cx_deadline","cx_health","TRACKS"],
].map(([f,t,l])=>({from:f,to:t,label:l,type:"i"}));
const iwCross=[
  {from:"ap_dpo",to:"cf_ccc",label:"FEEDS"},{from:"ar_dso",to:"cf_ccc",label:"FEEDS"},
  {from:"ap_defer",to:"cf_alloc",label:"INFORMS"},{from:"ar_coll",to:"cf_forecast",label:"PROJECTS"},
  {from:"ic_txn",to:"cx_tp_file",label:"DOCUMENTS"},{from:"ic_tp",to:"cx_health",label:"FLAGS"},
  {from:"ap_vendor",to:"ic_txn",label:"COUNTERPARTY"},{from:"ar_customer",to:"ar_credit",label:"CONSTRAINS"},
  {from:"cf_alloc",to:"ap_defer",label:"TRIGGERS"},{from:"cx_vat_class",to:"ap_invoice",label:"CLASSIFIES"},
  {from:"ar_ecl",to:"cf_forecast",label:"PROVISIONS"},{from:"ic_balance",to:"cf_forecast",label:"BLOCKS"},
].map(e=>({...e,type:"x"}));
const iwAllEdges=[...iwEdges,...iwCross];

/* ═══ CI PRE-BUILT QUERIES ═══ */
const ciQueries=[
  {q:"Which vendors with open AP exceptions also have intercompany transactions?",
    trail:[{agent:"Orchestrator",icon:"◎",sources:null,query:null,finding:"Cross-domain query: AP exceptions × IC transactions.",inference:"Dispatching to AP Reconciliation Agent, IC Reconciliation Agent, Cross-domain Synthesis Agent"},{agent:"AP Reconciliation Agent",icon:"↑",sources:["SAP FI","Vendor SOA Register","Exception Engine"],query:"ap_exceptions(status=\'open\') | group_by(\'vendor\') | enrich(\'health_score\')",finding:"18 open exceptions across 8 vendors. Top: Northway (₹4.1L), Atlas (₹1.8L), Greenfield (₹0.3L).",inference:"8 vendor entities identified for cross-reference."},{agent:"IC Reconciliation Agent",icon:"⇄",sources:["SAP FI","IC Register"],query:"ic_transactions(period=\'current\') | match_against(vendor_register)",finding:"3 matches: Atlas (₹3.2Cr/mo), Greenfield (₹1.4Cr), Northway (₹0.8Cr).",inference:"3 vendors have dual AP + IC exposure."},{agent:"Cross-domain Synthesis Agent",icon:"◈",sources:null,query:null,finding:"Northway highest priority (Apr renewal). Atlas strategic. Greenfield low.",inference:"Resolve Northway before April renegotiation."}],
    headline:"3 of 24 vendors with AP exceptions also have active IC relationships.",
    vis:{type:"table",headers:["Vendor","AP Exceptions","IC Volume","Risk","Action"],rows:[["Northway Logistics","₹4.1L (3 items)","₹0.8Cr/mo","Apr renewal","Resolve this week"],["Atlas Chemicals","₹1.8L (TDS)","₹3.2Cr/mo","Strategic","Handle admin"],["Greenfield Agro","₹0.3L (TDS)","₹1.4Cr/mo","Low","Monitor"]]},
    detail:"Northway is the action item: 3 unresolved exceptions going into an April contract renewal gives them leverage. Atlas is strategic (handle TDS administratively). Greenfield is negligible.",
    actions:["Resolve Northway 3 AP exceptions before April renewal","File Atlas TDS correction administratively","Monitor Greenfield, no action needed"],
    card:{data:[{l:"Dual-exposure",v:"3",c:C.red},{l:"AP total",v:"₹6.2L"},{l:"IC total",v:"₹5.4Cr",c:C.amber}]}},
  {q:"What\u2019s blocking the period close right now?",
    trail:[{agent:"Orchestrator",icon:"◎",sources:null,query:null,finding:"Period close query. Traversing all domains.",inference:"Dispatching to Close Management Agent, IC Agent, Compliance Agent"},{agent:"Close Management Agent",icon:"◉",sources:["Close Checklist","Task Dependencies"],query:"close_status(period=\'Mar-2026\') | identify_blockers(critical_path=true)",finding:"Day 5 of 10. IC 1/4, Recons 14/24. Consolidation blocked.",inference:"IC is critical dependency."},{agent:"IC Reconciliation Agent",icon:"⇄",sources:["SAP FI","IC Balance Register"],query:"ic_balances(status=\'unreconciled\') | rank_by(\'consolidation_impact\')",finding:"Parent ↔ Manufacturing: ₹3.4Cr. Journal prepared, not posted.",inference:"1 action unblocks consolidation."},{agent:"Cross-domain Synthesis Agent",icon:"◈",sources:null,query:null,finding:"3 blockers. IC journal is critical path.",inference:"Post today. 5-minute action."}],
    headline:"3 blockers. 1 critical path: a journal entry that takes 5 minutes to post.",
    vis:{type:"bars",items:[{label:"IC Recon",value:25,max:100,color:C.red,note:"1/4 pairs"},{label:"Vendor Recons",value:58,max:100,color:C.amber,note:"14/24"},{label:"Accruals",value:75,max:100,color:C.amber,note:"6/8"},{label:"Journals",value:82,max:100,color:C.accent,note:"82/100"},{label:"Adjustments",value:40,max:100,color:C.red,note:"2/5"}]},
    detail:"The IC journal (Parent ↔ Manufacturing, ₹3.4Cr) unblocks the entire downstream chain. Manufacturing prepared it; Parent hasn\u2019t posted. Not a data issue, a process delay.",
    actions:["Post the Parent IC journal entry today (5 min)","Escalate 4 vendor SOA exceptions to AP team","Submit 6 VAT items for classification before 20-Apr"],
    card:{data:[{l:"Blockers",v:"3",c:C.red},{l:"Critical path",v:"IC journal"},{l:"Days left",v:"5",c:C.amber}]}},
  {q:"What is the total financial exposure for Pinnacle Distributors?",
    trail:[{agent:"Orchestrator",icon:"◎",sources:null,query:null,finding:"Entity exposure query. Scanning all domains.",inference:"Dispatching to AR Intelligence Agent, Cash Flow Agent, Credit Risk Agent"},{agent:"AR Intelligence Agent",icon:"↓",sources:["SAP AR","Customer Master"],query:"entity_resolve(\'Pinnacle\') | ar_exposure() | enrich(\'credit_limit\',\'dso_trend\')",finding:"₹3.8Cr outstanding, ₹2.3Cr overdue (16d). Credit 76%. DSO 47d.",inference:"11% of total AR in one entity."},{agent:"Cash Flow Agent",icon:"◎",sources:["13-Week Forecast"],query:"cash_impact(entity=\'pinnacle\', scenario=\'non_payment\') | cascade(weeks=7:13)",finding:"Drives 62% of W9 breach. Cascades W7-W9.",inference:"Primary cash corridor driver."},{agent:"Credit Risk Agent",icon:"◇",sources:["ECL Model","IFRS 9"],query:"ecl_calculate(entity=\'pinnacle\', bucket=\'61-90d\')",finding:"₹34.5L ECL. 86% of total company provision.",inference:"Concentration risk across AR, cash, provisioning."}],
    headline:"Pinnacle is your single highest risk: 11% of AR, 62% of cash breach, 86% of provisions.",
    vis:{type:"comparison",items:[{name:"AR Exposure",metrics:[{l:"Outstanding",v:"₹3.8Cr",c:C.red},{l:"Overdue",v:"₹2.3Cr",c:C.red},{l:"Credit",v:"76%",c:C.amber},{l:"DSO",v:"47d",c:C.red}]},{name:"Downstream Impact",metrics:[{l:"W9 breach share",v:"62%",c:C.red},{l:"Cascade",v:"W7-W9",c:C.amber},{l:"ECL share",v:"86%",c:C.red},{l:"AP/IC",v:"None",c:C.accent}]}]},
    detail:"Deterioration started Oct 2025 (DSO 32d), accelerating since. Their Q3 revenue declined 8%. Credit limit raised to ₹5Cr in Aug 2025, premature. If they don\u2019t pay by W8, HDFC draw costs ₹4.6L.",
    actions:["Escalate to Pinnacle CFO today (not AP manager)","Pre-approve HDFC draw + vendor deferrals as fallback","Reduce credit limit to ₹3Cr for new orders"],
    card:{data:[{l:"Outstanding",v:"₹3.8Cr",c:C.red},{l:"Credit",v:"76%",c:C.amber},{l:"ECL",v:"86%",c:C.red},{l:"Cash",v:"W7-W9"}]}},
  {q:"Which customers have deteriorating payment patterns?",
    trail:[{agent:"Orchestrator",icon:"◎",sources:null,query:null,finding:"Payment pattern analysis. Receivables.",inference:"Dispatching to AR Intelligence Agent"},{agent:"AR Intelligence Agent",icon:"↓",sources:["SAP AR","Payment History"],query:"customers(active) | dso_trend(months=6) | flag_deterioration(threshold=\'5d_over_3mo\')",finding:"38 scanned. 2 flagged: Pinnacle (32→47d), Clearview (30→42d). Same trajectory shape.",inference:"Clearview mirrors Pinnacle\u2019s early pattern with 3-month lag."}],
    headline:"2 flagged. Clearview is following Pinnacle\u2019s exact curve, 3 months behind.",
    vis:{type:"trend",items:[{name:"Pinnacle",data:[32,34,38,41,44,47],color:C.red},{name:"Clearview",data:[30,33,35,38,40,42],color:C.amber},{name:"Target",data:[32,32,32,32,32,32],color:C.bdr}],labels:["Oct","Nov","Dec","Jan","Feb","Mar"]},
    detail:"Both show steady 2-3 day DSO increase per month, no plateau. Pinnacle is now critical (₹2.3Cr overdue). Clearview is where Pinnacle was in Dec. Intervene now to prevent a ₹1.4Cr problem in 60 days.",
    actions:["Initiate formal payment review with Clearview Finance Director","Tighten Clearview terms: advance required on orders > ₹5L","Set automated alert at 38d DSO threshold"],
    card:{data:[{l:"Flagged",v:"2",c:C.red},{l:"Pinnacle",v:"47d"},{l:"Clearview",v:"42d",c:C.amber}]}},
  {q:"What\u2019s the cheapest way to cover the Week 9 cash gap?",
    trail:[{agent:"Orchestrator",icon:"◎",sources:null,query:null,finding:"Cash optimization. Cash Flow + Payables.",inference:"Dispatching to Cash Flow Agent, AP Agent"},{agent:"Cash Flow Agent",icon:"◎",sources:["13-Week Forecast"],query:"cash_forecast(week=9) | identify_gap(threshold=4.0)",finding:"W9: ₹7.1Cr in vs ₹11.2Cr out. Cash ₹3.8Cr. Gap ₹0.2Cr.",inference:"3 vendor payments converge in 4-day window."},{agent:"AP Reconciliation Agent",icon:"↑",sources:["Vendor Contracts","Grace Periods"],query:"vendor_payments(week=9) | cost_options()",finding:"Atlas: hard, ₹4.8L penalty. Northway: 5d grace, ₹0. Greenfield: 7d grace, ₹0.",inference:"Shift 2 vendors at zero cost. Breach eliminated."}],
    headline:"Zero-cost fix: shift 2 vendor payments out of the W9 window.",
    vis:{type:"table",headers:["Vendor","Amount","Grace","Shift Cost","Action"],rows:[["Atlas Chemicals","₹3.2Cr","None (hard)","₹4.8L penalty","DO NOT TOUCH"],["Northway Logistics","₹1.8Cr","5 days","₹0","Shift to 1-Apr"],["Greenfield Agro","₹1.4Cr","7 days","₹0","Shift to 31-Mar"],["HDFC Draw (backup)","₹2.0Cr","N/A","₹4.6L","Only if Pinnacle fails"]]},
    detail:"W9 outflow drops from ₹11.2Cr to ₹7.8Cr. Cash stays above ₹4Cr. Zero cost, zero relationship damage. HDFC only if Pinnacle doesn\u2019t pay by W8.",
    actions:["Shift Northway to 1-Apr","Shift Greenfield to 31-Mar","Keep HDFC draw pre-approved as Pinnacle backstop"],
    card:{data:[{l:"Shifted",v:"₹3.2Cr"},{l:"Cost",v:"₹0",c:C.accent},{l:"W9 cash",v:"Above ₹4Cr",c:C.accent}]}},
  {q:"Why is the gross margin eroding and what can we do about it?",
    trail:[{agent:"Orchestrator",icon:"◎",sources:null,query:null,finding:"Margin analysis. Revenue & Performance.",inference:"Dispatching to P&L Agent, Procurement Agent"},{agent:"P&L Intelligence Agent",icon:"▤",sources:["ERP GL","Monthly P&L"],query:"margin_trend(months=12) | decompose(price_vs_cost_vs_mix)",finding:"38.2% → 35.8%. 240bps. Cost: RM 200bps, logistics 40bps. Price flat.",inference:"Entirely cost-driven."},{agent:"Procurement Intelligence Agent",icon:"↑",sources:["Commodity Index","Hedge Book"],query:"commodity_exposure(unhedged=true) | recovery_options()",finding:"Palm oil ₹4.8Cr over. Packaging ₹1.2Cr. Sugar -₹0.6Cr offset. Trade surplus ₹6.6Cr.",inference:"3 levers recover ~180bps."}],
    headline:"240bps erosion, 100% cost-driven. Three levers recover 180bps.",
    vis:{type:"bars",items:[{label:"Palm oil (+12%)",value:160,max:240,color:C.red,note:"₹4.8Cr unhedged"},{label:"Packaging (+8%)",value:40,max:240,color:C.amber,note:"₹1.2Cr"},{label:"Logistics (+8%)",value:40,max:240,color:C.amber,note:"₹4.1Cr auto-renewed"},{label:"Sugar (offset)",value:-20,max:240,color:C.accent,note:"-₹0.6Cr locked"}]},
    detail:"Palm oil went up 12%, you\u2019re unhedged, and the budget assumed +4% max. Everything else is noise. Trade spend surplus (₹6.6Cr) is a one-time offset. For FY27, hedge.",
    actions:["Hedge palm oil for Q1 FY27 (₹2.1L locks current rate)","Push 2-3% price on top 10 SKUs (<1% volume risk)","Reallocate ₹6.6Cr trade surplus for this year"],
    card:{data:[{l:"Erosion",v:"240bps",c:C.red},{l:"Driver",v:"Cost 100%"},{l:"Recovery",v:"~180bps",c:C.accent}]}},
  {q:"How does collections efficiency compare between South and West?",
    trail:[{agent:"Orchestrator",icon:"◎",sources:null,query:null,finding:"Regional comparison. Receivables.",inference:"Dispatching to AR Intelligence Agent"},{agent:"AR Intelligence Agent",icon:"↓",sources:["SAP AR","Regional DSO","Dunning Log"],query:"collections_by_region([\'South\',\'West\']) | compare() | root_cause()",finding:"South 34d/84% (automated). West 42d/61% (manual). Same profiles.",inference:"West rollout = ₹1.6Cr freed. 2 days. Best ROI."}],
    headline:"Same customers, same products, 8-day DSO gap. Only difference: South automated dunning, West didn\u2019t.",
    vis:{type:"comparison",items:[{name:"South Region",metrics:[{l:"DSO",v:"34d",c:C.accent},{l:"Rate",v:"84%",c:C.accent},{l:"Dunning",v:"Auto",c:C.accent},{l:"Freed",v:"₹1.2Cr",c:C.accent}]},{name:"West Region",metrics:[{l:"DSO",v:"42d",c:C.red},{l:"Rate",v:"61%",c:C.red},{l:"Dunning",v:"Manual",c:C.red},{l:"Potential",v:"₹1.6Cr",c:C.amber}]}]},
    detail:"South went live Feb. DSO 38→34d, rate 71→84%, ₹1.2Cr freed, manual work -60%. West has identical profiles. The entire gap is process, not customer behavior.",
    actions:["Roll out West dunning this week (2 days config)","Expected: ₹1.6Cr freed in 60 days, DSO 42→36d","Highest-ROI action on the entire finance board"],
    card:{data:[{l:"South",v:"34d",c:C.accent},{l:"West",v:"42d",c:C.red},{l:"Potential",v:"₹1.6Cr",c:C.accent}]}},
];

/* ═══ CLOSE STATUS ═══ */
const closeStatus={day:5,of:10,items:[{l:"Journals",v:82,t:100},{l:"Recons",v:14,t:24},{l:"IC",v:1,t:4},{l:"Accruals",v:6,t:8},{l:"Adjustments",v:2,t:5}]};

/* ═══ DEPTH DATA ═══ */
const dsoTrend=[{m:"Oct",v:33},{m:"Nov",v:34},{m:"Dec",v:35},{m:"Jan",v:35},{m:"Feb",v:36},{m:"Mar",v:36}];
const collForecast=[{cust:"Pinnacle",amt:"₹2.3Cr",prob:45,due:"W7",risk:true},{cust:"Metro Mart",amt:"₹1.4Cr",prob:92,due:"W7",risk:false},{cust:"Horizon Foods",amt:"₹0.8Cr",prob:88,due:"W8",risk:false},{cust:"Clearview",amt:"₹0.37Cr",prob:55,due:"W8",risk:true},{cust:"Orbit Retail",amt:"₹0.6Cr",prob:90,due:"W9",risk:false}];
const arActions=[{pri:"high",action:"Escalate Pinnacle to CFO — ₹2.3Cr overdue, 47d DSO, driving W9 cash breach",link:"pinnacle"},{pri:"high",action:"Initiate Clearview formal review — DSO trajectory mirrors early Pinnacle",link:"clearview"},{pri:"medium",action:"Roll out dunning automation to West region — ₹1.6Cr freed in 60d",link:null},{pri:"low",action:"Review credit limit for Sapphire Stores — approaching 90% utilization",link:null}];
const riskMigration={moved:[{from:"Green",to:"Amber",count:2,names:"Clearview, Sapphire"},{from:"Amber",to:"Red",count:1,names:"Pinnacle"}],stable:{green:16,amber:13,red:6}};
const custDsoHistory={pinnacle:[32,34,38,41,44,47],clearview:[30,33,35,38,40,42],metro:[28,28,29,28,29,28]};
const dunningStatus=[{tier:"T1: Reminder (7d)",count:8,amt:"₹1.8Cr",sent:6,responded:4,rate:"67%"},{tier:"T2: Formal (14d)",count:4,amt:"₹0.9Cr",sent:4,responded:2,rate:"50%"},{tier:"T3: Escalation (21d)",count:2,amt:"₹2.1Cr",sent:2,responded:0,rate:"0%"},{tier:"T4: CFO Letter (30d)",count:1,amt:"₹0.4Cr",sent:0,responded:0,rate:"—"}];
const dunningAuto={south:{status:"Live",since:"Feb 2026",dso_before:38,dso_after:34,rate_before:71,rate_after:84,freed:"₹1.2Cr"},west:{status:"Manual",since:null,dso:42,rate:61,potential:"₹1.6Cr",config:"2 days"}};
const paymentRuns=[{id:"PR-127",dt:"17-Mar",status:"Scheduled",vendors:4,total:"₹8.2Cr",items:[{v:"Atlas Chemicals",a:"₹3.2Cr",pri:"hard"},{v:"Sapphire Chemicals",a:"₹2.8Cr",pri:"normal"},{v:"Metro Print",a:"₹1.4Cr",pri:"normal"},{v:"Orbit Logistics",a:"₹0.8Cr",pri:"normal"}]},{id:"PR-128",dt:"21-Mar",status:"Queued",vendors:3,total:"₹3.2Cr",items:[{v:"Northway Logistics",a:"₹1.8Cr",pri:"grace"},{v:"Greenfield Agro",a:"₹1.4Cr",pri:"grace"}]},{id:"PR-129",dt:"24-Mar",status:"Pending",vendors:2,total:"₹1.2Cr",items:[{v:"Crestline Packaging",a:"₹0.8Cr",pri:"normal"},{v:"Kiran Textiles",a:"₹0.4Cr",pri:"held"}]}];
const payPipeline=[{stage:"Received",count:42,amt:"₹18.4Cr"},{stage:"Booked",count:38,amt:"₹16.2Cr"},{stage:"Matched",count:34,amt:"₹14.8Cr"},{stage:"Approved",count:30,amt:"₹12.6Cr"},{stage:"Scheduled",count:22,amt:"₹8.2Cr"},{stage:"Paid (MTD)",count:18,amt:"₹6.4Cr"}];
const icBilateral=[{pair:"Parent ↔ Manufacturing",aBooks:"₹14.2Cr",bBooks:"₹17.6Cr",delta:"₹3.4Cr",side:"B > A",root:"Mfg posted ₹3.4Cr debit; Parent journal not posted",action:"Post Parent journal entry"},{pair:"Parent ↔ Kludi",aBooks:"₹8.1Cr",bBooks:"₹9.3Cr",delta:"₹1.2Cr",side:"B > A",root:"4 TP-classified items pending review + classification mismatch",action:"Complete TP review on 4 items"},{pair:"Mfg ↔ Kludi",aBooks:"₹4.2Cr",bBooks:"₹5.0Cr",delta:"₹0.8Cr",side:"B > A",root:"2 PO-to-SO conversions created late in Mfg system",action:"Process pending SO entries"},{pair:"Parent ↔ Group FCRP",aBooks:"₹2.1Cr",bBooks:"₹2.1Cr",delta:"₹0",side:"Balanced",root:"Management fee and shared services — fully reconciled",action:"No action needed"}];
const vatFlagged=[{id:"VF-1",txn:"INV-8841",vendor:"Orbit Logistics",amt:"₹4.2L",current:"Out-of-scope",expected:"Standard (18%)",reason:"Freight services historically classified as standard. Reclassified by new vendor in Jan.",impact:"₹0.76L GST under-reported"},{id:"VF-2",txn:"INV-8856",vendor:"Northway Logistics",amt:"₹2.8L",current:"Out-of-scope",expected:"Standard (18%)",reason:"Same freight category as VF-1. Likely systematic misclassification.",impact:"₹0.50L"},{id:"VF-3",txn:"INV-8902",vendor:"Metro Print",amt:"₹1.4L",current:"Exempt",expected:"Standard (18%)",reason:"Print services with digital delivery component. Exempt classification may be incorrect.",impact:"₹0.25L"},{id:"VF-4",txn:"JE-441",entity:"Ceramin",amt:"₹3.1L",current:"Out-of-scope",expected:"Reduced (5%)",reason:"Inter-unit material transfer booked as out-of-scope. Should be reduced rate.",impact:"₹0.16L"},{id:"VF-5",txn:"INV-8878",vendor:"Sapphire Chemicals",amt:"₹5.2L",current:"Out-of-scope",expected:"Standard (18%)",reason:"Chemical supplies for R&D. Classification unclear under new GST rules.",impact:"₹0.94L"},{id:"VF-6",txn:"INV-8891",vendor:"Greenfield Agro",amt:"₹1.8L",current:"Exempt",expected:"Reduced (5%)",reason:"Agricultural input with processing component. May not qualify for exemption.",impact:"₹0.09L"}];

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
  const[apSub,setApSub]=useState("overview");
  const[selExc,setSelExc]=useState(null);
  const[selVendorRecon,setSelVendorRecon]=useState(null);
  const[icSub,setIcSub]=useState("overview");
  const[compSub,setCompSub]=useState("overview");
  const[iwFilter,setIwFilter]=useState("all");
  const[iwSearch,setIwSearch]=useState("");
  const[nodeTab,setNodeTab]=useState("details");
  const[validating,setValidating]=useState(null);
  const[valStep,setValStep]=useState(0);
  const[selNode,setSelNode]=useState(null);
  const[editNode,setEditNode]=useState(null);
  const[ciLoading,setCiLoading]=useState(false);
  const[showQs,setShowQs]=useState(true);
  const[ciTyping,setCiTyping]=useState(false);
  const chatEndRef=useRef(null);
  const[openTrails,setOpenTrails]=useState(new Set());
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
  const runQuery=useCallback((cq)=>{
    const idx=ciMsgs.length+1;
    setCiMsgs(prev=>[...prev,{r:"user",t:cq.q},{r:"ai",t:"",trail:cq.trail,card:cq.card,headline:cq.headline,vis:cq.vis,detail:cq.detail,actions:cq.actions,typing:true}]);
    setOpenTrails(prev=>new Set([...prev,idx]));
    setCiTyping(true);setShowQs(false);
    setTimeout(()=>{
      setCiMsgs(prev=>{const cp=[...prev];cp[cp.length-1]={...cp[cp.length-1],t:cq.headline,typing:false};return cp;});
      setOpenTrails(prev=>{const n=new Set(prev);n.delete(idx);return n;});
      setCiTyping(false);
    },2200);
  },[ciMsgs.length]);
  useEffect(()=>{chatEndRef.current?.scrollIntoView({behavior:"smooth"});},[ciMsgs]);

  const sLine=useMemo(()=>cf.map((w,i)=>{let v=w.fc;if(i>=4)v-=(sDSO-36)*0.15;if(sPin==="w11"&&i>=5&&i<=9)v-=0.4;if(sPin==="w6"&&i>=5)v+=0.3;if(sNW&&i===8)v+=1;if(sNW&&i===9)v-=0.6;if(sGF&&i===8)v+=0.8;if(sGF&&i===9)v-=0.5;if(sWD&&i>=6)v+=0.25;return Math.max(0,Math.round(v*10)/10);}),[sDSO,sNW,sGF,sPin,sWD]);
  const sAct=sDSO!==36||sNW||sGF||sPin!=="w8"||sWD;
  const sMin=Math.min(...sLine),sW13=sLine[12],sBr=sLine.filter(v=>v<4).length;
  const openE=useCallback(k=>setDrw(k),[]);
  const priC={hard:C.red,risk:C.amber,flex:C.blue,normal:C.muted};
  const tabNames={receivables:"Receivables",payables:"Payables",interco:"Intercompany",performance:"Revenue & Performance",cashflow:"Cash Flow & WC",compliance:"Compliance & Tax",iw:"Intelligence Warehouse"};

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
            {group:"Tactical",gc:C.blue,items:[{id:"receivables",icon:"↓",label:"Receivables",badge:"2",bc:C.red},{id:"payables",icon:"↑",label:"Payables",badge:"!",bc:C.amber},{id:"interco",icon:"⇄",label:"Intercompany",badge:"3",bc:C.amber}]},
            {group:"Strategic",gc:C.accent,items:[{id:"performance",icon:"▤",label:"Revenue & Performance"},{id:"cashflow",icon:"◎",label:"Cash Flow & WC"},{id:"compliance",icon:"◇",label:"Compliance & Tax"}]},
            {group:"Conversational",gc:C.amber,items:[{id:"ci",icon:"◈",label:"Conversational Intelligence"}]},
          ].map(g=>(<div key={g.group}>
            <div style={{fontFamily:F.mo,fontSize:7,letterSpacing:"0.1em",color:g.gc,textTransform:"uppercase",padding:"10px 10px 3px"}}>{g.group}</div>
            {g.items.map(n=>(<button key={n.id} onClick={()=>{setTab(n.id);if(n.id==="receivables")setArSub("overview");if(n.id==="payables")setApSub("overview");if(n.id==="interco")setIcSub("overview");if(n.id==="compliance")setCompSub("overview");}} style={{width:"100%",textAlign:"left",display:"flex",alignItems:"center",gap:8,padding:"8px 10px",marginBottom:1,borderRadius:6,border:"none",cursor:"pointer",background:tab===n.id?C.w:"transparent",boxShadow:tab===n.id?"0 1px 2px rgba(0,0,0,0.04)":"none"}}>
              <span style={{fontSize:12,opacity:tab===n.id?1:0.4}}>{n.icon}</span>
              <span style={{fontSize:11.5,fontWeight:tab===n.id?600:400,color:tab===n.id?C.ink:C.sub,lineHeight:1.2}}>{n.label}</span>
              {n.badge&&<span style={{marginLeft:"auto",fontFamily:F.mo,fontSize:8,fontWeight:600,background:n.bc||C.bdr,color:"#fff",padding:"1px 5px",borderRadius:7,minWidth:16,textAlign:"center"}}>{n.badge}</span>}
            </button>))}
          </div>))}
          <div style={{flex:1}}/>
          <div style={{borderTop:`1px solid ${C.bdr}`,padding:"6px 10px"}}><button onClick={()=>setTab("iw")} style={{width:"100%",textAlign:"left",display:"flex",alignItems:"center",gap:8,padding:"8px 10px",borderRadius:6,border:"none",cursor:"pointer",background:tab==="iw"?C.w:"transparent",boxShadow:tab==="iw"?"0 1px 2px rgba(0,0,0,0.04)":"none"}}><span style={{fontSize:12,opacity:tab==="iw"?1:0.4}}>◬</span><span style={{fontSize:11.5,fontWeight:tab==="iw"?600:400,color:tab==="iw"?C.ink:C.sub}}>Intelligence Warehouse</span></button></div>
        </div>
        <div style={{padding:"12px 14px",borderTop:`1px solid ${C.bdr}`}}><div style={{fontFamily:F.mo,fontSize:8,color:C.muted}}>16 March 2026</div><div style={{display:"flex",alignItems:"center",gap:6,marginTop:4}}><div style={{width:20,height:20,borderRadius:"50%",background:C.accent,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,fontWeight:600}}>CF</div><span style={{fontSize:11}}>CFO View</span></div></div>
      </div>

      {/* CONTENT */}
      <div style={{marginLeft:195,flex:1}}><div style={{maxWidth:920,margin:"0 auto",padding:"22px 26px 80px"}}>

        {/* ═══ MORNING BRIEF ═══ */}
        {tab==="brief"&&(<div>
          <div style={{marginBottom:16}}><h1 style={{fontFamily:F.sr,fontSize:21,fontWeight:700,margin:0}}>Morning Brief</h1><p style={{fontSize:12,color:C.sub,marginTop:3}}>Monday, 16 March 2026. 7 items ranked by compound impact.</p></div>
          {/* Close status strip */}
          <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,padding:"10px 14px",marginBottom:14,display:"flex",alignItems:"center",gap:14}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}><div style={{fontFamily:F.sr,fontSize:15,fontWeight:700,color:C.accent}}>Day {closeStatus.day}</div><span style={{fontSize:11,color:C.muted}}>of {closeStatus.of}</span></div>
            <div style={{width:1,height:24,background:C.bdr}}/>
            {closeStatus.items.map((it,i)=>{const pct=Math.round((it.v/it.t)*100);const bc=pct===100?C.accent:pct>70?C.amber:C.red;return(<div key={i} style={{display:"flex",alignItems:"center",gap:4}}><span style={{fontSize:10.5,color:C.sub}}>{it.l}</span><div style={{width:36,height:4,borderRadius:2,background:C.bdr}}><div style={{height:4,borderRadius:2,width:`${pct}%`,background:bc}}/></div><span style={{fontFamily:F.mo,fontSize:9,color:bc,fontWeight:600}}>{it.v}/{it.t}</span></div>);})}
          </div>
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
            {/* DSO trend + Collection forecast side by side */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
              <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,padding:"12px 14px"}}>
                <div style={{fontFamily:F.sr,fontSize:13,fontWeight:700,marginBottom:6}}>DSO Trend (6 months)</div>
                <div style={{display:"flex",alignItems:"flex-end",gap:4,height:48}}>{dsoTrend.map((d,i)=>{const h=Math.max(4,((d.v-28)/20)*48);const c=d.v>35?C.amber:d.v>40?C.red:C.accent;return(<div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center"}}><div style={{fontFamily:F.mo,fontSize:8,color:c,fontWeight:600,marginBottom:2}}>{d.v}d</div><div style={{width:"100%",height:h,background:c+"33",borderRadius:2,border:`1px solid ${c}55`}}/><div style={{fontFamily:F.mo,fontSize:7,color:C.muted,marginTop:2}}>{d.m}</div></div>);})}</div>
                <Callout color={C.amber} icon="→">Steady climb: 33d → 36d over 6 months. At current pace, breaches 40d red threshold by June.</Callout>
              </div>
              <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,padding:"12px 14px"}}>
                <div style={{fontFamily:F.sr,fontSize:13,fontWeight:700,marginBottom:6}}>Collection Forecast (Next 30d)</div>
                {collForecast.map((cf2,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:6,padding:"4px 0",borderBottom:i<collForecast.length-1?`1px solid ${C.bdr}`:"none"}}>
                  <span style={{fontSize:11,fontWeight:500,flex:1,color:cf2.risk?C.red:C.ink,cursor:cf2.link??"default"}} onClick={()=>{const ek=cf2.cust==="Pinnacle"?"pinnacle":cf2.cust==="Clearview"?"clearview":null;if(ek)openE(ek);}}>{cf2.cust}</span>
                  <span style={{fontFamily:F.mo,fontSize:10,fontWeight:600}}>{cf2.amt}</span>
                  <span style={{fontFamily:F.mo,fontSize:9,color:C.muted}}>{cf2.due}</span>
                  <div style={{width:40,height:4,borderRadius:2,background:C.bdr}}><div style={{height:4,borderRadius:2,width:`${cf2.prob}%`,background:cf2.prob>80?C.accent:cf2.prob>50?C.amber:C.red}}/></div>
                  <span style={{fontFamily:F.mo,fontSize:9,color:cf2.prob>80?C.accent:cf2.prob>50?C.amber:C.red,fontWeight:600,minWidth:26}}>{cf2.prob}%</span>
                </div>))}
              </div>
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
            {/* Priority actions */}
            <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,padding:"12px 14px",marginTop:14}}>
              <div style={{fontFamily:F.sr,fontSize:13,fontWeight:700,marginBottom:6}}>Today's Actions</div>
              {arActions.map((a,i)=>{const pc={high:C.red,medium:C.amber,low:C.muted};return(<div key={i} onClick={()=>a.link&&openE(a.link)} style={{display:"flex",gap:8,padding:"6px 0",borderBottom:i<arActions.length-1?`1px solid ${C.bdr}`:"none",cursor:a.link?"pointer":"default"}}>
                <div style={{width:4,height:4,borderRadius:"50%",background:pc[a.pri],marginTop:5,flexShrink:0}}/>
                <span style={{fontSize:11,color:C.ink,lineHeight:1.4}}>{a.action}</span>
              </div>);})}
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
                <div style={{display:"flex",gap:6,marginBottom:8}}>
                  {[{l:"Low Risk (80+)",n:18,c:C.accent},{l:"Medium (60-79)",n:14,c:C.amber},{l:"High (<60)",n:6,c:C.red}].map((b,i)=>(<div key={i} style={{flex:b.n,background:b.c+"18",borderRadius:4,padding:"8px 10px",border:`1px solid ${b.c}22`}}><div style={{fontFamily:F.sr,fontSize:18,fontWeight:700,color:b.c}}>{b.n}</div><div style={{fontSize:9,color:C.sub,marginTop:2}}>{b.l}</div></div>))}
                </div>
                <div style={{fontFamily:F.mo,fontSize:8,color:C.muted,textTransform:"uppercase",marginBottom:3}}>Migration This Month</div>
                {riskMigration.moved.map((m,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}>
                  <Tag bg={{Green:C.al,Amber:C.aml,Red:C.rl}[m.from]} c={{Green:C.accent,Amber:C.amber,Red:C.red}[m.from]}>{m.from}</Tag>
                  <span style={{color:C.muted}}>→</span>
                  <Tag bg={{Green:C.al,Amber:C.aml,Red:C.rl}[m.to]} c={{Green:C.accent,Amber:C.amber,Red:C.red}[m.to]}>{m.to}</Tag>
                  <span style={{fontSize:10,fontWeight:500}}>{m.count} ({m.names})</span>
                </div>))}
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
            {/* Dunning status */}
            <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,padding:"12px 14px",marginTop:14}}>
              <div style={{fontFamily:F.sr,fontSize:13,fontWeight:700,marginBottom:6}}>Dunning Status</div>
              {dunningStatus.map((d,i)=>{const tc=i===0?C.accent:i===1?C.amber:i===2?C.red:C.red;return(<div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<dunningStatus.length-1?`1px solid ${C.bdr}`:"none"}}>
                <div style={{width:4,height:24,borderRadius:2,background:tc,flexShrink:0}}/>
                <div style={{flex:1}}><div style={{fontSize:11,fontWeight:500}}>{d.tier}</div></div>
                <span style={{fontFamily:F.mo,fontSize:10}}>{d.count} customers</span>
                <span style={{fontFamily:F.mo,fontSize:10,fontWeight:600}}>{d.amt}</span>
                <span style={{fontFamily:F.mo,fontSize:9,color:tc}}>{d.rate} response</span>
              </div>);})}
            </div>
            {/* Dunning automation: South vs West */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:10}}>
              {Object.entries(dunningAuto).map(([k,d])=>(<div key={k} style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,padding:"12px 14px",borderLeft:`3px solid ${d.status==="Live"?C.accent:C.red}`}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontFamily:F.sr,fontSize:12,fontWeight:700,textTransform:"capitalize"}}>{k} Region</span><Tag bg={d.status==="Live"?C.al:C.rl} c={d.status==="Live"?C.accent:C.red}>{d.status}</Tag></div>
                {d.status==="Live"?(<div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4,fontSize:10}}>
                    <div><span style={{color:C.muted}}>DSO: </span><span style={{fontWeight:600}}>{d.dso_before}d → {d.dso_after}d</span></div>
                    <div><span style={{color:C.muted}}>Rate: </span><span style={{fontWeight:600}}>{d.rate_before}% → {d.rate_after}%</span></div>
                    <div><span style={{color:C.muted}}>Freed: </span><span style={{fontWeight:600,color:C.accent}}>{d.freed}</span></div>
                    <div><span style={{color:C.muted}}>Since: </span><span>{d.since}</span></div>
                  </div>
                </div>):(<div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4,fontSize:10}}>
                    <div><span style={{color:C.muted}}>DSO: </span><span style={{fontWeight:600,color:C.red}}>{d.dso}d</span></div>
                    <div><span style={{color:C.muted}}>Rate: </span><span style={{fontWeight:600,color:C.red}}>{d.rate}%</span></div>
                    <div><span style={{color:C.muted}}>Potential: </span><span style={{fontWeight:600,color:C.accent}}>{d.potential}</span></div>
                    <div><span style={{color:C.muted}}>Config: </span><span>{d.config}</span></div>
                  </div>
                  <Callout color={C.accent} icon="→">Roll out to West: {d.config} config, {d.potential} freed in 60d. Highest-ROI action available.</Callout>
                </div>)}
              </div>))}
            </div>
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
          <div style={{marginBottom:12}}><h1 style={{fontFamily:F.sr,fontSize:21,fontWeight:700,margin:0}}>Payables</h1><p style={{fontSize:12,color:C.sub,marginTop:3}}>Vendor management, SOA reconciliation, payment scheduling, and three-way matching. Click any row for entity profile.</p></div>
          <div style={{display:"flex",gap:0,marginBottom:16,borderBottom:`1px solid ${C.bdr}`}}>
            {[{id:"overview",l:"Overview"},{id:"vendors",l:"Vendors"},{id:"recon",l:"Reconciliation"},{id:"payments",l:"Payments"}].map(s=>(<button key={s.id} onClick={()=>setApSub(s.id)} style={{fontFamily:F.mn,fontSize:11.5,fontWeight:apSub===s.id?600:400,color:apSub===s.id?C.accent:C.muted,background:"none",border:"none",cursor:"pointer",padding:"8px 14px",borderBottom:apSub===s.id?`2px solid ${C.accent}`:"2px solid transparent"}}>{s.l}</button>))}
          </div>

          {/* OVERVIEW */}
          {apSub==="overview"&&(<div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:16}}>
              <Stat label="Total Payables" value="₹26.0Cr" sub="98 invoices, 24 vendors" trend="DPO: 41d (target 45d)" tc={C.amber}/>
              <Stat label="Due Next 7 Days" value="₹6.4Cr" sub="Atlas + Northway + Greenfield" trend="W9 convergence" tc={C.red}/>
              <Stat label="Recon Complete" value="14/24" sub="58% of vendors reconciled" trend="4 awaiting sign-off" tc={C.amber}/>
              <Stat label="Open Exceptions" value="18" sub="₹15.2L total" trend="12 auto-resolved" tc={C.amber}/>
            </div>
            <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,padding:"12px 14px",marginBottom:14}}>
              <div style={{fontFamily:F.sr,fontSize:13,fontWeight:700,marginBottom:2}}>AP Ageing</div>
              <AgeBar data={apAge} note="Clean. 77% within terms. Week 9 convergence (₹6.4Cr in 4 days) is the only pressure point."/>
            </div>
            {/* Morrie agent workflow status */}
            <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,padding:"12px 14px",marginBottom:14}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <div style={{fontFamily:F.sr,fontSize:13,fontWeight:700}}>Morrie Agent Status</div>
                <Tag bg={C.al} c={C.accent}>Auto-reconciliation active</Tag>
              </div>
              <div style={{fontSize:10.5,color:C.muted,marginBottom:10}}>End-to-end vendor reconciliation workflow. SOA retrieval, parsing, matching, exception report, sign-off.</div>
              {morrieStatus.map((s,i)=>{const pct=Math.round((s.count/s.of)*100);const bc=pct===100?C.accent:pct>50?C.amber:C.muted;return(
                <div key={i} style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
                  <div style={{flex:1,fontSize:11.5}}>{s.action}</div>
                  <div style={{width:120,height:5,borderRadius:2,background:C.bdr}}><div style={{height:5,borderRadius:2,width:`${pct}%`,background:bc}}/></div>
                  <span style={{fontFamily:F.mo,fontSize:10,color:bc,fontWeight:600,minWidth:45,textAlign:"right"}}>{s.count}/{s.of}</span>
                </div>
              );})}
            </div>
            {/* Invoice processing pipeline */}
            <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,padding:"12px 14px",marginBottom:14}}>
              <div style={{fontFamily:F.sr,fontSize:13,fontWeight:700,marginBottom:8}}>Invoice Processing Pipeline (MTD)</div>
              <div style={{display:"flex",gap:2,alignItems:"flex-end"}}>{payPipeline.map((p,i)=>{const pct=Math.round((p.count/payPipeline[0].count)*100);const c=i<3?C.blue:i<5?C.accent:C.accent;return(<div key={i} style={{flex:1,textAlign:"center"}}>
                <div style={{fontFamily:F.mo,fontSize:9,fontWeight:600,color:c,marginBottom:2}}>{p.count}</div>
                <div style={{height:Math.max(8,pct*0.5),background:c+"33",borderRadius:"3px 3px 0 0",border:`1px solid ${c}44`,borderBottom:"none"}}/>
                <div style={{background:c,height:2,borderRadius:0}}/>
                <div style={{fontFamily:F.mo,fontSize:7,color:C.muted,marginTop:3}}>{p.stage}</div>
                <div style={{fontFamily:F.mo,fontSize:8,color:C.sub}}>{p.amt}</div>
              </div>)})}</div>
              <div style={{fontSize:10.5,color:C.sub,marginTop:6}}>4 invoices stuck at Booked → Matched (GRN pending). 8 at Matched → Approved (manager sign-off). Bottleneck: approval queue.</div>
            </div>
            {/* AP transactions */}
            <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,overflow:"hidden"}}>
              <div style={{padding:"10px 14px",borderBottom:`1px solid ${C.bdr}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontFamily:F.sr,fontSize:13,fontWeight:700}}>Recent AP</span><span style={{fontFamily:F.mo,fontSize:9,color:C.muted}}>Showing 5 of 98 transactions</span></div>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:11.5}}><thead><tr style={{borderBottom:`1px solid ${C.bdr}`}}>{["ID","Date","Entity","Amount","Status",""].map(h=><th key={h} style={{padding:"5px 12px",textAlign:"left",fontFamily:F.mo,fontSize:8,fontWeight:600,color:C.muted,textTransform:"uppercase"}}>{h}</th>)}</tr></thead><tbody>{txns.filter(t=>t.ty==="AP").map(tx=><tr key={tx.id} onClick={()=>tx.ek&&openE(tx.ek)} style={{borderBottom:`1px solid ${C.bdr}`,cursor:tx.ek?"pointer":"default"}} onMouseEnter={e=>{if(tx.ek)e.currentTarget.style.background=C.al+"44"}} onMouseLeave={e=>e.currentTarget.style.background="transparent"}><td style={{padding:"7px 12px",fontFamily:F.mo,fontSize:10,color:C.sub}}>{tx.id}</td><td style={{padding:"7px 12px",color:C.sub}}>{tx.dt}</td><td style={{padding:"7px 12px",fontWeight:500}}>{tx.ent}</td><td style={{padding:"7px 12px",fontFamily:F.mo,fontSize:11,fontWeight:600}}>{tx.amt}</td><td style={{padding:"7px 12px",fontSize:10.5,color:C.sub}}>{tx.st}</td><td style={{padding:"7px 12px"}}>{tx.fl&&<Tag bg={C.rl} c={C.red}>{tx.fl}</Tag>}</td></tr>)}</tbody></table>
            </div>
            <ChatInput placeholder="e.g. Which vendors still need SOA reconciliation?"/>
          </div>)}

          {/* VENDORS */}
          {apSub==="vendors"&&(<div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:16}}>
              <Stat label="Active Vendors" value="24" sub="5 strategic, 19 operational"/>
              <Stat label="Held/Blocked" value="₹0.87L" sub="1 invoice (Kiran dup)" trend="Auto-held by IW"/>
              <Stat label="Term Requests" value="4" sub="₹2.8Cr/mo impact" trend="2 accept, 2 counter" tc={C.amber}/>
              <Stat label="Early-pay Opportunity" value="₹4.2L/yr" sub="3 vendors eligible" trend="WC neutral"/>
            </div>
            <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,overflow:"hidden",marginBottom:14}}>
              <div style={{padding:"10px 14px",borderBottom:`1px solid ${C.bdr}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontFamily:F.sr,fontSize:13,fontWeight:700}}>Vendor Health</span><span style={{fontFamily:F.mo,fontSize:9,color:C.muted}}>Showing 5 of 24 vendors · <span style={{color:C.accent,cursor:"pointer"}}>View all →</span></span></div>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}><thead><tr style={{borderBottom:`1px solid ${C.bdr}`}}>{["Vendor","Health","Terms","On-Time","Volume","Renewal","Flag"].map(h=><th key={h} style={{padding:"5px 10px",textAlign:"left",fontFamily:F.mo,fontSize:8,fontWeight:600,color:C.muted,textTransform:"uppercase"}}>{h}</th>)}</tr></thead>
                <tbody>{vendorHealth.map((v,i)=>{const nm=E[v.ek]?.name;const hc=v.health>=80?C.accent:v.health>=60?C.amber:C.red;return(<tr key={i} onClick={()=>openE(v.ek)} style={{borderBottom:`1px solid ${C.bdr}`,cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.background=C.al+"44"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}><td style={{padding:"7px 10px",fontWeight:500}}>{nm}</td><td style={{padding:"7px 10px"}}><span style={{fontFamily:F.mo,fontSize:10,fontWeight:700,color:hc}}>{v.health}</span></td><td style={{padding:"7px 10px",fontSize:10}}>{v.terms}</td><td style={{padding:"7px 10px",fontFamily:F.mo,fontSize:10}}>{v.onTime}</td><td style={{padding:"7px 10px",fontFamily:F.mo,fontSize:10}}>{v.vol}</td><td style={{padding:"7px 10px",fontSize:10,color:C.sub}}>{v.renewal}</td><td style={{padding:"7px 10px"}}>{v.flag&&<span style={{fontSize:9.5,color:C.amber}}>{v.flag}</span>}</td></tr>);})}</tbody>
              </table>
            </div>
            <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,padding:"12px 14px"}}>
              <div style={{fontFamily:F.sr,fontSize:13,fontWeight:700,marginBottom:2}}>Term Change Requests</div>
              <div style={{fontSize:10.5,color:C.muted,marginBottom:8}}>4 vendors requesting shorter terms. Combined: ₹2.8Cr/month hits 15 days earlier. IW mapped leverage positions.</div>
              {termChanges.map((t,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<termChanges.length-1?`1px solid ${C.bdr}`:"none"}}>
                <span style={{fontSize:11.5,fontWeight:500,minWidth:130}}>{t.vendor}</span>
                <span style={{fontFamily:F.mo,fontSize:10,color:C.muted}}>{t.current} → {t.requested}</span>
                <span style={{fontFamily:F.mo,fontSize:10,color:C.red,flex:1}}>{t.impact}</span>
                <Tag bg={t.rec==="Accept"?C.gl:C.aml} c={t.rec==="Accept"?C.green:C.amber}>{t.rec}</Tag>
              </div>))}
              <Callout color={C.amber} icon="⚠">MSME credit-tightening signal. Accept where you have alternatives, counter where sole-source. Accepting all four permanently compresses working capital by ₹2.8Cr/month.</Callout>
            </div>
            <ChatInput placeholder="e.g. Which vendors have upcoming contract renewals?"/>
          </div>)}

          {/* RECONCILIATION */}
          {apSub==="recon"&&(<div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:16}}>
              <Stat label="Vendors Reconciled" value="14/24" sub="58% complete" trend="6 in progress" tc={C.amber}/>
              <Stat label="Overall Match Rate" value="93.2%" sub="Across all received SOAs" trend="▲ from 88% last quarter" tc={C.accent}/>
              <Stat label="Open Exceptions" value="18" sub="Across 6 categories" trend="₹15.2L total" tc={C.amber}/>
              <Stat label="Three-way Match" value={`${threeWay.fullMatch}%`} sub="PO → GRN → Invoice" trend={`${threeWay.pending} pending review`}/>
            </div>

            {/* Matching rules captured by Morrie */}
            <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,padding:"12px 14px",marginBottom:14}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                <div style={{fontFamily:F.sr,fontSize:13,fontWeight:700}}>IW Matching Rules</div>
                <Tag bg={C.al} c={C.accent}>Captured by Morrie</Tag>
              </div>
              <div style={{fontSize:10.5,color:C.muted,marginBottom:8}}>Rules extracted through Morrie's conversation with the finance team. No configuration forms. Stored in the Intelligence Graph and applied automatically.</div>
              {matchRules.map((r,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<matchRules.length-1?`1px solid ${C.bdr}`:"none"}}>
                <div style={{flex:1}}><div style={{fontSize:11.5,fontWeight:500}}>{r.rule}</div><div style={{fontSize:10,color:C.muted}}>{r.source}</div></div>
                <Tag bg={r.confidence==="High"?C.al:C.aml} c={r.confidence==="High"?C.accent:C.amber}>{r.confidence}</Tag>
                <span style={{fontFamily:F.mo,fontSize:10,color:C.accent,minWidth:55,textAlign:"right"}}>{r.matched}/{r.applied}</span>
              </div>))}
            </div>

            {/* Vendor recon table — clickable rows */}
            <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,overflow:"hidden",marginBottom:14}}>
              <div style={{padding:"10px 14px",borderBottom:`1px solid ${C.bdr}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontFamily:F.sr,fontSize:13,fontWeight:700}}>Vendor Reconciliation Status</span><span style={{fontFamily:F.mo,fontSize:9,color:C.muted}}>Click any vendor for detail · 8 of 24</span></div>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
                <thead><tr style={{borderBottom:`1px solid ${C.bdr}`}}>{["Vendor","SOA","Matched","Rate","Exc.","Status","Sign-off",""].map(h=><th key={h} style={{padding:"5px 8px",textAlign:"left",fontFamily:F.mo,fontSize:8,fontWeight:600,color:C.muted,textTransform:"uppercase"}}>{h}</th>)}</tr></thead>
                <tbody>{vendorRecon.map((v,i)=>{const nm=v.ek?E[v.ek]?.name:v.name;const rc=v.rate>=95?C.accent:v.rate>=85?C.amber:v.rate>0?C.red:C.muted;const sc={Received:C.accent,Requested:C.amber,"Not requested":C.muted};const rsc={"Complete":C.accent,"In Progress":C.amber,"Awaiting SOA":C.muted,"Not started":C.muted};const isSel=selVendorRecon===i;return(<Fragment key={i}>
                  <tr key={i} onClick={()=>setSelVendorRecon(isSel?null:i)} style={{borderBottom:isSel?"none":`1px solid ${C.bdr}`,cursor:"pointer",background:isSel?C.al+"44":v.recon==="Awaiting SOA"||v.recon==="Not started"?C.bg:"transparent"}} onMouseEnter={e=>{if(!isSel)e.currentTarget.style.background=C.al+"22"}} onMouseLeave={e=>{if(!isSel)e.currentTarget.style.background=v.recon==="Awaiting SOA"||v.recon==="Not started"?C.bg:"transparent"}}>
                    <td style={{padding:"7px 8px",fontWeight:500}}>{nm}</td>
                    <td style={{padding:"7px 8px"}}><span style={{fontSize:10,color:sc[v.soaStatus]||C.muted}}>{v.soaStatus}</span></td>
                    <td style={{padding:"7px 8px",fontFamily:F.mo,fontSize:10}}>{v.total>0?`${v.matched}/${v.total}`:"-"}</td>
                    <td style={{padding:"7px 8px"}}>{v.rate>0?<span style={{fontFamily:F.mo,fontSize:10,fontWeight:600,color:rc}}>{v.rate}%</span>:<span style={{color:C.muted}}>-</span>}</td>
                    <td style={{padding:"7px 8px",fontFamily:F.mo,fontSize:10,color:v.exceptions>0?C.red:C.accent}}>{v.exceptions||"0"}</td>
                    <td style={{padding:"7px 8px"}}><Tag bg={(rsc[v.recon]||C.muted)+"18"} c={rsc[v.recon]||C.muted}>{v.recon}</Tag></td>
                    <td style={{padding:"7px 8px",fontSize:10,color:C.sub}}>{v.signoff||"-"}</td>
                    <td style={{padding:"7px 8px"}}><div style={{display:"flex",gap:4}}>{v.recon==="Complete"&&<span style={{fontFamily:F.mo,fontSize:8,color:C.accent,cursor:"pointer"}}>PDF</span>}{v.ek&&<span style={{fontFamily:F.mo,fontSize:8,color:C.blue,cursor:"pointer"}} onClick={e=>{e.stopPropagation();openE(v.ek);}}>Profile</span>}</div></td>
                  </tr>
                  {isSel&&(<tr key={i+"det"}><td colSpan={8} style={{padding:"10px 14px",background:C.bg,borderBottom:`1px solid ${C.bdr}`}}>
                    {v.exceptions>0?(<div>
                      <div style={{fontFamily:F.mo,fontSize:8,color:C.red,textTransform:"uppercase",marginBottom:6}}>Exceptions for {nm}</div>
                      {v.excTypes.map((exc,j)=>(<div key={j} style={{display:"flex",alignItems:"center",gap:6,padding:"4px 0",borderBottom:j<v.excTypes.length-1?`1px solid ${C.bdr}`:"none"}}>
                        <div style={{width:4,height:4,borderRadius:"50%",background:C.red,flexShrink:0}}/>
                        <span style={{fontSize:11,color:C.sub}}>{exc}</span>
                      </div>))}
                    </div>):v.recon==="Complete"?(<div style={{fontSize:11,color:C.accent}}>Fully reconciled. {v.matched} of {v.total} items matched. No exceptions.</div>):(<div style={{fontSize:11,color:C.muted}}>{v.recon==="Awaiting SOA"?"SOA request sent. Awaiting vendor response.":v.recon==="Not started"?"SOA not yet requested for this vendor.":"Reconciliation in progress."}</div>)}
                  </td></tr>)}
                </Fragment>);})}</tbody>
              </table>
            </div>

            {/* Exception categories — clickable drill-down */}
            <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,padding:"12px 14px",marginBottom:14}}>
              <div style={{fontFamily:F.sr,fontSize:13,fontWeight:700,marginBottom:2}}>Exception Categories</div>
              <div style={{fontSize:10.5,color:C.muted,marginBottom:8}}>Click any category to see individual mismatches with root cause and vendor detail.</div>
              {apExceptions.map((ex,i)=>{const isSel=selExc===ex.type;return(<div key={i}>
                <div onClick={()=>setSelExc(isSel?null:ex.type)} style={{padding:"8px 0",borderBottom:!isSel&&i<apExceptions.length-1?`1px solid ${C.bdr}`:"none",cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.background=C.bg} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:2}}>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      <div style={{width:4,height:22,borderRadius:2,background:ex.color,flexShrink:0}}/>
                      <span style={{fontSize:12,fontWeight:500}}>{ex.type}</span>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <Tag bg={C.bg} c={C.sub}>{ex.count} items</Tag>
                      <span style={{fontFamily:F.mo,fontSize:11,fontWeight:700,color:ex.color}}>{ex.amt}</span>
                      <span style={{color:C.muted,fontSize:10,transition:"transform 0.2s",transform:isSel?"rotate(180deg)":"none"}}>▾</span>
                    </div>
                  </div>
                  {!isSel&&<div style={{fontSize:10.5,color:C.sub,paddingLeft:10}}>{ex.desc}</div>}
                </div>
                {/* Drill-down: individual items */}
                {isSel&&excItems[ex.type]&&(<div style={{padding:"8px 10px",marginBottom:8,background:C.bg,borderRadius:5,border:`1px solid ${ex.color}22`}}>
                  {excItems[ex.type].map((item,j)=>(<div key={j} onClick={e=>{e.stopPropagation();if(item.ek)openE(item.ek);}} style={{padding:"8px 0",borderBottom:j<excItems[ex.type].length-1?`1px solid ${C.bdr}`:"none",cursor:item.ek?"pointer":"default"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:2}}>
                      <span style={{fontSize:11.5,fontWeight:500,color:item.ek?C.accent:C.ink}}>{item.vendor}</span>
                      <div style={{display:"flex",gap:8,alignItems:"center"}}>
                        <span style={{fontFamily:F.mo,fontSize:9,color:C.muted}}>{item.soaRef||item.erpRef}</span>
                        <span style={{fontFamily:F.mo,fontSize:10,fontWeight:600,color:ex.color}}>{item.soaAmt||item.erpAmt}{item.delta?` (${item.delta})`:""}</span>
                        <span style={{fontFamily:F.mo,fontSize:9,color:C.muted}}>{item.age}d</span>
                      </div>
                    </div>
                    <div style={{fontSize:10.5,color:C.sub}}>{item.root}</div>
                  </div>))}
                </div>)}
              </div>);})}
              <div style={{display:"flex",justifyContent:"space-between",marginTop:8,paddingTop:6,borderTop:`1px solid ${C.bdr}`}}>
                <span style={{fontWeight:600}}>Total open</span>
                <span style={{fontFamily:F.mo,fontWeight:700,color:C.red}}>₹15.2L across 18 items</span>
              </div>
            </div>

            {/* Three-way matching */}
            <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,padding:"12px 14px"}}>
              <div style={{fontFamily:F.sr,fontSize:13,fontWeight:700,marginBottom:8}}>Three-Way Matching</div>
              <div style={{display:"flex",gap:6,alignItems:"center",marginBottom:10}}>
                {[{l:"PO → GRN",v:`${threeWay.poToGrn}%`,c:C.accent},{l:"→",v:"",c:C.muted},{l:"GRN → Invoice",v:`${threeWay.grnToInv}%`,c:threeWay.grnToInv<95?C.amber:C.accent},{l:"→",v:"",c:C.muted},{l:"Full Match",v:`${threeWay.fullMatch}%`,c:threeWay.fullMatch<95?C.amber:C.accent}].map((s,i)=>s.v?
                  (<div key={i} style={{background:s.c+"15",borderRadius:6,padding:"8px 14px",border:`1px solid ${s.c}22`,textAlign:"center"}}>
                    <div style={{fontFamily:F.mo,fontSize:8,color:s.c,textTransform:"uppercase"}}>{s.l}</div>
                    <div style={{fontFamily:F.sr,fontSize:18,fontWeight:700,color:s.c,marginTop:2}}>{s.v}</div>
                  </div>):
                  (<span key={i} style={{color:C.bdr,fontSize:14}}>→</span>)
                )}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
                <div style={{background:C.bg,borderRadius:4,padding:"6px 8px",textAlign:"center"}}><div style={{fontFamily:F.mo,fontSize:7,color:C.muted,textTransform:"uppercase"}}>Exceptions</div><div style={{fontFamily:F.sr,fontSize:16,fontWeight:700}}>{threeWay.exceptions}</div></div>
                <div style={{background:C.al,borderRadius:4,padding:"6px 8px",textAlign:"center"}}><div style={{fontFamily:F.mo,fontSize:7,color:C.accent,textTransform:"uppercase"}}>Auto-resolved</div><div style={{fontFamily:F.sr,fontSize:16,fontWeight:700,color:C.accent}}>{threeWay.autoResolved}</div></div>
                <div style={{background:C.aml,borderRadius:4,padding:"6px 8px",textAlign:"center"}}><div style={{fontFamily:F.mo,fontSize:7,color:C.amber,textTransform:"uppercase"}}>Pending Review</div><div style={{fontFamily:F.sr,fontSize:16,fontWeight:700,color:C.amber}}>{threeWay.pending}</div></div>
              </div>
            </div>
            <ChatInput placeholder="e.g. Show all TDS exceptions above ₹1L"/>
          </div>)}

          {/* PAYMENTS */}
          {apSub==="payments"&&(<div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:16}}>
              <Stat label="Due This Week" value="₹20.4L" sub="2 vendors" trend="All within terms"/>
              <Stat label="Due Next Week" value="₹6.4Cr" sub="W9 convergence" trend="Action needed" tc={C.red}/>
              <Stat label="Held" value="₹0.87L" sub="Kiran duplicate" trend="Auto-held"/>
              <Stat label="Scheduled" value="₹8.2Cr" sub="Next 3 runs" trend="9 vendors"/>
            </div>
            {/* Payment runs */}
            <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,padding:"12px 14px",marginBottom:14}}>
              <div style={{fontFamily:F.sr,fontSize:13,fontWeight:700,marginBottom:8}}>Payment Runs</div>
              {paymentRuns.map((pr,i)=>{const sc=pr.status==="Scheduled"?C.accent:pr.status==="Queued"?C.amber:C.muted;return(<div key={i} style={{marginBottom:i<paymentRuns.length-1?10:0}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4,cursor:"pointer"}}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}><Tag bg={sc+"18"} c={sc}>{pr.status}</Tag><span style={{fontFamily:F.mo,fontSize:10,color:C.muted}}>{pr.id}</span><span style={{fontSize:12,fontWeight:500}}>{pr.dt}</span></div>
                  <div style={{display:"flex",gap:8,alignItems:"center"}}><span style={{fontSize:10,color:C.sub}}>{pr.vendors} vendors</span><span style={{fontFamily:F.mo,fontSize:12,fontWeight:700}}>{pr.total}</span></div>
                </div>
                {/* Items in this run */}
                <div style={{paddingLeft:12,borderLeft:`2px solid ${sc}33`}}>
                  {pr.items.map((it,j)=>{const pc={hard:C.red,grace:C.amber,normal:C.accent,held:C.muted};return(<div key={j} style={{display:"flex",alignItems:"center",gap:6,padding:"3px 0",borderBottom:j<pr.items.length-1?`1px solid ${C.bdr}`:"none"}}>
                    <div style={{width:4,height:4,borderRadius:"50%",background:pc[it.pri]||C.bdr,flexShrink:0}}/>
                    <span style={{fontSize:11,flex:1}}>{it.v}</span>
                    <span style={{fontFamily:F.mo,fontSize:10,fontWeight:600}}>{it.a}</span>
                    {it.pri==="hard"&&<span style={{fontFamily:F.mo,fontSize:8,color:C.red}}>hard date</span>}
                    {it.pri==="grace"&&<span style={{fontFamily:F.mo,fontSize:8,color:C.amber}}>grace avail</span>}
                    {it.pri==="held"&&<span style={{fontFamily:F.mo,fontSize:8,color:C.muted}}>held</span>}
                  </div>);})}
                </div>
              </div>);})}
            </div>
            {/* Calendar view */}
            <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,padding:"12px 14px",marginBottom:14}}>
              <div style={{fontFamily:F.sr,fontSize:13,fontWeight:700,marginBottom:6}}>Upcoming Payments</div>
              {upcom.map((p,i)=><div key={i} onClick={()=>p.ek&&openE(p.ek)} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 8px",marginBottom:2,borderRadius:4,cursor:p.ek?"pointer":"default",background:p.pri==="hard"?C.rl+"44":p.pri==="risk"?C.aml+"44":"transparent",borderLeft:`3px solid ${priC[p.pri]||C.bdr}`}}><span style={{fontFamily:F.mo,fontSize:10,color:C.sub,minWidth:42}}>{p.dt}</span><span style={{fontSize:11.5,fontWeight:500,flex:1}}>{p.ent}</span><span style={{fontFamily:F.mo,fontSize:11,fontWeight:600,minWidth:50,textAlign:"right"}}>{p.amt}</span>{p.note&&<span style={{fontSize:9.5,color:priC[p.pri],maxWidth:150}}>{p.note}</span>}</div>)}
              <Callout color={C.red} icon="▼">Week 9 convergence: ₹6.4Cr in 4 days. Shift Northway + Greenfield (PR-128) to flatten. Model in Cash Flow.</Callout>
            </div>
            <ChatInput placeholder="e.g. What payments can I safely defer this week?"/>
          </div>)}
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

        {/* ═══ INTERCOMPANY ═══ */}
        {tab==="interco"&&(<div>
          <div style={{marginBottom:12}}><h1 style={{fontFamily:F.sr,fontSize:21,fontWeight:700,margin:0}}>Intercompany</h1><p style={{fontSize:12,color:C.sub,marginTop:3}}>Entity-to-entity balances, transaction matching, and consolidation readiness.</p></div>
          <div style={{display:"flex",gap:0,marginBottom:16,borderBottom:`1px solid ${C.bdr}`}}>
            {[{id:"overview",l:"Overview"},{id:"balances",l:"Balances"},{id:"matching",l:"Matching"}].map(s=>(<button key={s.id} onClick={()=>setIcSub(s.id)} style={{fontFamily:F.mn,fontSize:11.5,fontWeight:icSub===s.id?600:400,color:icSub===s.id?C.accent:C.muted,background:"none",border:"none",cursor:"pointer",padding:"8px 14px",borderBottom:icSub===s.id?`2px solid ${C.accent}`:"2px solid transparent"}}>{s.l}</button>))}
          </div>

          {icSub==="overview"&&(<div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:16}}>
              <Stat label="Total IC Exposure" value="₹5.4Cr" sub="4 entity pairs" trend="₹3.4Cr unreconciled" tc={C.red}/>
              <Stat label="Reconciled Pairs" value="1/4" sub="Group FCRP only" trend="3 blocking close" tc={C.red}/>
              <Stat label="Open Exceptions" value="5" sub="₹3.9Cr total" trend="1 TP, 2 posting, 1 timing, 1 PO-SO" tc={C.amber}/>
              <Stat label="Consolidation" value="Blocked" sub="IC imbalance > threshold" trend="Day 5 of close" tc={C.red}/>
            </div>
            {/* IC entity pair cards */}
            {icPairs.map((p,i)=>{const rc=p.rate>=95?C.accent:p.rate>=80?C.amber:p.rate>0?C.red:C.muted;return(
              <div key={i} style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,padding:"12px 14px",marginBottom:8,borderLeft:`3px solid ${p.bal>1?C.red:p.bal>0?C.amber:C.accent}`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:13,fontWeight:600}}>{p.a}</span><span style={{fontFamily:F.mo,fontSize:10,color:C.muted}}>{p.dir==="a>b"?"→":p.dir==="b>a"?"←":"⇄"}</span><span style={{fontSize:13,fontWeight:600}}>{p.b}</span></div>
                  <div style={{display:"flex",gap:8,alignItems:"center"}}>{p.rate>0&&<span style={{fontFamily:F.mo,fontSize:10,color:rc}}>{p.rate}% matched</span>}<span style={{fontFamily:F.mo,fontSize:12,fontWeight:700,color:p.bal>0?C.red:C.accent}}>{p.bal>0?`₹${p.bal}Cr open`:"Reconciled"}</span></div>
                </div>
                <div style={{fontSize:10.5,color:C.sub}}>{p.note}</div>
              </div>);})}
            {/* Bilateral ledger */}
            <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,padding:"12px 14px",marginBottom:14}}>
              <div style={{fontFamily:F.sr,fontSize:13,fontWeight:700,marginBottom:6}}>Bilateral Ledger</div>
              <div style={{fontSize:10.5,color:C.muted,marginBottom:8}}>What each entity says it owes vs what the other says it's owed. The delta is the reconciliation gap.</div>
              {icBilateral.map((b,i)=>{const dc=b.delta==="₹0"?C.accent:parseFloat(b.delta.replace(/[₹Cr]/g,""))>1?C.red:C.amber;return(<div key={i} style={{marginBottom:i<icBilateral.length-1?8:0,padding:"10px 12px",background:C.bg,borderRadius:6,borderLeft:`3px solid ${dc}`}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:12,fontWeight:600}}>{b.pair}</span><span style={{fontFamily:F.mo,fontSize:11,fontWeight:700,color:dc}}>{b.delta==="₹0"?"Balanced":b.delta+" gap"}</span></div>
                <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:6,marginBottom:4}}>
                  <div style={{textAlign:"center",padding:"4px 8px",background:C.w,borderRadius:4}}><div style={{fontFamily:F.mo,fontSize:7,color:C.muted}}>ENTITY A BOOKS</div><div style={{fontFamily:F.mo,fontSize:12,fontWeight:600}}>{b.aBooks}</div></div>
                  <div style={{display:"flex",alignItems:"center",fontSize:10,color:C.muted}}>vs</div>
                  <div style={{textAlign:"center",padding:"4px 8px",background:C.w,borderRadius:4}}><div style={{fontFamily:F.mo,fontSize:7,color:C.muted}}>ENTITY B BOOKS</div><div style={{fontFamily:F.mo,fontSize:12,fontWeight:600}}>{b.bBooks}</div></div>
                </div>
                <div style={{fontSize:10,color:C.sub,marginBottom:2}}>{b.root}</div>
                {b.delta!=="₹0"&&<div style={{fontSize:10,color:C.accent,fontWeight:500}}>Action: {b.action}</div>}
              </div>);})}
            </div>
            <Callout color={C.red} icon="▼">IC imbalance is the critical path blocker for period close. Parent ↔ Manufacturing (₹3.4Cr) is the largest. Manufacturing posted; Parent journal prepared but not posted. Resolving this single item unblocks consolidation.</Callout>
            <ChatInput placeholder="e.g. What's blocking consolidation?"/>
          </div>)}

          {icSub==="balances"&&(<div>
            <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,overflow:"hidden",marginBottom:14}}>
              <div style={{padding:"10px 14px",borderBottom:`1px solid ${C.bdr}`}}><span style={{fontFamily:F.sr,fontSize:13,fontWeight:700}}>IC Balance Register</span></div>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}><thead><tr style={{borderBottom:`1px solid ${C.bdr}`}}>{["Entity A","","Entity B","Balance","Matched","Rate","Status"].map(h=><th key={h} style={{padding:"5px 10px",textAlign:"left",fontFamily:F.mo,fontSize:8,fontWeight:600,color:C.muted,textTransform:"uppercase"}}>{h}</th>)}</tr></thead>
                <tbody>{icPairs.map((p,i)=>{const rc=p.rate>=95?C.accent:p.rate>=80?C.amber:C.red;return(
                  <tr key={i} style={{borderBottom:`1px solid ${C.bdr}`,background:p.bal>1?C.rl+"22":"transparent"}}>
                    <td style={{padding:"7px 10px",fontWeight:500}}>{p.a}</td>
                    <td style={{padding:"7px 10px",fontFamily:F.mo,fontSize:10,color:C.muted}}>{p.dir==="a>b"?"owes →":p.dir==="b>a"?"← owed":"—"}</td>
                    <td style={{padding:"7px 10px",fontWeight:500}}>{p.b}</td>
                    <td style={{padding:"7px 10px",fontFamily:F.mo,fontSize:11,fontWeight:700,color:p.bal>0?C.red:C.accent}}>₹{p.bal}Cr</td>
                    <td style={{padding:"7px 10px",fontFamily:F.mo,fontSize:10}}>{p.total>0?`${p.matched}/${p.total}`:"-"}</td>
                    <td style={{padding:"7px 10px"}}><span style={{fontFamily:F.mo,fontSize:10,fontWeight:600,color:rc}}>{p.rate||100}%</span></td>
                    <td style={{padding:"7px 10px"}}><Tag bg={p.bal===0?C.gl:p.bal>1?C.rl:C.aml} c={p.bal===0?C.green:p.bal>1?C.red:C.amber}>{p.bal===0?"Reconciled":p.bal>1?"Open":"In Progress"}</Tag></td>
                  </tr>);})}</tbody>
              </table>
            </div>
            {/* Aging breakdown for worst pair */}
            <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,padding:"12px 14px"}}>
              <div style={{fontFamily:F.sr,fontSize:13,fontWeight:700,marginBottom:6}}>Aging: Parent ↔ Manufacturing (₹3.4Cr)</div>
              <div style={{display:"flex",gap:8}}>{icPairs[0].aging.map((a,i)=>{const bc=a.b==="Current"?C.accent:a.b==="1-30d"?C.amber:C.red;return(<div key={i} style={{flex:1,background:bc+"12",borderRadius:5,padding:"8px 10px",border:`1px solid ${bc}22`,textAlign:"center"}}><div style={{fontFamily:F.mo,fontSize:8,color:bc,textTransform:"uppercase"}}>{a.b}</div><div style={{fontFamily:F.sr,fontSize:16,fontWeight:700,color:bc}}>₹{a.a}Cr</div></div>)})}</div>
            </div>
            <ChatInput placeholder="e.g. Which IC pairs have items older than 30 days?"/>
          </div>)}

          {icSub==="matching"&&(<div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:14}}>
              <Stat label="Open Exceptions" value="5" sub="₹3.9Cr total"/>
              <Stat label="Blocking Close" value="2" sub="Posting gap + TP" tc={C.red}/>
              <Stat label="Auto-resolvable" value="1" sub="Timing (₹0.8Cr)" tc={C.accent}/>
            </div>
            <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,padding:"12px 14px",marginBottom:14}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}><div style={{fontFamily:F.sr,fontSize:13,fontWeight:700}}>IC Exception Register</div><span style={{fontFamily:F.mo,fontSize:9,color:C.muted}}>5 exceptions · 3 entity pairs</span></div>
              {icExceptions.map((ex,i)=>{const tc=ex.type==="Posting gap"?C.red:ex.type==="TP adjustment"?C.amber:ex.type==="Timing"?C.accent:C.blue;const wf=ex.type==="Timing"?"auto-resolve":ex.age>10?"escalated":"investigating";const wfc={investigating:C.blue,"auto-resolve":C.accent,escalated:C.red};const acts=ex.type==="Posting gap"?["Post journal","Escalate"]:ex.type==="TP adjustment"?["Review TP","Document"]:ex.type==="Timing"?["Auto-clear"]:ex.type==="Classification"?["Reclassify","Request docs"]:["Create SO"];return(
                <div key={i} style={{padding:"10px 12px",marginBottom:6,background:C.bg,borderRadius:6,borderLeft:`3px solid ${tc}`}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                    <div style={{display:"flex",alignItems:"center",gap:6}}><Tag bg={tc+"18"} c={tc}>{ex.type}</Tag><span style={{fontSize:12,fontWeight:500}}>{ex.pair}</span></div>
                    <div style={{display:"flex",gap:6,alignItems:"center"}}><Tag bg={wfc[wf]+"18"} c={wfc[wf]}>{wf}</Tag><span style={{fontFamily:F.mo,fontSize:9,color:C.muted}}>{ex.age}d</span><span style={{fontFamily:F.mo,fontSize:11,fontWeight:700,color:tc}}>{ex.amt}</span></div>
                  </div>
                  <div style={{fontSize:10.5,color:C.sub,marginBottom:2}}>{ex.desc}</div>
                  <div style={{fontSize:10,color:C.muted,marginBottom:6}}>{ex.root}</div>
                  <div style={{display:"flex",gap:4}}>{acts.map((a,j)=>(<button key={j} style={{fontFamily:F.mo,fontSize:8.5,fontWeight:600,padding:"3px 10px",borderRadius:4,border:`1px solid ${j===0?C.accent:C.bdr}`,background:j===0?C.al:C.w,color:j===0?C.accent:C.sub,cursor:"pointer"}}>{a}</button>))}</div>
                </div>);})}
            </div>
            <ChatInput placeholder="e.g. Which IC exceptions are blocking consolidation?"/>
          </div>)}
        </div>)}

        {/* ═══ COMPLIANCE & TAX ═══ */}
        {tab==="compliance"&&(<div>
          <div style={{marginBottom:12}}><h1 style={{fontFamily:F.sr,fontSize:21,fontWeight:700,margin:0}}>Compliance & Tax</h1><p style={{fontSize:12,color:C.sub,marginTop:3}}>Filing deadlines, VAT status, transfer pricing monitoring, and regulatory obligations.</p></div>
          <div style={{display:"flex",gap:0,marginBottom:16,borderBottom:`1px solid ${C.bdr}`}}>
            {[{id:"overview",l:"Overview"},{id:"vat",l:"VAT / GST"},{id:"tp",l:"Transfer Pricing"},{id:"deadlines",l:"Deadlines"}].map(s=>(<button key={s.id} onClick={()=>setCompSub(s.id)} style={{fontFamily:F.mn,fontSize:11.5,fontWeight:compSub===s.id?600:400,color:compSub===s.id?C.accent:C.muted,background:"none",border:"none",cursor:"pointer",padding:"8px 14px",borderBottom:compSub===s.id?`2px solid ${C.accent}`:"2px solid transparent"}}>{s.l}</button>))}
          </div>

          {compSub==="overview"&&(<div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:16}}>
              <Stat label="Next Filing" value="GST/VAT" sub="Due 20-Apr-2026" trend="35 days" tc={C.accent}/>
              <Stat label="Compliance Health" value="4/5" sub="Areas on track" trend="1 attention (audit)" tc={C.amber}/>
              <Stat label="TP Deviations" value="1" sub="Services Kludi → Parent" trend="+3.2% above arm's length" tc={C.amber}/>
              <Stat label="Out-of-scope" value="₹1.8Cr" sub="24 transactions flagged" trend="▲ 14% MoM" tc={C.red}/>
            </div>
            {compDeadlines.map((d,i)=>{const sc=d.status==="on-track"?C.accent:d.status==="attention"?C.amber:C.red;return(
              <div key={i} style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,padding:"10px 14px",marginBottom:6,display:"flex",alignItems:"center",gap:12,borderLeft:`3px solid ${sc}`}}>
                <div style={{minWidth:50,textAlign:"center"}}><div style={{fontFamily:F.sr,fontSize:18,fontWeight:700,color:sc}}>{d.daysLeft}</div><div style={{fontFamily:F.mo,fontSize:8,color:C.muted}}>days</div></div>
                <div style={{flex:1}}><div style={{fontSize:12,fontWeight:500}}>{d.area}</div><div style={{fontSize:10.5,color:C.sub}}>{d.entity} · Due {d.due}</div></div>
                <Tag bg={sc+"18"} c={sc}>{d.status}</Tag>
                <span style={{fontSize:10,color:C.sub,maxWidth:200}}>{d.note}</span>
              </div>);})}
            <ChatInput placeholder="e.g. What compliance deadlines are within 30 days?"/>
          </div>)}

          {compSub==="vat"&&(<div>
            <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,overflow:"hidden",marginBottom:14}}>
              <div style={{padding:"10px 14px",borderBottom:`1px solid ${C.bdr}`}}><span style={{fontFamily:F.sr,fontSize:13,fontWeight:700}}>VAT / GST Classification</span></div>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}><thead><tr style={{borderBottom:`1px solid ${C.bdr}`}}>{["Type","Transactions","Value","Compliance","Note"].map(h=><th key={h} style={{padding:"5px 10px",textAlign:"left",fontFamily:F.mo,fontSize:8,fontWeight:600,color:C.muted,textTransform:"uppercase"}}>{h}</th>)}</tr></thead>
                <tbody>{vatItems.map((v,i)=>{const sc=v.compliance==="Filed"?C.accent:v.compliance==="Under review"?C.amber:C.red;return(
                  <tr key={i} style={{borderBottom:`1px solid ${C.bdr}`,background:v.compliance==="Flagged"?C.rl+"22":"transparent"}}><td style={{padding:"7px 10px",fontWeight:500}}>{v.type}</td><td style={{padding:"7px 10px",fontFamily:F.mo,fontSize:10}}>{v.txnCount}</td><td style={{padding:"7px 10px",fontFamily:F.mo,fontSize:10,fontWeight:600}}>{v.value}</td><td style={{padding:"7px 10px"}}><Tag bg={sc+"18"} c={sc}>{v.compliance}</Tag></td><td style={{padding:"7px 10px",fontSize:10,color:C.sub}}>{v.note}</td></tr>);})}</tbody>
              </table>
            </div>
            <Callout color={C.red} icon="▼">Out-of-scope transactions up 14% MoM. IW flagged 6 items that may be incorrectly classified. Total GST impact: ₹2.70L. Review before 20-Apr deadline.</Callout>
            {/* Flagged items */}
            <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,padding:"12px 14px",marginTop:14}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}><div style={{fontFamily:F.sr,fontSize:13,fontWeight:700}}>Flagged Items (6)</div><span style={{fontFamily:F.mo,fontSize:9,color:C.red}}>₹2.70L potential under-reporting</span></div>
              {vatFlagged.map((vf,i)=>(<div key={i} style={{padding:"8px 10px",marginBottom:4,background:C.bg,borderRadius:5,borderLeft:`3px solid ${C.red}`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3}}>
                  <div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontFamily:F.mo,fontSize:9,color:C.muted}}>{vf.id}</span><span style={{fontSize:11,fontWeight:500}}>{vf.vendor||vf.entity}</span><span style={{fontFamily:F.mo,fontSize:9,color:C.sub}}>{vf.txn}</span></div>
                  <span style={{fontFamily:F.mo,fontSize:10,fontWeight:600}}>{vf.amt}</span>
                </div>
                <div style={{display:"flex",gap:4,marginBottom:3}}><Tag bg={C.rl} c={C.red}>{vf.current}</Tag><span style={{color:C.muted,fontSize:10}}>→</span><Tag bg={C.al} c={C.accent}>{vf.expected}</Tag><span style={{fontFamily:F.mo,fontSize:9,color:C.red,marginLeft:"auto"}}>{vf.impact} impact</span></div>
                <div style={{fontSize:10,color:C.sub}}>{vf.reason}</div>
                <div style={{display:"flex",gap:4,marginTop:4}}><button style={{fontFamily:F.mo,fontSize:8,padding:"2px 8px",borderRadius:3,border:`1px solid ${C.accent}`,background:C.al,color:C.accent,cursor:"pointer"}}>Reclassify</button><button style={{fontFamily:F.mo,fontSize:8,padding:"2px 8px",borderRadius:3,border:`1px solid ${C.bdr}`,background:C.w,color:C.sub,cursor:"pointer"}}>Flag for review</button><button style={{fontFamily:F.mo,fontSize:8,padding:"2px 8px",borderRadius:3,border:`1px solid ${C.bdr}`,background:C.w,color:C.sub,cursor:"pointer"}}>Confirm correct</button></div>
              </div>))}
            </div>
            <ChatInput placeholder="e.g. Show me all out-of-scope transactions this month"/>
          </div>)}

          {compSub==="tp"&&(<div>
            <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,overflow:"hidden",marginBottom:14}}>
              <div style={{padding:"10px 14px",borderBottom:`1px solid ${C.bdr}`}}><span style={{fontFamily:F.sr,fontSize:13,fontWeight:700}}>Transfer Pricing Register</span></div>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}><thead><tr style={{borderBottom:`1px solid ${C.bdr}`}}>{["Entities","Type","Volume","Method","Status","Deviation"].map(h=><th key={h} style={{padding:"5px 10px",textAlign:"left",fontFamily:F.mo,fontSize:8,fontWeight:600,color:C.muted,textTransform:"uppercase"}}>{h}</th>)}</tr></thead>
                <tbody>{tpRegister.map((t,i)=>{const sc=t.status==="Within band"?C.accent:t.status==="Deviation"?C.red:C.amber;return(
                  <tr key={i} style={{borderBottom:`1px solid ${C.bdr}`,background:t.deviation?C.aml+"22":"transparent"}}><td style={{padding:"7px 10px",fontWeight:500}}>{t.entity}</td><td style={{padding:"7px 10px",fontSize:10}}>{t.type}</td><td style={{padding:"7px 10px",fontFamily:F.mo,fontSize:10}}>{t.vol}</td><td style={{padding:"7px 10px",fontSize:10,color:C.sub}}>{t.method}</td><td style={{padding:"7px 10px"}}><Tag bg={sc+"18"} c={sc}>{t.status}</Tag></td><td style={{padding:"7px 10px",fontSize:10,color:t.deviation?C.amber:C.accent}}>{t.deviation||"On target"}</td></tr>);})}</tbody>
              </table>
            </div>
            <Callout color={C.amber} icon="⚠">Kludi → Parent services pricing is 3.2% above arm's length benchmark. TP rule R-007 triggered: quarantined from filing. Tax Head + CFO approval needed to either adjust pricing or document justification.</Callout>
            <ChatInput placeholder="e.g. Which IC transactions exceed TP thresholds?"/>
          </div>)}

          {compSub==="deadlines"&&(<div>
            {compDeadlines.map((d,i)=>{const sc=d.status==="on-track"?C.accent:C.amber;return(
              <div key={i} style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,padding:"14px 16px",marginBottom:8}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                  <div style={{fontFamily:F.sr,fontSize:14,fontWeight:700}}>{d.area}</div>
                  <div style={{display:"flex",alignItems:"center",gap:8}}><Tag bg={sc+"18"} c={sc}>{d.status}</Tag><span style={{fontFamily:F.mo,fontSize:12,fontWeight:700,color:sc}}>{d.daysLeft}d</span></div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:8}}>
                  <div><div style={{fontFamily:F.mo,fontSize:8,color:C.muted}}>ENTITY</div><div style={{fontSize:11,marginTop:1}}>{d.entity}</div></div>
                  <div><div style={{fontFamily:F.mo,fontSize:8,color:C.muted}}>DUE DATE</div><div style={{fontSize:11,marginTop:1}}>{d.due}</div></div>
                  <div><div style={{fontFamily:F.mo,fontSize:8,color:C.muted}}>OWNER</div><div style={{fontSize:11,marginTop:1}}>{d.owner}</div></div>
                  <div><div style={{fontFamily:F.mo,fontSize:8,color:C.muted}}>STATUS</div><div style={{fontSize:11,marginTop:1,color:C.sub}}>{d.note}</div></div>
                </div>
              </div>);})}
            <ChatInput placeholder="e.g. What's due within the next 2 weeks?"/>
          </div>)}
        </div>)}

        {/* ═══ INTELLIGENCE WAREHOUSE ═══ */}
        {tab==="iw"&&(()=>{
          const iwSel=selNode?iwMap[selNode]:null;
          const iwSelSg=iwSel?SG[iwSel.sg]:null;
          const iwSelEdges=iwSel?iwAllEdges.filter(e=>e.from===selNode||e.to===selNode):[];
          const GW=870,VH=BH*2+BGY+BPY*2;
          const dimN=iwFilter!=="all"&&iwFilter!=="cross"?new Set(iwNodes.filter(n=>n.sg!==iwFilter).map(n=>n.id)):new Set();
          const sq=iwSearch.toLowerCase();
          const searchHit=sq?new Set(iwNodes.filter(n=>n.l.toLowerCase().includes(sq)||n.id.toLowerCase().includes(sq)||(n.desc||"").toLowerCase().includes(sq)).map(n=>n.id)):null;
          const valSteps=["Validating schema...","Checking dependencies...","Running consistency checks...","Verifying thresholds...","Approved ✓"];
          const startValidation=()=>{setValidating(true);setValStep(0);let s=0;const iv=setInterval(()=>{s++;setValStep(s);if(s>=valSteps.length-1){clearInterval(iv);setTimeout(()=>{setValidating(null);setEditNode(null);setSelNode(selNode);},800);}},600);};
          return(<div>
          <div style={{marginBottom:10,display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div><h1 style={{fontFamily:F.sr,fontSize:21,fontWeight:700,margin:0}}>Intelligence Warehouse</h1>
            <div style={{fontSize:11,color:C.sub,marginTop:3}}>{Object.keys(SG).length} subgraphs · {iwNodes.filter(n=>n.t==="entity").length} entities · {iwNodes.filter(n=>n.t==="metric").length} metrics · {iwNodes.filter(n=>n.t==="decision").length} decisions · {iwAllEdges.length} edges</div></div>
            <div style={{position:"relative"}}><input value={iwSearch} onChange={e=>setIwSearch(e.target.value)} placeholder="Search nodes..." style={{fontFamily:F.mn,fontSize:11,padding:"6px 28px 6px 10px",border:`1px solid ${C.bdr}`,borderRadius:6,outline:"none",width:200,background:C.w}}/>{iwSearch&&<span onClick={()=>setIwSearch("")} style={{position:"absolute",right:8,top:6,cursor:"pointer",color:C.muted,fontSize:12}}>×</span>}</div>
          </div>
          <div style={{display:"flex",gap:3,marginBottom:10,flexWrap:"wrap"}}>
            {[["all","All"],["cross","Cross-Subgraph"],...Object.entries(SG).map(([k,v])=>[k,v.label])].map(([k,l])=>(
              <div key={k} onClick={()=>setIwFilter(k)} style={{padding:"3px 10px",borderRadius:12,fontSize:9,fontWeight:600,cursor:"pointer",border:`1px solid ${k===iwFilter?C.accent:C.bdr}`,background:k===iwFilter?C.al:C.w,color:k===iwFilter?C.accent:C.sub}}>{l}</div>
            ))}
          </div>
          {/* Search results */}
          {sq&&searchHit&&(<div style={{background:C.w,border:`1px solid ${C.bdr}`,borderRadius:6,padding:"8px 12px",marginBottom:10}}><div style={{fontFamily:F.mo,fontSize:8,color:C.muted,marginBottom:4}}>{searchHit.size} results for "{iwSearch}"</div>{[...searchHit].slice(0,8).map(nid=>{const n=iwMap[nid];const sc=SG[n.sg]?.color;return(<div key={nid} onClick={()=>{setSelNode(nid);setNodeTab("details");setIwSearch("");}} style={{display:"flex",alignItems:"center",gap:6,padding:"4px 6px",borderRadius:4,cursor:"pointer",marginBottom:2}} onMouseEnter={e=>e.currentTarget.style.background=C.bg} onMouseLeave={e=>e.currentTarget.style.background="transparent"}><div style={{width:8,height:8,borderRadius:n.t==="entity"?"50%":"2px",background:sc}}/><span style={{fontSize:11,fontWeight:500}}>{n.l}</span><span style={{fontFamily:F.mo,fontSize:8,color:C.muted}}>{n.t} · {SG[n.sg].label}</span></div>);})}{searchHit.size>8&&<div style={{fontSize:9,color:C.muted}}>+{searchHit.size-8} more</div>}</div>)}
          <div style={{display:"flex",gap:12}}>
            <div style={{flex:1,overflow:"auto"}}>
              <svg viewBox={`0 0 ${GW} ${VH}`} width="100%" style={{minWidth:600,background:C.bg}}>
                {Object.entries(SG).map(([id,s])=>{const x=sgX(s.col),y=sgY(s.row);return(
                  <g key={id} opacity={iwFilter!=="all"&&iwFilter!=="cross"&&iwFilter!==id?0.12:1} style={{transition:"opacity 0.3s"}}>
                    <rect x={x} y={y} width={BW} height={BH} rx={10} fill={`${s.color}08`} stroke={`${s.color}22`} strokeWidth={1}/>
                    <text x={x+10} y={y+15} fontSize={8.5} fontWeight={700} fontFamily="Georgia,serif" fill={s.color} opacity={0.6}>{s.label}</text>
                    <text x={x+10} y={y+25} fontSize={5.5} fill={`${s.color}55`} fontFamily="'JetBrains Mono',monospace">{(raw[id]?.entities?.length||0)}E · {(raw[id]?.metrics?.length||0)}M · {(raw[id]?.decisions?.length||0)}D</text>
                  </g>);
                })}
                {iwAllEdges.map((e,i)=>{const f=iwMap[e.from],t=iwMap[e.to];if(!f||!t)return null;const cr=e.type==="x";const isA=selNode&&(e.from===selNode||e.to===selNode);const isD=selNode&&!isA;const isFD=iwFilter!=="all"&&iwFilter!=="cross"&&!cr&&f.sg!==iwFilter&&t.sg!==iwFilter;const col=cr?C.accent:SG[f.sg]?.color||C.muted;const op=isD?0.02:isFD?0.03:isA?(cr?0.8:0.6):(cr?0.12:0.06);const sw=isA?(cr?2.5:1.5):(cr?0.8:0.3);const mx=(f.cx+t.cx)/2,my=(f.cy+t.cy)/2;let path;if(cr){const dx=t.cx-f.cx,dy=t.cy-f.cy;path=`M${f.cx},${f.cy} C${f.cx+dx*0.25},${f.cy+dy*0.5} ${t.cx-dx*0.25},${t.cy-dy*0.5} ${t.cx},${t.cy}`;}else{const off=iwJitter(e.from+e.to,"q",10);path=`M${f.cx},${f.cy} Q${mx+off},${my+off*0.3} ${t.cx},${t.cy}`;}return(<g key={i}><path d={path} fill="none" stroke={col} strokeWidth={sw} opacity={op} strokeDasharray={cr&&!isA?"5,3":""}/>{isA&&<text x={mx} y={my-4} textAnchor="middle" fontSize={4.5} fill={col} fontFamily="'JetBrains Mono',monospace" fontWeight={700} opacity={0.8} style={{paintOrder:"stroke",stroke:C.bg,strokeWidth:3}}>{e.label}</text>}</g>);
                })}
                {iwNodes.map(n=>{const col=SG[n.sg].color;const isA=selNode===n.id;const isCo=selNode&&iwSelEdges.some(e=>e.from===n.id||e.to===n.id);const isD=selNode&&!isA&&!isCo;const isFD=dimN.has(n.id);const isSH=searchHit&&!searchHit.has(n.id);const op=isSH?0.1:isD?0.08:isFD?0.1:1;const lb=n.l.length>14?n.l.slice(0,13)+"…":n.l;return(
                  <g key={n.id} opacity={op} style={{cursor:"pointer",transition:"opacity 0.3s"}} onClick={()=>{setSelNode(selNode===n.id?null:n.id);setNodeTab("details");}}>
                    {n.t==="entity"&&<circle cx={n.cx} cy={n.cy} r={6} fill={col} stroke="#fff" strokeWidth={isA?2.5:1} style={isA?{filter:`drop-shadow(0 0 6px ${col})`}:{}}/>}
                    {n.t==="metric"&&<rect x={n.cx-5.5} y={n.cy-5.5} width={11} height={11} rx={1} fill={`${col}${isA?"80":"45"}`} stroke="#fff" strokeWidth={isA?2.5:1} transform={`rotate(45,${n.cx},${n.cy})`} style={isA?{filter:`drop-shadow(0 0 6px ${col})`}:{}}/>}
                    {n.t==="decision"&&<polygon points={`${n.cx},${n.cy-7} ${n.cx+7},${n.cy+4.5} ${n.cx-7},${n.cy+4.5}`} fill={`${col}${isA?"70":"35"}`} stroke="#fff" strokeWidth={isA?2.5:1} style={isA?{filter:`drop-shadow(0 0 6px ${col})`}:{}}/>}
                    <text x={n.cx} y={n.cy+13} textAnchor="middle" fontSize={5} fontWeight={isA?700:500} fontFamily="'IBM Plex Sans',sans-serif" fill={C.sub} style={{paintOrder:"stroke",stroke:C.bg,strokeWidth:2}}>{lb}</text>
                  </g>);
                })}
              </svg>
            </div>
            {/* Detail panel with tabs */}
            {iwSel&&(<div style={{width:360,flexShrink:0,background:C.w,border:`1px solid ${C.bdr}`,borderRadius:8,padding:14,alignSelf:"flex-start",position:"sticky",top:20,maxHeight:"calc(100vh - 100px)",overflowY:"auto"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:10,height:10,borderRadius:"50%",background:iwSelSg.color}}/><div><div style={{fontFamily:F.sr,fontSize:14,fontWeight:700}}>{iwSel.l}</div><div style={{fontFamily:F.mo,fontSize:8,color:iwSelSg.color,fontWeight:600}}>{iwSel.t.toUpperCase()} · {iwSelSg.label}</div></div></div>
                <div onClick={()=>setSelNode(null)} style={{cursor:"pointer",fontSize:16,color:C.muted}}>×</div>
              </div>
              {/* Version + creator bar */}
              <div style={{display:"flex",gap:6,marginBottom:10,flexWrap:"wrap"}}>{iwSel.version&&<Tag bg={C.bg} c={C.sub}>{iwSel.version}</Tag>}{iwSel.createdBy&&<Tag bg={C.bg} c={C.muted}>by {iwSel.createdBy}</Tag>}{iwSel.createdAt&&<Tag bg={C.bg} c={C.muted}>{iwSel.createdAt}</Tag>}</div>
              {/* Tabs */}
              <div style={{display:"flex",gap:0,marginBottom:12,borderBottom:`1px solid ${C.bdr}`}}>
                {["details","history","edit"].map(tb=>(<button key={tb} onClick={()=>setNodeTab(tb)} style={{fontFamily:F.mo,fontSize:10,fontWeight:nodeTab===tb?600:400,color:nodeTab===tb?C.accent:C.muted,background:"none",border:"none",cursor:"pointer",padding:"6px 12px",borderBottom:nodeTab===tb?`2px solid ${C.accent}`:"2px solid transparent",textTransform:"capitalize"}}>{tb}</button>))}
              </div>
              {/* Details tab */}
              {nodeTab==="details"&&(<div>
                {iwSel.desc&&<div style={{marginBottom:10}}><div style={{fontFamily:F.mo,fontSize:7,fontWeight:700,color:C.muted,textTransform:"uppercase",marginBottom:2}}>Description</div><div style={{fontSize:10.5,color:C.ink,lineHeight:1.5}}>{iwSel.desc}</div></div>}
                {iwSel.src&&<div style={{marginBottom:10}}><div style={{fontFamily:F.mo,fontSize:7,fontWeight:700,color:C.muted,textTransform:"uppercase",marginBottom:2}}>Source</div><div style={{fontSize:9.5,color:C.accent,fontFamily:F.mo,background:C.al,padding:"4px 8px",borderRadius:4}}>{iwSel.src}</div></div>}
                {iwSel.fn&&<div style={{marginBottom:10}}><div style={{fontFamily:F.mo,fontSize:7,fontWeight:700,color:C.muted,textTransform:"uppercase",marginBottom:2}}>{iwSel.t==="decision"?"Decision Logic":"Computation"}</div><div style={{fontSize:9,fontFamily:F.mo,background:C.bg,padding:"6px 8px",borderRadius:4,lineHeight:1.5,whiteSpace:"pre-wrap"}}>{iwSel.fn}</div></div>}
                {iwSel.t==="decision"&&iwSel.bp&&(<div style={{border:`1px solid ${C.accent}22`,borderRadius:6,padding:10,background:`${C.accent}06`,marginBottom:10}}>
                  <div style={{fontFamily:F.mo,fontSize:8,fontWeight:700,color:C.accent,textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:8}}>Decision Blueprint</div>
                  {iwSel.bp.inputs&&<div style={{marginBottom:8}}><div style={{fontFamily:F.mo,fontSize:7,fontWeight:700,color:C.sub,marginBottom:3}}>Inputs</div>{iwSel.bp.inputs.map((inp,i)=><div key={i} style={{fontSize:8.5,color:C.ink,lineHeight:1.4,marginBottom:2,paddingLeft:8,borderLeft:`2px solid ${C.accent}33`,fontFamily:F.mo}}>{inp}</div>)}</div>}
                  {iwSel.bp.logic&&<div style={{marginBottom:8}}><div style={{fontFamily:F.mo,fontSize:7,fontWeight:700,color:C.sub,marginBottom:3}}>Logic</div><div style={{fontSize:8.5,fontFamily:F.mo,background:C.bg,padding:"5px 8px",borderRadius:4,lineHeight:1.5,whiteSpace:"pre-wrap"}}>{iwSel.bp.logic}</div></div>}
                  {iwSel.bp.output&&<div style={{marginBottom:8}}><div style={{fontFamily:F.mo,fontSize:7,fontWeight:700,color:C.sub,marginBottom:3}}>Output</div><div style={{fontSize:9,fontFamily:F.mo,background:C.al,padding:"4px 8px",borderRadius:4}}>{iwSel.bp.output}</div></div>}
                  {iwSel.bp.thresholds&&<div style={{marginBottom:8}}><div style={{fontFamily:F.mo,fontSize:7,fontWeight:700,color:C.sub,marginBottom:3}}>Thresholds</div>{iwSel.bp.thresholds.map((th,i)=><div key={i} style={{fontSize:8.5,color:C.ink,lineHeight:1.4,marginBottom:2,paddingLeft:8,borderLeft:`2px solid ${C.amber}44`,fontFamily:F.mo}}>{th}</div>)}</div>}
                  {iwSel.bp.constraints&&<div style={{marginBottom:8}}><div style={{fontFamily:F.mo,fontSize:7,fontWeight:700,color:C.red,marginBottom:3}}>Constraints</div>{iwSel.bp.constraints.map((ct,i)=><div key={i} style={{fontSize:8.5,color:C.ink,lineHeight:1.4,marginBottom:2,paddingLeft:8,borderLeft:`2px solid ${C.red}44`,fontFamily:F.mo}}>{ct}</div>)}</div>}
                  {iwSel.bp.frequency&&<div><div style={{fontFamily:F.mo,fontSize:7,fontWeight:700,color:C.sub,marginBottom:3}}>Frequency</div><div style={{fontSize:9,color:C.ink}}>{iwSel.bp.frequency}</div></div>}
                </div>)}
                <div><div style={{fontFamily:F.mo,fontSize:7,fontWeight:700,color:C.muted,textTransform:"uppercase",marginBottom:5}}>Connections ({iwSelEdges.length})</div>
                  {iwSelEdges.map((e,i)=>{const other=e.from===selNode?iwMap[e.to]:iwMap[e.from];if(!other)return null;const dir=e.from===selNode?"→":"←";const cr=e.type==="x";return(
                    <div key={i} style={{fontSize:10,marginBottom:4,padding:"3px 6px",borderRadius:4,background:cr?C.al:C.bg,border:`1px solid ${cr?C.accent+"33":C.bdr}`,cursor:"pointer"}} onClick={()=>{setSelNode(other.id);setNodeTab("details");}}>
                      <div style={{display:"flex",alignItems:"center",gap:4}}><span style={{color:cr?C.accent:SG[other.sg]?.color,fontWeight:700,fontSize:11}}>{dir}</span><span style={{fontWeight:500}}>{other.l}</span><span style={{fontFamily:F.mo,fontSize:6.5,color:C.muted}}>{e.label}</span>{cr&&<span style={{fontFamily:F.mo,fontSize:6,color:C.accent,fontWeight:700}}>CROSS</span>}</div>
                    </div>);
                  })}
                </div>
              </div>)}
              {/* History tab */}
              {nodeTab==="history"&&(<div>
                {iwSel.history&&iwSel.history.length>0?iwSel.history.map((h,i)=>(<div key={i} style={{display:"flex",gap:8,padding:"8px 0",borderBottom:`1px solid ${C.bdr}`}}>
                  <div style={{display:"flex",flexDirection:"column",alignItems:"center",width:20,flexShrink:0}}><div style={{width:8,height:8,borderRadius:"50%",background:i===0?C.accent:C.bdr,marginTop:3}}/>{i<iwSel.history.length-1&&<div style={{width:1,flex:1,background:C.bdr,marginTop:2}}/>}</div>
                  <div><div style={{display:"flex",gap:6,alignItems:"center"}}><span style={{fontFamily:F.mo,fontSize:9,fontWeight:600}}>{h.v}</span><span style={{fontFamily:F.mo,fontSize:8,color:C.muted}}>{h.dt}</span><span style={{fontSize:9,color:C.sub}}>by {h.by}</span></div><div style={{fontSize:10,color:C.ink,marginTop:2}}>{h.note}</div></div>
                </div>)):<div style={{fontSize:11,color:C.muted,padding:20,textAlign:"center"}}>No version history. This is the initial definition.</div>}
              </div>)}
              {/* Edit tab */}
              {nodeTab==="edit"&&(<div>
                {validating?(<div style={{padding:20}}>
                  <div style={{fontFamily:F.mo,fontSize:9,color:C.accent,textTransform:"uppercase",marginBottom:12}}>Validating Changes</div>
                  {valSteps.map((vs,i)=>(<div key={i} style={{display:"flex",gap:8,alignItems:"center",marginBottom:8,opacity:i<=valStep?1:0.3,transition:"opacity 0.3s"}}>
                    <div style={{width:18,height:18,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",background:i<valStep?C.accent:i===valStep?C.al:C.bg,border:`1.5px solid ${i<valStep?C.accent:i===valStep?C.accent:C.bdr}`,flexShrink:0}}>
                      {i<valStep?<span style={{color:"#fff",fontSize:9}}>✓</span>:i===valStep?<div style={{width:6,height:6,borderRadius:"50%",background:C.accent,animation:"pulse 0.8s infinite"}}/>:null}
                    </div>
                    <span style={{fontSize:11,color:i<=valStep?C.ink:C.muted,fontWeight:i===valStep?600:400}}>{vs}</span>
                  </div>))}
                </div>):(<div>
                  {iwSel.t==="entity"&&(<div>
                    <div style={{fontFamily:F.mo,fontSize:7,color:C.muted,textTransform:"uppercase",marginBottom:4}}>Description</div>
                    <textarea defaultValue={iwSel.desc} rows={3} style={{width:"100%",fontFamily:F.mn,fontSize:10.5,padding:"6px 8px",border:`1px solid ${C.bdr}`,borderRadius:4,outline:"none",resize:"vertical",marginBottom:8}}/>
                    <div style={{fontFamily:F.mo,fontSize:7,color:C.muted,textTransform:"uppercase",marginBottom:4}}>Source System</div>
                    <input defaultValue={iwSel.src} style={{width:"100%",fontFamily:F.mo,fontSize:10,padding:"6px 8px",border:`1px solid ${C.bdr}`,borderRadius:4,outline:"none",marginBottom:8}}/>
                  </div>)}
                  {iwSel.t==="metric"&&(<div>
                    <div style={{fontFamily:F.mo,fontSize:7,color:C.muted,textTransform:"uppercase",marginBottom:4}}>Formula</div>
                    <textarea defaultValue={iwSel.fn} rows={2} style={{width:"100%",fontFamily:F.mo,fontSize:9.5,padding:"6px 8px",border:`1px solid ${C.bdr}`,borderRadius:4,outline:"none",resize:"vertical",marginBottom:8}}/>
                    <div style={{fontFamily:F.mo,fontSize:7,color:C.muted,textTransform:"uppercase",marginBottom:4}}>Source</div>
                    <input defaultValue={iwSel.src||""} style={{width:"100%",fontFamily:F.mo,fontSize:10,padding:"6px 8px",border:`1px solid ${C.bdr}`,borderRadius:4,outline:"none",marginBottom:8}}/>
                  </div>)}
                  {iwSel.t==="decision"&&(<div>
                    {["trigger","action","exception","authority"].filter(f=>iwSel.bp?.[f]||iwSel.fn).map(fld=>(<div key={fld} style={{marginBottom:8}}><div style={{fontFamily:F.mo,fontSize:7,color:{trigger:C.red,action:C.accent,exception:C.amber,authority:C.blue}[fld]||C.muted,textTransform:"uppercase",marginBottom:2}}>{fld}</div><textarea defaultValue={fld==="trigger"?iwSel.bp?.logic?.split("\n")[0]||"":iwSel.bp?.[fld]||""} rows={2} style={{width:"100%",fontFamily:F.mn,fontSize:10,padding:"6px 8px",border:`1px solid ${C.bdr}`,borderRadius:4,outline:"none",resize:"vertical"}}/></div>))}
                    <div style={{marginBottom:8}}><div style={{fontFamily:F.mo,fontSize:7,color:C.muted,textTransform:"uppercase",marginBottom:2}}>Logic</div><textarea defaultValue={iwSel.bp?.logic||iwSel.fn||""} rows={4} style={{width:"100%",fontFamily:F.mo,fontSize:9,padding:"6px 8px",border:`1px solid ${C.bdr}`,borderRadius:4,outline:"none",resize:"vertical"}}/></div>
                  </div>)}
                  <div style={{display:"flex",gap:6,marginTop:12,paddingTop:10,borderTop:`1px solid ${C.bdr}`}}>
                    <button onClick={()=>setNodeTab("details")} style={{fontFamily:F.mo,fontSize:9,padding:"6px 14px",borderRadius:5,border:`1px solid ${C.bdr}`,background:C.bg,color:C.sub,cursor:"pointer"}}>Cancel</button>
                    <button onClick={startValidation} style={{fontFamily:F.mo,fontSize:9,fontWeight:600,padding:"6px 14px",borderRadius:5,border:"none",background:C.accent,color:"#fff",cursor:"pointer",flex:1}}>Save & Validate</button>
                  </div>
                </div>)}
              </div>)}
            </div>)}
          </div>
          <div style={{fontSize:8,color:C.muted,fontFamily:F.mo,marginTop:8}}>questt. Intelligence Warehouse BKG v1 · {iwNodes.length} nodes · {iwAllEdges.length} edges · April 2026</div>
        </div>);})()}

        {/* ═══ CONVERSATIONAL INTELLIGENCE ═══ */}
        {tab==="ci"&&(<div style={{display:"flex",flexDirection:"column",height:"calc(100vh - 66px)"}}>
          <div style={{marginBottom:10,flexShrink:0}}><h1 style={{fontFamily:F.sr,fontSize:21,fontWeight:700,margin:0}}>Conversational Intelligence</h1><p style={{fontSize:12,color:C.sub,marginTop:3}}>Ask anything. The IW traverses all domains. Agent decision trail shows exactly how the answer was derived.</p></div>
          <div style={{maxWidth:720,margin:"0 auto",width:"100%",flex:1,display:"flex",flexDirection:"column",minHeight:0}}>
            {/* Scrollable chat area */}
            <div style={{flex:1,overflowY:"auto",paddingBottom:10}}>
              {ciMsgs.map((m,i)=>m.r==="chips"?(<div key={i} style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:10,paddingLeft:34}}>{m.o.map((o,j)=><button key={j} onClick={()=>{const cq=ciQueries.find(q=>q.q.includes(o.split(" ").slice(0,3).join(" ")));if(cq)runQuery(cq);else{setCiMsgs(prev=>[...prev,{r:"user",t:o},{r:"ai",t:"Traversing the graph..."}]);}}} style={{fontFamily:F.mn,fontSize:10.5,padding:"5px 10px",borderRadius:14,border:`1px solid ${C.bdr}`,background:C.w,color:C.sub,cursor:"pointer"}}>{o}</button>)}</div>):(<div key={i} style={{display:"flex",gap:8,marginBottom:12,flexDirection:m.r==="user"?"row-reverse":"row"}}>
                <div style={{width:28,height:28,borderRadius:"50%",flexShrink:0,background:m.r==="ai"?C.accent:C.blue,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:F.mo,fontSize:9,fontWeight:600}}>{m.r==="ai"?"IW":"Y"}</div>
                <div style={{maxWidth:"88%",width:"100%"}}>
                  {/* Collapsible Agent Trail */}
                  {m.trail&&(()=>{const tOpen=m.typing||openTrails.has(i);return(<div>
                    <div onClick={()=>{if(!m.typing)setOpenTrails(prev=>{const n=new Set(prev);if(n.has(i))n.delete(i);else n.add(i);return n;});}} style={{background:C.bg,border:`1px solid ${C.bdr}`,borderRadius:tOpen?"8px 8px 0 0":"8px",padding:"8px 14px",cursor:m.typing?"default":"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontFamily:F.mo,fontSize:9,color:C.accent,textTransform:"uppercase",fontWeight:600}}>Agent Decision Trail</span><span style={{fontFamily:F.mo,fontSize:9,color:C.muted}}>{m.trail.length} agents</span></div>
                      {!m.typing&&<span style={{fontSize:10,color:C.muted,transition:"transform 0.2s",transform:tOpen?"rotate(180deg)":"none"}}>▾</span>}
                      {m.typing&&<div style={{display:"flex",gap:3,alignItems:"center"}}><div style={{width:5,height:5,borderRadius:"50%",background:C.accent,animation:"pulse 1s infinite"}}/><span style={{fontSize:9,color:C.accent}}>Running...</span></div>}
                    </div>
                    {tOpen&&(<div style={{background:C.bg,border:`1px solid ${C.bdr}`,borderTop:"none",borderRadius:"0 0 8px 8px",padding:"10px 14px"}}>
                      {m.trail.map((s,j)=>(<div key={j} style={{paddingBottom:j<m.trail.length-1?12:0}}>
                        <div style={{display:"flex",gap:10}}>
                          <div style={{display:"flex",flexDirection:"column",alignItems:"center",width:24,flexShrink:0}}>
                            <div style={{width:24,height:24,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",background:j===m.trail.length-1?C.al:C.w,border:`1.5px solid ${j===m.trail.length-1?C.accent:C.bdr}`,fontFamily:F.mo,fontSize:10,color:j===m.trail.length-1?C.accent:C.sub}}>{s.icon||s.agent[0]}</div>
                            {j<m.trail.length-1&&<div style={{width:1,flex:1,background:C.bdr,marginTop:2}}/>}
                          </div>
                          <div style={{flex:1}}>
                            <div style={{fontSize:12,fontWeight:600,marginBottom:3}}>{s.agent}</div>
                            {s.sources&&<div style={{background:C.w,borderRadius:3,padding:"4px 8px",marginBottom:4,display:"inline-flex",gap:4,flexWrap:"wrap"}}><span style={{fontFamily:F.mo,fontSize:8,color:C.muted}}>SOURCE:</span>{s.sources.map((src,k)=><span key={k} style={{fontFamily:F.mo,fontSize:8.5,color:C.sub}}>{src}{k<s.sources.length-1?" · ":""}</span>)}</div>}
                            {s.query&&<div style={{background:"#1C1C1C",borderRadius:3,padding:"5px 8px",marginBottom:4}}><code style={{fontFamily:F.mo,fontSize:8.5,color:"#A8D8A0",lineHeight:1.4,whiteSpace:"pre-wrap",wordBreak:"break-all"}}>{s.query}</code></div>}
                            <div style={{fontSize:10.5,lineHeight:1.45,marginBottom:s.inference?2:0}}><span style={{fontWeight:600}}>Finding: </span><span style={{color:C.sub}}>{s.finding}</span></div>
                            {s.inference&&<div style={{fontSize:10.5,lineHeight:1.45,color:C.accent,fontStyle:"italic"}}><span style={{fontWeight:600}}>Inference: </span>{s.inference}</div>}
                          </div>
                        </div>
                      </div>))}
                    </div>)}
                  </div>);})()}
                  {/* Typing state */}
                  {m.typing&&(<div style={{padding:"12px 16px",background:C.w,border:`1px solid ${C.bdr}`,borderRadius:8,marginTop:6}}>
                    <div style={{display:"flex",gap:4,alignItems:"center"}}><div style={{width:5,height:5,borderRadius:"50%",background:C.accent,animation:"pulse 1s infinite"}}/><span style={{fontSize:11,color:C.muted}}>Synthesizing answer...</span></div>
                  </div>)}
                  {/* Rich answer: headline + visual + detail + actions */}
                  {!m.typing&&m.headline&&(<div style={{background:C.w,border:`1px solid ${C.bdr}`,borderRadius:8,padding:"14px 16px",marginTop:6}}>
                    {/* Headline */}
                    <div style={{fontFamily:F.sr,fontSize:14,fontWeight:700,lineHeight:1.35,marginBottom:10,color:C.ink}}>{m.headline}</div>
                    {/* Metric card */}
                    {m.card&&(<div style={{display:"grid",gridTemplateColumns:`repeat(${m.card.data.length},1fr)`,gap:8,marginBottom:12}}>{m.card.data.map((d,j)=>(<div key={j} style={{background:C.bg,borderRadius:5,padding:"8px 10px"}}><div style={{fontFamily:F.mo,fontSize:8,color:C.muted,textTransform:"uppercase"}}>{d.l}</div><div style={{fontFamily:F.sr,fontSize:16,fontWeight:700,color:d.c||C.ink,marginTop:2}}>{d.v}</div></div>))}</div>)}
                    {/* Visual: table */}
                    {m.vis?.type==="table"&&(<div style={{border:`1px solid ${C.bdr}`,borderRadius:5,overflow:"hidden",marginBottom:12}}>
                      <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}><thead><tr style={{background:C.bg}}>{m.vis.headers.map((h,j)=><th key={j} style={{padding:"6px 10px",textAlign:"left",fontFamily:F.mo,fontSize:8,fontWeight:600,color:C.muted,textTransform:"uppercase"}}>{h}</th>)}</tr></thead><tbody>{m.vis.rows.map((row,j)=><tr key={j} style={{borderTop:`1px solid ${C.bdr}`}}>{row.map((cell,k)=><td key={k} style={{padding:"6px 10px",fontWeight:k===0?500:400,color:cell==="DO NOT TOUCH"?C.red:cell.includes?.("Resolve")||cell.includes?.("Shift")?C.accent:C.ink}}>{cell}</td>)}</tr>)}</tbody></table>
                    </div>)}
                    {/* Visual: bars */}
                    {m.vis?.type==="bars"&&(<div style={{marginBottom:12}}>{m.vis.items.map((b,j)=>(<div key={j} style={{marginBottom:6}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}><span style={{fontSize:11}}>{b.label}</span><span style={{fontFamily:F.mo,fontSize:10,color:b.color,fontWeight:600}}>{b.value>0?b.value:""}{b.note?" · "+b.note:""}</span></div>
                      <div style={{height:6,borderRadius:3,background:C.bdr}}><div style={{height:6,borderRadius:3,width:`${Math.max(0,Math.abs(b.value)/b.max*100)}%`,background:b.color}}/></div>
                    </div>))}</div>)}
                    {/* Visual: comparison */}
                    {m.vis?.type==="comparison"&&(<div style={{display:"grid",gridTemplateColumns:`repeat(${m.vis.items.length},1fr)`,gap:10,marginBottom:12}}>{m.vis.items.map((comp,j)=>(<div key={j} style={{background:C.bg,borderRadius:6,padding:"10px 12px"}}>
                      <div style={{fontFamily:F.mo,fontSize:9,fontWeight:600,color:C.sub,textTransform:"uppercase",marginBottom:6}}>{comp.name}</div>
                      {comp.metrics.map((mt,k)=>(<div key={k} style={{display:"flex",justifyContent:"space-between",padding:"3px 0",borderBottom:k<comp.metrics.length-1?`1px solid ${C.bdr}`:"none"}}><span style={{fontSize:10.5,color:C.sub}}>{mt.l}</span><span style={{fontFamily:F.mo,fontSize:10.5,fontWeight:600,color:mt.c||C.ink}}>{mt.v}</span></div>))}
                    </div>))}</div>)}
                    {/* Visual: trend (sparklines) */}
                    {m.vis?.type==="trend"&&(<div style={{background:C.bg,borderRadius:6,padding:"10px 14px",marginBottom:12}}>
                      <div style={{display:"flex",gap:16,marginBottom:6}}>{m.vis.items.map((tr,j)=>(<span key={j} style={{display:"flex",alignItems:"center",gap:4,fontSize:10}}><span style={{width:12,height:2,borderRadius:1,background:tr.color}}/>{tr.name}</span>))}</div>
                      <div style={{display:"flex",gap:4,alignItems:"flex-end",height:50}}>{m.vis.labels?.map((lb,j)=>{const mx=50;return(<div key={j} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:1}}>
                        {m.vis.items.map((tr,k)=>{const v=tr.data[j];return (<div key={k} style={{width:k===2?1:4,height:Math.max(2,(v/mx)*40),background:tr.color,borderRadius:2,opacity:k===2?0.3:0.8}}/>);})}<span style={{fontFamily:F.mo,fontSize:7,color:C.muted}}>{lb}</span>
                      </div>);})}</div>
                    </div>)}
                    {/* Detail */}
                    <div style={{fontSize:12,lineHeight:1.6,color:C.sub,marginBottom:m.actions?10:0}}>{m.detail}</div>
                    {/* Actions */}
                    {m.actions&&(<div><div style={{fontFamily:F.mo,fontSize:8,color:C.accent,textTransform:"uppercase",marginBottom:4}}>Recommended Actions</div>{m.actions.map((a,j)=>(<div key={j} style={{display:"flex",gap:6,marginBottom:3,alignItems:"flex-start"}}><span style={{color:C.accent,fontSize:11,marginTop:1,flexShrink:0}}>→</span><span style={{fontSize:11.5,color:C.ink}}>{a}</span></div>))}</div>)}
                  </div>)}
                  {/* Simple text answer (for non-query messages) */}
                  {!m.typing&&!m.headline&&m.t&&(<div style={{padding:"12px 16px",borderRadius:8,background:m.r==="user"?C.bl:C.w,border:`1px solid ${C.bdr}`,fontSize:12,lineHeight:1.6,whiteSpace:"pre-line",color:C.ink}}>{m.t}</div>)}
                  {/* Simple card for non-query messages */}
                  {!m.typing&&!m.headline&&m.card&&(<div style={{marginTop:6,background:C.w,border:`1px solid ${C.bdr}`,borderRadius:6,padding:"10px 12px",display:"grid",gridTemplateColumns:`repeat(${m.card.data.length},1fr)`,gap:8}}>{m.card.data.map((d,j)=>(<div key={j}><div style={{fontFamily:F.mo,fontSize:8,color:C.muted,textTransform:"uppercase"}}>{d.l}</div><div style={{fontFamily:F.sr,fontSize:15,fontWeight:700,color:d.c||C.ink,marginTop:1}}>{d.v}</div></div>))}</div>)}
                </div>
              </div>))}
              <div ref={chatEndRef}/>
            </div>
            {/* Fixed bottom: questions toggle + input */}
            <div style={{flexShrink:0,borderTop:`1px solid ${C.bdr}`,paddingTop:10}}>
              {/* Collapsible question panel */}
              {showQs&&(<div style={{marginBottom:8,maxHeight:280,overflowY:"auto"}}>
                <div style={{fontFamily:F.mo,fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:6}}>Ask the Intelligence Warehouse</div>
                {ciQueries.map((cq,i)=>(<div key={i} onClick={()=>runQuery(cq)} style={{padding:"10px 14px",marginBottom:4,background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,borderLeft:`3px solid ${C.accent}`,cursor:"pointer",fontSize:12,lineHeight:1.4,color:C.ink,transition:"all 0.12s"}} onMouseEnter={e=>{e.currentTarget.style.background=C.al;e.currentTarget.style.borderColor=C.accent;}} onMouseLeave={e=>{e.currentTarget.style.background=C.w;e.currentTarget.style.borderColor=C.bdr;}}>{cq.q}</div>))}
              </div>)}
              {/* Input bar */}
              <div style={{display:"flex",gap:8,alignItems:"center"}}>
                <button onClick={()=>setShowQs(!showQs)} style={{width:36,height:36,borderRadius:8,border:`1px solid ${C.bdr}`,background:showQs?C.al:C.w,color:showQs?C.accent:C.muted,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:14,flexShrink:0}}>{showQs?"×":"≡"}</button>
                <div style={{flex:1,background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,padding:"8px 12px",display:"flex",gap:8}}>
                  <input value={ciInp} onChange={e=>setCiInp(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&ciInp.trim()){setCiMsgs(prev=>[...prev,{r:"user",t:ciInp},{r:"ai",t:"Traversing the graph..."}]);setCiInp("");}}} placeholder="Ask about decisions..." style={{flex:1,fontFamily:F.mn,fontSize:12,padding:0,border:"none",outline:"none",background:"transparent"}}/>
                  <button onClick={()=>{if(ciInp.trim()){setCiMsgs(prev=>[...prev,{r:"user",t:ciInp},{r:"ai",t:"Traversing the graph..."}]);setCiInp("");}}} style={{fontFamily:F.mo,fontSize:10,fontWeight:600,background:C.accent,color:"#fff",border:"none",borderRadius:6,padding:"6px 14px",cursor:"pointer"}}>Ask</button>
                </div>
              </div>
            </div>
          </div>
        </div>)}

      </div></div>
    </div>
  );
}

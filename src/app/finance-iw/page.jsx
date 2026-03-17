"use client";
import { useState, useMemo, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════
   FINANCE INTELLIGENCE WAREHOUSE — v7
   questt. — Decision Intelligence Platform
   
   Design principles:
   1. Narrative first, data second
   2. Every number is a door
   3. Decisions, not dashboards
   4. Progressive disclosure
   5. Two layers, one experience
   ═══════════════════════════════════════════════════════════════ */

// ─── TOKENS ───
const C = {
  bg: "#FAFAF8", w: "#FFFFFF", ink: "#1C1C1C", sub: "#555", muted: "#999",
  bdr: "#E5E2DB", accent: "#2D5A3D", al: "#E8F0EC", am: "#4A7D5E",
  red: "#B83232", rl: "#FDF0F0", amber: "#C97C1A", aml: "#FDF5E8",
  blue: "#1A3A6E", bl: "#EDF1F8", green: "#1B7A3D", gl: "#EEFBF2",
  nav: "#F4F2ED",
};
const F = { sr: "Georgia, serif", mn: "'IBM Plex Sans', sans-serif", mo: "'JetBrains Mono', monospace" };

// ─── URGENCY + LAYERS ───
const URG = {
  critical: { l: "CRITICAL", bg: C.rl, c: C.red },
  attention: { l: "ATTENTION", bg: C.aml, c: C.amber },
  watch: { l: "WATCH", bg: C.bl, c: C.blue },
  ontrack: { l: "ON TRACK", bg: C.gl, c: C.green },
};
const LAY = {
  tactical: { l: "Tactical", c: C.blue, bg: C.bl },
  strategic: { l: "Strategic", c: C.accent, bg: C.al },
  cross: { l: "Cross-layer", c: C.amber, bg: C.aml },
};

/* ═══════════════════════════════════════════
   ENTITY DATABASE
   ═══════════════════════════════════════════ */
const E = {
  pinnacle: { name: "Pinnacle Distributors", ty: "Customer", seg: "Large Enterprise", tenure: "4 yrs", risk: 72, rd: "down", dso: [32,34,38,41,44,47], labels: ["Oct","Nov","Dec","Jan","Feb","Mar"], out: "₹3.8Cr", over: "₹2.3Cr",
    contacts: [{n:"Rajesh Mehta",r:"CFO",e:"r.mehta@pinnacle.co"},{n:"Priya Nair",r:"AP Manager",e:"p.nair@pinnacle.co"}],
    inv: [{id:"INV-4523",a:"₹0.9Cr",due:"28-Feb",s:"Overdue",d:16},{id:"INV-4471",a:"₹1.4Cr",due:"28-Feb",s:"Overdue",d:16},{id:"INV-4312",a:"₹1.1Cr",due:"30-Jan",s:"Paid"}],
    note: "Payment cycle stretching since Oct. No disputes. Strong procurement relationship (renewed Jan). Slowdown linked to downstream retail pressure. Their Q3 results showed 8% revenue decline — they're under their own cash pressure." },
  kiran: { name: "Kiran Textiles", ty: "Vendor", seg: "Mid-tier Supplier", tenure: "3 yrs", risk: 58, rd: "flat", pc: [28,30,29,31,30,32], out: "₹4.2L", over: "₹0",
    contacts: [{n:"Suresh Kiran",r:"Owner",e:"suresh@kirantextiles.in"}],
    inv: [{id:"KT-7834",a:"₹0.87L",due:"22-Mar",s:"Held",flag:"Dup"},{id:"KT-7801",a:"₹0.87L",due:"8-Mar",s:"Processed"}],
    dups: [{d:"Sep 25",a:"₹1.2L",c:"Manual, 8d"},{d:"Dec 25",a:"₹0.74L",c:"IW, 3d"},{d:"Mar 26",a:"₹0.87L",c:"Real-time"}],
    note: "Reliable supplier, good quality. Duplicate invoices = legacy billing system. Needs PO-matching mandate to fix permanently." },
  atlas: { name: "Atlas Chemicals", ty: "Vendor", seg: "Strategic", tenure: "6 yrs", risk: 89, rd: "flat", pc: [44,45,44,45,45,44], out: "₹3.2Cr", over: "₹0",
    contacts: [{n:"Amit Desai",r:"Account Dir",e:"a.desai@atlaschem.com"}],
    inv: [{id:"AC-2291",a:"₹3.2Cr",due:"24-Mar",s:"Scheduled"}],
    note: "Hard payment dates, 1.5% late penalty. Critical raw material supplier. Do not defer." },
  northway: { name: "Northway Logistics", ty: "Vendor", seg: "Logistics", tenure: "2 yrs", risk: 75, rd: "flat", pc: [42,43,44,42,45,44], out: "₹1.8Cr", over: "₹0",
    contacts: [{n:"Deepak Sharma",r:"Finance Head",e:"d.sharma@northway.in"}],
    inv: [{id:"NW-891",a:"₹1.8Cr",due:"25-Mar",s:"Scheduled"}],
    note: "5-day contractual grace period. Good relationship. Safe to defer 7 days with zero impact." },
  greenfield: { name: "Greenfield Agro", ty: "Vendor", seg: "Raw Materials", tenure: "3 yrs", risk: 71, rd: "flat", pc: [40,42,41,43,42,44], out: "₹1.4Cr", over: "₹0",
    contacts: [{n:"Sunita Rao",r:"AR Manager",e:"s.rao@greenfieldagro.com"}],
    inv: [{id:"GA-556",a:"₹1.4Cr",due:"26-Mar",s:"Scheduled"}],
    note: "7-day grace. Flexible. Recently requested Net-30 but currently Net-45." },
  metromart: { name: "Metro Mart Stores", ty: "Customer", seg: "Retail Chain", tenure: "5 yrs", risk: 88, rd: "flat", dso: [28,29,27,30,28,29], labels: ["Oct","Nov","Dec","Jan","Feb","Mar"], out: "₹2.4Cr", over: "₹0",
    contacts: [{n:"Vikram Singh",r:"Procurement",e:"v.singh@metromart.com"}],
    inv: [{id:"INV-4501",a:"₹8.1L",due:"30-Mar",s:"Current"}],
    note: "Consistent payer. Anchor customer. Q1 advance expected W10 (₹3.0Cr)." },
  clearview: { name: "Clearview Retail", ty: "Customer", seg: "Regional", tenure: "2 yrs", risk: 61, rd: "down", dso: [30,33,35,38,40,42], labels: ["Oct","Nov","Dec","Jan","Feb","Mar"], out: "₹1.4Cr", over: "₹0.37Cr",
    contacts: [{n:"Anand Pillai",r:"Finance Dir",e:"a.pillai@clearview.in"}],
    inv: [{id:"INV-4456",a:"₹3.7L",due:"3-Mar",s:"Overdue",d:13}],
    note: "DSO trending up steadily. Similar pattern to Pinnacle early stages. Watch closely — could become a problem in 60 days." },
  crestline: { name: "Crestline Packaging", ty: "Vendor", seg: "Packaging", tenure: "3 yrs", risk: 82, rd: "flat", pc: [30,31,30,32,30,31], out: "₹1.6Cr", over: "₹0",
    contacts: [{n:"Rahul Verma",r:"Sales",e:"r.verma@crestline.in"}],
    inv: [{id:"CP-441",a:"₹12.8L",due:"9-Apr",s:"Current"}],
    note: "Reliable. 3-year clean track record. 7-day grace. Safe deferral candidate." },
};

/* ═══════════════════════════════════════════
   TACTICAL DATA
   ═══════════════════════════════════════════ */
const txns = [
  { id: "TXN-4892", dt: "14-Mar", ent: "Pinnacle Distributors", ek: "pinnacle", ty: "AR", amt: "+₹4.2L", st: "Received", fl: null },
  { id: "TXN-4891", dt: "14-Mar", ent: "Crestline Packaging", ek: "crestline", ty: "AP", amt: "-₹12.8L", st: "Processed", fl: null },
  { id: "TXN-4890", dt: "13-Mar", ent: "Kiran Textiles", ek: "kiran", ty: "AP", amt: "-₹0.87L", st: "Held", fl: "Duplicate" },
  { id: "TXN-4889", dt: "13-Mar", ent: "Metro Mart Stores", ek: "metromart", ty: "AR", amt: "+₹8.1L", st: "Received", fl: null },
  { id: "TXN-4888", dt: "12-Mar", ent: "Northway Logistics", ek: "northway", ty: "AP", amt: "-₹6.4L", st: "Scheduled", fl: null },
  { id: "TXN-4887", dt: "12-Mar", ent: "Atlas Chemicals", ek: "atlas", ty: "AP", amt: "-₹18.2L", st: "Scheduled", fl: null },
  { id: "TXN-4886", dt: "11-Mar", ent: "Clearview Retail", ek: "clearview", ty: "AR", amt: "+₹3.7L", st: "Overdue", fl: "12 days" },
  { id: "TXN-4885", dt: "11-Mar", ent: "Greenfield Agro", ek: "greenfield", ty: "AP", amt: "-₹9.3L", st: "Processed", fl: null },
];

const arAge = [
  { b: "Current", a: 14.2, p: 42, c: C.accent }, { b: "1-30d", a: 9.8, p: 29, c: C.am },
  { b: "31-60d", a: 5.1, p: 15, c: C.amber }, { b: "61-90d", a: 3.2, p: 9, c: "#D4760A" },
  { b: "90+d", a: 1.7, p: 5, c: C.red },
];
const apAge = [
  { b: "Current", a: 11.6, p: 45, c: C.accent }, { b: "1-30d", a: 8.3, p: 32, c: C.am },
  { b: "31-60d", a: 3.9, p: 15, c: C.amber }, { b: "61-90d", a: 1.4, p: 5, c: "#D4760A" },
  { b: "90+d", a: 0.8, p: 3, c: C.red },
];

const upcom = [
  { dt: "17-Mar", ent: "Orbit Logistics", ek: null, amt: "₹6.2L", ty: "AP", pri: "normal" },
  { dt: "19-Mar", ent: "Pinnacle Distributors", ek: "pinnacle", amt: "₹4.2L", ty: "AR", pri: "risk", note: "Part of ₹2.3Cr overdue" },
  { dt: "24-Mar", ent: "Atlas Chemicals", ek: "atlas", amt: "₹3.2Cr", ty: "AP", pri: "hard", note: "Hard date. 1.5% penalty." },
  { dt: "25-Mar", ent: "Northway Logistics", ek: "northway", amt: "₹1.8Cr", ty: "AP", pri: "flex", note: "Shift candidate (5d grace)" },
  { dt: "26-Mar", ent: "Greenfield Agro", ek: "greenfield", amt: "₹1.4Cr", ty: "AP", pri: "flex", note: "Shift candidate (7d grace)" },
];

/* ═══════════════════════════════════════════
   STRATEGIC DATA
   ═══════════════════════════════════════════ */
const rev = [
  { m:"Apr",pl:42.5,ac:41.8 },{ m:"May",pl:44.0,ac:43.2 },{ m:"Jun",pl:46.2,ac:47.1 },
  { m:"Jul",pl:43.8,ac:42.0 },{ m:"Aug",pl:45.5,ac:44.9 },{ m:"Sep",pl:48.0,ac:49.2 },
  { m:"Oct",pl:50.2,ac:48.6 },{ m:"Nov",pl:52.0,ac:50.1 },{ m:"Dec",pl:55.0,ac:53.4 },
  { m:"Jan",pl:48.5,ac:46.8 },{ m:"Feb",pl:50.0,ac:48.2 },{ m:"Mar",pl:52.0,ac:null,fc:49.5 },
];

const budgets = [
  { fn: "Manufacturing", b: 180, a: 176.4, s: "ok" },
  { fn: "Sales & Distribution", b: 95, a: 98.2, s: "over" },
  { fn: "Raw Materials", b: 142, a: 148.6, s: "over" },
  { fn: "Marketing & Trade", b: 65, a: 58.4, s: "under" },
  { fn: "People & Admin", b: 72, a: 71.8, s: "ok" },
  { fn: "Logistics", b: 48, a: 52.1, s: "over" },
];

const margins = [
  { m:"Apr",g:38.2,e:14.1 },{ m:"May",g:37.8,e:13.8 },{ m:"Jun",g:39.1,e:15.2 },
  { m:"Jul",g:36.5,e:12.4 },{ m:"Aug",g:37.9,e:13.6 },{ m:"Sep",g:39.4,e:15.8 },
  { m:"Oct",g:37.2,e:13.1 },{ m:"Nov",g:36.8,e:12.6 },{ m:"Dec",g:37.0,e:12.8 },
  { m:"Jan",g:36.2,e:11.9 },{ m:"Feb",g:35.8,e:11.4 },{ m:"Mar",g:null,e:null,fg:35.5,fe:11.0 },
];

const varDrv = [
  { d: "South under-distribution (82 outlets)", i: -4.2, t: "rev", detail: "Volume down 6% in South. 82 outlets dropped off billing in Jan-Feb.",
    subs: [
      { label: "38 outlets lost to competitor poaching", impact: "-₹1.8Cr", note: "Competitor offered better trade margins in Hyderabad cluster" },
      { label: "27 outlets dropped due to credit blocks", impact: "-₹1.2Cr", note: "Distributor credit limits hit. 3 distributors flagged." },
      { label: "17 outlets seasonal closure (not recovered)", impact: "-₹1.2Cr", note: "Post-Diwali closures that weren't reactivated in Jan" },
    ],
    action: "Distribution sprint: reactivate 82 outlets in 6 weeks. Est. recovery: ₹1.8Cr.", linked: null },
  { d: "Raw material inflation (palm oil +12%)", i: +6.6, t: "cost", detail: "Unhedged exposure. Budget assumed +4% max.",
    subs: [
      { label: "Palm oil spot price +12% vs budget +4%", impact: "+₹4.8Cr", note: "Unhedged. Global palm oil index up 18% since Sep." },
      { label: "Packaging material (corrugated +8%)", impact: "+₹1.2Cr", note: "Kraft paper shortage. Two suppliers revised in Dec." },
      { label: "Partially offset by lower sugar costs", impact: "-₹0.6Cr", note: "Sugar procurement locked at favorable rates in Q1" },
    ],
    action: "Hedge palm oil for Q1 FY27 now (₹2.1L hedging cost locks in current rate). Renegotiate packaging with alternate suppliers.", linked: "greenfield" },
  { d: "Logistics rate revision (fuel surcharge)", i: +4.1, t: "cost", detail: "3 carrier contracts on auto-renewal at +8%.",
    subs: [
      { label: "Northway Logistics: +8% fuel surcharge", impact: "+₹1.6Cr", note: "Contract auto-renewed Dec without renegotiation" },
      { label: "2 regional carriers: +7-9% rate revision", impact: "+₹1.4Cr", note: "Effective Jan. Not flagged until Feb close." },
      { label: "Route optimization gap (18% empty miles)", impact: "+₹1.1Cr", note: "Return legs running empty on 3 major corridors" },
    ],
    action: "Renegotiate Northway (due for renewal Apr). Run route optimization for 3 corridors. Est. savings: ₹2.2Cr/year.", linked: "northway" },
  { d: "Trade spend pushed to FY27", i: -6.6, t: "save", detail: "2 planned promotions delayed. Budget available for reallocation.",
    subs: [
      { label: "Summer campaign pushed to Apr (₹4.1Cr)", impact: "-₹4.1Cr", note: "Creative not ready. Agency delay." },
      { label: "MT co-op promo deferred to May (₹2.5Cr)", impact: "-₹2.5Cr", note: "Key account requested postponement" },
    ],
    action: "Reallocate ₹6.6Cr to offset RM overrun (one-time). Does not fix the structural cost issue.", linked: null },
  { d: "West price realization gap", i: -2.8, t: "rev", detail: "Competitive pressure forcing 3-5% discount on 4 SKUs.",
    subs: [
      { label: "SKU-1104 (₹1.1Cr): 5% discount since Nov", impact: "-₹1.1Cr", note: "Competitor launched equivalent at 8% lower MRP" },
      { label: "SKU-1108 (₹0.9Cr): 3% discount since Dec", impact: "-₹0.9Cr", note: "Regional brand undercutting in Maharashtra" },
      { label: "SKU-1112 + 1115: combined ₹0.8Cr", impact: "-₹0.8Cr", note: "MT chain demanded price match to retain shelf space" },
    ],
    action: "Decision needed: accept discount and re-plan (₹2.8Cr annual hit) or exit 2 lowest-margin SKUs (recover ₹1.4Cr, lose ₹0.6Cr volume).", linked: null },
];

/* ═══════════════════════════════════════════
   CASH FLOW & WORKING CAPITAL DATA
   ═══════════════════════════════════════════ */
const wc = {
  dso: { v: 36, t: 32, tr: [34,33,35,34,35,36] },
  dio: { v: 28, t: 25, tr: [26,27,26,28,27,28] },
  dpo: { v: 41, t: 45, tr: [43,44,42,43,42,41] },
};
const ccc = wc.dso.v + wc.dio.v - wc.dpo.v;
const cccT = wc.dso.t + wc.dio.t - wc.dpo.t;

const cf = [
  { w:"W1",ac:8.2,fc:8.0,i:12.1,o:11.9 },{ w:"W2",ac:7.1,fc:7.8,i:10.4,o:11.5 },
  { w:"W3",ac:6.8,fc:7.5,i:9.8,o:10.1 },{ w:"W4",ac:null,fc:7.2,i:11.2,o:10.8 },
  { w:"W5",ac:null,fc:6.9,i:10.1,o:10.4 },{ w:"W6",ac:null,fc:6.4,i:9.2,o:9.7 },
  { w:"W7",ac:null,fc:5.8,i:8.8,o:9.4 },{ w:"W8",ac:null,fc:5.1,i:8.1,o:8.8 },
  { w:"W9",ac:null,fc:3.8,i:7.1,o:11.2 },{ w:"W10",ac:null,fc:4.9,i:12.3,o:11.2 },
  { w:"W11",ac:null,fc:5.6,i:11.8,o:11.1 },{ w:"W12",ac:null,fc:6.2,i:11.2,o:10.6 },
  { w:"W13",ac:null,fc:6.8,i:11.0,o:10.4 },
];

/* ═══════════════════════════════════════════
   MORNING BRIEF CARDS
   ═══════════════════════════════════════════ */
const brief = [
  { id:1, lv:"critical", ly:"cross", ek:"pinnacle", go:["payments","cashflow"],
    title: "₹2.3Cr stuck at Pinnacle is about to blow a hole in your Week 7 forecast",
    sub: "An overdue invoice (tactical) is now the primary driver of a cash breach (strategic). This one receivable accounts for 62% of the projected gap.",
    ev: ["Two invoices (₹1.4Cr + ₹0.9Cr) due 28-Feb. No payment, no dispute, 11 days silence.","Payment cycle: 32 → 47 days over 3 months. Their own Q3 revenue declined 8%.","Week 7 forecast assumed clearance by 10-Mar. Cash corridor now ₹1.8Cr tighter."],
    rec: "Escalate to Pinnacle's CFO today (not AP). Simultaneously pre-approve the fallback: vendor deferrals (₹1.2Cr, zero cost) or HDFC draw (₹2Cr, ₹4.6L cost). Don't wait to find out which one you'll need.",
    trail: [{ag:"Data",t:"06:01",a:"AR ledger scan",d:"INV-4471 + INV-4523: 16 days overdue, no payment/dispute in ERP."},{ag:"Pattern",t:"06:01",a:"Payment history",d:"DSO trend: 32→47 over 6mo. Cross-referenced with their published Q3: 8% revenue decline."},{ag:"Forecast",t:"06:02",a:"Cash recalculation",d:"Removed ₹2.3Cr from W7. Cascaded W7-W13. W9 breaches ₹4Cr threshold."},{ag:"Synthesis",t:"06:02",a:"Cross-layer merge",d:"Connected tactical AR → strategic cash forecast → AP terms → credit costs. Ranked #1 by compound impact."}],
    chat: [{r:"ai",t:"This is the highest-impact item. The ₹2.3Cr overdue isn't just an AR problem — it's now the primary driver of your Week 9 cash breach. What would you like to explore?"},{r:"chips",o:["What if they don't pay by W8?","Show the deferral options","Draft an escalation email","How does this hit revenue recognition?"]}],
  },
  { id:2, lv:"attention", ly:"strategic", ek:null, go:["performance"],
    title: "FY26 revenue tracking 3.2% below plan — and the gap is widening, not closing",
    sub: "YTD: ₹525.3Cr vs ₹542.7Cr plan. The miss has tripled since Q2. Two regions are driving 80% of it.",
    ev: ["Cumulative: Q1 -₹0.6Cr, Q2 -₹4.5Cr, Q3 -₹7.1Cr. Accelerating.","South: 82 outlets not billed, volume -6%. West: 3-5% price discount on 4 SKUs not in plan.","Mar forecast ₹49.5Cr vs ₹52.0Cr. Q4 will be worst quarter."],
    rec: "South needs a distribution sprint (82 outlets, ~₹1.8Cr recapture in 6 weeks). West needs a pricing decision: accept discount and re-plan, or exit the 4 loss-making SKUs. Holding current position is the worst option.",
    trail: [{ag:"Data",t:"06:04",a:"Revenue ledger",d:"Monthly actuals vs plan, 4 regions, 12 months."},{ag:"Pattern",t:"06:04",a:"Variance decomposition",d:"Volume 62%, price 28%, mix 10%. South=volume, West=price."},{ag:"Forecast",t:"06:04",a:"Q4 projection",d:"Feb run-rate → Mar. Full-year miss: ₹17.4Cr (3.2%)."},{ag:"Synthesis",t:"06:05",a:"Recovery model",d:"South sprint + West reset closes 72% of gap."}],
    chat: [{r:"ai",t:"The gap has tripled since Q2. Good news: 80% is concentrated in two regions with fixable causes."},{r:"chips",o:["Break down by region","Model recovery scenarios","Show margin impact","How does this affect cash?"]}],
  },
  { id:3, lv:"attention", ly:"tactical", ek:"kiran", go:["payments"],
    title: "Third duplicate from Kiran Textiles in 6 months — pattern, not mistake",
    sub: "₹86,500 auto-held in real time. But the fix isn't another hold — it's forcing PO-level matching upstream.",
    ev: ["Invoice #KT-7834 matches #KT-7801: amount, line items, delivery date.","Sep (₹1.2L, 8d), Dec (₹74K, 3d), Mar (₹87K, real-time). Catch time collapsing.","Total across 4 vendors in 12mo: ₹8.4L."],
    rec: "Mandate PO-level matching from Kiran this month. Flag 3 other repeat offenders (Orbit, Sapphire, Metro Print) for the same treatment.",
    trail: [{ag:"Data",t:"06:01",a:"Invoice ingestion",d:"KT-7834 auto-matched against existing invoices."},{ag:"Pattern",t:"06:01",a:"Duplicate detection",d:"3rd in 6mo. Systemic pattern flagged."},{ag:"Synthesis",t:"06:01",a:"Auto-held + upstream fix",d:"Zero exposure. PO-matching mandate recommended."}],
    chat: [{r:"ai",t:"Auto-held, zero exposure. The real question: fix the vendor's process or keep catching duplicates forever?"},{r:"chips",o:["Show all duplicate offenders","Draft vendor communication","Total exposure across all vendors?"]}],
  },
  { id:4, lv:"attention", ly:"cross", ek:null, go:["payments","cashflow"],
    title: "Three vendor payments land in a 4-day window in Week 9 — two don't have to",
    sub: "₹11.2Cr out vs ₹7.1Cr in. AP scheduling (tactical) creating a cash breach (strategic). Two shifts eliminate it at zero cost.",
    ev: ["Atlas ₹3.2Cr (hard, penalty). Northway ₹1.8Cr (5-day grace). Greenfield ₹1.4Cr (7-day grace).","Only Atlas is fixed."],
    rec: "Shift Northway to 1-Apr and Greenfield to 31-Mar. Spike flattens from ₹11.2Cr to ₹7.8Cr. Zero cost, zero relationship damage.",
    trail: [{ag:"Data",t:"06:02",a:"AP schedule scan",d:"3 payments ₹6.4Cr in 4-day window."},{ag:"Forecast",t:"06:02",a:"Cash impact",d:"W9: ₹11.2Cr out vs ₹7.1Cr in. Breach."},{ag:"Synthesis",t:"06:02",a:"Contract + cash merge",d:"Two shifts eliminate breach. Atlas untouchable."}],
    chat: [{r:"ai",t:"Simple scheduling fix. Two shifts, zero cost, breach eliminated."},{r:"chips",o:["Model the shifts in Cash Flow","What if Atlas also slips?","Show contract terms"]}],
  },
  { id:5, lv:"watch", ly:"strategic", ek:null, go:["performance"],
    title: "Gross margin eroded 240bps since Apr — raw materials, not pricing",
    sub: "38.2% → 35.8%. Unhedged palm oil (+12%) accounts for 160bps. EBITDA following: 14.1% → 11.4%.",
    ev: ["RM budget assumed +4%. Actual: palm oil +12%, packaging +8%. ₹6.6Cr over.","Pricing flat vs plan. The margin hit is entirely cost-driven.","Trade spend surplus (₹6.6Cr) available as one-time offset."],
    rec: "Three levers: (1) Hedge palm oil for Q1 FY27 now, (2) Push 2-3% price increase on top 10 SKUs (<1% volume risk), (3) Reallocate trade spend surplus to offset.",
    trail: [{ag:"Data",t:"06:05",a:"P&L scan",d:"Gross margin and EBITDA monthly. 240bps erosion."},{ag:"Pattern",t:"06:05",a:"Cost decomposition",d:"RM: palm oil 160bps, packaging 50bps. Price flat."},{ag:"Synthesis",t:"06:05",a:"Recovery model",d:"Hedge + price + realloc recovers ~180bps."}],
    chat: [{r:"ai",t:"Slow burn but it compounds. EBITDA exits the year at 10.8% vs 14.1% plan at this trajectory."},{r:"chips",o:["Margin trend detail","Model price increase impact","Hedging cost?","Cash flow connection?"]}],
  },
  { id:6, lv:"watch", ly:"tactical", ek:null, go:["payments","cashflow"],
    title: "4 suppliers asking for shorter terms — together, ₹2.8Cr/month compression",
    sub: "Each looks routine. The IW connected them: it's an MSME credit-tightening signal, not a relationship issue.",
    ev: ["Four mid-tier: Net-45 → Net-30 for Q2. Combined ₹2.8Cr hits 15 days earlier permanently.","Root cause: tighter MSME credit conditions. They're pulling your lever because they can't pull their bank's."],
    rec: "Accept for 2 (where you have supply alternatives). Counter the other 2 with Net-37 or 2/10 Net-45 early-payment discount that benefits your working capital math.",
    trail: [{ag:"Data",t:"06:03",a:"Contract scan",d:"4 vendors, term changes, 2-week window."},{ag:"Pattern",t:"06:03",a:"Cross-vendor",d:"All MSME. Correlated with RBI credit data."},{ag:"Synthesis",t:"06:03",a:"Leverage map",d:"2 have substitutes (accept), 2 sole-source (counter)."}],
    chat: [{r:"ai",t:"Not about you — MSME credit pressure. But accepting all four permanently compresses working capital."},{r:"chips",o:["Show the leverage map","Model working capital impact","Draft counter-proposals"]}],
  },
  { id:7, lv:"ontrack", ly:"tactical", ek:null, go:["payments","cashflow"],
    title: "South collections 11% faster since Feb dunning automation — West is still manual, costing ₹1.6Cr",
    sub: "DSO: 38→34 days. ₹1.2Cr freed. The proof case for West rollout. Same customer profile, only difference is the process.",
    ev: ["South AR: ₹8.4Cr (down from ₹9.6Cr). 12/18 overdue accounts cleared.","Automated dunning (Day 7/14/21) cut manual follow-up by 60%.","West: 42-day DSO, same profile. The only variable is the process."],
    rec: "Roll out West dunning this week. 2 days of configuration for ₹1.6Cr in freed working capital over 60 days. Highest-ROI action on your plate right now.",
    trail: [{ag:"Data",t:"06:03",a:"Regional AR",d:"South 34d vs West 42d. Same customer profiles."},{ag:"Pattern",t:"06:03",a:"Causal analysis",d:"Only variable: auto dunning (South) vs manual (West)."},{ag:"Synthesis",t:"06:03",a:"ROI calc",d:"2 days config, ₹0 cost, ₹1.6Cr freed. Best ROI available."}],
    chat: [{r:"ai",t:"Easiest win on your board. South proved the model. 2 days of work for ₹1.6Cr."},{r:"chips",o:["Start the West rollout","South vs West detail","What other automations?"]}],
  },
];

/* ═══════════════════════════════════════════
   SMALL COMPONENTS
   ═══════════════════════════════════════════ */
const Tag = ({children,bg,c:cl}) => <span style={{fontFamily:F.mo,fontSize:9,fontWeight:600,letterSpacing:"0.05em",color:cl,background:bg,padding:"2px 7px",borderRadius:3,whiteSpace:"nowrap"}}>{children}</span>;

const Spark = ({data,color,w=100,h=24}) => {
  if(!data||data.length<2) return null;
  const lo=Math.min(...data),hi=Math.max(...data),r=hi-lo||1,s=w/(data.length-1);
  const pts=data.map((v,i)=>`${i*s},${h-3-((v-lo)/r)*(h-6)}`).join(" ");
  return <svg width={w} height={h}><polyline points={pts} fill="none" stroke={color} strokeWidth={1.5}/><circle cx={(data.length-1)*s} cy={h-3-((data[data.length-1]-lo)/r)*(h-6)} r={2} fill={color}/></svg>;
};

const Stat = ({label,value,sub,trend,tc}) => (
  <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,padding:"10px 12px"}}>
    <div style={{fontFamily:F.mo,fontSize:8,letterSpacing:"0.08em",color:C.muted,textTransform:"uppercase",marginBottom:2}}>{label}</div>
    <div style={{fontFamily:F.sr,fontSize:17,fontWeight:700,lineHeight:1}}>{value}</div>
    {sub&&<div style={{fontSize:10,color:C.sub,marginTop:2}}>{sub}</div>}
    {trend&&<div style={{fontFamily:F.mo,fontSize:9,color:tc||C.accent,marginTop:2}}>{trend}</div>}
  </div>
);

const AgeBar = ({data,note}) => (
  <div>
    <div style={{display:"flex",borderRadius:4,overflow:"hidden",height:12,marginBottom:6}}>{data.map((d,i)=><div key={i} style={{width:`${d.p}%`,background:d.c}}/>)}</div>
    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{data.map((d,i)=><span key={i} style={{display:"flex",alignItems:"center",gap:3,fontSize:10,fontFamily:F.mo}}><span style={{width:6,height:6,borderRadius:2,background:d.c}}/><span style={{color:C.sub}}>{d.b}</span><span style={{fontWeight:600}}>₹{d.a}Cr</span></span>)}</div>
    {note&&<div style={{fontSize:10.5,color:C.sub,marginTop:4,fontStyle:"italic"}}>{note}</div>}
  </div>
);

// Inline chat input (appears in tactical/strategic/synthesis tabs)
const ChatInput = ({placeholder}) => (
  <div style={{display:"flex",gap:6,marginTop:14,padding:"10px 12px",background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`}}>
    <input placeholder={placeholder||"Ask the IW..."} style={{flex:1,fontFamily:F.mn,fontSize:11.5,padding:"6px 0",border:"none",outline:"none",background:"transparent",color:C.ink}} />
    <button style={{fontFamily:F.mo,fontSize:9,fontWeight:600,background:C.accent,color:"#fff",border:"none",borderRadius:6,padding:"6px 11px",cursor:"pointer",whiteSpace:"nowrap"}}>Ask</button>
  </div>
);

/* ═══ CASH FLOW CHART ═══ */
const CFChart = ({data,sLine,onClickW,selW}) => {
  const W=860,H=180,pL=40,pR=14,pT=16,pB=24,mx=10;
  const cW=W-pL-pR,cH=H-pT-pB,step=cW/(data.length-1);
  const y=v=>pT+cH-(v/mx)*cH, x=i=>pL+step*i;
  const mkP=vals=>vals.map((v,i)=>`${i===0?"M":"L"}${x(i)},${y(v)}`).join(" ");
  const fL=mkP(data.map(d=>d.fc));
  const aL=data.filter(d=>d.ac!==null).map((d,i)=>`${i===0?"M":"L"}${x(i)},${y(d.ac)}`).join(" ");
  const si=selW?data.findIndex(d=>d.w===selW):-1;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{width:"100%",fontFamily:F.mo,display:"block"}}>
      {[0,2,4,6,8,10].map(v=><g key={v}><line x1={pL} x2={W-pR} y1={y(v)} y2={y(v)} stroke={C.bdr} strokeWidth={0.5}/><text x={pL-4} y={y(v)+3} textAnchor="end" fontSize={7} fill={C.muted}>₹{v}</text></g>)}
      <line x1={pL} x2={W-pR} y1={y(4)} y2={y(4)} stroke={C.red} strokeWidth={1} strokeDasharray="4,3" opacity={0.35}/>
      {si>-1&&<rect x={x(si)-step/2} y={pT} width={step} height={cH} fill={C.accent} opacity={0.06} rx={3}/>}
      {sLine&&<path d={mkP(sLine)} fill="none" stroke={C.blue} strokeWidth={2} opacity={0.5}/>}
      <path d={fL} fill="none" stroke={C.accent} strokeWidth={1.5} strokeDasharray="5,3" opacity={0.55}/>
      <path d={aL} fill="none" stroke={C.accent} strokeWidth={2.5}/>
      {data.map((d,i)=><g key={i} onClick={()=>onClickW&&onClickW(d.w)} style={{cursor:"pointer"}}>
        <rect x={x(i)-step/2} y={pT} width={step} height={cH+pB} fill="transparent"/>
        {d.ac!==null?<circle cx={x(i)} cy={y(d.ac)} r={3} fill={C.accent}/>:<circle cx={x(i)} cy={y(d.fc)} r={2.5} fill={d.fc<4?C.red:"none"} stroke={d.fc<4?C.red:C.accent} strokeWidth={1.5} opacity={0.7}/>}
        {sLine&&<circle cx={x(i)} cy={y(sLine[i])} r={2} fill={sLine[i]<4?C.red:C.blue} opacity={0.4}/>}
        <text x={x(i)} y={H-4} textAnchor="middle" fontSize={7} fill={selW===d.w?C.accent:C.muted} fontWeight={selW===d.w?700:400}>{d.w}</text>
      </g>)}
      <line x1={pL} x2={pL+14} y1={pT-5} y2={pT-5} stroke={C.accent} strokeWidth={2.5}/><text x={pL+17} y={pT-2} fontSize={7} fill={C.sub}>Actual</text>
      <line x1={pL+50} x2={pL+64} y1={pT-5} y2={pT-5} stroke={C.accent} strokeWidth={1.5} strokeDasharray="4,3"/><text x={pL+67} y={pT-2} fontSize={7} fill={C.sub}>Forecast</text>
      {sLine&&<><line x1={pL+105} x2={pL+119} y1={pT-5} y2={pT-5} stroke={C.blue} strokeWidth={2} opacity={0.5}/><text x={pL+122} y={pT-2} fontSize={7} fill={C.blue}>Scenario</text></>}
    </svg>
  );
};

/* ═══ ENTITY DRAWER ═══ */
const Drawer = ({ek,onClose}) => {
  const e=E[ek]; if(!e) return null;
  const td=e.dso||e.pc; const rc=e.risk>=80?C.accent:e.risk>=60?C.amber:C.red;
  return (
    <div style={{position:"fixed",top:0,right:0,bottom:0,width:400,background:C.w,borderLeft:`1px solid ${C.bdr}`,zIndex:200,display:"flex",flexDirection:"column",boxShadow:"-4px 0 24px rgba(0,0,0,0.06)"}}>
      <div style={{padding:"14px 18px",borderBottom:`1px solid ${C.bdr}`,display:"flex",justifyContent:"space-between"}}>
        <div>
          <div style={{display:"flex",gap:4,marginBottom:4}}><Tag bg={e.ty==="Customer"?C.al:C.bl} c={e.ty==="Customer"?C.accent:C.blue}>{e.ty}</Tag><Tag bg={C.bg} c={C.muted}>{e.seg}</Tag></div>
          <div style={{fontFamily:F.sr,fontSize:16,fontWeight:700}}>{e.name}</div>
          <div style={{fontSize:10,color:C.muted}}>{e.tenure}</div>
        </div>
        <button onClick={onClose} style={{background:"none",border:"none",fontSize:16,color:C.muted,cursor:"pointer"}}>×</button>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"14px 18px"}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{fontFamily:F.mo,fontSize:17,fontWeight:700,color:rc}}>{e.risk}</span><span style={{fontFamily:F.mo,fontSize:9,color:e.rd==="down"?C.red:C.accent}}>{e.rd==="down"?"▼ Deteriorating":"— Stable"}</span></div>
        <div style={{height:4,borderRadius:2,background:C.bdr,marginBottom:14}}><div style={{height:4,borderRadius:2,width:`${e.risk}%`,background:rc}}/></div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:14}}>
          <div style={{background:C.bg,borderRadius:5,padding:"7px 9px"}}><div style={{fontFamily:F.mo,fontSize:7,color:C.muted,textTransform:"uppercase"}}>Outstanding</div><div style={{fontFamily:F.sr,fontSize:14,fontWeight:700,marginTop:1}}>{e.out}</div></div>
          <div style={{background:C.bg,borderRadius:5,padding:"7px 9px"}}><div style={{fontFamily:F.mo,fontSize:7,color:C.muted,textTransform:"uppercase"}}>Overdue</div><div style={{fontFamily:F.sr,fontSize:14,fontWeight:700,color:e.over!=="₹0"?C.red:C.accent,marginTop:1}}>{e.over}</div></div>
        </div>
        {td&&<div style={{marginBottom:14}}><div style={{fontFamily:F.mo,fontSize:7,color:C.muted,textTransform:"uppercase",marginBottom:4}}>{e.dso?"DSO Trend":"Payment Cycle"}</div><div style={{background:C.bg,borderRadius:5,padding:"8px 10px"}}><Spark data={td} color={e.rd==="down"?C.red:C.accent} w={320} h={30}/>{e.labels&&<div style={{display:"flex",justifyContent:"space-between",marginTop:3}}>{e.labels.map((l,i)=><span key={i} style={{fontFamily:F.mo,fontSize:7,color:C.muted}}>{l}</span>)}</div>}</div></div>}
        {e.dups&&<div style={{marginBottom:14}}><div style={{fontFamily:F.mo,fontSize:7,color:C.red,textTransform:"uppercase",marginBottom:4}}>Duplicate History</div>{e.dups.map((d,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"4px 0",borderBottom:`1px solid ${C.bdr}`,fontSize:11}}><span>{d.d} — {d.a}</span><span style={{fontFamily:F.mo,fontSize:9,color:C.muted}}>{d.c}</span></div>)}</div>}
        <div style={{marginBottom:14}}><div style={{fontFamily:F.mo,fontSize:7,color:C.muted,textTransform:"uppercase",marginBottom:4}}>Invoices</div>{e.inv.map((inv,i)=><div key={i} style={{padding:"6px 8px",marginBottom:3,borderRadius:4,background:(inv.s==="Overdue"||inv.flag)?C.rl+"55":C.bg,border:`1px solid ${(inv.s==="Overdue"||inv.flag)?C.red+"22":C.bdr}`}}><div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontFamily:F.mo,fontSize:10,fontWeight:600}}>{inv.id}</span><span style={{fontFamily:F.mo,fontSize:10,fontWeight:700}}>{inv.a}</span></div><div style={{display:"flex",justifyContent:"space-between",fontSize:9,color:C.sub,marginTop:1}}><span>Due {inv.due}</span><span style={{color:inv.s==="Overdue"?C.red:inv.s==="Held"?C.amber:C.accent,fontWeight:500}}>{inv.s}{inv.d?` (${inv.d}d)`:""}</span></div></div>)}</div>
        <div style={{marginBottom:14}}><div style={{fontFamily:F.mo,fontSize:7,color:C.muted,textTransform:"uppercase",marginBottom:4}}>Contacts</div>{e.contacts.map((c,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"4px 0",fontSize:11}}><span><span style={{fontWeight:500}}>{c.n}</span> · <span style={{color:C.muted}}>{c.r}</span></span><span style={{fontFamily:F.mo,fontSize:9,color:C.accent}}>{c.e}</span></div>)}</div>
        <div style={{background:C.al,borderRadius:5,padding:"10px 12px"}}><div style={{fontFamily:F.mo,fontSize:7,color:C.accent,textTransform:"uppercase",marginBottom:2}}>IW Assessment</div><div style={{fontSize:11,color:C.ink,lineHeight:1.5}}>{e.note}</div></div>
      </div>
    </div>
  );
};

/* ═══ VARIANCE DRIVER DRAWER ═══ */
const VarDrawer = ({driver,onClose,onEntity}) => {
  if(!driver) return null;
  const d = driver;
  const bc = d.t==="save"?C.accent:d.t==="rev"?C.red:C.amber;
  const bcl = d.t==="save"?C.al:d.t==="rev"?C.rl:C.aml;
  return (
    <div style={{position:"fixed",top:0,right:0,bottom:0,width:420,background:C.w,borderLeft:`1px solid ${C.bdr}`,zIndex:200,display:"flex",flexDirection:"column",boxShadow:"-4px 0 24px rgba(0,0,0,0.06)"}}>
      <div style={{padding:"16px 20px",borderBottom:`1px solid ${C.bdr}`,display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <div>
          <div style={{display:"flex",gap:5,marginBottom:6}}>
            <Tag bg={bcl} c={bc}>{d.t==="rev"?"Revenue":d.t==="cost"?"Cost":"Saving"}</Tag>
            <Tag bg={C.bg} c={C.muted}>{d.i>0?"+":""}₹{Math.abs(d.i)}Cr impact</Tag>
          </div>
          <div style={{fontFamily:F.sr,fontSize:16,fontWeight:700,lineHeight:1.3}}>{d.d}</div>
          <div style={{fontSize:11,color:C.sub,marginTop:4,lineHeight:1.45}}>{d.detail}</div>
        </div>
        <button onClick={onClose} style={{background:"none",border:"none",fontSize:16,color:C.muted,cursor:"pointer",flexShrink:0,marginLeft:8}}>×</button>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"16px 20px"}}>
        {/* Sub-drivers */}
        <div style={{fontFamily:F.mo,fontSize:8,letterSpacing:"0.1em",color:C.muted,textTransform:"uppercase",marginBottom:8}}>Breakdown</div>
        {d.subs.map((s,j)=>(
          <div key={j} style={{padding:"10px 12px",marginBottom:6,background:C.bg,borderRadius:6,borderLeft:`3px solid ${bc}`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:3}}>
              <div style={{fontSize:12,fontWeight:500,color:C.ink,lineHeight:1.35,flex:1}}>{s.label}</div>
              <span style={{fontFamily:F.mo,fontSize:11,fontWeight:700,color:bc,flexShrink:0,marginLeft:8}}>{s.impact}</span>
            </div>
            <div style={{fontSize:10.5,color:C.sub,lineHeight:1.4}}>{s.note}</div>
          </div>
        ))}

        {/* Recommended action */}
        <div style={{fontFamily:F.mo,fontSize:8,letterSpacing:"0.1em",color:C.accent,textTransform:"uppercase",marginBottom:6,marginTop:16}}>Recommended Action</div>
        <div style={{background:C.al,borderRadius:6,padding:"12px 14px",marginBottom:16}}>
          <div style={{fontSize:11.5,color:C.ink,lineHeight:1.5}}>{d.action}</div>
        </div>

        {/* Linked entity */}
        {d.linked&&(
          <div>
            <div style={{fontFamily:F.mo,fontSize:8,letterSpacing:"0.1em",color:C.muted,textTransform:"uppercase",marginBottom:6}}>Linked Entity</div>
            <div onClick={()=>{onClose();onEntity(d.linked);}} style={{padding:"10px 12px",background:C.bg,borderRadius:6,cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",border:`1px solid ${C.bdr}`}}>
              <div>
                <div style={{fontSize:12,fontWeight:600,color:C.ink}}>{E[d.linked]?.name}</div>
                <div style={{fontSize:10,color:C.muted}}>{E[d.linked]?.ty} · {E[d.linked]?.seg}</div>
              </div>
              <span style={{fontFamily:F.mo,fontSize:9,color:C.accent}}>View →</span>
            </div>
          </div>
        )}

        {/* Chat input */}
        <div style={{display:"flex",gap:6,marginTop:20,padding:"10px 12px",background:C.bg,borderRadius:8,border:`1px solid ${C.bdr}`}}>
          <input placeholder={`Ask about this driver...`} style={{flex:1,fontFamily:F.mn,fontSize:11.5,padding:"6px 0",border:"none",outline:"none",background:"transparent",color:C.ink}} />
          <button style={{fontFamily:F.mo,fontSize:9,fontWeight:600,background:C.accent,color:"#fff",border:"none",borderRadius:6,padding:"6px 11px",cursor:"pointer",whiteSpace:"nowrap"}}>Ask</button>
        </div>
      </div>
    </div>
  );
};

/* ═══ TRAIL MODAL ═══ */
const TrailModal = ({card,onClose}) => card?(
  <div onClick={onClose} style={{position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,0.28)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
    <div onClick={e=>e.stopPropagation()} style={{background:C.w,borderRadius:10,width:"100%",maxWidth:520,maxHeight:"78vh",overflow:"auto",border:`1px solid ${C.bdr}`}}>
      <div style={{padding:"14px 18px",borderBottom:`1px solid ${C.bdr}`,position:"sticky",top:0,background:C.w,zIndex:2,display:"flex",justifyContent:"space-between"}}>
        <div><div style={{fontFamily:F.mo,fontSize:8,color:C.muted,letterSpacing:"0.1em",marginBottom:3}}>DECISION TRAIL</div><div style={{fontSize:13,fontWeight:600,lineHeight:1.3,maxWidth:400}}>{card.title}</div></div>
        <button onClick={onClose} style={{background:"none",border:"none",fontSize:16,color:C.muted,cursor:"pointer"}}>×</button>
      </div>
      <div style={{padding:"16px 18px"}}>
        {card.trail.map((s,i)=>(
          <div key={i} style={{display:"flex",gap:12,paddingBottom:i<card.trail.length-1?16:0}}>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",width:26,flexShrink:0}}>
              <div style={{width:26,height:26,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",background:s.ag==="Synthesis"?C.al:C.bg,border:`1px solid ${s.ag==="Synthesis"?C.accent:C.bdr}`,fontFamily:F.mo,fontSize:9,fontWeight:600,color:s.ag==="Synthesis"?C.accent:C.sub}}>{s.ag[0]}</div>
              {i<card.trail.length-1&&<div style={{width:1,flex:1,background:C.bdr,marginTop:3}}/>}
            </div>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2}}><span style={{fontSize:12,fontWeight:600}}>{s.ag}</span><span style={{fontFamily:F.mo,fontSize:8,color:C.muted}}>{s.t}</span></div>
              <div style={{fontFamily:F.mo,fontSize:9,color:C.accent,marginBottom:2}}>{s.a}</div>
              <div style={{fontSize:11,color:C.sub,lineHeight:1.5}}>{s.d}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
):null;

/* ═══ DISCUSS MODAL ═══ */
const DiscussModal = ({card,onClose}) => {
  const [inp,setInp]=useState("");
  const [msgs,setMsgs]=useState(card?.chat||[]);
  if(!card) return null;
  const send=()=>{if(inp.trim()){setMsgs([...msgs,{r:"user",t:inp},{r:"ai",t:"Let me traverse the graph..."}]);setInp("");}};
  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,0.28)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div onClick={e=>e.stopPropagation()} style={{background:C.bg,borderRadius:10,width:"100%",maxWidth:500,maxHeight:"78vh",display:"flex",flexDirection:"column",border:`1px solid ${C.bdr}`}}>
        <div style={{padding:"12px 16px",borderBottom:`1px solid ${C.bdr}`,background:C.w,borderRadius:"10px 10px 0 0",display:"flex",justifyContent:"space-between"}}>
          <div><div style={{fontFamily:F.mo,fontSize:8,color:C.accent,letterSpacing:"0.06em",marginBottom:2}}>DISCUSSING</div><div style={{fontSize:12,fontWeight:600,lineHeight:1.3,maxWidth:380}}>{card.title}</div></div>
          <button onClick={onClose} style={{background:"none",border:"none",fontSize:16,color:C.muted,cursor:"pointer"}}>×</button>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"14px 16px"}}>
          {msgs.map((m,i)=>m.r==="chips"?(
            <div key={i} style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:10,paddingLeft:32}}>
              {m.o.map((o,j)=><button key={j} onClick={()=>setMsgs([...msgs,{r:"user",t:o},{r:"ai",t:"Traversing the graph..."}])} style={{fontFamily:F.mn,fontSize:10.5,padding:"5px 10px",borderRadius:14,border:`1px solid ${C.bdr}`,background:C.w,color:C.sub,cursor:"pointer"}}>{o}</button>)}
            </div>
          ):(
            <div key={i} style={{display:"flex",gap:8,marginBottom:10,flexDirection:m.r==="user"?"row-reverse":"row"}}>
              <div style={{width:24,height:24,borderRadius:"50%",flexShrink:0,background:m.r==="ai"?C.accent:C.blue,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:F.mo,fontSize:8,fontWeight:600}}>{m.r==="ai"?"IW":"Y"}</div>
              <div style={{maxWidth:"80%",padding:"9px 12px",borderRadius:m.r==="user"?"12px 12px 3px 12px":"3px 12px 12px 12px",background:m.r==="user"?C.bl:C.w,border:`1px solid ${C.bdr}`,fontSize:12,lineHeight:1.55,whiteSpace:"pre-line"}}>{m.t}</div>
            </div>
          ))}
        </div>
        <div style={{padding:"10px 16px",borderTop:`1px solid ${C.bdr}`,background:C.w,borderRadius:"0 0 10px 10px",display:"flex",gap:6}}>
          <input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")send();}} placeholder="Ask about this..." style={{flex:1,fontFamily:F.mn,fontSize:12,padding:"8px 10px",border:`1px solid ${C.bdr}`,borderRadius:7,outline:"none",background:C.bg}} onFocus={e=>e.target.style.borderColor=C.accent} onBlur={e=>e.target.style.borderColor=C.bdr}/>
          <button onClick={send} style={{fontFamily:F.mo,fontSize:9,fontWeight:600,background:C.accent,color:"#fff",border:"none",borderRadius:7,padding:"8px 12px",cursor:"pointer"}}>Send</button>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════ */
export default function FinanceIW() {
  const [tab,setTab]=useState("brief");
  const [openC,setOpenC]=useState(1);
  const [drw,setDrw]=useState(null);
  const [trail,setTrail]=useState(null);
  const [disc,setDisc]=useState(null);
  const [selW,setSelW]=useState(null);
  const [expVar,setExpVar]=useState(null);

  // Scenario state
  const [sDSO,setSDSO]=useState(36);
  const [sNW,setSNW]=useState(false);
  const [sGF,setSGF]=useState(false);
  const [sPin,setSPin]=useState("w8");
  const [sWD,setSWD]=useState(false);

  // CI state
  const [ciMsgs,setCiMsgs]=useState([
    {r:"ai",t:"Good morning. Here's your position:\n\nCash: ₹6.8Cr (₹0.7Cr below forecast). Revenue YTD: 3.2% below plan. Gross margin: 35.8% (down 240bps since Apr).\n\n7 items need your attention — the most urgent connects an overdue receivable to a cash corridor breach. Where would you like to start?"},
    {r:"chips",o:["Walk me through the Pinnacle situation","Show me the revenue gap","What's my biggest risk this week?","Model the Week 9 cash fix","Compare my working capital to target"]},
  ]);
  const [ciInp,setCiInp]=useState("");

  const sLine=useMemo(()=>cf.map((w,i)=>{
    let v=w.fc;
    if(i>=4) v-=(sDSO-36)*0.15;
    if(sPin==="w11"&&i>=5&&i<=9) v-=0.4;
    if(sPin==="w6"&&i>=5) v+=0.3;
    if(sNW&&i===8) v+=1; if(sNW&&i===9) v-=0.6;
    if(sGF&&i===8) v+=0.8; if(sGF&&i===9) v-=0.5;
    if(sWD&&i>=6) v+=0.25;
    return Math.max(0,Math.round(v*10)/10);
  }),[sDSO,sNW,sGF,sPin,sWD]);

  const sAct=sDSO!==36||sNW||sGF||sPin!=="w8"||sWD;
  const sMin=Math.min(...sLine),sW13=sLine[12],sBr=sLine.filter(v=>v<4).length;

  const openE=useCallback(k=>setDrw(k),[]);
  const priC={hard:C.red,risk:C.amber,flex:C.blue,normal:C.muted};
  const tabNames={payments:"Payments & Receivables",performance:"Revenue & Performance",cashflow:"Cash Flow & Working Capital"};

  return (
    <div className="overflow-auto" style={{fontFamily:F.mn,background:C.bg,height:"100vh",color:C.ink,display:"flex"}}>
      {drw&&<div onClick={()=>setDrw(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.1)",zIndex:190}}/>}
      {drw&&<Drawer ek={drw} onClose={()=>setDrw(null)}/>}
      {expVar!==null&&<div onClick={()=>setExpVar(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.1)",zIndex:190}}/>}
      {expVar!==null&&<VarDrawer driver={varDrv[expVar]} onClose={()=>setExpVar(null)} onEntity={(ek)=>{setExpVar(null);openE(ek);}}/>}
      {trail&&<TrailModal card={trail} onClose={()=>setTrail(null)}/>}
      {disc&&<DiscussModal card={disc} onClose={()=>setDisc(null)}/>}

      {/* ═══ SIDE NAV ═══ */}
      <div style={{width:195,background:C.nav,borderRight:`1px solid ${C.bdr}`,position:"fixed",top:0,left:0,bottom:0,zIndex:80,display:"flex",flexDirection:"column"}}>
        <div style={{padding:"16px 14px 16px"}}>
          <div style={{fontSize:16,fontWeight:700}}>questt<span style={{color:C.accent}}>.</span></div>
          <div style={{fontSize:10,color:C.muted,marginTop:1}}>Finance Intelligence Warehouse</div>
        </div>
        <div style={{flex:1,padding:"0 6px",overflowY:"auto"}}>
          {[
            {group:"Intelligence",gc:C.muted,items:[{id:"brief",icon:"◉",label:"Morning Brief",count:7}]},
            {group:"Tactical",gc:C.blue,items:[{id:"payments",icon:"⇄",label:"Payments & Receivables"}]},
            {group:"Strategic",gc:C.accent,items:[{id:"performance",icon:"▤",label:"Revenue & Performance"},{id:"cashflow",icon:"◎",label:"Cash Flow & Working Capital"}]},
            {group:"Conversational",gc:C.amber,items:[{id:"ci",icon:"◈",label:"Conversational Intelligence"}]},
          ].map(g=>(
            <div key={g.group}>
              <div style={{fontFamily:F.mo,fontSize:7,letterSpacing:"0.1em",color:g.gc,textTransform:"uppercase",padding:"10px 10px 3px"}}>{g.group}</div>
              {g.items.map(n=>(
                <button key={n.id} onClick={()=>setTab(n.id)} style={{width:"100%",textAlign:"left",display:"flex",alignItems:"center",gap:8,padding:"8px 10px",marginBottom:1,borderRadius:6,border:"none",cursor:"pointer",background:tab===n.id?C.w:"transparent",boxShadow:tab===n.id?"0 1px 2px rgba(0,0,0,0.04)":"none"}}>
                  <span style={{fontSize:12,opacity:tab===n.id?1:0.4}}>{n.icon}</span>
                  <span style={{fontSize:11.5,fontWeight:tab===n.id?600:400,color:tab===n.id?C.ink:C.sub,lineHeight:1.2}}>{n.label}</span>
                  {n.count&&<span style={{marginLeft:"auto",fontFamily:F.mo,fontSize:8,fontWeight:600,background:tab===n.id?C.accent:C.bdr,color:tab===n.id?"#fff":C.sub,padding:"1px 5px",borderRadius:7}}>{n.count}</span>}
                </button>
              ))}
            </div>
          ))}
        </div>
        <div style={{padding:"12px 14px",borderTop:`1px solid ${C.bdr}`}}>
          <div style={{fontFamily:F.mo,fontSize:8,color:C.muted}}>16 March 2026</div>
          <div style={{display:"flex",alignItems:"center",gap:6,marginTop:4}}><div style={{width:20,height:20,borderRadius:"50%",background:C.accent,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,fontWeight:600}}>CF</div><span style={{fontSize:11}}>CFO View</span></div>
        </div>
      </div>

      {/* ═══ CONTENT ═══ */}
      <div style={{marginLeft:195,flex:1}}>
        <div style={{maxWidth:920,margin:"0 auto",padding:"22px 26px 80px"}}>

          {/* ═══ MORNING BRIEF ═══ */}
          {tab==="brief"&&(
            <div>
              <div style={{marginBottom:16}}>
                <h1 style={{fontFamily:F.sr,fontSize:21,fontWeight:700,margin:0}}>Morning Brief</h1>
                <p style={{fontSize:12,color:C.sub,marginTop:3}}>Monday, 16 March 2026. 7 items ranked by compound impact across tactical and strategic layers.</p>
              </div>
              {brief.map(card=>{
                const u=URG[card.lv],ly=LAY[card.ly],isO=openC===card.id;
                return (
                  <div key={card.id} style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,marginBottom:6,overflow:"hidden",borderLeft:`3px solid ${ly.c}`,boxShadow:isO?"0 1px 6px rgba(0,0,0,0.03)":"none"}}>
                    <div onClick={()=>setOpenC(isO?null:card.id)} style={{padding:"12px 14px",cursor:"pointer",display:"flex",gap:10,alignItems:"flex-start"}}>
                      <div style={{width:6,height:6,borderRadius:"50%",background:u.c,marginTop:6,flexShrink:0}}/>
                      <div style={{flex:1}}>
                        <div style={{display:"flex",gap:4,marginBottom:3}}><Tag bg={u.bg} c={u.c}>{u.l}</Tag><Tag bg={ly.bg} c={ly.c}>{ly.l}</Tag></div>
                        <div style={{fontFamily:F.sr,fontSize:13.5,fontWeight:700,lineHeight:1.3,marginBottom:2}}>{card.title}</div>
                        <div style={{fontSize:11,color:C.sub,lineHeight:1.4}}>{card.sub}</div>
                      </div>
                      <span style={{color:C.muted,fontSize:13,marginTop:2,transition:"transform 0.2s",transform:isO?"rotate(180deg)":"none"}}>▾</span>
                    </div>
                    {isO&&(
                      <div style={{padding:"0 14px 12px 30px",borderTop:`1px solid ${C.bdr}`}}>
                        <div style={{paddingTop:10}}>
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
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* ═══ PAYMENTS & RECEIVABLES ═══ */}
          {tab==="payments"&&(
            <div>
              <div style={{marginBottom:16}}><h1 style={{fontFamily:F.sr,fontSize:21,fontWeight:700,margin:0}}>Payments & Receivables</h1><p style={{fontSize:12,color:C.sub,marginTop:3}}>The tactical foundation. Every number here feeds into Cash Flow & Working Capital. Click any row to see the full entity profile.</p></div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:16}}>
                <Stat label="Cash Position" value="₹6.8Cr" sub="₹0.7Cr below forecast" trend="W3 actual" tc={C.amber}/>
                <Stat label="Receivables" value="₹34.0Cr" sub="142 invoices, 38 accounts" trend="DSO: 36d (target 32d)" tc={C.amber}/>
                <Stat label="Payables" value="₹26.0Cr" sub="98 invoices, 24 vendors" trend="DPO: 41d (target 45d)" tc={C.amber}/>
                <Stat label="Overdue AR" value="₹4.9Cr" sub="14.4% of receivables" trend="▲ 2.1% MoM" tc={C.red}/>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
                <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,padding:"12px 14px"}}><div style={{fontFamily:F.sr,fontSize:13,fontWeight:700,marginBottom:2}}>Receivables Ageing</div><AgeBar data={arAge} note="61-90d grew 22% this month. That's Pinnacle + Clearview."/></div>
                <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,padding:"12px 14px"}}><div style={{fontFamily:F.sr,fontSize:13,fontWeight:700,marginBottom:2}}>Payables Ageing</div><AgeBar data={apAge} note="Clean. 77% within terms. Week 9 vendor convergence is the only pressure point."/></div>
              </div>
              <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,padding:"12px 14px",marginBottom:16}}>
                <div style={{fontFamily:F.sr,fontSize:13,fontWeight:700,marginBottom:6}}>Upcoming (10 days)</div>
                {upcom.map((p,i)=><div key={i} onClick={()=>p.ek&&openE(p.ek)} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 8px",marginBottom:2,borderRadius:4,cursor:p.ek?"pointer":"default",background:p.pri==="hard"?C.rl+"44":p.pri==="risk"?C.aml+"44":"transparent",borderLeft:`3px solid ${priC[p.pri]||C.bdr}`}}><span style={{fontFamily:F.mo,fontSize:10,color:C.sub,minWidth:42}}>{p.dt}</span><span style={{fontSize:11.5,fontWeight:500,flex:1}}>{p.ent}</span><Tag bg={p.ty==="AR"?C.al:C.bl} c={p.ty==="AR"?C.accent:C.blue}>{p.ty}</Tag><span style={{fontFamily:F.mo,fontSize:11,fontWeight:600,minWidth:50,textAlign:"right"}}>{p.amt}</span>{p.note&&<span style={{fontSize:9.5,color:priC[p.pri],maxWidth:150,lineHeight:1.3}}>{p.note}</span>}</div>)}
              </div>
              <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,overflow:"hidden"}}>
                <div style={{padding:"10px 14px",borderBottom:`1px solid ${C.bdr}`}}><span style={{fontFamily:F.sr,fontSize:13,fontWeight:700}}>Recent Transactions</span></div>
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:11.5}}><thead><tr style={{borderBottom:`1px solid ${C.bdr}`}}>{["ID","Date","Entity","Type","Amount","Status",""].map(h=><th key={h} style={{padding:"5px 12px",textAlign:"left",fontFamily:F.mo,fontSize:8,fontWeight:600,letterSpacing:"0.06em",color:C.muted,textTransform:"uppercase"}}>{h}</th>)}</tr></thead><tbody>{txns.map(tx=><tr key={tx.id} onClick={()=>tx.ek&&E[tx.ek]&&openE(tx.ek)} style={{borderBottom:`1px solid ${C.bdr}`,background:tx.fl?C.aml+"44":"transparent",cursor:tx.ek&&E[tx.ek]?"pointer":"default"}} onMouseEnter={e=>{if(tx.ek&&E[tx.ek])e.currentTarget.style.background=C.al+"44"}} onMouseLeave={e=>{e.currentTarget.style.background=tx.fl?C.aml+"44":"transparent"}}><td style={{padding:"7px 12px",fontFamily:F.mo,fontSize:10,color:C.sub}}>{tx.id}</td><td style={{padding:"7px 12px",color:C.sub}}>{tx.dt}</td><td style={{padding:"7px 12px",fontWeight:500}}>{tx.ent}</td><td style={{padding:"7px 12px"}}><Tag bg={tx.ty==="AR"?C.al:C.bl} c={tx.ty==="AR"?C.accent:C.blue}>{tx.ty}</Tag></td><td style={{padding:"7px 12px",fontFamily:F.mo,fontSize:11,fontWeight:600,color:tx.amt.startsWith("+")?C.accent:C.ink}}>{tx.amt}</td><td style={{padding:"7px 12px",fontSize:10.5,color:C.sub}}>{tx.st}</td><td style={{padding:"7px 12px"}}>{tx.fl&&<Tag bg={C.rl} c={C.red}>{tx.fl}</Tag>}</td></tr>)}</tbody></table>
              </div>
              <ChatInput placeholder="e.g. Show me all overdue receivables above ₹1Cr"/>
            </div>
          )}

          {/* ═══ REVENUE & PERFORMANCE ═══ */}
          {tab==="performance"&&(
            <div>
              <div style={{marginBottom:16}}><h1 style={{fontFamily:F.sr,fontSize:21,fontWeight:700,margin:0}}>Revenue & Performance</h1><p style={{fontSize:12,color:C.sub,marginTop:3}}>How the business is performing vs plan. Revenue, margins, budget tracking, and the drivers behind every variance.</p></div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:8,marginBottom:16}}>
                <Stat label="YTD Revenue" value="₹525.3Cr" sub="vs ₹542.7Cr plan" trend="▼ 3.2% behind" tc={C.red}/>
                <Stat label="Mar Forecast" value="₹49.5Cr" sub="vs ₹52.0Cr plan" trend="▼ ₹2.5Cr gap" tc={C.red}/>
                <Stat label="Gross Margin" value="35.8%" sub="vs 38.2% Apr" trend="▼ 240bps erosion" tc={C.red}/>
                <Stat label="EBITDA" value="11.4%" sub="vs 14.1% Apr" trend="▼ 270bps" tc={C.red}/>
                <Stat label="Cost Overrun" value="₹10.7Cr" sub="RM + Logistics" trend="₹6.6Cr unhedged RM" tc={C.amber}/>
              </div>
              {/* Revenue chart — annotated */}
              <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,padding:"14px 16px",marginBottom:14}}>
                <div style={{fontFamily:F.sr,fontSize:14,fontWeight:700,marginBottom:10}}>Revenue: Plan vs Actual</div>
                <div style={{position:"relative"}}>
                  <div style={{display:"flex",alignItems:"flex-end",gap:4,height:130,marginBottom:6}}>
                    {rev.map((m,i)=>{const ac=m.ac||m.fc,mx=56,v=ac-m.pl;return(
                      <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:1,position:"relative"}}>
                        <div style={{fontSize:8,fontFamily:F.mo,color:v>=0?C.accent:C.red,fontWeight:600}}>{v>=0?"+":""}{Math.round(v*10)/10}</div>
                        <div style={{width:"100%",display:"flex",gap:1,alignItems:"flex-end"}}>
                          <div style={{flex:1,height:(m.pl/mx)*100,background:C.bdr,borderRadius:"2px 2px 0 0",opacity:0.5}}/>
                          <div style={{flex:1,height:(ac/mx)*100,background:v>=0?C.accent:C.red,borderRadius:"2px 2px 0 0",opacity:m.ac===null?0.35:0.75}}/>
                        </div>
                        <span style={{fontSize:8,fontFamily:F.mo,color:C.muted}}>{m.m}</span>
                      </div>);})}
                  </div>
                  {/* Quarter annotations overlaid */}
                  <div style={{position:"absolute",top:0,left:0,right:0,display:"flex",pointerEvents:"none"}}>
                    <div style={{flex:3,borderBottom:`2px solid ${C.accent}22`,margin:"0 2px",display:"flex",justifyContent:"center",paddingTop:2}}>
                      <span style={{fontFamily:F.mo,fontSize:8,color:C.accent,background:C.al,padding:"1px 6px",borderRadius:3}}>Q1: -₹0.6Cr</span>
                    </div>
                    <div style={{flex:3,borderBottom:`2px solid ${C.amber}33`,margin:"0 2px",display:"flex",justifyContent:"center",paddingTop:2}}>
                      <span style={{fontFamily:F.mo,fontSize:8,color:C.amber,background:C.aml,padding:"1px 6px",borderRadius:3}}>Q2: -₹4.5Cr</span>
                    </div>
                    <div style={{flex:3,borderBottom:`2px solid ${C.red}33`,margin:"0 2px",display:"flex",justifyContent:"center",paddingTop:2}}>
                      <span style={{fontFamily:F.mo,fontSize:8,color:C.red,background:C.rl,padding:"1px 6px",borderRadius:3}}>Q3: -₹7.1Cr</span>
                    </div>
                    <div style={{flex:3,borderBottom:`2px dashed ${C.red}44`,margin:"0 2px",display:"flex",justifyContent:"center",paddingTop:2}}>
                      <span style={{fontFamily:F.mo,fontSize:8,color:C.red,background:C.rl,padding:"1px 6px",borderRadius:3}}>Q4 est: -₹5.2Cr</span>
                    </div>
                  </div>
                </div>
                {/* Takeaway callout */}
                <div style={{background:C.rl,borderRadius:5,padding:"8px 10px",marginTop:6,display:"flex",gap:8,alignItems:"flex-start"}}>
                  <span style={{fontFamily:F.mo,fontSize:9,color:C.red,fontWeight:700,flexShrink:0,marginTop:1}}>▼</span>
                  <div style={{fontSize:10.5,color:C.ink,lineHeight:1.45}}>The gap is accelerating, not closing. Q3 miss alone (₹7.1Cr) was larger than Q1+Q2 combined (₹5.1Cr). South distribution and West pricing are the two fixable drivers. Without intervention, full-year miss lands at ₹17.4Cr.</div>
                </div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14}}>
                {/* Variance drivers — click opens side panel */}
                <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,padding:"12px 14px"}}>
                  <div style={{fontFamily:F.sr,fontSize:13,fontWeight:700,marginBottom:2}}>Variance Drivers</div>
                  <div style={{fontSize:10.5,color:C.muted,marginBottom:8}}>Click any driver to see the full breakdown, root causes, and recommended action.</div>
                  {varDrv.map((d,i)=>(
                    <div key={i} onClick={()=>setExpVar(i)} style={{padding:"7px 0",borderBottom:i<varDrv.length-1?`1px solid ${C.bdr}`:"none",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}} onMouseEnter={e=>e.currentTarget.style.background=C.bg} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                      <div style={{flex:1}}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                          <span style={{fontSize:11.5,fontWeight:500}}>{d.d}</span>
                          <span style={{fontFamily:F.mo,fontSize:10.5,fontWeight:700,color:d.t==="save"?C.accent:C.red,marginLeft:8,flexShrink:0}}>{d.i>0?"+":""}₹{Math.abs(d.i)}Cr</span>
                        </div>
                        <div style={{fontSize:10,color:C.sub,marginTop:1}}>{d.detail}</div>
                      </div>
                      <span style={{color:C.muted,fontSize:11,marginLeft:8}}>→</span>
                    </div>
                  ))}
                </div>
                {/* Budget */}
                <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,padding:"12px 14px"}}>
                  <div style={{fontFamily:F.sr,fontSize:13,fontWeight:700,marginBottom:2}}>Budget vs Actual</div>
                  <div style={{fontSize:10.5,color:C.muted,marginBottom:8}}>YTD by function. Over = red, under = blue, on track = green.</div>
                  {budgets.map((f,i)=>{const p=Math.round((f.a/f.b)*100),bc=f.s==="over"?C.red:f.s==="under"?C.blue:C.accent;return(
                    <div key={i} style={{padding:"5px 0",borderBottom:i<budgets.length-1?`1px solid ${C.bdr}`:"none"}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{fontSize:11.5}}>{f.fn}</span><span style={{fontFamily:F.mo,fontSize:10,color:bc,fontWeight:600}}>{f.a>f.b?"+":""}₹{Math.round(Math.abs(f.a-f.b)*10)/10}Cr</span></div>
                      <div style={{display:"flex",alignItems:"center",gap:6}}><div style={{flex:1,height:5,borderRadius:2,background:C.bdr}}><div style={{height:5,borderRadius:2,width:`${Math.min(110,p)}%`,background:bc}}/></div><span style={{fontFamily:F.mo,fontSize:9,color:C.muted}}>{p}%</span></div>
                    </div>);})}
                </div>
              </div>
              {/* Margin trend — annotated */}
              <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,padding:"12px 14px"}}>
                <div style={{fontFamily:F.sr,fontSize:13,fontWeight:700,marginBottom:8}}>Margin Corridor</div>
                <div style={{position:"relative"}}>
                  <div style={{display:"flex",gap:5,height:90,alignItems:"flex-end",marginBottom:6}}>
                    {margins.map((m,i)=>{const g=m.g||m.fg,e=m.e||m.fe,f=m.g===null;return(
                      <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:1}}>
                        <div style={{fontSize:7,fontFamily:F.mo,color:C.muted}}>{g}%</div>
                        <div style={{width:"60%",height:((g-30)/12)*50,background:C.accent,borderRadius:"2px 2px 0 0",opacity:f?0.3:0.65}}/>
                        <div style={{width:"60%",height:((e-5)/12)*35,background:C.blue,borderRadius:"2px 2px 0 0",opacity:f?0.3:0.55}}/>
                        <span style={{fontSize:7,fontFamily:F.mo,color:C.muted}}>{m.m}</span>
                      </div>);})}
                  </div>
                  {/* Annotation: Q2 peak and Feb trough */}
                  <div style={{position:"absolute",top:4,left:"40%",background:C.al,padding:"2px 6px",borderRadius:3,border:`1px solid ${C.accent}33`}}>
                    <span style={{fontFamily:F.mo,fontSize:7,color:C.accent}}>Sep peak: 39.4%</span>
                  </div>
                  <div style={{position:"absolute",top:4,right:"8%",background:C.rl,padding:"2px 6px",borderRadius:3,border:`1px solid ${C.red}33`}}>
                    <span style={{fontFamily:F.mo,fontSize:7,color:C.red}}>Feb: 35.8% (−340bps from peak)</span>
                  </div>
                </div>
                <div style={{display:"flex",gap:12,fontSize:9,marginBottom:8}}><span style={{display:"flex",alignItems:"center",gap:3}}><span style={{width:8,height:8,borderRadius:2,background:C.accent,opacity:0.65}}/>Gross</span><span style={{display:"flex",alignItems:"center",gap:3}}><span style={{width:8,height:8,borderRadius:2,background:C.blue,opacity:0.55}}/>EBITDA</span></div>
                {/* Takeaway */}
                <div style={{background:C.aml,borderRadius:5,padding:"8px 10px",display:"flex",gap:8,alignItems:"flex-start"}}>
                  <span style={{fontFamily:F.mo,fontSize:9,color:C.amber,fontWeight:700,flexShrink:0,marginTop:1}}>⚠</span>
                  <div style={{fontSize:10.5,color:C.ink,lineHeight:1.45}}>The erosion is cost-driven (palm oil +12%, packaging +8%), not pricing. EBITDA at current trajectory exits FY26 at 10.8%. Three levers available: hedge RM (locks in), price increase on top 10 SKUs (&lt;1% volume risk), reallocate ₹6.6Cr trade surplus. Combined: recovers ~180bps.</div>
                </div>
              </div>
              <ChatInput placeholder="e.g. What's driving the South region underperformance?"/>
            </div>
          )}

          {/* ═══ CASH FLOW & WORKING CAPITAL ═══ */}
          {tab==="cashflow"&&(
            <div>
              <div style={{marginBottom:16}}><h1 style={{fontFamily:F.sr,fontSize:21,fontWeight:700,margin:0}}>Cash Flow & Working Capital</h1><p style={{fontSize:12,color:C.sub,marginTop:3}}>Where tactical meets strategic. Working capital cycle, 13-week forecast, and scenario modelling. Click any week, adjust any lever.</p></div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:8,marginBottom:14}}>
                <Stat label="W3 Actual" value="₹6.8Cr" sub="vs ₹7.5Cr forecast" trend="▼ ₹0.7Cr miss" tc={C.amber}/>
                <Stat label="W13 Forecast" value={sAct?`₹${sW13}Cr`:"₹6.8Cr"} sub={sAct?"Your scenario":"Base"}/>
                <Stat label="Min Cash" value={sAct?`₹${sMin}Cr`:"₹3.8Cr"} trend={sMin<4?"Below threshold":"Safe"} tc={sMin<4?C.red:C.accent}/>
                <Stat label="Breaches" value={sBr} trend={sBr===0?"All clear":"Action needed"} tc={sBr===0?C.accent:C.red}/>
                <Stat label="Credit Available" value="₹5.0Cr" sub="HDFC revolving" trend="9.2% ann."/>
              </div>
              {/* Working Capital Cycle */}
              <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,padding:"12px 14px",marginBottom:14}}>
                <div style={{fontFamily:F.sr,fontSize:13,fontWeight:700,marginBottom:2}}>Working Capital Cycle</div>
                <div style={{fontSize:10.5,color:C.muted,marginBottom:10}}>Cash Conversion Cycle: {ccc} days vs {cccT}d target. Every day above target locks ~₹0.4Cr in working capital that could be deployed elsewhere.</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:10}}>
                  {[
                    {l:"DSO",v:wc.dso.v,t:wc.dso.t,tr:wc.dso.tr,c:wc.dso.v>wc.dso.t?C.amber:C.accent,desc:"Sale → Cash"},
                    {l:"DIO",v:wc.dio.v,t:wc.dio.t,tr:wc.dio.tr,c:wc.dio.v>wc.dio.t?C.amber:C.accent,desc:"Inventory → Sale"},
                    {l:"DPO",v:wc.dpo.v,t:wc.dpo.t,tr:wc.dpo.tr,c:wc.dpo.v<wc.dpo.t?C.amber:C.accent,desc:"Purchase → Payment"},
                  ].map((m,i)=>(
                    <div key={i} style={{background:C.bg,borderRadius:6,padding:"10px 12px"}}>
                      <div style={{fontFamily:F.mo,fontSize:8,color:C.muted,textTransform:"uppercase",marginBottom:3}}>{m.l}</div>
                      <div style={{display:"flex",alignItems:"baseline",gap:4}}><span style={{fontFamily:F.sr,fontSize:20,fontWeight:700,color:m.c}}>{m.v}d</span><span style={{fontFamily:F.mo,fontSize:9,color:C.muted}}>/{m.t}d</span></div>
                      <div style={{fontSize:9.5,color:C.sub,marginTop:2,marginBottom:4}}>{m.desc}</div>
                      <Spark data={m.tr} color={m.c} w={90} h={20}/>
                    </div>
                  ))}
                  <div style={{background:C.al,borderRadius:6,padding:"10px 12px",textAlign:"center",display:"flex",flexDirection:"column",justifyContent:"center"}}>
                    <div style={{fontFamily:F.mo,fontSize:8,color:C.accent,textTransform:"uppercase"}}>Cash Cycle</div>
                    <div style={{fontFamily:F.sr,fontSize:26,fontWeight:700}}>{ccc}d</div>
                    <div style={{fontFamily:F.mo,fontSize:9,color:C.muted}}>target {cccT}d</div>
                    <div style={{fontSize:9,color:C.amber,marginTop:3}}>₹{((ccc-cccT)*0.4).toFixed(1)}Cr locked</div>
                  </div>
                </div>
              </div>
              {/* Chart */}
              <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,padding:"14px 16px",marginBottom:14}}>
                <div style={{fontFamily:F.sr,fontSize:14,fontWeight:700,marginBottom:2}}>Cash Position Corridor</div>
                <div style={{fontSize:10.5,color:C.muted,marginBottom:10}}>
                  {sAct?`Your scenario: W13 ₹${sW13}Cr, lowest ₹${sMin}Cr${sBr>0?`, ${sBr} breach${sBr>1?"es":""}`:", all clear"}.`:"Actuals W1-W3, forecast W4-W13. Week 9 dips below ₹4Cr minimum. Click any week for detail."}
                </div>
                <CFChart data={cf} sLine={sAct?sLine:null} onClickW={w=>setSelW(selW===w?null:w)} selW={selW}/>
                {/* Takeaway */}
                {!sAct && (
                  <div style={{background:C.rl,borderRadius:5,padding:"8px 10px",marginTop:8,display:"flex",gap:8,alignItems:"flex-start"}}>
                    <span style={{fontFamily:F.mo,fontSize:9,color:C.red,fontWeight:700,flexShrink:0,marginTop:1}}>▼</span>
                    <div style={{fontSize:10.5,color:C.ink,lineHeight:1.45}}>Week 9 is the pinch point: three vendor payments (₹6.4Cr) converge in a 4-day window. Cash drops to ₹3.8Cr, ₹0.2Cr below your ₹4Cr minimum. Two of those payments have grace periods and can be shifted at zero cost. Use the scenario controls to model this.</div>
                  </div>
                )}
                {sAct && sBr === 0 && (
                  <div style={{background:C.al,borderRadius:5,padding:"8px 10px",marginTop:8,display:"flex",gap:8,alignItems:"flex-start"}}>
                    <span style={{fontFamily:F.mo,fontSize:9,color:C.accent,fontWeight:700,flexShrink:0,marginTop:1}}>✓</span>
                    <div style={{fontSize:10.5,color:C.ink,lineHeight:1.45}}>Your scenario clears the threshold. Cash stays above ₹4Cr across all 13 weeks. Lowest point: ₹{sMin}Cr. Execute the selected actions to lock this in.</div>
                  </div>
                )}
                {sAct && sBr > 0 && (
                  <div style={{background:C.rl,borderRadius:5,padding:"8px 10px",marginTop:8,display:"flex",gap:8,alignItems:"flex-start"}}>
                    <span style={{fontFamily:F.mo,fontSize:9,color:C.red,fontWeight:700,flexShrink:0,marginTop:1}}>▼</span>
                    <div style={{fontSize:10.5,color:C.ink,lineHeight:1.45}}>Still breaching. Cash drops to ₹{sMin}Cr in {sBr} week{sBr>1?"s":""}. {sMin < 2 ? "You'll need a significant credit draw. Consider combining vendor deferrals with a partial HDFC draw." : "Manageable with additional vendor deferrals or a small credit draw (~₹" + Math.round((4-sMin)*10)/10 + "Cr)."}</div>
                  </div>
                )}
              </div>
              {/* Week detail */}
              {selW&&(()=>{const w=cf.find(d=>d.w===selW);return w?(
                <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.accent}33`,padding:"12px 14px",marginBottom:14}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}><span style={{fontFamily:F.mo,fontSize:10,fontWeight:600,color:C.accent}}>{selW}</span><button onClick={()=>setSelW(null)} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:13}}>×</button></div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:8}}>
                    <div style={{background:C.bg,borderRadius:4,padding:"6px 8px"}}><div style={{fontFamily:F.mo,fontSize:7,color:C.muted,textTransform:"uppercase"}}>{w.ac!==null?"Actual":"Forecast"}</div><div style={{fontFamily:F.sr,fontSize:15,fontWeight:700,marginTop:1}}>₹{w.ac||w.fc}Cr</div></div>
                    <div style={{background:C.bg,borderRadius:4,padding:"6px 8px"}}><div style={{fontFamily:F.mo,fontSize:7,color:C.muted,textTransform:"uppercase"}}>Inflow</div><div style={{fontFamily:F.sr,fontSize:15,fontWeight:700,color:C.accent,marginTop:1}}>₹{w.i}Cr</div></div>
                    <div style={{background:C.bg,borderRadius:4,padding:"6px 8px"}}><div style={{fontFamily:F.mo,fontSize:7,color:C.muted,textTransform:"uppercase"}}>Outflow</div><div style={{fontFamily:F.sr,fontSize:15,fontWeight:700,marginTop:1}}>₹{w.o}Cr</div></div>
                    <div style={{background:C.bg,borderRadius:4,padding:"6px 8px"}}><div style={{fontFamily:F.mo,fontSize:7,color:C.muted,textTransform:"uppercase"}}>Net</div><div style={{fontFamily:F.sr,fontSize:15,fontWeight:700,color:w.i-w.o>=0?C.accent:C.red,marginTop:1}}>{w.i-w.o>=0?"+":""}₹{Math.round((w.i-w.o)*10)/10}Cr</div></div>
                  </div>
                </div>
              ):null;})()}
              {/* Scenario + Drivers */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,padding:"12px 14px"}}>
                  <div style={{fontFamily:F.sr,fontSize:13,fontWeight:700,marginBottom:10}}>Scenario Controls</div>
                  <div style={{marginBottom:12}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}><span style={{fontSize:11.5}}>Collections DSO</span><span style={{fontFamily:F.mo,fontSize:12,fontWeight:700,color:sDSO>40?C.red:sDSO<34?C.accent:C.ink}}>{sDSO}d</span></div>
                    <input type="range" min={28} max={50} value={sDSO} onChange={e=>setSDSO(+e.target.value)} style={{width:"100%",accentColor:C.accent}}/>
                  </div>
                  <div style={{marginBottom:12}}>
                    <div style={{fontSize:11.5,marginBottom:4}}>Pinnacle payment timing</div>
                    <div style={{display:"flex",gap:3}}>{[{v:"w6",l:"W6 (early)",c:C.accent},{v:"w8",l:"W8 (base)",c:C.ink},{v:"w11",l:"W11 (late)",c:C.red}].map(o=><button key={o.v} onClick={()=>setSPin(o.v)} style={{flex:1,fontFamily:F.mo,fontSize:9,padding:"6px",borderRadius:4,border:sPin===o.v?`2px solid ${o.c}`:`1px solid ${C.bdr}`,background:sPin===o.v?o.c+"0D":C.bg,color:sPin===o.v?o.c:C.muted,cursor:"pointer"}}>{o.l}</button>)}</div>
                  </div>
                  <div style={{fontFamily:F.mo,fontSize:7,letterSpacing:"0.08em",color:C.muted,textTransform:"uppercase",marginBottom:5}}>Actions</div>
                  {[{l:"Shift Northway to 1-Apr (5d grace)",v:sNW,set:setSNW},{l:"Shift Greenfield to 31-Mar (7d grace)",v:sGF,set:setSGF},{l:"Roll out West dunning automation",v:sWD,set:setSWD}].map((t,i)=><div key={i} onClick={()=>t.set(!t.v)} style={{display:"flex",alignItems:"center",gap:6,padding:"6px 8px",marginBottom:2,borderRadius:4,background:t.v?C.al:C.bg,cursor:"pointer",border:`1px solid ${t.v?C.accent+"33":"transparent"}`}}><div style={{width:14,height:14,borderRadius:3,border:`2px solid ${t.v?C.accent:C.bdr}`,background:t.v?C.accent:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{t.v&&<span style={{color:"#fff",fontSize:8}}>✓</span>}</div><span style={{fontSize:11}}>{t.l}</span></div>)}
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4,marginTop:10}}>
                    {[{l:"Worst",fn:()=>{setSDSO(50);setSPin("w11");setSNW(false);setSGF(false);setSWD(false);}},{l:"Current",fn:()=>{setSDSO(36);setSPin("w8");setSNW(false);setSGF(false);setSWD(false);}},{l:"Recommended",fn:()=>{setSDSO(36);setSPin("w8");setSNW(true);setSGF(true);setSWD(true);}},{l:"Best",fn:()=>{setSDSO(31);setSPin("w6");setSNW(true);setSGF(true);setSWD(true);}}].map((s,i)=><button key={i} onClick={s.fn} style={{fontFamily:F.mo,fontSize:8,fontWeight:600,padding:"6px",borderRadius:4,border:`1px solid ${C.bdr}`,background:C.bg,cursor:"pointer"}}>{s.l}</button>)}
                  </div>
                </div>
                <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdr}`,padding:"12px 14px"}}>
                  <div style={{fontFamily:F.sr,fontSize:13,fontWeight:700,marginBottom:8}}>Forecast Drivers</div>
                  <div style={{fontSize:10.5,color:C.muted,marginBottom:8}}>What's moving the forecast. Click any entity to see their profile.</div>
                  {[{d:"Pinnacle overdue (₹2.3Cr)",i:-2.3,dir:"down",w:"W6-8",ek:"pinnacle"},{d:"Vendor convergence (W9)",i:-4.1,dir:"down",w:"W9",ek:"atlas"},{d:"South collection acceleration",i:+1.2,dir:"up",w:"W5-8"},{d:"Metro Mart Q1 advance",i:+3.0,dir:"up",w:"W10",ek:"metromart"}].map((d,i,a)=><div key={i} onClick={()=>d.ek&&openE(d.ek)} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<a.length-1?`1px solid ${C.bdr}`:"none",cursor:d.ek?"pointer":"default"}}><span style={{fontFamily:F.mo,fontSize:10.5,fontWeight:700,minWidth:52,textAlign:"right",color:d.dir==="down"?C.red:C.accent}}>{d.dir==="down"?"▼":"▲"} ₹{Math.abs(d.i)}Cr</span><span style={{flex:1,fontSize:11.5}}>{d.d}</span><Tag bg={C.bg} c={C.muted}>{d.w}</Tag></div>)}
                  <div style={{background:sBr===0?C.al:C.rl,borderRadius:5,padding:"9px 10px",marginTop:12}}>
                    <div style={{fontFamily:F.mo,fontSize:7,color:sBr===0?C.accent:C.red,textTransform:"uppercase",marginBottom:2}}>Assessment</div>
                    <div style={{fontSize:10.5,lineHeight:1.45}}>
                      {sBr===0?"Cash stays above ₹4Cr threshold across all 13 weeks. Execute selected actions.":
                       `Breach in ${sBr} week${sBr>1?"s":""}. Lowest: ₹${sMin}Cr. ${sMin<2?"Significant credit draw needed.":"Manageable with vendor deferrals + small draw."}`}
                    </div>
                  </div>
                </div>
              </div>
              <ChatInput placeholder="e.g. What's the cheapest way to cover the Week 9 gap?"/>
            </div>
          )}

          {/* ═══ CONVERSATIONAL INTELLIGENCE ═══ */}
          {tab==="ci"&&(
            <div>
              <div style={{marginBottom:16}}><h1 style={{fontFamily:F.sr,fontSize:21,fontWeight:700,margin:0}}>Conversational Intelligence</h1><p style={{fontSize:12,color:C.sub,marginTop:3}}>Ask anything. The IW traverses tactical and strategic layers to respond with data, analysis, and recommendations.</p></div>
              <div style={{maxWidth:680,margin:"0 auto"}}>
                <div style={{marginBottom:14}}>
                  {ciMsgs.map((m,i)=>m.r==="chips"?(
                    <div key={i} style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:10,paddingLeft:32}}>
                      {m.o.map((o,j)=><button key={j} onClick={()=>setCiMsgs([...ciMsgs,{r:"user",t:o},{r:"ai",t:"Traversing the graph..."}])} style={{fontFamily:F.mn,fontSize:10.5,padding:"5px 10px",borderRadius:14,border:`1px solid ${C.bdr}`,background:C.w,color:C.sub,cursor:"pointer"}} onMouseEnter={e=>{e.target.style.borderColor=C.accent;e.target.style.color=C.accent}} onMouseLeave={e=>{e.target.style.borderColor=C.bdr;e.target.style.color=C.sub}}>{o}</button>)}
                    </div>
                  ):(
                    <div key={i} style={{display:"flex",gap:8,marginBottom:10,flexDirection:m.r==="user"?"row-reverse":"row"}}>
                      <div style={{width:26,height:26,borderRadius:"50%",flexShrink:0,background:m.r==="ai"?C.accent:C.blue,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:F.mo,fontSize:9,fontWeight:600}}>{m.r==="ai"?"IW":"Y"}</div>
                      <div style={{maxWidth:"80%",padding:"10px 14px",borderRadius:m.r==="user"?"12px 12px 3px 12px":"3px 12px 12px 12px",background:m.r==="user"?C.bl:C.w,border:`1px solid ${C.bdr}`,fontSize:12,lineHeight:1.55,whiteSpace:"pre-line"}}>{m.t}</div>
                    </div>
                  ))}
                </div>
                <div style={{background:C.w,borderRadius:10,border:`1px solid ${C.bdr}`,padding:"10px 14px",display:"flex",gap:8}}>
                  <input value={ciInp} onChange={e=>setCiInp(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&ciInp.trim()){setCiMsgs([...ciMsgs,{r:"user",t:ciInp},{r:"ai",t:"Let me check the graph..."}]);setCiInp("");}}} placeholder="Ask anything about your finances..." style={{flex:1,fontFamily:F.mn,fontSize:12,padding:"7px 0",border:"none",outline:"none",background:"transparent"}}/>
                  <button onClick={()=>{if(ciInp.trim()){setCiMsgs([...ciMsgs,{r:"user",t:ciInp},{r:"ai",t:"Let me check the graph..."}]);setCiInp("");}}} style={{fontFamily:F.mo,fontSize:9,fontWeight:600,background:C.accent,color:"#fff",border:"none",borderRadius:7,padding:"7px 12px",cursor:"pointer"}}>Send</button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

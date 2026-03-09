"use client";
import { useState, useMemo } from "react";
import { Menu, Bell, Search, ChevronDown, User, Settings, LogOut, Send } from "lucide-react";

/* ═══ QUESTT.COM DESIGN SYSTEM ═══ */
const C = {
  bg:"#FFFFFF",bgSub:"#FAFAF8",bgAlt:"#F3F0EA",card:"#FFFFFF",
  green:"#111A15",greenMid:"#1C2B24",
  sage:"#1B6B5A",sageSoft:"#EAF2EF",sageBorder:"rgba(27,107,90,0.2)",
  terra:"#B33A3A",terraSoft:"#FDF3F3",terraBorder:"rgba(179,58,58,0.15)",
  amber:"#946B1A",amberSoft:"#FDFAF0",amberBorder:"rgba(148,107,26,0.15)",
  copper:"#B8734A",copperSoft:"#FDF5EE",
  cream:"#F3F0EA",warm:"#FAFAF8",
  text:"#1A1A18",textMid:"#6B6965",dim:"#6B6965",dimmer:"#A09D98",
  border:"#E5E2DB",borderLight:"#F0EDE7",
};
const font="'Inter',-apple-system,sans-serif";
const mono="'JetBrains Mono',monospace";
const editorial="'Source Serif 4',Georgia,serif";
const serif="'DM Serif Display',Georgia,serif";
const SIZES=["XS","S","M","L","XL"];
const Img=({size=44})=> (<div style={{width:size,height:size,borderRadius:6,background:C.bgAlt,border:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><svg width={size*.34} height={size*.34} viewBox="0 0 24 24" fill="none" stroke={C.dimmer} strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg></div>);
const Pencil=()=> (<svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M11.5 1.5l3 3-9 9H2.5v-3l9-9z"/></svg>);

/* ═══ STORES ═══ */
const STORE_DB = [
  {code:"FL01",name:"Flagship One",city:"Metro A",area:"Central Business District",grade:"A+",sp:{XS:.06,S:.18,M:.40,L:.26,XL:.10}},
  {code:"FL02",name:"Flagship Two",city:"Metro A",area:"Premium Mall South",grade:"A+",sp:{XS:.07,S:.20,M:.38,L:.25,XL:.10}},
  {code:"FL03",name:"Flagship Three",city:"Metro B",area:"High Street Central",grade:"A+",sp:{XS:.05,S:.17,M:.36,L:.28,XL:.14}},
  {code:"FL04",name:"Flagship Four",city:"Metro B",area:"Luxury Mall",grade:"A+",sp:{XS:.05,S:.18,M:.35,L:.28,XL:.14}},
  {code:"FL05",name:"Flagship Five",city:"Metro C",area:"Premium Arcade",grade:"A+",sp:{XS:.08,S:.22,M:.38,L:.24,XL:.08}},
  {code:"FL06",name:"Flagship Six",city:"Metro C",area:"MG Road Mall",grade:"A+",sp:{XS:.08,S:.21,M:.37,L:.25,XL:.09}},
  {code:"FL07",name:"Flagship Seven",city:"Metro D",area:"Jubilee Hills",grade:"A+",sp:{XS:.07,S:.20,M:.36,L:.26,XL:.11}},
  {code:"FL08",name:"Flagship Eight",city:"Metro E",area:"Phoenix Mall",grade:"A+",sp:{XS:.09,S:.23,M:.36,L:.23,XL:.09}},
  {code:"FL09",name:"Flagship Nine",city:"Metro F",area:"Lifestyle Mall",grade:"A+",sp:{XS:.07,S:.21,M:.37,L:.25,XL:.10}},
  {code:"FL10",name:"Flagship Ten",city:"Metro G",area:"Quest Mall",grade:"A+",sp:{XS:.06,S:.19,M:.36,L:.27,XL:.12}},
  {code:"FL11",name:"Flagship Eleven",city:"Metro H",area:"SG Highway",grade:"A+",sp:{XS:.06,S:.19,M:.35,L:.27,XL:.13}},
  {code:"FL12",name:"Flagship Twelve",city:"Metro I",area:"Beach Road",grade:"A+",sp:{XS:.08,S:.22,M:.38,L:.24,XL:.08}},
  {code:"PR01",name:"Premium One",city:"Metro A",area:"Infinity Mall",grade:"A",sp:{XS:.07,S:.20,M:.38,L:.25,XL:.10}},
  {code:"PR02",name:"Premium Two",city:"Metro A",area:"Viviana Mall",grade:"A",sp:{XS:.06,S:.19,M:.37,L:.26,XL:.12}},
  {code:"PR03",name:"Premium Three",city:"Metro A",area:"Hiranandani",grade:"A",sp:{XS:.07,S:.20,M:.38,L:.25,XL:.10}},
  {code:"PR04",name:"Premium Four",city:"Metro B",area:"Inner Circle",grade:"A",sp:{XS:.05,S:.17,M:.36,L:.28,XL:.14}},
  {code:"PR05",name:"Premium Five",city:"Metro B",area:"Select Mall",grade:"A",sp:{XS:.05,S:.17,M:.36,L:.28,XL:.14}},
  {code:"PR06",name:"Premium Six",city:"Metro B",area:"Ambience Mall",grade:"A",sp:{XS:.05,S:.18,M:.36,L:.28,XL:.13}},
  {code:"PR07",name:"Premium Seven",city:"Metro B",area:"Cyber Hub",grade:"A",sp:{XS:.05,S:.18,M:.36,L:.28,XL:.13}},
  {code:"PR08",name:"Premium Eight",city:"Metro B",area:"DLF Mall",grade:"A",sp:{XS:.06,S:.19,M:.36,L:.27,XL:.12}},
  {code:"PR09",name:"Premium Nine",city:"Metro C",area:"100 Feet Road",grade:"A",sp:{XS:.08,S:.22,M:.37,L:.24,XL:.09}},
  {code:"PR10",name:"Premium Ten",city:"Metro C",area:"Phoenix Whitefield",grade:"A",sp:{XS:.08,S:.21,M:.37,L:.25,XL:.09}},
  {code:"PR11",name:"Premium Eleven",city:"Metro D",area:"Inorbit Mall",grade:"A",sp:{XS:.07,S:.20,M:.36,L:.26,XL:.11}},
  {code:"PR12",name:"Premium Twelve",city:"Metro D",area:"Road No 12",grade:"A",sp:{XS:.07,S:.20,M:.36,L:.26,XL:.11}},
  {code:"PR13",name:"Premium Thirteen",city:"Metro E",area:"T Nagar",grade:"A",sp:{XS:.09,S:.23,M:.36,L:.23,XL:.09}},
  {code:"PR14",name:"Premium Fourteen",city:"Metro F",area:"Koregaon Park",grade:"A",sp:{XS:.07,S:.21,M:.37,L:.25,XL:.10}},
  {code:"PR15",name:"Premium Fifteen",city:"Metro G",area:"South City",grade:"A",sp:{XS:.06,S:.19,M:.36,L:.27,XL:.12}},
  {code:"PR16",name:"Premium Sixteen",city:"Tier 2 A",area:"World Trade Park",grade:"A",sp:{XS:.05,S:.17,M:.34,L:.29,XL:.15}},
  {code:"PR17",name:"Premium Seventeen",city:"Tier 2 B",area:"Phoenix Mall",grade:"A",sp:{XS:.05,S:.16,M:.34,L:.30,XL:.15}},
  {code:"PR18",name:"Premium Eighteen",city:"Tier 2 C",area:"Elante Mall",grade:"A",sp:{XS:.05,S:.17,M:.35,L:.29,XL:.14}},
  {code:"PR19",name:"Premium Nineteen",city:"Tier 2 D",area:"Lulu Mall",grade:"A",sp:{XS:.08,S:.22,M:.37,L:.24,XL:.09}},
  {code:"PR20",name:"Premium Twenty",city:"Tier 2 E",area:"VR Mall",grade:"A",sp:{XS:.06,S:.19,M:.36,L:.27,XL:.12}},
  {code:"PR21",name:"Premium Twenty One",city:"Metro H",area:"CG Road",grade:"A",sp:{XS:.06,S:.19,M:.35,L:.27,XL:.13}},
];
const GRADES=["A+","A","B/C"];
const gradeStores=g=>STORE_DB.filter(s=>s.grade===g);

/* ═══ SIZE HELPERS ═══ */
const SC=(t,c)=>{const r=SIZES.map((_,i)=>Math.round(t*(c[i]||0)));const d=t-r.reduce((a,b)=>a+b,0);if(r[2]!==undefined)r[2]+=d;return r;};
const storeSizeSplit=(u,sp)=>{const r=SIZES.map(s=>Math.round(u*(sp[s]||0)));const d=u-r.reduce((a,b)=>a+b,0);r[2]+=d;return r;};
const STD=[.08,.22,.35,.25,.10],LSK=[.06,.18,.35,.28,.13],SSK=[.10,.25,.35,.22,.08];

/* ═══ TRAIL BUILDER ═══ */
const T=(steps)=>({time:steps[steps.length-1].t,agents:steps.length,steps});

/* ═══ OPTIMIZATION BASE ═══ */
/* System optimizes all allocations against 6-week sell-through >90% at full price.
   This means: for every style × store, the system calculates the number of units
   that would yield >90% ST in the first 6 weeks based on the store's historical
   rate of sale for that category. Anything above that threshold creates markdown risk.
   Anything below creates lost-sale risk. */

/* ═══ ALL 24 STYLES ═══ */
/* Mix: ~8 carryover (33%), ~10 new design (42%), ~6 trend/test (25%) */
const RAW=[
  /* ──── FLAGGED STYLES (need buyer review) ──── */
  {id:"S26-DR-101",name:"Stripe Midi Dress",sub:"Dresses",units:680,mrp:4490,cost:1841,margin:59,src:"carryover",conf:86,
    colors:[{n:"Black/White",p:.40,c:[.07,.20,.38,.25,.10]},{n:"Navy/Cream",p:.35,c:STD},{n:"Olive/White",p:.25,c:STD}],ga:{"A+":.22,"A":.40,"B/C":.38},
    flag:{type:"size-shift",msg:"M allocation increased from 35% to 38% based on SS25 data where M stocked out by Week 5 across 8 of 12 A+ stores. This drove an estimated 42 lost units. XL reduced from 10% to 8%. XL had 38% residual in SS25. Size curve validated against 6-week ST target."},
    hist:{SS25:{u:540,st:94,m:59,w:5,n:"Sold out too fast. M stockout by Wk5 in 8/12 A+."},SS24:{u:480,st:82,m:57,w:10,n:"First season. Moderate performance."}},
    reason:"Carryover with size correction. SS25 achieved 94% 6-wk ST but M stocked out by Week 5. Scaling from 540 to 680 units (+26%) with M shifted from 35% to 38%. Olive/White replacing underperforming Sage (Sage: 64% ST vs style avg 82%).",
    trail:T([
      {a:"Demand Planner",t:"0.3s",act:"Pulled SS25 sell-through by size × store. Sold 540 units at 94% 6-week ST — exceeding the 90% target, which means we under-allocated. M stocked out by Week 5 in 8 of 12 A+ stores. Estimated 42 units of unmet demand based on rate-of-sale extrapolation: avg 1.2u/store/week × 8 stores × 4.5 remaining weeks = 43 units lost."},
      {a:"Size Curve Analyst",t:"1.2s",act:"Recalculated size curve from SS25 actuals. M demand was 41% of sales (vs 35% planned). XL was 6% of sales (vs 10% planned, 38% residual). New curve: XS 7%, S 20%, M 38%, L 27%, XL 8%. Validated against North stores where L/XL index higher — even there, XL only hit 9%."},
      {a:"Color Performance",t:"2.0s",act:"SS25 color-level ST: Black/White 96%, Navy/Cream 92%, Sage 64%. Sage had 36% unsold stock requiring 30% markdown. Replaced with Olive/White — olive stripe trending +180% in brand site search Jan 2026. Allocated Olive/White at 25% (conservative for untested color)."},
      {a:"Allocation Engine",t:"2.8s",act:"Unit derivation: To hit 90% 6-wk ST at SS25 rate-of-sale (1.2u/store/wk in A+, 0.6u in A, 0.2u in B/C): A+ = 12 stores × 12u = 144 (22%). A = 21 stores × 13u = 273 (40%). B/C = ~280 stores × 1u (top 263) = 263 (38%). Total = 680 units."},
      {a:"Synthesis",t:"3.4s",act:"Final: 680 units across 3 colors with corrected M-heavy size curve. The 26% increase from SS25 is justified by the stockout signal — we were under-serving proven demand. Confidence 86% (high data reliability, slight uncertainty on new Olive/White color).",conf:"86%"}
    ]),qs:["What if we kept Sage alongside Olive/White?","Show the M stockout store-by-store"]},

  {id:"S26-CD-102",name:"Linen Co-ord Set",sub:"Co-ords",units:420,mrp:5990,cost:2516,margin:58,src:"new-design",conf:68,
    colors:[{n:"Beige/Black",p:.55,c:STD},{n:"Olive/Cream",p:.45,c:STD}],ga:{"A+":.40,"A":.60},
    flag:{type:"low-confidence",msg:"First premium linen co-ord at the highest co-ord price point. No direct historical match. Recommendation is based on cross-category signals: linen fabric 6-wk ST averaged 91% in SS25, co-ord sets grew 34% YoY, and the premium price bracket showed no resistance in blazers. Restricted to A+ and A stores only."},
    hist:{},
    reason:"New category entry at the highest co-ord price point. Unit count derived from cross-category benchmarking: linen dresses averaged 8u/A+ store and 5u/A store in SS25, discounted 40% for untested format. Conservative 420 units with no B/C distribution. Re-buy trigger at 70% 6-wk ST.",
    trail:T([
      {a:"Demand Planner",t:"0.4s",act:"No direct history. Cross-category benchmark: Linen dresses averaged 8 units per A+ store and 5 units per A store in first 6 weeks of SS25 (91% ST). Co-ord sets are a different format, so applied 40% discount: 5u/A+ store, 3u/A store as base estimate."},
      {a:"Price Sensitivity",t:"1.3s",act:"At the highest co-ord price point. Checked resistance: Single-button blazer sold at 76% ST at a comparable price. Linen wrap dress sold at 87% ST at a lower point. The premium bracket has not been tested in co-ords, but linen commands a premium — no markdown was needed on any linen item in SS25."},
      {a:"Allocation Engine",t:"2.1s",act:"Unit derivation: A+ = 12 stores × 14u = 168 (40%). A = 21 stores × 12u = 252 (60%). B/C excluded — zero category history at this price point. Total = 420 units."},
      {a:"Color Analyst",t:"2.8s",act:"Two-color assortment only for a new entry. Beige/Black at 55% — neutral co-ord is the safer lead. Olive/Cream at 45% — olive is SS26's breakout color across the range. No third color to limit risk."},
      {a:"Synthesis",t:"3.5s",act:"Conservative 420 units. A+/A only. The cross-category signals are strong (linen + co-ord both trending), but the specific combination is untested. Re-buy trigger: if 6-wk ST exceeds 70%, place 200-unit follow-on order. Confidence 68%.",conf:"68%"}
    ]),qs:["What if we tested A+ stores only first?","What is the lead time for a re-buy?"]},

  {id:"S26-TP-103",name:"Cutwork Blouse",sub:"Tops",units:180,mrp:3490,cost:1466,margin:58,src:"new-design",conf:55,
    colors:[{n:"White",p:.60,c:SSK},{n:"Blush",p:.40,c:SSK}],ga:{"A+":.55,"A":.45},
    flag:{type:"low-confidence",msg:"Cutwork/broderie anglaise is a strong SS26 trend (+160% search YoY) but untested in the brand's range. This is a 180-unit test buy capped at maximum exposure. A+ and A stores only, weighted towards metro flagships where the fashion-forward segment concentrates."},
    hist:{},
    reason:"Trend test: cutwork/broderie anglaise. 180 units across A+/A only. If 6-wk ST exceeds 60%, this validates the embellishment trend for AW26 expansion.",
    trail:T([
      {a:"Trend Intelligence",t:"0.5s",act:"Cutwork/broderie anglaise search volume up 160% YoY on brand site. Competitors launched 3 cutwork pieces in SS26 in a similar price range. Trend is validated externally but untested within the brand's design language."},
      {a:"Demand Planner",t:"1.4s",act:"For unproven silhouettes, the brand's test threshold caps maximum exposure. Applied 10% buffer reduction to 180 units. Target: 60% 6-wk ST (lower threshold for test buys vs 90% for proven styles)."},
      {a:"Allocation Engine",t:"2.2s",act:"Unit derivation: A+ = 12 stores × 8u = 96 (55%). A = 21 stores × 4u = 84 (45%). B/C excluded. Small-skew size curve (SSK: XS 10%, S 25%, M 35%, L 22%, XL 8%) since cutwork buyers trend younger/smaller."},
      {a:"Synthesis",t:"2.9s",act:"Test buy only. 180 units, 2 colors, A+/A distribution. White leads at 60% — broderie reads best on white. This is not a revenue play; it is a category learning investment. Confidence 55%.",conf:"55%"}
    ]),qs:["What if it sells out — what is the fastest re-buy?","Should we price lower for a test?"]},

  {id:"S26-BZ-104",name:"Single-Button Blazer",sub:"Blazers",units:520,mrp:4990,cost:2196,margin:56,src:"carryover",conf:87,
    colors:[{n:"Black",p:.55,c:STD},{n:"Dusty Rose",p:.45,c:STD}],ga:{"A+":.30,"A":.40,"B/C":.30},
    flag:{type:"opportunity",msg:"Single-button blazer has grown steadily: 280u (68% ST) in SS24 to 380u (76% ST) in AW25 to 420u (82% ST) in SS25. Outsells double-breasted 3:1. System recommends scaling to 520u (+24%) and adding Dusty Rose. Non-neutral blazer buyers have 92% retention rate."},
    hist:{SS24:{u:280,st:68,m:54,w:16,n:"First structured blazer. Modest start."},AW25:{u:380,st:76,m:56,w:12,n:"Strong full-price sell-through."},SS25:{u:420,st:82,m:55,w:8,n:"Black only. Approached 90% 6-wk target."}},
    reason:"Three-season growth (280 to 380 to 420) with improving ST approaching the 90% 6-wk target. SS25 hit 82% in 8 weeks — on trajectory to hit the target with modest scale. Dusty Rose added to capture the high-retention non-neutral segment (92% repurchase).",
    trail:T([
      {a:"Demand Planner",t:"0.3s",act:"Three-season trajectory: SS24 280u (68% 6-wk ST), AW25 380u (76%), SS25 420u (82%). Rate of sale accelerating: 0.8u/A+ store/wk in SS24, now 1.3u in SS25. At current ROS, 520 units should yield ~88% 6-wk ST — approaching the 90% target without overshooting."},
      {a:"Color Analyst",t:"1.1s",act:"SS25 was Black-only at 82% ST. Adding Dusty Rose based on: (1) non-neutral color buyers have 92% retention vs 68% for neutral-only, (2) Dusty Rose tested in AW25 dresses at 78% ST, (3) blazer + non-neutral creates high-LTV customer acquisition. Split: Black 55% (proven), Dusty Rose 45% (strategic)."},
      {a:"Allocation Engine",t:"1.9s",act:"Unit derivation at 88% 6-wk ST target: A+ = 12 stores × 13u = 156 (30%). A = 21 stores × 10u = 210 (40%). B/C = ~280 stores × 0.55u (top 154 stores) = 154 (30%). Total = 520. B/C gets allocation because blazer demand is distributed — not metro-concentrated."},
      {a:"Synthesis",t:"2.6s",act:"520 units, 2 colors. Black is the safe foundation; Dusty Rose is the strategic bet for customer segment expansion. This style is moving from 'promising' to 'anchor' status. Confidence 87%.",conf:"87%"}
    ]),qs:["Is there ASP ceiling risk at this price?","Should we add a third color?"]},

  {id:"S26-DR-105",name:"Linen Wrap Dress",sub:"Dresses",units:760,mrp:3990,cost:1676,margin:58,src:"carryover",conf:84,
    colors:[{n:"Terracotta",p:.35,c:LSK},{n:"Ivory",p:.35,c:LSK},{n:"Sage",p:.30,c:LSK}],ga:{"A+":.26,"A":.40,"B/C":.34},
    flag:{type:"deeper-buy",msg:"System recommends 760 units — 52% above SS25's 500 units. Linen wrap hit 93% 6-wk ST (exceeding the 90% target), effectively selling out by Week 5 in A+ stores. Unmet demand estimated at 110 units. Linen fabric is up 15% YoY so supplier commitment needed by Jan 20."},
    hist:{SS24:{u:360,st:74,m:56,w:14,n:"Understocked in A+. Could have sold more."},SS25:{u:500,st:93,m:58,w:5,n:"Sold out by Wk5 in A+. Best linen performer."}},
    reason:"Linen wrap had the highest 6-wk ST of any style in SS25 (93%, exceeding the 90% target). A+ stores sold out by Week 5 with 110 units of estimated unmet demand. Scaling 52% is aggressive but the demand signal is unambiguous. Earthy palette aligned with summer trends. Supplier deadline: Jan 20.",
    trail:T([
      {a:"Demand Planner",t:"0.3s",act:"SS25: 500 units at 93% 6-wk ST. 3 points above the 90% target, indicating under-allocation. A+ stores averaged 1.8u/wk ROS, selling out by Week 5. Extrapolating unmet demand: 12 A+ stores × 1.8u/wk × 5 remaining weeks = ~108 lost units."},
      {a:"Supply Chain",t:"1.4s",act:"Linen fabric spot pricing up 15% YoY. Supplier can deliver 760 units if committed by January 20. Delaying to February increases cost per unit. Current quoted landed cost on file."},
      {a:"Color Analyst",t:"2.2s",act:"SS25 color-level data: Terracotta 96% ST, Ivory 91% ST, Dusty Blue 84% ST. Replacing Dusty Blue with Sage (Sage indexing higher in SS26 search data). Split: Terracotta 35%, Ivory 35%, Sage 30% — near-equal split since top 2 colors both exceeded 90% target."},
      {a:"Allocation Engine",t:"3.0s",act:"Unit derivation at 90% 6-wk ST: A+ = 12 stores × 16u = 192 (26%). A = 21 stores × 14u = 294 (40%). B/C = ~280 stores × 1u (top 274) = 274 (34%). Total = 760. Large-skew size curve (LSK) for wrap silhouette. L/XL runs larger in wrap dresses."},
      {a:"Synthesis",t:"3.7s",act:"760 units is a 52% increase — the largest scale-up in the plan. Justified by: (1) 6-wk ST exceeded the 90% target, (2) clear unmet demand signal from stockouts, (3) linen is the best-performing summer fabric. Main risk: supply commitment deadline. Confidence 84%.",conf:"84%"}
    ]),qs:["What is the exact supplier deadline?","How does linen perform by region?"]},

  {id:"S26-TR-106",name:"Wide-Leg Pleated Trouser",sub:"Trousers",units:900,mrp:2490,cost:1095,margin:56,src:"carryover",conf:90,
    colors:[{n:"Black",p:.35,c:STD},{n:"Navy",p:.25,c:STD},{n:"Olive",p:.20,c:STD},{n:"Cream",p:.20,c:STD}],ga:{"A+":.20,"A":.34,"B/C":.46},
    flag:{type:"deeper-buy",msg:"Wide-leg pleated trousers are a structural category shift, not a seasonal trend. Share of trouser sales: SS24 28%, AW25 32%, SS25 36%, projected SS26 44%. Pleated outsells all other wide-leg variants 1.6x. System recommends 900u (+29% vs SS25's 700u)."},
    hist:{SS24:{u:520,st:72,m:54,w:16,n:"Wide-leg was 28% of trouser mix."},AW25:{u:620,st:81,m:56,w:11,n:"Pleated outsold all other wide-leg 1.6x."},SS25:{u:700,st:86,m:55,w:8,n:"Wide-leg now 36% of trouser mix. Near 90% target."}},
    reason:"Structural shift in the trouser category — wide-leg went from 28% of sales to 36% in two seasons. SS25 hit 86% 6-wk ST, approaching the 90% target. Four-color assortment captures safe (Black/Navy 60%) and growth (Olive/Cream 40%) segments.",
    trail:T([
      {a:"Demand Planner",t:"0.3s",act:"Analysed trouser silhouette mix over 3 seasons. Wide-leg share: SS24 28%, AW25 32%, SS25 36%. Pleated outsells straight-wide and palazzo 1.6x. SS25: 700u at 86% 6-wk ST — just 4 points below the 90% target. At current growth rate, 900 units should yield 89-91% 6-wk ST."},
      {a:"Color Analyst",t:"1.0s",act:"SS25 color-level data (Black only): 86% ST. Adding 3 colors based on trouser color demand patterns: Navy (25%) anchors workwear, Olive (20%) and Cream (20%) capture the casual/weekend segment. Color split derived from palazzo color data where multi-color assortment lifted total ST by 8 points."},
      {a:"Allocation Engine",t:"1.8s",act:"Unit derivation: A+ = 12 stores × 15u = 180 (20%). A = 21 stores × 14u = 294 (34%). B/C = ~280 stores × 1.5u (top 284) = 426 (46%). B/C gets 46% because wide-leg trousers have broad appeal — not metro-concentrated. Total = 900."},
      {a:"Synthesis",t:"2.5s",act:"900 units. This is a structural category bet, not a fashion risk. The pleated wide-leg is replacing slim-fit as the default trouser. Confidence 90%.",conf:"90%"}
    ]),qs:["Is there a saturation point for wide-leg?","Should slim-fit be phased out?"]},

  {id:"S26-DR-107",name:"Satin Maxi Dress",sub:"Dresses",units:280,mrp:5990,cost:2516,margin:58,src:"new-design",conf:62,
    colors:[{n:"Emerald",p:.50,c:STD},{n:"Black",p:.50,c:STD}],ga:{"A+":.50,"A":.50},
    flag:{type:"low-confidence",msg:"Entry into the evening/occasion maxi dress category at the highest dress price point. No direct precedent. Based on occasion-wear gap analysis: 22% of loyalty members purchase evening dresses from competitors. Emerald is SS26's breakout evening color."},
    hist:{},
    reason:"New category entry targeting the occasion/evening gap. 22% of loyalty members purchased evening dresses from competitor brands in the last 12 months. 280 units, A+/A only, two high-impact colors.",
    trail:T([
      {a:"Customer Intelligence",t:"0.6s",act:"Analysed loyalty data: 22% of loyalty members purchased occasion/evening dresses from competitor brands in the last 12 months. Average spend: comparable to upper price range. This represents a captured customer spending outside the brand's range — an addressable gap, not new customer acquisition."},
      {a:"Price Sensitivity",t:"1.4s",act:"Highest dress price point. Checked resistance: Blazers sell at a comparable price with no price resistance. Satin fabric justifies the premium — satin items have 12% lower return rates than polyester at similar price points. Markdown risk: satin holds value better during end-of-season sales."},
      {a:"Allocation Engine",t:"2.2s",act:"A+/A only for new high-price entry. Unit derivation: A+ = 12 stores × 12u = 144 (50%). A = 21 stores × 6.5u = 136 (50%). B/C excluded. Standard size curve — evening dresses don't show silhouette-based size skew. Total = 280."},
      {a:"Synthesis",t:"2.9s",act:"280 units, 2 high-impact colors. Emerald is the hero (SS26 evening color of the season). Black is the safe anchor. This is a strategic category expansion — success here opens a significant annual opportunity in occasion wear. Confidence 62%.",conf:"62%"}
    ]),qs:["Should we price lower to reduce risk?","What is the competitor price comparison?"]},

  {id:"S26-TP-108",name:"Relaxed Linen Shirt",sub:"Tops",units:1140,mrp:1890,cost:756,margin:60,src:"carryover",conf:89,
    colors:[{n:"White",p:.30,c:LSK},{n:"Sky Blue",p:.25,c:LSK},{n:"Sand",p:.225,c:LSK},{n:"Olive",p:.225,c:LSK}],ga:{"A+":.20,"A":.36,"B/C":.44},
    flag:{type:"deeper-buy",msg:"Relaxed linen shirts sit at the intersection of two strong trends: linen fabric (91% avg 6-wk ST in SS25) and relaxed fit (now 62% of tops sales). SS25 hit 88% 6-wk ST at 860 units. Scaling 33% to 1,140 units to approach the 90% target more closely."},
    hist:{SS24:{u:600,st:72,m:58,w:15,n:"First linen shirt season. Promising start."},SS25:{u:860,st:88,m:60,w:7,n:"Strong. All A+ sold through by Wk7."}},
    reason:"Linen + relaxed fit = the strongest summer intersection. SS25 hit 88% 6-wk ST (just below the 90% target), meaning allocation was almost perfect. The 33% increase accounts for the 2-point gap plus organic category growth. Four-color assortment for maximum breadth.",
    trail:T([
      {a:"Demand Planner",t:"0.3s",act:"SS25: 860u at 88% 6-wk ST. 2 points below the 90% target. Rate of sale: 1.4u/A+ store/wk, 0.9u/A store/wk. Relaxed fit now 62% of all tops sales (up from 45% two seasons ago). Linen avg 6-wk ST: 91% in SS25 — the best-performing fabric."},
      {a:"Allocation Engine",t:"1.1s",act:"Unit derivation at 90% 6-wk ST: A+ = 12 stores × 19u = 228 (20%). A = 21 stores × 19u = 399 (36%). B/C = ~280 stores × 1.8u (top 285) = 513 (44%). B/C gets 44% — relaxed linen shirts sell across all tiers. Total = 1,140."},
      {a:"Color Analyst",t:"1.8s",act:"SS25 color data: White 92% ST, Sky Blue 88% ST, Sand 84% ST. All above 80% — no weak color. Adding Olive as 4th (replacing seasonal Coral which hit only 71% ST). Split: White 30%, Sky Blue 25%, Sand/Olive 22.5% each. Large-skew curve for relaxed fit."},
      {a:"Synthesis",t:"2.4s",act:"1,140 units. Supply commitment shares the Jan 20 linen deadline with the Wrap Dress. Combined linen commitment: 1,900 units across 2 styles. Confidence 89%.",conf:"89%"}
    ]),qs:["Should we lock the linen supplier now?","Is there cannibalization with the cotton shirt?"]},

  {id:"S26-JM-109",name:"V-Neck Jumpsuit",sub:"Jumpsuits",units:320,mrp:3990,cost:1716,margin:57,src:"new-design",conf:78,
    colors:[{n:"Navy",p:.35,c:STD},{n:"Olive",p:.35,c:STD},{n:"Rust",p:.30,c:STD}],ga:{"A+":.30,"A":.45,"B/C":.25},
    flag:{type:"opportunity",msg:"AW25 test of a similar jumpsuit (120 units) achieved 91% 6-wk ST with 60+ customers waitlisted. This is a new silhouette for SS26 but the demand signal from the test is strong. Scaling 2.7x to 320 units. Addresses the work-to-evening transition gap."},
    hist:{AW25:{u:120,st:91,m:57,w:5,n:"Test exceeded 90% target. 60+ waitlisted."}},
    reason:"AW25 test dramatically exceeded the 90% 6-wk ST target (hit 91% in 5 weeks). New SS26 design but same V-neck jumpsuit format. Three colors for occasion versatility. B/C gets limited 25% — jumpsuit is still a developing category.",
    trail:T([
      {a:"Demand Planner",t:"0.4s",act:"AW25 test: 120 units at 91% 6-wk ST, exceeding the 90% target. 60+ customers joined waitlist after stockout. Rate of sale: 2.0u/A+ store/wk — higher than any other new format test in the last 4 seasons."},
      {a:"Customer Intelligence",t:"1.2s",act:"Waitlisted customers: 78% are repeat buyers with high avg basket. Strong overlap with blazer and co-ord buyer segments. Work-to-evening transition is an underserved occasion in the current range."},
      {a:"Allocation Engine",t:"2.0s",act:"Scale factor: AW25 was A+ only (12 stores × 10u = 120). For SS26: A+ = 12 stores × 8u = 96 (30%). A = 21 stores × 7u = 147 (45%). B/C = ~280 stores × 0.28u (top 77 stores × 1u) = 77 (25%). Total = 320. Conservative B/C allocation — jumpsuit is unproven outside metros."},
      {a:"Synthesis",t:"2.7s",act:"320 units. The AW25 test provides strong validation. Three colors: Navy (work), Olive (casual), Rust (evening). Re-buy trigger at 80% 6-wk ST for another 160-unit follow-on. Confidence 78%.",conf:"78%"}
    ]),qs:["Can we get 160-unit re-buy in 3 weeks?","Should B/C be excluded entirely?"]},

  {id:"S26-TP-110",name:"Knit Polo",sub:"Tops",units:360,mrp:2290,cost:961,margin:58,src:"new-design",conf:74,
    colors:[{n:"Forest Green",p:.35,c:STD},{n:"Cream",p:.30,c:STD},{n:"Wine",p:.35,c:STD}],ga:{"A+":.28,"A":.42,"B/C":.30},
    flag:{type:"opportunity",msg:"Knit polo tested in AW25: 120 units at 86% 6-wk ST. New sub-category. Polo buyers show 2.1x lifetime value vs basic tee buyers. Scaling to 360 units with three rich colors for the premium knit positioning."},
    hist:{AW25:{u:120,st:86,m:58,w:8,n:"Test outperformed. 2.1x LTV buyers."}},
    reason:"New sub-category. AW25 test hit 86% 6-wk ST (just below the 90% target) and identified a high-LTV buyer segment. 360 units is a 3x scale from the 120-unit test. Three colors that signal premium knit, not casual.",
    trail:T([
      {a:"Demand Planner",t:"0.3s",act:"AW25 test: 120u at 86% 6-wk ST. Below the 90% target by 4 points, but this was a first-time format with zero awareness. Adjusted target for new sub-categories: 80% 6-wk ST. At 86%, the test exceeded the adjusted threshold."},
      {a:"Customer Intelligence",t:"1.1s",act:"Polo buyers: 2.1x LTV vs basic tee buyers. 67% are new-to-brand customers who entered through the polo — this is an acquisition vehicle, not just a product."},
      {a:"Allocation Engine",t:"1.8s",act:"Unit derivation: A+ = 12 stores × 8u = 96 (28%). A = 21 stores × 7u = 147 (42%). B/C = ~280 stores × 0.4u (top 108 × 1u) = 108 (30%). B/C gets 30% — polo has workwear crossover appeal. Total = 360."},
      {a:"Synthesis",t:"2.4s",act:"360 units. This is less about the product and more about the customer segment it attracts. If successful, knit polo becomes a permanent sub-category for AW26+. Confidence 74%.",conf:"74%"}
    ]),qs:["Is there a lower-price knit option to test alongside?"]},

  {id:"S26-DR-111",name:"Floral Midi Dress",sub:"Dresses",units:440,mrp:3490,cost:1466,margin:58,src:"new-design",conf:70,
    colors:[{n:"Botanical Print",p:.50,c:STD},{n:"Ditsy Floral",p:.50,c:STD}],ga:{"A+":.25,"A":.40,"B/C":.35},
    flag:{type:"low-confidence",msg:"Printed dresses are a new direction — the brand has historically focused on solid/stripe. Floral midi dresses are the #1 searched dress type on the brand site (4,200 searches/month, +45% YoY). However, zero sell-through history with florals, making this a design-risk buy."},
    hist:{},
    reason:"First floral print dress. Search data shows strong demand (#1 dress search term on site) but the brand has never executed florals. 440 units with two distinct print scales (Botanical for large/bold, Ditsy for subtle) to test which resonates.",
    trail:T([
      {a:"Trend Intelligence",t:"0.5s",act:"Brand site search data: 'floral dress' = 4,200 searches/month, +45% YoY. Currently 0% conversion because there are no floral dresses in range. This is the single largest unaddressed search term on the site."},
      {a:"Demand Planner",t:"1.3s",act:"No direct history. Proxy: solid midi dresses average 88% 6-wk ST. Applied 20% discount for unproven print category: 70% target 6-wk ST. At 70% target, 440 units is the allocation. Two print options to learn which scale works: Botanical (large-scale, statement) vs Ditsy (subtle, safer)."},
      {a:"Allocation Engine",t:"2.1s",act:"A+ = 12 stores × 9u = 108 (25%). A = 21 stores × 8u = 168 (40%). B/C = ~280 stores × 0.6u (top 164 × 1u) = 164 (35%). B/C gets 35% — floral dresses have broad appeal if they work. Total = 440."},
      {a:"Synthesis",t:"2.8s",act:"440 units. This is the most important design experiment in SS26. Success opens an entirely new aesthetic direction. Failure is contained at max exposure. Confidence 70% — the demand signal is clear but execution of florals is untested.",conf:"70%"}
    ]),qs:["Should we test at one print scale only?","What are competitor floral price points?"]},

  {id:"S26-SK-112",name:"Pleated Midi Skirt",sub:"Skirts",units:620,mrp:2290,cost:916,margin:60,src:"carryover",conf:91,
    colors:[{n:"Black",p:.35,c:STD},{n:"Navy",p:.25,c:STD},{n:"Beige",p:.20,c:STD},{n:"Dusty Rose",p:.20,c:STD}],ga:{"A+":.20,"A":.34,"B/C":.46},
    flag:{type:"deeper-buy",msg:"SS25 hit 85% 6-wk ST at 520 units. The best-performing skirt and the only skirt that consistently approaches the 90% target. System recommends 620u (+19%) to push closer to the 90% target."},
    hist:{SS24:{u:440,st:75,m:59,w:15,n:"Steady performer across all grades."},SS25:{u:520,st:85,m:60,w:8,n:"Best skirt. 5 points below 90% target."}},
    reason:"Top skirt. SS25 was 5 points below the 90% 6-wk ST target. The 19% increase closes that gap. Four-color assortment well-balanced across all store tiers. Dusty Rose added to capture the non-neutral growth trend (replacing Sage which hit only 68% ST).",
    trail:T([
      {a:"Demand Planner",t:"0.3s",act:"SS25: 520u at 85% 6-wk ST. Gap to 90% target = 5 points. At current ROS (0.9u/A+ store/wk), adding 100 units should yield 89-91% 6-wk ST. Pleated midi is the only skirt consistently above 80%."},
      {a:"Color Analyst",t:"1.0s",act:"SS25 color data: Black 88%, Navy 84%, Beige 82%, Sage 68%. Replacing Sage with Dusty Rose (Dusty Rose tested at 78% ST in AW25 blazers). Split reflects ST performance ranking."},
      {a:"Allocation Engine",t:"1.7s",act:"A+ = 12 stores × 10u = 120 (20%). A = 21 stores × 10u = 210 (34%). B/C = ~280 stores × 1u (top 290) = 290 (46%). Total = 620."},
      {a:"Synthesis",t:"2.2s",act:"620 units. Straightforward scale-up of a proven performer. Low risk, high confidence. Confidence 91%.",conf:"91%"}
    ]),qs:["Can Sage be kept as a 5th color?"]},

  {id:"S26-DR-113",name:"Bodycon Midi Dress",sub:"Dresses",units:160,mrp:2990,cost:1256,margin:58,src:"carryover",conf:72,
    colors:[{n:"Black",p:.60,c:SSK},{n:"Forest Green",p:.40,c:SSK}],ga:{"A+":.50,"A":.50},
    flag:{type:"risk",msg:"Three consecutive seasons of declining 6-wk ST: 61% (SS24), 52% (AW25), 44% (SS25). All below the 90% target and trending down. System has reduced the buy by 60% (from 400 to 160 units) and pulled out of B/C. Forest Green tests whether a color refresh can arrest the decline."},
    hist:{SS24:{u:500,st:61,m:52,w:20,n:"Significant markdown. Below target."},AW25:{u:400,st:52,m:50,w:18,n:"Reduced but still slow."},SS25:{u:400,st:44,m:48,w:20,n:"Worst dress. -8 pts vs prior season."}},
    reason:"Declining style: 6-wk ST fell from 61% to 52% to 44% across three seasons, consistently below the 90% target. Reduced 60% from SS25. A+/A only. Forest Green is a diagnostic test — if 6-wk ST stays below 55%, recommend discontinuation for AW26.",
    trail:T([
      {a:"Demand Planner",t:"0.4s",act:"6-wk ST trajectory: SS24 61%, AW25 52%, SS25 44%. Each season declining by ~8 points. At this rate, AW26 would be ~36% — deep markdown territory."},
      {a:"Customer Intelligence",t:"1.2s",act:"Customer preference shifting toward relaxed fits. Bodycon buyers shrinking 18% YoY. However, remaining buyers have high basket value. This is a small but valuable niche — worth one more test."},
      {a:"Allocation Engine",t:"2.0s",act:"Reduced allocation: A+ = 12 stores × 7u = 84 (50%). A = 21 stores × 4u = 76 (50%). B/C excluded. Total = 160. Small-skew curve (SSK) — bodycon buyers index smaller."},
      {a:"Synthesis",t:"2.6s",act:"160 units. Last chance buy. If Forest Green lifts 6-wk ST above 55%, the silhouette survives in a reduced role. If not, discontinue for AW26. Confidence 72%.",conf:"72%"}
    ]),qs:["Should we drop this entirely?","What if we repositioned as evening-only?"]},

  /* ──── REMAINING STYLES (all with full reasoning, no "core" designation) ──── */
  {id:"S26-TP-114",name:"Oversized Cotton Shirt",sub:"Tops",units:1200,mrp:1690,cost:676,margin:60,src:"carryover",conf:92,
    colors:[{n:"White",p:.30,c:LSK},{n:"Blue Stripe",p:.25,c:LSK},{n:"Pink",p:.20,c:STD},{n:"Sage",p:.25,c:STD}],ga:{"A+":.18,"A":.34,"B/C":.48},
    flag:null,hist:{SS24:{u:800,st:76,m:59,w:14},SS25:{u:1080,st:84,m:60,w:9}},
    reason:"SS25 hit 84% 6-wk ST at 1,080 units. 6 points below the 90% target. Scaling 11% to 1,200u to close the gap. Relaxed fit now 62% of tops sales. White/Blue Stripe use large-skew curve for oversized silhouette. A+ = 12×18u, A = 21×19u, B/C = ~280×2u (top stores).",
    trail:T([{a:"Demand Planner",t:"0.2s",act:"SS25: 1,080u at 84% 6-wk ST. Gap to 90% = 6pts. At ROS 1.1u/A+ store/wk, 1,200u yields ~89% 6-wk ST."},{a:"Allocation Engine",t:"0.8s",act:"A+=216(18%), A=399(34%), B/C=576(48%). 4 colors, mixed LSK/STD curves."},{a:"Synthesis",t:"1.2s",act:"1,200 units. Conservative scale-up of a proven performer.",conf:"92%"}]),qs:[]},

  {id:"S26-CD-115",name:"Cotton Solid Co-ord",sub:"Co-ords",units:380,mrp:2990,cost:1256,margin:58,src:"carryover",conf:88,
    colors:[{n:"Beige",p:.35,c:STD},{n:"Black",p:.35,c:STD},{n:"Olive",p:.30,c:STD}],ga:{"A+":.22,"A":.38,"B/C":.40},
    flag:null,hist:{SS25:{u:320,st:78,m:57,w:10}},
    reason:"Entry-price co-ord. SS25 hit 78% 6-wk ST at 320 units. 12 points below 90% target. However, co-ords are a growing category (+34% YoY). Scaling 19% to 380u. A+ = 12×7u, A = 21×7u, B/C = ~280×0.5u.",
    trail:T([{a:"Demand Planner",t:"0.2s",act:"SS25: 320u at 78% 6-wk ST. Co-ord category growing 34% YoY."},{a:"Allocation Engine",t:"0.7s",act:"A+=84(22%), A=144(38%), B/C=152(40%). Total 380."},{a:"Synthesis",t:"1.0s",act:"380 units. Moderate scale-up for growing category.",conf:"88%"}]),qs:[]},

  {id:"S26-JM-116",name:"Sleeveless Cotton Jumpsuit",sub:"Jumpsuits",units:480,mrp:3490,cost:1466,margin:58,src:"carryover",conf:86,
    colors:[{n:"Black",p:.35,c:STD},{n:"Navy",p:.30,c:STD},{n:"Olive",p:.35,c:STD}],ga:{"A+":.22,"A":.38,"B/C":.40},
    flag:null,hist:{SS24:{u:380,st:71,m:57,w:15},SS25:{u:430,st:80,m:58,w:9}},
    reason:"Cotton jumpsuit with steady growth. SS25 hit 80% 6-wk ST. 10 points below target. Lower return rate (18%) vs linen jumpsuits (28%). Scaling 12% to 480u.",
    trail:T([{a:"Demand Planner",t:"0.2s",act:"SS25: 430u at 80% 6-wk ST. Cotton jumpsuits: 18% return rate vs 28% for linen."},{a:"Allocation Engine",t:"0.7s",act:"A+=108(22%), A=180(38%), B/C=192(40%). Total 480."},{a:"Synthesis",t:"1.0s",act:"480 units. Steady performer with room to grow toward 90% target.",conf:"86%"}]),qs:[]},

  {id:"S26-DR-117",name:"Button-Down Shirt Dress",sub:"Dresses",units:720,mrp:2690,cost:1103,margin:59,src:"carryover",conf:90,
    colors:[{n:"Chambray",p:.35,c:STD},{n:"White",p:.30,c:STD},{n:"Olive",p:.35,c:STD}],ga:{"A+":.20,"A":.36,"B/C":.44},
    flag:null,hist:{SS24:{u:520,st:74,m:58,w:14},SS25:{u:660,st:84,m:59,w:8}},
    reason:"SS25 hit 84% 6-wk ST. Chambray was the standout color (89% ST vs 81% avg). Scaling 9% to 720u. Chambray at 35% lead — justified by its outperformance.",
    trail:T([{a:"Demand Planner",t:"0.2s",act:"SS25: 660u at 84% 6-wk ST. Chambray: 89% vs White 81%. Gap to 90% = 6pts."},{a:"Allocation Engine",t:"0.8s",act:"A+=144(20%), A=252(36%), B/C=316(44%). Total 720."},{a:"Synthesis",t:"1.1s",act:"720 units. Chambray-led. Approaching 90% target trajectory.",conf:"90%"}]),qs:[]},

  {id:"S26-SK-118",name:"Floral Wrap Skirt",sub:"Skirts",units:340,mrp:2290,cost:938,margin:59,src:"new-design",conf:76,
    colors:[{n:"Botanical",p:.50,c:STD},{n:"Vintage Floral",p:.50,c:STD}],ga:{"A+":.25,"A":.40,"B/C":.35},
    flag:null,hist:{},
    reason:"New print skirt to complement the Pleated Midi (solid). No direct history but wrap skirts averaged 73% 6-wk ST. With print trend (+45% search), targeting 75% 6-wk ST. Two prints to test: Botanical (bold) vs Vintage (subtle).",
    trail:T([{a:"Demand Planner",t:"0.3s",act:"No history. Proxy: solid wrap skirts avg 73% 6-wk ST. Print adds novelty risk. Target: 75%."},{a:"Allocation Engine",t:"0.9s",act:"A+=84(25%), A=136(40%), B/C=119(35%). Total 340."},{a:"Synthesis",t:"1.3s",act:"340 units. New print + new wrap format. Two variables = lower confidence.",conf:"76%"}]),qs:[]},

  {id:"S26-TP-119",name:"Rib Tank Top",sub:"Tops",units:1400,mrp:990,cost:396,margin:60,src:"carryover",conf:94,
    colors:[{n:"Black",p:.30,c:SSK},{n:"White",p:.30,c:SSK},{n:"Nude",p:.20,c:SSK},{n:"Grey",p:.20,c:SSK}],ga:{"A+":.14,"A":.30,"B/C":.56},
    flag:null,hist:{SS24:{u:1080,st:84,m:60,w:8},SS25:{u:1300,st:90,m:60,w:6}},
    reason:"SS25 hit exactly the 90% 6-wk ST target at 1,300 units — the plan was perfectly calibrated. Scaling 8% to 1,400u to account for organic store growth. Lowest price point. Heavy B/C allocation (56%). Small-skew size curve.",
    trail:T([{a:"Demand Planner",t:"0.2s",act:"SS25: 1,300u at 90% 6-wk ST. Perfect allocation. Scale 8% for organic growth."},{a:"Allocation Engine",t:"0.6s",act:"A+=196(14%), A=420(30%), B/C=784(56%). SSK curve. Total 1,400."},{a:"Synthesis",t:"0.9s",act:"1,400 units. Perfectly calibrated. Lowest risk in the plan.",conf:"94%"}]),qs:[]},

  {id:"S26-TR-120",name:"High-Waist Palazzo",sub:"Trousers",units:680,mrp:2290,cost:916,margin:60,src:"carryover",conf:89,
    colors:[{n:"Black",p:.35,c:LSK},{n:"Navy",p:.25,c:LSK},{n:"Olive",p:.20,c:LSK},{n:"Cream",p:.20,c:LSK}],ga:{"A+":.20,"A":.36,"B/C":.44},
    flag:null,hist:{SS24:{u:480,st:74,m:58,w:14},SS25:{u:620,st:83,m:59,w:9}},
    reason:"Palazzo complements the Wide-Leg Trouser — different occasion profile (casual vs workwear). SS25 hit 83% 6-wk ST, 7 points below target. Scaling 10% to 680u. Large-skew curve for relaxed silhouette.",
    trail:T([{a:"Demand Planner",t:"0.2s",act:"SS25: 620u at 83% 6-wk ST. No cannibalisation with Wide-Leg — palazzo is casual, wide-leg is workwear."},{a:"Allocation Engine",t:"0.7s",act:"A+=132(20%), A=252(36%), B/C=300(44%). LSK curve. Total 680."},{a:"Synthesis",t:"1.0s",act:"680 units. Steady growth. LSK curve.",conf:"89%"}]),qs:[]},

  {id:"S26-TR-121",name:"Linen Shorts",sub:"Trousers",units:580,mrp:1890,cost:756,margin:60,src:"new-design",conf:82,
    colors:[{n:"White",p:.30,c:SSK},{n:"Beige",p:.30,c:SSK},{n:"Olive",p:.20,c:SSK},{n:"Black",p:.20,c:SSK}],ga:{"A+":.22,"A":.38,"B/C":.40},
    flag:null,hist:{SS25:{u:480,st:78,m:59,w:10}},
    reason:"New design (updated cut from SS25). SS25 shorts hit 78% 6-wk ST. 12 points below target. Growing steadily as customers accept shorts in premium. Small-skew curve for fitted cut. Scaling 21% to 580u.",
    trail:T([{a:"Demand Planner",t:"0.2s",act:"SS25: 480u at 78% 6-wk ST. Shorts gaining acceptance in premium segment."},{a:"Allocation Engine",t:"0.7s",act:"A+=132(22%), A=210(38%), B/C=232(40%). SSK curve. Total 580."},{a:"Synthesis",t:"1.0s",act:"580 units. New cut, growing category.",conf:"82%"}]),qs:[]},

  {id:"S26-TP-122",name:"Utility Jacket",sub:"Tops",units:260,mrp:3990,cost:1676,margin:58,src:"new-design",conf:80,
    colors:[{n:"Olive",p:.40,c:STD},{n:"Sand",p:.35,c:STD},{n:"Black",p:.25,c:STD}],ga:{"A+":.28,"A":.42,"B/C":.30},
    flag:null,hist:{AW25:{u:220,st:76,m:57,w:12}},
    reason:"New SS26 design based on AW25 utility jacket (76% 6-wk ST at 220u). Transitional layer for early/late summer weeks. Scaling 18% to 260u.",
    trail:T([{a:"Demand Planner",t:"0.2s",act:"AW25: 220u at 76% 6-wk ST. Utility jackets sell in transitional Wk1-4 and Wk16-20."},{a:"Allocation Engine",t:"0.7s",act:"A+=72(28%), A=105(42%), B/C=78(30%). Total 260."},{a:"Synthesis",t:"1.0s",act:"260 units. Seasonal layer piece.",conf:"80%"}]),qs:[]},

  {id:"S26-CD-123",name:"Printed Co-ord Set",sub:"Co-ords",units:280,mrp:3290,cost:1382,margin:58,src:"new-design",conf:73,
    colors:[{n:"Tropical",p:.50,c:STD},{n:"Geometric",p:.50,c:STD}],ga:{"A+":.28,"A":.42,"B/C":.30},
    flag:null,hist:{},
    reason:"New printed co-ord. No history. Proxy: solid co-ords averaged 78% 6-wk ST, but print adds novelty risk. Target: 72% 6-wk ST. Two prints to test which resonates.",
    trail:T([{a:"Demand Planner",t:"0.3s",act:"No history. Solid co-ords avg 78% 6-wk ST. Print discount: target 72%."},{a:"Allocation Engine",t:"0.8s",act:"A+=72(28%), A=126(42%), B/C=84(30%). Total 280."},{a:"Synthesis",t:"1.1s",act:"280 units. Print co-ord test.",conf:"73%"}]),qs:[]},

  {id:"S26-BZ-124",name:"Double-Breasted Blazer",sub:"Blazers",units:380,mrp:4490,cost:1886,margin:58,src:"carryover",conf:88,
    colors:[{n:"Black",p:.50,c:STD},{n:"Navy",p:.30,c:STD},{n:"Charcoal",p:.20,c:STD}],ga:{"A+":.24,"A":.38,"B/C":.38},
    flag:null,hist:{SS24:{u:420,st:76,m:58,w:14},SS25:{u:400,st:72,m:57,w:15}},
    reason:"Foundation blazer losing share to single-button (outsold 3:1) but retaining loyal buyers. Reduced 5% from SS25 to 380u. Held rather than cut deeper — loyal DB buyers have 1.4x LTV.",
    trail:T([{a:"Demand Planner",t:"0.2s",act:"SS25: 400u at 72% 6-wk ST. Declining share but distinct buyer segment. DB buyers: 1.4x LTV."},{a:"Allocation Engine",t:"0.7s",act:"A+=90(24%), A=144(38%), B/C=144(38%). Total 380."},{a:"Synthesis",t:"1.0s",act:"380 units. Maintain for loyal segment. Don't scale.",conf:"88%"}]),qs:[]},
];

/* ═══ FLAGS ═══ */
const FM={
  "size-shift":{l:"Size Shift",bg:C.amberSoft,clr:C.amber,bd:C.amberBorder},
  "low-confidence":{l:"Low Confidence",bg:C.terraSoft,clr:C.terra,bd:C.terraBorder},
  "opportunity":{l:"Opportunity",bg:C.sageSoft,clr:"#1B6B5A",bd:C.sageBorder},
  "deeper-buy":{l:"Scale Up",bg:C.sageSoft,clr:"#1B6B5A",bd:C.sageBorder},
  "risk":{l:"Risk",bg:C.terraSoft,clr:C.terra,bd:C.terraBorder},
};
const SL={"carryover":"Carryover","new-design":"New Design","trend-test":"Trend Test"};
const SD={"carryover":C.sage,"new-design":C.amber,"trend-test":C.terra};

/* ═══ STORE AGGREGATION ═══ */
function storeAggCalc(styles,edits){
  return STORE_DB.filter(s=>s.grade==="A+"||s.grade==="A").map(st=>{
    const sl=styles.map(s=>{const u=edits[s.id]?.units??s.units;const gu=Math.round(u*(s.ga[st.grade]||0));const sts=gradeStores(st.grade).length||1;const su=Math.round(gu/sts);return su>0?{id:s.id,name:s.name,sub:s.sub,units:su,mrp:s.mrp,oneSize:s.oneSize}:null;}).filter(Boolean);
    return {code:st.code,name:st.name,city:st.city,grade:st.grade,sp:st.sp,sl,sc:sl.length,tu:sl.reduce((a,x)=>a+x.units,0),tv:sl.reduce((a,x)=>a+x.units*x.mrp,0)};
  }).sort((a,b)=>b.tu-a.tu);
}

/* ═══ MAIN ═══ */
export default function BuyPlan(){
  const [view,setView]=useState("seasons");const [season,setSeason]=useState(null);
  const [pastTab,setPastTab]=useState("style");
  const [tab,setTab]=useState("sku");const [exp,setExp]=useState(null);const [stExp,setStExp]=useState(null);
  const [edits,setEdits]=useState({});const [editLog,setEditLog]=useState({});
  const [editing,setEditing]=useState(null);const [editVal,setEditVal]=useState("");
  const [scenario,setScenario]=useState(null);const [reason,setReason]=useState("");const [trail,setTrail]=useState(null);const [questt,setQuestt]=useState(false);
  const [storeEdit,setStoreEdit]=useState(null);
  const [gradeExp,setGradeExp]=useState(null);

  const styles=useMemo(()=>RAW.map(s=>({...s,units:edits[s.id]?.units??s.units})),[edits]);
  const totU=useMemo(()=>styles.reduce((a,s)=>a+s.units,0),[styles]);
  const totV=useMemo(()=>styles.reduce((a,s)=>a+s.units*s.mrp,0),[styles]);
  const sa=useMemo(()=>storeAggCalc(styles,edits),[styles,edits]);
  const bcU=useMemo(()=>styles.reduce((a,s)=>a+Math.round(s.units*(s.ga["B/C"]||0)),0),[styles]);
  const bcV=useMemo(()=>styles.reduce((a,s)=>a+Math.round(s.units*(s.ga["B/C"]||0))*s.mrp,0),[styles]);
  const initCats=()=>{const o={};RAW.forEach(s=>{o[s.sub]=true;});return o;};
  const [catOpen,setCatOpen]=useState(initCats);
  const grouped=useMemo(()=>{const g={};styles.forEach(s=>{if(!g[s.sub])g[s.sub]={styles:[],units:0};g[s.sub].styles.push(s);g[s.sub].units+=s.units;});return Object.entries(g).sort((a,b)=>b[1].units-a[1].units).map(([cat,d])=>({cat,styles:d.styles.sort((a,b)=>b.units-a.units),units:d.units,count:d.styles.length}));},[styles]);

  const startEdit=(sid,v)=>{setEditing(sid);setEditVal(String(v));};
  const submitEdit=(sid)=>{const nv=parseInt(editVal,10);const s=RAW.find(x=>x.id===sid);const ov=edits[sid]?.units??s.units;setEditing(null);if(isNaN(nv)||nv<0||nv===ov)return;setScenario({sid,ov,nv});};
  const commit=(sc)=>{if(!scenario)return;const{sid,ov,nv}=scenario;setEdits(p=>({...p,[sid]:{...p[sid],units:nv}}));if(reason.trim())setEditLog(p=>({...p,[sid]:[...(p[sid]||[]),{from:ov,to:nv,sc:sc.label,reason:reason.trim(),t:new Date().toLocaleTimeString()}]}));setScenario(null);setReason("");};

  const EU=({sid,value})=>{const isE=editing===sid;const orig=RAW.find(x=>x.id===sid)?.units;const ch=edits[sid]?.units!==undefined&&value!==orig;
    if(isE) return (<input autoFocus type="text" value={editVal} onChange={e=>setEditVal(e.target.value)} onBlur={()=>submitEdit(sid)} onKeyDown={e=>{if(e.key==="Enter")submitEdit(sid);if(e.key==="Escape")setEditing(null);}} style={{width:72,fontSize:14,fontFamily:"monospace",fontWeight:600,border:`2px solid ${C.sage}`,borderRadius:4,padding:"3px 8px",outline:"none",textAlign:"right",background:C.sageSoft}}/>);
    return (<span onClick={e=>{e.stopPropagation();startEdit(sid,value);}} style={{display:"inline-flex",alignItems:"center",gap:4,fontFamily:"monospace",fontWeight:600,fontSize:14,cursor:"pointer",padding:"3px 8px",borderRadius:4,border:`1px dashed ${ch?C.sage:C.border}`,background:ch?C.sageSoft:"transparent",color:ch?C.green:C.text}}>{value.toLocaleString()}<span style={{color:ch?C.sage:C.dimmer,opacity:.5}}><Pencil/></span></span>);
  };

  /* ═══ SCENARIO MODAL ═══ */
  const ScenarioModal=()=>{if(!scenario)return null;const{sid,ov,nv}=scenario;const s=RAW.find(x=>x.id===sid);const diff=nv-ov;const pctChg=((diff/ov)*100).toFixed(1);const valImpact=(diff*s.mrp/1e5).toFixed(1);
    const propG=GRADES.filter(g=>s.ga[g]).map(g=>{const cu=Math.round(ov*s.ga[g]);const nu=Math.round(nv*s.ga[g]);const sts=gradeStores(g);return {g,from:cu,to:nu,diff:nu-cu,stores:sts.length,per:sts.length?Math.round(nu/sts.length):nu};});
    const priG=GRADES.filter(g=>s.ga[g]).map(g=>{const cu=Math.round(ov*s.ga[g]);let nu=cu;if(diff>0&&(g==="A+"||g==="A")){nu=cu+Math.round(diff*(s.ga[g]/((s.ga["A+"]||0)+(s.ga["A"]||0))));}else if(diff<0&&g==="B/C"){nu=Math.max(0,cu+diff);}else if(diff<0&&g!=="B/C"){const bcCut=Math.min(Math.abs(diff),Math.round(ov*(s.ga["B/C"]||0)));const rem=Math.abs(diff)-bcCut;if(rem>0)nu=cu-Math.round(rem*(s.ga[g]/((s.ga["A+"]||0)+(s.ga["A"]||0))));}const sts=gradeStores(g);return {g,from:cu,to:nu,diff:nu-cu,stores:sts.length,per:sts.length?Math.round(nu/sts.length):nu};});
    const warn=[];if(s.hist?.SS25&&diff<0&&s.hist.SS25.st>=75)warn.push(`SS25 achieved ${s.hist.SS25.st}% 6-wk sell-through at ${s.hist.SS25.u.toLocaleString()} units. Reducing to ${nv.toLocaleString()} may push 6-wk ST above the 90% target — meaning lost sales.`);
    if(!Object.keys(s.hist||{}).length&&diff>0&&diff/ov>.3)warn.push(`No prior sell-through data. Increasing by ${pctChg}% adds ₹${valImpact}L of unvalidated exposure.`);
    const GR=({gs})=> (<div style={{fontSize:13,marginTop:10}}>{gs.map(g=> (<div key={g.g} style={{display:"flex",gap:8,alignItems:"center",padding:"4px 0"}}><span style={{fontWeight:600,color:C.dim,width:40,fontSize:13}}>{g.g}</span><span style={{fontFamily:"monospace",color:C.dimmer,width:48,textAlign:"right",fontSize:13}}>{g.from.toLocaleString()}</span><span style={{color:C.dimmer}}>→</span><span style={{fontFamily:"monospace",fontWeight:600,color:g.diff>0?C.green:g.diff<0?C.terra:C.dim,width:48,textAlign:"right",fontSize:13}}>{g.to.toLocaleString()}</span><span style={{color:g.diff>0?C.green:g.diff<0?C.terra:C.dimmer,fontSize:12}}>({g.diff>0?"+":""}{g.diff})</span>{g.stores>1&&<span style={{color:C.dimmer,fontSize:12}}>~{g.per}u / {g.stores} stores</span>}</div>))}</div>);
    return (<div onClick={()=>{setScenario(null);setReason("");}} style={{position:"fixed",inset:0,zIndex:100,background:"rgba(27,42,33,.4)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#fff",borderRadius:12,width:"100%",maxWidth:580,boxShadow:"0 24px 80px rgba(12,44,24,.18)",maxHeight:"90vh",overflow:"auto",border:`1px solid ${C.border}`}}>
        <div style={{padding:"22px 28px",background:C.bgSub,borderRadius:"12px 12px 0 0",borderBottom:`1px solid ${C.border}`}}>
          <div style={{display:"flex",justifyContent:"space-between"}}><div><div style={{fontSize:13,color:C.dim}}>{s.sub} · {s.id}</div><div style={{fontSize:18,fontWeight:700,fontFamily:serif,marginTop:4}}>{s.name}</div></div><button onClick={()=>{setScenario(null);setReason("");}} style={{background:"none",border:"none",fontSize:20,color:C.dim,cursor:"pointer"}}>×</button></div>
          <div style={{display:"flex",alignItems:"baseline",gap:10,marginTop:12}}><span style={{fontSize:24,fontWeight:700,color:C.dimmer,fontFamily:"monospace",textDecoration:"line-through",textDecorationColor:C.border}}>{ov.toLocaleString()}</span><span style={{fontSize:24,fontWeight:800,color:diff>0?C.green:C.terra,fontFamily:"monospace"}}>{nv.toLocaleString()}</span><span style={{fontSize:13,fontWeight:600,color:diff>0?C.green:C.terra,background:diff>0?C.sageSoft:C.terraSoft,padding:"4px 10px",borderRadius:4}}>{diff>0?"+":""}{diff.toLocaleString()} ({diff>0?"+":""}{pctChg}%)</span></div>
          <div style={{fontSize:13,color:C.dim,marginTop:6}}>OTB impact: <b style={{color:diff>0?C.green:C.terra}}>{diff>0?"+":""}₹{valImpact}L</b> · MRP ₹{s.mrp.toLocaleString()}</div>
        </div>
        {warn.length>0&&<div style={{padding:"12px 28px",background:C.amberSoft,borderBottom:`1px solid ${C.amberBorder}`}}>{warn.map((w,i)=> (<div key={i} style={{fontSize:13,color:"#7A5C14",display:"flex",gap:6}}><span>⚠</span>{w}</div>))}</div>}
        <div style={{padding:"20px 28px"}}>
          <div style={{fontSize:12,fontWeight:700,color:C.dim,letterSpacing:.6,marginBottom:14}}>CHOOSE DISTRIBUTION</div>
          {[{gs:propG,label:"Proportional",desc:`All grades adjust by ${pctChg}%. Store ratios unchanged.`},{gs:priG,label:diff>0?"Priority A+/A":"Reduce B/C first",desc:diff>0?"Additional units go to top stores only.":"Lower-tier stores absorb the cut first."}].map(opt=> (<div key={opt.label} onClick={()=>commit({label:opt.label})} style={{padding:"16px 18px",background:"#fff",border:`1.5px solid ${C.border}`,borderRadius:8,cursor:"pointer",marginBottom:10}}>
            <div style={{fontSize:15,fontWeight:600}}>{opt.label==="Proportional"?"Scale proportionally":opt.label}</div>
            <div style={{fontSize:13,color:C.dim,marginTop:3}}>{opt.desc}</div><GR gs={opt.gs}/>
          </div>))}
          <div style={{marginTop:14,paddingTop:14,borderTop:`1px solid ${C.borderLight}`}}>
            <div style={{fontSize:12,fontWeight:600,color:C.dim,marginBottom:8}}>BUYER NOTE <span style={{fontWeight:400}}>(optional)</span></div>
            <input type="text" value={reason} onChange={e=>setReason(e.target.value)} placeholder="e.g. Supplier confirmed capacity..." style={{width:"100%",boxSizing:"border-box",fontSize:14,border:`1px solid ${C.border}`,borderRadius:6,padding:"10px 14px",outline:"none",background:C.warm,fontFamily:font}}/>
          </div>
        </div>
      </div>
    </div>);
  };

  /* ═══ TRAIL MODAL ═══ */
  const TrailModal=()=>{if(!trail)return null;const s=RAW.find(x=>x.id===trail);if(!s?.trail)return null;
    const srcMap={"Demand Planner":"POS Data","Size Curve Analyst":"POS · Size Analytics","Color Performance":"POS · Color Analytics","Color Analyst":"POS · Trend Data","Allocation Engine":"Store Master · Grade Matrix","Price Sensitivity":"Finance · Pricing","Trend Intelligence":"Site Search · Market Intel","Customer Intelligence":"CRM · Loyalty","Supply Chain":"Inventory · Vendor Portal","Synthesis":"All Sources"};
    return (<div onClick={()=>setTrail(null)} style={{position:"fixed",inset:0,zIndex:100,background:"rgba(27,42,33,.4)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#fff",borderRadius:14,width:"100%",maxWidth:660,boxShadow:"0 24px 64px rgba(12,44,24,.18)",maxHeight:"85vh",overflow:"auto",border:`1px solid ${C.border}`}}>
        <div style={{padding:"22px 28px",borderBottom:`1px solid ${C.borderLight}`,background:C.bgSub,borderRadius:"14px 14px 0 0"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div>
              <div style={{fontSize:12,fontWeight:700,color:C.dim,letterSpacing:.6}}>DECISION TRAIL</div>
              <div style={{fontSize:18,fontWeight:700,marginTop:4,fontFamily:serif}}>{s.name}</div>
            </div>
            <button onClick={()=>setTrail(null)} style={{background:C.warm,border:`1px solid ${C.border}`,borderRadius:6,padding:"4px 10px",fontSize:13,color:C.dim,cursor:"pointer",fontFamily:font}}>✕</button>
          </div>
          <div style={{display:"flex",gap:10,marginTop:8,fontSize:13,color:C.dim}}><span>{s.trail.agents} agents</span><span>·</span><span>{s.trail.time}</span></div>
          <div style={{marginTop:8,padding:"6px 10px",background:C.amberSoft,borderRadius:4,fontSize:12,color:C.amber}}>Optimization target: 6-week sell-through above 90% at full price</div>
        </div>
        <div style={{padding:"20px 28px"}}>
          {s.trail.steps.map((st,i)=>{const isFinal=!!st.conf;const src=srcMap[st.a]||"Data Source";
            const sentences=st.act.split(/(?<=\.)\s+/).filter(Boolean);
            const conclusionStart=Math.max(1,sentences.length-1);
            const analysis=sentences.slice(0,conclusionStart).join(" ");
            const conclusion=sentences.slice(conclusionStart).join(" ");
            return (<div key={i} style={{display:"flex",gap:0,marginBottom:0}}>
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",width:28,flexShrink:0}}>
                <div style={{width:isFinal?14:10,height:isFinal?14:10,borderRadius:isFinal?7:5,background:isFinal?C.green:C.sage,border:isFinal?`2px solid ${C.green}`:`2px solid ${C.sage}`,flexShrink:0,marginTop:4}}/>
                {i<s.trail.steps.length-1&&<div style={{width:2,flex:1,background:C.borderLight,marginTop:2}}/>}
              </div>
              <div style={{flex:1,paddingBottom:i<s.trail.steps.length-1?20:0,paddingLeft:8}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                  <span style={{fontSize:14,fontWeight:700,color:isFinal?C.green:C.textMid}}>{st.a}</span>
                  <span style={{fontSize:11,color:C.dimmer,fontFamily:"monospace"}}>{st.t}</span>
                  <span style={{fontSize:10,padding:"2px 6px",borderRadius:3,background:C.bgSub,color:C.dimmer,border:`1px solid ${C.borderLight}`}}>{src}</span>
                </div>
                <div style={{padding:"10px 12px",background:isFinal?"#EFF5F3":"#F7F9F8",borderRadius:"8px",border:`1px solid ${isFinal?C.sageBorder:C.borderLight}`,marginBottom:conclusion?6:0}}>
                  <div style={{fontSize:10,fontWeight:600,color:C.dimmer,letterSpacing:.5,marginBottom:4}}>{isFinal?"SYNTHESIS":"ANALYSIS"}</div>
                  <div style={{fontSize:13,color:C.textMid,lineHeight:1.65}}>{analysis}</div>
                </div>
                {conclusion&&<div style={{padding:"8px 12px",background:isFinal?C.sageSoft:"#fff",borderRadius:"6px",border:`1px solid ${isFinal?C.sageBorder:C.borderLight}`,display:"flex",gap:6,alignItems:"flex-start"}}>
                  <span style={{fontSize:10,color:isFinal?C.sage:C.dim,fontWeight:700,marginTop:3,flexShrink:0}}>→</span>
                  <div style={{fontSize:13,color:isFinal?C.green:C.textMid,lineHeight:1.55,fontWeight:isFinal?600:400}}>{conclusion}</div>
                </div>}
              </div>
            </div>);
          })}
        </div>
      </div></div>);
  };

  /* ═══ STORE EDIT MODAL ═══ */
  const StoreEditModal=()=>{if(!storeEdit)return null;const{store,style,units,grade}=storeEdit;
    return (<div onClick={()=>setStoreEdit(null)} style={{position:"fixed",inset:0,zIndex:100,background:"rgba(27,42,33,.4)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#fff",borderRadius:12,width:"100%",maxWidth:460,boxShadow:"0 20px 60px rgba(12,44,24,.16)",border:`1px solid ${C.border}`,padding:28}}>
        <div style={{fontSize:12,fontWeight:700,color:C.dim,letterSpacing:.6,marginBottom:6}}>STORE-LEVEL ADJUSTMENT</div>
        <div style={{fontSize:16,fontWeight:700,fontFamily:serif}}>{store} · {style}</div>
        <div style={{fontSize:14,color:C.dim,marginTop:8,marginBottom:18}}>Current allocation: <b>{units} units</b> ({grade} grade)</div>
        <div style={{padding:16,background:C.bgSub,borderRadius:8,border:`1px solid ${C.borderLight}`,fontSize:14,color:C.textMid,lineHeight:1.6}}>
          Store-level edits rebalance remaining units across other stores in the same grade. To change the grade total, edit from the By SKU view.
        </div>
        <div style={{marginTop:16,display:"flex",gap:10}}>
          <button onClick={()=>setStoreEdit(null)} style={{padding:"10px 18px",borderRadius:6,border:`1px solid ${C.border}`,background:C.warm,color:C.dim,fontSize:13,cursor:"pointer",fontFamily:font}}>Close</button>
          <div style={{fontSize:12,color:C.dimmer,display:"flex",alignItems:"center"}}>Store-level editing coming in next release</div>
        </div>
      </div>
    </div>);
  };

  /* ═══ HEADER ═══ */
  const otb=4.8;const pctUsed=(totV/1e7/otb*100);
  const [shellProfile,setShellProfile]=useState(false);
  const [shellNotifs,setShellNotifs]=useState(false);
  const [shellSearch,setShellSearch]=useState(false);
  const [sigOpen,setSigOpen]=useState(null);
  const [sigChats,setSigChats]=useState({});
  const [sigInput,setSigInput]=useState("");

  var bpNotifs=[
    {id:1,t:"3 styles still carry pre-correction M size curve",ts:"15m ago",ur:true},
    {id:2,t:"Bodycon Midi flagged for discontinuation review",ts:"1h ago",ur:true},
    {id:3,t:"Linen Co-ord re-buy trigger set at 70% 6-wk ST",ts:"3h ago",ur:false},
  ];

  var signals=[
    {id:0,tag:"PLAN VS HISTORY",clr:C.terra,bg:C.terraSoft,bd:C.terraBorder,
      title:"SS26 plan expects 87% avg 6-wk ST — up from 81% in SS25",
      body:"19 of 24 styles have been sized against SS25 actuals. The 6pp improvement comes from size curve corrections (+3pp), colour swaps from underperformers (+2pp), and smarter grade allocation (+1pp). 3 styles still carry pre-correction curves.",
      qs:[
        {q:"Which corrections drive the biggest ST improvement?",a:"Size curve fix on Stripe Midi alone accounts for +8pp (from 94% but with M stockouts to a projected clean 96%). Dropping Sage across 3 styles (64% ST) in favour of Olive/Dusty Rose (projected 78-85% ST) adds +2pp to the portfolio average. Grade-level reallocation — pulling bodycon out of B/C — prevents the drag that cost 3pp on the SS25 average."},
        {q:"What could pull us below 87%?",a:"Two risks: (1) New designs are 42% of the plan but carry avg 65% confidence vs 88% for carryover. If new designs underperform by 10pp, portfolio drops to 83%. (2) Olive is untested — if all 4 olive colourways miss by 15pp, portfolio drops 1.5pp. Mitigation: re-buy triggers on new designs at Week 3, and olive held at 25% allocation."}
      ]},
    {id:1,tag:"SEASONAL PATTERN",clr:C.amber,bg:C.amberSoft,bd:C.amberBorder,
      title:"SS seasons consistently outperform AW by 3-5pp — SS26 plan accounts for this",
      body:"SS25: 81% avg ST. AW25 tracking 76% at Week 14. SS24: 74%. AW24: 78% (anomaly: blazer-heavy). Linen and relaxed fits drive the SS premium. SS26 leans into both with 5 linen styles and 62% relaxed-fit tops.",
      qs:[
        {q:"Why does SS outperform AW?",a:"Three factors: (1) Linen — every linen item has exceeded 85% ST in summer, zero markdowns. AW has no equivalent fabric advantage. (2) Price points are 15% lower in SS (more tops/skirts, fewer blazers/jackets), reducing markdown risk. (3) Summer replenishment cycles are faster — 5-day lead time vs 8-day in AW."},
        {q:"Is the SS26 plan too aggressive given AW25 is at 76%?",a:"No. AW25 at 76% at Week 14 is actually on trajectory for 80% final — the double-breasted blazer (72% ST, 400 units) is the drag. SS26 has no equivalent single-style risk. The biggest single-style exposure is the Floral Print Dress at 440 units, but with a 70% ST target (not 90%)."}
      ]},
    {id:2,tag:"OPPORTUNITY",clr:C.sage,bg:C.sageSoft,bd:C.sageBorder,
      title:"Linen + olive intersection could be SS26's breakout — Rs 1.2Cr exposure",
      body:"SS25 linen: 91% avg ST. Brand site olive search: +180% YoY. AW25 olive blazer: 88% ST. SS26 plan has 4 olive styles and 5 linen styles but only 1 overlap (Relaxed Linen Shirt in Olive). Expanding the intersection is the mid-season reorder opportunity.",
      qs:[
        {q:"What is the mid-season reorder plan for linen-olive?",a:"If Relaxed Linen Shirt Olive exceeds 80% ST by Week 3: add olive to Linen Wrap Dress (200 units, Rs 9L exposure) and Linen Co-ord (100 units, Rs 6L). Total mid-season olive-linen expansion: Rs 15L. Lead time is 5 weeks from order to floor — hits Week 8-9, still in peak summer demand."},
        {q:"What is the downside if olive does not work in linen?",a:"Current olive-linen exposure is just the Relaxed Linen Shirt at 25% olive = 285 units at Rs 1,990 = Rs 5.7L. At 60% ST (worst case for a proven silhouette): Rs 1.1L markdown. The mid-season reorder only triggers if data confirms demand. Zero speculative olive-linen commitment beyond 285 units."}
      ]},
    {id:3,tag:"RISK",clr:C.terra,bg:C.terraSoft,bd:C.terraBorder,
      title:"New design confidence averages 65% — 5 styles have never been tested in this range",
      body:"Cutwork Blouse (55%), Linen Co-ord (68%), Floral Print Dress (70%), Rib Knit Midi (62%), V-Neck Jumpsuit repeat (72%). Combined: 1,440 units, Rs 58L exposure. SS25 new designs averaged 72% ST vs 86% for carryover — a 14pp gap the plan must absorb.",
      qs:[
        {q:"How is the plan de-risking new designs?",a:"Three mechanisms: (1) A+/A only distribution — no B/C for any style below 70% confidence. (2) Lower ST targets — new designs measured against 60-70% 6-wk ST, not 90%. (3) Re-buy triggers — if any new design exceeds its target by Week 3, follow-on order activates. The Cutwork Blouse (55% confidence) is explicitly a learning investment, not a revenue play."},
        {q:"What if we cut new designs and add more carryover units?",a:"Tempting but wrong. SS25 new designs that hit (V-Neck Jumpsuit: 91% ST, Knit Polo: 86%) are now AW25's best performers. The pipeline requires 25-30% new designs each season to maintain range freshness. Cutting to zero new designs would boost SS26 ST by 2-3pp but starve AW26 and SS27 of proven styles."}
      ]},
  ];

  var openSig=function(idx){
    if(sigOpen===idx){setSigOpen(null);return;}
    setSigOpen(idx);
    if(!sigChats[idx]){
      var r=signals[idx].qs||[];
      var next={};Object.keys(sigChats).forEach(function(k){next[k]=sigChats[k];});
      next[idx]={msgs:[{role:"ai",text:"What would you like to understand about this?"}],chips:r.map(function(x){return x.q;})};
      setSigChats(next);
    }
  };
  var sendSig=function(idx,text){
    if(!text.trim())return;
    var r=signals[idx].qs||[];var m=null;
    for(var i=0;i<r.length;i++){if(r[i].q===text)m=r[i];}
    var ai=m?m.a:"I would recommend checking the decision trail on the relevant style for the full picture.";
    var prev=sigChats[idx]||{msgs:[],chips:[]};
    var rem=prev.chips.filter(function(s){return s!==text;});
    var n1={};Object.keys(sigChats).forEach(function(k){n1[k]=sigChats[k];});
    n1[idx]={msgs:prev.msgs.concat([{role:"user",text:text},{role:"wait"}]),chips:[]};
    setSigChats(n1);setSigInput("");
    setTimeout(function(){
      setSigChats(function(p){
        var c=p[idx];if(!c)return p;
        var n2={};Object.keys(p).forEach(function(k){n2[k]=p[k];});
        n2[idx]={msgs:c.msgs.filter(function(x){return x.role!=="wait";}).concat([{role:"ai",text:ai}]),chips:rem};
        return n2;
      });
    },800+Math.random()*600);
  };

  /* ─── SHELL COMPONENTS ─── */
  var Shell=function(p){return(<div onClick={function(){setShellProfile(false);setShellNotifs(false);}} className="overflow-auto" style={{height:"100vh",background:C.bgSub,fontFamily:font,display:"flex"}}>
    <div style={{width:60,minHeight:"100vh",background:C.green,display:"flex",flexDirection:"column",alignItems:"center",flexShrink:0,position:"fixed",top:0,left:0,bottom:0,zIndex:100}}>
      <div style={{marginTop:20,width:30,height:30,borderRadius:6,background:"rgba(255,255,255,0.06)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}><Menu size={14} color="rgba(255,255,255,0.4)" strokeWidth={1.5}/></div>
    </div>
    <div style={{flex:1,marginLeft:60,minHeight:"100vh",display:"flex",flexDirection:"column"}}>
      <div style={{background:C.bg,borderBottom:"1px solid "+C.border,padding:"0 36px",height:52,display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:50}}>
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          <div style={{display:"flex",alignItems:"baseline"}}><span style={{fontSize:15,fontWeight:500,color:C.green,letterSpacing:"-0.01em",fontFamily:font}}>questt</span><span style={{color:C.sage,fontSize:17,fontWeight:700,lineHeight:1}}>.</span></div>
          <div style={{width:1,height:18,background:C.border}}/>
          <img src="/images/pwcLogo.jpg" alt="PwC" style={{height:24,display:"block",opacity:0.85}} />
          <div style={{width:1,height:18,background:C.border}}/>
          <span style={{fontSize:12,fontWeight:500,color:C.dim,letterSpacing:"0.02em"}}>Buy Planning</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:6}}>
          {p.extra||null}
          <div style={{display:"flex",alignItems:"center",gap:6,padding:"6px 12px",background:shellSearch?C.bg:C.bgSub,border:"1px solid "+(shellSearch?C.sage:C.border),borderRadius:100,transition:"all 0.2s",width:shellSearch?240:160}}>
            <Search size={13} color={C.dimmer} strokeWidth={1.5}/>
            <input placeholder="Search styles, stores..." onFocus={function(){setShellSearch(true);}} onBlur={function(){setShellSearch(false);}} style={{border:"none",outline:"none",background:"transparent",fontSize:11,fontFamily:font,color:C.text,width:"100%"}}/>
            {!shellSearch&&<span style={{fontSize:9,color:C.dimmer,background:C.bg,padding:"1px 5px",borderRadius:3,border:"1px solid "+C.borderLight,fontFamily:mono,whiteSpace:"nowrap"}}>/</span>}
          </div>
          <div style={{width:1,height:20,background:C.borderLight,margin:"0 2px"}}/>
          <div style={{position:"relative"}}>
            <button onClick={function(e){e.stopPropagation();setShellNotifs(!shellNotifs);setShellProfile(false);}} style={{padding:6,background:shellNotifs?C.bgSub:"transparent",border:"none",borderRadius:6,cursor:"pointer",position:"relative",display:"flex",alignItems:"center"}}><Bell size={16} strokeWidth={1.5} color={C.dim}/><div style={{position:"absolute",top:4,right:4,width:6,height:6,borderRadius:3,background:C.terra,border:"1.5px solid "+C.bg}}/></button>
            {shellNotifs&&<div onClick={function(e){e.stopPropagation();}} style={{position:"absolute",top:"100%",right:0,marginTop:6,width:300,background:C.bg,border:"1px solid "+C.border,borderRadius:10,boxShadow:"0 12px 40px rgba(0,0,0,0.08)",overflow:"hidden",zIndex:200}}>
              <div style={{padding:"12px 16px",borderBottom:"1px solid "+C.borderLight,display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontSize:12,fontWeight:600,color:C.text}}>Notifications</span><span style={{fontSize:10,color:C.sage,cursor:"pointer",fontWeight:500}}>Mark all read</span></div>
              {bpNotifs.map(function(n){return <div key={n.id} style={{padding:"10px 16px",borderBottom:"1px solid "+C.borderLight,display:"flex",gap:8,alignItems:"flex-start"}}>{n.ur&&<div style={{width:5,height:5,borderRadius:3,background:C.sage,marginTop:5,flexShrink:0}}/>}<div><div style={{fontSize:11,color:C.dim,lineHeight:1.5}}>{n.t}</div><div style={{fontSize:9,color:C.dimmer,marginTop:2,fontFamily:mono}}>{n.ts}</div></div></div>;})}
            </div>}
          </div>
          <div style={{position:"relative"}}>
            <button onClick={function(e){e.stopPropagation();setShellProfile(!shellProfile);setShellNotifs(false);}} style={{display:"flex",alignItems:"center",gap:6,padding:"3px 6px 3px 3px",background:shellProfile?C.bgSub:"transparent",border:"none",borderRadius:6,cursor:"pointer"}}><div style={{width:28,height:28,borderRadius:14,background:C.sage,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:600,color:"#fff"}}>BP</div><ChevronDown size={12} color={C.dimmer}/></button>
            {shellProfile&&<div onClick={function(e){e.stopPropagation();}} style={{position:"absolute",top:"100%",right:0,marginTop:6,width:200,background:C.bg,border:"1px solid "+C.border,borderRadius:10,boxShadow:"0 12px 40px rgba(0,0,0,0.08)",overflow:"hidden",zIndex:200}}>
              <div style={{padding:"12px 16px",borderBottom:"1px solid "+C.borderLight}}><div style={{fontSize:12,fontWeight:600,color:C.text}}>Buy Planner</div><div style={{fontSize:10,color:C.dimmer,marginTop:1}}>planner@brand.in</div></div>
              <button style={{display:"flex",alignItems:"center",gap:8,padding:"8px 16px",width:"100%",background:"transparent",border:"none",cursor:"pointer",fontSize:11,color:C.dim,textAlign:"left"}}><User size={13} color={C.dimmer}/>My Profile</button>
              <button style={{display:"flex",alignItems:"center",gap:8,padding:"8px 16px",width:"100%",background:"transparent",border:"none",cursor:"pointer",fontSize:11,color:C.dim,textAlign:"left"}}><Settings size={13} color={C.dimmer}/>Preferences</button>
              <div style={{borderTop:"1px solid "+C.borderLight}}><button style={{display:"flex",alignItems:"center",gap:8,padding:"8px 16px",width:"100%",background:"transparent",border:"none",cursor:"pointer",fontSize:11,color:C.terra,textAlign:"left"}}><LogOut size={13} color={C.terra}/>Log Out</button></div>
            </div>}
          </div>
        </div>
      </div>
      {p.children}
      <div style={{marginTop:"auto",borderTop:"1px solid "+C.borderLight,padding:"10px 36px",display:"flex",justifyContent:"space-between",alignItems:"center",background:C.bg}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:10,fontWeight:500,color:C.dim}}>questt</span><span style={{color:C.sage,fontSize:11,fontWeight:700}}>.</span><span style={{color:C.borderLight,margin:"0 4px",fontSize:10}}>|</span><span style={{fontSize:9,fontWeight:600,color:C.dim,fontFamily:"Georgia,serif"}}>pwc</span><span style={{fontSize:8,color:C.dimmer,marginLeft:10,fontFamily:mono,letterSpacing:"0.03em"}}>v2.4.1</span></div>
        <div style={{display:"flex",alignItems:"center",gap:5}}><div style={{width:4,height:4,borderRadius:2,background:C.sage}}/><span style={{fontSize:8,color:C.dimmer,fontFamily:mono}}>Synced 2m ago</span></div>
      </div>
    </div>
  </div>);};

  const Header=function(){return null;};

  /* ═══ STYLE CARD ═══ */
  const StyleCard=({s})=>{const isO=exp===s.id;const tot=s.units;const f=s.flag?FM[s.flag.type]:null;const isEd=edits[s.id]?.units!==undefined;
    return (<div style={{background:"#fff",borderRadius:8,border:`1px solid ${isO?C.sage+"44":C.border}`,transition:"box-shadow 0.15s",boxShadow:isO?"0 2px 12px rgba(12,44,24,0.06)":"none"}}>
      <div onClick={()=>setExp(isO?null:s.id)} style={{padding:"14px 20px",cursor:"pointer",display:"flex",alignItems:"center",gap:14}}>
        <Img/><div style={{flex:1,minWidth:0}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:15,fontWeight:600}}>{s.name}</span>{isEd&&<span style={{width:6,height:6,borderRadius:3,background:C.sage}}/>}</div>
          <div style={{fontSize:12,color:C.dim,marginTop:2}}><span style={{fontFamily:"monospace"}}>{s.id}</span> · <span style={{color:SD[s.src],fontWeight:500}}>{SL[s.src]}</span> · ₹{s.mrp.toLocaleString()}</div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:16,flexShrink:0}}>
          {f&&<span style={{fontSize:12,padding:"3px 10px",borderRadius:4,background:f.bg,color:f.clr,border:`1px solid ${f.bd}`,fontWeight:500}}>{f.l}</span>}
          <div style={{textAlign:"right"}}><div style={{fontSize:11,color:C.dimmer}}>Units</div><EU sid={s.id} value={tot}/></div>
          <div style={{textAlign:"right"}}><div style={{fontSize:11,color:C.dimmer}}>Value</div><div style={{fontSize:14,fontWeight:600,fontFamily:"monospace",color:C.green}}>₹{(tot*s.mrp/1e5).toFixed(1)}L</div></div>
          <span style={{fontSize:12,color:C.dimmer,transition:"transform 0.15s",transform:isO?"rotate(0deg)":"rotate(-90deg)"}}>{"\u25BE"}</span>
        </div>
      </div>
      {isO&&<div style={{padding:"0 20px 18px",borderTop:`1px solid ${C.borderLight}`}}>
        <div style={{marginTop:14,padding:"12px 16px",background:C.bgSub,borderRadius:6,border:`1px solid ${C.borderLight}`}}>
          <div style={{fontSize:14,color:C.textMid,lineHeight:1.65}}>{s.reason}</div>
          <div style={{marginTop:10,display:"flex",gap:8}}>
            <button onClick={e=>{e.stopPropagation();setTrail(s.id);}} style={{fontSize:12,color:C.sage,fontWeight:600,background:C.sageSoft,border:`1px solid ${C.sageBorder}`,borderRadius:5,padding:"5px 12px",cursor:"pointer",fontFamily:font}}>View Decision Trail</button>
          </div>
        </div>

        <div style={{marginTop:10,padding:"14px 16px",background:"#EFF5F3",borderRadius:8,border:`1px solid ${C.sageBorder}`}}>
          <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:10}}><div style={{width:18,height:18,borderRadius:9,background:C.sage,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{color:"#fff",fontSize:9,fontWeight:700}}>q</span></div><span style={{fontSize:13,fontWeight:600,color:C.green}}>Ask questt<span style={{color:"#1B6B5A",fontWeight:700}}>.</span></span></div>
          {s.qs&&s.qs.length>0&&<div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:10}}>{s.qs.map((q,qi)=> (<button key={qi} onClick={e=>{e.stopPropagation();setQuestt(true);}} style={{fontSize:12,color:C.green,background:"#fff",border:`1px solid ${C.sageBorder}`,borderRadius:16,padding:"6px 14px",cursor:"pointer",fontFamily:font,lineHeight:1.3,textAlign:"left"}}>{q}</button>))}</div>}
          <div style={{display:"flex",gap:8}}><input readOnly placeholder="Ask about allocation, sell-through, size curves..." onClick={e=>{e.stopPropagation();setQuestt(true);}} style={{flex:1,padding:"8px 12px",borderRadius:6,border:`1px solid ${C.border}`,fontSize:13,fontFamily:font,background:"#fff",color:C.textMid,cursor:"pointer",outline:"none"}}/><button onClick={e=>{e.stopPropagation();setQuestt(true);}} style={{padding:"8px 14px",borderRadius:6,background:C.green,border:"none",color:"#fff",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:font}}>→</button></div>
        </div>

        {s.flag&&<div style={{marginTop:10,padding:"10px 14px",background:FM[s.flag.type].bg,borderRadius:6,border:`1px solid ${FM[s.flag.type].bd}`}}>
          <div style={{fontSize:12,fontWeight:600,color:FM[s.flag.type].clr,marginBottom:3}}>{FM[s.flag.type].l}</div>
          <div style={{fontSize:13,color:C.textMid,lineHeight:1.55}}>{s.flag.msg}</div>
        </div>}

        {Object.keys(s.hist||{}).length>0&&<div style={{marginTop:12}}>
          <div style={{fontSize:12,fontWeight:700,color:C.dim,letterSpacing:.5,marginBottom:8}}>PAST PERFORMANCE vs 90% 6-WK ST TARGET</div>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
            <thead><tr style={{borderBottom:`2px solid ${C.border}`}}>
              {["Season","Units","6-wk ST","vs Target","Wks to Clear","Notes"].map(h=> (<th key={h} style={{textAlign:"left",padding:"8px 8px",fontSize:12,fontWeight:600,color:C.dim}}>{h}</th>))}
            </tr></thead>
            <tbody>{Object.entries(s.hist).sort((a,b)=>b[0].localeCompare(a[0])).map(([ssn,d])=> (<tr key={ssn} style={{borderBottom:`1px solid ${C.borderLight}`}}>
              <td style={{padding:"8px 8px",fontWeight:600,fontSize:13}}>{ssn}</td>
              <td style={{padding:"8px 8px",fontFamily:"monospace",fontSize:13}}>{d.u.toLocaleString()}</td>
              <td style={{padding:"8px 8px",fontWeight:600,color:d.st>=90?C.sage:d.st>=80?"#7A6B1A":C.terra,fontSize:13}}>{d.st}%</td>
              <td style={{padding:"8px 8px",fontSize:12,color:d.st>=90?C.sage:C.terra}}>{d.st>=90?"At target":d.st>=80?`${90-d.st}pts below`:`${90-d.st}pts below`}</td>
              <td style={{padding:"8px 8px",fontFamily:"monospace",fontSize:13}}>Wk {d.w}</td>
              <td style={{padding:"8px 8px",fontSize:12,color:C.dim,maxWidth:180}}>{d.n}</td>
            </tr>))}</tbody>
          </table>
        </div>}

        <div style={{marginTop:12}}>
          <div style={{fontSize:12,fontWeight:700,color:C.dim,letterSpacing:.5,marginBottom:8}}>COLOR ASSORTMENT</div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{s.colors.map(c=>{const clrMap={
            Black:"#1a1a1a",White:"#f5f5f5",Navy:"#1a2744",Sage:"#85A383",Blush:"#E8B4B8",
            "Dusty Rose":"#C4848A",Terracotta:"#C85A30",Ivory:"#FFFFF0",Cream:"#FFF8DC",
            Chambray:"#6B8BA4",Rust:"#B7410E",Charcoal:"#36454F",Olive:"#7A6B1A",Beige:"#D4C5A9",
            "Forest Green":"#2D5F2D",Wine:"#722F37",Emerald:"#2E8B57",
            "Sky Blue":"#87CEEB",Sand:"#C2B280",Pink:"#F4A6B8",Nude:"#E3BC9A",Grey:"#8E8E8E",
            "Black/White":"linear-gradient(135deg, #1a1a1a 50%, #f5f5f5 50%)",
            "Navy/Cream":"linear-gradient(135deg, #1a2744 50%, #FFF8DC 50%)",
            "Olive/White":"linear-gradient(135deg, #6B7B2B 50%, #f5f5f5 50%)",
            "Beige/Black":"linear-gradient(135deg, #D4C5A9 50%, #1a1a1a 50%)",
            "Olive/Cream":"linear-gradient(135deg, #6B7B2B 50%, #FFF8DC 50%)",
            "Blue Stripe":"repeating-linear-gradient(90deg, #6B8BA4 0px, #6B8BA4 2px, #f0f4f8 2px, #f0f4f8 5px)",
            "Botanical Print":"linear-gradient(135deg, #2D5F2D 30%, #85A383 60%, #C2B280 100%)",
            "Ditsy Floral":"linear-gradient(135deg, #F4A6B8 30%, #E8B4B8 60%, #85A383 100%)",
            "Botanical":"linear-gradient(135deg, #2D5F2D 30%, #85A383 60%, #C2B280 100%)",
            "Vintage Floral":"linear-gradient(135deg, #C4848A 30%, #D4C5A9 60%, #85A383 100%)",
            "Tropical":"linear-gradient(135deg, #2E8B57 30%, #87CEEB 60%, #F4A6B8 100%)",
            "Geometric":"linear-gradient(135deg, #1a2744 30%, #C85A30 60%, #FFF8DC 100%)",
          };const bg=clrMap[c.n]||C.sage;
            return (<div key={c.n} style={{padding:"10px 14px",background:C.warm,borderRadius:8,border:`1px solid ${C.borderLight}`,fontSize:13,display:"flex",alignItems:"center",gap:10,minWidth:120}}>
            <div style={{width:20,height:20,borderRadius:10,background:bg,border:(c.n==="White"||c.n==="Ivory"||c.n==="Cream"||c.n==="Nude")?`1px solid ${C.border}`:"none",flexShrink:0}}/>
            <div><div style={{fontWeight:600,fontSize:13}}>{c.n}</div>
            <div style={{color:C.dim,fontSize:12,marginTop:1}}>{(c.p*100).toFixed(0)}% · {Math.round(tot*c.p).toLocaleString()}u</div></div>
          </div>);})}</div>
        </div>

        <div style={{marginTop:12}}>
          <div style={{fontSize:12,fontWeight:700,color:C.dim,letterSpacing:.5,marginBottom:8}}>GRADE ALLOCATION <span style={{fontWeight:400,color:C.dimmer}}>· click grade to see store × size</span></div>
          {GRADES.filter(g=>s.ga[g]).map(g=>{const u=Math.round(tot*s.ga[g]);const sts=gradeStores(g);const per=sts.length?Math.round(u/sts.length):u;const pct=(s.ga[g]*100).toFixed(0);
            const gKey=s.id+":"+g;const isGO=gradeExp===gKey;const canDrill=sts.length>0;
            return (<div key={g}>
              <div onClick={canDrill?()=>setGradeExp(isGO?null:gKey):undefined} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:isGO?"none":`1px solid ${C.borderLight}`,cursor:canDrill?"pointer":"default"}}>
              <span style={{fontWeight:700,width:40,fontSize:14,color:C.green,display:"flex",alignItems:"center",gap:4}}>{canDrill&&<span style={{fontSize:10,color:C.dimmer,transition:"transform 0.15s",transform:isGO?"rotate(0deg)":"rotate(-90deg)",display:"inline-block"}}>{"\u25BE"}</span>}{g}</span>
              <div style={{flex:1,position:"relative",height:20,background:C.borderLight,borderRadius:4,overflow:"hidden"}}>
                <div style={{height:20,background:`linear-gradient(90deg, ${C.sage} 0%, #3D9B85 100%)`,borderRadius:4,width:`${s.ga[g]*100}%`,display:"flex",alignItems:"center",paddingLeft:8}}>
                  {s.ga[g]>=0.15&&<span style={{fontSize:11,fontWeight:600,color:"#fff"}}>{pct}%</span>}
                </div>
              </div>
              <span style={{fontFamily:"monospace",fontWeight:700,width:56,textAlign:"right",fontSize:14,color:C.green}}>{u.toLocaleString()}</span>
              <span style={{fontSize:12,color:C.dim,minWidth:100}}>{sts.length>0?`~${per}u × ${sts.length} stores`:g==="B/C"?`~${per}u × ~280 stores`:""}</span>
            </div>
            {isGO&&<div style={{padding:"8px 0 12px 0",borderBottom:`1px solid ${C.borderLight}`}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
                <thead><tr style={{borderBottom:`2px solid ${C.border}`,background:C.bgSub}}>
                  <th style={{textAlign:"left",padding:"6px 8px",fontSize:11,fontWeight:600,color:C.dim}}>Store</th>
                  <th style={{textAlign:"left",padding:"6px 8px",fontSize:11,fontWeight:600,color:C.dim}}>City</th>
                  {SIZES.map(sz=> (<th key={sz} style={{textAlign:"center",padding:"6px 4px",fontSize:11,fontWeight:600,color:C.dim,width:38}}>{sz}</th>))}
                  <th style={{textAlign:"right",padding:"6px 8px",fontSize:11,fontWeight:600,color:C.dim}}>Total</th>
                  <th style={{textAlign:"right",padding:"6px 8px",fontSize:11,fontWeight:600,color:C.dim}}>Value</th>
                </tr></thead>
                <tbody>{sts.map((st,ri)=>{const szArr=storeSizeSplit(per,st.sp);
                  return (<tr key={st.code} style={{borderBottom:`1px solid ${C.borderLight}`,background:ri%2===0?"#fff":C.bgSub}}>
                    <td style={{padding:"7px 8px"}}><div style={{fontWeight:600,fontSize:13}}>{st.name}</div><div style={{fontSize:10,color:C.dimmer}}>{st.code}</div></td>
                    <td style={{padding:"7px 8px",fontSize:12,color:C.dim}}>{st.city}</td>
                    {szArr.map((v,j)=> (<td key={j} style={{textAlign:"center",fontFamily:"monospace",fontSize:12,color:v>0?C.textMid:C.dimmer}}>{v}</td>))}
                    <td style={{textAlign:"right",fontFamily:"monospace",fontWeight:600,fontSize:13,color:C.green}}>{per}</td>
                    <td style={{textAlign:"right",fontSize:12,fontWeight:600,color:C.green}}>₹{((per*s.mrp)/1e3).toFixed(1)}K</td>
                  </tr>);
                })}</tbody>
                <tfoot><tr style={{borderTop:`2px solid ${C.border}`,background:C.bgSub}}>
                  <td colSpan={2} style={{padding:"7px 8px",fontWeight:700,fontSize:12,color:C.green}}>TOTAL ({sts.length} stores)</td>
                  {SIZES.map((sz,j)=>{const t=sts.reduce((a,st)=>a+storeSizeSplit(per,st.sp)[j],0);return (<td key={j} style={{textAlign:"center",fontFamily:"monospace",fontWeight:600,fontSize:12,color:C.green}}>{t}</td>);})}
                  <td style={{textAlign:"right",fontFamily:"monospace",fontWeight:700,fontSize:13,color:C.green}}>{u.toLocaleString()}</td>
                  <td style={{textAlign:"right",fontWeight:700,fontSize:12,color:C.green}}>₹{((u*s.mrp)/1e5).toFixed(1)}L</td>
                </tr></tfoot>
              </table>
              <div style={{marginTop:6,padding:"6px 10px",background:C.bgSub,borderRadius:4,fontSize:11,color:C.dimmer}}>
                Store-level size splits based on each store's POS size profile. Click any store's total to adjust.
              </div>
            </div>}
            </div>);
          })}
        </div>

        {editLog[s.id]?.length>0&&<div style={{marginTop:12}}>
          <div style={{fontSize:12,fontWeight:700,color:C.dim,letterSpacing:.5,marginBottom:6}}>EDIT LOG</div>
          {editLog[s.id].map((e,i)=> (<div key={i} style={{fontSize:12,color:C.textMid,padding:"4px 0",borderBottom:`1px solid ${C.borderLight}`}}>
            <span style={{fontFamily:"monospace"}}>{e.from.toLocaleString()} → {e.to.toLocaleString()}</span> · {e.sc} · <span style={{color:C.dim}}>{e.reason}</span> <span style={{color:C.dimmer}}>{e.t}</span>
          </div>))}
        </div>}
      </div>}
    </div>);
  };

  /* ═══ STORE CARD ═══ */
  const StoreCard=({st})=>{const isO=stExp===st.code;
    return (<div style={{background:"#fff",borderRadius:8,border:`1px solid ${isO?C.sage+"44":C.border}`,marginBottom:4}}>
      <div onClick={()=>setStExp(isO?null:st.code)} style={{padding:"12px 20px",cursor:"pointer",display:"flex",alignItems:"center",gap:14}}>
        <div style={{flex:1}}><div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:14,fontWeight:600}}>{st.name}</span><span style={{fontSize:11,padding:"2px 6px",borderRadius:3,background:st.grade==="A+"?C.sageSoft:C.warm,color:st.grade==="A+"?C.sage:C.dim}}>{st.grade}</span></div><div style={{fontSize:12,color:C.dim}}>{st.code} · {st.city}</div></div>
        <div style={{display:"flex",gap:16,alignItems:"center",flexShrink:0}}>
          <div style={{textAlign:"right"}}><div style={{fontSize:11,color:C.dimmer}}>Styles</div><div style={{fontSize:14,fontWeight:600}}>{st.sc}</div></div>
          <div style={{textAlign:"right"}}><div style={{fontSize:11,color:C.dimmer}}>Units</div><div style={{fontSize:14,fontWeight:700,color:C.green,fontFamily:"monospace"}}>{st.tu.toLocaleString()}</div></div>
          <div style={{textAlign:"right"}}><div style={{fontSize:11,color:C.dimmer}}>Value</div><div style={{fontSize:14,fontWeight:600}}>₹{(st.tv/1e5).toFixed(1)}L</div></div>
          <span style={{fontSize:11,color:C.dimmer}}>{isO?"▾":"▸"}</span>
        </div>
      </div>
      {isO&&<div style={{padding:"0 20px 16px",borderTop:`1px solid ${C.borderLight}`}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:13,marginTop:10}}><thead><tr style={{borderBottom:`2px solid ${C.border}`}}>
          {["Style","Cat"].map(h=> (<th key={h} style={{textAlign:"left",padding:"6px 8px",fontSize:12,color:C.dim,fontWeight:600}}>{h}</th>))}
          {SIZES.map(sz=> (<th key={sz} style={{textAlign:"center",padding:"6px 4px",fontSize:12,color:C.dim,fontWeight:600,width:40}}>{sz}</th>))}
          {["Total","Value"].map(h=> (<th key={h} style={{textAlign:"right",padding:"6px 8px",fontSize:12,color:C.dim,fontWeight:600}}>{h}</th>))}
        </tr></thead><tbody>{st.sl.sort((a,b)=>b.units-a.units).map(x=>{const szU=x.oneSize?null:storeSizeSplit(x.units,st.sp);return (<tr key={x.id} style={{borderBottom:`1px solid ${C.borderLight}`}}>
          <td style={{padding:"6px 8px"}}><div style={{fontWeight:500,fontSize:13}}>{x.name}</div><div style={{fontSize:10,color:C.dimmer,fontFamily:"monospace"}}>{x.id}</div></td>
          <td style={{color:C.dim,fontSize:12}}>{x.sub}</td>
          {szU?szU.map((v,j)=> (<td key={j} style={{textAlign:"center",fontFamily:"monospace",color:C.dim,fontSize:13}}>{v}</td>)):SIZES.map((_,j)=> (<td key={j} style={{textAlign:"center",color:C.dimmer,fontSize:10}}>{j===2?"OS":""}</td>))}
          <td style={{textAlign:"right",fontFamily:"monospace",fontWeight:600,fontSize:13}}>{x.units}</td>
          <td style={{textAlign:"right",fontWeight:600,color:C.green,fontSize:13}}>₹{((x.units*x.mrp)/1e3).toFixed(0)}K</td>
        </tr>);})}</tbody>
        <tfoot><tr style={{borderTop:`2px solid ${C.border}`}}><td colSpan={2} style={{padding:"6px 8px",fontWeight:700,color:C.green,fontSize:13}}>TOTAL</td>
          {SIZES.map((sz,j)=>{const t=st.sl.reduce((a,x)=>x.oneSize?a:a+storeSizeSplit(x.units,st.sp)[j],0);return (<td key={j} style={{textAlign:"center",fontFamily:"monospace",fontWeight:600,color:C.green,fontSize:12}}>{t}</td>);})}
          <td style={{textAlign:"right",fontFamily:"monospace",fontWeight:700,color:C.green,fontSize:13}}>{st.tu.toLocaleString()}</td>
          <td style={{textAlign:"right",fontWeight:700,color:C.green,fontSize:13}}>₹{(st.tv/1e5).toFixed(1)}L</td>
        </tr></tfoot></table>
        <div style={{marginTop:10,padding:"8px 12px",background:C.bgSub,borderRadius:4,border:`1px solid ${C.borderLight}`,display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontSize:10,fontWeight:700,color:C.dim,letterSpacing:.5}}>SIZE PROFILE</span>
          {SIZES.map(sz=> (<span key={sz} style={{fontSize:12}}><span style={{color:C.dim}}>{sz}</span> <span style={{fontWeight:600}}>{(st.sp[sz]*100).toFixed(0)}%</span></span>))}
        </div>
      </div>}
    </div>);
  };

  /* ═══ PAST SEASON DATA ═══ */
  const PAST_SEASONS={
    AW25:{label:"Autumn Winter 2025",status:"Live",statusColor:C.sage,statusBg:C.sageSoft,statusBd:C.sageBorder,
      styles:22,units:"11.2K",budget:"₹3.6Cr",margin:"57.1%",stAvg:"76%",week:"Week 14/22",
      topStyles:[
        {name:"Single-Button Blazer",id:"AW25-BZ-001",sub:"Blazers",planned:380,sold:312,st:82,revenue:"₹15.6L"},
        {name:"Wide-Leg Trouser",id:"AW25-TR-001",sub:"Trousers",planned:620,sold:502,st:81,revenue:"₹12.5L"},
        {name:"V-Neck Jumpsuit (Test)",id:"AW25-JM-001",sub:"Jumpsuits",planned:120,sold:109,st:91,revenue:"₹4.4L"},
        {name:"Knit Polo (Test)",id:"AW25-TP-001",sub:"Tops",planned:120,sold:103,st:86,revenue:"₹2.4L"},
        {name:"Utility Jacket",id:"AW25-TP-002",sub:"Tops",planned:220,sold:167,st:76,revenue:"₹6.7L"},
        {name:"Double-Breasted Blazer",id:"AW25-BZ-002",sub:"Blazers",planned:400,sold:288,st:72,revenue:"₹12.9L"},
      ],
      topStores:[
        {name:"Flagship One",code:"FL01",grade:"A+",styles:22,units:186,value:"₹6.8L",st:"84%"},
        {name:"Flagship Three",code:"FL03",grade:"A+",styles:22,units:174,value:"₹6.2L",st:"82%"},
        {name:"Flagship Two",code:"FL02",grade:"A+",styles:22,units:168,value:"₹6.0L",st:"81%"},
        {name:"Flagship Five",code:"FL05",grade:"A+",styles:22,units:162,value:"₹5.8L",st:"80%"},
        {name:"Flagship Four",code:"FL04",grade:"A+",styles:22,units:158,value:"₹5.6L",st:"79%"},
        {name:"Premium Five",code:"PR05",grade:"A",styles:20,units:124,value:"₹4.2L",st:"76%"},
      ]},
    SS25:{label:"Spring Summer 2025",status:"Complete",statusColor:C.dim,statusBg:C.cream,statusBd:C.border,
      styles:20,units:"10.4K",budget:"₹3.2Cr",margin:"58.2%",stAvg:"81%",week:"Final",
      topStyles:[
        {name:"Linen Wrap Dress",id:"SS25-DR-001",sub:"Dresses",planned:500,sold:465,st:93,revenue:"₹18.6L"},
        {name:"Rib Tank Top",id:"SS25-TP-001",sub:"Tops",planned:1300,sold:1170,st:90,revenue:"₹11.6L"},
        {name:"Relaxed Linen Shirt",id:"SS25-TP-002",sub:"Tops",planned:860,sold:757,st:88,revenue:"₹14.3L"},
        {name:"Wide-Leg Trouser",id:"SS25-TR-001",sub:"Trousers",planned:700,sold:602,st:86,revenue:"₹15.0L"},
        {name:"Pleated Midi Skirt",id:"SS25-SK-001",sub:"Skirts",planned:520,sold:442,st:85,revenue:"₹10.1L"},
        {name:"Stripe Midi Dress",id:"SS25-DR-002",sub:"Dresses",planned:540,sold:508,st:94,revenue:"₹22.8L"},
      ],
      topStores:[
        {name:"Flagship One",code:"FL01",grade:"A+",styles:20,units:172,value:"₹6.4L",st:"88%"},
        {name:"Flagship Three",code:"FL03",grade:"A+",styles:20,units:164,value:"₹6.0L",st:"86%"},
        {name:"Flagship Two",code:"FL02",grade:"A+",styles:20,units:160,value:"₹5.8L",st:"85%"},
        {name:"Flagship Five",code:"FL05",grade:"A+",styles:20,units:154,value:"₹5.6L",st:"84%"},
        {name:"Flagship Four",code:"FL04",grade:"A+",styles:20,units:148,value:"₹5.4L",st:"83%"},
        {name:"Premium Nine",code:"PR09",grade:"A",styles:18,units:118,value:"₹4.0L",st:"80%"},
      ]},
    AW24:{label:"Autumn Winter 2024",status:"Complete",statusColor:C.dim,statusBg:C.cream,statusBd:C.border,
      styles:18,units:"9.8K",budget:"₹3.1Cr",margin:"55.8%",stAvg:"78%",week:"Final",
      topStyles:[
        {name:"Wool Blend Blazer",id:"AW24-BZ-001",sub:"Blazers",planned:360,sold:296,st:82,revenue:"₹14.8L"},
        {name:"Knit Midi Dress",id:"AW24-DR-001",sub:"Dresses",planned:420,sold:336,st:80,revenue:"₹13.4L"},
        {name:"Corduroy Wide-Leg Trouser",id:"AW24-TR-001",sub:"Trousers",planned:380,sold:292,st:77,revenue:"₹7.3L"},
        {name:"Quilted Jacket",id:"AW24-JK-001",sub:"Jackets",planned:280,sold:210,st:75,revenue:"₹10.5L"},
        {name:"Turtleneck Sweater",id:"AW24-TP-001",sub:"Tops",planned:520,sold:374,st:72,revenue:"₹5.6L"},
      ],
      topStores:[
        {name:"Flagship One",code:"FL01",grade:"A+",styles:18,units:158,value:"₹5.8L",st:"82%"},
        {name:"Flagship Three",code:"FL03",grade:"A+",styles:18,units:148,value:"₹5.4L",st:"80%"},
        {name:"Flagship Two",code:"FL02",grade:"A+",styles:18,units:142,value:"₹5.2L",st:"79%"},
        {name:"Flagship Four",code:"FL04",grade:"A+",styles:18,units:136,value:"₹5.0L",st:"78%"},
        {name:"Premium Five",code:"PR05",grade:"A",styles:16,units:108,value:"₹3.8L",st:"74%"},
      ]},
    SS24:{label:"Spring Summer 2024",status:"Complete",statusColor:C.dim,statusBg:C.cream,statusBd:C.border,
      styles:16,units:"8.6K",budget:"₹2.7Cr",margin:"54.2%",stAvg:"74%",week:"Final",
      topStyles:[
        {name:"Cotton Shirt Dress",id:"SS24-DR-001",sub:"Dresses",planned:480,sold:365,st:76,revenue:"₹14.6L"},
        {name:"Linen Palazzo Trouser",id:"SS24-TR-001",sub:"Trousers",planned:400,sold:296,st:74,revenue:"₹7.4L"},
        {name:"Printed Co-ord Set",id:"SS24-CO-001",sub:"Co-ords",planned:300,sold:228,st:76,revenue:"₹9.1L"},
        {name:"Rib Tank Top",id:"SS24-TP-001",sub:"Tops",planned:680,sold:490,st:72,revenue:"₹4.8L"},
        {name:"Button-Down Shirt",id:"SS24-TP-002",sub:"Tops",planned:520,sold:374,st:72,revenue:"₹7.1L"},
      ],
      topStores:[
        {name:"Flagship One",code:"FL01",grade:"A+",styles:16,units:142,value:"₹5.2L",st:"80%"},
        {name:"Flagship Three",code:"FL03",grade:"A+",styles:16,units:134,value:"₹4.8L",st:"78%"},
        {name:"Flagship Two",code:"FL02",grade:"A+",styles:16,units:128,value:"₹4.6L",st:"76%"},
        {name:"Flagship Five",code:"FL05",grade:"A+",styles:16,units:122,value:"₹4.4L",st:"75%"},
        {name:"Premium Nine",code:"PR09",grade:"A",styles:14,units:96,value:"₹3.2L",st:"72%"},
      ]},
  };

  var pastSignals={
    AW25:[
      {tag:"LIVE",clr:C.sage,title:"V-Neck Jumpsuit test is outperforming — 91% ST at Week 14, validating the format",body:"120-unit test buy. Now the highest-ST style in AW25. Jumpsuit format confirmed for SS26 expansion. The cross-category signal (relaxed fit + occasion wear) is the insight, not just the silhouette."},
      {tag:"WATCH",clr:C.amber,title:"Double-breasted blazer dragging portfolio — 72% ST, 288 of 400 units sold",body:"Outsold 3:1 by single-button in the same season. Customer preference has structurally shifted to relaxed silhouettes. SS26 plan does not include double-breasted. Single-button scaled to 520 units instead."},
      {tag:"CONFIRMED",clr:C.sage,title:"Olive blazer at 88% ST — strongest colour signal going into SS26",body:"First olive piece in range. 82% ST vs 76% for the same blazer in black-only season. This single data point justified 4 olive colourways in the SS26 plan."},
    ],
    SS25:[
      {tag:"OUTCOME",clr:C.sage,title:"Linen wrap dress was the standout — 93% ST, sold out by Week 5 in A+",body:"500 units, Rs 18.6L revenue. M stocked out in 8 of 12 A+ stores. This drove the SS26 decision to scale to 760 units (+52%) with corrected M curve. The best style in any season to date."},
      {tag:"OUTCOME",clr:C.terra,title:"Sage colour underperformed across 3 styles — 64% avg ST vs 85% for other colours",body:"Sage required 30% markdown to clear. Replaced by olive in SS26 plan across Stripe Midi, Oversized Shirt, and Pleated Skirt. This single colour swap improves projected portfolio ST by 2pp."},
      {tag:"LEARNING",clr:C.copper,title:"M size was systematically under-allocated — 41% of demand vs 35% planned",body:"SS25 actuals: M was 41% of sales across all styles. Plan had 35%. XL was 6% of sales vs 10% planned (38% residual). SS26 corrected the curve to M 38%, XL 8%. Validated even in North stores where L/XL index higher."},
    ],
    AW24:[
      {tag:"OUTCOME",clr:C.amber,title:"First season with structured blazers — 82% ST on wool blend, but sizing ran large",body:"360 units. ST was solid but return rate was 14% (vs 8% avg) due to sizing. Led to size curve recalibration for all blazers from AW25 onwards. The blazer category has improved every season since."},
      {tag:"LEARNING",clr:C.copper,title:"Turtleneck sweater at 72% ST confirmed knitwear is not a strength for this brand",body:"520 units, needed 25% markdown. Repeat purchase rate for knitwear buyers was 22% vs 38% for woven. SS25 and SS26 both reduced knitwear allocation. The brand's identity is woven, not knit."},
    ],
    SS24:[
      {tag:"OUTCOME",clr:C.amber,title:"First season on the platform — 74% avg ST established the baseline",body:"16 styles, Rs 2.7Cr. Every subsequent season has improved: AW24 78%, SS25 81%, AW25 tracking 76%. The platform's size curve and grade allocation improvements account for 5-7pp of that improvement."},
      {tag:"LEARNING",clr:C.copper,title:"Printed co-ord set at 76% ST showed co-ords work — but only at the right price",body:"Rs 2,990 co-ord hit 76% ST. This gave confidence for the Cotton Solid Co-ord in SS25 (78% ST at same price) and the premium Linen Co-ord in SS26 (Rs 5,990, untested price). Each season tests one step up."},
    ],
  };

  /* ═══ SEASONS HOMEPAGE ═══ */
  const SeasonsHome=()=>{
    const seasons=[
      {id:"SS26",label:"Spring Summer 2026",status:"New Season",statusColor:C.terra,statusBg:C.terraSoft,statusBd:C.terraBorder,
        styles:styles.length,units:totU.toLocaleString(),budget:`₹${(totV/1e7).toFixed(1)}Cr`,margin:"58.4%",extra:`${styles.filter(s=>s.src==="carryover").length} carryover, ${styles.filter(s=>s.src==="new-design").length} new design`,action:"plan"},
      {id:"AW25",label:"Autumn Winter 2025",status:PAST_SEASONS.AW25.status,statusColor:PAST_SEASONS.AW25.statusColor,statusBg:PAST_SEASONS.AW25.statusBg,statusBd:PAST_SEASONS.AW25.statusBd,
        styles:PAST_SEASONS.AW25.styles,units:PAST_SEASONS.AW25.units,budget:PAST_SEASONS.AW25.budget,margin:PAST_SEASONS.AW25.margin,extra:PAST_SEASONS.AW25.week+` · Avg ST ${PAST_SEASONS.AW25.stAvg}`,action:"past"},
      {id:"SS25",label:"Spring Summer 2025",status:PAST_SEASONS.SS25.status,statusColor:PAST_SEASONS.SS25.statusColor,statusBg:PAST_SEASONS.SS25.statusBg,statusBd:PAST_SEASONS.SS25.statusBd,
        styles:PAST_SEASONS.SS25.styles,units:PAST_SEASONS.SS25.units,budget:PAST_SEASONS.SS25.budget,margin:PAST_SEASONS.SS25.margin,extra:`Avg ST ${PAST_SEASONS.SS25.stAvg}`,action:"past"},
      {id:"AW24",label:"Autumn Winter 2024",status:"Complete",statusColor:C.dim,statusBg:C.cream,statusBd:C.border,
        styles:18,units:"9.8K",budget:"₹3.1Cr",margin:"55.8%",extra:"Avg ST 78%",action:"past"},
      {id:"SS24",label:"Spring Summer 2024",status:"Complete",statusColor:C.dim,statusBg:C.cream,statusBd:C.border,
        styles:16,units:"8.6K",budget:"₹2.7Cr",margin:"54.2%",extra:"Avg ST 74%",action:"past"},
    ];
    return (<Shell extra={null}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=DM+Serif+Display:ital@0;1&family=Source+Serif+4:wght@300;400;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet"/>
      <div style={{maxWidth:1100,padding:"36px 36px 64px"}}>
        <div style={{borderRadius:14,overflow:"hidden",marginBottom:36,border:"1px solid "+C.border}}>
          {/* ── Dark hero zone ── */}
          <div onClick={function(){setView("plan");setSeason("SS26");}} style={{background:"linear-gradient(135deg, "+C.green+" 0%, #1A3D28 100%)",padding:"32px 32px 28px",cursor:"pointer",color:"#fff",position:"relative"}}>
            <div style={{position:"absolute",top:0,right:0,width:200,height:200,background:"radial-gradient(circle, rgba(133,163,131,0.15) 0%, transparent 70%)"}}/>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
              <div>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}><span style={{fontSize:10,padding:"3px 12px",borderRadius:100,fontWeight:600,background:"rgba(223,118,73,0.25)",color:"#F8A87A",border:"1px solid rgba(223,118,73,0.3)",fontFamily:mono,letterSpacing:"0.04em"}}>{seasons[0].status}</span></div>
                <div style={{fontSize:26,fontWeight:700,fontFamily:serif}}>{seasons[0].label}</div>
                <div style={{fontSize:13,opacity:.6,marginTop:3}}>{seasons[0].extra}</div>
              </div>
              <div style={{display:"inline-flex",alignItems:"center",gap:6,padding:"10px 22px",background:"rgba(255,255,255,0.12)",borderRadius:100,border:"1px solid rgba(255,255,255,0.15)",fontWeight:600,fontSize:13,backdropFilter:"blur(4px)"}}>Finalize Buy Plan <span style={{fontSize:15}}>→</span></div>
            </div>
            <div style={{display:"flex",gap:36}}>{[{label:"Styles",value:seasons[0].styles},{label:"Total Units",value:seasons[0].units},{label:"OTB Budget",value:seasons[0].budget}].map(function(m){return <div key={m.label}><div style={{fontSize:9,opacity:.4,fontWeight:500,letterSpacing:"0.08em",fontFamily:mono}}>{m.label.toUpperCase()}</div><div style={{fontSize:20,fontWeight:700,marginTop:4}}>{m.value}</div></div>;})}</div>
          </div>

          {/* ── Signals zone (same card, white bg) ── */}
          <div style={{background:C.bg}}>
            <div style={{padding:"16px 32px 12px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid "+C.borderLight}}>
              <span style={{fontSize:9,fontWeight:600,letterSpacing:"0.12em",color:C.dimmer,fontFamily:mono}}>SEASON SIGNALS</span>
              <span style={{fontSize:9,fontFamily:mono,color:C.dimmer,letterSpacing:"0.06em"}}>{signals.length} ACTIVE</span>
            </div>
            {signals.map(function(sig,si){return <div key={sig.id}>
              <div style={{padding:"16px 32px",borderBottom:si<signals.length-1?"1px solid "+C.borderLight:"none"}}>
                <div style={{display:"flex",alignItems:"flex-start",gap:14}}>
                  <div style={{width:3,height:38,borderRadius:2,background:sig.clr,flexShrink:0,marginTop:2}}/>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:5}}>
                      <span style={{fontSize:9,fontWeight:600,letterSpacing:"0.1em",color:sig.clr,fontFamily:mono}}>{sig.tag}</span>
                    </div>
                    <div style={{fontSize:14,fontWeight:600,color:C.text,lineHeight:1.4,marginBottom:4}}>{sig.title}</div>
                    <div style={{fontSize:12,color:C.dim,lineHeight:1.6}}>{sig.body}</div>
                    <button onClick={function(){openSig(si);}} style={{marginTop:10,display:"inline-flex",alignItems:"center",gap:6,padding:"5px 16px",background:sigOpen===si?C.green:"transparent",color:sigOpen===si?"#fff":C.sage,border:"1px solid "+(sigOpen===si?C.green:C.sageBorder),borderRadius:100,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:font,transition:"all 0.15s"}}>
                      <div style={{width:13,height:13,borderRadius:7,background:sigOpen===si?"rgba(255,255,255,0.25)":C.sage,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{color:"#fff",fontSize:7,fontWeight:700}}>q</span></div>
                      Dig deeper
                    </button>
                  </div>
                </div>
                {sigOpen===si&&sigChats[si]&&<div style={{marginTop:14,marginLeft:17,background:C.bgSub,borderRadius:8,border:"1px solid "+C.borderLight,overflow:"hidden"}}>
                  <div style={{padding:"14px 18px",maxHeight:260,overflowY:"auto"}}>
                    {sigChats[si].msgs.map(function(msg,mi){return <div key={mi} style={{marginBottom:10}}>
                      {msg.role==="wait"?<div style={{display:"flex",gap:8,alignItems:"center"}}><div style={{width:18,height:18,borderRadius:9,background:C.sage,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{color:"#fff",fontSize:7,fontWeight:700}}>q</span></div><span style={{fontSize:12,color:C.dimmer}}>Thinking...</span></div>
                      :msg.role==="ai"?<div style={{display:"flex",gap:8,alignItems:"flex-start"}}><div style={{width:18,height:18,borderRadius:9,background:C.sage,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}><span style={{color:"#fff",fontSize:7,fontWeight:700}}>q</span></div><div style={{fontSize:12,lineHeight:1.65,color:C.dim,flex:1}}>{msg.text}</div></div>
                      :<div style={{display:"flex",justifyContent:"flex-end"}}><div style={{padding:"8px 12px",background:C.green,color:"#fff",borderRadius:8,fontSize:12,lineHeight:1.4,maxWidth:"85%"}}>{msg.text}</div></div>}
                    </div>;})}
                    {sigChats[si].chips.length>0&&<div style={{display:"flex",flexWrap:"wrap",gap:6,marginTop:6}}>
                      {sigChats[si].chips.map(function(ch,ci){return <button key={ci} onClick={function(){sendSig(si,ch);}} style={{padding:"5px 14px",background:C.bg,border:"1px solid "+C.border,borderRadius:100,fontSize:10,color:C.dim,cursor:"pointer",fontFamily:font,transition:"all 0.15s"}}
                        onMouseEnter={function(e){e.currentTarget.style.borderColor=C.sage;e.currentTarget.style.color=C.sage;}}
                        onMouseLeave={function(e){e.currentTarget.style.borderColor=C.border;e.currentTarget.style.color=C.dim;}}
                      >{ch}</button>;})}
                    </div>}
                  </div>
                  <div style={{padding:"10px 18px",borderTop:"1px solid "+C.borderLight,display:"flex",gap:6}}>
                    <input type="text" value={sigOpen===si?sigInput:""} onChange={function(e){setSigInput(e.target.value);}} onKeyPress={function(e){if(e.key==="Enter")sendSig(si,sigInput);}} placeholder="Ask about this signal..." style={{flex:1,padding:"7px 12px",border:"1px solid "+C.border,borderRadius:100,fontSize:11,fontFamily:font,outline:"none",background:C.bg}}/>
                    <button onClick={function(){sendSig(si,sigInput);}} style={{padding:"7px 14px",background:C.green,color:"#fff",border:"none",borderRadius:100,cursor:"pointer",display:"flex",alignItems:"center"}}><Send size={12} strokeWidth={2}/></button>
                  </div>
                </div>}
              </div>
            </div>;})}
          </div>
        </div>

        <div style={{fontSize:9,fontWeight:600,color:C.dimmer,letterSpacing:"0.12em",fontFamily:mono,marginBottom:14}}>PAST SEASONS</div>
        <div style={{borderRadius:10,border:`1px solid ${C.border}`,overflow:"hidden"}}>
          {seasons.slice(1).map((s,i)=> (<div key={s.id} onClick={()=>{setView("past");setSeason(s.id);setPastTab("style");}} style={{padding:"18px 24px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:i<seasons.length-2?`1px solid ${C.borderLight}`:"none",background:i%2===0?C.bg:C.bgSub,transition:"background 0.15s"}}>
            <div style={{display:"flex",alignItems:"center",gap:14}}>
              <span style={{fontSize:17,fontWeight:700,color:C.green,fontFamily:serif,width:48}}>{s.id}</span>
              <div><div style={{fontSize:14,fontWeight:500,color:C.text}}>{s.label}</div><div style={{fontSize:12,color:C.dimmer,marginTop:1}}>{s.extra}</div>
                {pastSignals[s.id]&&pastSignals[s.id][0]&&<div style={{fontSize:11,color:C.dim,marginTop:6,display:"flex",alignItems:"flex-start",gap:6,maxWidth:600}}><div style={{width:3,minHeight:14,borderRadius:1,background:pastSignals[s.id][0].clr,flexShrink:0,marginTop:1}}/><span style={{lineHeight:1.5}}>{pastSignals[s.id][0].title}</span></div>}
              </div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:28}}>
              <span style={{fontSize:12,padding:"3px 10px",borderRadius:20,fontWeight:600,color:s.statusColor,background:s.statusBg,border:`1px solid ${s.statusBd}`}}>{s.status}</span>
              {[{l:"Styles",v:s.styles},{l:"Units",v:s.units},{l:"Budget",v:s.budget}].map(m=> (<div key={m.l} style={{textAlign:"right",minWidth:56}}><div style={{fontSize:10,color:C.dimmer}}>{m.l}</div><div style={{fontSize:14,fontWeight:600,color:C.green}}>{m.v}</div></div>))}
              <span style={{color:C.dimmer,fontSize:12}}>→</span>
            </div>
          </div>))}
        </div>
      </div>
    </Shell>);
  };

  /* ═══ PAST SEASON VIEW ═══ */
  const PastSeasonView=()=>{
    const ps=PAST_SEASONS[season];if(!ps)return null;
    return (<Shell extra={<div style={{display:"flex",alignItems:"center",gap:10}}>
        <span style={{fontSize:10,padding:"3px 10px",borderRadius:100,fontWeight:600,background:C.sageSoft,color:C.sage,fontFamily:mono}}>{ps.status}{ps.week!=="Final"?" "+ps.week:""}</span>
        <span style={{fontSize:11,color:C.dim}}>Avg ST: <b>{ps.stAvg}</b></span>
      </div>}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=DM+Serif+Display:ital@0;1&family=Source+Serif+4:wght@300;400;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet"/>
      <div style={{maxWidth:1100,padding:"28px 36px"}}>
        <button onClick={()=>{setView("seasons");setSeason(null);}} style={{fontSize:12,color:C.sage,fontWeight:600,background:"none",border:"none",cursor:"pointer",padding:0,marginBottom:8,fontFamily:font}}>← All Seasons</button>
        <div style={{fontSize:22,fontWeight:600,fontFamily:serif}}>{ps.label}</div>
        <div style={{fontSize:13,color:C.dim,marginTop:3}}>{ps.styles} styles · {ps.units} units · {ps.budget}</div>

        {pastSignals[season]&&pastSignals[season].length>0&&<div style={{background:C.bg,borderRadius:10,border:"1px solid "+C.border,marginTop:20,marginBottom:20,overflow:"hidden"}}>
          <div style={{padding:"14px 24px 10px",borderBottom:"1px solid "+C.borderLight,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <span style={{fontSize:9,fontWeight:600,letterSpacing:"0.12em",color:C.dimmer,fontFamily:mono}}>WHAT HAPPENED</span>
            <span style={{fontSize:9,fontFamily:mono,color:C.dimmer}}>{pastSignals[season].length} SIGNALS</span>
          </div>
          {pastSignals[season].map(function(sig,si){
            var sc=sig.clr;
            return <div key={si} style={{padding:"14px 24px",borderBottom:si<pastSignals[season].length-1?"1px solid "+C.borderLight:"none"}}>
              <div style={{display:"flex",alignItems:"flex-start",gap:12}}>
                <div style={{width:3,height:32,borderRadius:2,background:sc,flexShrink:0,marginTop:2}}/>
                <div>
                  <span style={{fontSize:9,fontWeight:600,letterSpacing:"0.1em",color:sc,fontFamily:mono}}>{sig.tag}</span>
                  <div style={{fontSize:13,fontWeight:600,color:C.text,lineHeight:1.4,marginTop:4}}>{sig.title}</div>
                  <div style={{fontSize:12,color:C.dim,lineHeight:1.6,marginTop:3}}>{sig.body}</div>
                </div>
              </div>
            </div>;
          })}
        </div>}

        <div style={{display:"flex",gap:0,marginTop:20,marginBottom:18,borderBottom:`2px solid ${C.borderLight}`}}>{[{k:"style",l:"By Style"},{k:"store",l:"By Store"}].map(t=> (<button key={t.k} onClick={()=>setPastTab(t.k)} style={{padding:"10px 24px",borderRadius:0,border:"none",borderBottom:pastTab===t.k?`2px solid ${C.green}`:"2px solid transparent",background:"transparent",color:pastTab===t.k?C.green:C.dim,fontWeight:pastTab===t.k?700:500,fontSize:14,cursor:"pointer",fontFamily:font,marginBottom:-2,transition:"all 0.15s"}}>{t.l}</button>))}</div>

        {pastTab==="style"&&<div>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:14}}>
            <thead><tr style={{borderBottom:`2px solid ${C.border}`,background:C.bgSub}}>
              {["Style","Category","Planned","Sold","6-wk ST","vs 90%","Revenue"].map(h=> (<th key={h} style={{textAlign:"left",padding:"10px 12px",fontSize:12,fontWeight:600,color:C.dim}}>{h}</th>))}
            </tr></thead>
            <tbody>{ps.topStyles.map((s,ri)=> (<tr key={s.id} style={{borderBottom:`1px solid ${C.borderLight}`,background:ri%2===0?"#fff":C.bgSub}}>
              <td style={{padding:"10px 12px"}}><div style={{fontWeight:600,fontSize:14}}>{s.name}</div><div style={{fontSize:11,color:C.dimmer,fontFamily:"monospace"}}>{s.id}</div></td>
              <td style={{padding:"10px 12px",fontSize:13,color:C.dim}}>{s.sub}</td>
              <td style={{padding:"10px 12px",fontFamily:"monospace",fontSize:14,color:C.dim}}>{s.planned.toLocaleString()}</td>
              <td style={{padding:"10px 12px",fontFamily:"monospace",fontWeight:600,fontSize:14}}>{s.sold.toLocaleString()}</td>
              <td style={{padding:"10px 12px"}}><span style={{fontWeight:600,padding:"2px 8px",borderRadius:4,fontSize:13,background:s.st>=90?C.sageSoft:s.st>=80?"#F0F2E6":C.terraSoft,color:s.st>=90?C.sage:s.st>=80?"#7A6B1A":C.terra}}>{s.st}%</span></td>
              <td style={{padding:"10px 12px",fontSize:12,color:s.st>=90?C.sage:C.terra}}>{s.st>=90?"At target":`${90-s.st}pts below`}</td>
              <td style={{padding:"10px 12px",fontWeight:600,color:C.green,fontSize:14}}>{s.revenue}</td>
            </tr>))}</tbody>
          </table>
          <div style={{marginTop:12,fontSize:12,color:C.dimmer}}>Showing top {ps.topStyles.length} styles by sell-through. Full data available in source systems.</div>
        </div>}

        {pastTab==="store"&&<div>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:14}}>
            <thead><tr style={{borderBottom:`2px solid ${C.border}`,background:C.bgSub}}>
              {["Store","Grade","Styles","Units","Value","Avg ST"].map(h=> (<th key={h} style={{textAlign:"left",padding:"10px 12px",fontSize:12,fontWeight:600,color:C.dim}}>{h}</th>))}
            </tr></thead>
            <tbody>{ps.topStores.map((s,ri)=> (<tr key={s.code} style={{borderBottom:`1px solid ${C.borderLight}`,background:ri%2===0?"#fff":C.bgSub}}>
              <td style={{padding:"10px 12px"}}><div style={{fontWeight:600,fontSize:14}}>{s.name}</div><div style={{fontSize:11,color:C.dimmer}}>{s.code}</div></td>
              <td style={{padding:"10px 12px"}}><span style={{fontSize:12,padding:"2px 8px",borderRadius:4,background:s.grade==="A+"?C.sageSoft:C.warm,color:s.grade==="A+"?C.sage:C.dim,fontWeight:600}}>{s.grade}</span></td>
              <td style={{padding:"10px 12px",fontSize:14}}>{s.styles}</td>
              <td style={{padding:"10px 12px",fontFamily:"monospace",fontWeight:600,fontSize:14}}>{s.units.toLocaleString()}</td>
              <td style={{padding:"10px 12px",fontWeight:600,color:C.green,fontSize:14}}>{s.value}</td>
              <td style={{padding:"10px 12px"}}><span style={{fontWeight:600,padding:"2px 8px",borderRadius:4,fontSize:13,background:parseInt(s.st)>=85?C.sageSoft:parseInt(s.st)>=78?"#F0F2E6":C.terraSoft,color:parseInt(s.st)>=85?C.sage:parseInt(s.st)>=78?"#7A6B1A":C.terra}}>{s.st}</span></td>
            </tr>))}</tbody>
          </table>
          <div style={{marginTop:12,fontSize:12,color:C.dimmer}}>Showing top {ps.topStores.length} stores by units. B/C stores aggregated in source systems.</div>
        </div>}
      </div>
    </Shell>);
  };

  /* ═══ ROUTER ═══ */
  if(view==="seasons") return (<SeasonsHome/>);
  if(view==="past") return (<PastSeasonView/>);

  /* ═══ PLAN VIEW (SS26) ═══ */
  return (<Shell extra={<span style={{fontSize:10,padding:"4px 12px",borderRadius:100,fontWeight:600,background:C.sageSoft,color:C.sage,fontFamily:mono,letterSpacing:"0.02em"}}>Target: 6-wk ST above 90%</span>}>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=DM+Serif+Display:ital@0;1&family=Source+Serif+4:wght@300;400;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet"/>
    <ScenarioModal/><TrailModal/><StoreEditModal/>
    {questt&&<div onClick={()=>setQuestt(false)} style={{position:"fixed",inset:0,zIndex:90,background:"rgba(27,42,33,.35)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#fff",borderRadius:14,width:"100%",maxWidth:500,boxShadow:"0 24px 64px rgba(12,44,24,.18)",border:`1px solid ${C.border}`,overflow:"hidden"}}>
        <div style={{background:C.green,padding:"16px 24px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:28,height:28,borderRadius:14,background:"rgba(255,255,255,.15)",display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{color:"#fff",fontSize:12,fontWeight:700}}>q</span></div><div style={{display:"flex",flexDirection:"column",alignItems:"flex-start"}}><div style={{display:"flex",alignItems:"center"}}><span style={{color:"#fff",fontSize:15,fontWeight:500}}>questt</span><span style={{color:"#3BB896",fontSize:15,fontWeight:700}}>.</span></div><span style={{fontSize:9,opacity:.45,color:"#fff",fontWeight:400,letterSpacing:.3,marginTop:-1}}>powered by PwC</span></div></div>
          <button onClick={()=>setQuestt(false)} style={{background:"rgba(255,255,255,.1)",border:"none",borderRadius:6,color:"rgba(255,255,255,.7)",padding:"4px 10px",fontSize:13,cursor:"pointer",fontFamily:font}}>✕</button>
        </div>
        <div style={{padding:"20px 24px",maxHeight:320,overflow:"auto"}}>
          <div style={{display:"flex",gap:10,marginBottom:16}}>
            <div style={{width:24,height:24,borderRadius:12,background:C.sageSoft,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:2}}><span style={{fontSize:10,fontWeight:700,color:C.sage}}>Q</span></div>
            <div style={{background:C.bgSub,borderRadius:"4px 12px 12px 12px",padding:"10px 14px",fontSize:14,color:C.textMid,lineHeight:1.6,maxWidth:"85%"}}>I can help you explore allocation scenarios, dig into sell-through patterns, and validate your decisions against the 6-week ST target. What would you like to investigate?</div>
          </div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6,marginLeft:34}}>
            {["Which styles are at risk of missing the 90% target?","Show me the size curve shift for the Stripe Midi","Compare SS25 vs SS26 allocation for top 5 styles"].map((q,i)=> (<button key={i} style={{fontSize:12,color:C.green,background:"#fff",border:`1px solid ${C.sageBorder}`,borderRadius:16,padding:"6px 12px",cursor:"pointer",fontFamily:font}}>{q}</button>))}
          </div>
        </div>
        <div style={{padding:"12px 24px 16px",borderTop:`1px solid ${C.borderLight}`,display:"flex",gap:8}}>
          <input placeholder="Ask about this plan..." style={{flex:1,padding:"10px 14px",borderRadius:8,border:`1px solid ${C.border}`,fontSize:14,fontFamily:font,outline:"none"}}/>
          <button style={{padding:"10px 18px",borderRadius:8,background:C.green,border:"none",color:"#fff",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:font}}>Send</button>
        </div>
      </div>
    </div>}
    <div style={{maxWidth:1100,margin:"0 auto",padding:"28px 32px"}}>
      <div style={{marginBottom:20}}>
          <button onClick={()=>{setView("seasons");setSeason(null);}} style={{fontSize:12,color:C.sage,fontWeight:600,background:"none",border:"none",cursor:"pointer",padding:0,marginBottom:6,fontFamily:font}}>← All Seasons</button>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div style={{fontSize:22,fontWeight:600,fontFamily:serif}}>Spring Summer 2026</div>
            <div style={{display:"flex",alignItems:"center",gap:16}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}><div><div style={{fontSize:10,color:C.dimmer,fontWeight:500}}>PLANNED / OTB</div><div style={{fontSize:14,fontWeight:600,color:C.green}}>₹{(totV/1e7).toFixed(1)}Cr <span style={{color:C.dimmer,fontWeight:400}}>/ ₹{otb}Cr</span></div></div><div style={{width:60,height:4,background:C.borderLight,borderRadius:2}}><div style={{height:4,background:pctUsed>95?C.terra:C.sage,borderRadius:2,width:`${Math.min(pctUsed,100)}%`}}/></div></div>
              <button style={{background:C.green,border:"none",borderRadius:6,color:"#fff",padding:"7px 16px",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:font}}>Export Plan</button>
            </div>
          </div>
          <div style={{fontSize:13,color:C.dim,marginTop:3}}>{styles.length} styles · {totU.toLocaleString()} units · {styles.filter(s=>s.src==="carryover").length} carryover, {styles.filter(s=>s.src==="new-design").length} new design</div>
      </div>
      <div style={{display:"flex",gap:0,marginBottom:18,borderBottom:`2px solid ${C.borderLight}`}}>{[{k:"sku",l:"By SKU"},{k:"store",l:"By Store"}].map(t=> (<button key={t.k} onClick={()=>setTab(t.k)} style={{padding:"10px 24px",borderRadius:0,border:"none",borderBottom:tab===t.k?`2px solid ${C.green}`:"2px solid transparent",background:"transparent",color:tab===t.k?C.green:C.dim,fontWeight:tab===t.k?700:500,fontSize:14,cursor:"pointer",fontFamily:font,marginBottom:-2,transition:"all 0.15s"}}>{t.l}</button>))}</div>
      <div style={{display:"flex",gap:16,marginBottom:16,flexWrap:"wrap"}}>{[
        {l:"Carryover",v:styles.filter(s=>s.src==="carryover").length,c:C.textMid,bg:C.bgSub},
        {l:"New Design",v:styles.filter(s=>s.src==="new-design").length,c:C.textMid,bg:C.bgSub},
        {l:"Edits",v:Object.keys(edits).length,c:Object.keys(edits).length>0?C.amber:C.dimmer,bg:Object.keys(edits).length>0?C.amberSoft:C.bgSub},
      ].map(m=> (<div key={m.l} style={{padding:"6px 14px",borderRadius:6,background:m.bg,fontSize:12,display:"flex",alignItems:"center",gap:6}}>
        <span style={{fontWeight:700,color:m.c,fontSize:14}}>{m.v}</span><span style={{color:C.dim}}>{m.l}</span>
      </div>))}</div>
      {tab==="sku"&&<div>{grouped.map(({cat,styles:gs,units:cu,count})=> (<div key={cat} style={{marginBottom:8}}>
        <div onClick={()=>setCatOpen(p=>({...p,[cat]:!p[cat]}))} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 16px",cursor:"pointer",background:C.bgSub,borderRadius:6,border:`1px solid ${C.borderLight}`}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:11,color:C.dim,transition:"transform 0.15s",transform:catOpen[cat]?"rotate(0deg)":"rotate(-90deg)",display:"inline-block"}}>{"\u25BE"}</span><span style={{fontSize:15,fontWeight:600,color:C.green,fontFamily:serif}}>{cat}</span><span style={{fontSize:12,color:C.dimmer,background:C.bg,padding:"1px 8px",borderRadius:10,border:`1px solid ${C.borderLight}`}}>{count}</span></div>
          <span style={{fontSize:13,fontFamily:"monospace",fontWeight:600,color:C.green}}>{cu.toLocaleString()}u</span>
        </div>{catOpen[cat]&&<div style={{display:"flex",flexDirection:"column",gap:4,marginTop:4}}>{gs.map(s=> (<StyleCard key={s.id} s={s}/>))}</div>}
      </div>))}</div>}
      {tab==="store"&&<div>
        <div style={{background:C.bgSub,borderRadius:8,padding:"14px 20px",marginBottom:12,border:`1px solid ${C.borderLight}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div><div style={{fontSize:14,fontWeight:600}}>B/C Stores (Aggregated)</div><div style={{fontSize:12,color:C.dim}}>~280 stores · Carryover styles with B/C allocation</div></div>
          <div style={{display:"flex",gap:16}}><div style={{textAlign:"right"}}><div style={{fontSize:11,color:C.dimmer}}>Units</div><div style={{fontSize:15,fontWeight:700,color:C.green,fontFamily:"monospace"}}>{bcU.toLocaleString()}</div></div><div style={{textAlign:"right"}}><div style={{fontSize:11,color:C.dimmer}}>Value</div><div style={{fontSize:15,fontWeight:600}}>₹{(bcV/1e7).toFixed(2)}Cr</div></div></div>
        </div>
        {sa.map(st=> (<StoreCard key={st.code} st={st}/>))}
      </div>}
    </div>
  </Shell>);
}

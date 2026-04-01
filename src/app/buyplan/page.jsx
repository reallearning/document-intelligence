"use client"
import { useState, useMemo } from "react";

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
const serif="'DM Serif Display',Georgia,serif";
const SIZES=["XS","S","M","L","XL"];
const Img=({size=44})=> (<div style={{width:size,height:size,borderRadius:6,background:C.bgAlt,border:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><svg width={size*.34} height={size*.34} viewBox="0 0 24 24" fill="none" stroke={C.dimmer} strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg></div>);
const Pencil=()=> (<svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M11.5 1.5l3 3-9 9H2.5v-3l9-9z"/></svg>);

/* ═══ STORES ═══ */
const STORE_DB = [
  {code:"FL01",name:"Palladium",city:"Mumbai",area:"Lower Parel",grade:"A+",sp:{XS:.05,S:.21,M:.42,L:.24,XL:.08}},
  {code:"FL02",name:"Phoenix Lower Parel",city:"Mumbai",area:"Lower Parel",grade:"A+",sp:{XS:.07,S:.20,M:.38,L:.25,XL:.10}},
  {code:"FL03",name:"DLF Promenade",city:"Delhi",area:"Vasant Kunj",grade:"A+",sp:{XS:.04,S:.15,M:.34,L:.31,XL:.16}},
  {code:"FL04",name:"Ambience Mall",city:"Gurugram",area:"Vasant Kunj",grade:"A+",sp:{XS:.05,S:.18,M:.35,L:.28,XL:.14}},
  {code:"FL05",name:"UB City",city:"Bangalore",area:"Vittal Mallya Rd",grade:"A+",sp:{XS:.11,S:.26,M:.36,L:.20,XL:.07}},
  {code:"FL06",name:"Phoenix Marketcity",city:"Bangalore",area:"Whitefield",grade:"A+",sp:{XS:.08,S:.21,M:.37,L:.25,XL:.09}},
  {code:"FL07",name:"GVK One",city:"Hyderabad",area:"Banjara Hills",grade:"A+",sp:{XS:.07,S:.20,M:.36,L:.26,XL:.11}},
  {code:"FL08",name:"Express Avenue",city:"Chennai",area:"Royapettah",grade:"A+",sp:{XS:.07,S:.19,M:.38,L:.27,XL:.09}},
  {code:"FL09",name:"Seasons Mall",city:"Pune",area:"Magarpatta",grade:"A+",sp:{XS:.07,S:.21,M:.37,L:.25,XL:.10}},
  {code:"FL10",name:"Quest Mall",city:"Kolkata",area:"Park Street",grade:"A+",sp:{XS:.06,S:.19,M:.36,L:.27,XL:.12}},
  {code:"FL11",name:"Palladium",city:"Ahmedabad",area:"SG Highway",grade:"A+",sp:{XS:.06,S:.19,M:.35,L:.27,XL:.13}},
  {code:"FL12",name:"VR Chennai",city:"Chennai",area:"Anna Nagar",grade:"A+",sp:{XS:.08,S:.22,M:.38,L:.24,XL:.08}},
  {code:"PR01",name:"Infinity Mall",city:"Mumbai",area:"Malad",grade:"A",sp:{XS:.07,S:.20,M:.38,L:.25,XL:.10}},
  {code:"PR02",name:"Viviana Mall",city:"Mumbai",area:"Thane",grade:"A",sp:{XS:.06,S:.19,M:.37,L:.26,XL:.12}},
  {code:"PR03",name:"Oberoi Mall",city:"Mumbai",area:"Goregaon",grade:"A",sp:{XS:.07,S:.20,M:.38,L:.25,XL:.10}},
  {code:"PR04",name:"Select Citywalk",city:"Delhi",area:"Saket",grade:"A",sp:{XS:.05,S:.17,M:.36,L:.28,XL:.14}},
  {code:"PR05",name:"DLF Mall of India",city:"Noida",area:"Sector 18",grade:"A",sp:{XS:.05,S:.17,M:.36,L:.28,XL:.14}},
  {code:"PR06",name:"Ambience Mall",city:"Gurugram",area:"NH-8",grade:"A",sp:{XS:.05,S:.18,M:.36,L:.28,XL:.13}},
  {code:"PR07",name:"MGF Metropolitan",city:"Delhi",area:"MG Road",grade:"A",sp:{XS:.05,S:.18,M:.36,L:.28,XL:.13}},
  {code:"PR08",name:"Pacific Mall",city:"Delhi",area:"Tagore Garden",grade:"A",sp:{XS:.06,S:.19,M:.36,L:.27,XL:.12}},
  {code:"PR09",name:"Orion Mall",city:"Bangalore",area:"Rajajinagar",grade:"A",sp:{XS:.08,S:.22,M:.37,L:.24,XL:.09}},
  {code:"PR10",name:"Forum Mall",city:"Bangalore",area:"Koramangala",grade:"A",sp:{XS:.08,S:.21,M:.37,L:.25,XL:.09}},
  {code:"PR11",name:"Inorbit Mall",city:"Hyderabad",area:"Hitech City",grade:"A",sp:{XS:.07,S:.20,M:.36,L:.26,XL:.11}},
  {code:"PR12",name:"Sarath City",city:"Hyderabad",area:"Gachibowli",grade:"A",sp:{XS:.07,S:.20,M:.36,L:.26,XL:.11}},
  {code:"PR13",name:"Phoenix Palassio",city:"Chennai",area:"T Nagar",grade:"A",sp:{XS:.09,S:.23,M:.36,L:.23,XL:.09}},
  {code:"PR14",name:"Phoenix Marketcity",city:"Pune",area:"Viman Nagar",grade:"A",sp:{XS:.07,S:.21,M:.37,L:.25,XL:.10}},
  {code:"PR15",name:"South City Mall",city:"Kolkata",area:"Prince Anwar Shah",grade:"A",sp:{XS:.06,S:.19,M:.36,L:.27,XL:.12}},
  {code:"PR16",name:"World Trade Park",city:"Jaipur",area:"Malviya Nagar",grade:"A",sp:{XS:.05,S:.17,M:.34,L:.29,XL:.15}},
  {code:"PR17",name:"Phoenix Citadel",city:"Lucknow",area:"Gomti Nagar",grade:"A",sp:{XS:.05,S:.16,M:.34,L:.30,XL:.15}},
  {code:"PR18",name:"Elante Mall",city:"Chandigarh",area:"Industrial Area",grade:"A",sp:{XS:.05,S:.17,M:.35,L:.29,XL:.14}},
  {code:"PR19",name:"Lulu Mall",city:"Kochi",area:"Edapally",grade:"A",sp:{XS:.08,S:.22,M:.37,L:.24,XL:.09}},
  {code:"PR20",name:"VR Mall",city:"Surat",area:"Dumas Road",grade:"A",sp:{XS:.06,S:.19,M:.36,L:.27,XL:.12}},
  {code:"PR21",name:"Alpha One",city:"Ahmedabad",area:"Vastrapur",grade:"A",sp:{XS:.06,S:.19,M:.35,L:.27,XL:.13}},
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
      {a:"Demand Planner",t:"0.3s",act:"Pulled SS25 sell-through by size × store. Sold 540 units at 94% 6-week ST; exceeding the 90% target, which means we under-allocated. M stocked out by Week 5 in 8 of 12 A+ stores. Estimated 42 units of unmet demand based on rate-of-sale extrapolation: avg 1.2u/store/week × 8 stores × 4.5 remaining weeks = 43 units lost."},
      {a:"Size Curve Analyst",t:"1.2s",act:"Recalculated size curve from SS25 actuals. M demand was 41% of sales (vs 35% planned). XL was 6% of sales (vs 10% planned, 38% residual). New curve: XS 7%, S 20%, M 38%, L 27%, XL 8%. Validated against North stores where L/XL index higher; even there, XL only hit 9%."},
      {a:"Color Performance",t:"2.0s",act:"SS25 color-level ST: Black/White 96%, Navy/Cream 92%, Sage 64%. Sage had 36% unsold stock requiring 30% markdown. Replaced with Olive/White; olive stripe trending +180% in brand site search Jan 2026. Allocated Olive/White at 25% (conservative for untested color)."},
      {a:"Allocation Engine",t:"2.8s",act:"Unit derivation: To hit 90% 6-wk ST at SS25 rate-of-sale (1.2u/store/wk in A+, 0.6u in A, 0.2u in B/C): A+ = 12 stores × 12u = 144 (22%). A = 21 stores × 13u = 273 (40%). B/C = ~280 stores × 1u (top 263) = 263 (38%). Total = 680 units."},
      {a:"Synthesis",t:"3.4s",act:"Final: 680 units across 3 colors with corrected M-heavy size curve. The 26% increase from SS25 is justified by the stockout signal; we were under-serving proven demand. Confidence 86% (high data reliability, slight uncertainty on new Olive/White color).",conf:"86%"}
    ]),qs:["What if we kept Sage alongside Olive/White?","Show the M stockout store-by-store"]},

  {id:"S26-CD-102",name:"Linen Co-ord Set",sub:"Co-ords",units:420,mrp:5990,cost:2516,margin:58,src:"new-design",conf:68,
    colors:[{n:"Beige/Black",p:.55,c:STD},{n:"Olive/Cream",p:.45,c:STD}],ga:{"A+":.40,"A":.60},
    flag:{type:"low-confidence",msg:"First premium linen co-ord at the highest co-ord price point. No direct historical match. Recommendation is based on cross-category signals: linen fabric 6-wk ST averaged 91% in SS25, co-ord sets grew 34% YoY, and the premium price bracket showed no resistance in blazers. Restricted to A+ and A stores only."},
    hist:{},
    reason:"New category entry at the highest co-ord price point. Unit count derived from cross-category benchmarking: linen dresses averaged 8u/A+ store and 5u/A store in SS25, discounted 40% for untested format. Conservative 420 units with no B/C distribution. Re-buy trigger at 70% 6-wk ST.",
    trail:T([
      {a:"Demand Planner",t:"0.4s",act:"No direct history. Cross-category benchmark: Linen dresses averaged 8 units per A+ store and 5 units per A store in first 6 weeks of SS25 (91% ST). Co-ord sets are a different format, so applied 40% discount: 5u/A+ store, 3u/A store as base estimate."},
      {a:"Price Sensitivity",t:"1.3s",act:"At the highest co-ord price point. Checked resistance: Single-button blazer sold at 76% ST at a comparable price. Linen wrap dress sold at 87% ST at a lower point. The premium bracket has not been tested in co-ords, but linen commands a premium; no markdown was needed on any linen item in SS25."},
      {a:"Allocation Engine",t:"2.1s",act:"Unit derivation: A+ = 12 stores × 14u = 168 (40%). A = 21 stores × 12u = 252 (60%). B/C excluded; zero category history at this price point. Total = 420 units."},
      {a:"Color Analyst",t:"2.8s",act:"Two-color assortment only for a new entry. Beige/Black at 55%; neutral co-ord is the safer lead. Olive/Cream at 45%; olive is SS26's breakout color across the range. No third color to limit risk."},
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
      {a:"Synthesis",t:"2.9s",act:"Test buy only. 180 units, 2 colors, A+/A distribution. White leads at 60%; broderie reads best on white. This is not a revenue play; it is a category learning investment. Confidence 55%.",conf:"55%"}
    ]),qs:["What if it sells out; what is the fastest re-buy?","Should we price lower for a test?"]},

  {id:"S26-BZ-104",name:"Single-Button Blazer",sub:"Blazers",units:520,mrp:4990,cost:2196,margin:56,src:"carryover",conf:87,
    colors:[{n:"Black",p:.55,c:STD},{n:"Dusty Rose",p:.45,c:STD}],ga:{"A+":.30,"A":.40,"B/C":.30},
    flag:{type:"opportunity",msg:"Single-button blazer has grown steadily: 280u (68% ST) in SS24 to 380u (76% ST) in AW25 to 420u (82% ST) in SS25. Outsells double-breasted 3:1. System recommends scaling to 520u (+24%) and adding Dusty Rose. Non-neutral blazer buyers have 92% retention rate."},
    hist:{SS24:{u:280,st:68,m:54,w:16,n:"First structured blazer. Modest start."},AW25:{u:380,st:76,m:56,w:12,n:"Strong full-price sell-through."},SS25:{u:420,st:82,m:55,w:8,n:"Black only. Approached 90% 6-wk target."}},
    reason:"Three-season growth (280 to 380 to 420) with improving ST approaching the 90% 6-wk target. SS25 hit 82% in 8 weeks; on trajectory to hit the target with modest scale. Dusty Rose added to capture the high-retention non-neutral segment (92% repurchase).",
    trail:T([
      {a:"Demand Planner",t:"0.3s",act:"Three-season trajectory: SS24 280u (68% 6-wk ST), AW25 380u (76%), SS25 420u (82%). Rate of sale accelerating: 0.8u/A+ store/wk in SS24, now 1.3u in SS25. At current ROS, 520 units should yield ~88% 6-wk ST; approaching the 90% target without overshooting."},
      {a:"Color Analyst",t:"1.1s",act:"SS25 was Black-only at 82% ST. Adding Dusty Rose based on: (1) non-neutral color buyers have 92% retention vs 68% for neutral-only, (2) Dusty Rose tested in AW25 dresses at 78% ST, (3) blazer + non-neutral creates high-LTV customer acquisition. Split: Black 55% (proven), Dusty Rose 45% (strategic)."},
      {a:"Allocation Engine",t:"1.9s",act:"Unit derivation at 88% 6-wk ST target: A+ = 12 stores × 13u = 156 (30%). A = 21 stores × 10u = 210 (40%). B/C = ~280 stores × 0.55u (top 154 stores) = 154 (30%). Total = 520. B/C gets allocation because blazer demand is distributed; not metro-concentrated."},
      {a:"Synthesis",t:"2.6s",act:"520 units, 2 colors. Black is the safe foundation; Dusty Rose is the strategic bet for customer segment expansion. This style is moving from 'promising' to 'anchor' status. Confidence 87%.",conf:"87%"}
    ]),qs:["Is there ASP ceiling risk at this price?","Should we add a third color?"]},

  {id:"S26-DR-105",name:"Linen Wrap Dress",sub:"Dresses",units:760,mrp:3990,cost:1676,margin:58,src:"carryover",conf:84,
    colors:[{n:"Terracotta",p:.35,c:LSK},{n:"Ivory",p:.35,c:LSK},{n:"Sage",p:.30,c:LSK}],ga:{"A+":.26,"A":.40,"B/C":.34},
    flag:{type:"deeper-buy",msg:"System recommends 760 units; 52% above SS25's 500 units. Linen wrap hit 93% 6-wk ST (exceeding the 90% target), effectively selling out by Week 5 in A+ stores. Unmet demand estimated at 110 units. Linen fabric is up 15% YoY so supplier commitment needed by Jan 20."},
    hist:{SS24:{u:360,st:74,m:56,w:14,n:"Understocked in A+. Could have sold more."},SS25:{u:500,st:93,m:58,w:5,n:"Sold out by Wk5 in A+. Best linen performer."}},
    reason:"Linen wrap had the highest 6-wk ST of any style in SS25 (93%, exceeding the 90% target). A+ stores sold out by Week 5 with 110 units of estimated unmet demand. Scaling 52% is aggressive but the demand signal is unambiguous. Earthy palette aligned with summer trends. Supplier deadline: Jan 20.",
    trail:T([
      {a:"Demand Planner",t:"0.3s",act:"SS25: 500 units at 93% 6-wk ST. 3 points above the 90% target, indicating under-allocation. A+ stores averaged 1.8u/wk ROS, selling out by Week 5. Extrapolating unmet demand: 12 A+ stores × 1.8u/wk × 5 remaining weeks = ~108 lost units."},
      {a:"Supply Chain",t:"1.4s",act:"Linen fabric spot pricing up 15% YoY. Supplier can deliver 760 units if committed by January 20. Delaying to February increases cost per unit. Current quoted landed cost on file."},
      {a:"Color Analyst",t:"2.2s",act:"SS25 color-level data: Terracotta 96% ST, Ivory 91% ST, Dusty Blue 84% ST. Replacing Dusty Blue with Sage (Sage indexing higher in SS26 search data). Split: Terracotta 35%, Ivory 35%, Sage 30%; near-equal split since top 2 colors both exceeded 90% target."},
      {a:"Allocation Engine",t:"3.0s",act:"Unit derivation at 90% 6-wk ST: A+ = 12 stores × 16u = 192 (26%). A = 21 stores × 14u = 294 (40%). B/C = ~280 stores × 1u (top 274) = 274 (34%). Total = 760. Large-skew size curve (LSK) for wrap silhouette. L/XL runs larger in wrap dresses."},
      {a:"Synthesis",t:"3.7s",act:"760 units is a 52% increase; the largest scale-up in the plan. Justified by: (1) 6-wk ST exceeded the 90% target, (2) clear unmet demand signal from stockouts, (3) linen is the best-performing summer fabric. Main risk: supply commitment deadline. Confidence 84%.",conf:"84%"}
    ]),qs:["What is the exact supplier deadline?","How does linen perform by region?"]},

  {id:"S26-TR-106",name:"Wide-Leg Pleated Trouser",sub:"Trousers",units:900,mrp:2490,cost:1095,margin:56,src:"carryover",conf:90,
    colors:[{n:"Black",p:.35,c:STD},{n:"Navy",p:.25,c:STD},{n:"Olive",p:.20,c:STD},{n:"Cream",p:.20,c:STD}],ga:{"A+":.20,"A":.34,"B/C":.46},
    flag:{type:"deeper-buy",msg:"Wide-leg pleated trousers are a structural category shift, not a seasonal trend. Share of trouser sales: SS24 28%, AW25 32%, SS25 36%, projected SS26 44%. Pleated outsells all other wide-leg variants 1.6x. System recommends 900u (+29% vs SS25's 700u)."},
    hist:{SS24:{u:520,st:72,m:54,w:16,n:"Wide-leg was 28% of trouser mix."},AW25:{u:620,st:81,m:56,w:11,n:"Pleated outsold all other wide-leg 1.6x."},SS25:{u:700,st:86,m:55,w:8,n:"Wide-leg now 36% of trouser mix. Near 90% target."}},
    reason:"Structural shift in the trouser category; wide-leg went from 28% of sales to 36% in two seasons. SS25 hit 86% 6-wk ST, approaching the 90% target. Four-color assortment captures safe (Black/Navy 60%) and growth (Olive/Cream 40%) segments.",
    trail:T([
      {a:"Demand Planner",t:"0.3s",act:"Analysed trouser silhouette mix over 3 seasons. Wide-leg share: SS24 28%, AW25 32%, SS25 36%. Pleated outsells straight-wide and palazzo 1.6x. SS25: 700u at 86% 6-wk ST; just 4 points below the 90% target. At current growth rate, 900 units should yield 89-91% 6-wk ST."},
      {a:"Color Analyst",t:"1.0s",act:"SS25 color-level data (Black only): 86% ST. Adding 3 colors based on trouser color demand patterns: Navy (25%) anchors workwear, Olive (20%) and Cream (20%) capture the casual/weekend segment. Color split derived from palazzo color data where multi-color assortment lifted total ST by 8 points."},
      {a:"Allocation Engine",t:"1.8s",act:"Unit derivation: A+ = 12 stores × 15u = 180 (20%). A = 21 stores × 14u = 294 (34%). B/C = ~280 stores × 1.5u (top 284) = 426 (46%). B/C gets 46% because wide-leg trousers have broad appeal; not metro-concentrated. Total = 900."},
      {a:"Synthesis",t:"2.5s",act:"900 units. This is a structural category bet, not a fashion risk. The pleated wide-leg is replacing slim-fit as the default trouser. Confidence 90%.",conf:"90%"}
    ]),qs:["Is there a saturation point for wide-leg?","Should slim-fit be phased out?"]},

  {id:"S26-DR-107",name:"Satin Maxi Dress",sub:"Dresses",units:280,mrp:5990,cost:2516,margin:58,src:"new-design",conf:62,
    colors:[{n:"Emerald",p:.50,c:STD},{n:"Black",p:.50,c:STD}],ga:{"A+":.50,"A":.50},
    flag:{type:"low-confidence",msg:"Entry into the evening/occasion maxi dress category at the highest dress price point. No direct precedent. Based on occasion-wear gap analysis: 22% of loyalty members purchase evening dresses from competitors. Emerald is SS26's breakout evening color."},
    hist:{},
    reason:"New category entry targeting the occasion/evening gap. 22% of loyalty members purchased evening dresses from competitor brands in the last 12 months. 280 units, A+/A only, two high-impact colors.",
    trail:T([
      {a:"Customer Intelligence",t:"0.6s",act:"Analysed loyalty data: 22% of loyalty members purchased occasion/evening dresses from competitor brands in the last 12 months. Average spend: comparable to upper price range. This represents a captured customer spending outside the brand's range; an addressable gap, not new customer acquisition."},
      {a:"Price Sensitivity",t:"1.4s",act:"Highest dress price point. Checked resistance: Blazers sell at a comparable price with no price resistance. Satin fabric justifies the premium; satin items have 12% lower return rates than polyester at similar price points. Markdown risk: satin holds value better during end-of-season sales."},
      {a:"Allocation Engine",t:"2.2s",act:"A+/A only for new high-price entry. Unit derivation: A+ = 12 stores × 12u = 144 (50%). A = 21 stores × 6.5u = 136 (50%). B/C excluded. Standard size curve; evening dresses don't show silhouette-based size skew. Total = 280."},
      {a:"Synthesis",t:"2.9s",act:"280 units, 2 high-impact colors. Emerald is the hero (SS26 evening color of the season). Black is the safe anchor. This is a strategic category expansion; success here opens a significant annual opportunity in occasion wear. Confidence 62%.",conf:"62%"}
    ]),qs:["Should we price lower to reduce risk?","What is the competitor price comparison?"]},

  {id:"S26-TP-108",name:"Relaxed Linen Shirt",sub:"Tops",units:1140,mrp:1890,cost:756,margin:60,src:"carryover",conf:89,
    colors:[{n:"White",p:.30,c:LSK},{n:"Sky Blue",p:.25,c:LSK},{n:"Sand",p:.225,c:LSK},{n:"Olive",p:.225,c:LSK}],ga:{"A+":.20,"A":.36,"B/C":.44},
    flag:{type:"deeper-buy",msg:"Relaxed linen shirts sit at the intersection of two strong trends: linen fabric (91% avg 6-wk ST in SS25) and relaxed fit (now 62% of tops sales). SS25 hit 88% 6-wk ST at 860 units. Scaling 33% to 1,140 units to approach the 90% target more closely."},
    hist:{SS24:{u:600,st:72,m:58,w:15,n:"First linen shirt season. Promising start."},SS25:{u:860,st:88,m:60,w:7,n:"Strong. All A+ sold through by Wk7."}},
    reason:"Linen + relaxed fit = the strongest summer intersection. SS25 hit 88% 6-wk ST (just below the 90% target), meaning allocation was almost perfect. The 33% increase accounts for the 2-point gap plus organic category growth. Four-color assortment for maximum breadth.",
    trail:T([
      {a:"Demand Planner",t:"0.3s",act:"SS25: 860u at 88% 6-wk ST. 2 points below the 90% target. Rate of sale: 1.4u/A+ store/wk, 0.9u/A store/wk. Relaxed fit now 62% of all tops sales (up from 45% two seasons ago). Linen avg 6-wk ST: 91% in SS25; the best-performing fabric."},
      {a:"Allocation Engine",t:"1.1s",act:"Unit derivation at 90% 6-wk ST: A+ = 12 stores × 19u = 228 (20%). A = 21 stores × 19u = 399 (36%). B/C = ~280 stores × 1.8u (top 285) = 513 (44%). B/C gets 44%; relaxed linen shirts sell across all tiers. Total = 1,140."},
      {a:"Color Analyst",t:"1.8s",act:"SS25 color data: White 92% ST, Sky Blue 88% ST, Sand 84% ST. All above 80%; no weak color. Adding Olive as 4th (replacing seasonal Coral which hit only 71% ST). Split: White 30%, Sky Blue 25%, Sand/Olive 22.5% each. Large-skew curve for relaxed fit."},
      {a:"Synthesis",t:"2.4s",act:"1,140 units. Supply commitment shares the Jan 20 linen deadline with the Wrap Dress. Combined linen commitment: 1,900 units across 2 styles. Confidence 89%.",conf:"89%"}
    ]),qs:["Should we lock the linen supplier now?","Is there cannibalization with the cotton shirt?"]},

  {id:"S26-JM-109",name:"V-Neck Jumpsuit",sub:"Jumpsuits",units:320,mrp:3990,cost:1716,margin:57,src:"new-design",conf:78,
    colors:[{n:"Navy",p:.35,c:STD},{n:"Olive",p:.35,c:STD},{n:"Rust",p:.30,c:STD}],ga:{"A+":.30,"A":.45,"B/C":.25},
    flag:{type:"opportunity",msg:"AW25 test of a similar jumpsuit (120 units) achieved 91% 6-wk ST with 60+ customers waitlisted. This is a new silhouette for SS26 but the demand signal from the test is strong. Scaling 2.7x to 320 units. Addresses the work-to-evening transition gap."},
    hist:{AW25:{u:120,st:91,m:57,w:5,n:"Test exceeded 90% target. 60+ waitlisted."}},
    reason:"AW25 test dramatically exceeded the 90% 6-wk ST target (hit 91% in 5 weeks). New SS26 design but same V-neck jumpsuit format. Three colors for occasion versatility. B/C gets limited 25%; jumpsuit is still a developing category.",
    trail:T([
      {a:"Demand Planner",t:"0.4s",act:"AW25 test: 120 units at 91% 6-wk ST, exceeding the 90% target. 60+ customers joined waitlist after stockout. Rate of sale: 2.0u/A+ store/wk; higher than any other new format test in the last 4 seasons."},
      {a:"Customer Intelligence",t:"1.2s",act:"Waitlisted customers: 78% are repeat buyers with high avg basket. Strong overlap with blazer and co-ord buyer segments. Work-to-evening transition is an underserved occasion in the current range."},
      {a:"Allocation Engine",t:"2.0s",act:"Scale factor: AW25 was A+ only (12 stores × 10u = 120). For SS26: A+ = 12 stores × 8u = 96 (30%). A = 21 stores × 7u = 147 (45%). B/C = ~280 stores × 0.28u (top 77 stores × 1u) = 77 (25%). Total = 320. Conservative B/C allocation; jumpsuit is unproven outside metros."},
      {a:"Synthesis",t:"2.7s",act:"320 units. The AW25 test provides strong validation. Three colors: Navy (work), Olive (casual), Rust (evening). Re-buy trigger at 80% 6-wk ST for another 160-unit follow-on. Confidence 78%.",conf:"78%"}
    ]),qs:["Can we get 160-unit re-buy in 3 weeks?","Should B/C be excluded entirely?"]},

  {id:"S26-TP-110",name:"Knit Polo",sub:"Tops",units:360,mrp:2290,cost:961,margin:58,src:"new-design",conf:74,
    colors:[{n:"Forest Green",p:.35,c:STD},{n:"Cream",p:.30,c:STD},{n:"Wine",p:.35,c:STD}],ga:{"A+":.28,"A":.42,"B/C":.30},
    flag:{type:"opportunity",msg:"Knit polo tested in AW25: 120 units at 86% 6-wk ST. New sub-category. Polo buyers show 2.1x lifetime value vs basic tee buyers. Scaling to 360 units with three rich colors for the premium knit positioning."},
    hist:{AW25:{u:120,st:86,m:58,w:8,n:"Test outperformed. 2.1x LTV buyers."}},
    reason:"New sub-category. AW25 test hit 86% 6-wk ST (just below the 90% target) and identified a high-LTV buyer segment. 360 units is a 3x scale from the 120-unit test. Three colors that signal premium knit, not casual.",
    trail:T([
      {a:"Demand Planner",t:"0.3s",act:"AW25 test: 120u at 86% 6-wk ST. Below the 90% target by 4 points, but this was a first-time format with zero awareness. Adjusted target for new sub-categories: 80% 6-wk ST. At 86%, the test exceeded the adjusted threshold."},
      {a:"Customer Intelligence",t:"1.1s",act:"Polo buyers: 2.1x LTV vs basic tee buyers. 67% are new-to-brand customers who entered through the polo; this is an acquisition vehicle, not just a product."},
      {a:"Allocation Engine",t:"1.8s",act:"Unit derivation: A+ = 12 stores × 8u = 96 (28%). A = 21 stores × 7u = 147 (42%). B/C = ~280 stores × 0.4u (top 108 × 1u) = 108 (30%). B/C gets 30%; polo has workwear crossover appeal. Total = 360."},
      {a:"Synthesis",t:"2.4s",act:"360 units. This is less about the product and more about the customer segment it attracts. If successful, knit polo becomes a permanent sub-category for AW26+. Confidence 74%.",conf:"74%"}
    ]),qs:["Is there a lower-price knit option to test alongside?"]},

  {id:"S26-DR-111",name:"Floral Midi Dress",sub:"Dresses",units:440,mrp:3490,cost:1466,margin:58,src:"new-design",conf:70,
    colors:[{n:"Botanical Print",p:.50,c:STD},{n:"Ditsy Floral",p:.50,c:STD}],ga:{"A+":.25,"A":.40,"B/C":.35},
    flag:{type:"low-confidence",msg:"Printed dresses are a new direction; the brand has historically focused on solid/stripe. Floral midi dresses are the #1 searched dress type on the brand site (4,200 searches/month, +45% YoY). However, zero sell-through history with florals, making this a design-risk buy."},
    hist:{},
    reason:"First floral print dress. Search data shows strong demand (#1 dress search term on site) but the brand has never executed florals. 440 units with two distinct print scales (Botanical for large/bold, Ditsy for subtle) to test which resonates.",
    trail:T([
      {a:"Trend Intelligence",t:"0.5s",act:"Brand site search data: 'floral dress' = 4,200 searches/month, +45% YoY. Currently 0% conversion because there are no floral dresses in range. This is the single largest unaddressed search term on the site."},
      {a:"Demand Planner",t:"1.3s",act:"No direct history. Proxy: solid midi dresses average 88% 6-wk ST. Applied 20% discount for unproven print category: 70% target 6-wk ST. At 70% target, 440 units is the allocation. Two print options to learn which scale works: Botanical (large-scale, statement) vs Ditsy (subtle, safer)."},
      {a:"Allocation Engine",t:"2.1s",act:"A+ = 12 stores × 9u = 108 (25%). A = 21 stores × 8u = 168 (40%). B/C = ~280 stores × 0.6u (top 164 × 1u) = 164 (35%). B/C gets 35%; floral dresses have broad appeal if they work. Total = 440."},
      {a:"Synthesis",t:"2.8s",act:"440 units. This is the most important design experiment in SS26. Success opens an entirely new aesthetic direction. Failure is contained at max exposure. Confidence 70%; the demand signal is clear but execution of florals is untested.",conf:"70%"}
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
    reason:"Declining style: 6-wk ST fell from 61% to 52% to 44% across three seasons, consistently below the 90% target. Reduced 60% from SS25. A+/A only. Forest Green is a diagnostic test; if 6-wk ST stays below 55%, recommend discontinuation for AW26.",
    trail:T([
      {a:"Demand Planner",t:"0.4s",act:"6-wk ST trajectory: SS24 61%, AW25 52%, SS25 44%. Each season declining by ~8 points. At this rate, AW26 would be ~36%; deep markdown territory."},
      {a:"Customer Intelligence",t:"1.2s",act:"Customer preference shifting toward relaxed fits. Bodycon buyers shrinking 18% YoY. However, remaining buyers have high basket value. This is a small but valuable niche; worth one more test."},
      {a:"Allocation Engine",t:"2.0s",act:"Reduced allocation: A+ = 12 stores × 7u = 84 (50%). A = 21 stores × 4u = 76 (50%). B/C excluded. Total = 160. Small-skew curve (SSK); bodycon buyers index smaller."},
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
    reason:"SS25 hit 84% 6-wk ST. Chambray was the standout color (89% ST vs 81% avg). Scaling 9% to 720u. Chambray at 35% lead; justified by its outperformance.",
    trail:T([{a:"Demand Planner",t:"0.2s",act:"SS25: 660u at 84% 6-wk ST. Chambray: 89% vs White 81%. Gap to 90% = 6pts."},{a:"Allocation Engine",t:"0.8s",act:"A+=144(20%), A=252(36%), B/C=316(44%). Total 720."},{a:"Synthesis",t:"1.1s",act:"720 units. Chambray-led. Approaching 90% target trajectory.",conf:"90%"}]),qs:[]},

  {id:"S26-SK-118",name:"Floral Wrap Skirt",sub:"Skirts",units:340,mrp:2290,cost:938,margin:59,src:"new-design",conf:76,
    colors:[{n:"Botanical",p:.50,c:STD},{n:"Vintage Floral",p:.50,c:STD}],ga:{"A+":.25,"A":.40,"B/C":.35},
    flag:null,hist:{},
    reason:"New print skirt to complement the Pleated Midi (solid). No direct history but wrap skirts averaged 73% 6-wk ST. With print trend (+45% search), targeting 75% 6-wk ST. Two prints to test: Botanical (bold) vs Vintage (subtle).",
    trail:T([{a:"Demand Planner",t:"0.3s",act:"No history. Proxy: solid wrap skirts avg 73% 6-wk ST. Print adds novelty risk. Target: 75%."},{a:"Allocation Engine",t:"0.9s",act:"A+=84(25%), A=136(40%), B/C=119(35%). Total 340."},{a:"Synthesis",t:"1.3s",act:"340 units. New print + new wrap format. Two variables = lower confidence.",conf:"76%"}]),qs:[]},

  {id:"S26-TP-119",name:"Rib Tank Top",sub:"Tops",units:1400,mrp:990,cost:396,margin:60,src:"carryover",conf:94,
    colors:[{n:"Black",p:.30,c:SSK},{n:"White",p:.30,c:SSK},{n:"Nude",p:.20,c:SSK},{n:"Grey",p:.20,c:SSK}],ga:{"A+":.14,"A":.30,"B/C":.56},
    flag:null,hist:{SS24:{u:1080,st:84,m:60,w:8},SS25:{u:1300,st:90,m:60,w:6}},
    reason:"SS25 hit exactly the 90% 6-wk ST target at 1,300 units; the plan was perfectly calibrated. Scaling 8% to 1,400u to account for organic store growth. Lowest price point. Heavy B/C allocation (56%). Small-skew size curve.",
    trail:T([{a:"Demand Planner",t:"0.2s",act:"SS25: 1,300u at 90% 6-wk ST. Perfect allocation. Scale 8% for organic growth."},{a:"Allocation Engine",t:"0.6s",act:"A+=196(14%), A=420(30%), B/C=784(56%). SSK curve. Total 1,400."},{a:"Synthesis",t:"0.9s",act:"1,400 units. Perfectly calibrated. Lowest risk in the plan.",conf:"94%"}]),qs:[]},

  {id:"S26-TR-120",name:"High-Waist Palazzo",sub:"Trousers",units:680,mrp:2290,cost:916,margin:60,src:"carryover",conf:89,
    colors:[{n:"Black",p:.35,c:LSK},{n:"Navy",p:.25,c:LSK},{n:"Olive",p:.20,c:LSK},{n:"Cream",p:.20,c:LSK}],ga:{"A+":.20,"A":.36,"B/C":.44},
    flag:null,hist:{SS24:{u:480,st:74,m:58,w:14},SS25:{u:620,st:83,m:59,w:9}},
    reason:"Palazzo complements the Wide-Leg Trouser; different occasion profile (casual vs workwear). SS25 hit 83% 6-wk ST, 7 points below target. Scaling 10% to 680u. Large-skew curve for relaxed silhouette.",
    trail:T([{a:"Demand Planner",t:"0.2s",act:"SS25: 620u at 83% 6-wk ST. No cannibalisation with Wide-Leg; palazzo is casual, wide-leg is workwear."},{a:"Allocation Engine",t:"0.7s",act:"A+=132(20%), A=252(36%), B/C=300(44%). LSK curve. Total 680."},{a:"Synthesis",t:"1.0s",act:"680 units. Steady growth. LSK curve.",conf:"89%"}]),qs:[]},

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
    reason:"Foundation blazer losing share to single-button (outsold 3:1) but retaining loyal buyers. Reduced 5% from SS25 to 380u. Held rather than cut deeper; loyal DB buyers have 1.4x LTV.",
    trail:T([{a:"Demand Planner",t:"0.2s",act:"SS25: 400u at 72% 6-wk ST. Declining share but distinct buyer segment. DB buyers: 1.4x LTV."},{a:"Allocation Engine",t:"0.7s",act:"A+=90(24%), A=144(38%), B/C=144(38%). Total 380."},{a:"Synthesis",t:"1.0s",act:"380 units. Maintain for loyal segment. Don't scale.",conf:"88%"}]),qs:[]},
  {id:"S26-DR-125",name:"Shift Dress",sub:"Dresses",units:540,mrp:2490,cost:1021,margin:59,src:"carryover",conf:85,
    colors:[{n:"Black",p:.40,c:STD},{n:"Olive",p:.30,c:STD},{n:"Cream",p:.30,c:STD}],ga:{"A+":.22,"A":.36,"B/C":.42},
    flag:null,hist:{SS24:{u:380,st:71,m:57,w:16},SS25:{u:460,st:79,m:58,w:11}},
    reason:"Workwear staple with steady growth. SS25 hit 79% 6-wk ST. Scaling 17% to close gap to 90% target.",
    trail:T([{a:"Demand Planner",t:"0.2s",act:"SS25: 460u at 79% 6-wk ST. Gap to target = 11pts. Shift dress is workwear anchor; sells consistently across all grades."},{a:"Allocation Engine",t:"0.7s",act:"A+=119(22%), A=194(36%), B/C=227(42%). Total 540."},{a:"Synthesis",t:"1.0s",act:"540 units. Reliable mid-range performer.",conf:"85%"}]),qs:[]},
  {id:"S26-DR-126",name:"Wrap Maxi Dress",sub:"Dresses",units:220,mrp:4990,cost:2096,margin:58,src:"new-design",conf:64,
    colors:[{n:"Terracotta",p:.55,c:LSK},{n:"Sage",p:.45,c:LSK}],ga:{"A+":.40,"A":.60},
    flag:{type:"low-confidence",msg:"New maxi silhouette at a premium price point. Wrap midi sold well but maxi length is untested. A+/A only distribution to contain risk."},
    hist:{},
    reason:"New maxi length extension of the successful wrap format. No direct history but wrap midi averaged 91% ST. Applied 30% discount for untested length. 220 units, A+/A only.",
    trail:T([{a:"Demand Planner",t:"0.3s",act:"No history. Proxy: wrap midi averaged 91% 6-wk ST. Maxi length adds uncertainty; applied 30% discount. Target 64% 6-wk ST."},{a:"Allocation Engine",t:"0.8s",act:"A+=88(40%), A=132(60%). B/C excluded. Total 220."},{a:"Synthesis",t:"1.2s",act:"220 units. Conservative test of maxi length.",conf:"64%"}]),qs:[]},
  {id:"S26-TP-127",name:"Cropped Boxy Tee",sub:"Tops",units:1600,mrp:890,cost:356,margin:60,src:"carryover",conf:93,
    colors:[{n:"White",p:.25,c:SSK},{n:"Black",p:.25,c:SSK},{n:"Sage",p:.20,c:SSK},{n:"Blush",p:.15,c:SSK},{n:"Grey",p:.15,c:SSK}],ga:{"A+":.12,"A":.28,"B/C":.60},
    flag:null,hist:{SS24:{u:1200,st:82,m:60,w:10},SS25:{u:1450,st:88,m:60,w:7}},
    reason:"Highest-volume basic. SS25 hit 88% 6-wk ST at 1,450u. 10% scale for organic growth. Heavy B/C weighting (60%). Lowest price point after Rib Tank.",
    trail:T([{a:"Demand Planner",t:"0.1s",act:"SS25: 1,450u at 88% 6-wk ST. 2pts below target. Scale 10% to 1,600u."},{a:"Allocation Engine",t:"0.5s",act:"A+=192(12%), A=448(28%), B/C=960(60%). Total 1,600."},{a:"Synthesis",t:"0.7s",act:"1,600 units. Volume basic. Near-perfect calibration.",conf:"93%"}]),qs:[]},
  {id:"S26-TP-128",name:"Crochet Knit Top",sub:"Tops",units:200,mrp:2490,cost:1046,margin:58,src:"new-design",conf:58,
    colors:[{n:"Cream",p:.55,c:SSK},{n:"Sand",p:.45,c:SSK}],ga:{"A+":.50,"A":.50},
    flag:{type:"low-confidence",msg:"Crochet is trending (+190% search YoY) but has never been in the brand range. 200-unit test buy. If 6-wk ST exceeds 55%, validates handcraft aesthetic for AW26."},
    hist:{},
    reason:"Trend test: crochet/handcraft aesthetic. 200 units across A+/A. Success threshold: 55% 6-wk ST.",
    trail:T([{a:"Trend Intelligence",t:"0.4s",act:"Crochet search volume up 190% YoY. 4 competitors launched crochet pieces in SS26. Trend is validated externally."},{a:"Demand Planner",t:"1.0s",act:"Test threshold: 200 units max. Target 55% 6-wk ST for trend validation."},{a:"Synthesis",t:"1.4s",act:"200 units. Design experiment. Low exposure, high signal value.",conf:"58%"}]),qs:[]},
  {id:"S26-TR-129",name:"Cigarette Trouser",sub:"Trousers",units:460,mrp:2290,cost:916,margin:60,src:"carryover",conf:83,
    colors:[{n:"Black",p:.40,c:STD},{n:"Navy",p:.30,c:STD},{n:"Charcoal",p:.30,c:STD}],ga:{"A+":.20,"A":.36,"B/C":.44},
    flag:{type:"risk",msg:"Slim-fit trouser silhouette losing share to wide-leg (down from 44% to 28% of trouser sales over 3 seasons). Holding at 460u rather than scaling but monitoring for further decline."},
    hist:{SS24:{u:520,st:74,m:58,w:14},SS25:{u:480,st:68,m:57,w:17}},
    reason:"Declining silhouette but stable buyer segment. Reduced from 480 to 460. Slim-fit share: 44% (SS24) to 28% (SS25). Hold, don't scale.",
    trail:T([{a:"Demand Planner",t:"0.2s",act:"SS25: 480u at 68% 6-wk ST. Slim-fit share declining 8pts/season. At this rate, AW26 would be 20% of trouser mix."},{a:"Customer Intelligence",t:"0.8s",act:"Slim-fit buyers: older demographic, higher AOV, 1.6x LTV. Small but loyal."},{a:"Synthesis",t:"1.1s",act:"460 units. Managed decline. Don't cut too deep; loyal segment.",conf:"83%"}]),qs:[]},
  {id:"S26-TR-130",name:"Cargo Jogger",sub:"Trousers",units:320,mrp:2490,cost:1046,margin:58,src:"new-design",conf:72,
    colors:[{n:"Olive",p:.40,c:LSK},{n:"Black",p:.35,c:LSK},{n:"Sand",p:.25,c:LSK}],ga:{"A+":.28,"A":.42,"B/C":.30},
    flag:{type:"opportunity",msg:"Cargo/utility trouser trending +120% in search. AW25 utility jacket tested well (76% ST). This extends the utility aesthetic to bottoms. 320 units with relaxed fit (LSK curve)."},
    hist:{},
    reason:"New sub-category. Extends the utility aesthetic from outerwear to bottoms. 320 units across all grades with conservative B/C (30%).",
    trail:T([{a:"Trend Intelligence",t:"0.3s",act:"Cargo/utility trouser search volume up 120% YoY. AW25 utility jacket achieved 76% 6-wk ST, validating the aesthetic."},{a:"Allocation Engine",t:"0.8s",act:"A+=90(28%), A=134(42%), B/C=96(30%). Total 320. LSK curve for relaxed fit."},{a:"Synthesis",t:"1.1s",act:"320 units. Utility aesthetic extension. Moderate confidence.",conf:"72%"}]),qs:[]},
  {id:"S26-BZ-131",name:"Cropped Blazer",sub:"Blazers",units:280,mrp:4290,cost:1802,margin:58,src:"new-design",conf:70,
    colors:[{n:"Black",p:.50,c:SSK},{n:"Cream",p:.50,c:SSK}],ga:{"A+":.35,"A":.45,"B/C":.20},
    flag:null,hist:{},
    reason:"New cropped silhouette. Positioned between single-button (workwear) and trend pieces. 280 units. Lighter B/C allocation (20%) since cropped blazers skew metro.",
    trail:T([{a:"Demand Planner",t:"0.3s",act:"No history. Proxy: single-button blazer averaged 82% 6-wk ST. Cropped is more fashion-forward, applied 15% discount. Target 70%."},{a:"Allocation Engine",t:"0.8s",act:"A+=98(35%), A=126(45%), B/C=56(20%). Total 280."},{a:"Synthesis",t:"1.1s",act:"280 units. Fashion-forward silhouette test.",conf:"70%"}]),qs:[]},
  {id:"S26-SK-132",name:"A-Line Mini Skirt",sub:"Skirts",units:380,mrp:1690,cost:676,margin:60,src:"new-design",conf:77,
    colors:[{n:"Black",p:.35,c:SSK},{n:"Navy",p:.25,c:SSK},{n:"Olive",p:.20,c:SSK},{n:"Cream",p:.20,c:SSK}],ga:{"A+":.24,"A":.38,"B/C":.38},
    flag:null,hist:{AW25:{u:280,st:74,m:59,w:14}},
    reason:"Shorter length option to complement the Pleated Midi. AW25 test hit 74% 6-wk ST. Scaling 36% for SS26 where mini skirts have seasonal advantage.",
    trail:T([{a:"Demand Planner",t:"0.2s",act:"AW25: 280u at 74% 6-wk ST. Mini skirts are seasonal; SS should outperform AW by 8-12pts historically."},{a:"Allocation Engine",t:"0.7s",act:"A+=91(24%), A=144(38%), B/C=145(38%). Total 380."},{a:"Synthesis",t:"1.0s",act:"380 units. Seasonal upside on AW25 base.",conf:"77%"}]),qs:[]},
  {id:"S26-JM-133",name:"Wide-Leg Jumpsuit",sub:"Jumpsuits",units:260,mrp:3990,cost:1676,margin:58,src:"new-design",conf:69,
    colors:[{n:"Black",p:.50,c:LSK},{n:"Olive",p:.50,c:LSK}],ga:{"A+":.30,"A":.45,"B/C":.25},
    flag:null,hist:{},
    reason:"New wide-leg silhouette. Extends the relaxed trouser trend into jumpsuits. 260 units with conservative B/C. Two core colors.",
    trail:T([{a:"Demand Planner",t:"0.3s",act:"No history. Wide-leg trouser growing 8pts/season suggests relaxed jumpsuit should resonate. Proxy: cotton jumpsuit at 80% 6-wk ST, discounted 15% for new silhouette."},{a:"Allocation Engine",t:"0.8s",act:"A+=78(30%), A=117(45%), B/C=65(25%). Total 260."},{a:"Synthesis",t:"1.1s",act:"260 units. Relaxed jumpsuit test.",conf:"69%"}]),qs:[]},
  {id:"S26-CD-134",name:"Knit Co-ord Set",sub:"Co-ords",units:240,mrp:3490,cost:1466,margin:58,src:"new-design",conf:66,
    colors:[{n:"Cream",p:.55,c:STD},{n:"Forest Green",p:.45,c:STD}],ga:{"A+":.35,"A":.45,"B/C":.20},
    flag:{type:"low-confidence",msg:"Knit fabric in co-ords is untested. Knit polo tested well (86% ST) but co-ord format adds complexity. 240 units, A+/A weighted."},
    hist:{},
    reason:"Extends the knit aesthetic from polos to co-ords. 240 units with metro-heavy distribution. Success validates knit as a fabric platform.",
    trail:T([{a:"Demand Planner",t:"0.3s",act:"No history. Knit polo hit 86% 6-wk ST. Co-ord format adds risk. Applied 20% discount. Target 68%."},{a:"Allocation Engine",t:"0.8s",act:"A+=84(35%), A=108(45%), B/C=48(20%). Total 240."},{a:"Synthesis",t:"1.1s",act:"240 units. Knit platform expansion.",conf:"66%"}]),qs:[]},
  {id:"S26-TP-135",name:"Linen Vest",sub:"Tops",units:180,mrp:2290,cost:961,margin:58,src:"new-design",conf:61,
    colors:[{n:"Sand",p:.50,c:STD},{n:"White",p:.50,c:STD}],ga:{"A+":.45,"A":.55},
    flag:{type:"low-confidence",msg:"Vest as a standalone piece (not layering) is untested in the brand. Linen fabric is proven but the silhouette is a category experiment. A+/A only."},
    hist:{},
    reason:"Category experiment: standalone linen vest. 180 units, A+/A only. If 6-wk ST exceeds 50%, validates the vest silhouette for AW26 layering pieces.",
    trail:T([{a:"Trend Intelligence",t:"0.4s",act:"Vest/waistcoat search volume up 85% YoY. Positioned as a layering-to-standalone transition piece."},{a:"Demand Planner",t:"1.0s",act:"Test threshold: 180 units. Target 50% 6-wk ST."},{a:"Synthesis",t:"1.4s",act:"180 units. Silhouette experiment.",conf:"61%"}]),qs:[]},
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

/* ═══ IN-SEASON LIVE DATA (AW25, Week 14 of 22) ═══ */
const WEEK=14;
const LIVE={
  "S26-DR-101":{sold:312,bySz:{XS:22,S:68,M:136,L:64,XL:22},byGr:{"A+":84,"A":134,"B/C":94},ros:{"A+":1.5,"A":0.8,"B/C":0.2},proj6:88,status:"watch",
    alerts:["M at 3 days DoC in 7/12 A+ stores; echoing the SS25 Week 5 stockout","Olive/White at 52% ST vs Black/White 48%; new color outperforming"],
    actions:[{type:"transfer",pri:"medium",act:"Transfer 14u M from B/C high-DoC stores to A+ critical stores",impact:"+2pts projected 6-wk ST",trail:"Size Curve Analyst identified M depletion rate 1.6x plan in A+. 14 B/C stores carry 2+ M units with >30 DoC. Transfer restores 7-day buffer in A+."}]},
  "S26-CD-102":{sold:168,bySz:{XS:12,S:36,M:62,L:40,XL:18},byGr:{"A+":76,"A":92,"B/C":0},ros:{"A+":1.4,"A":0.6,"B/C":0},proj6:76,status:"reorder",
    alerts:["6-wk ST projecting 76%; above 70% re-buy trigger","Beige/Black outselling Olive/Cream 62:38 (planned 55:45)"],
    actions:[{type:"rebuy",pri:"high",act:"Place 200-unit follow-on order. Supplier lead time: 4 weeks → arrives Week 8.",impact:"Captures ₹12.0L incremental revenue at full price",trail:"Demand Planner: 3-wk ROS 1.4u/A+ store/wk vs 0.85 plan; 65% above forecast. At current velocity, 420u depletes by Week 7. Re-buy of 220u extends through Week 14. Allocation Engine: Follow-on 200u → A+ 80u (40%), A 120u (60%). Synthesis: Re-buy trigger exceeded. Place order by EOD Friday to meet 4-week lead time."}]},
  "S26-TP-103":{sold:42,bySz:{XS:6,S:12,M:14,L:8,XL:2},byGr:{"A+":26,"A":16,"B/C":0},ros:{"A+":0.5,"A":0.2,"B/C":0},proj6:48,status:"watch",
    alerts:["Tracking below 60% test validation threshold","White outperforming Blush 64:36; broderie reads better on white as predicted"],
    actions:[{type:"monitor",pri:"low",act:"Hold position. Week 3→4 acceleration visible (+18% WoW). Reassess at Week 6.",impact:"No action cost. Test integrity maintained.",trail:"Trend Intelligence: Cutwork search volume spiked +40% in last 2 weeks (competitor launch driving awareness). Demand Planner: Week 1-2 was slow discovery (12u/wk). Week 3-4 averaging 15u/wk. If Week 4 trend holds, projected 6-wk ST revises to 56%; closer to threshold."}]},
  "S26-BZ-104":{sold:228,bySz:{XS:16,S:48,M:84,L:56,XL:24},byGr:{"A+":72,"A":92,"B/C":64},ros:{"A+":1.4,"A":0.7,"B/C":0.3},proj6:91,status:"on-track",
    alerts:["Dusty Rose at 96% ST vs Black 86%; non-neutral thesis validated","On track to exceed 90% target by Week 5"],
    actions:[]},
  "S26-DR-105":{sold:396,bySz:{XS:24,S:72,M:140,L:108,XL:52},byGr:{"A+":112,"A":168,"B/C":116},ros:{"A+":2.1,"A":0.9,"B/C":0.2},proj6:97,status:"critical",
    alerts:["Will stock out in A+ by Week 5 at current ROS","Terracotta 98% ST; fastest-selling color in entire plan","52% scale-up from SS25 was still insufficient"],
    actions:[{type:"rebuy",pri:"critical",act:"Emergency re-buy 300u. Supplier confirmed capacity; commit by Friday for Week 8 delivery.",impact:"Prevents ₹22.4L lost revenue. Extends sell-through to Week 14.",trail:"Demand Planner: ROS 2.1u/A+ store/wk vs 1.8 plan; 17% above forecast. At current velocity, A+ stores deplete by Week 5.2, A stores by Week 7. Combined unmet demand estimated at 280-320u. Supply Chain: Linen supplier has 300u capacity on existing fabric reservation. Must commit by Friday (Jan 20 window still open). Cost per unit unchanged. Allocation Engine: 300u → A+ 90u (30%), A 130u (43%), B/C 80u (27%). Prioritize A+ to prevent stockout. Synthesis: The 52% increase from SS25 was justified but still conservative. Immediate re-buy required."}]},
  "S26-TR-106":{sold:356,bySz:{XS:28,S:76,M:128,L:86,XL:38},byGr:{"A+":78,"A":134,"B/C":144},ros:{"A+":1.4,"A":0.8,"B/C":0.3},proj6:87,status:"on-track",
    alerts:["Olive emerging as #2 color (84% ST) behind Black (88%)","Wide-leg share of trouser sales now at 41%; ahead of projected 44% for full season"],
    actions:[]},
  "S26-DR-107":{sold:86,bySz:{XS:6,S:18,M:32,L:20,XL:10},byGr:{"A+":48,"A":38,"B/C":0},ros:{"A+":0.9,"A":0.4,"B/C":0},proj6:58,status:"watch",
    alerts:["Emerald outselling Black 58:42 (planned 50:50)","Below 70% proxy target but this is a new category; monitoring"],
    actions:[{type:"monitor",pri:"low",act:"Track through Week 6 before deciding. Occasion wear has a delayed purchase curve.",impact:"No immediate action.",trail:"Customer Intelligence: Satin Maxi buyers are browsing 3.2x before purchasing vs 1.8x avg. Longer consideration cycle consistent with occasion wear. 62% of current buyers are loyalty members spending outside the brand; validating the competitive capture thesis."}]},
  "S26-TP-108":{sold:464,bySz:{XS:32,S:100,M:162,L:112,XL:58},byGr:{"A+":102,"A":194,"B/C":168},ros:{"A+":1.8,"A":0.9,"B/C":0.3},proj6:90,status:"on-track",
    alerts:["Tracking exactly to 90% target; allocation was well-calibrated","Sand replaced Coral and is performing 14pts higher (84% vs Coral's 71% SS25)"],
    actions:[]},
  "S26-JM-109":{sold:148,bySz:{XS:10,S:32,M:52,L:36,XL:18},byGr:{"A+":52,"A":74,"B/C":22},ros:{"A+":1.2,"A":0.6,"B/C":0.2},proj6:86,status:"on-track",
    alerts:["Exceeding AW25 test velocity by 1.4x","Navy leading for work occasions, Rust for evening; occasion split validating"],
    actions:[]},
  "S26-TP-110":{sold:138,bySz:{XS:10,S:30,M:48,L:34,XL:16},byGr:{"A+":44,"A":62,"B/C":32},ros:{"A+":0.8,"A":0.4,"B/C":0.2},proj6:78,status:"on-track",
    alerts:["Tracking to 78%; below 90% target but above 80% adjusted threshold for new sub-category","67% of polo buyers are new-to-brand; acquisition thesis holding"],
    actions:[]},
  "S26-DR-111":{sold:154,bySz:{XS:12,S:34,M:54,L:36,XL:18},byGr:{"A+":42,"A":68,"B/C":44},ros:{"A+":0.8,"A":0.5,"B/C":0.1},proj6:68,status:"watch",
    alerts:["Botanical Print at 74% ST vs Ditsy 62%; large-scale print winning","B/C stores slower than expected (Ditsy dragging)"],
    actions:[{type:"transfer",pri:"medium",act:"Consolidate Ditsy Floral from bottom 40 B/C stores (1u each) → redistribute to A+ stores carrying Botanical only.",impact:"Reduces Ditsy markdown risk by ~₹1.4L",trail:"Color Analyst: Botanical is a clear winner; bolder print resonating. Ditsy underperforming in B/C where customers are more conservative. Allocation Engine: 40 B/C stores × 1u Ditsy = 40u available for transfer. Move to 12 A+ stores where both prints are selling. This tests whether Ditsy works in higher-traffic environments before deciding on AW26."}]},
  "S26-SK-112":{sold:268,bySz:{XS:18,S:58,M:94,L:66,XL:32},byGr:{"A+":56,"A":96,"B/C":116},ros:{"A+":1.0,"A":0.7,"B/C":0.2},proj6:89,status:"on-track",
    alerts:["Dusty Rose replacing Sage; 82% ST vs Sage's 68% in SS25","1 point below 90% target. Near-perfect allocation."],
    actions:[]},
  "S26-DR-113":{sold:28,bySz:{XS:4,S:8,M:8,L:6,XL:2},byGr:{"A+":16,"A":12,"B/C":0},ros:{"A+":0.3,"A":0.1,"B/C":0},proj6:34,status:"critical",
    alerts:["6-wk ST projecting 34%; below 55% diagnostic threshold","Forest Green at 40% ST vs Black 32%; color refresh did not arrest decline","Bodycon buyers down another 22% YoY in A+ catchments"],
    actions:[{type:"markdown",pri:"high",act:"Initiate consolidation: pull from bottom 8 A stores → concentrate in top 6 A+ stores. Begin 20% markdown at Week 6.",impact:"Limits markdown exposure to ₹1.8L (vs ₹3.2L if held to end-of-season)",trail:"Demand Planner: Three-season decline continues. 6-wk ST projected at 34%, well below the 55% diagnostic threshold. Forest Green did not arrest the decline; colour was not the issue, silhouette preference has structurally shifted. Customer Intelligence: Bodycon buyer segment shrinking 22% YoY. Remaining buyers migrating to ribbed knit and fitted midi. Synthesis: Recommend discontinuation for AW26. Consolidate remaining 132 units into 6 top A+ stores, mark down 20% at Week 6, clear by Week 10. Decision: DISCONTINUE after SS26."}]},
  "S26-TP-114":{sold:488,bySz:{XS:36,S:108,M:172,L:118,XL:54},byGr:{"A+":96,"A":182,"B/C":210},ros:{"A+":1.6,"A":0.8,"B/C":0.4},proj6:88,status:"on-track",alerts:["Sage added as 4th color performing at 80% ST; solid mid-range"],actions:[]},
  "S26-CD-115":{sold:148,bySz:{XS:10,S:32,M:52,L:36,XL:18},byGr:{"A+":36,"A":60,"B/C":52},ros:{"A+":0.7,"A":0.4,"B/C":0.1},proj6:80,status:"on-track",alerts:["Olive 3rd color at 76% ST; co-ord category growing steadily"],actions:[]},
  "S26-JM-116":{sold:184,bySz:{XS:14,S:40,M:64,L:44,XL:22},byGr:{"A+":44,"A":76,"B/C":64},ros:{"A+":0.8,"A":0.5,"B/C":0.1},proj6:82,status:"on-track",alerts:["Cotton jumpsuit holding; 18% return rate confirmed vs 28% for linen"],actions:[]},
  "S26-DR-117":{sold:296,bySz:{XS:22,S:62,M:104,L:72,XL:36},byGr:{"A+":64,"A":114,"B/C":118},ros:{"A+":1.2,"A":0.7,"B/C":0.2},proj6:86,status:"on-track",alerts:["Chambray leading at 90% ST; will hit target on its own"],actions:[]},
  "S26-SK-118":{sold:116,bySz:{XS:8,S:26,M:40,L:28,XL:14},byGr:{"A+":32,"A":48,"B/C":36},ros:{"A+":0.6,"A":0.3,"B/C":0.1},proj6:72,status:"on-track",alerts:["Botanical 76% ST vs Vintage 68%; bold print winning again (consistent with Floral Midi)"],actions:[]},
  "S26-TP-119":{sold:592,bySz:{XS:72,S:162,M:202,L:108,XL:48},byGr:{"A+":88,"A":184,"B/C":320},ros:{"A+":1.6,"A":0.9,"B/C":0.5},proj6:91,status:"reorder",
    alerts:["Projecting 91%; will slightly exceed target","Black/White depleting faster in B/C than planned; DoC dropping to 8 days"],
    actions:[{type:"replenish",pri:"medium",act:"Replenish 120u to B/C stores. Warehouse has 280u reserve from safety stock.",impact:"Maintains availability through Week 12. Prevents ₹1.2L lost sales.",trail:"Demand Planner: Rib Tank is the highest-velocity item in B/C stores (0.5u/store/wk). Current DoC in B/C = 8 days, below 14-day target. Allocation Engine: 120u → top 120 B/C stores × 1u each. Warehouse has 280u in safety buffer. Synthesis: Standard replenishment. This is exactly how carryover management should work; small, frequent top-ups."}]},
  "S26-TR-120":{sold:268,bySz:{XS:16,S:52,M:92,L:72,XL:36},byGr:{"A+":58,"A":106,"B/C":104},ros:{"A+":1.0,"A":0.6,"B/C":0.2},proj6:84,status:"on-track",alerts:["Palazzo performing independently; no cannibalisation with Wide-Leg confirmed"],actions:[]},
  "S26-TR-121":{sold:206,bySz:{XS:24,S:56,M:70,L:38,XL:18},byGr:{"A+":52,"A":86,"B/C":68},ros:{"A+":1.0,"A":0.5,"B/C":0.1},proj6:76,status:"on-track",alerts:["Shorts gaining acceptance; 76% projected ST for first premium shorts season"],actions:[]},
  "S26-TP-122":{sold:72,bySz:{XS:4,S:14,M:26,L:18,XL:10},byGr:{"A+":22,"A":32,"B/C":18},ros:{"A+":0.4,"A":0.2,"B/C":0.1},proj6:62,status:"watch",
    alerts:["Transitional layer; expect sales to pick up in Week 16-20 (late summer)","Currently tracking below plan but this is a known seasonal pattern"],
    actions:[{type:"monitor",pri:"low",act:"Expected. Utility jackets sell in transitional weeks. Current Week 4 velocity is consistent with AW25 early-season pattern.",impact:"No action. Revisit at Week 14.",trail:"Demand Planner: AW25 utility jacket had same pattern; 28% of sales in Wk1-4, 72% in Wk16-22. Current 72u sold (28% of 260) is exactly on the AW25 trajectory. This is a seasonal-shape issue, not a demand issue."}]},
  "S26-CD-123":{sold:88,bySz:{XS:6,S:20,M:30,L:22,XL:10},byGr:{"A+":28,"A":40,"B/C":18},ros:{"A+":0.5,"A":0.3,"B/C":0.05},proj6:66,status:"on-track",alerts:["Tropical outselling Geometric 58:42; bolder pattern preference consistent across plan"],actions:[]},
  "S26-BZ-124":{sold:132,bySz:{XS:10,S:28,M:46,L:32,XL:16},byGr:{"A+":34,"A":54,"B/C":44},ros:{"A+":0.6,"A":0.4,"B/C":0.1},proj6:74,status:"on-track",alerts:["DB blazer loyal buyers purchasing as expected; 1.4x LTV segment intact","Share loss to single-button continuing but within managed decline trajectory"],actions:[]},
  "S26-DR-125":{sold:192,bySz:{XS:14,S:42,M:68,L:46,XL:22},byGr:{"A+":46,"A":74,"B/C":72},ros:{"A+":0.9,"A":0.5,"B/C":0.1},proj6:78,status:"on-track",alerts:["Steady performer tracking to plan"],actions:[]},
  "S26-DR-126":{sold:64,bySz:{XS:4,S:12,M:22,L:18,XL:8},byGr:{"A+":28,"A":36,"B/C":0},ros:{"A+":0.5,"A":0.2,"B/C":0},proj6:56,status:"watch",alerts:["Below 64% target; maxi length slower to convert","Terracotta outselling Sage 62:38"],actions:[{type:"monitor",pri:"low",act:"Hold. Maxi dresses have longer consideration cycle. Reassess Week 6.",impact:"No action cost.",trail:"Demand Planner: Week 3-4 showing acceleration (+33% WoW). Customer Intelligence: Maxi buyers browse 4.1x before purchase vs 2.2x avg. Synthesis: Patience warranted. Review at Week 6."}]},
  "S26-TP-127":{sold:660,bySz:{XS:82,S:178,M:224,L:118,XL:58},byGr:{"A+":86,"A":198,"B/C":376},ros:{"A+":1.6,"A":0.8,"B/C":0.6},proj6:89,status:"on-track",alerts:["Near-perfect calibration; tracking 1pt below target","5-color assortment all performing within 4pts of each other"],actions:[]},
  "S26-TP-128":{sold:44,bySz:{XS:6,S:12,M:14,L:8,XL:4},byGr:{"A+":26,"A":18,"B/C":0},ros:{"A+":0.4,"A":0.1,"B/C":0},proj6:42,status:"watch",alerts:["Below 55% test threshold but Week 4 spiked +83% WoW","Instagram influencer post drove awareness mid-Week 3"],actions:[{type:"monitor",pri:"low",act:"Hold. Week 4 acceleration is dramatic. If Week 5 sustains, projected ST revises to 58%.",impact:"Test integrity maintained.",trail:"Trend Intelligence: Crochet content engagement up 340% on brand Instagram this week. Demand Planner: Week 1-2 was 10u total; Week 3-4 was 34u. If Week 5 matches Week 4 (22u), 6-wk ST projects to 58%."}]},
  "S26-TR-129":{sold:112,bySz:{XS:8,S:24,M:40,L:26,XL:14},byGr:{"A+":24,"A":44,"B/C":44},ros:{"A+":0.4,"A":0.3,"B/C":0.1},proj6:54,status:"critical",alerts:["6-wk ST projecting 54%; well below 90% target","Slim-fit decline accelerating; down 12pts from SS25 (68%)","Wide-leg outselling cigarette 2.8:1 this season"],actions:[{type:"markdown",pri:"high",act:"Reduce allocation 30%. Consolidate from bottom 60 B/C stores to top 8 A+ stores. Begin 15% markdown at Week 6.",impact:"Limits markdown exposure to ₹2.1L vs ₹4.8L if held",trail:"Demand Planner: SS25 68% ST, now tracking to 54%. Decline rate 14pts/season. Customer Intelligence: Slim-fit buyer age cohort shifting to relaxed fits. Only 22% of slim-fit buyers under 35 vs 48% two years ago. Synthesis: Structural decline confirmed. Consolidate and clear."}]},
  "S26-TR-130":{sold:128,bySz:{XS:8,S:24,M:44,L:34,XL:18},byGr:{"A+":38,"A":58,"B/C":32},ros:{"A+":0.7,"A":0.4,"B/C":0.1},proj6:82,status:"on-track",alerts:["Exceeding plan; cargo trending strongly","Olive at 86% ST leading all colors"],actions:[]},
  "S26-BZ-131":{sold:98,bySz:{XS:12,S:26,M:32,L:18,XL:10},byGr:{"A+":38,"A":46,"B/C":14},ros:{"A+":0.7,"A":0.3,"B/C":0.1},proj6:72,status:"on-track",alerts:["Tracking above 70% target for new silhouette","Cream outselling Black 54:46; unexpected for blazer category"],actions:[]},
  "S26-SK-132":{sold:132,bySz:{XS:18,S:36,M:42,L:24,XL:12},byGr:{"A+":34,"A":52,"B/C":46},ros:{"A+":0.6,"A":0.4,"B/C":0.1},proj6:74,status:"on-track",alerts:["Outperforming AW25 base (74% vs AW25 projected equivalent 68%)"],actions:[]},
  "S26-JM-133":{sold:86,bySz:{XS:6,S:18,M:30,L:22,XL:10},byGr:{"A+":28,"A":40,"B/C":18},ros:{"A+":0.5,"A":0.3,"B/C":0.1},proj6:68,status:"on-track",alerts:["Tracking just below 69% target for new silhouette"],actions:[]},
  "S26-CD-134":{sold:70,bySz:{XS:4,S:16,M:24,L:18,XL:8},byGr:{"A+":28,"A":32,"B/C":10},ros:{"A+":0.5,"A":0.2,"B/C":0.04},proj6:62,status:"watch",alerts:["Below 68% target; knit co-ord slower than expected","Forest Green underperforming Cream 38:62"],actions:[{type:"monitor",pri:"low",act:"Track through Week 6. Knit fabric has seasonal headwind in early summer. May accelerate in Wk 8-12 as evenings cool.",impact:"No action.",trail:"Demand Planner: Week 1-2 slow (24u), Week 3-4 accelerating (46u). Seasonal pattern consistent with knit polo AW25 which had 60% of sales in second half. Synthesis: Hold position."}]},
  "S26-TP-135":{sold:38,bySz:{XS:2,S:8,M:14,L:10,XL:4},byGr:{"A+":18,"A":20,"B/C":0},ros:{"A+":0.3,"A":0.1,"B/C":0},proj6:40,status:"watch",alerts:["Below 50% test threshold","Sand outselling White 68:32; earthy tones resonating"],actions:[{type:"monitor",pri:"low",act:"Hold. Vest silhouette has slow discovery curve. Social seeding planned for Week 5.",impact:"No action yet.",trail:"Trend Intelligence: Vest styling content planned for brand Instagram Wk5. Demand Planner: Current velocity low but returns are near-zero (3% vs category avg 18%). Synthesis: Low volume but high quality demand signal."}]},
};


/* ═══ WEEKLY SELL-THROUGH (units per week) ═══ */
const WK_DATA={
  "S26-DR-101":[62,72,84,94],"S26-CD-102":[28,36,46,58],"S26-TP-103":[6,8,12,16],
  "S26-BZ-104":[42,52,62,72],"S26-DR-105":[68,88,112,128],"S26-TR-106":[72,84,96,104],
  "S26-DR-107":[14,18,24,30],"S26-TP-108":[96,108,124,136],"S26-JM-109":[28,34,40,46],
  "S26-TP-110":[26,32,38,42],"S26-DR-111":[30,36,42,46],"S26-SK-112":[54,62,72,80],
  "S26-DR-113":[10,8,6,4],"S26-TP-114":[108,118,126,136],"S26-CD-115":[30,34,40,44],
  "S26-JM-116":[38,44,48,54],"S26-DR-117":[62,70,78,86],"S26-SK-118":[22,26,32,36],
  "S26-TP-119":[128,142,156,166],"S26-TR-120":[56,64,72,76],"S26-TR-121":[42,48,56,60],
  "S26-TP-122":[24,20,16,12],"S26-CD-123":[16,20,24,28],"S26-BZ-124":[28,32,36,36],
  "S26-DR-125":[36,42,52,62],"S26-DR-126":[8,14,18,24],"S26-TP-127":[142,158,172,188],
  "S26-TP-128":[4,6,12,22],"S26-TR-129":[34,30,26,22],"S26-TR-130":[18,26,36,48],
  "S26-BZ-131":[14,22,28,34],"S26-SK-132":[24,30,36,42],"S26-JM-133":[12,18,24,32],
  "S26-CD-134":[8,14,20,28],"S26-TP-135":[4,6,10,18],
};
const STATUS_META={
  "critical":{l:"Critical",bg:"#FDF0F0",clr:"#B33A3A",bd:"rgba(179,58,58,0.2)",icon:"!"},
  "reorder":{l:"Reorder",bg:"#F0F5FF",clr:"#2B5EA7",bd:"rgba(43,94,167,0.2)",icon:"↻"},
  "watch":{l:"Watch",bg:C.amberSoft,clr:C.amber,bd:C.amberBorder,icon:"◉"},
  "on-track":{l:"On Track",bg:C.sageSoft,clr:C.sage,bd:C.sageBorder,icon:"✓"},
  "monitor":{l:"Monitor",bg:C.bgSub,clr:C.dim,bd:C.border,icon:"—"},
};
const ACTION_META={
  "rebuy":{l:"Re-buy",bg:"#FDF0F0",clr:"#B33A3A",bd:"rgba(179,58,58,0.2)"},
  "transfer":{l:"Transfer",bg:C.amberSoft,clr:C.amber,bd:C.amberBorder},
  "replenish":{l:"Replenish",bg:"#F0F5FF",clr:"#2B5EA7",bd:"rgba(43,94,167,0.2)"},
  "markdown":{l:"Markdown",bg:"#FDF0F0",clr:"#B33A3A",bd:"rgba(179,58,58,0.2)"},
  "monitor":{l:"Monitor",bg:C.bgSub,clr:C.dim,bd:C.border},
};
const STATUS_PRI={"critical":0,"reorder":1,"watch":2,"on-track":3,"monitor":4};
function storeAggCalc(styles,edits){
  return STORE_DB.filter(s=>s.grade==="A+"||s.grade==="A").map(st=>{
    const sl=styles.map(s=>{const u=edits[s.id]?.units??s.units;const gu=Math.round(u*(s.ga[st.grade]||0));const sts=gradeStores(st.grade).length||1;const su=Math.round(gu/sts);return su>0?{id:s.id,name:s.name,sub:s.sub,units:su,mrp:s.mrp,oneSize:s.oneSize}:null;}).filter(Boolean);
    return {code:st.code,name:st.name,city:st.city,grade:st.grade,sp:st.sp,sl,sc:sl.length,tu:sl.reduce((a,x)=>a+x.units,0),tv:sl.reduce((a,x)=>a+x.units*x.mrp,0)};
  }).sort((a,b)=>b.tu-a.tu);
}

/* ═══ WAREHOUSE STOCK (carryover styles) ═══ */
const WH={
  "S26-DR-101":{stock:147,buf:22},"S26-BZ-104":{stock:83,buf:14},"S26-DR-105":{stock:0,buf:0},
  "S26-TR-106":{stock:117,buf:18},"S26-TP-108":{stock:163,buf:24},"S26-SK-112":{stock:90,buf:15},
  "S26-DR-113":{stock:0,buf:0},"S26-TP-114":{stock:200,buf:30},"S26-CD-115":{stock:52,buf:10},
  "S26-JM-116":{stock:68,buf:12},"S26-DR-117":{stock:110,buf:18},"S26-TP-119":{stock:276,buf:38},
  "S26-TR-120":{stock:100,buf:15},"S26-BZ-124":{stock:60,buf:10},
};

/* ═══ TRANSFER RECOMMENDATIONS ═══ */
const XFERS=[
  {id:"T01",sid:"S26-DR-101",sz:"M",from:"FL12",to:"FL01",u:3,doc_from:22,doc_to:2,impact:13470},
  {id:"T02",sid:"S26-DR-101",sz:"M",from:"FL08",to:"FL03",u:2,doc_from:18,doc_to:3,impact:8980},
  {id:"T03",sid:"S26-DR-101",sz:"M",from:"PR19",to:"FL05",u:2,doc_from:20,doc_to:4,impact:8980},
  {id:"T04",sid:"S26-DR-101",sz:"M",from:"PR20",to:"FL07",u:2,doc_from:24,doc_to:3,impact:8980},
  {id:"T05",sid:"S26-DR-101",sz:"S",from:"FL12",to:"FL02",u:2,doc_from:16,doc_to:5,impact:8980},
  {id:"T06",sid:"S26-DR-111",sz:"M",from:"PR16",to:"FL01",u:1,doc_from:30,doc_to:6,impact:3490},
  {id:"T07",sid:"S26-DR-111",sz:"M",from:"PR17",to:"FL03",u:1,doc_from:28,doc_to:5,impact:3490},
  {id:"T08",sid:"S26-TR-106",sz:"L",from:"PR19",to:"FL04",u:2,doc_from:20,doc_to:6,impact:4980},
  {id:"T09",sid:"S26-TP-108",sz:"M",from:"FL12",to:"FL01",u:3,doc_from:16,doc_to:4,impact:5670},
  {id:"T10",sid:"S26-TP-108",sz:"M",from:"PR21",to:"FL05",u:2,doc_from:18,doc_to:5,impact:3780},
];

/* ═══ CONSOLIDATION CANDIDATES ═══ */
const CONSOL=[
  {sid:"S26-DR-113",action:"markdown",timing:"Week 6",discount:20,pullFrom:8,consolidateTo:6,residual:132,exposure:394680,savedExposure:237600,
    reason:"6-wk ST projecting 34%. Silhouette structurally declining. Pull from bottom 8 A stores → top 6 A+ stores. Mark down 20% at Week 6 to clear by Week 10."},
  {sid:"S26-DR-111",action:"rebalance",timing:"Week 5",discount:0,pullFrom:40,consolidateTo:12,residual:0,exposure:0,savedExposure:48860,
    reason:"Ditsy Floral underperforming in B/C (62% ST vs Botanical 74%). Pull 40 B/C Ditsy units → redistribute to A+ stores where both prints sell."},
  {sid:"S26-TP-122",action:"hold",timing:"Week 14",discount:0,pullFrom:0,consolidateTo:0,residual:188,exposure:0,savedExposure:0,
    reason:"Utility Jacket is a transitional layer; 72% of sales expected in Wk16-20. Current trajectory matches AW25 seasonal shape. No action until Week 14 review."},
];

/* ═══ MAIN ═══ */
export default function BuyPlan(){
  const [nav,setNav]=useState("alloc-sku");
  const [seasonOpen,setSeasonOpen]=useState(false);const [sideCollapsed,setSideCollapsed]=useState(false);const [chatOpen,setChatOpen]=useState(false);
  const [search,setSearch]=useState("");
  const [filterSrc,setFilterSrc]=useState("all");
  const [filterStatus,setFilterStatus]=useState("all");
  const [exp,setExp]=useState(null);const [stExp,setStExp]=useState(null);const [opExp,setOpExp]=useState(null);const [perfExp,setPerfExp]=useState(null);
  const [edits,setEdits]=useState({});const [editLog,setEditLog]=useState({});
  const [editing,setEditing]=useState(null);const [editVal,setEditVal]=useState("");
  const [scenario,setScenario]=useState(null);const [reason,setReason]=useState("");
  const [trail,setTrail]=useState(null);/* trail = {id, action?} or null */const [questt,setQuestt]=useState(false);
  const [questtCtx,setQuesttCtx]=useState(null);/* {style, question} */
  const [activeSeason,setActiveSeason]=useState("SS26");
  const isPast=!["SS26","AW25"].includes(activeSeason);const isLive=activeSeason==="AW25";
  const [storeEdit,setStoreEdit]=useState(null);const [gradeExp,setGradeExp]=useState(null);
  
  const [approved,setApproved]=useState({});

  const styles=useMemo(()=>RAW.map(s=>({...s,units:edits[s.id]?.units??s.units})),[edits]);
  const totU=useMemo(()=>styles.reduce((a,s)=>a+s.units,0),[styles]);
  const totV=useMemo(()=>styles.reduce((a,s)=>a+s.units*s.mrp,0),[styles]);
  const sa=useMemo(()=>storeAggCalc(styles,edits),[styles,edits]);
  const bcU=useMemo(()=>styles.reduce((a,s)=>a+Math.round(s.units*(s.ga["B/C"]||0)),0),[styles]);
  const bcV=useMemo(()=>styles.reduce((a,s)=>a+Math.round(s.units*(s.ga["B/C"]||0))*s.mrp,0),[styles]);
  const initCats=()=>{const o={};RAW.forEach(s=>{o[s.sub]=true;});return o;};
  const [catOpen,setCatOpen]=useState(initCats);
  const grouped=useMemo(()=>{const g={};styles.forEach(s=>{if(!g[s.sub])g[s.sub]={styles:[],units:0};g[s.sub].styles.push(s);g[s.sub].units+=s.units;});return Object.entries(g).sort((a,b)=>b[1].units-a[1].units).map(([cat,d])=>({cat,styles:d.styles.sort((a,b)=>b.units-a.units),units:d.units,count:d.styles.length}));},[styles]);
  const otb=4.8;

  /* Operate computed */
  const liveStyles=useMemo(()=>styles.map(s=>{const lv=LIVE[s.id];if(!lv)return {...s,live:{sold:0,proj6:0,status:"on-track",alerts:[],actions:[],bySz:{},byGr:{},ros:{}}};return {...s,live:lv};}).sort((a,b)=>(STATUS_PRI[a.live.status]??4)-(STATUS_PRI[b.live.status]??4)),[styles]);
  const liveSold=useMemo(()=>liveStyles.reduce((a,s)=>a+s.live.sold,0),[liveStyles]);
  const liveRev=useMemo(()=>liveStyles.reduce((a,s)=>a+s.live.sold*s.mrp,0),[liveStyles]);
  const avgProj6=useMemo(()=>{const ws=liveStyles.filter(s=>s.live.sold>0);return ws.length?Math.round(ws.reduce((a,s)=>a+s.live.proj6,0)/ws.length):0;},[liveStyles]);
  const statusCounts=useMemo(()=>{const c={critical:0,reorder:0,watch:0,"on-track":0};liveStyles.forEach(s=>{c[s.live.status]=(c[s.live.status]||0)+1;});return c;},[liveStyles]);
  const attentionStyles=useMemo(()=>liveStyles.filter(s=>s.live.status!=="on-track"),[liveStyles]);
  const trackStyles=useMemo(()=>liveStyles.filter(s=>s.live.status==="on-track"),[liveStyles]);

  /* Replenishment computed */
  const replenStyles=useMemo(()=>styles.filter(s=>s.src==="carryover"&&WH[s.id]).map(s=>{
    const lv=LIVE[s.id]||{sold:0,ros:{"A+":0,"A":0,"B/C":0},byGr:{}};const wh=WH[s.id];
    const remaining=s.units-lv.sold;const avgROS=(lv.ros["A+"]||0)*0.3+(lv.ros["A"]||0)*0.5+(lv.ros["B/C"]||0)*0.2;
    const docDays=avgROS>0?Math.round(remaining/(avgROS*33)):99;const needsReplen=docDays<14&&wh.stock>wh.buf;
    const replenQty=needsReplen?Math.min(Math.round(avgROS*33*7),wh.stock-wh.buf):0;
    return {...s,wh,remaining,avgROS,docDays,needsReplen,replenQty,live:lv};
  }).sort((a,b)=>a.docDays-b.docDays),[styles]);

  const rebuyOTB=useMemo(()=>{let cost=0;Object.entries(approved).filter(([_,v])=>v).forEach(([k])=>{
    const parts=k.split("-");const type=parts[0];const id=parts.slice(1).join("-");
    if(type==="rebuy"){const s=RAW.find(r=>r.id===id);const lv=LIVE[id];if(s&&lv&&lv.actions?.[0]){const qty=parseInt((lv.actions[0].act.match(/(\d+)u/)||["","0"])[1])||0;cost+=qty*s.cost;}}
    if(type==="replenish"){const s=RAW.find(r=>r.id===id);const rs=replenStyles.find(r=>r.id===id);if(s&&rs)cost+=rs.replenQty*s.cost;}
  });return cost;},[approved,replenStyles]);
  const adjV=totV+rebuyOTB;const pctUsed=(adjV/1e7/otb*100);

  const startEdit=(sid,v)=>{setEditing(sid);setEditVal(String(v));};
  const submitEdit=(sid)=>{const nv=parseInt(editVal,10);const s=RAW.find(x=>x.id===sid);const ov=edits[sid]?.units??s.units;setEditing(null);if(isNaN(nv)||nv<0||nv===ov)return;setScenario({sid,ov,nv});};
  const commit=(sc)=>{if(!scenario)return;const{sid,ov,nv}=scenario;setEdits(p=>({...p,[sid]:{...p[sid],units:nv}}));if(reason.trim())setEditLog(p=>({...p,[sid]:[...(p[sid]||[]),{from:ov,to:nv,sc:sc.label,reason:reason.trim(),t:new Date().toLocaleTimeString()}]}));setScenario(null);setReason("");};
  const isReplenSection=nav.startsWith("rep-");
  const approveCount=Object.values(approved).filter(Boolean).length;
  const [selected,setSelected]=useState({});
  const selCount=Object.values(selected).filter(Boolean).length;
  const toggleSel=(k)=>setSelected(p=>({...p,[k]:!p[k]}));
  const selectAll=(keys)=>{const allOn=keys.every(k=>selected[k]);setSelected(p=>{const n={...p};keys.forEach(k=>{n[k]=!allOn;});return n;});};
  const approveSelected=()=>{const n={...approved};Object.entries(selected).filter(([_,v])=>v).forEach(([k])=>{n[k]=true;});setApproved(n);setSelected({});};
  const UPDATED="1 Apr 2026, 10:42 AM IST";

  /* ═══ QUESTT RESPONSE GENERATOR ═══ */
  const getQResponse=(q,s)=>{const lv=LIVE[s?.id]||{};const h=s?.hist||{};
    if(q.includes("at")&&q.includes("%"))return `${s.name} is projecting ${lv.proj6}% 6-week sell-through. The primary driver is ${lv.proj6>=90?"strong demand across all grades; ROS is exceeding plan in A+ stores ("+((lv.ros||{})["A+"]||0).toFixed(1)+"u/store/wk vs planned), which means we slightly under-allocated.":"a combination of factors: "+(lv.proj6>=75?"demand is tracking close to plan but some size/color combinations are underperforming. ":"demand is significantly below plan, particularly in "+(((lv.byGr||{})["B/C"]||0)<10?"B/C stores where ROS is near zero.":"lower-grade stores."))} ${h.SS25?`For context, SS25 did ${h.SS25.st}% ST at ${h.SS25.u} units; ${lv.proj6>h.SS25.st?"we're outperforming last season.":"we're tracking below last season."}`:"This is a new style with no historical benchmark."}`;
    if(q.includes("Store-level")||q.includes("store"))return `Here's the grade-level breakdown for ${s.name}:\n\n• A+ (12 stores): ${(lv.byGr||{})["A+"]||0} of ${Math.round(s.units*(s.ga["A+"]||0))} sold; ROS ${((lv.ros||{})["A+"]||0).toFixed(1)}u/store/wk${((lv.ros||{})["A+"]||0)>1.2?" (above plan)":" (at or below plan)"}\n• A (21 stores): ${(lv.byGr||{})["A"]||0} of ${Math.round(s.units*(s.ga["A"]||0))} sold; ROS ${((lv.ros||{})["A"]||0).toFixed(1)}u/store/wk\n• B/C (~280 stores): ${(lv.byGr||{})["B/C"]||0} of ${Math.round(s.units*(s.ga["B/C"]||0))} sold; ROS ${((lv.ros||{})["B/C"]||0).toFixed(1)}u/store/wk\n\nTop performing: ${STORE_DB[0].name} (${STORE_DB[0].code}), ${STORE_DB[2].name} (${STORE_DB[2].code}). ${((lv.ros||{})["A+"]||0)>1.5?"A+ stores are depleting fastest; consider prioritizing replenishment here.":"Performance is relatively even across grades."}`;
    if(q.includes("don't act")||q.includes("if we"))return `If no action is taken on ${s.name}:\n\n${lv.proj6>=90?"• A+ stores will likely stock out by Week "+(5+Math.round(Math.random()*2))+", resulting in an estimated "+Math.round(s.units*0.15)+" units of lost demand (₹"+(s.units*0.15*s.mrp/1e5).toFixed(1)+"L revenue at risk)\n• Customers encountering stockouts have a 34% probability of switching to competitor brands":"• Current trajectory suggests "+lv.proj6+"% 6-wk ST; "+(lv.proj6>=75?"close to but below the 90% target. No immediate stockout risk but you're leaving demand on the table.":"significantly below target. Remaining inventory will require markdown at end-of-season, estimated at 20-30% discount.")}\n\n${(lv.actions||[]).length>0?"The recommended action addresses this: "+lv.actions[0].act:"No specific action is recommended at this time; continue monitoring."}`;
    if(q.includes("risk")||q.includes("missing"))return `${attentionStyles.length} styles are at risk of missing the 90% 6-wk ST target:\n\n${attentionStyles.slice(0,5).map(as=>`• ${as.name}: projecting ${as.live.proj6}% (${STATUS_META[as.live.status].l})`).join("\n")}\n\nThe most critical is ${attentionStyles[0]?.name}; ${attentionStyles[0]?.live.alerts?.[0]||"needs immediate attention"}.`;
    if(q.includes("re-buy")||q.includes("Linen Wrap"))return `The Linen Wrap Dress is our fastest-selling style; projecting 97% 6-wk ST, which means we under-allocated even after the 52% increase from SS25.\n\nThe supplier (confirmed via vendor portal query on March 28) has 300u capacity on the existing linen reservation. Lead time is 4 weeks from commitment. If we commit by Friday, goods arrive Week 8 and extend sell-through to Week 14.\n\nDistribution: A+ 90u (12 stores × ~8u), A 130u (21 stores × ~6u), B/C 80u. Prioritize A+ where ROS is 2.1u/store/wk.`;
    if(q.includes("size")||q.includes("M size"))return `M size depletion across the plan:\n\n${liveStyles.filter(ls=>ls.live.sold>0).slice(0,6).map(ls=>{const mPlanned=Math.round(ls.units*0.36);const mSold=(ls.live.bySz||{}).M||0;return `• ${ls.name}: M at ${mPlanned>0?Math.round(mSold/mPlanned*100):0}% ST (${mSold}/${mPlanned})`;}).join("\n")}\n\nThe Stripe Midi Dress M size is the most critical; echoing the SS25 Week 5 stockout pattern. Transfer recommendation is active.`;
    if(q.includes("category")||q.includes("underperforming")){const cats=Object.entries(liveStyles.reduce((a,ls)=>{if(!a[ls.sub])a[ls.sub]={n:0,p:0};a[ls.sub].n++;a[ls.sub].p+=ls.live.proj6;return a;},{})).map(([c,d])=>({c,avg:Math.round(d.p/d.n)})).sort((a,b)=>a.avg-b.avg);return `Category performance (avg projected 6-wk ST):\n\n${cats.map(c=>`• ${c.c}: ${c.avg}%${c.avg<70?" ⚠ below target":c.avg>=85?" ✓ strong":""}`).join("\n")}\n\n${cats[0].avg<70?`${cats[0].c} is the weakest category at ${cats[0].avg}%. Consider rebalancing allocation toward ${cats[cats.length-1].c} (${cats[cats.length-1].avg}%).`:""}`;}
    if(q.includes("compare")||q.includes("blazer")){const blazers=liveStyles.filter(ls=>ls.sub==="Blazers");return `Blazer comparison:\n\n${blazers.map(b=>`• ${b.name}: ${b.live.sold}/${b.units} sold (${b.live.proj6}% proj ST)\n  ${b.live.alerts?.[0]||"Tracking to plan"}`).join("\n\n")}\n\nSingle-Button (91% proj) is outperforming Double-Breasted (74% proj) 2.8:1 in unit velocity. Non-neutral color (Dusty Rose) is the breakthrough; Cream is the surprise in Cropped.`;}
    if(q.includes("color")||q.includes("olive")||q.includes("trending")){return `Color performance across the plan:\n\nTop performers by sell-through:\n• Terracotta: 98% ST (Linen Wrap Dress); fastest-selling single color\n• Dusty Rose: 96% ST (Single-Button Blazer); driving non-neutral retention\n• Olive: averaging 84% ST across 6 styles; SS26 breakout color\n• Chambray: 90% ST (Button-Down Shirt Dress); unexpected strength\n\nUnderperformers:\n• Ditsy Floral: 62% ST (Floral Midi); subtle prints losing to bold\n• Sage: mixed results; strong in some (Cropped Boxy 80%) but weak in others\n\nNon-neutral buyers show 92% retention rate vs 68% for neutral-only. This validates expanding the color palette.`;}
    return `I can help you investigate ${s?.name||"this topic"} further. Try asking about specific styles, categories, colors, store performance, or size issues.`;
  };
  const openQuestt=(s,q)=>{setQuesttCtx({style:s,question:q});setChatOpen(true);};

  /* ═══ PAST SEASON DATA ═══ */
  const PAST_DATA={
    AW25:{label:"Autumn Winter 2025",status:"Live",wk:"Wk 14/22",styles:22,units:"11.2K",budget:"₹3.6Cr",margin:"57.1%",stAvg:"76%",
      topStyles:[{name:"Single-Button Blazer",st:82,u:380,sold:312},{name:"Wide-Leg Trouser",st:81,u:620,sold:502},{name:"V-Neck Jumpsuit",st:91,u:120,sold:109},{name:"Knit Polo",st:86,u:120,sold:103},{name:"Utility Jacket",st:76,u:220,sold:167}],
      topStores:[{name:"Flagship One",code:"FL01",st:84,u:186},{name:"Flagship Three",code:"FL03",st:82,u:174},{name:"Flagship Two",code:"FL02",st:81,u:168}]},
    SS25:{label:"Spring Summer 2025",status:"Complete",wk:"Final",styles:20,units:"10.4K",budget:"₹3.2Cr",margin:"58.2%",stAvg:"81%",
      topStyles:[{name:"Linen Wrap Dress",st:93,u:500,sold:465},{name:"Rib Tank Top",st:90,u:1300,sold:1170},{name:"Relaxed Linen Shirt",st:88,u:860,sold:757},{name:"Wide-Leg Trouser",st:86,u:700,sold:602},{name:"Stripe Midi Dress",st:94,u:540,sold:508}],
      topStores:[{name:"Flagship One",code:"FL01",st:88,u:172},{name:"Flagship Three",code:"FL03",st:86,u:164},{name:"Flagship Two",code:"FL02",st:85,u:160}]},
    AW24:{label:"Autumn Winter 2024",status:"Complete",wk:"Final",styles:18,units:"9.8K",budget:"₹3.1Cr",margin:"55.8%",stAvg:"78%",
      topStyles:[{name:"Wool Blend Blazer",st:82,u:360,sold:296},{name:"Knit Midi Dress",st:80,u:420,sold:336},{name:"Corduroy Wide-Leg",st:77,u:380,sold:292},{name:"Quilted Jacket",st:75,u:280,sold:210}],
      topStores:[{name:"Flagship One",code:"FL01",st:82,u:158},{name:"Flagship Three",code:"FL03",st:80,u:148},{name:"Flagship Two",code:"FL02",st:79,u:142}]},
    SS24:{label:"Spring Summer 2024",status:"Complete",wk:"Final",styles:16,units:"8.6K",budget:"₹2.7Cr",margin:"54.2%",stAvg:"74%",
      topStyles:[{name:"Cotton Shirt Dress",st:76,u:480,sold:365},{name:"Linen Palazzo",st:74,u:400,sold:296},{name:"Printed Co-ord",st:76,u:300,sold:228},{name:"Rib Tank Top",st:72,u:680,sold:490}],
      topStores:[{name:"Flagship One",code:"FL01",st:80,u:142},{name:"Flagship Three",code:"FL03",st:78,u:134},{name:"Flagship Two",code:"FL02",st:76,u:128}]},
  };
  const pastSeason=PAST_DATA[activeSeason]||null;

  const EU=({sid,value})=>{const isE=editing===sid;const orig=RAW.find(x=>x.id===sid)?.units;const ch=edits[sid]?.units!==undefined&&value!==orig;
    if(isE) return (<input autoFocus type="text" value={editVal} onChange={e=>setEditVal(e.target.value)} onBlur={()=>submitEdit(sid)} onKeyDown={e=>{if(e.key==="Enter")submitEdit(sid);if(e.key==="Escape")setEditing(null);}} style={{width:72,fontSize:14,fontFamily:"monospace",fontWeight:600,border:`2px solid ${C.sage}`,borderRadius:4,padding:"3px 8px",outline:"none",textAlign:"right",background:C.sageSoft}}/>);
    return (<span onClick={e=>{e.stopPropagation();startEdit(sid,value);}} style={{display:"inline-flex",alignItems:"center",gap:4,fontFamily:"monospace",fontWeight:600,fontSize:14,cursor:"pointer",padding:"3px 8px",borderRadius:4,border:`1px dashed ${ch?C.sage:C.border}`,background:ch?C.sageSoft:"transparent",color:ch?C.green:C.text}}>{value.toLocaleString()}<span style={{color:ch?C.sage:C.dimmer,opacity:.5}}><Pencil/></span></span>);
  };

  /* ═══ SIDEBAR ═══ */
  const NAV_ITEMS=[
    {group:"ALLOCATION",items:[{id:"alloc-sku",l:"By SKU",ico:"☰"},{id:"alloc-store",l:"By Store",ico:"⊞"}]},
    {group:"REPLENISHMENT",items:[{id:"rep-overall",l:"Overall",ico:"◎"},{id:"rep-s2s",l:"Store ↔ Store",ico:"⇄"},{id:"rep-s2w",l:"Store ↔ WH",ico:"↓"},{id:"rep-consol",l:"Consolidation",ico:"⊘"}]},
    {group:"PERFORMANCE",items:[{id:"perf-overview",l:"Overview",ico:"◈"},{id:"perf-sku",l:"By SKU",ico:"▤"},{id:"perf-store",l:"By Store",ico:"▥"}]},
  ];const sc=sideCollapsed;
  const Sidebar=()=> (
    <div style={{width:sc?56:220,height:"100vh",background:C.green,overflowY:"auto",display:"flex",flexDirection:"column",flexShrink:0,transition:"width 0.2s",overflow:"hidden"}}>
      <div style={{padding:sc?"14px":"16px 16px 12px",display:"flex",alignItems:"center",justifyContent:sc?"center":"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:sc?0:8,cursor:sc?"pointer":"default"}} onClick={sc?()=>setSideCollapsed(false):undefined}>
          <div style={{width:26,height:26,borderRadius:13,background:"rgba(255,255,255,.1)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{color:"#fff",fontSize:11,fontWeight:700}}>q</span></div>
        </div>
        {!sc&&<button onClick={()=>setSideCollapsed(true)} style={{background:"none",border:"none",color:"rgba(255,255,255,.25)",fontSize:14,cursor:"pointer",padding:"2px 4px"}}>◂</button>}
      </div>
      {!sc&&<div style={{padding:"0 10px 10px"}}>
        <div onClick={()=>setSeasonOpen(!seasonOpen)} style={{padding:"7px 10px",background:"rgba(255,255,255,.06)",borderRadius:6,border:"1px solid rgba(255,255,255,.08)",cursor:"pointer"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}><span style={{fontSize:9,color:"rgba(255,255,255,.35)",fontWeight:600,letterSpacing:.5}}>SEASON</span><span style={{fontSize:9,color:"rgba(255,255,255,.25)",transform:seasonOpen?"rotate(180deg)":"",transition:"transform 0.15s"}}>▾</span></div>
          <div style={{fontSize:13,fontWeight:600,color:"#fff",marginTop:1,fontFamily:serif}}>{activeSeason==="SS26"?"SS26":activeSeason==="AW25"?"AW25":pastSeason?.label||activeSeason}</div>
          <div style={{fontSize:10,color:"rgba(255,255,255,.4)",marginTop:1}}>{activeSeason==="SS26"?`${styles.length} styles · ₹${(adjV/1e7).toFixed(1)}Cr / ₹${otb}Cr OTB`:activeSeason==="AW25"?"In-Season · Wk 14":isPast?pastSeason?.wk||"":""}</div>
        </div>
        {seasonOpen&&<div onClick={e=>e.stopPropagation()} style={{marginTop:3,borderRadius:5,overflow:"hidden",border:"1px solid rgba(255,255,255,.08)"}}>
          {[{id:"SS26",l:"SS26",s:"Planning"},{id:"AW25",l:"AW25",s:"In-Season"},{id:"SS25",l:"SS25",s:"Complete"},{id:"AW24",l:"AW24",s:"Complete"},{id:"SS24",l:"SS24",s:"Complete"}].map((sn,i)=> (
            <div key={sn.id} onClick={e=>{e.stopPropagation();setActiveSeason(sn.id);setSeasonOpen(false);setNav(sn.id==="SS26"?"alloc-sku":sn.id==="AW25"?"rep-overall":"perf-overview");}} style={{padding:"5px 10px",background:activeSeason===sn.id?"rgba(59,184,150,.15)":"transparent",cursor:"pointer",borderBottom:i<4?"1px solid rgba(255,255,255,.04)":"none",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:11,fontWeight:activeSeason===sn.id?600:400,color:activeSeason===sn.id?"#3BB896":"rgba(255,255,255,.5)"}}>{sn.l}</span><span style={{fontSize:9,color:"rgba(255,255,255,.25)"}}>{sn.s}</span>
            </div>))}
        </div>}
      </div>}
      <div style={{flex:1,padding:sc?"0 4px":"0 6px",overflow:"auto"}}>
        {NAV_ITEMS.map(grp=> (<div key={grp.group} style={{marginBottom:4}}>
          {!sc&&<div style={{padding:"5px 10px 2px",fontSize:9,fontWeight:700,letterSpacing:.7,color:"rgba(255,255,255,.2)"}}>{grp.group}</div>}
          {sc&&<div style={{height:1,background:"rgba(255,255,255,.06)",margin:"4px 6px"}}/>}
          {grp.items.map(item=>{const active=nav===item.id;const ha=item.id==="rep-overall"&&(statusCounts.critical||0)>0;
            const isAlloc=item.id.startsWith("alloc");const isRep=item.id.startsWith("rep-");const isPerf=item.id.startsWith("perf");
            const disabled=(activeSeason==="SS26"&&(isRep||isPerf))||(activeSeason!=="SS26"&&isAlloc)||(["SS25","AW24","SS24"].includes(activeSeason)&&isRep);
            return (<button key={item.id} onClick={disabled?undefined:()=>{setNav(item.id);setSelected({});}} title={sc?item.l:disabled?(isAlloc?"Switch to SS26 to view allocation":isRep?"Switch to AW25 for live data":""):""} style={{display:"flex",alignItems:"center",justifyContent:sc?"center":"flex-start",gap:5,width:"100%",padding:sc?"6px":"5px 10px",borderRadius:4,border:"none",background:active&&!disabled?"rgba(255,255,255,.12)":"transparent",color:disabled?"rgba(255,255,255,.18)":active?"#fff":"rgba(255,255,255,.45)",fontSize:sc?13:12,fontWeight:active&&!disabled?600:400,cursor:disabled?"default":"pointer",fontFamily:font,textAlign:"left",marginBottom:1,borderLeft:sc?"none":active&&!disabled?"2px solid #3BB896":"2px solid transparent",transition:"all 0.1s"}}>
              {sc?<span>{item.ico}</span>:<>{item.l}{ha&&!disabled&&<span style={{width:5,height:5,borderRadius:3,background:"#FF8A80",marginLeft:"auto"}}/>}{disabled&&!sc&&<span style={{fontSize:8,color:"rgba(255,255,255,.15)",marginLeft:"auto"}}>●</span>}</>}
            </button>);})}
        </div>))}
      </div>
      <div style={{padding:sc?"6px 4px":"8px 10px",borderTop:"1px solid rgba(255,255,255,.06)"}}>
        <button onClick={()=>setChatOpen(!chatOpen)} style={{width:"100%",padding:sc?"6px":"7px 10px",borderRadius:5,border:"1px solid rgba(59,184,150,.25)",background:chatOpen?"rgba(59,184,150,.15)":"rgba(59,184,150,.06)",display:"flex",alignItems:"center",justifyContent:sc?"center":"flex-start",gap:6,cursor:"pointer",fontFamily:font}}>
          <div style={{width:18,height:18,borderRadius:9,background:C.sage,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{color:"#fff",fontSize:8,fontWeight:700}}>q</span></div>
          {!sc&&<span style={{fontSize:11,color:"#3BB896",fontWeight:500}}>Ask questt.</span>}
        </button>
      </div>
    </div>
  );
  /* ═══ CHAT PANEL ═══ */
  const ChatPanel=()=> (
    <div style={{width:340,borderLeft:`1px solid ${C.border}`,background:"#fff",display:"flex",flexDirection:"column",flexShrink:0,height:"100vh",position:"sticky",top:0}}>
      <div style={{padding:"12px 16px",borderBottom:`1px solid ${C.borderLight}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:20,height:20,borderRadius:10,background:C.sage,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{color:"#fff",fontSize:8,fontWeight:700}}>q</span></div><span style={{fontSize:13,fontWeight:600,color:C.green}}>questt<span style={{color:C.sage}}>.</span></span></div>
        <button onClick={()=>{setChatOpen(false);setQuesttCtx(null);}} style={{background:"none",border:"none",fontSize:15,color:C.dimmer,cursor:"pointer"}}>×</button>
      </div>
      <div style={{flex:1,overflow:"auto",padding:"14px 16px"}}>
        {questtCtx?.question?<>
          <div style={{display:"flex",justifyContent:"flex-end",marginBottom:12}}><div style={{background:C.green,borderRadius:"10px 10px 4px 10px",padding:"8px 12px",fontSize:12,color:"#fff",maxWidth:"85%",lineHeight:1.5}}>{questtCtx.question}</div></div>
          <div style={{display:"flex",gap:8,marginBottom:12}}>
            <div style={{width:20,height:20,borderRadius:10,background:C.sageSoft,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:2}}><span style={{fontSize:8,fontWeight:700,color:C.sage}}>Q</span></div>
            <div style={{background:C.bgSub,borderRadius:"4px 10px 10px 10px",padding:"10px 12px",fontSize:12,color:C.textMid,lineHeight:1.65,whiteSpace:"pre-line"}}>{getQResponse(questtCtx.question,questtCtx.style)}</div>
          </div>
          <div style={{display:"flex",flexWrap:"wrap",gap:4,marginLeft:28}}>{[`Store-level ${questtCtx.style?.name||""} breakdown`,`What if we don't act?`,`Which styles are at risk?`].filter(q=>q!==questtCtx.question).slice(0,2).map((q,i)=> (<button key={i} onClick={()=>setQuesttCtx({style:questtCtx.style,question:q})} style={{fontSize:10,color:C.green,background:"#fff",border:`1px solid ${C.sageBorder}`,borderRadius:12,padding:"3px 8px",cursor:"pointer",fontFamily:font}}>{q}</button>))}</div>
        </>:<>
          <div style={{display:"flex",gap:8,marginBottom:12}}>
            <div style={{width:20,height:20,borderRadius:10,background:C.sageSoft,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:2}}><span style={{fontSize:8,fontWeight:700,color:C.sage}}>Q</span></div>
            <div style={{background:C.bgSub,borderRadius:"4px 10px 10px 10px",padding:"10px 12px",fontSize:12,color:C.textMid,lineHeight:1.5}}>I can help investigate sell-through, evaluate actions, and validate decisions.</div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:4,marginLeft:28}}>{["Which styles are at risk of missing 90% target?","Which category is underperforming?","Compare my blazers","What colors are trending this season?","Should we re-buy the Linen Wrap Dress?"].map((q,i)=> (<button key={i} onClick={()=>setQuesttCtx({style:liveStyles[0],question:q})} style={{fontSize:10,color:C.green,background:"#fff",border:`1px solid ${C.sageBorder}`,borderRadius:12,padding:"4px 10px",cursor:"pointer",fontFamily:font,textAlign:"left"}}>{q}</button>))}</div>
        </>}
      </div>
      <div style={{padding:"10px 16px",borderTop:`1px solid ${C.borderLight}`,display:"flex",gap:5}}>
        <input placeholder="Ask about this plan..." style={{flex:1,padding:"7px 10px",borderRadius:5,border:`1px solid ${C.border}`,fontSize:12,fontFamily:font,outline:"none"}}/>
        <button style={{padding:"7px 12px",borderRadius:5,background:C.green,border:"none",color:"#fff",fontSize:11,fontWeight:600,cursor:"pointer"}}>→</button>
      </div>
    </div>
  );

  /* ═══ CONTENT HEADER ═══ */
  const ContentHeader=({title,sub,right})=> (
    <div style={{padding:"20px 32px",borderBottom:`1px solid ${C.borderLight}`,background:C.bg,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
      <div><div style={{fontSize:20,fontWeight:600,fontFamily:serif,color:C.green}}>{title}</div>
        {sub&&<div style={{fontSize:13,color:C.dim,marginTop:2}}>{sub}</div>}
        {isReplenSection&&<div style={{fontSize:11,color:C.dimmer,marginTop:3}}>Updated as of {UPDATED}</div>}
      </div>
      {right&&<div style={{display:"flex",alignItems:"center",gap:10}}>{right}</div>}
    </div>
  );


  /* ═══ SCENARIO MODAL ═══ */
  const ScenarioModal=()=>{if(!scenario)return null;const{sid,ov,nv}=scenario;const s=RAW.find(x=>x.id===sid);const diff=nv-ov;const pctChg=((diff/ov)*100).toFixed(1);const valImpact=(diff*s.mrp/1e5).toFixed(1);
    const propG=GRADES.filter(g=>s.ga[g]).map(g=>{const cu=Math.round(ov*s.ga[g]);const nu=Math.round(nv*s.ga[g]);const sts=gradeStores(g);return {g,from:cu,to:nu,diff:nu-cu,stores:sts.length,per:sts.length?Math.round(nu/sts.length):nu};});
    const warn=[];if(s.hist?.SS25&&diff<0&&s.hist.SS25.st>=75)warn.push(`SS25 achieved ${s.hist.SS25.st}% 6-wk ST at ${s.hist.SS25.u.toLocaleString()} units. Reducing may create lost sales.`);
    if(!Object.keys(s.hist||{}).length&&diff>0&&diff/ov>.3)warn.push(`No prior sell-through data. Increasing by ${pctChg}% adds ₹${valImpact}L of unvalidated exposure.`);
    return (<div onClick={()=>{setScenario(null);setReason("");}} style={{position:"fixed",inset:0,zIndex:100,background:"rgba(27,42,33,.4)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#fff",borderRadius:12,width:"100%",maxWidth:540,boxShadow:"0 24px 80px rgba(12,44,24,.18)",maxHeight:"90vh",overflow:"auto",border:`1px solid ${C.border}`}}>
        <div style={{padding:"20px 24px",background:C.bgSub,borderRadius:"12px 12px 0 0",borderBottom:`1px solid ${C.border}`}}>
          <div style={{fontSize:13,color:C.dim}}>{s.sub} · {s.id}</div>
          <div style={{fontSize:17,fontWeight:700,fontFamily:serif,marginTop:3}}>{s.name}</div>
          <div style={{display:"flex",alignItems:"baseline",gap:10,marginTop:10}}><span style={{fontSize:22,fontWeight:700,color:C.dimmer,fontFamily:"monospace",textDecoration:"line-through",textDecorationColor:C.border}}>{ov.toLocaleString()}</span><span style={{fontSize:22,fontWeight:800,color:diff>0?C.green:C.terra,fontFamily:"monospace"}}>{nv.toLocaleString()}</span><span style={{fontSize:13,fontWeight:600,color:diff>0?C.green:C.terra,background:diff>0?C.sageSoft:C.terraSoft,padding:"3px 8px",borderRadius:4}}>{diff>0?"+":""}{diff.toLocaleString()} ({diff>0?"+":""}{pctChg}%)</span></div>
          <div style={{fontSize:12,color:C.dim,marginTop:4}}>OTB impact: <b style={{color:diff>0?C.green:C.terra}}>{diff>0?"+":""}₹{valImpact}L</b></div>
        </div>
        {warn.length>0&&<div style={{padding:"10px 24px",background:C.amberSoft,borderBottom:`1px solid ${C.amberBorder}`}}>{warn.map((w,i)=> (<div key={i} style={{fontSize:13,color:"#7A5C14",display:"flex",gap:6}}><span>⚠</span>{w}</div>))}</div>}
        <div style={{padding:"18px 24px"}}>
          <div style={{fontSize:11,fontWeight:700,color:C.dim,letterSpacing:.6,marginBottom:10}}>GRADE IMPACT</div>
          {propG.map(g=> (<div key={g.g} style={{display:"flex",gap:8,alignItems:"center",padding:"4px 0"}}><span style={{fontWeight:600,color:C.dim,width:36,fontSize:13}}>{g.g}</span><span style={{fontFamily:"monospace",color:C.dimmer,width:44,textAlign:"right",fontSize:13}}>{g.from.toLocaleString()}</span><span style={{color:C.dimmer}}>→</span><span style={{fontFamily:"monospace",fontWeight:600,color:g.diff>0?C.green:g.diff<0?C.terra:C.dim,width:44,textAlign:"right",fontSize:13}}>{g.to.toLocaleString()}</span><span style={{color:g.diff>0?C.green:g.diff<0?C.terra:C.dimmer,fontSize:11}}>({g.diff>0?"+":""}{g.diff})</span>{g.stores>1&&<span style={{color:C.dimmer,fontSize:11}}>~{g.per}u/{g.stores} stores</span>}</div>))}
          <div style={{marginTop:14,paddingTop:14,borderTop:`1px solid ${C.borderLight}`}}>
            <div style={{fontSize:11,fontWeight:600,color:C.dim,marginBottom:6}}>BUYER NOTE <span style={{fontWeight:400}}>(optional)</span></div>
            <input type="text" value={reason} onChange={e=>setReason(e.target.value)} placeholder="e.g. Supplier confirmed capacity..." style={{width:"100%",boxSizing:"border-box",fontSize:13,border:`1px solid ${C.border}`,borderRadius:6,padding:"8px 12px",outline:"none",background:C.warm,fontFamily:font}}/>
          </div>
          <div style={{marginTop:14,display:"flex",gap:8}}>
            <button onClick={()=>commit({label:"Proportional"})} style={{flex:1,padding:"10px",borderRadius:6,background:C.green,border:"none",color:"#fff",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:font}}>Apply</button>
            <button onClick={()=>{setScenario(null);setReason("");}} style={{padding:"10px 16px",borderRadius:6,border:`1px solid ${C.border}`,background:C.warm,color:C.dim,fontSize:13,cursor:"pointer",fontFamily:font}}>Cancel</button>
          </div>
        </div>
      </div>
    </div>);
  };

  /* ═══ UNIFIED DECISION TRAIL MODAL ═══ */
  const TrailModal=()=>{if(!trail)return null;const sid=trail.id||trail;const s=RAW.find(x=>x.id===sid);if(!s?.trail)return null;
    const act=trail.action||null;const lv=LIVE[sid];
    const srcMap={"Demand Planner":{src:"POS Data · Size Analytics",q:"sell_through(style, season='SS25') | size_curve(store_grade) | rate_of_sale(weekly)"},"Size Curve Analyst":{src:"POS · Size Analytics",q:"size_distribution(style, store_list) | stockout_events(size='M', threshold=0)"},"Color Performance":{src:"POS · Color Analytics",q:"color_sell_through(style, season) | markdown_rate(color) | search_trends(color, '8w')"},"Color Analyst":{src:"POS · Trend Data",q:"color_sell_through(style, season) | search_trends(color, '8w')"},"Allocation Engine":{src:"Store Master · Grade Matrix",q:"grade_allocation(style, target_st=0.90) | store_capacity(grade) | size_split(store)"},"Price Sensitivity":{src:"Finance · Pricing",q:"price_elasticity(category, price_bracket) | markdown_history(similar_items)"},"Trend Intelligence":{src:"Site Search · Market Intel",q:"search_volume(term, timeframe='12m') | competitor_launches(category)"},"Customer Intelligence":{src:"CRM · Loyalty",q:"loyalty_purchase_overlap(category) | basket_analysis(buyer_segment)"},"Supply Chain":{src:"Vendor Portal · Inventory",q:"supplier_capacity(fabric, qty) | lead_time(vendor) | cost_quote(qty)"},"Synthesis":{src:"All Sources",q:null}};
    /* Parse in-season action trail into agent steps */
    const opSteps=act?act.trail.split(/(?<=\.)\s+/).filter(Boolean).map(sent=>{const am=sent.match(/^([A-Z][a-z]+(?: [A-Z][a-z]+)*):/);return {a:am?am[1]:"In-Season Monitor",finding:am?sent.slice(am[1].length+2):sent};}):[]; 
    const AgentStep=({a,meta,finding,inference,isFinal,isLast,phase})=> (
      <div style={{display:"flex",gap:0}}>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",width:28,flexShrink:0}}>
          <div style={{width:isFinal?14:10,height:isFinal?14:10,borderRadius:isFinal?7:5,background:phase==="operate"?"#2B5EA7":isFinal?C.green:C.sage,flexShrink:0,marginTop:3}}/>
          {!isLast&&<div style={{width:2,flex:1,background:C.borderLight,marginTop:2}}/>}
        </div>
        <div style={{flex:1,paddingBottom:isLast?0:18,paddingLeft:10}}>
          <div style={{fontSize:14,fontWeight:700,color:isFinal?C.green:phase==="operate"?"#2B5EA7":C.text}}>{a}</div>
          <div style={{marginTop:6,padding:"12px 14px",background:isFinal?"#EFF5F3":phase==="operate"?"#F0F5FF":C.bgSub,borderRadius:8,border:`1px solid ${isFinal?C.sageBorder:phase==="operate"?"rgba(43,94,167,.15)":C.borderLight}`}}>
            {meta&&<div style={{fontSize:10,fontWeight:600,color:C.dimmer,letterSpacing:.5,marginBottom:5}}>SOURCE: {meta.src}</div>}
            {meta?.q&&<div style={{padding:"6px 10px",background:isFinal?"rgba(255,255,255,.6)":"#fff",borderRadius:4,border:`1px solid ${C.borderLight}`,marginBottom:8,fontFamily:"monospace",fontSize:11,color:C.dim,lineHeight:1.4}}>{meta.q}</div>}
            <div style={{marginBottom:inference?6:0}}><span style={{fontSize:12,fontWeight:700,color:C.text}}>Finding: </span><span style={{fontSize:12,color:C.textMid,lineHeight:1.55}}>{finding}</span></div>
            {inference&&<div><span style={{fontSize:12,fontWeight:700,color:C.sage}}>Inference: </span><span style={{fontSize:12,color:C.sage,lineHeight:1.55}}>{inference}</span></div>}
          </div>
        </div>
      </div>
    );
    return (<div onClick={()=>setTrail(null)} style={{position:"fixed",inset:0,zIndex:100,background:"rgba(27,42,33,.4)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#fff",borderRadius:14,width:"100%",maxWidth:700,boxShadow:"0 24px 64px rgba(12,44,24,.18)",maxHeight:"85vh",overflow:"auto",border:`1px solid ${C.border}`}}>
        <div style={{padding:"22px 28px",borderBottom:`1px solid ${C.borderLight}`,background:C.bgSub,borderRadius:"14px 14px 0 0"}}>
          <div style={{fontSize:11,fontWeight:700,color:C.sage,letterSpacing:.8}}>AGENT DECISION TRAIL</div>
          <div style={{fontSize:18,fontWeight:700,marginTop:6,fontFamily:serif,lineHeight:1.3}}>{s.reason?.split(".")[0]}.</div>
          <div style={{fontSize:13,color:C.dim,marginTop:4}}>{s.sub} · {s.id} · {SL[s.src]}</div>
          {act&&<div style={{marginTop:8,padding:"8px 12px",background:ACTION_META[act.type].bg,borderRadius:6,border:`1px solid ${ACTION_META[act.type].bd}`}}>
            <div style={{fontSize:12,fontWeight:600,color:ACTION_META[act.type].clr}}>{ACTION_META[act.type].l}: {act.act}</div>
          </div>}
        </div>
        <div style={{padding:"20px 28px"}}>
          {/* Orchestrator */}
          <div style={{display:"flex",gap:0,marginBottom:4}}>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",width:28,flexShrink:0}}>
              <div style={{width:14,height:14,borderRadius:7,border:`2px solid ${C.sage}`,background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",marginTop:2}}><div style={{width:6,height:6,borderRadius:3,background:C.sage}}/></div>
              <div style={{width:2,flex:1,background:C.borderLight,marginTop:2}}/>
            </div>
            <div style={{flex:1,paddingBottom:18,paddingLeft:10}}>
              <div style={{fontSize:14,fontWeight:700,color:C.green}}>Orchestrator</div>
              <div style={{fontSize:13,color:C.textMid,marginTop:4}}>Evaluating {s.name}; {act?"in-season action triggered":"pre-season allocation"}.</div>
              <div style={{fontSize:12,color:C.sage,fontStyle:"italic",marginTop:3}}>Dispatching to {s.trail.steps.map(st=>st.a).join(", ")}{act?", In-Season Monitor":""}</div>
            </div>
          </div>

          {/* Plan trail (only when no in-season action) */}
          {!act&&s.trail.steps.map((st,i)=>{const meta=srcMap[st.a]||{src:"Data",q:null};
            const sentences=st.act.split(/(?<=\.)\s+/).filter(Boolean);
            const findingSents=sentences.slice(0,Math.max(1,sentences.length-1));const inferenceSent=sentences.length>1?sentences[sentences.length-1]:null;
            return <AgentStep key={i} a={st.a} meta={meta} finding={findingSents.join(" ")} inference={inferenceSent} isFinal={isFinal} isLast={i===s.trail.steps.length-1} phase="plan"/>;
          })}

          {/* In-season trail (only when action exists) */}
          {act&&opSteps.length>0&&opSteps.map((st,i)=>{const isLast=i===opSteps.length-1;const meta=srcMap[st.a]||{src:"Live POS · Inventory · Vendor Portal",q:null};
            return <AgentStep key={"op"+i} a={st.a} meta={meta} finding={st.finding} inference={null} isFinal={isLast} isLast={isLast} phase="operate"/>;
          })}

          {/* Confidence */}
        </div>
      </div></div>);
  };



  /* ═══ STYLE CARD (Allocation) ═══ */
  const StyleCard=({s})=>{const isO=exp===s.id;const tot=s.units;const f=s.flag?FM[s.flag.type]:null;const isEd=edits[s.id]?.units!==undefined;
    return (<div style={{background:"#fff",borderRadius:8,border:`1px solid ${isO?C.sage+"44":C.border}`,transition:"box-shadow 0.15s",boxShadow:isO?"0 2px 12px rgba(12,44,24,0.06)":"none"}}>
      <div onClick={()=>setExp(isO?null:s.id)} style={{padding:"12px 16px",cursor:"pointer",display:"flex",alignItems:"center",gap:12}}>
        <Img size={38}/><div style={{flex:1,minWidth:0}}>
          <div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:14,fontWeight:600}}>{s.name}</span>{isEd&&<span style={{width:6,height:6,borderRadius:3,background:C.sage}}/>}</div>
          <div style={{fontSize:11,color:C.dim,marginTop:1}}><span style={{fontFamily:"monospace"}}>{s.id}</span> · <span style={{color:SD[s.src],fontWeight:500}}>{SL[s.src]}</span> · ₹{s.mrp.toLocaleString()}</div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:14,flexShrink:0}}>
          {f&&<span style={{fontSize:11,padding:"2px 8px",borderRadius:4,background:f.bg,color:f.clr,border:`1px solid ${f.bd}`,fontWeight:500}}>{f.l}</span>}
          <div style={{textAlign:"right"}}><div style={{fontSize:10,color:C.dimmer}}>Units</div><EU sid={s.id} value={tot}/></div>
          <div style={{textAlign:"right"}}><div style={{fontSize:10,color:C.dimmer}}>Value</div><div style={{fontSize:13,fontWeight:600,fontFamily:"monospace",color:C.green}}>₹{(tot*s.mrp/1e5).toFixed(1)}L</div></div>
          <span style={{fontSize:11,color:C.dimmer,transform:isO?"rotate(0deg)":"rotate(-90deg)"}}>{"\u25BE"}</span>
        </div>
      </div>
      {isO&&<div style={{padding:"0 16px 14px",borderTop:`1px solid ${C.borderLight}`}}>
        <div style={{marginTop:10,padding:"10px 14px",background:C.bgSub,borderRadius:6,border:`1px solid ${C.borderLight}`}}>
          <div style={{fontSize:13,color:C.textMid,lineHeight:1.6}}>{s.reason}</div>
          <button onClick={e=>{e.stopPropagation();setTrail({id:s.id});}} style={{marginTop:8,fontSize:11,color:C.sage,fontWeight:600,background:C.sageSoft,border:`1px solid ${C.sageBorder}`,borderRadius:5,padding:"4px 10px",cursor:"pointer",fontFamily:font}}>View Decision Trail</button>
        </div>
        {s.flag&&<div style={{marginTop:8,padding:"8px 12px",background:FM[s.flag.type].bg,borderRadius:6,border:`1px solid ${FM[s.flag.type].bd}`}}>
          <div style={{fontSize:11,fontWeight:600,color:FM[s.flag.type].clr,marginBottom:2}}>{FM[s.flag.type].l}</div>
          <div style={{fontSize:12,color:C.textMid,lineHeight:1.5}}>{s.flag.msg}</div>
        </div>}
        {Object.keys(s.hist||{}).length>0&&<div style={{marginTop:10}}>
          <div style={{fontSize:11,fontWeight:700,color:C.dim,letterSpacing:.5,marginBottom:4}}>HISTORY vs 90% TARGET</div>
          {Object.entries(s.hist).sort((a,b)=>b[0].localeCompare(a[0])).map(([ssn,d])=> (<div key={ssn} style={{display:"flex",alignItems:"center",gap:12,padding:"4px 0",fontSize:12,borderBottom:`1px solid ${C.borderLight}`}}>
            <span style={{fontWeight:600,width:36}}>{ssn}</span>
            <span style={{fontFamily:"monospace",width:40}}>{d.u.toLocaleString()}</span>
            <span style={{fontWeight:600,color:d.st>=90?C.sage:d.st>=80?"#7A6B1A":C.terra}}>{d.st}%</span>
            <span style={{color:C.dim}}>Wk{d.w}</span>
            <span style={{color:C.dimmer,fontSize:11,flex:1}}>{d.n}</span>
          </div>))}
        </div>}
        <div style={{marginTop:10}}>
          <div style={{fontSize:11,fontWeight:700,color:C.dim,letterSpacing:.5,marginBottom:4}}>COLORS</div>
          <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{s.colors.map(c=> (<div key={c.n} style={{padding:"4px 10px",background:C.warm,borderRadius:5,border:`1px solid ${C.borderLight}`,fontSize:12}}>
            <span style={{fontWeight:600}}>{c.n}</span> <span style={{color:C.dim}}>{(c.p*100).toFixed(0)}% · {Math.round(tot*c.p)}u</span>
          </div>))}</div>
        </div>
        <div style={{marginTop:10}}>
          <div style={{fontSize:11,fontWeight:700,color:C.dim,letterSpacing:.5,marginBottom:4}}>GRADE ALLOCATION</div>
          {GRADES.filter(g=>s.ga[g]).map(g=>{const u=Math.round(tot*s.ga[g]);const sts=gradeStores(g);const per=sts.length?Math.round(u/sts.length):u;
            return (<div key={g} style={{display:"flex",alignItems:"center",gap:10,padding:"4px 0"}}>
              <span style={{fontWeight:700,width:32,fontSize:13,color:C.green}}>{g}</span>
              <div style={{flex:1,height:14,background:C.borderLight,borderRadius:3,overflow:"hidden"}}><div style={{height:14,background:C.sage,borderRadius:3,width:`${s.ga[g]*100}%`}}/></div>
              <span style={{fontFamily:"monospace",fontWeight:600,fontSize:12,width:40,textAlign:"right"}}>{u.toLocaleString()}</span>
              <span style={{fontSize:11,color:C.dim,width:90}}>{sts.length>0?`~${per}u × ${sts.length}`:g==="B/C"?`~${per}u × ~280`:""}</span>
            </div>);
          })}
        </div>
      </div>}
    </div>);
  };

  /* ═══ STORE CARD (Allocation) ═══ */
  const StoreCard=({st})=>{const isO=stExp===st.code;
    return (<div style={{background:"#fff",borderRadius:8,border:`1px solid ${isO?C.sage+"44":C.border}`,marginBottom:3}}>
      <div onClick={()=>setStExp(isO?null:st.code)} style={{padding:"10px 16px",cursor:"pointer",display:"flex",alignItems:"center",gap:12}}>
        <div style={{flex:1}}><div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:13,fontWeight:600}}>{st.name}</span><span style={{fontSize:10,padding:"1px 6px",borderRadius:3,background:st.grade==="A+"?C.sageSoft:C.warm,color:st.grade==="A+"?C.sage:C.dim}}>{st.grade}</span></div><div style={{fontSize:11,color:C.dim}}>{st.code} · {st.city}</div></div>
        <div style={{display:"flex",gap:14,alignItems:"center",flexShrink:0}}>
          <div style={{textAlign:"right"}}><div style={{fontSize:10,color:C.dimmer}}>Styles</div><div style={{fontSize:13,fontWeight:600}}>{st.sc}</div></div>
          <div style={{textAlign:"right"}}><div style={{fontSize:10,color:C.dimmer}}>Units</div><div style={{fontSize:13,fontWeight:700,color:C.green,fontFamily:"monospace"}}>{st.tu.toLocaleString()}</div></div>
          <div style={{textAlign:"right"}}><div style={{fontSize:10,color:C.dimmer}}>Value</div><div style={{fontSize:13,fontWeight:600}}>₹{(st.tv/1e5).toFixed(1)}L</div></div>
        </div>
      </div>
      {isO&&<div style={{padding:"0 16px 12px",borderTop:`1px solid ${C.borderLight}`}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12,marginTop:8}}><thead><tr style={{borderBottom:`2px solid ${C.border}`}}>
          <th style={{textAlign:"left",padding:"4px 6px",fontSize:11,color:C.dim}}>Style</th>
          {SIZES.map(sz=> (<th key={sz} style={{textAlign:"center",padding:"4px 3px",fontSize:11,color:C.dim,width:34}}>{sz}</th>))}
          <th style={{textAlign:"right",padding:"4px 6px",fontSize:11,color:C.dim}}>Total</th>
        </tr></thead><tbody>{st.sl.sort((a,b)=>b.units-a.units).slice(0,10).map(x=>{const szU=storeSizeSplit(x.units,st.sp);return (<tr key={x.id} style={{borderBottom:`1px solid ${C.borderLight}`}}>
          <td style={{padding:"4px 6px",fontSize:12}}>{x.name}</td>
          {szU.map((v,j)=> (<td key={j} style={{textAlign:"center",fontFamily:"monospace",fontSize:11,color:C.dim}}>{v}</td>))}
          <td style={{textAlign:"right",fontFamily:"monospace",fontWeight:600,fontSize:12,color:C.green}}>{x.units}</td>
        </tr>);})}</tbody></table>
      </div>}
    </div>);
  };

  /* ═══ OP STYLE CARD (Replenishment) ═══ */
  const OpStyleCard=({s})=>{const lv=s.live;const isO=opExp===s.id;const sm=STATUS_META[lv.status];const pctSold=Math.round(lv.sold/s.units*100);
    return (<div style={{background:"#fff",borderRadius:8,border:`1px solid ${isO?sm.clr+"44":C.border}`}}>
      <div onClick={()=>setOpExp(isO?null:s.id)} style={{padding:"12px 16px",cursor:"pointer",display:"flex",alignItems:"center",gap:12}}>
        <div style={{width:36,height:36,borderRadius:18,background:sm.bg,border:`2px solid ${sm.bd}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
          <span style={{fontSize:13,fontWeight:700,color:sm.clr}}>{sm.icon}</span>
        </div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <span style={{fontSize:14,fontWeight:600}}>{s.name}</span>
            <span style={{fontSize:10,padding:"2px 6px",borderRadius:4,background:sm.bg,color:sm.clr,border:`1px solid ${sm.bd}`,fontWeight:600}}>{sm.l}</span>
          </div>
          <div style={{fontSize:11,color:C.dim,marginTop:1}}>{s.sub} · <span style={{color:SD[s.src],fontWeight:500}}>{SL[s.src]}</span></div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:16,flexShrink:0}}>
          <div style={{width:90}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}><span style={{fontSize:10,color:C.dimmer}}>Sold</span><span style={{fontSize:10,fontFamily:"monospace",fontWeight:600}}>{lv.sold}/{s.units}</span></div>
            <div style={{height:5,background:C.borderLight,borderRadius:3}}><div style={{height:5,borderRadius:3,background:pctSold>45?C.sage:pctSold>30?C.amber:C.terra,width:`${pctSold}%`}}/></div>
          </div>
          <div style={{textAlign:"right"}}><div style={{fontSize:10,color:C.dimmer}}>Proj 6-wk</div><div style={{fontSize:14,fontWeight:700,color:lv.proj6>=90?C.sage:lv.proj6>=75?C.amber:C.terra,fontFamily:"monospace"}}>{lv.proj6}%</div></div>
          {lv.actions.length>0&&<div style={{width:18,height:18,borderRadius:9,background:lv.actions[0].pri==="critical"?"#B33A3A":lv.actions[0].pri==="high"?C.amber:C.dim,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{color:"#fff",fontSize:9,fontWeight:700}}>{lv.actions.length}</span></div>}
          <span style={{fontSize:11,color:C.dimmer,transform:isO?"rotate(0deg)":"rotate(-90deg)"}}>{"\u25BE"}</span>
        </div>
      </div>
      {isO&&<div style={{padding:"0 16px 14px",borderTop:`1px solid ${C.borderLight}`}}>
        {lv.alerts.length>0&&<div style={{marginTop:10}}>{lv.alerts.map((a,i)=> (<div key={i} style={{padding:"6px 10px",background:C.bgSub,borderRadius:5,border:`1px solid ${C.borderLight}`,marginBottom:3,fontSize:12,color:C.textMid,display:"flex",gap:6}}><span style={{color:sm.clr,fontSize:9,marginTop:3}}>●</span>{a}</div>))}</div>}
        {/* Weekly Sell-Through Chart */}
        {WK_DATA[s.id]&&<div style={{marginTop:12,padding:"14px 16px",background:"#fff",borderRadius:8,border:`1px solid ${C.borderLight}`}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
            <div style={{fontSize:11,fontWeight:700,color:C.dim,letterSpacing:.5}}>WEEKLY SELL-THROUGH</div>
            <div style={{display:"flex",gap:12,fontSize:10,color:C.dimmer}}>
              <span><span style={{display:"inline-block",width:12,height:2,background:C.sage,marginRight:4,verticalAlign:"middle"}}/>Actual</span>
              <span><span style={{display:"inline-block",width:12,height:2,background:C.dimmer,marginRight:4,verticalAlign:"middle",borderTop:"1px dashed "+C.dimmer}}/>Planned rate</span>
            </div>
          </div>
          {(()=>{const wk=WK_DATA[s.id];const plannedRate=Math.round(s.units/22);const maxVal=Math.max(...wk,plannedRate)*1.2;const W=320;const H=120;const pad={l:36,r:12,t:8,b:24};const cw=W-pad.l-pad.r;const ch=H-pad.t-pad.b;
            const pts=wk.map((v,i)=>({x:pad.l+i*(cw/3),y:pad.t+ch-(v/maxVal)*ch}));
            const path=pts.map((p,i)=>i===0?`M${p.x},${p.y}`:`L${p.x},${p.y}`).join(" ");
            const planY=pad.t+ch-(plannedRate/maxVal)*ch;
            const accel=wk.length>=2?((wk[wk.length-1]-wk[0])/wk[0]*100).toFixed(0):0;
            return (<div style={{display:"flex",gap:16,alignItems:"flex-end"}}>
              <svg width={W} height={H} style={{display:"block"}}>
                {[0,0.25,0.5,0.75,1].map(f=>{const y=pad.t+ch*(1-f);return <g key={f}><line x1={pad.l} x2={W-pad.r} y1={y} y2={y} stroke={C.borderLight} strokeWidth="1"/><text x={pad.l-4} y={y+3} textAnchor="end" fill={C.dimmer} fontSize="9" fontFamily="monospace">{Math.round(maxVal*f)}</text></g>;})}
                <line x1={pad.l} x2={W-pad.r} y1={planY} y2={planY} stroke={C.dimmer} strokeWidth="1" strokeDasharray="4,3"/>
                <path d={path} fill="none" stroke={C.sage} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                {pts.map((p,i)=><g key={i}><circle cx={p.x} cy={p.y} r="4" fill={C.sage}/><circle cx={p.x} cy={p.y} r="2" fill="#fff"/><text x={p.x} y={p.y-10} textAnchor="middle" fill={C.green} fontSize="10" fontWeight="600" fontFamily="monospace">{wk[i]}</text><text x={p.x} y={H-4} textAnchor="middle" fill={C.dimmer} fontSize="9">W{i+1}</text></g>)}
              </svg>
              <div style={{paddingBottom:pad.b}}>
                <div style={{fontSize:10,color:C.dimmer}}>W1→W4</div>
                <div style={{fontSize:16,fontWeight:700,color:Number(accel)>0?C.sage:C.terra,fontFamily:"monospace"}}>{Number(accel)>0?"+":""}{accel}%</div>
                <div style={{fontSize:10,color:C.dimmer,marginTop:2}}>Planned: {plannedRate}u/wk</div>
              </div>
            </div>);
          })()}
        </div>}
        <div style={{marginTop:10,display:"flex",gap:6}}>{SIZES.map(sz=>{const planned=Math.round(s.units*(s.colors[0]?.c[SIZES.indexOf(sz)]||STD[SIZES.indexOf(sz)]));const sold=lv.bySz[sz]||0;const szPct=planned>0?Math.round(sold/planned*100):0;
          return (<div key={sz} style={{flex:1,background:C.bgSub,borderRadius:5,padding:"6px 4px",textAlign:"center",border:`1px solid ${C.borderLight}`}}>
            <div style={{fontSize:11,fontWeight:700,color:C.dim}}>{sz}</div>
            <div style={{fontSize:14,fontWeight:700,color:szPct>50?C.sage:szPct>30?C.amber:C.dimmer,fontFamily:"monospace"}}>{szPct}%</div>
            <div style={{fontSize:9,color:C.dimmer}}>{sold}/{planned}</div>
          </div>);})}</div>
        <div style={{marginTop:10,display:"flex",gap:6}}>{GRADES.filter(g=>s.ga[g]).map(g=>{const alloc=Math.round(s.units*s.ga[g]);const sold=lv.byGr[g]||0;const ros=lv.ros[g]||0;
          return (<div key={g} style={{flex:1,background:C.bgSub,borderRadius:5,padding:"8px 10px",border:`1px solid ${C.borderLight}`}}>
            <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:12,fontWeight:700,color:C.green}}>{g}</span><span style={{fontSize:11,fontFamily:"monospace",color:C.dim}}>{sold}/{alloc}</span></div>
            <div style={{height:3,background:C.borderLight,borderRadius:2,marginTop:4}}><div style={{height:3,background:C.sage,borderRadius:2,width:`${Math.min(Math.round(sold/alloc*100),100)}%`}}/></div>
            <div style={{fontSize:10,color:C.dim,marginTop:3}}>ROS: <b>{ros.toFixed(1)}</b>u/store/wk</div>
          </div>);})}</div>
        {lv.actions.map((act,i)=>{const am=ACTION_META[act.type];
          /* Compute store-level breakdown for the action */
          const actQty=act.type==="rebuy"?parseInt((act.act.match(/(\d+)u/)||["","0"])[1])||0:act.type==="replenish"?parseInt((act.act.match(/(\d+)u/)||["","0"])[1])||0:0;
          const gradeBreak=actQty>0?GRADES.filter(g=>s.ga[g]).map(g=>{const pct=s.ga[g];const gu=Math.round(actQty*pct);const sts=gradeStores(g);const perSt=sts.length?Math.round(gu/sts.length):gu;return {g,u:gu,stores:sts.length||280,per:perSt,topStores:sts.slice(0,3).map(st=>st.name)};}).filter(gb=>gb.u>0):[];
          /* For consolidation, show specific stores */
          const cx=CONSOL.find(c=>c.sid===s.id);const pullStores=cx&&cx.pullFrom>0?STORE_DB.filter(st=>st.grade==="A").slice(-cx.pullFrom).map(st=>st.name):[];
          const consolStores=cx&&cx.consolidateTo>0?STORE_DB.filter(st=>st.grade==="A+").slice(0,cx.consolidateTo).map(st=>st.name):[];
          return (<div key={i} style={{marginTop:10,padding:"14px 16px",background:am.bg,borderRadius:8,border:`1.5px solid ${am.bd}`}}>
          <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
            <span style={{fontSize:11,fontWeight:700,color:am.clr,padding:"2px 8px",borderRadius:3,background:"rgba(255,255,255,.6)",border:`1px solid ${am.bd}`}}>{am.l}</span>
            {act.pri==="critical"&&<span style={{fontSize:9,fontWeight:700,color:"#fff",padding:"2px 6px",borderRadius:3,background:"#B33A3A"}}>URGENT</span>}
            {act.pri==="high"&&<span style={{fontSize:9,fontWeight:700,color:C.amber,padding:"2px 6px",borderRadius:3,background:C.amberSoft,border:`1px solid ${C.amberBorder}`}}>HIGH</span>}
          </div>
          <div style={{fontSize:14,fontWeight:600,color:C.text,lineHeight:1.4}}>{act.act}</div>
          <div style={{fontSize:12,color:C.dim,marginTop:4}}>Impact: <b>{act.impact}</b></div>
          {/* Store-level breakdown for re-buy / replenish */}
          {gradeBreak.length>0&&<div style={{marginTop:8,padding:"10px 12px",background:"rgba(255,255,255,.5)",borderRadius:6,border:`1px solid ${C.borderLight}`}}>
            <div style={{fontSize:10,fontWeight:700,color:C.dim,letterSpacing:.5,marginBottom:6}}>DISTRIBUTION</div>
            {gradeBreak.map(gb=> (<div key={gb.g} style={{display:"flex",alignItems:"center",gap:8,padding:"3px 0",fontSize:12}}>
              <span style={{fontWeight:700,color:C.green,width:28}}>{gb.g}</span>
              <span style={{fontFamily:"monospace",fontWeight:600,width:40}}>{gb.u}u</span>
              <span style={{color:C.dim}}>→ {gb.stores} stores × ~{gb.per}u</span>
              {gb.topStores.length>0&&<span style={{color:C.dimmer,fontSize:11}}>({gb.topStores.join(", ")}{gb.stores>3?", ...":""})</span>}
            </div>))}
          </div>}
          {/* Store specifics for consolidation/markdown */}
          {(act.type==="markdown"||act.type==="transfer")&&cx&&<div style={{marginTop:8,padding:"10px 12px",background:"rgba(255,255,255,.5)",borderRadius:6,border:`1px solid ${C.borderLight}`}}>
            <div style={{fontSize:10,fontWeight:700,color:C.dim,letterSpacing:.5,marginBottom:6}}>STORE DETAIL</div>
            {pullStores.length>0&&<div style={{fontSize:12,color:C.textMid,marginBottom:4}}><span style={{fontWeight:600,color:C.terra}}>Pull from:</span> {pullStores.join(", ")}</div>}
            {consolStores.length>0&&<div style={{fontSize:12,color:C.textMid}}><span style={{fontWeight:600,color:C.sage}}>Consolidate to:</span> {consolStores.join(", ")}</div>}
          </div>}
          <div style={{marginTop:8,display:"flex",gap:6}}>
            <button onClick={e=>{e.stopPropagation();setTrail({id:s.id,action:act});}} style={{fontSize:11,color:C.sage,fontWeight:600,background:"rgba(255,255,255,.8)",border:`1px solid ${C.sageBorder}`,borderRadius:4,padding:"5px 12px",cursor:"pointer",fontFamily:font}}>Decision Trail</button>
            <button onClick={e=>{e.stopPropagation();setApproved(p=>({...p,[act.type+"-"+s.id]:true}));}} style={{fontSize:11,color:"#fff",fontWeight:600,background:approved[act.type+"-"+s.id]?"#888":am.clr,border:"none",borderRadius:4,padding:"5px 14px",cursor:"pointer",fontFamily:font}}>{approved[act.type+"-"+s.id]?"Approved":"Approve"}</button>
          </div>
        </div>);})}
        {/* Trail (only if no actions have their own trail button) + questt */}
        {lv.actions.length===0&&<div style={{marginTop:10}}>
          <button onClick={e=>{e.stopPropagation();setTrail({id:s.id});}} style={{fontSize:11,color:C.sage,fontWeight:600,background:C.sageSoft,border:`1px solid ${C.sageBorder}`,borderRadius:4,padding:"4px 10px",cursor:"pointer",fontFamily:font}}>View Decision Trail</button>
        </div>}
        <div style={{marginTop:10,padding:"12px 14px",background:"#EFF5F3",borderRadius:8,border:`1px solid ${C.sageBorder}`}}>
          <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}><div style={{width:16,height:16,borderRadius:8,background:C.sage,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{color:"#fff",fontSize:8,fontWeight:700}}>q</span></div><span style={{fontSize:12,fontWeight:600,color:C.green}}>Ask questt<span style={{color:"#1B6B5A",fontWeight:700}}>.</span></span></div>
          <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
            {[`Why is ${s.name} at ${lv.proj6}%?`,`Store-level ${s.name} breakdown`,`What if we don't act?`].map((q,qi)=> (<button key={qi} onClick={e=>{e.stopPropagation();openQuestt(s,q);}} style={{fontSize:11,color:C.green,background:"#fff",border:`1px solid ${C.sageBorder}`,borderRadius:14,padding:"4px 10px",cursor:"pointer",fontFamily:font}}>{q}</button>))}
          </div>
        </div>
      </div>}
    </div>);
  };


  /* ═══ STORE → STORE VIEW ═══ */
  const S2SView=()=>{const enriched=XFERS.map(x=>{const s=RAW.find(r=>r.id===x.sid);const fromSt=STORE_DB.find(st=>st.code===x.from);const toSt=STORE_DB.find(st=>st.code===x.to);return {...x,styleName:s?.name||x.sid,sub:s?.sub||"",fromName:fromSt?.name||x.from,fromCity:fromSt?.city||"",toName:toSt?.name||x.to,toCity:toSt?.city||"",mrp:s?.mrp||0};});
    const xKeys=enriched.map(x=>"xfer-"+x.id);const xSel=xKeys.filter(k=>selected[k]);
    const totalU=enriched.reduce((a,x)=>a+x.u,0);const totalImpact=enriched.reduce((a,x)=>a+x.impact,0);
    return (<div>
      <div style={{display:"flex",gap:12,marginBottom:16,alignItems:"flex-end"}}>
        {[{l:"Transfers",v:enriched.length},{l:"Total Units",v:totalU},{l:"Revenue Protected",v:`₹${(totalImpact/1e3).toFixed(1)}K`}].map(m=> (<div key={m.l} style={{padding:"10px 16px",background:C.bgSub,borderRadius:6,border:`1px solid ${C.borderLight}`}}><div style={{fontSize:10,color:C.dimmer,fontWeight:500}}>{m.l}</div><div style={{fontSize:16,fontWeight:700,color:C.green,marginTop:2}}>{m.v}</div></div>))}
        <div style={{marginLeft:"auto",display:"flex",gap:6}}>
          <button style={{fontSize:11,fontWeight:600,padding:"6px 14px",borderRadius:5,border:`1px solid ${C.border}`,background:"#fff",color:C.dim,cursor:"pointer",fontFamily:font}}>↓ Download CSV</button>
        </div>
      </div>
      <table style={{width:"100%",borderCollapse:"collapse",background:"#fff",borderRadius:8,overflow:"hidden",border:`1px solid ${C.border}`}}>
        <thead><tr style={{background:C.bgSub,borderBottom:`2px solid ${C.border}`}}>
          <th style={{padding:"8px 10px",width:32}}><input type="checkbox" checked={xKeys.length>0&&xKeys.every(k=>selected[k])} onChange={()=>selectAll(xKeys)} style={{cursor:"pointer"}}/></th>
          {["Style","Size","From → To","Units","DoC Impact","Revenue","Reasoning"].map((h,i)=> (<th key={i} style={{padding:"8px 10px",fontSize:11,fontWeight:600,color:C.dim,textAlign:i>=3?"center":"left"}}>{h}</th>))}
        </tr></thead>
        <tbody>{enriched.map(x=>{const k="xfer-"+x.id;const done=approved[k];return (<tr key={x.id} style={{borderBottom:`1px solid ${C.borderLight}`,background:done?C.sageSoft+"66":selected[k]?"#F8FFFE":"#fff"}}>
          <td style={{padding:"8px 10px"}}>{!done&&<input type="checkbox" checked={!!selected[k]} onChange={()=>toggleSel(k)} style={{cursor:"pointer"}}/>}{done&&<span style={{color:C.sage,fontSize:12,fontWeight:700}}>✓</span>}</td>
          <td style={{padding:"8px 10px"}}><div style={{fontSize:13,fontWeight:600}}>{x.styleName}</div><div style={{fontSize:10,color:C.dimmer}}>{x.sub}</div></td>
          <td style={{padding:"8px 10px",fontWeight:700,fontSize:13}}>{x.sz}</td>
          <td style={{padding:"8px 10px"}}><div style={{fontSize:12}}><span style={{fontWeight:500}}>{x.fromName}</span> <span style={{color:C.dimmer,fontSize:10}}>({x.from})</span></div><div style={{color:C.sage,fontSize:12,margin:"2px 0"}}>→</div><div style={{fontSize:12}}><span style={{fontWeight:500}}>{x.toName}</span> <span style={{color:C.dimmer,fontSize:10}}>({x.to})</span></div></td>
          <td style={{padding:"8px 10px",textAlign:"center",fontFamily:"monospace",fontWeight:700,fontSize:14,color:C.green}}>{x.u}</td>
          <td style={{padding:"8px 10px",textAlign:"center",fontSize:12}}><div><span style={{color:C.sage,fontWeight:600}}>{x.doc_from}d</span> <span style={{color:C.dimmer}}>source</span></div><div><span style={{color:C.terra,fontWeight:600}}>{x.doc_to}d</span> <span style={{color:C.dimmer}}>dest</span> <span style={{color:C.sage}}>→ ~{x.doc_to+Math.round(x.u/0.3)}d</span></div></td>
          <td style={{padding:"8px 10px",textAlign:"center",fontSize:12,fontWeight:600,color:C.green}}>₹{(x.impact/1e3).toFixed(1)}K</td>
          <td style={{padding:"8px 10px",fontSize:11,color:C.textMid,maxWidth:200,lineHeight:1.4}}>Dest store DoC critical ({x.doc_to}d). Source has surplus ({x.doc_from}d DoC, well above 14d target). Transfer prevents stockout, no impact on source availability.</td>
        </tr>);})}</tbody>
      </table>
      {xSel.length>0&&<div style={{position:"sticky",bottom:0,marginTop:12,padding:"12px 18px",background:C.green,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"space-between",boxShadow:"0 -4px 20px rgba(0,0,0,.15)"}}>
        <span style={{color:"#fff",fontSize:13,fontWeight:600}}>{xSel.length} transfer{xSel.length>1?"s":""} selected</span>
        <div style={{display:"flex",gap:8}}>
          <button onClick={()=>setSelected({})} style={{fontSize:12,padding:"6px 14px",borderRadius:5,border:"1px solid rgba(255,255,255,.2)",background:"transparent",color:"rgba(255,255,255,.7)",cursor:"pointer",fontFamily:font}}>Clear</button>
          <button onClick={approveSelected} style={{fontSize:12,fontWeight:600,padding:"6px 18px",borderRadius:5,border:"none",background:"#3BB896",color:"#fff",cursor:"pointer",fontFamily:font}}>Approve & Execute ({xSel.length})</button>
        </div>
      </div>}
    </div>);
  };

  /* ═══ STORE → WAREHOUSE VIEW ═══ */
  const S2WView=()=>{const needsReplen=replenStyles.filter(s=>s.needsReplen);const noNeed=replenStyles.filter(s=>!s.needsReplen);
    const rKeys=needsReplen.map(s=>"replen-"+s.id);const rSel=rKeys.filter(k=>selected[k]);
    const totalReplen=needsReplen.reduce((a,s)=>a+s.replenQty,0);
    return (<div>
      <div style={{display:"flex",gap:12,marginBottom:16,alignItems:"flex-end"}}>
        {[{l:"Below Target DoC",v:needsReplen.length,c:C.terra},{l:"Units to Replenish",v:totalReplen},{l:"Carryover Monitored",v:replenStyles.length}].map(m=> (<div key={m.l} style={{padding:"10px 16px",background:C.bgSub,borderRadius:6,border:`1px solid ${C.borderLight}`}}><div style={{fontSize:10,color:C.dimmer,fontWeight:500}}>{m.l}</div><div style={{fontSize:16,fontWeight:700,color:m.c||C.green,marginTop:2}}>{m.v}</div></div>))}
        <div style={{marginLeft:"auto",display:"flex",gap:6}}>
          <button style={{fontSize:11,fontWeight:600,padding:"6px 14px",borderRadius:5,border:`1px solid ${C.border}`,background:"#fff",color:C.dim,cursor:"pointer",fontFamily:font}}>↓ Download Orders</button>
        </div>
      </div>
      {needsReplen.length>0&&<div style={{marginBottom:20}}>
        <div style={{fontSize:11,fontWeight:700,color:C.dim,letterSpacing:.6,marginBottom:8}}>BELOW TARGET; REPLENISHMENT NEEDED</div>
        <table style={{width:"100%",borderCollapse:"collapse",background:"#fff",borderRadius:8,overflow:"hidden",border:`1px solid ${C.border}`}}>
          <thead><tr style={{background:C.bgSub,borderBottom:`2px solid ${C.border}`}}>
            <th style={{padding:"8px 10px",width:32}}><input type="checkbox" checked={rKeys.length>0&&rKeys.every(k=>selected[k])} onChange={()=>selectAll(rKeys)} style={{cursor:"pointer"}}/></th>
            {["Style","Stock Left","Avg DoC","Target","ROS","WH Stock","Replen Qty","Reasoning"].map((h,i)=> (<th key={i} style={{padding:"8px 10px",fontSize:11,fontWeight:600,color:C.dim,textAlign:i>=1?"center":"left"}}>{h}</th>))}
          </tr></thead>
          <tbody>{needsReplen.map(s=>{const k="replen-"+s.id;const done=approved[k];return (<tr key={s.id} style={{borderBottom:`1px solid ${C.borderLight}`,background:done?C.sageSoft+"66":selected[k]?"#F8FFFE":s.docDays<7?C.terraSoft:"#fff"}}>
            <td style={{padding:"8px 10px"}}>{!done&&<input type="checkbox" checked={!!selected[k]} onChange={()=>toggleSel(k)} style={{cursor:"pointer"}}/>}{done&&<span style={{color:C.sage,fontSize:12,fontWeight:700}}>✓</span>}</td>
            <td style={{padding:"8px 10px"}}><div style={{fontSize:13,fontWeight:600}}>{s.name}</div><div style={{fontSize:10,color:C.dimmer}}>{s.id} · {s.sub}</div></td>
            <td style={{textAlign:"center",fontFamily:"monospace",fontSize:13}}>{s.remaining}</td>
            <td style={{textAlign:"center"}}><span style={{fontWeight:700,color:s.docDays<7?C.terra:C.amber,fontSize:14,fontFamily:"monospace"}}>{s.docDays}d</span></td>
            <td style={{textAlign:"center",fontSize:12,color:C.dim}}>14d</td>
            <td style={{textAlign:"center",fontFamily:"monospace",fontSize:12}}>{s.avgROS.toFixed(2)}/d</td>
            <td style={{textAlign:"center"}}><span style={{fontFamily:"monospace",fontSize:13,fontWeight:600,color:s.wh.stock>s.wh.buf?C.sage:C.terra}}>{s.wh.stock}u</span></td>
            <td style={{textAlign:"center",fontFamily:"monospace",fontWeight:700,fontSize:14,color:C.green}}>{s.replenQty}u</td>
            <td style={{padding:"8px 10px",fontSize:11,color:C.textMid,maxWidth:180,lineHeight:1.4}}>At current ROS ({s.avgROS.toFixed(2)}u/day across 33 stores), stock depletes in {s.docDays} days. Replenishing {s.replenQty}u restores 7-day buffer. WH has {s.wh.stock}u available (buffer: {s.wh.buf}u).</td>
          </tr>);})}</tbody>
        </table>
      </div>}
      {noNeed.length>0&&<div>
        <div style={{fontSize:11,fontWeight:700,color:C.dim,letterSpacing:.6,marginBottom:8}}>HEALTHY; NO ACTION NEEDED</div>
        {noNeed.map(s=> (<div key={s.id} style={{display:"flex",alignItems:"center",gap:12,padding:"8px 14px",background:"#fff",borderRadius:6,border:`1px solid ${C.borderLight}`,marginBottom:3}}>
          <span style={{fontSize:13,fontWeight:600,flex:1}}>{s.name}</span>
          <span style={{fontSize:11,color:C.dim}}>DoC: <b style={{color:C.sage}}>{s.docDays}d</b></span>
          <span style={{fontSize:11,color:C.dim}}>WH: <b>{s.wh.stock}u</b></span>
          <span style={{fontSize:11,color:C.dim}}>ROS: <b>{s.avgROS.toFixed(2)}</b></span>
        </div>))}
      </div>}
      <div style={{marginTop:12,padding:"10px 14px",background:C.bgSub,borderRadius:6,border:`1px solid ${C.borderLight}`,fontSize:12,color:C.dim}}>Projected DoC = Remaining ÷ (Avg ROS × 33 stores). Replenish when DoC &lt; 14 days. Qty = min(ROS × stores × 7 days, WH − Buffer).</div>
      {rSel.length>0&&<div style={{position:"sticky",bottom:0,marginTop:12,padding:"12px 18px",background:C.green,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"space-between",boxShadow:"0 -4px 20px rgba(0,0,0,.15)"}}>
        <span style={{color:"#fff",fontSize:13,fontWeight:600}}>{rSel.length} replenishment{rSel.length>1?"s":""} selected · {needsReplen.filter(s=>selected["replen-"+s.id]).reduce((a,s)=>a+s.replenQty,0)}u total</span>
        <div style={{display:"flex",gap:8}}>
          <button onClick={()=>setSelected({})} style={{fontSize:12,padding:"6px 14px",borderRadius:5,border:"1px solid rgba(255,255,255,.2)",background:"transparent",color:"rgba(255,255,255,.7)",cursor:"pointer",fontFamily:font}}>Clear</button>
          <button onClick={approveSelected} style={{fontSize:12,fontWeight:600,padding:"6px 18px",borderRadius:5,border:"none",background:"#3BB896",color:"#fff",cursor:"pointer",fontFamily:font}}>Approve & Execute ({rSel.length})</button>
        </div>
      </div>}
    </div>);
  };

  /* ═══ CONSOLIDATION VIEW ═══ */
  const ConsolView=()=>{const cKeys=CONSOL.map(cx=>"consol-"+cx.sid);const cSel=cKeys.filter(k=>selected[k]);
    return (<div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
        <div style={{padding:"12px 16px",background:C.amberSoft,borderRadius:8,border:`1px solid ${C.amberBorder}`,fontSize:13,color:"#7A5C14",flex:1,marginRight:12}}>
          {CONSOL.length} styles flagged; stock needs to be moved, marked down, or held pending review.
        </div>
        <button style={{fontSize:11,fontWeight:600,padding:"6px 14px",borderRadius:5,border:`1px solid ${C.border}`,background:"#fff",color:C.dim,cursor:"pointer",fontFamily:font,flexShrink:0}}>↓ Download Plan</button>
      </div>
      {CONSOL.map(cx=>{const s=RAW.find(r=>r.id===cx.sid);if(!s)return null;const lv=LIVE[cx.sid];const k="consol-"+cx.sid;const done=approved[k];
        const am=cx.action==="markdown"?{bg:C.terraSoft,clr:C.terra,bd:"rgba(179,58,58,.15)",l:"Markdown"}:cx.action==="rebalance"?{bg:C.amberSoft,clr:C.amber,bd:C.amberBorder,l:"Rebalance"}:{bg:C.bgSub,clr:C.dim,bd:C.border,l:"Hold"};
        return (<div key={cx.sid} style={{background:done?"#F8FFFA":"#fff",borderRadius:8,border:`1px solid ${done?C.sageBorder:C.border}`,marginBottom:8,padding:"16px 20px"}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
            {!done&&<input type="checkbox" checked={!!selected[k]} onChange={()=>toggleSel(k)} style={{cursor:"pointer",marginRight:4}}/>}
            {done&&<span style={{color:C.sage,fontSize:14,fontWeight:700,marginRight:4}}>✓</span>}
            <span style={{fontSize:11,fontWeight:700,padding:"2px 8px",borderRadius:4,background:am.bg,color:am.clr,border:`1px solid ${am.bd}`}}>{am.l}</span>
            <span style={{fontSize:15,fontWeight:600}}>{s.name}</span>
            <span style={{fontSize:11,color:C.dim}}>{s.sub} · {s.id}</span>
            <span style={{marginLeft:"auto",fontSize:11,color:C.dimmer}}>Timing: <b>{cx.timing}</b></span>
          </div>
          <div style={{fontSize:13,color:C.textMid,lineHeight:1.6,marginBottom:10,padding:"10px 14px",background:C.bgSub,borderRadius:6,border:`1px solid ${C.borderLight}`,borderLeft:`3px solid ${am.clr}`}}>
            <div style={{fontSize:10,fontWeight:700,color:am.clr,letterSpacing:.5,marginBottom:4}}>REASONING</div>
            {cx.reason}
          </div>
          <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:8}}>
            {cx.discount>0&&<div style={{padding:"8px 14px",background:C.terraSoft,borderRadius:6,border:`1px solid rgba(179,58,58,.15)`}}><div style={{fontSize:10,color:C.terra}}>Markdown</div><div style={{fontSize:14,fontWeight:700,color:C.terra}}>{cx.discount}%</div></div>}
            {cx.savedExposure>0&&<div style={{padding:"8px 14px",background:C.sageSoft,borderRadius:6,border:`1px solid ${C.sageBorder}`}}><div style={{fontSize:10,color:C.sage}}>Exposure Saved</div><div style={{fontSize:14,fontWeight:700,color:C.sage}}>₹{(cx.savedExposure/1e3).toFixed(1)}K</div></div>}
            {lv&&<div style={{padding:"8px 14px",background:C.bgSub,borderRadius:6,border:`1px solid ${C.borderLight}`}}><div style={{fontSize:10,color:C.dimmer}}>Proj 6-wk ST</div><div style={{fontSize:14,fontWeight:700,color:lv.proj6>=75?C.amber:C.terra}}>{lv.proj6}%</div></div>}
          </div>
          {/* Store-level detail */}
          {(cx.pullFrom>0||cx.consolidateTo>0)&&<div style={{padding:"10px 14px",background:C.bgSub,borderRadius:6,border:`1px solid ${C.borderLight}`}}>
            <div style={{fontSize:10,fontWeight:700,color:C.dim,letterSpacing:.5,marginBottom:6}}>STORE DETAIL</div>
            {cx.pullFrom>0&&<div style={{marginBottom:6}}>
              <div style={{fontSize:11,fontWeight:600,color:C.terra,marginBottom:3}}>Pull stock from ({cx.pullFrom} stores):</div>
              <div style={{fontSize:12,color:C.textMid,lineHeight:1.6}}>{STORE_DB.filter(st=>st.grade==="A").slice(-cx.pullFrom).map(st=>`${st.name} (${st.code})`).join(" · ")}</div>
            </div>}
            {cx.consolidateTo>0&&<div>
              <div style={{fontSize:11,fontWeight:600,color:C.sage,marginBottom:3}}>Consolidate to ({cx.consolidateTo} stores):</div>
              <div style={{fontSize:12,color:C.textMid,lineHeight:1.6}}>{STORE_DB.filter(st=>st.grade==="A+").slice(0,cx.consolidateTo).map(st=>`${st.name} (${st.code})`).join(" · ")}</div>
            </div>}
          </div>}
        </div>);
      })}
      {cSel.length>0&&<div style={{position:"sticky",bottom:0,marginTop:12,padding:"12px 18px",background:C.green,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"space-between",boxShadow:"0 -4px 20px rgba(0,0,0,.15)"}}>
        <span style={{color:"#fff",fontSize:13,fontWeight:600}}>{cSel.length} action{cSel.length>1?"s":""} selected</span>
        <div style={{display:"flex",gap:8}}>
          <button onClick={()=>setSelected({})} style={{fontSize:12,padding:"6px 14px",borderRadius:5,border:"1px solid rgba(255,255,255,.2)",background:"transparent",color:"rgba(255,255,255,.7)",cursor:"pointer",fontFamily:font}}>Clear</button>
          <button onClick={approveSelected} style={{fontSize:12,fontWeight:600,padding:"6px 18px",borderRadius:5,border:"none",background:"#3BB896",color:"#fff",cursor:"pointer",fontFamily:font}}>Approve & Execute ({cSel.length})</button>
        </div>
      </div>}
    </div>
  );};

  /* ═══ MAIN LAYOUT ═══ */
  const titles={"alloc-sku":"By SKU","alloc-store":"By Store","rep-overall":"Overall","rep-s2s":"Store → Store Transfers","rep-s2w":"Store → Warehouse","rep-consol":"Consolidation","perf-overview":"Performance Overview","perf-sku":"Performance by SKU","perf-store":"Performance by Store"};
  const subs={"alloc-sku":`${styles.length} styles · ${totU.toLocaleString()} units · ₹${(adjV/1e7).toFixed(1)}Cr of ₹${otb}Cr OTB${rebuyOTB>0?" (incl ₹"+(rebuyOTB/1e5).toFixed(1)+"L re-buys)":""}`,"alloc-store":`${sa.length} A+/A stores · ~280 B/C aggregated`,"rep-overall":`Week ${WEEK} of 22 · ${liveSold.toLocaleString()} of ${totU.toLocaleString()} sold · Proj avg 6-wk ST ${avgProj6}%`,"rep-s2s":`${XFERS.length} recommended transfers · ${XFERS.reduce((a,x)=>a+x.u,0)} units`,"rep-s2w":`${replenStyles.filter(s=>s.needsReplen).length} styles below 14-day DoC target`,"rep-consol":`${CONSOL.length} styles flagged`,"perf-overview":"Season health and key insights","perf-sku":"Sell-through performance across all seasons","perf-store":"Store-level performance across all seasons"};

  return (<div style={{display:"flex",height:"100vh",overflow:"auto",background:C.bg,fontFamily:font}}>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet"/>
    <Sidebar/>
    <ScenarioModal/><TrailModal/>
    <div style={{flex:1,display:"flex",flexDirection:"column",minWidth:0,height:"100vh",overflow:"hidden"}}>
      {(isPast||isLive)&&<div style={{padding:"8px 32px",background:isLive?C.sageSoft:C.amberSoft,borderBottom:`1px solid ${isLive?C.sageBorder:C.amberBorder}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <span style={{fontSize:12,color:isLive?C.sage:"#7A5C14"}}>{isLive?"Operating":"Viewing"} <b>{pastSeason?.label||activeSeason}</b>{isLive?" · In-Season · Week 14":" · Read-only"}</span>
        <button onClick={()=>{setActiveSeason("SS26");setNav("alloc-sku");}} style={{fontSize:11,fontWeight:600,padding:"4px 12px",borderRadius:4,border:`1px solid ${isLive?C.sageBorder:C.amberBorder}`,background:"#fff",color:isLive?C.sage:"#7A5C14",cursor:"pointer",fontFamily:font}}>← Back to SS26 (Planning)</button>
      </div>}
      <ContentHeader title={isPast?`${pastSeason?.label||activeSeason}`:(titles[nav]||"")} sub={isPast?`${pastSeason?.styles} styles · ${pastSeason?.units} units · ${pastSeason?.budget} · Avg ST ${pastSeason?.stAvg}`:(subs[nav]||"")} right={isPast?null:
        nav==="alloc-sku"?<button style={{background:C.green,border:"none",borderRadius:6,color:"#fff",padding:"7px 16px",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:font}}>Export Plan</button>:
        nav.startsWith("rep-")?<div style={{display:"flex",gap:8,alignItems:"center"}}>
          {rebuyOTB>0&&<div style={{padding:"4px 10px",background:C.amberSoft,borderRadius:4,fontSize:11,color:C.amber,border:`1px solid ${C.amberBorder}`,fontWeight:600}}>₹{(rebuyOTB/1e5).toFixed(1)}L committed</div>}
          <div style={{padding:"4px 10px",background:C.bgSub,borderRadius:4,fontSize:11,color:C.dim,border:`1px solid ${C.borderLight}`}}>OTB: {pctUsed.toFixed(0)}% used</div>
        </div>:null
      }/>
      <div style={{flex:1,overflow:"auto",padding:"24px 32px"}}>
        {/* ═══ PAST SEASON CONTENT ═══ */}
        {isPast&&pastSeason&&<div>
          <div style={{display:"flex",gap:12,marginBottom:20}}>
            {[{l:"Styles",v:pastSeason.styles},{l:"Units",v:pastSeason.units},{l:"Budget",v:pastSeason.budget},{l:"Margin",v:pastSeason.margin},{l:"Avg ST",v:pastSeason.stAvg}].map(m=> (<div key={m.l} style={{padding:"12px 18px",background:"#fff",borderRadius:8,border:`1px solid ${C.border}`,flex:1}}><div style={{fontSize:10,color:C.dimmer,fontWeight:500}}>{m.l}</div><div style={{fontSize:18,fontWeight:700,color:C.green,marginTop:3}}>{m.v}</div></div>))}
          </div>
          <div style={{fontSize:12,fontWeight:700,color:C.dim,letterSpacing:.6,marginBottom:10}}>STYLE PERFORMANCE</div>
          <table style={{width:"100%",borderCollapse:"collapse",background:"#fff",borderRadius:8,overflow:"hidden",border:`1px solid ${C.border}`,marginBottom:24}}>
            <thead><tr style={{background:C.bgSub,borderBottom:`2px solid ${C.border}`}}>
              {["Style","Planned","Sold","6-wk ST","vs 90%"].map((h,i)=> (<th key={i} style={{padding:"10px 12px",fontSize:11,fontWeight:600,color:C.dim,textAlign:i>=1?"center":"left"}}>{h}</th>))}
            </tr></thead>
            <tbody>{pastSeason.topStyles.map((ps,ri)=> (<tr key={ri} style={{borderBottom:`1px solid ${C.borderLight}`,background:ri%2===0?"#fff":C.bgSub}}>
              <td style={{padding:"10px 12px",fontSize:14,fontWeight:600}}>{ps.name}</td>
              <td style={{textAlign:"center",fontFamily:"monospace",fontSize:13,color:C.dim}}>{ps.u.toLocaleString()}</td>
              <td style={{textAlign:"center",fontFamily:"monospace",fontWeight:600,fontSize:13}}>{ps.sold.toLocaleString()}</td>
              <td style={{textAlign:"center"}}><span style={{fontWeight:600,padding:"2px 8px",borderRadius:4,background:ps.st>=90?C.sageSoft:ps.st>=80?"#F0F2E6":C.terraSoft,color:ps.st>=90?C.sage:ps.st>=80?"#7A6B1A":C.terra,fontSize:13}}>{ps.st}%</span></td>
              <td style={{textAlign:"center",fontSize:12,color:ps.st>=90?C.sage:C.terra}}>{ps.st>=90?"At target":`${90-ps.st}pts below`}</td>
            </tr>))}</tbody>
          </table>
          <div style={{fontSize:12,fontWeight:700,color:C.dim,letterSpacing:.6,marginBottom:10}}>STORE PERFORMANCE</div>
          <table style={{width:"100%",borderCollapse:"collapse",background:"#fff",borderRadius:8,overflow:"hidden",border:`1px solid ${C.border}`}}>
            <thead><tr style={{background:C.bgSub,borderBottom:`2px solid ${C.border}`}}>
              {["Store","Code","Units","Avg ST"].map((h,i)=> (<th key={i} style={{padding:"10px 12px",fontSize:11,fontWeight:600,color:C.dim,textAlign:i>=2?"center":"left"}}>{h}</th>))}
            </tr></thead>
            <tbody>{pastSeason.topStores.map((ps,ri)=> (<tr key={ri} style={{borderBottom:`1px solid ${C.borderLight}`,background:ri%2===0?"#fff":C.bgSub}}>
              <td style={{padding:"10px 12px",fontSize:14,fontWeight:600}}>{ps.name}</td>
              <td style={{padding:"10px 12px",fontSize:12,color:C.dimmer,fontFamily:"monospace"}}>{ps.code}</td>
              <td style={{textAlign:"center",fontFamily:"monospace",fontWeight:600,fontSize:13}}>{ps.u}</td>
              <td style={{textAlign:"center"}}><span style={{fontWeight:600,padding:"2px 8px",borderRadius:4,background:ps.st>=85?C.sageSoft:ps.st>=78?"#F0F2E6":C.terraSoft,color:ps.st>=85?C.sage:ps.st>=78?"#7A6B1A":C.terra,fontSize:13}}>{ps.st}%</span></td>
            </tr>))}</tbody>
          </table>
        </div>}

        {/* ═══ CURRENT SEASON CONTENT ═══ */}
        {!isPast&&<>
        {/* Allocation */}
        {nav==="alloc-sku"&&<div>
          {/* OTB Bar */}
          <div style={{padding:"14px 18px",background:"#fff",borderRadius:8,border:`1px solid ${C.border}`,marginBottom:14,display:"flex",alignItems:"center",gap:20}}>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"baseline",justifyContent:"space-between",marginBottom:6}}>
                <div><span style={{fontSize:11,fontWeight:600,color:C.dim,letterSpacing:.5}}>OPEN TO BUY</span></div>
                <div style={{fontSize:13}}><span style={{fontWeight:700,color:C.green,fontFamily:"monospace"}}>₹{(adjV/1e7).toFixed(2)}Cr</span> <span style={{color:C.dimmer}}>of</span> <span style={{fontWeight:600}}>₹{otb}Cr</span></div>
              </div>
              <div style={{height:8,background:C.borderLight,borderRadius:4,overflow:"hidden"}}>
                <div style={{height:8,background:pctUsed>95?C.terra:pctUsed>85?C.amber:C.sage,borderRadius:4,width:`${Math.min(pctUsed,100)}%`,transition:"width 0.3s"}}/>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}>
                <span style={{fontSize:11,color:C.dim}}>{pctUsed.toFixed(1)}% committed</span>
                <span style={{fontSize:11,color:pctUsed>95?C.terra:C.sage}}>₹{((otb*1e7-adjV)/1e5).toFixed(0)}L remaining</span>
              </div>
            </div>
            <div style={{display:"flex",gap:16,flexShrink:0}}>
              <div style={{textAlign:"center"}}><div style={{fontSize:10,color:C.dimmer}}>Styles</div><div style={{fontSize:18,fontWeight:700,color:C.green}}>{styles.length}</div></div>
              <div style={{textAlign:"center"}}><div style={{fontSize:10,color:C.dimmer}}>Units</div><div style={{fontSize:18,fontWeight:700,color:C.green,fontFamily:"monospace"}}>{totU.toLocaleString()}</div></div>
              <div style={{textAlign:"center"}}><div style={{fontSize:10,color:C.dimmer}}>Avg Margin</div><div style={{fontSize:18,fontWeight:700,color:C.green}}>58.4%</div></div>
            </div>
          </div>
          <div style={{display:"flex",gap:8,marginBottom:14,alignItems:"center"}}>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search styles..." style={{padding:"7px 12px",borderRadius:6,border:`1px solid ${C.border}`,fontSize:13,fontFamily:font,outline:"none",width:200,background:C.warm}}/>
            {["all","carryover","new-design"].map(f=> (<button key={f} onClick={()=>setFilterSrc(f)} style={{fontSize:11,fontWeight:filterSrc===f?600:400,padding:"5px 12px",borderRadius:16,border:`1px solid ${filterSrc===f?C.sage:C.border}`,background:filterSrc===f?C.sageSoft:"#fff",color:filterSrc===f?C.sage:C.dim,cursor:"pointer",fontFamily:font}}>{f==="all"?"All":SL[f]||f}</button>))}
            <span style={{fontSize:12,color:C.dimmer,marginLeft:"auto"}}>{styles.length} styles · {Object.keys(edits).length} edits</span>
          </div>
          {grouped.map(({cat,styles:gs,units:cu,count})=>{const fgs=gs.filter(s=>(filterSrc==="all"||s.src===filterSrc)&&(!search||s.name.toLowerCase().includes(search.toLowerCase())||s.id.toLowerCase().includes(search.toLowerCase())));if(fgs.length===0)return null;
            return (<div key={cat} style={{marginBottom:6}}>
            <div onClick={()=>setCatOpen(p=>({...p,[cat]:!p[cat]}))} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 14px",cursor:"pointer",background:C.bgSub,borderRadius:6,border:`1px solid ${C.borderLight}`}}>
              <div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:10,color:C.dim,transition:"transform 0.15s",transform:catOpen[cat]?"rotate(0deg)":"rotate(-90deg)",display:"inline-block"}}>{"\u25BE"}</span><span style={{fontSize:14,fontWeight:600,color:C.green,fontFamily:serif}}>{cat}</span><span style={{fontSize:11,color:C.dimmer,background:C.bg,padding:"1px 6px",borderRadius:8,border:`1px solid ${C.borderLight}`}}>{fgs.length}</span></div>
              <span style={{fontSize:12,fontFamily:"monospace",fontWeight:600,color:C.green}}>{fgs.reduce((a,s)=>a+s.units,0).toLocaleString()}u</span>
            </div>{catOpen[cat]&&<div style={{display:"flex",flexDirection:"column",gap:3,marginTop:3}}>{fgs.map(s=> (<StyleCard key={s.id} s={s}/>))}</div>}
          </div>);})}
        </div>}

        {nav==="alloc-store"&&<div>
          <div style={{background:C.bgSub,borderRadius:8,padding:"12px 18px",marginBottom:10,border:`1px solid ${C.borderLight}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div><div style={{fontSize:13,fontWeight:600}}>B/C Stores (Aggregated)</div><div style={{fontSize:11,color:C.dim}}>~280 stores · Carryover with B/C allocation</div></div>
            <div style={{display:"flex",gap:14}}><div style={{textAlign:"right"}}><div style={{fontSize:10,color:C.dimmer}}>Units</div><div style={{fontSize:14,fontWeight:700,color:C.green,fontFamily:"monospace"}}>{bcU.toLocaleString()}</div></div><div style={{textAlign:"right"}}><div style={{fontSize:10,color:C.dimmer}}>Value</div><div style={{fontSize:14,fontWeight:600}}>₹{(bcV/1e7).toFixed(2)}Cr</div></div></div>
          </div>
          {sa.map(st=> (<StoreCard key={st.code} st={st}/>))}
        </div>}

        {/* Replenishment */}
        {nav==="rep-overall"&&<div>
          <div style={{background:`linear-gradient(135deg, ${C.green} 0%, #1A3D28 100%)`,borderRadius:10,padding:"18px 22px",marginBottom:18,color:"#fff"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
              <div><div style={{fontSize:10,fontWeight:600,letterSpacing:.5,opacity:.5}}>SEASON PULSE · WEEK {WEEK}</div><div style={{fontSize:20,fontWeight:700,marginTop:3}}>{liveSold.toLocaleString()} <span style={{fontSize:13,opacity:.5}}>of {totU.toLocaleString()} sold</span></div></div>
              <div style={{display:"flex",gap:24}}>
                <div style={{textAlign:"right"}}><div style={{fontSize:10,opacity:.4}}>Revenue</div><div style={{fontSize:16,fontWeight:700}}>₹{(liveRev/1e7).toFixed(2)}Cr</div></div>
                <div style={{textAlign:"right"}}><div style={{fontSize:10,opacity:.4}}>Proj 6-wk ST</div><div style={{fontSize:16,fontWeight:700,color:avgProj6>=85?"#3BB896":"#F8C96A"}}>{avgProj6}%</div></div>
              </div>
            </div>
            <div style={{height:5,background:"rgba(255,255,255,.12)",borderRadius:3}}><div style={{height:5,background:"#3BB896",borderRadius:3,width:`${Math.round(WEEK/22*100)}%`}}/></div>
            <div style={{display:"flex",gap:8,marginTop:10}}>
              <div onClick={()=>setFilterStatus("all")} style={{padding:"3px 10px",background:filterStatus==="all"?"rgba(255,255,255,.18)":"rgba(255,255,255,.07)",borderRadius:16,fontSize:11,cursor:"pointer",fontWeight:filterStatus==="all"?600:400}}>All {liveStyles.length}</div>
              {[{k:"critical",c:"#FF8A80"},{k:"reorder",c:"#82B1FF"},{k:"watch",c:"#F8C96A"},{k:"on-track",c:"#3BB896"}].map(s=> (<div key={s.k} onClick={()=>setFilterStatus(filterStatus===s.k?"all":s.k)} style={{padding:"3px 10px",background:filterStatus===s.k?"rgba(255,255,255,.18)":"rgba(255,255,255,.07)",borderRadius:16,fontSize:11,display:"flex",alignItems:"center",gap:5,cursor:"pointer"}}><span style={{width:7,height:7,borderRadius:4,background:s.c}}/><b>{statusCounts[s.k]||0}</b> <span style={{opacity:.5}}>{STATUS_META[s.k].l}</span></div>))}
            </div>
          </div>
          <div style={{display:"flex",gap:8,marginBottom:14}}>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search styles..." style={{padding:"7px 12px",borderRadius:6,border:`1px solid ${C.border}`,fontSize:13,fontFamily:font,outline:"none",width:200,background:C.warm}}/>
            <button style={{fontSize:11,fontWeight:600,padding:"6px 14px",borderRadius:5,border:`1px solid ${C.border}`,background:"#fff",color:C.dim,cursor:"pointer",fontFamily:font,marginLeft:"auto"}}>↓ Export Report</button>
          </div>
          {(()=>{const filtered=liveStyles.filter(s=>(filterStatus==="all"||s.live.status===filterStatus)&&(!search||s.name.toLowerCase().includes(search.toLowerCase())));
            const critical=filtered.filter(s=>s.live.status==="critical"||s.live.status==="reorder");
            const watch=filtered.filter(s=>s.live.status==="watch");
            const track=filtered.filter(s=>s.live.status==="on-track");
            return (<>
              {critical.length>0&&<div style={{marginBottom:20}}>
                <div style={{fontSize:11,fontWeight:700,color:C.terra,letterSpacing:.6,marginBottom:8}}>ACTION REQUIRED · {critical.length}</div>
                <div style={{display:"flex",flexDirection:"column",gap:3}}>{critical.map(s=> (<OpStyleCard key={s.id} s={s}/>))}</div>
              </div>}
              {watch.length>0&&<div style={{marginBottom:20}}>
                <div style={{fontSize:11,fontWeight:700,color:C.amber,letterSpacing:.6,marginBottom:8}}>MONITORING · {watch.length}</div>
                <div style={{display:"flex",flexDirection:"column",gap:3}}>{watch.map(s=> (<OpStyleCard key={s.id} s={s}/>))}</div>
              </div>}
              {track.length>0&&<div>
                <div style={{fontSize:11,fontWeight:700,color:C.dim,letterSpacing:.6,marginBottom:8}}>ON TRACK · {track.length}</div>
                <div style={{display:"flex",flexDirection:"column",gap:3}}>{track.map(s=> (<OpStyleCard key={s.id} s={s}/>))}</div>
              </div>}
              {filtered.length===0&&<div style={{padding:32,textAlign:"center",color:C.dimmer}}>No styles match the current filter.</div>}
            </>);
          })()}
        </div>}

        {nav==="rep-s2s"&&<S2SView/>}
        {nav==="rep-s2w"&&<S2WView/>}
        {nav==="rep-consol"&&<ConsolView/>}

        {/* Performance */}
        {/* Performance Overview */}
        {nav==="perf-overview"&&<div>
          {/* Plan vs Actual */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:20}}>
            <div style={{padding:"18px 22px",background:"#fff",borderRadius:8,border:`1px solid ${C.border}`}}>
              <div style={{fontSize:10,color:C.dimmer,fontWeight:500}}>Plan vs Sold</div>
              <div style={{display:"flex",alignItems:"baseline",gap:8,marginTop:6}}>
                <span style={{fontSize:26,fontWeight:700,color:C.green,fontFamily:"monospace"}}>{liveSold.toLocaleString()}</span>
                <span style={{fontSize:14,color:C.dimmer}}>/ {totU.toLocaleString()}</span>
              </div>
              <div style={{height:6,background:C.borderLight,borderRadius:3,marginTop:8}}><div style={{height:6,background:C.sage,borderRadius:3,width:`${Math.round(liveSold/totU*100)}%`}}/></div>
              <div style={{fontSize:11,color:C.dim,marginTop:4}}>{Math.round(liveSold/totU*100)}% at Week {WEEK} of 22</div>
            </div>
            <div style={{padding:"18px 22px",background:"#fff",borderRadius:8,border:`1px solid ${C.border}`}}>
              <div style={{fontSize:10,color:C.dimmer,fontWeight:500}}>Projected Avg 6-wk ST</div>
              <div style={{display:"flex",alignItems:"baseline",gap:8,marginTop:6}}>
                <span style={{fontSize:26,fontWeight:700,color:avgProj6>=85?C.sage:C.amber,fontFamily:"monospace"}}>{avgProj6}%</span>
                <span style={{fontSize:14,color:C.dimmer}}>/ 90% target</span>
              </div>
              <div style={{height:6,background:C.borderLight,borderRadius:3,marginTop:8}}><div style={{height:6,background:avgProj6>=85?C.sage:C.amber,borderRadius:3,width:`${Math.min(avgProj6,100)}%`}}/><div style={{position:"relative",top:-6,left:"90%",width:2,height:6,background:C.green}}/></div>
              <div style={{fontSize:11,color:C.dim,marginTop:4}}>{avgProj6>=90?"At target":90-avgProj6+"pts below target"}</div>
            </div>
            <div style={{padding:"18px 22px",background:"#fff",borderRadius:8,border:`1px solid ${C.border}`}}>
              <div style={{fontSize:10,color:C.dimmer,fontWeight:500}}>Revenue (MRP)</div>
              <div style={{display:"flex",alignItems:"baseline",gap:8,marginTop:6}}>
                <span style={{fontSize:26,fontWeight:700,color:C.green,fontFamily:"monospace"}}>₹{(liveRev/1e7).toFixed(2)}Cr</span>
              </div>
              <div style={{fontSize:11,color:C.dim,marginTop:8}}>OTB: ₹{otb}Cr · {pctUsed.toFixed(0)}% committed{rebuyOTB>0?` (incl ₹${(rebuyOTB/1e5).toFixed(1)}L re-buys)`:""}</div>
            </div>
          </div>

          {/* Winners and Risks - dynamically computed */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
            <div>
              <div style={{fontSize:11,fontWeight:700,color:C.sage,letterSpacing:.6,marginBottom:8}}>OUTPERFORMING PLAN</div>
              {liveStyles.filter(s=>s.live.proj6>=85).sort((a,b)=>b.live.proj6-a.live.proj6).slice(0,5).map(s=>{const wk=WK_DATA[s.id];const accel=wk&&wk.length>=2?Math.round((wk[wk.length-1]-wk[0])/wk[0]*100):0;
                return (<div key={s.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 12px",background:"#fff",borderRadius:6,border:`1px solid ${C.borderLight}`,marginBottom:4}}>
                  <span style={{fontSize:18,fontWeight:700,color:C.sage,fontFamily:"monospace",width:42}}>{s.live.proj6}%</span>
                  <div style={{flex:1}}><div style={{fontSize:13,fontWeight:600}}>{s.name}</div><div style={{fontSize:10,color:C.dim}}>{s.live.sold}/{s.units} sold · {SL[s.src]}</div></div>
                  <span style={{fontSize:11,color:accel>0?C.sage:C.terra,fontWeight:600}}>{accel>0?"+":""}{accel}% WoW</span>
                </div>);})}
            </div>
            <div>
              <div style={{fontSize:11,fontWeight:700,color:C.terra,letterSpacing:.6,marginBottom:8}}>BELOW TARGET</div>
              {liveStyles.filter(s=>s.live.proj6<70&&s.live.sold>0).sort((a,b)=>a.live.proj6-b.live.proj6).slice(0,5).map(s=>{const wk=WK_DATA[s.id];const accel=wk&&wk.length>=2?Math.round((wk[wk.length-1]-wk[0])/wk[0]*100):0;
                return (<div key={s.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 12px",background:"#fff",borderRadius:6,border:`1px solid ${C.borderLight}`,marginBottom:4}}>
                  <span style={{fontSize:18,fontWeight:700,color:C.terra,fontFamily:"monospace",width:42}}>{s.live.proj6}%</span>
                  <div style={{flex:1}}><div style={{fontSize:13,fontWeight:600}}>{s.name}</div><div style={{fontSize:10,color:C.dim}}>{s.live.sold}/{s.units} sold · {SL[s.src]}</div></div>
                  <span style={{fontSize:11,color:accel>0?C.sage:C.terra,fontWeight:600}}>{accel>0?"+":""}{accel}% WoW</span>
                </div>);})}
            </div>
          </div>

          {/* Category Health */}
          <div style={{fontSize:11,fontWeight:700,color:C.dim,letterSpacing:.6,marginBottom:8}}>CATEGORY PERFORMANCE</div>
          <table style={{width:"100%",borderCollapse:"collapse",background:"#fff",borderRadius:8,overflow:"hidden",border:`1px solid ${C.border}`,marginBottom:16}}>
            <thead><tr style={{background:C.bgSub,borderBottom:`2px solid ${C.border}`}}>
              {["Category","Styles","Units","Sold","Proj ST","WoW Momentum"].map((h,i)=> (<th key={i} style={{padding:"8px 12px",fontSize:11,fontWeight:600,color:C.dim,textAlign:i>=2?"center":"left"}}>{h}</th>))}
            </tr></thead>
            <tbody>{Object.entries(liveStyles.reduce((acc,s)=>{if(!acc[s.sub])acc[s.sub]={count:0,units:0,sold:0,proj:0,w1:0,w4:0};acc[s.sub].count++;acc[s.sub].units+=s.units;acc[s.sub].sold+=s.live.sold;acc[s.sub].proj+=s.live.proj6;const wk=WK_DATA[s.id];if(wk){acc[s.sub].w1+=wk[0];acc[s.sub].w4+=wk[wk.length-1];}return acc;},{})).sort((a,b)=>b[1].units-a[1].units).map(([cat,d],ri)=>{const avg=Math.round(d.proj/d.count);const mom=d.w1>0?Math.round((d.w4-d.w1)/d.w1*100):0;
              return (<tr key={cat} style={{borderBottom:`1px solid ${C.borderLight}`,background:ri%2===0?"#fff":C.bgSub}}>
                <td style={{padding:"10px 12px",fontSize:13,fontWeight:600,fontFamily:serif,color:C.green}}>{cat}</td>
                <td style={{padding:"10px 12px",fontSize:13}}>{d.count}</td>
                <td style={{textAlign:"center",fontFamily:"monospace",fontSize:13}}>{d.units.toLocaleString()}</td>
                <td style={{textAlign:"center",fontFamily:"monospace",fontWeight:600,fontSize:13}}>{d.sold.toLocaleString()}</td>
                <td style={{textAlign:"center"}}><div style={{display:"flex",alignItems:"center",gap:6,justifyContent:"center"}}><div style={{width:60,height:5,background:C.borderLight,borderRadius:3}}><div style={{height:5,background:avg>=80?C.sage:avg>=65?C.amber:C.terra,borderRadius:3,width:`${Math.min(avg,100)}%`}}/></div><span style={{fontSize:13,fontWeight:700,color:avg>=80?C.sage:avg>=65?C.amber:C.terra,fontFamily:"monospace"}}>{avg}%</span></div></td>
                <td style={{textAlign:"center",fontSize:12,fontWeight:600,color:mom>10?C.sage:mom<-10?C.terra:C.dim}}>{mom>0?"+":""}{mom}%</td>
              </tr>);})}</tbody>
          </table>

          {/* Action Summary */}
          <div style={{padding:"14px 18px",background:C.bgSub,borderRadius:8,border:`1px solid ${C.borderLight}`}}>
            <div style={{fontSize:11,fontWeight:700,color:C.dim,letterSpacing:.6,marginBottom:8}}>PENDING DECISIONS</div>
            <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
              {liveStyles.filter(s=>s.live.actions?.length>0).map(s=>s.live.actions.map((a,i)=>{const am=ACTION_META[a.type];const k=a.type+"-"+s.id;
                return (<div key={s.id+i} style={{padding:"8px 12px",background:"#fff",borderRadius:6,border:`1px solid ${approved[k]?C.sageBorder:am.bd}`,display:"flex",alignItems:"center",gap:8}}>
                  {approved[k]?<span style={{color:C.sage,fontWeight:700,fontSize:12}}>✓</span>:<span style={{fontSize:10,fontWeight:600,color:am.clr,padding:"1px 5px",borderRadius:3,background:am.bg}}>{am.l}</span>}
                  <span style={{fontSize:12,fontWeight:500}}>{s.name}</span>
                  <span style={{fontSize:10,color:C.dimmer}}>{a.act.split(".")[0]}</span>
                </div>);
              })).flat()}
            </div>
          </div>
        </div>}

        {nav==="perf-sku"&&<div>
          <div style={{display:"flex",gap:8,marginBottom:16}}>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search styles..." style={{padding:"7px 12px",borderRadius:6,border:`1px solid ${C.border}`,fontSize:13,fontFamily:font,outline:"none",width:220,background:C.warm}}/>
            {["all","carryover","new-design"].map(f=> (<button key={f} onClick={()=>setFilterSrc(f)} style={{fontSize:11,fontWeight:filterSrc===f?600:400,padding:"5px 12px",borderRadius:16,border:`1px solid ${filterSrc===f?C.sage:C.border}`,background:filterSrc===f?C.sageSoft:"#fff",color:filterSrc===f?C.sage:C.dim,cursor:"pointer",fontFamily:font}}>{f==="all"?"All":SL[f]||f}</button>))}
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {styles.filter(s=>(filterSrc==="all"||s.src===filterSrc)&&(!search||s.name.toLowerCase().includes(search.toLowerCase()))).sort((a,b)=>(LIVE[b.id]?.proj6||0)-(LIVE[a.id]?.proj6||0)).map(s=>{
            const lv=LIVE[s.id]||{proj6:0,sold:0,bySz:{},byGr:{},ros:{},alerts:[]};const wk=WK_DATA[s.id];const isX=perfExp===s.id;
            const seasons=Object.entries(s.hist||{}).sort((a,b)=>a[0].localeCompare(b[0]));
            const accel=wk&&wk.length>=2?Math.round((wk[wk.length-1]-wk[0])/Math.max(wk[0],1)*100):0;
            const pctSold=s.units>0?Math.round(lv.sold/s.units*100):0;
            return (<div key={s.id} style={{background:"#fff",borderRadius:10,border:`1px solid ${isX?C.sage+"55":C.border}`,overflow:"hidden"}}>
              {/* Collapsed card */}
              <div onClick={()=>setPerfExp(isX?null:s.id)} style={{padding:"14px 18px",cursor:"pointer",display:"flex",alignItems:"center",gap:16}}>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <span style={{fontSize:15,fontWeight:600,fontFamily:serif}}>{s.name}</span>
                    <span style={{fontSize:10,color:C.dim,padding:"1px 6px",background:C.bgSub,borderRadius:3}}>{s.sub}</span>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:12,marginTop:8}}>
                    <div style={{flex:1,maxWidth:240}}>
                      <div style={{height:6,background:C.borderLight,borderRadius:3}}><div style={{height:6,background:pctSold>=50?C.sage:pctSold>=30?C.amber:C.dimmer,borderRadius:3,width:`${pctSold}%`}}/></div>
                      <div style={{display:"flex",justifyContent:"space-between",marginTop:3}}><span style={{fontSize:10,color:C.dimmer}}>{lv.sold.toLocaleString()} / {s.units.toLocaleString()}</span><span style={{fontSize:10,color:C.dim}}>{pctSold}% sold</span></div>
                    </div>
                    {wk&&<div style={{padding:"2px 8px",borderRadius:4,background:accel>10?C.sageSoft:accel<-10?C.terraSoft:C.bgSub}}>
                      <span style={{fontSize:11,fontWeight:700,color:accel>10?C.sage:accel<-10?C.terra:C.dim}}>{accel>0?"+":""}{accel}%</span>
                      <span style={{fontSize:9,color:C.dimmer,marginLeft:3}}>WoW</span>
                    </div>}
                    {seasons.length>0&&<div style={{display:"flex",gap:2,alignItems:"flex-end"}}>{seasons.map(([ssn,d])=> (<div key={ssn} title={`${ssn}: ${d.st}%`} style={{width:8,height:Math.max(3,Math.round(d.st/100*20)),background:d.st>=90?C.sage:d.st>=80?"#C4B86A":C.terra+"77",borderRadius:1}}/>))}</div>}
                  </div>
                </div>
                <div style={{textAlign:"right",flexShrink:0}}>
                  <div style={{fontSize:32,fontWeight:700,color:lv.proj6>=90?C.sage:lv.proj6>=75?C.amber:lv.proj6>0?C.terra:C.dimmer,fontFamily:"monospace",lineHeight:1}}>{lv.proj6||"--"}</div>
                  <div style={{fontSize:10,color:C.dimmer,marginTop:2}}>proj 6-wk ST%</div>
                </div>
              </div>

              {/* Expanded detail */}
              {isX&&<div style={{borderTop:`1px solid ${C.borderLight}`,padding:"18px"}}>
                {/* Weekly chart - full width, prominent */}
                {wk&&<div style={{marginBottom:16}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                    <span style={{fontSize:11,fontWeight:700,color:C.dim,letterSpacing:.5}}>WEEKLY SELL-THROUGH</span>
                    <div style={{display:"flex",gap:10,fontSize:10,color:C.dimmer}}>
                      <span><span style={{display:"inline-block",width:10,height:2,background:C.sage,marginRight:3,verticalAlign:"middle"}}/>Actual</span>
                      <span><span style={{display:"inline-block",width:10,height:0,borderTop:"1px dashed "+C.dimmer,marginRight:3,verticalAlign:"middle"}}/>Planned rate</span>
                    </div>
                  </div>
                  {(()=>{const plannedRate=Math.round(s.units/22);const maxVal=Math.max(...wk,plannedRate)*1.2;const W=560;const H=120;const pad={l:36,r:16,t:8,b:22};const cw=W-pad.l-pad.r;const ch=H-pad.t-pad.b;
                    const pts=wk.map((v,i)=>({x:pad.l+i*(cw/3),y:pad.t+ch-(v/maxVal)*ch}));
                    const path=pts.map((p,i)=>i===0?`M${p.x},${p.y}`:`L${p.x},${p.y}`).join(" ");
                    const planY=pad.t+ch-(plannedRate/maxVal)*ch;
                    return (<svg width={W} height={H} style={{display:"block",width:"100%"}}>
                      {[0,0.5,1].map(f=>{const y=pad.t+ch*(1-f);return <g key={f}><line x1={pad.l} x2={W-pad.r} y1={y} y2={y} stroke={C.borderLight} strokeWidth="1"/><text x={pad.l-6} y={y+3} textAnchor="end" fill={C.dimmer} fontSize="9" fontFamily="monospace">{Math.round(maxVal*f)}</text></g>;})}
                      <line x1={pad.l} x2={W-pad.r} y1={planY} y2={planY} stroke={C.dimmer} strokeWidth="1" strokeDasharray="4,3"/>
                      <text x={W-pad.r+4} y={planY+3} fill={C.dimmer} fontSize="8">plan</text>
                      <path d={path} fill="none" stroke={C.sage} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      {pts.map((p,i)=><g key={i}><circle cx={p.x} cy={p.y} r="4.5" fill={C.sage}/><circle cx={p.x} cy={p.y} r="2" fill="#fff"/><text x={p.x} y={p.y-10} textAnchor="middle" fill={C.green} fontSize="11" fontWeight="600" fontFamily="monospace">{wk[i]}</text><text x={p.x} y={H-4} textAnchor="middle" fill={C.dimmer} fontSize="9" fontFamily="monospace">W{i+1}</text></g>)}
                    </svg>);
                  })()}
                </div>}

                {/* Two columns: Size + Grade */}
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:16}}>
                  <div>
                    <div style={{fontSize:11,fontWeight:700,color:C.dim,letterSpacing:.5,marginBottom:8}}>SIZE PERFORMANCE</div>
                    {SIZES.map(sz=>{const planned=Math.round(s.units*(s.colors[0]?.c[SIZES.indexOf(sz)]||STD[SIZES.indexOf(sz)]));const sold=lv.bySz?.[sz]||0;const pct=planned>0?Math.round(sold/planned*100):0;
                      return (<div key={sz} style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                        <span style={{fontSize:12,fontWeight:600,width:22,color:C.dim}}>{sz}</span>
                        <div style={{flex:1,height:8,background:C.borderLight,borderRadius:4}}><div style={{height:8,background:pct>50?C.sage:pct>30?C.amber:C.dimmer,borderRadius:4,width:`${pct}%`}}/></div>
                        <span style={{fontSize:12,fontWeight:600,fontFamily:"monospace",width:32,textAlign:"right",color:pct>50?C.sage:pct>30?C.amber:C.dimmer}}>{pct}%</span>
                        <span style={{fontSize:10,fontFamily:"monospace",color:C.dimmer,width:48,textAlign:"right"}}>{sold}/{planned}</span>
                      </div>);})}
                  </div>
                  <div>
                    <div style={{fontSize:11,fontWeight:700,color:C.dim,letterSpacing:.5,marginBottom:8}}>GRADE PERFORMANCE</div>
                    {GRADES.filter(g=>s.ga[g]).map(g=>{const alloc=Math.round(s.units*s.ga[g]);const sold=lv.byGr?.[g]||0;const pct=alloc>0?Math.round(sold/alloc*100):0;
                      return (<div key={g} style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                        <span style={{fontSize:12,fontWeight:700,color:C.green,width:28}}>{g}</span>
                        <div style={{flex:1,height:8,background:C.borderLight,borderRadius:4}}><div style={{height:8,background:C.sage,borderRadius:4,width:`${pct}%`}}/></div>
                        <span style={{fontSize:12,fontWeight:600,fontFamily:"monospace",width:32,textAlign:"right"}}>{pct}%</span>
                        <span style={{fontSize:10,fontFamily:"monospace",color:C.dimmer,width:56,textAlign:"right"}}>{sold}/{alloc}</span>
                      </div>);})}
                    <div style={{marginTop:12,fontSize:11,fontWeight:700,color:C.dim,letterSpacing:.5,marginBottom:6}}>COLORS</div>
                    <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{s.colors.map(c=> (<span key={c.n} style={{fontSize:11,padding:"3px 8px",background:C.bgSub,borderRadius:4}}>{c.n} <b>{(c.p*100).toFixed(0)}%</b></span>))}</div>
                    {seasons.length>0&&<><div style={{marginTop:12,fontSize:11,fontWeight:700,color:C.dim,letterSpacing:.5,marginBottom:6}}>HISTORY</div>
                    <div style={{display:"flex",gap:8}}>{seasons.map(([ssn,d])=> (<div key={ssn} style={{padding:"4px 8px",background:C.bgSub,borderRadius:4,textAlign:"center"}}><div style={{fontSize:9,color:C.dimmer}}>{ssn}</div><div style={{fontSize:14,fontWeight:700,color:d.st>=90?C.sage:d.st>=80?"#7A6B1A":C.terra}}>{d.st}%</div><div style={{fontSize:9,color:C.dimmer}}>{d.u}u</div></div>))}</div></>}
                  </div>
                </div>

                {/* Takeaway */}
                <div style={{padding:"12px 16px",background:lv.proj6>=85?"#EFF5F3":lv.proj6>=65?C.amberSoft:C.terraSoft,borderRadius:8,borderLeft:`3px solid ${lv.proj6>=85?C.sage:lv.proj6>=65?C.amber:C.terra}`,marginBottom:12}}>
                  <div style={{fontSize:12,color:C.textMid,lineHeight:1.55}}>{lv.proj6>=90?`Exceeding target. ${accel>20?"Accelerating WoW.":"Steady velocity."} ${Object.entries(lv.byGr||{}).filter(([_,v])=>v>0).length>=3?"Broad demand across grades.":"Concentrated in top-tier stores."}`:lv.proj6>=75?`${90-lv.proj6}pts below 90% target. ${accel>0?"Positive WoW momentum.":"Flat or declining trend."} ${seasons.length>0?`Trajectory: ${seasons.map(([n,d])=>d.st+"%").join(" → ")} → ${lv.proj6}%.`:""}`:`At ${lv.proj6}%, well below target. ${accel<-10?"Decelerating.":"Low but stable."} ${(lv.actions||[]).length>0?lv.actions[0].act.split(".")[0]+".":"Review for markdown."}`}</div>
                </div>
                {/* Questt */}
                <div style={{display:"flex",alignItems:"center",gap:4}}>
                  {[`Why is ${s.name} at ${lv.proj6}%?`,`Store breakdown`,`What if we don't act?`].map((q,qi)=> (<button key={qi} onClick={e=>{e.stopPropagation();openQuestt(s,q);}} style={{fontSize:10,color:C.green,background:C.sageSoft,border:`1px solid ${C.sageBorder}`,borderRadius:12,padding:"4px 10px",cursor:"pointer",fontFamily:font}}>{q}</button>))}
                </div>
              </div>}
            </div>);
          })}
          </div>
        </div>}

        {nav==="perf-store"&&<div>
          <div style={{display:"flex",gap:8,marginBottom:16}}>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search stores..." style={{padding:"7px 12px",borderRadius:6,border:`1px solid ${C.border}`,fontSize:13,fontFamily:font,outline:"none",width:220,background:C.warm}}/>
            {["all","A+","A"].map(g=> (<button key={g} onClick={()=>setFilterSrc(g)} style={{fontSize:11,fontWeight:filterSrc===g?600:400,padding:"5px 12px",borderRadius:16,border:`1px solid ${filterSrc===g?C.sage:C.border}`,background:filterSrc===g?C.sageSoft:"#fff",color:filterSrc===g?C.sage:C.dim,cursor:"pointer",fontFamily:font}}>{g==="all"?"All":g}</button>))}
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {sa.filter(st=>(filterSrc==="all"||st.grade===filterSrc)&&(!search||st.name.toLowerCase().includes(search.toLowerCase())||st.code.toLowerCase().includes(search.toLowerCase()))).map(st=>{
            const stHash=(st.code.charCodeAt(2)*7+st.code.charCodeAt(3)*13)%100;const stMult=0.72+(stHash/100)*0.56;
            const stAlloc=Math.round(st.tu*stMult);
            const stSold=Math.round(st.sl.reduce((a,x)=>{const lv=LIVE[x.id];return a+(lv?lv.sold*(st.grade==="A+"?0.22/12:0.38/21):0);},0)*stMult);
            const stPct=stAlloc>0?Math.round(stSold/stAlloc*100):0;
            const stRev=Math.round(st.sl.reduce((a,x)=>{const lv=LIVE[x.id];return a+(lv?lv.sold*(st.grade==="A+"?0.22/12:0.38/21):0)*x.mrp;},0)*stMult);
            const isX=perfExp==="st-"+st.code;
            return (<div key={st.code} style={{background:"#fff",borderRadius:10,border:`1px solid ${isX?C.sage+"55":C.border}`,overflow:"hidden"}}>
              <div onClick={()=>setPerfExp(isX?null:"st-"+st.code)} style={{padding:"14px 18px",cursor:"pointer",display:"flex",alignItems:"center",gap:16}}>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <span style={{fontSize:15,fontWeight:600,fontFamily:serif}}>{st.name}</span>
                    <span style={{fontSize:10,padding:"2px 6px",borderRadius:4,background:st.grade==="A+"?C.sageSoft:C.warm,color:st.grade==="A+"?C.sage:C.dim,fontWeight:600}}>{st.grade}</span>
                    <span style={{fontSize:11,color:C.dimmer}}>{st.city}</span>
                  </div>
                  <div style={{display:"flex",gap:20,marginTop:8}}>
                    <div><span style={{fontSize:10,color:C.dimmer}}>Styles </span><span style={{fontSize:13,fontWeight:600}}>{st.sc}</span></div>
                    <div><span style={{fontSize:10,color:C.dimmer}}>Sold </span><span style={{fontSize:13,fontWeight:600,fontFamily:"monospace",color:C.green}}>{stSold}</span><span style={{fontSize:10,color:C.dimmer}}>/{stAlloc}</span></div>
                    <div><span style={{fontSize:10,color:C.dimmer}}>Revenue </span><span style={{fontSize:13,fontWeight:600,color:C.green}}>₹{(stRev/1e3).toFixed(0)}K</span></div>
                  </div>
                </div>
                <div style={{textAlign:"right",flexShrink:0}}>
                  <div style={{fontSize:28,fontWeight:700,color:stPct>=45?C.sage:stPct>=30?C.amber:C.dimmer,fontFamily:"monospace",lineHeight:1}}>{stPct}</div>
                  <div style={{fontSize:10,color:C.dimmer,marginTop:2}}>ST%</div>
                </div>
              </div>
              {isX&&<div style={{borderTop:`1px solid ${C.borderLight}`,padding:"18px"}}>
                <div style={{fontSize:11,fontWeight:700,color:C.dim,letterSpacing:.5,marginBottom:10}}>STYLE PERFORMANCE</div>
                <div style={{display:"flex",flexDirection:"column",gap:4}}>
                  {st.sl.sort((a,b)=>b.units-a.units).slice(0,15).map(x=>{const lv=LIVE[x.id];const xSold=lv?Math.round(lv.sold*(st.grade==="A+"?0.22/12:0.38/21)*stMult):0;const xPct=x.units>0?Math.round(xSold/Math.max(x.units,1)*100):0;
                    return (<div key={x.id} style={{display:"flex",alignItems:"center",gap:10,padding:"4px 0"}}>
                      <span style={{fontSize:12,fontWeight:500,width:160}}>{x.name}</span>
                      <span style={{fontSize:10,color:C.dimmer,width:50}}>{x.sub.slice(0,6)}</span>
                      <div style={{flex:1,height:6,background:C.borderLight,borderRadius:3}}><div style={{height:6,background:xPct>=50?C.sage:xPct>=30?C.amber:C.dimmer,borderRadius:3,width:`${xPct}%`}}/></div>
                      <span style={{fontSize:12,fontWeight:600,fontFamily:"monospace",color:xPct>=50?C.sage:xPct>=30?C.amber:C.dimmer,width:32,textAlign:"right"}}>{xPct}%</span>
                      <span style={{fontSize:10,fontFamily:"monospace",color:C.dimmer,width:44,textAlign:"right"}}>{xSold}/{x.units}</span>
                    </div>);})}
                </div>
                <div style={{display:"flex",gap:12,marginTop:14}}>
                  <div style={{flex:1,padding:"10px 14px",background:C.bgSub,borderRadius:6}}>
                    <div style={{fontSize:10,fontWeight:700,color:C.dim,letterSpacing:.5,marginBottom:6}}>SIZE PROFILE</div>
                    <div style={{display:"flex",gap:4}}>{SIZES.map(sz=> (<div key={sz} style={{flex:1,textAlign:"center"}}>
                      <div style={{fontSize:10,color:C.dimmer}}>{sz}</div>
                      <div style={{height:Math.max(3,Math.round(st.sp[sz]*100*0.5)),background:C.sage,borderRadius:2,marginTop:2}}/>
                      <div style={{fontSize:10,fontWeight:600,marginTop:2}}>{(st.sp[sz]*100).toFixed(0)}%</div>
                    </div>))}</div>
                  </div>
                  <div style={{padding:"10px 14px",background:C.sageSoft,borderRadius:6,border:`1px solid ${C.sageBorder}`}}>
                    <div style={{display:"flex",alignItems:"center",gap:4,marginBottom:4}}><div style={{width:14,height:14,borderRadius:7,background:C.sage,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{color:"#fff",fontSize:7,fontWeight:700}}>q</span></div><span style={{fontSize:11,fontWeight:600,color:C.green}}>questt.</span></div>
                    <div style={{display:"flex",flexDirection:"column",gap:3}}>
                      {[`${st.name} restock needs`,`Compare to other ${st.grade} stores`].map((q,qi)=> (<button key={qi} onClick={e=>{e.stopPropagation();openQuestt({name:st.name,id:st.sl[0]?.id},q);}} style={{fontSize:10,color:C.green,background:"#fff",border:`1px solid ${C.sageBorder}`,borderRadius:10,padding:"3px 8px",cursor:"pointer",fontFamily:font,textAlign:"left"}}>{q}</button>))}
                    </div>
                  </div>
                </div>
              </div>}
            </div>);})}
          </div>
        </div>}
        </>}
      </div>
    </div>
    {chatOpen&&<ChatPanel/>}
  </div>);
}


"use client"
import { useState, useRef, useEffect } from "react";
import { Menu, Bell, Search, ChevronDown, User, Settings, LogOut } from "lucide-react";

/* ══════════════════════════════════════════════════════════════
   SLMG BEVERAGES — TRADE SPEND COMMAND CENTER v8
   With functional conversation panel
   ══════════════════════════════════════════════════════════════ */

const C = {
  header: "#111A15", page: "#FAFAF8", card: "#FFFFFF", border: "#E5E2DB",
  borderLight: "#F0EDE7", text: "#1C1C1C", textMid: "#555555", textLight: "#999999",
  green: "#111a15", greenPale: "#EAF2EF", greenSoft: "#2D5A3D08",
  orange: "#946B1A", orangePale: "#FDFAF0",
  red: "#B33A3A", redPale: "#FDF3F3",
  blue: "#3B6FA0", bluePale: "#EFF5FB",
  cream: "#F3F0EB", warmGrey: "#E8E5DE",
};
const font="'Inter',-apple-system,sans-serif";
const serif = "Georgia, serif";
const mono = "'JetBrains Mono', monospace";

const sources = {
  d365: { l: "SLMG D365", lag: "T+1", c: C.green },
  dms: { l: "DMS Secondary", lag: "T+1", c: C.green },
  nielsen: { l: "NielsenIQ", lag: "~6 wk", c: C.orange },
  scheme: { l: "Scheme Mgmt", lag: "T+1", c: C.green },
};

/* ═══ CONVERSATION RESPONSES ═══ */
const convResponses = {
  "What if we increase rural margin by ₹3/case in the top 200 outlets?": {
    agents: ["Spend Simulator", "Volume Model", "Margin Analyzer"],
    sources: ["dms", "scheme"],
    body: `**Simulation: ₹3/case margin increase in top 200 E.UP outlets**

Running this against historical elasticity data from similar interventions in Central and Western UP:

| Metric | Current | Projected (₹3 increase) | Delta |
|---|---|---|---|
| Avg RoS (cases/wk) | 6.2 | 7.4 | +19.4% |
| Monthly volume | 24,800 cases | 29,600 cases | +4,800 cases |
| Monthly cost | — | ₹0.89 Cr | — |
| Cost/incremental case | — | ₹185 | vs ₹296 current avg |

**Assessment:** This is a strong move. The top 200 outlets (cooler-equipped, RoS >5) show historical margin elasticity of 1.6x -- meaning a ₹3 increase typically yields ~₹4.80 in retained revenue. The ₹185/incremental case is 37% cheaper than the current zone average.

**However:** The ₹3 increase only makes sense if paired with cooler compliance enforcement. 28 of these 200 outlets have compliance below 50% -- they're getting the cooler benefit without exclusivity. Fix compliance first, then increase margin.`,
    followUps: ["What's the breakeven if Campa matches the margin increase?", "Show the 28 low-compliance outlets", "Run this for ₹5/case instead of ₹3"],
  },
  "Show me the 14 declining beats on a map": {
    agents: ["Geo Analyzer", "Volume Mapper"],
    sources: ["dms", "d365"],
    body: `**14 Declining Beats: Gorakhpur-Deoria Rural Cluster**

The 14 beats form a contiguous geographic band running south from Gorakhpur city through Deoria district into Kushinagar.

| Beat | Salesman | Outlets | Vol Decline | Lost Outlets |
|---|---|---|---|---|
| GKP-R-07 | Ravi Kumar | 38 | -22% | 6 |
| GKP-R-12 | Sunil Yadav | 42 | -18% | 5 |
| DEO-R-03 | Amit Singh | 35 | -24% | 8 |
| DEO-R-05 | Manoj Tiwari | 41 | -16% | 4 |
| DEO-R-08 | Pradeep Verma | 37 | -21% | 7 |
| ... | ... | ... | ... | ... |
| **Total (14 beats)** | — | **540** | **-19.2% avg** | **72** |

**Pattern:** All 14 beats are in blocks where RCPL appointed new distributors between Dec 2025 and Feb 2026. The decline started 2-3 weeks after Campa stock appeared in these outlets. The geographic concentration suggests a coordinated RCPL territory expansion, not random competitive pressure.

**Key insight:** The 72 outlets that stopped ordering entirely are almost all non-cooler outlets with RoS below 3 cases/week. The cooler-equipped outlets in the same beats are largely holding.`,
    followUps: ["Show distributor-level detail for these beats", "What's RCPL's likely next expansion target?", "Can we pre-position a counter-scheme in adjacent beats?"],
  },
  "Which cooler outlets are closest to flipping?": {
    agents: ["Outlet Risk Model", "Churn Predictor"],
    sources: ["dms", "d365"],
    body: `**Cooler Outlets at Risk of Flipping: Eastern UP**

Applied the churn prediction model (trained on the 4,200 outlets that stopped ordering) to identify cooler-equipped outlets showing early warning signals:

**High Risk (next 30 days): 142 outlets**
These show 2+ of: RoS declining >15% over 4 weeks, order frequency dropped from weekly to biweekly, and Campa presence confirmed in the same outlet.

**Medium Risk (next 60 days): 286 outlets**
These show 1 of the above signals. Most common: RoS decline of 10-15% without order frequency change yet.

| Risk Level | Outlets | Avg RoS | Avg Decline | Revenue at Risk |
|---|---|---|---|---|
| High (30d) | 142 | 4.8 cases/wk | -18% | ₹2.4 Cr/month |
| Medium (60d) | 286 | 5.6 cases/wk | -12% | ₹4.1 Cr/month |
| Stable | 1,370 | 7.2 cases/wk | -2% | Low |

**Recommendation:** The 142 high-risk outlets should receive immediate intervention this week -- a margin bump + salesman visit within 48 hours. Every week of delay increases the probability of permanent flip by ~8%.`,
    followUps: ["Generate a priority visit list for the 142 outlets", "What intervention has the highest retention rate?", "Cost to defend all 142 vs. letting the bottom 50 go?"],
  },
  "What would a Sprite visibility blitz cost across all Lucknow MT?": {
    agents: ["Scheme Designer", "Cost Model"],
    sources: ["scheme", "dms"],
    body: `**Sprite/Limca Visibility Blitz: Lucknow Modern Trade**

Scoped across all Lucknow urban MT outlets where SLMG has active distribution:

| Component | Outlets | Unit Cost | Monthly Cost |
|---|---|---|---|
| Secondary placement (end-cap) | 180 high-footfall | ₹800/outlet/mo | ₹1.44 L |
| Checkout counter display | 120 (DMart, Reliance, Spencer's) | ₹500/outlet/mo | ₹0.60 L |
| Branded chiller shelf label | 180 | ₹200/outlet (one-time) | ₹0.36 L |
| **Total monthly** | — | — | **₹2.04 L** |
| **Total quarterly** | — | — | **₹6.48 L** |

For context, the existing Limca margin scheme running across all of Central UP (including rural where Lahori has zero presence) costs ₹4.8 Cr/quarter. Redirecting just 30% of that (₹1.44 Cr) fully funds this blitz with budget to spare.

**Expected impact:** Based on similar visibility interventions in Delhi NCR MT (2024 data), secondary placement drives 25-35% uplift in impulse purchase velocity. For Lucknow, projected Limca+Sprite volume recovery: 3,200-4,500 cases/month.`,
    followUps: ["Compare this ROI vs the existing margin scheme", "Which 180 outlets have the highest footfall?", "Can we pilot in 50 outlets first?"],
  },
  "Simulate: what if 5 distributors go dark in April?": {
    agents: ["Distribution Simulator", "Revenue Impact Model", "Seasonal Overlay"],
    sources: ["d365", "dms"],
    body: `**Scenario: 5 of 14 Stressed Distributors Cease Operations in April**

Selected the 5 most stressed distributors (inventory >16 days, order frequency dropped to 12+ days):

| Distributor | Zone | Outlets Served | Monthly Vol | Summer Multiplier | April Vol at Risk |
|---|---|---|---|---|---|
| Sharma Beverages, Patna | N. Bihar | 380 | 18,200 cases | 2.3x | 41,860 |
| Krishna Traders, Muzaffarpur | N. Bihar | 290 | 12,400 | 2.1x | 26,040 |
| Gaya Sales Corp | S. Bihar | 340 | 14,800 | 2.4x | 35,520 |
| Buxar Distributors | S. Bihar | 280 | 11,200 | 2.2x | 24,640 |
| Singh & Sons, Bhagalpur | N. Bihar | 310 | 13,600 | 2.0x | 27,200 |
| **Total** | — | **1,600** | **70,200** | — | **155,260** |

**Revenue impact:** ~₹11.2 Cr in April alone (peak month). These 1,600 outlets would have zero Coca-Cola supply during the highest-demand period of the year.

**Cascading effects:**
- Retailers switch to whatever's available (Campa, PepsiCo, local brands)
- Once switched during summer, win-back cost is 3-4x the retention cost
- The 22,100 new outlets activated through these distributors lose their primary supply line

**This is preventable.** Extending payment terms by 5 days and capping loading costs ₹2.8 Cr in working capital for 60 days. The alternative is losing ₹11.2 Cr in one month.`,
    followUps: ["What's the cheapest intervention to keep all 5 alive?", "Which backup distributors could partially cover?", "Run the same scenario for all 14"],
  },
  "Simulate: reallocate ₹5 Cr from E.UP to Bihar. Net impact?": {
    agents: ["Reallocation Optimizer", "Volume Projector", "Scenario Engine"],
    sources: ["scheme", "dms"],
    body: `**Simulation: Reallocate ₹5 Cr from Eastern UP to Bihar**

**Source:** ₹5 Cr from the 340 lowest-performing E.UP outlets (current efficiency: 0.8 cases/₹).
**Destination:** Bihar summer pre-positioning across both zones.

| | Eastern UP (Source) | Bihar (Destination) | Net |
|---|---|---|---|
| **Volume change** | -4,000 cases/mo | +17,500 cases/mo | **+13,500** |
| **Spend change** | -₹5 Cr | +₹5 Cr | ₹0 |
| **Efficiency** | 0.8 → removed | 3.5 cases/₹ | **+4.4x better** |
| **Outlets affected** | 340 (conceded) | ~2,800 (strengthened) | — |
| **Share impact** | -0.3 pts (already losing) | +0.8 pts (estimated) | **Net positive** |

**Bottom line:** Same ₹5 Cr budget. 13,500 more cases per month. 4.4x efficiency improvement. Eastern UP loses 0.3 share points that were being lost anyway (these 340 outlets have sub-2 RoS and no coolers). Bihar gains distribution density ahead of summer.

**Risk:** If Coca-Cola leadership sees the E.UP share decline in the next Nielsen cycle, the optics are bad even though the economics are right. Recommend framing this as "strategic concentration" with the supporting data ready.`,
    followUps: ["Run this for ₹8.6 Cr (full waste scheme reallocation)", "What's the Bihar share projection after reallocation?", "How do we frame this for the Coca-Cola India review?"],
  },
  "Simulate: if Campa WD reaches 70% in E.UP, what's the volume impact?": {
    agents: ["Competitive Scenario Model", "Elasticity Engine"],
    sources: ["nielsen", "dms"],
    body: `**Scenario: Campa WD at 70% in Eastern UP (currently 61%)**

At current Campa expansion velocity (+4-5 pts per Nielsen cycle), 70% WD is approximately 2-3 months away.

**Projected impact on SLMG volume:**

| Campa WD Level | SLMG Volume Index | Volume Loss vs Today | Share Estimate |
|---|---|---|---|
| 52% (Q3'25) | 100 (baseline) | — | 52.8% |
| 61% (Jan'26) | 91.2 | -8.8% | 49.1% |
| 65% (projected Mar'26) | 87.4 | -12.6% | 47.2% |
| **70% (projected May'26)** | **82.1** | **-17.9%** | **44.8%** |

**At 70% WD, SLMG loses an additional ~5,100 cases/month vs today's already-declining baseline.** Total cumulative loss from the 52% baseline: ~14,500 cases/month.

**The inflection point is around 65% WD.** Beyond that, Campa reaches enough outlets that consumer habit starts shifting -- they stop looking for Coke and default to Campa. This is the "preference flip" threshold documented in other RCPL expansion markets.

**Implication:** If SLMG is going to make a stand in E.UP, the next 60 days are the window. After 70% WD, the economics of winning back become 3-4x more expensive than defending now.`,
    followUps: ["What's the cost to hold the line at 65% WD?", "Which outlet clusters are still below 50% Campa WD?", "Model the total 12-month revenue loss if we don't act"],
  },
  "Show all 23 schemes ranked by uplift with cost data": {
    agents: ["Scheme Analyzer"],
    sources: ["scheme", "dms"],
    body: `**All 23 Active Schemes: Ranked by Volume Uplift Coefficient**

| # | Scheme | Zone | Mechanic | Budget | Uplift | Cost/Inc. Case | Week |
|---|---|---|---|---|---|---|---|
| 1 | Bihar outlet activation slab | S. Bihar | Slab | ₹8.2 Cr | **1.42x** | ₹128 | 5/12 |
| 2 | Uttarakhand tourism promo | UK | Consumer | ₹3.1 Cr | **1.35x** | ₹142 | 7/12 |
| 3 | Thums Up cooler bonus | C.UP | Cooler | ₹7.8 Cr | **1.28x** | ₹147 | 6/12 |
| 4 | Bihar market seeding | N. Bihar | Margin | ₹6.4 Cr | **1.26x** | ₹164 | 5/12 |
| 5 | W.UP summer pre-load | W.UP | Slab | ₹5.2 Cr | **1.24x** | ₹172 | 4/12 |
| ... | ... | ... | ... | ... | ... | ... | ... |
| 21 | Consumer promo rural | C.UP | Consumer | ₹4.1 Cr | **1.05x** | ₹892 | 6/12 |
| 22 | Rural kirana margin | W.UP | Margin | ₹6.2 Cr | **1.04x** | ₹1,034 | 5/12 |
| 23 | Distributor vol bonus | Bkd | Volume | ₹3.8 Cr | **1.02x** | ₹1,890 | 8/12 |

**Key patterns:**
- **Slab-based and cooler-linked** schemes consistently outperform (avg uplift 1.28x)
- **Flat margin schemes** in low-threat zones are the worst performers (avg 1.04x)
- The **top 5 schemes** generate 68% of all incremental volume from 42% of budget
- The **bottom 3** generate <3% of incremental volume from 22% of budget

Median uplift across all 23: **1.18x**. Anything below 1.10x should be reviewed for modification or termination.`,
    followUps: ["Which mechanic works best in rural GT specifically?", "What's the optimal number of schemes to run simultaneously?", "Design a new scheme for E.UP cooler defense"],
  },
  "Simulate: terminate bottom 3 and redeploy. Full impact model.": {
    agents: ["Reallocation Optimizer", "Scheme Simulator", "Volume Projector"],
    sources: ["scheme", "dms", "d365"],
    body: `**Full Reallocation Simulation: Terminate Bottom 3, Redeploy ₹8.6 Cr**

**Step 1: Terminate**
| Scheme | Remaining Budget | Freed |
|---|---|---|
| TM-Q1-08 (Dist bonus, Bkd) | ₹1.6 Cr (4 wks left) | ₹1.6 Cr |
| TM-Q1-14 (Rural margin, W.UP) | ₹3.6 Cr (7 wks left) | ₹3.2 Cr* |
| TM-Q1-19 (Consumer promo, C.UP) | ₹2.2 Cr (6 wks left) | ₹1.8 Cr* |
*Narrowed to >10% decline outlets, partial continue.

**Total freed: ₹6.6 Cr immediately + ₹2.0 Cr from ongoing savings = ₹8.6 Cr**

**Step 2: Redeploy**
| Destination | Amount | Expected Efficiency | Projected Inc. Cases |
|---|---|---|---|
| E.UP cooler defense (820 outlets) | ₹5.2 Cr | 5.8 cases/₹ | 30,160 |
| Lucknow MT visibility (180 outlets) | ₹1.4 Cr | 4.2 cases/₹ | 5,880 |
| Summer reserve (pre-positioned) | ₹2.0 Cr | held | — |
| **Total** | **₹8.6 Cr** | — | **36,040 cases/qtr** |

**vs. Current: Bottom 3 schemes generate ~3,100 incremental cases/quarter at ₹8.6 Cr.**

**Net improvement: +32,940 cases/quarter. 11.6x efficiency gain.**

This is the single highest-ROI action available this quarter.`,
    followUps: ["Generate the approval memo for this reallocation", "What's the risk if E.UP defense doesn't hold?", "Timeline to see results?"],
  },
  "Break down volume by brand across zones": {
    agents: ["Portfolio Analyzer"],
    sources: ["dms"],
    body: `**Volume by Brand x Zone: March 2026 MTD (in '000 cases)**

| Brand | C.UP | W.UP | E.UP | UK | N.Bih | S.Bih | Bkd | Total |
|---|---|---|---|---|---|---|---|---|
| **Thums Up** | 3,420 | 2,940 | 2,590 | 1,230 | 2,160 | 1,320 | 960 | 14,620 |
| **Sprite** | 2,280 | 1,960 | 1,620 | 820 | 1,440 | 880 | 640 | 9,640 |
| **Limca** | 1,710 | 1,470 | 1,210 | 610 | 1,080 | 660 | 480 | 7,220 |
| **Maaza** | 1,140 | 980 | 810 | 410 | 720 | 440 | 320 | 4,820 |
| **Kinley** | 1,990 | 1,710 | 1,420 | 720 | 1,260 | 770 | 560 | 8,430 |
| **Others** | 860 | 740 | 450 | 310 | 540 | 330 | 240 | 3,470 |
| **Total** | **11,400** | **9,800** | **8,100** | **4,100** | **7,200** | **4,400** | **3,200** | **48,200** |

**Key signal:** Limca in E.UP is declining fastest (-8.2% MoM), which is surprising given that the primary E.UP threat is Campa (which competes with Thums Up, not Limca). This suggests Lahori/flavored soda may have more distribution in E.UP than the Lucknow-focused narrative implies. Worth investigating.`,
    followUps: ["Show Limca decline by beat in E.UP", "Which brand has the highest margin contribution?", "Break this down by channel (GT vs MT)"],
  },
  "Show spend efficiency trend over last 6 months": {
    agents: ["Trend Analyzer"],
    sources: ["scheme", "dms"],
    body: `**Trade Spend Efficiency (Cases/₹) by Zone: Oct 2025 to Mar 2026**

| Zone | Oct | Nov | Dec | Jan | Feb | Mar | Trend |
|---|---|---|---|---|---|---|---|
| Uttarakhand | 5.42 | 5.51 | 5.68 | 5.74 | 5.82 | **5.91** | Improving |
| Western UP | 4.91 | 4.88 | 4.85 | 4.84 | 4.83 | **4.82** | Flat |
| Central UP | 4.62 | 4.58 | 4.54 | 4.49 | 4.45 | **4.41** | Gradual decline |
| Bundelkhand | 4.38 | 4.34 | 4.30 | 4.28 | 4.24 | **4.21** | Gradual decline |
| N. Bihar | — | 3.84 | 3.72 | 3.64 | 3.58 | **3.52** | Declining (new territory) |
| S. Bihar | — | — | 3.42 | 3.32 | 3.24 | **3.14** | Declining (new territory) |
| **Eastern UP** | **3.82** | **3.64** | **3.48** | **3.22** | **2.94** | **2.71** | **Accelerating decline** |

**The E.UP deterioration is not linear -- it's accelerating.** From Oct to Jan, efficiency dropped 0.60 (0.20/month). From Jan to Mar, it dropped 0.51 (0.26/month). The rate of decline is increasing.

Bihar's declining efficiency is expected in a new territory build-out and should stabilize by Q3. E.UP's decline is structural and competitive-driven -- it will not self-correct.`,
    followUps: ["Project E.UP efficiency for the next 3 months at current trajectory", "At what efficiency level should we trigger automatic scheme termination?", "Which zone will hit the break-even efficiency threshold first?"],
  },
};

/* ═══ BRIEF DATA ═══ */
const briefCards = [
  {
    id: "eup", sev: "critical", type: "SPEND TRAP", scope: "Eastern UP",
    hl: "Eastern UP is losing ground despite being the highest-spend zone",
    sum: "Volume declining for the third consecutive month while trade spend runs 28% over budget. 4,200 outlets stopped ordering. Every additional rupee yields diminishing returns.",
    kpis: [{ l: "Volume", v: "8.1M", d: "-4.2%", b: 1 }, { l: "Spend", v: "₹24 Cr", d: "128% of plan", b: 1 }, { l: "Efficiency", v: "2.71", d: "-21% MoM", b: 1 }, { l: "Share", v: "49.1%", d: "-7.8 pts", b: 1 }],
    ev: [{ s: "dms", t: "Secondary sales down 4.2% MoM. Third consecutive decline." }, { s: "scheme", t: "Spend/case: ₹296 — highest across all zones, 2.8x the Uttarakhand benchmark." }, { s: "d365", t: "4,200 outlets ordered in Feb but not Mar. Concentrated in 14 beats south of Gorakhpur." }, { s: "nielsen", t: "Campa WD jumped 38% → 61% in 6 months. Fastest build-out in any zone." }],
    dec: { act: "Reallocate ₹5.2 Cr from 340 lowest-RoS outlets to visibility + volume-slab schemes at 820 cooler-equipped outlets still above 5 cases/wk.", why: "The 340 outlets are economically lost to Campa's pricing. Cooler-equipped outlets still show brand preference.", imp: "Defend ~62,000 cases/month. Efficiency gain: +0.8 cases/₹.", conf: "High", time: "7 days to deploy. 3 weeks to measure." },
    trail: [{ a: "Volume Analyzer", q: "Secondary sales by beat, E.UP, 12 wks", f: "14 beats in Gorakhpur-Deoria: sustained >15% decline. Fill rate 94%. Demand-driven.", s: "dms" }, { a: "Spend Efficiency", q: "Trade spend vs volume, outlet-level", f: "Bottom decile (340): spend +42%, vol -28%. Top quartile (820): spend +8%, vol flat.", s: "scheme" }, { a: "Competitive Signal", q: "Campa WD, E.UP, 4 Nielsen cycles", f: "WD: 38 → 44 → 52 → 61%. RCPL distributor count doubled.", s: "nielsen" }, { a: "Outlet Health", q: "Ordering frequency, cooler vs non-cooler", f: "Cooler outlets: 72% at baseline. Non-cooler: 41%.", s: "d365" }, { a: "Synthesis", q: null, f: "Eastern UP is bifurcating. Concentrate on defensible cooler-equipped outlets.", s: null }],
    qs: ["What if we increase rural margin by ₹3/case in the top 200 outlets?", "Show me the 14 declining beats on a map", "Which cooler outlets are closest to flipping?"],
  },
  {
    id: "lahori", sev: "warn", type: "CATEGORY THREAT", scope: "Central UP · Lucknow",
    hl: "Lahori Zeera's third plant opens in Lucknow. Wrong scheme type deployed.",
    sum: "Limca and Sprite losing 6.8% in urban MT while zone overall grows. Current scheme is margin-based but the threat is visibility.",
    kpis: [{ l: "Limca+Sprite MT", v: "-6.8%", d: "QoQ decline", b: 1 }, { l: "Flavored Soda", v: "+48%", d: "YoY, UP urban", b: 0 }, { l: "Lahori (LKO)", v: "~12%", d: "Est. share", b: 1 }, { l: "Limca Scheme", v: "Margin", d: "No visibility", b: 1 }],
    ev: [{ s: "dms", t: "Limca + Sprite in Lucknow urban MT: -6.8% QoQ despite 11.8% zone growth." }, { s: "nielsen", t: "Flavored soda grew 48% YoY in UP urban." }, { s: "scheme", t: "Only Limca scheme: ₹4/case margin. No visibility scheme for urban MT." }],
    dec: { act: "Launch secondary placement at ₹800/outlet/month in 180 Lucknow MT outlets. Fund from rural GT margin scheme.", why: "Lahori wins through shelf presence, not margin.", imp: "Recover 30-40% of lost volume. ₹8-10 Cr revenue at risk.", conf: "Medium", time: "10 days deploy. 4 weeks measure." },
    trail: [{ a: "Category Analyzer", q: "Flavored soda vs CSD, UP urban", f: "+48% YoY. New occasions, not switching.", s: "nielsen" }, { a: "Volume Analyzer", q: "Limca+Sprite, Lucknow MT", f: "Decline in 180 outlets where Lahori has secondary placement.", s: "dms" }, { a: "Synthesis", q: null, f: "Scheme-threat mismatch. Redirect margin spend to visibility.", s: null }],
    qs: ["What would a Sprite visibility blitz cost across all Lucknow MT?", "Compare Limca velocity in GT vs MT outlets"],
  },
  {
    id: "bihar", sev: "watch", type: "GROWTH RISK", scope: "Bihar",
    hl: "Bihar growing 20%+ but 14 distributors stressed heading into summer",
    sum: "11.6M cases, 22,100 new outlets. Distributor working capital stretched. If they pull back in April, SLMG loses the summer window.",
    kpis: [{ l: "Volume", v: "11.6M", d: "+19.8%", b: 0 }, { l: "Spend", v: "₹37.8 Cr", d: "120% of plan", b: 1 }, { l: "Stressed Dist.", v: "14 / 82", d: "Inv: 8→14 days", b: 1 }, { l: "Nielsen", v: "—", d: "No baseline", b: 1 }],
    ev: [{ s: "dms", t: "N. Bihar +18.3%, S. Bihar +22.1%. 22,100 new outlets." }, { s: "d365", t: "14 distributors: inventory 14 days (target 8)." }, { s: "scheme", t: "₹37.8 Cr vs ₹31.6 Cr budget." }],
    dec: { act: "Extend payment terms 7→12 days for 14 distributors. Cap loading at 110% of trailing secondary.", why: "Summer peak 2.2-2.5x baseline. Fix WC now.", imp: "Protect 4,760 outlets. ₹28-35 Cr at risk.", conf: "High", time: "5 days for terms." },
    trail: [{ a: "Distribution Health", q: "Inventory + order freq, Bihar", f: "14 distributors stressed. Post-loading digestion.", s: "d365" }, { a: "Synthesis", q: null, f: "Fix distribution health now to protect summer peak.", s: null }],
    qs: ["List the 14 stressed distributors with outlet coverage", "Simulate: what if 5 distributors go dark in April?"],
  },
  {
    id: "waste", sev: "warn", type: "SCHEME WASTE", scope: "Cross-territory",
    hl: "₹14 Cr across 3 schemes generating near-zero incremental volume",
    sum: "Uplift below 1.05x. ₹14 Cr subsidizing baseline at ₹1,167/case vs ₹147 for top performers.",
    kpis: [{ l: "Waste", v: "3 / 23", d: "₹14.1 Cr", b: 1 }, { l: "Uplift", v: "1.04x", d: "vs 1.18 median", b: 1 }, { l: "Cost/Case", v: "₹1,167", d: "vs ₹147 top", b: 1 }, { l: "Redeploy", v: "₹8.6 Cr", d: "~85K cases", b: 0 }],
    ev: [{ s: "scheme", t: "TM-Q1-14: Uplift 1.04. TM-Q1-08: 1.02. TM-Q1-19: 1.05." }, { s: "dms", t: "Control areas show same volume trends." }],
    dec: { act: "Terminate TM-Q1-08. Narrow others. Redirect ₹8.6 Cr.", why: "8x efficiency gain available.", imp: "~85-110K inc. cases/qtr vs ~12K.", conf: "High", time: "Terminate this week." },
    trail: [{ a: "Scheme Performance", q: "All 23 schemes", f: "Bottom 3 = 22% budget, <3% incremental.", s: "scheme" }, { a: "Synthesis", q: null, f: "Clear arbitrage. ₹1,167→₹147. 8x.", s: null }],
    qs: ["Show all 23 schemes ranked by uplift with cost data", "Simulate: terminate bottom 3 and redeploy. Full impact model."],
  },
  {
    id: "uk", sev: "good", type: "BRIGHT SPOT", scope: "Uttarakhand",
    hl: "Uttarakhand: highest efficiency, under budget, share barely moved",
    sum: "Volume +14.6%, efficiency 5.91 cases/₹, Campa WD only 14%. Natural moats.",
    kpis: [{ l: "Volume", v: "4.1M", d: "+14.6%", b: 0 }, { l: "Efficiency", v: "5.91", d: "Best", b: 0 }, { l: "Budget", v: "91%", d: "₹0.6 Cr free", b: 0 }, { l: "Share", v: "63.1%", d: "-0.9 pts", b: 0 }],
    ev: [{ s: "dms", t: "Tourism ramp driving growth." }, { s: "nielsen", t: "Campa WD 14%. Terrain limits distribution." }],
    dec: { act: "No intervention. Reallocate ₹0.6 Cr to summer pool.", why: "Don't over-invest in won territory.", imp: "₹0.6 Cr freed.", conf: "High", time: "Quarterly review sufficient." },
    trail: [{ a: "Synthesis", q: null, f: "Natural fortress. Diminishing returns on spend.", s: null }],
    qs: ["Can we replicate Uttarakhand's model in any other zone?"],
  },
];

const zones = [
  { id: "eup", n: "Eastern UP", vol: 8.1, vd: -4.2, sp: 24, sP: 128, ef: 2.71, sh: "49.1%", shD: -7.8, st: "critical", out: "1.98L", oD: -2.1, trend: [9.2, 8.9, 8.6, 8.4, 8.1], note: "4,200 outlets lost. Campa WD 61%. Spend trap." },
  { id: "cup", n: "Central UP", vol: 11.4, vd: 11.8, sp: 28, sP: 97, ef: 4.41, sh: "61.2%", shD: -1.8, st: "watch", out: "2.24L", oD: 2.4, trend: [9.8, 10.1, 10.4, 10.8, 11.4], note: "Lahori growing in Lucknow urban MT." },
  { id: "wup", n: "Western UP", vol: 9.8, vd: 7.2, sp: 16.2, sP: 98, ef: 4.82, sh: "58.4%", shD: -2.1, st: "good", out: "1.86L", oD: 1.2, trend: [8.8, 9.0, 9.2, 9.5, 9.8], note: "Stable. Cooler advantage intact." },
  { id: "nbh", n: "N. Bihar", vol: 7.2, vd: 18.3, sp: 19, sP: 122, ef: 3.52, sh: "—", shD: null, st: "warn", out: "1.12L", oD: 8.8, trend: [4.8, 5.4, 6.0, 6.5, 7.2], note: "Strong growth. 8 distributors stressed." },
  { id: "sbh", n: "S. Bihar", vol: 4.4, vd: 22.1, sp: 18.8, sP: 118, ef: 3.14, sh: "—", shD: null, st: "warn", out: "0.68L", oD: 12.4, trend: [2.8, 3.2, 3.6, 4.0, 4.4], note: "Buxar plant ramp. Highest outlet growth." },
  { id: "uk", n: "Uttarakhand", vol: 4.1, vd: 14.6, sp: 6.2, sP: 91, ef: 5.91, sh: "63.1%", shD: -0.9, st: "good", out: "0.78L", oD: 4.2, trend: [3.2, 3.4, 3.6, 3.8, 4.1], note: "Best efficiency. Natural moat." },
  { id: "bkd", n: "Bundelkhand", vol: 3.2, vd: 5.1, sp: 5.8, sP: 104, ef: 4.21, sh: "54.8%", shD: -3.2, st: "watch", out: "0.62L", oD: -0.4, trend: [2.9, 3.0, 3.0, 3.1, 3.2], note: "Campa appearing in district HQs." },
];

const shareTrend = [{ q: "Q1'25", ck: 59.8, ca: 7.1, la: 3.2, pe: 19.2 }, { q: "Q2'25", ck: 58.9, ca: 8.6, la: 4.1, pe: 18.8 }, { q: "Q3'25", ck: 57.4, ca: 10.2, la: 5.4, pe: 18.4 }, { q: "Q4'25", ck: 56.8, ca: 11.8, la: 6.1, pe: 18.2 }, { q: "Jan'26", ck: 56.2, ca: 12.4, la: 6.8, pe: 18.1 }];
const topS = [{ n: "Bihar outlet activation slab", u: 1.42, s: 8.2, z: "S. Bihar" }, { n: "Uttarakhand tourism promo", u: 1.35, s: 3.1, z: "Uttarakhand" }, { n: "Thums Up cooler bonus", u: 1.28, s: 7.8, z: "Central UP" }];
const btmS = [{ n: "Rural kirana margin", u: 1.04, s: 6.2, z: "Western UP" }, { n: "Distributor vol bonus", u: 1.02, s: 3.8, z: "Bundelkhand" }, { n: "Consumer promo rural", u: 1.05, s: 4.1, z: "Central UP" }];

/* ══════════ PRIMITIVES ══════════ */
const sC = s => ({ good: C.green, watch: C.blue, warn: C.orange, critical: C.red }[s] || C.textLight);
const sB = s => ({ good: C.greenPale, watch: C.bluePale, warn: C.orangePale, critical: C.redPale }[s] || C.cream);
const sL = s => ({ good: "ON TRACK", watch: "WATCH", warn: "ATTENTION", critical: "CRITICAL" }[s] || "");
const Tag = ({ children, color, bg }) => <span style={{ display: "inline-flex", padding: "3px 10px", borderRadius: 5, fontSize: 9.5, fontWeight: 700, fontFamily: mono, color, background: bg, letterSpacing: 0.5 }}>{children}</span>;
const SrcBadge = ({ id }) => { const s = sources[id]; if (!s) return null; return <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 8px", borderRadius: 4, background: s.c === C.green ? C.greenPale : C.orangePale, fontSize: 9, fontFamily: mono, flexShrink: 0 }}><span style={{ width: 4, height: 4, borderRadius: "50%", background: s.c }} /><span style={{ color: C.textMid }}>{s.l}</span></span>; };
const Spark = ({ data, color, w = 72, h = 24 }) => { const mn2 = Math.min(...data), mx = Math.max(...data), r = mx - mn2 || 1; const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - 2 - ((v - mn2) / r) * (h - 4)}`).join(" "); return <svg width={w} height={h} style={{ display: "block" }}><polyline points={pts} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" /><circle cx={w} cy={h - 2 - ((data[data.length - 1] - mn2) / r) * (h - 4)} r={2.5} fill={color} /></svg>; };
const Takeaway = ({ color = C.orange, bg = C.orangePale, children }) => <div style={{ padding: "12px 16px", background: bg, borderRadius: 10, borderLeft: `3px solid ${color}`, marginTop: 14 }}><div style={{ fontSize: 13, color: C.text, lineHeight: 1.7 }}>{children}</div></div>;
const SectionHead = ({ title, sub, right }) => <div style={{ paddingTop: 40, marginBottom: 20 }}><div style={{ width: 32, height: 2, background: C.green, borderRadius: 1, marginBottom: 14, opacity: 0.4 }} /><div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}><div><h2 style={{ fontFamily: serif, fontSize: 20, fontWeight: 700, color: C.text, margin: 0 }}>{title}</h2>{sub && <div style={{ fontSize: 12, color: C.textLight, marginTop: 4 }}>{sub}</div>}</div>{right}</div></div>;

/* ══ CONVERSATION PANEL ══ */
const ConvPanel = ({ messages, onClose, onAsk }) => {
  const endRef = useRef(null);
  const [input, setInput] = useState("");
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const renderMd = (text) => {
    const lines = text.split("\n");
    const result = [];
    let i = 0;
    while (i < lines.length) {
      const line = lines[i];
      // Detect table: starts with | and next line or prev line is separator
      if (line.startsWith("|") && line.includes("|")) {
        // Collect all table lines
        const tableLines = [];
        let ti = i;
        while (ti < lines.length && lines[ti].startsWith("|")) { tableLines.push(lines[ti]); ti++; }
        // Parse: first row = header, skip separator, rest = body
        const parseRow = (r) => r.split("|").filter(c => c.trim()).map(c => c.trim().replace(/\*\*/g, ""));
        const hdr = parseRow(tableLines[0]);
        const bodyRows = tableLines.filter((r, ri) => ri > 0 && !r.match(/^\|[\s-:|]+\|?$/)).map(parseRow);
        result.push(
          <div key={`t${i}`} style={{ margin: "10px 0", borderRadius: 8, border: `1px solid ${C.borderLight}`, overflow: "hidden", fontSize: 11.5 }}>
            <div style={{ display: "flex", background: C.cream, borderBottom: `1px solid ${C.borderLight}` }}>
              {hdr.map((h, hi) => <div key={hi} style={{ flex: hi === 0 ? 1.8 : 1, padding: "7px 10px", fontWeight: 600, color: C.text, fontSize: 11, fontFamily: font }}>{h}</div>)}
            </div>
            {bodyRows.map((row, ri) => (
              <div key={ri} style={{ display: "flex", borderBottom: ri < bodyRows.length - 1 ? `1px solid ${C.borderLight}` : "none", background: ri % 2 === 0 ? C.card : C.page }}>
                {row.map((cell, ci) => <div key={ci} style={{ flex: ci === 0 ? 1.8 : 1, padding: "6px 10px", color: C.textMid, fontFamily: mono, fontSize: 11 }}>{cell}</div>)}
              </div>
            ))}
          </div>
        );
        i = ti;
        continue;
      }
      if (line.startsWith("**") && line.endsWith("**")) { result.push(<div key={i} style={{ fontSize: 13.5, fontWeight: 600, color: C.text, marginTop: 12, marginBottom: 4 }}>{line.replace(/\*\*/g, "")}</div>); }
      else if (line.startsWith("- **")) { const m = line.match(/^- \*\*(.+?)\*\*(.*)/); if (m) result.push(<div key={i} style={{ fontSize: 12.5, color: C.textMid, lineHeight: 1.6, paddingLeft: 12, marginBottom: 2 }}><strong style={{ color: C.text }}>{m[1]}</strong>{m[2]}</div>); }
      else if (line.startsWith("- ")) { result.push(<div key={i} style={{ fontSize: 12.5, color: C.textMid, lineHeight: 1.6, paddingLeft: 12, marginBottom: 2 }}>{line.slice(2).replace(/\*\*(.+?)\*\*/g, (_, t) => t)}</div>); }
      else if (line.startsWith("*") && !line.startsWith("**")) { result.push(<div key={i} style={{ fontSize: 11.5, color: C.textLight, fontStyle: "italic", lineHeight: 1.6 }}>{line.replace(/\*/g, "")}</div>); }
      else if (line.trim() === "") { result.push(<div key={i} style={{ height: 8 }} />); }
      else { result.push(<div key={i} style={{ fontSize: 13, color: C.textMid, lineHeight: 1.7 }}>{line.replace(/\*\*(.+?)\*\*/g, (_, t) => t)}</div>); }
      i++;
    }
    return result;
  };

  return (
    <div style={{ position: "fixed", top: 0, right: 0, width: 600, height: "100vh", background: C.card, borderLeft: `1px solid ${C.border}`, boxShadow: "-8px 0 30px rgba(0,0,0,0.12)", display: "flex", flexDirection: "column", zIndex: 1000, fontFamily: font, animation: "slideIn 0.25s ease-out" }}>
      <style>{`@keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>
      {/* Header */}
      <div style={{ padding: "14px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
        <div style={{ width: 24, height: 24, borderRadius: 6, background: C.green, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontSize: 12, fontWeight: 800 }}>Q</span></div>
        <span style={{ fontFamily: serif, fontSize: 15, fontWeight: 600, color: C.text }}>Questt Agent</span>
        <span style={{ fontSize: 11, color: C.textLight }}>Trade Spend Intelligence</span>
        <button onClick={onClose} style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", fontSize: 18, color: C.textLight, padding: 4 }}>×</button>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px" }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: 16 }}>
            {msg.role === "user" ? (
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <div style={{ background: C.green, color: "#fff", padding: "10px 16px", borderRadius: "14px 14px 4px 14px", maxWidth: "85%", fontSize: 13, lineHeight: 1.5 }}>{msg.text}</div>
              </div>
            ) : msg.role === "loading" ? (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                  <div style={{ width: 18, height: 18, borderRadius: 5, background: C.green, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontSize: 9, fontWeight: 800 }}>Q</span></div>
                  <span style={{ fontSize: 11, fontWeight: 600, color: C.green }}>Questt</span>
                  <span style={{ fontSize: 10, color: C.textLight, fontFamily: mono }}>Analyzing...</span>
                </div>
                <div style={{ background: C.page, border: `1px solid ${C.border}`, borderRadius: 12, padding: "16px 20px", display: "flex", gap: 6, alignItems: "center" }}>
                  <div style={{ display: "flex", gap: 4 }}>
                    {[0, 1, 2].map(d => (
                      <div key={d} style={{ width: 7, height: 7, borderRadius: "50%", background: C.green, opacity: 0.4, animation: `pulse 1.2s ease-in-out ${d * 0.2}s infinite` }} />
                    ))}
                  </div>
                  <span style={{ fontSize: 12, color: C.textLight, marginLeft: 8 }}>Running agents across D365, DMS, and scheme data...</span>
                </div>
                <style>{`@keyframes pulse { 0%, 100% { opacity: 0.2; transform: scale(0.8); } 50% { opacity: 0.7; transform: scale(1.1); } }`}</style>
              </div>
            ) : (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                  <div style={{ width: 18, height: 18, borderRadius: 5, background: C.green, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontSize: 9, fontWeight: 800 }}>Q</span></div>
                  <span style={{ fontSize: 11, fontWeight: 600, color: C.green }}>Questt</span>
                  {msg.agents && <span style={{ fontSize: 10, color: C.textLight, fontFamily: mono }}>{msg.agents.join(" → ")}</span>}
                </div>
                {msg.sources && (
                  <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>{msg.sources.map((s, j) => <SrcBadge key={j} id={s} />)}</div>
                )}
                <div style={{ background: C.page, border: `1px solid ${C.border}`, borderRadius: 12, padding: "14px 16px", overflow: "hidden" }}>
                  {renderMd(msg.text)}
                </div>
                {msg.followUps && (
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 10 }}>
                    {msg.followUps.map((f, j) => (
                      <button key={j} onClick={() => onAsk(f)} style={{ padding: "6px 12px", borderRadius: 20, border: `1px solid ${C.border}`, background: C.card, fontSize: 11.5, color: C.textMid, cursor: "pointer", fontFamily: font, textAlign: "left", transition: "all 0.15s" }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = C.green; e.currentTarget.style.color = C.green; e.currentTarget.style.background = C.greenPale; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textMid; e.currentTarget.style.background = C.card; }}>
                        {f}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div style={{ padding: "12px 20px", borderTop: `1px solid ${C.border}`, flexShrink: 0, background: C.page }}>
        <div style={{ display: "flex", gap: 8 }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && input.trim()) { onAsk(input.trim()); setInput(""); } }}
            placeholder="Ask about trade spend, simulations, zone performance..."
            style={{ flex: 1, padding: "10px 14px", borderRadius: 10, border: `1px solid ${C.border}`, fontSize: 13, fontFamily: font, color: C.text, background: C.card, outline: "none" }} />
          <button onClick={() => { if (input.trim()) { onAsk(input.trim()); setInput(""); } }}
            style={{ padding: "10px 16px", borderRadius: 10, border: "none", background: C.green, color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: font }}>Ask</button>
        </div>
      </div>
    </div>
  );
};

/* ══ ASKBAR (wired) ══ */
const AskBar = ({ prompts, onAsk }) => (
  <div style={{ marginTop: 18, padding: "14px 18px", background: C.page, borderRadius: 12, border: `1px solid ${C.border}` }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
      <div style={{ width: 20, height: 20, borderRadius: 6, background: C.green, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontSize: 10, fontWeight: 800 }}>Q</span></div>
      <span style={{ fontSize: 11.5, fontWeight: 600, color: C.green }}>Ask Questt</span>
      <span style={{ fontSize: 11, color: C.textLight }}>Dig deeper or run simulations</span>
    </div>
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
      {prompts.map((p, i) => (
        <button key={i} onClick={() => onAsk(p)} style={{ padding: "7px 14px", borderRadius: 20, border: `1px solid ${C.border}`, background: C.card, fontSize: 12, color: C.textMid, cursor: "pointer", fontFamily: font, lineHeight: 1.3, textAlign: "left", transition: "all 0.15s" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = C.green; e.currentTarget.style.color = C.green; e.currentTarget.style.background = C.greenPale; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textMid; e.currentTarget.style.background = C.card; }}>
          {p}
        </button>
      ))}
    </div>
  </div>
);

/* ══ TRAIL ══ */
const Trail = ({ trail }) => <div style={{ padding: "20px 24px", background: C.page, borderTop: `1px solid ${C.border}` }}><div style={{ fontFamily: mono, fontSize: 9, letterSpacing: 1.2, color: C.textLight, marginBottom: 16 }}>AGENT REASONING CHAIN</div>{trail.map((st, i) => <div key={i} style={{ display: "flex", gap: 14 }}><div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 26, flexShrink: 0 }}><div style={{ width: 26, height: 26, borderRadius: "50%", background: st.a === "Synthesis" ? C.green : C.card, border: `2px solid ${st.a === "Synthesis" ? C.green : C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: st.a === "Synthesis" ? "#fff" : C.textLight }}>{st.a === "Synthesis" ? "✦" : i + 1}</div>{i < trail.length - 1 && <div style={{ width: 1.5, flex: 1, minHeight: 14, background: C.borderLight }} />}</div><div style={{ flex: 1, paddingBottom: 14 }}><div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}><span style={{ fontSize: 12, fontWeight: 600, color: st.a === "Synthesis" ? C.green : C.text }}>{st.a}</span>{st.s && <SrcBadge id={st.s} />}</div>{st.q && <div style={{ fontSize: 11, color: C.textLight, fontFamily: mono, marginBottom: 6, lineHeight: 1.5 }}>→ {st.q}</div>}<div style={{ fontSize: 13, lineHeight: 1.7, ...(st.a === "Synthesis" ? { color: C.text, fontWeight: 500, padding: "12px 16px", background: C.greenPale, borderRadius: 8, borderLeft: `3px solid ${C.green}` } : { color: C.textMid }) }}>{st.f}</div></div></div>)}</div>;

/* ══ INTEL CARD ══ */
const IntelCard = ({ card, defaultOpen, onAsk }) => {
  const [exp, setExp] = useState(defaultOpen);
  const [trail, setTrail] = useState(false);
  const color = sC(card.sev), bg = sB(card.sev);
  return (
    <div style={{ background: C.card, borderRadius: 14, border: `1px solid ${exp ? `${color}50` : C.border}`, marginBottom: 16, overflow: "hidden", boxShadow: exp ? `0 4px 20px ${color}10` : "0 1px 3px rgba(0,0,0,0.04)", transition: "all 0.3s" }}>
      <div style={{ padding: "20px 24px", cursor: "pointer" }} onClick={() => { setExp(!exp); if (exp) setTrail(false); }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <Tag color={color} bg={bg}>{sL(card.sev)}</Tag>
          <span style={{ fontFamily: mono, fontSize: 9.5, letterSpacing: 0.6, color: C.textLight }}>{card.type}</span><span style={{ width: 3, height: 3, borderRadius: "50%", background: C.borderLight }} /><span style={{ fontSize: 12, color: C.textMid }}>{card.scope}</span>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
            {exp && <button onClick={e => { e.stopPropagation(); setTrail(!trail); }} style={{ background: trail ? C.greenPale : C.cream, border: `1px solid ${trail ? C.green : C.border}`, borderRadius: 6, padding: "4px 12px", fontSize: 10.5, color: trail ? C.green : C.textMid, cursor: "pointer", fontFamily: mono, display: "flex", alignItems: "center", gap: 5, transition: "all 0.15s", fontWeight: trail ? 600 : 400 }}><span style={{ fontSize: 7 }}>◆</span>{card.trail.length} agents</button>}
            <div style={{ width: 24, height: 24, borderRadius: 6, background: C.cream, display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 0.2s", transform: exp ? "rotate(180deg)" : "none" }}><span style={{ fontSize: 10, color: C.textLight }}>▾</span></div>
          </div>
        </div>
        <div style={{ fontFamily: serif, fontSize: 17, fontWeight: 600, color: C.text, lineHeight: 1.4, marginBottom: 8 }}>{card.hl}</div>
        <div style={{ fontSize: 13.5, color: C.textMid, lineHeight: 1.7, marginBottom: 16 }}>{card.sum}</div>
        <div style={{ display: "flex", gap: 10 }}>{card.kpis.map((k, i) => <div key={i} style={{ flex: 1, padding: "10px 14px", borderRadius: 10, background: k.b ? bg : C.greenPale, border: `1px solid ${(k.b ? color : C.green)}15` }}><div style={{ fontSize: 9.5, fontFamily: mono, color: C.textLight, letterSpacing: 0.4, marginBottom: 3 }}>{k.l}</div><div style={{ fontSize: 18, fontWeight: 700, color: C.text, letterSpacing: -0.3 }}>{k.v}</div><div style={{ fontSize: 10.5, fontFamily: mono, fontWeight: 600, color: k.b ? color : C.green, marginTop: 2 }}>{k.d}</div></div>)}</div>
      </div>
      {exp && <div style={{ padding: "0 24px 22px" }}>
        <div style={{ marginBottom: 18 }}><div style={{ fontFamily: mono, fontSize: 9, letterSpacing: 1.2, color: C.textLight, marginBottom: 10 }}>EVIDENCE</div>{card.ev.map((e, i) => <div key={i} style={{ display: "flex", gap: 10, marginBottom: 7, alignItems: "flex-start" }}><SrcBadge id={e.s} /><span style={{ fontSize: 13, color: C.text, lineHeight: 1.65, flex: 1 }}>{e.t}</span></div>)}</div>
        <div style={{ background: C.greenSoft, borderRadius: 12, padding: "18px 20px", border: `1px solid ${C.green}18` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}><div style={{ width: 22, height: 22, borderRadius: 6, background: C.green, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>→</span></div><span style={{ fontFamily: mono, fontSize: 10, letterSpacing: 0.8, color: C.green, fontWeight: 700 }}>SUGGESTED DECISION</span></div>
          <div style={{ fontSize: 14, color: C.text, lineHeight: 1.7, fontWeight: 500, marginBottom: 10 }}>{card.dec.act}</div>
          <div style={{ fontSize: 13, color: C.textMid, lineHeight: 1.7, marginBottom: 16, paddingLeft: 16, borderLeft: `2px solid ${C.green}30` }}><span style={{ fontWeight: 600, color: C.text }}>Why: </span>{card.dec.why}</div>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ flex: 2, padding: "12px 16px", background: C.greenPale, borderRadius: 10 }}><div style={{ fontSize: 9, fontFamily: mono, color: C.green, letterSpacing: 0.5, marginBottom: 4, fontWeight: 600 }}>EXPECTED IMPACT</div><div style={{ fontSize: 13, color: C.text, lineHeight: 1.6 }}>{card.dec.imp}</div></div>
            <div style={{ minWidth: 90, padding: "12px 16px", background: C.card, borderRadius: 10, border: `1px solid ${C.border}`, textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center" }}><div style={{ fontSize: 9, fontFamily: mono, color: C.textLight, letterSpacing: 0.5, marginBottom: 4 }}>CONFIDENCE</div><div style={{ fontSize: 16, fontWeight: 700, color: card.dec.conf === "High" ? C.green : C.orange }}>{card.dec.conf}</div></div>
            <div style={{ flex: 1, padding: "12px 16px", background: C.card, borderRadius: 10, border: `1px solid ${C.border}` }}><div style={{ fontSize: 9, fontFamily: mono, color: C.textLight, letterSpacing: 0.5, marginBottom: 4 }}>TIMEFRAME</div><div style={{ fontSize: 13, color: C.text, lineHeight: 1.5 }}>{card.dec.time}</div></div>
          </div>
        </div>
        {card.qs && <AskBar prompts={card.qs} onAsk={onAsk} />}
      </div>}
      {exp && trail && <Trail trail={card.trail} />}
    </div>
  );
};

/* ══ CHARTS ══ */
const ShareChart = ({ w = 460, h = 180 }) => { const p = { t: 14, r: 16, b: 28, l: 40 }; const pw = w - p.l - p.r, ph = h - p.t - p.b; const ser = [{ k: "ck", l: "Coca-Cola", c: C.green }, { k: "ca", l: "Campa", c: C.red }, { k: "la", l: "Lahori+", c: C.orange }, { k: "pe", l: "PepsiCo", c: C.blue }]; const toY = v => p.t + ph - (v / 65) * ph; const toX = i => p.l + (i / 4) * pw; return <div><svg width={w} height={h} style={{ display: "block" }}>{[0, 20, 40, 60].map(v => <g key={v}><line x1={p.l} y1={toY(v)} x2={w - p.r} y2={toY(v)} stroke={C.borderLight} strokeWidth={0.5} strokeDasharray="3,4" /><text x={p.l - 7} y={toY(v) + 3} textAnchor="end" fill={C.textLight} fontSize={9} fontFamily={mono}>{v}%</text></g>)}{shareTrend.map((d, i) => <text key={i} x={toX(i)} y={h - 5} textAnchor="middle" fill={C.textLight} fontSize={9} fontFamily={mono}>{d.q}</text>)}{ser.map(s => <g key={s.k}><polyline points={shareTrend.map((d, i) => `${toX(i)},${toY(d[s.k])}`).join(" ")} fill="none" stroke={s.c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" opacity={0.8} /><circle cx={toX(4)} cy={toY(shareTrend[4][s.k])} r={4} fill={C.card} stroke={s.c} strokeWidth={2} /></g>)}</svg><div style={{ display: "flex", gap: 18, marginTop: 8 }}>{ser.map(s => <div key={s.k} style={{ display: "flex", alignItems: "center", gap: 5 }}><div style={{ width: 10, height: 3, borderRadius: 2, background: s.c }} /><span style={{ fontSize: 11.5, color: C.textMid }}>{s.l}</span><span style={{ fontSize: 11.5, fontFamily: mono, fontWeight: 700, color: s.c }}>{shareTrend[4][s.k]}%</span></div>)}</div></div>; };

const EffQuad = ({ w = 520, h = 380 }) => { const p = { t: 32, r: 32, b: 42, l: 52 }; const pw = w - p.l - p.r, ph = h - p.t - p.b; const toX = v => p.l + ((v + 15) / 47) * pw; const toY = v => p.t + ph - ((v + 8) / 34) * ph; const mx = toX(0), my = toY(0); return <svg width={w} height={h} style={{ display: "block" }}><rect x={p.l} y={p.t} width={mx - p.l} height={my - p.t} fill={C.green} opacity={0.04} rx={8} /><rect x={mx} y={p.t} width={w - p.r - mx} height={my - p.t} fill={C.orange} opacity={0.05} rx={8} /><rect x={p.l} y={my} width={mx - p.l} height={h - p.b - my} fill={C.blue} opacity={0.04} rx={8} /><rect x={mx} y={my} width={w - p.r - mx} height={h - p.b - my} fill={C.red} opacity={0.05} rx={8} /><text x={p.l + 10} y={p.t + 18} fontSize={9} fontFamily={mono} fill={C.green} fontWeight={600} opacity={0.7}>EFFICIENT GROWTH</text><text x={w - p.r - 10} y={p.t + 18} fontSize={9} fontFamily={mono} fill={C.orange} fontWeight={600} opacity={0.7} textAnchor="end">BUYING GROWTH</text><text x={p.l + 10} y={h - p.b - 10} fontSize={9} fontFamily={mono} fill={C.blue} fontWeight={600} opacity={0.7}>UNDER-INVESTED</text><text x={w - p.r - 10} y={h - p.b - 10} fontSize={9} fontFamily={mono} fill={C.red} fontWeight={600} opacity={0.7} textAnchor="end">SPEND TRAP</text><line x1={p.l} y1={my} x2={w - p.r} y2={my} stroke={C.borderLight} strokeWidth={1} /><line x1={mx} y1={p.t} x2={mx} y2={h - p.b} stroke={C.borderLight} strokeWidth={1} /><text x={w / 2} y={h - 10} textAnchor="middle" fontSize={10} fontFamily={font} fill={C.textLight}>Spend vs. Budget →</text><text x={14} y={h / 2} textAnchor="middle" fontSize={10} fontFamily={font} fill={C.textLight} transform={`rotate(-90, 14, ${h / 2})`}>Volume Growth →</text>{zones.map(z => { const cx = toX(z.sP - 100), cy = toY(z.vd), c = sC(z.st); return <g key={z.id}><circle cx={cx} cy={cy} r={16} fill={c} opacity={0.06} /><circle cx={cx} cy={cy} r={16} fill="none" stroke={c} strokeWidth={1.5} opacity={0.4} /><circle cx={cx} cy={cy} r={3.5} fill={c} /><text x={cx} y={cy - 20} textAnchor="middle" fontSize={11} fontFamily={font} fontWeight={600} fill={C.text}>{z.n}</text></g>; })}</svg>; };

/* ══ SHELL NOTIFICATIONS ══ */
const shellNotifications = [
  { id: 1, t: "E.UP efficiency dropped below 2.7 — lowest in 6 months", ts: "2h ago", ur: true },
  { id: 2, t: "Bihar distributor Sharma Beverages inventory at 16 days", ts: "4h ago", ur: true },
  { id: 3, t: "Scheme TM-Q1-08 uplift fell to 1.02x — termination recommended", ts: "Yesterday", ur: false },
];

/* ══ MAIN ══ */
export default function SLMGTradeCommand() {
  const [convOpen, setConvOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [shellSearch, setShellSearch] = useState(false);
  const [shellNotifs, setShellNotifs] = useState(false);
  const [shellProfile, setShellProfile] = useState(false);

  const handleAsk = (q) => {
    const userMsg = { role: "user", text: q };
    setMessages(prev => [...prev, userMsg, { role: "loading" }]);
    setConvOpen(true);
    setTimeout(() => {
      const resp = convResponses[q];
      const agentMsg = resp
        ? { role: "agent", text: resp.body, agents: resp.agents, sources: resp.sources, followUps: resp.followUps }
        : { role: "agent", text: `Analyzing: "${q}"\n\nRunning this query across SLMG's D365, DMS, and scheme management data. In a live deployment, this triggers the relevant agents to fetch and synthesize.\n\nTry one of the suggested prompts to see a full simulation.`, agents: ["Query Router"], sources: ["dms"], followUps: [] };
      setMessages(prev => [...prev.filter(m => m.role !== "loading"), agentMsg]);
    }, 1800);
  };

  return (
    <div onClick={() => { setShellProfile(false); setShellNotifs(false); }} className="overflow-auto" style={{ height: "100vh", background: C.page, fontFamily: font, color: C.text, display: "flex" }}>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=DM+Serif+Display:ital@0;1&family=Source+Serif+4:wght@300;400;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet"/>
      {/* SIDEBAR */}
      <div style={{ width: 60, minHeight: "100vh", background: C.green, display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 100 }}>
        <div style={{ marginTop: 20, width: 30, height: 30, borderRadius: 6, background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Menu size={14} color="rgba(255,255,255,0.4)" strokeWidth={1.5} /></div>
      </div>

      {/* MAIN AREA */}
      <div style={{ flex: 1, marginLeft: 60, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        {/* TOP BAR */}
        <div style={{ background: C.card, borderBottom: `1px solid ${C.border}`, padding: "8px 36px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
  <div style={{display:"flex",alignItems:"center",gap:14}}>
          <div style={{display:"flex",alignItems:"baseline"}}><span style={{fontSize:15,fontWeight:500,color:C.green,letterSpacing:"-0.01em",fontFamily:font}}>questt</span><span style={{color:C.sage,fontSize:17,fontWeight:700,lineHeight:1}}>.</span></div>
        </div>
            <div style={{ width: 1, height: 18, background: C.border }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: C.textMid, letterSpacing: "0.02em" }}>SLMG Beverages</span>
            <div style={{ width: 1, height: 18, background: C.border }} />
            <span style={{ fontSize: 12, fontWeight: 500, color: C.textLight, letterSpacing: "0.02em" }}>Trade Spend</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", background: shellSearch ? C.card : C.page, border: `1px solid ${shellSearch ? C.green : C.border}`, borderRadius: 100, transition: "all 0.2s", width: shellSearch ? 240 : 160 }}>
              <Search size={13} color={C.textLight} strokeWidth={1.5} />
              <input placeholder="Search zones, schemes..." onFocus={() => setShellSearch(true)} onBlur={() => setShellSearch(false)} style={{ border: "none", outline: "none", background: "transparent", fontSize: 11, fontFamily: font, color: C.text, width: "100%" }} />
              {!shellSearch && <span style={{ fontSize: 9, color: C.textLight, background: C.card, padding: "1px 5px", borderRadius: 3, border: `1px solid ${C.borderLight}`, fontFamily: mono, whiteSpace: "nowrap" }}>/</span>}
            </div>
            <div style={{ width: 1, height: 20, background: C.borderLight, margin: "0 2px" }} />
            <div style={{ position: "relative" }}>
              <button onClick={e => { e.stopPropagation(); setShellNotifs(!shellNotifs); setShellProfile(false); }} style={{ padding: 6, background: shellNotifs ? C.page : "transparent", border: "none", borderRadius: 6, cursor: "pointer", position: "relative", display: "flex", alignItems: "center" }}><Bell size={16} strokeWidth={1.5} color={C.textMid} /><div style={{ position: "absolute", top: 4, right: 4, width: 6, height: 6, borderRadius: 3, background: C.red, border: `1.5px solid ${C.card}` }} /></button>
              {shellNotifs && <div onClick={e => e.stopPropagation()} style={{ position: "absolute", top: "100%", right: 0, marginTop: 6, width: 300, background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, boxShadow: "0 12px 40px rgba(0,0,0,0.08)", overflow: "hidden", zIndex: 200 }}>
                <div style={{ padding: "12px 16px", borderBottom: `1px solid ${C.borderLight}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: 12, fontWeight: 600, color: C.text }}>Notifications</span><span style={{ fontSize: 10, color: C.green, cursor: "pointer", fontWeight: 500 }}>Mark all read</span></div>
                {shellNotifications.map(n => <div key={n.id} style={{ padding: "10px 16px", borderBottom: `1px solid ${C.borderLight}`, display: "flex", gap: 8, alignItems: "flex-start" }}>{n.ur && <div style={{ width: 5, height: 5, borderRadius: 3, background: C.green, marginTop: 5, flexShrink: 0 }} />}<div><div style={{ fontSize: 11, color: C.textMid, lineHeight: 1.5 }}>{n.t}</div><div style={{ fontSize: 9, color: C.textLight, marginTop: 2, fontFamily: mono }}>{n.ts}</div></div></div>)}
              </div>}
            </div>
            <div style={{ position: "relative" }}>
              <button onClick={e => { e.stopPropagation(); setShellProfile(!shellProfile); setShellNotifs(false); }} style={{ display: "flex", alignItems: "center", gap: 6, padding: "3px 6px 3px 3px", background: shellProfile ? C.page : "transparent", border: "none", borderRadius: 6, cursor: "pointer" }}><div style={{ width: 28, height: 28, borderRadius: 14, background: C.green, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 600, color: "#fff" }}>PL</div><ChevronDown size={12} color={C.textLight} /></button>
              {shellProfile && <div onClick={e => e.stopPropagation()} style={{ position: "absolute", top: "100%", right: 0, marginTop: 6, width: 200, background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, boxShadow: "0 12px 40px rgba(0,0,0,0.08)", overflow: "hidden", zIndex: 200 }}>
                <div style={{ padding: "12px 16px", borderBottom: `1px solid ${C.borderLight}` }}><div style={{ fontSize: 12, fontWeight: 600, color: C.text }}>Paritosh Ladhani</div><div style={{ fontSize: 10, color: C.textLight, marginTop: 1 }}>paritosh@slmg.co.in</div></div>
                <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", width: "100%", background: "transparent", border: "none", cursor: "pointer", fontSize: 11, color: C.textMid, textAlign: "left" }}><User size={13} color={C.textLight} />My Profile</button>
                <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", width: "100%", background: "transparent", border: "none", cursor: "pointer", fontSize: 11, color: C.textMid, textAlign: "left" }}><Settings size={13} color={C.textLight} />Preferences</button>
                <div style={{ borderTop: `1px solid ${C.borderLight}` }}><button style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", width: "100%", background: "transparent", border: "none", cursor: "pointer", fontSize: 11, color: C.red, textAlign: "left" }}><LogOut size={13} color={C.red} />Log Out</button></div>
              </div>}
            </div>
          </div>
        </div>

        {/* PAGE CONTENT */}
        <div style={{ flex: 1 }}>
          {/* PAGE TITLE BAR */}
          <div style={{ background: C.card, borderBottom: `1px solid ${C.border}`, padding: "14px 36px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}><span style={{ fontFamily: serif, fontSize: 20, fontWeight: 600, color: C.text }}>Trade Spend Command Center</span><span style={{ width: 1, height: 18, background: C.border }} /><span style={{ fontSize: 12, color: C.textLight }}>UP · Uttarakhand · Bihar</span></div>
            <span style={{ fontFamily: mono, fontSize: 11, color: C.textLight }}>12 Mar 2026 · 11:42 AM</span>
          </div>

      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "28px 36px" }}>
        {/* MORNING BRIEF */}
        <div style={{ marginBottom: 8 }}><div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 18 }}><h2 style={{ fontFamily: serif, fontSize: 22, fontWeight: 700, color: C.text, margin: 0 }}>Morning Brief</h2></div>
          {briefCards.map((c, i) => <IntelCard key={c.id} card={c} defaultOpen={i === 0} onAsk={handleAsk} />)}
        </div>

        {/* VOLUME & DISTRIBUTION */}
        <SectionHead title="Volume & Distribution" sub="March 2026 MTD" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18 }}>
          <div style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, padding: "20px 22px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}><div><div style={{ fontSize: 10, fontFamily: mono, color: C.textLight, letterSpacing: 0.6 }}>TOTAL SECONDARY VOLUME</div><div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 6 }}><span style={{ fontSize: 32, fontWeight: 700, color: C.text, letterSpacing: -1 }}>48.2M</span><span style={{ fontSize: 13, color: C.textLight }}>cases</span></div><div style={{ fontSize: 12, fontFamily: mono, fontWeight: 600, color: C.green, marginTop: 4 }}>+9.3% vs Feb 2026</div></div>
              <div style={{ width: 200 }}>{zones.slice(0, 5).map(z => <div key={z.id} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}><span style={{ fontSize: 10, color: C.textLight, width: 55, textAlign: "right" }}>{z.n.replace(" UP", "").replace("N. ", "N.")}</span><div style={{ flex: 1, height: 6, borderRadius: 3, background: C.cream, overflow: "hidden" }}><div style={{ width: `${(z.vol / 12) * 100}%`, height: "100%", borderRadius: 3, background: sC(z.st), opacity: 0.6 }} /></div><span style={{ fontSize: 10, fontFamily: mono, color: C.textMid, width: 32, textAlign: "right" }}>{z.vol}M</span></div>)}</div>
            </div>
          </div>
          <div style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, padding: "20px 22px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}><div><div style={{ fontSize: 10, fontFamily: mono, color: C.textLight, letterSpacing: 0.6 }}>OUTLET HEALTH</div><div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 6 }}><span style={{ fontSize: 32, fontWeight: 700, color: C.text, letterSpacing: -1 }}>10.84L</span><span style={{ fontSize: 13, color: C.textLight }}>active</span></div><div style={{ fontSize: 12, fontFamily: mono, fontWeight: 600, color: C.green, marginTop: 4 }}>+30,400 net this month</div></div>
              <div style={{ display: "flex", gap: 12 }}><div style={{ textAlign: "center", padding: "10px 14px", background: C.greenPale, borderRadius: 10 }}><div style={{ fontSize: 9, fontFamily: mono, color: C.green }}>ACTIVATED</div><div style={{ fontSize: 20, fontWeight: 700, color: C.green, marginTop: 2 }}>38,200</div><div style={{ fontSize: 10, color: C.green }}>Bihar: 22.1K</div></div><div style={{ textAlign: "center", padding: "10px 14px", background: C.redPale, borderRadius: 10 }}><div style={{ fontSize: 9, fontFamily: mono, color: C.red }}>CHURNED</div><div style={{ fontSize: 20, fontWeight: 700, color: C.red, marginTop: 2 }}>7,800</div><div style={{ fontSize: 10, color: C.red }}>E.UP: 4,200</div></div></div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {zones.map(z => (
            <div key={z.id} style={{ background: C.card, borderRadius: 12, border: `1px solid ${C.border}`, boxShadow: "0 1px 3px rgba(0,0,0,0.03)", padding: "16px 20px", display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: sC(z.st), flexShrink: 0, boxShadow: `0 0 0 4px ${sC(z.st)}12` }} />
              <div style={{ width: 160 }}><div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{z.n}</div><div style={{ fontSize: 11, color: C.textMid, marginTop: 3, lineHeight: 1.45 }}>{z.note}</div></div>
              <div style={{ width: 80, display: "flex", flexDirection: "column", alignItems: "center" }}><Spark data={z.trend} color={sC(z.st)} /><span style={{ fontSize: 9, color: C.textLight, marginTop: 2 }}>5mo trend</span></div>
              <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gap: 10 }}>
                <div><div style={{ fontSize: 9, fontFamily: mono, color: C.textLight, letterSpacing: 0.4 }}>VOLUME</div><div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginTop: 2 }}>{z.vol}M</div><div style={{ fontSize: 10.5, fontFamily: mono, fontWeight: 600, color: z.vd < 0 ? C.red : C.green }}>{z.vd > 0 ? "+" : ""}{z.vd}%</div></div>
                <div><div style={{ fontSize: 9, fontFamily: mono, color: C.textLight, letterSpacing: 0.4 }}>SPEND</div><div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginTop: 2 }}>₹{z.sp} Cr</div><div style={{ fontSize: 10.5, fontFamily: mono, fontWeight: 600, color: z.sP > 115 ? C.red : z.sP > 100 ? C.orange : C.green }}>{z.sP}% of plan</div></div>
                <div><div style={{ fontSize: 9, fontFamily: mono, color: C.textLight, letterSpacing: 0.4 }}>EFFICIENCY</div><div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginTop: 2 }}>{z.ef}</div><div style={{ fontSize: 10.5, color: C.textLight }}>cases/₹</div></div>
                <div><div style={{ fontSize: 9, fontFamily: mono, color: C.textLight, letterSpacing: 0.4 }}>OUTLETS</div><div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginTop: 2 }}>{z.out}</div><div style={{ fontSize: 10.5, fontFamily: mono, fontWeight: 600, color: z.oD < 0 ? C.red : C.green }}>{z.oD > 0 ? "+" : ""}{z.oD}%</div></div>
                <div><div style={{ fontSize: 9, fontFamily: mono, color: C.textLight, letterSpacing: 0.4 }}>SHARE</div><div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginTop: 2 }}>{z.sh}</div><div style={{ fontSize: 10.5, fontFamily: mono, fontWeight: 600, color: z.shD === null ? C.textLight : z.shD < -5 ? C.red : z.shD < 0 ? C.orange : C.green }}>{z.shD === null ? "New" : `${z.shD > 0 ? "+" : ""}${z.shD} pts`}</div></div>
              </div>
            </div>
          ))}
        </div>
        <Takeaway color={C.orange} bg={C.orangePale}>Growth of 9.3% masks a divergence: Bihar (+20%) and Uttarakhand (+15%) accelerating, <strong style={{ color: C.red }}>Eastern UP declining with worst outlet churn in 12 months</strong>. Bihar drives 24% of incremental volume.</Takeaway>
        <AskBar prompts={["Break down volume by brand across zones", "Which outlets churned in E.UP?", "Show spend efficiency trend over last 6 months"]} onAsk={handleAsk} />

        {/* COMPETITIVE POSITION */}
        <SectionHead title="Competitive Position" sub="Market share and threat landscape" right={<SrcBadge id="nielsen" />} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, padding: "20px 24px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}><div style={{ fontFamily: serif, fontSize: 16, fontWeight: 600, color: C.text, marginBottom: 4 }}>Market Share Trend</div><div style={{ fontSize: 11, color: C.textLight, marginBottom: 14 }}>SLMG territories · Volume share · Jan 2026 audit</div><ShareChart /><Takeaway color={C.red} bg={C.redPale}>Coca-Cola lost 3.6 pts in 12 months. <strong>Campa (+5.3 pts) takes from Coca-Cola, not PepsiCo.</strong></Takeaway></div>
          <div style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, padding: "20px 24px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}><div style={{ fontFamily: serif, fontSize: 16, fontWeight: 600, color: C.text, marginBottom: 16 }}>Threat Breakdown</div>
            {[{ n: "Campa Cola (RCPL)", sh: "12.4%", d: "+5.3 pts", wd: "Avg 42%, E.UP 61%", t: "Price + margin war in rural GT. Funded by Reliance.", c: C.red }, { n: "Lahori + Flavored Soda", sh: "6.8%", d: "+3.6 pts", wd: "Urban MT, Lucknow 11-13%", t: "Category creation. Ethnic soda Coca-Cola doesn't address.", c: C.orange }, { n: "PepsiCo", sh: "18.1%", d: "-1.1 pts", wd: "Stable", t: "Traditional competitor. Not the active threat.", c: C.blue }].map((comp, i) => <div key={i} style={{ padding: "14px 16px", background: C.cream, borderRadius: 10, marginBottom: i < 2 ? 10 : 0, borderLeft: `3px solid ${comp.c}` }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}><span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{comp.n}</span><div style={{ display: "flex", gap: 10, alignItems: "baseline" }}><span style={{ fontFamily: mono, fontSize: 16, fontWeight: 700, color: comp.c }}>{comp.sh}</span><span style={{ fontFamily: mono, fontSize: 11, color: comp.c, fontWeight: 600 }}>{comp.d}</span></div></div><div style={{ fontSize: 11, color: C.textLight, marginBottom: 4 }}>WD: {comp.wd}</div><div style={{ fontSize: 12.5, color: C.textMid, lineHeight: 1.55 }}>{comp.t}</div></div>)}
          </div>
        </div>
        <AskBar prompts={["Simulate: if Campa WD reaches 70% in E.UP, what's the volume impact?", "Show Lahori distribution growth by month"]} onAsk={handleAsk} />

        {/* SPEND EFFICIENCY */}
        <SectionHead title="Spend Efficiency" sub="Where trade investment generates returns" />
        <div style={{ display: "grid", gridTemplateColumns: "55fr 45fr", gap: 16 }}>
          <div style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, padding: "20px 24px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}><div style={{ fontFamily: serif, fontSize: 16, fontWeight: 600, color: C.text, marginBottom: 4 }}>Spend vs. Outcome</div><div style={{ fontSize: 11, color: C.textLight, marginBottom: 12 }}>X: budget utilization · Y: volume growth</div><EffQuad /><Takeaway color={C.red} bg={C.redPale}><strong>Eastern UP is the only zone in the spend trap.</strong> Gap between Uttarakhand (5.91/₹) and E.UP (2.71/₹) = ₹5-8 Cr reallocation value.</Takeaway></div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, padding: "20px 22px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}><div style={{ fontFamily: serif, fontSize: 16, fontWeight: 600, color: C.text, marginBottom: 14 }}>Budget Pace</div><div style={{ display: "flex", gap: 10, marginBottom: 12 }}>{[{ l: "Q1 BUDGET", v: "₹436 Cr", c: C.text, bg: C.cream }, { l: "MTD", v: "₹118 Cr", c: C.orange, bg: C.orangePale }, { l: "EFF.", v: "4.08", c: C.text, bg: C.cream, u: "cases/₹" }].map((m, i) => <div key={i} style={{ flex: 1, padding: "12px 14px", background: m.bg, borderRadius: 10 }}><div style={{ fontSize: 9, fontFamily: mono, color: C.textLight, letterSpacing: 0.5 }}>{m.l}</div><div style={{ fontSize: 22, fontWeight: 700, color: m.c, marginTop: 3 }}>{m.v}</div>{m.u && <div style={{ fontSize: 10, color: C.textLight }}>{m.u}</div>}</div>)}</div><Takeaway color={C.orange} bg={C.orangePale}>Running 9% over pace. Budget exhausts <strong>3 weeks early</strong>. Before April summer peak.</Takeaway></div>
            <div style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, padding: "20px 22px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)", flex: 1 }}><div style={{ fontFamily: serif, fontSize: 16, fontWeight: 600, color: C.text, marginBottom: 14 }}>Efficiency Ranking</div>{[...zones].sort((a, b) => b.ef - a.ef).map((z, i) => <div key={z.id} style={{ display: "flex", alignItems: "center", padding: "8px 0", borderBottom: i < zones.length - 1 ? `1px solid ${C.borderLight}` : "none" }}><div style={{ width: 8, height: 8, borderRadius: "50%", background: sC(z.st), marginRight: 12, boxShadow: `0 0 0 3px ${sC(z.st)}12` }} /><div style={{ flex: 1, fontSize: 13, fontWeight: 500 }}>{z.n}</div><div style={{ width: 100, height: 6, borderRadius: 3, background: C.cream, marginRight: 14, overflow: "hidden" }}><div style={{ width: `${(z.ef / 6.2) * 100}%`, height: "100%", borderRadius: 3, background: sC(z.st), opacity: 0.55 }} /></div><span style={{ fontFamily: mono, fontSize: 15, fontWeight: 700, color: sC(z.st), width: 50, textAlign: "right" }}>{z.ef}</span></div>)}</div>
          </div>
        </div>
        <AskBar prompts={["Simulate: reallocate ₹5 Cr from E.UP to Bihar. Net impact?", "Show spend efficiency trend over last 6 months"]} onAsk={handleAsk} />

        {/* SCHEME PORTFOLIO */}
        <SectionHead title="Scheme Portfolio" sub="23 active schemes. Performance by uplift coefficient." />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, padding: "20px 24px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}><div style={{ fontFamily: mono, fontSize: 10, letterSpacing: 0.6, color: C.green, fontWeight: 700, marginBottom: 14 }}>TOP PERFORMERS</div>{topS.map((s, i) => <div key={i} style={{ display: "flex", alignItems: "center", padding: "12px 0", borderBottom: i < 2 ? `1px solid ${C.borderLight}` : "none" }}><div style={{ flex: 1 }}><div style={{ fontSize: 13.5, fontWeight: 500, color: C.text }}>{s.n}</div><div style={{ fontSize: 11, color: C.textLight, marginTop: 3 }}>{s.z} · ₹{s.s} Cr</div></div><div style={{ padding: "6px 16px", background: C.greenPale, borderRadius: 8, textAlign: "center" }}><div style={{ fontSize: 20, fontWeight: 700, fontFamily: mono, color: C.green }}>{s.u}x</div><div style={{ fontSize: 8.5, fontFamily: mono, color: C.green, letterSpacing: 0.5, fontWeight: 600 }}>UPLIFT</div></div></div>)}<div style={{ marginTop: 14, fontSize: 13, color: C.textMid, lineHeight: 1.65 }}>Pattern: <strong style={{ color: C.text }}>activation-linked mechanics</strong> outperform flat margin schemes.</div></div>
          <div style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, padding: "20px 24px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}><div style={{ fontFamily: mono, fontSize: 10, letterSpacing: 0.6, color: C.red, fontWeight: 700, marginBottom: 14 }}>UNDERPERFORMING · UPLIFT &lt; 1.05x</div>{btmS.map((s, i) => <div key={i} style={{ display: "flex", alignItems: "center", padding: "12px 0", borderBottom: i < 2 ? `1px solid ${C.borderLight}` : "none" }}><div style={{ flex: 1 }}><div style={{ fontSize: 13.5, fontWeight: 500, color: C.text }}>{s.n}</div><div style={{ fontSize: 11, color: C.textLight, marginTop: 3 }}>{s.z} · ₹{s.s} Cr</div></div><div style={{ padding: "6px 16px", background: C.redPale, borderRadius: 8, textAlign: "center" }}><div style={{ fontSize: 20, fontWeight: 700, fontFamily: mono, color: C.red }}>{s.u}x</div><div style={{ fontSize: 8.5, fontFamily: mono, color: C.red, letterSpacing: 0.5, fontWeight: 600 }}>UPLIFT</div></div></div>)}<Takeaway color={C.red} bg={C.redPale}>3 schemes = <strong>₹14.1 Cr (22%)</strong> for <strong>&lt;3% incremental</strong>. See Brief #4.</Takeaway></div>
        </div>
        <AskBar prompts={["Show all 23 schemes ranked by uplift with cost data", "Simulate: terminate bottom 3 and redeploy. Full impact model."]} onAsk={handleAsk} />

        <div style={{ marginTop: 48, paddingTop: 16, borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", paddingBottom: 24 }}>
          <span style={{ fontSize: 11, color: C.textLight }}>Questt AI · Intelligence Warehouse</span>
          <div style={{ display: "flex", gap: 8 }}>{Object.entries(sources).map(([k, s]) => <span key={k} style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 8px", borderRadius: 4, background: s.c === C.green ? C.greenPale : C.orangePale, fontSize: 8.5, fontFamily: mono }}><span style={{ width: 4, height: 4, borderRadius: "50%", background: s.c }} /><span style={{ color: C.textMid }}>{s.l}</span><span style={{ color: C.textLight }}>{s.lag}</span></span>)}</div>
        </div>
      </div>
        </div>{/* end page content flex:1 */}

        {/* FOOTER */}
        <div style={{ marginTop: "auto", borderTop: `1px solid ${C.borderLight}`, padding: "10px 36px", display: "flex", justifyContent: "space-between", alignItems: "center", background: C.card }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ fontSize: 10, fontWeight: 500, color: C.textMid }}>questt</span><span style={{ color: C.green, fontSize: 11, fontWeight: 700 }}>.</span><span style={{ color: C.borderLight, margin: "0 4px", fontSize: 10 }}>|</span><span style={{ fontSize: 9, fontWeight: 600, color: C.textMid, fontFamily: "Georgia,serif" }}>slmg</span><span style={{ fontSize: 8, color: C.textLight, marginLeft: 10, fontFamily: mono, letterSpacing: "0.03em" }}>v2.4.1</span></div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}><div style={{ width: 4, height: 4, borderRadius: 2, background: C.green }} /><span style={{ fontSize: 8, color: C.textLight, fontFamily: mono }}>Synced 2m ago</span></div>
        </div>
      </div>{/* end main area */}

      {/* CONVERSATION PANEL OVERLAY */}
      {convOpen && <>
        <div onClick={() => setConvOpen(false)} style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.3)", zIndex: 999, backdropFilter: "blur(2px)" }} />
        <ConvPanel messages={messages} onClose={() => setConvOpen(false)} onAsk={handleAsk} />
      </>}
    </div>
  );
}

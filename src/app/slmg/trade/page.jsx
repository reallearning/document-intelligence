"use client";
import { useState, useRef, useEffect } from "react";

/* ══════════════════════════════════════════════════════════════
   SLMG BEVERAGES - TRADE SPEND COMMAND CENTER v8
   With functional conversation panel
   ══════════════════════════════════════════════════════════════ */

const C = {
  header: "#111A15", page: "#FAFAF8", card: "#FFFFFF", border: "#E5E2DB",
  borderLight: "#F0EDE7", text: "#1C1C1C", textMid: "#555555", textLight: "#999999",
  green: "#2D5A3D", greenPale: "#EAF2EF", greenSoft: "#2D5A3D08",
  orange: "#946B1A", orangePale: "#FDFAF0",
  red: "#B33A3A", redPale: "#FDF3F3",
  blue: "#3B6FA0", bluePale: "#EFF5FB",
  cream: "#F3F0EB", warmGrey: "#E8E5DE",
};
const font = "'IBM Plex Sans', -apple-system, sans-serif";
const serif = "Georgia, serif";
const mono = "'JetBrains Mono', monospace";

const sources = {
  d365: { l: "SLMG D365 F&O", lag: "T+1", c: C.green },
  dms: { l: "Vxceed DMS", lag: "T+1", c: C.green },
  sfa: { l: "SFA Visit Logs", lag: "T+0", c: C.green },
  nielsen: { l: "NielsenIQ", lag: "~6 wk", c: C.orange },
  scheme: { l: "Scheme Mgmt", lag: "T+1", c: C.green },
  cts: { l: "Cooler Tracking", lag: "T+0", c: C.green },
};

/* ═══ CONVERSATION RESPONSES ═══ */
const convResponses = {
  "What if we increase rural margin by ₹3/case in the top 80 distributors?": {
    agents: ["Spend Simulator", "Volume Model", "Margin Analyzer"],
    sources: ["dms", "scheme"],
    body: `**Simulation: ₹3/case margin increase across top 80 E.UP distributors**

Running this against historical elasticity data from similar interventions in Central and Western UP:

| Metric | Current | Projected (+₹3) | Delta |
|---|---|---|---|
| Avg secondary (cases/wk) | 620 / dist | 740 / dist | +19.4% |
| Monthly volume (80 dist) | 2,48,000 cases | 2,96,000 cases | +48,000 cases |
| Monthly cost | - | ₹0.89 Cr | - |
| Cost/incremental case | - | ₹185 | vs ₹296 current avg |

**Assessment:** Strong move. The top 80 distributors (those with cooler-equipped beats, secondary >500 cases/wk) show historical margin elasticity of 1.6x. The ₹185/incremental case is 37% cheaper than the current zone average.

**However:** The ₹3 increase only makes sense if paired with cooler compliance enforcement. DMS cross-referenced with the last field audit shows 12 of these 80 distributors have beats where cooler purity is below 50%. They're getting the cooler benefit without exclusivity. Fix compliance in those beats first, then increase margin.`,
    followUps: ["What's the breakeven if Campa matches the margin increase?", "Show the 12 low-compliance distributors", "Run this for ₹5/case instead of ₹3"],
  },
  "Show me the 14 declining beats in detail": {
    agents: ["Geo Analyzer", "Volume Mapper"],
    sources: ["dms", "sfa"],
    body: `**14 Declining Beats: Gorakhpur-Deoria Rural Cluster**

The 14 beats form a contiguous geographic band running south from Gorakhpur city through Deoria district into Kushinagar.

| Beat | Distributor | Sec. Sales Decline | Visit Compliance | Campa Presence |
|---|---|---|---|---|
| GKP-R-07 | Sharma Traders | -22% | 78% | Confirmed |
| GKP-R-12 | Gupta Beverages | -18% | 82% | Confirmed |
| DEO-R-03 | Singh Distributors | -24% | 71% | Confirmed |
| DEO-R-05 | Tiwari Sales | -16% | 85% | Confirmed |
| DEO-R-08 | Verma Agencies | -21% | 68% | Confirmed |
| ... | ... | ... | ... | ... |
| **Total (14 beats)** | **8 distributors** | **-19.2% avg** | **76% avg** | **All 14** |

**Pattern:** All 14 beats show Campa WD above 55% in the latest NielsenIQ cycle (Jan audit), up from near-zero in the Q2'25 audit. The secondary sales decline in our DMS started 2-3 weeks after Campa WD appeared in these beats. The geographic concentration along the Gorakhpur-Deoria-Kushinagar corridor suggests a coordinated competitive expansion, not random pressure.

**Key insight from SFA cross-reference:** Beats where salesman visit compliance is above 80% are declining at -14%. Beats below 80% are declining at -24%. Execution intensity is a compounding factor on top of the competitive pressure.`,
    followUps: ["Show distributor-level detail for these beats", "Which adjacent beats show early NielsenIQ WD movement?", "Can we pre-position a counter-scheme in adjacent beats?"],
  },
  "Which beats with coolers are closest to flipping?": {
    agents: ["Beat Risk Model", "Churn Predictor"],
    sources: ["dms", "sfa"],
    body: `**Cooler-Equipped Beats at Risk: Eastern UP**

Applied churn prediction model (trained on the patterns from beats that already declined >20%) to identify cooler-equipped beats showing early warning signals:

**High Risk (next 30 days): 18 beats across 6 distributors**
These show 2+ of: secondary sales declining >15% over 4 weeks, salesman visit compliance dropped below 75%, and Campa distributor confirmed active in the same area.

**Medium Risk (next 60 days): 34 beats across 12 distributors**
These show 1 of the above signals. Most common: secondary decline of 10-15% without visit compliance drop yet.

| Risk Level | Beats | Distributors | Avg Sec. Decline | Volume at Risk |
|---|---|---|---|---|
| High (30d) | 18 | 6 | -18% | ~₹2.4 Cr/month |
| Medium (60d) | 34 | 12 | -12% | ~₹4.1 Cr/month |
| Stable | 168 | 48 | -2% | Low |

**Recommendation:** The 18 high-risk beats need immediate intervention this week: targeted scheme activation + salesman visit frequency increase. DMS data shows every week of delay in declining beats increases the probability of the secondary sales drop becoming permanent by ~8%.`,
    followUps: ["Generate a priority list for the 18 high-risk beats", "What intervention has the highest retention rate?", "Cost to defend all 18 vs. conceding the weakest 6?"],
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
| **Total monthly** | - | - | **₹2.04 L** |
| **Total quarterly** | - | - | **₹6.48 L** |

For context, the existing Limca margin scheme running across all of Central UP (including rural where Limca volumes are flat with no competitive pressure per DMS data) costs ₹4.8 Cr/quarter. Redirecting just 30% of that (₹1.44 Cr) fully funds this blitz with budget to spare.

**Expected impact:** Based on TM-Q1-04 Sprite MT visibility results (1.24x uplift in these same stores since Feb 15), secondary placement drives 24-35% uplift in impulse purchase velocity. For Lucknow, projected Limca+Sprite volume recovery: 3,200-4,500 cases/month.`,
    followUps: ["Compare this ROI vs the existing margin scheme", "Which 180 outlets have the highest footfall?", "Can we pilot in 50 outlets first?"],
  },
  "Simulate: what if 5 distributors go dark in April?": {
    agents: ["Distribution Simulator", "Revenue Impact Model", "Seasonal Overlay"],
    sources: ["d365", "dms"],
    body: `**Scenario: 5 of 14 Stressed Distributors Cease Operations in April**

Selected the 5 most stressed distributors (inventory >16 days, order frequency dropped to 12+ days):

| Distributor | Zone | Beats Served | Monthly Vol | Summer Multiplier | April Vol at Risk |
|---|---|---|---|---|---|
| Sharma Beverages, Patna | N. Bihar | 42 | 18,200 cases | 2.3x | 41,860 |
| Krishna Traders, Muzaffarpur | N. Bihar | 34 | 12,400 | 2.1x | 26,040 |
| Gaya Sales Corp | S. Bihar | 38 | 14,800 | 2.4x | 35,520 |
| Buxar Distributors | S. Bihar | 30 | 11,200 | 2.2x | 24,640 |
| Singh & Sons, Bhagalpur | N. Bihar | 36 | 13,600 | 2.0x | 27,200 |
| **Total** | - | **180 beats** | **70,200** | - | **155,260** |

**Revenue impact:** ~₹11.2 Cr in April alone (peak month). These 180 beats would have zero Coca-Cola supply during the highest-demand period of the year.

**Cascading effects:**
- Retailers in these beats switch to whatever's available (Campa, PepsiCo, local brands)
- Once switched during summer, win-back cost is 3-4x the retention cost
- The new beats activated through these distributors since the Bihar takeover lose their primary supply line

**This is preventable.** Extending payment terms by 5 days and capping loading costs ₹2.8 Cr in working capital for 60 days. The alternative is losing ₹11.2 Cr in one month.`,
    followUps: ["What's the cheapest intervention to keep all 5 alive?", "Which backup distributors could partially cover?", "Run the same scenario for all 14"],
  },
  "Simulate: reallocate ₹5 Cr from E.UP to Bihar. Net impact?": {
    agents: ["Reallocation Optimizer", "Volume Projector", "Scenario Engine"],
    sources: ["scheme", "dms"],
    body: `**Simulation: Reallocate ₹5 Cr from Eastern UP to Bihar**

**Source:** ₹5 Cr from the lowest-performing E.UP distributors (current efficiency: 0.8 cases/₹).
**Destination:** Bihar summer pre-positioning across both zones.

| | Eastern UP (Source) | Bihar (Destination) | Net |
|---|---|---|---|
| **Volume change** | -4,000 cases/mo | +17,500 cases/mo | **+13,500** |
| **Spend change** | -₹5 Cr | +₹5 Cr | ₹0 |
| **Efficiency** | 0.8 -> removed | 3.5 cases/₹ | **+4.4x better** |
| **Distributors affected** | 18 (conceded) | ~35 (strengthened) | - |
| **Share impact** | -0.3 pts (already losing) | +0.8 pts (estimated) | **Net positive** |

**Bottom line:** Same ₹5 Cr budget. 13,500 more cases per month. 4.4x efficiency improvement. The 18 E.UP distributors being conceded serve beats with sub-200 secondary sales per week and no cooler coverage. Bihar gains distribution density ahead of summer.

**Risk:** If Coca-Cola leadership sees the E.UP share decline in the next Nielsen cycle, the optics are bad even though the economics are right. Recommend framing this as "strategic concentration" with the supporting data ready.`,
    followUps: ["Run this for ₹12.8 Cr (full waste scheme reallocation)", "What's the Bihar share projection after reallocation?", "How do we frame this for the Coca-Cola India review?"],
  },
  "Simulate: if Campa WD reaches 70% in E.UP, what's the volume impact?": {
    agents: ["Competitive Scenario Model", "Elasticity Engine"],
    sources: ["nielsen", "dms"],
    body: `**Scenario: Campa WD at 70% in Eastern UP (currently 61%)**

At current Campa expansion velocity (+4-5 pts per Nielsen cycle), 70% WD is approximately 2-3 months away.

**Projected impact on SLMG volume:**

| Campa WD Level | SLMG Volume Index | Volume Loss vs Today | Share Estimate |
|---|---|---|---|
| 52% (Q3'25) | 100 (baseline) | - | 52.8% |
| 61% (Jan'26) | 91.2 | -8.8% | 49.1% |
| 65% (projected Mar'26) | 87.4 | -12.6% | 47.2% |
| **70% (projected May'26)** | **82.1** | **-17.9%** | **44.8%** |

**At 70% WD, SLMG loses an additional ~5,100 cases/month vs today's already-declining baseline.** Total cumulative loss from the 52% baseline: ~14,500 cases/month.

**The inflection point is around 65% WD.** Beyond that, Campa reaches enough distribution density that consumer habit starts shifting - they stop looking for Coke and default to Campa. This is the "preference flip" threshold documented in other RCPL expansion markets.

**Implication:** If SLMG is going to make a stand in E.UP, the next 60 days are the window. After 70% WD, the economics of winning back become 3-4x more expensive than defending now.`,
    followUps: ["What's the cost to hold the line at 65% WD?", "Which beat clusters are still below 50% Campa WD?", "Model the total 12-month revenue loss if we don't act"],
  },
  "Show all 14 schemes ranked by uplift with cost data": {
    agents: ["Scheme Analyzer"],
    sources: ["scheme", "dms"],
    body: `**All 14 Active Schemes: Ranked by Volume Uplift Coefficient**

| # | Scheme | Zone | Mechanic | Budget | Uplift | Cost/Inc. Case | Week |
|---|---|---|---|---|---|---|---|
| 1 | Bihar outlet activation slab | S. Bihar | Slab | ₹8.2 Cr | **1.42x** | ₹128 | 5/12 |
| 2 | Uttarakhand tourism promo | UK | Consumer | ₹3.1 Cr | **1.35x** | ₹142 | 7/12 |
| 3 | Thums Up cooler bonus | C.UP | Cooler | ₹7.8 Cr | **1.28x** | ₹147 | 6/12 |
| 4 | Sprite MT visibility | C.UP | Visibility | ₹2.4 Cr | **1.24x** | ₹172 | 4/12 |
| 5 | Maaza summer pre-load | All | Slab | ₹4.2 Cr | **1.22x** | ₹184 | 2/4 |
| ... | ... | ... | ... | ... | ... | ... | ... |
| 12 | Consumer promo rural | C.UP | Consumer | ₹4.1 Cr | **1.05x** | ₹892 | 6/12 |
| 13 | Rural kirana margin | W.UP | Margin | ₹6.2 Cr | **1.04x** | ₹1,034 | 5/12 |
| 14 | Distributor vol bonus | Bkd | Volume | ₹3.8 Cr | **1.02x** | ₹1,890 | 8/12 |

**Key patterns:**
- **Slab-based and cooler-linked** schemes consistently outperform (avg uplift 1.28x)
- **Flat margin schemes** in low-threat zones are the worst performers (avg 1.04x)
- The **top 5 schemes** generate 68% of all incremental volume from 42% of budget
- The **bottom 3** generate <3% of incremental volume from 18% of budget

Median uplift across all 14: **1.18x**. Anything below 1.10x should be reviewed for modification or termination.`,
    followUps: ["Which mechanic works best in rural GT specifically?", "What's the optimal number of schemes to run simultaneously?", "Design a new scheme for E.UP cooler defense"],
  },
  "Simulate: terminate bottom 3 and redeploy. Full impact model.": {
    agents: ["Reallocation Optimizer", "Scheme Simulator", "Volume Projector"],
    sources: ["scheme", "dms", "d365"],
    body: `**Full Reallocation Simulation: Terminate Bottom 3, Redeploy ₹12.8 Cr**

**Step 1: Terminate**
| Scheme | Spend to Date | Budget | Freed for Q2 |
|---|---|---|---|
| TM-Q1-11 (Limca rural margin, C.UP) | ₹2.8 Cr | ₹3.2 Cr | ₹2.8 Cr |
| TM-Q1-12 (Rural kirana margin, W.UP) | ₹6.2 Cr | ₹6.0 Cr | ₹6.2 Cr |
| TM-Q1-13 (Distributor vol bonus, Bkd) | ₹3.8 Cr | ₹4.0 Cr | ₹3.8 Cr |
2-week distributor notice per agreements. TM-Q1-12 termination risk: zero (A/B data definitive).

**Total freed: ₹12.8 Cr for redeployment**

**Step 2: Redeploy**
| Destination | Amount | Precedent | Projected Inc. Cases/Mo |
|---|---|---|---|
| Holi acceleration (immediate) | ₹3.6 Cr | Holi '25: 1.82x | 85K in 10 days |
| Bihar distributor WC support | ₹2.0 Cr | TM-Q1-06 retention model | Protects 180 beats |
| Bundelkhand beat expansion | ₹2.8 Cr | TM-Q1-01 Bihar activation (1.42x) | ~8,200/mo |
| Maaza E.UP summer pre-load | ₹1.5 Cr | Mar '25 pre-load (1.28x) | ~12,000/mo |
| Summer reserve (Campa counter) | ₹2.9 Cr | Held for April | - |
| **Total** | **₹12.8 Cr** | | **~110K inc. cases/mo** |

**vs. Current: Bottom 3 schemes generate ~5,000 incremental cases/month at ₹12.8 Cr.**

**Net improvement: ~105,000 additional cases/month. Budget-neutral. Weighted ROI: 2.4x vs 1.03x.**`,
    followUps: ["Generate the approval memo for this reallocation", "What's the risk if E.UP defense doesn't hold?", "Timeline to see results?"],
  },
  "Break down volume by brand across zones": {
    agents: ["Portfolio Analyzer"],
    sources: ["dms"],
    body: `**Volume by Brand x Zone: March 2026 MTD (in '000 cases)**

| Brand | C.UP | W.UP | E.UP | UK | N.Bih | S.Bih | Bkd | Total |
|---|---|---|---|---|---|---|---|---|
| **Thums Up** | 5,180 | 4,560 | 4,170 | 1,580 | 3,060 | 1,920 | 1,330 | **21,800** |
| **Sprite** | 2,360 | 1,840 | 1,280 | 730 | 1,060 | 690 | 440 | **8,400** |
| **Maaza** | 1,390 | 1,200 | 830 | 630 | 1,100 | 720 | 330 | **6,200** |
| **Limca** | 1,240 | 1,060 | 880 | 530 | 570 | 300 | 220 | **4,800** |
| **Kinley** | 860 | 850 | 610 | 530 | 1,240 | 660 | 350 | **5,100** |
| **Others** | 370 | 290 | 330 | 100 | 170 | 110 | 530 | **1,900** |
| **Total** | **11,400** | **9,800** | **8,100** | **4,100** | **7,200** | **4,400** | **3,200** | **48,200** |

**Key signals:**
- Thums Up is 52% of E.UP volume but 74% of E.UP scheme spend. Defensive overspend is brand-specific.
- Kinley in Bihar (1,240 + 660 = 1,900) is 37% of total Kinley. Bihar entry-SKU strategy is working.
- Limca in C.UP (1,240) is flat while zone grows 11.8%. The urban MT decline is dragging.
- Maaza in Bihar (1,100 + 720 = 1,820) growing fastest but E.UP pre-load lagging at 830 (28% below target).`,
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
| N. Bihar | - | 3.84 | 3.72 | 3.64 | 3.58 | **3.52** | Declining (new territory) |
| S. Bihar | - | - | 3.42 | 3.32 | 3.24 | **3.14** | Declining (new territory) |
| **Eastern UP** | **3.82** | **3.64** | **3.48** | **3.22** | **2.94** | **2.71** | **Accelerating decline** |

**The E.UP deterioration is not linear. It's accelerating.** From Oct to Jan, efficiency dropped 0.60 (0.20/month). From Jan to Mar, it dropped 0.51 (0.26/month). The rate of decline is increasing.

Bihar's declining efficiency is expected in a new territory build-out and should stabilize by Q3. E.UP's decline is structural and competitive-driven. It will not self-correct.`,
    followUps: ["Project E.UP efficiency for the next 3 months at current trajectory", "At what efficiency level should we trigger automatic scheme termination?", "Which zone will hit the break-even efficiency threshold first?"],
  },
  "Which of the 34 distributors are stressed?": {
    agents: ["Distribution Health"], sources: ["d365", "dms"],
    body: `**Stressed Distributors in Bihar Activation Scheme (TM-Q1-01)**\n\n14 of 34 distributors showing financial stress indicators:\n\n| Distributor | Inventory Days | Receivables | Beat Coverage | Risk |\n|---|---|---|---|---|\n| Sharma Beverages (Patna) | 16 days | Rs42L outstanding | 28 beats | High |\n| Gaya Sales Corp | 14 days | Rs31L outstanding | 22 beats | High |\n| Muzaffarpur Trading | 12 days | Rs28L outstanding | 18 beats | Medium |\n| ... (11 more) | 10-15 days | Rs15-35L | 12-24 beats | Medium |\n\n**Pattern:** All 14 crossed 10+ days inventory cover in the last 2 weeks. Normal is 6-8 days. Receivables climbing because they loaded heavily to hit scheme slabs but downstream offtake hasn't kept pace.\n\n**If these 14 pull back in April:** 180 of the 480 new beats go dark. Rs28-35 Cr summer revenue at risk.`,
    followUps: ["What's the cheapest intervention to keep all 14 alive?", "Can we extend payment terms selectively?", "Which of these 14 overlap with the anomaly alert?"],
  },
  "What happens if we extend this to N. Bihar?": {
    agents: ["Scheme Simulator"], sources: ["dms", "scheme"],
    body: `**Simulation: Extending Bihar Activation Slab to N. Bihar**\n\nN. Bihar already has TM-Q1-09 (seeding scheme) running at Rs18/case. The activation slab (TM-Q1-01) runs at Rs12/case.\n\n**Option A: Replace TM-Q1-09 with activation slab**\n- Lower per-case cost (Rs12 vs Rs18), but slab mechanic requires 800 cases/wk threshold\n- 18 of 28 N. Bihar distributors currently below 800 cases/wk. They wouldn't qualify.\n- Projected uplift: 1.18x (down from 1.14x on seeding scheme for qualifying distributors, but 10 distributors lose incentive entirely)\n\n**Option B: Run both simultaneously**\n- Cost: Additional Rs4.2 Cr/quarter\n- Projected uplift: 1.28x (both mechanics reinforcing)\n- Risk: Overlapping schemes create complexity. Distributor confusion on which slab applies.\n\n**Recommendation:** Wait until N. Bihar distributors mature to 800+ cases/wk baseline (est. Q3 2026), then migrate from seeding to activation slab. Premature switch loses the distributors still building scale.`,
    followUps: ["When will N. Bihar distributors hit 800 cases/wk?", "What's the seeding-to-activation migration path?"],
  },
  "Show beat-level secondary trends for this scheme": {
    agents: ["Volume Analyzer"], sources: ["dms"],
    body: `**Beat-Level Secondary Sales: Bihar Activation Scheme (TM-Q1-01)**\n\n480 beats, sorted by performance:\n\n**Top quartile (120 beats):** +32% secondary growth. These are beats near Patna and established towns. Distributor fill rate >90%. Scheme is accelerating existing demand.\n\n**2nd quartile (120 beats):** +18% growth. Semi-urban beats. Consistent but slower ramp. 85% fill rate.\n\n**3rd quartile (120 beats):** +8% growth. Deep rural. Lower visit frequency from salesmen. 78% fill rate. Growth is real but needs more SFA coverage.\n\n**Bottom quartile (120 beats):** +2% growth. Newly activated beats, mostly in Buxar-Rohtas corridor. These are too new to show meaningful secondary trends yet. Need 6-8 more weeks.\n\n**Key insight:** The activation-linked mechanic is working across all segments. Even bottom quartile shows positive growth (vs negative in E.UP comparable beats). The 480-beat expansion is sustainable.`,
    followUps: ["Which beats should we prioritize for salesman visit frequency?", "How does this compare to E.UP beat-level trends?"],
  },
  "How does this compare to last summer's tourism scheme?": {
    agents: ["Historical Comparison"], sources: ["scheme", "dms"],
    body: `**Uttarakhand Tourism: 2026 vs Summer 2025**\n\n| Metric | Summer '25 | Current (Feb-Mar '26) | Delta |\n|---|---|---|---|\n| Uplift | 1.31x | 1.35x | +4 pts improved |\n| Spend | Rs2.8 Cr | Rs3.1 Cr (on pace for Rs3.4 Cr) | +21% |\n| Combo Attach | N/A (no combo last year) | 42% (TU+Maaza) | New mechanic |\n| Efficiency | 5.42 cases/Rs | 5.91 cases/Rs | +9% improved |\n\nThe combo mechanic (TU 600ml + Maaza 200ml at Rs45) is the key improvement. It didn't exist last summer. The bundle drives 42% attach rate, meaning 42% of consumers buying the Thums Up also take the Maaza. This pulls Maaza volume at near-zero incremental scheme cost.\n\n**Campa factor:** Last summer, Campa WD in Uttarakhand was 8%. Now 14%. Still low due to terrain, but worth monitoring.`,
    followUps: ["Can we extend the combo to include Kinley?", "What's the Campa WD growth rate in Uttarakhand?"],
  },
  "Which outlets are at risk of losing cooler purity?": {
    agents: ["Field Audit Analyzer"], sources: ["cts", "dms"],
    body: `**Cooler Purity Risk: Central UP (TM-Q1-03)**\n\nOf 340 enrolled outlets maintaining >80% Coca-Cola cooler purity:\n\n**12 outlets lost purity in Feb** (CTS shows they dropped below 80% Coca-Cola product in cooler)\n- 8 in Lucknow suburbs (purity dropped from 85% to 62-68% in 3 weeks)\n- 4 in Kanpur (purity dropped from 82% to 70-75%)\n\n**28 outlets at risk (purity 80-85%, declining trend)**\n- CTS data shows purity trending down 2-3 pts/week in these outlets over last 4 weeks\n- If trend continues, they'll breach the 80% threshold by mid-April\n\n**Geographic pattern:** All 28 at-risk outlets are in beats where NielsenIQ shows Campa WD at 35-50%. In beats where Campa WD is >50%, we've already lost most cooler exclusivity. In beats <35%, coolers are stable. The 35-50% WD band is the battleground.\n\n**Immediate action needed:** Targeted salesman visits to the 28 at-risk outlets. Each cooler-exclusive outlet generates 28% more Thums Up offtake than mixed coolers (DMS data). Losing 28 outlets = Rs18L/month revenue impact.`,
    followUps: ["What's the cost of deploying 50 more coolers in Lucknow suburbs?", "Compare sales velocity: cooler-exclusive vs mixed outlets"],
  },
  "What's the cost of deploying 50 more coolers in Lucknow suburbs?": {
    agents: ["Cost Model", "Field Planning"], sources: ["d365"],
    body: `**Cooler Deployment: 50 units in Lucknow Suburbs**\n\n| Item | Cost | Notes |\n|---|---|---|\n| Visi-cooler units (50x) | Rs12.5L | Rs25K/unit, Frigoglass 200L |\n| Installation + logistics | Rs1.5L | Rs3K/unit avg |\n| Annual maintenance | Rs2.5L | Rs5K/unit/year |\n| **Total upfront** | **Rs14L** | One-time |\n| **Annual running** | **Rs2.5L** | Maintenance only |\n\n**ROI projection:** Each cooler-exclusive outlet generates Rs8,200/month incremental vs non-cooler outlets. 50 coolers x Rs8,200 = Rs4.1L/month incremental. Payback period: 3.4 months.\n\nThis is the highest-ROI capital deployment available. The cooler scheme (TM-Q1-03) already proved 1.28x uplift. Adding 50 coolers in the Campa-encroachment zone directly defends the territory.`,
    followUps: ["Can we redirect from the E.UP defensive spend?", "What's the cooler deployment queue from Coca-Cola India?"],
  },
  "Compare sales velocity: cooler-exclusive vs mixed outlets": {
    agents: ["Outlet Performance"], sources: ["dms", "sfa"],
    body: `**Sales Velocity: Cooler-Exclusive vs Mixed Outlets (Central UP)**\n\n| Metric | Cooler-Exclusive (340 outlets) | Mixed Cooler (520 outlets) | Delta |\n|---|---|---|---|\n| Thums Up cases/wk | 12.4 | 8.6 | +44% |\n| Sprite cases/wk | 4.8 | 3.2 | +50% |\n| Maaza cases/wk | 3.1 | 2.8 | +11% |\n| Total Coca-Cola cases/wk | 20.3 | 14.6 | +39% |\n| Avg order value | Rs4,200 | Rs2,800 | +50% |\n\nThe premium is driven by visibility. In a cooler-exclusive outlet, 100% of cooler shelf space is Coca-Cola brands. Impulse purchase conversion is 2.8x higher when the consumer sees only Coca-Cola in the cooler vs a mixed display.\n\nThe Maaza delta is smaller (+11%) because Maaza competes with juice, not other CSDs. Cooler purity matters most for sparkling (Thums Up, Sprite) where the alternative is literally next to it in the cooler.`,
    followUps: ["Which mixed-cooler outlets are best candidates for conversion?"],
  },
  "Show store-by-store performance for this scheme": {
    agents: ["MT Analytics"], sources: ["dms"],
    body: `**Sprite MT Visibility: Store-Level Performance (TM-Q1-04)**\n\n180 Lucknow MT stores with secondary placement:\n\n**Top 20 stores (DMart Gomti Nagar, Spencer's Hazratganj, etc.)**\n- Avg uplift: 1.42x. These are high-footfall stores where end-cap placement drives significant impulse.\n\n**Middle 120 stores**\n- Avg uplift: 1.24x. Consistent with scheme average. Checkout counter placement working.\n\n**Bottom 40 stores**\n- Avg uplift: 1.08x. Smaller format stores where secondary placement has limited incremental visibility. Consider dropping these and reallocating Rs800/outlet/month to higher-performing stores.\n\n**Placement vs no-placement comparison:** In our 180 stores with Sprite secondary placement, Sprite holds share even as the broader Lucknow MT channel declines -6.8% QoQ. In stores without our placement, Sprite follows the channel decline. The uplift gap between placed and unplaced stores is 18-24 pts.\n\n**Action:** Extending placement to the remaining high-footfall Lucknow MT stores where we don't have Sprite placement yet. Matching the TM-Q1-04 mechanic at Rs800/outlet/month.`,
    followUps: ["What would it cost to extend to all UP MT stores?", "Which 42 stores need Sprite placement added?"],
  },
  "What would it cost to extend to all UP MT stores?": {
    agents: ["Scheme Designer", "Cost Model"], sources: ["scheme", "dms"],
    body: `**Sprite/Limca Visibility: All UP Modern Trade**\n\nCurrently covering 180 Lucknow MT stores. Total UP MT universe: 620 stores.\n\n| Expansion | Stores | Monthly Cost | Projected Uplift |\n|---|---|---|---|\n| Current (Lucknow) | 180 | Rs1.44L | 1.24x (measured) |\n| + Kanpur | +85 | +Rs0.68L | Est. 1.18x |\n| + Varanasi/Prayagraj | +110 | +Rs0.88L | Est. 1.15x |\n| + Rest of UP | +245 | +Rs1.96L | Est. 1.08x |\n| **Full UP** | **620** | **Rs4.96L/month** | **Est. 1.16x avg** |\n\n**Recommendation:** Extend to Kanpur first (second-largest urban MT cluster in SLMG territory, where Limca+Sprite are also showing QoQ decline per DMS data). The rest-of-UP stores are lower priority because the urban MT decline is concentrated in Lucknow and Kanpur. Phased rollout: Kanpur in April, evaluate, then Varanasi/Prayagraj in June.`,
    followUps: ["What's the Limca+Sprite decline rate in Kanpur MT?", "Can we fund Kanpur from the Limca margin scheme savings?"],
  },
  "Compare Sprite vs Lahori velocity where both have placement": {
    agents: ["Category Analyzer"], sources: ["dms", "nielsen"],
    body: `**Sprite Performance: Placement vs No-Placement Stores**\n\nWe can't see Lahori's sell-through data, but we can see how our own Sprite performs based on whether we have visibility investment or not:\n\n| Store Segment | Sprite Cases/Wk | QoQ Trend | TM-Q1-04 Active? |\n|---|---|---|---|\n| 180 stores with Sprite placement | 8.4 | +2.4% | Yes |\n| ~120 comparable stores without | 5.8 | -6.8% | No |\n| Gap | +2.6 cases/store/wk | +9.2 pts | |\n\n**The visibility gap is 9.2 percentage points.** Stores with Sprite secondary placement are growing. Stores without are declining at the same rate as the broader Lucknow MT channel.\n\n**NielsenIQ context:** Flavored soda category is +48% YoY in UP urban. The decline in our non-placement stores suggests consumers are switching to alternatives when they don't see Sprite on the shelf. We don't need to know the competitor's exact numbers to know our own visibility is the variable.\n\n**This means visibility is defensive.** We don't need to outsell alternatives. We need to be present so consumers don't substitute when they're looking for a sparkling drink.`,
    followUps: ["What would it cost to add placement in the 120 unplaced stores?"],
  },
  "Which zones haven't started loading yet?": {
    agents: ["Pre-Season Tracker"], sources: ["dms", "d365"],
    body: `**Maaza Summer Pre-Load (TM-Q1-05): Loading Status by Zone**\n\n| Zone | % Budget Deployed | Distributor Loading | Status |\n|---|---|---|---|\n| S. Bihar | 82% | 18/22 started | On track |\n| N. Bihar | 74% | 22/28 started | On track |\n| Uttarakhand | 68% | 14/18 started | On track |\n| Central UP | 58% | 18/28 started | Behind |\n| Western UP | 45% | 14/38 started | Behind |\n| **Eastern UP** | **28%** | **8/42 started** | **Critical** |\n| **Bundelkhand** | **22%** | **4/12 started** | **Critical** |\n\nE.UP and Bundelkhand are critical. Only 28% and 22% budget deployed with 19 days to summer peak. Distributors in E.UP are deprioritizing Maaza to handle Thums Up defensive loading. Bundelkhand distributors are simply slow.\n\n**Immediate action:** Dedicated Maaza loading push in E.UP and Bundelkhand this week. If Trishundi ASSP line doesn't hit 85% by Apr 1, we'll have product shortage at peak.`,
    followUps: ["What's the ASSP production ramp schedule?", "Can we redirect Maaza from overstocked zones to E.UP?"],
  },
  "What's the ASSP production ramp schedule?": {
    agents: ["Supply Chain"], sources: ["d365"],
    body: `**Trishundi Plant ASSP Line: Production Ramp**\n\nCurrent: 62% utilization (2,800 bottles/min of 4,600 capacity)\n\n| Week | Target Utilization | Bottles/Min | Daily Output | Constraint |\n|---|---|---|---|---|\n| Mar 10-16 | 68% | 3,130 | 1.88M bottles | Raw material delivery pending |\n| Mar 17-23 | 75% | 3,450 | 2.07M bottles | Shift change, new operators training |\n| Mar 24-31 | 82% | 3,770 | 2.26M bottles | - |\n| **Apr 1** | **85%** | **3,910** | **2.35M bottles** | **Target** |\n\n**Risk:** The Mar 10-16 raw material delivery (PET preforms from Noida supplier) is 3 days late. If it doesn't arrive by Mar 13, the ramp delays by a week, and we hit summer peak at 75% instead of 85%. That's a shortfall of ~380K bottles/day.\n\nBuxar plant can partially compensate (currently at 40% utilization, ramp to 65% possible) but Buxar produces 2L and 1.25L, not ASSP 200ml. The ASSP constraint is Trishundi-specific.`,
    followUps: ["What's the fallback if Trishundi raw material is late?", "Can Buxar produce any ASSP format?"],
  },
  "Show Maaza pre-load vs same period last year by zone": {
    agents: ["Historical Comparison"], sources: ["dms"],
    body: `**Maaza Pre-Load: 2026 vs 2025 (same period)**\n\n| Zone | Mar '25 Loading | Mar '26 Loading | vs LY | On Pace? |\n|---|---|---|---|---|\n| S. Bihar | Rs1.8 Cr | Rs2.4 Cr | +33% | Yes |\n| N. Bihar | Rs1.2 Cr | Rs1.6 Cr | +33% | Yes |\n| Uttarakhand | Rs0.9 Cr | Rs1.1 Cr | +22% | Yes |\n| Central UP | Rs2.1 Cr | Rs1.8 Cr | -14% | No |\n| Western UP | Rs1.6 Cr | Rs1.2 Cr | -25% | No |\n| Eastern UP | Rs1.4 Cr | Rs0.8 Cr | -43% | Critical |\n| Bundelkhand | Rs0.6 Cr | Rs0.4 Cr | -33% | Critical |\n\nBihar and Uttarakhand are ahead of last year. But E.UP is 43% behind, worst ever pre-load pace. The E.UP distributors are capacity-constrained: handling Thums Up defensive loading simultaneously. Maaza is getting squeezed out of their order cycles.`,
    followUps: ["Can we run a separate Maaza-only loading window for E.UP?"],
  },
  "How many Kinley-first beats converted to sparkling orders?": {
    agents: ["Market Making Analyzer"], sources: ["dms"],
    body: `**Kinley Market-Making: Beat Conversion Analysis (TM-Q1-06)**\n\n180 beats activated with Kinley 1L as first SKU since Jan 15:\n\n| Conversion Stage | Beats | % | Avg Time |\n|---|---|---|---|\n| Kinley only (still) | 58 | 32% | - |\n| Added Thums Up | 82 | 46% | 18 days avg |\n| Added Thums Up + Sprite | 28 | 16% | 28 days avg |\n| Full portfolio (3+ brands) | 12 | 7% | 35 days avg |\n| **Total converted to sparkling** | **122** | **68%** | **22 days avg** |\n\nThe 68% conversion rate confirms Kinley works as a market-making SKU. Water justifies the delivery economics for the distributor, then the salesman cross-sells sparkling on subsequent visits.\n\nThe 58 beats still on Kinley-only are mostly in deep rural where sparkling demand is genuinely lower. These may stay water-only permanently, and that's fine: they still contribute Rs0.50/bottle incentive economics.`,
    followUps: ["Can we replicate this in E.UP new beats?", "What's the per-beat economics of the Kinley entry strategy?"],
  },
  "Can we replicate this in E.UP new beats?": {
    agents: ["Scheme Simulator"], sources: ["dms", "scheme"],
    body: `**Kinley Entry Strategy: E.UP Applicability**\n\nShort answer: Yes, but with a modification.\n\nIn Bihar, Kinley 1L enters virgin beats where no branded water exists. The economics work because the distributor gets per-bottle incentive and the beat has no competition.\n\nIn E.UP, the challenge is different: **Campa is already in the beat.** So Kinley isn't entering a vacuum. It's entering a beat where RCPL has a distributor and Campa is priced at Rs10/bottle (vs Kinley at Rs20).\n\n**Modified strategy for E.UP:**\n- Use Kinley 500ml sachet (Rs5, competitive with local water) instead of 1L\n- Target beats where Campa has WD but no water presence (Campa only distributes cola, not water)\n- This creates a flanking entry: Kinley water where Campa doesn't compete, then cross-sell sparkling\n\n**Projected cost:** Rs1.2 Cr for 100 E.UP beats. Lower than Bihar (Rs1.8 Cr for 180 beats) because per-beat cost is similar but we're targeting fewer beats strategically.`,
    followUps: ["Which E.UP beats have Campa cola but no Campa water?"],
  },
  "Show the 14 beats where this scheme has zero effect": {
    agents: ["Scheme Evaluator"], sources: ["dms", "sfa"],
    body: `**E.UP Defensive Margin (TM-Q1-07): Zero-Uplift Beats**\n\nOf 280 enrolled beats, 14 show zero or negative incremental volume despite Rs18/case margin:\n\n| Beat | Campa WD | Sec. Decline | Margin Pass-Thru | Issue |\n|---|---|---|---|---|\n| GKP-R-04 | 72% | -18% | 58% | Campa dominant, margin not reaching retail |\n| GKP-R-11 | 68% | -22% | 62% | Campa dominant, distributor retaining margin |\n| DEO-R-02 | 71% | -15% | 55% | Campa dominant, outlet loyalty switched |\n| ... (11 more) | 65-75% | -12 to -24% | 52-65% | Same pattern |\n\n**Common pattern:** All 14 beats have Campa WD above 65%. At this level, the Rs18/case margin is insufficient to compete with Campa's Rs18/case retailer margin PLUS Campa's free cooler deployment PLUS RCPL's dedicated distributor. We're matching the margin but not the full value proposition.\n\n**These 14 beats represent Rs3.2 Cr/quarter in scheme spend for zero return.** Conceding these and concentrating on the 60 beats where Campa WD is 30-50% (where the defensive margin actually works) saves Rs3.2 Cr and improves scheme ROI from 1.08x to 1.18x.`,
    followUps: ["What if we cap this to cooler-equipped beats only?", "What's the minimum margin level to hold non-Campa beats?"],
  },
  "What if we cap this to cooler-equipped beats only?": {
    agents: ["Scheme Simulator"], sources: ["dms", "scheme"],
    body: `**Simulation: E.UP Defensive Margin Capped to Cooler Beats**\n\nCurrent: 280 beats, Rs12.4 Cr spend, 1.08x uplift\n\n**Capped to cooler-equipped beats only (168 beats):**\n\n| Metric | Current (280 beats) | Capped (168 beats) | Delta |\n|---|---|---|---|\n| Spend | Rs12.4 Cr | Rs7.2 Cr | -Rs5.2 Cr saved |\n| Uplift | 1.08x | 1.22x | +14 pts improvement |\n| Inc. Cases | 8,400/mo | 7,800/mo | -600 (only -7%) |\n| Pass-through | 71% | 86% | +15 pts |\n| ROI | 0.91x | 1.48x | Breakeven to profitable |\n\n**Why it works:** Cooler-equipped beats have built-in brand preference infrastructure. The margin scheme reinforces existing consumer behavior. In non-cooler beats, the margin goes to the distributor but doesn't change consumer choice because there's no visibility advantage.\n\nYou lose 600 cases/month (7% of incremental) but save Rs5.2 Cr and flip the ROI from below-breakeven to 1.48x. The Rs5.2 Cr redeploys to Bihar summer or Holi acceleration.`,
    followUps: ["Do it. Show me the implementation plan.", "What happens to the 112 non-cooler beats we drop?"],
  },
  "Show control vs scheme beats side by side": {
    agents: ["A/B Comparison"], sources: ["dms"],
    body: `**Rural Kirana Margin (TM-Q1-12): Scheme vs Control**\n\nComparing 310 scheme beats (Rs3/case margin) vs 85 control beats (no scheme, adjacent territory in W.UP):\n\n| Metric | Scheme Beats (310) | Control Beats (85) | Delta |\n|---|---|---|---|\n| Secondary volume/beat | 142 cases/wk | 138 cases/wk | +2.9% |\n| Volume trend (3mo) | +1.2% | +1.8% | Control actually growing faster |\n| Distributor order freq | 2.8x/wk | 2.6x/wk | Negligible difference |\n| Brand mix | 62% TU, 18% Sprite | 60% TU, 19% Sprite | Identical |\n\n**The control areas show the same volume trend.** The +2.9% difference is within normal statistical noise (p=0.34, not significant). The control beats are actually growing faster than scheme beats over 3 months.\n\n**This is the most clear-cut termination case in the portfolio.** Rs6.2 Cr over 6 months has produced zero measurable incremental volume. The A/B evidence is unambiguous.`,
    followUps: ["If we terminate, what's the redistribution plan for Rs6.2 Cr?", "Why has this been running for 6 months without review?"],
  },
  "If we terminate, what's the redistribution plan for Rs6.2 Cr?": {
    agents: ["Budget Optimizer"], sources: ["scheme"],
    body: `**Redistribution Plan: Rs6.2 Cr from TM-Q1-12 Termination**\n\nRanked by projected ROI:\n\n| Destination | Amount | Projected Impact | ROI |\n|---|---|---|---|\n| Holi acceleration (immediate) | Rs2.4 Cr | Complete the 75% undeployed Holi budget | 1.8x |\n| Bihar stressed distributor support | Rs1.5 Cr | Extend payment terms for 14 distributors | 3.5x |\n| 50 coolers in Lucknow suburbs | Rs0.14 Cr | Defend against Campa cooler offensive | 4.2x |\n| Maaza E.UP loading push | Rs1.2 Cr | Close the 43% pre-load gap vs last year | 2.1x |\n| Summer reserve (pre-positioned) | Rs1.0 Cr | Held for Campa counter-moves in April | - |\n| **Total** | **Rs6.24 Cr** | | **2.4x weighted avg** |\n\nThe Rs6.2 Cr currently generates 1.04x (near-zero). Redeployed as above, it generates 2.4x weighted average. That's a 130% improvement in trade spend productivity from a single decision.`,
    followUps: ["Execute this plan. What approvals do we need?", "What's the timeline for each redeployment?"],
  },
  "Why has this been running for 6 months without review?": {
    agents: ["Process Audit"], sources: ["scheme"],
    body: `**Scheme Review Gap: TM-Q1-12 (Rural Kirana Margin)**\n\nThis scheme originated in Oct 2025 as part of the Q3 Diwali activation package. It was designed as a 3-month scheme (Oct-Dec) but was auto-renewed for Q1 without a performance review because:\n\n1. **No termination trigger:** The scheme management system doesn't have automatic performance gates. Schemes renew unless someone actively stops them.\n\n2. **Distributor expectations:** 38 distributors are budgeting the Rs3/case into their margins. Termination requires 2-week notice per distributor agreement.\n\n3. **Volume attribution:** The scheme was attributed credit for W.UP's overall +7.2% growth, but that growth came from other factors (cooler bonus scheme, seasonal demand). No A/B control was established until Feb 2026.\n\n**Process recommendation for Q2:** Institute automatic 8-week review gates for all schemes. Any scheme below 1.10x uplift at the 8-week gate goes to mandatory review. No auto-renewal without RSM sign-off.`,
    followUps: ["How many other schemes are at risk of the same auto-renewal problem?"],
  },
  "Show the quarter-end loading spike pattern": {
    agents: ["Anomaly Analyzer"], sources: ["d365", "dms"],
    body: `**Distributor Vol Bonus (TM-Q1-13): Quarter-End Loading Pattern**\n\nThe Rs1.5 Cr quarterly slab creates predictable gaming behavior:\n\n| Week of Quarter | Avg Weekly Billing | vs Normal | Pattern |\n|---|---|---|---|\n| Weeks 1-8 | Rs8.2L/wk | Baseline | Normal ordering |\n| Weeks 9-10 | Rs9.1L/wk | +11% | Slight acceleration |\n| Weeks 11-12 | Rs14.8L/wk | +80% | Loading spike to cross Rs1.5 Cr slab |\n| Week 13 (post-quarter) | Rs4.2L/wk | -49% | Destocking after slab crossed |\n\nThis pattern repeated identically in Q3 2025 and Q4 2025. The scheme is not driving incremental demand. It's shifting the timing of orders to hit the slab threshold, then creating a post-quarter crater.\n\n**Downstream impact:** The loading spike fills distributor warehouses, but retailers don't suddenly sell more. Inventory sits for 2-3 weeks post-quarter, creating freshness issues for beverages. 3 retailers in Bundelkhand reported expired Maaza 200ml from Q3 loading.`,
    followUps: ["What scheme mechanic would actually work here?", "How does this affect retail freshness?"],
  },
  "What scheme mechanic would actually work here?": {
    agents: ["Scheme Designer"], sources: ["scheme", "dms"],
    body: `**Bundelkhand: Alternative Scheme Design**\n\nThe current quarterly slab fails because Bundelkhand has only 12 distributors covering 140 beats. Too few distributors for a volume slab to drive behavior change. The slab just subsidizes existing orders.\n\n**Recommended alternative: Beat-expansion bonus**\n- Rs500 per new beat activated (first billing event)\n- Rs200/month for each beat maintaining minimum 50 cases/wk for 3 consecutive months\n- No volume slab. Pure expansion incentive.\n\n**Why this works for Bundelkhand:** The territory's problem isn't volume per beat (which is average). It's coverage. 140 beats out of an estimated 220 addressable beats. The 80 unserved beats are in smaller towns where Campa is starting to appear. Activation-linked mechanics proved 1.42x in Bihar. Same principle applies here.\n\n**Projected cost:** Rs2.8 Cr/quarter (vs Rs3.8 Cr current). Projected uplift: 1.18-1.24x. 80% more efficient than current scheme.`,
    followUps: ["What's happening with Campa in Bundelkhand?"],
  },
  "What's happening with Campa in Bundelkhand?": {
    agents: ["Competitive Intelligence"], sources: ["nielsen", "dms"],
    body: `**Campa in Bundelkhand: Early Stage but Accelerating**\n\nNielsenIQ Campa WD in Bundelkhand: 18% (up from 6% in Q3 2025). Still early, but the growth rate is the fastest outside E.UP.\n\n**Where the impact shows in our data:** DMS secondary decline concentrated in 4 district HQ beats: Jhansi, Banda, Hamirpur, Lalitpur. Rural beats unaffected. This matches the E.UP pattern from 6 months ago where Campa entered through urban district HQs first.\n\n**What our data tells us:** SLMG's Thums Up velocity in Jhansi town beats dropped 8% MoM despite no scheme changes. CTS shows 4 outlets in Jhansi lost cooler purity in the last month. This is the same early-warning pattern we saw in Gorakhpur before the E.UP share collapse.\n\n**The current Bundelkhand scheme (vol bonus) does nothing to address this.** It gives distributors a quarterly slab while our volume erodes in district HQs. The beat-expansion alternative would at least activate the 80 unserved beats before competitive distribution reaches them.`,
    followUps: ["How long before Bundelkhand looks like E.UP?", "What's the intervention playbook from the E.UP experience?"],
  },
  "What's the redemption rate by urban vs rural?": {
    agents: ["Consumer Promo Analyzer"], sources: ["scheme", "dms"],
    body: `**Consumer Promo (TM-Q1-14): Redemption by Geography**\n\n| Segment | Bottles Sold | QR Scans | Redemptions | Rate | Issue |\n|---|---|---|---|---|---|\n| Urban GT (C.UP cities) | 1.2M | 142K | 98K | 8.2% | Decent but not target |\n| Semi-urban GT | 0.8M | 48K | 28K | 3.5% | Low smartphone adoption |\n| Rural GT | 1.4M | 22K | 8K | 0.6% | Near-zero, scheme not reaching target |\n| **Total** | **3.4M** | **212K** | **134K** | **3.9%** | **vs 22% target** |\n\n**72% of all redemptions come from urban GT.** But urban GT is only 35% of volume. The scheme was designed for rural repeat-purchase, but the QR-to-cashback mechanism requires smartphone + internet + UPI. Deep rural adoption of this flow is near-zero.\n\n**The Rs4.1 Cr is effectively a Rs2.9 Cr urban scheme.** Urban didn't need a consumer pull mechanic (demand is stable). Rural needed it but can't use it.\n\n**Fix:** Switch rural mechanic to under-the-cap prize (physical prize, no tech needed). Keep QR for urban. Estimated cost: Rs0.80/bottle for under-the-cap vs Rs1.00/bottle for QR cashback. Saves 20% and reaches the right audience.`,
    followUps: ["What would an under-the-cap mechanic cost?"],
  },
  "What would an under-the-cap mechanic cost?": {
    agents: ["Scheme Designer", "Cost Model"], sources: ["scheme"],
    body: `**Under-the-Cap Prize: Rural Thums Up**\n\n| Component | QR Cashback (current) | Under-the-Cap (proposed) | Delta |\n|---|---|---|---|\n| Cost per bottle | Rs1.00 | Rs0.80 | -20% |\n| Prize type | Rs10 mobile cashback | Instant: free bottle (1 in 8) | Physical, no tech |\n| Consumer effort | Scan QR > register > link UPI > claim | Open bottle, check cap | Near-zero |\n| Est. redemption (rural) | 0.6% | 12-15% (industry benchmark) | 20x improvement |\n| Projected uplift (rural) | Negligible | 1.15-1.20x | Meaningful |\n\n**Total scheme redesign cost:** Rs3.4 Cr for 90 days (vs Rs4.1 Cr currently). Saves Rs0.7 Cr AND reaches rural consumers.\n\n**Production consideration:** Under-the-cap requires modified bottle caps from the Trishundi line. Lead time: 3 weeks for cap tooling. Can be live by April 1 if approved this week. This aligns perfectly with summer peak timing.`,
    followUps: ["Can we get cap tooling done at Trishundi by April 1?"],
  },
  "Show all schemes ranked by uplift": {
    agents: ["Portfolio Analyzer"], sources: ["scheme", "dms"],
    body: `**All 14 Active Schemes Ranked by Uplift**\n\n| Rank | Scheme | Brand | Zone | Uplift | Spend | ROI | Action |\n|---|---|---|---|---|---|---|---|\n| 1 | Bihar outlet activation slab | TU | S. Bihar | 1.42x | Rs8.2 Cr | High | Renew + extend |\n| 2 | Uttarakhand tourism promo | Multi | Uttarakhand | 1.35x | Rs3.1 Cr | High | Renew |\n| 3 | TU cooler bonus | TU | C.UP | 1.28x | Rs7.8 Cr | High | Renew + expand |\n| 4 | Sprite MT visibility | Sprite | C.UP MT | 1.24x | Rs2.4 Cr | High | Extend to Kanpur |\n| 5 | Maaza summer pre-load | Maaza | All | 1.22x | Rs4.2 Cr | Med | Accelerate E.UP |\n| 6 | Kinley rural push | Kinley | Bihar | 1.19x | Rs1.8 Cr | High | Replicate |\n| 7 | Bihar seeding scheme | TU | N. Bihar | 1.14x | Rs6.8 Cr | Med | Fix anti-gaming |\n| 8 | E.UP defensive margin | TU | E.UP | 1.08x | Rs12.4 Cr | Low | Cap to cooler beats |\n| 9 | E.UP beat recovery slab | Multi | E.UP | 1.06x | Rs5.8 Cr | Low | Redesign threshold |\n| 10 | Consumer promo rural | TU | C.UP | 1.05x | Rs4.1 Cr | Low | Switch to under-cap |\n| 11 | Limca rural margin | Limca | C.UP | 1.04x | Rs2.8 Cr | Low | Terminate |\n| 12 | Rural kirana margin | Multi | W.UP | 1.04x | Rs6.2 Cr | Zero | **Terminate** |\n| 13 | Distributor vol bonus | Multi | Bundelkhand | 1.02x | Rs3.8 Cr | Zero | **Terminate** |\n| 14 | Holi activation | Multi | All UP | New | Rs1.2 Cr | TBD | Accelerate |\n\n**Summary:** Top 6 schemes (Rs27.5 Cr, 39% of spend) generate 82% of incremental volume. Bottom 3 (Rs12.8 Cr, 18% of spend) generate <3% of incremental. Clear termination and redeployment opportunity.`,
    followUps: ["Simulate: terminate bottom 3 and redeploy", "Which schemes should I renew for Q2?"],
  },
  "Simulate: terminate bottom 3 and redeploy": {
    agents: ["Budget Optimizer", "Scheme Simulator"], sources: ["scheme", "dms"],
    body: `**Simulation: Terminate TM-Q1-11, TM-Q1-12, TM-Q1-13**\n\nFreed budget: Rs2.8 + Rs6.2 + Rs3.8 = **Rs12.8 Cr**\n\nVolume lost from termination: ~5,000 cases/month (within statistical noise of zero)\n\n**Redeployment plan:**\n\n| Destination | Amount | New Cases/Month | Rationale |\n|---|---|---|---|\n| Cap E.UP defensive to cooler beats | -Rs5.2 Cr savings from TM-Q1-07 | -600 (net -7%) | Flip ROI from 0.91x to 1.48x |\n| Holi acceleration | Rs3.6 Cr | 85K in 10 days | Complete undeployed Holi budget |\n| Bihar distributor support | Rs2.0 Cr | Protects 180 beats | Prevent summer collapse |\n| Maaza E.UP loading | Rs1.5 Cr | 12K/mo | Close 43% pre-load gap |\n| Cooler deployment (50 units) | Rs0.14 Cr | 4,100/mo | Defend Lucknow suburbs |\n| Bundelkhand beat expansion | Rs2.8 Cr | 8,200/mo | Replace vol bonus with activation |\n| Summer reserve | Rs2.7 Cr | Held | Counter-Campa flexibility |\n| **Total redeployed** | **Rs12.8 Cr + Rs5.2 Cr E.UP savings** | **~110K inc. cases/mo** | |\n\n**Net impact:** From ~5K inc. cases/month (current bottom 3) to ~110K inc. cases/month. That's a 22x improvement in trade spend productivity. Budget-neutral.`,
    followUps: ["Execute this. What's the implementation sequence?", "What approvals are needed for the E.UP cap?"],
  },
  "Which schemes should I renew for Q2?": {
    agents: ["Portfolio Planner"], sources: ["scheme"],
    body: `**Q2 Scheme Renewal Recommendations**\n\n**Renew as-is (4 schemes):**\n- TM-Q1-01 Bihar activation slab (1.42x, working)\n- TM-Q1-02 Uttarakhand tourism (1.35x, seasonal)\n- TM-Q1-04 Sprite MT visibility (1.24x, extend to Kanpur)\n- TM-Q1-06 Kinley rural push (1.19x, replicate to E.UP)\n\n**Renew with modifications (3 schemes):**\n- TM-Q1-03 Cooler bonus: Add 50-unit Lucknow expansion\n- TM-Q1-09 Bihar seeding: Add anti-gaming controls (weekly caps, multi-SKU requirement)\n- TM-Q1-14 Consumer promo: Switch rural to under-the-cap, keep urban QR\n\n**Redesign (2 schemes):**\n- TM-Q1-07 E.UP defensive: Cap to cooler beats only (saves Rs5.2 Cr)\n- TM-Q1-08 E.UP beat recovery: Raise slab threshold, add pass-through audit\n\n**Terminate (3 schemes):**\n- TM-Q1-11 Limca rural margin (1.04x, wrong mechanic)\n- TM-Q1-12 Rural kirana margin (1.04x, zero effect)\n- TM-Q1-13 Distributor vol bonus (1.02x, gaming behavior)\n\n**New for Q2 (2 schemes):**\n- Bundelkhand beat expansion (replace vol bonus)\n- Wedding season activation (1.25L and 2L focus, Apr-Jun)`,
    followUps: ["Build the full Q2 scheme portfolio with budget allocations"],
  },
  "Build the Holi activation plan with zone-level detail": {
    agents: ["Activation Planner"], sources: ["scheme", "dms"],
    body: `**Holi Activation Plan (TM-Q1-10): Zone Deployment**\n\nHoli: March 14. Today: March 12. **2 days remaining.**\n\n| Zone | Budget | Deployed | Gap | Priority Action |\n|---|---|---|---|---|\n| Central UP | Rs1.4 Cr | Rs0.8 Cr (57%) | Rs0.6 Cr | Push party packs to Lucknow urban today |\n| Western UP | Rs1.2 Cr | Rs0.6 Cr (50%) | Rs0.6 Cr | Load 1.25L family packs via top 10 distributors |\n| Eastern UP | Rs0.8 Cr | Rs0.1 Cr (13%) | Rs0.7 Cr | Critical: salesmen not pushing Holi SKUs due to TU defensive focus |\n| Bihar | Rs0.6 Cr | Rs0.2 Cr (33%) | Rs0.4 Cr | Buxar and Patna distributors need TU 1.25L stock |\n| Uttarakhand | Rs0.4 Cr | Rs0.3 Cr (75%) | Rs0.1 Cr | On track. Hill station tourism demand pulling. |\n| Bundelkhand | Rs0.4 Cr | Rs0.2 Cr (50%) | Rs0.2 Cr | Focus on Jhansi and Banda district HQs |\n\n**Emergency ask:** E.UP needs dedicated salesman push TODAY. The defensive scheme workload has crowded out Holi loading. Recommend: ASM issues one-day directive to prioritize Holi party pack loading across all E.UP routes tomorrow (Mar 13). If the Rs0.7 Cr E.UP gap isn't closed by end of day Mar 13, we lose the stocking window.\n\nLast year's Holi delivered 1.82x uplift and Rs3.2 Cr spend. We're at Rs1.2 Cr of Rs4.8 Cr. Every hour matters now.`,
    followUps: ["Draft the ASM directive for E.UP Holi push", "What's the hour-by-hour loading target for Mar 13?"],
  },
  "Summer peak readiness checklist": {
    agents: ["Readiness Tracker"], sources: ["dms", "d365", "scheme"],
    body: `**Summer Peak Readiness: Status as of Mar 12**\n\nSummer peak (Apr 1 - Jun 30) = 45% of annual volume. 20 days to activation.\n\n| Item | Status | Owner | Risk |\n|---|---|---|---|\n| Trishundi ASSP line at 85% | 62% (behind) | Production | High: raw material 3 days late |\n| Buxar plant ramp to 65% | 40% (on pace) | Production | Low |\n| Maaza pre-load complete | 62% deployed | Trade | High in E.UP (28%) |\n| Bihar distributor health | 14 stressed | Distribution | High: summer volume at risk |\n| E.UP defensive scheme redesign | Not started | Trade | High: budget exhausts Apr 2 |\n| Cooler deployment (50 Lucknow) | Pending approval | Field | Medium |\n| Holi activation complete | 25% (critical) | Trade | Critical: 2 days left |\n| Wedding season scheme designed | Drafted | Trade | Low |\n| Campa counter-scheme ready | Not designed | Trade | High: Campa will counter in week 1 |\n| Q2 scheme portfolio approved | In review | RSM | Medium |\n\n**Overall readiness: 45%.** Three critical items need resolution this week: Holi (2 days), Trishundi production (raw material), and E.UP budget (exhaustion Apr 2). Without these three, summer peak starts 15-20% below potential.`,
    followUps: ["What's the cost of being 15% below potential at summer peak?", "Priority-rank the top 5 items for this week"],
  },
  "What micro-market events are in the next 30 days?": {
    agents: ["Event Calendar"], sources: ["sfa"],
    body: `**Micro-Market Events: Mar 12 - Apr 12**\n\n| Date | Event | Location | Est. Footfall | SKU Focus | Scheme |\n|---|---|---|---|---|---|\n| Mar 14 | Holi | All UP + Bihar | 2-3x normal | Party packs, RGB | TM-Q1-10 active |\n| Mar 18-22 | Sonepur Mela | N. Bihar | 50K+ daily | ASSP, Kinley sachet | Geo-triggered |\n| Mar 25-28 | Deva Sharif Urs | Barabanki (C.UP) | 100K+ daily | ASSP, Kinley 1L | Geo-triggered |\n| Apr 1-7 | Chaitra Navratri | All zones | 1.3x normal | Maaza, Kinley (no meat = juice demand) | Summer activation |\n| Apr 5-8 | Ram Navami | Ayodhya | 200K+ daily | ASSP, Kinley, Maaza | Special: mobile vending |\n| Apr 6 | IPL starts | Urban, MT | 1.2-1.4x urban | TU 600ml, party packs | Visibility |\n\n**Ayodhya Ram Navami (Apr 5-8) is the biggest hyperlocal event.** 200K+ daily visitors. SLMG's Ayodhya plant is 15 km away. Perfect logistics for mobile vending. Last year: Rs18L revenue in 4 days from temporary distribution points. This year estimate: Rs25L with better positioning.\n\nThe Sonepur Mela (Bihar) and Deva Sharif Urs (Barabanki) are both within SLMG plant territories, meaning logistics cost is minimal.`,
    followUps: ["Build the Ayodhya Ram Navami activation plan", "What's the mobile vending setup needed for Sonepur Mela?"],
  },
  "Can we extend the combo to include Kinley?": {
    agents: ["Scheme Designer"], sources: ["scheme", "dms"],
    body: `**Uttarakhand Tourism Combo: Adding Kinley**\n\nCurrent combo: TU 600ml + Maaza 200ml at Rs45 (vs Rs55 unbundled). 42% attach rate.\n\n**Option: TU 600ml + Maaza 200ml + Kinley 500ml at Rs55 (vs Rs70 unbundled)**\n\nProjection: Attach rate drops from 42% to 28-30% (3-item combos have lower conversion). But revenue per combo increases from Rs45 to Rs55 (+22%). Net: slightly positive. Kinley adds Rs2.1L/month in the 210 beats.\n\nHowever, the hill station water market is already dominated by Kinley at 68% share. Adding Kinley to the combo doesn't fight a competitive battle, it just bundles an already-strong SKU. **Better use of the combo slot: replace Maaza 200ml with Maaza 600ml for a premium bundle (Rs65) targeting tourist families.** Higher margin, higher basket, addresses a real gap.`,
    followUps: ["Model the premium family bundle at Rs65"],
  },
  "Which hill station clusters are driving the most uplift?": {
    agents: ["Geo Analyzer"], sources: ["dms", "sfa"],
    body: `**Uttarakhand Tourism: Uplift by Cluster**\n\n| Cluster | Beats | Uplift | Vol/Beat/Wk | Key Driver |\n|---|---|---|---|---|\n| Mussoorie-Dehradun | 42 | 1.52x | 18.4 cases | Peak tourist footfall, Mall Road visibility |\n| Nainital-Bhimtal | 38 | 1.41x | 15.2 cases | Lake area outlets, combo working well |\n| Haridwar-Rishikesh | 45 | 1.38x | 16.8 cases | Pilgrim + tourist overlap, year-round |\n| Corbett corridor | 22 | 1.28x | 11.4 cases | Resort-only, seasonal |\n| Almora-Ranikhet | 28 | 1.14x | 8.2 cases | Lower tourist volume, local demand |\n| Valley towns | 35 | 1.08x | 6.8 cases | Not tourist-driven, baseline |\n\nMussoorie-Dehradun and Nainital-Bhimtal together account for 62% of the scheme's incremental volume despite being only 38% of beats. If budget were constrained, concentrating on these two clusters alone would deliver 1.46x uplift at 60% of current spend.`,
    followUps: ["Can we add temporary vending at Mussoorie Mall Road?"],
  },
  "What slab threshold would actually drive incremental?": {
    agents: ["Scheme Optimizer"], sources: ["dms", "scheme"],
    body: `**E.UP Beat Recovery (TM-Q1-08): Optimal Slab Analysis**\n\nCurrent slab: Rs22/case kicks in at any volume in declining beats. Problem: distributors cross the slab on baseline.\n\n**Modeled alternatives:**\n\n| Threshold | Est. Qualifying Dist. | Projected Uplift | Cost | Net ROI |\n|---|---|---|---|---|\n| Current (any volume) | 18/18 (all) | 1.06x | Rs5.8 Cr | 0.62x |\n| >110% of trailing 4wk avg | 12/18 | 1.14x | Rs4.2 Cr | 1.18x |\n| >120% of trailing 4wk avg | 8/18 | 1.22x | Rs3.1 Cr | 1.64x |\n| >130% of trailing 4wk avg | 5/18 | 1.28x | Rs2.2 Cr | 1.92x |\n\nThe 120% threshold is the sweet spot: high enough to require genuine incremental effort, low enough that most distributors can realistically achieve it. Saves Rs2.6 Cr vs current and nearly triples ROI.\n\nThe 6 distributors who fall below the new threshold are the ones in 65%+ Campa WD beats where no slab will work.`,
    followUps: ["Implement the 120% threshold. What's the process?"],
  },
  "Show uplift by beat for this scheme": {
    agents: ["Beat Analyzer"], sources: ["dms"],
    body: `**E.UP Beat Recovery (TM-Q1-08): Beat-Level Uplift**\n\n86 enrolled beats sorted by uplift:\n\n**Positive uplift (32 beats):** Average 1.18x. These beats have Campa WD below 45% and salesman visit compliance above 80%. The slab incentive reinforces existing execution quality.\n\n**Flat/zero uplift (40 beats):** Average 1.02x. Campa WD 45-60%. The slab payment goes to distributor but doesn't change consumer behavior. Baseline volume continues regardless.\n\n**Negative uplift (14 beats):** Average 0.94x. Campa WD above 60%. Volume declining despite the Rs22/case. These are the same 14 beats flagged in the E.UP defensive scheme analysis. No amount of margin will hold these beats.\n\nThe 32 positive-uplift beats alone justify a targeted scheme at Rs2.4 Cr (vs Rs5.8 Cr currently). The other 54 beats are waste.`,
    followUps: ["Restructure this scheme to cover only the 32 positive beats"],
  },
  "What if we replaced this with a cooler deployment scheme?": {
    agents: ["Scheme Simulator"], sources: ["scheme", "dms"],
    body: `**Simulation: Replace E.UP Beat Recovery Slab with Cooler Deployment**\n\nCurrent: Rs5.8 Cr on Rs22/case slab across 86 beats. Uplift: 1.06x.\n\n**Alternative: Deploy 120 coolers in the 32 beats where slab shows positive uplift**\n\n| Item | Cost |\n|---|---|\n| 120 Visi-coolers | Rs30L (Rs25K each) |\n| Installation | Rs3.6L |\n| Annual maintenance | Rs6L |\n| Cooler exclusivity bonus (Rs10/case) | Rs3.2 Cr/year |\n| **Total Year 1** | **Rs3.6 Cr** |\n\nProjected uplift in cooler beats: 1.28x (based on TM-Q1-03 cooler bonus data from Central UP). That's +22 pts vs the current 1.06x slab.\n\nCapital deployment (coolers) creates a structural advantage that the slab can't match. The cooler stays in the outlet. The slab expires. Rs3.6 Cr vs Rs5.8 Cr with dramatically better long-term ROI.`,
    followUps: ["How quickly can we get 120 coolers deployed?"],
  },
  "Show uplift excluding the 3 flagged distributors": {
    agents: ["Clean Data Analyzer"], sources: ["dms", "scheme"],
    body: `**Bihar Seeding (TM-Q1-09): Clean Uplift Analysis**\n\nTotal: 28 distributors. Flagged for gaming: 3 (Sharma Beverages, Gaya Sales Corp, Buxar Distributors).\n\n| Segment | Distributors | Uplift | Spend | ROI |\n|---|---|---|---|---|\n| All 28 (as reported) | 28 | 1.14x | Rs6.8 Cr | 1.42 |\n| **Excluding 3 flagged** | **25** | **1.22x** | **Rs4.6 Cr** | **1.84** |\n| The 3 flagged only | 3 | 0.88x | Rs2.2 Cr | 0.61 |\n\nThe 3 flagged distributors are dragging the scheme average down by 8 pts. Without them, this is a strong 1.22x scheme. The Rs2.2 Cr spent on the 3 flagged distributors actually has negative ROI (0.88x) because their volume spike was loading, not demand.\n\n**Action:** Freeze the 3, keep the 25. Scheme ROI jumps from 1.42 to 1.84. Saves Rs2.2 Cr of waste.`,
    followUps: ["What anti-gaming controls should we add for Q2?"],
  },
  "What anti-gaming controls should we add for Q2?": {
    agents: ["Scheme Designer", "Process Audit"], sources: ["scheme"],
    body: `**Anti-Gaming Controls for Q2 Volume Slabs**\n\nFour controls based on the Bihar slab gaming pattern:\n\n1. **Weekly caps:** No single-week billing can exceed 150% of trailing 4-week average. Prevents quarter-end spikes.\n\n2. **Multi-SKU requirement:** Slab qualification requires minimum 3 SKU categories in the order. Prevents single-SKU concentration (the flagged distributors loaded 88% TU 600ml).\n\n3. **Secondary confirmation:** Slab payout held for 14 days. Released only if SFA confirms corresponding secondary offtake in the distributor's beats. No secondary pull-through = no payout.\n\n4. **Inventory ceiling:** Distributors above 12 days inventory cover are auto-excluded from slab until inventory normalizes.\n\nImplementation cost: Rs0 (system configuration changes in scheme management). Timeline: 5 days for rule setup, effective Q2 Day 1.`,
    followUps: ["Can we retroactively apply control #3 to the current Q1 claims?"],
  },
  "Which zones haven't started Holi loading?": {
    agents: ["Activation Tracker"], sources: ["dms"],
    body: `**Holi Loading Status: Mar 12 (2 days to Holi)**\n\n| Zone | Party Packs Loaded | % of Target | Status |\n|---|---|---|---|\n| Uttarakhand | 8,200 cases | 75% | On track |\n| Central UP | 14,400 cases | 57% | Behind |\n| Western UP | 11,800 cases | 50% | Behind |\n| Bihar | 6,200 cases | 33% | Slow |\n| Bundelkhand | 3,400 cases | 50% | Behind |\n| **Eastern UP** | **2,100 cases** | **13%** | **Critical** |\n\nE.UP at 13% is the emergency. Salesmen are focused on Thums Up defensive scheme execution and haven't pushed Holi party packs. The ASM needs to issue a one-day directive: all routes tomorrow (Mar 13) prioritize Holi loading. Bihar is also slow because Buxar plant is still ramping 1.25L production.\n\nIf E.UP and Bihar don't load by end of day Mar 13, those zones miss Holi entirely. Last year E.UP contributed Rs0.6 Cr of Holi volume.`,
    followUps: ["Draft the ASM directive for tomorrow"],
  },
  "What's the risk if we don't fully deploy by Mar 13?": {
    agents: ["Risk Modeler"], sources: ["dms", "scheme"],
    body: `**Holi Under-Deployment Risk**\n\nCurrent deployment: 25% of Rs4.8 Cr budget. If we don't fully deploy by end of Mar 13:\n\n| Scenario | Revenue Impact | Notes |\n|---|---|---|\n| Deploy 80%+ by Mar 13 | -5% vs plan | Minor shortfall, recoverable |\n| Deploy 50-80% by Mar 13 | -25% vs plan | Rs1.2-2.0 Cr below Holi '25 |\n| Deploy <50% (current pace) | -45% vs plan | Rs2.4 Cr below Holi '25 |\n\nAt current 25% pace, we're headed for the worst-case scenario. The shelf stocking window for Holi is Mar 12-13. Retailers buy party packs 1-2 days before the festival. If our distributors haven't loaded by Mar 13 evening, the shelf space goes to Campa or PepsiCo.\n\n**The Rs3.6 Cr undeployed doesn't just miss Holi. It also means the party pack inventory sits at the plant.** 1.25L PET shelf life is 6 months, so no spoilage risk, but the working capital is tied up until the next occasion (wedding season in April).`,
    followUps: ["Build the Holi activation plan with zone-level detail"],
  },
  "What would a Limca visibility scheme cost instead?": {
    agents: ["Scheme Designer"], sources: ["scheme", "dms"],
    body: `**Limca Visibility Scheme: MT + Urban GT**\n\nReplace current TM-Q1-11 (Rs4/case flat margin, rural GT) with a visibility scheme targeting the channel where Limca is actually declining:\n\n| Component | Outlets | Monthly Cost | Mechanic |\n|---|---|---|---|\n| MT secondary placement | 180 stores | Rs1.44L | End-cap + checkout (matching Sprite TM-Q1-04 mechanic) |\n| Urban GT branding | 400 outlets | Rs2.0L | Shelf strips + counter mat + Limca poster |\n| Cooler purity bonus | 120 cooler outlets | Rs0.6L | Rs8/case for Limca cooler-share >25% |\n| **Total monthly** | **700 outlets** | **Rs4.04L** |\n| **Total quarterly** | | **Rs12.12L (Rs1.2 Cr)** |\n\nCurrent scheme: Rs2.8 Cr for 1.04x uplift in rural (where Limca is flat, no competitive pressure).\nProposed: Rs1.2 Cr for estimated 1.18-1.24x uplift in urban MT+GT (where Limca is declining -6.8% QoQ).\n\nSaves Rs1.6 Cr AND addresses the actual channel where the problem is. TM-Q1-04 Sprite visibility (same mechanic, same stores) is the direct precedent at 1.24x.`,
    followUps: ["If we terminated the rural margin, what volume would we actually lose?"],
  },
  "Show Limca vs Lahori velocity by outlet type": {
    agents: ["Category Analyzer"], sources: ["dms", "nielsen"],
    body: `**Limca Performance by Channel (Vxceed DMS)**\n\n| Channel | Limca Cases/Outlet/Wk | QoQ Trend | Scheme Active? |\n|---|---|---|---|\n| Lucknow MT | 4.2 | -6.8% QoQ | No visibility scheme |\n| Lucknow Urban GT | 2.8 | -4.2% QoQ | No visibility scheme |\n| C.UP Semi-Urban GT | 3.4 | +1.2% QoQ | TM-Q1-11 margin (Rs4/case) |\n| C.UP Rural GT | 4.1 | Flat | TM-Q1-11 margin (Rs4/case) |\n\n**The decline is urban, not rural.** Limca is losing share in exactly the channels where we have zero visibility investment (Lucknow MT and Urban GT). In rural GT where TM-Q1-11 runs, Limca is flat, but there's no competitive pressure there to begin with.\n\n**NielsenIQ context:** Flavored soda category grew 48% YoY in UP urban. The category is expanding fastest in MT and urban GT, exactly where Limca is declining. This isn't a Limca brand problem. It's a visibility gap in the channels where the category is growing.\n\n**The scheme-channel mismatch is clear:** Rs2.8 Cr of margin spend in rural (flat, no threat) while urban MT (-6.8%) and urban GT (-4.2%) get nothing. TM-Q1-04 Sprite visibility proves the fix works in these exact channels.`,
    followUps: ["What would a Limca visibility scheme cost instead?"],
  },
  "If we terminated this, what volume would we actually lose?": {
    agents: ["Impact Modeler"], sources: ["dms"],
    body: `**Limca Rural Margin (TM-Q1-11): Termination Impact**\n\nCurrent: 22 distributors, 240 beats, Rs2.8 Cr, 1.04x uplift.\n\nThe 1.04x uplift means incremental volume of ~1,800 cases/month. But this needs context:\n\n**A/B analysis (limited but indicative):**\nComparing 5 distributors who were late joining the scheme (started Feb vs Jan) against the 17 who started in Jan. The late-starters showed identical volume trends during their non-scheme period. No discernible difference.\n\n**Projected loss from termination:** 0-800 cases/month. The wide range reflects uncertainty, but even the worst case (800 cases) at Rs42/case = Rs3.4L/month revenue. The scheme costs Rs93L/month. ROI is 0.04x in the worst case.\n\n**Recommendation:** Terminate. Even if we lose the full 800 cases (unlikely based on A/B data), the Rs2.8 Cr is 35x more valuable deployed elsewhere. Use 2-week notice period per distributor agreements.`,
    followUps: ["Terminate and redeploy. What's the plan?"],
  },
  "Show which beats have the highest redemption rates": {
    agents: ["Consumer Analytics"], sources: ["scheme", "dms"],
    body: `**Consumer Promo (TM-Q1-14): Redemption by Beat**\n\n**Top 20 beats by redemption rate (all urban GT):**\nHazratganj (18%), Aminabad (16%), Gomti Nagar (15%), Aliganj (14%)... All Lucknow city center beats with high smartphone penetration and young consumer base.\n\n**Bottom 40 beats by redemption rate (all deep rural):**\nAll below 0.5%. These are beats in Hardoi, Unnao, Rae Bareli rural where smartphone + internet + UPI adoption is 12-15% of adult population. The QR mechanic is structurally unable to reach these consumers.\n\n**The geographic split is absolute:** Urban beats (80 beats): 8.2% avg redemption. Rural beats (160 beats): 0.6% avg redemption.\n\nThe scheme is effectively an urban-only program despite being designed and budgeted for rural. The Rs2.7 Cr allocated to rural beats is generating near-zero consumer engagement. Switch rural to under-the-cap (no tech required) and keep QR for the 80 urban beats where it's working.`,
    followUps: ["What would an under-the-cap mechanic cost?"],
  },
};

/* ═══ BRIEF DATA ═══ */
const briefCards = [
  {
    id: "eup", sev: "critical", type: "SPEND TRAP", scope: "Eastern UP",
    hl: "Eastern UP is losing ground despite being the highest-spend zone",
    sum: "Volume declining for the third consecutive month while trade spend runs 28% over budget. Secondary sales in 14 beats collapsed. Distributor fill rates falling. Every additional rupee yields diminishing returns.",
    kpis: [{ l: "Volume", v: "8.1M", d: "-4.2%", b: 1 }, { l: "Spend", v: "₹24 Cr", d: "128% of plan", b: 1 }, { l: "Efficiency", v: "2.71", d: "-21% MoM", b: 1 }, { l: "Share", v: "49.1%", d: "-7.8 pts", b: 1 }],
    ev: [{ s: "dms", t: "Secondary sales down 4.2% MoM. Third consecutive decline. Concentrated in 14 beats south of Gorakhpur. Thums Up 600ml PET hardest hit (-8.2%), while 250ml ASSP holding flat. Maaza 200ml Tetra declined 12% in same beats." }, { s: "scheme", t: "Spend/case: ₹296 - highest across all zones, 2.8x the Uttarakhand benchmark. Thums Up accounts for 74% of E.UP scheme spend but only 58% of volume." }, { s: "sfa", t: "Visit compliance dropped to 76% in declining beats. Route restructuring last quarter reassigned salesmen in 42 beats. CTS data shows cooler purity below 50% in 12 of the declining distributors." }, { s: "nielsen", t: "Campa WD jumped 38% to 61% in 6 months. Fastest build-out in any SLMG zone. Campa 250ml at ₹10 directly competing with Thums Up ASSP." }],
    dec: { act: "Concentrate spend on 168 cooler-equipped beats with secondary still above 500 cases/wk. Redirect ₹5.2 Cr from the 42 lowest-performing distributors (incl. Sharma Traders GKP, Verma Agencies DEO, Tiwari Sales DEO) to a targeted Thums Up 600ml PET + 250ml ASSP visibility scheme in defensible Gorakhpur urban and Varanasi beats. Precedent: Capping TM-Q1-03 cooler bonus to cooler beats only in C.UP delivered 1.28x uplift vs 1.08x in non-cooler beats, same pattern expected here.", why: "The bottom 112 non-cooler beats are in areas where Campa WD exceeds 60% and RCPL has dedicated distributors offering ₹18/case retailer margin plus free coolers. Cooler-equipped beats still show 1.22x uplift in DMS data because the cooler creates brand visibility that the margin alone cannot. TM-Q1-03 in C.UP proves this: cooler beats 1.42x uplift, non-cooler 1.08x. Same mechanic, same logic.", imp: "Defend ~62,000 cases/month in cooler beats. Efficiency gain: +0.8 cases/₹. Save ₹5.2 Cr for redeployment to Bihar summer pre-positioning.", conf: "High", time: "7 days to deploy. 3 weeks to measure." },
    trail: [{ a: "Volume Analyzer", q: "Secondary sales by beat, E.UP, 12 wks", f: "14 beats in Gorakhpur-Deoria: sustained >15% decline. Distributor fill rate 94%. Demand-side driven, not supply.", s: "dms" }, { a: "Spend Efficiency", q: "Trade spend vs volume, by distributor", f: "Bottom decile distributors: spend +42%, vol -28%. Top quartile: spend +8%, vol flat.", s: "scheme" }, { a: "Competitive Signal", q: "Campa WD, E.UP, 4 Nielsen cycles", f: "WD: 38 -> 44 -> 52 -> 61%. Fastest WD build-out across any SLMG territory. Correlates with our secondary decline in the same beats.", s: "nielsen" }, { a: "Field Execution", q: "Visit compliance and route history, E.UP", f: "Beats with >80% visit compliance: -14% decline. Beats <80%: -24%. Execution is compounding the competitive pressure.", s: "sfa" }, { a: "Scheme Benchmarker", q: "TM-Q1-03 cooler bonus performance by beat type", f: "C.UP cooler bonus: cooler beats 1.42x uplift, non-cooler beats 1.08x. 34 pt gap. Cooler infrastructure creates a defensible advantage that margin alone does not. This is the basis for the cap recommendation.", s: "scheme" }, { a: "Synthesis", q: null, f: "Eastern UP is bifurcating. Concentrate on defensible cooler-equipped beats (proven 1.22-1.42x uplift in similar schemes). Concede non-cooler beats in Campa-dense territory.", s: null }],
    qs: ["What if we increase rural margin by ₹3/case in the top 80 distributors?", "Show me the 14 declining beats in detail", "Which beats with coolers are closest to flipping?"],
  },
  {
    id: "lahori", sev: "warn", type: "CATEGORY THREAT", scope: "Central UP · Lucknow",
    hl: "Limca + Sprite declining 6.8% QoQ in Lucknow MT while zone grows 11.8%. Scheme-threat mismatch.",
    sum: "Central UP overall is growing, but Limca and Sprite are losing ground specifically in Lucknow urban MT. NielsenIQ shows flavored soda as the fastest-growing sub-category in UP. The only active Limca scheme is a ₹4/case margin in rural GT, where there is no competitive pressure. Urban MT, where the decline is concentrated, has no visibility investment.",
    kpis: [{ l: "Limca+Sprite MT", v: "-6.8%", d: "QoQ decline", b: 1 }, { l: "Flavored Soda", v: "+48%", d: "YoY, UP urban", b: 0 }, { l: "Zone Overall", v: "+11.8%", d: "C.UP growing", b: 0 }, { l: "Limca Scheme", v: "Margin", d: "Rural only", b: 1 }],
    ev: [{ s: "dms", t: "Limca + Sprite in Lucknow urban MT: -6.8% QoQ. Central UP zone overall: +11.8%. The decline is channel-specific (MT) and geography-specific (Lucknow urban), not a broad volume issue." }, { s: "nielsen", t: "Flavored soda category grew 48% YoY in UP urban per NielsenIQ Jan audit. Coca-Cola portfolio losing ~3.6 pts share across SLMG territories. New entrants growing at the ₹10 price point." }, { s: "scheme", t: "Only active Limca scheme (TM-Q1-11): ₹4/case flat margin in rural GT. Zero visibility or placement spend in urban MT where the decline is happening. TM-Q1-04 Sprite visibility (180 MT stores, ₹800/outlet) is delivering 1.24x but only covers Sprite, not Limca." }],
    dec: { act: "Extend the TM-Q1-04 Sprite visibility mechanic to include Limca. Add secondary placement at ₹800/outlet/month in the same 180 Lucknow MT outlets (DMart, Spencer's, Reliance Fresh). Fund from TM-Q1-11 Limca rural margin scheme (₹2.8 Cr currently yielding 1.04x in rural where no competitive pressure exists). Precedent: TM-Q1-04 Sprite MT visibility is already delivering 1.24x uplift with this exact mechanic in these exact stores.", why: "TM-Q1-04 proves secondary placement works in Lucknow MT. Sprite is holding in stores where it has placement but declining where it doesn't. Limca has no placement anywhere in MT. The rural margin scheme spends ₹2.8 Cr defending territory with no competitive pressure while the urban territory under pressure gets nothing.", imp: "Recover 30-40% of lost urban MT volume. ₹8-10 Cr annual revenue at risk if Lucknow MT position erodes further. TM-Q1-04 precedent suggests 1.18-1.24x uplift achievable.", conf: "Medium", time: "10 days to deploy (replicating existing TM-Q1-04 mechanic). 4 weeks to measure." },
    trail: [{ a: "Volume Analyzer", q: "Limca+Sprite secondary sales, Lucknow MT vs rest of C.UP", f: "Lucknow MT: -6.8% QoQ. Rest of C.UP: +11.8%. Decline is isolated to urban MT channel, not a broad Limca/Sprite problem.", s: "dms" }, { a: "Category Analyzer", q: "Flavored soda vs CSD, UP urban, NielsenIQ", f: "+48% YoY category growth. New entrants capturing occasions Coca-Cola portfolio doesn't address. Share shift concentrated at ₹10 price point.", s: "nielsen" }, { a: "Scheme Benchmarker", q: "TM-Q1-04 Sprite MT visibility performance", f: "Same mechanic (₹800/outlet/month secondary placement) running in 180 C.UP MT stores since Feb 15. Delivering 1.24x uplift for Sprite. This is the direct precedent: same stores, same channel, same mechanic. Extending to Limca is low-risk replication.", s: "scheme" }, { a: "Synthesis", q: null, f: "Scheme-threat mismatch. ₹2.8 Cr defending rural (no threat) while urban MT (under pressure) gets zero. TM-Q1-04 proves the fix works. Replicate for Limca.", s: null }],
    qs: ["What would a Sprite visibility blitz cost across all Lucknow MT?", "Compare Limca velocity in GT vs MT outlets"],
  },
  {
    id: "bihar", sev: "watch", type: "GROWTH RISK", scope: "Bihar",
    hl: "Bihar growing 20%+ but 14 distributors stressed heading into summer",
    sum: "11.6M cases, 480+ beats activated since territory takeover. Distributor working capital stretched. If they pull back in April, SLMG loses the summer window.",
    kpis: [{ l: "Volume", v: "11.6M", d: "+19.8%", b: 0 }, { l: "Spend", v: "₹37.8 Cr", d: "120% of plan", b: 1 }, { l: "Stressed Dist.", v: "14 / 82", d: "Inv: 8->14 days", b: 1 }, { l: "Nielsen", v: "-", d: "No baseline", b: 1 }],
    ev: [{ s: "dms", t: "N. Bihar +18.3%, S. Bihar +22.1%. 480+ new beats activated." }, { s: "d365", t: "14 distributors: inventory days outstanding at 14 (target 8). Receivables climbing." }, { s: "scheme", t: "₹37.8 Cr vs ₹31.6 Cr budget. Over-indexing on market seeding schemes." }],
    dec: { act: "Extend payment terms from 7 to 12 days for the 14 stressed distributors (incl. Sharma Beverages Patna, Krishna Traders Muzaffarpur, Gaya Sales Corp, Buxar Distributors, Singh & Sons Bhagalpur). Cap primary loading at 110% of trailing secondary to prevent inventory bloat. Priority: secure the 5 distributors serving 180 beats in N. Bihar before summer.", why: "Buxar plant just inaugurated Mar 1. Distribution logistics still stabilizing. Summer peak drives 2.2-2.5x baseline volume. Working capital stress now means these distributors pull back at peak.", imp: "Protect 480+ beats and ₹28-35 Cr summer volume served by these distributors. ₹2.8 Cr working capital cost for 60 days.", conf: "High", time: "5 days for terms extension. Weekly monitoring via D365 receivables." },
    trail: [{ a: "Distribution Health", q: "Inventory + order freq, Bihar distributors", f: "14 of 82 distributors showing stress: inventory days outstanding at 14 (target 8). Receivables climbing. Order frequency dropping from 3.2x/wk to 2.1x/wk in last 4 weeks.", s: "d365" }, { a: "Seasonal Projector", q: "Summer peak volume multiplier, Bihar", f: "Bihar summer multiplier: 2.2-2.5x baseline based on N. India seasonal patterns. If 14 distributors pull back during peak, the 180 beats they serve go dark at the worst possible time.", s: "dms" }, { a: "Precedent Analyzer", q: "Past distributor retention interventions", f: "TM-Q1-06 Kinley rural push in Bihar: per-bottle incentive retained 22 new distributors through the initial cash-flow-negative period. 68% subsequently ordered sparkling SKUs. Payment term extension is the same principle applied to working capital stress.", s: "scheme" }, { a: "Synthesis", q: null, f: "Fix distribution health now. Buxar plant operational since Mar 1 means logistics are stabilizing, but distributors need working capital bridge to carry summer inventory. Payment extension + loading cap is low-cost insurance (₹2.8 Cr for 60 days) against ₹28-35 Cr at-risk volume.", s: null }],
    qs: ["List the 14 stressed distributors with beat coverage", "Simulate: what if 5 distributors go dark in April?"],
  },
  {
    id: "waste", sev: "warn", type: "SCHEME WASTE", scope: "Cross-territory",
    hl: "₹12.8 Cr across 3 schemes generating near-zero incremental volume",
    sum: "Uplift below 1.05x. ₹12.8 Cr subsidizing baseline volume that would exist without the scheme.",
    kpis: [{ l: "Waste", v: "3 / 14", d: "₹12.8 Cr", b: 1 }, { l: "Uplift", v: "1.04x", d: "vs 1.18 median", b: 1 }, { l: "Cost/Inc Case", v: "₹8,533", d: "vs ₹639 top", b: 1 }, { l: "Redeploy", v: "₹12.8 Cr", d: "~110K cases/mo", b: 0 }],
    ev: [{ s: "scheme", t: "TM-Q1-11 Limca rural: 1.04x uplift, declining 3 quarters running. TM-Q1-12 Rural kirana: 1.04x, control areas identical. TM-Q1-13 Distributor vol bonus: 1.02x, quarter-end loading pattern confirmed." }, { s: "dms", t: "Control areas in W.UP show same volume trends as TM-Q1-12 scheme beats. Brand mix unchanged: 62% Thums Up, 18% Sprite in both scheme and control. TM-Q1-13 showing 80% quarter-end loading spike in Bundelkhand with post-quarter -49% crater." }],
    dec: { act: "Terminate TM-Q1-12 (Rural kirana margin, W.UP, ₹6.2 Cr), TM-Q1-13 (Distributor vol bonus, Bundelkhand, ₹3.8 Cr), and TM-Q1-11 (Limca rural margin, C.UP, ₹2.8 Cr). Redistribute: ₹3.6 Cr to Holi acceleration, ₹2.0 Cr to Bihar distributor working capital support, ₹2.8 Cr to Bundelkhand beat-expansion scheme, ₹1.5 Cr to Maaza E.UP summer pre-load, ₹2.9 Cr to summer reserve for Campa counter-moves.", why: "Control beats show identical volume trends to scheme beats for all three. 13x efficiency gap between bottom 3 and top performers. Top 6 schemes generate 82% of incremental on 39% of spend.", imp: "~110K additional inc. cases/month vs ~5K currently. Budget-neutral. Weighted avg ROI jumps from 1.03x to 2.4x.", conf: "High", time: "Terminate this week. 2-week distributor notice per agreements. Redeployment starts within 7 days." },
    trail: [{ a: "Scheme Performance", q: "All active schemes ranked by uplift", f: "Bottom 3: TM-Q1-11 (1.04x), TM-Q1-12 (1.04x), TM-Q1-13 (1.02x). Combined ₹12.8 Cr = 18% of total scheme spend, generating <3% of incremental volume.", s: "scheme" }, { a: "A/B Validator", q: "Control vs scheme beats for TM-Q1-12", f: "85 control beats in adjacent W.UP territory show identical volume trends to 310 scheme beats. +2.9% scheme vs +1.8% control, p=0.34 (not significant). This is the clearest termination case: definitive A/B evidence of zero incremental.", s: "dms" }, { a: "Redeployment Modeler", q: "Where does the ₹12.8 Cr deliver best ROI?", f: "Top redeployment targets by projected ROI: Holi acceleration (1.8x), Bihar distributor support (3.5x), Bundelkhand beat expansion (1.42x, matching TM-Q1-01 Bihar activation mechanic). Weighted avg: 2.4x vs current 1.03x.", s: "scheme" }, { a: "Synthesis", q: null, f: "Clear arbitrage: ₹8,533/incremental case in bottom 3 vs ₹639 for TM-Q1-01 Bihar activation. 13x efficiency gap. A/B data is definitive for TM-Q1-12. Redeployment plan uses proven mechanics (Bihar activation slab delivered 1.42x).", s: null }],
    qs: ["Show all 14 schemes ranked by uplift with cost data", "Simulate: terminate bottom 3 and redeploy. Full impact model."],
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
  {
    id: "postpromo", sev: "warn", type: "POST-PROMO REVIEW", scope: "Thums Up - Feb Schemes",
    hl: "February Thums Up cooler scheme delivered 1.28x uplift but ROI fell 18% vs plan",
    sum: "Actual ROI at 2.1x vs 2.6x planned. Uplift strong in urban GT (1.42x) but rural dragged average (1.08x). Previous similar scheme Oct 2025 delivered 1.34x at lower cost.",
    kpis: [{ l: "Uplift", v: "1.28x", d: "vs 1.35x plan", b: 1 }, { l: "ROI", v: "2.1x", d: "vs 2.6x plan", b: 1 }, { l: "Cost/Inc Case", v: "Rs179", d: "+22% vs Oct", b: 1 }, { l: "Best Mkt", v: "C.UP Urban", d: "1.42x uplift", b: 0 }],
    ev: [{ s: "scheme", t: "Rural GT redemption at 14% vs 38% urban. Cooler bonus mechanic doesn't reach non-cooler rural beats." }, { s: "dms", t: "Urban GT secondary lifted 18% during scheme. Rural flat. Bihar over-indexed at 1.52x from small base." }, { s: "scheme", t: "Oct 2025 similar scheme: Rs7.8 Cr spend, 1.34x uplift, Rs147/case. Feb: Rs7.8 Cr, 1.28x, Rs179/case." }],
    dec: { act: "Split the scheme: continue cooler bonus in urban GT/MT. Replace with per-bottle margin in rural GT where coolers don't exist.", why: "One mechanic can't serve two channel realities. Urban wins on activation, rural needs price-point matching.", imp: "Projected blended uplift from 1.28x to 1.38x. ROI recovery to 2.4x.", conf: "Medium", time: "Next scheme cycle. 10 days to redesign." },
    trail: [{ a: "Scheme Evaluator", q: "Thums Up cooler bonus, Feb, all zones", f: "Overall 1.28x. Urban GT 1.42x. Rural GT 1.08x. Bihar 1.52x. E.UP 0.96x.", s: "scheme" }, { a: "Benchmark Agent", q: "Compare vs Oct 2025 Thums Up cooler bonus", f: "Oct: 1.34x at Rs147/case. Feb: 1.28x at Rs179/case. Rural beats added to Feb scheme diluted average.", s: "scheme" }, { a: "Channel Analyzer", q: "Redemption by channel, cooler vs non-cooler", f: "Cooler beats: 38% redemption. Non-cooler: 14%. Mechanic-channel mismatch.", s: "dms" }, { a: "Synthesis", q: null, f: "Scheme works in urban GT. Fails in rural. Split by channel.", s: null }],
    qs: ["Show Thums Up Feb scheme by territory and channel", "Compare all cooler schemes from last 12 months", "Design a rural-specific scheme for Thums Up ASSP"],
  },
  {
    id: "anomaly", sev: "critical", type: "ANOMALY DETECTED", scope: "N. Bihar - 3 Distributors",
    hl: "Abnormal primary loading at 3 Bihar distributors: 340% above trailing average in 1 week",
    sum: "Sharma Beverages (Patna), Gaya Sales Corp, and Buxar Distributors show single-week primary billing spikes of 280-410%. Pattern consistent with promo-led loading beyond consumption. Inventory days jumped from 8 to 22.",
    kpis: [{ l: "Spike", v: "340%", d: "1-week avg", b: 1 }, { l: "Inv Days", v: "22", d: "vs 8 target", b: 1 }, { l: "Flagged", v: "3 / 82", d: "Bihar dist.", b: 1 }, { l: "At Risk", v: "Rs4.2 Cr", d: "Scheme exposure", b: 1 }],
    ev: [{ s: "d365", t: "Sharma Beverages: ₹4,200 primary billing on Mar 8 vs trailing avg of ₹980/week. All Thums Up 600ml PET." }, { s: "scheme", t: "Bihar seeding scheme pays Rs18/case slab above 800 cases/week. All 3 crossed 3,000+ in a single load." }, { s: "dms", t: "No corresponding secondary offtake increase. Beat-level DMS orders flat. Inventory jumped to 22 days cover vs 8-day target." }],
    dec: { act: "Freeze further loading at these 3 until inventory normalizes to 10 days. Investigate whether scheme payout reached retailer level or was retained by distributor.", why: "Pattern matches promo-loading behavior. If scheme margin not passed to retailers, this is leakage.", imp: "Rs4.2 Cr scheme exposure. Clawback required if leakage confirmed.", conf: "High", time: "Freeze today. Investigation 5 days." },
    trail: [{ a: "Anomaly Detector", q: "Primary billing anomalies >200%, all zones, 4 weeks", f: "3 Bihar distributors flagged in D365 billing. Single-SKU concentration (Thums Up 600ml). All on Mar 8.", s: "d365" }, { a: "Scheme Validator", q: "Bihar seeding scheme, slab thresholds vs claims", f: "All 3 crossed slab on a single load. Claims: Rs54K-Rs75K per distributor.", s: "scheme" }, { a: "Inventory Monitor", q: "Days cover, flagged distributors, 8 weeks", f: "Steady 6-9 days for 7 weeks. Jumped to 19-24 on week 8.", s: "d365" }, { a: "Secondary Cross-Check", q: "DMS secondary for same distributors, same period", f: "No corresponding secondary spike. Beat-level orders flat. Loading is sitting at distributor warehouse.", s: "dms" }, { a: "Synthesis", q: null, f: "Promo-led primary loading with no secondary pull-through. Freeze + investigate.", s: null }],
    qs: ["Show the full loading pattern for Sharma Beverages", "Has this happened before with Bihar distributors?", "What is the clawback mechanism if leakage is confirmed?"],
  },
  {
    id: "fund", sev: "warn", type: "FUND OVERSPEND", scope: "Thums Up - E.UP",
    hl: "Thums Up trade accruals running Rs3.4 Cr over budget in Eastern UP",
    sum: "Accruals at Rs13.6 Cr vs Rs10.2 Cr budget (133%). Driven by defensive schemes against Campa. Budget exhausts 4 weeks before summer peak. Maaza E.UP underspent by Rs0.8 Cr.",
    kpis: [{ l: "Accruals", v: "Rs13.6 Cr", d: "133% of budget", b: 1 }, { l: "Overshoot", v: "Rs3.4 Cr", d: "Thums Up E.UP", b: 1 }, { l: "Exhaustion", v: "Apr 2", d: "4 wks pre-peak", b: 1 }, { l: "Maaza", v: "Rs0.8 Cr", d: "Underspent", b: 0 }],
    ev: [{ s: "scheme", t: "Thums Up accruals: Rs13.6 Cr claimed vs Rs10.2 Cr allocated. 3 defensive schemes running simultaneously in E.UP." }, { s: "scheme", t: "Maaza E.UP: Rs2.0 Cr vs Rs2.8 Cr budget (71%). Kinley: Rs2.8 Cr vs Rs3.0 Cr (93%)." }, { s: "d365", t: "At current accrual velocity, Thums Up E.UP budget exhausts by Apr 2. Summer peak starts Apr 15." }],
    dec: { act: "Reallocate Rs0.8 Cr from Maaza underspend to extend TU E.UP runway. Cap 2 of 3 defensive schemes to cooler-equipped beats only (as per Recommendation #1). Request Rs2.6 Cr supplementary for summer.", why: "Can't go dark on Thums Up during Campa expansion. But can't continue at 133% burn rate. Capping to cooler beats slows the burn while preserving the highest-ROI territory.", imp: "Extends TU E.UP budget from Apr 2 to mid-April. Supplementary needed for full summer.", conf: "Medium", time: "Reallocation: 3 days. Supplementary: 7 days." },
    trail: [{ a: "Fund Tracker", q: "Accruals vs budget, brand x zone", f: "Thums Up E.UP at 133%. Sprite E.UP at 122%. All other combos within 105%.", s: "scheme" }, { a: "Burn Rate", q: "Weekly accrual velocity, 8 weeks", f: "Accelerating: Rs1.8 Cr/wk in Feb vs Rs1.4 Cr/wk in Jan. At current pace, exhaustion: Apr 2.", s: "scheme" }, { a: "Cross-Brand", q: "Underspend by brand, E.UP", f: "Maaza: Rs0.8 Cr free. Kinley: Rs0.2 Cr.", s: "scheme" }, { a: "Synthesis", q: null, f: "Reallocate Maaza underspend. Cap schemes to cooler beats. Request supplementary.", s: null }],
    qs: ["Show accruals vs budget for all brand x zone combinations", "What if we cut the weakest Thums Up scheme?", "Project when each brand-zone budget exhausts"],
  },
  {
    id: "postpromo", sev: "warn", type: "POST-PROMO REVIEW", scope: "Thums Up · All Zones",
    hl: "Feb Thums Up 'Buy 2 Get 1' delivered 1.12x uplift vs 1.35x plan. ₹6.8 Cr spent.",
    sum: "Uplift fell short by 23 pts. ROI at 0.82 vs 1.4 plan. Strongest in Uttarakhand (1.28x), weakest in E.UP (0.91x). Compared to Nov 2025 similar event (1.31x), execution in rural GT deteriorated. Campa counter-scheme launched 4 days after activation in 3 zones.",
    kpis: [{ l: "Uplift", v: "1.12x", d: "vs 1.35x plan", b: 1 }, { l: "ROI", v: "0.82", d: "vs 1.4 plan", b: 1 }, { l: "Spend", v: "₹6.8 Cr", d: "102% of plan", b: 0 }, { l: "Inc. Vol", v: "81K", d: "vs 240K plan", b: 1 }],
    ev: [{ s: "scheme", t: "Uplift by zone: UK 1.28x, C.UP 1.18x, W.UP 1.14x, Bihar 1.08x, E.UP 0.91x. E.UP was the only zone below breakeven." }, { s: "dms", t: "Secondary pull-through was 62% of primary loading. Bihar and E.UP showed inventory build at distributor level, indicating promo-led loading rather than consumer pull." }, { s: "nielsen", t: "Campa ran a ₹5 off counter-scheme in E.UP and Bihar starting day 4. Partially neutralized the activation." }],
    dec: { act: "Split future Thums Up activations into urban and rural tracks. Rural: shift from B2G1 to price-point scheme (₹10 ASSP). Urban: retain B2G1 with visibility requirement. Exclude E.UP rural from next cycle until Campa response strategy is in place.", why: "B2G1 mechanic works in urban where consumer pull is strong. In rural, price-point competition from Campa makes B2G1 less effective. The ₹10 ASSP pack directly addresses the format where Campa is winning.", imp: "Projected uplift recovery to 1.25-1.30x range. Saves ₹1.4 Cr by excluding non-performing E.UP rural.", conf: "Medium", time: "Design revised scheme in 5 days. Deploy next cycle." },
    trail: [{ a: "Promo Evaluator", q: "Thums Up B2G1 Feb 2026, uplift by zone, vs plan, vs Nov 2025 event", f: "Overall 1.12x vs 1.35x plan. Nov 2025 similar event: 1.31x. Deterioration concentrated in rural GT.", s: "scheme" }, { a: "Volume Analyzer", q: "Secondary vs primary loading ratio, Feb promo period", f: "Pull-through 62%. Bihar and E.UP show distributor loading pattern, not consumer pull.", s: "dms" }, { a: "Competitive Signal", q: "Competitor promo activity during Feb Thums Up activation", f: "RCPL launched ₹5 off counter in E.UP and Bihar on day 4. Timed to neutralize.", s: "nielsen" }, { a: "Pack Mix Analyzer", q: "Volume split by pack size during promo vs pre-promo", f: "600ml PET drove 68% of uplift in urban. In rural, 250ml ASSP saw zero incremental. The B2G1 mechanic doesn't translate to the ₹10 price point.", s: "dms" }, { a: "Synthesis", q: null, f: "Mechanic mismatch: B2G1 works for urban 600ml, fails for rural where the battle is at ₹10. Split activation tracks.", s: null }],
    qs: ["Compare this promo to all Thums Up activations in the last 12 months", "What would a ₹10 ASSP price-point scheme have delivered instead?", "Show the Campa counter-scheme timeline overlaid on our daily uplift"],
  },
  {
    id: "anomaly", sev: "critical", type: "ANOMALY DETECTED", scope: "N. Bihar · 3 distributors",
    hl: "Abnormal primary loading: 3 Bihar distributors billed 340% above trailing average in 1 week",
    sum: "Sharma Beverages (Patna), Gaya Sales Corp, and Buxar Distributors loaded 3.4x their trailing 4-week average in the last 7 days. Pattern matches promo-led target loading rather than demand. Scheme pass-through to retailers unverified. SKU concentration in Thums Up 600ml PET only.",
    kpis: [{ l: "Loading Spike", v: "340%", d: "vs 4-wk avg", b: 1 }, { l: "Distributors", v: "3 / 82", d: "N+S Bihar", b: 1 }, { l: "SKU Conc.", v: "88%", d: "TU 600ml only", b: 1 }, { l: "Retailer Pass", v: "Unverified", d: "No SFA confirm", b: 1 }],
    ev: [{ s: "d365", t: "Primary billing for these 3 distributors: ₹4.2 Cr in 7 days vs ₹1.24 Cr trailing weekly average. Loading ratio 3.4x." }, { s: "sfa", t: "SFA visit data shows no corresponding increase in beat-level secondary orders. Salesman order patterns unchanged." }, { s: "scheme", t: "All 3 distributors are on a Q1 volume-slab scheme with a threshold at ₹15 Cr. Current cumulative: ₹13.8 Cr. Loading appears timed to cross the slab threshold before quarter end." }],
    dec: { act: "Cap additional primary billing at 120% of trailing secondary for these 3 distributors until SFA confirms retailer pull-through. Flag for audit: verify scheme benefit was passed to retailers. Review slab threshold design for next quarter.", why: "Pattern matches target-led loading to hit scheme slab. No secondary pull-through confirmation. Risk of inventory dumping post-quarter, scheme leakage, and fake billing.", imp: "Prevents ₹2.8 Cr of potentially wasted scheme payout. Protects scheme economics.", conf: "High", time: "Cap immediately. Audit within 5 days." },
    trail: [{ a: "Anomaly Detector", q: "Primary billing anomalies, Bihar, last 7 days", f: "3 distributors at 340% of trailing average. Statistical outlier (>3 sigma).", s: "d365" }, { a: "Cross-Reference", q: "SFA secondary orders for same distributors, same period", f: "No corresponding secondary spike. Beat-level orders flat. Loading is sitting at distributor warehouse.", s: "sfa" }, { a: "Scheme Analyzer", q: "Scheme slab thresholds for flagged distributors", f: "All 3 on volume slab with ₹15 Cr threshold. At ₹13.8 Cr. Loading timed to cross before March 31.", s: "scheme" }, { a: "SKU Concentration", q: "SKU mix in the anomalous loading", f: "88% Thums Up 600ml PET. Normal mix is 35% TU 600ml. Single-SKU concentration is a red flag for scheme gaming.", s: "dms" }, { a: "Synthesis", q: null, f: "Scheme-led loading, not demand-led. Cap billing. Audit pass-through. Redesign slab for Q2.", s: null }],
    qs: ["Show the daily loading pattern for these 3 distributors", "What's the scheme payout if they cross the ₹15 Cr slab?", "How many other distributors are within 10% of a slab threshold?"],
  },
  {
    id: "fund", sev: "warn", type: "FUND MANAGEMENT", scope: "Cross-territory · Q4 FY26",
    hl: "Trade promo accruals running ₹18 Cr ahead of budget pace. Thums Up x E.UP driving 39% of overspend.",
    sum: "Q4 FY26 (Jan-Mar) allocated: ₹436 Cr. Accrued to date: ₹362 Cr (83% used, 79% of quarter elapsed). At current velocity, Q4 closes at ₹458 Cr, ₹22 Cr over budget. Thums Up in E.UP accounts for ₹7 Cr of the projected overspend due to defensive scheme escalation against Campa.",
    kpis: [{ l: "Allocated", v: "₹436 Cr", d: "Q4 FY26", b: 0 }, { l: "Accrued", v: "₹362 Cr", d: "83% used, 79% elapsed", b: 1 }, { l: "Projected", v: "₹458 Cr", d: "+₹22 Cr over", b: 1 }, { l: "Top Driver", v: "TU x E.UP", d: "₹7 Cr over", b: 1 }],
    ev: [{ s: "scheme", t: "9 of 14 active schemes running within 5% of pace. 3 schemes in E.UP and 2 in Bihar account for 82% of overspend. Weekly velocity accelerating: ₹5.4 Cr/wk in Mar vs ₹4.8 Cr/wk in Feb." }, { s: "d365", t: "Accrual vs disbursement lag: ₹8.4 Cr accrued but not yet disbursed. Distributor claim processing averaging 14 days." }],
    dec: { act: "Freeze E.UP defensive scheme escalation at current levels. Redirect ₹5 Cr from terminated bottom-3 schemes (Recommendation #4) to Bihar summer pre-positioning. Net effect: projected overspend drops from ₹22 Cr to ₹9 Cr.", why: "E.UP defensive spending is yielding 0.91x ROI (below breakeven). Bihar summer spend delivers 3.5x. The reallocation improves both the budget position and the ROI.", imp: "₹13 Cr budget improvement. Bihar summer protection.", conf: "High", time: "Freeze this week. Reallocation deploys in 7 days." },
    trail: [{ a: "Budget Tracker", q: "Q4 FY26 accruals vs allocation by brand x zone", f: "Overall 83% used at 79% elapsed. E.UP Thums Up: 133% used. Bihar: 120% used. Uttarakhand: 91% used. 5 overspending schemes pulling the average above pace.", s: "scheme" }, { a: "Overspend Predictor", q: "Project Q4 close by zone at current velocity", f: "E.UP projected: ₹30.4 Cr vs ₹18.8 Cr budget (+₹11.6 Cr). Bihar: ₹47.8 Cr vs ₹31.5 Cr budget (+₹16.3 Cr). Others within budget or underspent. Recent weekly velocity in E.UP+Bihar accelerating.", s: "scheme" }, { a: "Synthesis", q: null, f: "Overspend is concentrated and addressable. Freeze E.UP escalation + terminate waste schemes = ₹13 Cr recovered.", s: null }],
    qs: ["Show accrual vs budget by brand across all zones", "What's the disbursement lag by distributor?", "Simulate: freeze E.UP + terminate bottom 3. Full budget impact."],
  },
];

const zones = [
  { id: "eup", n: "Eastern UP", vol: 8.1, vd: -4.2, sp: 24, sP: 128, ef: 2.71, sh: "49.1%", shD: -7.8, st: "critical", out: "280", oD: -2.1, trend: [9.2, 8.9, 8.6, 8.4, 8.1], note: "14 beats declining. Campa WD 61%. Spend trap." },
  { id: "cup", n: "Central UP", vol: 11.4, vd: 11.8, sp: 28, sP: 97, ef: 4.41, sh: "61.2%", shD: -1.8, st: "watch", out: "340", oD: 2.4, trend: [9.8, 10.1, 10.4, 10.8, 11.4], note: "Lahori growing in Lucknow urban MT." },
  { id: "wup", n: "Western UP", vol: 9.8, vd: 7.2, sp: 16.2, sP: 98, ef: 4.82, sh: "58.4%", shD: -2.1, st: "good", out: "310", oD: 1.2, trend: [8.8, 9.0, 9.2, 9.5, 9.8], note: "Stable. Cooler advantage intact." },
  { id: "nbh", n: "N. Bihar", vol: 7.2, vd: 18.3, sp: 19, sP: 122, ef: 3.52, sh: "-", shD: null, st: "warn", out: "180", oD: 8.8, trend: [4.8, 5.4, 6.0, 6.5, 7.2], note: "Strong growth. 8 distributors stressed." },
  { id: "sbh", n: "S. Bihar", vol: 4.4, vd: 22.1, sp: 18.8, sP: 118, ef: 3.14, sh: "-", shD: null, st: "warn", out: "120", oD: 12.4, trend: [2.8, 3.2, 3.6, 4.0, 4.4], note: "Buxar plant ramp. Highest beat growth." },
  { id: "uk", n: "Uttarakhand", vol: 4.1, vd: 14.6, sp: 6.2, sP: 91, ef: 5.91, sh: "63.1%", shD: -0.9, st: "good", out: "210", oD: 4.2, trend: [3.2, 3.4, 3.6, 3.8, 4.1], note: "Best efficiency. Natural moat." },
  { id: "bkd", n: "Bundelkhand", vol: 3.2, vd: 5.1, sp: 5.8, sP: 104, ef: 4.21, sh: "54.8%", shD: -3.2, st: "watch", out: "140", oD: -0.4, trend: [2.9, 3.0, 3.0, 3.1, 3.2], note: "Campa appearing in district HQs." },
];

const brands = [
  { id: "tu", n: "Thums Up", vol: 21.8, vd: 4.1, sp: 42.6, sP: 118, ef: 3.12, sh: "Primary CSD", shD: -4.2, st: "warn", skus: "250ml ASSP, 600ml PET, 1.25L, 2L", trend: [19.8, 20.2, 20.6, 21.1, 21.8], note: "Largest brand. E.UP defensive spend driving overshoot." },
  { id: "sp", n: "Sprite", vol: 8.4, vd: 8.2, sp: 12.6, sP: 102, ef: 4.64, sh: "Lemon-lime", shD: -1.4, st: "good", skus: "250ml ASSP, 600ml PET, 1.25L", trend: [7.2, 7.5, 7.8, 8.1, 8.4], note: "Growing. MT visibility scheme working in C.UP." },
  { id: "mz", n: "Maaza", vol: 6.2, vd: 12.4, sp: 8.8, sP: 82, ef: 6.21, sh: "Mango juice", shD: 1.2, st: "good", skus: "200ml Tetra, 250ml PET, 600ml, 1.2L", trend: [4.8, 5.2, 5.6, 5.9, 6.2], note: "Best ROI format (200ml Tetra). E.UP pre-load lagging." },
  { id: "lm", n: "Limca", vol: 4.8, vd: -2.1, sp: 5.4, sP: 96, ef: 3.84, sh: "Cloudy lemon", shD: -3.8, st: "warn", skus: "200ml RGB, 250ml ASSP, 600ml PET", trend: [5.2, 5.1, 5.0, 4.9, 4.8], note: "Lahori Zeera taking share in Lucknow MT." },
  { id: "kn", n: "Kinley", vol: 5.1, vd: 16.8, sp: 4.8, sP: 93, ef: 5.42, sh: "Water", shD: null, st: "good", skus: "500ml, 1L, 20L jar", trend: [3.8, 4.1, 4.4, 4.7, 5.1], note: "Bihar entry SKU. 68% convert to sparkling." },
  { id: "cc", n: "Coca-Cola", vol: 1.4, vd: 1.8, sp: 2.2, sP: 94, ef: 4.18, sh: "International cola", shD: -0.6, st: "good", skus: "300ml CAN, 750ml PET, 2L", trend: [1.3, 1.3, 1.4, 1.4, 1.4], note: "Urban premium. Small but stable." },
  { id: "fn", n: "Fanta", vol: 0.5, vd: -5.2, sp: 0.8, sP: 88, ef: 3.92, sh: "Orange CSD", shD: -1.1, st: "watch", skus: "250ml, 600ml PET", trend: [0.6, 0.6, 0.5, 0.5, 0.5], note: "Declining. Fanta Apple Delite not offsetting." },
];

const shareTrend = [{ q: "Q1'25", ck: 59.8, ca: 7.1, la: 3.2, pe: 19.2 }, { q: "Q2'25", ck: 58.9, ca: 8.6, la: 4.1, pe: 18.8 }, { q: "Q3'25", ck: 57.4, ca: 10.2, la: 5.4, pe: 18.4 }, { q: "Q4'25", ck: 56.8, ca: 11.8, la: 6.1, pe: 18.2 }, { q: "Jan'26", ck: 56.2, ca: 12.4, la: 6.8, pe: 18.1 }];
const runningSchemes = [
  { id: "TM-Q1-01", name: "Bihar outlet activation slab", brand: "Thums Up", zone: "S. Bihar", channel: "Rural GT", mechanic: "Volume slab: Rs12/case above 800 cases/wk per distributor", spend: 8.2, budget: 9.0, uplift: 1.42, start: "Jan 6", end: "Mar 31", st: "good",
    distributors: 34, beats: 480, incCases: "42,800/mo", passThrough: "92%", prevRun: null,
    detail: "Best-performing scheme. Activation-linked mechanic is driving real beat expansion, not loading. 480+ new beats activated since Jan. Distributor fill rate at 88% across scheme distributors. Secondary pull-through confirmed by SFA in 92% of beats.",
    risk: "14 distributors showing inventory stress (see Recommendations). If they pull back before summer, these beats go dark.",
    qs: ["Which of the 34 distributors are stressed?", "What happens if we extend this to N. Bihar?", "Show beat-level secondary trends for this scheme"] },
  { id: "TM-Q1-02", name: "Uttarakhand tourism promo", brand: "Multi-brand", zone: "Uttarakhand", channel: "Urban GT + MT", mechanic: "Consumer combo: TU 600ml + Maaza 200ml at Rs45 (vs Rs55 unbundled)", spend: 3.1, budget: 3.4, uplift: 1.35, start: "Feb 1", end: "Jun 30", st: "good",
    distributors: 18, beats: 210, incCases: "8,400/mo", passThrough: "96%", prevRun: "Summer '25: 1.31x",
    detail: "Tourism season ramp. Combo mechanic driving basket size at hill station outlets. 5.91 cases/Rs efficiency, best in portfolio. Maaza 200ml Tetra seeing 18% volume lift as part of combo. Works because terrain limits Campa distribution (14% WD).",
    risk: "Low. Natural moat territory. Only risk is over-investing in already-won market.",
    qs: ["How does this compare to last summer's tourism scheme?", "Can we extend the combo to include Kinley?", "Which hill station clusters are driving the most uplift?"] },
  { id: "TM-Q1-03", name: "Thums Up cooler bonus", brand: "Thums Up", zone: "Central UP", channel: "All", mechanic: "Rs15/case bonus for outlets maintaining >80% Coca-Cola cooler purity", spend: 7.8, budget: 8.5, uplift: 1.28, start: "Jan 1", end: "Mar 31", st: "good",
    distributors: 28, beats: 340, incCases: "31,200/mo", passThrough: "88%", prevRun: "Q3'25: 1.22x (improved)",
    detail: "Cooler purity enforcement driving brand preference. Outlets maintaining >80% Coca-Cola in cooler show 28% higher Thums Up offtake vs mixed coolers. Works best where Campa WD is <40%. SFA audit confirms 88% compliance among enrolled outlets.",
    risk: "CTS flagged 12 outlets in Lucknow suburbs that lost cooler purity in Feb (dropped below 80% Coca-Cola). Need cooler deployment response in encroachment zone.",
    qs: ["Which outlets are at risk of losing cooler purity?", "What's the cost of deploying 50 more coolers in Lucknow suburbs?", "Compare sales velocity: cooler-exclusive vs mixed outlets"] },
  { id: "TM-Q1-04", name: "Sprite MT visibility", brand: "Sprite", zone: "Central UP", channel: "Modern Trade", mechanic: "Secondary placement: end-cap + checkout counter at Rs800/outlet/month", spend: 2.4, budget: 2.8, uplift: 1.24, start: "Feb 15", end: "May 31", st: "good",
    distributors: 6, beats: null, incCases: "4,200/mo", passThrough: "100% (direct)", prevRun: "New scheme",
    detail: "Counter-competitive play in 180 Lucknow MT stores (DMart, Spencer's, Reliance Fresh). Secondary placement driving 24% impulse uplift. Where Sprite has placement, it holds share even as the broader Lucknow MT channel declines. Where Sprite lacks placement, it loses 6.8% QoQ. Visibility is the differentiator.",
    risk: "Lucknow MT Limca+Sprite decline accelerating QoQ. If visibility gap widens in Q2, urban MT position erodes further.",
    qs: ["Show store-by-store performance for this scheme", "What would it cost to extend to all UP MT stores?", "Compare Sprite vs Lahori velocity where both have placement"] },
  { id: "TM-Q1-05", name: "Maaza summer pre-load", brand: "Maaza", zone: "All", channel: "All", mechanic: "Rs8/case early stocking incentive for distributors loading before Mar 25", spend: 4.2, budget: 6.8, uplift: 1.22, start: "Mar 1", end: "Mar 31", st: "good",
    distributors: 52, beats: "All", incCases: "18,600/mo", passThrough: "78%", prevRun: "Mar '25: 1.28x",
    detail: "Summer pre-positioning. Only 62% of budget deployed at day 12. Trishundi plant ASSP line at 62% utilization (target 85% by Apr 1). Maaza 200ml Tetra is the highest-ROI format in portfolio (6.2x). Bihar distributors loading well. E.UP and Bundelkhand lagging.",
    risk: "If ASSP production doesn't hit 85% by Apr 1, we'll have product shortage at peak. E.UP distributors deprioritizing Maaza for Thums Up defensive loading.",
    qs: ["Which zones haven't started loading yet?", "What's the ASSP production ramp schedule?", "Show Maaza pre-load vs same period last year by zone"] },
  { id: "TM-Q1-06", name: "Kinley rural push", brand: "Kinley", zone: "Bihar", channel: "Rural GT", mechanic: "Per-bottle incentive: Rs0.50/bottle on 1L Kinley for new beats only", spend: 1.8, budget: 2.2, uplift: 1.19, start: "Jan 15", end: "Jun 30", st: "good",
    distributors: 22, beats: 180, incCases: "6,800/mo", passThrough: "85%", prevRun: null,
    detail: "Water as entry SKU for Bihar expansion. Kinley 1L opens distribution in beats where Thums Up alone can't justify the delivery economics. 180 beats activated with Kinley first, 68% subsequently ordered sparkling SKUs within 4 weeks. Effective market-making scheme.",
    risk: "Low. Cost-effective entry strategy. Watch for cannibalization of sachet water.",
    qs: ["How many Kinley-first beats converted to sparkling orders?", "What's the average time from Kinley entry to Thums Up first order?", "Can we replicate this in E.UP new beats?"] },
  { id: "TM-Q1-07", name: "E.UP defensive margin", brand: "Thums Up", zone: "Eastern UP", channel: "Rural GT", mechanic: "Rs18/case flat margin to all distributors to match Campa's Rs18/case retailer margin", spend: 12.4, budget: 9.6, uplift: 1.08, start: "Dec 1", end: "Mar 31", st: "critical",
    distributors: 42, beats: 280, incCases: "8,400/mo", passThrough: "71%", prevRun: "Ongoing since Dec, escalated twice",
    detail: "Largest single scheme by spend. 129% of budget. Defensive against Campa but ROI at 0.91x in Gorakhpur-Deoria cluster (below breakeven). Only 71% of margin reaching retailers, 29% retained by distributors. In beats where Campa WD exceeds 60%, this scheme generates zero incremental volume. Essentially subsidizing baseline in lost territory.",
    risk: "Already 129% of scheme budget (Rs12.4 Cr vs Rs9.6 Cr allocated). Accruing at Rs0.83 Cr/week vs budgeted Rs0.56 Cr/week. If not capped, E.UP trade budget exhausts entirely by Apr 2, four weeks before summer peak. If terminated abruptly, risk of 15-20% further volume loss in E.UP.",
    qs: ["Show the 14 beats where this scheme has zero effect", "What if we cap this to cooler-equipped beats only?", "What's the minimum margin level to hold non-Campa beats?"] },
  { id: "TM-Q1-08", name: "E.UP beat recovery slab", brand: "Multi-brand", zone: "Eastern UP", channel: "Rural GT", mechanic: "Slab: Rs22/case for distributors in beats with >15% secondary decline", spend: 5.8, budget: 5.0, uplift: 1.06, start: "Feb 1", end: "Mar 31", st: "warn",
    distributors: 18, beats: 86, incCases: "3,200/mo", passThrough: "64%", prevRun: null,
    detail: "Targeting the 86 declining beats in E.UP. Slab threshold at Rs22/case but only generating 1.06x uplift. Problem: the threshold is too low. Distributors crossing the slab on baseline volume, so the incentive isn't driving incremental behavior. Pass-through at only 64%, lowest in portfolio.",
    risk: "Spending Rs5.8 Cr to subsidize decline. Same beats are Campa-dense (61% WD). Scheme mechanic doesn't address the root cause.",
    qs: ["What slab threshold would actually drive incremental?", "Show uplift by beat for this scheme", "What if we replaced this with a cooler deployment scheme?"] },
  { id: "TM-Q1-09", name: "Bihar seeding scheme", brand: "Thums Up", zone: "N. Bihar", channel: "All", mechanic: "Volume slab: Rs18/case above 800 cases/wk per distributor", spend: 6.8, budget: 7.2, uplift: 1.14, start: "Jan 1", end: "Mar 31", st: "warn",
    distributors: 28, beats: 310, incCases: "12,400/mo", passThrough: "82%", prevRun: null,
    detail: "Good mechanic for new territory seeding. But 3 distributors gaming the slab with single-week spikes of 340% (see Anomaly alert in Recommendations). Excluding the 3 flagged distributors, remaining 25 show 1.22x uplift, which is solid. Slab threshold needs anti-gaming controls for Q2.",
    risk: "Rs4.2 Cr exposure from potential scheme leakage at 3 distributors. Buxar plant just inaugurated, so distribution logistics still stabilizing.",
    qs: ["Show uplift excluding the 3 flagged distributors", "What anti-gaming controls should we add for Q2?", "How is the Buxar plant ramp affecting this scheme's economics?"] },
  { id: "TM-Q1-10", name: "Holi activation", brand: "Multi-brand", zone: "All UP", channel: "All", mechanic: "Party pack combo (TU 1.25L + Maaza 600ml + Sprite 600ml at Rs99) + Rs4/case distributor Holi bonus", spend: 1.2, budget: 4.8, uplift: null, start: "Mar 8", end: "Mar 18", st: "watch",
    distributors: 52, beats: "All UP", incCases: "Projected: 85K in 10 days", passThrough: "TBD", prevRun: "Holi '25: 1.82x uplift, Rs3.2 Cr spend",
    detail: "Just launched 4 days ago. Only 25% of budget deployed. Holi is the highest single-day volume event of the year (1.8-2.2x). Last year's Holi activation delivered 1.82x. This year's party pack combo is new. Distributors in C.UP and W.UP loading, but E.UP and Bihar slow. Need immediate acceleration.",
    risk: "Only 2 days to Holi. If remaining Rs3.6 Cr isn't deployed by Mar 13, we miss the stocking window. Campa expected to run a Rs5 off counter.",
    qs: ["Which zones haven't started Holi loading?", "Compare this year's activation to Holi 2025 day by day", "What's the risk if we don't fully deploy by Mar 13?"] },
  { id: "TM-Q1-11", name: "Limca rural margin", brand: "Limca", zone: "Central UP", channel: "Rural GT", mechanic: "Rs4/case flat margin to distributors", spend: 2.8, budget: 3.2, uplift: 1.04, start: "Jan 1", end: "Mar 31", st: "warn",
    distributors: 22, beats: 240, incCases: "1,800/mo", passThrough: "75%", prevRun: "Q3'25: 1.06x (declining trend)",
    detail: "Third consecutive quarter of declining uplift (1.12x > 1.06x > 1.04x). The competitive threat to Limca in Lucknow is visibility-driven, not margin-driven. This scheme gives distributors Rs4/case in rural GT but doesn't address the urban MT channel where Limca is actually declining 6.8% QoQ. Flat margin in rural GT doesn't counter an urban MT visibility problem.",
    risk: "Scheme-threat mismatch. Spending Rs2.8 Cr on rural margin when Limca decline is concentrated in urban MT (-6.8% QoQ). This scheme becomes increasingly irrelevant as the urban competitive pressure grows.",
    qs: ["What would a Limca visibility scheme cost instead?", "Show Limca vs Lahori velocity by outlet type", "If we terminated this, what volume would we actually lose?"] },
  { id: "TM-Q1-12", name: "Rural kirana margin", brand: "Multi-brand", zone: "Western UP", channel: "Rural GT", mechanic: "Rs3/case flat margin across all SKUs for all distributors", spend: 6.2, budget: 6.0, uplift: 1.04, start: "Oct 1", end: "Mar 31", st: "critical",
    distributors: 38, beats: 310, incCases: "2,400/mo", passThrough: "68%", prevRun: "Running continuously since Oct '25",
    detail: "Running for 6 months with near-zero incremental. Control areas (non-scheme distributors in adjacent beats) show identical volume trends. 68% pass-through means 32% retained by distributors without behavior change. This is the clearest termination candidate in the portfolio. Rs6.2 Cr being spent to subsidize baseline volume that would exist regardless.",
    risk: "None from termination. Control data is definitive. The Rs6.2 Cr is pure waste. Redeployable to Bihar summer or Holi acceleration.",
    qs: ["Show control vs scheme beats side by side", "If we terminate, what's the redistribution plan for Rs6.2 Cr?", "Why has this been running for 6 months without review?"] },
  { id: "TM-Q1-13", name: "Distributor vol bonus", brand: "Multi-brand", zone: "Bundelkhand", channel: "All", mechanic: "Quarterly slab: Rs25L bonus to distributors crossing Rs1.5 Cr cumulative billing", spend: 3.8, budget: 4.0, uplift: 1.02, start: "Jan 1", end: "Mar 31", st: "critical",
    distributors: 12, beats: 140, incCases: "800/mo", passThrough: "52%", prevRun: "Q3'25: 1.03x (no improvement)",
    detail: "Lowest uplift in portfolio. Quarterly slab mechanic incentivizes loading behavior: distributors spike orders near quarter-end to cross threshold, then destock for weeks after. Only 52% pass-through to retailers, worst in portfolio. Loading pattern creates inventory distortion downstream. Campa appearing in Bundelkhand district HQs but this scheme doesn't address it.",
    risk: "None from termination. Loading behavior actually creates negative downstream effects. Rs3.8 Cr redeployable.",
    qs: ["Show the quarter-end loading spike pattern", "What's happening with Campa in Bundelkhand?", "What scheme mechanic would actually work here?"] },
  { id: "TM-Q1-14", name: "Consumer promo rural", brand: "Thums Up", zone: "Central UP", channel: "Rural GT", mechanic: "Scratch card: 1 in 10 wins Rs10 mobile cashback via QR code on bottle", spend: 4.1, budget: 4.5, uplift: 1.05, start: "Jan 15", end: "Mar 31", st: "warn",
    distributors: 28, beats: 240, incCases: "3,600/mo", passThrough: "N/A (consumer-direct)", prevRun: "New mechanic",
    detail: "Consumer pull mechanic designed to drive repeat purchase. But redemption rate at 8% vs 22% target. The QR code mechanism requires smartphone + internet, which limits adoption in deep rural. Of the 8% who redeem, 72% are from urban GT beats where smartphone penetration is higher. The scheme is reaching the wrong audience. Mechanic needs redesign for rural: switch to under-the-cap prize or retailer-mediated cashback.",
    risk: "Rs4.1 Cr spent, but consumer impact concentrated in urban (where it's not needed). Rural target audience can't redeem. Scheme design flaw, not execution flaw.",
    qs: ["What's the redemption rate by urban vs rural?", "What would an under-the-cap mechanic cost?", "Show which beats have the highest redemption rates"] },
];
const fundData = [
  { brand: "Thums Up", zone: "Eastern UP", alloc: 10.2, accrual: 13.6, pct: 133, exhausts: "Apr 2", st: "critical" },
  { brand: "Thums Up", zone: "Central UP", alloc: 12.8, accrual: 12.2, pct: 95, exhausts: "May 8", st: "good" },
  { brand: "Thums Up", zone: "Bihar", alloc: 8.6, accrual: 9.8, pct: 114, exhausts: "Apr 18", st: "warn" },
  { brand: "Sprite", zone: "Central UP", alloc: 5.2, accrual: 5.4, pct: 104, exhausts: "Apr 28", st: "good" },
  { brand: "Sprite", zone: "Eastern UP", alloc: 3.6, accrual: 4.4, pct: 122, exhausts: "Apr 12", st: "warn" },
  { brand: "Maaza", zone: "Eastern UP", alloc: 2.8, accrual: 2.0, pct: 71, exhausts: "Jun+", st: "good" },
  { brand: "Maaza", zone: "Bihar", alloc: 3.2, accrual: 2.8, pct: 88, exhausts: "May 22", st: "good" },
  { brand: "Kinley", zone: "All", alloc: 3.0, accrual: 2.8, pct: 93, exhausts: "May+", st: "good" },
];

const comingUp = [
  { event: "Holi (Mar 14)", days: 2, budget: "Rs4.8 Cr", deployed: "25%", st: "critical", detail: "Highest single-day volume of the year. Party packs + RGB push. ASSP gifting bundles. Only 25% of budget deployed. Needs immediate acceleration in C.UP and W.UP." },
  { event: "Summer Peak Activation (Apr 1)", days: 20, budget: "Rs148 Cr", deployed: "Pre-loading phase", st: "watch", detail: "2.2-2.5x baseline. Trishundi ASSP line at 62% capacity, needs 85% by Apr 1. 14 stressed Bihar distributors need working capital fix before peak. Campa will counter within 1 week." },
  { event: "Wedding Season (Apr-Jun)", days: 30, budget: "Rs8.2 Cr", deployed: "Planned", st: "good", detail: "1.25L and 2L PET focus. Caterer/event channel. Higher ASP, lower TPR %. Distributor pre-loading 2 weeks before local peaks." },
  { event: "IPL Season (Mar-May)", days: 7, budget: "Visibility-led", deployed: "In-store kits dispatched", st: "good", detail: "Campa is IPL co-sponsor. Counter with in-store Thums Up branding, MT checkout placement, RGB cooler exclusivity. No incremental TPR, pure visibility." },
  { event: "Local Mela Calendar (40+ events)", days: "Ongoing", budget: "Rs2.4 Cr", deployed: "Geo-triggered", st: "watch", detail: "Hyperlocal 3-7 day events across E.UP and Bihar. Mobile vending + temporary distribution. ASSP and Kinley sachets. Triggered from SFA geo-data." },
];

/* ══════════ PRIMITIVES ══════════ */
const sC = s => ({ good: C.green, watch: C.blue, warn: C.orange, critical: C.red }[s] || C.textLight);
const sB = s => ({ good: C.greenPale, watch: C.bluePale, warn: C.orangePale, critical: C.redPale }[s] || C.cream);
const sL = s => ({ good: "ON TRACK", watch: "WATCH", warn: "ATTENTION", critical: "CRITICAL" }[s] || "");
const Tag = ({ children, color, bg }) => <span style={{ display: "inline-flex", padding: "3px 10px", borderRadius: 5, fontSize: 9.5, fontWeight: 700, fontFamily: mono, color, background: bg, letterSpacing: 0.5 }}>{children}</span>;
const SrcBadge = ({ id }) => { const s = sources[id]; if (!s) return null; return <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 8px", borderRadius: 4, background: s.c === C.green ? C.greenPale : C.orangePale, fontSize: 9, fontFamily: mono, flexShrink: 0 }}><span style={{ width: 4, height: 4, borderRadius: "50%", background: s.c }} /><span style={{ color: C.textMid }}>{s.l}</span></span>; };
const Spark = ({ data, color, w = 72, h = 24 }) => { const mn2 = Math.min(...data), mx = Math.max(...data), r = mx - mn2 || 1; const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - 2 - ((v - mn2) / r) * (h - 4)}`).join(" "); return <svg width={w} height={h} style={{ display: "block" }}><polyline points={pts} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" /><circle cx={w} cy={h - 2 - ((data[data.length - 1] - mn2) / r) * (h - 4)} r={2.5} fill={color} /></svg>; };
const Takeaway = ({ color = C.orange, bg = C.orangePale, children }) => <div style={{ padding: "12px 16px", background: bg, borderRadius: 10, borderLeft: `3px solid ${color}`, marginTop: 14 }}><div style={{ fontSize: 13, color: C.text, lineHeight: 1.7 }}>{children}</div></div>;
const SectionHead = ({ title, sub, right }) => <div style={{ paddingTop: 36, marginBottom: 20 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}><div><h2 style={{ fontFamily: serif, fontSize: 20, fontWeight: 700, color: C.text, margin: 0 }}>{title}</h2>{sub && <div style={{ fontSize: 12, color: C.textLight, marginTop: 4 }}>{sub}</div>}</div>{right}</div></div>;

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
const IntelCard = ({ card, defaultOpen, onAsk, onTrail }) => {
  const [exp, setExp] = useState(defaultOpen);
  const color = sC(card.sev), bg = sB(card.sev);
  return (
    <div style={{ background: C.card, borderRadius: 14, border: `1px solid ${exp ? `${color}50` : C.border}`, marginBottom: 16, overflow: "hidden", boxShadow: exp ? `0 4px 20px ${color}10` : "0 1px 3px rgba(0,0,0,0.04)", transition: "all 0.3s" }}>
      <div style={{ padding: "20px 24px", cursor: "pointer" }} onClick={() => setExp(!exp)}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <Tag color={color} bg={bg}>{sL(card.sev)}</Tag>
          <span style={{ fontFamily: mono, fontSize: 9.5, letterSpacing: 0.6, color: C.textLight }}>{card.type}</span><span style={{ width: 3, height: 3, borderRadius: "50%", background: C.borderLight }} /><span style={{ fontSize: 12, color: C.textMid }}>{card.scope}</span>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
            {exp && <button onClick={e => { e.stopPropagation(); onTrail && onTrail(card); }} style={{ background: C.cream, border: `1px solid ${C.border}`, borderRadius: 6, padding: "4px 12px", fontSize: 10.5, color: C.textMid, cursor: "pointer", fontFamily: mono, display: "flex", alignItems: "center", gap: 5, transition: "all 0.15s" }}
              onMouseEnter={e => { e.currentTarget.style.background = C.greenPale; e.currentTarget.style.borderColor = C.green; e.currentTarget.style.color = C.green; }}
              onMouseLeave={e => { e.currentTarget.style.background = C.cream; e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textMid; }}
            ><span style={{ fontSize: 7 }}>◆</span>{card.trail.length} agents</button>}
            <div style={{ width: 24, height: 24, borderRadius: 6, background: C.cream, display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 0.2s", transform: exp ? "rotate(180deg)" : "none" }}><span style={{ fontSize: 10, color: C.textLight }}>▾</span></div>
          </div>
        </div>
        <div style={{ fontFamily: serif, fontSize: 17, fontWeight: 600, color: C.text, lineHeight: 1.4, marginBottom: 8 }}>{card.hl}</div>
        <div style={{ fontSize: 13.5, color: C.textMid, lineHeight: 1.7, marginBottom: 16 }}>{card.sum}</div>
        <div style={{ display: "flex", gap: 10 }}>{card.kpis.map((k, i) => <div key={i} style={{ flex: 1, padding: "10px 14px", borderRadius: 10, background: k.b ? bg : C.greenPale, border: `1px solid ${(k.b ? color : C.green)}15` }}><div style={{ fontSize: 9.5, fontFamily: mono, color: C.textLight, letterSpacing: 0.4, marginBottom: 3 }}>{k.l}</div><div style={{ fontSize: 18, fontWeight: 700, color: C.text, letterSpacing: -0.3 }}>{k.v}</div><div style={{ fontSize: 10.5, fontFamily: mono, fontWeight: 600, color: k.b ? color : C.green, marginTop: 2 }}>{k.d}</div></div>)}</div>
      </div>
      {exp && <div style={{ padding: "0 24px 22px" }}>
        <div style={{ background: C.greenSoft, borderRadius: 12, padding: "18px 20px", border: `1px solid ${C.green}18`, marginBottom: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}><div style={{ width: 22, height: 22, borderRadius: 6, background: C.green, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>→</span></div><span style={{ fontFamily: mono, fontSize: 10, letterSpacing: 0.8, color: C.green, fontWeight: 700 }}>RECOMMENDED ACTION</span></div>
          <div style={{ fontSize: 14, color: C.text, lineHeight: 1.7, fontWeight: 500, marginBottom: 10 }}>{card.dec.act}</div>
          <div style={{ fontSize: 13, color: C.textMid, lineHeight: 1.7, marginBottom: 16, paddingLeft: 16, borderLeft: `2px solid ${C.green}30` }}><span style={{ fontWeight: 600, color: C.text }}>Why: </span>{card.dec.why}</div>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ flex: 2, padding: "12px 16px", background: C.greenPale, borderRadius: 10 }}><div style={{ fontSize: 9, fontFamily: mono, color: C.green, letterSpacing: 0.5, marginBottom: 4, fontWeight: 600 }}>EXPECTED IMPACT</div><div style={{ fontSize: 13, color: C.text, lineHeight: 1.6 }}>{card.dec.imp}</div></div>
            <div style={{ minWidth: 90, padding: "12px 16px", background: C.card, borderRadius: 10, border: `1px solid ${C.border}`, textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center" }}><div style={{ fontSize: 9, fontFamily: mono, color: C.textLight, letterSpacing: 0.5, marginBottom: 4 }}>CONFIDENCE</div><div style={{ fontSize: 16, fontWeight: 700, color: card.dec.conf === "High" ? C.green : C.orange }}>{card.dec.conf}</div></div>
            <div style={{ flex: 1, padding: "12px 16px", background: C.card, borderRadius: 10, border: `1px solid ${C.border}` }}><div style={{ fontSize: 9, fontFamily: mono, color: C.textLight, letterSpacing: 0.5, marginBottom: 4 }}>TIMEFRAME</div><div style={{ fontSize: 13, color: C.text, lineHeight: 1.5 }}>{card.dec.time}</div></div>
          </div>
        </div>
        <div style={{ marginBottom: 18 }}><div style={{ fontFamily: mono, fontSize: 9, letterSpacing: 1.2, color: C.textLight, marginBottom: 10 }}>SUPPORTING EVIDENCE</div>{card.ev.map((e, i) => <div key={i} style={{ display: "flex", gap: 10, marginBottom: 7, alignItems: "flex-start" }}><SrcBadge id={e.s} /><span style={{ fontSize: 13, color: C.text, lineHeight: 1.65, flex: 1 }}>{e.t}</span></div>)}</div>
        {card.qs && <AskBar prompts={card.qs} onAsk={onAsk} />}
      </div>}
    </div>
  );
};

/* ══ CHARTS ══ */
const ShareChart = ({ w = 460, h = 180 }) => { const p = { t: 14, r: 16, b: 28, l: 40 }; const pw = w - p.l - p.r, ph = h - p.t - p.b; const ser = [{ k: "ck", l: "Coca-Cola", c: C.green }, { k: "ca", l: "Campa", c: C.red }, { k: "la", l: "Lahori+", c: C.orange }, { k: "pe", l: "PepsiCo", c: C.blue }]; const toY = v => p.t + ph - (v / 65) * ph; const toX = i => p.l + (i / 4) * pw; return <div><svg width={w} height={h} style={{ display: "block" }}>{[0, 20, 40, 60].map(v => <g key={v}><line x1={p.l} y1={toY(v)} x2={w - p.r} y2={toY(v)} stroke={C.borderLight} strokeWidth={0.5} strokeDasharray="3,4" /><text x={p.l - 7} y={toY(v) + 3} textAnchor="end" fill={C.textLight} fontSize={9} fontFamily={mono}>{v}%</text></g>)}{shareTrend.map((d, i) => <text key={i} x={toX(i)} y={h - 5} textAnchor="middle" fill={C.textLight} fontSize={9} fontFamily={mono}>{d.q}</text>)}{ser.map(s => <g key={s.k}><polyline points={shareTrend.map((d, i) => `${toX(i)},${toY(d[s.k])}`).join(" ")} fill="none" stroke={s.c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" opacity={0.8} /><circle cx={toX(4)} cy={toY(shareTrend[4][s.k])} r={4} fill={C.card} stroke={s.c} strokeWidth={2} /></g>)}</svg><div style={{ display: "flex", gap: 18, marginTop: 8 }}>{ser.map(s => <div key={s.k} style={{ display: "flex", alignItems: "center", gap: 5 }}><div style={{ width: 10, height: 3, borderRadius: 2, background: s.c }} /><span style={{ fontSize: 11.5, color: C.textMid }}>{s.l}</span><span style={{ fontSize: 11.5, fontFamily: mono, fontWeight: 700, color: s.c }}>{shareTrend[4][s.k]}%</span></div>)}</div></div>; };

const EffQuad = ({ w = 520, h = 380 }) => { const p = { t: 32, r: 32, b: 42, l: 52 }; const pw = w - p.l - p.r, ph = h - p.t - p.b; const toX = v => p.l + ((v + 15) / 47) * pw; const toY = v => p.t + ph - ((v + 8) / 34) * ph; const mx = toX(0), my = toY(0); return <svg width={w} height={h} style={{ display: "block" }}><rect x={p.l} y={p.t} width={mx - p.l} height={my - p.t} fill={C.green} opacity={0.04} rx={8} /><rect x={mx} y={p.t} width={w - p.r - mx} height={my - p.t} fill={C.orange} opacity={0.05} rx={8} /><rect x={p.l} y={my} width={mx - p.l} height={h - p.b - my} fill={C.blue} opacity={0.04} rx={8} /><rect x={mx} y={my} width={w - p.r - mx} height={h - p.b - my} fill={C.red} opacity={0.05} rx={8} /><text x={p.l + 10} y={p.t + 18} fontSize={9} fontFamily={mono} fill={C.green} fontWeight={600} opacity={0.7}>EFFICIENT GROWTH</text><text x={w - p.r - 10} y={p.t + 18} fontSize={9} fontFamily={mono} fill={C.orange} fontWeight={600} opacity={0.7} textAnchor="end">BUYING GROWTH</text><text x={p.l + 10} y={h - p.b - 10} fontSize={9} fontFamily={mono} fill={C.blue} fontWeight={600} opacity={0.7}>UNDER-INVESTED</text><text x={w - p.r - 10} y={h - p.b - 10} fontSize={9} fontFamily={mono} fill={C.red} fontWeight={600} opacity={0.7} textAnchor="end">SPEND TRAP</text><line x1={p.l} y1={my} x2={w - p.r} y2={my} stroke={C.borderLight} strokeWidth={1} /><line x1={mx} y1={p.t} x2={mx} y2={h - p.b} stroke={C.borderLight} strokeWidth={1} /><text x={w / 2} y={h - 10} textAnchor="middle" fontSize={10} fontFamily={font} fill={C.textLight}>Spend vs. Budget →</text><text x={14} y={h / 2} textAnchor="middle" fontSize={10} fontFamily={font} fill={C.textLight} transform={`rotate(-90, 14, ${h / 2})`}>Volume Growth →</text>{zones.map(z => { const cx = toX(z.sP - 100), cy = toY(z.vd), c = sC(z.st); return <g key={z.id}><circle cx={cx} cy={cy} r={16} fill={c} opacity={0.06} /><circle cx={cx} cy={cy} r={16} fill="none" stroke={c} strokeWidth={1.5} opacity={0.4} /><circle cx={cx} cy={cy} r={3.5} fill={c} /><text x={cx} y={cy - 20} textAnchor="middle" fontSize={11} fontFamily={font} fontWeight={600} fill={C.text}>{z.n}</text></g>; })}</svg>; };

/* ══ MAIN ══ */
export default function SLMGTradeCommand() {
  const [convOpen, setConvOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState("brief");
  const [trailModal, setTrailModal] = useState(null);
  const [expandedZone, setExpandedZone] = useState(null);
  const [expandedBrand, setExpandedBrand] = useState(null);
  const [perfView, setPerfView] = useState("geo");
  const [schemeSearch, setSchemeSearch] = useState("");
  const [schemeFilters, setSchemeFilters] = useState({ status: "all", brand: "all", zone: "all", channel: "all" });

  const handleAsk = (q) => {
    const userMsg = { role: "user", text: q };
    // Add user message + loading indicator
    setMessages(prev => [...prev, userMsg, { role: "loading" }]);
    setConvOpen(true);
    // Simulate agent processing delay
    setTimeout(() => {
      const resp = convResponses[q];
      const agentMsg = resp
        ? { role: "agent", text: resp.body, agents: resp.agents, sources: resp.sources, followUps: resp.followUps }
        : { role: "agent", text: `Analyzing: "${q}"\n\nRunning this query across SLMG's D365, DMS, and scheme management data. In a live deployment, this triggers the relevant agents to fetch and synthesize.\n\nTry one of the suggested prompts to see a full simulation.`, agents: ["Query Router"], sources: ["dms"], followUps: [] };
      setMessages(prev => [...prev.filter(m => m.role !== "loading"), agentMsg]);
    }, 1800);
  };

  const tabs = [
    { id: "brief", label: "Recommendations", count: briefCards.length },
    { id: "performance", label: "Performance" },
    { id: "actions", label: "Schemes" },
  ];

  const sideW = 160;

  return (
    <div className="overflow-auto" style={{ background: C.page, height: "100vh", fontFamily: font, color: C.text }}>
      {/* TOP BAR */}
      <div style={{ background: C.card, borderBottom: `1px solid ${C.border}`, position: "fixed", top: 0, left: 0, right: 0, zIndex: 101, height: 56 }}>
        <div style={{ padding: "0 24px", display: "flex", alignItems: "center", height: 56 }}>
          {/* Hamburger */}
          <div style={{ width: 40, height: 40, borderRadius: 10, background: C.header, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none"><line x1="1" y1="2" x2="17" y2="2" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" /><line x1="1" y1="7" x2="17" y2="7" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" /><line x1="1" y1="12" x2="17" y2="12" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" /></svg>
          </div>
          {/* Logo + Client + Page */}
          <div style={{ display: "flex", alignItems: "center", marginLeft: 16 }}>
            <span style={{ fontFamily: serif, fontSize: 18, fontWeight: 700, color: C.text, letterSpacing: -0.3 }}>questt</span><span style={{ fontSize: 18, fontWeight: 700, color: C.green }}>.</span>
            <div style={{ width: 1, height: 20, background: C.border, margin: "0 16px" }} />
            <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>SLMG</span>
            <div style={{ width: 1, height: 20, background: C.border, margin: "0 16px" }} />
            <span style={{ fontSize: 14, color: C.textMid }}>Trade Spend</span>
          </div>
          <div style={{ flex: 1 }} />
          {/* Search */}
          <div style={{ position: "relative", width: 260 }}>
            <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 13, color: C.textLight }}>⌕</span>
            <input readOnly placeholder="Search insights, territories, schemes..." style={{ width: "100%", padding: "8px 40px 8px 32px", borderRadius: 8, border: `1px solid ${C.border}`, background: C.page, fontSize: 12.5, fontFamily: font, color: C.textMid, outline: "none", cursor: "pointer" }} />
            <span style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", fontSize: 10, fontFamily: mono, color: C.textLight, background: C.card, border: `1px solid ${C.border}`, borderRadius: 4, padding: "1px 5px" }}>/</span>
          </div>
          {/* Bell */}
          <div style={{ width: 36, height: 36, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", marginLeft: 12, position: "relative" }}>
            <svg width="18" height="20" viewBox="0 0 18 20" fill="none"><path d="M14 7A5 5 0 004 7c0 5.25-2 6.5-2 6.5h14S14 12.25 14 7z" stroke={C.textMid} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M10.73 17a2 2 0 01-3.46 0" stroke={C.textMid} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <div style={{ position: "absolute", top: 6, right: 6, width: 6, height: 6, borderRadius: "50%", background: C.red }} />
          </div>
          {/* Avatar */}
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: C.green, display: "flex", alignItems: "center", justifyContent: "center", marginLeft: 8, cursor: "pointer", flexShrink: 0 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#fff", fontFamily: font }}>PL</span>
          </div>
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" style={{ marginLeft: 4, flexShrink: 0 }}><path d="M1 1.5L6 6.5L11 1.5" stroke={C.textLight} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
      </div>

      {/* SIDE NAV */}
      <div style={{ width: sideW, background: C.header, display: "flex", flexDirection: "column", padding: "16px 10px", position: "fixed", top: 56, left: 0, bottom: 0, zIndex: 100 }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            width: "100%", padding: "10px 12px", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "space-between",
            background: activeTab === tab.id ? "rgba(255,255,255,0.1)" : "transparent",
            border: "none", cursor: "pointer", marginBottom: 4, transition: "all 0.15s", textAlign: "left",
          }}>
            <span style={{ fontSize: 13, fontWeight: activeTab === tab.id ? 600 : 400, color: activeTab === tab.id ? "#fff" : "rgba(255,255,255,0.4)", fontFamily: font }}>{tab.label}</span>
            {tab.count && <span style={{ fontSize: 9, fontFamily: mono, padding: "1px 6px", borderRadius: 6, background: activeTab === tab.id ? C.green : "rgba(255,255,255,0.08)", color: activeTab === tab.id ? "#fff" : "rgba(255,255,255,0.4)", fontWeight: 700 }}>{tab.count}</span>}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ padding: "8px 12px", borderTop: "1px solid rgba(255,255,255,0.08)", marginTop: 8 }}>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", fontFamily: mono }}>SLMG Beverages</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>RSM View</div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ marginLeft: sideW, paddingTop: 56 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 36px" }}>

        {/* RECOMMENDATIONS */}
        {activeTab === "brief" && <div style={{ marginBottom: 8 }}><div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 18 }}><h2 style={{ fontFamily: serif, fontSize: 22, fontWeight: 700, color: C.text, margin: 0 }}>Recommendations</h2><span style={{ fontSize: 12, color: C.textLight }}>{briefCards.length} items ranked by revenue impact</span></div>
          {briefCards.map((c, i) => <IntelCard key={c.id} card={c} defaultOpen={i === 0} onAsk={handleAsk} onTrail={card => setTrailModal(card)} />)}
        </div>}

        {/* PERFORMANCE: Territory + Competition + Spend Efficiency */}
        {activeTab === "performance" && <><SectionHead title="Volume & Distribution" sub="March 2026 MTD" right={
          <div style={{ display: "flex", background: C.cream, borderRadius: 8, border: `1px solid ${C.border}`, overflow: "hidden" }}>
            <button onClick={() => setPerfView("geo")} style={{ padding: "6px 14px", fontSize: 11.5, fontWeight: perfView === "geo" ? 600 : 400, color: perfView === "geo" ? C.green : C.textLight, background: perfView === "geo" ? C.greenPale : "transparent", border: "none", cursor: "pointer", fontFamily: font, transition: "all 0.15s" }}>By Zone</button>
            <button onClick={() => setPerfView("brand")} style={{ padding: "6px 14px", fontSize: 11.5, fontWeight: perfView === "brand" ? 600 : 400, color: perfView === "brand" ? C.green : C.textLight, background: perfView === "brand" ? C.greenPale : "transparent", border: "none", cursor: "pointer", fontFamily: font, transition: "all 0.15s" }}>By Brand</button>
          </div>
        } />
        {perfView === "geo" && <><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18 }}>
          <div style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, padding: "20px 22px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}><div><div style={{ fontSize: 10, fontFamily: mono, color: C.textLight, letterSpacing: 0.6 }}>TOTAL SECONDARY VOLUME</div><div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 6 }}><span style={{ fontSize: 32, fontWeight: 700, color: C.text, letterSpacing: -1 }}>48.2M</span><span style={{ fontSize: 13, color: C.textLight }}>cases</span></div><div style={{ fontSize: 12, fontFamily: mono, fontWeight: 600, color: C.green, marginTop: 4 }}>+9.3% vs Feb 2026</div></div>
              <div style={{ width: 200 }}>{zones.slice(0, 5).map(z => <div key={z.id} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}><span style={{ fontSize: 10, color: C.textLight, width: 55, textAlign: "right" }}>{z.n.replace(" UP", "").replace("N. ", "N.")}</span><div style={{ flex: 1, height: 6, borderRadius: 3, background: C.cream, overflow: "hidden" }}><div style={{ width: `${(z.vol / 12) * 100}%`, height: "100%", borderRadius: 3, background: sC(z.st), opacity: 0.6 }} /></div><span style={{ fontSize: 10, fontFamily: mono, color: C.textMid, width: 32, textAlign: "right" }}>{z.vol}M</span></div>)}</div>
            </div>
          </div>
          <div style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, padding: "20px 22px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}><div><div style={{ fontSize: 10, fontFamily: mono, color: C.textLight, letterSpacing: 0.6 }}>DISTRIBUTION REACH</div><div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 6 }}><span style={{ fontSize: 32, fontWeight: 700, color: C.text, letterSpacing: -1 }}>1,580</span><span style={{ fontSize: 13, color: C.textLight }}>distributors</span></div><div style={{ fontSize: 12, fontFamily: mono, fontWeight: 600, color: C.green, marginTop: 4 }}>+82 net this quarter (Bihar expansion)</div></div>
              <div style={{ display: "flex", gap: 12 }}><div style={{ textAlign: "center", padding: "10px 14px", background: C.greenPale, borderRadius: 10 }}><div style={{ fontSize: 9, fontFamily: mono, color: C.green }}>NEW BEATS</div><div style={{ fontSize: 20, fontWeight: 700, color: C.green, marginTop: 2 }}>482</div><div style={{ fontSize: 10, color: C.green }}>Bihar: 310</div></div><div style={{ textAlign: "center", padding: "10px 14px", background: C.redPale, borderRadius: 10 }}><div style={{ fontSize: 9, fontFamily: mono, color: C.red }}>DECLINING</div><div style={{ fontSize: 20, fontWeight: 700, color: C.red, marginTop: 2 }}>86</div><div style={{ fontSize: 10, color: C.red }}>E.UP: 52</div></div></div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {zones.map(z => {
            const color = sC(z.st);
            const isExp = expandedZone === z.id;
            // Build 5-month labels
            const months = ["Oct", "Nov", "Dec", "Jan", "Feb"];
            const tMin = Math.min(...z.trend) * 0.85;
            const tMax = Math.max(...z.trend) * 1.1;
            const chartW = 420, chartH = 120, padL = 40, padR = 12, padT = 8, padB = 24;
            const plotW = chartW - padL - padR, plotH = chartH - padT - padB;
            const toX = i => padL + (i / (z.trend.length - 1)) * plotW;
            const toY = v => padT + plotH - ((v - tMin) / (tMax - tMin || 1)) * plotH;
            const gridLines = [tMin, tMin + (tMax - tMin) / 2, tMax].map(v => Math.round(v * 10) / 10);

            return (
              <div key={z.id} onClick={() => setExpandedZone(isExp ? null : z.id)} style={{ background: C.card, borderRadius: 12, border: `1px solid ${isExp ? `${color}40` : C.border}`, borderLeft: `3px solid ${color}`, boxShadow: isExp ? `0 4px 16px ${color}08` : "0 1px 3px rgba(0,0,0,0.03)", cursor: "pointer", overflow: "hidden", transition: "all 0.2s" }}>
                {/* Collapsed: zone name, volume, change only */}
                <div style={{ padding: "14px 20px", display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ minWidth: 150 }}>
                      <div style={{ fontSize: 15, fontWeight: 600, color: C.text }}>{z.n}</div>
                      <div style={{ fontSize: 11, color: C.textMid, marginTop: 2 }}>{z.note}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                      <span style={{ fontSize: 22, fontWeight: 700, color: C.text }}>{z.vol}M</span>
                      <span style={{ fontSize: 11, color: C.textLight }}>cases</span>
                      <span style={{ fontSize: 12, fontFamily: mono, fontWeight: 600, color: z.vd < 0 ? C.red : C.green, marginLeft: 4 }}>{z.vd > 0 ? "+" : ""}{z.vd}%</span>
                    </div>
                  </div>
                  <div style={{ width: 20, height: 20, borderRadius: 6, background: C.cream, display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 0.2s", transform: isExp ? "rotate(180deg)" : "none", flexShrink: 0 }}><span style={{ fontSize: 9, color: C.textLight }}>▾</span></div>
                </div>
                {/* Expanded: chart + metrics */}
                {isExp && (
                  <div style={{ padding: "0 20px 18px", borderTop: `1px solid ${C.borderLight}` }}>
                    <div style={{ display: "flex", gap: 16, paddingTop: 14 }}>
                      {/* Chart with axes */}
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 10, fontFamily: mono, color: C.textLight, letterSpacing: 0.4, marginBottom: 6 }}>SECONDARY VOLUME (M cases)</div>
                        <svg width={chartW} height={chartH} style={{ display: "block" }}>
                          {/* Grid lines + Y axis labels */}
                          {gridLines.map((v, i) => (
                            <g key={i}>
                              <line x1={padL} y1={toY(v)} x2={chartW - padR} y2={toY(v)} stroke={C.borderLight} strokeWidth={0.5} strokeDasharray="3,4" />
                              <text x={padL - 6} y={toY(v) + 3} textAnchor="end" fill={C.textLight} fontSize={9} fontFamily={mono}>{v}</text>
                            </g>
                          ))}
                          {/* X axis labels */}
                          {months.map((m, i) => (
                            <text key={i} x={toX(i)} y={chartH - 4} textAnchor="middle" fill={C.textLight} fontSize={9} fontFamily={mono}>{m}</text>
                          ))}
                          {/* Area fill */}
                          <polygon
                            points={`${toX(0)},${toY(tMin)} ${z.trend.map((v, i) => `${toX(i)},${toY(v)}`).join(" ")} ${toX(z.trend.length - 1)},${toY(tMin)}`}
                            fill={color} opacity={0.06}
                          />
                          {/* Line */}
                          <polyline
                            points={z.trend.map((v, i) => `${toX(i)},${toY(v)}`).join(" ")}
                            fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
                          />
                          {/* Data points */}
                          {z.trend.map((v, i) => (
                            <g key={i}>
                              <circle cx={toX(i)} cy={toY(v)} r={3.5} fill={C.card} stroke={color} strokeWidth={2} />
                              {/* Value label on last point */}
                              {i === z.trend.length - 1 && (
                                <text x={toX(i)} y={toY(v) - 10} textAnchor="middle" fill={color} fontSize={10} fontWeight={700} fontFamily={mono}>{v}M</text>
                              )}
                            </g>
                          ))}
                          {/* Left axis line */}
                          <line x1={padL} y1={padT} x2={padL} y2={chartH - padB} stroke={C.borderLight} strokeWidth={1} />
                        </svg>
                      </div>
                      {/* Metrics grid */}
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, width: 280, flexShrink: 0 }}>
                        {[
                          { l: "TRADE SPEND", v: `₹${z.sp} Cr`, sub: `${z.sP}% of plan`, c: z.sP > 115 ? C.red : z.sP > 100 ? C.orange : C.green },
                          { l: "EFFICIENCY", v: `${z.ef}`, sub: "cases/₹", c: z.ef > 4.5 ? C.green : z.ef > 3 ? C.orange : C.red },
                          { l: "DISTRIBUTORS", v: z.out, sub: `${z.oD > 0 ? "+" : ""}${z.oD}% vs LM`, c: z.oD < 0 ? C.red : C.green },
                          { l: "MARKET SHARE", v: z.sh, sub: z.shD === null ? "New territory" : `${z.shD > 0 ? "+" : ""}${z.shD} pts YoY`, c: z.shD === null ? C.textLight : z.shD < -5 ? C.red : z.shD < 0 ? C.orange : C.green },
                        ].map((m, mi) => (
                          <div key={mi} style={{ padding: "10px 12px", background: C.cream, borderRadius: 8 }}>
                            <div style={{ fontSize: 9, fontFamily: mono, color: C.textLight, letterSpacing: 0.4 }}>{m.l}</div>
                            <div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginTop: 4 }}>{m.v}</div>
                            <div style={{ fontSize: 10.5, fontFamily: mono, fontWeight: 600, color: m.c, marginTop: 2 }}>{m.sub}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <Takeaway color={C.orange} bg={C.orangePale}>Growth of 9.3% masks a divergence: Bihar (+20%) and Uttarakhand (+15%) accelerating, <strong style={{ color: C.red }}>Eastern UP declining with worst beat-level secondary drop in 12 months</strong>. Bihar drives 24% of incremental volume.</Takeaway>
        <AskBar prompts={["Break down volume by brand across zones", "Which beats declined most in E.UP?", "Show spend efficiency trend over last 6 months"]} onAsk={handleAsk} />
        </>}

        {/* BRAND VIEW */}
        {perfView === "brand" && <>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18 }}>
          <div style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, padding: "20px 22px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}><div><div style={{ fontSize: 10, fontFamily: mono, color: C.textLight, letterSpacing: 0.6 }}>TOTAL SECONDARY VOLUME</div><div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 6 }}><span style={{ fontSize: 32, fontWeight: 700, color: C.text, letterSpacing: -1 }}>48.2M</span><span style={{ fontSize: 13, color: C.textLight }}>cases</span></div><div style={{ fontSize: 12, fontFamily: mono, fontWeight: 600, color: C.green, marginTop: 4 }}>+9.3% vs Feb 2026</div></div>
              <div style={{ width: 200 }}>{brands.slice(0, 5).map(b => <div key={b.id} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}><span style={{ fontSize: 10, color: C.textLight, width: 55, textAlign: "right" }}>{b.n}</span><div style={{ flex: 1, height: 6, borderRadius: 3, background: C.cream, overflow: "hidden" }}><div style={{ width: `${(b.vol / 24) * 100}%`, height: "100%", borderRadius: 3, background: sC(b.st), opacity: 0.6 }} /></div><span style={{ fontSize: 10, fontFamily: mono, color: C.textMid, width: 32, textAlign: "right" }}>{b.vol}M</span></div>)}</div>
            </div>
          </div>
          <div style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, padding: "20px 22px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}><div><div style={{ fontSize: 10, fontFamily: mono, color: C.textLight, letterSpacing: 0.6 }}>BRAND PORTFOLIO</div><div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 6 }}><span style={{ fontSize: 32, fontWeight: 700, color: C.text, letterSpacing: -1 }}>7</span><span style={{ fontSize: 13, color: C.textLight }}>active brands</span></div><div style={{ fontSize: 12, fontFamily: mono, fontWeight: 600, color: C.green, marginTop: 4 }}>Thums Up: 45% of volume</div></div>
              <div style={{ display: "flex", gap: 12 }}><div style={{ textAlign: "center", padding: "10px 14px", background: C.greenPale, borderRadius: 10 }}><div style={{ fontSize: 9, fontFamily: mono, color: C.green }}>GROWING</div><div style={{ fontSize: 20, fontWeight: 700, color: C.green, marginTop: 2 }}>4</div><div style={{ fontSize: 10, color: C.green }}>Maaza best ROI</div></div><div style={{ textAlign: "center", padding: "10px 14px", background: C.orangePale, borderRadius: 10 }}><div style={{ fontSize: 9, fontFamily: mono, color: C.orange }}>UNDER PRESSURE</div><div style={{ fontSize: 20, fontWeight: 700, color: C.orange, marginTop: 2 }}>2</div><div style={{ fontSize: 10, color: C.orange }}>TU, Limca</div></div></div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {brands.map(b => {
            const color = sC(b.st);
            const isExp = expandedBrand === b.id;
            const months = ["Oct", "Nov", "Dec", "Jan", "Feb"];
            const tMin = Math.min(...b.trend) * 0.85;
            const tMax = Math.max(...b.trend) * 1.1;
            const chartW = 420, chartH = 120, padL = 40, padR = 12, padT = 8, padB = 24;
            const plotW = chartW - padL - padR, plotH = chartH - padT - padB;
            const toX = i => padL + (i / (b.trend.length - 1)) * plotW;
            const toY = v => padT + plotH - ((v - tMin) / (tMax - tMin || 1)) * plotH;
            const gridLines = [tMin, tMin + (tMax - tMin) / 2, tMax].map(v => Math.round(v * 10) / 10);
            return (
              <div key={b.id} onClick={() => setExpandedBrand(isExp ? null : b.id)} style={{ background: C.card, borderRadius: 12, border: `1px solid ${isExp ? `${color}40` : C.border}`, borderLeft: `3px solid ${color}`, boxShadow: isExp ? `0 4px 16px ${color}08` : "0 1px 3px rgba(0,0,0,0.03)", cursor: "pointer", overflow: "hidden", transition: "all 0.2s" }}>
                <div style={{ padding: "14px 20px", display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ minWidth: 150 }}>
                      <div style={{ fontSize: 15, fontWeight: 600, color: C.text }}>{b.n}</div>
                      <div style={{ fontSize: 11, color: C.textMid, marginTop: 2 }}>{b.note}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                      <span style={{ fontSize: 22, fontWeight: 700, color: C.text }}>{b.vol}M</span>
                      <span style={{ fontSize: 11, color: C.textLight }}>cases</span>
                      <span style={{ fontSize: 12, fontFamily: mono, fontWeight: 600, color: b.vd < 0 ? C.red : C.green, marginLeft: 4 }}>{b.vd > 0 ? "+" : ""}{b.vd}%</span>
                    </div>
                  </div>
                  <div style={{ width: 20, height: 20, borderRadius: 6, background: C.cream, display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 0.2s", transform: isExp ? "rotate(180deg)" : "none", flexShrink: 0 }}><span style={{ fontSize: 9, color: C.textLight }}>▾</span></div>
                </div>
                {isExp && (
                  <div style={{ padding: "0 20px 18px", borderTop: `1px solid ${C.borderLight}` }}>
                    <div style={{ display: "flex", gap: 16, paddingTop: 14 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 10, fontFamily: mono, color: C.textLight, letterSpacing: 0.4, marginBottom: 6 }}>SECONDARY VOLUME (M cases)</div>
                        <svg width={chartW} height={chartH} style={{ display: "block" }}>
                          {gridLines.map((v, i) => (<g key={i}><line x1={padL} y1={toY(v)} x2={chartW - padR} y2={toY(v)} stroke={C.borderLight} strokeWidth={0.5} strokeDasharray="3,4" /><text x={padL - 6} y={toY(v) + 3} textAnchor="end" fill={C.textLight} fontSize={9} fontFamily={mono}>{v}</text></g>))}
                          {months.map((m, i) => (<text key={i} x={toX(i)} y={chartH - 4} textAnchor="middle" fill={C.textLight} fontSize={9} fontFamily={mono}>{m}</text>))}
                          <polygon points={`${toX(0)},${toY(tMin)} ${b.trend.map((v, i) => `${toX(i)},${toY(v)}`).join(" ")} ${toX(b.trend.length - 1)},${toY(tMin)}`} fill={color} opacity={0.06} />
                          <polyline points={b.trend.map((v, i) => `${toX(i)},${toY(v)}`).join(" ")} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                          {b.trend.map((v, i) => (<g key={i}><circle cx={toX(i)} cy={toY(v)} r={3.5} fill={C.card} stroke={color} strokeWidth={2} />{i === b.trend.length - 1 && (<text x={toX(i)} y={toY(v) - 10} textAnchor="middle" fill={color} fontSize={10} fontWeight={700} fontFamily={mono}>{v}M</text>)}</g>))}
                          <line x1={padL} y1={padT} x2={padL} y2={chartH - padB} stroke={C.borderLight} strokeWidth={1} />
                        </svg>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, width: 280, flexShrink: 0 }}>
                        {[
                          { l: "TRADE SPEND", v: `₹${b.sp} Cr`, sub: `${b.sP}% of plan`, c: b.sP > 115 ? C.red : b.sP > 100 ? C.orange : C.green },
                          { l: "EFFICIENCY", v: `${b.ef}`, sub: "cases/₹", c: b.ef > 4.5 ? C.green : b.ef > 3 ? C.orange : C.red },
                          { l: "SKU MIX", v: b.skus.split(",").length.toString(), sub: b.skus.split(",")[0], c: C.textMid },
                          { l: "CATEGORY", v: b.sh, sub: b.shD === null ? "New segment" : `${b.shD > 0 ? "+" : ""}${b.shD} pts YoY`, c: b.shD === null ? C.textLight : b.shD < -3 ? C.red : b.shD < 0 ? C.orange : C.green },
                        ].map((m, mi) => (
                          <div key={mi} style={{ padding: "10px 12px", background: C.cream, borderRadius: 8 }}>
                            <div style={{ fontSize: 9, fontFamily: mono, color: C.textLight, letterSpacing: 0.4 }}>{m.l}</div>
                            <div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginTop: 4 }}>{m.v}</div>
                            <div style={{ fontSize: 10.5, fontFamily: mono, fontWeight: 600, color: m.c, marginTop: 2 }}>{m.sub}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <Takeaway color={C.orange} bg={C.orangePale}>Thums Up carries 45% of volume but 55% of trade spend at 118% of plan. <strong>Maaza 200ml Tetra is the highest-ROI format in portfolio (6.2x)</strong> but E.UP pre-load lagging at 28%. Limca declining 3 consecutive quarters as Lahori takes urban MT share.</Takeaway>
        <AskBar prompts={["Show Thums Up spend by zone and SKU", "Compare Maaza 200ml Tetra ROI vs other formats", "What's driving Limca decline by channel?"]} onAsk={handleAsk} />
        </>}

        {/* COMPETITIVE POSITION */}
        <SectionHead title="Competitive Position" sub="Market share and threat landscape" right={<SrcBadge id="nielsen" />} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, padding: "20px 24px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}><div style={{ fontFamily: serif, fontSize: 16, fontWeight: 600, color: C.text, marginBottom: 4 }}>Market Share Trend</div><div style={{ fontSize: 11, color: C.textLight, marginBottom: 14 }}>SLMG territories · Volume share · Jan 2026 audit</div><ShareChart /><Takeaway color={C.red} bg={C.redPale}>Coca-Cola lost 3.6 pts in 12 months. <strong>Campa (+5.3 pts) takes from Coca-Cola, not PepsiCo.</strong></Takeaway></div>
          <div style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, padding: "20px 24px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}><div style={{ fontFamily: serif, fontSize: 16, fontWeight: 600, color: C.text, marginBottom: 16 }}>Threat Breakdown</div>
            {[{ n: "Campa Cola (RCPL)", sh: "12.4%", d: "+5.3 pts", wd: "WD: Avg 42%, E.UP 61%", t: "Price + margin war in rural GT. ₹18/case retailer margin plus free coolers.", c: C.red }, { n: "Lahori + Flavored Soda", sh: "6.8%", d: "+3.6 pts", wd: "Share: UP urban ~11-13%", t: "Category creation in flavored soda. Growing 48% YoY in UP urban.", c: C.orange }, { n: "PepsiCo", sh: "18.1%", d: "-1.1 pts", wd: "WD: Stable", t: "Traditional competitor. Not the active threat.", c: C.blue }].map((comp, i) => <div key={i} style={{ padding: "14px 16px", background: C.cream, borderRadius: 10, marginBottom: i < 2 ? 10 : 0, borderLeft: `3px solid ${comp.c}` }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}><span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{comp.n}</span><div style={{ display: "flex", gap: 10, alignItems: "baseline" }}><span style={{ fontFamily: mono, fontSize: 16, fontWeight: 700, color: comp.c }}>{comp.sh}</span><span style={{ fontFamily: mono, fontSize: 11, color: comp.c, fontWeight: 600 }}>{comp.d}</span></div></div><div style={{ fontSize: 11, color: C.textLight, marginBottom: 4 }}>{comp.wd}</div><div style={{ fontSize: 12.5, color: C.textMid, lineHeight: 1.55 }}>{comp.t}</div></div>)}
          </div>
        </div>
        <AskBar prompts={["Simulate: if Campa WD reaches 70% in E.UP, what's the volume impact?", "Show our Limca+Sprite decline trend by month in Lucknow MT"]} onAsk={handleAsk} />

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
        </>}

        {/* ACTIONS: Schemes + Brand PPA + Fund Mgmt + Channel + Occasions */}
        {activeTab === "actions" && <>

        {/* FILTER + SEARCH BAR */}
        {(() => {
          const brands = [...new Set(runningSchemes.map(s => s.brand))];
          const zones = [...new Set(runningSchemes.map(s => s.zone))];
          const channels = [...new Set(runningSchemes.map(s => s.channel))];
          const statuses = [{ id: "all", label: "All" }, { id: "critical", label: "Critical" }, { id: "warn", label: "Attention" }, { id: "watch", label: "Watch" }, { id: "good", label: "On Track" }];

          const filtered = runningSchemes.filter(s => {
            if (schemeFilters.status !== "all" && s.st !== schemeFilters.status) return false;
            if (schemeFilters.brand !== "all" && s.brand !== schemeFilters.brand) return false;
            if (schemeFilters.zone !== "all" && s.zone !== schemeFilters.zone) return false;
            if (schemeFilters.channel !== "all" && s.channel !== schemeFilters.channel) return false;
            if (schemeSearch.trim()) {
              const q = schemeSearch.toLowerCase();
              return s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q) || s.brand.toLowerCase().includes(q) || s.zone.toLowerCase().includes(q) || s.mechanic.toLowerCase().includes(q) || s.detail.toLowerCase().includes(q);
            }
            return true;
          }).sort((a, b) => {
            const order = { critical: 0, warn: 1, watch: 2, good: 3 };
            return (order[a.st] || 4) - (order[b.st] || 4);
          });

          const SelectFilter = ({ value, onChange, options, label }) => (
            <div style={{ position: "relative" }}>
              <select value={value} onChange={e => onChange(e.target.value)} style={{
                appearance: "none", padding: "6px 28px 6px 10px", fontSize: 11, fontFamily: font,
                border: `1px solid ${value !== "all" ? C.green : C.border}`, borderRadius: 6,
                background: value !== "all" ? C.greenPale : C.card, color: value !== "all" ? C.green : C.textMid,
                cursor: "pointer", fontWeight: value !== "all" ? 600 : 400, outline: "none",
              }}>
                <option value="all">{label}</option>
                {options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
              <span style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", fontSize: 8, color: C.textLight, pointerEvents: "none" }}>▾</span>
            </div>
          );

          const hasFilters = schemeFilters.status !== "all" || schemeFilters.brand !== "all" || schemeFilters.zone !== "all" || schemeFilters.channel !== "all" || schemeSearch.trim();

          return <>

          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 20, flexWrap: "wrap" }}>
            {/* Search */}
            <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
              <input
                type="text" value={schemeSearch} onChange={e => setSchemeSearch(e.target.value)}
                placeholder="Search schemes, brands, zones, mechanics..."
                style={{ width: "100%", padding: "8px 12px 8px 32px", fontSize: 12, fontFamily: font, border: `1px solid ${C.border}`, borderRadius: 8, background: C.card, color: C.text, outline: "none" }}
                onFocus={e => e.target.style.borderColor = C.green}
                onBlur={e => e.target.style.borderColor = C.border}
              />
              <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 13, color: C.textLight }}>⌕</span>
            </div>
            {/* Status pills */}
            <div style={{ display: "flex", gap: 3 }}>
              {statuses.map(st => (
                <button key={st.id} onClick={() => setSchemeFilters(f => ({ ...f, status: f.status === st.id ? "all" : st.id }))} style={{
                  padding: "6px 10px", fontSize: 11, fontFamily: font, border: "none", borderRadius: 6, cursor: "pointer",
                  background: schemeFilters.status === st.id ? (st.id === "all" ? C.cream : sB(st.id)) : "transparent",
                  color: schemeFilters.status === st.id ? (st.id === "all" ? C.text : sC(st.id)) : C.textLight,
                  fontWeight: schemeFilters.status === st.id ? 600 : 400,
                }}>{st.label}</button>
              ))}
            </div>
            {/* Dropdowns */}
            <SelectFilter value={schemeFilters.brand} onChange={v => setSchemeFilters(f => ({ ...f, brand: v }))} options={brands} label="Brand" />
            <SelectFilter value={schemeFilters.zone} onChange={v => setSchemeFilters(f => ({ ...f, zone: v }))} options={zones} label="Zone" />
            <SelectFilter value={schemeFilters.channel} onChange={v => setSchemeFilters(f => ({ ...f, channel: v }))} options={channels} label="Channel" />
            {/* Clear */}
            {hasFilters && <button onClick={() => { setSchemeFilters({ status: "all", brand: "all", zone: "all", channel: "all" }); setSchemeSearch(""); }} style={{ padding: "6px 10px", fontSize: 11, color: C.red, background: "transparent", border: "none", cursor: "pointer", fontFamily: font }}>Clear</button>}
          </div>

        {/* RUNNING NOW */}
        <SectionHead title="Running Now" sub={`${filtered.length} of ${runningSchemes.length} schemes${hasFilters ? " (filtered)" : ""}`} />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.length === 0 && <div style={{ padding: "40px 20px", textAlign: "center", color: C.textLight, fontSize: 13 }}>No schemes match your filters. <button onClick={() => { setSchemeFilters({ status: "all", brand: "all", zone: "all", channel: "all" }); setSchemeSearch(""); }} style={{ color: C.green, background: "none", border: "none", cursor: "pointer", fontFamily: font, textDecoration: "underline" }}>Clear all</button></div>}
          {filtered.map(s => {
            const color = sC(s.st);
            return (
              <div key={s.id} style={{ background: C.card, borderRadius: 12, border: `1px solid ${C.border}`, borderLeft: `3px solid ${color}`, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
                <div style={{ padding: "18px 22px" }}>
                  {/* Row 1: Header */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <span style={{ fontSize: 10, fontFamily: mono, color: C.textLight }}>{s.id}</span>
                    <span style={{ fontSize: 15, fontWeight: 600, color: C.text, flex: 1 }}>{s.name}</span>
                    <Tag color={color} bg={sB(s.st)}>{sL(s.st)}</Tag>
                    {s.uplift && <div style={{ padding: "4px 14px", background: s.uplift >= 1.2 ? C.greenPale : s.uplift >= 1.1 ? C.orangePale : C.redPale, borderRadius: 6 }}>
                      <span style={{ fontFamily: mono, fontSize: 18, fontWeight: 700, color: s.uplift >= 1.2 ? C.green : s.uplift >= 1.1 ? C.orange : C.red }}>{s.uplift}x</span>
                    </div>}
                    {!s.uplift && <span style={{ fontSize: 10, fontFamily: mono, color: C.textLight, padding: "6px 14px", background: C.cream, borderRadius: 6 }}>New</span>}
                  </div>

                  {/* Row 2: Context line */}
                  <div style={{ display: "flex", gap: 16, marginBottom: 12, fontSize: 12, color: C.textMid, flexWrap: "wrap" }}>
                    <span><strong style={{ color: C.text }}>{s.brand}</strong> · {s.zone} · {s.channel}</span>
                    <span style={{ color: C.textLight }}>{s.start} to {s.end}</span>
                    {s.prevRun && <span style={{ color: C.textLight }}>Prev: {s.prevRun}</span>}
                  </div>

                  {/* Row 3: Mechanic */}
                  <div style={{ fontSize: 12, color: C.textMid, padding: "8px 14px", background: C.cream, borderRadius: 8, marginBottom: 14, fontFamily: mono, lineHeight: 1.5 }}>{s.mechanic}</div>

                  {/* Row 4: Metrics */}
                  <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
                    {[
                      { l: "SPEND", v: `Rs${s.spend} Cr`, c: s.spend > s.budget * 1.1 ? C.red : C.text },
                      { l: "BUDGET", v: `Rs${s.budget} Cr`, c: C.text },
                      { l: "PACE", v: `${Math.round((s.spend / s.budget) * 100)}%`, c: s.spend > s.budget * 1.1 ? C.red : s.spend > s.budget ? C.orange : C.green },
                      { l: "DISTRIBUTORS", v: s.distributors, c: C.text },
                      { l: "BEATS", v: s.beats || "-", c: C.text },
                      { l: "INC. CASES", v: s.incCases, c: C.green },
                      { l: "PASS-THRU", v: s.passThrough, c: parseInt(s.passThrough) < 70 ? C.red : parseInt(s.passThrough) < 85 ? C.orange : C.green },
                    ].map((m, mi) => (
                      <div key={mi} style={{ padding: "6px 12px", background: C.cream, borderRadius: 6, minWidth: 80 }}>
                        <div style={{ fontSize: 8.5, fontFamily: mono, color: C.textLight, letterSpacing: 0.3 }}>{m.l}</div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: m.c, marginTop: 2 }}>{m.v}</div>
                      </div>
                    ))}
                  </div>

                  {/* Row 5: Detail + Risk */}
                  <div style={{ fontSize: 13, color: C.textMid, lineHeight: 1.7, marginBottom: 10 }}>{s.detail}</div>
                  {s.risk && <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.6, padding: "10px 14px", background: s.st === "critical" ? C.redPale : s.st === "warn" ? C.orangePale : C.cream, borderRadius: 8, borderLeft: `3px solid ${color}` }}>
                    <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: 0.5, color: color, fontWeight: 700 }}>RISK </span>{s.risk}
                  </div>}

                  {/* Row 6: Ask prompts */}
                  {s.qs && <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
                    {s.qs.map((q, qi) => (
                      <button key={qi} onClick={() => handleAsk(q)} style={{ padding: "6px 12px", fontSize: 11, color: C.green, background: C.greenPale, border: `1px solid ${C.green}20`, borderRadius: 6, cursor: "pointer", fontFamily: font, lineHeight: 1.3, textAlign: "left" }}
                        onMouseEnter={e => { e.currentTarget.style.background = `${C.green}18`; }}
                        onMouseLeave={e => { e.currentTarget.style.background = C.greenPale; }}
                      >{q}</button>
                    ))}
                  </div>}
                </div>
              </div>
            );
          })}
        </div>
        <AskBar prompts={["Show all schemes ranked by uplift", "Simulate: terminate bottom 3 and redeploy", "Which schemes should I renew for Q2?"]} onAsk={handleAsk} />

        {/* BUDGET POSITION */}
        <SectionHead title="Budget Position" sub="Accruals vs budget by brand x zone. Overspend prediction." right={<SrcBadge id="scheme" />} />
        <div style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, padding: "20px 24px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr 0.8fr 0.4fr", gap: 2, marginBottom: 2 }}>
            {["Brand x Zone", "Allocated", "Accrued", "Utilization", "Exhausts", ""].map((h, i) => <div key={i} style={{ padding: "8px 12px", fontSize: 9, fontFamily: mono, color: C.textLight, letterSpacing: 0.5, background: C.cream }}>{h}</div>)}
          </div>
          {fundData.map((f, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr 0.8fr 0.4fr", gap: 2, marginBottom: 2 }}>
              <div style={{ padding: "10px 12px", fontSize: 13, fontWeight: 500, color: C.text, background: C.card }}>{f.brand} - {f.zone}</div>
              <div style={{ padding: "10px 12px", fontSize: 13, fontFamily: mono, color: C.textMid, background: C.card }}>Rs{f.alloc} Cr</div>
              <div style={{ padding: "10px 12px", fontSize: 13, fontFamily: mono, fontWeight: 600, color: f.pct > 115 ? C.red : f.pct > 100 ? C.orange : C.text, background: C.card }}>Rs{f.accrual} Cr</div>
              <div style={{ padding: "10px 12px", background: C.card }}><div style={{ height: 6, borderRadius: 3, background: C.cream, overflow: "hidden" }}><div style={{ width: `${Math.min(f.pct, 140) / 1.4}%`, height: "100%", borderRadius: 3, background: f.pct > 115 ? C.red : f.pct > 100 ? C.orange : C.green, opacity: 0.6 }} /></div><div style={{ fontSize: 10, fontFamily: mono, fontWeight: 600, color: f.pct > 115 ? C.red : f.pct > 100 ? C.orange : C.green, marginTop: 4 }}>{f.pct}%</div></div>
              <div style={{ padding: "10px 12px", fontSize: 12, fontFamily: mono, fontWeight: 600, color: f.st === "critical" ? C.red : f.st === "warn" ? C.orange : C.textMid, background: C.card }}>{f.exhausts}</div>
              <div style={{ padding: "10px 12px", background: C.card, display: "flex", alignItems: "center" }}><div style={{ width: 8, height: 8, borderRadius: "50%", background: sC(f.st) }} /></div>
            </div>
          ))}
        </div>
        <Takeaway color={C.red} bg={C.redPale}><strong>Thums Up E.UP budget exhausts Apr 2</strong>, 4 weeks before summer peak. Maaza E.UP Rs0.8 Cr underspent. Cross-brand reallocation available but needs approval.</Takeaway>
        <AskBar prompts={["Project all brand-zone exhaustion dates at current velocity", "What if we freeze the weakest E.UP Thums Up scheme?", "Simulate: reallocate Maaza underspend to Thums Up"]} onAsk={handleAsk} />

        {/* COMING UP */}
        <SectionHead title="Coming Up" sub="Events and activations on the horizon" />
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {comingUp.map((e, i) => {
            const color = sC(e.st);
            return (
              <div key={i} style={{ background: C.card, borderRadius: 12, border: `1px solid ${C.border}`, borderLeft: `3px solid ${color}`, padding: "16px 20px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 15, fontWeight: 600, color: C.text }}>{e.event}</span>
                    <span style={{ fontSize: 11, fontFamily: mono, fontWeight: 600, color: color, padding: "2px 10px", background: sB(e.st), borderRadius: 5 }}>
                      {typeof e.days === "number" ? `${e.days} days` : e.days}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <div style={{ padding: "4px 10px", background: C.cream, borderRadius: 6, fontSize: 11, fontFamily: mono, color: C.textMid }}>{e.budget}</div>
                    <div style={{ padding: "4px 10px", background: e.deployed === "25%" ? C.redPale : C.cream, borderRadius: 6, fontSize: 11, fontFamily: mono, color: e.deployed === "25%" ? C.red : C.textMid }}>{e.deployed}</div>
                  </div>
                </div>
                <div style={{ fontSize: 13, color: C.textMid, lineHeight: 1.65 }}>{e.detail}</div>
              </div>
            );
          })}
        </div>
        <AskBar prompts={["Build the Holi activation plan with zone-level detail", "Summer peak readiness checklist", "What micro-market events are in the next 30 days?"]} onAsk={handleAsk} />
        </>; })()}</>}

        <div style={{ marginTop: 48, paddingTop: 16, borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", paddingBottom: 24 }}>
          <span style={{ fontSize: 11, color: C.textLight }}>Questt AI · Intelligence Warehouse</span>
          <div style={{ display: "flex", gap: 8 }}>{Object.entries(sources).map(([k, s]) => <span key={k} style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 8px", borderRadius: 4, background: s.c === C.green ? C.greenPale : C.orangePale, fontSize: 8.5, fontFamily: mono }}><span style={{ width: 4, height: 4, borderRadius: "50%", background: s.c }} /><span style={{ color: C.textMid }}>{s.l}</span><span style={{ color: C.textLight }}>{s.lag}</span></span>)}</div>
        </div>
      </div>
      </div>{/* close marginLeft wrapper */}
      {trailModal && <>
        <div onClick={() => setTrailModal(null)} style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.4)", zIndex: 998, backdropFilter: "blur(3px)" }} />
        <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 640, maxHeight: "80vh", background: C.card, borderRadius: 16, boxShadow: "0 24px 80px rgba(0,0,0,0.2)", zIndex: 999, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ padding: "18px 24px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
            <div>
              <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: 1.2, color: C.textLight, marginBottom: 4 }}>AGENT REASONING CHAIN</div>
              <div style={{ fontFamily: serif, fontSize: 15, fontWeight: 600, color: C.text }}>{trailModal.hl}</div>
            </div>
            <button onClick={() => setTrailModal(null)} style={{ background: C.cream, border: "none", borderRadius: 8, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 16, color: C.textMid }}>×</button>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
            {trailModal.trail.map((st, i) => (
              <div key={i} style={{ display: "flex", gap: 14 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 26, flexShrink: 0 }}>
                  <div style={{ width: 26, height: 26, borderRadius: "50%", background: st.a === "Synthesis" ? C.green : C.card, border: `2px solid ${st.a === "Synthesis" ? C.green : C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: st.a === "Synthesis" ? "#fff" : C.textLight }}>{st.a === "Synthesis" ? "✦" : i + 1}</div>
                  {i < trailModal.trail.length - 1 && <div style={{ width: 1.5, flex: 1, minHeight: 14, background: C.borderLight }} />}
                </div>
                <div style={{ flex: 1, paddingBottom: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: st.a === "Synthesis" ? C.green : C.text }}>{st.a}</span>
                    {st.s && <SrcBadge id={st.s} />}
                  </div>
                  {st.q && <div style={{ fontSize: 11, color: C.textLight, fontFamily: mono, marginBottom: 8, lineHeight: 1.5 }}>Query: {st.q}</div>}
                  <div style={{ fontSize: 13, lineHeight: 1.7, ...(st.a === "Synthesis" ? { color: C.text, fontWeight: 500, padding: "12px 16px", background: C.greenPale, borderRadius: 8, borderLeft: `3px solid ${C.green}` } : { color: C.textMid }) }}>{st.f}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>}

      {/* CONVERSATION PANEL OVERLAY */}
      {convOpen && <>
        <div onClick={() => setConvOpen(false)} style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.3)", zIndex: 999, backdropFilter: "blur(2px)" }} />
        <ConvPanel messages={messages} onClose={() => setConvOpen(false)} onAsk={handleAsk} />
      </>}
    </div>
  );
}

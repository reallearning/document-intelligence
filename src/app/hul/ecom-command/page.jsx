"use client";
import { useState, useRef, useEffect } from "react";

/* ══════════════════════════════════════════════════════════════
   HUL - DIGITAL COMMERCE COMMAND CENTER
   Persona: Digital Commerce Manager, Home Care, North India
   Channels: Amazon, Flipkart, Blinkit, Zepto, Instamart
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
  vc: { l: "Amazon Vendor Central", lag: "T+1", c: C.green },
  fksh: { l: "Flipkart Supplier Hub", lag: "T+1", c: C.green },
  eshelf: { l: "eShelf Monitor", lag: "T+0", c: C.green },
  ads: { l: "Amazon/FK Ads", lag: "T+1", c: C.green },
  ba: { l: "Brand Analytics", lag: "T+1", c: C.green },
  nielsen: { l: "Nielsen Ecom Panel", lag: "~4 wk", c: C.orange },
};

/* ═══ CONVERSATION RESPONSES ═══ */
const convResponses = {
  "Break down the Rs 14.8 Cr monthly revenue by platform and brand": {
    agents: ["Revenue Analyzer", "Platform Benchmarker"],
    sources: ["vc", "fksh", "eshelf"],
    body: `**Monthly Revenue Breakdown: Feb 2026 (₹14.8 Cr)**

**By Platform:**

| Platform | Revenue | % of Total | MoM Growth | YoY Growth |
|---|---|---|---|---|
| Amazon | ₹6.2 Cr | 42% | +8% | +18% |
| Flipkart | ₹4.8 Cr | 32% | +6% | +22% |
| Blinkit | ₹1.8 Cr | 12% | +14% | +85% |
| Zepto | ₹1.2 Cr | 8% | +12% | +120% |
| Instamart | ₹0.8 Cr | 6% | +4% | +28% |

**By Brand (top 5):**

| Brand | Revenue | % of Total | Best Platform | Fastest Growing |
|---|---|---|---|---|
| Surf Excel | ₹5.2 Cr | 35% | Amazon (₹2.4 Cr) | Blinkit (+52%) |
| Vim | ₹3.1 Cr | 21% | Flipkart (₹1.2 Cr) | Zepto (+48%) |
| Dove | ₹2.8 Cr | 19% | Amazon (₹1.3 Cr) | Blinkit (+44%) |
| Rin | ₹1.9 Cr | 13% | Flipkart (₹0.8 Cr) | Zepto (+38%) |
| Pears + Others | ₹1.8 Cr | 12% | Amazon (₹0.7 Cr) | Instamart (+22%) |

**Key signal:** Qcom platforms (Blinkit + Zepto + Instamart) now account for 26% of ecom revenue, up from 14% a year ago. Growth rate is 3-4x marketplace growth. At current trajectory, qcom overtakes Flipkart by Q1 FY28.

**Platform mix risk:** Amazon at 42% means HUL is heavily dependent on one platform. The OLA penalty + SoS erosion on Amazon directly impacts nearly half of online revenue. Flipkart diversification and qcom growth are both strategically important.`,
    followUps: ["Show revenue trend by platform over 12 months", "Which brand-platform combination has the highest margin?", "What's the qcom overtake timeline?"],
  },
  "Which SKUs are dragging OLA below 90% and what's the revenue impact?": {
    agents: ["Availability Analyzer", "Revenue Impact Model"],
    sources: ["vc", "fksh", "eshelf"],
    body: `**OLA Below 90%: 8 SKUs with Revenue Impact**

| SKU | Platform | OLA | Days Below 90% | Daily Rev Loss | Rank Impact |
|---|---|---|---|---|---|
| Surf Excel 500g | Amazon | 72% | 6 days | ₹1.2L | -12 positions |
| Surf Excel 1kg | Flipkart | 84% | 3 days | ₹0.6L | -4 positions |
| Vim Liquid 500ml | Amazon | 78% | 5 days | ₹0.8L | -8 positions |
| Rin 1kg | Amazon | 82% | 4 days | ₹0.4L | -6 positions |
| Dove 340ml | Zepto | 74% | 4 days | ₹0.3L | N/A (qcom) |
| Surf Excel 500g | Zepto | 68% | 7 days | ₹0.3L | N/A (qcom) |
| Vim Bar 250g | Blinkit | 80% | 3 days | ₹0.2L | N/A (qcom) |
| Rin 500g | Flipkart | 86% | 2 days | ₹0.2L | -3 positions |

**Total daily revenue at risk: ₹4.0L/day (₹28L/week)**

**Root causes differ by platform:**
- **Amazon (4 SKUs):** Vendor Central inventory depletion. PO fill rate and ASN compliance issues. Supply chain escalation needed.
- **Flipkart (2 SKUs):** Supplier Hub shows shipment in transit. Expected to normalize in 2-3 days.
- **Qcom (2 SKUs):** Not an inventory issue — these SKUs are intermittently delisted during peak hours when dark store stock runs out. Platform-side replenishment frequency problem.

**Priority:** Surf Excel 500g on Amazon is 30% of the total impact. Fix that one and the weekly exposure drops from ₹28L to ₹19.6L.`,
    followUps: ["Draft the supply chain escalation for Amazon SKUs", "What's causing the qcom peak-hour delistings?", "Show OLA trend over 30 days for Surf Excel 500g"],
  },
  "Why is ROAS declining and where should I reallocate ad spend?": {
    agents: ["Ad Performance Analyzer", "Budget Optimizer"],
    sources: ["ads", "eshelf"],
    body: `**ROAS Decline Analysis: Feb vs Jan 2026**

| Platform | Jan ROAS | Feb ROAS | Change | Root Cause |
|---|---|---|---|---|
| Amazon | 4.1x | 3.4x | -0.7x | ITC bid escalation + OLA-driven rank loss increasing CPC |
| Flipkart | 4.4x | 4.1x | -0.3x | Slight CPC inflation, within normal range |
| Blinkit | 3.2x | 2.8x | -0.4x | Unauthorized pricing cannibalizing organic — ads driving sales that would've happened anyway |
| Zepto | 2.8x | 2.4x | -0.4x | Low content quality depressing conversion on ad traffic |
| Instamart | 3.2x | 3.0x | -0.2x | Platform deprioritizing Home Care in category rankings |

**The Amazon ROAS decline is the most concerning** because it's the largest spend pool (₹58L/month). Two converging factors: (1) ITC increased bids ~40% on generic keywords, inflating our CPC. (2) OLA-driven organic rank loss means we're paying for clicks we used to get for free.

**Reallocation recommendation:**

| Action | From | To | Monthly Shift | Expected ROAS |
|---|---|---|---|---|
| Pause Rin keyword campaigns | Amazon (₹8L) | - | -₹8L | Current: 1.8x (below breakeven) |
| Redirect to Flipkart Surf Excel | - | Flipkart (₹8L) | +₹8L | Projected: 4.4x |
| Reduce Blinkit ads until pricing fixed | Blinkit (₹4L) | - | -₹4L | Current: 2.8x but cannibalizing organic |
| Increase Amazon Surf Excel defense | - | Amazon (₹4L) | +₹4L | Bridge spend: ~3.0x (defensive, not growth) |

**Net impact:** Same ₹125L total budget. Blended ROAS improves from 3.4x to estimated 3.8x. Rin campaigns reactivate after content refresh (6 weeks).`,
    followUps: ["Implement the reallocation now", "What would happen if we just matched ITC's bids on Amazon?", "Show the keyword-level ROAS for Amazon campaigns"],
  },
  "What's causing the Surf Excel 500g OLA drop on Amazon?": {
    agents: ["Availability Analyzer", "Vendor Central Inventory Health"],
    sources: ["vc", "vc"],
    body: `**Surf Excel 500g Amazon OLA Root Cause**

The OLA drop from 96% to 72% traces to Amazon sellable inventory depletion — Vendor Central Inventory Health shows Surf Excel 500g at 3.2 days cover vs the 14-day replenishment target.

| Metric | Value | Threshold | Status |
|---|---|---|---|
| Sellable Inventory (units) | 2,840 | >8,000 | Critical |
| Days of Cover | 3.2 | >14 days | Critical |
| Open PO Fill Rate | 82% | >95% | Warning |
| ASN On-Time % (last 4 POs) | 71% | >90% | Warning |
| Unfulfillable Inventory | 420 units | <100 | Warning |

**Root cause:** PO #HUL-2026-4482 (8,000 units, due Feb 25) shipped with 82% fill rate and arrived 4 days late. Amazon's replenishment algorithm reduced the next PO quantity by 20% as a penalty for the late ASN. This created a compounding gap: less stock ordered → faster depletion → OLA drop → rank penalty.

**What the Digital Commerce team can do:**
- **Immediate (today):** Increase sponsored bids on 5 affected keywords to offset organic rank loss. Estimated bridge cost: Rs 4.5L/week.
- **Escalation (today):** Flag to supply chain with revenue impact data — Rs 8.4L/week at risk. Current PO fill rate 82%, ASN compliance 71%. Both are driving Amazon's replenishment penalty.
- **Platform relationship:** Request HUL's Amazon vendor manager to manually override the PO penalty and issue an expedited replenishment order.

**What the Digital Commerce team cannot do:** The underlying fix (shipping faster, improving ASN compliance) sits with the supply chain team. The DCM's role is to quantify the commercial impact and escalate with urgency.

**Revenue at risk:** Rs 8.4L/week (direct OLA loss + organic rank erosion). The rank penalty extends 2-3 weeks beyond OLA recovery.`,
    followUps: ["Draft the supply chain escalation with revenue impact", "What's the search rank impact so far?", "Show OLA trend for all Home Care SKUs on Amazon"],
  },
  "What's the search rank impact so far?": {
    agents: ["Search Rank Analyzer", "Revenue Impact Model"],
    sources: ["eshelf", "vc"],
    body: `**Search Rank Erosion: Surf Excel 500g on Amazon**

Amazon A9 algorithm penalizes listings with low availability. Here's what's happened in 6 days:

| Keyword | Rank Before (Feb 24) | Rank Now (Mar 2) | Drop | Est. Daily Sessions Lost |
|---|---|---|---|---|
| "surf excel" | #1 | #1 | 0 | 0 (brand search protected) |
| "detergent powder" | #3 | #8 | -5 | ~420 |
| "washing powder 500g" | #2 | #11 | -9 | ~280 |
| "surf excel 500g" | #1 | #3 | -2 | ~150 |
| "laundry detergent" | #5 | #14 | -9 | ~340 |

**Total estimated daily session loss: ~2,100 sessions.** At 8.2% conversion rate and Rs 245 ASP, that's Rs 42K/day in lost revenue from rank erosion alone — on top of the direct OLA-driven losses.

**The compounding problem:** Rank recovery lags OLA recovery by 2-3 weeks. Even after we fix the inventory, the organic rank won't bounce back immediately. Every additional day at 72% OLA extends the recovery tail.

**Recommendation:** (1) Brief the Amazon vendor manager on the supply chain root cause — if Amazon classifies this as a one-time exception rather than chronic underperformance, the rank penalty duration may be reduced. (2) Deploy Rs 4.5L/week in sponsored ads to hold visibility on the 5 affected keywords while organic rank recovers.`,
    followUps: ["Brief the Amazon vendor manager on root cause", "What's our sponsored ad strategy to cover the rank gap?", "Compare this to the last OLA incident"],
  },
  "Show me the full SoS breakdown by keyword cluster": {
    agents: ["SoS Analyzer", "Competitive Intelligence"],
    sources: ["eshelf", "ads"],
    body: `**Share of Search: Home Care Category on Amazon (Feb 2026)**

| Keyword Cluster | HUL SoS | ITC SoS | P&G SoS | Others | HUL Trend |
|---|---|---|---|---|---|
| "detergent" (generic) | 34% | 18% | 22% | 26% | -4 pts MoM |
| "surf excel" (branded) | 88% | 2% | 1% | 9% | Stable |
| "dish wash" | 42% | 28% | 8% | 22% | -3 pts MoM |
| "washing powder" | 38% | 22% | 18% | 22% | -6 pts MoM |
| "liquid detergent" | 28% | 14% | 32% | 26% | -2 pts MoM |
| "bar soap" / "bathing" | 45% | 12% | 16% | 27% | -1 pt MoM |

**The 6-point SoS decline is concentrated in "washing powder" and "detergent" generic keywords.** Branded searches are stable — consumers who search "surf excel" still find us. But consumers searching generic category terms are increasingly seeing ITC and D2C brands above us.

**Root cause:** Our organic rank is slipping (OLA penalty) AND ITC has increased sponsored ad spend by ~40% on these keywords in Feb. They're bidding aggressively on "detergent powder" and "washing powder" — keywords where we were #1-3 organically.

**Implication:** We're being squeezed from two sides: organic rank decay (fixable with OLA) + paid competition (requires ad spend response).`,
    followUps: ["What would it cost to defend SoS on these keywords?", "Show me ITC's ad strategy in detail", "Compare SoS across Amazon vs Flipkart"],
  },
  "What would it cost to defend SoS on these keywords?": {
    agents: ["Ad Spend Optimizer", "Budget Simulator"],
    sources: ["ads", "eshelf"],
    body: `**SoS Defense: Cost to Recover 6 Points on Generic Keywords**

| Keyword | Current Bid | Competitor Bid (est.) | Required Bid | Monthly Cost | ROAS (est.) |
|---|---|---|---|---|---|
| "detergent powder" | Rs 8.50 | Rs 12.00 | Rs 14.00 | Rs 4.2L | 3.8x |
| "washing powder 500g" | Rs 6.20 | Rs 9.50 | Rs 11.00 | Rs 2.8L | 4.2x |
| "dish wash liquid" | Rs 5.80 | Rs 8.00 | Rs 9.50 | Rs 2.1L | 3.5x |
| "laundry detergent" | Rs 7.40 | Rs 11.00 | Rs 13.00 | Rs 3.6L | 3.2x |
| **Total incremental** | - | - | - | **Rs 18L/mo** | **3.7x avg** |

**At Rs 18L/month incremental ad spend, projected SoS recovery: 4-5 points within 30 days.** The remaining 1-2 points require organic rank recovery (OLA fix).

**However:** This is treating the symptom, not the cause. If we fix OLA first, organic rank recovers in 2-3 weeks, and we only need Rs 8L/month maintenance to hold position. The Rs 18L is a bridge cost, not permanent.

**Recommendation:** Increase sponsored bids NOW (Rs 18L bridge), fix OLA this week (FC transfer), then step down ad spend to Rs 5L/month maintenance in 3 weeks when organic rank recovers. Total bridge cost: Rs 24L over 4 weeks vs Rs 8.4L/week revenue loss from doing nothing.`,
    followUps: ["Approve the Rs 18L bridge spend", "What if ITC keeps escalating bids?", "Show the ROAS trend for each keyword"],
  },
  "Show me the pricing conflict across platforms": {
    agents: ["Pricing Intelligence", "MAP Compliance"],
    sources: ["eshelf"],
    body: `**Cross-Platform Pricing: Surf Excel 1kg (MRP Rs 275)**

| Platform | Listing Price | Platform Coupon | Effective Price | vs MRP | Status |
|---|---|---|---|---|---|
| Amazon | Rs 265 | Rs 10 off (subscribe) | Rs 255 | -7.3% | Compliant |
| Flipkart | Rs 268 | Rs 15 off (SuperCoins) | Rs 253 | -8.0% | Compliant |
| Blinkit | Rs 275 | Rs 25 off (new user) | Rs 250 | -9.1% | Non-compliant |
| Zepto | Rs 275 | Rs 20 off (flash sale) | Rs 255 | -7.3% | Borderline |
| Instamart | Rs 268 | None | Rs 268 | -2.5% | Compliant |
| **GT MRP** | **Rs 275** | - | **Rs 275** | - | **Reference** |

**Blinkit is the problem.** The Rs 25 new-user coupon brings the effective price to Rs 250 — Rs 25 below GT MRP. This isn't a HUL-authorized discount; Blinkit is funding it from their own acquisition budget. But it creates channel conflict: GT retailers in Lucknow and Delhi are already complaining that "customers buy from Blinkit at Rs 250 instead of my shop."

**Three Bareilly distributors flagged this in the last 2 weeks.** The overlap with the billing anomaly in 12 Bareilly beats (from the RSM watchtower) is worth investigating — some of that GT demand erosion may be channel migration, not competitive displacement.

**This is the IW cross-channel signal:** The RSM sees billing decline and suspects ITC. The ecom view sees qcom undercutting. The truth may be both.`,
    followUps: ["Escalate the Blinkit pricing to category head", "Show me pin-code overlap between Blinkit orders and GT billing decline", "What's our MAP enforcement mechanism?"],
  },
  "Show me pin-code overlap between Blinkit orders and GT billing decline": {
    agents: ["Cross-Channel Analyzer", "Geo Correlator"],
    sources: ["eshelf", "vc"],
    body: `**Cross-Channel Signal: Blinkit Orders vs GT Billing Decline**

This is the analysis that only the Intelligence Warehouse can produce — correlating ecom platform data with GT primary billing:

| Pin Code Cluster | GT Billing Change (12 wks) | Blinkit Order Growth | Overlap Score |
|---|---|---|---|
| Bareilly City (243001-243005) | -18% | +42% | High |
| Rampur (244901-244903) | -14% | +28% | Medium |
| Lucknow Central (226001-226010) | -4% | +68% | Low (different dynamics) |
| Gorakhpur City (273001-273005) | +2% | +22% | None |

**Bareilly City shows the strongest correlation:** GT billing down 18% in the same pin codes where Blinkit orders are up 42%. The timing aligns — Blinkit launched 10-minute delivery in Bareilly on Jan 15, and the GT decline started 2-3 weeks later.

**But it's not the full story.** ITC distributor expansion also happened in Bareilly in the same period. The 18% GT decline is likely a combination: ~8-10% channel migration to qcom + ~8-10% competitive displacement by ITC. Neither factor alone explains the full decline.

**This is exactly why the IW matters.** The RSM looking at GT data alone would attribute 100% to ITC. The ecom team looking at Blinkit data alone would celebrate the growth. Only the connected view shows the real picture: demand is both migrating AND being competed away.`,
    followUps: ["How do we present this to the category head?", "What's the net impact on HUL overall (GT loss vs ecom gain)?", "Should we reduce Blinkit visibility to protect GT?"],
  },
  "What's our content score vs competition on Amazon?": {
    agents: ["Content Analyzer", "Competitive Benchmarker"],
    sources: ["eshelf"],
    body: `**Content Score Benchmarking: Home Care on Amazon**

Amazon Content Score is composite: A+ content, image count, video, bullet points, review count, rating.

| SKU | HUL Score | Category P50 | ITC Score | Gap | Issue |
|---|---|---|---|---|---|
| Surf Excel 1kg | 82/100 | 74 | 78 | Above avg | Images dated (2023) |
| Surf Excel 500g | 68/100 | 74 | 76 | Below P50 | No video, 3 images only |
| Vim Liquid 500ml | 71/100 | 72 | 80 | Below P50 | ITC Nimwash has A+ content |
| Dove Shampoo 340ml | 86/100 | 78 | 72 | Strong | Good A+ + video |
| Rin 1kg | 58/100 | 74 | 82 | Well below | No A+ content, 2 images |

**8 SKUs are below platform P50.** The worst offender is Rin 1kg — no A+ content, only 2 product images (front and back of pack), zero video. Meanwhile ITC's Rin competitor (Ghadi) has 6 images, A+ infographics, and a usage video.

**Content directly impacts conversion rate.** Amazon data shows SKUs above P75 content score convert 22% higher than SKUs below P50. For Surf Excel 500g alone, fixing content from 68 to 80+ would add an estimated 1.4 percentage points to conversion — worth Rs 14L/month at current traffic levels.

**The content gap is also a paid efficiency problem.** Running sponsored ads to listings with poor content is like paying for footfall to a store with empty shelves. ROAS on Rin campaigns is 1.8x vs 4.2x for Dove (Buy Box % also lower on Rin: 92% vs 98% for Dove) — content quality is the primary differentiator.`,
    followUps: ["Prioritize the content fixes by revenue impact", "What does the content update process look like?", "Compare content scores across Amazon vs Flipkart"],
  },
  "Show me qcom dark store availability by city": {
    agents: ["Qcom Availability Monitor"],
    sources: ["eshelf"],
    body: `**Quick Commerce Availability Check: HUL Home Care (eShelf scan, Feb 2026)**

Pin-code level availability scan across 24 North India pin codes:

| City | Platform | SKUs Listed (of 18) | "In Stock" Rate | Top Gaps |
|---|---|---|---|---|
| Lucknow | Blinkit | 12 | 84% | Vim Liquid 500ml, Rin 1kg not listed |
| Lucknow | Zepto | 10 | 76% | Surf Excel 500g OOS 30% of scans, Dove 180ml missing |
| Lucknow | Instamart | 14 | 88% | Rin Bar, Pears 75g intermittent |
| Delhi NCR | Blinkit | 16 | 94% | Near-complete coverage |
| Delhi NCR | Zepto | 15 | 91% | Minor intermittent gaps |
| Varanasi | Blinkit | 8 | 68% | Only 8 SKUs listed. No Zepto/Instamart presence yet |

**Data caveat:** We don't have dark store inventory visibility. These numbers come from automated listing scans at pin-code level — checking "is the SKU showing as available to order right now?" every 4 hours. The "In Stock" rate is the % of scan windows where the SKU was orderable.

**Lucknow is the growth opportunity.** 6 missing SKUs across platforms = demand we're leaving on the table. The fix requires working with platform category managers to expand the assortment catalog — HUL can't push SKUs into dark stores unilaterally.

**Delhi NCR is the benchmark:** 94% availability, 16 of 18 SKUs. Replicating Delhi's catalog in Lucknow and Varanasi is a category manager conversation, not a supply chain fix.`,
    followUps: ["What's the revenue opportunity from fixing Lucknow gaps?", "How do we get more SKUs into Zepto dark stores?", "Compare qcom growth rate by city"],
  },
  "What's the Flipkart Big Billion Day pre-positioning status?": {
    agents: ["Event Readiness Tracker"],
    sources: ["fksh", "vc"],
    body: `**Big Billion Days Readiness: HUL Home Care (Event: Oct 2026)**

Event is 7 months away, but pre-positioning starts now:

| Item | Status | Owner | Risk |
|---|---|---|---|
| Hero SKU selection (top 8) | Done | Category | Low |
| Pricing negotiation with FK | In progress | Commercial | Medium: FK wants 15% discount vs our 10% offer |
| FBA inventory pre-load | Not started | Supply Chain | Medium: needs 3x normal stock by Sep 15 |
| A+ content refresh | 3 of 8 done | Content | High: 5 SKUs still have 2024 content |
| Sponsored ad budget (Rs 1.2 Cr) | Approved | Ads | Low |
| Deal page creative | Not started | Marketing | Medium: brief not issued |
| Competitor deal monitoring | Active | Intelligence | Low |

**The content refresh is the biggest risk.** If we run Rs 1.2 Cr in ads pointing to listings with 2024 content, conversion will underperform. Based on BBD 2025 data: SKUs with refreshed content converted 34% higher during the event.

**Pre-positioning timeline:**
- Now - Jun: Content + creative
- Jul - Aug: Pricing finalized, inventory planning
- Sep 1-15: FBA pre-load (3x normal)
- Sep 20: Deal page live for early access
- Oct (BBD): Execute

**This is 7 months out but the content bottleneck needs to unblock now. The content team has a 6-week turnaround per SKU. Starting 5 refreshes today means completion by mid-April — barely in time for summer promos, let alone BBD.**`,
    followUps: ["Escalate the content refresh to priority", "What was our BBD 2025 performance?", "Show Flipkart vs Amazon event ROI comparison"],
  },
  "What's the net margin comparison across channels?": {
    agents: ["Channel P&L Analyzer"],
    sources: ["vc", "fksh", "eshelf"],
    body: `**Channel Net Realization: Surf Excel 1kg (MRP Rs 275)**

| Component | GT | Amazon FBA | Flipkart | Blinkit | Zepto |
|---|---|---|---|---|---|
| Gross realization | Rs 275 | Rs 265 | Rs 268 | Rs 275 | Rs 275 |
| Platform commission | - | Rs 22 (8.3%) | Rs 19 (7.1%) | Rs 28 (10.2%) | Rs 30 (10.9%) |
| Fulfillment/logistics | Rs 8 | Rs 18 | Rs 15 | Rs 22 | Rs 24 |
| Returns (4-5%) | Rs 2 | Rs 12 | Rs 10 | Rs 6 | Rs 7 |
| Chargebacks/penalties | - | Rs 4 | Rs 2 | - | - |
| Ad spend (allocated) | - | Rs 12 | Rs 8 | Rs 5 | Rs 3 |
| **Net realization** | **Rs 265** | **Rs 197** | **Rs 214** | **Rs 214** | **Rs 209** |
| **% of GT net** | **100%** | **74%** | **81%** | **81%** | **79%** |

**Every ecom/qcom channel delivers 19-26% lower net realization than GT.** This is the structural tension: ecom is growing 3x faster but at 20% lower margins.

**The question isn't whether ecom is less profitable — it is. The question is whether the volume growth compensates.** At current growth rates:
- Amazon: +18% YoY volume, -23% margin = net positive (volume outpaces margin erosion)
- Flipkart: +22% YoY, -17% margin = clearly net positive
- Blinkit: +85% YoY, -18% margin = strongly net positive despite low margins
- Zepto: +120% YoY (small base), -20% margin = net positive but watch CODB trend

**The real risk is if qcom margin compression continues.** Blinkit's commission has gone from 8% to 10.2% in 12 months. If it reaches 14% (which is their stated target), net realization drops to Rs 204 — the point where volume growth barely compensates.`,
    followUps: ["At what commission rate does qcom become unprofitable?", "Show the margin trend over 12 months", "How does this compare to ITC's ecom margins?"],
  },
  "Show me the promo calendar conflict across platforms": {
    agents: ["Promo Calendar Manager"],
    sources: ["eshelf", "ads"],
    body: `**Promo Calendar: March-April 2026 (All Platforms)**

| Date | Platform | Promo | HUL Authorized? | Effective Price | Issue |
|---|---|---|---|---|---|
| Mar 1-15 | Amazon | Subscribe & Save 10% | Yes | Rs 238 (SE 1kg) | Compliant |
| Mar 5-12 | Blinkit | New User Rs 25 off | No | Rs 250 (SE 1kg) | MAP conflict |
| Mar 8-10 | Zepto | Flash sale Rs 20 off | No | Rs 255 (SE 1kg) | Borderline |
| Mar 14 | All | Holi combo | Yes | Rs 149 (gift box) | Coordinated |
| Mar 18-22 | Flipkart | Brand Day | Yes | Rs 248 (SE 1kg) | Approved deal |
| Apr 1-7 | Amazon | Spring Sale | Pending | TBD | Budget not approved |
| Apr 10-15 | Blinkit | IPL promo | Not discussed | TBD | Risk of unauthorized discount |

**The pattern:** Marketplace promos (Amazon, Flipkart) are mostly authorized and coordinated. Qcom promos (Blinkit, Zepto) are increasingly unauthorized — platforms using HUL products as customer acquisition subsidies.

**March has 3 overlapping promo windows** where the same SKU is at different prices across channels. A consumer in Lucknow checking all platforms sees Surf Excel 1kg at: Rs 238 (Amazon Subscribe), Rs 250 (Blinkit), Rs 255 (Zepto), Rs 275 (GT). This 15% price band creates confusion and channel conflict.

**Recommendation:** Establish a unified promo calendar shared with all platform teams. Flag any discount >8% below MRP for category head approval. Blinkit's new-user coupon needs escalation — it's their acquisition cost, but it's our channel conflict.`,
    followUps: ["Draft the escalation note to Blinkit", "What's the GT impact of the March pricing spread?", "Build a unified promo calendar template"],
  },
};

/* ═══ INSIGHT CARDS ═══ */
const briefCards = [
  {
    id: "ola", sev: "critical", type: "AVAILABILITY ALERT", scope: "Amazon · 8 SKUs",
    hl: "Surf Excel 500g OLA at 72% on Amazon for 6 consecutive days — search rank eroding",
    sum: "8 Home Care SKUs below 90% OLA threshold. Surf Excel 500g is the most critical: 72% on Amazon, losing ~12 organic rank positions. Compounding effect: lower OLA reduces sales, which reduces rank, which reduces visibility even after OLA recovers.",
    kpis: [{ l: "SKUs < 90%", v: "8", d: "of 18 tracked", b: 1 }, { l: "Worst OLA", v: "72%", d: "SE 500g, Amazon", b: 1 }, { l: "Rank Drop", v: "-12 avg", d: "6 days", b: 1 }, { l: "Rev at Risk", v: "₹8.4L/wk", d: "Direct + rank", b: 1 }],
    ev: [{ s: "vc", t: "Surf Excel 500g OLA at 72% since Feb 25. Vendor Central Inventory Health shows 3.2 days sellable cover vs 14-day target." }, { s: "eshelf", t: "Organic rank dropped from #3 to #11 on 'washing powder 500g'. Recovery takes 2-3 weeks after OLA normalizes." }, { s: "vc", t: "PO #HUL-2026-4482 shipped late with 82% fill rate. Amazon penalized next PO quantity by 20%. Sellable inventory at 3.2 days cover vs 14-day target." }],
    dec: { act: "Escalate to supply chain with revenue impact: Rs 8.4L/week at risk. Current PO fill rate 82%, ASN compliance 71% — both driving Amazon PO penalties. In parallel, increase sponsored bids on 5 affected keywords to bridge organic rank gap while availability recovers.", why: "Every additional day at 72% extends rank recovery by 2-3 days. The rank penalty compounds.", imp: "Rs 8.4L/week revenue at risk. Ad bridge costs Rs 4.5L/week but protects rank position until OLA recovers.", conf: "High", time: "Escalation: today. Ad bridge: deploy today. OLA recovery: depends on supply chain response. Rank recovery: 2-3 weeks after OLA normalizes." },
    trail: [{ a: "Availability Monitor", q: "OLA by SKU, Amazon, 14 days", f: "8 SKUs below 90%. Surf Excel 500g worst at 72% for 6 days. Vendor Central shows 3.2 days sellable cover. ASN compliance at 71% triggered PO penalty.", s: "vc" }, { a: "Search Rank Agent", q: "Organic rank change, 7 days, affected SKUs", f: "Average -12 positions across 5 generic keywords. Branded keywords stable. Revenue impact: Rs 24K/day from rank erosion alone.", s: "eshelf" }, { a: "Synthesis", q: null, f: "Amazon inventory depletion is root cause. Supply chain escalation + sponsored ad bridge is the fastest recovery path available to the digital commerce team.", s: null }],
    qs: ["What's causing the Surf Excel 500g OLA drop on Amazon?", "What's the search rank impact so far?", "Show OLA trend for all Home Care SKUs on Amazon"],
  },
  {
    id: "pricing", sev: "warn", type: "CHANNEL CONFLICT", scope: "Blinkit · Surf Excel",
    hl: "Blinkit running Rs 25 off on Surf Excel 1kg — not HUL-authorized, undercutting GT by 9%",
    sum: "New-user coupon brings effective price to Rs 250 vs GT MRP Rs 275. Three Bareilly distributors have flagged retailer complaints. The pricing gap correlates with the GT billing anomaly in 12 Bareilly beats — possible channel migration signal.",
    kpis: [{ l: "Price Gap", v: "Rs 25", d: "vs GT MRP", b: 1 }, { l: "Effective", v: "Rs 250", d: "Blinkit", b: 1 }, { l: "GT Complaints", v: "3 dists", d: "Bareilly", b: 1 }, { l: "Overlap", v: "12 beats", d: "with GT decline", b: 1 }],
    ev: [{ s: "eshelf", t: "Blinkit effective price Rs 250 (Rs 25 new-user coupon) vs Amazon Rs 255 (subscribe), Flipkart Rs 253, GT Rs 275." }, { s: "eshelf", t: "Coupon is Blinkit-funded (customer acquisition), not HUL-authorized. Live since Feb 15." }],
    dec: { act: "Escalate to Blinkit category manager with MAP policy reference. Simultaneously, investigate pin-code overlap between Blinkit order growth and GT billing decline to quantify channel migration.", why: "9% price gap is unsustainable for GT retailers. If this becomes permanent, GT distributors will reduce orders.", imp: "Cross-channel integrity. GT billing protection in Bareilly.", conf: "Medium", time: "Escalation: today. Analysis: 3 days." },
    trail: [{ a: "Pricing Monitor", q: "Effective price, Surf Excel 1kg, all platforms", f: "Blinkit at Rs 250 (lowest). Gap: 9% below GT.", s: "eshelf" }, { a: "Cross-Channel", q: "Pin-code correlation: Blinkit orders vs GT billing", f: "Bareilly City: Blinkit +42%, GT -18%. Temporal correlation with Blinkit's Jan 15 launch of 10-min delivery in Bareilly.", s: "eshelf" }, { a: "Synthesis", q: null, f: "Channel conflict confirmed. Escalate pricing. Investigate cross-channel migration signal.", s: null }],
    qs: ["Show me the pricing conflict across platforms", "Show me pin-code overlap between Blinkit orders and GT billing decline", "Show me the promo calendar conflict across platforms"],
  },
  {
    id: "sos", sev: "warn", type: "VISIBILITY EROSION", scope: "Amazon · Generic Keywords",
    hl: "Lost 6 SoS points on Amazon Home Care generic keywords — ITC ad spend up 40%",
    sum: "Share of Search on 'detergent', 'washing powder', 'dish wash' declining. ITC bidding aggressively on our core keywords. Organic rank decay (from OLA issues) compounding with paid competition.",
    kpis: [{ l: "SoS Drop", v: "-6 pts", d: "Generic keywords", b: 1 }, { l: "ITC Ad Spend", v: "+40%", d: "Est. Feb vs Jan", b: 1 }, { l: "Branded SoS", v: "88%", d: "Stable", b: 0 }, { l: "Ad ROAS", v: "3.4x", d: "vs 4.1x Jan", b: 1 }],
    ev: [{ s: "eshelf", t: "SoS on 'washing powder' down from 44% to 38%. ITC up from 16% to 22%." }, { s: "ads", t: "Our ROAS declining: 4.1x (Jan) → 3.4x (Feb). Bid inflation from ITC competition." }],
    dec: { act: "Increase sponsored bids on top 5 generic keywords (Rs 18L/month bridge spend). Fix OLA to recover organic rank (primary driver of SoS). Review ad creative — ITC's new Nimwash ads have higher click-through.", why: "SoS drives discovery. Generic keyword loss means new customers find ITC first.", imp: "Defending 34% SoS on 'detergent' protects an estimated Rs 18L/month in organic revenue.", conf: "High", time: "Bid increase: today. OLA fix: this week. Creative review: 2 weeks." },
    trail: [{ a: "SoS Analyzer", q: "Share of Search by keyword, Home Care, Amazon, 3 months", f: "Generic keywords declining. Branded stable. ITC gaining on paid placements.", s: "eshelf" }, { a: "Ad Performance", q: "ROAS trend, CPC trend, competitor bid estimates", f: "ROAS declining due to bid inflation. ITC estimated +40% ad spend in Feb.", s: "ads" }, { a: "Synthesis", q: null, f: "Two-pronged problem: organic (OLA) + paid (ITC). Fix both.", s: null }],
    qs: ["Show me the full SoS breakdown by keyword cluster", "What would it cost to defend SoS on these keywords?", "What's our content score vs competition on Amazon?"],
  },
  {
    id: "content", sev: "watch", type: "CONTENT GAP", scope: "Amazon + Flipkart · 8 SKUs",
    hl: "8 SKUs below platform P50 content score — Rin 1kg has no A+ content, 2 images only",
    sum: "Content quality directly impacts conversion rate. SKUs above P75 convert 22% higher. Rin 1kg is the worst: no A+ content, 2 images, zero video. Meanwhile ITC's Ghadi has 6 images and A+ infographics. Running ads to poor listings wastes ad spend.",
    kpis: [{ l: "Below P50", v: "8 SKUs", d: "of 18 tracked", b: 1 }, { l: "Worst", v: "Rin 1kg", d: "Score: 58/100", b: 1 }, { l: "Conv. Gap", v: "22%", d: "P75 vs P50", b: 1 }, { l: "Ad Waste", v: "Rs 3.2L/mo", d: "Low-content ROAS", b: 1 }],
    ev: [{ s: "eshelf", t: "Rin 1kg content score 58 vs category P50 of 74. No A+ content. 2 images. Zero video." }, { s: "ads", t: "Rin ROAS at 1.8x vs 4.2x for Dove (which has strong content). Content is the primary differentiator." }],
    dec: { act: "Prioritize content refresh for 5 highest-impact SKUs: Surf Excel 500g, Vim Liquid 500ml, Rin 1kg, Rin 500g, Pears 75g. Pause ad spend on Rin until content is refreshed (ROAS 1.8x is below breakeven).", why: "Running ads to poor content is paying for clicks that don't convert.", imp: "Content fix on Surf Excel 500g alone adds Rs 8L/month from conversion improvement.", conf: "High", time: "Content turnaround: 6 weeks per SKU. Prioritize top 3." },
    trail: [{ a: "Content Analyzer", q: "Content score vs category benchmark, all SKUs", f: "8 below P50. Rin worst at 58. ITC has stronger content on competing SKUs.", s: "eshelf" }, { a: "Synthesis", q: null, f: "Content is the conversion bottleneck. Fix content before increasing ad spend.", s: null }],
    qs: ["What's our content score vs competition on Amazon?", "Prioritize the content fixes by revenue impact", "Compare content scores across Amazon vs Flipkart"],
  },
  {
    id: "qcom", sev: "good", type: "GROWTH SIGNAL", scope: "Blinkit + Zepto · North India",
    hl: "Qcom orders up 34% MoM in North India — but dark store availability at 78% and assortment gaps",
    sum: "Quick commerce is the fastest-growing channel. Blinkit +42% (Lucknow), Zepto +38%, Instamart +28%. But eShelf scans show availability gaps capping growth: only 12 of 18 SKUs listed on Blinkit Lucknow, and 'in stock' rate at 84% means intermittent unavailability. Delhi NCR benchmark shows 94% availability with 16 of 18 SKUs.",
    kpis: [{ l: "Qcom Growth", v: "+34%", d: "MoM, North India", b: 0 }, { l: "Blinkit Avail.", v: "84%", d: "Lucknow scans", b: 1 }, { l: "Listed SKUs", v: "12/18", d: "Blinkit LKO", b: 1 }, { l: "Delhi Bench.", v: "94%", d: "Avail. benchmark", b: 0 }],
    ev: [{ s: "eshelf", t: "Blinkit Lucknow: 8 dark stores, 12 of 18 SKUs, 84% OLA. Zepto Lucknow: 5 dark stores, 10 of 18 SKUs, 78% OLA." }, { s: "eshelf", t: "Delhi NCR benchmark: 92% OLA, 16 of 18 SKUs across all platforms." }],
    dec: { act: "Request catalog expansion with Blinkit and Zepto category managers for Lucknow. Target: Delhi NCR benchmark (16+ SKUs, 94% availability) by end of March. This is a platform relationship conversation, not a supply chain fix.", why: "Qcom demand exists but availability is capping conversion. Every missing SKU is a missed sale.", imp: "Full assortment in Lucknow qcom = estimated Rs 14-18L/month incremental.", conf: "Medium", time: "Assortment push: 2 weeks. OLA improvement: 4 weeks." },
    trail: [{ a: "eShelf Monitor", q: "Pin-code availability scan, qcom platforms, North India", f: "Lucknow underindexed vs Delhi NCR benchmark. 6 missing SKUs across platforms. Scrape-based — no dark store level visibility.", s: "eshelf" }, { a: "Synthesis", q: null, f: "Growth signal is strong. Availability is the bottleneck, not demand.", s: null }],
    qs: ["Show me qcom dark store availability by city", "What's the revenue opportunity from fixing Lucknow gaps?", "Compare qcom growth rate by city"],
  },
];

/* ═══ PLATFORM PERFORMANCE CARDS ═══ */
const platforms = [
  { id: "amazon", name: "Amazon", revenue: "₹6.2 Cr", growth: "+18%", ola: "89%", sos: "34%", roas: "3.4x", adSpend: "₹62L", buyBox: "96%", convRate: "8.2%", returns: "4.8%", topIssue: "OLA on 3 SKUs dragging organic rank + Buy Box at risk on 2 SKUs from 3P undercutting", st: "warn" },
  { id: "fksh", name: "Flipkart", revenue: "₹4.8 Cr", growth: "+22%", ola: "93%", sos: "38%", roas: "4.1x", adSpend: "₹38L", buyBox: "98%", convRate: "6.8%", returns: "5.2%", topIssue: "BBD prep behind on content refresh. Returns rate crept up 0.8pts", st: "good" },
  { id: "blinkit", name: "Blinkit", revenue: "₹1.8 Cr", growth: "+42%", ola: "84%", sos: "N/A", roas: "2.8x", adSpend: "₹12L", buyBox: "N/A", convRate: "14.2%", returns: "2.1%", topIssue: "Unauthorized pricing (Rs 25 off SE 1kg), 6 SKUs not listed in Lucknow", st: "warn" },
  { id: "zepto", name: "Zepto", revenue: "₹1.2 Cr", growth: "+38%", ola: "76%", sos: "N/A", roas: "2.4x", adSpend: "₹8L", buyBox: "N/A", convRate: "12.8%", returns: "1.8%", topIssue: "Low assortment (10/18 SKUs), availability gaps in evening hours", st: "watch" },
  { id: "instamart", name: "Instamart", revenue: "₹0.8 Cr", growth: "+28%", ola: "88%", sos: "N/A", roas: "3.0x", adSpend: "₹5L", buyBox: "N/A", convRate: "11.4%", returns: "2.4%", topIssue: "Best qcom OLA but lower traffic. Instamart deprioritizing Home Care in search.", st: "good" },
];

const adBudget = [
  { platform: "Amazon Sponsored", alloc: 62, spend: 58, pct: 94, roas: "3.4x", st: "good" },
  { platform: "Flipkart Ads", alloc: 38, spend: 34, pct: 89, roas: "4.1x", st: "good" },
  { platform: "Blinkit Visibility", alloc: 12, spend: 11.6, pct: 97, roas: "2.8x", st: "warn" },
  { platform: "Zepto Ads", alloc: 8, spend: 6.4, pct: 80, roas: "2.4x", st: "watch" },
  { platform: "Instamart Visibility", alloc: 5, spend: 4.0, pct: 80, roas: "3.0x", st: "good" },
];

const comingUp = [
  { event: "Flipkart Brand Day (Mar 18)", days: 6, st: "warn",
    signals: [
      { s: "eshelf", t: "No HUL deal page detected on Flipkart yet. Last year's Brand Day page went live 5 days before event." },
      { s: "fksh", t: "Supplier Hub shows no active deal submissions for Mar 18 window. 3 ITC SKUs already submitted." },
      { s: "eshelf", t: "Surf Excel 500g content score at 68 — below the 80+ threshold for strong deal page conversion." },
    ],
    risk: "6 days to event with no deal page live. ITC already submitted. If HUL misses the submission window, Brand Day visibility goes entirely to competition.",
    benchmark: "Brand Day Feb 2026: Rs 18L revenue in 3 days, 2.4x daily run-rate. Worth defending." },
  { event: "Amazon Spring Sale (Apr 1-7)", days: 20, st: "watch",
    signals: [
      { s: "vc", t: "Amazon has issued Spring Sale PO forecast: 3.2x normal volume for hero SKUs. Current sellable inventory covers only 1.8x." },
      { s: "eshelf", t: "3 of 8 hero SKUs have content scores below P50. Spring Sale 2025 data: SKUs with refreshed content converted 34% higher." },
      { s: "ads", t: "Spring Sale ad slots open for bidding. No HUL bids placed yet. ITC has 4 keyword bids active." },
    ],
    risk: "Inventory gap: Amazon expects 3.2x volume but current stock only supports 1.8x. If not corrected, OLA will drop during the event — the worst time to lose availability.",
    benchmark: "Spring Sale 2025: Rs 42L revenue, 2.8x daily run-rate, ROAS 4.6x." },
  { event: "Blinkit IPL Window (Mar-May)", days: "Ongoing", st: "warn",
    signals: [
      { s: "eshelf", t: "Blinkit has activated 'IPL Snack Time' category banner. HUL Home Care not featured. ITC Vim visible in the banner." },
      { s: "eshelf", t: "Blinkit evening-hour (7-10 PM) order volume up 28% during IPL matches vs non-match days. Home Care impulse opportunity." },
    ],
    risk: "Blinkit is curating IPL visibility. If HUL isn't in the banner, ITC gets default visibility during peak evening hours. Previous unauthorized pricing (Rs 25 off) makes any Blinkit promo conversation sensitive.",
    benchmark: "No prior IPL-specific data for qcom. Nearest proxy: evening order surge shows 28% uplift on match days." },
  { event: "Flipkart Big Billion Days (Oct 2026)", days: "~210", st: "watch",
    signals: [
      { s: "eshelf", t: "5 of 8 BBD hero SKUs still have 2024-era content. Content refresh takes 6 weeks per SKU — timeline is tight." },
      { s: "vc", t: "BBD 2025 PO: Amazon issued 4.5x forecast. HUL shipped 3.8x (84% fill). Shortfall cost an estimated Rs 28L in lost revenue." },
    ],
    risk: "Content is the long-lead bottleneck. If refresh doesn't start by April, hero SKUs go into BBD with dated listings. BBD 2025 conversion gap between refreshed (12.4%) and dated (8.1%) content was 4.3 percentage points.",
    benchmark: "BBD 2025: Rs 1.8 Cr revenue in 5 days, 4.2x daily run-rate, ROAS 5.1x." },
];

/* ══════════ PRIMITIVES ══════════ */
const sC = s => ({ good: C.green, watch: C.blue, warn: C.orange, critical: C.red }[s] || C.textLight);
const sB = s => ({ good: C.greenPale, watch: C.bluePale, warn: C.orangePale, critical: C.redPale }[s] || C.cream);
const sL = s => ({ good: "ON TRACK", watch: "WATCH", warn: "ATTENTION", critical: "CRITICAL" }[s] || "");
const Tag = ({ children, color, bg }) => <span style={{ display: "inline-flex", padding: "3px 10px", borderRadius: 5, fontSize: 9.5, fontWeight: 700, fontFamily: mono, color, background: bg, letterSpacing: 0.5 }}>{children}</span>;
const SrcBadge = ({ id }) => { const s = sources[id]; if (!s) return null; return <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 8px", borderRadius: 4, background: s.c === C.green ? C.greenPale : C.orangePale, fontSize: 9, fontFamily: mono, flexShrink: 0 }}><span style={{ width: 4, height: 4, borderRadius: "50%", background: s.c }} /><span style={{ color: C.textMid }}>{s.l}</span></span>; };
const Takeaway = ({ color = C.orange, bg = C.orangePale, children }) => <div style={{ padding: "12px 16px", background: bg, borderRadius: 10, borderLeft: `3px solid ${color}`, marginTop: 14 }}><div style={{ fontSize: 13, color: C.text, lineHeight: 1.7 }}>{children}</div></div>;

/* ══ CONVERSATION PANEL ══ */
const ConvPanel = ({ messages, onClose, onAsk }) => {
  const endRef = useRef(null);
  const [input, setInput] = useState("");
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);
  const renderMd = (text) => {
    const lines = text.split("\n"); const result = []; let i = 0;
    while (i < lines.length) {
      const line = lines[i];
      if (line.startsWith("|") && line.includes("|")) {
        const tableLines = []; let ti = i;
        while (ti < lines.length && lines[ti].startsWith("|")) { tableLines.push(lines[ti]); ti++; }
        const parseRow = (r) => r.split("|").filter(c => c.trim()).map(c => c.trim().replace(/\*\*/g, ""));
        const hdr = parseRow(tableLines[0]);
        const bodyRows = tableLines.filter((r, ri) => ri > 0 && !r.match(/^\|[\s-:|]+\|?$/)).map(parseRow);
        result.push(<div key={`t${i}`} style={{ margin: "10px 0", borderRadius: 8, border: `1px solid ${C.borderLight}`, overflow: "hidden", fontSize: 11.5 }}><div style={{ display: "flex", background: C.cream, borderBottom: `1px solid ${C.borderLight}` }}>{hdr.map((h, hi) => <div key={hi} style={{ flex: hi === 0 ? 1.8 : 1, padding: "7px 10px", fontWeight: 600, color: C.text, fontSize: 11, fontFamily: font }}>{h}</div>)}</div>{bodyRows.map((row, ri) => (<div key={ri} style={{ display: "flex", borderBottom: ri < bodyRows.length - 1 ? `1px solid ${C.borderLight}` : "none", background: ri % 2 === 0 ? C.card : C.page }}>{row.map((cell, ci) => <div key={ci} style={{ flex: ci === 0 ? 1.8 : 1, padding: "6px 10px", color: C.textMid, fontFamily: mono, fontSize: 11 }}>{cell}</div>)}</div>))}</div>);
        i = ti; continue;
      }
      if (line.startsWith("**") && line.endsWith("**")) { result.push(<div key={i} style={{ fontSize: 13.5, fontWeight: 600, color: C.text, marginTop: 12, marginBottom: 4 }}>{line.replace(/\*\*/g, "")}</div>); }
      else if (line.startsWith("- **")) { const m = line.match(/^- \*\*(.+?)\*\*(.*)/); if (m) result.push(<div key={i} style={{ fontSize: 12.5, color: C.textMid, lineHeight: 1.6, paddingLeft: 12, marginBottom: 2 }}><strong style={{ color: C.text }}>{m[1]}</strong>{m[2]}</div>); }
      else if (line.startsWith("- ")) { result.push(<div key={i} style={{ fontSize: 12.5, color: C.textMid, lineHeight: 1.6, paddingLeft: 12, marginBottom: 2 }}>{line.slice(2)}</div>); }
      else if (line.trim() === "") { result.push(<div key={i} style={{ height: 8 }} />); }
      else { result.push(<div key={i} style={{ fontSize: 13, color: C.textMid, lineHeight: 1.7 }}>{line.replace(/\*\*(.+?)\*\*/g, (_, t) => t)}</div>); }
      i++;
    }
    return result;
  };
  return (
    <div style={{ position: "fixed", top: 0, right: 0, width: 600, height: "100vh", background: C.card, borderLeft: `1px solid ${C.border}`, boxShadow: "-8px 0 30px rgba(0,0,0,0.12)", display: "flex", flexDirection: "column", zIndex: 1000, fontFamily: font, animation: "slideIn 0.25s ease-out" }}>
      <style>{`@keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>
      <div style={{ padding: "14px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
        <div style={{ width: 24, height: 24, borderRadius: 6, background: C.green, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontSize: 12, fontWeight: 800 }}>Q</span></div>
        <span style={{ fontFamily: serif, fontSize: 15, fontWeight: 600, color: C.text }}>Questt Agent</span>
        <span style={{ fontSize: 11, color: C.textLight }}>Digital Commerce Intelligence</span>
        <button onClick={onClose} style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", fontSize: 18, color: C.textLight, padding: 4 }}>×</button>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px" }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: 16 }}>
            {msg.role === "user" ? (
              <div style={{ display: "flex", justifyContent: "flex-end" }}><div style={{ background: C.green, color: "#fff", padding: "10px 16px", borderRadius: "14px 14px 4px 14px", maxWidth: "85%", fontSize: 13, lineHeight: 1.5 }}>{msg.text}</div></div>
            ) : msg.role === "loading" ? (
              <div><div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}><div style={{ width: 18, height: 18, borderRadius: 5, background: C.green, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontSize: 9, fontWeight: 800 }}>Q</span></div><span style={{ fontSize: 11, fontWeight: 600, color: C.green }}>Questt</span><span style={{ fontSize: 10, color: C.textLight, fontFamily: mono }}>Analyzing...</span></div><div style={{ background: C.page, border: `1px solid ${C.border}`, borderRadius: 12, padding: "16px 20px", display: "flex", gap: 6, alignItems: "center" }}><div style={{ display: "flex", gap: 4 }}>{[0,1,2].map(d => <div key={d} style={{ width: 7, height: 7, borderRadius: "50%", background: C.green, opacity: 0.4, animation: `pulse 1.2s ease-in-out ${d*0.2}s infinite` }} />)}</div><span style={{ fontSize: 12, color: C.textLight, marginLeft: 8 }}>Running agents across Vendor Central, platform scrape, and ads data...</span></div><style>{`@keyframes pulse { 0%, 100% { opacity: 0.2; transform: scale(0.8); } 50% { opacity: 0.7; transform: scale(1.1); } }`}</style></div>
            ) : (
              <div><div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}><div style={{ width: 18, height: 18, borderRadius: 5, background: C.green, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontSize: 9, fontWeight: 800 }}>Q</span></div><span style={{ fontSize: 11, fontWeight: 600, color: C.green }}>Questt</span>{msg.agents && <span style={{ fontSize: 10, color: C.textLight, fontFamily: mono }}>{msg.agents.join(" → ")}</span>}</div>{msg.sources && <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>{msg.sources.map((s, j) => <SrcBadge key={j} id={s} />)}</div>}<div style={{ background: C.page, border: `1px solid ${C.border}`, borderRadius: 12, padding: "14px 16px", overflow: "hidden" }}>{renderMd(msg.text)}</div>{msg.followUps && <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 10 }}>{msg.followUps.map((f, j) => <button key={j} onClick={() => onAsk(f)} style={{ padding: "6px 12px", borderRadius: 20, border: `1px solid ${C.border}`, background: C.card, fontSize: 11.5, color: C.textMid, cursor: "pointer", fontFamily: font, textAlign: "left" }} onMouseEnter={e => { e.currentTarget.style.borderColor = C.green; e.currentTarget.style.color = C.green; e.currentTarget.style.background = C.greenPale; }} onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textMid; e.currentTarget.style.background = C.card; }}>{f}</button>)}</div>}</div>
            )}
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div style={{ padding: "12px 20px", borderTop: `1px solid ${C.border}`, flexShrink: 0, background: C.page }}>
        <div style={{ display: "flex", gap: 8 }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && input.trim()) { onAsk(input.trim()); setInput(""); } }} placeholder="Ask about OLA, SoS, pricing, content, qcom..." style={{ flex: 1, padding: "10px 14px", borderRadius: 10, border: `1px solid ${C.border}`, fontSize: 13, fontFamily: font, color: C.text, background: C.card, outline: "none" }} />
          <button onClick={() => { if (input.trim()) { onAsk(input.trim()); setInput(""); } }} style={{ padding: "10px 16px", borderRadius: 10, border: "none", background: C.green, color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: font }}>Ask</button>
        </div>
      </div>
    </div>
  );
};

/* ══ INTEL CARD ══ */
const IntelCard = ({ card, defaultOpen, onAsk, onTrail }) => {
  const [exp, setExp] = useState(defaultOpen);
  const color = sC(card.sev);
  const bg = sB(card.sev);
  return (
    <div style={{ background: C.card, borderRadius: 14, border: `1px solid ${exp ? `${color}50` : C.border}`, marginBottom: 16, overflow: "hidden", boxShadow: exp ? `0 4px 20px ${color}10` : "0 1px 3px rgba(0,0,0,0.04)", transition: "all 0.3s" }}>
      <div onClick={() => setExp(!exp)} style={{ padding: "20px 24px", cursor: "pointer" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <Tag color={color} bg={bg}>{sL(card.sev)}</Tag>
          <span style={{ fontSize: 10, fontFamily: mono, color: C.textLight }}>{card.type}</span>
          <span style={{ fontSize: 10, color: C.textLight }}>·</span>
          <span style={{ fontSize: 10, color: C.textLight }}>{card.scope}</span>
        </div>
        <div style={{ fontFamily: serif, fontSize: 16, fontWeight: 600, color: C.text, lineHeight: 1.4, marginBottom: 8 }}>{card.hl}</div>
        <div style={{ fontSize: 12.5, color: C.textMid, lineHeight: 1.65 }}>{card.sum}</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginTop: 14 }}>
          {card.kpis.map((k, i) => (
            <div key={i} style={{ padding: "10px 12px", borderRadius: 8, background: k.b ? `${color}08` : C.cream, border: `1px solid ${k.b ? `${color}20` : C.borderLight}` }}>
              <div style={{ fontSize: 9, fontFamily: mono, color: C.textLight, marginBottom: 4 }}>{k.l}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: k.b ? color : C.text }}>{k.v}</div>
              <div style={{ fontSize: 10, color: C.textLight, marginTop: 2 }}>{k.d}</div>
            </div>
          ))}
        </div>
      </div>
      {exp && (
        <div style={{ padding: "0 24px 20px", borderTop: `1px solid ${C.borderLight}` }}>
          {card.ev && <div style={{ paddingTop: 16 }}><div style={{ fontSize: 10, fontFamily: mono, color: C.textLight, marginBottom: 8, fontWeight: 600 }}>EVIDENCE</div>{card.ev.map((e, i) => <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><SrcBadge id={e.s} /><span style={{ fontSize: 12, color: C.textMid, lineHeight: 1.6 }}>{e.t}</span></div>)}</div>}
          {card.dec && <div style={{ marginTop: 16, padding: "16px 18px", background: `${color}06`, borderRadius: 10, border: `1px solid ${color}15` }}><div style={{ fontSize: 10, fontFamily: mono, color, marginBottom: 8, fontWeight: 600 }}>RECOMMENDED ACTION</div><div style={{ fontSize: 13, color: C.text, fontWeight: 600, lineHeight: 1.5, marginBottom: 8 }}>{card.dec.act}</div><div style={{ fontSize: 12, color: C.textMid, lineHeight: 1.6, marginBottom: 8 }}><strong>Why:</strong> {card.dec.why}</div><div style={{ display: "flex", gap: 16, fontSize: 11, fontFamily: mono }}><span><span style={{ color: C.textLight }}>Impact:</span> <span style={{ color }}>{card.dec.imp}</span></span><span><span style={{ color: C.textLight }}>Confidence:</span> {card.dec.conf}</span><span><span style={{ color: C.textLight }}>Timeline:</span> {card.dec.time}</span></div></div>}
          {card.trail && <button onClick={() => onTrail(card)} style={{ marginTop: 12, padding: "6px 14px", borderRadius: 8, border: `1px solid ${C.border}`, background: C.card, fontSize: 11, color: C.textMid, cursor: "pointer", fontFamily: mono }}>View Agent Trail →</button>}
          {card.qs && <div style={{ marginTop: 14, display: "flex", gap: 6, flexWrap: "wrap" }}><span style={{ fontSize: 10, fontFamily: mono, color: C.textLight, width: "100%", marginBottom: 2 }}>ASK QUESTT</span>{card.qs.map((q, i) => <button key={i} onClick={() => onAsk(q)} style={{ padding: "7px 14px", borderRadius: 20, border: `1px solid ${C.border}`, background: C.card, fontSize: 11.5, color: C.textMid, cursor: "pointer", fontFamily: font, textAlign: "left" }} onMouseEnter={e => { e.currentTarget.style.borderColor = C.green; e.currentTarget.style.background = C.greenPale; }} onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.card; }}>{q}</button>)}</div>}
        </div>
      )}
    </div>
  );
};

/* ══ MAIN ══ */
export default function HULDigitalCommerce() {
  const [convOpen, setConvOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState("brief");
  const [trailModal, setTrailModal] = useState(null);

  const handleAsk = (q) => {
    setMessages(prev => [...prev, { role: "user", text: q }, { role: "loading" }]);
    setConvOpen(true);
    setTimeout(() => {
      const resp = convResponses[q];
      const agentMsg = resp
        ? { role: "agent", text: resp.body, agents: resp.agents, sources: resp.sources, followUps: resp.followUps }
        : { role: "agent", text: `Analyzing: "${q}"\n\nRunning across Vendor Central, platform scrape, and ads console data. In a live deployment, this triggers the relevant agents.\n\nTry one of the suggested prompts for a full simulation.`, agents: ["Query Router"], sources: ["eshelf"], followUps: [] };
      setMessages(prev => [...prev.filter(m => m.role !== "loading"), agentMsg]);
    }, 1800);
  };

  const sideW = 140;
  const tabs = [
    { id: "brief", label: "Insights", count: briefCards.length },
    { id: "platforms", label: "Platforms" },
    { id: "calendar", label: "Calendar" },
  ];

  return (
    <div className="overflow-auto" style={{ background: C.page, height: "100vh", fontFamily: font, color: C.text, display: "flex" }}>
      {/* SIDE NAV */}
      <div style={{ width: sideW, background: C.header, display: "flex", flexDirection: "column", padding: "16px 10px", position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28, paddingLeft: 6 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="5" fill={C.green} /><text x="12" y="16" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="800" fontFamily={font}>Q</text></svg>
          <span style={{ fontFamily: serif, fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>questt</span>
        </div>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "space-between", background: activeTab === tab.id ? "rgba(255,255,255,0.1)" : "transparent", border: "none", cursor: "pointer", marginBottom: 4, textAlign: "left" }}>
            <span style={{ fontSize: 13, fontWeight: activeTab === tab.id ? 600 : 400, color: activeTab === tab.id ? "#fff" : "rgba(255,255,255,0.4)", fontFamily: font }}>{tab.label}</span>
            {tab.count && <span style={{ fontSize: 9, fontFamily: mono, padding: "1px 6px", borderRadius: 6, background: activeTab === tab.id ? C.green : "rgba(255,255,255,0.08)", color: activeTab === tab.id ? "#fff" : "rgba(255,255,255,0.4)", fontWeight: 700 }}>{tab.count}</span>}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ padding: "8px 12px", borderTop: "1px solid rgba(255,255,255,0.08)", marginTop: 8 }}>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", fontFamily: mono }}>Hindustan Unilever</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>Digital Commerce</div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, marginLeft: sideW }}>
        <div style={{ background: C.header, padding: "0 36px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontFamily: serif, fontSize: 17, fontWeight: 600, color: "#fff" }}>Digital Commerce Command Center</span>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>HUL · Home Care · North India</span>
            </div>
            <span style={{ fontFamily: mono, fontSize: 10, color: "rgba(255,255,255,0.3)" }}>Mar 2026</span>
          </div>
        </div>

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 36px" }}>

          {/* INSIGHTS */}
          {activeTab === "brief" && <div>
            {/* KPI STRIP */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginBottom: 28 }}>
              {[
                { label: "Monthly Revenue", value: "₹14.8 Cr", delta: "+24% YoY", good: true, ask: "Break down the Rs 14.8 Cr monthly revenue by platform and brand" },
                { label: "Blended OLA", value: "87%", delta: "3 SKUs critical", good: false, ask: "Which SKUs are dragging OLA below 90% and what's the revenue impact?" },
                { label: "SoS (Generic)", value: "34%", delta: "-6 pts MoM", good: false, ask: "Show me the full SoS breakdown by keyword cluster" },
                { label: "Avg ROAS", value: "3.4x", delta: "vs 4.1x Jan", good: false, ask: "Why is ROAS declining and where should I reallocate ad spend?" },
                { label: "Qcom Growth", value: "+34%", delta: "MoM, North", good: true, ask: "Show me qcom dark store availability by city" },
              ].map((kpi, i) => (
                <div key={i} onClick={() => handleAsk(kpi.ask)} style={{ padding: "16px 18px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, cursor: "pointer", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = C.green; e.currentTarget.style.boxShadow = `0 2px 12px ${C.green}10`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = "none"; }}>
                  <div style={{ fontSize: 10, fontFamily: mono, color: C.textLight, marginBottom: 6, letterSpacing: 0.3 }}>{kpi.label}</div>
                  <div style={{ fontSize: 24, fontWeight: 700, color: C.text, marginBottom: 4 }}>{kpi.value}</div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: kpi.good ? C.green : C.orange }}>{kpi.delta}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 18 }}>
              <h2 style={{ fontFamily: serif, fontSize: 22, fontWeight: 700, color: C.text, margin: 0 }}>Insights</h2>
              <span style={{ fontSize: 12, color: C.textLight }}>{briefCards.length} active signals across availability, pricing, visibility, content, quick commerce</span>
            </div>
            {briefCards.map((c, i) => <IntelCard key={c.id} card={c} defaultOpen={i === 0} onAsk={handleAsk} onTrail={card => setTrailModal(card)} />)}
          </div>}

          {/* PLATFORM PERFORMANCE */}
          {activeTab === "platforms" && <div>
            <h2 style={{ fontFamily: serif, fontSize: 22, fontWeight: 700, color: C.text, margin: "0 0 6px" }}>Platform Performance</h2>
            <div style={{ fontSize: 12, color: C.textLight, marginBottom: 24 }}>Feb 2026 · Monthly revenue, OLA, SoS, ROAS by platform</div>

            {/* Platform KPI grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginBottom: 28 }}>
              {platforms.map(p => {
                const color = sC(p.st);
                return (
                  <div key={p.id} style={{ background: C.card, borderRadius: 12, border: `1px solid ${C.border}`, borderTop: `3px solid ${color}`, padding: "16px 18px" }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 12 }}>{p.name}</div>
                    <div style={{ fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 2 }}>{p.revenue}</div>
                    <div style={{ fontSize: 11, color, fontWeight: 600, marginBottom: 12 }}>{p.growth} MoM</div>
                    {[["OLA", p.ola], ["Conv Rate", p.convRate], ["Buy Box", p.buyBox], ["ROAS", p.roas], ["Ad Spend", p.adSpend], ["Returns", p.returns]].map(([l, v]) => (
                      <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: `1px solid ${C.borderLight}`, fontSize: 11 }}>
                        <span style={{ color: C.textLight }}>{l}</span>
                        <span style={{ fontFamily: mono, fontWeight: 600, color: C.text }}>{v}</span>
                      </div>
                    ))}
                    <div style={{ marginTop: 10, fontSize: 11, color: C.textMid, lineHeight: 1.5 }}>{p.topIssue}</div>
                  </div>
                );
              })}
            </div>

            {/* Ad Budget Table */}
            <div style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, padding: "20px 24px", marginBottom: 24 }}>
              <div style={{ fontFamily: serif, fontSize: 16, fontWeight: 600, color: C.text, marginBottom: 14 }}>Ad Spend Budget Tracker</div>
              <div style={{ display: "flex", background: C.cream, borderRadius: 8, padding: "8px 12px", marginBottom: 8 }}>
                {["Platform", "Allocated (L)", "Spent (L)", "Utilization", "ROAS", "Status"].map(h => <div key={h} style={{ flex: 1, fontSize: 10, fontFamily: mono, color: C.textLight, fontWeight: 600 }}>{h}</div>)}
              </div>
              {adBudget.map((a, i) => {
                const color = sC(a.st);
                return (
                  <div key={i} style={{ display: "flex", padding: "10px 12px", borderBottom: i < adBudget.length - 1 ? `1px solid ${C.borderLight}` : "none", alignItems: "center" }}>
                    <div style={{ flex: 1, fontSize: 13, fontWeight: 500 }}>{a.platform}</div>
                    <div style={{ flex: 1, fontSize: 12, fontFamily: mono, color: C.textMid }}>₹{a.alloc}L</div>
                    <div style={{ flex: 1, fontSize: 12, fontFamily: mono, color: C.textMid }}>₹{a.spend}L</div>
                    <div style={{ flex: 1 }}><div style={{ width: 60, height: 6, borderRadius: 3, background: C.cream, overflow: "hidden" }}><div style={{ width: `${a.pct}%`, height: "100%", borderRadius: 3, background: color }} /></div></div>
                    <div style={{ flex: 1, fontSize: 12, fontFamily: mono, fontWeight: 600, color }}>{a.roas}</div>
                    <div style={{ flex: 1 }}><Tag color={color} bg={sB(a.st)}>{sL(a.st)}</Tag></div>
                  </div>
                );
              })}
              <Takeaway color={C.orange} bg={C.orangePale}>Blinkit ROAS at 2.8x is lowest — driven by unauthorized pricing cannibalizing organic demand. <strong>Fix pricing before scaling Blinkit ad spend.</strong></Takeaway>
            </div>

            {/* Channel Net Margin */}
            <div style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, padding: "20px 24px" }}>
              <div style={{ fontFamily: serif, fontSize: 16, fontWeight: 600, color: C.text, marginBottom: 4 }}>Channel Net Realization</div>
              <div style={{ fontSize: 11, color: C.textLight, marginBottom: 14 }}>Surf Excel 1kg (MRP Rs 275) · Net after all deductions</div>
              <div style={{ display: "flex", gap: 12 }}>
                {[{ ch: "GT", net: 265, pct: 100, c: C.green }, { ch: "Flipkart", net: 214, pct: 81, c: C.blue }, { ch: "Blinkit", net: 214, pct: 81, c: C.orange }, { ch: "Amazon", net: 197, pct: 74, c: C.red }, { ch: "Zepto", net: 209, pct: 79, c: C.orange }].map(x => (
                  <div key={x.ch} style={{ flex: 1, padding: "14px", background: C.page, borderRadius: 10, textAlign: "center" }}>
                    <div style={{ fontSize: 11, color: C.textLight, marginBottom: 6 }}>{x.ch}</div>
                    <div style={{ fontSize: 22, fontWeight: 700, color: x.c }}>₹{x.net}</div>
                    <div style={{ fontSize: 10, fontFamily: mono, color: C.textLight }}>{x.pct}% of GT</div>
                  </div>
                ))}
              </div>
              <Takeaway color={C.red} bg={C.redPale}>Amazon net realization 26% below GT — highest channel cost (chargebacks + returns driving the gap). <strong>Volume growth (18% YoY) currently compensates, but commission inflation is the risk to watch.</strong></Takeaway>
            </div>
          </div>}

          {/* CALENDAR */}
          {activeTab === "calendar" && <div>
            <h2 style={{ fontFamily: serif, fontSize: 22, fontWeight: 700, color: C.text, margin: "0 0 6px" }}>Upcoming Events & Promos</h2>
            <div style={{ fontSize: 12, color: C.textLight, marginBottom: 24 }}>Platform events, deal days, and promotional windows</div>
            {comingUp.map((ev, i) => {
              const color = sC(ev.st);
              return (
                <div key={i} style={{ background: C.card, borderRadius: 12, border: `1px solid ${C.border}`, borderLeft: `3px solid ${color}`, padding: "16px 20px", marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontFamily: serif, fontSize: 15, fontWeight: 600, color: C.text }}>{ev.event}</span>
                      <Tag color={color} bg={sB(ev.st)}>{sL(ev.st)}</Tag>
                    </div>
                    <span style={{ fontSize: 11, fontFamily: mono, color: C.textLight }}>In {ev.days} days</span>
                  </div>
                  <div style={{ fontSize: 10, fontFamily: mono, color: C.textLight, marginBottom: 8, fontWeight: 600 }}>SIGNALS FROM DATA</div>
                  {ev.signals.map((sig, j) => (
                    <div key={j} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}>
                      <SrcBadge id={sig.s} />
                      <span style={{ fontSize: 12, color: C.textMid, lineHeight: 1.6 }}>{sig.t}</span>
                    </div>
                  ))}
                  <div style={{ marginTop: 12, padding: "10px 14px", background: `${color}08`, borderRadius: 8, borderLeft: `3px solid ${color}` }}>
                    <div style={{ fontSize: 10, fontFamily: mono, color, fontWeight: 600, marginBottom: 4 }}>RISK</div>
                    <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.6 }}>{ev.risk}</div>
                  </div>
                  {ev.benchmark && <div style={{ marginTop: 8, fontSize: 11, color: C.textLight, fontStyle: "italic" }}>Benchmark: {ev.benchmark}</div>}
                </div>
              );
            })}
          </div>}
        </div>
      </div>

      {/* TRAIL MODAL */}
      {trailModal && <>
        <div onClick={() => setTrailModal(null)} style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.4)", zIndex: 998, backdropFilter: "blur(3px)" }} />
        <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 640, maxHeight: "80vh", background: C.card, borderRadius: 16, boxShadow: "0 24px 80px rgba(0,0,0,0.2)", zIndex: 999, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ padding: "18px 24px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div><div style={{ fontSize: 10, fontFamily: mono, color: C.textLight, marginBottom: 4 }}>AGENT DECISION TRAIL</div><div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{trailModal.hl?.slice(0, 60)}...</div></div>
            <button onClick={() => setTrailModal(null)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: C.textLight }}>×</button>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
            {trailModal.trail?.map((step, i) => (
              <div key={i} style={{ display: "flex", gap: 14, marginBottom: 20 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: step.s ? (sources[step.s]?.c === C.green ? C.greenPale : C.orangePale) : C.cream, display: "flex", alignItems: "center", justifyContent: "center", border: `2px solid ${step.s ? sources[step.s]?.c || C.green : C.green}` }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: step.s ? sources[step.s]?.c || C.green : C.green }}>{i + 1}</span>
                  </div>
                  {i < trailModal.trail.length - 1 && <div style={{ width: 2, flex: 1, background: C.borderLight, marginTop: 4 }} />}
                </div>
                <div style={{ flex: 1, paddingBottom: 4 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: C.green }}>{step.a}</span>
                    {step.s && <SrcBadge id={step.s} />}
                  </div>
                  {step.q && <div style={{ fontSize: 11, fontFamily: mono, color: C.textLight, marginBottom: 6, padding: "6px 10px", background: C.page, borderRadius: 6 }}>{step.q}</div>}
                  <div style={{ fontSize: 12.5, color: C.textMid, lineHeight: 1.6 }}>{step.f}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>}

      {/* CONVERSATION PANEL */}
      {convOpen && <ConvPanel messages={messages} onClose={() => setConvOpen(false)} onAsk={handleAsk} />}

      {/* ASK QUESTT FAB */}
      {!convOpen && <button onClick={() => setConvOpen(true)} style={{ position: "fixed", bottom: 24, right: 24, width: 56, height: 56, borderRadius: 28, background: C.green, border: "none", cursor: "pointer", boxShadow: "0 4px 20px rgba(45,90,61,0.3)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}><span style={{ color: "#fff", fontSize: 22, fontWeight: 800 }}>Q</span></button>}
    </div>
  );
}

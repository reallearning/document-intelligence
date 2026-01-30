"use client";
import React, { useEffect, useState } from "react";
import { Paperclip } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const HOADBKGForm = () => {
  const router = useRouter();
  const [answers, setAnswers] = useState<any>({});
  const [showSampleData, setShowSampleData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

  const loadingMessages = [
    {
      title: "Analyzing your business context",
      subtitle: "Processing industry-specific insights...",
    },
    {
      title: "Building knowledge graph",
      subtitle: "Mapping relationships and connections...",
    },
    {
      title: "Configuring decision nodes",
      subtitle: "Setting up intelligent workflows...",
    },
    {
      title: "Initializing",
      subtitle: "Almost there...",
    },
  ];

  const questions = [
    {
      id: "q1",
      question: "What is the smallest unit that can be sold to a customer?",
      include:
        "Include the atomic commercial unit, planning level, and any special cases (e.g., bridal exceptions).",
      sampleAnswer: `The atomic sellable unit is SKU = (style_id, color_code, size_code). However, commercial planning operates at the style_id level.

All upstream decisions bind to style_id:
• Design brief and creative direction
• Buying commitment and depth allocation
• Landed cost targets and vendor selection
• Initial price point and margin expectations
• Markdown schedule and discount thresholds
• Exit triggers and liquidation rules

Bridal Exception: Commercial unit shifts to client_order_id because price, delivery_date, customization_specs, and service_level are negotiated per client, not per SKU.

Relationship structure: One style → many SKUs (1:N). One style → many client_orders (1:N). One client_order → many SKUs (1:N).`,
    },
    {
      id: "q2",
      question:
        "When are two products treated as distinct even if they look similar?",
      include:
        "Include distinction criteria, attributes that trigger separation, and business impact.",
      sampleAnswer: `Two products require distinct style_id entities if they differ in any attribute that affects:
1. Vendor selection criteria
2. Cost structure and breakdown
3. Lead time and production cycle
4. Quality failure modes
5. Pricing floor and ceiling
6. Customer expectation at point of sale

Distinction-triggering attributes:
• fabric_specification
• weave_type
• embroidery_technique
• embroidery_stitch_density
• surface_treatment_method
• lining_construction_type
• finishing_standard
• closure_mechanism_type

Silhouette similarity is irrelevant to this distinction. Visual appearance does not determine commercial identity.`,
    },
    {
      id: "q3",
      question:
        "Do all products follow the same economic and operational logic?",
      include:
        "Include operational archetypes, parameter sets, and how they govern decision-making.",
      sampleAnswer: `No. Three operational archetypes exist with distinct parameter sets:

BRIDAL ARCHETYPE:
• demand_type = client_specific
• velocity_tier = low
• margin_tier = high (60-75%)
• service_intensity = high
• inventory_risk = illiquid
• planning_horizon = 12-18 months
• markdown_tolerance = low
• customization_depth = high
• lead_time = 90-180 days

OCCASIONWEAR ARCHETYPE:
• demand_type = event_triggered
• velocity_tier = medium
• margin_tier = medium-high (45-60%)
• service_intensity = medium
• substitution_tolerance = low
• planning_horizon = 6-9 months
• seasonality_impact = high
• replenishment_flexibility = low
• lead_time = 60-120 days

PRET ARCHETYPE:
• demand_type = anonymous_repeat
• velocity_tier = high
• margin_tier = medium (35-50%)
• service_intensity = low
• substitution_tolerance = high
• planning_horizon = 3-6 months
• refresh_frequency = high
• replenishment_flexibility = high
• lead_time = 30-75 days

These parameters govern inventory depth decisions, exit behavior, markdown aggressiveness, and channel allocation rules.`,
    },
    {
      id: "q4",
      question:
        "What are the primary dimensions used to structure the assortment?",
      include:
        "Include taxonomy dimensions, their role as decision constraints, and cross-dimensional rules.",
      sampleAnswer: `Five primary dimensions form the assortment taxonomy. These are decision constraints, not descriptive labels:

1. CATEGORY (category_id)
   • Determines silhouette family, construction method, and primary use case
   • Constraint impact: Available fulfilment modes, alteration complexity, storage requirements

2. OCCASION (occasion_tier)
   • Defines event formality, customer engagement intensity, and service expectations
   • Constraint impact: Minimum service level, acceptable lead time range, markdown prohibition rules

3. CRAFT/EMBROIDERY TYPE (craft_intensity_tier)
   • Quantifies artisan skill requirement, labor hours, and reversibility of work
   • Constraint impact: Pricing floor, cancellation cost, replenishment impossibility threshold

4. PRICE BAND (price_band_id)
   • Establishes customer value perception anchors and competitive positioning
   • Constraint impact: Acceptable margin range, maximum discount depth, exit timing pressure

5. SEASON (season_code)
   • Aligns with calendar-driven demand patterns and styling narratives
   • Constraint impact: Introduction window, peak selling period, obsolescence trigger date

Cross-dimensional constraints:
IF occasion_tier = 'bridal' AND craft_intensity_tier = 'high' THEN discount_max ≤ 20%
IF category_id = 'lehenga' AND price_band_id > 150000 THEN service_requirement = 'styling_consultation_mandatory'`,
    },
    {
      id: "q5",
      question:
        "Which assortment dimensions cannot be overridden by performance?",
      include:
        "Include immutable dimensions, prohibited transitions, and reasoning.",
      sampleAnswer: `Two dimensions are immutable regardless of sell-through, margin performance, or inventory pressure:

1. OCCASION TIER (occasion_tier)
Prohibited transition: occasion_tier: 'bridal' → 'pret' // NEVER ALLOWED

Reason:
• Violates customer expectations established at point of design
• Destroys brand equity in bridal category
• Creates pricing confusion and value perception damage
• Service delivery model is non-transferable

Decision rule: IF (occasion_tier = 'bridal') THEN allow_repositioning = FALSE

2. CRAFT INTENSITY TIER (craft_intensity_tier)
Prohibited actions:
IF craft_intensity_tier = 'hand_embroidered_high' THEN:
  discount_depth > 30% // BLOCKED
  replenishment_aggressive = TRUE // BLOCKED
  cross_season_carryover = TRUE // BLOCKED

Reason:
• Deep discounting signals quality doubt to customers
• Aggressive replenishment impossible due to artisan capacity limits
• Brand positioning requires price integrity maintenance
• Economic model breaks below craft-implied value floor

Performance-driven flexibility exists only in:
• inventory_depth_allocation (can increase/decrease by style)
• channel_availability_flags (can expand/contract store presence)
• exit_timing_acceleration (can move forward based on velocity)`,
    },
    {
      id: "q6",
      question: "Can a product change its assortment role after launch?",
      include:
        "Include repositioning rules, allowed adjustments, and edge cases.",
      sampleAnswer: `Very rarely. Once style_id is assigned values for occasion_tier and craft_intensity_tier, repositioning is actively avoided.

Repositioning prohibition reasons:
• Customer Impact: Disrupts learned associations between design language and occasion appropriateness
• Internal Consistency: Breaks decision rules for pricing, service, allocation, and exit established at style creation
• Brand Coherence: Undermines narrative integrity within seasonal collections
• Operational Chaos: Requires recalculation of all downstream parameters

Allowed micro-adjustments (not repositioning):
✓ price_point ± 10% within same price_band_id
✓ store_allocation expansion/contraction within same store_tier
✓ inventory_depth ± 30% based on early performance signals
✗ occasion_tier migration (always blocked)
✗ craft_intensity_tier downgrade (always blocked)
✗ category_id change (always blocked)

Edge case: Extreme underperformance
Even in severe inventory aging scenarios, repositioning is not used. Instead: accelerated markdown within brand-safe limits, strategic gifting programs, or controlled liquidation through secondary channels that maintain brand separation.`,
    },
    {
      id: "q7",
      question: "What lifecycle states does a product pass through?",
      include:
        "Include sequential states, mandatory gates, blocking conditions, and kill rate reality.",
      sampleAnswer: `Seven sequential states with mandatory gates. Reverse transitions blocked after In Production.

1. CONCEPT (lifecycle_state = 'concept')
   • Design brief exists, initial sketches complete, fabric direction identified
   • Decisions: Proceed to sampling | Kill concept
   • Constraints: cost_estimate_variance ≤ 25%, design_complexity_score defined

2. SAMPLE (lifecycle_state = 'sample')
   • Physical sample created, fit tested on fit model, initial quality check
   • Decisions: Approve for production | Rework sample | Kill style
   • Constraints: fit_approval_required = TRUE across all size_codes

3. APPROVED (lifecycle_state = 'approved')
   • Production-ready, vendor committed, fabric ordered, delivery timeline locked
   • Decisions: Move to production | Hold (max 30 days) | Final kill decision
   • Constraints: vendor_capacity_confirmed = TRUE, fabric_lead_time validated

4. IN PRODUCTION (lifecycle_state = 'in_production')
   • Cutting begun, embellishment in progress, sunk costs accumulating
   • Decisions: Continue to completion | Reduce order quantity (if <30% complete)
   • Constraints: cancellation_cost > 60% after this point, reversal_blocked = TRUE

5. LIVE (lifecycle_state = 'live')
   • Available for sale, inventory deployed to channels, active selling period
   • Decisions: Monitor performance | Adjust allocation | Trigger early exit
   • Constraints: min_live_period = 45 days before exit_consideration

6. AGING (lifecycle_state = 'aging')
   • Selling velocity declined, seasonal relevance fading, exit planning active
   • Decisions: Controlled markdown | Channel consolidation | Liquidation prep
   • Constraints: discount_increments = [15%, 25%, 40%], max_aging_period = 90 days

7. EXIT (lifecycle_state = 'exit')
   • Active liquidation, final markdowns applied, or sent to secondary channels
   • Decisions: Track sell-through | Final disposal decisions
   • Constraints: brand_protection_required = TRUE, channel_separation enforced

Kill rate reality: Approximately 30-40% of concepts are intentionally stopped at Sample or Approved stages. This is by design, not failure.`,
    },
    {
      id: "q8",
      question: "What determines progression from sample to production?",
      include:
        "Include mandatory approval criteria, test requirements, and decision logic.",
      sampleAnswer: `Six mandatory approval criteria. ALL must pass. Single failure blocks progression.

1. FIT CONSISTENCY ACROSS FULL SIZE RANGE
   • fit_approval_status = 'pass' required for ALL size_codes in range
   • Test: Sample must fit correctly on fit models for XS, S, M, L, XL without adjustment
   • Tolerance: Grading variance ≤ 0.5 inches across measurements
   • Rule: IF any(fit_approval_status = 'fail') THEN progression_blocked = TRUE

2. FINISH QUALITY STANDARD
   • quality_score ≥ quality_threshold_by_price_band
   • Checklist: Seam strength, stitch consistency, embroidery density, color fastness, lining attachment, hardware functionality
   • Rule: IF quality_score < threshold THEN rework_required = TRUE OR kill_style = TRUE

3. CRAFT FEASIBILITY AT INTENDED PRODUCTION VOLUME
   • artisan_capacity_available ≥ production_quantity * craft_hours_per_unit
   • Validation: Sufficient skilled artisan headcount, production timeline fits delivery window, quality maintainable across full batch
   • For hand embroidery: typical capacity = 1-2 pieces per artisan per week

4. ADHERENCE TO TARGET PRICE BAND WITHOUT COMPROMISE
   • landed_cost ≤ (target_retail_price / target_margin_multiplier)
   • Hard constraint: IF landed_cost_actual > landed_cost_target THEN redesign to reduce cost OR move to higher price_band OR kill
   • Cost overruns are never absorbed through margin compression

5. ALIGNMENT WITH SEASONAL STORY AND COLLECTION NARRATIVE
   • collection_coherence_score ≥ 7/10 (merchandising team evaluation)
   • Assessment: Color palette integration, silhouette balance, craft mix supports storytelling, occasion coverage gaps filled
   • Even commercially viable styles are killed if they dilute narrative focus

6. BRAND ALIGNMENT AND POSITIONING INTEGRITY
   • brand_alignment_check = 'pass' (design director approval required)
   • Assessment: Design language consistency, innovation balanced with brand recognition, customer expectation matching, competitive differentiation

Decision Rule Logic:
IF (fit_consistency = TRUE) AND (quality_score ≥ threshold) AND (craft_feasibility = TRUE) AND (cost_within_target = TRUE) AND (seasonal_alignment = TRUE) AND (brand_alignment = TRUE)
THEN progression_status = 'approved_for_production'
ELSE progression_status = 'blocked' → review_for_rework OR kill_decision

Commercial demand projections are NOT in the approval criteria. Customer demand alone does not justify production if quality or brand standards are compromised.`,
    },
    {
      id: "q9",
      question: "Are there points after which reversal is not viable?",
      include:
        "Include irreversibility thresholds, trigger conditions, and override rules.",
      sampleAnswer: `Yes. Two irreversibility thresholds exist with different trigger conditions:

THRESHOLD 1: ECONOMIC IRREVERSIBILITY
Trigger: lifecycle_state = 'in_production' AND production_completion_pct ≥ 30%

Sunk cost structure at this threshold:
• Fabric: 100% purchased and cut
• Labor: 30-50% of total hours invested
• Cancellation penalty: 40-60% of order value
• Vendor relationship cost: significant

Decision constraint: IF sunk_cost > 60% of total_production_cost THEN cancellation_economically_irrational = TRUE

At this point, completion is financially preferable even if demand projections have weakened.

THRESHOLD 2: CRAFT IRREVERSIBILITY (Overrides Economic)
Trigger: craft_intensity_tier = 'hand_embroidered' AND embroidery_commenced = TRUE

Why hand embroidery triggers absolute irreversibility:
• Artisan labor hours cannot be recovered (human time invested)
• Fabric cannot be reused after needle penetration at scale
• Vendor relationship damage exceeds order value
• Artisan livelihood impact creates reputational risk
• Cycle time means no alternative use for artisan capacity

Operational reality: Hand embroidery lead time = 60-120 days. Once commenced, cancellation creates 2-4 month gap in artisan income with no alternative work available. This is avoided regardless of economic cost.

Decision override rule:
IF craft_type = 'hand_embroidered' AND work_started = TRUE THEN cancellation_allowed = FALSE

This constraint overrides all other business considerations including weak demand signals, margin pressure, or inventory concerns.

COMPARISON: Reversibility by Production Type
• Machine Production: Cancellation viable until 50-60% complete
• Mixed Craft: Cancellation discouraged after 30% complete
• Hand Embroidered: Cancellation blocked at work commencement

Alternative to cancellation: Quantity reduction
If demand signals weaken during early production (<30% complete), order quantity can be reduced by up to 40% with vendor negotiation.

reduction_allowed = TRUE IF production_pct < 30% AND craft_intensity != 'hand_embroidered'`,
    },
    {
      id: "q10",
      question: "What states can inventory exist in?",
      include:
        "Include state definitions, flexibility levels, cost exposure, and transition rules.",
      sampleAnswer: `Inventory exists in five distinct states, each with different flexibility, cost exposure, and risk profiles:

1. COMMITTED FABRIC (inventory_state = 'fabric_committed')
   • Definition: Fabric purchased or reserved with vendor, not yet cut for specific style_id
   • Flexibility: Highest - Can be reassigned across styles within same fabric_type and color_family
   • Cost exposure: 15-25% of total product cost committed
   • Risk: Low - fabric has multiple potential uses, salvage value high
   • Rule: reassignment_allowed = TRUE IF new_style.fabric_spec = current_fabric.spec

2. WORK-IN-PROGRESS: CUT NOT EMBELLISHED (inventory_state = 'wip_cut')
   • Definition: Fabric cut to pattern for specific style_id, no embroidery started
   • Flexibility: Moderate - Limited reassignment possible to similar silhouettes within same category_id
   • Cost exposure: 30-40% of total product cost (fabric + cutting labor)
   • Risk: Medium - committed to silhouette family, harder to redirect
   • Rule: reassignment_allowed = TRUE IF new_style.category_id = current_style.category_id AND pattern_compatibility = TRUE

3. WORK-IN-PROGRESS: PARTIALLY EMBELLISHED (inventory_state = 'wip_embellished')
   • Definition: Embroidery, embellishment, or surface treatment in progress
   • Flexibility: Low - Reassignment effectively impossible
   • Cost exposure: 60-80% of total product cost (fabric + cutting + partial craft labor)
   • Risk: High - sunk artisan hours, cannot reverse craft work
   • Rule: reassignment_allowed = FALSE, completion_mandatory = TRUE

4. FINISHED GOODS: CENTRALIZED (inventory_state = 'finished_central')
   • Definition: Production complete, quality checked, held at central warehouse
   • Flexibility: Limited - Can be allocated to any store_id or channel
   • Cost exposure: 100% of production cost + warehousing holding cost
   • Risk: Time-sensitive - aging risk begins, must allocate within 14-21 days
   • Rule: allocation_flexibility = HIGH, aging_clock_started = TRUE

5. STORE-HELD OR CLIENT-RESERVED (inventory_state = 'allocated')
   • Definition: Physically present at store_id OR reserved for specific client_order_id
   • Flexibility: Minimal - Store inventory can be reallocated; client-reserved cannot be touched
   • Cost exposure: 100% production cost + allocation cost + opportunity cost
   • Risk: Highest - if client-reserved, zero liquidity until client decision
   • Rule: IF reservation_status = 'client_reserved' THEN liquidity = 0 ELSE liquidity = LOW

State Transition Rules:
fabric_committed → wip_cut (cutting operation, irreversible)
wip_cut → wip_embellished (embellishment start, partially reversible)
wip_embellished → finished_central (completion, one-way)
finished_central → allocated (allocation decision, reversible with cost)
allocated (store) ↔ allocated (different store) (reallocation, friction cost)
allocated (client_reserved) → [LOCKED] (cannot transition without client action)

Inventory Liquidity Index by State:
• Fabric: 90%
• Cut: 60%
• Embellished: 20%
• Central: 70%
• Allocated: 30%`,
    },
    {
      id: "q11",
      question: "Can inventory be reassigned across products or channels?",
      include:
        "Include reassignment scenarios, allowed conditions, constraint violations, and decision matrices.",
      sampleAnswer: `Reassignment rules depend on inventory_state and product archetype. Three reassignment scenarios exist:

SCENARIO 1: FABRIC & EARLY WIP REASSIGNMENT (Across Products)
Allowed conditions:
IF (inventory_state IN ['fabric_committed', 'wip_cut']) AND
   (new_style.craft_intensity_tier = current_style.craft_intensity_tier) AND
   (new_style.category_id = current_style.category_id OR pattern_compatible = TRUE) AND
   (new_style.fabric_spec = current_style.fabric_spec)
THEN reassignment_allowed = TRUE

Example: Fabric committed for Lehenga Style A (Silk, Green, Zardozi tier) can be reassigned to Lehenga Style B if Style B uses same silk quality and Zardozi craft tier.

Constraint violations that block:
• Craft downgrade (high embellishment → low embellishment fabric) = BLOCKED
• Category shift without pattern compatibility (lehenga fabric → kurta) = BLOCKED
• Fabric quality mismatch = BLOCKED

SCENARIO 2: FINISHED GOODS REASSIGNMENT (Across Channels/Stores)
Allowed conditions for store reallocation:
IF (inventory_state = 'finished_central' OR (inventory_state = 'allocated' AND reservation_status != 'client_reserved')) AND
   (target_store.customer_profile_match_score ≥ 0.7) AND
   (target_store.service_capability ≥ product.service_requirement)
THEN reallocation_allowed = TRUE WITH friction_cost

Store eligibility constraints:
• Bridal: store_tier = 'flagship', alteration_capability = TRUE, styling_staff >= 2
• Occasionwear: store_tier IN ['flagship', 'premium'], alteration_capability = TRUE
• Pret: No strict constraints, any store_tier eligible

Friction costs of reallocation:
• Physical transfer cost: ₹200-500 per unit
• Opportunity cost: 3-7 day transit window = lost selling days
• Store disruption: Receiving store must reorganize display
Reallocation only justified if expected_incremental_margin > (friction_cost + opportunity_cost)

SCENARIO 3: CLIENT-RESERVED INVENTORY (Reassignment Blocked)
Hard blocking rule:
IF reservation_status = 'client_reserved' AND reservation_expiry_date > current_date
THEN reassignment_allowed = FALSE, reallocation_allowed = FALSE, markdown_allowed = FALSE, ANY_modification = BLOCKED

Client reservation mechanics:
• Reservation duration: 14-30 days depending on client_tier and order_value
• During reservation: Inventory is fully locked, zero liquidity
• Grace period: Additional 7 days post-expiry before auto-release
• Release triggers: Client confirmation OR expiry + grace period elapsed

Why this is non-negotiable: Bridal and high-value occasionwear purchases are emotionally significant and time-sensitive. Breaking a client reservation destroys trust and creates permanent customer loss. Economic value of lifetime customer >> value of single piece reallocation.`,
    },
    {
      id: "q12",
      question: "Is all inventory equally liquid?",
      include:
        "Include liquidity tiers, characteristics, operational responses, and comparison metrics.",
      sampleAnswer: `No. Inventory liquidity varies dramatically by product archetype and craft intensity. Three distinct liquidity tiers exist:

ILLIQUID: BRIDAL & HIGH-EMBELLISHMENT INVENTORY (Liquidity: 10-25%)
Classification: liquidity_tier = 'illiquid' IF occasion_tier = 'bridal' OR craft_intensity_tier IN ['hand_embroidered_high', 'heavy_zardozi'] OR price_band_id > 150000

Why illiquid:
• Customer base is narrow: Only clients planning specific events
• Substitution impossible: Each piece perceived as unique, not fungible
• Seasonality severe: Wedding season drives 80% of demand in 4-5 month window
• Customization expectation: Even shelf pieces require fitting before sale
• Price sensitivity low but brand sensitivity absolute: Discounting damages perception

Liquidity constraints:
• max_discount = 20-25%
• avg_days_to_sale = 90-180
• store_transfer_success_rate < 40%
• liquidation_recovery_rate = 30-50%

Operational response: Extreme depth conservatism. Better to stock out than carry aging inventory. Planning bias: under-commit by 20-30% vs. forecast.

MODERATE LIQUIDITY: OCCASIONWEAR INVENTORY (Liquidity: 40-60%)
Classification: liquidity_tier = 'moderate' IF occasion_tier IN ['festive', 'cocktail', 'sangeet'] AND craft_intensity_tier IN ['medium_embroidery', 'print_embellished'] AND price_band_id BETWEEN 25000 AND 150000

Characteristics:
• Customer base broader: Multiple occasion types
• Limited substitution: Some flexibility in event application
• Seasonality present: Festival calendar drives 60% of demand across 8-9 months
• Markdown tolerance moderate: 30-40% discounts acceptable at season-end

Liquidity metrics:
• avg_days_to_sale = 45-90
• store_transfer_success_rate = 55-65%
• replenishment_possible = SOMETIMES (for early winners)
• liquidation_recovery_rate = 45-60%

LIQUID: PRET INVENTORY (Liquidity: 70-85%)
Classification: liquidity_tier = 'liquid' IF occasion_tier IN ['casual', 'work', 'everyday'] AND craft_intensity_tier IN ['printed', 'basic_embroidery', 'woven'] AND price_band_id < 25000

High liquidity drivers:
• Customer base massive: Wardrobe refresh purchases, not event-driven
• High substitution tolerance: Style preferences exist but switching cost low
• Seasonality mild: Demand spread across year
• Markdown flexibility: 50-60% discounts acceptable without brand damage
• Replenishment viable: Winners can be repeated 2-3 times per season

Liquidity metrics:
• avg_days_to_sale = 15-45
• store_transfer_success_rate = 75-85%
• liquidation_recovery_rate = 60-75%

Operational response: Aggressive depth commitments. Bias toward over-buying winners because exit risk is manageable. Planning bias: over-commit by 15-20% vs. forecast.

LIQUIDITY COMPARISON:
                    | Bridal    | Occasionwear | Pret
Days to sale        | 90-180    | 45-90        | 15-45
Max markdown        | 20-25%    | 30-40%       | 50-60%
Transfer success    | <40%      | 55-65%       | 75-85%
Replenishment       | Never     | Rare         | Common
Recovery rate       | 30-50%    | 45-60%       | 60-75%
Planning bias       | Under 30% | Neutral      | Over 20%
Aging tolerance     | 3-6 mo    | 2-4 mo       | 1-2 mo`,
    },
  ];

  const fillSampleData = () => {
    const sampleAnswers: any = {};
    questions.forEach((q) => {
      sampleAnswers[q.id] = q.sampleAnswer;
    });
    setAnswers(sampleAnswers);
    setShowSampleData(true);
  };

  const clearData = () => {
    setAnswers({});
    setShowSampleData(false);
  };

  const handleContinue = () => {
    setIsLoading(true);
    setLoadingMessageIndex(0); // Reset to first message

    // Navigate after showing all messages (adjust timing as needed)
    setTimeout(() => {
      router.push("/workspace/edit-bkg");
    }, 6000); // 4 messages × 1.5 seconds = 6 seconds
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev: any) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingMessageIndex((prevIndex) => {
          if (prevIndex < loadingMessages.length - 1) {
            return prevIndex + 1;
          }
          return prevIndex;
        });
      }, 1500); // Change message every 1.5 seconds

      return () => clearInterval(interval);
    }
  }, [isLoading, loadingMessages.length]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <div className="text-center">
          {/* Spinner */}
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-teal-700 rounded-full border-t-transparent animate-spin"></div>
          </div>

          {/* Loading text with fade animation */}
          <div className="min-h-[80px]">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2 transition-opacity duration-300">
              {loadingMessages[loadingMessageIndex].title}
            </h2>
            <p className="text-gray-600 transition-opacity duration-300">
              {loadingMessages[loadingMessageIndex].subtitle}
            </p>
          </div>

          {/* Progress indicator dots */}
          <div className="flex gap-2 justify-center mt-6">
            {loadingMessages.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === loadingMessageIndex
                    ? "w-8 bg-teal-700"
                    : index < loadingMessageIndex
                      ? "w-2 bg-gray-400"
                      : "w-2 bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-auto bg-gray-50">
      <div className="max-w-5xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="text-sm text-gray-500 mb-2">2/6</div>
            <h1 className="text-4xl font-serif text-gray-900 mb-4">
              Help us understand the business
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
              Share how the company plans, sells, and manages its operations.
              For each question, upload documents or describe the process in
              your own words - the richer the detail, the better the insights.
            </p>
          </div>
          <div className="flex gap-2">
            {showSampleData ? (
              <button
                onClick={clearData}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                Clear Data
              </button>
            ) : (
              <button
                onClick={fillSampleData}
                className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
              >
                Try Sample Data
              </button>
            )}
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-12">
          {questions.map((q, index) => (
            <div key={q.id} className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex gap-4 mb-6">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-medium">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {q.question}
                  </h3>

                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Include:</span>{" "}
                      {q.include}
                    </p>
                  </div>

                  <textarea
                    value={answers[q.id] || ""}
                    onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                    placeholder="Type your answer here..."
                    className="w-full h-64 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none text-gray-900 font-mono text-sm"
                    style={{ whiteSpace: "pre-wrap" }}
                  />

                  <button className="mt-4 flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                    <Paperclip size={18} />
                    <span>Add document(s)</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 flex justify-between items-center">
          <button className="px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors">
            ← Back
          </button>
          <button onClick={handleContinue} className="px-8 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium">
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
};

export default HOADBKGForm;

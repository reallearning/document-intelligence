import React from "react";
import {
  ArrowDown,
  TrendingUp,
  Target,
  Zap,
  CheckCircle,
  Clock,
  GitBranch,
} from "lucide-react";
import Image from "next/image";

const CaseStudy = () => {
  return (
    <div
      className="w-full h-screen overflow-auto"
      style={{ backgroundColor: "#E7DDCA" }}
    >
      {/* Hero Section */}
      <div
        style={{
          background: "linear-gradient(135deg, #0C2C18 0%, #1B2A21 100%)",
        }}
        className="text-white"
      >
        <div className="max-w-5xl mx-auto px-12 pt-20 pb-24">
          {/* Header */}
          <div className="flex justify-between items-center mb-16">
            <div
              className="text-4xl tracking-[0.3em] font-light"
              style={{ fontFamily: "Georgia, serif" }}
            >
              QUESTT
            </div>
            <div
              style={{ backgroundColor: "#DF7649" }}
              className="text-white px-6 py-2 text-xs tracking-[0.3em] font-bold"
            >
              CASE STUDY
            </div>
          </div>

          {/* Category Tag */}
          <div
            className="inline-block text-white px-8 py-3 text-sm tracking-[0.3em] font-bold mb-12"
            style={{ backgroundColor: "#DF7649" }}
          >
            CONSUMER HEALTH
          </div>

          {/* Main Title */}
          <h1
            className="text-7xl leading-[1.1] mb-8 font-light"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Intelligent Sales
            <br />
            & Trade
            <br />
            <span style={{ color: "#DF7649" }}>Execution</span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-2xl leading-relaxed mb-16 max-w-3xl font-light"
            style={{ color: "#85A383" }}
          >
            Transforming a consumer health leader from reactive planning to
            intelligent, continuous sales execution.
          </p>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-3 gap-6">
            <div
              className="backdrop-blur p-6 border-l-4"
              style={{
                backgroundColor: "rgba(27, 42, 33, 0.6)",
                borderColor: "#DF7649",
              }}
            >
              <div
                className="text-xs tracking-wider mb-2 font-bold"
                style={{ color: "#DF7649" }}
              >
                REVENUE
              </div>
              <div className="text-white text-3xl font-light">$1B+</div>
            </div>
            <div
              className="backdrop-blur p-6 border-l-4"
              style={{
                backgroundColor: "rgba(27, 42, 33, 0.6)",
                borderColor: "#DF7649",
              }}
            >
              <div
                className="text-xs tracking-wider mb-2 font-bold"
                style={{ color: "#DF7649" }}
              >
                OUTLET NETWORK
              </div>
              <div className="text-white text-3xl font-light">500k+</div>
            </div>
            <div
              className="backdrop-blur p-6 border-l-4"
              style={{
                backgroundColor: "rgba(27, 42, 33, 0.6)",
                borderColor: "#DF7649",
              }}
            >
              <div
                className="text-xs tracking-wider mb-2 font-bold"
                style={{ color: "#DF7649" }}
              >
                DISTRIBUTORS
              </div>
              <div className="text-white text-3xl font-light">1200+</div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="max-w-5xl mx-auto px-12 -mt-12 mb-20">
        <div
          className="relative w-full aspect-video border-4 shadow-2xl overflow-hidden"
          style={{
            borderColor: "#E7DDCA",
          }}
        >
          <Image
            src="/images/consumer-health-case-study.jpg"
            alt="Premium fashion retail store interior"
            fill
            className="object-cover"
            quality={95}
            priority
            unoptimized
          />
        </div>
      </div>

      {/* Impact Metrics Section */}
      <div className="py-20" style={{ backgroundColor: "#DF7649" }}>
        <div className="max-w-5xl mx-auto px-12">
          <div className="flex items-center gap-4 mb-12">
            <TrendingUp className="w-8 h-8 text-white" />
            <div className="text-white text-lg tracking-[0.3em] font-bold">
              MEASURED IMPACT
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div
              className="p-10 shadow-xl"
              style={{ backgroundColor: "#E7DDCA" }}
            >
              <div
                className="text-7xl mb-4 font-bold"
                style={{ color: "#DF7649" }}
              >
                +2–3%
              </div>
              <div
                className="text-base font-bold mb-3 tracking-wide"
                style={{ color: "#0C2C18" }}
              >
                SECONDARY SALES UPLIFT
              </div>
              <div
                className="text-sm leading-relaxed"
                style={{ color: "#1B2A21" }}
              >
                Percentage point increase from better outlet targeting and
                higher execution quality
              </div>
            </div>

            <div
              className="p-10 shadow-xl border-4"
              style={{ backgroundColor: "#0C2C18", borderColor: "#85A383" }}
            >
              <div
                className="text-7xl mb-4 font-bold"
                style={{ color: "#DF7649" }}
              >
                +10–18%
              </div>
              <div className="text-white text-base font-bold mb-3 tracking-wide">
                PROMO ROI IMPROVEMENT
              </div>
              <div
                className="text-sm leading-relaxed"
                style={{ color: "#85A383" }}
              >
                Percentage point increase at similar spend levels with less
                leakage and better mechanism fit
              </div>
            </div>

            <div
              className="p-10 shadow-xl border-4"
              style={{ backgroundColor: "#0C2C18", borderColor: "#85A383" }}
            >
              <div
                className="text-7xl mb-4 font-bold"
                style={{ color: "#85A383" }}
              >
                15–25%
              </div>
              <div className="text-white text-base font-bold mb-3 tracking-wide">
                REDUCTION IN LOST SALES
              </div>
              <div
                className="text-sm leading-relaxed"
                style={{ color: "#85A383" }}
              >
                Fewer outlets with lost sales through availability and
                replenishment coordination
              </div>
            </div>

            <div
              className="p-10 shadow-xl"
              style={{ backgroundColor: "#E7DDCA" }}
            >
              <div
                className="text-7xl mb-4 font-bold"
                style={{ color: "#85A383" }}
              >
                25–40%
              </div>
              <div
                className="text-base font-bold mb-3 tracking-wide"
                style={{ color: "#0C2C18" }}
              >
                FASTER ACTION CYCLES
              </div>
              <div
                className="text-sm leading-relaxed"
                style={{ color: "#1B2A21" }}
              >
                Time reduction for market issue resolution through automated
                prioritization
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Company Context */}
      <div className="max-w-5xl mx-auto px-12 py-24">
        <div className="flex items-center gap-4 mb-12">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#DF7649" }}
          >
            <Target className="w-6 h-6 text-white" />
          </div>
          <div
            className="text-lg tracking-[0.3em] font-bold"
            style={{ color: "#DF7649" }}
          >
            THE BUSINESS
          </div>
        </div>

        <h2
          className="text-6xl mb-8 leading-tight font-light"
          style={{ fontFamily: "Georgia, serif", color: "#0C2C18" }}
        >
          A consumer health leader constrained by{" "}
          <span style={{ color: "#DF7649" }} className="font-normal">
            execution quality
          </span>
        </h2>

        <div
          className="space-y-6 text-lg leading-relaxed mb-16"
          style={{ color: "#1B2A21" }}
        >
          <p>
            A consumer health leader with a broad portfolio (OTC, wellness, oral
            care, pain relief, vitamins), selling through General Trade,
            Pharmacy, Modern Trade, and E-commerce—where growth is driven by{" "}
            <strong style={{ color: "#0C2C18" }}>
              distribution depth, in-store execution, and trade spend efficiency
            </strong>
            .
          </p>

          <p>
            The complexity is massive.{" "}
            <strong style={{ color: "#DF7649" }}>500k+ outlets</strong> across
            General Trade and pharmacy channels, with{" "}
            <strong style={{ color: "#DF7649" }}>
              1200+ distributors/stockists
            </strong>{" "}
            and high variance in outlet potential, servicing frequency, and
            compliance.
          </p>
        </div>

        {/* Complexity Table */}
        <div
          className="bg-white border-4 shadow-xl mb-20"
          style={{ borderColor: "#0C2C18" }}
        >
          <div
            className="px-8 py-5 flex items-center gap-3"
            style={{ backgroundColor: "#0C2C18" }}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: "#DF7649" }}
            ></div>
            <h3 className="text-base tracking-wider font-bold text-white">
              OPERATIONAL COMPLEXITY
            </h3>
          </div>
          <table className="w-full">
            <tbody>
              <tr className="border-b-2" style={{ borderColor: "#E7DDCA" }}>
                <td
                  className="px-8 py-6 font-bold text-base w-1/3"
                  style={{
                    color: "#DF7649",
                    backgroundColor: "rgba(223, 118, 73, 0.1)",
                  }}
                >
                  Operating Model
                </td>
                <td className="px-8 py-6" style={{ color: "#1B2A21" }}>
                  Secondary sales as operating heartbeat; large field force
                  (RSM/ASM/TSI) managing distributor and outlet execution
                </td>
              </tr>
              <tr className="border-b-2" style={{ borderColor: "#E7DDCA" }}>
                <td
                  className="px-8 py-6 font-bold text-base"
                  style={{
                    color: "#DF7649",
                    backgroundColor: "rgba(223, 118, 73, 0.1)",
                  }}
                >
                  Network Structure
                </td>
                <td className="px-8 py-6" style={{ color: "#1B2A21" }}>
                  1200+ distributors → 500k+ outlets with high variance in
                  potential and service needs
                </td>
              </tr>
              <tr className="border-b-2" style={{ borderColor: "#E7DDCA" }}>
                <td
                  className="px-8 py-6 font-bold text-base"
                  style={{
                    color: "#DF7649",
                    backgroundColor: "rgba(223, 118, 73, 0.1)",
                  }}
                >
                  Core Constraints
                </td>
                <td className="px-8 py-6" style={{ color: "#1B2A21" }}>
                  Limited field bandwidth, inconsistent distributor inventory,
                  scheme leakage risk, fragmented view of what works
                </td>
              </tr>
              <tr>
                <td
                  className="px-8 py-6 text-white font-bold text-base"
                  style={{ backgroundColor: "#0C2C18" }}
                >
                  Real Constraint
                </td>
                <td
                  className="px-8 py-6"
                  style={{
                    color: "#1B2A21",
                    backgroundColor: "rgba(223, 118, 73, 0.05)",
                  }}
                >
                  <strong style={{ color: "#DF7649" }}>
                    Quality of outlet-level decisions and trade spend
                    effectiveness
                  </strong>{" "}
                  required to drive growth without leakage
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* The Real Problem */}
      <div
        className="py-24"
        style={{ backgroundColor: "rgba(223, 118, 73, 0.08)" }}
      >
        <div className="max-w-5xl mx-auto px-12">
          <div className="flex items-center gap-4 mb-12">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#DF7649" }}
            >
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div
              className="text-lg tracking-[0.3em] font-bold"
              style={{ color: "#DF7649" }}
            >
              THE DECISION PROBLEM
            </div>
          </div>

          <h2
            className="text-6xl mb-12 leading-tight font-light"
            style={{ fontFamily: "Georgia, serif", color: "#0C2C18" }}
          >
            Micro-decisions that{" "}
            <span style={{ color: "#DF7649" }} className="font-normal">
              create massive leakage
            </span>
          </h2>

          <div
            className="space-y-6 text-lg leading-relaxed mb-16"
            style={{ color: "#1B2A21" }}
          >
            <p>
              Consumer health sales execution isn't "run a scheme and push
              volume." It's a{" "}
              <strong style={{ color: "#0C2C18" }}>
                continuous set of micro-decisions
              </strong>{" "}
              across outlets, distributors, beats, and mechanisms—and small
              misses create big leakage.
            </p>

            <p className="font-bold text-xl" style={{ color: "#0C2C18" }}>
              For every market × channel × brand, every week—sometimes every
              day—teams must decide:
            </p>
          </div>

          {/* Decision Flowchart */}
          <div className="space-y-4">
            <div
              className="bg-white border-l-8 p-8 shadow-lg flex items-start gap-6"
              style={{ borderColor: "#DF7649" }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0"
                style={{ backgroundColor: "#DF7649" }}
              >
                1
              </div>
              <div className="flex-1">
                <div
                  className="font-bold text-xl mb-2"
                  style={{ color: "#0C2C18" }}
                >
                  Which outlets matter most right now?
                </div>
                <div className="text-base" style={{ color: "#1B2A21" }}>
                  Priority list changes with seasonality, local demand, and
                  competition
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <ArrowDown className="w-8 h-8" style={{ color: "#DF7649" }} />
            </div>

            <div
              className="p-8 shadow-lg flex items-start gap-6 border-l-8"
              style={{ backgroundColor: "#0C2C18", borderColor: "#85A383" }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0"
                style={{ backgroundColor: "#85A383", color: "#0C2C18" }}
              >
                2
              </div>
              <div className="flex-1">
                <div className="text-white font-bold text-xl mb-2">
                  What action will move the needle?
                </div>
                <div className="text-base" style={{ color: "#85A383" }}>
                  Distribution, visibility, placement, recommendation, scheme,
                  or sampling?
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <ArrowDown className="w-8 h-8" style={{ color: "#DF7649" }} />
            </div>

            <div
              className="bg-white border-l-8 p-8 shadow-lg flex items-start gap-6"
              style={{ borderColor: "#DF7649" }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0"
                style={{ backgroundColor: "#DF7649" }}
              >
                3
              </div>
              <div className="flex-1">
                <div
                  className="font-bold text-xl mb-2"
                  style={{ color: "#0C2C18" }}
                >
                  What should the scheme be in this micro-market?
                </div>
                <div className="text-base" style={{ color: "#1B2A21" }}>
                  Bundle vs slab vs trade discount vs consumer promo vs
                  visibility-linked?
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <ArrowDown className="w-8 h-8" style={{ color: "#DF7649" }} />
            </div>

            <div
              className="p-8 shadow-lg flex items-start gap-6 border-l-8"
              style={{ backgroundColor: "#DF7649", borderColor: "#0C2C18" }}
            >
              <div
                className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-2xl font-bold flex-shrink-0"
                style={{ color: "#DF7649" }}
              >
                4
              </div>
              <div className="flex-1">
                <div className="text-white font-bold text-xl mb-2">
                  Where is the leakage?
                </div>
                <div className="text-white text-base opacity-90">
                  Claims without lift, abnormal redemptions, distributor
                  stockouts vs weak sell-out
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <ArrowDown className="w-8 h-8" style={{ color: "#DF7649" }} />
            </div>

            <div
              className="p-8 shadow-lg flex items-start gap-6 border-l-8"
              style={{ backgroundColor: "#0C2C18", borderColor: "#85A383" }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0"
                style={{ backgroundColor: "#85A383", color: "#0C2C18" }}
              >
                5
              </div>
              <div className="flex-1">
                <div className="text-white font-bold text-xl mb-2">
                  Is the issue demand or supply?
                </div>
                <div className="text-base" style={{ color: "#85A383" }}>
                  Outlet wants it but distributor is out; or stock exists but
                  sell-out is weak?
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Solution Section */}
      <div
        className="py-24"
        style={{
          background: "linear-gradient(135deg, #0C2C18 0%, #1B2A21 100%)",
        }}
      >
        <div className="max-w-5xl mx-auto px-12">
          <div className="flex items-center gap-4 mb-12">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#DF7649" }}
            >
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div
              className="text-lg tracking-[0.3em] font-bold"
              style={{ color: "#DF7649" }}
            >
              THE QUESTT APPROACH
            </div>
          </div>

          <h2
            className="text-white text-6xl mb-12 leading-tight font-light"
            style={{ fontFamily: "Georgia, serif" }}
          >
            One unified AI{" "}
            <span style={{ color: "#DF7649" }} className="font-normal">
              decision layer
            </span>
          </h2>

          <p
            className="text-xl leading-loose mb-16"
            style={{ color: "#85A383" }}
          >
            Questt deployed an AI decision layer that unified{" "}
            <strong className="text-white">
              outlet prioritization + scheme effectiveness + distributor
              readiness + execution monitoring
            </strong>{" "}
            into one system—with guardrails aligned to sales leadership and
            trade budgets. It produced{" "}
            <strong className="text-white">specific execution decisions</strong>{" "}
            that sales teams could run weekly/daily.
          </p>

          {/* Solution Components */}
          <div className="space-y-8">
            {/* Outlet Prioritization */}
            <div
              className="p-10 shadow-2xl border-l-8"
              style={{ backgroundColor: "#E7DDCA", borderColor: "#DF7649" }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: "#DF7649" }}
                ></div>
                <div
                  className="text-3xl font-bold"
                  style={{ color: "#DF7649" }}
                >
                  Outlet Prioritization & Beat Planning
                </div>
              </div>

              <div className="space-y-6 text-base">
                <div
                  className="p-6 rounded"
                  style={{ backgroundColor: "rgba(223, 118, 73, 0.1)" }}
                >
                  <div
                    className="font-bold mb-3 text-lg"
                    style={{ color: "#DF7649" }}
                  >
                    Dynamic Outlet Priority
                  </div>
                  <div style={{ color: "#1B2A21" }}>
                    Identifies outlets with highest incremental potential (not
                    just historical sales), separating real opportunity from
                    noise like seasonality spikes or temporary availability
                    issues.
                  </div>
                </div>
                <div
                  className="p-6 rounded"
                  style={{ backgroundColor: "rgba(223, 118, 73, 0.1)" }}
                >
                  <div
                    className="font-bold mb-3 text-lg"
                    style={{ color: "#DF7649" }}
                  >
                    Action-Type Assignment
                  </div>
                  <div style={{ color: "#1B2A21" }}>
                    For each outlet, recommends the right lever: distribution
                    add, visibility, placement, pharmacist recommendation,
                    sampling, or scheme—avoiding wasted visits where impact is
                    low.
                  </div>
                </div>
                <div
                  className="p-6 rounded"
                  style={{ backgroundColor: "rgba(223, 118, 73, 0.1)" }}
                >
                  <div
                    className="font-bold mb-3 text-lg"
                    style={{ color: "#DF7649" }}
                  >
                    Coverage Gap Detection
                  </div>
                  <div style={{ color: "#1B2A21" }}>
                    Detects missed beats, low-frequency outlets, under-served
                    micro-pockets, and flags when the issue is execution
                    bandwidth vs outlet response.
                  </div>
                </div>
              </div>
            </div>

            {/* Scheme Effectiveness */}
            <div
              className="p-10 shadow-2xl border-l-8"
              style={{ backgroundColor: "#1B2A21", borderColor: "#85A383" }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: "#85A383" }}
                ></div>
                <div
                  className="text-3xl font-bold"
                  style={{ color: "#85A383" }}
                >
                  Scheme Effectiveness & Leakage Control
                </div>
              </div>

              <div className="space-y-6 text-base">
                <div
                  className="p-6 rounded"
                  style={{ backgroundColor: "rgba(133, 163, 131, 0.1)" }}
                >
                  <div
                    className="font-bold mb-3 text-lg"
                    style={{ color: "#85A383" }}
                  >
                    Mechanism-Market Fit
                  </div>
                  <div style={{ color: "#85A383" }}>
                    Recommends scheme types by micro-market: bundle vs slab vs
                    price-off vs visibility-linked, adjusting depth and duration
                    based on elasticity and competitive intensity.
                  </div>
                </div>
                <div
                  className="p-6 rounded"
                  style={{ backgroundColor: "rgba(133, 163, 131, 0.1)" }}
                >
                  <div
                    className="font-bold mb-3 text-lg"
                    style={{ color: "#85A383" }}
                  >
                    Leakage Detection
                  </div>
                  <div style={{ color: "#85A383" }}>
                    Flags abnormal redemptions, claims without corresponding
                    lift, outlet clusters with unusual margins, and detects
                    channel conflicts (e.g., MT pricing impacting pharmacy
                    uptake).
                  </div>
                </div>
                <div
                  className="p-6 rounded"
                  style={{ backgroundColor: "rgba(133, 163, 131, 0.1)" }}
                >
                  <div
                    className="font-bold mb-3 text-lg"
                    style={{ color: "#85A383" }}
                  >
                    Rapid Optimization Loop
                  </div>
                  <div style={{ color: "#85A383" }}>
                    Identifies underperforming pockets early and recommends
                    swaps: change mechanic, shift budget, change outlet
                    set—avoiding wait-for-month-end post-mortems.
                  </div>
                </div>
              </div>
            </div>

            {/* Distributor Readiness */}
            <div
              className="p-10 shadow-2xl border-l-8"
              style={{ backgroundColor: "#E7DDCA", borderColor: "#DF7649" }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: "#DF7649" }}
                ></div>
                <div
                  className="text-3xl font-bold"
                  style={{ color: "#DF7649" }}
                >
                  Distributor Readiness & Replenishment
                </div>
              </div>

              <div
                className="text-base leading-relaxed"
                style={{ color: "#1B2A21" }}
              >
                <p>
                  Identifies fast-moving outlets at risk of lost sales due to
                  distributor stockouts. Recommends distributor rebalancing
                  priorities across beats, triggers early replenishment for
                  scheme-activated outlets, and flags slow-moving distributor
                  pockets where stock is aging despite scheme activity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Solution Architecture Section */}
      <div className="py-24" style={{ backgroundColor: "#E7DDCA" }}>
        <div className="max-w-5xl mx-auto px-12">
          <div className="flex items-center gap-4 mb-12">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#85A383" }}
            >
              <GitBranch className="w-6 h-6 text-white" />
            </div>
            <div
              className="text-lg tracking-[0.3em] font-bold"
              style={{ color: "#85A383" }}
            >
              THE SOLUTION ARCHITECTURE
            </div>
          </div>

          <h2
            className="text-5xl mb-16 leading-tight font-light"
            style={{ fontFamily: "Georgia, serif", color: "#0C2C18" }}
          >
            How the AI <span style={{ color: "#DF7649" }}>decision layer</span>{" "}
            works
          </h2>

          {/* Business Knowledge Graph */}
          <div className="mb-16">
            <h3
              className="text-2xl mb-6 font-bold"
              style={{ color: "#0C2C18" }}
            >
              1. Business Knowledge Graph
            </h3>
            <div
              className="w-full bg-white border-4 shadow-xl p-8"
              style={{ borderColor: "#85A383" }}
            >
              <div className="text-center mb-6">
                <div
                  className="text-lg tracking-wider font-bold"
                  style={{ color: "#0C2C18" }}
                >
                  UNIFIED DATA FABRIC
                </div>
                <div
                  className="text-sm opacity-70"
                  style={{ color: "#1B2A21" }}
                >
                  All business entities connected in real-time
                </div>
              </div>

              {/* Network Visualization */}
              <svg
                viewBox="0 0 1200 750"
                className="w-full h-[650px]"
                style={{ backgroundColor: "#E7DDCA" }}
              >
                {/* Dense web of connections */}
                <g opacity="0.12" stroke="#0C2C18" strokeWidth="0.8">
                  {/* Portfolio to RTM connections */}
                  <line x1="150" y1="100" x2="300" y2="150" />
                  <line x1="150" y1="100" x2="450" y2="200" />
                  <line x1="150" y1="100" x2="600" y2="150" />
                  <line x1="150" y1="100" x2="900" y2="100" />
                  <line x1="300" y1="150" x2="600" y2="250" />
                  <line x1="450" y1="200" x2="750" y2="300" />
                  {/* RTM to Consumer connections */}
                  <line x1="600" y1="150" x2="900" y2="100" />
                  <line x1="750" y1="200" x2="1000" y2="150" />
                  {/* Supply Chain connections */}
                  <line x1="200" y1="400" x2="450" y2="500" />
                  <line x1="350" y1="450" x2="600" y2="550" />
                  <line x1="450" y1="500" x2="750" y2="600" />
                  {/* Cross-domain connections */}
                  <line x1="150" y1="100" x2="200" y2="400" />
                  <line x1="300" y1="150" x2="350" y2="450" />
                  <line x1="600" y1="150" x2="600" y2="550" />
                  <line x1="900" y1="100" x2="800" y2="550" />
                  <line x1="450" y1="200" x2="450" y2="500" />
                  <line x1="750" y1="300" x2="750" y2="600" />
                  {/* RGM to Finance */}
                  <line x1="200" y1="600" x2="600" y2="300" />
                  <line x1="350" y1="650" x2="750" y2="350" />
                  <line x1="450" y1="700" x2="900" y2="450" />
                  <line x1="1000" y1="150" x2="950" y2="500" />
                </g>

                {/* PORTFOLIO & PRODUCT DOMAIN - Top Left */}
                <g>
                  {/* Core Product Node */}
                  <circle
                    cx="150"
                    cy="100"
                    r="42"
                    fill="#0C2C18"
                    stroke="#DF7649"
                    strokeWidth="3"
                  />
                  <text
                    x="150"
                    y="100"
                    textAnchor="middle"
                    fill="#E7DDCA"
                    fontSize="13"
                    fontWeight="bold"
                    dy="0.3em"
                  >
                    Product
                  </text>

                  {/* Satellites */}
                  <circle
                    cx="90"
                    cy="160"
                    r="20"
                    fill="#1B2A21"
                    opacity="0.9"
                  />
                  <text
                    x="90"
                    y="160"
                    textAnchor="middle"
                    fill="#E7DDCA"
                    fontSize="9"
                    dy="0.3em"
                  >
                    SKU
                  </text>

                  <circle
                    cx="210"
                    cy="150"
                    r="20"
                    fill="#1B2A21"
                    opacity="0.9"
                  />
                  <text
                    x="210"
                    y="150"
                    textAnchor="middle"
                    fill="#E7DDCA"
                    fontSize="9"
                    dy="0.3em"
                  >
                    Price
                  </text>

                  <circle
                    cx="110"
                    cy="50"
                    r="16"
                    fill="#85A383"
                    opacity="0.9"
                  />
                  <text
                    x="110"
                    y="50"
                    textAnchor="middle"
                    fill="#0C2C18"
                    fontSize="8"
                    dy="0.3em"
                  >
                    Pack
                  </text>

                  <circle
                    cx="190"
                    cy="50"
                    r="16"
                    fill="#85A383"
                    opacity="0.9"
                  />
                  <text
                    x="190"
                    y="50"
                    textAnchor="middle"
                    fill="#0C2C18"
                    fontSize="8"
                    dy="0.3em"
                  >
                    Claims
                  </text>

                  <circle
                    cx="40"
                    cy="100"
                    r="16"
                    fill="#85A383"
                    opacity="0.9"
                  />
                  <text
                    x="40"
                    y="100"
                    textAnchor="middle"
                    fill="#0C2C18"
                    fontSize="8"
                    dy="0.3em"
                  >
                    Label
                  </text>
                </g>

                {/* BRAND & CATEGORY */}
                <g>
                  <circle
                    cx="300"
                    cy="150"
                    r="26"
                    fill="#1B2A21"
                    opacity="0.9"
                  />
                  <text
                    x="300"
                    y="150"
                    textAnchor="middle"
                    fill="#E7DDCA"
                    fontSize="10"
                    fontWeight="bold"
                    dy="0.3em"
                  >
                    Brand
                  </text>

                  <circle
                    cx="270"
                    cy="210"
                    r="16"
                    fill="#85A383"
                    opacity="0.9"
                  />
                  <text
                    x="270"
                    y="210"
                    textAnchor="middle"
                    fill="#0C2C18"
                    fontSize="8"
                    dy="0.3em"
                  >
                    Category
                  </text>

                  <circle
                    cx="340"
                    cy="210"
                    r="14"
                    fill="#85A383"
                    opacity="0.9"
                  />
                  <text
                    x="340"
                    y="210"
                    textAnchor="middle"
                    fill="#0C2C18"
                    fontSize="7"
                    dy="0.3em"
                  >
                    Position
                  </text>
                </g>

                {/* CHANNEL & RTM - Top Center */}
                <g>
                  <circle
                    cx="600"
                    cy="150"
                    r="42"
                    fill="#0C2C18"
                    stroke="#DF7649"
                    strokeWidth="3"
                  />
                  <text
                    x="600"
                    y="150"
                    textAnchor="middle"
                    fill="#E7DDCA"
                    fontSize="13"
                    fontWeight="bold"
                    dy="0.3em"
                  >
                    Channel
                  </text>

                  <circle
                    cx="540"
                    cy="90"
                    r="20"
                    fill="#1B2A21"
                    opacity="0.9"
                  />
                  <text
                    x="540"
                    y="90"
                    textAnchor="middle"
                    fill="#E7DDCA"
                    fontSize="9"
                    dy="0.3em"
                  >
                    Pharmacy
                  </text>

                  <circle
                    cx="660"
                    cy="90"
                    r="20"
                    fill="#1B2A21"
                    opacity="0.9"
                  />
                  <text
                    x="660"
                    y="90"
                    textAnchor="middle"
                    fill="#E7DDCA"
                    fontSize="9"
                    dy="0.3em"
                  >
                    GT
                  </text>

                  <circle
                    cx="540"
                    cy="220"
                    r="16"
                    fill="#85A383"
                    opacity="0.9"
                  />
                  <text
                    x="540"
                    y="220"
                    textAnchor="middle"
                    fill="#0C2C18"
                    fontSize="8"
                    dy="0.3em"
                  >
                    MT
                  </text>

                  <circle
                    cx="660"
                    cy="220"
                    r="16"
                    fill="#85A383"
                    opacity="0.9"
                  />
                  <text
                    x="660"
                    y="220"
                    textAnchor="middle"
                    fill="#0C2C18"
                    fontSize="8"
                    dy="0.3em"
                  >
                    Ecom
                  </text>
                </g>

                {/* MARKET & REGION */}
                <g>
                  <circle
                    cx="450"
                    cy="200"
                    r="26"
                    fill="#1B2A21"
                    opacity="0.9"
                  />
                  <text
                    x="450"
                    y="200"
                    textAnchor="middle"
                    fill="#E7DDCA"
                    fontSize="10"
                    fontWeight="bold"
                    dy="0.3em"
                  >
                    Market
                  </text>

                  <circle
                    cx="410"
                    cy="250"
                    r="14"
                    fill="#85A383"
                    opacity="0.9"
                  />
                  <text
                    x="410"
                    y="250"
                    textAnchor="middle"
                    fill="#0C2C18"
                    fontSize="7"
                    dy="0.3em"
                  >
                    Region
                  </text>

                  <circle
                    cx="490"
                    cy="250"
                    r="14"
                    fill="#85A383"
                    opacity="0.9"
                  />
                  <text
                    x="490"
                    y="250"
                    textAnchor="middle"
                    fill="#0C2C18"
                    fontSize="7"
                    dy="0.3em"
                  >
                    Cluster
                  </text>
                </g>

                {/* CUSTOMER & OUTLET - Top Center Right */}
                <g>
                  <circle
                    cx="750"
                    cy="200"
                    r="26"
                    fill="#1B2A21"
                    opacity="0.9"
                  />
                  <text
                    x="750"
                    y="200"
                    textAnchor="middle"
                    fill="#E7DDCA"
                    fontSize="10"
                    fontWeight="bold"
                    dy="0.3em"
                  >
                    Customer
                  </text>

                  <circle
                    cx="710"
                    cy="260"
                    r="16"
                    fill="#85A383"
                    opacity="0.9"
                  />
                  <text
                    x="710"
                    y="260"
                    textAnchor="middle"
                    fill="#0C2C18"
                    fontSize="8"
                    dy="0.3em"
                  >
                    Retailer
                  </text>

                  <circle
                    cx="790"
                    cy="260"
                    r="16"
                    fill="#85A383"
                    opacity="0.9"
                  />
                  <text
                    x="790"
                    y="260"
                    textAnchor="middle"
                    fill="#0C2C18"
                    fontSize="8"
                    dy="0.3em"
                  >
                    KA Chain
                  </text>
                </g>

                {/* CONSUMER DOMAIN - Top Right */}
                <g>
                  <circle
                    cx="900"
                    cy="100"
                    r="42"
                    fill="#0C2C18"
                    stroke="#DF7649"
                    strokeWidth="3"
                  />
                  <text
                    x="900"
                    y="100"
                    textAnchor="middle"
                    fill="#E7DDCA"
                    fontSize="13"
                    fontWeight="bold"
                    dy="0.3em"
                  >
                    Consumer
                  </text>

                  <circle
                    cx="840"
                    cy="160"
                    r="20"
                    fill="#1B2A21"
                    opacity="0.9"
                  />
                  <text
                    x="840"
                    y="160"
                    textAnchor="middle"
                    fill="#E7DDCA"
                    fontSize="9"
                    dy="0.3em"
                  >
                    Segment
                  </text>

                  <circle
                    cx="960"
                    cy="160"
                    r="20"
                    fill="#1B2A21"
                    opacity="0.9"
                  />
                  <text
                    x="960"
                    y="160"
                    textAnchor="middle"
                    fill="#E7DDCA"
                    fontSize="9"
                    dy="0.3em"
                  >
                    Journey
                  </text>

                  <circle
                    cx="900"
                    cy="50"
                    r="16"
                    fill="#85A383"
                    opacity="0.9"
                  />
                  <text
                    x="900"
                    y="50"
                    textAnchor="middle"
                    fill="#0C2C18"
                    fontSize="8"
                    dy="0.3em"
                  >
                    Need
                  </text>
                </g>

                {/* PROMOTION & RGM - Top Right Extended */}
                <g>
                  <circle
                    cx="1000"
                    cy="150"
                    r="26"
                    fill="#DF7649"
                    opacity="0.9"
                  />
                  <text
                    x="1000"
                    y="150"
                    textAnchor="middle"
                    fill="white"
                    fontSize="10"
                    fontWeight="bold"
                    dy="0.3em"
                  >
                    Promo
                  </text>

                  <circle
                    cx="1060"
                    cy="190"
                    r="16"
                    fill="#DF7649"
                    opacity="0.8"
                  />
                  <text
                    x="1060"
                    y="190"
                    textAnchor="middle"
                    fill="white"
                    fontSize="8"
                    dy="0.3em"
                  >
                    Scheme
                  </text>

                  <circle
                    cx="1060"
                    cy="110"
                    r="14"
                    fill="#DF7649"
                    opacity="0.75"
                  />
                  <text
                    x="1060"
                    y="110"
                    textAnchor="middle"
                    fill="white"
                    fontSize="7"
                    dy="0.3em"
                  >
                    ROI
                  </text>
                </g>

                {/* DISTRIBUTOR DOMAIN - Left Center */}
                <g>
                  <circle
                    cx="200"
                    cy="400"
                    r="42"
                    fill="#0C2C18"
                    stroke="#85A383"
                    strokeWidth="3"
                  />
                  <text
                    x="200"
                    y="400"
                    textAnchor="middle"
                    fill="#E7DDCA"
                    fontSize="12"
                    fontWeight="bold"
                    dy="0.3em"
                  >
                    Distributor
                  </text>

                  <circle
                    cx="140"
                    cy="340"
                    r="20"
                    fill="#1B2A21"
                    opacity="0.9"
                  />
                  <text
                    x="140"
                    y="340"
                    textAnchor="middle"
                    fill="#E7DDCA"
                    fontSize="9"
                    dy="0.3em"
                  >
                    Territory
                  </text>

                  <circle
                    cx="260"
                    cy="350"
                    r="20"
                    fill="#1B2A21"
                    opacity="0.9"
                  />
                  <text
                    x="260"
                    y="350"
                    textAnchor="middle"
                    fill="#E7DDCA"
                    fontSize="9"
                    dy="0.3em"
                  >
                    Beat
                  </text>

                  <circle
                    cx="150"
                    cy="460"
                    r="16"
                    fill="#85A383"
                    opacity="0.9"
                  />
                  <text
                    x="150"
                    y="460"
                    textAnchor="middle"
                    fill="#0C2C18"
                    fontSize="8"
                    dy="0.3em"
                  >
                    Stock
                  </text>

                  <circle
                    cx="250"
                    cy="450"
                    r="16"
                    fill="#85A383"
                    opacity="0.9"
                  />
                  <text
                    x="250"
                    y="450"
                    textAnchor="middle"
                    fill="#0C2C18"
                    fontSize="8"
                    dy="0.3em"
                  >
                    Order
                  </text>
                </g>

                {/* SALES ORG */}
                <g>
                  <circle
                    cx="350"
                    cy="450"
                    r="26"
                    fill="#1B2A21"
                    opacity="0.9"
                  />
                  <text
                    x="350"
                    y="450"
                    textAnchor="middle"
                    fill="#E7DDCA"
                    fontSize="10"
                    fontWeight="bold"
                    dy="0.3em"
                  >
                    Sales Org
                  </text>

                  <circle
                    cx="310"
                    cy="500"
                    r="14"
                    fill="#85A383"
                    opacity="0.9"
                  />
                  <text
                    x="310"
                    y="500"
                    textAnchor="middle"
                    fill="#0C2C18"
                    fontSize="7"
                    dy="0.3em"
                  >
                    Rep
                  </text>

                  <circle
                    cx="390"
                    cy="500"
                    r="14"
                    fill="#85A383"
                    opacity="0.9"
                  />
                  <text
                    x="390"
                    y="500"
                    textAnchor="middle"
                    fill="#0C2C18"
                    fontSize="7"
                    dy="0.3em"
                  >
                    KAM
                  </text>
                </g>

                {/* DEMAND PLANNING */}
                <g>
                  <circle
                    cx="450"
                    cy="500"
                    r="26"
                    fill="#1B2A21"
                    opacity="0.9"
                  />
                  <text
                    x="450"
                    y="500"
                    textAnchor="middle"
                    fill="#E7DDCA"
                    fontSize="9"
                    fontWeight="bold"
                    dy="0.3em"
                  >
                    Demand
                  </text>

                  <circle
                    cx="410"
                    cy="550"
                    r="14"
                    fill="#85A383"
                    opacity="0.9"
                  />
                  <text
                    x="410"
                    y="550"
                    textAnchor="middle"
                    fill="#0C2C18"
                    fontSize="7"
                    dy="0.3em"
                  >
                    Forecast
                  </text>

                  <circle
                    cx="490"
                    cy="550"
                    r="14"
                    fill="#85A383"
                    opacity="0.9"
                  />
                  <text
                    x="490"
                    y="550"
                    textAnchor="middle"
                    fill="#0C2C18"
                    fontSize="7"
                    dy="0.3em"
                  >
                    Plan
                  </text>
                </g>

                {/* INVENTORY DOMAIN - Center */}
                <g>
                  <circle
                    cx="600"
                    cy="550"
                    r="42"
                    fill="#0C2C18"
                    stroke="#85A383"
                    strokeWidth="3"
                  />
                  <text
                    x="600"
                    y="550"
                    textAnchor="middle"
                    fill="#E7DDCA"
                    fontSize="12"
                    fontWeight="bold"
                    dy="0.3em"
                  >
                    Inventory
                  </text>

                  <circle
                    cx="540"
                    cy="490"
                    r="20"
                    fill="#1B2A21"
                    opacity="0.9"
                  />
                  <text
                    x="540"
                    y="490"
                    textAnchor="middle"
                    fill="#E7DDCA"
                    fontSize="9"
                    dy="0.3em"
                  >
                    DC Stock
                  </text>

                  <circle
                    cx="660"
                    cy="490"
                    r="20"
                    fill="#1B2A21"
                    opacity="0.9"
                  />
                  <text
                    x="660"
                    y="490"
                    textAnchor="middle"
                    fill="#E7DDCA"
                    fontSize="9"
                    dy="0.3em"
                  >
                    Plant FG
                  </text>

                  <circle
                    cx="550"
                    cy="610"
                    r="16"
                    fill="#85A383"
                    opacity="0.9"
                  />
                  <text
                    x="550"
                    y="610"
                    textAnchor="middle"
                    fill="#0C2C18"
                    fontSize="8"
                    dy="0.3em"
                  >
                    Expiry
                  </text>

                  <circle
                    cx="650"
                    cy="610"
                    r="16"
                    fill="#85A383"
                    opacity="0.9"
                  />
                  <text
                    x="650"
                    y="610"
                    textAnchor="middle"
                    fill="#0C2C18"
                    fontSize="8"
                    dy="0.3em"
                  >
                    OTIF
                  </text>
                </g>

                {/* MANUFACTURING */}
                <g>
                  <circle
                    cx="750"
                    cy="600"
                    r="26"
                    fill="#1B2A21"
                    opacity="0.9"
                  />
                  <text
                    x="750"
                    y="600"
                    textAnchor="middle"
                    fill="#E7DDCA"
                    fontSize="9"
                    fontWeight="bold"
                    dy="0.3em"
                  >
                    Mfg
                  </text>

                  <circle
                    cx="710"
                    cy="650"
                    r="14"
                    fill="#85A383"
                    opacity="0.9"
                  />
                  <text
                    x="710"
                    y="650"
                    textAnchor="middle"
                    fill="#0C2C18"
                    fontSize="7"
                    dy="0.3em"
                  >
                    Batch
                  </text>

                  <circle
                    cx="790"
                    cy="650"
                    r="14"
                    fill="#85A383"
                    opacity="0.9"
                  />
                  <text
                    x="790"
                    y="650"
                    textAnchor="middle"
                    fill="#0C2C18"
                    fontSize="7"
                    dy="0.3em"
                  >
                    Quality
                  </text>
                </g>

                {/* REGULATORY & QUALITY - Right Center */}
                <g>
                  <circle
                    cx="900"
                    cy="450"
                    r="26"
                    fill="#DF7649"
                    opacity="0.85"
                  />
                  <text
                    x="900"
                    y="450"
                    textAnchor="middle"
                    fill="white"
                    fontSize="9"
                    fontWeight="bold"
                    dy="0.3em"
                  >
                    Regulatory
                  </text>

                  <circle
                    cx="960"
                    cy="490"
                    r="14"
                    fill="#DF7649"
                    opacity="0.75"
                  />
                  <text
                    x="960"
                    y="490"
                    textAnchor="middle"
                    fill="white"
                    fontSize="7"
                    dy="0.3em"
                  >
                    Approval
                  </text>
                </g>

                {/* SALES TRANSACTION - Right Center */}
                <g>
                  <circle
                    cx="800"
                    cy="550"
                    r="26"
                    fill="#1B2A21"
                    opacity="0.9"
                  />
                  <text
                    x="800"
                    y="550"
                    textAnchor="middle"
                    fill="#E7DDCA"
                    fontSize="10"
                    fontWeight="bold"
                    dy="0.3em"
                  >
                    Sales
                  </text>

                  <circle
                    cx="750"
                    cy="600"
                    r="14"
                    fill="#85A383"
                    opacity="0.9"
                  />
                  <text
                    x="750"
                    y="600"
                    textAnchor="middle"
                    fill="#0C2C18"
                    fontSize="7"
                    dy="0.3em"
                  >
                    Primary
                  </text>

                  <circle
                    cx="850"
                    cy="600"
                    r="14"
                    fill="#85A383"
                    opacity="0.9"
                  />
                  <text
                    x="850"
                    y="600"
                    textAnchor="middle"
                    fill="#0C2C18"
                    fontSize="7"
                    dy="0.3em"
                  >
                    Secondary
                  </text>
                </g>

                {/* CAMPAIGN & MARKETING - Bottom Right */}
                <g>
                  <circle
                    cx="950"
                    cy="550"
                    r="26"
                    fill="#1B2A21"
                    opacity="0.9"
                  />
                  <text
                    x="950"
                    y="550"
                    textAnchor="middle"
                    fill="#E7DDCA"
                    fontSize="9"
                    fontWeight="bold"
                    dy="0.3em"
                  >
                    Campaign
                  </text>

                  <circle
                    cx="910"
                    cy="600"
                    r="14"
                    fill="#85A383"
                    opacity="0.9"
                  />
                  <text
                    x="910"
                    y="600"
                    textAnchor="middle"
                    fill="#0C2C18"
                    fontSize="7"
                    dy="0.3em"
                  >
                    Media
                  </text>

                  <circle
                    cx="990"
                    cy="600"
                    r="14"
                    fill="#85A383"
                    opacity="0.9"
                  />
                  <text
                    x="990"
                    y="600"
                    textAnchor="middle"
                    fill="#0C2C18"
                    fontSize="7"
                    dy="0.3em"
                  >
                    Spend
                  </text>
                </g>

                {/* FINANCE DOMAIN - Bottom Left */}
                <g>
                  <circle
                    cx="200"
                    cy="600"
                    r="42"
                    fill="#0C2C18"
                    stroke="#DF7649"
                    strokeWidth="3"
                  />
                  <text
                    x="200"
                    y="600"
                    textAnchor="middle"
                    fill="#E7DDCA"
                    fontSize="13"
                    fontWeight="bold"
                    dy="0.3em"
                  >
                    Finance
                  </text>

                  <circle
                    cx="140"
                    cy="660"
                    r="20"
                    fill="#1B2A21"
                    opacity="0.9"
                  />
                  <text
                    x="140"
                    y="660"
                    textAnchor="middle"
                    fill="#E7DDCA"
                    fontSize="9"
                    dy="0.3em"
                  >
                    P&L
                  </text>

                  <circle
                    cx="260"
                    cy="660"
                    r="20"
                    fill="#1B2A21"
                    opacity="0.9"
                  />
                  <text
                    x="260"
                    y="660"
                    textAnchor="middle"
                    fill="#E7DDCA"
                    fontSize="9"
                    dy="0.3em"
                  >
                    Margin
                  </text>

                  <circle
                    cx="200"
                    cy="550"
                    r="16"
                    fill="#85A383"
                    opacity="0.9"
                  />
                  <text
                    x="200"
                    y="550"
                    textAnchor="middle"
                    fill="#0C2C18"
                    fontSize="8"
                    dy="0.3em"
                  >
                    Budget
                  </text>
                </g>

                {/* TRADE SPEND & RGM - Bottom Center */}
                <g>
                  <circle
                    cx="350"
                    cy="650"
                    r="26"
                    fill="#DF7649"
                    opacity="0.85"
                  />
                  <text
                    x="350"
                    y="650"
                    textAnchor="middle"
                    fill="white"
                    fontSize="9"
                    fontWeight="bold"
                    dy="0.3em"
                  >
                    Trade
                  </text>

                  <circle
                    cx="310"
                    cy="700"
                    r="14"
                    fill="#DF7649"
                    opacity="0.75"
                  />
                  <text
                    x="310"
                    y="700"
                    textAnchor="middle"
                    fill="white"
                    fontSize="7"
                    dy="0.3em"
                  >
                    Terms
                  </text>

                  <circle
                    cx="390"
                    cy="700"
                    r="14"
                    fill="#DF7649"
                    opacity="0.75"
                  />
                  <text
                    x="390"
                    y="700"
                    textAnchor="middle"
                    fill="white"
                    fontSize="7"
                    dy="0.3em"
                  >
                    Rebate
                  </text>
                </g>

                {/* PROFITABILITY */}
                <g>
                  <circle
                    cx="450"
                    cy="700"
                    r="22"
                    fill="#1B2A21"
                    opacity="0.9"
                  />
                  <text
                    x="450"
                    y="700"
                    textAnchor="middle"
                    fill="#E7DDCA"
                    fontSize="9"
                    dy="0.3em"
                  >
                    Profit
                  </text>
                </g>

                {/* KPI & ANALYTICS - Bottom Center Right */}
                <g>
                  <circle
                    cx="600"
                    cy="650"
                    r="26"
                    fill="#DF7649"
                    opacity="0.85"
                  />
                  <text
                    x="600"
                    y="650"
                    textAnchor="middle"
                    fill="white"
                    fontSize="9"
                    fontWeight="bold"
                    dy="0.3em"
                  >
                    Analytics
                  </text>

                  <circle
                    cx="560"
                    cy="700"
                    r="14"
                    fill="#DF7649"
                    opacity="0.75"
                  />
                  <text
                    x="560"
                    y="700"
                    textAnchor="middle"
                    fill="white"
                    fontSize="7"
                    dy="0.3em"
                  >
                    KPI
                  </text>

                  <circle
                    cx="640"
                    cy="700"
                    r="14"
                    fill="#DF7649"
                    opacity="0.75"
                  />
                  <text
                    x="640"
                    y="700"
                    textAnchor="middle"
                    fill="white"
                    fontSize="7"
                    dy="0.3em"
                  >
                    Dashboard
                  </text>
                </g>
              </svg>
            </div>
          </div>

          {/* Agentic Structure */}
          <div className="mb-12">
            <h3
              className="text-2xl mb-6 font-bold"
              style={{ color: "#0C2C18" }}
            >
              2. The Agentic Structure
            </h3>
            <div
              className="w-full border-4 shadow-xl p-12"
              style={{
                borderColor: "#85A383",
                background: "linear-gradient(135deg, #E7DDCA 0%, #F5F0E8 100%)",
              }}
            >
              <div className="text-center mb-12">
                <div
                  className="text-lg tracking-wider font-bold mb-2"
                  style={{ color: "#0C2C18" }}
                >
                  COORDINATED DECISION TEAM
                </div>
                <div
                  className="text-sm"
                  style={{ color: "#1B2A21", opacity: 0.7 }}
                >
                  Orchestrator coordinates SME agents who collaborate to deliver
                  unified insights
                </div>
              </div>

              {/* Agentic Flow - Redesigned */}
              <div className="space-y-12">
                {/* ORCHESTRATOR - Top */}
                <div className="flex justify-center">
                  <div className="relative w-[500px]">
                    <div
                      className="absolute inset-0 blur-xl opacity-30"
                      style={{ backgroundColor: "#DF7649" }}
                    ></div>
                    <div
                      className="relative p-8 rounded-xl shadow-2xl border-2"
                      style={{
                        background:
                          "linear-gradient(135deg, #0C2C18 0%, #1B2A21 100%)",
                        borderColor: "#DF7649",
                      }}
                    >
                      <div className="text-center">
                        <div
                          className="text-2xl font-bold mb-3"
                          style={{ color: "#E7DDCA" }}
                        >
                          Orchestrator
                        </div>
                        <div
                          className="text-sm leading-relaxed"
                          style={{ color: "#85A383" }}
                        >
                          Breaks questions, assigns to SMEs, calls multiple
                          times
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Connection Lines Visual */}
                <div className="flex justify-center">
                  <div className="grid grid-cols-5 gap-2 w-full max-w-5xl">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex flex-col items-center">
                        <div
                          className="w-0.5 h-8"
                          style={{ backgroundColor: "#0C2C18", opacity: 0.3 }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: "#DF7649" }}
                        ></div>
                        <div
                          className="w-0.5 h-8"
                          style={{ backgroundColor: "#0C2C18", opacity: 0.3 }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SME AGENTS */}
                <div>
                  <div className="text-center mb-6">
                    <div
                      className="inline-block px-6 py-2 rounded-full text-xs font-bold tracking-wider"
                      style={{
                        backgroundColor: "#85A383",
                        color: "white",
                      }}
                    >
                      SME AGENTS - Domain Experts
                    </div>
                  </div>

                  <div className="grid grid-cols-5 gap-4">
                    {/* Outlet Agent */}
                    <div className="group">
                      <div className="relative">
                        <div
                          className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity blur-lg"
                          style={{ backgroundColor: "#DF7649" }}
                        ></div>
                        <div
                          className="relative p-6 rounded-lg shadow-lg border-2 transition-all group-hover:shadow-2xl group-hover:-translate-y-1"
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(12, 44, 24, 0.95) 0%, rgba(27, 42, 33, 0.95) 100%)",
                            borderColor: "#DF7649",
                          }}
                        >
                          <div className="text-center">
                            <div
                              className="text-base font-bold mb-3"
                              style={{ color: "#E7DDCA" }}
                            >
                              Outlet Agent
                            </div>
                            <div
                              className="text-xs leading-relaxed space-y-1"
                              style={{ color: "#85A383" }}
                            >
                              <div>Outlet master</div>
                              <div>Potential</div>
                              <div>Coverage</div>
                              <div>Strike rate</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Distributor Agent */}
                    <div className="group">
                      <div className="relative">
                        <div
                          className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity blur-lg"
                          style={{ backgroundColor: "#DF7649" }}
                        ></div>
                        <div
                          className="relative p-6 rounded-lg shadow-lg border-2 transition-all group-hover:shadow-2xl group-hover:-translate-y-1"
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(12, 44, 24, 0.95) 0%, rgba(27, 42, 33, 0.95) 100%)",
                            borderColor: "#DF7649",
                          }}
                        >
                          <div className="text-center">
                            <div
                              className="text-base font-bold mb-3"
                              style={{ color: "#E7DDCA" }}
                            >
                              Distributor Agent
                            </div>
                            <div
                              className="text-xs leading-relaxed space-y-1"
                              style={{ color: "#85A383" }}
                            >
                              <div>Stock levels</div>
                              <div>Beats</div>
                              <div>Readiness</div>
                              <div>Rebalancing</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Scheme Agent */}
                    <div className="group">
                      <div className="relative">
                        <div
                          className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity blur-lg"
                          style={{ backgroundColor: "#DF7649" }}
                        ></div>
                        <div
                          className="relative p-6 rounded-lg shadow-lg border-2 transition-all group-hover:shadow-2xl group-hover:-translate-y-1"
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(12, 44, 24, 0.95) 0%, rgba(27, 42, 33, 0.95) 100%)",
                            borderColor: "#DF7649",
                          }}
                        >
                          <div className="text-center">
                            <div
                              className="text-base font-bold mb-3"
                              style={{ color: "#E7DDCA" }}
                            >
                              Scheme Agent
                            </div>
                            <div
                              className="text-xs leading-relaxed space-y-1"
                              style={{ color: "#85A383" }}
                            >
                              <div>Promos</div>
                              <div>Mechanisms</div>
                              <div>Leakage</div>
                              <div>ROI tracking</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sales Agent */}
                    <div className="group">
                      <div className="relative">
                        <div
                          className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity blur-lg"
                          style={{ backgroundColor: "#DF7649" }}
                        ></div>
                        <div
                          className="relative p-6 rounded-lg shadow-lg border-2 transition-all group-hover:shadow-2xl group-hover:-translate-y-1"
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(12, 44, 24, 0.95) 0%, rgba(27, 42, 33, 0.95) 100%)",
                            borderColor: "#DF7649",
                          }}
                        >
                          <div className="text-center">
                            <div
                              className="text-base font-bold mb-3"
                              style={{ color: "#E7DDCA" }}
                            >
                              Sales Agent
                            </div>
                            <div
                              className="text-xs leading-relaxed space-y-1"
                              style={{ color: "#85A383" }}
                            >
                              <div>Primary sales</div>
                              <div>Secondary</div>
                              <div>Velocity</div>
                              <div>Sell-out</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Product Agent */}
                    <div className="group">
                      <div className="relative">
                        <div
                          className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity blur-lg"
                          style={{ backgroundColor: "#DF7649" }}
                        ></div>
                        <div
                          className="relative p-6 rounded-lg shadow-lg border-2 transition-all group-hover:shadow-2xl group-hover:-translate-y-1"
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(12, 44, 24, 0.95) 0%, rgba(27, 42, 33, 0.95) 100%)",
                            borderColor: "#DF7649",
                          }}
                        >
                          <div className="text-center">
                            <div
                              className="text-base font-bold mb-3"
                              style={{ color: "#E7DDCA" }}
                            >
                              Product Agent
                            </div>
                            <div
                              className="text-xs leading-relaxed space-y-1"
                              style={{ color: "#85A383" }}
                            >
                              <div>SKU master</div>
                              <div>Pricing</div>
                              <div>Categories</div>
                              <div>Portfolio</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Collaboration Note */}
                  <div className="text-center mt-6">
                    <div
                      className="text-xs italic"
                      style={{ color: "#85A383" }}
                    >
                      Agents collaborate when combined metrics or
                      cross-functional views are needed
                    </div>
                  </div>
                </div>

                {/* Connection Lines Visual */}
                <div className="flex justify-center">
                  <div className="grid grid-cols-5 gap-2 w-full max-w-5xl">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={`bottom-${i}`}
                        className="flex flex-col items-center"
                      >
                        <div
                          className="w-0.5 h-8"
                          style={{ backgroundColor: "#0C2C18", opacity: 0.3 }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: "#85A383" }}
                        ></div>
                        <div
                          className="w-0.5 h-8"
                          style={{ backgroundColor: "#0C2C18", opacity: 0.3 }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RESPONSE COMPILER - Bottom */}
                <div className="flex justify-center">
                  <div className="relative w-[700px]">
                    <div
                      className="absolute inset-0 blur-xl opacity-30"
                      style={{ backgroundColor: "#85A383" }}
                    ></div>
                    <div
                      className="relative p-8 rounded-xl shadow-2xl border-2"
                      style={{
                        background:
                          "linear-gradient(135deg, #0C2C18 0%, #1B2A21 100%)",
                        borderColor: "#85A383",
                      }}
                    >
                      <div className="text-center">
                        <div
                          className="text-2xl font-bold mb-3"
                          style={{ color: "#E7DDCA" }}
                        >
                          Response Compiler
                        </div>
                        <div
                          className="text-sm leading-relaxed"
                          style={{ color: "#85A383" }}
                        >
                          Consolidates all SME outputs into single, consistent
                          <br />
                          user-facing analysis with aligned recommendations
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Explanation */}
          <div
            className="p-8 border-l-4"
            style={{
              backgroundColor: "rgba(133, 163, 131, 0.1)",
              borderColor: "#85A383",
            }}
          >
            <p
              className="text-base leading-relaxed"
              style={{ color: "#1B2A21" }}
            >
              <strong style={{ color: "#0C2C18" }}>
                Questt works like a coordinated team:
              </strong>{" "}
              An <strong>Orchestrator</strong> takes the business question,
              breaks it into sub-questions, and assigns them to{" "}
              <strong>SME Agents</strong>. Each SME owns its datasets, produces
              insights, and can work with other SMEs when combined views are
              needed. The <strong>Response Compiler</strong> then combines all
              outputs into a single, clear answer—so the user gets one
              recommendation instead of multiple disconnected perspectives.
            </p>
          </div>
        </div>
      </div>

      {/* Transformation */}
      <div className="max-w-5xl mx-auto px-12 py-24">
        <div className="flex items-center gap-4 mb-12">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#DF7649" }}
          >
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div
            className="text-lg tracking-[0.3em] font-bold"
            style={{ color: "#DF7649" }}
          >
            OPERATIONAL TRANSFORMATION
          </div>
        </div>

        <h2
          className="text-6xl mb-16 leading-tight font-light"
          style={{ fontFamily: "Georgia, serif", color: "#0C2C18" }}
        >
          From monthly reviews to{" "}
          <span style={{ color: "#DF7649" }} className="font-normal">
            continuous execution
          </span>
        </h2>

        <div className="grid grid-cols-2 gap-8 mb-20">
          <div
            className="p-10 border-4"
            style={{
              backgroundColor: "rgba(135, 139, 135, 0.1)",
              borderColor: "#878B87",
            }}
          >
            <div
              className="font-bold mb-6 text-2xl"
              style={{ color: "#878B87" }}
            >
              Before
            </div>
            <ul className="space-y-4 text-base" style={{ color: "#1B2A21" }}>
              <li className="flex items-start gap-3">
                <div
                  className="w-3 h-3 rounded-full mt-2 flex-shrink-0"
                  style={{ backgroundColor: "#878B87" }}
                ></div>
                <span>Monthly reviews and static outlet lists</span>
              </li>
              <li className="flex items-start gap-3">
                <div
                  className="w-3 h-3 rounded-full mt-2 flex-shrink-0"
                  style={{ backgroundColor: "#878B87" }}
                ></div>
                <span>
                  Schemes, coverage, and distributor readiness in separate silos
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div
                  className="w-3 h-3 rounded-full mt-2 flex-shrink-0"
                  style={{ backgroundColor: "#878B87" }}
                ></div>
                <span>Wait-for-month-end post-mortems on trade spend</span>
              </li>
            </ul>
          </div>

          <div
            className="p-10 shadow-xl border-4"
            style={{
              backgroundColor: "#DF7649",
              borderColor: "rgba(223, 118, 73, 0.5)",
            }}
          >
            <div className="text-white font-bold mb-6 text-2xl">After</div>
            <ul className="space-y-4 text-white text-base">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 flex-shrink-0" />
                <span>
                  <strong>Continuous, real-time execution rhythm</strong>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 flex-shrink-0" />
                <span>
                  <strong>One connected decision loop</strong> across execution,
                  schemes, and supply
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 flex-shrink-0" />
                <span>
                  <strong>In-flight optimization</strong> of trade spend
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 flex-shrink-0" />
                <span>
                  <strong>Feedback loop</strong> for continuous learning
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Timeline */}
        <div className="flex items-center gap-4 mb-12">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#DF7649" }}
          >
            <Clock className="w-6 h-6 text-white" />
          </div>
          <div
            className="text-lg tracking-[0.3em] font-bold"
            style={{ color: "#DF7649" }}
          >
            TIME TO VALUE
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div
            className="bg-white border-4 p-10 shadow-xl"
            style={{ borderColor: "#0C2C18" }}
          >
            <div
              className="text-7xl mb-4 font-bold"
              style={{ color: "#DF7649" }}
            >
              8
            </div>
            <div
              className="font-bold mb-3 text-xl"
              style={{ color: "#0C2C18" }}
            >
              WEEKS
            </div>
            <div
              className="text-base leading-relaxed"
              style={{ color: "#1B2A21" }}
            >
              First go-live with outlet prioritization and scheme effectiveness
              decision cards
            </div>
          </div>

          <div
            className="border-4 p-10 shadow-xl"
            style={{
              backgroundColor: "#DF7649",
              borderColor: "rgba(223, 118, 73, 0.5)",
            }}
          >
            <div className="text-white text-7xl mb-4 font-bold">16</div>
            <div className="text-white font-bold mb-3 text-xl">WEEKS</div>
            <div className="text-white text-base leading-relaxed opacity-90">
              Full suite live including leakage monitoring, distributor
              readiness loop, and governance cadence
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="py-16"
        style={{ background: "linear-gradient(to right, #0C2C18, #1B2A21)" }}
      >
        <div className="max-w-5xl mx-auto px-12">
          <div className="flex justify-between items-center">
            <div
              className="text-white text-4xl tracking-[0.3em] font-light"
              style={{ fontFamily: "Georgia, serif" }}
            >
              QUESTT
            </div>
            <div
              className="text-base font-bold tracking-wider"
              style={{ color: "#DF7649" }}
            >
              Decisions deserve better than guesswork.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudy;

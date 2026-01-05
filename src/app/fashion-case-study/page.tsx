"use client";
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
            PREMIUM FASHION RETAIL
          </div>

          {/* Main Title */}
          <h1
            className="text-7xl leading-[1.1] mb-8 font-light"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Real-Time Supply
            <br />
            Chain & Merchandising
            <br />
            <span style={{ color: "#DF7649" }}>Decisioning</span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-2xl leading-relaxed mb-16 max-w-3xl font-light"
            style={{ color: "#85A383" }}
          >
            Transforming a premium fashion house from reactive planning to
            intelligent, real-time operations.
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
              <div className="text-white text-3xl font-light">$200 Million</div>
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
                STORE NETWORK
              </div>
              <div className="text-white text-3xl font-light">200+ stores</div>
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
                SKU VARIANTS
              </div>
              <div className="text-white text-3xl font-light">25k–60k</div>
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
            src="/images/fashion-case-study.jpg"
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
                +3–4%
              </div>
              <div
                className="text-base font-bold mb-3 tracking-wide"
                style={{ color: "#0C2C18" }}
              >
                REVENUE UPLIFT
              </div>
              <div
                className="text-sm leading-relaxed"
                style={{ color: "#1B2A21" }}
              >
                Better availability on winners and faster sell-through on slow
                movers
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
                +6–8%
              </div>
              <div className="text-white text-base font-bold mb-3 tracking-wide">
                IN-STOCK UPLIFT
              </div>
              <div
                className="text-sm leading-relaxed"
                style={{ color: "#85A383" }}
              >
                On key styles and sizes in priority stores, protecting the
                critical size curve
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
                8–12%
              </div>
              <div className="text-white text-base font-bold mb-3 tracking-wide">
                WOS REDUCTION
              </div>
              <div
                className="text-sm leading-relaxed"
                style={{ color: "#85A383" }}
              >
                With no service-level degradation, optimizing inventory health
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
                30–50%
              </div>
              <div
                className="text-base font-bold mb-3 tracking-wide"
                style={{ color: "#0C2C18" }}
              >
                LOWER PLANNER EFFORT
              </div>
              <div
                className="text-sm leading-relaxed"
                style={{ color: "#1B2A21" }}
              >
                On repetitive decision loops for replenishment and transfer
                triage
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
          A premium fashion house constrained by{" "}
          <span style={{ color: "#DF7649" }} className="font-normal">
            decision velocity
          </span>
        </h2>

        <div
          className="space-y-6 text-lg leading-relaxed mb-16"
          style={{ color: "#1B2A21" }}
        >
          <p>
            A premium Indian fashion house at significant scale:{" "}
            <strong style={{ color: "#0C2C18" }}>
              $200 Million annual revenue
            </strong>
            , 200+ stores across metros and Tier-1/2 cities, plus a growing D2C
            presence.
          </p>

          <p>
            The complexity is staggering.{" "}
            <strong style={{ color: "#DF7649" }}>
              25,000 to 60,000 active style-colour-size variants per season.
            </strong>
            Frequent drops. Deep size-curve nuances where selling out of M/L
            kills conversion even when total units look adequate.
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
                  Central planning team + regional ops; replenishment and
                  transfers executed weekly/daily
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
                  DC/warehouses → store clusters with highly different demand
                  shapes and conversion rates
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
                  Brand protection (discount rules), margin floors, capacity
                  limits, store tiering, uneven lead times
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
                    Rate and quality of SKU-level decisions
                  </strong>{" "}
                  required to keep availability high on winners and aging low on
                  the long tail
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
              compound daily
            </span>
          </h2>

          <div
            className="space-y-6 text-lg leading-relaxed mb-16"
            style={{ color: "#1B2A21" }}
          >
            <p>
              Fashion supply chain isn't "replenish or don't replenish." It's a{" "}
              <strong style={{ color: "#0C2C18" }}>
                continuous set of micro-decisions that add up
              </strong>{" "}
              every single day.
            </p>

            <p className="font-bold text-xl" style={{ color: "#0C2C18" }}>
              For every style × size × store, every week—sometimes every
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
                  Where should inventory sit right now?
                </div>
                <div className="text-base" style={{ color: "#1B2A21" }}>
                  Store vs DC vs in-transit? Node placement matters more than
                  total inventory.
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
                  What action converts fastest without destroying margin?
                </div>
                <div className="text-base" style={{ color: "#85A383" }}>
                  Replenish, transfer, consolidate, mark down, or hold?
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
                  Which stores deserve units when stock is limited?
                </div>
                <div className="text-base" style={{ color: "#1B2A21" }}>
                  Tiering, demand gradients, local sell-through patterns,
                  conversion rates.
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
                  How to protect the size curve?
                </div>
                <div className="text-white text-base opacity-90">
                  <strong>Selling out of M/L kills conversion</strong> even if
                  total units look "fine".
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
              allocation + replenishment + transfers + markdown timing
            </strong>{" "}
            into one system—with guardrails aligned to brand and finance. It
            produced <strong className="text-white">specific decisions</strong>{" "}
            that planners could execute daily.
          </p>

          {/* Solution Components */}
          <div className="space-y-8">
            {/* Replenishment */}
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
                  Replenishment Decisioning
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
                    Winner Detection
                  </div>
                  <div style={{ color: "#1B2A21" }}>
                    Keeps winners in stock before stockouts happen by sensing
                    demand acceleration at the store-cluster level—while
                    filtering out noise from one-off spikes and returns.
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
                    Size-Curve Protection
                  </div>
                  <div style={{ color: "#1B2A21" }}>
                    Improves conversion by replenishing the right sizes, not
                    just units, so stores don't look "in stock" while missing
                    key sizes—based on size-run patterns and minimum depth
                    needs.
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
                    Smart Store Allocation
                  </div>
                  <div style={{ color: "#1B2A21" }}>
                    Sends inventory to stores where it will actually sell,
                    without creating excess elsewhere—balancing store role and
                    capacity with lead times and DC availability.
                  </div>
                </div>
              </div>
            </div>

            {/* Transfers */}
            <div
              className="p-10 shadow-2xl border-l-8"
              style={{ backgroundColor: "#1B2A21", borderColor: "#85A383" }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: "#85A383" }}
                ></div>
                <div
                  className="text-3xl font-bold"
                  style={{ color: "#85A383" }}
                >
                  Inter-Store Transfers
                </div>
              </div>

              <div
                className="text-base leading-relaxed"
                style={{ color: "#85A383" }}
              >
                <p>
                  Enables fast corrections by moving inventory from slow stores
                  to high-demand stores in time to matter, factoring transfer
                  cost and lead time, remaining selling days, and store
                  roles—while avoiding repeated moves.
                </p>
              </div>
            </div>

            {/* Consolidation */}
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
                  Inventory Consolidation
                </div>
              </div>

              <div
                className="text-base leading-relaxed"
                style={{ color: "#1B2A21" }}
              >
                <p>
                  Reduces stranded inventory by pulling back and concentrating
                  depth into fewer high-velocity stores, aligned to upcoming
                  drops and margin guardrails—so sell-through improves early and
                  markdown pressure reduces later.
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

              {/* Network Visualization - Made Bigger */}
              <svg
                viewBox="0 0 1200 850"
                className="w-full h-[700px]"
                style={{ backgroundColor: "#E7DDCA" }}
              >
                {/* Create dense web of connections */}
                <g opacity="0.12" stroke="#0C2C18" strokeWidth="0.8">
                  {/* Generate many connection lines */}
                  <line x1="150" y1="100" x2="300" y2="150" />
                  <line x1="150" y1="100" x2="450" y2="200" />
                  <line x1="150" y1="100" x2="600" y2="150" />
                  <line x1="150" y1="100" x2="900" y2="100" />
                  <line x1="300" y1="150" x2="450" y2="200" />
                  <line x1="300" y1="150" x2="600" y2="250" />
                  <line x1="450" y1="200" x2="600" y2="250" />
                  <line x1="450" y1="200" x2="750" y2="300" />
                  <line x1="600" y1="150" x2="750" y2="200" />
                  <line x1="600" y1="150" x2="900" y2="100" />
                  <line x1="750" y1="200" x2="900" y2="100" />
                  <line x1="750" y1="200" x2="1000" y2="150" />
                  <line x1="200" y1="350" x2="350" y2="400" />
                  <line x1="200" y1="350" x2="450" y2="500" />
                  <line x1="350" y1="400" x2="550" y2="550" />
                  <line x1="450" y1="500" x2="600" y2="600" />
                  <line x1="550" y1="550" x2="750" y2="600" />
                  <line x1="600" y1="600" x2="800" y2="500" />
                  <line x1="750" y1="600" x2="950" y2="550" />
                  <line x1="800" y1="500" x2="950" y2="450" />
                  <line x1="150" y1="100" x2="200" y2="350" />
                  <line x1="300" y1="150" x2="350" y2="400" />
                  <line x1="600" y1="150" x2="600" y2="600" />
                  <line x1="900" y1="100" x2="800" y2="500" />
                  <line x1="450" y1="200" x2="450" y2="500" />
                  <line x1="750" y1="300" x2="750" y2="600" />
                  <line x1="200" y1="350" x2="600" y2="250" />
                  <line x1="350" y1="400" x2="750" y2="300" />
                  <line x1="450" y1="500" x2="800" y2="500" />
                  <line x1="1000" y1="150" x2="950" y2="450" />
                </g>

                {/* PRODUCT DOMAIN - Top Left Cluster */}
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
                    Variant
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
                    Cost
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
                    Image
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
                    Tag
                  </text>
                </g>

                {/* CATEGORY / BRAND - Top Left Mid */}
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
                    Category
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
                    Brand
                  </text>

                  <circle
                    cx="340"
                    cy="210"
                    r="16"
                    fill="#85A383"
                    opacity="0.9"
                  />
                  <text
                    x="340"
                    y="210"
                    textAnchor="middle"
                    fill="#0C2C18"
                    fontSize="8"
                    dy="0.3em"
                  >
                    Dept
                  </text>
                </g>

                {/* TRANSACTION DOMAIN - Top Center */}
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
                    Order
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
                    Line
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
                    Payment
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
                    Return
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
                    Refund
                  </text>

                  <circle
                    cx="600"
                    cy="230"
                    r="16"
                    fill="#85A383"
                    opacity="0.9"
                  />
                  <text
                    x="600"
                    y="230"
                    textAnchor="middle"
                    fill="#0C2C18"
                    fontSize="8"
                    dy="0.3em"
                  >
                    Invoice
                  </text>
                </g>

                {/* TRANSACTION SUPPORTING - Top Center Right */}
                <g>
                  <circle
                    cx="750"
                    cy="200"
                    r="22"
                    fill="#1B2A21"
                    opacity="0.9"
                  />
                  <text
                    x="750"
                    y="200"
                    textAnchor="middle"
                    fill="#E7DDCA"
                    fontSize="9"
                    dy="0.3em"
                  >
                    Cart
                  </text>

                  <circle
                    cx="710"
                    cy="250"
                    r="14"
                    fill="#85A383"
                    opacity="0.9"
                  />
                  <text
                    x="710"
                    y="250"
                    textAnchor="middle"
                    fill="#0C2C18"
                    fontSize="7"
                    dy="0.3em"
                  >
                    Item
                  </text>

                  <circle
                    cx="790"
                    cy="250"
                    r="14"
                    fill="#85A383"
                    opacity="0.9"
                  />
                  <text
                    x="790"
                    y="250"
                    textAnchor="middle"
                    fill="#0C2C18"
                    fontSize="7"
                    dy="0.3em"
                  >
                    Receipt
                  </text>
                </g>

                {/* CUSTOMER DOMAIN - Top Right */}
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
                    Customer
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
                    Address
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
                    Profile
                  </text>
                </g>

                {/* PROMOTION - Top Right Extended */}
                <g>
                  <circle
                    cx="1000"
                    cy="150"
                    r="22"
                    fill="#DF7649"
                    opacity="0.9"
                  />
                  <text
                    x="1000"
                    y="150"
                    textAnchor="middle"
                    fill="white"
                    fontSize="9"
                    fontWeight="bold"
                    dy="0.3em"
                  >
                    Promo
                  </text>

                  <circle
                    cx="1060"
                    cy="190"
                    r="14"
                    fill="#DF7649"
                    opacity="0.8"
                  />
                  <text
                    x="1060"
                    y="190"
                    textAnchor="middle"
                    fill="white"
                    fontSize="7"
                    dy="0.3em"
                  >
                    Coupon
                  </text>
                </g>

                {/* ORDER PROCESSING - Center */}
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
                    fontSize="9"
                    fontWeight="bold"
                    dy="0.3em"
                  >
                    OrderLine
                  </text>
                </g>

                {/* INVENTORY DOMAIN - Left Center */}
                <g>
                  <circle
                    cx="200"
                    cy="350"
                    r="42"
                    fill="#0C2C18"
                    stroke="#85A383"
                    strokeWidth="3"
                  />
                  <text
                    x="200"
                    y="350"
                    textAnchor="middle"
                    fill="#E7DDCA"
                    fontSize="12"
                    fontWeight="bold"
                    dy="0.3em"
                  >
                    Inventory
                  </text>

                  <circle
                    cx="140"
                    cy="290"
                    r="20"
                    fill="#1B2A21"
                    opacity="0.9"
                  />
                  <text
                    x="140"
                    y="290"
                    textAnchor="middle"
                    fill="#E7DDCA"
                    fontSize="9"
                    dy="0.3em"
                  >
                    Level
                  </text>

                  <circle
                    cx="260"
                    cy="300"
                    r="20"
                    fill="#1B2A21"
                    opacity="0.9"
                  />
                  <text
                    x="260"
                    y="300"
                    textAnchor="middle"
                    fill="#E7DDCA"
                    fontSize="9"
                    dy="0.3em"
                  >
                    Move
                  </text>

                  <circle
                    cx="150"
                    cy="410"
                    r="16"
                    fill="#85A383"
                    opacity="0.9"
                  />
                  <text
                    x="150"
                    y="410"
                    textAnchor="middle"
                    fill="#0C2C18"
                    fontSize="8"
                    dy="0.3em"
                  >
                    Count
                  </text>

                  <circle
                    cx="250"
                    cy="400"
                    r="16"
                    fill="#85A383"
                    opacity="0.9"
                  />
                  <text
                    x="250"
                    y="400"
                    textAnchor="middle"
                    fill="#0C2C18"
                    fontSize="8"
                    dy="0.3em"
                  >
                    Adjust
                  </text>
                </g>

                {/* INVENTORY SUPPORTING */}
                <g>
                  <circle
                    cx="350"
                    cy="400"
                    r="22"
                    fill="#1B2A21"
                    opacity="0.9"
                  />
                  <text
                    x="350"
                    y="400"
                    textAnchor="middle"
                    fill="#E7DDCA"
                    fontSize="9"
                    dy="0.3em"
                  >
                    Transfer
                  </text>

                  <circle
                    cx="310"
                    cy="450"
                    r="14"
                    fill="#85A383"
                    opacity="0.9"
                  />
                  <text
                    x="310"
                    y="450"
                    textAnchor="middle"
                    fill="#0C2C18"
                    fontSize="7"
                    dy="0.3em"
                  >
                    Alloc
                  </text>

                  <circle
                    cx="390"
                    cy="450"
                    r="14"
                    fill="#85A383"
                    opacity="0.9"
                  />
                  <text
                    x="390"
                    y="450"
                    textAnchor="middle"
                    fill="#0C2C18"
                    fontSize="7"
                    dy="0.3em"
                  >
                    Safety
                  </text>
                </g>

                {/* WAREHOUSE / DC */}
                <g>
                  <circle
                    cx="600"
                    cy="300"
                    r="26"
                    fill="#1B2A21"
                    opacity="0.9"
                  />
                  <text
                    x="600"
                    y="300"
                    textAnchor="middle"
                    fill="#E7DDCA"
                    fontSize="10"
                    fontWeight="bold"
                    dy="0.3em"
                  >
                    Warehouse
                  </text>

                  <circle
                    cx="660"
                    cy="340"
                    r="16"
                    fill="#85A383"
                    opacity="0.9"
                  />
                  <text
                    x="660"
                    y="340"
                    textAnchor="middle"
                    fill="#0C2C18"
                    fontSize="7"
                    dy="0.3em"
                  >
                    Zone
                  </text>
                </g>

                {/* FULFILLMENT CENTER */}
                <g>
                  <circle
                    cx="750"
                    cy="350"
                    r="24"
                    fill="#DF7649"
                    opacity="0.85"
                  />
                  <text
                    x="750"
                    y="350"
                    textAnchor="middle"
                    fill="white"
                    fontSize="9"
                    fontWeight="bold"
                    dy="0.3em"
                  >
                    Fulfillment
                  </text>
                </g>

                {/* STORE DOMAIN - Right Center */}
                <g>
                  <circle
                    cx="950"
                    cy="450"
                    r="42"
                    fill="#0C2C18"
                    stroke="#85A383"
                    strokeWidth="3"
                  />
                  <text
                    x="950"
                    y="450"
                    textAnchor="middle"
                    fill="#E7DDCA"
                    fontSize="13"
                    fontWeight="bold"
                    dy="0.3em"
                  >
                    Store
                  </text>

                  <circle
                    cx="890"
                    cy="390"
                    r="20"
                    fill="#1B2A21"
                    opacity="0.9"
                  />
                  <text
                    x="890"
                    y="390"
                    textAnchor="middle"
                    fill="#E7DDCA"
                    fontSize="9"
                    dy="0.3em"
                  >
                    Region
                  </text>

                  <circle
                    cx="1010"
                    cy="390"
                    r="20"
                    fill="#1B2A21"
                    opacity="0.9"
                  />
                  <text
                    x="1010"
                    y="390"
                    textAnchor="middle"
                    fill="#E7DDCA"
                    fontSize="9"
                    dy="0.3em"
                  >
                    District
                  </text>

                  <circle
                    cx="910"
                    cy="510"
                    r="16"
                    fill="#85A383"
                    opacity="0.9"
                  />
                  <text
                    x="910"
                    y="510"
                    textAnchor="middle"
                    fill="#0C2C18"
                    fontSize="8"
                    dy="0.3em"
                  >
                    Zone
                  </text>

                  <circle
                    cx="990"
                    cy="510"
                    r="16"
                    fill="#85A383"
                    opacity="0.9"
                  />
                  <text
                    x="990"
                    y="510"
                    textAnchor="middle"
                    fill="#0C2C18"
                    fontSize="8"
                    dy="0.3em"
                  >
                    Format
                  </text>
                </g>

                {/* EMPLOYEE / OPERATIONS */}
                <g>
                  <circle
                    cx="800"
                    cy="500"
                    r="26"
                    fill="#1B2A21"
                    opacity="0.9"
                  />
                  <text
                    x="800"
                    y="500"
                    textAnchor="middle"
                    fill="#E7DDCA"
                    fontSize="10"
                    fontWeight="bold"
                    dy="0.3em"
                  >
                    Employee
                  </text>

                  <circle
                    cx="750"
                    cy="550"
                    r="14"
                    fill="#85A383"
                    opacity="0.9"
                  />
                  <text
                    x="750"
                    y="550"
                    textAnchor="middle"
                    fill="#0C2C18"
                    fontSize="7"
                    dy="0.3em"
                  >
                    Role
                  </text>

                  <circle
                    cx="850"
                    cy="550"
                    r="14"
                    fill="#85A383"
                    opacity="0.9"
                  />
                  <text
                    x="850"
                    y="550"
                    textAnchor="middle"
                    fill="#0C2C18"
                    fontSize="7"
                    dy="0.3em"
                  >
                    Shift
                  </text>
                </g>

                {/* SUPPLY CHAIN BOTTOM */}
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
                    fontSize="10"
                    fontWeight="bold"
                    dy="0.3em"
                  >
                    Reorder
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
                    Rule
                  </text>
                </g>

                {/* ANALYTICS NODES */}
                <g>
                  <circle
                    cx="550"
                    cy="550"
                    r="22"
                    fill="#DF7649"
                    opacity="0.85"
                  />
                  <text
                    x="550"
                    y="550"
                    textAnchor="middle"
                    fill="white"
                    fontSize="9"
                    fontWeight="bold"
                    dy="0.3em"
                  >
                    Snapshot
                  </text>

                  <circle
                    cx="650"
                    cy="580"
                    r="16"
                    fill="#DF7649"
                    opacity="0.75"
                  />
                  <text
                    x="650"
                    y="580"
                    textAnchor="middle"
                    fill="white"
                    fontSize="7"
                    dy="0.3em"
                  >
                    Lifecycle
                  </text>
                </g>

                {/* DATA SOURCES AT BOTTOM */}
                <g>
                  <rect
                    x="80"
                    y="720"
                    width="150"
                    height="45"
                    fill="#0C2C18"
                    rx="4"
                  />
                  <text
                    x="155"
                    y="743"
                    textAnchor="middle"
                    fill="#E7DDCA"
                    fontSize="11"
                    fontWeight="bold"
                  >
                    SAP HANA
                  </text>

                  <rect
                    x="250"
                    y="720"
                    width="150"
                    height="45"
                    fill="#0C2C18"
                    rx="4"
                  />
                  <text
                    x="325"
                    y="743"
                    textAnchor="middle"
                    fill="#E7DDCA"
                    fontSize="11"
                    fontWeight="bold"
                  >
                    POS
                  </text>

                  <rect
                    x="420"
                    y="720"
                    width="150"
                    height="45"
                    fill="#0C2C18"
                    rx="4"
                  />
                  <text
                    x="495"
                    y="743"
                    textAnchor="middle"
                    fill="#E7DDCA"
                    fontSize="11"
                    fontWeight="bold"
                  >
                    PLM
                  </text>

                  <rect
                    x="590"
                    y="720"
                    width="150"
                    height="45"
                    fill="#0C2C18"
                    rx="4"
                  />
                  <text
                    x="665"
                    y="743"
                    textAnchor="middle"
                    fill="#E7DDCA"
                    fontSize="11"
                    fontWeight="bold"
                  >
                    WMS
                  </text>

                  <rect
                    x="760"
                    y="720"
                    width="150"
                    height="45"
                    fill="#0C2C18"
                    rx="4"
                  />
                  <text
                    x="835"
                    y="743"
                    textAnchor="middle"
                    fill="#E7DDCA"
                    fontSize="11"
                    fontWeight="bold"
                  >
                    CRM
                  </text>

                  <rect
                    x="930"
                    y="720"
                    width="150"
                    height="45"
                    fill="#0C2C18"
                    rx="4"
                  />
                  <text
                    x="1005"
                    y="743"
                    textAnchor="middle"
                    fill="#E7DDCA"
                    fontSize="11"
                    fontWeight="bold"
                  >
                    HRMS
                  </text>
                </g>

                {/* DATA LINES - More visible connections from sources to domains */}
                <g
                  opacity="0.25"
                  stroke="#DF7649"
                  strokeWidth="1.5"
                  strokeDasharray="4,3"
                >
                  {/* SAP HANA to Product, Inventory */}
                  <line x1="155" y1="720" x2="150" y2="142" />
                  <line x1="155" y1="720" x2="200" y2="392" />
                  <line x1="155" y1="720" x2="600" y2="326" />

                  {/* POS to Order, Store */}
                  <line x1="325" y1="720" x2="600" y2="192" />
                  <line x1="325" y1="720" x2="450" y2="226" />
                  <line x1="325" y1="720" x2="950" y2="492" />

                  {/* PLM to Product, Category */}
                  <line x1="495" y1="720" x2="150" y2="142" />
                  <line x1="495" y1="720" x2="300" y2="176" />

                  {/* WMS to Inventory, Warehouse, Transfer */}
                  <line x1="665" y1="720" x2="200" y2="392" />
                  <line x1="665" y1="720" x2="600" y2="326" />
                  <line x1="665" y1="720" x2="350" y2="422" />
                  <line x1="665" y1="720" x2="750" y2="374" />

                  {/* CRM to Customer */}
                  <line x1="835" y1="720" x2="900" y2="142" />
                  <line x1="835" y1="720" x2="840" y2="180" />
                  <line x1="835" y1="720" x2="1000" y2="172" />

                  {/* HRMS to Employee, Store */}
                  <line x1="1005" y1="720" x2="800" y2="526" />
                  <line x1="1005" y1="720" x2="950" y2="492" />
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
                    {/* Inventory Agent */}
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
                              Inventory Agent
                            </div>
                            <div
                              className="text-xs leading-relaxed space-y-1"
                              style={{ color: "#85A383" }}
                            >
                              <div>Stock levels</div>
                              <div>Movements</div>
                              <div>Transfers</div>
                              <div>Allocations</div>
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
                              <div>Lifecycle</div>
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
                              <div>Transactions</div>
                              <div>Returns</div>
                              <div>Order history</div>
                              <div>Conversion</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Store Agent */}
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
                              Store Agent
                            </div>
                            <div
                              className="text-xs leading-relaxed space-y-1"
                              style={{ color: "#85A383" }}
                            >
                              <div>Store master</div>
                              <div>Regions</div>
                              <div>Capacity</div>
                              <div>Clusters</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Demand Agent */}
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
                              Demand Agent
                            </div>
                            <div
                              className="text-xs leading-relaxed space-y-1"
                              style={{ color: "#85A383" }}
                            >
                              <div>Forecasts</div>
                              <div>Seasonality</div>
                              <div>Trends</div>
                              <div>Signals</div>
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
                      <div key={i} className="flex flex-col items-center">
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
          From weekly cycles to{" "}
          <span style={{ color: "#DF7649" }} className="font-normal">
            always-on operations
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
                <span>Weekly/monthly decision cycles</span>
              </li>
              <li className="flex items-start gap-3">
                <div
                  className="w-3 h-3 rounded-full mt-2 flex-shrink-0"
                  style={{ backgroundColor: "#878B87" }}
                ></div>
                <span>Manual "truth assembly" by planners</span>
              </li>
              <li className="flex items-start gap-3">
                <div
                  className="w-3 h-3 rounded-full mt-2 flex-shrink-0"
                  style={{ backgroundColor: "#878B87" }}
                ></div>
                <span>Separate silos: replenishment, transfers, markdowns</span>
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
                  <strong>Continuous, real-time operations</strong>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 flex-shrink-0" />
                <span>
                  <strong>Validation</strong> of high-impact moves vs assembly
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 flex-shrink-0" />
                <span>
                  <strong>One connected decision loop</strong>
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
              4
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
              First go-live with replenishment and transfer decision cards in
              pilot stores
            </div>
          </div>

          <div
            className="border-4 p-10 shadow-xl"
            style={{
              backgroundColor: "#DF7649",
              borderColor: "rgba(223, 118, 73, 0.5)",
            }}
          >
            <div className="text-white text-7xl mb-4 font-bold">10</div>
            <div className="text-white font-bold mb-3 text-xl">WEEKS</div>
            <div className="text-white text-base leading-relaxed opacity-90">
              Full suite live including monitoring loop and complete operational
              integration
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

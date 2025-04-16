"use client";
import React, { useState } from "react";
import {
  AlertTriangle,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  Package,
  DollarSign,
  RefreshCcw,
  Calendar,
  Zap,
  ChevronsUp,
  Clock,
  Users,
  BarChart3,
} from "lucide-react";

const Badge = ({ children, variant }) => {
  const variants = {
    red: "bg-red-100 text-red-800",
    orange: "bg-orange-100 text-orange-800",
    green: "bg-green-100 text-green-700",
    blue: "bg-blue-100 text-blue-800",
    purple: "bg-purple-100 text-purple-800",
    gray: "bg-gray-100 text-gray-800",
  };

  return (
    <span
      className={`text-xs font-medium px-2 py-1 rounded-full ${
        variants[variant] || variants.blue
      }`}
    >
      {children}
    </span>
  );
};

const StatusIndicator = ({ priority }) => {
  const colors = {
    high: "text-red-500",
    medium: "text-orange-500",
    positive: "text-green-600",
  };

  return (
    <div
      className={`w-2 h-2 rounded-full ${colors[priority]} bg-current`}
    ></div>
  );
};

const PriorityItem = ({ priority, children }) => (
  <li className="flex items-start my-2">
    <StatusIndicator priority={priority} />
    <span className="ml-3 text-gray-700">{children}</span>
  </li>
);

const ActionButton = ({ icon, children, onClick }) => {
  const Icon = icon;
  return (
    <button
      className="flex items-center px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
      onClick={onClick}
    >
      <Icon size={16} className="mr-2" />
      {children}
    </button>
  );
};

const ActionItem = ({ children, checked = true }) => (
  <div className="flex items-start mb-3">
    <div className="flex-shrink-0 h-5 w-5 relative mt-1">
      <div
        className={`h-5 w-5 rounded border ${
          checked ? "bg-green-50 border-green-200" : "bg-white border-gray-300"
        }`}
      >
        {checked && (
          <svg
            className="h-4 w-4 text-green-500 absolute inset-0 m-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
    </div>
    <span className="ml-3 text-sm text-gray-700">{children}</span>
  </div>
);

const InsightCard = ({
  icon,
  title,
  description,
  priority,
  impact,
  children,
  hideDetails = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(!hideDetails);
  const Icon = icon;

  return (
    <div
      className={`border-l-4 ${
        priority === "high"
          ? "border-l-red-500"
          : priority === "medium"
          ? "border-l-orange-500"
          : "border-l-green-500"
      } bg-white rounded-lg shadow-sm mb-4 overflow-hidden`}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div
            className={`p-2 rounded-full ${
              priority === "high"
                ? "bg-red-50 text-red-500"
                : priority === "medium"
                ? "bg-orange-50 text-orange-500"
                : "bg-green-50 text-green-500"
            } mr-3`}
          >
            <Icon size={18} />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-gray-800">{title}</h3>
              <div className="flex space-x-2">
                {priority && (
                  <Badge
                    variant={
                      priority === "high"
                        ? "red"
                        : priority === "medium"
                        ? "orange"
                        : "green"
                    }
                  >
                    {priority === "positive"
                      ? "positive"
                      : `${priority} priority`}
                  </Badge>
                )}
                {impact && <Badge variant="gray">{impact}</Badge>}
              </div>
            </div>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>

        {!isExpanded && (
          <button
            className="mt-3 text-sm text-indigo-600 hover:text-indigo-800 font-medium"
            onClick={() => setIsExpanded(true)}
          >
            Show Details
          </button>
        )}

        {isExpanded && (
          <div className="mt-4">
            {children}
            {!hideDetails && (
              <button
                className="mt-2 text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                onClick={() => setIsExpanded(false)}
              >
                Hide Details
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const StrategicRecommendation = ({
  title,
  description,
  icon,
  confidence,
  impact,
  category,
  hideDetails = false,
  children,
}) => {
  const [isExpanded, setIsExpanded] = useState(!hideDetails);
  const Icon = icon;

  return (
    <div className="bg-white rounded-lg shadow-sm mb-4 overflow-hidden">
      <div className="p-4">
        <div className="flex items-start">
          <div className="p-2 rounded-full bg-blue-50 text-blue-500 mr-3">
            <Icon size={18} />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-gray-800">{title}</h3>
              <button
                className="text-sm text-gray-500 hover:text-gray-700"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? "Hide Details" : "Show Details"}
              </button>
            </div>
            <p className="text-sm text-gray-600">{description}</p>

            <div className="grid grid-cols-3 gap-4 mt-3">
              <div>
                <div className="text-xs text-gray-500 mb-1">Confidence</div>
                <div className="font-semibold">{confidence}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Impact</div>
                <div className="font-semibold">{impact}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Category</div>
                <div className="font-semibold">{category}</div>
              </div>
            </div>
          </div>
        </div>

        {isExpanded && <div className="mt-4">{children}</div>}
      </div>
    </div>
  );
};

const BrainstormingSection = ({ questions }) => (
  <div className="mt-6">
    <h4 className="text-sm font-semibold text-purple-600 flex items-center mb-3">
      <Zap size={16} className="mr-2" /> Brainstorming Questions
    </h4>
    <div className="space-y-2">
      {questions.map((question, index) => (
        <p key={index} className="text-sm text-purple-700">
          {question}
        </p>
      ))}
    </div>
    <button className="mt-4 w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center justify-center">
      <Zap size={16} className="mr-2" /> Brainstorm with me
    </button>
  </div>
);

const Dashboard = () => {
  return (
    <div className="bg-gray-50 h-screen overflow-y-auto">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-900">AvaRetail</h1>
            <p className="text-sm text-gray-500">AI Business Analyst</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <Badge variant="green">Sales +7%</Badge>
              <Badge variant="blue">Inventory 4.8x</Badge>
              <Badge variant="orange">Cash ₹4.2Cr</Badge>
            </div>
            <div className="text-xs text-gray-500">
              Last updated: Today, 9:15 AM
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto px-6 py-6">
        {/* Morning Briefing */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Calendar size={20} className="mr-2 text-gray-700" /> Morning
            Briefing
          </h2>
          <div className="bg-white rounded-lg shadow-sm p-5 border-l-4 border-l-yellow-500">
            <h3 className="font-medium mb-3">
              Good morning! Here&apos;s what you need to know today:
            </h3>
            <ul className="space-y-2">
              <PriorityItem priority="high">
                High priority: 5 ethnic wear SKUs at risk of stockout within 7
                days (₹32L revenue at risk)
              </PriorityItem>
              <PriorityItem priority="high">
                High priority: June cash projection shows ₹1.2Cr shortfall below
                minimum threshold
              </PriorityItem>
              <PriorityItem priority="medium">
                Medium priority: Mumbai Flagship conversion rate dropped 5.2%
                (₹8.5L weekly revenue impact)
              </PriorityItem>
              <PriorityItem priority="positive">
                Positive: Delhi Select store outperforming sales targets by 17%
                this month
              </PriorityItem>
            </ul>

            <div className="flex space-x-3 mt-6">
              <ActionButton icon={AlertTriangle}>
                Tell me more about stockout risk
              </ActionButton>
              <ActionButton icon={DollarSign}>
                Ask about cash flow plan
              </ActionButton>
              <ActionButton icon={TrendingUp}>
                Why is Delhi outperforming?
              </ActionButton>
            </div>
          </div>
        </section>

        {/* Critical Business Insights */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <AlertTriangle size={20} className="mr-2 text-gray-700" /> Critical
            Business Insights
          </h2>

          <InsightCard
            icon={AlertTriangle}
            title="Ethnic Wear Stockout Risk"
            description="5 high-demand ethnic wear SKUs at risk of stockout in Mumbai, Bangalore"
            priority="high"
            impact="₹32L potential revenue at risk"
          >
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-gray-700 mb-4">
                Based on current sales velocity and inventory levels, 5 SKUs in
                our Premium Ethnic Collection are projecting stockout within 7
                days at Mumbai Flagship and Bangalore Mall locations. These
                items have shown 28% higher sell-through than forecast over the
                past 2 weeks, driven by wedding season demand.
              </p>

              <h4 className="font-medium mb-3">Recommended Actions:</h4>
              <div className="space-y-2">
                <ActionItem>
                  Expedite shipment of in-transit items with logistics partner
                </ActionItem>
                <ActionItem>
                  Place immediate express order for missing SKUs
                </ActionItem>
                <ActionItem>
                  Temporarily increase prices by 8% on these items to slow sales
                  velocity
                </ActionItem>
                <ActionItem>
                  Transfer 2 units each of ET-2347 and ET-2415 from Delhi store
                  (low velocity location)
                </ActionItem>
              </div>
            </div>
          </InsightCard>

          <InsightCard
            icon={TrendingUp}
            title="Mumbai Store Conversion Rate Drop"
            description="Mumbai Flagship conversion rate dropped 5.2% this week vs. last week"
            priority="medium"
            impact="Estimated ₹8.5L weekly revenue loss"
            hideDetails={true}
          />

          <InsightCard
            icon={DollarSign}
            title="Cash Flow Warning: June Projection"
            description="June projected cash balance below safety threshold"
            priority="high"
            impact="₹1.2Cr projected shortfall"
            hideDetails={true}
          />
        </section>

        {/* Strategic Recommendations */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Zap size={20} className="mr-2 text-gray-700" /> Strategic
            Recommendations
          </h2>

          <StrategicRecommendation
            icon={Package}
            title="Optimize Inventory Allocation"
            description="Redistribute 350+ units to prevent stockouts and reduce dead stock"
            confidence="92%"
            impact="Estimated ₹42L revenue protection"
            category="Inventory"
          >
            <div>
              <div className="mb-4">
                <h4 className="text-sm font-semibold uppercase text-gray-500 mb-2">
                  SITUATION
                </h4>
                <p className="text-sm text-gray-700">
                  We have inventory imbalances across 17 stores, with 8
                  locations risking stockouts on high-demand items while 6
                  stores have excess inventory on the same SKUs.
                </p>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-semibold uppercase text-gray-500 mb-2">
                  ANALYSIS
                </h4>
                <p className="text-sm text-gray-700">
                  By analyzing historical sales patterns, current velocity, and
                  upcoming seasonal trends, I&apos;ve identified optimal
                  inventory levels for each location based on their unique
                  customer demographics and buying patterns.
                </p>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-semibold uppercase text-gray-500 mb-2">
                  OPPORTUNITY
                </h4>
                <p className="text-sm text-gray-700">
                  A precisely targeted redistribution can prevent revenue loss
                  from stockouts while reducing holding costs for slow-moving
                  inventory.
                </p>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-semibold uppercase text-gray-500 mb-2">
                  RECOMMENDATION
                </h4>
                <p className="text-sm text-gray-700">
                  Implement a cross-location inventory transfer plan focusing on
                  350 units across 42 SKUs, prioritizing high-margin and
                  high-velocity products. This will immediately improve stock
                  allocation efficiency by approximately 27%.
                </p>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-semibold uppercase text-gray-500 mb-2">
                  CONSIDERATIONS
                </h4>
                <p className="text-sm text-gray-700">
                  Transfer costs will be approximately ₹1.2L, representing a 35x
                  ROI based on protected revenue. Transfers should be completed
                  during low-traffic early morning hours to minimize customer
                  disruption.
                </p>
              </div>

              <BrainstormingSection
                questions={[
                  "Could we use this opportunity to test dynamic pricing in stores with varying inventory levels?",
                  "How might we implement real-time inventory visibility tools for store managers?",
                  "What if we created a predictive model to recommend pre-emptive transfers before stockout risks appear?",
                ]}
              />
            </div>
          </StrategicRecommendation>

          <StrategicRecommendation
            icon={Users}
            title="Store Staffing Optimization"
            description="Realign staff scheduling with footfall patterns to increase conversion"
            confidence="87%"
            impact="Projected 4% conversion increase"
            category="Sales"
            hideDetails={true}
          />

          <StrategicRecommendation
            icon={RefreshCcw}
            title="Cross-Channel Inventory Rebalancing"
            description="Transfer slow-moving products to higher-demand channels"
            confidence="94%"
            impact="₹8L additional revenue opportunity"
            category="Inventory"
            hideDetails={true}
          />

          <StrategicRecommendation
            icon={Clock}
            title="Liquidation Strategy Optimization"
            description="Systematically clear aging inventory to improve cash flow"
            confidence="91%"
            impact="₹1.5Cr cash recovery potential"
            category="Inventory"
            hideDetails={true}
          />
        </section>

        {/* SKU-Level Insights */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <BarChart3 size={20} className="mr-2 text-gray-700" /> SKU-Level
            Insights
          </h2>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      SKU & Item
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Location
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Action Type
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Recommendation
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Reason
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Impact
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        SKU 1001
                      </div>
                      <div className="text-xs text-gray-500">
                        Blue Oxford Shirt
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      Mumbai EBO
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Badge variant="blue">Inventory Buy</Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      Replenish ~30 units immediately
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      Top-seller with 50 units sold in 4 weeks, &lt;5 units
                      left; experiencing stockouts
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      ₹30,000–₹40,000 potential sales recovery
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        SKU 1002
                      </div>
                      <div className="text-xs text-gray-500">
                        Black Denim Jeans
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      Mumbai EBO
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Badge variant="green">Pricing Strategy</Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      Maintain full price
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      80% sell-through at full price mid-season; on track to
                      meet 75% full-price target
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      ₹5,000 protected margin (10 units × ₹500)
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        SKU 4004
                      </div>
                      <div className="text-xs text-gray-500">
                        Winter Jacket – FW24
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      Delhi LFS
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Badge variant="red">Liquidation</Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      Clear with 60% markdown
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      Off-season stock (~10 months old) with 15 units and
                      minimal sales
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      ₹30,000 cash recovery, prevents deeper future markdowns
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        SKU 3003
                      </div>
                      <div className="text-xs text-gray-500">
                        Graphic Tee SS25
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      Bangalore EBO
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Badge variant="orange">Markdown</Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      Implement 15% markdown
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      Mid-season slow-mover with only 50% sell-through by week
                      14 (below 65% benchmark)
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      ₹12,750 accelerated revenue, saves ₹4,500 in future deeper
                      markdowns
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        SKU 7007
                      </div>
                      <div className="text-xs text-gray-500">
                        Classic Polo Tee
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      LFS to Online
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Badge variant="purple">Cross-POS</Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      Transfer 20 units to online channel
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      Fast-selling online (sold out 100 units in 3 weeks) with
                      back-orders, while LFS has 40 surplus units
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      ₹50,000 additional revenue (20 × ₹2,500)
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        SKU 8008
                      </div>
                      <div className="text-xs text-gray-500">Sports Jacket</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      Marketplace to EBO
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Badge variant="purple">Cross-POS</Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      Redeploy 50 units to stores
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      Underperforming on external marketplaces (5 units sold
                      from 100 in stock) but a proven seller in EBO stores (50+
                      units)
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      ₹2,00,000 potential full-price revenue vs. marketplace
                      stagnation
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Bottom Chat Area */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Zap size={20} className="mr-2 text-gray-700" /> Chat with your AI
            Analyst
          </h2>

          <div className="bg-white rounded-lg shadow-sm p-5 mb-4">
            <div className="p-4 mb-4 rounded-lg bg-blue-50 text-gray-700 text-sm">
              <p>
                Good morning! I&apos;ve analyzed today&apos;s data and found
                several important insights that need your attention. The most
                urgent is a potential stockout risk for 5 high-demand ethnic
                wear SKUs in Mumbai and Bangalore stores. I&apos;ve outlined
                everything below to help you make quick decisions today.
              </p>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Ask me anything about your business data..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button className="absolute right-3 top-3 bg-indigo-600 text-white p-1 rounded-lg">
                <Zap size={18} />
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;

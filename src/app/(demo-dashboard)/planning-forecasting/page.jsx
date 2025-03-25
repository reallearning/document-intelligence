"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
// Simple component system
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg border shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-lg font-medium ${className}`}>{children}</h3>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-4 pt-0 ${className}`}>{children}</div>
);

const CardFooter = ({ children, className = "" }) => (
  <div className={`p-4 border-t text-sm text-gray-500 ${className}`}>
    {children}
  </div>
);

const Button = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  ...props
}) => {
  const variantClasses = {
    default: "bg-teal-600 text-white hover:bg-teal-700",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
    ghost: "text-gray-600 hover:bg-gray-100",
    link: "text-teal-600 underline-offset-4 hover:underline p-0 h-auto",
  };

  const sizeClasses = {
    default: "h-9 px-4 py-2",
    sm: "h-8 px-3 py-1 text-sm",
  };

  return (
    <button
      className={`font-medium rounded-md inline-flex items-center justify-center ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Badge = ({ children, variant = "default", className = "" }) => {
  const variantClasses = {
    default: "bg-gray-100 text-gray-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-amber-100 text-amber-800",
    danger: "bg-red-100 text-red-800",
    primary: "bg-teal-100 text-teal-800",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

// Slider component for sensitivity analysis
const Slider = ({
  label,
  value,
  min,
  max,
  onChange,
  filledColor,
  unfilledColor,
  thumbColor,
}) => {
  return (
    <div className="mb-2">
      <div className="flex justify-between">
        <label className="text-sm font-public-sans font-normal text-[#001D5C]">
          {label}
        </label>
        <span className="text-base font-public-sans font-bold text-[#001D5C]">
          {value}%
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, ${filledColor} ${
            ((value - min) / (max - min)) * 100
          }%, ${unfilledColor} ${((value - min) / (max - min)) * 100}%)`,
        }}
      />
      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 14px;
          height: 14px;
          background: ${thumbColor};
          border-radius: 50%;
          cursor: pointer;
        }
        input[type="range"]::-moz-range-thumb {
          width: 14px;
          height: 14px;
          background: ${thumbColor};
          border-radius: 50%;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

// Thought bubble component
const ThoughtBubble = ({
  children,
  direction = "left",
  className = "",
  variant = "default",
}) => {
  const directionClasses = {
    left: "rounded-tl-none",
    right: "rounded-tr-none ml-auto",
  };

  const variantClasses = {
    default: "bg-teal-50 text-teal-900",
    warning: "bg-amber-50 text-amber-900",
    insight: "bg-indigo-50 text-indigo-900",
  };

  return (
    <div
      className={`relative max-w-lg p-4 rounded-lg ${directionClasses[direction]} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </div>
  );
};

const LineChart = ({ data, height = 60, className = "" }) => {
  return (
    <div
      className={`flex items-end p-2 ${className}`}
      style={{ height: `${height * 4}px` }} // Use inline styles for height
    >
      {data.map((value, index) => (
        <div
          key={index}
          className="flex-1 mx-0.5"
          style={{ height: `${value}%` }} // Ensure values map correctly
        >
          <div className="h-full w-[70%] bg-[#FFC7BD] rounded-t-xl"></div>
        </div>
      ))}
    </div>
  );
};

const BriefingCard = ({ title, content, iconSymbol, iconColor }) => {
  const colorClasses = {
    orange: "bg-orange-100 text-orange-500",
    blue: "bg-blue-100 text-blue-500",
    green: "bg-green-100 text-green-500",
    red: "bg-red-100 text-red-500",
  };

  return (
    <div className="bg-[#F8F8F8] p-4 rounded-lg ">
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-2">
          <div
            className={`w-6 h-6 rounded-full ${colorClasses[iconColor]} flex items-center justify-center`}
          >
            <span>{iconSymbol}</span>
          </div>
        </div>
        <div>
          <h2 className="font-semibold text-[#001D5C] text-sm">{title}</h2>
          <p className="mt-2 text-[#001D5C] text-sm">{content}</p>
        </div>
      </div>
    </div>
  );
};

// Main Planning & Forecasting Dashboard
const PlanningForecastingDashboard = () => {
  const [activeScenario, setActiveScenario] = useState("base");
  const [salesGrowth, setSalesGrowth] = useState(5);
  const [rawMaterialCost, setRawMaterialCost] = useState(0);
  const [laborCost, setLaborCost] = useState(0);
  const [marketingExpense, setMarketingExpense] = useState(0);

  // Calculate how driver changes affect key metrics based on sliders
  // These are simplified calculations for demonstration purposes
  const baselineRevenue = 48.7; // in lakhs
  const baselineCogs = 27.1;
  const baselineGrossProfit = 21.6;
  const baselineOpEx = 8.2;
  const baselineMarketing = 4.9;
  const baselineOpIncome = 13.4;

  // Adjusted metrics based on sliders
  const adjustedRevenue = baselineRevenue * (1 + salesGrowth / 100);
  const adjustedCogs = baselineCogs * (1 + rawMaterialCost / 100);
  const adjustedGrossProfit = adjustedRevenue - adjustedCogs;
  const adjustedOpEx = baselineOpEx * (1 + laborCost / 100);
  const adjustedMarketing = baselineMarketing * (1 + marketingExpense / 100);
  const adjustedOpIncome =
    adjustedGrossProfit - adjustedOpEx - adjustedMarketing;

  // Calculate percentage changes
  const revenueChange =
    ((adjustedRevenue - baselineRevenue) / baselineRevenue) * 100;
  const grossProfitChange =
    ((adjustedGrossProfit - baselineGrossProfit) / baselineGrossProfit) * 100;
  const opIncomeChange =
    ((adjustedOpIncome - baselineOpIncome) / baselineOpIncome) * 100;

  const briefingData = {
    header: {
      title: "Hi Jason, Your Morning Financial Briefing",
      subtitle: "Chat with me by selecting the card",
    },
    cards: [
      {
        id: "urgent",
        title: "High Priority",
        content:
          "I've flagged a potential duplicate payment to Surat Silk Suppliers (₹86,500).",
        iconSymbol: "⊙",
        iconColor: "orange",
      },
      {
        id: "priorities",
        title: "Today's priorities",
        content:
          "I recommend reviewing the duplicate silk payment issue, addressing the GSTR-3B filing",
        iconSymbol: "↻",
        iconColor: "blue",
      },
      {
        id: "updates",
        title: "Positive financial updates",
        content:
          "I found that invoice #TW-2325 for computer peripherals uses HSN code 8471 but the items described are more accurately covered under HSN 8473 (parts & accessories).",
        iconSymbol: "↗",
        iconColor: "green",
      },
    ],
  };

  const { header, cards } = briefingData;
  const router = useRouter();

  const handleRouting = (id) => {
    if (!id && id.lenght === 0) return;
    router.push(id);
  };

  return (
    <div className="bg-[#F8F8F8] flex">
      <div className="flex flex-col gap-y-6 mx-4 my-6 p-4 rounded-xl bg-[#001D5C] ">
        <div
          onClick={() => {
            handleRouting("/finance-control-center");
          }}
          className="p-2 rounded-xl hover:bg-[#2154C4]"
        >
          <Image src={"./icons/grid.svg"} height={24} width={24} alt="Grid" />
        </div>
        <div
          onClick={() => {
            handleRouting("/risk-and-compliance");
          }}
          className="p-2 rounded-lg hover:bg-[#2154C4]"
        >
          <Image src={"./icons/shield.svg"} height={24} width={24} alt="Grid" />
        </div>
        <div
          onClick={() => {
            handleRouting("/planning-forecasting");
          }}
          className="p-2 rounded-lg hover:bg-[#2154C4] bg-[#2154C4]"
        >
          <Image src={"./icons/graph.svg"} height={24} width={24} alt="Grid" />
        </div>
        <div
          onClick={() => {
            handleRouting("/business-analytics");
          }}
          className="p-2 rounded-lg hover:bg-[#2154C4]"
        >
          <Image
            src={"./icons/bar-chart.svg"}
            height={24}
            width={24}
            alt="Grid"
          />
        </div>
        <div
          onClick={() => {
            handleRouting("/dashboard");
          }}
          className="p-2 rounded-lg hover:bg-[#2154C4]"
        >
          <Image
            src={"./icons/network-node.svg"}
            height={24}
            width={24}
            alt="Grid"
          />
        </div>
      </div>
      <div className="flex flex-col w-full h-[98vh] p-4 overflow-y-auto mt-4">
        <div className="mb-2">
          <p className="text-[#001D5C] text-2xl font-bold">
            Planning & Forecasting Assistant
          </p>
          <p className="text-[#001D5C] text-sm font-normal">
            Last updated: March 17th March, 2025 | 10:45 AM
          </p>
        </div>

        <div className=" bg-white rounded-lg mb-4">
          <div className="flex items-center justify-center mb-4">
            <Image
              src={"./icons/agent.svg"}
              height={72}
              width={72}
              alt="logo"
            />
          </div>
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold text-[#001D5C]">
              {header.title}
            </h1>
            <p className="text-[#001D5C] text-base">{header.subtitle}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 px-44 mb-10 place-items-center">
            {cards.map((card, index) => (
              <div
                key={card.id}
                className={` ${
                  cards.length % 2 !== 0 && index === cards.length - 1
                    ? "col-span-2 flex justify-center items-center w-[440px]"
                    : "w-[440px]"
                }`}
              >
                <BriefingCard
                  title={card.title}
                  content={card.content}
                  iconSymbol={card.iconSymbol}
                  iconColor={card.iconColor}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Scenario Planning Section */}
        <div className="">
          <h2 className="text-xl font-bold mb-4">Scenario Modeling</h2>
          <Card className="border-transparent">
            <Card className="border-transparent">
              <CardHeader className="">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base text-[#001D5C] font-semibold">
                    Q2-Q4 FY2025-26 Scenarios
                  </CardTitle>
                  {/* <div className="flex items-center gap-2">
                    <Button
                      variant={
                        activeScenario === "base" ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setActiveScenario("base")}
                    >
                      Base Case
                    </Button>
                    <Button
                      variant={
                        activeScenario === "optimistic" ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setActiveScenario("optimistic")}
                    >
                      Optimistic
                    </Button>
                    <Button
                      variant={
                        activeScenario === "conservative"
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() => setActiveScenario("conservative")}
                    >
                      Conservative
                    </Button>
                    <Button
                      variant={
                        activeScenario === "custom" ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setActiveScenario("custom")}
                    >
                      Custom
                    </Button>
                  </div> */}
                </div>
              </CardHeader>
              <CardContent className="py-4">
                <div>
                  <h3 className="font-medium mb-4">Financial Impact</h3>

                  <div className="flex gap-x-4 items-center flex-grow mb-4">
                    <div className="bg-white p-3 rounded-lg border w-[244px]">
                      <div className="text-sm font-medium text-[#001D5C] mb-1">
                        Projected Revenue
                      </div>
                      <div className="text-2xl font-normal font-public-sans">
                        ₹ {adjustedRevenue.toFixed(1)}L
                      </div>
                      <div
                        className={`text-sm flex items-start mt-1 ${
                          revenueChange >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {revenueChange >= 0 ? "↑" : "↓"}{" "}
                        {Math.abs(revenueChange).toFixed(1)}% vs Base
                        <Image
                          src={"./icons/up.svg"}
                          alt="UP"
                          height={20}
                          width={20}
                        />
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-lg border w-[244px]">
                      <div className="text-sm font-medium text-[#001D5C] mb-1">
                        Gross Profit
                      </div>
                      <div className="text-2xl font-normal font-public-sans">
                        ₹ {adjustedGrossProfit.toFixed(1)}L
                      </div>
                      <div
                        className={`text-sm flex items-start mt-1 ${
                          grossProfitChange >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {grossProfitChange >= 0 ? "↑" : "↓"}{" "}
                        {Math.abs(grossProfitChange).toFixed(1)}% vs Base
                        <Image
                          src={"./icons/up.svg"}
                          alt="UP"
                          height={20}
                          width={20}
                        />
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-lg border w-[244px]">
                      <div className="text-sm font-medium text-[#001D5C] mb-1">
                        Operating Income
                      </div>
                      <div className="text-2xl font-normal font-public-sans">
                        ₹ {adjustedOpIncome.toFixed(1)}L
                      </div>
                      <div
                        className={`text-sm flex items-center mt-1 ${
                          opIncomeChange >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {opIncomeChange >= 0 ? "↑" : "↓"}{" "}
                        {Math.abs(opIncomeChange).toFixed(1)}% vs Base
                        <Image
                          src={"./icons/down.svg"}
                          alt="DOWN"
                          height={14}
                          width={14}
                          className="ml-1"
                        />
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-lg border w-[244px]">
                      <div className="text-sm font-medium text-[#001D5C] mb-1">
                        Operating Margin
                      </div>
                      <div className="text-2xl font-normal font-public-sans">
                        {((adjustedOpIncome / adjustedRevenue) * 100).toFixed(
                          1
                        )}
                        %
                      </div>
                      <div
                        className={`text-sm flex items-center mt-1 ${
                          opIncomeChange >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {opIncomeChange >= 0 ? "↑" : "↓"}{" "}
                        {Math.abs(opIncomeChange - revenueChange).toFixed(1)}{" "}
                        pts
                        <Image
                          src={"./icons/down.svg"}
                          alt="DOWN"
                          height={14}
                          width={14}
                          className="ml-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div className="bg-white p-4 rounded-lg border">
                      <h4 className="text-sm font-semibold font-public-sans text-[#001D5C] mb-4">
                        Adjust Key Drivers
                      </h4>

                      <Slider
                        label="Revenue Growth"
                        value={salesGrowth}
                        min={-10}
                        max={20}
                        onChange={(e) =>
                          setSalesGrowth(parseInt(e.target.value))
                        }
                        filledColor="#FFC7BD"
                        unfilledColor="#F8F8F8"
                        thumbColor="#FFC7BD"
                      />

                      <Slider
                        label="Raw Material Costs"
                        value={rawMaterialCost}
                        min={-10}
                        max={20}
                        onChange={(e) =>
                          setRawMaterialCost(parseInt(e.target.value))
                        }
                        filledColor="#FFC7BD"
                        unfilledColor="#F8F8F8"
                        thumbColor="#FFC7BD"
                      />

                      <Slider
                        label="Labor Costs"
                        value={laborCost}
                        min={-10}
                        max={20}
                        onChange={(e) => setLaborCost(parseInt(e.target.value))}
                        filledColor="#FFC7BD"
                        unfilledColor="#F8F8F8"
                        thumbColor="#FFC7BD"
                      />

                      <Slider
                        label="Marketing Expense"
                        value={marketingExpense}
                        min={-20}
                        max={30}
                        onChange={(e) =>
                          setMarketingExpense(parseInt(e.target.value))
                        }
                        filledColor="#FFC7BD"
                        unfilledColor="#F8F8F8"
                        thumbColor="#FFC7BD"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="bg-white p-4 rounded-lg border mb-4">
                      <h4 className="text-sm font-semibold text-[#001D5C] font-public-sans mb-2">
                        Quarterly Forecast
                      </h4>
                      <LineChart
                        data={[
                          60,
                          65,
                          70,
                          75 + salesGrowth / 2,
                          80 + salesGrowth,
                          85 + salesGrowth * 1.5,
                        ]}
                        height={50}
                      />
                      <div className="flex justify-evenly mt-2 text-xs text-gray-500">
                        <div className="">Q1</div>
                        <div className="">Q2</div>
                        <div className="">Q3</div>
                        <div className="">Q4</div>
                        <div className="">Q1</div>
                        <div className="">Q2</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-transparent">
                <div className="flex items-start">
                  <div className="mr-2 self-start">
                    <Image
                      src={"./icons/agent.svg"}
                      height={38}
                      width={38}
                      alt="Grid"
                    />
                  </div>
                  <div className="space-y-2 w-full">
                    <p>I've analyzed this scenario's impact:</p>
                    <div className="ml-2 flex flex-col gap-y-1">
                      <p>
                        • With 15% revenue growth and -2% raw material cost
                        change, we maintain a healthy margin
                      </p>
                      <p>
                        • The increased marketing budget should support your
                        target growth rate based on historical conversion data.
                      </p>
                    </div>
                    <div className="">
                      <button className="bg-[#2154C4] px-6 py-1.5 rounded-full text-white">
                        Add to comparison
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-x-2 mt-4">
                  <Image
                    src={"./icons/bulb.svg"}
                    height={12}
                    width={12}
                    alt="Tip"
                  />
                  <p className="text-xs text-gray-500">
                    Tip: Try different combinations of revenue and cost drivers
                    to see their impact on your bottom line.
                  </p>
                </div>
              </CardFooter>
            </Card>
          </Card>

          {/* Variance Analysis Section */}
          <div className="mt-4 mb-8">
            <h2 className="text-xl font-normal text-[#001D5C] mb-2">
              Variance Analysis
            </h2>

            <Card className="border-transparent">
              <CardHeader className="">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-[#001D5C] font-semibold font-public-sans">
                    Q1 2025-26: Plan vs. Actual
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="py-4">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-white p-3 rounded-lg border flex flex-col">
                    <div className="text-sm text-[#001D5C] font-medium font-public-sans mb-3">
                      Revenue
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-2xl font-normal font-public-sans text-[#001D5C]">
                        ₹ 142.4L
                      </div>
                      <Badge
                        variant="success"
                        className="flex items-center text-xs"
                      >
                        +5.2%
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-500 mb-2">
                      vs ₹135.3L planned
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="h-1 bg-gray-200 rounded-full flex-1">
                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: "75%" }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium ml-2">
                        75% of Q2 Target
                      </span>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-lg border flex flex-col">
                    <div className="text-sm text-[#001D5C] font-medium font-public-sans mb-3">
                      Cost of Goods
                    </div>
                    <div className="flex items-baseline gap-2">
                      <div className="text-2xl font-normal font-public-sans text-[#001D5C]">
                        ₹ 78.9L
                      </div>
                      <Badge
                        variant="danger"
                        className="fllex items-center text-xs"
                      >
                        +8.0%
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-500 mb-2">
                      vs ₹73.0L planned
                    </div>
                    <div className="h-1 bg-gray-200 rounded-full mt-auto">
                      <div
                        className="h-full bg-red-500 rounded-full"
                        style={{ width: "55.4%" }}
                      ></div>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-lg border flex flex-col">
                    <div className="text-sm text-[#001D5C] font-medium font-public-sans mb-3">
                      Operating Income
                    </div>
                    <div className="flex items-baseline gap-2">
                      <div className="text-2xl font-normal font-public-sans text-[#001D5C]">
                        ₹ 38.7L
                      </div>
                      <Badge
                        variant="success"
                        className="fllex items-center text-xs"
                      >
                        +1.8%
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-500 mb-2">
                      vs ₹38.0L planned
                    </div>
                    <div className="h-1 bg-gray-200 rounded-full mt-auto">
                      <div
                        className="h-full bg-teal-500 rounded-full"
                        style={{ width: "27.2%" }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-2 self-start">
                    <Image
                      src={"./icons/agent.svg"}
                      height={38}
                      width={38}
                      alt="Grid"
                    />
                  </div>
                  <div className="space-y-2 w-full">
                    <p className="text-sm text-[#001D5C] font-public-sans">
                      I've analyzed our Q1 performance compared to the original
                      plan:
                    </p>
                    <div className="ml-2 flex flex-col gap-y-1">
                      <p className="text-sm text-[#001D5C] font-public-sans">
                        • Revenue exceeded plan by 5.2%, primarily in the SMB
                        segment which was 12% above forecast.
                      </p>
                      <p className="text-sm text-[#001D5C] font-public-sans">
                        • However, COGS was 8.0% higher than planned due to
                        increased raw material costs and the product mix shift
                        toward hardware.
                      </p>
                      <p className="text-sm text-[#001D5C] font-public-sans">
                        • The net result is operating income just slightly above
                        plan (+1.8%), but our gross margin is compressed by 1.4
                        percentage points.
                      </p>
                    </div>
                    <p className="text-sm text-[#001D5C] font-public-sans">
                      Should we revise our Q2-Q4 forecast to account for these
                      trends?
                    </p>
                    <div className="pb-4">
                      <button className="bg-[#2154C4] px-6 py-1.5 text-sm rounded-full text-white">
                        Update Forecast
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4">
                  <h3 className="font-semibold text-[#001D5C] text-base font-public-sans mb-4">
                    Detailed Variance Analysis
                  </h3>
                  <table className="w-full text-left border-collapse">
                    <thead className="">
                      <tr className="text-sm text-black font-public-sans bg-[#F8F8F8]">
                        <th className="text-left p-2 font-medium">Category</th>
                        <th className="text-right p-2 font-medium">
                          Plan (₹L)
                        </th>
                        <th className="text-right p-2 font-medium">
                          Actual (₹L)
                        </th>
                        <th className="text-right p-2 font-medium">Variance</th>
                        <th className="text-right p-2 font-medium">
                          Variance %
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y text-sm text-black font-public-sans">
                      <tr className="">
                        <td className="py-2">Revenue - SMB Solutions</td>
                        <td className="text-right py-2">58.2</td>
                        <td className="text-right py-2">65.2</td>
                        <td className="text-right py-2 text-green-600">+7.0</td>
                        <td className="text-right py-2 text-green-600">
                          +12.0%
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">Revenue - Enterprise</td>
                        <td className="text-right py-2">55.9</td>
                        <td className="text-right py-2">54.5</td>
                        <td className="text-right py-2 text-red-600">-1.4</td>
                        <td className="text-right py-2 text-red-600">-2.5%</td>
                      </tr>
                      <tr>
                        <td className="py-2">Revenue - Consumer</td>
                        <td className="text-right py-2">21.2</td>
                        <td className="text-right py-2">22.7</td>
                        <td className="text-right py-2 text-green-600">+1.5</td>
                        <td className="text-right py-2 text-green-600">
                          +7.1%
                        </td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="py-2 font-medium">Total Revenue</td>
                        <td className="text-right py-2 font-medium">135.3</td>
                        <td className="text-right py-2 font-medium">142.4</td>
                        <td className="text-right py-2 font-medium text-green-600">
                          +7.1
                        </td>
                        <td className="text-right py-2 font-medium text-green-600">
                          +5.2%
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">Direct Materials</td>
                        <td className="text-right py-2">45.6</td>
                        <td className="text-right py-2">51.2</td>
                        <td className="text-right py-2 text-red-600">-5.6</td>
                        <td className="text-right py-2 text-red-600">-12.3%</td>
                      </tr>
                      <tr>
                        <td className="py-2">Direct Labor</td>
                        <td className="text-right py-2">27.4</td>
                        <td className="text-right py-2">27.7</td>
                        <td className="text-right py-2 text-red-600">-0.3</td>
                        <td className="text-right py-2 text-red-600">-1.1%</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="py-2 font-medium">Total COGS</td>
                        <td className="text-right py-2 font-medium">73.0</td>
                        <td className="text-right py-2 font-medium">78.9</td>
                        <td className="text-right py-2 font-medium text-red-600">
                          -5.9
                        </td>
                        <td className="text-right py-2 font-medium text-red-600">
                          -8.0%
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter className="border-transparent">
                <div className="flex items-start">
                  <div className="mr-2 self-start">
                    <Image
                      src={"./icons/agent.svg"}
                      height={38}
                      width={38}
                      alt="Grid"
                    />
                  </div>
                  <div className="w-full">
                    <p className="text-sm text-[#001D5C] font-public-sans">
                      Want me to help you understand the root causes?
                    </p>
                    <p className="text-sm text-[#001D5C] font-public-sans">
                      I can run a deeper analysis on:
                    </p>
                    <div className="mt-2 flex gap-x-4">
                      <button className="bg-[#2154C4] px-6 py-1.5 text-sm rounded-full text-white">
                        SMB Outperformance
                      </button>
                      <button className="bg-[#2154C4] px-6 py-1.5 text-sm rounded-full text-white">
                        Enterprise Underperformance
                      </button>
                      <button className="bg-[#2154C4] px-6 py-1.5 text-sm rounded-full text-white">
                        Material Cost Increase
                      </button>
                      <button className="bg-[#2154C4] px-6 py-1.5 text-sm rounded-full text-white">
                        Margin Compression
                      </button>
                    </div>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanningForecastingDashboard;

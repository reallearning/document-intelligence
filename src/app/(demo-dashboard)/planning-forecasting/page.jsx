"use client";
import React, { useState } from "react";
import Image from "next/image";

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

// Icons
const TrendingUp = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);

const TrendingDown = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
    <polyline points="17 18 23 18 23 12"></polyline>
  </svg>
);

const Calendar = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const Clock = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const Download = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

const AlertCircle = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </svg>
);

const Settings = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const Save = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
    <polyline points="17 21 17 13 7 13 7 21"></polyline>
    <polyline points="7 3 7 8 15 8"></polyline>
  </svg>
);

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

  return (
    <div className="flex px-4 py-4 bg-[#F8F8F8]">
      <div className="flex flex-col gap-y-6 p-4 rounded-xl mb-4 bg-[#001D5C] ">
        <div className="p-2 rounded-xl hover:bg-[#2154C4]">
          <Image src={"./icons/grid.svg"} height={24} width={24} alt="Grid" />
        </div>
        <div className="p-2 rounded-lg hover:bg-[#2154C4]">
          <Image src={"./icons/shield.svg"} height={24} width={24} alt="Grid" />
        </div>
        <div className="p-2 rounded-lg hover:bg-[#2154C4]">
          <Image src={"./icons/graph.svg"} height={24} width={24} alt="Grid" />
        </div>
        <div className="p-2 rounded-lg hover:bg-[#2154C4]">
          <Image
            src={"./icons/bar-chart.svg"}
            height={24}
            width={24}
            alt="Grid"
          />
        </div>
        <div className="p-2 rounded-lg hover:bg-[#2154C4]">
          <Image
            src={"./icons/network-node.svg"}
            height={24}
            width={24}
            alt="Grid"
          />
        </div>
      </div>
      <div className="w-full h-[98vh] p-4 overflow-y-auto">
        <div className="mb-2">
          <p className="text-[#001D5C] text-2xl font-bold">
            Planning & Forecasting Assistant
          </p>
          <p className="text-[#001D5C] text-sm font-normal">
            Last updated: March 17th March, 2025 | 10:45 AM
          </p>
        </div>

        <div className="mx-auto p-6 bg-white rounded-lg border border-gray-300 mb-4">
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
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Scenario Modeling</h2>
          <Card>
            <Card>
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

            <Card>
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
              <CardFooter>
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

          {/* Long-Term Outlook */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Long-Term Outlook</h2>

            <Card>
              <CardHeader className="border-b">
                <div className="flex justify-between items-center">
                  <CardTitle>3-Year Strategic Plan</CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Time Horizon:</span>
                    <Button variant="outline" size="sm">
                      1 Year
                    </Button>
                    <Button variant="default" size="sm">
                      3 Year
                    </Button>
                    <Button variant="outline" size="sm">
                      5 Year
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="py-4">
                <ThoughtBubble className="mb-6">
                  <p>
                    I've refreshed our 3-year outlook based on recent
                    developments. Here's what I'm seeing:
                  </p>
                  <ul className="mt-3 space-y-2 text-sm">
                    <li>
                      • The SMB segment is showing stronger-than-expected growth
                      (+12% vs planned 7%) and this trend appears sustainable.
                    </li>
                    <li>
                      • Raw material costs will likely remain elevated through
                      FY 2025-26 due to global supply constraints.
                    </li>
                    <li>
                      • Our planned capex for the new facility in Q3 2026 should
                      improve margins by approximately 2.5 percentage points
                      once operational.
                    </li>
                  </ul>
                  <p className="mt-3 font-medium">
                    I've incorporated these insights into our long-term
                    projections below.
                  </p>
                </ThoughtBubble>

                <div className="bg-white p-4 rounded-lg border mb-6">
                  <h3 className="font-medium mb-4">
                    3-Year Revenue & Profit Projection
                  </h3>
                  <div className="h-60 bg-gray-50 border rounded-md p-4 mb-4">
                    {/* Simplified chart representation */}
                    <div className="h-full relative">
                      {/* Revenue line (top) */}
                      <div className="absolute left-0 right-0 top-1/4 border-t border-dashed border-teal-300"></div>
                      <div className="absolute left-1/6 top-1/4 h-2 w-2 bg-teal-500 rounded-full transform -translate-y-1/2"></div>
                      <div className="absolute left-2/6 top-[22%] h-2 w-2 bg-teal-500 rounded-full transform -translate-y-1/2"></div>
                      <div className="absolute left-3/6 top-[20%] h-2 w-2 bg-teal-500 rounded-full transform -translate-y-1/2"></div>
                      <div className="absolute left-4/6 top-[17%] h-2 w-2 bg-teal-500 rounded-full transform -translate-y-1/2"></div>
                      <div className="absolute left-5/6 top-[14%] h-2 w-2 bg-teal-500 rounded-full transform -translate-y-1/2"></div>

                      {/* Gross Profit line (middle) */}
                      <div className="absolute left-0 right-0 top-1/2 border-t border-dashed border-indigo-300"></div>
                      <div className="absolute left-1/6 top-1/2 h-2 w-2 bg-indigo-500 rounded-full transform -translate-y-1/2"></div>
                      <div className="absolute left-2/6 top-[48%] h-2 w-2 bg-indigo-500 rounded-full transform -translate-y-1/2"></div>
                      <div className="absolute left-3/6 top-[47%] h-2 w-2 bg-indigo-500 rounded-full transform -translate-y-1/2"></div>
                      <div className="absolute left-4/6 top-[45%] h-2 w-2 bg-indigo-500 rounded-full transform -translate-y-1/2"></div>
                      <div className="absolute left-5/6 top-[42%] h-2 w-2 bg-indigo-500 rounded-full transform -translate-y-1/2"></div>

                      {/* Operating Income line (bottom) */}
                      <div className="absolute left-0 right-0 top-3/4 border-t border-dashed border-purple-300"></div>
                      <div className="absolute left-1/6 top-3/4 h-2 w-2 bg-purple-500 rounded-full transform -translate-y-1/2"></div>
                      <div className="absolute left-2/6 top-[76%] h-2 w-2 bg-purple-500 rounded-full transform -translate-y-1/2"></div>
                      <div className="absolute left-3/6 top-[77%] h-2 w-2 bg-purple-500 rounded-full transform -translate-y-1/2"></div>
                      <div className="absolute left-4/6 top-[73%] h-2 w-2 bg-purple-500 rounded-full transform -translate-y-1/2"></div>
                      <div className="absolute left-5/6 top-[70%] h-2 w-2 bg-purple-500 rounded-full transform -translate-y-1/2"></div>

                      {/* Event markers */}
                      <div className="absolute left-[42%] top-0 bottom-0 border-l border-dashed border-gray-300"></div>
                      <div className="absolute left-[42%] bottom-0 transform -translate-x-1/2 text-xs text-gray-500">
                        New Product Launch
                      </div>

                      <div className="absolute left-[75%] top-0 bottom-0 border-l border-dashed border-gray-300"></div>
                      <div className="absolute left-[75%] bottom-0 transform -translate-x-1/2 text-xs text-gray-500">
                        New Facility
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 bg-teal-500 rounded-full"></div>
                      <span>Revenue</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 bg-indigo-500 rounded-full"></div>
                      <span>Gross Profit</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 bg-purple-500 rounded-full"></div>
                      <span>Operating Income</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-lg border">
                    <h4 className="text-sm font-medium mb-3">
                      Key Growth Drivers
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>SMB Segment Expansion</span>
                          <span className="font-medium">35%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-full bg-teal-500 rounded-full"
                            style={{ width: "35%" }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>New Product Lines</span>
                          <span className="font-medium">25%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-full bg-teal-500 rounded-full"
                            style={{ width: "25%" }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Enterprise Accounts</span>
                          <span className="font-medium">20%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-full bg-teal-500 rounded-full"
                            style={{ width: "20%" }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>International Expansion</span>
                          <span className="font-medium">15%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-full bg-teal-500 rounded-full"
                            style={{ width: "15%" }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Service Revenue</span>
                          <span className="font-medium">5%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-full bg-teal-500 rounded-full"
                            style={{ width: "5%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <ThoughtBubble variant="insight">
                      <p className="font-medium">
                        Strategic considerations for the 3-year horizon:
                      </p>
                      <ul className="mt-2 space-y-2 text-sm">
                        <li>
                          1.{" "}
                          <span className="font-medium">Capacity planning</span>
                          : The new facility in Q3 2026 is well-timed based on
                          projected growth rates.
                        </li>
                        <li>
                          2.{" "}
                          <span className="font-medium">
                            Supply chain resilience
                          </span>
                          : Consider diversifying suppliers to mitigate
                          continued raw material volatility.
                        </li>
                        <li>
                          3.{" "}
                          <span className="font-medium">
                            Product mix evolution
                          </span>
                          : The shifting revenue mix toward SMB suggests we
                          should accelerate development of the SMB-focused
                          product roadmap.
                        </li>
                      </ul>
                      <p className="mt-3 text-sm">
                        Would you like me to prepare a more detailed analysis of
                        any of these areas?
                      </p>
                      <div className="mt-3 flex gap-2">
                        <Button size="sm">Supply Chain Analysis</Button>
                        <Button size="sm">Product Roadmap Impact</Button>
                      </div>
                    </ThoughtBubble>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <p>
                  This long-term plan is updated monthly with our rolling
                  forecast and quarterly with major strategic reviews.
                </p>
              </CardFooter>
            </Card>
          </div>

          {/* Agent reflection and next steps */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>What I'm Working On Next</CardTitle>
            </CardHeader>
            <CardContent>
              <ThoughtBubble>
                <p>
                  Based on our updated forecasts and recent performance, here
                  are three areas I'm focusing on:
                </p>
                <div className="mt-4 space-y-4">
                  <div className="flex gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium">
                        Raw Material Cost Impact Analysis
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        I'm developing a detailed model of how continued raw
                        material price increases would affect our margins across
                        product lines.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium">
                        Q2 Cash Flow Scenario Planning
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Given the accelerated growth in the SMB segment, I'm
                        analyzing whether we need to adjust our working capital
                        forecasts.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium">
                        Capacity Utilization Review
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        I'm examining whether our current facilities can support
                        the higher-than-expected growth until the new facility
                        opens.
                      </p>
                    </div>
                  </div>
                </div>

                <p className="mt-4">
                  Which of these would you like me to prioritize for this week?
                </p>
              </ThoughtBubble>
            </CardContent>
            <CardFooter>
              <div className="flex gap-2">
                <Button>Material Cost Analysis</Button>
                <Button variant="outline">Cash Flow Planning</Button>
                <Button variant="outline">Capacity Review</Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PlanningForecastingDashboard;

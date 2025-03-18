"use client";
import React, { useState } from "react";

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
const Slider = ({ label, value, min, max, onChange }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <label className="text-sm font-medium">{label}</label>
        <span className="text-sm">{value}%</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
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
  // This is a simple placeholder for a line chart
  return (
    <div
      className={`h-${height} bg-gray-50 rounded-md border flex items-end p-2 ${className}`}
    >
      {data.map((value, index) => (
        <div
          key={index}
          className="flex-1 mx-0.5"
          style={{ height: `${value}%` }}
        >
          <div className="h-full w-full bg-teal-500 rounded-sm"></div>
        </div>
      ))}
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

  return (
    <div className="flex flex-col w-full h-screen bg-gray-50 p-6 overflow-y-auto">
      {/* Header with Agent Profile */}
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-teal-600 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              Planning & Forecasting Assistant
            </h1>
            <p className="text-sm text-gray-500">
              Last updated: March 17, 2025 • 8:45 AM
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="primary" className="flex items-center gap-1">
            <Clock size={12} /> Forecast Updated
          </Badge>
          <Button variant="outline" className="flex items-center gap-2">
            <Download size={16} />
            <span>Export</span>
          </Button>
        </div>
      </header>

      {/* Agent Welcome and Introduction */}
      <Card className="mb-8">
        <CardHeader className="border-b">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">
              Looking Ahead: FY2025-26 Planning
            </CardTitle>
            <Badge variant="primary">Rolling Forecast Mode</Badge>
          </div>
        </CardHeader>
        <CardContent className="py-4">
          <ThoughtBubble className="mb-6">
            <p className="font-medium">
              Good morning, Priya! I've updated our rolling forecast with the
              latest March data.
            </p>
            <p className="mt-2">
              Here's what I'm seeing for the next quarter and beyond:
            </p>
            <ul className="mt-2 space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <TrendingUp
                  size={18}
                  className="text-green-600 mt-0.5 flex-shrink-0"
                />
                <span>
                  We're tracking{" "}
                  <span className="font-semibold">
                    5.2% above our original revenue plan
                  </span>{" "}
                  for the quarter, primarily due to strong SMB segment
                  performance.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <TrendingDown
                  size={18}
                  className="text-amber-600 mt-0.5 flex-shrink-0"
                />
                <span>
                  However,{" "}
                  <span className="font-semibold">
                    raw material costs are trending 8% higher
                  </span>{" "}
                  than our initial forecast, which is putting pressure on gross
                  margins.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <AlertCircle
                  size={18}
                  className="text-teal-600 mt-0.5 flex-shrink-0"
                />
                <span>
                  Based on these trends, I've created three updated scenarios
                  for you to review. I recommend we adjust our Q2 forecast
                  accordingly.
                </span>
              </li>
            </ul>
            <div className="mt-4 flex gap-2">
              <Button size="sm">View Updated Scenarios</Button>
              <Button variant="outline" size="sm">
                Keep Current Forecast
              </Button>
            </div>
          </ThoughtBubble>

          {/* Forecast Timeline */}
          <div className="bg-white p-4 rounded-lg border mb-6">
            <h3 className="font-medium mb-3">Rolling Forecast Timeline</h3>
            <div className="relative h-16 bg-gray-100 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex">
                {/* Past months (locked) */}
                <div className="w-1/6 h-full bg-gray-200 border-r border-gray-300 flex items-center justify-center text-sm font-medium text-gray-500">
                  Jan
                </div>
                <div className="w-1/6 h-full bg-gray-200 border-r border-gray-300 flex items-center justify-center text-sm font-medium text-gray-500">
                  Feb
                </div>
                <div className="w-1/6 h-full bg-gray-200 border-r border-gray-300 flex items-center justify-center text-sm font-medium text-gray-500">
                  Mar
                </div>

                {/* Current month (in progress) */}
                <div className="w-1/6 h-full bg-teal-100 border-r border-gray-300 flex items-center justify-center text-sm font-medium text-teal-700 relative">
                  Apr
                  <div className="absolute -bottom-1 inset-x-0 h-1 bg-teal-600"></div>
                </div>

                {/* Future months (forecast) */}
                <div className="w-1/6 h-full bg-white border-r border-gray-300 flex items-center justify-center text-sm font-medium">
                  May
                </div>
                <div className="w-1/6 h-full bg-white border-r border-gray-300 flex items-center justify-center text-sm font-medium">
                  Jun
                </div>
              </div>

              {/* Timeline markers */}
              <div className="absolute -bottom-1 left-1/2 h-3 w-px bg-teal-600"></div>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-teal-600 font-medium">
                We are here
              </div>
            </div>
            <div className="flex justify-between mt-8 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-200 rounded"></div>
                <span>Locked Actuals</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-teal-100 rounded"></div>
                <span>Current Month</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-white border rounded"></div>
                <span>Forecast (Editable)</span>
              </div>
            </div>
          </div>

          <ThoughtBubble className="mb-6" variant="insight">
            <div className="flex items-start gap-2">
              <Settings size={20} className="text-indigo-500 mt-0.5" />
              <div>
                <p className="font-medium">
                  I've noticed you usually revise marketing budgets quarterly.
                </p>
                <p className="mt-1 text-sm">
                  Since we're outperforming in the SMB segment, would you like
                  me to create a scenario where we increase SMB marketing spend
                  by 10% in Q2, while keeping total marketing budget constant?
                </p>
                <div className="mt-3 flex gap-2">
                  <Button size="sm">Create This Scenario</Button>
                  <Button variant="outline" size="sm">
                    Not Now
                  </Button>
                </div>
              </div>
            </div>
          </ThoughtBubble>
        </CardContent>
      </Card>

      {/* Scenario Planning Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Scenario Modeling</h2>
        <Card>
          <Card>
            <CardHeader className="border-b">
              <div className="flex justify-between items-center">
                <CardTitle>Q2-Q4 FY2025-26 Scenarios</CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant={activeScenario === "base" ? "default" : "outline"}
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
                      activeScenario === "conservative" ? "default" : "outline"
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
                </div>
              </div>
            </CardHeader>
            <CardContent className="py-4">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="font-medium mb-4">Forecast Assumptions</h3>

                  <ThoughtBubble className="mb-4">
                    <p className="text-sm">
                      I've created these scenarios based on historical patterns
                      and market indicators. Let's see how changes to key
                      drivers affect our financial outlook.
                    </p>
                  </ThoughtBubble>

                  <div className="bg-white p-4 rounded-lg border">
                    <h4 className="text-sm font-medium mb-4">
                      Adjust Key Drivers
                    </h4>

                    <Slider
                      label="Revenue Growth"
                      value={salesGrowth}
                      min={-10}
                      max={20}
                      onChange={(e) => setSalesGrowth(parseInt(e.target.value))}
                    />

                    <Slider
                      label="Raw Material Costs"
                      value={rawMaterialCost}
                      min={-10}
                      max={20}
                      onChange={(e) =>
                        setRawMaterialCost(parseInt(e.target.value))
                      }
                    />

                    <Slider
                      label="Labor Costs"
                      value={laborCost}
                      min={-10}
                      max={20}
                      onChange={(e) => setLaborCost(parseInt(e.target.value))}
                    />

                    <Slider
                      label="Marketing Expense"
                      value={marketingExpense}
                      min={-20}
                      max={30}
                      onChange={(e) =>
                        setMarketingExpense(parseInt(e.target.value))
                      }
                    />

                    <div className="flex gap-2 mt-4">
                      <Button size="sm" className="flex items-center gap-1">
                        <Save size={16} />
                        Save Scenario
                      </Button>
                      <Button variant="outline" size="sm">
                        Reset
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Financial Impact</h3>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-white p-3 rounded-lg border">
                      <div className="text-sm text-gray-500 mb-1">
                        Projected Revenue
                      </div>
                      <div className="text-xl font-bold">
                        ₹ {adjustedRevenue.toFixed(1)}L
                      </div>
                      <div
                        className={`text-sm mt-1 ${
                          revenueChange >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {revenueChange >= 0 ? "↑" : "↓"}{" "}
                        {Math.abs(revenueChange).toFixed(1)}% vs Base
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-lg border">
                      <div className="text-sm text-gray-500 mb-1">
                        Gross Profit
                      </div>
                      <div className="text-xl font-bold">
                        ₹ {adjustedGrossProfit.toFixed(1)}L
                      </div>
                      <div
                        className={`text-sm mt-1 ${
                          grossProfitChange >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {grossProfitChange >= 0 ? "↑" : "↓"}{" "}
                        {Math.abs(grossProfitChange).toFixed(1)}% vs Base
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-lg border">
                      <div className="text-sm text-gray-500 mb-1">
                        Operating Income
                      </div>
                      <div className="text-xl font-bold">
                        ₹ {adjustedOpIncome.toFixed(1)}L
                      </div>
                      <div
                        className={`text-sm mt-1 ${
                          opIncomeChange >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {opIncomeChange >= 0 ? "↑" : "↓"}{" "}
                        {Math.abs(opIncomeChange).toFixed(1)}% vs Base
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-lg border">
                      <div className="text-sm text-gray-500 mb-1">
                        Operating Margin
                      </div>
                      <div className="text-xl font-bold">
                        {((adjustedOpIncome / adjustedRevenue) * 100).toFixed(
                          1
                        )}
                        %
                      </div>
                      <div
                        className={`text-sm mt-1 ${
                          opIncomeChange >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {opIncomeChange >= 0 ? "↑" : "↓"}{" "}
                        {Math.abs(opIncomeChange - revenueChange).toFixed(1)}{" "}
                        pts
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border mb-4">
                    <h4 className="text-sm font-medium mb-2">
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
                      height={40}
                    />
                    <div className="flex justify-between mt-2 text-xs text-gray-500">
                      <div>Q1</div>
                      <div>Q2</div>
                      <div>Q3</div>
                      <div>Q4</div>
                      <div>Q1</div>
                      <div>Q2</div>
                    </div>
                  </div>

                  <ThoughtBubble
                    variant={opIncomeChange < -5 ? "warning" : "insight"}
                  >
                    {opIncomeChange < -5 ? (
                      <div className="flex items-start gap-2">
                        <AlertCircle
                          size={20}
                          className="text-amber-500 mt-0.5"
                        />
                        <div>
                          <p className="font-medium">
                            Warning: This scenario significantly reduces
                            operating income.
                          </p>
                          <p className="mt-1 text-sm">
                            The combination of{" "}
                            {salesGrowth > 0 ? "increased" : "decreased"} sales
                            and {rawMaterialCost > 0 ? "higher" : "lower"} raw
                            material costs leads to a{" "}
                            {Math.abs(opIncomeChange).toFixed(1)}% reduction in
                            operating income.
                          </p>
                          <p className="mt-2 text-sm font-medium">
                            Would you like me to suggest alternative scenarios
                            to maintain profitability?
                          </p>
                          <div className="mt-3 flex gap-2">
                            <Button size="sm">Show Alternatives</Button>
                            <Button variant="outline" size="sm">
                              Continue with This
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="font-medium">
                          I've analyzed this scenario's impact:
                        </p>
                        <ul className="mt-2 space-y-1 text-sm">
                          <li>
                            • With {salesGrowth}% revenue growth and{" "}
                            {rawMaterialCost}% raw material cost change, we
                            maintain a healthy margin.
                          </li>
                          {marketingExpense > 5 && (
                            <li>
                              • The increased marketing budget should support
                              your target growth rate based on historical
                              conversion data.
                            </li>
                          )}
                          {laborCost > 5 && salesGrowth > 10 && (
                            <li>
                              • Consider whether the planned headcount is
                              sufficient to support this growth trajectory.
                            </li>
                          )}
                        </ul>
                        <Button size="sm" className="mt-3">
                          Add to Comparison
                        </Button>
                      </div>
                    )}
                  </ThoughtBubble>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-xs text-gray-500">
                Tip: Try different combinations of revenue and cost drivers to
                see their impact on your bottom line.
              </p>
            </CardFooter>
          </Card>
        </Card>

        {/* Variance Analysis Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Variance Analysis</h2>

          <Card>
            <CardHeader className="border-b">
              <div className="flex justify-between items-center">
                <CardTitle>Q1 2025-26: Plan vs. Actual</CardTitle>
                <Button variant="outline" size="sm">
                  Export Details
                </Button>
              </div>
            </CardHeader>
            <CardContent className="py-4">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-3 rounded-lg border flex flex-col">
                  <div className="text-sm text-gray-500 mb-1">Revenue</div>
                  <div className="flex items-baseline gap-2">
                    <div className="text-xl font-bold">₹ 142.4L</div>
                    <Badge variant="success" className="flex items-center">
                      +5.2%
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
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
                  <div className="text-sm text-gray-500 mb-1">
                    Cost of Goods
                  </div>
                  <div className="flex items-baseline gap-2">
                    <div className="text-xl font-bold">₹ 78.9L</div>
                    <Badge variant="danger" className="flex items-center">
                      +8.0%
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
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
                  <div className="text-sm text-gray-500 mb-1">
                    Operating Income
                  </div>
                  <div className="flex items-baseline gap-2">
                    <div className="text-xl font-bold">₹ 38.7L</div>
                    <Badge variant="success" className="flex items-center">
                      +1.8%
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
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

              <ThoughtBubble className="mb-6">
                <div className="flex items-start gap-2">
                  <div className="h-6 w-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    !
                  </div>
                  <div>
                    <p className="font-medium">
                      I've analyzed our Q1 performance compared to the original
                      plan:
                    </p>
                    <ul className="mt-2 space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <TrendingUp
                          size={16}
                          className="text-green-600 mt-0.5"
                        />
                        <span>
                          Revenue exceeded plan by 5.2%, primarily in the SMB
                          segment which was 12% above forecast.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <TrendingDown
                          size={16}
                          className="text-red-600 mt-0.5"
                        />
                        <span>
                          However, COGS was 8.0% higher than planned due to
                          increased raw material costs and the product mix shift
                          toward hardware.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle
                          size={16}
                          className="text-teal-600 mt-0.5"
                        />
                        <span>
                          The net result is operating income just slightly above
                          plan (+1.8%), but our gross margin is compressed by
                          1.4 percentage points.
                        </span>
                      </li>
                    </ul>
                    <p className="mt-3 text-sm font-medium">
                      Should we revise our Q2-Q4 forecast to account for these
                      trends?
                    </p>
                    <div className="mt-3 flex gap-2">
                      <Button size="sm">Update Forecast</Button>
                      <Button variant="outline" size="sm">
                        Keep Current Forecast
                      </Button>
                    </div>
                  </div>
                </div>
              </ThoughtBubble>

              <div className="bg-white p-4 rounded-lg border">
                <h3 className="font-medium mb-4">Detailed Variance Analysis</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left pb-2 font-medium">Category</th>
                      <th className="text-right pb-2 font-medium">Plan (₹L)</th>
                      <th className="text-right pb-2 font-medium">
                        Actual (₹L)
                      </th>
                      <th className="text-right pb-2 font-medium">Variance</th>
                      <th className="text-right pb-2 font-medium">
                        Variance %
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="py-2">Revenue - SMB Solutions</td>
                      <td className="text-right py-2">58.2</td>
                      <td className="text-right py-2">65.2</td>
                      <td className="text-right py-2 text-green-600">+7.0</td>
                      <td className="text-right py-2 text-green-600">+12.0%</td>
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
                      <td className="text-right py-2 text-green-600">+7.1%</td>
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
              <ThoughtBubble variant="insight">
                <p className="text-sm">
                  Want me to help you understand the root causes? I can run a
                  deeper analysis on:
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Button size="sm">SMB Outperformance</Button>
                  <Button size="sm">Enterprise Underperformance</Button>
                  <Button size="sm">Material Cost Increase</Button>
                  <Button size="sm">Margin Compression</Button>
                </div>
              </ThoughtBubble>
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
                    • Raw material costs will likely remain elevated through FY
                    2025-26 due to global supply constraints.
                  </li>
                  <li>
                    • Our planned capex for the new facility in Q3 2026 should
                    improve margins by approximately 2.5 percentage points once
                    operational.
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
                        <span className="font-medium">Capacity planning</span>:
                        The new facility in Q3 2026 is well-timed based on
                        projected growth rates.
                      </li>
                      <li>
                        2.{" "}
                        <span className="font-medium">
                          Supply chain resilience
                        </span>
                        : Consider diversifying suppliers to mitigate continued
                        raw material volatility.
                      </li>
                      <li>
                        3.{" "}
                        <span className="font-medium">
                          Product mix evolution
                        </span>
                        : The shifting revenue mix toward SMB suggests we should
                        accelerate development of the SMB-focused product
                        roadmap.
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
                This long-term plan is updated monthly with our rolling forecast
                and quarterly with major strategic reviews.
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
                Based on our updated forecasts and recent performance, here are
                three areas I'm focusing on:
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
                    <h4 className="font-medium">Capacity Utilization Review</h4>
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
  );
};

export default PlanningForecastingDashboard;

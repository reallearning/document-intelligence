"use client";
import React, { useState } from "react";
import {
  AlertTriangle,
  X,
  Clock,
  DollarSign,
  TrendingUp,
  ArrowRight,
  CalendarClock,
  Users,
  ChevronRight,
  BarChart2,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Sample data for charts
const bookingTimelineData = [
  { days: "0-3 days", count: 10, excess: 92000 },
  { days: "4-7 days", count: 8, excess: 68000 },
  { days: "8-13 days", count: 10, excess: 76000 },
  { days: "14-21 days", count: 6, excess: 0 },
  { days: "22-30 days", count: 4, excess: 0 },
  { days: ">30 days", count: 3, excess: 0 },
];

const monthlyTrendData = [
  { month: "Jan", compliant: 65, nonCompliant: 35 },
  { month: "Feb", compliant: 58, nonCompliant: 42 },
  { month: "Mar", compliant: 70, nonCompliant: 30 },
  { month: "Apr", compliant: 32, nonCompliant: 68 },
];

const teamBookingData = [
  { team: "Coverage Team A", compliant: 25, nonCompliant: 75 },
  { team: "Coverage Team B", compliant: 40, nonCompliant: 60 },
  { team: "Finance", compliant: 80, nonCompliant: 20 },
  { team: "Operations", compliant: 65, nonCompliant: 35 },
];

const COLORS = ["#22c55e", "#ef4444"];

interface props {
  isOpen: boolean;
  onClose: () => void;
}

const BookingPatternPopup = ({ isOpen, onClose }: props) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-auto">
        {/* Alert Header */}
        <div className="bg-red-50 p-4 rounded-t-lg border-b border-red-100 flex items-start">
          <AlertTriangle className="h-6 w-6 text-red-600 mr-3 mt-1 flex-shrink-0" />
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900">
              Late Flight Booking Pattern Detected
            </h2>
            <p className="text-gray-700 mt-1">
              68% of flights booked less than 14 days in advance, resulting in
              significant excess costs
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Executive Summary */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Executive Summary
          </h3>
          <p className="text-gray-700 leading-relaxed">
            In April 2025, I've identified a significant trend where{" "}
            <span className="font-semibold">68%</span> of all flight bookings
            were made less than 14 days before the travel date, contrary to
            company policy that requires bookings to be made at least 14 days in
            advance. This late booking pattern has resulted in an avoidable
            excess spend of <span className="font-semibold">₹236,000</span> in
            the last month alone.
          </p>

          <div className="grid grid-cols-3 gap-5 mt-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-500">
                Late Bookings
              </h4>
              <p className="text-3xl font-bold text-gray-900 mt-1">68%</p>
              <p className="text-sm text-gray-500 mt-1">
                vs. 32% policy compliant
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-500">Excess Cost</h4>
              <p className="text-3xl font-bold text-gray-900 mt-1">₹236,000</p>
              <p className="text-sm text-gray-500 mt-1">
                14.1% of total travel spend
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-500">
                Avg. Booking Time
              </h4>
              <p className="text-3xl font-bold text-gray-900 mt-1">6.4 days</p>
              <p className="text-sm text-gray-500 mt-1">
                vs. 14+ days required
              </p>
            </div>
          </div>
        </div>

        {/* Booking Timeline Analysis */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Booking Timeline Analysis
          </h3>

          <div className="h-64 border border-gray-200 rounded-lg p-4 bg-white">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={bookingTimelineData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f0f0f0"
                />
                <XAxis dataKey="days" />
                <YAxis yAxisId="left" orientation="left" stroke="#3b82f6" />
                <YAxis yAxisId="right" orientation="right" stroke="#ef4444" />
                <Tooltip />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="count"
                  name="Number of Bookings"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  yAxisId="right"
                  dataKey="excess"
                  name="Excess Cost (₹)"
                  fill="#ef4444"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-700">
                <span className="font-medium">Key finding:</span> The majority
                of bookings (18 out of 28) were made less than 7 days before
                travel, resulting in the highest price premiums. Bookings made
                0-3 days before travel incurred an average premium of ₹9,200 per
                booking (45% above baseline).
              </p>
            </div>
          </div>
        </div>

        {/* Monthly Trend */}
        <div className="grid grid-cols-2 gap-6 p-6 border-b border-gray-200">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Monthly Compliance Trend
            </h3>
            <div className="h-64 border border-gray-200 rounded-lg p-4 bg-white">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={monthlyTrendData}
                  margin={{ top: 10, right: 5, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f0f0f0"
                  />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="compliant"
                    name="Policy Compliant (%)"
                    stackId="1"
                    stroke="#22c55e"
                    fill="#dcfce7"
                  />
                  <Area
                    type="monotone"
                    dataKey="nonCompliant"
                    name="Non-Compliant (%)"
                    stackId="1"
                    stroke="#ef4444"
                    fill="#fee2e2"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3">
              <p className="text-sm text-gray-600">
                Non-compliant bookings more than doubled from March to April,
                jumping from 30% to 68%.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Team Compliance Analysis
            </h3>
            <div className="h-64 border border-gray-200 rounded-lg p-4 bg-white">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={teamBookingData}
                  layout="vertical"
                  margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    horizontal={false}
                    stroke="#f0f0f0"
                  />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis type="category" dataKey="team" width={100} />
                  <Tooltip />
                  <Bar
                    dataKey="compliant"
                    name="Compliant (%)"
                    stackId="a"
                    fill="#22c55e"
                  />
                  <Bar
                    dataKey="nonCompliant"
                    name="Non-Compliant (%)"
                    stackId="a"
                    fill="#ef4444"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3">
              <p className="text-sm text-gray-600">
                Coverage Team A has the highest non-compliance rate at 75%,
                followed by Coverage Team B at 60%.
              </p>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recommendations
          </h3>

          <div className="grid grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
              <div className="flex items-center mb-3">
                <CalendarClock className="h-5 w-5 text-blue-700 mr-2" />
                <h4 className="font-medium text-gray-900">
                  Short-term Actions
                </h4>
              </div>
              <ul className="space-y-2 mt-2">
                <li className="flex items-start">
                  <ChevronRight className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">
                    Send targeted reminder to Coverage Teams A & B about the
                    14-day booking policy
                  </p>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">
                    Implement approval workflow for bookings less than 14 days
                    in advance
                  </p>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">
                    Set up weekly alerts to managers for non-compliant bookings
                  </p>
                </li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 bg-indigo-50">
              <div className="flex items-center mb-3">
                <Users className="h-5 w-5 text-indigo-700 mr-2" />
                <h4 className="font-medium text-gray-900">
                  Policy Improvements
                </h4>
              </div>
              <ul className="space-y-2 mt-2">
                <li className="flex items-start">
                  <ChevronRight className="h-4 w-4 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">
                    Update booking system to flag non-compliant bookings at
                    request
                  </p>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-4 w-4 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">
                    Create quarterly travel planning process with team managers
                  </p>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-4 w-4 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">
                    Introduce escalation approval for bookings less than 7 days
                    before travel
                  </p>
                </li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 bg-green-50">
              <div className="flex items-center mb-3">
                <DollarSign className="h-5 w-5 text-green-700 mr-2" />
                <h4 className="font-medium text-gray-900">Expected Outcomes</h4>
              </div>
              <ul className="space-y-2 mt-2">
                <li className="flex items-start">
                  <ChevronRight className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">
                    Potential savings of ₹1.4M over the next 6 months
                  </p>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">
                    Reduce non-compliant bookings to under 20% by Q3 2025
                  </p>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">
                    Increase average booking window from 6.4 days to at least 16
                    days
                  </p>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
            <div className="flex items-start">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4 border border-blue-200 flex-shrink-0">
                <BarChart2 className="h-5 w-5 text-blue-700" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">
                  Projected Annual Savings
                </h4>
                <div className="flex items-baseline mt-1">
                  <span className="text-3xl font-bold text-gray-900">
                    ₹2.83M
                  </span>
                  <span className="ml-2 text-sm text-gray-600">
                    with improved compliance measures
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-700">
                  By focusing on the Coverage Teams and implementing a more
                  structured travel planning process, we can potentially save
                  ₹2.83M annually while maintaining operational flexibility.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 bg-gray-50 rounded-b-lg flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Download Full Report
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Schedule Review Meeting
            </button>
          </div>

          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
            View Action Plan
            <ArrowRight className="h-4 w-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingPatternPopup;

// // Demo component to show how the popup works
// const DemoWithTravelInsightPopup = () => {
//   const [showPopup, setShowPopup] = useState(false);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Travel Expense Dashboard Demo</h1>

//       <button
//         onClick={() => setShowPopup(true)}
//         className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors mb-4"
//       >
//         Show Booking Pattern Insight
//       </button>

//       {showPopup && <BookingPatternPopup />}

//       <div className="mt-4 text-gray-700">
//         <p>
//           Click the button above to open the travel booking pattern insight
//           popup.
//         </p>
//       </div>
//     </div>
//   );
// };

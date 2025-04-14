"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

// Simple UI components
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
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
    ghost: "text-gray-600 hover:bg-gray-100",
    link: "text-blue-600 underline-offset-4 hover:underline p-0 h-auto",
    risk: "bg-indigo-600 text-white hover:bg-indigo-700",
    analytics: "bg-indigo-600 text-white hover:bg-indigo-700",
    planning: "bg-teal-600 text-white hover:bg-teal-700",
    operations: "bg-orange-600 text-white hover:bg-orange-700",
    success: "bg-green-600 text-white hover:bg-green-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    warning: "bg-amber-600 text-white hover:bg-amber-700",
  };

  const sizeClasses = {
    default: "h-9 px-4 py-2",
    sm: "h-8 px-3 py-1 text-sm",
    lg: "h-11 px-6 py-3",
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
    primary: "bg-blue-100 text-blue-800",
    risk: "bg-indigo-100 text-indigo-800",
    analytics: "bg-indigo-100 text-indigo-800",
    planning: "bg-teal-100 text-teal-800",
    operations: "bg-orange-100 text-orange-800",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

// Icons
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

const Activity = ({ size = 24, className = "" }) => (
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
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
  </svg>
);

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

const Shield = ({ size = 24, className = "" }) => (
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
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

const BarChart = ({ size = 24, className = "" }) => (
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
    <line x1="18" y1="20" x2="18" y2="10"></line>
    <line x1="12" y1="20" x2="12" y2="4"></line>
    <line x1="6" y1="20" x2="6" y2="14"></line>
    <line x1="3" y1="20" x2="21" y2="20"></line>
  </svg>
);

const Target = ({ size = 24, className = "" }) => (
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
    <circle cx="12" cy="12" r="6"></circle>
    <circle cx="12" cy="12" r="2"></circle>
  </svg>
);

const FileCheck = ({ size = 24, className = "" }) => (
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
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <path d="m9 15 2 2 4-4"></path>
  </svg>
);

const Check = ({ size = 24, className = "" }) => (
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
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const CheckCircle = ({ size = 24, className = "" }) => (
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
    <path d="m9 12 2 2 4-4"></path>
  </svg>
);

const MessageCircle = ({ size = 24, className = "" }) => (
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
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

const Send = ({ size = 24, className = "" }) => (
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
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
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

const Eye = ({ size = 24, className = "" }) => (
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
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const ArrowRight = ({ size = 24, className = "" }) => (
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
    <path d="M5 12h14"></path>
    <path d="m12 5 7 7-7 7"></path>
  </svg>
);

const Brain = ({ size = 24, className = "" }) => (
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
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.04Z"></path>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.04Z"></path>
  </svg>
);

const Lightbulb = ({ size = 24, className = "" }) => (
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
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path>
    <path d="M9 18h6"></path>
    <path d="M10 22h4"></path>
  </svg>
);

// Chat component
const ChatBox = ({
  messages = [],
  onSend,
  placeholder = "Type a message...",
}) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      onSend(input);
      setInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs md:max-w-md rounded-lg p-3 ${
                message.sender === "user"
                  ? "bg-blue-100 text-blue-900"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t p-3 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button onClick={handleSend} className="px-3">
          <Send size={18} />
        </Button>
      </div>
    </div>
  );
};

// Agent card with status and intervention indicators
const AgentCard = ({
  title,
  icon,
  color,
  completedTasks = [],
  pendingTasks = [],
  onClick,
}) => {
  // Color variants for the cards
  const colors = {
    indigo: {
      bg: "bg-gradient-to-br from-indigo-50 to-indigo-100",
      border: "border-indigo-200",
      icon: "bg-indigo-600 text-white",
      text: "text-indigo-800",
      button: "bg-indigo-600 hover:bg-indigo-700",
    },
    teal: {
      bg: "bg-gradient-to-br from-teal-50 to-teal-100",
      border: "border-teal-200",
      icon: "bg-teal-600 text-white",
      text: "text-teal-800",
      button: "bg-teal-600 hover:bg-teal-700",
    },
    orange: {
      bg: "bg-gradient-to-br from-orange-50 to-orange-100",
      border: "border-orange-200",
      icon: "bg-orange-600 text-white",
      text: "text-orange-800",
      button: "bg-orange-600 hover:bg-orange-700",
    },
    blue: {
      bg: "bg-gradient-to-br from-blue-50 to-blue-100",
      border: "border-blue-200",
      icon: "bg-blue-600 text-white",
      text: "text-blue-800",
      button: "bg-blue-600 hover:bg-blue-700",
    },
  };

  const colorSet = colors[color] || colors.blue;

  return (
    <div
      className={`rounded-lg border ${colorSet.border} ${colorSet.bg} p-4 relative overflow-hidden`}
    >
      {/* Decorative elements to make it look more AI-like */}
      <div className="absolute top-0 right-0 w-24 h-24 opacity-5">
        <svg
          viewBox="0 0 100 100"
          fill="currentColor"
          className={colorSet.text}
        >
          <circle cx="50" cy="50" r="40" />
          <path
            d="M50 10 A40 40 0 0 1 90 50"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M50 10 A40 40 0 0 0 10 50"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      <div className="flex items-start gap-4 mb-2">
        <div className={`p-3 rounded-full ${colorSet.icon} shadow-md`}>
          {icon}
        </div>
        <div>
          <h3 className={`font-bold text-xl ${colorSet.text}`}>{title}</h3>
          <div className="flex items-center mt-1 text-gray-700">
            <CheckCircle size={16} className="text-green-600 mr-1.5" />
            <span className="text-sm">
              {completedTasks.length} tasks completed autonomously
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-2 ml-2">
        <div className="font-medium text-sm mb-1 text-gray-700">
          Completed autonomously:
        </div>
        {completedTasks.slice(0, 2).map((task, i) => (
          <div
            key={`completed-${i}`}
            className="flex items-start gap-2 bg-white bg-opacity-60 p-2 rounded-md shadow-sm"
          >
            <Check size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-700">{task}</span>
          </div>
        ))}
        {completedTasks.length > 2 && (
          <div className="text-xs text-gray-600 pl-6">
            +{completedTasks.length - 2} more tasks
          </div>
        )}
      </div>

      {pendingTasks.length > 0 && (
        <div className="space-y-2 mb-2 ml-2">
          <div className="font-medium text-sm mb-1 text-gray-700">
            Some insights for you:
          </div>
          {pendingTasks.slice(0, 2).map((task, i) => (
            <div
              key={`pending-${i}`}
              className="flex items-start gap-2 bg-white bg-opacity-60 p-2 rounded-md shadow-sm"
            >
              <div className="text-amber-600 mt-0.5 flex-shrink-0">💡</div>
              <span className="text-sm text-gray-700">{task}</span>
            </div>
          ))}
          {pendingTasks.length > 2 && (
            <div className="text-xs text-gray-600 pl-6">
              +{pendingTasks.length - 2} more insights
            </div>
          )}
        </div>
      )}

      <Button
        className={`w-full mt-2 ${colorSet.button} text-white shadow-md`}
        onClick={onClick}
      >
        <span>View Full Analysis</span>
      </Button>
    </div>
  );
};

// Priority Item card
const PriorityItem = ({
  title,
  description,
  tags = [],
  actions = [],
  type = "default",
}) => {
  const types = {
    default: "border-gray-200 bg-white",
    warning: "border-amber-200 bg-amber-50",
    danger: "border-red-200 bg-red-50",
    success: "border-green-200 bg-green-50",
  };

  return (
    <div className={`border ${types[type]} rounded-lg p-4`}>
      <h3 className="font-medium text-black">{title}</h3>
      <p className="text-sm text-gray-600 mt-1">{description}</p>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {tags.map((tag, i) => (
            <Badge
              key={i}
              variant={tag.variant || "default"}
              className="text-xs"
            >
              {tag.label}
            </Badge>
          ))}
        </div>
      )}

      {actions.length > 0 && (
        <div className="flex gap-2 mt-3">
          {actions.map((action, i) => (
            <Button key={i} variant={action.variant || "default"} size="sm">
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

// Finance Control Center
const FinanceControlCenter = () => {
  // Chat state for morning briefing
  const [briefingChat, setBriefingChat] = useState([
    {
      sender: "bot",
      text: "Good morning! Any specific information you'd like about today's financial status for House of Anita Dongre?",
    },
  ]);

  // Chat state for strategic insights
  const [strategicChat, setStrategicChat] = useState([
    {
      sender: "bot",
      text: "I've identified some strategic opportunities for House of Anita Dongre based on cross-functional data analysis. What aspect would you like to explore further?",
    },
  ]);

  const router = useRouter();

  // Handle chat messages
  const handleBriefingMessage = (text) => {
    setBriefingChat([
      ...briefingChat,
      { sender: "user", text },
      {
        sender: "bot",
        text: "I'm analyzing your question about today's updates...",
      },
    ]);
  };

  const handleStrategicMessage = (text) => {
    setStrategicChat([
      ...strategicChat,
      { sender: "user", text },
      {
        sender: "bot",
        text: "That's an interesting point about the strategic direction. Let me analyze further...",
      },
    ]);
  };

  return (
    <div className="flex flex-col w-full h-screen bg-gray-50 p-6 overflow-y-auto">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center">
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
              <path d="M20 7h-3a2 2 0 0 1-2-2V2"></path>
              <path d="M16 2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7"></path>
              <path d="M12 18v-6"></path>
              <path d="M8 18v-1"></path>
              <path d="M16 18v-3"></path>
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-black">
              House of Anita Dongre - Finance Control Center
            </h1>
            <p className="text-sm text-gray-500">
              Last updated: March 17, 2025 • 10:45 AM
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="success" className="flex items-center gap-1">
            <Activity size={14} />4 Agents Active
          </Badge>
        </div>
      </header>

      {/* Morning Briefing with Chat */}
      <h2 className="text-xl font-bold mb-4 text-black">
        Morning Financial Briefing
      </h2>
      <Card className="mb-8">
        <CardHeader className="border-b">
          <CardTitle className="text-black">Key Updates for Today</CardTitle>
        </CardHeader>
        <CardContent className="py-4">
          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle
                size={20}
                className="text-red-600 mt-0.5 flex-shrink-0"
              />
              <div>
                <p className="font-medium text-black">
                  Urgent attention needed
                </p>
                <p className="text-sm text-gray-600">
                  I've flagged a potential duplicate payment to Surat Silk
                  Suppliers (₹86,500). This appears to be for the same chiffon
                  fabric order processed twice.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar
                size={20}
                className="text-amber-600 mt-0.5 flex-shrink-0"
              />
              <div>
                <p className="font-medium text-black">Important deadlines</p>
                <p className="text-sm text-gray-600">
                  GSTR-3B filing due in 3 days, and quarterly TDS filing for
                  your 175+ artisans and contractors due in 5 days. I've
                  analyzed the data for both filings.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <TrendingUp
                size={20}
                className="text-green-600 mt-0.5 flex-shrink-0"
              />
              <div>
                <p className="font-medium text-black">
                  Positive financial updates
                </p>
                <p className="text-sm text-gray-600">
                  Q1 revenue exceeded plan by 9.3%, with the Ethnic
                  Ready-to-Wear line performing exceptionally well (+21%).
                  However, organic cotton costs increased by 12%.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-black">Today's priorities</p>
                <p className="text-sm text-gray-600">
                  I recommend reviewing the duplicate silk payment issue,
                  addressing the GSTR-3B filing, and examining the Bridal
                  collection margin decline despite the peak wedding season.
                </p>
              </div>
            </div>
          </div>

          {/* Chat interface integrated directly with the briefing */}
          <div className="border-t pt-4">
            <div className="bg-gray-50 p-3 rounded-lg mb-3">
              <p className="text-sm text-gray-600">
                Good morning! Any specific information you'd like about today's
                financial status for House of Anita Dongre?
              </p>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ask me anything about today's updates..."
                className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button className="px-3">
                <Send size={18} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Agent Entry Points */}
      <h2 className="text-xl font-bold mb-4 text-black">
        Your Finance AI Team
      </h2>
      <div className="grid grid-cols-2 gap-6 mb-8">
        <AgentCard
          title="Business Intelligence Agent"
          icon={<BarChart size={24} />}
          color="blue"
          completedTasks={[
            "Generated March financial statements for all 12 boutiques",
            "Analyzed profitability across Bridal, Ethnic, Prêt, and Western collections",
            "Prepared accounts receivable aging report for 28 retail partners",
            "Updated sell-through rates for Spring-Summer'25 collection",
          ]}
          pendingTasks={[
            "Bridal collection margin declined for 3rd consecutive month despite peak wedding season",
            "5 large B2B receivables totaling ₹38.5 lakhs due next week from multi-brand retailers",
            "Social media marketing ROI analysis shows declining Instagram performance vs TikTok",
          ]}
          onClick={() => {
            router.push("/business-intelligence");
          }}
        />

        <AgentCard
          title="Operational Efficiency Agent"
          icon={<FileCheck size={24} />}
          color="orange"
          completedTasks={[
            "Processed and validated 178 fabric and trim supplier invoices",
            "Completed 3-way matching for 132 production transactions",
            "Auto-approved 94% of invoices matching purchase orders for wholesale orders",
            "Identified payment optimization opportunities with seasonal suppliers",
          ]}
          pendingTasks={[
            "12 invoices from embroidery workshops have discrepancies in piece counts",
            "Jaipur Textiles consistently overbills by 7% on hand-block printed fabrics",
            "3 invoices from new sustainable fabric suppliers need verification",
          ]}
          onClick={() => {
            router.push("/dashboard");
          }}
        />
        <AgentCard
          title="Risk & Compliance Agent"
          icon={<Shield size={24} />}
          color="indigo"
          completedTasks={[
            "Reconciled 156 purchase invoices with GSTR-2A/2B",
            "Automatically matched 89% of fabric vendor invoices without issues",
            "Analyzed GST filing status for retail and e-commerce channels",
            "Verified TDS deductions for 92 garment contractors",
          ]}
          pendingTasks={[
            "Potential duplicate payment of ₹86,500 to Surat Silk Suppliers",
            "Invoice #RST-7754 from Rajasthan Textiles missing from GSTR-2B (₹18,720 ITC at risk)",
            "TDS not deducted for Elegant Embroidery Works' invoice EEW-078",
          ]}
          onClick={() => {
            router.push("/risk-and-compliance");
          }}
        />

        <AgentCard
          title="Budgeting and forecastingt"
          icon={<Target size={24} />}
          color="teal"
          completedTasks={[
            "Updated rolling forecast incorporating Lakme Fashion Week sales impact",
            "Prepared 3 scenarios for Fall-Winter'25 collection based on current trends",
            "Analyzed variance between Q1 actuals and seasonal forecast",
            "Updated cash flow projections for April-June production cycles",
          ]}
          pendingTasks={[
            "Cash flow timing issue detected for monsoon fabric procurement (₹42.6L shortfall)",
            "Organic cotton cost increases need to be factored into eco-friendly line pricing",
            "Q2-Q4 forecast needs review based on post-pandemic wedding season performance",
          ]}
          onClick={() => {
            router.push("/planning-forecasting");
          }}
        />
      </div>

      {/* <h2 className="text-xl font-bold mb-4 text-black">
        Things For You To Close Today
      </h2> */}
      {/* <div className="space-y-4 mb-8">
        <PriorityItem
          title="Potential Duplicate Payment - Surat Silk Suppliers"
          description="Two payments of ₹86,500 were made to Surat Silk Suppliers within 48 hours with identical descriptions for chiffon fabric supply (Invoice #SSS-4587 and #SSS-4587A). The Risk & Compliance Agent has flagged this for immediate review."
          type="danger"
          tags={[
            { label: "Urgent", variant: "danger" },
            { label: "Risk & Compliance", variant: "primary" },
            { label: "₹86,500 at risk", variant: "default" },
          ]}
          actions={[
            { label: "View Transactions", variant: "outline" },
            { label: "Review Details", variant: "danger" },
          ]}
        />

        <PriorityItem
          title="GSTR-3B Filing Due in 3 Days"
          description="Your monthly GST return (GSTR-3B) is due on March 20th. The Risk & Compliance Agent has analyzed all input tax credits from fabric and embellishment suppliers, identifying 14 invoices with GST discrepancies that need review."
          type="warning"
          tags={[
            { label: "High Priority", variant: "warning" },
            { label: "Risk & Compliance", variant: "primary" },
            { label: "Due: Mar 20", variant: "default" },
          ]}
          actions={[
            { label: "View Filing Data", variant: "outline" },
            { label: "Review Issues", variant: "warning" },
          ]}
        />

        <PriorityItem
          title="Bridal Collection Margin Declining"
          description="The Business Analytics Agent has identified that the Bridal collection's margin has declined for the third consecutive month, dropping from 62% to 54% despite peak wedding season. Gold thread and hand embroidery costs have increased 15% while bridal prices remained steady."
          type="warning"
          tags={[
            { label: "Business Analytics", variant: "primary" },
            { label: "Revenue Impact", variant: "warning" },
            { label: "8% Margin Decline", variant: "default" },
          ]}
          actions={[
            { label: "View Analysis", variant: "outline" },
            { label: "Run Pricing Scenario", variant: "warning" },
          ]}
        />

        <PriorityItem
          title="Large B2B Receivables Due Next Week"
          description="The Business Analytics Agent has identified 5 large receivables from multi-brand retailers totaling ₹38.5 lakhs due next week. These retail partners have historically paid 7-10 days late, which could impact your cash flow projection for the upcoming monsoon fabric procurement."
          type="default"
          tags={[
            { label: "Business Analytics", variant: "primary" },
            { label: "Cash Flow", variant: "default" },
            { label: "₹38.5 Lakhs", variant: "default" },
          ]}
          actions={[
            { label: "View Receivables", variant: "outline" },
            { label: "Prepare Follow-ups", variant: "default" },
          ]}
        />
      </div> */}

      {/* <h2 className="text-xl font-bold mb-4 text-black">
        Strategic Insights for Brainstorming
      </h2> */}
      {/* <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 rounded-lg border border-blue-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer">
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-blue-100 text-blue-700 rounded-full flex-shrink-0">
                <BarChart size={18} />
              </div>
              <h4 className="font-medium text-black">
                Ethnic Ready-to-Wear Growth
              </h4>
            </div>
            <p className="text-sm text-gray-600">
              The Ethnic Ready-to-Wear line is outperforming (+21%) with a 98.7%
              order fulfillment rate.
            </p>
            <div className="mt-3 flex items-center justify-between">
              <p className="text-xs font-medium text-blue-700">
                Expand production capacity?
              </p>
              <button className="text-blue-600 hover:bg-blue-100 p-1 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-teal-50 rounded-lg border border-teal-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer">
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-teal-100 text-teal-700 rounded-full flex-shrink-0">
                <Target size={18} />
              </div>
              <h4 className="font-medium text-black">
                Monsoon Procurement Cash Flow
              </h4>
            </div>
            <p className="text-sm text-gray-600">
              Projected ₹42.6L shortfall during monsoon fabric procurement with
              ₹38.5L in receivables due next week.
            </p>
            <div className="mt-3 flex items-center justify-between">
              <p className="text-xs font-medium text-teal-700">
                Coordinate collections strategy?
              </p>
              <button className="text-teal-600 hover:bg-teal-100 p-1 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-red-50 rounded-lg border border-red-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer">
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-red-100 text-red-700 rounded-full flex-shrink-0">
                <AlertCircle size={18} />
              </div>
              <h4 className="font-mediu text-black">
                Supplier Risk Assessment
              </h4>
            </div>
            <p className="text-sm text-gray-600">
              Jaipur Textiles shows overbilling patterns and represents 18% of
              fabric costs for the Ethnic collection.
            </p>
            <div className="mt-3 flex items-center justify-between">
              <p className="text-xs font-medium text-red-700">
                Develop secondary supplier?
              </p>
              <button className="text-red-600 hover:bg-red-100 p-1 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div> */}

      {/* <div className="mb-8">
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="border-b border-blue-200 bg-blue-100 bg-opacity-50">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-600 text-white rounded-full flex-shrink-0">
                <BarChart size={18} />
              </div>
              <CardTitle className="text-black">
                Ethnic Ready-to-Wear Growth Opportunity
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="py-4">
            <div className="space-y-3 mb-6">
              <p className="text-sm text-gray-700">
                The Ethnic Ready-to-Wear line is showing remarkable performance,
                with a 21% growth rate compared to last year. This trend appears
                to be consistent across all 12 boutiques and online channels.
              </p>

              <div className="bg-white bg-opacity-70 p-3 rounded-md shadow-sm">
                <p className="text-sm font-medium text-black">Key insights:</p>
                <ul className="mt-2 text-sm space-y-1">
                  <li className="flex items-start gap-2">
                    <div className="text-green-600 mt-0.5 flex-shrink-0">•</div>
                    <span className="text-black">
                      Planning & Forecasting confirms this trend is sustainable
                      based on market data
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="text-green-600 mt-0.5 flex-shrink-0">•</div>
                    <span>
                      Operational Efficiency shows 98.7% order fulfillment rate
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="text-green-600 mt-0.5 flex-shrink-0">•</div>
                    <span>
                      Social media engagement for this line is 43% higher than
                      other collections
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white bg-opacity-70 p-3 rounded-md shadow-sm">
                <p className="text-sm font-medium">Recommended strategy:</p>
                <p className="mt-1 text-sm">
                  Expand Ethnic Ready-to-Wear production capacity and increase
                  digital marketing allocation for this line by 15-20% in Q2.
                </p>
              </div>
            </div>

            <div className="border-t border-blue-200 pt-4">
              <div className="space-y-3 mb-4">
                <div className="bg-white bg-opacity-70 p-3 rounded-md shadow-sm">
                  <p className="text-sm text-gray-700">
                    I've analyzed the growth patterns in our Ethnic
                    Ready-to-Wear line. What aspects would you like to explore
                    to capitalize on this trend?
                  </p>
                </div>

                <div className="bg-indigo-100 p-3 rounded-md shadow-sm ml-8">
                  <p className="text-sm text-indigo-800">
                    What price points are performing best in this collection?
                  </p>
                </div>

                <div className="bg-white bg-opacity-70 p-3 rounded-md shadow-sm">
                  <p className="text-sm text-gray-700">
                    The mid-range price points (₹4,500-8,000) are showing the
                    strongest performance with a 28% growth rate. The premium
                    range (₹8,000-15,000) is growing at 19%, while the
                    entry-level pieces (₹2,500-4,500) show 15% growth.
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask something about this opportunity..."
                  className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button className="px-3 bg-blue-600 hover:bg-blue-700">
                  <Send size={18} />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div> */}
    </div>
  );
};

export default FinanceControlCenter;

import React from "react";
import Image from "next/image";

// Centralized data source
const briefingData = {
  header: {
    title: "Hi Jason, Your Morning Financial Briefing",
    subtitle: "Chat with me by selecting the card",
  },
  cards: [
    {
      id: "urgent",
      title: "Urgent attention needed",
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
    {
      id: "deadlines",
      title: "Important deadlines",
      content:
        "GSTR-3B filing due in 3 days, and quarterly TDS filing for your 175+ artisans and contractors due in 5 days. I've analyzed the data for both filings.",
      iconSymbol: "⊗",
      iconColor: "red",
    },
  ],
};

// Centralized data source
const dashboardData = {
  title: "Things For You To Close Today",
  cards: [
    {
      id: "duplicate-payment-1",
      icon: "⚠",
      iconColor: "text-orange-500",
      title: "Potential Duplicate Payment - Surat Silk Suppliers",
      description:
        "Two payments of ₹86,500 were made to Surat Silk Suppliers within 48 hours with identical descriptions for chiffon fabric supply (Invoice #SSS-4587 and #SSS-4587A). The Risk & Compliance Agent has flagged this for immediate review",
      tags: [
        { text: "Input Tax Credit at Risk", color: "bg-red-200 text-red-800" },
        { text: "Risk & Compliance", color: "text-gray-700", hasIcon: true },
        { text: "₹86,500 at risk", color: "text-gray-700" },
      ],
      buttons: [
        { text: "View Transaction", primary: false },
        { text: "Review Details", primary: true },
      ],
    },
    {
      id: "gstr-3b-filing",
      icon: "↻",
      iconColor: "text-blue-500",
      title: "GSTR-3B Filing Due in 3 Days",
      description:
        "Your monthly GST return (GSTR-3B) is due on March 20th. The Risk & Compliance Agent has analyzed all input tax credits from fabric and embellishment suppliers, identifying 14 invoices with GST discrepancies that need review.",
      tags: [
        { text: "High Priority", color: "bg-red-200 text-red-800" },
        { text: "Risk & Compliance", color: "text-gray-700", hasIcon: true },
        { text: "Due: Mar 20", color: "text-gray-700" },
      ],
      buttons: [
        { text: "View Filing Data", primary: false },
        { text: "Review Issues", primary: true },
      ],
    },
    {
      id: "duplicate-payment-2",
      icon: "⚠",
      iconColor: "text-orange-500",
      title: "Potential Duplicate Payment - Surat Silk Suppliers",
      description: "", // Empty as shown in the image
      tags: [],
      buttons: [],
    },
  ],
};

// Tag component for labels
const Tag = ({ text, color, hasIcon = false }) => {
  return (
    <div
      className={`inline-flex items-center px-3 py-1 text-sm rounded-md mr-3 ${color}`}
    >
      {hasIcon && <span className="mr-1 text-blue-500">◉</span>}
      {text}
    </div>
  );
};

// Button component
const Button = ({ text, primary }) => {
  const buttonClass = primary
    ? "bg-blue-600 text-white hover:bg-blue-700"
    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50";

  return (
    <button
      className={`px-6 py-1 rounded-full text-sm font-medium ${buttonClass} mr-3`}
    >
      {text}
    </button>
  );
};

// Card component for each item
const TaskCard = ({ card }) => {
  return (
    <div className="border border-gray-300 bg-[#F8F8F8] rounded-lg p-5 mb-4">
      <div className="flex items-start">
        <div className="mr-2">
          <span className={`${card.iconColor} text-xl`}>{card.icon}</span>
        </div>
        <div className="flex-1">
          <h3 className="text-blue-900 font-semibold mb-2">{card.title}</h3>
          {card.description && (
            <p className="text-gray-700 mb-3">{card.description}</p>
          )}

          {card.tags.length > 0 && (
            <div className="mb-4">
              {card.tags.map((tag, index) => (
                <Tag
                  key={index}
                  text={tag.text}
                  color={tag.color}
                  hasIcon={tag.hasIcon}
                />
              ))}
            </div>
          )}

          {card.buttons.length > 0 && (
            <div className="flex mt-2">
              {card.buttons.map((button, index) => (
                <Button
                  key={index}
                  text={button.text}
                  primary={button.primary}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ThingsToCloseToday = () => {
  return (
    <div className="p-5 bg-white border border-gray-300 rounded-xl">
      <h2 className="text-2xl font-bold text-[#001D5C] font-public-sans mb-4">
        {dashboardData.title}
      </h2>

      <div>
        {dashboardData.cards.map((card) => (
          <TaskCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

// Card component for each briefing item
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

const FinancialBriefingCard = () => {
  const { header, cards } = briefingData;

  return (
    <div className="bg-[#F8F8F8] h-screen">
      <div className="flex px-4 py-4">
        <div className="flex flex-col gap-y-6 p-4 rounded-xl mb-4 bg-[#001D5C] ">
          <div className="p-2 rounded-xl hover:bg-[#2154C4]">
            <Image src={"./icons/grid.svg"} height={24} width={24} alt="Grid" />
          </div>
          <div className="p-2 rounded-lg hover:bg-[#2154C4]">
            <Image
              src={"./icons/shield.svg"}
              height={24}
              width={24}
              alt="Grid"
            />
          </div>
          <div className="p-2 rounded-lg hover:bg-[#2154C4]">
            <Image
              src={"./icons/graph.svg"}
              height={24}
              width={24}
              alt="Grid"
            />
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
        <div className="flex-1 h-[98vh] overflow-y-auto mt-1 ml-4">
          <div className="flex items-center justify-start mb-3">
            <div className="">
              <Image
                src={"./icons/agent.svg"}
                height={48}
                width={48}
                alt="logo"
              />
            </div>
            <div className="ml-2 flex flex-col">
              <p className="text-[#001D5C] text-2xl font-bold">
                House of Anita Dongre - Finance Control Center
              </p>
              <p className="text-[#001D5C] text-sm font-normal">
                Last updated: March 17th March, 2025 | 10:45 AM
              </p>
            </div>
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

            <div className="grid grid-cols-2 gap-4 px-28 mb-10">
              {cards.map((card) => (
                <BriefingCard
                  key={card.id}
                  title={card.title}
                  content={card.content}
                  iconSymbol={card.iconSymbol}
                  iconColor={card.iconColor}
                />
              ))}
            </div>
          </div>
          <ThingsToCloseToday />
        </div>
      </div>
    </div>
  );
};

export default FinancialBriefingCard;

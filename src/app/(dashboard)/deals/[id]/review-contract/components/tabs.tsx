"use client";
import { useState } from "react";

interface Tab {
  id: number;
  label: string;
  content: React.ReactNode;
}

interface ITabsProps {
  tabs: Tab[];
}

export default function Tab({ tabs }: ITabsProps) {
  const [activeTab, setActiveTab] = useState<number>(tabs[0].id);

  return (
    <div>
      <div className="flex border-b border-gray-200 w-[85%]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`py-2 px-4 -mb-px border-b-2 ${
              activeTab === tab.id
                ? "border-morrie-primary text-black"
                : "border-transparent text-morrie-text"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>{tabs.find((tab) => tab.id === activeTab)?.content}</div>
    </div>
  );
}

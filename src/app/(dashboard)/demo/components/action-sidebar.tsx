"use client";

import { IDataProps, DataItem } from "./types"; // Adjust the path if necessary
import { Button } from "@/components/button";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

export const ActionSidebar = ({ data }: IDataProps) => {
  const [expandedSections, setExpandedSections] = useState<Set<number>>(
    new Set()
  );

  // Function to render key-value pairs
  const renderKeyValuePair = (key: string, value: string): React.ReactNode => (
    <div key={key} className="bg-white px-4 py-3 rounded-xl mb-3">
      <p className="text-xs text-[#A8A8A8] mb-2">{key}</p>
      <p className="text-sm text-black">{value}</p>
    </div>
  );

  // Recursive function to render sections
  const renderSection = (section: {
    key: string;
    value: any;
  }): React.ReactNode => {
    if (Array.isArray(section.value)) {
      // Render as list of items if the section value is an array
      return section.value.map((item, index) => (
        <div key={index} className="bg-white px-4 py-3 rounded-xl mb-3">
          {Object.entries(item).map(([key, value]) => (
            <div key={key}>
              {typeof value === "object" && value !== null ? (
                renderSection({ key, value })
              ) : (
                <p className="text-sm text-black">
                  {key}: {String(value)}
                </p>
              )}
            </div>
          ))}
        </div>
      ));
    } else if (typeof section.value === "object" && section.value !== null) {
      // Render as nested object if the section value is an object
      return Object.entries(section.value).map(([key, value]) =>
        renderSection({ key, value })
      );
    } else {
      // Render as single key-value pair if the section value is a primitive
      return renderKeyValuePair(section.key, String(section.value));
    }
  };

  const toggleSection = (index: number) => {
    setExpandedSections((prevExpandedSections) => {
      const newExpandedSections = new Set(prevExpandedSections);
      if (newExpandedSections.has(index)) {
        newExpandedSections.delete(index);
      } else {
        newExpandedSections.add(index);
      }
      return newExpandedSections;
    });
  };

  return (
    <div className="flex h-screen">
      <div className="w-[370px] bg-[#F6F6F6] flex flex-col no-scrollbar">
        {/* Sidebar content */}
        <div className="px-4 py-5 flex-1 overflow-y-auto no-scrollbar">
          {/* Render pdf_key_value_pairs */}
          {data.pdf_key_value_pairs.map((item) =>
            renderKeyValuePair(item.key, item.value)
          )}

          {/* Render additional_data sections */}
          {data.additional_data.map((section, index) => (
            <div key={index} className="mb-4">
              <div
                className="flex justify-between items-center bg-white px-4 py-3 rounded-xl cursor-pointer"
                onClick={() => toggleSection(index)}
              >
                <h2 className="font-nunito text-sm font-normal text-black">
                  {section.key}
                </h2>
                {expandedSections.has(index) ? (
                  <ChevronUpIcon className="text-gray-500 size-4" />
                ) : (
                  <ChevronDownIcon className="text-gray-500 size-4" />
                )}
              </div>
              {expandedSections.has(index) && (
                <div className="mt-2 bg-[#BAAE921A] px-4 py-3 rounded-xl">
                  {renderSection(section)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

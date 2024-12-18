"use client";

import React, { useState } from "react";
import {
  AdditionalFields,
  FieldWithHighlight,
  Flag,
  GstDetails,
  HighlightsContent,
  InvoiceDetails,
  LineItem,
  PartyDetails,
  Remarks,
  SezDetails,
  Signature,
  TdsDetails,
  Totals,
} from "../components/types";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

interface ISidebarProps {
  highlightsContent: HighlightsContent;
  resetHighlights: () => void;
  toggleDocument: () => void;
}

const updateHash = (field: FieldWithHighlight) => {
  if (field.highlight) {
    document.location.hash = `highlight-${field.highlight.id}`;
  }
};

export default function Sidebar({
  highlightsContent,
  resetHighlights,
  toggleDocument,
}: ISidebarProps) {
  const sectionNames = Object.keys(highlightsContent);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    Supplier: true,
  });

  const hasNonNullValue = (obj: Record<string, any>): boolean => {
    if ("value" in obj) {
      const value = obj.value;

      if (typeof value === "object" && value !== null) {
        // Check if any key in the object is non-null
        return Object.values(value).some((v) => v !== null);
      }

      // If value is not an object, ensure it is not null
      return value !== null;
    }

    return false;
  };

  const renderCompliance = (status: Flag | null, showMargin?: boolean) => {
    if (!status) return null;

    const statusColors = {
      positive: "bg-[#3C7167] text-[#3C7167]",
      negative: "bg-[#D63735] text-[#D63735]",
      warning: "bg-[#E58F3C] text-[#E58F3C]",
      neutral: "",
    };

    const statusMapping = {
      positive: "Compliant",
      negative: "Non-compliant",
      warning: "Partially compliant",
    };

    return (
      <div
        className={`${
          showMargin ? "mt-4" : ""
        } border-t-[0.5px] border-gray-200 pt-4 font-nunito font-normal leading-[18px]`}
      >
        <div className="flex justify-between items-center">
          <div
            className={`px-4 py-[2px] rounded-full text-[10px] bg-opacity-[30%] mb-[1px] ${
              statusColors[status.type ?? "neutral"]
            }`}
          >
            <p>{status.title}</p>
          </div>
        </div>
        <p className="text-sm font-nunito font-medium text-[#5D6977] mt-1">
          {status.description || ""}
        </p>
      </div>
    );
  };

  const toggleSection = (section: string) => {
    setOpenSections((prev) => {
      const allClosed: Record<string, boolean> = {};

      const isCurrentlyOpen = prev[section];
      if (!isCurrentlyOpen) {
        allClosed[section] = true;
      }

      return allClosed;
    });
  };

  const formatKey = (key: string) =>
    key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

  const isComplianceStatus = (value: unknown): value is Flag => {
    return (
      typeof value === "object" &&
      value !== null &&
      "title" in value &&
      "type" in value &&
      (value.type === "positive" ||
        value.type === "negative" ||
        value.type === "warning")
    );
  };

  const hasMultipleValues = (field?: FieldWithHighlight) => {
    if (!field || typeof field.value !== "object" || field.value === null)
      return false;
    return Object.keys(field.value).length > 1;
  };

  const renderField = (label: string, field?: FieldWithHighlight) => {
    if (!field || field.value === null) return null;

    const isMultiValue = hasMultipleValues(field);
    const hasValues = isMultiValue ? hasNonNullValue(field) : true;

    if (!hasValues) return null;

    if (!isMultiValue) {
      return (
        <div
          className="cursor-pointer px-4 py-2 border border-transparent rounded-md hover:border-[#BAAE92]"
          onClick={() => updateHash(field)}
        >
          <p className="text-sm font-nunito font-medium text-gray-400 mb-1">
            {formatKey(String(label))}
          </p>
          <div className="flex w-full justify-between">
            <p className="text-sm">{field.value?.toString()}</p>
            {field.flag && (
              <span
                className={`px-4 py-[2px] rounded-full text-[10px] bg-opacity-[30%] mb-[1px] ${
                  field.flag.type === "positive"
                    ? "bg-[#3C7167] text-[#3C7167]"
                    : field.flag.type === "negative"
                    ? "bg-[#D63735] text-[#D63735]"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {field.flag.title}
              </span>
            )}
          </div>
        </div>
      );
    }

    return (
      <div
        className="cursor-pointer px-4 py-2 border border-transparent rounded-md hover:border-[#BAAE92]"
        onClick={() => updateHash(field)}
      >
        <div className="flex justify-between items-center cursor-pointer">
          <p className="text-sm font-nunito font-medium text-gray-400 mb-1">
            {label}
          </p>
        </div>

        <div className="mt-2 pl-2 border-l-2 border-gray-100">
          {Object.entries(field.value!).map(([key, value]) => {
            if (!value || value === null) return null;
            return (
              <div key={key} className="mb-3">
                <p className="text-sm font-nunito font-medium text-gray-400">
                  {formatKey(String(key))}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-sm">{value?.toString() || "N/A"}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Render nested section (line items)
  const renderNestedSection = (sectionName: string, items: LineItem[]) => {
    const isOpen = openSections[sectionName] || false;

    return (
      <div
        key={sectionName}
        className="mb-3 border rounded-lg bg-[#BAAE921A] text-black font-nunito"
      >
        <div
          className="flex justify-between items-center p-4 cursor-pointer"
          onClick={() => toggleSection(sectionName)}
        >
          <h3 className="text-md font-medium font-nunito text-black">
            {sectionName}
          </h3>
          <span className="text-gray-400">
            {isOpen ? (
              <ChevronUpIcon className="w-4 h-4 text-[#7F7F7F]" />
            ) : (
              <ChevronDownIcon className="w-4 h-4 text-[#7F7F7F]" />
            )}
          </span>
        </div>

        {isOpen && (
          <div className="px-4">
            {items.map((item, index) => {
              const sectionKeys = Object.keys(item).filter(
                (key) => key !== "flag"
              ) as Array<keyof typeof item>;

              return (
                <div key={index} className="mb-4">
                  <div
                    className="bg-white rounded-lg"
                    style={{ boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)" }}
                  >
                    {sectionKeys.map((key, index) => {
                      if (key === "flag") return null;
                      return (
                        <div key={`${sectionName}-${String(key)}`}>
                          {renderField(
                            formatKey(String(key)),
                            item[key] ?? undefined
                          )}
                        </div>
                      );
                    })}

                    {item.flag && renderCompliance(item.flag, false)}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const isSectionEmpty = (obj: Record<string, any>): boolean => {
    return !Object.values(obj).some((entry) => {
      if (entry && typeof entry === "object" && "value" in entry) {
        return entry.value !== null && entry.value !== undefined;
      }
      return false;
    });
  };

  const renderFlatSection = (
    sectionName: string,
    sectionData:
      | PartyDetails
      | InvoiceDetails
      | SezDetails
      | TdsDetails
      | Totals
      | Signature
      | GstDetails
      | Remarks
      | AdditionalFields
  ) => {
    const isOpen = openSections[sectionName] || false;
    const sectionKeys = Object.keys(sectionData).filter(
      (key) => key !== "flag"
    ) as Array<keyof typeof sectionData>;

    const isEmpty = isSectionEmpty(sectionData);
    if (isEmpty) return null;

    return (
      <div
        key={sectionName}
        className="mb-4 border rounded-lg bg-[#BAAE921A] font-nunito"
      >
        <div
          className="flex justify-between items-center px-4 py-4 cursor-pointer"
          onClick={() => toggleSection(sectionName)}
        >
          <h3 className="text-md font-medium font-nunito text-black">
            {sectionName}
          </h3>
          <span className="text-gray-400">
            {isOpen ? (
              <ChevronUpIcon className="w-4 h-4 text-[#7F7F7F]" />
            ) : (
              <ChevronDownIcon className="w-4 h-4 text-[#7F7F7F]" />
            )}
          </span>
        </div>

        {isOpen && (
          <div className="px-4 pb-4">
            <div
              className="bg-white rounded-lg"
              style={{ boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)" }}
            >
              {sectionKeys.map((key) => {
                if (key === "flag") return null;
                return (
                  <div key={`${sectionName}-${key}`}>
                    {renderField(formatKey(key), sectionData[key])}
                  </div>
                );
              })}

              {sectionData.flag && renderCompliance(sectionData.flag)}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-screen">
      <div className="w-[370px] bg-[#F6F6F6] overflow-y-auto no-scrollbar">
        <h2 className="font-nunito font-semibold text-md text-black px-4 mt-4 py-2">
          Extracted Data
        </h2>

        <div className="mt-4">
          {sectionNames.map((sectionName: string) => {
            if (sectionName === "line_items") {
              return (
                <div key={sectionName} className="mb-3 px-4 text-black">
                  {renderNestedSection(
                    formatKey("Line Items"),
                    highlightsContent.line_items
                  )}
                </div>
              );
            }
            return (
              <div key={sectionName} className="mb-3 px-4 text-black">
                {renderFlatSection(
                  formatKey(sectionName),
                  (highlightsContent as Record<string, any>)[sectionName]
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

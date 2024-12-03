import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

export interface Flag {
  title: string;
  description: string | null;
  type: "positive" | "negative" | "neutral";
}

export interface FieldValue {
  value: string | number | boolean;
  flag: Flag | null;
}

export interface ComplianceStatus {
  title: string;
  description: string | null;
  type: "positive" | "negative" | "warning";
}

export interface BaseSection {
  name: FieldValue;
  address?: FieldValue;
  gstin?: FieldValue;
  state?: FieldValue;
  state_code?: FieldValue;
  flag: ComplianceStatus | null;
}

export interface LineItem {
  item_number: FieldValue;
  hsn_code: FieldValue;
  quantity?: FieldValue;
  description?: FieldValue;
  unit_price?: FieldValue;
  taxable_value?: FieldValue;
  tax_rate?: FieldValue;
  tax_amount: FieldValue;
  total_value: FieldValue;
  flag: ComplianceStatus | null;
}

export interface InvoiceDetails {
  number: FieldValue;
  date: FieldValue;
  place_of_supply: FieldValue;
  reverse_charge_applicable: FieldValue;
  flag: ComplianceStatus | null;
}

export interface SezDetails {
  declaration: FieldValue;
  lut_number: FieldValue;
  lut_validity: FieldValue;
  flag: ComplianceStatus | null;
}

export interface TdsDetails {
  lower_deduction_applicable: FieldValue;
  flag: ComplianceStatus | null;
}

export interface Totals {
  taxable_value: FieldValue;
  tax_amount: FieldValue;
  rounding: FieldValue;
  invoice_total: FieldValue;
  flag: ComplianceStatus | null;
}

export interface Signature {
  authorized_signatory: FieldValue;
  flag: ComplianceStatus | null;
}

export interface SidebarData {
  supplier: BaseSection;
  buyer: BaseSection;
  consignee: BaseSection;
  invoice_details: InvoiceDetails;
  sez_details: SezDetails;
  tds_details: TdsDetails;
  line_items: LineItem[];
  totals: Totals;
  signature: Signature;
}

interface SidebarProps {
  data: SidebarData;
}

const Sidebar = ({ data }: SidebarProps) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    Supplier: true,
  });
  const [openFields, setOpenFields] = useState<Record<string, boolean>>({});
  const [openInnerSections, setOpenInnerSections] = useState<
    Record<string, boolean>
  >({
    Supplier: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => {
      // Create a new object with all sections closed
      const allClosed: Record<string, boolean> = {};

      // Toggle the clicked section (if it was open, it will close; if it was closed, it will open)
      const isCurrentlyOpen = prev[section];
      if (!isCurrentlyOpen) {
        allClosed[section] = true;
      }

      return allClosed;
    });
    setOpenInnerSections({}); // Close all inner sections when a new outer section is opened/closed
  };

  const toggleInnerSection = (sectionName: string) => {
    setOpenInnerSections((prev) => {
      // Create a new object with all sections closed
      const allClosed: Record<string, boolean> = {};

      // Toggle the clicked section (if it was open, it will close; if it was closed, it will open)
      const isCurrentlyOpen = prev[sectionName];
      if (!isCurrentlyOpen) {
        allClosed[sectionName] = true;
      }

      return allClosed;
    });
  };

  const toggleField = (fieldId: string) => {
    setOpenFields((prev) => ({
      ...prev,
      [fieldId]: !prev[fieldId],
    }));
  };
  // Helper function to check if a field has multiple values
  const hasMultipleValues = (field?: FieldValue) => {
    if (!field || typeof field.value !== "object") return false;
    return Object.keys(field.value).length > 1;
  };

  // Render compliance status
  const renderCompliance = (
    status: ComplianceStatus | null,
    showMargin?: boolean
  ) => {
    if (!status) return null;

    const statusColors = {
      positive: "bg-[#3C7167] text-[#3C7167]",
      negative: "bg-[#D63735] text-[#D63735]",
      warning: "bg-[#E58F3C] text-[#E58F3C]",
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
              statusColors[status.type] || ""
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

  // Render field with potential nested values
  const renderField = (label: string, field?: FieldValue, fieldId?: string) => {
    if (!field) return null;

    const isMultiValue = hasMultipleValues(field);
    const isOpen = fieldId ? openFields[fieldId] : false;

    if (!isMultiValue) {
      return (
        <div className="mb-4">
          <p className="text-sm font-nunito font-medium text-gray-400 mb-1">
            {label}
          </p>
          <div className="flex w-full justify-between">
            <p className="text-sm">{field.value?.toString() || "N/A"}</p>
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
      <div className="mb-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => fieldId && toggleField(fieldId)}
        >
          <p className="text-sm font-nunito font-medium text-gray-400 mb-1">
            {label}
          </p>
          <span className="text-gray-400">
            {isOpen ? (
              <ChevronUpIcon className="w-3 h-3 text-[#7F7F7F]" />
            ) : (
              <ChevronDownIcon className="w-3 h-3 text-[#7F7F7F]" />
            )}
          </span>
        </div>

        {!isOpen ? (
          <div className="flex items-center justify-between">
            <p className="text-sm">
              {Object.values(field.value)[0]?.toString() || "N/A"}
            </p>
          </div>
        ) : (
          <div className="mt-2 pl-2 border-l-2 border-gray-100">
            {Object.entries(field.value).map(([key, value]) => (
              <div key={key} className="mb-3">
                <p className="text-sm font-nunito font-medium text-gray-400">
                  {key}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-sm">{value?.toString() || "N/A"}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Render flat section
  // Type guard to check if a value is of type ComplianceStatus
  const isComplianceStatus = (value: unknown): value is ComplianceStatus => {
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

  const renderFlatSection = (
    sectionName: string,
    sectionData:
      | BaseSection
      | InvoiceDetails
      | SezDetails
      | TdsDetails
      | Totals
      | Signature
  ) => {
    const isOpen = openSections[sectionName] || false;
    const isInnerOpen = openInnerSections[sectionName] || false;

    const sectionKeys = Object.keys(sectionData).filter(
      (key) => key !== "flag"
    ) as Array<keyof typeof sectionData>;

    const hasMultipleFields = sectionKeys.length > 1;
    const firstFieldKey = sectionKeys[0];
    const firstFieldValue = sectionData[firstFieldKey] || undefined;

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
              className="bg-white rounded-lg px-4 py-3"
              style={{ boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="flex justify-between items-start">
                <div className="w-full">
                  {!isComplianceStatus(firstFieldValue) &&
                    renderField(
                      formatKey(firstFieldKey),
                      firstFieldValue,
                      firstFieldKey
                    )}
                </div>
                {hasMultipleFields && (
                  <div
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleInnerSection(sectionName);
                    }}
                  >
                    {isInnerOpen ? (
                      <ChevronUpIcon className="w-4 h-4 text-[#7F7F7F]" />
                    ) : (
                      <ChevronDownIcon className="w-4 h-4 text-[#7F7F7F]" />
                    )}
                  </div>
                )}
              </div>

              {isInnerOpen &&
                sectionKeys.map((key, index) => {
                  if (index === 0 || key === "flag") return null;
                  return (
                    <div key={`${sectionName}-${key}`}>
                      {renderField(
                        formatKey(key),
                        sectionData[key] ?? "N/A",
                        `${sectionName}-${String(key)}`
                      )}
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

  /**
   * Helper function to format keys for display.
   * Converts snake_case to Title Case.
   */
  const formatKey = (key: string) =>
    key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

  // Render nested section (line items)
  const renderNestedSection = (sectionName: string, items: LineItem[]) => {
    const isOpen = openSections[sectionName] || false;

    return (
      <div
        key={sectionName}
        className="mb-3 border rounded-lg bg-[#BAAE921A] mx-4 text-black font-nunito"
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
              const isInnerOpen =
                openInnerSections[`${sectionName}_${index}`] || false;
              const sectionKeys = Object.keys(item).filter(
                (key) => key !== "flag"
              ) as Array<keyof typeof item>;

              const hasMultipleFields = sectionKeys.length > 1;
              const firstFieldKey = sectionKeys[0];
              const firstFieldValue = item[firstFieldKey] || undefined;

              return (
                <div key={index} className="mb-4">
                  <div
                    className="bg-white rounded-lg p-4"
                    style={{ boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)" }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        {!isComplianceStatus(firstFieldValue) &&
                          renderField(
                            formatKey(firstFieldKey),
                            firstFieldValue,
                            firstFieldKey
                          )}
                      </div>
                      {hasMultipleFields && (
                        <div
                          className="cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleInnerSection(`${sectionName}_${index}`);
                          }}
                        >
                          {isInnerOpen ? (
                            <ChevronUpIcon className="w-4 h-4 text-[#7F7F7F]" />
                          ) : (
                            <ChevronDownIcon className="w-4 h-4 text-[#7F7F7F]" />
                          )}
                        </div>
                      )}
                    </div>

                    {isInnerOpen &&
                      sectionKeys.map((key, index) => {
                        if (index === 0 || key === "flag") return null;
                        return (
                          <div key={`${sectionName}-${key}`}>
                            {renderField(
                              formatKey(key),
                              item[key] ?? undefined,
                              `${sectionName}-${String(key)}`
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

  return (
    <div className="w-[450px] bg-[#F6F6F6] overflow-y-auto no-scrollbar">
      <div>
        <h2 className="font-nunito font-semibold text-md text-black px-4 mt-4 py-2">
          Extracted Data
        </h2>
      </div>
      <div className="px-4 mb-3 text-black">
        {renderFlatSection("Supplier", data.supplier)}
      </div>
      <div className="mb-3 px-4 text-black">
        {renderFlatSection("Buyer", data.buyer)}
      </div>
      <div className="mb-3 px-4 text-black">
        {renderFlatSection("Consignee", data.consignee)}
      </div>
      <div className="mb-3 px-4 text-black">
        {renderFlatSection("Invoice Details", data.invoice_details)}
      </div>
      <div className="mb-3 px-4 text-black">
        {renderFlatSection("SEZ Details", data.sez_details)}
      </div>
      <div className="mb-3 px-4 text-black">
        {renderFlatSection("TDS Details", data.tds_details)}
      </div>
      {renderNestedSection("Line Items", data.line_items)}
      <div className="mb-3 px-4 text-black">
        {renderFlatSection("Totals", data.totals)}
      </div>
      <div className="mb-3 px-4 text-black">
        {renderFlatSection("Signature", data.signature)}
      </div>
    </div>
  );
};

export default Sidebar;

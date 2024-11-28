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
  // Initialize with Supplier section open by default
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    Supplier: true,
  });

  const [openFields, setOpenFields] = useState<Record<string, boolean>>({});

  // Toggle function for main sections
  const toggleSection = (section: string) => {
    setOpenSections((prev) => {
      // If clicking the same section that's already open, close it
      if (prev[section]) {
        return {
          ...prev,
          [section]: false,
        };
      }

      // Close all sections and open the clicked one
      return {
        ...Object.keys(prev).reduce(
          (acc, key) => ({ ...acc, [key]: false }),
          {}
        ),
        [section]: true,
      };
    });
  };

  // Toggle function for nested fields
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
  const renderCompliance = (status: ComplianceStatus | null) => {
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
      <div className="mt-4 border-t-[0.5px] border-gray-200 pt-4 font-nunito font-normal leading-[18px]">
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
          <div className="flex items-center justify-between">
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
              <div key={key} className="mb-2">
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

    return (
      <div
        key={sectionName}
        className="mb-2 border rounded-lg bg-[#BAAE921A] font-nunito"
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
          <div className="p-4">
            <div
              className="bg-white rounded-lg p-4"
              style={{ boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)" }}
            >
              {"name" in sectionData &&
                renderField("Name", sectionData.name, `${sectionName}-name`)}
              {"address" in sectionData &&
                renderField(
                  "Address",
                  sectionData.address,
                  `${sectionName}-address`
                )}
              {"gstin" in sectionData &&
                renderField("GSTIN", sectionData.gstin, `${sectionName}-gstin`)}
              {"state" in sectionData &&
                renderField("State", sectionData.state, `${sectionName}-state`)}
              {"state_code" in sectionData &&
                renderField(
                  "State Code",
                  sectionData.state_code,
                  `${sectionName}-state-code`
                )}

              {"number" in sectionData &&
                renderField(
                  "Invoice Number",
                  sectionData.number,
                  `${sectionName}-number`
                )}
              {"date" in sectionData &&
                renderField("Date", sectionData.date, `${sectionName}-date`)}
              {"place_of_supply" in sectionData &&
                renderField(
                  "Place of Supply",
                  sectionData.place_of_supply,
                  `${sectionName}-pos`
                )}

              {"declaration" in sectionData &&
                renderField(
                  "Declaration",
                  sectionData.declaration,
                  `${sectionName}-declaration`
                )}
              {"lut_number" in sectionData &&
                renderField(
                  "LUT Number",
                  sectionData.lut_number,
                  `${sectionName}-lut-number`
                )}
              {"lut_validity" in sectionData &&
                renderField(
                  "LUT Validity",
                  sectionData.lut_validity,
                  `${sectionName}-lut-validity`
                )}

              {"lower_deduction_applicable" in sectionData &&
                renderField(
                  "Lower Deduction Applicable",
                  sectionData.lower_deduction_applicable,
                  `${sectionName}-lda`
                )}

              {"taxable_value" in sectionData &&
                renderField(
                  "Taxable Value",
                  sectionData.taxable_value,
                  `${sectionName}-taxable-value`
                )}
              {"tax_amount" in sectionData &&
                renderField(
                  "Tax Amount",
                  sectionData.tax_amount,
                  `${sectionName}-tax-amount`
                )}
              {"rounding" in sectionData &&
                renderField(
                  "Rounding",
                  sectionData.rounding,
                  `${sectionName}-rounding`
                )}
              {"invoice_total" in sectionData &&
                renderField(
                  "Invoice Total",
                  sectionData.invoice_total,
                  `${sectionName}-invoice-total`
                )}

              {"authorized_signatory" in sectionData &&
                renderField(
                  "Authorized Signatory",
                  sectionData.authorized_signatory,
                  `${sectionName}-auth-sign`
                )}

              {sectionData.flag && renderCompliance(sectionData.flag)}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render nested section (line items)
  const renderNestedSection = (sectionName: string, items: LineItem[]) => {
    const isOpen = openSections[sectionName] || false;

    return (
      <div
        key={sectionName}
        className="mb-6 border rounded-lg bg-[#BAAE921A] mx-4 text-black font-nunito"
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
            {items.map((item, index) => (
              <div key={index} className="mb-4">
                <div
                  className="bg-white rounded-lg p-4"
                  style={{ boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)" }}
                >
                  {renderField(
                    "Item Name",
                    item.item_number,
                    `item-${index}-number`
                  )}
                  {renderField("HSN CODE", item.hsn_code, `item-${index}-hsn`)}
                  {item.quantity &&
                    renderField("Quantity", item.quantity, `item-${index}-qty`)}
                  {item.unit_price &&
                    renderField(
                      "Unit Price",
                      item.unit_price,
                      `item-${index}-price`
                    )}
                  {item.taxable_value &&
                    renderField(
                      "Taxable Value",
                      item.taxable_value,
                      `item-${index}-taxable`
                    )}
                  {item.tax_rate &&
                    renderField(
                      "Tax Rate",
                      item.tax_rate,
                      `item-${index}-tax-rate`
                    )}
                  {renderField(
                    "Tax Amount",
                    item.tax_amount,
                    `item-${index}-tax-amount`
                  )}
                  {renderField(
                    "Total Value",
                    item.total_value,
                    `item-${index}-total`
                  )}

                  {item.flag && renderCompliance(item.flag)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-[450px] bg-[#F6F6F6] overflow-y-auto no-scrollbar">
      <div className="px-4 mt-4 text-black">
        {renderFlatSection("Supplier", data.supplier)}
      </div>
      <div className="mb-6 px-4 text-black">
        {renderFlatSection("Buyer", data.buyer)}
      </div>
      <div className="mb-6 px-4 text-black">
        {renderFlatSection("Consignee", data.consignee)}
      </div>
      <div className="mb-6 px-4 text-black">
        {renderFlatSection("Invoice Details", data.invoice_details)}
      </div>
      <div className="mb-6 px-4 text-black">
        {renderFlatSection("SEZ Details", data.sez_details)}
      </div>
      <div className="mb-6 px-4 text-black">
        {renderFlatSection("TDS Details", data.tds_details)}
      </div>
      {renderNestedSection("Line Items", data.line_items)}
      <div className="mb-6 px-4 text-black">
        {renderFlatSection("Totals", data.totals)}
      </div>
      <div className="mb-6 px-4 text-black">
        {renderFlatSection("Signature", data.signature)}
      </div>
    </div>
  );
};

export default Sidebar;

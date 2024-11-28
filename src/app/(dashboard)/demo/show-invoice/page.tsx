"use client";
import React, { useEffect, useState } from "react";
import { useStorage } from "@/context/StorageContext";
import PDFViewer from "../../components/pdf-viewer";
import { ActionSidebar } from "../components/action-sidebar";
import { useDocumentData } from "@/context/document-data-context";
import { PDFLoadingSkeleton } from "@/components/pdf-loading-skeleton";
import Sidebar, { SidebarData } from "./components/sidebar";

// Assuming this data structure is fetched from an API or passed as props.
// const data = {
//   pdf_key_value_pairs: [
//     { key: "Tel:", value: "(312) 555-4567" },
//     { key: "Fax:", value: "(312) 555-4568" },
//     { key: "NPI:", value: "9876543210" },
//     { key: "Tax ID:", value: "36-7890123" },
//     { key: "CLIA #:", value: "14D0123456" },
//     { key: "Invoice No.", value: "ADI-2024-95632" },
//     { key: "Date of Service", value: "October 15, 2024" },
//     { key: "Patient Account", value: "MRN-789012" },
//     { key: "Insurance Claim", value: "ICN-2024-123456" },
//     { key: "Date Billed", value: "November 7, 2024" },
//     { key: "Due Date", value: "December 7, 2024" },
//     { key: "Name:", value: "REDACTED (HIPAA Compliance)" },
//     { key: "DOB:", value: "XX/XX/1975" },
//     { key: "Account #:", value: "789012" },
//     { key: "Primary Insurance:", value: "Blue Cross Blue Shield" },
//     { key: "Policy #:", value: "BCBS-XXX-YY-ZZZZ" },
//     { key: "Group #:", value: "123456" },
//     { key: "REFERRING PHYSICIAN:", value: "Dr. Sarah Johnson, MD" },
//     { key: "License #:", value: "036.123456" },
//     { key: "Subtotal -", value: "$1,325.00" },
//     { key: "Subtotal - Additional", value: "$195.00" },
//     { key: "Total Charges", value: "$11,110.00" },
//     { key: "Insurance Contractual Adjustment", value: "-$3,640.00" },
//     { key: "Insurance Payment", value: "-$5,964.00" },
//     { key: "Patient Coinsurance (20%)", value: "$1,494.00" },
//     { key: "Patient Deductible", value: "$500.00" },
//     { key: "Previous Patient Payments", value: "-$0.00" },
//     { key: "Patient Responsibility", value: "$1,994.00" },
//     { key: "PROFESSEUR :", value: "M.DA ROS" },
//   ],
//   additional_data: [
//     {
//       key: "header_information",
//       value: {
//         invoice_number: "ADI-2024-95632",
//         invoice_date: "November 7, 2024",
//         due_date: "December 7, 2024",
//         date_of_service: "October 15, 2024",
//         patient_account: "MRN-789012",
//         insurance_claim: "ICN-2024-123456",
//       },
//     },
//     {
//       key: "party_information",
//       value: {
//         seller_details: {
//           name: "ADVANCED DIAGNOSTIC IMAGING CENTER",
//           address: "Three Medical Plaza Chicago, IL 60612",
//           tel: "(312) 555-4567",
//           fax: "(312) 555-4568",
//           npi: "1234567890",
//           tax_id: "36-7890123",
//           clia: "14D0123456",
//         },
//         customer_details: {
//           name: "REDACTED (HIPAA Compliance)",
//           dob: "XX/XX/1975",
//           account_number: "789012",
//           primary_insurance: "Blue Cross Blue Shield",
//           policy_number: "BCBS-XXX-YY-ZZZZ",
//           group_number: "123456",
//         },
//         referring_physician: {
//           name: "Dr. Sarah Johnson, MD",
//           npi: "9876543210",
//           license_number: "036.123456",
//         },
//       },
//     },
//     {
//       key: "line_items",
//       value: [
//         {
//           cpt_code: "70553",
//           description: "MRI Brain w/wo Contrast",
//           quantity: 1,
//           fee: "$3,200.00",
//           allowed: "$1,850.00",
//           amount: "$1,850.00",
//         },
//         {
//           cpt_code: "72148",
//           description: "MRI Lumbar Spine w/o Contrast",
//           quantity: 1,
//           fee: "$2,800.00",
//           allowed: "$1,650.00",
//           amount: "$1,650.00",
//         },
//         {
//           cpt_code: "77046",
//           description: "MRI Breast Unilateral",
//           quantity: 1,
//           fee: "$1,950.00",
//           allowed: "$1,200.00",
//           amount: "$1,200.00",
//         },
//         {
//           cpt_code: "73221",
//           description: "MRI Joint Upr Extrem w/o Contrast",
//           quantity: 1,
//           fee: "$2,100.00",
//           allowed: "$1,250.00",
//           amount: "$1,250.00",
//         },
//         {
//           cpt_code: "76498-26",
//           description: "Professional Component - MRI",
//           quantity: 4,
//           fee: "$450.00",
//           allowed: "$275.00",
//           amount: "$1,100.00",
//         },
//         {
//           cpt_code: "99242",
//           description: "Radiology Consultation",
//           quantity: 1,
//           fee: "$350.00",
//           allowed: "$225.00",
//           amount: "$225.00",
//         },
//         {
//           cpt_code: "A9579",
//           description: "Contrast Material",
//           quantity: 2,
//           fee: "$125.00",
//           allowed: "$85.00",
//           amount: "$170.00",
//         },
//         {
//           cpt_code: "99072",
//           description: "COVID Safety Supplies",
//           quantity: 1,
//           fee: "$35.00",
//           allowed: "$25.00",
//           amount: "$25.00",
//         },
//       ],
//     },
//     {
//       key: "totals",
//       value: {
//         subtotal_imaging: "$5,950.00",
//         subtotal_professional: "$1,325.00",
//         subtotal_additional: "$195.00",
//         total_charges: "$11,110.00",
//         insurance_contractual_adjustment: "-$3,640.00",
//         insurance_payment: "-$5,964.00",
//         patient_coinsurance: "$1,494.00",
//         patient_deductible: "$500.00",
//         previous_patient_payments: "-$0.00",
//         patient_responsibility: "$1,994.00",
//       },
//     },
//   ],
//   file_url:
//     "https://storage.googleapis.com/morrie-resources/documents/invoice-3.pdf",
//   pdf_url: "/documents/contracts/paxmedica.pdf",
//   document_type: "invoice",
// };
const data = {
  supplier: {
    name: {
      value: "CloudZen Software Labs Pvt. Ltd.",
      flag: null,
    },
    address: {
      value: "Jharkhand",
      flag: null,
    },
    gstin: {
      value: "20QXCC9424D1Z5",
      flag: null,
    },
    state: {
      value: "Jharkhand",
      flag: null,
    },
    state_code: {
      value: "JH - 20",
      flag: null,
    },
    flag: null,
  },
  buyer: {
    name: {
      value: "Cipla Ltd",
      flag: null,
    },
    address: {
      value: "Rajasthan - 757166",
      flag: null,
    },
    gstin: {
      value: "08AKOCX6349P1ZL",
      flag: null,
    },
    flag: null,
  },
  consignee: {
    name: {
      value: "Cipla Ltd",
      flag: null,
    },
    address: {
      value: "Rajasthan - 757166",
      flag: null,
    },
    gstin: {
      value: "08AKOCX6349P1ZL",
      flag: null,
    },
    flag: null,
  },
  invoice_details: {
    number: {
      value: "17-18/JH/97",
      flag: null,
    },
    date: {
      value: "July 26, 2017",
      flag: null,
    },
    place_of_supply: {
      value: "Rajasthan",
      flag: null,
    },
    reverse_charge_applicable: {
      value: false,
      flag: null,
    },
    flag: null,
  },
  sez_details: {
    declaration: {
      value: "",
      flag: null,
    },
    lut_number: {
      value: "",
      flag: null,
    },
    lut_validity: {
      value: "",
      flag: null,
    },
    flag: null,
  },
  tds_details: {
    lower_deduction_applicable: {
      value: false,
      flag: null,
    },
    flag: null,
  },
  line_items: [
    {
      item_number: {
        value: 1,
        flag: null,
      },
      hsn_code: {
        value: "521222",
        flag: null,
      },
      description: {
        value: "OTHR BLCHD WOVN FBRC5 WGHNG >200 G/M2",
        flag: null,
      },
      unit: {
        value: "GMS",
        flag: null,
      },
      quantity: {
        value: 9,
        flag: null,
      },
      unit_price: {
        value: 1344,
        flag: null,
      },
      taxable_value: {
        value: 12096,
        flag: {
          title: "Validated",
          description: "Taxable value is correct",
          type: "positive",
          correct_value: 12096,
        },
      },
      tax_rate: {
        value: 18,
        flag: null,
      },
      tax_amount: {
        value: 2177.28,
        flag: {
          title: "Validated",
          description: "Tax amount is correct",
          type: "positive",
          correct_value: 2177.28,
        },
      },
      total_value: {
        value: 14173.28,
        flag: {
          title: "Total Value",
          description: "Total value should be 14273.28",
          type: "negative",
          correct_value: 14273.28,
        },
      },
      flag: {
        title: "Check Required",
        description: "Please check the line item",
        type: "negative",
        correct_value: null,
      },
    },
    {
      item_number: {
        value: 2,
        flag: null,
      },
      hsn_code: {
        value: "071339",
        flag: null,
      },
      description: {
        value: "OTER BEANS DRIED & SHLD",
        flag: null,
      },
      unit: {
        value: "UNT",
        flag: null,
      },
      quantity: {
        value: 7,
        flag: null,
      },
      unit_price: {
        value: 1106,
        flag: null,
      },
      taxable_value: {
        value: 7742,
        flag: {
          title: "Validated",
          description: "Taxable value is correct",
          type: "positive",
          correct_value: 7742,
        },
      },
      tax_rate: {
        value: 18,
        flag: null,
      },
      tax_amount: {
        value: 1393.56,
        flag: {
          title: "Validated",
          description: "Tax amount is correct",
          type: "positive",
          correct_value: 1393.56,
        },
      },
      total_value: {
        value: 9135.56,
        flag: {
          title: "Validated",
          description: "Total value is correct",
          type: "positive",
          correct_value: 9135.56,
        },
      },
      flag: null,
    },
    {
      item_number: {
        value: 3,
        flag: null,
      },
      hsn_code: {
        value: "321490",
        flag: null,
      },
      description: {
        value:
          "GLAZIERS & GRAFTING PUTY, RESIN ELEMENTS NON RFRCTRY SRFCNG PRPN FR FLOORS, WALL ETC",
        flag: null,
      },
      unit: {
        value: "CCM",
        flag: null,
      },
      quantity: {
        value: 7,
        flag: null,
      },
      unit_price: {
        value: 1335,
        flag: null,
      },
      taxable_value: {
        value: 9345,
        flag: {
          title: "Validated",
          description: "Taxable value is correct",
          type: "positive",
          correct_value: 9345,
        },
      },
      tax_rate: {
        value: 28,
        flag: null,
      },
      tax_amount: {
        value: 2616.6,
        flag: {
          title: "Validated",
          description: "Tax amount is correct",
          type: "positive",
          correct_value: 2616.6,
        },
      },
      total_value: {
        value: 11961.6,
        flag: {
          title: "Validated",
          description: "Total value is correct",
          type: "positive",
          correct_value: 11961.6,
        },
      },
      flag: null,
    },
    {
      item_number: {
        value: 4,
        flag: null,
      },
      hsn_code: {
        value: "020735",
        flag: null,
      },
      description: {
        value: "OTHER, FRESH OR CHILLED",
        flag: null,
      },
      unit: {
        value: "BTL",
        flag: null,
      },
      quantity: {
        value: 7,
        flag: null,
      },
      unit_price: {
        value: 1081,
        flag: null,
      },
      taxable_value: {
        value: 7567,
        flag: {
          title: "Validated",
          description: "Taxable value is correct",
          type: "positive",
          correct_value: 7567,
        },
      },
      tax_rate: {
        value: 28,
        flag: null,
      },
      tax_amount: {
        value: 2118.76,
        flag: {
          title: "Validated",
          description: "Tax amount is correct",
          type: "positive",
          correct_value: 2118.76,
        },
      },
      total_value: {
        value: 9685.76,
        flag: {
          title: "Validated",
          description: "Total value is correct",
          type: "positive",
          correct_value: 9685.76,
        },
      },
      flag: null,
    },
    {
      item_number: {
        value: 5,
        flag: null,
      },
      hsn_code: {
        value: "33079090",
        flag: null,
      },
      description: {
        value: "OTHER COSMETIC & TOILT PRPN N E S",
        flag: null,
      },
      unit: {
        value: "MLT",
        flag: null,
      },
      quantity: {
        value: 3,
        flag: null,
      },
      unit_price: {
        value: 747,
        flag: null,
      },
      taxable_value: {
        value: 2241,
        flag: {
          title: "Validated",
          description: "Taxable value is correct",
          type: "positive",
          correct_value: 2241,
        },
      },
      tax_rate: {
        value: 28,
        flag: null,
      },
      tax_amount: {
        value: 627.48,
        flag: {
          title: "Validated",
          description: "Tax amount is correct",
          type: "positive",
          correct_value: 627.48,
        },
      },
      total_value: {
        value: 2868.48,
        flag: {
          title: "Validated",
          description: "Total value is correct",
          type: "positive",
          correct_value: 2868.48,
        },
      },
      flag: null,
    },
  ],
  totals: {
    taxable_value: {
      value: 38991,
      flag: {
        title: "Validated",
        description: "Total taxable value is correct",
        type: "positive",
        correct_value: 38991,
      },
    },
    tax_amount: {
      value: 8933.68,
      flag: {
        title: "Validated",
        description: "Total tax amount is correct",
        type: "positive",
        correct_value: 8933.68,
      },
    },
    rounding: {
      value: 0.32,
      flag: null,
    },
    invoice_total: {
      value: 47925,
      flag: {
        title: "Validated",
        description: "Invoice total is correct",
        type: "positive",
        correct_value: 47925,
      },
    },
    amount_in_words: {
      value: "Forty seven thousand, nine hundred and twenty five",
      flag: null,
    },
    flag: null,
  },
  signature: {
    authorized_signatory: {
      value: "Authorized Signatory CloudZen Software Labs Pvt. Ltd.",
      flag: null,
    },
    flag: null,
  },
};

const complianceCheck = {
  supplier: {
    name: {
      text: "CloudZen Software Labs Pvt. Ltd.",
      flag: {
        title: "Validated",
        description: null,
        type: "positive",
      },
    },
    address: {
      text: "Jharkhand",
      flag: null,
    },
    gstin: {
      text: "20QXCC9424D1Z5",
      flag: null,
    },
    state: {
      text: "Jharkhand",
      flag: null,
    },
    state_code: {
      text: "JH - 20",
      flag: null,
    },
    compliance_status: {
      title: "Check required",
      description:
        "Details about how the terms are non standard as compared to ASC 606",
      type: "negative",
    },
  },
  buyer: {
    name: {
      text: "Cipla Ltd",
      flag: null,
    },
    address: {
      text: "Rajasthan - 757166",
      flag: null,
    },
    gstin: {
      text: "08AKOCX6349P1ZL",
      flag: null,
    },
    compliance_status: {
      title: "Check Done",
      description: "The quantity is valid",
      type: "positive",
    },
  },
  consignee: {
    name: {
      text: "Cipla Ltd",
      flag: null,
    },
    address: {
      text: "Rajasthan - 757166",
      flag: null,
    },
    gstin: {
      text: "08AKOCX6349P1ZL",
      flag: null,
    },
    compliance_status: null,
  },
  invoice_details: {
    number: {
      text: "17-18/JH/97",
      flag: null,
    },
    date: {
      text: "July 26, 2017",
      flag: null,
    },
    place_of_supply: {
      text: "Rajasthan",
      flag: null,
    },
    reverse_charge_applicable: {
      text: "false",
      flag: null,
    },
    compliance_status: null,
  },
  sez_details: {
    declaration: {
      text: "",
      flag: null,
    },
    lut_number: {
      text: "",
      flag: null,
    },
    lut_validity: {
      text: "",
      flag: null,
    },
    compliance_status: null,
  },
  tds_details: {
    lower_deduction_applicable: {
      text: false,
      flag: null,
    },
    compliance_status: null,
  },
  line_items: [
    {
      item_number: {
        text: 1,
        flag: null,
      },
      hsn_code: {
        text: "521222",
        flag: null,
      },
      tax_amount: {
        text: 2177.28,
        flag: null,
      },
      total_value: {
        text: 14273.28,
        flag: null,
      },
      compliance_status: {
        title: "Check Done",
        description: "The quantity is valid",
        type: "positive",
      },
    },
    {
      item_number: {
        text: 1,
        flag: null,
      },
      hsn_code: {
        text: "521222",
        flag: null,
      },
      tax_amount: {
        text: 2177.28,
        flag: null,
      },
      total_value: {
        text: 14273.28,
        flag: null,
      },
      compliance_status: {
        title: "Check Pending",
        description: "The quantity is not valid",
        type: "negative",
      },
    },
    // Other line items...
  ],
  totals: {
    taxable_value: {
      text: 38991,
      flag: null,
    },
    tax_amount: {
      text: 8933.68,
      flag: null,
    },
    rounding: {
      text: 0.32,
      flag: null,
    },
    invoice_total: {
      text: 47925,
      flag: null,
    },
    compliance_status: null,
  },
  signature: {
    authorized_signatory: {
      text: "Authorized Signatory CloudZen Software Labs Pvt. Ltd.",
      flag: null,
    },
    compliance_status: null,
  },
};

const ShowData = () => {
  //   const { data } = useDocumentData();
  const sidebarWidth = 500;
  const [pageWidth, setPageWidth] = useState(0);
  const { invoiceSidebarCollapsed } = useStorage();

  // Update the page width based on sidebar state
  useEffect(() => {
    const updatePageWidth = () => {
      if (invoiceSidebarCollapsed) {
        setPageWidth(window.innerWidth - sidebarWidth - 300);
      } else {
        setPageWidth(window.innerWidth - sidebarWidth);
      }
    };

    updatePageWidth(); // Set initial width
    window.addEventListener("resize", updatePageWidth); // Update width on window resize

    return () => {
      window.removeEventListener("resize", updatePageWidth);
    };
  }, [invoiceSidebarCollapsed]);

  return (
    <>
      {data ? (
        <div className="flex w-full flex-row gap-[24px]">
          {/* Sidebar displaying invoice details */}
          <Sidebar data={data as SidebarData} />
          {/* PDF Viewer */}
          <div className="w-full h-[100vh]">
            <PDFViewer
              fileUrl={"/documents/contracts/medhaj-contract.pdf"}
              pageWidth={pageWidth}
            />
          </div>
        </div>
      ) : (
        <PDFLoadingSkeleton />
      )}
    </>
  );
};

export default ShowData;

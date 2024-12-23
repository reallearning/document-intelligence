"use client";
import React, { useEffect, useState } from "react";
import { useStorage } from "@/context/StorageContext";
import PDFViewer from "../../components/pdf-viewer";
import { useDocumentData } from "@/context/document-data-context";
import { PDFLoadingSkeleton } from "@/components/pdf-loading-skeleton";
import Sidebar, { DynamicNestedData, Invoice } from "./components/sidebar";

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
  doc_url:
    "https://storage.googleapis.com/morrie-resources/demo/PO-4250-240116044_20816.pdf",
  format: "pdf",
  type: "invoice",
  data: {
    // supplier: {
    //   name: {
    //     value: "",
    //     flag: null,
    //   },
    //   address: {
    //     value: "",
    //     flag: null,
    //   },
    //   gstin: {
    //     value: "",
    //     flag: null,
    //   },
    //   state: {
    //     value: null,
    //     flag: null,
    //   },
    //   state_code: {
    //     value: null,
    //     flag: null,
    //   },
    //   pan_number: {
    //     value: "",
    //     flag: null,
    //   },
    //   contact_details: {
    //     value: {
    //       phone: "",
    //       email: "",
    //     },
    //     flag: null,
    //   },
    //   bank_account_number: {
    //     value: "",
    //     flag: null,
    //   },
    //   bank_name: {
    //     value: "",
    //     flag: null,
    //   },
    //   branch: {
    //     value: "",
    //     flag: null,
    //   },
    //   ifsc_code: {
    //     value: "",
    //     flag: null,
    //   },
    //   flag: null,
    // },
    Seller: {
      name: "dffsd",
      address: {
        value: "",
        flag: null,
      },
      gstin: {
        value: "",
        flag: null,
      },
      contact_details: {
        value: {
          phone: "",
          email: "",
        },
        flag: null,
      },
      flag: null,
    },
    consignee: {
      name: {
        value: "",
        flag: null,
      },
      address: {
        value: "",
        flag: null,
      },
      gstin: {
        value: "",
        flag: null,
      },
      flag: null,
    },
    gst_details: {
      cgst: {
        value: 0,
        flag: null,
      },
      sgst: {
        value: 0,
        flag: null,
      },
      igst: {
        value: 0,
        flag: null,
      },
      utgst: {
        value: 0,
        flag: null,
      },
      cess: {
        value: 0,
        flag: null,
      },
      round_off: {
        value: 0,
        flag: null,
      },
      flag: null,
    },
    invoice_details: {
      number: {
        value: "",
        flag: null,
      },
      date: {
        value: "",
        flag: null,
      },
      due_date: {
        value: "",
        flag: null,
      },
      place_of_supply: {
        value: null,
        flag: null,
      },
      reverse_charge_applicable: {
        value: false,
        flag: null,
      },
      order_number: {
        value: "",
        flag: null,
      },
      terms_of_delivery: {
        value: "",
        flag: null,
      },
      flag: null,
    },
    sez_details: {
      declaration: {
        value: "NA",
        flag: null,
      },
      lut_number: {
        value: "NA",
        flag: null,
      },
      lut_validity: {
        value: "NA",
        flag: null,
      },
      flag: null,
    },
    tds_details: {
      lower_deduction_applicable: {
        value: "NA",
        flag: null,
      },
      flag: null,
    },
    line_items: [],
    totals: {
      taxable_value: {
        value: 0,
        flag: null,
      },
      tax_amount: {
        value: 0,
        flag: null,
      },
      rounding: {
        value: 0,
        flag: null,
      },
      invoice_total: {
        value: 0,
        flag: null,
      },
      amount_in_words: {
        value: "",
        flag: null,
      },
      subtotal: {
        value: 0,
        flag: null,
      },
      flag: null,
    },
    signature: {
      authorized_signatory: {
        value: null,
        flag: null,
      },
      flag: null,
    },
    remarks: {
      remarks: {
        value: null,
        flag: null,
      },
      flag: null,
    },
    additional_fields: {
      shipment_tracking_number: {
        value: null,
        flag: null,
      },
      delivery_date: {
        value: null,
        flag: null,
      },
      delivery_terms: {
        value: null,
        flag: null,
      },
      payment_terms: {
        value: null,
        flag: null,
      },
      flag: null,
    },
  },
};

const ShowData = () => {
  // const { data } = useDocumentData();
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
          <Sidebar data={data.data as DynamicNestedData} />
          {/* PDF Viewer */}
          {/* <div className="w-full h-[100vh]">
            <PDFViewer fileUrl={data.doc_url} pageWidth={pageWidth} />
          </div> */}

          <div className="w-full h-screen mr-4">
            {data.format === "image" ? (
              <div className=" w-full h-full">
                <img
                  src={data.doc_url}
                  alt="image"
                  className="object-contain w-full h-full mx-auto"
                />
              </div>
            ) : (
              <PDFViewer fileUrl={data.doc_url} pageWidth={pageWidth} />
            )}
          </div>
        </div>
      ) : (
        <PDFLoadingSkeleton />
      )}
    </>
  );
};

export default ShowData;

"use client";
import { useDocumentData } from "@/context/document-data-context";
import { useStorage } from "@/context/StorageContext";
import { useEffect, useState } from "react";
import PDFViewer from "@/app/(dashboard)/components/pdf-viewer";
import { PDFLoadingSkeleton } from "@/components/pdf-loading-skeleton";
import Sidebar from "./sidebar";

// const livspaceData = {
//   doc_url:
//     "https://storage.googleapis.com/morrie-resources/morrie-resources/livspacePO-4458-240401018_IFPL-574-24-25.pdf",
//   format: "pdf",
//   type: "invoice",
//   data: {
//     supplier: {
//       name: "Inwood Furnitech (P) Ltd",
//       address:
//         "K. P. Mondal Road, Boropole\nVillage Bawali\nSouth 24 Paraganas 700137\nUDYAM REG NO-UDYAM-WB-18-0017700\nGSTIN/UIN: 19AAGCI5030B1ZZ",
//       gstin: "19AAGCI5030B1ZZ",
//       state: "West Bengal,",
//       state_code: "19",
//       pan_number: "AAGCI5030B",
//       contact_details: {
//         phone: "sdsdsskfkdf",
//         email: "",
//       },
//       bank_name: "HDFC Bank Ltd",
//       bank_account_number: "50200066181290",
//       branch: "Netaji Nagar Branch, Kolkata",
//       ifsc_code: "HDFC0001355",
//     },
//     buyer: {
//       name: "Home Interior Designs E-Commerce Pvt Ltd",
//       address:
//         "M/S Flomic Global Logistics Limited,\nPS Panchla\nHowrah 711322 WB",
//       gstin: "19AADCH4222R1Z6",
//       contact_details: {
//         phone: "",
//         email: "",
//       },
//     },
//     consignee: {
//       name: "Home Interior Designs E-Commerce Pvt Ltd",
//       address:
//         "Home Interior Designs E-Commerce Pvt\nM/S Flomic Global Logistics Limited,\nPS Panchla\nHowrah 711322 WB\nGSTIN/UIN : 19AADCH4222R1Z6\nState Name : West Bengal, Code: 19",
//       gstin: "19AADCH4222R1Z6",
//     },
//     invoice_details: {
//       number: "IFPL/574/24-25",
//       date: "18-Apr-24",
//       due_date: "",
//       place_of_supply: null,
//       reverse_charge_applicable: false,
//       order_number: "PO-4458-240401018",
//       terms_of_delivery: "",
//     },
//     gst_details: {
//       cgst: "2,113.00",
//       sgst: 0,
//       igst: 0,
//       utgst: 0,
//       cess: 0,
//       round_off: 0,
//     },
//     line_items: [
//       {
//         item_number: 1,
//         hsn_code: "94036000",
//         description:
//           "Counter Top Ply Both Side Laminted -\n2400 x 560 x\n18 (Frosty White Laminated)",
//         value: "23,477.80",
//         unit: "Nos",
//         quantity: "18.00",
//         unit_price: "1,304.32",
//         discount: null,
//         taxable_value: "23,477.80",
//         tax_rate: null,
//         tax_amount: null,
//         total_value: null,
//       },
//     ],
//     totals: {
//       sub_total: "23,477.80",
//       taxable_value: 0,
//       tax_amount: 0,
//       rounding: 0,
//       invoice_total: "27,704.00",
//       amount_in_words: "INR Twenty Seven Thousand Seven Hundred Four",
//     },
//     signature: null,
//     remarks: null,
//     additional_fields: {
//       shipment_tracking_number: null,
//       delivery_date: null,
//       delivery_terms: null,
//       payment_terms: null,
//     },
//   },
// };

const Details = () => {
  const { livspaceData } = useDocumentData();
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
      {livspaceData ? (
        <div className="flex w-full flex-row gap-[24px]">
          {/* Sidebar displaying invoice details */}
          <Sidebar data={livspaceData.data} />
          {/* PDF Viewer */}
          {/* <div className="w-full h-[100vh]">
              <PDFViewer fileUrl={data.doc_url} pageWidth={pageWidth} />
            </div> */}

          <div className="w-full h-screen mr-4">
            {livspaceData.format === "image" ? (
              <div className=" w-full h-full">
                <img
                  src={livspaceData.doc_url}
                  alt="image"
                  className="object-contain w-full h-full mx-auto"
                />
              </div>
            ) : (
              <PDFViewer fileUrl={livspaceData.doc_url} pageWidth={pageWidth} />
            )}
          </div>
        </div>
      ) : (
        <PDFLoadingSkeleton />
      )}
    </>
  );
};

export default Details;

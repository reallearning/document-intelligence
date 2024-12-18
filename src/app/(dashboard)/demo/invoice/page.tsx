"use client";
import { useDocumentData } from "@/context/document-data-context";
import { useEffect, useState } from "react";
import PDFViewer from "../../components/pdf-viewer";
import { PDFLoadingSkeleton } from "@/components/pdf-loading-skeleton";
import { useStorage } from "@/context/StorageContext";
import Sidebar from "./sidebar";

// const gcpExtractedData = {
//   doc_url:
//     "https://storage.googleapis.com/morrie-resources/demo/PO-4250-240116044_20816.pdf",
//   format: "pdf",
//   data: [
//     {
//       field_name: "Reference No. & Date.",
//       value: "Mumbai",
//     },
//     {
//       field_name: "Ack Date\n:",
//       value: "5-Feb-24",
//     },
//     {
//       field_name: "Ack No.\n:",
//       value: "122420043977063",
//     },
//     {
//       field_name: "Buyer's Order No.",
//       value: "PO-4250-240116044",
//     },
//     {
//       field_name: "Invoice No.",
//       value: "20816",
//     },
//     {
//       field_name: "IRN\n:",
//       value:
//         "30815d32e56eb28205510d5126342e7582756bbe4a0210e-\nf9f8d99a68a3a4b78",
//     },
//     {
//       field_name: "Motor Vehicle No.",
//       value: "MH14GU1089",
//     },
//     {
//       field_name: "Other References",
//       value: "Abhishek Tarafdar",
//     },
//     {
//       field_name: "A/c Holder's Name :",
//       value: "CAREFINE WOODWORKS PVT LTD",
//     },
//     {
//       field_name: "A/c No.\n:",
//       value: "0261257005090",
//     },
//     {
//       field_name: "Dated",
//       value: "5-Feb-24",
//     },
//     {
//       field_name: "Destination",
//       value: "India",
//     },
//     {
//       field_name: "Bank Name\n:",
//       value: "CANARA BANK",
//     },
//     {
//       field_name: "GSTIN/UIN\n:",
//       value: "27AADCH4222R2Z8",
//     },
//     {
//       field_name: "State Name\n:",
//       value: "Maharashtra, Code : 27",
//     },
//     {
//       field_name: "Dated",
//       value: "5-Feb-24",
//     },
//     {
//       field_name: "Company's PAN",
//       value: ": AAACC7579H",
//     },
//     {
//       field_name: "Branch & IFS Code :",
//       value: "Ramwadi Pune CNRB0000261",
//     },
//     {
//       field_name: "Consignee (Ship to)",
//       value:
//         "HOME INTERIOR DESIGNS E-COMMERCE PVT LTD\nS3 lifestyle Apartment, Pimple Saudagar, Pune -\n411045",
//     },
//     {
//       field_name: "GSTIN/UIN\n:",
//       value: "27AADCH4222R2Z8",
//     },
//     {
//       field_name: "E-Mail:",
//       value: "pune@carefine.co.in",
//     },
//     {
//       field_name: "GSTIN/UIN:",
//       value: "27AAACC7579H1ZC",
//     },
//     {
//       field_name: "State Name\n:",
//       value: "Maharashtra, Code: 27",
//     },
//     {
//       field_name: "HSN/SAC",
//       value: "94034000",
//     },
//     {
//       field_name: "Quantity",
//       value: "1.00 Nos",
//     },
//     {
//       field_name: "Mode/Terms of Payment",
//       value: "5-Feb-24",
//     },
//     {
//       field_name: "Rate",
//       value: "2,361.49",
//     },
//     {
//       field_name: "Name: Maharashtra,",
//       value: "State Code : 27",
//     },
//     {
//       field_name: "per",
//       value: "Nos",
//     },
//   ],
// };

export default function Invoice() {
    const { gcpExtractedData } = useDocumentData();

  const sidebarWidth = 500;

  const [pageWidth, setPageWidth] = useState(0);
  const { invoiceSidebarCollapsed } = useStorage();

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
      {gcpExtractedData ? (
        <div className="flex w-full flex-row gap-[24px]">
          {/* Sidebar displaying invoice details */}
          <Sidebar extractedData={gcpExtractedData.data}/>

          <div className="w-full h-screen mr-4">
            {gcpExtractedData.format === "image" ? (
              <div className=" w-full h-full">
                <img
                  src={gcpExtractedData.doc_url}
                  alt="image"
                  className="object-contain w-full h-full mx-auto"
                />
              </div>
            ) : (
              <PDFViewer
                fileUrl={gcpExtractedData.doc_url}
                pageWidth={pageWidth}
              />
            )}
          </div>
        </div>
      ) : (
        <PDFLoadingSkeleton />
      )}
    </>
  );
}

"use client";
import { useDocumentData } from "@/context/document-data-context";
import { useStorage } from "@/context/StorageContext";
import { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import PDFViewer from "@/app/(dashboard)/components/pdf-viewer";
import { PDFLoadingSkeleton } from "@/components/pdf-loading-skeleton";

// const otoData = {
//   doc_url:
//     "https://storage.googleapis.com/morrie-resources/morrie-resources/oto/PO-4458-240401018_IFPL-574-24-25.pdf",
//   type: "invoice",
//   format: "pdf",
//   data: {
//     document_type: "INDIA NON JUDICIAL e-Stamp",
//     government: "Government of Karnataka",
//     certificate_details: {
//       number: "IN-KA76617166661829W",
//       issue_date: "04-Apr-2024 06:50 PM",
//       account_reference: "NONACC (FI)/ kagcsl08/ C K NAGAR/ KA-GN",
//       unique_doc_reference: "SUBIN-KAKAGCSL0813413757137787W",
//     },
//     stamp_duty: {
//       paid_by: "SANDEEP VARMA",
//       amount: 100,
//       amount_in_words: "One Hundred only",
//     },
//     property_details: {
//       description: "RENTAL AGREEMENT",
//       consideration_price: 20000,
//       consideration_price_words: "Twenty Thousand only",
//       type: "Article 30(1)(i) Lease of Immovable Property - Not exceeding 1 year in case of Residential property",
//     },
//     parties: {
//       first_party: "S PRAKASH AND LAKSHMI",
//       second_party: "SANDEEP VARMA",
//     },
//     lessor_address:
//       "NO.#197/A, S3, ADEYA ENCLAVE, 4TH CROSS ROAD, KOTHNOOR MAIN ROAD, BANGALORE 560068",
//     lessee_address:
//       "NO.11, 3RD FLOOR, EAST FACING,2ND CROSS ROAD, VENKATESHWARA LAYOUT, KOTHANOOR MAIN ROAD, NEAR B K CIRCLE BANGALORE- 560078",
//     rental_terms: {
//       monthly_rent: 8000,
//       rent_due_date: "5th day of every English calendar month",
//       advance_amount: 35000,
//       duration_months: 11,
//       start_date: "04/04/2024",
//       rent_increment: "5%",
//       notice_period: "Two month",
//       purpose: "RESIDENTIAL PURPOSE",
//     },
//     premises_details: {
//       address:
//         "NO.11, 3RD FLOOR, EAST FACING,2ND CROSS ROAD, VENKATESHWARA LAYOUT, KOTHANOOR MAIN ROAD, NEAR B K CIRCLE BANGALORE- 560078",
//       components: ["one Hall", "Kitchen", "one Bedroom", "One bathroom"],
//       facilities: ["electricity", "water Facility", "RCC Roofed"],
//     },
//     additional_terms: [
//       "Tenant must pay electricity charges directly",
//       "No subletting or alterations without owner permission",
//       "Tenant responsible for damages and repairs",
//       "One month rent for painting charges or deduction from security deposit",
//       "Advance amount will be repaid during vacation of premises",
//     ],
//     notary_details: {
//       name: "B.M. CHANDRASHEKAR",
//       designation: "Advocate & Notary Public",
//       address: "#47, B.D.A. Complex, Koramangala, BANGALORE-560 034",
//     },
//   },
// };

const Details = () => {
  const { otoData } = useDocumentData();
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
      {otoData ? (
        <div className="flex w-full flex-row gap-[24px]">
          {/* Sidebar displaying invoice details */}
          <Sidebar data={otoData.data} />
          {/* PDF Viewer */}
          {/* <div className="w-full h-[100vh]">
              <PDFViewer fileUrl={data.doc_url} pageWidth={pageWidth} />
            </div> */}

          <div className="w-full h-screen mr-4">
            {otoData.format === "image" ? (
              <div className=" w-full h-full">
                <img
                  src={otoData.doc_url}
                  alt="image"
                  className="object-contain w-full h-full mx-auto"
                />
              </div>
            ) : (
              <PDFViewer fileUrl={otoData.doc_url} pageWidth={pageWidth} />
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

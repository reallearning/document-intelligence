"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useStorage } from "@/context/StorageContext";
import PDFViewer from "@/app/(dashboard)/components/pdf-viewer";
import { InvoiceInformationSidebar } from "./components/invoice-information-sidebar";

const invoiceDetails = [
  {
    id: "phoenix-supplies",
    invoiceName: "Phoenix Supplies Ltd.",
    pdfUrl:
      "https://storage.googleapis.com/morrie-resources/demo/invoice%20%20%281%29.pdf",
    data: {
      "Invoice Number": {
        value: "INV-2025-001",
        validation: true,
      },
      "Invoice Date": {
        value: "14 Jan 2025",
        validation: true,
      },
      "Due Date": {
        value: "31 Jan 2025",
        validation: true,
      },
      "PO Reference": {
        value: "PO-2025-089",
        validation: false,
        matching_value: "PO-2025-088",
      },
      "Supplier Company Name": {
        value: "Phoenix Supplies Ltd.",
        validation: true,
      },
      "Supplier Building": {
        value: "Unit 403, Brigade Tech Park",
        validation: true,
      },
      "Supplier Street": {
        value: "Whitefield Main Road",
        validation: true,
      },
      "Supplier City": {
        value: "Bangalore",
        validation: true,
      },
      "Supplier State": {
        value: "Karnataka",
        validation: true,
      },
      "Supplier Pincode": {
        value: "560066",
        validation: true,
      },
      "Supplier GSTIN": {
        value: "29AABCP8241R1ZX",
        validation: true,
      },
      "Customer Company Name": {
        value: "Questt Inc.",
        validation: true,
      },
      "Customer Building": {
        value: "Tower B3, Level 7",
        validation: true,
      },
      "Customer Street": {
        value: "Prestige Tech Park, Outer Ring Road",
        validation: true,
      },
      "Customer City": {
        value: "Bangalore",
        validation: true,
      },
      "Customer State": {
        value: "Karnataka",
        validation: true,
      },
      "Customer Pincode": {
        value: "560103",
        validation: true,
      },
      "Customer GSTIN": {
        value: "29AADCQ9632B1ZY",
        validation: true,
      },
      "Item 1 Description": {
        value: "Enterprise Server Infrastructure",
        validation: true,
      },
      "Item 1 HSN": {
        value: "8471",
        validation: true,
      },
      "Item 1 Quantity": {
        value: 2,
        validation: true,
      },
      "Item 1 Rate": {
        value: 12000.0,
        validation: true,
      },
      "Item 1 Amount": {
        value: 24000.0,
        validation: true,
      },
      "Item 1 Tax Rate": {
        value: 18,
        validation: true,
      },
      "Item 1 Total": {
        value: 28320.0,
        validation: true,
      },
      "Item 2 Description": {
        value: "Network Security Equipment",
        validation: true,
      },
      "Item 2 HSN": {
        value: "8517",
        validation: true,
      },
      "Item 2 Quantity": {
        value: 2,
        validation: true,
      },
      "Item 2 Rate": {
        value: 5000.0,
        validation: true,
      },
      "Item 2 Amount": {
        value: 10000.0,
        validation: true,
      },
      "Item 2 Tax Rate": {
        value: 18,
        validation: true,
      },
      "Item 2 Total": {
        value: 11800.0,
        validation: true,
      },
      "Taxable Amount": {
        value: 34000.0,
        validation: true,
      },
      "CGST Rate": {
        value: 9,
        validation: true,
      },
      "CGST Amount": {
        value: 3060.0,
        validation: true,
      },
      "SGST Rate": {
        value: 9,
        validation: true,
      },
      "SGST Amount": {
        value: 3060.0,
        validation: true,
      },
      "Total Tax": {
        value: 6120.0,
        validation: true,
      },
      "Total Amount": {
        value: 40120.0,
        validation: true,
      },
      "Amount In Words": {
        value: "Rupees Forty Thousand One Hundred and Twenty Only",
        validation: true,
      },
      "Bank Name": {
        value: "HDFC Bank Ltd.",
        validation: true,
      },
      "Bank Account": {
        value: "50200045673291",
        validation: true,
      },
      "Bank IFSC": {
        value: "HDFC0001348",
        validation: true,
      },
      "Bank Branch": {
        value: "Whitefield, Bangalore",
        validation: true,
      },
    },
  },
];

const InvoiceDetails = () => {
  const sidebarWidth = 500;
  const [pageWidth, setPageWidth] = useState(0);

  const pathname = usePathname();

  const id = pathname?.split("/").pop();

  const [selectedInvoices, setSelectedInvoices] = useState<
    (typeof invoiceDetails)[0] | null
  >(null);

  useEffect(() => {
    if (id) {
      const invoice = invoiceDetails.find((invoice) => invoice.id === id);
      if (invoice) {
        setSelectedInvoices(invoice);
      } else {
        setSelectedInvoices(null);
      }
    }
  }, [id]);

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
    <div className="pr-6 pl-6">
      {/* <p className="font-poly font-normal text-[20px] text-black mb-6 max-w-[300px]">
        {selectedInvoices?.invoiceName}
      </p> */}
      <div className="flex w-full gap-[24px]">
        {/* TODO: Uncomment and pass the selected invoice object to see the invoice information sidebar */}
        {selectedInvoices && (
          <InvoiceInformationSidebar invoice={selectedInvoices.data} />
        )}

        <div className="w-full h-[100vh] mt-5">
          <div className="flex justify-end mb-5">
            <button
              className="text-white text-md font-nunito font-medium bg-[#7C3AED] px-8 py-4 rounded-lg"
              onClick={() =>
                window.open(
                  "https://storage.googleapis.com/morrie-resources/demo/po%20jan.pdf",
                  "_blank"
                )
              }
            >
              View Purchase Order
            </button>
          </div>
          {selectedInvoices && (
            <PDFViewer
              fileUrl={selectedInvoices.pdfUrl}
              pageWidth={pageWidth}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;

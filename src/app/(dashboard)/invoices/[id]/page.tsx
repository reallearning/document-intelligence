"use client";
import { InvoiceInformationSidebar } from "@/components/invoice-information-sidebar";
import React, { useEffect, useState } from "react";
import PDFViewer from "../../components/pdf-viewer";
import { usePathname } from "next/navigation";
import { Invoice } from "@/types/invoice-information";
import { useStorage } from "@/context/StorageContext";

const invoiceDetails = [
  {
    id: "invoice-01",
    invoiceName: "Oaktree Capital Management Services Invoice",
    assignedTo: "finance@oaktree.com",
    pdfUrl: "/documents/invoices/oaktree-capital.pdf",
    steps: [
      {
        id: "1",
        stepName: null,
        data: [
          {
            id: "1",
            header: "Invoice Number",
            data: "INV-OAK-0001",
            comments: [],
          },
          {
            id: "2",
            header: "Invoice Date",
            data: "01-Dec-2023",
            comments: [],
          },
          {
            id: "3",
            header: "Total Amount",
            data: "£5000.00",
            comments: [],
          },
        ],
      },
      {
        id: "2",
        stepName: "Vendor Details",
        data: [
          {
            id: "1",
            header: "Legal Name",
            data: "Oaktree Capital Management, L.P.",
            comments: [],
          },
          {
            id: "2",
            header: "Address",
            data: "333 South Grand Avenue, 28th Floor, Los Angeles, CA 90071",
            comments: [],
          },
        ],
      },
      {
        id: "3",
        stepName: "Items",
        data: [
          {
            id: "1",
            header: "Description",
            data: "Sub-advisory and investment management services, Qty: 1, Price: £3000.00",
            comments: [],
          },
          {
            id: "2",
            header: "Description",
            data: "Marketing and promotion services, Qty: 1, Price: £2000.00",
            comments: [],
          },
        ],
      },
    ],
  },
  {
    id: "invoice-02",
    invoiceName: "Rise Education Group Services Invoice",
    assignedTo: "accounts@rise.com",
    pdfUrl: "/documents/invoices/risee-education.pdf",
    steps: [
      {
        id: "1",
        stepName: null,
        data: [
          {
            id: "1",
            header: "Invoice Number",
            data: "INV-RISE-0002",
            comments: [],
          },
          {
            id: "2",
            header: "Invoice Date",
            data: "01-Dec-2023",
            comments: [],
          },
          {
            id: "3",
            header: "Total Amount",
            data: "£5000.00",
            comments: [],
          },
        ],
      },
      {
        id: "2",
        stepName: "Vendor Details",
        data: [
          {
            id: "1",
            header: "Legal Name",
            data: "Rise Education Group",
            comments: [],
          },
          {
            id: "2",
            header: "Address",
            data: "Room C209, Building 1, No.8 Huanhe West Road, Airport Economic Zone, Tianjin, China",
            comments: [],
          },
        ],
      },
      {
        id: "3",
        stepName: "Items",
        data: [
          {
            id: "1",
            header: "Description",
            data: "Academic support services, Qty: 1, Price: £2500.00",
            comments: [],
          },
          {
            id: "2",
            header: "Description",
            data: "Enrollment support services, Qty: 1, Price: £1500.00",
            comments: [],
          },
          {
            id: "3",
            header: "Description",
            data: "Customer support services, Qty: 1, Price: £1000.00",
            comments: [],
          },
        ],
      },
    ],
  },
  {
    id: "invoice-03",
    invoiceName: "Paxmedica Inc. Clinical Research Invoice",
    assignedTo: "billing@paxmedica.com",
    pdfUrl: "/documents/invoices/paxmedica.pdf",
    steps: [
      {
        id: "1",
        stepName: null,
        data: [
          {
            id: "1",
            header: "Invoice Number",
            data: "INV-PAX-0003",
            comments: [],
          },
          {
            id: "2",
            header: "Invoice Date",
            data: "01-Dec-2023",
            comments: [],
          },
          {
            id: "3",
            header: "Total Amount",
            data: "£5800.00",
            comments: [],
          },
        ],
      },
      {
        id: "2",
        stepName: "Vendor Details",
        data: [
          {
            id: "1",
            header: "Legal Name",
            data: "Paxmedica Inc.",
            comments: [],
          },
          {
            id: "2",
            header: "Address",
            data: "1266 East Main Street, Suite 700R, Stamford, CT 06902, USA",
            comments: [],
          },
        ],
      },
      {
        id: "3",
        stepName: "Items",
        data: [
          {
            id: "1",
            header: "Description",
            data: "Clinical research services, Qty: 1, Price: £5000.00",
            comments: [],
          },
          {
            id: "2",
            header: "Description",
            data: "Weekly reporting services, Qty: 1, Price: £800.00",
            comments: [],
          },
        ],
      },
    ],
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
    <div className="flex w-full flex-row gap-[24px]">
      {/* TODO: Uncomment and pass the selected invoice object to see the invoice information sidebar */}
      {selectedInvoices && (
        <InvoiceInformationSidebar invoice={selectedInvoices} />
      )}

      <div className="w-full h-[100vh]">
        {selectedInvoices && (
          <PDFViewer fileUrl={selectedInvoices.pdfUrl} pageWidth={pageWidth} />
        )}
      </div>
    </div>
  );
};

export default InvoiceDetails;

"use client";
import { InvoiceInformationSidebar } from "@/components/invoice-information-sidebar";
import React, { useEffect, useState } from "react";
import PDFViewer from "../../components/pdf-viewer";
import { usePathname } from "next/navigation";
import { Invoice } from "@/types/invoice-information";

const invoiceDetails = [
  {
    id: "invoice-01",
    invoiceName: "Achme Technologies",
    assignedTo: "nidhi@adhe.com",
    pdfUrl: "/documents/invoices/paxmedica.pdf",
    steps: [
      {
        id: "1",
        stepName: null,
        data: [
          {
            id: "1",
            header: "Invoice Number",
            data: "INV-2024-0105",
            comments: [
              {
                id: "comment1",
                senderMail: "example1@mail.com",
                profileUrl: "https://profile1.url",
                message: "This is a comment message.",
                date: "2024-11-11",
                time: "10:00 AM",
              },
              {
                id: "comment2",
                senderMail: "example2@mail.com",
                profileUrl: "https://profile2.url",
                message: "Another comment message.",
                date: "2024-11-11",
                time: "11:00 AM",
              },
            ],
          },
          {
            id: "2",
            header: "Invoice Date",
            data: "January 15, 2024",
            comments: [
              {
                id: "comment3",
                senderMail: "example1@mail.com",
                profileUrl: "https://profile1.url",
                message: "This is a comment message.",
                date: "2024-11-11",
                time: "10:00 AM",
              },
              {
                id: "comment4",
                senderMail: "example2@mail.com",
                profileUrl: "https://profile2.url",
                message: "Another comment message.",
                date: "2024-11-11",
                time: "11:00 AM",
              },
            ],
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
            data: "ADHE Corporation",
            comments: [
              {
                id: "comment5",
                senderMail: "example1@mail.com",
                profileUrl: "https://profile1.url",
                message: "This is a comment message.",
                date: "2024-11-11",
                time: "10:00 AM",
              },
              {
                id: "comment6",
                senderMail: "example2@mail.com",
                profileUrl: "https://profile2.url",
                message: "Another comment message.",
                date: "2024-11-11",
                time: "11:00 AM",
              },
            ],
          },
          {
            id: "2",
            header: "Tax ID",
            data: "47-1234567",
            comments: [
              {
                id: "comment7",
                senderMail: "example1@mail.com",
                profileUrl: "https://profile1.url",
                message: "This is a comment message.",
                date: "2024-11-11",
                time: "10:00 AM",
              },
              {
                id: "comment8",
                senderMail: "example2@mail.com",
                profileUrl: "https://profile2.url",
                message: "Another comment message.",
                date: "2024-11-11",
                time: "11:00 AM",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "invoice-02",
    invoiceName: "Achme Technologies",
    assignedTo: "nidhi@adhe.com",
    pdfUrl: "/documents/invoices/oaktree-capital.pdf",
    steps: [
      {
        id: "1",
        stepName: null,
        data: [
          {
            id: "1",
            header: "Invoice Number",
            data: "INV-2024-0105",
            comments: [
              {
                id: "comment1",
                senderMail: "example1@mail.com",
                profileUrl: "https://profile1.url",
                message: "This is a comment message.",
                date: "2024-11-11",
                time: "10:00 AM",
              },
              {
                id: "comment2",
                senderMail: "example2@mail.com",
                profileUrl: "https://profile2.url",
                message: "Another comment message.",
                date: "2024-11-11",
                time: "11:00 AM",
              },
            ],
          },
          {
            id: "2",
            header: "Invoice Date",
            data: "January 15, 2024",
            comments: [
              {
                id: "comment3",
                senderMail: "example1@mail.com",
                profileUrl: "https://profile1.url",
                message: "This is a comment message.",
                date: "2024-11-11",
                time: "10:00 AM",
              },
              {
                id: "comment4",
                senderMail: "example2@mail.com",
                profileUrl: "https://profile2.url",
                message: "Another comment message.",
                date: "2024-11-11",
                time: "11:00 AM",
              },
            ],
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
            data: "ADHE Corporation",
            comments: [
              {
                id: "comment5",
                senderMail: "example1@mail.com",
                profileUrl: "https://profile1.url",
                message: "This is a comment message.",
                date: "2024-11-11",
                time: "10:00 AM",
              },
              {
                id: "comment6",
                senderMail: "example2@mail.com",
                profileUrl: "https://profile2.url",
                message: "Another comment message.",
                date: "2024-11-11",
                time: "11:00 AM",
              },
            ],
          },
          {
            id: "2",
            header: "Tax ID",
            data: "47-1234567",
            comments: [
              {
                id: "comment7",
                senderMail: "example1@mail.com",
                profileUrl: "https://profile1.url",
                message: "This is a comment message.",
                date: "2024-11-11",
                time: "10:00 AM",
              },
              {
                id: "comment8",
                senderMail: "example2@mail.com",
                profileUrl: "https://profile2.url",
                message: "Another comment message.",
                date: "2024-11-11",
                time: "11:00 AM",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "invoice-03",
    invoiceName: "Achme Technologies",
    assignedTo: "nidhi@adhe.com",
    pdfUrl: "/documents/invoices/risee-education.pdf",
    steps: [
      {
        id: "1",
        stepName: null,
        data: [
          {
            id: "1",
            header: "Invoice Number",
            data: "INV-2024-0105",
            comments: [
              {
                id: "comment1",
                senderMail: "example1@mail.com",
                profileUrl: "https://profile1.url",
                message: "This is a comment message.",
                date: "2024-11-11",
                time: "10:00 AM",
              },
              {
                id: "comment2",
                senderMail: "example2@mail.com",
                profileUrl: "https://profile2.url",
                message: "Another comment message.",
                date: "2024-11-11",
                time: "11:00 AM",
              },
            ],
          },
          {
            id: "2",
            header: "Invoice Date",
            data: "January 15, 2024",
            comments: [
              {
                id: "comment3",
                senderMail: "example1@mail.com",
                profileUrl: "https://profile1.url",
                message: "This is a comment message.",
                date: "2024-11-11",
                time: "10:00 AM",
              },
              {
                id: "comment4",
                senderMail: "example2@mail.com",
                profileUrl: "https://profile2.url",
                message: "Another comment message.",
                date: "2024-11-11",
                time: "11:00 AM",
              },
            ],
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
            data: "ADHE Corporation",
            comments: [
              {
                id: "comment5",
                senderMail: "example1@mail.com",
                profileUrl: "https://profile1.url",
                message: "This is a comment message.",
                date: "2024-11-11",
                time: "10:00 AM",
              },
              {
                id: "comment6",
                senderMail: "example2@mail.com",
                profileUrl: "https://profile2.url",
                message: "Another comment message.",
                date: "2024-11-11",
                time: "11:00 AM",
              },
            ],
          },
          {
            id: "2",
            header: "Tax ID",
            data: "47-1234567",
            comments: [
              {
                id: "comment7",
                senderMail: "example1@mail.com",
                profileUrl: "https://profile1.url",
                message: "This is a comment message.",
                date: "2024-11-11",
                time: "10:00 AM",
              },
              {
                id: "comment8",
                senderMail: "example2@mail.com",
                profileUrl: "https://profile2.url",
                message: "Another comment message.",
                date: "2024-11-11",
                time: "11:00 AM",
              },
            ],
          },
        ],
      },
    ],
  },
];
const InvoiceDetails = () => {
  const [pageWidth, setPageWidth] = useState(0);
  const sidebarWidth = 500;
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

  useEffect(() => {
    const updatePageWidth = () => {
      setPageWidth(window.innerWidth - sidebarWidth);
    };

    updatePageWidth(); // Set initial width
    window.addEventListener("resize", updatePageWidth); // Update width on window resize

    return () => {
      window.removeEventListener("resize", updatePageWidth);
    };
  }, []);
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

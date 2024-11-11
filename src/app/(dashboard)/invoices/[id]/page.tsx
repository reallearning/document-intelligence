"use client";
import { InvoiceInformationSidebar } from "@/components/invoice-information-sidebar";
import React from "react";

const invoiceDetails = [
  {
    id: "invoice_001",
    invoiceName: "Achme Technologies",
    assignedTo: "nidhi@adhe.com",
    pdfUrl: "/documents/invoice/invoice1.pdf",
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
  return (
    <div className="flex flex-1">
      {/* TODO: Uncomment and pass the selected invoice object to see the invoice information sidebar */}
      {/* <InvoiceInformationSidebar /> */}
    </div>
  );
};

export default InvoiceDetails;

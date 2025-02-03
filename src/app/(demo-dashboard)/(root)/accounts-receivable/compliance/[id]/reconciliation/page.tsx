"use client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

const invoices = [
  {
    invoiceNumber: "INV-019-9126",
    invoiceStatus: "Paid",
    invoiceAmount: "₹331,250",
    dueDate: "30th April 2024",
    paymentRecDate: "15th April 2024",
    paymentReference: "PAY-2024-001",
    pdfUrl: "/documents/contracts/medhaj-invoice-002.pdf",
  },
  {
    invoiceNumber: "INV-019-1234",
    invoiceStatus: "Paid",
    invoiceAmount: "₹356,250",
    dueDate: "30th July 2024",
    paymentRecDate: "17th July 2024",
    paymentReference: "PAY-2024-002",
    pdfUrl: "/documents/contracts/medhaj-invoice-001.pdf",
  },
  {
    invoiceNumber: "INV-019-9126",
    invoiceStatus: "Overdue",
    invoiceAmount: "₹56,250",
    dueDate: "30th October 2024",
    paymentRecDate: "-",
    paymentReference: "-",
    pdfUrl: "/documents/contracts/medhaj-po.pdf",
  },
  {
    invoiceNumber: "INV-019-1234",
    invoiceStatus: "Overdue",
    invoiceAmount: "₹56,250",
    dueDate: "30th December 2024",
    paymentRecDate: "-",
    paymentReference: "-",
    pdfUrl: "/documents/contracts/medhaj-so.pdf",
  },
];

export default function RevenueSchedule() {
  const router = useRouter();
  const params = useParams();

  const [selectedOption, setSelectedOption] =
    useState<string>("reconciliation");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedOption(value);

    router.push(`${value}`);
  };

  return (
    <div className="p-6 h-screen overflow-y-auto">
      <div className="px-4 pt-1 flex items-center justify-between mb-6">
        <p className="font-poly font-normal text-[20px] text-black">
          ACME Technologies Inc
        </p>
        <div className="">
          <select
            value={selectedOption}
            onChange={handleChange}
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg text-black"
          >
            <option value="contracts">Contracts</option>
            <option value="revenue-report">Revenue Report</option>
            <option value="revenue-schedule">Revenue Schedule</option>
            <option value="reconciliation">Reconciliation</option>
          </select>
        </div>
      </div>
      <div className="border border-[#E2E8F0] p-6">
        <div className="flex items-center gap-x-7 mb-6">
          <ComponentRecognitionStatus />
          <div>
            <TotalInvoicedCard />
            <ReceivedCard />
          </div>
        </div>
        <InvoiceTable invoices={invoices} />;
      </div>
    </div>
  );
}

function ComponentRecognitionStatus() {
  return (
    <div className="p-5 border border-[#E2E8F0] rounded-2xl min-w-[550px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="/component-status.svg"
            alt="dots"
            width={24}
            height={24}
            className="mr-2"
          />
          <p className="font-nunito font-semibold text-base text-black">
            Component Recognition Status
          </p>
        </div>
        <Image src="/dots.svg" alt="dots" width={24} height={24} />
      </div>
      <div className="mt-6">
        <div>
          <div className="flex items-center justify-between">
            <p className="font-nunito font-semibold text-sm text-black">
              License
            </p>
            <p className="font-nunito font-bold text-sm text-black">
              ₹1,25,000 / ₹3,75,000
            </p>
          </div>
          <div className="relative w-full h-6">
            <Image
              src="/license.svg"
              alt="dots"
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <p className="font-nunito font-semibold text-sm text-black">
              Implementation
            </p>
            <p className="font-nunito font-bold text-sm text-black">
              ₹1,25,000 / ₹3,75,000
            </p>
          </div>
          <div className="relative w-full h-6">
            <Image
              src="/implementation.svg"
              alt="dots"
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div className="mt-8 mb-4">
          <div className="flex items-center justify-between">
            <p className="font-nunito font-semibold text-sm text-black">
              Training
            </p>
            <p className="font-nunito font-bold text-sm text-black">
              ₹50,000 / ₹75,000
            </p>
          </div>
          <div className="relative w-full h-6">
            <Image
              src="/training.svg"
              alt="dots"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function TotalInvoicedCard() {
  return (
    <div className="p-5 border border-[#E2E8F0] rounded-2xl min-w-[300px] w-fit">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="/cart.svg"
            alt="cart"
            width={24}
            height={24}
            className="mr-2"
          />
          <p className="font-nunito font-normal text-sm text-[#111827]">
            Total Invoiced
          </p>
        </div>
        <Image src="/dots.svg" alt="dots" width={24} height={24} />
      </div>
      <p className="mt-4 font-nunito text-[32px] font-bold leading-[42px] text-[#111827]">
        ₹8,00,000
      </p>
    </div>
  );
}

function ReceivedCard() {
  return (
    <div className="p-5 border border-[#E2E8F0] rounded-2xl min-w-[350px] mt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="/received.svg"
            alt="cart"
            width={24}
            height={24}
            className="mr-2"
          />
          <p className="font-nunito font-normal text-sm text-[#111827]">
            Total Amount Cleared
          </p>
        </div>
        <Image src="/dots.svg" alt="dots" width={24} height={24} />
      </div>
      <p className="mt-4 font-nunito text-[32px] font-bold leading-[42px] text-[#111827]">
        ₹6,87,500
      </p>
      <p className="font-nunito text-[10px] font-normal text-[#4B5563]">
        /8,00,000
      </p>
      <div className="relative w-full h-6">
        <Image
          src="/received-line.svg"
          alt="dots"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}

interface Invoice {
  invoiceNumber: string;
  invoiceStatus: string;
  invoiceAmount: string;
  dueDate: string;
  paymentRecDate: string;
  paymentReference: string;
  pdfUrl: string;
}

interface InvoiceTableProps {
  invoices: Invoice[];
}

const InvoiceTable: React.FC<InvoiceTableProps> = ({ invoices }) => {
  const handleClick = (pdfUrl: string) => {
    if (!pdfUrl) {
      console.error("Invalid PDF URL: URL cannot be empty.");
      return;
    }

    const newTab = window.open(pdfUrl, "_blank");
    if (!newTab) {
      console.error(
        "Failed to open PDF URL in a new tab. Pop-up blocker might be enabled."
      );
    } else {
      newTab.focus();
    }
  };

  const StatusContainerCSS = (risk: string) => {
    if (risk === "High")
      return "bg-[#D0121229] text-[#DC2626] px-3 py-1 rounded-lg text-xs";
    if (risk === "Paid")
      return "bg-[#ECFEFF] text-[#0891B2] px-3 py-1 rounded-lg text-xs";
    if (risk === "Overdue")
      return "bg-[#EFF6FF] text-[#2563EB] px-3 py-1 rounded-lg text-xs";
    return "";
  };

  return (
    <div className="p-4 border border-[#E2E8F0] rounded-2xl h-full w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Image
            src="/book.svg"
            alt="users"
            width={24}
            height={24}
            className="mr-2"
          />
          <p className="font-nunito font-medium text-sm text-[#111827]">
            Invoices
          </p>
        </div>
        <div className="px-4 py-2 rounded-lg border border-[#E2E8F0] flex items-center">
          <Image
            src="/search-2.svg"
            alt="search"
            width={24}
            height={24}
            className="mr-2"
          />
          <p className="font-nunito font-normal text-[12px] text-[#4B5563] mr-10">
            Search
          </p>
        </div>
      </div>
      <div className="mt-4 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-sm font-medium text-[#9CA3AF] bg-[#F9FAFB]">
              <th className="rounded-tl-xl rounded-bl-xl px-4 py-2">
                Invoice Number
              </th>
              <th className="px-4 py-2">Invoice Status</th>
              <th className="px-4 py-2">Invoice Amount</th>
              <th className="px-4 py-2">Due Date</th>
              <th className="px-4 py-2">Payment Rec. Date</th>
              <th className="px-4 py-2">Payment Reference</th>
              <th className="rounded-tr-xl rounded-br-xl px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, idx) => (
              <tr
                key={idx}
                className={`text-sm text-[#1E293B] font-normal border-b border-[#E2E8F0] ${
                  idx === invoices.length - 1 ? "border-transparent" : ""
                }`}
              >
                <td
                  className="px-4 py-3 cursor-pointer"
                  onClick={() => handleClick(invoice.pdfUrl)}
                >
                  {invoice.invoiceNumber}
                </td>
                <td className="px-4 py-3">
                  {invoice.invoiceStatus && (
                    <span
                      className={`${StatusContainerCSS(invoice.invoiceStatus)}`}
                    >
                      {invoice.invoiceStatus}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">{invoice.invoiceAmount}</td>
                <td className="px-4 py-3">{invoice.dueDate}</td>
                <td className="px-4 py-3">{invoice.paymentRecDate}</td>
                <td className="px-4 py-3">{invoice.paymentReference}</td>
                <td className="px-4 py-3">
                  {" "}
                  <Image src="/dots.svg" alt="dots" width={24} height={24} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

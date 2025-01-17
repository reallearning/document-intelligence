"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ReviewDashboard: React.FC = () => {
  return (
    <div className="w-full p-6 h-screen overflow-y-auto">
      <div className="flex justify-between items-center ">
        <p className="font-poly text-xl font-normal text-black">
          Oaktree Capital Management
        </p>
        <div className="flex border-b border-[#E2E8F0] px-4 py-2">
          <p className="font-nunito font-semibold text-sm text-black">
            Revenue Reports
          </p>
          <Image
            src="/drop-down.svg"
            alt="search"
            width={12}
            height={12}
            className="ml-4"
          />
        </div>
      </div>
      <div className="border border-[#E2E8F0]  mt-5 p-6">
        <div className="flex justify-between">
          <div className="flex gap-6">
            <ContractStatusCard />
            <PendingPaymentsCard />
          </div>
          <div>
            <button className="text-white text-lg font-nunito font-medium bg-[#7C3AED] px-8 py-2 rounded-lg">
              Download Data
            </button>
          </div>
        </div>
        <div className="mt-6 flex gap-x-6">
          <ActualVEstimatedCashFlow />
          <CollectionTrends />
        </div>
        <InvoicesDatabase />
      </div>
    </div>
    // <div className="border border-[#E2E8F0] flex mt-5 p-6"></div>
  );
};

function CollectionTrends() {
  return (
    <div className="border border-[#E2E8F0] rounded-2xl p-5 w-[30%]">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="/collections.svg"
            alt="cart"
            width={24}
            height={24}
            className="mr-2"
          />
          <p className="font-nunito font-medium text-sm text-[#111827]">
            Collection Trends
          </p>
        </div>
        <Image src="/dots.svg" alt="dots" width={24} height={24} />
      </div>
      <div className="relative mt-6 w-full h-[200px]">
        <Image
          src="/half-chart.svg"
          alt="Bar chart"
          fill
          className="object-contain"
        />
      </div>
      <div className="flex mt-4 justify-between items-center">
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-[#FBBF24] mr-1"></div>
          <p className="font-nunito font-normal text-[10px] text-[#4B5563]">
            On Time
          </p>
        </div>
        <p className="font-nunito font-semibold text-[10px] text-[#111827]">
          50%
        </p>
      </div>
      <div className="flex mt-4 justify-between items-center">
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-[#7C3AED] mr-1"></div>
          <p className="font-nunito font-normal text-[10px] text-[#4B5563]">
            Delayed &lt; 30 days
          </p>
        </div>
        <p className="font-nunito font-semibold text-[10px] text-[#111827]">
          33%
        </p>
      </div>
      <div className="flex mt-4 justify-between items-center">
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-[#F43F5E] mr-1"></div>
          <p className="font-nunito font-normal text-[10px] text-[#4B5563]">
            Delayed &gt; 30 days
          </p>
        </div>
        <p className="font-nunito font-semibold text-[10px] text-[#111827]">
          27%
        </p>
      </div>
    </div>
  );
}

interface Customer {
  id: string;
  customerName: string;
  status: string;
  invoices: number | string;
  overdueAmount: string;
  overdueBy: string;
  riskAlert: string | null;
}

interface ICustomerDatabaseProps {
  customerDatabase: Customer[];
}

const InvoicesDatabase: React.FC<{}> = () => {
  const invoices = [
    {
      invoiceNumber: "INV-001-1234",
      invoiceStatus: "Overdue",
      invoiceAmount: "Rs.25,000",
      dueDate: "12th September 2024",
      paymentRecDate: "-",
      paymentDetails: "-",
    },
    {
      invoiceNumber: "INV-001-1235",
      invoiceStatus: "Overdue",
      invoiceAmount: "Rs.18,500",
      dueDate: "12th September 2024",
      paymentRecDate: "-",
      paymentDetails: "-",
    },
    {
      invoiceNumber: "INV-001-1236",
      invoiceStatus: "Overdue",
      invoiceAmount: "Rs.15,000",
      dueDate: "12th September 2024",
      paymentRecDate: "-",
      paymentDetails: "-",
    },
    {
      invoiceNumber: "INV-001-1237",
      invoiceStatus: "Overdue",
      invoiceAmount: "Rs.20,000",
      dueDate: "12th September 2024",
      paymentRecDate: "-",
      paymentDetails: "-",
    },
    {
      invoiceNumber: "INV-001-1238",
      invoiceStatus: "Within Due",
      invoiceAmount: "Rs.50,000",
      dueDate: "25th September 2024",
      paymentRecDate: "-",
      paymentDetails: "-",
    },
    {
      invoiceNumber: "INV-001-1239",
      invoiceStatus: "Paid",
      invoiceAmount: "Rs.40,000",
      dueDate: "1st September 2024",
      paymentRecDate: "3rd September 2024",
      paymentDetails: "-",
    },
    {
      invoiceNumber: "INV-001-1240",
      invoiceStatus: "Paid",
      invoiceAmount: "Rs.35,000",
      dueDate: "1st September 2024",
      paymentRecDate: "3rd September 2024",
      paymentDetails: "-",
    },
  ];

  const RiskAlertContainerCSS = (risk: string) => {
    if (risk === "High")
      return "bg-[#D0121229] text-[#DC2626] px-3 py-1 rounded-lg text-xs";
    if (risk === "Medium")
      return "bg-[#ECFEFF] text-[#0891B2] px-3 py-1 rounded-lg text-xs";
    return "";
  };

  const StatusContainerCSS = (status: string) => {
    if (status === "Within Due")
      return "bg-[#F5F3FF] text-[#7C3AED] px-3 py-1 rounded-lg text-xs";
    if (status === "Paid")
      return "bg-[#ECFEFF] text-[#0891B2] px-3 py-1 rounded-lg text-xs";
    if (status === "Overdue")
      return "bg-[#EFF6FF] text-[#2563EB] px-3 py-1 rounded-lg text-xs";
    return "";
  };

  return (
    <div className="border border-[#E2E8F0] mt-5 p-6 rounded-2xl">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Image
            src="/book.svg"
            alt="dots"
            width={24}
            height={24}
            className="mr-2"
          />
          <p className="font-nunito font-medium  text-sm text-black">
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
              <th className="px-4 py-2">Payment Details</th>
              <th className="rounded-tr-xl rounded-br-xl px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, idx) => (
              <tr
                key={idx}
                className={`text-sm text-[#1E293B] border-b border-[#E2E8F0] font-poly font-normal ${
                  idx === invoices.length - 1 ? "border-transparent" : ""
                }`}
              >
                <td className="px-4 py-3 cursor-pointer">
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
                <td className="px-4 py-3">{invoice.paymentDetails}</td>
                <td className="px-4 py-3">
                  <Image
                    src="/dots.svg"
                    alt="dots"
                    width={24}
                    height={24}
                    className="mr-2"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

function ActualVEstimatedCashFlow() {
  return (
    <div className="border border-[#E2E8F0] rounded-2xl p-5 w-[70%]">
      <div className="relative w-full h-[90%]">
        <Image
          src="/bar-chart-2.svg"
          alt="Bar chart"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}

function ContractStatusCard() {
  return (
    <div className="p-5 border border-[#E2E8F0] rounded-2xl min-w-[300px]">
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
            Contract Status
          </p>
        </div>
        <Image src="/dots.svg" alt="dots" width={24} height={24} />
      </div>
      <p className="mt-6 font-nunito text-[32px] font-bold leading-[42px] text-[#0891B2]">
        Active
      </p>
    </div>
  );
}

function PendingPaymentsCard() {
  return (
    <div className="p-5 border border-[#E2E8F0] rounded-2xl min-w-[300px]">
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
            Pending Payments
          </p>
        </div>
        <Image src="/dots.svg" alt="dots" width={24} height={24} />
      </div>
      <p className="mt-6 font-nunito text-[32px] font-bold leading-[42px] text-[#111827]">
        ₹ 78,598.00
      </p>
      ;
    </div>
  );
}

interface Account {
  customer: string;
  overdue: string;
  pastDue: string;
}

interface TopOverdueAccountsProps {
  accounts: Account[];
}

const TopOverdueAccounts: React.FC<TopOverdueAccountsProps> = ({
  accounts,
}) => {
  return (
    <div className="p-4 border border-[#E2E8F0] rounded-2xl h-full w-full">
      <div className="flex items-center">
        <Image
          src="/upwards.svg"
          alt="upwards"
          width={24}
          height={24}
          className="mr-2"
        />
        <p className="font-nunito font-[500] text-sm text-[#111827]">
          Top 10 Overdue Accounts
        </p>
      </div>
      <div className="mt-4 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-sm font-medium text-[#9CA3AF] bg-[#F9FAFB]">
              <th className="rounded-tl-xl rounded-bl-xl px-4 py-2">
                Customer
              </th>
              <th className="px-4 py-2">Overdue</th>
              <th className="rounded-tr-xl rounded-br-xl px-4 py-2">
                Past Due
              </th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account, idx) => (
              <tr
                key={idx}
                className={`text-sm text-[#1E293B] font-normal border-b border-[#E2E8F0] ${
                  idx === accounts.length - 1 ? "border-transparent" : ""
                }`}
              >
                <td className="px-4 py-3">{account.customer}</td>
                <td className="px-4 py-3">{account.overdue}</td>
                <td className="px-4 py-3">{account.pastDue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReviewDashboard;

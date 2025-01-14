"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";

const Page: React.FC = () => {
  return (
    <div className="w-full p-6 h-screen overflow-y-auto">
      <div className="flex justify-between items-center ">
        <p className="font-poly text-xl font-normal text-black">
          Phoenix Supplies Ltd.
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
            <PendingPaymentsCard />
            <ContractStatusCard />
          </div>
          <div>
            <button className="text-white text-lg font-nunito font-medium bg-[#7C3AED] px-8 py-2 rounded-lg">
              Download Data
            </button>
          </div>
        </div>
        <div className="mt-6 flex gap-x-6">
          <ActualVEstimatedCashFlow />
          <PendingPayments />
        </div>
        <InvoicesDatabase />
      </div>
    </div>
  );
};

function PendingPayments() {
  return (
    <div className="border border-[#E2E8F0] rounded-2xl p-5 w-[30%]">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="/pie.svg"
            alt="cart"
            width={24}
            height={24}
            className="mr-2"
          />
          <p className="font-nunito font-semibold text-sm text-[#111827]">
            Pending Payments
          </p>
        </div>
        <Image src="/dots.svg" alt="dots" width={24} height={24} />
      </div>
      <div className="relative mt-6 w-full h-[200px]">
        <Image
          src="/pie-chart.svg"
          alt="Bar chart"
          fill
          className="object-contain"
        />
      </div>
      <div className="flex justify-evenly">
        <div className="flex mt-4 justify-between items-center">
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-[#FBBF24] mr-1"></div>
            <p className="font-nunito font-normal text-[10px] text-[#4B5563]">
              On Time
            </p>
          </div>
        </div>
        <div className="flex mt-4 justify-between items-center">
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-[#7C3AED] mr-1"></div>
            <p className="font-nunito font-normal text-[10px] text-[#4B5563]">
              Delayed &lt; 30 days
            </p>
          </div>
        </div>
        <div className="flex mt-4 justify-between items-center">
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-[#F43F5E] mr-1"></div>
            <p className="font-nunito font-normal text-[10px] text-[#4B5563]">
              Overdue &gt; 30 days
            </p>
          </div>
        </div>
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
      invoiceNumber: "INV-2025-001",
      status: "Within Due",
      amount: "Rs.40,000",
      dueDate: "31st September 2024",
      paymentRecDate: "-",
      paymentDetails: "-",
    },
    {
      invoiceNumber: "INV-2025-002",
      status: "Within Due",
      amount: "Rs.12,000",
      dueDate: "28th September 2024",
      paymentRecDate: "-",
      paymentDetails: "-",
    },
    {
      invoiceNumber: "INV-2025-003",
      status: "Overdue <30 days",
      amount: "Rs.30,000",
      dueDate: "31st December 2024",
      paymentRecDate: "-",
      paymentDetails: "-",
    },
    {
      invoiceNumber: "INV-2025-004",
      status: "Overdue >30 days",
      amount: "Rs.25,000",
      dueDate: "30th November 2024",
      paymentRecDate: "-",
      paymentDetails: "-",
    },
    {
      invoiceNumber: "INV-2025-005",
      status: "Overdue <30 days",
      amount: "Rs.11,999",
      dueDate: "27th December 2024",
      paymentRecDate: "-",
      paymentDetails: "-",
    },
  ];

  const router = useRouter();
  const params = useParams();

  const handleClick = (redirectTo: string, index: number) => {
    if (index <= 1 && redirectTo) {
      router.push(`/accounts-payable/${params.id}/${redirectTo}`);
    }
  };

  const StatusContainerCSS = (status: string) => {
    if (status === "Pending Approval")
      return "bg-[#F5F3FF] text-[#7C3AED] px-3 py-1 rounded-lg text-xs";
    if (status === "Auto Approved")
      return "bg-[#ECFEFF] text-[#0891B2] px-3 py-1 rounded-lg text-xs";
    if (status === "Cleared")
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
                onClick={() => handleClick(invoice.invoiceNumber, idx)}
              >
                <td className="px-4 py-3 cursor-pointer">
                  {invoice.invoiceNumber}
                </td>
                <td className="px-4 py-3">
                  {invoice.status && (
                    <span className={`${StatusContainerCSS(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">{invoice.amount}</td>
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
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="/analysis.svg"
            alt="dots"
            width={24}
            height={24}
            className="mr-2"
          />
          <p className="font-nunito text-sm fomt-normal text-black">
            Actual vs Estimated Cash Flow
          </p>
        </div>
        <div className="flex items-center">
          <div className="flex items-center mr-4">
            <div className="w-3 h-3 rounded-sm bg-[#E2E8F0] mr-1"></div>
            <p className="font-nunito text-[10px] font-normal text-[#4B5563]">
              Estimated
            </p>
          </div>
          <div className="flex items-center mr-4">
            <div className="w-3 h-3 rounded-sm bg-[#7C3AED] mr-1"></div>
            <p className="font-nunito text-[10px] font-normal text-[#4B5563]">
              Actual
            </p>
          </div>
          <div className="flex items-center mr-4">
            <div className="w-3 h-3 rounded-sm bg-[#9CA3AF] mr-1"></div>
            <p className="font-nunito text-[10px] font-normal text-[#4B5563]">
              Forecasted
            </p>
          </div>
          <div className="flex px-4 py-2 rounded-lg border border-[#E2E8F0]">
            <p className="font-poly font-normal text-[10px] text-[#4B5563] mr-2 items-center">
              Monthly
            </p>
            <Image
              src="/drop-down.svg"
              alt="Bar chart"
              height={12}
              width={12}
            />
          </div>
        </div>
      </div>
      <div className="relative mt-6 w-[80%] h-[200px] flex justify-start items-start">
        <Image
          src="/bar-chart.svg"
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
        ₹118,999
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

export default Page;

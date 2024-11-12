"use client";
import { Button } from "@/components/button";
import { useState } from "react";
import DeliverableTable from "./deliverable-table";
import { usePathname, useRouter } from "next/navigation";

export default function RevenueReporting() {
  const router = useRouter();
  const pathname = usePathname();

  const id = pathname
    .split("/")
    .filter((segment) => segment !== "revenue-reporting")
    .pop();

  const handleClick = () => {
    router.replace(`/deals/${id}`);
  };

  return (
    <div className="px-4 py-10 w-full flex flex-col gap-10 h-full overflow-auto">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-poly font-normal text-xl leading-[18px] text-black mb-2">
            ACME Technologies
          </p>
          <p className="mb-2 text-[#9C9C9C] font-nunito font-normal text-sm leading-[18px]">
            Assigned to: nidhi@adhe.com
          </p>
          <div className="flex items-center justify-center px-2 py-1 rounded-full bg-[#3C716742] bg-opacity-30 max-w-[40%]">
            <p className="text-[#3C7167] font-nunito font-normal text-xs leading-[18px]">
              Active
            </p>
          </div>
        </div>
        <div className="flex gap-x-5">
          <Button
            color="secondary-default"
            size="xs"
            onClick={handleClick}
            className="px-4 font-nunito text-morrie-primary rounded-md"
          >
            View Contract
          </Button>
        </div>
      </div>
      <div className="w-full">
        <h2 className="font-nunito font-normal text-xl leading-[18px] text-black">
          Revenue Reporting
        </h2>
      </div>
      <main className="flex items-center justify-center w-full">
        <BentoGrid />
      </main>
    </div>
  );
}

interface Item {
  type: string;
  date: string;
  amount: string;
  description?: string;
  reference?: string;
  dueDate?: string;
  paidOnDate?: string;
  dueInDays?: string;
}

interface ItemListProps {
  title: string;
  items: Item[];
}

const transactions: Item[] = [
  {
    type: "Payment Receipt",
    date: "2024-02-10",
    amount: "$35,000",
    description: "Payment received for INV-001",
  },
  {
    type: "Invoice Generated",
    date: "2024-02-15",
    amount: "$15,000",
    description: "Invoice for Implementation and Training",
    reference: "INV-002",
  },
];

const payments: Item[] = [
  {
    type: "Due",
    date: "2024-02-14",
    amount: "$35,000",
    reference: "INV-001",
    paidOnDate: "2024-02-10",
    dueInDays: "+4 days",
  },
  {
    type: "Due",
    date: "2024-03-15",
    amount: "$35,000",
    reference: "INV-002",
    dueInDays: "Due in 5 days",
  },
];

const ItemList: React.FC<ItemListProps> = ({ title, items }) => {
  return (
    <div className="bg-[#F1EFE9] p-4 rounded-lg shadow-sm">
      <h2 className="text-[#9C9C9C] text-md font-medium mb-4">{title}</h2>
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-lg mb-4 flex justify-between items-start"
        >
          <div>
            <h3 className="font-medium text-md text-black">
              {item.type}
              {item.date && (
                <span className="text-sm text-[#8C8C8C]"> {item.date}</span>
              )}
              {item.dueInDays && (
                <span className="text-sm text-gray-500"> {item.dueInDays}</span>
              )}
            </h3>
            {item.description && (
              <p className="text-[#8F8F8F] font-nunito font-medium text-sm leading-[18px]">
                {item.description}
              </p>
            )}
            {item.reference && (
              <p className="text-[#8F8F8F] font-nunito font-medium text-sm leading-[18px]">
                {item.type === "Due" ? "Invoice:" : "Ref:"} {item.reference}
              </p>
            )}
            {item.paidOnDate && (
              <p className="text-[#8F8F8F] font-nunito font-medium text-sm leading-[18px]">
                Paid on: {item.paidOnDate}
              </p>
            )}
            {item.dueInDays && (
              <p className="text-[#D01212] font-nunito font-medium text-sm leading-[18px]">
                {item.dueInDays}
              </p>
            )}
          </div>
          <div className="text-black text-md font-medium items-start flex">
            {item.amount}
          </div>
        </div>
      ))}
    </div>
  );
};

interface InvoiceItem {
  description: string;
  type: string;
  amount: string;
}

interface PaymentDetails {
  paymentDate: string;
  method: string;
  reference: string;
  bank: string;
}

interface Invoice {
  invoiceNumber: string;
  generatedDate: string;
  dueDate: string;
  amount: string;
  status: "paid" | "outstanding";
  items: InvoiceItem[];
  paymentDetails?: PaymentDetails;
}

const invoices: Invoice[] = [
  {
    invoiceNumber: "INV-001",
    generatedDate: "2024-01-15",
    dueDate: "2024-02-14",
    amount: "$35,000",
    status: "paid",
    items: [
      {
        description: "Software License - Q1",
        type: "License",
        amount: "$6,250",
      },
      {
        description: "Implementation - Planning",
        type: "Services",
        amount: "$10,000",
      },
      {
        description: "Implementation - Setup (50%)",
        type: "Services",
        amount: "$7,500",
      },
      { description: "License Prepayment", type: "License", amount: "$11,250" },
    ],
    paymentDetails: {
      paymentDate: "2024-02-10",
      method: "Wire Transfer",
      reference: "WT20240210-001",
      bank: "Bank of America",
    },
  },
  {
    invoiceNumber: "INV-002",
    generatedDate: "2024-02-15",
    dueDate: "2024-03-15",
    amount: "$15,000",
    status: "outstanding",
    items: [
      {
        description: "Implementation - Setup (Remaining)",
        type: "Services",
        amount: "$7,500",
      },
      {
        description: "Basic Training Advance",
        type: "Training",
        amount: "$7,500",
      },
    ],
  },
];

export const Invoices: React.FC = () => {
  return (
    <div className="bg-[#F1EFE9] p-4 rounded-lg shadow-sm">
      <h2 className="text-[#9C9C9C] text-md font-medium mb-4">Invoices</h2>
      {invoices.map((invoice, index) => (
        <div key={index} className="bg-white p-4 rounded-lg mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-md font-nunito text-gray-900">
              {invoice.invoiceNumber}
            </h3>
            <span className="text-black font-semibold text-sm">
              {invoice.amount}
            </span>
          </div>
          <div className="flex flex-row justify-between">
            <div className="w-full">
              <p className="text-sm text-gray-500 font-normal self-stretch">
                Generated: {invoice.generatedDate} | Due: {invoice.dueDate}
              </p>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-[10px] leading-[10px] font-normal self-center ${
                invoice.status === "paid"
                  ? "text-green-500 bg-green-100"
                  : "text-yellow-500 bg-yellow-100"
              }`}
            >
              {invoice.status}
            </div>
          </div>
          <table className="w-full mt-4 text-left text-sm">
            <thead className="bg-[#D9D9D959]">
              <tr className="text-gray-600 border-b">
                <th className="px-1 py-1">Description</th>
                <th className="px-1 py-1">Type</th>
                <th className="px-1 py-1">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, idx) => (
                <tr key={idx} className="border-t text-black">
                  <td className="px-1 py-1">{item.description}</td>
                  <td className="px-1 py-1">{item.type}</td>
                  <td className="px-1 py-1">{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {invoice.paymentDetails && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-4">
                Payment Details
              </h4>

              {/* Two-column grid layout */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                {/* Payment Date */}
                <div>
                  <div className="text-sm text-gray-500 font-medium">
                    Payment Date
                  </div>
                  <div className="text-sm text-gray-900">
                    {invoice.paymentDetails.paymentDate}
                  </div>
                </div>

                {/* Method */}
                <div>
                  <div className="text-sm text-gray-500 font-medium">
                    Method
                  </div>
                  <div className="text-sm text-gray-900">
                    {invoice.paymentDetails.method}
                  </div>
                </div>

                {/* Reference */}
                <div>
                  <div className="text-sm text-gray-500 font-medium">
                    Reference
                  </div>
                  <div className="text-sm text-gray-900">
                    {invoice.paymentDetails.reference}
                  </div>
                </div>

                {/* Bank */}
                <div>
                  <div className="text-sm text-gray-500 font-medium">Bank</div>
                  <div className="text-sm text-gray-900">
                    {invoice.paymentDetails.bank}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// BentoGrid.tsx

export const BentoGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Left Column: ItemLists and Deliverables */}
      <div className="lg:col-span-2 space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Transactions and Payments in one row */}
          <ItemList title="Transactions" items={transactions} />
          <ItemList title="Payments" items={payments} />
        </div>

        {/* Deliverables Table below the ItemLists */}
        <div>
          <DeliverableTable />
        </div>
      </div>

      {/* Right Column: Invoices spanning the height of both rows */}
      <div className="lg:row-span-2 w-full">
        <Invoices />
      </div>
    </div>
  );
};

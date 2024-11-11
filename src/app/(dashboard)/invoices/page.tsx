"use client";

import { FunnelIcon, ViewColumnsIcon } from "@heroicons/react/24/outline";
import InvoicesTable from "./invoices-table";
import { Button } from "@/components/button";

const InvoicePage = () => {
  const invoices = [
    {
      id: "invoice-01",
      name: "INV-AGD-1204",
      source: "Salesforce",
      type_of_document: "Invoice",
      added_on: "31-Dec-2023",
      assignee: "nidhi@ahdc.com",
      last_modified_on: "13-Jan-2024",
    },
    {
      id: "invoice-02",
      name: "INV-AGD-1205",
      source: "SAP",
      type_of_document: "Invoice",
      added_on: "01-Jan-2024",
      assignee: "john@ahdc.com",
      last_modified_on: "15-Jan-2024",
    },
    {
      id: "invoice-03",
      name: "INV-AGD-1206",
      source: "QuickBooks",
      type_of_document: "Invoice",
      added_on: "02-Jan-2024",
      assignee: "emma@ahdc.com",
      last_modified_on: "16-Jan-2024",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-6 pl-5 py-9">
      <h2 className="font-poly font-normal text-xl leading-[18px] text-black">
        Documents
      </h2>
      <div className="flex flex-col w-full gap-5">
        <div className="flex justify-start items-center flex-1">
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Search for documents"
              className="w-full py-3 px-4 pl-10 rounded-lg border border-[#D9D9D9] focus:outline-none focus:ring-2 focus:ring-morrie-primary"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              width="20"
              height="20"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <div className="flex justify-between items-center flex-1 pr-9">
          <Button
            color="secondary-default"
            size="xs"
            className="px-4 border-[#D9D9D9] font-nunito text-[#4A463A]"
            startIcon={<FunnelIcon className="size-4 text-black" />}
          >
            Filters
          </Button>
          <Button
            color="secondary-default"
            size="xs"
            className="px-4 border-[#D9D9D9] font-nunito text-[#4A463A]"
            startIcon={<ViewColumnsIcon className="size-4 text-black" />}
          >
            Columns
          </Button>
        </div>
      </div>
      <InvoicesTable invoices={invoices} />
    </div>
  );
};

export default InvoicePage;

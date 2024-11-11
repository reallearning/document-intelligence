"use client";
import { Button } from "@/components/button";
import DealsTable from "./deals-table";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { ViewColumnsIcon } from "@heroicons/react/24/outline";

const DealsPage = () => {
  const deals = [
    {
      id: "1",
      name: "ACME Technologies",
      assignee: "nidhi@ahdc.com",
      company_name: "ACME Technologies",
      deal_type: "Direct Deal",
      contract_date: "14-Jul-2024",
      start_date: "01-Aug-2024",
      payment_terms: "NET45",
      review_status: "PENDING",
    },
    {
      id: "2",
      name: "MasterTrack Services",
      assignee: "nidhi@ahdc.com",
      company_name: "MasterTrack Services",
      deal_type: "Reseller Deal",
      contract_date: "21-Jan-2019",
      start_date: "25-Jan-2019",
      payment_terms: "NET45",
      review_status: "COMPLETE",
    },
    {
      id: "3",
      name: "SuperCell Tech",
      assignee: "nidhi@ahdc.com",
      company_name: "SuperCell Technologies",
      deal_type: "Direct Deal",
      contract_date: "09-Nov-2021",
      start_date: "15-Jan-2022",
      payment_terms: "NET45",
      review_status: "COMPLETE",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-6 pl-5 py-9">
      <h2 className="font-poly font-normal text-xl leading-[18px] text-black">
        Deals
      </h2>
      <div className="flex flex-col w-full gap-5">
        <div className="flex justify-start items-center flex-1">
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Search for deal, company"
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
      <DealsTable deals={deals} />
    </div>
  );
};

export default DealsPage;

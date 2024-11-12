"use client";
import { Button } from "@/components/button";
import DealsTable from "./deals-table";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { ViewColumnsIcon } from "@heroicons/react/24/outline";

const DealsPage = () => {
  const deals = [
    {
      id: "deal_003",
      name: "PaxMedica Inc.",
      assignee: "support@paxmedica.com",
      company_name: "PaxMedica Inc.",
      deal_type: "Direct Deal",
      contract_date: "07-Feb-2020",
      start_date: "25-May-2018",
      payment_terms: "NET30",
      review_status: "COMPLETE",
    },
    {
      id: "deal_004",
      name: "Rise Education Group",
      assignee: "support@riseeducation.com",
      company_name: "Rise Education Group",
      deal_type: "Direct Deal",
      contract_date: "17-Apr-2020",
      start_date: "25-Sep-2018",
      payment_terms: "Quarterly",
      review_status: "PENDING",
    },
    {
      id: "deal_005",
      name: "Oaktree Capital Management",
      assignee: "support@oaktreecapital.com",
      company_name: "Oaktree Capital Management",
      deal_type: "Sub-Advisory Agreement",
      contract_date: "02-Mar-2020",
      start_date: "25-Sep-2018",
      payment_terms: "Periodically as agreed",
      review_status: "PENDING",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-6 pl-5 py-9">
      <h2 className="font-poly font-normal text-xl leading-[18px] text-black">
        Deals
      </h2>
      {/* <div className="flex flex-col w-full gap-5">
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
      </div> */}
      <DealsTable deals={deals} />
    </div>
  );
};

export default DealsPage;

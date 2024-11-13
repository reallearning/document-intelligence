"use client";
import DealsTable from "./deals-table";

const DealsPage = () => {
  const deals = [
    {
      id: "deal_001",
      name: "ACME Technologies Inc.",
      assignee: "bence.nemeth@adhe.com",
      company_name: "ACME Technologies Inc.",
      deal_type: "Service Agreement",
      contract_date: "15-Jan-2024",
      start_date: "15-Jan-2024",
      payment_terms: "NET45",
      review_status: "PENDING",
    },
    {
      id: "deal_003",
      name: "PaxMedica Inc.",
      assignee: "malgorzata@adhe.com",
      company_name: "PaxMedica Inc.",
      deal_type: "Direct Deal",
      contract_date: "25-May-2018",
      start_date: "07-Feb-2020",
      payment_terms: "NET30",
      review_status: "COMPLETE",
    },
    {
      id: "deal_004",
      name: "Rise Education Group",
      assignee: "dani@adhe.com",
      company_name: "Rise Education Group",
      deal_type: "Direct Deal",
      contract_date: "25-Sep-2018",
      start_date: "17-Apr-2020",
      payment_terms: "Quarterly",
      review_status: "PENDING",
    },
    {
      id: "deal_005",
      name: "Oaktree Capital Management",
      assignee: "peter@adhe.com",
      company_name: "Oaktree Capital Management",
      deal_type: "Sub-Advisory Agreement",
      contract_date: "25-Sep-2018",
      start_date: "02-Mar-2020",
      payment_terms: "Periodically as agreed",
      review_status: "PENDING",
    },
    {
      id: "deal_006",
      name: "Zenith Solutions LLC",
      assignee: "susan@adhe.com",
      company_name: "Zenith Solutions LLC",
      deal_type: "Partnership Agreement",
      contract_date: "12-Mar-2019",
      start_date: "01-Jun-2019",
      payment_terms: "NET60",
      review_status: "PENDING",
    },
    {
      id: "deal_007",
      name: "Blue Ocean Industries",
      assignee: "carla@adhe.com",
      company_name: "Blue Ocean Industries",
      deal_type: "Service Agreement",
      contract_date: "15-Aug-2021",
      start_date: "01-Sep-2021",
      payment_terms: "NET90",
      review_status: "PENDING",
    },
    {
      id: "deal_008",
      name: "Alpha Fintech Ltd.",
      assignee: "steven@adhe.com",
      company_name: "Alpha Fintech Ltd.",
      deal_type: "Licensing Agreement",
      contract_date: "20-Feb-2022",
      start_date: "01-Apr-2022",
      payment_terms: "Annually",
      review_status: "PENDING",
    },
    {
      id: "deal_009",
      name: "Gamma Innovations",
      assignee: "lucas@adhe.com",
      company_name: "Gamma Innovations",
      deal_type: "Consulting Agreement",
      contract_date: "10-Jun-2023",
      start_date: "01-Jul-2023",
      payment_terms: "Monthly",
      review_status: "Pending",
    },
    {
      id: "deal_010",
      name: "Delta Health Systems",
      assignee: "maria@adhe.com",
      company_name: "Delta Health Systems",
      deal_type: "Service Agreement",
      contract_date: "05-Oct-2023",
      start_date: "15-Oct-2023",
      payment_terms: "NET45",
      review_status: "PENDING",
    },
    {
      id: "deal_011",
      name: "Sigma Solutions",
      assignee: "james@adhe.com",
      company_name: "Sigma Solutions",
      deal_type: "Direct Deal",
      contract_date: "30-Jan-2022",
      start_date: "01-Feb-2022",
      payment_terms: "NET60",
      review_status: "COMPLETE",
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

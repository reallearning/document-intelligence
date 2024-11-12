"use client";
import { Button } from "@/components/button";
import Tabs from "./components/tabs";
import ContractInfoCard from "./components/contract-info-card";
import ComplianceReview from "./components/compliance-review";
import RevenueSchedule from "./components/revenue-schedule";
import { useParams, usePathname, useRouter } from "next/navigation";

const tabs = [
  {
    id: 1,
    label: "Compliance Review",
    content: <ComplianceReview />,
  },
  {
    id: 2,
    label: "Revenue Schedule",
    content: <RevenueSchedule />,
  },
];

export default function ReviewContract() {
  const router = useRouter();

  const params = useParams();
  const id = params.id;

  const handleViewContractClick = () => {
    router.back();
  };

  const handleMarkReviewClick = () => {
    router.push(`/deals/${id}/revenue-reporting`);
  };
  
  return (
    <div className="px-4 py-10 w-full overflow-y-auto h-screen">
      <div className="flex justify-between items-start">
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
            className="px-4 py-2 font-nunito font-medium text-sm text-morrie-primary rounded-md"
            onClick={handleViewContractClick}
          >
            View Contract
          </Button>
          <Button
            color="primary-default"
            size="xs"
            className="px-4 py-2 font-nunito font-medium text-sm rounded-md text-white"
            onClick={handleMarkReviewClick}
          >
            Mark Reviewed
          </Button>
        </div>
      </div>
      <div className="flex gap-x-5 mt-5">
        <ContractInfoCard label="Contract Value" value="$150,000" />
        <ContractInfoCard label="Term" value="36 Months" />
        <ContractInfoCard label="Start date" value="2024-01-15" />
      </div>
      <div className="mt-11">
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
}

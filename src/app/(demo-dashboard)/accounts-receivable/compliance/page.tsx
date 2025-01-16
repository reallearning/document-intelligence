"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const deals = [
  {
    id: "acme-tech",
    customerName: "ACME Technologies Inc.",
    dealType: "Direct Deal",
    assignee: "bence.nemeth@adhe.com",
    startDate: "15th January 2024",
    paymentTerms: "NET45",
    reviewStatus: "Pending",
  },
  {
    id: "oaktree-capital",
    customerName: "Oaktree Capital Management",
    dealType: "Reseller Deal",
    assignee: "peter@adhe.com",
    startDate: "02nd March 2020",
    paymentTerms: "Periodically as agreed",
    reviewStatus: "Pending",
  },
  {
    id: "rise-edu",
    customerName: "Rise Education Group",
    dealType: "Direct Deal",
    assignee: "dani@adhe.com",
    startDate: "17th April 2020",
    paymentTerms: "Quarterly",
    reviewStatus: null,
  },
  {
    id: "",
    customerName: "Zenith Solutions LLC",
    dealType: "Reseller Deal",
    assignee: "james@adhe.com",
    startDate: "1st June 2019",
    paymentTerms: "NET60",
    reviewStatus: "Completed",
  },
  {
    id: "",
    customerName: "Alpha Fintech Ltd.",
    dealType: "Direct Deal",
    assignee: "maria@adhe.com",
    startDate: "1st September 2021",
    paymentTerms: "NET90",
    reviewStatus: null,
  },
  {
    id: "",
    customerName: "Alpha Fintech Ltd.",
    dealType: "Reseller Deal",
    assignee: "lucas@adhe.com",
    startDate: "1st April 2022",
    paymentTerms: "Annually",
    reviewStatus: null,
  },
  {
    id: "",
    customerName: "Delta Health Systems	",
    dealType: "Direct Deal",
    assignee: "nsusan@adhe.com",
    startDate: "15th May 2023",
    paymentTerms: "NET45",
    reviewStatus: null,
  },
];

export default function CompliancePage() {
  return (
    <div className="w-full p-6 h-screen overflow-y-auto">
      <div className="flex justify-between items-center ">
        <p className="font-poly text-xl font-normal text-black">Compliance</p>
        <div className="flex items-center">
          <div className="mr-6">
            <p className="font-poly font-normal text-sm text-black">
              Ananda Faris
            </p>
            <p className="font-poly font-normal text-[10px] text-[#9CA3AF]">
              AP Accountant
            </p>
          </div>
          <Image src="/dots.svg" alt="dots" width={24} height={24} />
        </div>
      </div>
      <div className="border border-[#E2E8F0]  mt-5 p-6">
        <DealsTable deals={deals} />
      </div>
    </div>
  );
}

interface Deal {
  id: string;
  customerName: string;
  dealType: string;
  assignee: string;
  startDate: string;
  paymentTerms: string;
  reviewStatus?: string | null;
}

interface DealsTableProps {
  deals: Deal[];
}

const DealsTable: React.FC<DealsTableProps> = ({ deals }) => {
  const router = useRouter();

  const handleClick = (redirectTo: string, index: number) => {
    if (index <= 2 && redirectTo) {
      router.push(`/accounts-receivable/compliance/${redirectTo}`);
    }
  };

  const StatusContainerCSS = (status: string) => {
    if (status === "Pending")
      return "bg-[#D0121229] text-[#DC2626] px-3 py-1 rounded-lg text-xs";
    if (status === "Completed")
      return "bg-[#ECFEFF] text-[#0891B2] px-3 py-1 rounded-lg text-xs";
    return "";
  };

  const DealTypeContainerCSS = (deal: string) => {
    if (deal === "Direct Deal")
      return "bg-[#F5F3FF] text-[#7C3AED] px-3 py-1 rounded-lg text-xs";
    if (deal === "Reseller Deal")
      return "bg-[#ECFEFF] text-[#0891B2] px-3 py-1 rounded-lg text-xs";
    if (deal === "Novel")
      return "bg-[#EFF6FF] text-[#2563EB] px-3 py-1 rounded-lg text-xs";
    return "";
  };

  return (
    <div className="p-4 border border-[#E2E8F0] rounded-2xl h-full w-full">
      <div className="flex items-center">
        <Image
          src="/users.svg"
          alt="dots"
          width={24}
          height={24}
          className="mr-2"
        />
        <p className="font-nunito font-medium text-sm text-[#111827]">
          All Deals
        </p>
      </div>
      <div className="mt-4 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-sm font-medium text-[#9CA3AF] bg-[#F9FAFB]">
              <th className="rounded-tl-xl rounded-bl-xl px-4 py-2">
                Customer Name
              </th>
              <th className="px-4 py-2">Deal Type</th>
              <th className="px-4 py-2">Assignee</th>
              <th className="px-4 py-2">Start Date</th>
              <th className="px-4 py-2">Payment Terms</th>
              <th className="rounded-tr-xl rounded-br-xl px-4 py-2">
                Review Status
              </th>
            </tr>
          </thead>
          <tbody>
            {deals.map((deal, idx) => (
              <tr
                key={idx}
                className={`text-sm text-[#1E293B] font-normal border-b border-[#E2E8F0] ${
                  idx === deals.length - 1 ? "border-transparent" : ""
                }`}
              >
                <td
                  className="px-4 py-3 cursor-pointer"
                  onClick={() => handleClick(deal.id, idx)}
                >
                  {deal.customerName}
                </td>
                <td className="px-4 py-3">
                  {deal.dealType && (
                    <span className={`${DealTypeContainerCSS(deal.dealType)}`}>
                      {deal.dealType}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">{deal.assignee}</td>
                <td className="px-4 py-3">{deal.startDate}</td>
                <td className="px-4 py-3">{deal.paymentTerms}</td>
                <td className="px-4 py-3">
                  {deal.reviewStatus && (
                    <span
                      className={`${StatusContainerCSS(deal.reviewStatus)}`}
                    >
                      {deal.reviewStatus}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

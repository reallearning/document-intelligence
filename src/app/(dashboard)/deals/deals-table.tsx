import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Deal = {
  id: string;
  name: string;
  assignee: string;
  company_name: string;
  deal_type: string;
  contract_date: string;
  start_date: string;
  payment_terms: string;
  review_status: string;
};

type DealsTableProps = {
  deals: Deal[];
};

const DealsTable: React.FC<DealsTableProps> = ({ deals }) => {
  const router = useRouter();
  const [selectedDeals, setSelectedDeals] = useState<string[]>([]);
  const allSelected = selectedDeals.length === deals.length;

  // Handle individual row selection
  const toggleSelectDeal = (dealId: string) => {
    setSelectedDeals((prevSelected) =>
      prevSelected.includes(dealId)
        ? prevSelected.filter((id) => id !== dealId)
        : [...prevSelected, dealId]
    );
  };

  // Handle "Select All" functionality
  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedDeals([]);
    } else {
      setSelectedDeals(deals.map((deal) => deal.id));
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full rounded-lg shadow-md">
        <thead className="bg-[#F1EFE94D]">
          <tr>
            <th className="px-4 py-3">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={toggleSelectAll}
                className="cursor-pointer"
              />
            </th>

            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
              Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
              Assignee
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
              Company
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
              Type
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
              Contract Date
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
              Start Date
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
              Payment Terms
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
              Review Status
            </th>
          </tr>
        </thead>
        <tbody>
          {deals.map((deal) => (
            <tr key={deal.id} className="hover:bg-gray-100">
              <td className="px-4 py-4  text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={selectedDeals.includes(deal.id)}
                  onChange={() => toggleSelectDeal(deal.id)}
                  className="cursor-pointer"
                />
              </td>

              <td
                className="px-6 py-4 text-md font-bold font-nunito text-gray-700 underline cursor-pointer"
                onClick={() => router.push(`/deals/${deal.id}`)}
              >
                {deal.name}
              </td>
              <td className="px-6 py-4 text-sm font-normal font-nunito text-gray-700">
                {deal.assignee}
              </td>
              <td className="px-6 py-4 text-sm font-normal font-nunito text-gray-700">
                {deal.company_name}
              </td>
              <td className="px-6 py-4 text-sm font-normal font-nunito text-gray-700">
                {deal.deal_type}
              </td>
              <td className="px-6 py-4 text-sm font-normal font-nunito text-gray-700">
                {deal.contract_date}
              </td>
              <td className="px-6 py-4 text-sm font-normal font-nunito text-gray-700">
                {deal.start_date}
              </td>
              <td className="px-6 py-4 text-sm font-normal font-nunito text-gray-700">
                {deal.payment_terms}
              </td>
              <td>
                {
                  <span
                    className={`px-4 py-1 text-xs font-nunito font-normal ${
                      deal.review_status === "PENDING"
                        ? "bg-[#EFB180] text-[#EFB180] bg-opacity-[30%] rounded-full"
                        : "bg-[#3c7167] text-[#3c7167] bg-opacity-[30%] rounded-full "
                    }`}
                  >
                    {deal.review_status}
                  </span>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DealsTable;

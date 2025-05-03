import React from "react";
import Image from "next/image";

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
        <p className="font-nunito font-medium text-sm text-[#111827]">
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

export default TopOverdueAccounts;

"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const dashboardData = {
  metrics: [
    {
      title: "Overdue Payable Amount",
      value: "Rs.12,764,398",
    },
    {
      title: "DPO",
      value: "65",
      subtext: "from last month",
      changePercentage: -3.2,
    },
  ],
  topOverduePayments: [
    { vendor: "Albus Supplies Ltd.", overdue: "Rs.1.48M", pastDue: "D+15" },
    { vendor: "Broadway Chemicals", overdue: "Rs.1.32M", pastDue: "D+22" },
    { vendor: "Canyon Logistics", overdue: "Rs.1.05M", pastDue: "D+8" },
    { vendor: "Trinity Engineering", overdue: "Rs.987K", pastDue: "D+10" },
    { vendor: "Evergreen Packaging", overdue: "Rs.842K", pastDue: "D+5" },
    { vendor: "Summit Construction Co.", overdue: "Rs.815K", pastDue: "D+18" },
    { vendor: "Ironclad Manufacturing", overdue: "Rs.789K", pastDue: "D+20" },
    { vendor: "Skyline Tools", overdue: "Rs.741K", pastDue: "D+6" },
    { vendor: "Orion Electronics", overdue: "Rs.680K", pastDue: "D+12" },
    { vendor: "Aurora Textiles", overdue: "Rs.613K", pastDue: "D+9" },
  ],
  vendorDatabase: [
    {
      id: "phoenix-supplies",
      vendorName: "Phoenix Supplies Ltd.",
      status: "Active",
      invoices: 22,
      overdueAmount: "Rs.118K",
      overdueBy: "15 days",
      riskAlert: "High",
    },
    {
      id: "broadway-chemicals",
      vendorName: "Broadway Chemicals",
      status: "Active",
      invoices: 30,
      overdueAmount: "Rs.1.32M",
      overdueBy: "22 days",
      riskAlert: "High",
    },
    {
      id: "canyon-logistics",
      vendorName: "Canyon Logistics",
      status: "Active",
      invoices: 18,
      overdueAmount: "Rs.1.05M",
      overdueBy: "8 days",
      riskAlert: "Medium",
    },
    {
      id: "trinity-engineering",
      vendorName: "Trinity Engineering",
      status: "Active",
      invoices: 25,
      overdueAmount: "Rs.987K",
      overdueBy: "10 days",
      riskAlert: "Medium",
    },
    {
      id: "evergreen-packaging",
      vendorName: "Evergreen Packaging",
      status: "Active",
      invoices: 20,
      overdueAmount: "Rs.842K",
      overdueBy: "5 days",
      riskAlert: "Low",
    },
    {
      id: "summit-construction",
      vendorName: "Summit Construction Co.",
      status: "Active",
      invoices: 15,
      overdueAmount: "Rs.815K",
      overdueBy: "18 days",
      riskAlert: "Medium",
    },
    {
      id: "ironclad-manufacturing",
      vendorName: "Ironclad Manufacturing",
      status: "Active",
      invoices: 28,
      overdueAmount: "Rs.789K",
      overdueBy: "20 days",
      riskAlert: "High",
    },
    {
      id: "skyline-tools",
      vendorName: "Skyline Tools",
      status: "Active",
      invoices: 16,
      overdueAmount: "Rs.741K",
      overdueBy: "6 days",
      riskAlert: "Low",
    },
    {
      id: "orion-electronics",
      vendorName: "Orion Electronics",
      status: "Active",
      invoices: 12,
      overdueAmount: "Rs.680K",
      overdueBy: "12 days",
      riskAlert: "Medium",
    },
    {
      id: "aurora-textiles",
      vendorName: "Aurora Textiles",
      status: "Active",
      invoices: 10,
      overdueAmount: "Rs.613K",
      overdueBy: "9 days",
      riskAlert: "Low",
    },
  ],
};

interface ICardProps {
  metrics: Metric[];
}

interface Metric {
  title: string;
  value: string;
  subtext?: string;
  changePercentage?: number;
}

const Dashboard: React.FC = () => {
  const { metrics, topOverduePayments, vendorDatabase } = dashboardData;

  return (
    <div className="w-full p-6 h-screen overflow-y-auto">
      <div className="flex justify-between items-center ">
        <p className="font-poly text-xl font-normal text-black">
          Accounts Payable
        </p>
        <div className="flex items-center">
          <div className="mr-6">
            <p className="font-poly font-normal text-sm text-black">
              Ananda Faris
            </p>
            <p className="font-poly font-normal text-[10px] text-[#9CA3AF]">
              AP Accountant
            </p>
          </div>
          <Image src="./dots.svg" alt="dots" width={24} height={24} />
        </div>
      </div>
      <div className="border border-[#E2E8F0]  mt-5 p-6">
        <div className="flex">
          <div className="mr-6">
            <div className="flex gap-6">
              <OverdueCard metrics={metrics} />
              <DpoCard metrics={metrics} />
            </div>
            <div className="mt-6">
              <ActualVEstimatedCashFlow />
            </div>
          </div>
          <div className="w-full">
            <TopOverdueAccounts vendors={topOverduePayments} />
          </div>
        </div>
        <CustomerDatabase vendorDatabase={vendorDatabase} />
      </div>
    </div>
    // <div className="border border-[#E2E8F0] flex mt-5 p-6"></div>
  );
};

interface Vendor {
  id: string;
  vendorName: string;
  status: string;
  invoices: number | string;
  overdueAmount: string;
  overdueBy: string;
  riskAlert: string | null;
}

interface IVendorDatabaseProps {
  vendorDatabase: Vendor[];
}

const CustomerDatabase: React.FC<IVendorDatabaseProps> = ({
  vendorDatabase,
}) => {
  const router = useRouter();

  const handleClick = (redirectTo: string, index: number) => {
    if (index <= 1 && redirectTo) {
      router.push(`/accounts-payable/${redirectTo}`);
    }
  };

  const RiskAlertContainerCSS = (risk: string) => {
    if (risk === "High")
      return "bg-[#D0121229] text-[#DC2626] px-3 py-1 rounded-lg text-xs";
    if (risk === "Medium")
      return "bg-[#ECFEFF] text-[#0891B2] px-3 py-1 rounded-lg text-xs";
    if (risk === "Low")
      return "bg-[#EFF6FF] text-[#2563EB] px-3 py-1 rounded-lg text-xs";
    return "";
  };

  const StatusContainerCSS = (status: string) => {
    if (status === "Expired")
      return "bg-[#F5F3FF] text-[#7C3AED] px-3 py-1 rounded-lg text-xs";
    if (status === "Active")
      return "bg-[#ECFEFF] text-[#0891B2] px-3 py-1 rounded-lg text-xs";
    if (status === "New")
      return "bg-[#EFF6FF] text-[#2563EB] px-3 py-1 rounded-lg text-xs";
    return "";
  };

  return (
    <div className="border border-[#E2E8F0] mt-5 p-6 rounded-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="/users.svg"
            alt="users"
            width={24}
            height={24}
            className="mr-2"
          />
          <p className="font-nunito text-sm font-normal text-black">
            Customer Database
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
                Customer Name
              </th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Invoices</th>
              <th className="px-4 py-2">Overdue Amt</th>
              <th className="px-4 py-2">Overdue By</th>
              <th className="rounded-tr-xl rounded-br-xl px-4 py-2">
                Risk Alert
              </th>
            </tr>
          </thead>
          <tbody>
            {vendorDatabase.map((vendor, idx) => (
              <tr
                key={idx}
                className={`text-sm text-[#1E293B] border-b border-[#E2E8F0] font-poly font-normal ${
                  idx === vendorDatabase.length - 1 ? "border-transparent" : ""
                }`}
              >
                <td
                  className="px-4 py-3 cursor-pointer"
                  onClick={() => handleClick(vendor.id, idx)}
                >
                  {vendor.vendorName}
                </td>
                <td className="px-4 py-3">
                  {vendor.status && (
                    <span className={`${StatusContainerCSS(vendor.status)}`}>
                      {vendor.status}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">{vendor.invoices}</td>
                <td className="px-4 py-3">{vendor.overdueAmount}</td>
                <td className="px-4 py-3">{vendor.overdueBy}</td>
                <td className="px-4 py-3">
                  {vendor.riskAlert && (
                    <span
                      className={`${RiskAlertContainerCSS(vendor.riskAlert)}`}
                    >
                      {vendor.riskAlert}
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

function ActualVEstimatedCashFlow() {
  return (
    <div className="border border-[#E2E8F0] rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="./analysis.svg"
            alt="dots"
            width={24}
            height={24}
            className="mr-2"
          />
          <p className="font-nunito text-sm fomt-normal text-black">
            Age Analysis of due balance
          </p>
        </div>
      </div>
      <div className="mt-4">
        <p className="font-nunito font-bold text-[32px] text-[#111827]">
          Rs. 858,322.00
        </p>
      </div>
      <div className="relative mt-6 w-full h-[200px]">
        <Image
          src="./big-bar-chart.svg"
          alt="Bar chart"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}

function OverdueCard({ metrics }: ICardProps) {
  return (
    <div className="p-5 border border-[#E2E8F0] rounded-lg min-w-[300px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="./cart.svg"
            alt="cart"
            width={24}
            height={24}
            className="mr-2"
          />
          <p className="font-nunito font-normal text-sm text-[#111827]">
            {metrics[0].title}
          </p>
        </div>
        <Image src="./dots.svg" alt="dots" width={24} height={24} />
      </div>
      <p className="mt-6 font-nunito text-[32px] font-bold leading-[42px] text-[#111827]">
        {metrics[0].value}
      </p>
    </div>
  );
}

function DpoCard({ metrics }: ICardProps) {
  return (
    <div className="p-5 border border-[#E2E8F0] rounded-lg min-w-[300px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="./upwards.svg"
            alt="upwards"
            width={24}
            height={24}
            className="mr-2"
          />
          <p className="font-nunito font-normal text-sm text-[#111827]">
            {metrics[1].title}
          </p>
        </div>
        <Image src="./dots.svg" alt="dots" width={24} height={24} />
      </div>
      <div className="mt-1 flex items-center">
        <p className="mr-1 font-nunito text-[32px] font-bold leading-[42px] text-[#111827]">
          {metrics[1].value}
        </p>
        <div className="flex items-center bg-[#FEF2F2] rounded-xl px-4 py-1 text-[#DC2626]">
          <Image
            src="./upwards-red.svg"
            alt="upwards"
            width={12}
            height={12}
            className="mr-2"
          />
          <p className="font-nunito text-[10px] font-normal">
            {metrics[0].changePercentage}%
          </p>
        </div>
        <p className="ml-1 font-nunito text-[10px] font-normal text-[#9CA3AF]">
          {metrics[1].subtext}
        </p>
      </div>
      <Image
        src="./wave.svg"
        alt="upwards"
        width={300}
        height={40}
        className="mt-2"
      />
    </div>
  );
}

interface VendorOverdue {
  vendor: string;
  overdue: string;
  pastDue: string;
}

interface TopOverdueAccountsProps {
  vendors: VendorOverdue[];
}

const TopOverdueAccounts: React.FC<TopOverdueAccountsProps> = ({ vendors }) => {
  return (
    <div className="p-4 border border-[#E2E8F0] rounded-2xl h-full w-full">
      <div className="flex items-center">
        <Image src="./upwards.svg" alt="upwards" width={24} height={24} />
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
            {vendors.map((account, idx) => (
              <tr
                key={idx}
                className={`text-sm text-[#1E293B] font-normal border-b border-[#E2E8F0] ${
                  idx === vendors.length - 1 ? "border-transparent" : ""
                }`}
              >
                <td className="px-4 py-3">{account.vendor}</td>
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

export default Dashboard;

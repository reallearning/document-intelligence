"use client";
import React from "react";
import Image from "next/image";
import TopOverdueAccounts from "./top-overdue-accounts";
import { useRouter } from "next/navigation";

const dashboardData = {
  metrics: [
    {
      title: "Overdue Amount",
      value: "Rs. 14,563,892",
    },
    {
      title: "DSO",
      value: "58",
      subtext: "from last month",
      changePercentage: 14.2,
    },
    {
      title: "Actual vs Estimated Cash Flow",
      value: "Rs. 121,492,312",
      subtext: "from last month",
      changePercentage: 10.7,
    },
  ],
  topOverdueAccounts: [
    { customer: "Harrison Electronics", overdue: "Rs.1.57L", pastDue: "D+20" },
    { customer: "Maple Freight Co.", overdue: "Rs.1.31L", pastDue: "D+15" },
    { customer: "Riverdale Industries", overdue: "Rs.96K", pastDue: "D+10" },
    { customer: "Brighton Apparel", overdue: "Rs.87K", pastDue: "D+5" },
    { customer: "Summit Engineering", overdue: "Rs.78K", pastDue: "" },
    { customer: "Nexon Solutions", overdue: "Rs.1.29L", pastDue: "D+25" },
    { customer: "Crescent Builders", overdue: "Rs.74.2K", pastDue: "D+8" },
    { customer: "Silverline Logistics", overdue: "Rs.67K", pastDue: "D+30" },
    { customer: "Greenfield Supplies", overdue: "Rs.56.2K", pastDue: "D+12" },
  ],
  customerDatabase: [
    {
      id: "oaktree-capital",
      customerName: "Oaktree Capital",
      status: "Active",
      invoices: 18,
      overdueAmount: "Rs.78.5K",
      overdueBy: "2 days",
      riskAlert: "Low",
    },
    {
      id: "harrison-electronics",
      customerName: "Harrison Electronics",
      status: "Active",
      invoices: 18,
      overdueAmount: "Rs.1.57L",
      overdueBy: "20 days",
      riskAlert: "High",
    },
    {
      id: "maple-freight",
      customerName: "Maple Freight Co.",
      status: "Expired",
      invoices: 24,
      overdueAmount: "Rs.1.31L",
      overdueBy: "15 days",
      riskAlert: "Medium",
    },
    {
      id: "riverdale-industries",
      customerName: "Riverdale Industries",
      status: "New",
      invoices: 20,
      overdueAmount: "Rs. 96K",
      overdueBy: "10 days",
      riskAlert: "Low",
    },
    {
      id: "brighton-apparel",
      customerName: "Brighton Apparel",
      status: "Active",
      invoices: 16,
      overdueAmount: "Rs.87K",
      overdueBy: "5 days",
      riskAlert: "-",
    },
    {
      id: "summit-engineering",
      customerName: "Summit Engineering",
      status: "Active",
      invoices: 22,
      overdueAmount: "Rs.78K",
      overdueBy: "",
      riskAlert: "Low",
    },
    {
      id: "nexon-solutions",
      customerName: "Nexon Solutions",
      status: "Expired",
      invoices: 30,
      overdueAmount: "Rs.1.29L",
      overdueBy: "25 days",
      riskAlert: "High",
    },
    {
      id: "crescent-builders",
      customerName: "Crescent Builders",
      status: "Active",
      invoices: 28,
      overdueAmount: "Rs.74.2K",
      overdueBy: "8 days",
      riskAlert: "Medium",
    },
    {
      id: "silverline-logistics",
      customerName: "Silverline Logistics",
      status: "Expired",
      invoices: 35,
      overdueAmount: "Rs.67K",
      overdueBy: "30 days",
      riskAlert: "High",
    },
    {
      id: "greenfield-supplies",
      customerName: "Greenfield Supplies",
      status: "Active",
      invoices: 26,
      overdueAmount: "Rs.56.2K",
      overdueBy: "12 days",
      riskAlert: "Medium",
    },
  ],
};

interface Metric {
  title: string;
  value: string;
  subtext?: string;
  changePercentage?: number;
}

const Dashboard: React.FC = () => {
  const { metrics, topOverdueAccounts, customerDatabase } = dashboardData;

  return (
    <div className="w-full p-6 h-screen overflow-y-auto">
      <div className="flex justify-between items-center ">
        <p className="font-poly text-xl font-normal text-black">
          Accounts Receivable
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
              <DsoCard metrics={metrics} />
            </div>
            <div className="mt-6">
              <ActualVEstimatedCashFlow metrics={metrics} />
            </div>
          </div>
          <div className="w-full">
            <TopOverdueAccounts accounts={topOverdueAccounts} />
          </div>
        </div>
        <CustomerDatabase customerDatabase={customerDatabase} />
      </div>
    </div>
    // <div className="border border-[#E2E8F0] flex mt-5 p-6"></div>
  );
};

interface Customer {
  id: string;
  customerName: string;
  status: string;
  invoices: number | string;
  overdueAmount: string;
  overdueBy: string;
  riskAlert: string | null;
}

interface ICustomerDatabaseProps {
  customerDatabase: Customer[];
}

const CustomerDatabase: React.FC<ICustomerDatabaseProps> = ({
  customerDatabase,
}) => {
  const router = useRouter();

  const handleClick = (redirectTo: string, index: number) => {
    if (index === 0 && redirectTo) {
      router.push(`/accounts-receivable/${redirectTo}`);
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
            src="./users.svg"
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
            src="./search-2.svg"
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
            {customerDatabase.map((customer, idx) => (
              <tr
                key={idx}
                className={`text-sm text-[#1E293B] border-b border-[#E2E8F0] font-poly font-normal ${
                  idx === customerDatabase.length - 1
                    ? "border-transparent"
                    : ""
                }`}
              >
                <td
                  className="px-4 py-3 cursor-pointer"
                  onClick={() => handleClick(customer.id, idx)}
                >
                  {customer.customerName}
                </td>
                <td className="px-4 py-3">
                  {customer.status && (
                    <span className={`${StatusContainerCSS(customer.status)}`}>
                      {customer.status}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">{customer.invoices}</td>
                <td className="px-4 py-3">{customer.overdueAmount}</td>
                <td className="px-4 py-3">{customer.overdueBy}</td>
                <td className="px-4 py-3">
                  {customer.riskAlert && (
                    <span
                      className={`${RiskAlertContainerCSS(customer.riskAlert)}`}
                    >
                      {customer.riskAlert}
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

function ActualVEstimatedCashFlow({ metrics }: ICardProps) {
  return (
    <div className="border border-[#E2E8F0] rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="./search.svg"
            alt="dots"
            width={24}
            height={24}
            className="mr-2"
          />
          <p className="font-nunito text-sm fomt-normal text-black">
            {metrics[2].title}
          </p>
        </div>
        <div className="flex items-center">
          <div className="flex items-center mr-4">
            <div className="w-3 h-3 rounded-sm bg-[#E2E8F0] mr-1"></div>
            <p className="font-nunito text-[10px] font-normal text-[#4B5563]">
              Estimated
            </p>
          </div>
          <div className="flex items-center mr-4">
            <div className="w-3 h-3 rounded-sm bg-[#7C3AED] mr-1"></div>
            <p className="font-nunito text-[10px] font-normal text-[#4B5563]">
              Actual
            </p>
          </div>
          <div className="flex items-center mr-4">
            <div className="w-3 h-3 rounded-sm bg-[#9CA3AF] mr-1"></div>
            <p className="font-nunito text-[10px] font-normal text-[#4B5563]">
              Forecasted
            </p>
          </div>
          <div className="flex px-4 py-2 rounded-lg border border-[#E2E8F0]">
            <p className="font-poly font-normal text-[10px] text-[#4B5563] mr-2 items-center">
              Monthly
            </p>
            <Image
              src="/drop-down.svg"
              alt="Bar chart"
              height={12}
              width={12}
            />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <p className="font-nunito font-bold text-[32px] text-[#111827]">
          {metrics[2].value}
        </p>
        <div className="flex items-center mt-2">
          <div className="bg-[#F0FDF4] px-2 py-1 flex items-center rounded-lg">
            <Image
              src="./upwards-green.svg"
              alt="upwards"
              width={16}
              height={16}
              className="mr-2"
            />
            <p className="font-nunito font-normal text-[10px] text-[#16A34A]">
              {metrics[2].changePercentage}%
            </p>
          </div>
          <p className="font-nunito text-[10px] font-normal text-[#9CA3AF] ml-2">
            {metrics[2].subtext}
          </p>
        </div>
      </div>
      <div className="relative mt-6 w-full h-[200px]">
        <Image
          src="./bar-chart.svg"
          alt="Bar chart"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}

interface ICardProps {
  metrics: Metric[];
}

function OverdueCard({ metrics }: ICardProps) {
  return (
    <div className="p-5 border border-[#E2E8F0] rounded-2xl min-w-[300px]">
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

function DsoCard({ metrics }: ICardProps) {
  return (
    <div className="p-5 border border-[#E2E8F0] rounded-2xl min-w-[300px]">
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
            {metrics[1].changePercentage}%
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

export default Dashboard;

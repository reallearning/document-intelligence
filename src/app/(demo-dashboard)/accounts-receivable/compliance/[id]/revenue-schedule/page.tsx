"use client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

const revenueData = [
  {
    period: "Q1 2024",
    license: "₹ 31,250",
    implementation: "₹ ₹ 3,00,000",
    training: "₹ 0",
    totalRevenue: "₹ 331,250",
  },
  {
    period: "Q2 2024",
    license: "₹ 31,250",
    implementation: "₹ 3,00,000",
    training: "₹ 25,000",
    totalRevenue: "₹ 356,250",
  },
  {
    period: "Q3 2024",
    license: "₹ 31,250",
    implementation: "₹ 0",
    training: "₹ 25,000",
    totalRevenue: "₹ 56,250",
  },
  {
    period: "Q4 2024",
    license: "₹ 31,250",
    implementation: "₹ 0",
    training: "₹ 25,000",
    totalRevenue: "₹ 56,250",
  },
  {
    period: "Total 2024",
    license: "₹ 125,000",
    implementation: "₹ 6,00,000",
    training: "₹ 75,000",
    totalRevenue: "₹ 800,000",
  },
];

export default function RevenueSchedule() {
  const router = useRouter();
  const params = useParams();

  const [selectedOption, setSelectedOption] =
    useState<string>("revenue-schedule");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedOption(value);

    router.push(`${value}`);
  };

  const handleMarkReview = () => {
    router.back()
    router.back()
  };

  return (
    <div className="p-6 h-screen overflow-y-auto">
      <div className="px-4 pt-1 flex items-center justify-between mb-6">
        <p className="font-poly font-normal text-[20px] text-black">
          ACME Technologies Inc
        </p>
        <div className="">
          <select
            value={selectedOption}
            onChange={handleChange}
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg text-black"
          >
            <option value="contracts">Contracts</option>
            <option value="revenue-report">Revenue Report</option>
            <option value="revenue-schedule">Revenue Schedule</option>
            <option value="reconciliation">Reconciliation</option>
          </select>
        </div>
      </div>
      <div className="border border-[#E2E8F0] p-6">
        <div className="flex items-center justify-between">
          <p className="font-nunito font-normal text-lg text-black">
            Revenue Recognition Schedule - 2024
          </p>
          <div>
            <button
              className="text-white bg-[#7C3AED] px-4 py-2 rounded-lg mr-2"
              onClick={handleMarkReview}
            >
              Mark Reviewed
            </button>
            <button className="text-white bg-[#7C3AED] px-4 py-2 rounded-lg">
              Export Data
            </button>
          </div>
        </div>
        <div className="my-6">
          <ContractOverviewCard />
        </div>
        <div>
          <p className="font-nunito mb-4 font-normal text-lg text-black">
            Recognition Components
          </p>
          <div className="flex gap-x-6">
            <Card
              title="Software Licence"
              value="₹ 3,75,000"
              subtext="Rateable over 36 Months"
            />
            <Card
              title="Implementation "
              value="₹ 6,00,000"
              subtext="Milestone - based (6 months)"
            />
            <Card
              title="Training"
              value="₹ 75,000"
              subtext="Rateable over 12 months"
            />
          </div>
        </div>
        <div className="mt-6">
          <RevenueTable data={revenueData} />
        </div>
      </div>
    </div>
  );
}

function ContractOverviewCard() {
  return (
    <div className="p-5 border border-[#E2E8F0] rounded-2xl w-fit">
      <div className="flex items-center justify-between">
        <p className="font-nunito font-bold text-lg text-black">
          Contract Overview
        </p>
        <Image src="/dots.svg" alt="dots" width={24} height={24} />
      </div>
      <div className="flex mt-4">
        <div className="mr-28">
          <div className="flex items-center">
            <Image
              src="/cart.svg"
              alt="cart"
              width={24}
              height={24}
              className="mr-2"
            />
            <p className="font-nunito font-normal text-sm text-[#111827]">
              Total Contract Value
            </p>
          </div>
          <p className="mt-1 font-nunito text-[32px] font-bold leading-[42px] text-[#111827]">
            ₹ 10,50,000
          </p>
        </div>
        <div className="mr-12">
          <div className="flex items-center">
            <Image
              src="/cart.svg"
              alt="cart"
              width={24}
              height={24}
              className="mr-2"
            />
            <p className="font-nunito font-normal text-sm text-[#111827]">
              Contract Term
            </p>
          </div>
          <p className="mt-1 font-nunito text-[32px] font-bold leading-[42px] text-[#111827]">
            36 Months
          </p>
        </div>
      </div>
    </div>
  );
}

interface ICardProps {
  title: string;
  value: string;
  subtext: string;
}

function Card({ title, value, subtext }: ICardProps) {
  return (
    <div className="p-5 border border-[#E2E8F0] rounded-2xl min-w-[250px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="/cart.svg"
            alt="cart"
            width={24}
            height={24}
            className="mr-2"
          />
          <p className="font-nunito font-normal text-sm text-[#111827]">
            {title}
          </p>
        </div>
        <Image src="/dots.svg" alt="dots" width={24} height={24} />
      </div>
      <p className="mt-4 mb-2 font-nunito text-[32px] font-bold leading-[42px] text-[#111827]">
        {value}
      </p>
      <p className="font-nunito font-normal text-[10px] text-[#4B5563]">
        {subtext}
      </p>
    </div>
  );
}

interface RevenueData {
  period: string;
  license: string;
  implementation: string;
  training: string;
  totalRevenue: string;
}

interface RevenueTableProps {
  data: RevenueData[];
}

const RevenueTable: React.FC<RevenueTableProps> = ({ data }) => {
  return (
    <div className="p-4 border border-[#E2E8F0] rounded-2xl h-full w-full">
      <div className="flex items-center">
        <p className="font-nunito font-medium text-sm text-[#111827]">
          Revenue Information
        </p>
      </div>
      <div className="mt-4 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-sm font-medium text-[#9CA3AF] bg-[#F9FAFB]">
              <th className="rounded-tl-xl rounded-bl-xl px-4 py-2">Period</th>
              <th className="px-4 py-2">License</th>
              <th className="px-4 py-2">Implementation</th>
              <th className="px-4 py-2">Training</th>
              <th className="rounded-tr-xl rounded-br-xl px-4 py-2">
                Total Revenue
              </th>
              <th className="rounded-tr-xl rounded-br-xl px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, idx) => (
              <tr
                key={idx}
                className={`text-sm font-nunito ${
                  idx === data.length - 1
                    ? "text-morrie-primary font-bold"
                    : "text-[#1E293B] font-normal"
                }  border-b border-[#E2E8F0] ${
                  idx === data.length - 1 ? "border-transparent" : ""
                }`}
              >
                <td className="px-4 py-3">{entry.period}</td>
                <td className="px-4 py-3">{entry.license}</td>
                <td className="px-4 py-3">{entry.implementation}</td>
                <td className="px-4 py-3">{entry.training}</td>
                <td className="px-4 py-3">{entry.totalRevenue}</td>
                <td className="px-4 py-3">
                  {" "}
                  <Image src="/dots.svg" alt="dots" width={24} height={24} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

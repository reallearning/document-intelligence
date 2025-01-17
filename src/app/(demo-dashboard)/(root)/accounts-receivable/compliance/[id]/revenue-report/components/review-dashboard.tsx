"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

const ReviewDashboard: React.FC = () => {
  const router = useRouter();
  const params = useParams();

  const [selectedOption, setSelectedOption] =
    useState<string>("revenue-report");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedOption(value);

    router.push(`${value}`);
  };

  return (
    <div className="w-full p-6 h-screen overflow-y-auto">
      <div className="flex justify-between items-center ">
        <p className="font-poly text-xl font-normal text-black">
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
      <div className="border border-[#E2E8F0]  mt-5 p-6">
        <div className="flex justify-between">
          <div className="flex gap-6">
            <ContractStatusCard />
            <PendingPaymentsCard />
          </div>
          <div>
            <button className="text-white text-lg font-nunito font-medium bg-[#7C3AED] px-8 py-2 rounded-lg">
              Download Data
            </button>
          </div>
        </div>
        <div className="flex items-start mt-6 gap-x-7">
          <KeyMetrics />
          <YearlyProjections />
        </div>
        <div className="mt-6 flex gap-x-6">
          <ActualVEstimatedCashFlow />
          <CollectionTrends />
        </div>
      </div>
    </div>
  );
};

function CollectionTrends() {
  return (
    <div className="border border-[#E2E8F0] rounded-2xl p-5 w-[30%]">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="/collections.svg"
            alt="cart"
            width={24}
            height={24}
            className="mr-2"
          />
          <p className="font-nunito font-medium text-sm text-[#111827]">
            Collection Trends
          </p>
        </div>
        <Image src="/dots.svg" alt="dots" width={24} height={24} />
      </div>
      <div className="relative mt-6 w-full h-[200px]">
        <Image
          src="/half-chart.svg"
          alt="Bar chart"
          fill
          className="object-contain"
        />
      </div>
      <div className="flex mt-4 justify-between items-center">
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-[#FBBF24] mr-1"></div>
          <p className="font-nunito font-normal text-[10px] text-[#4B5563]">
            On Time
          </p>
        </div>
        <p className="font-nunito font-semibold text-[10px] text-[#111827]">
          50%
        </p>
      </div>
      <div className="flex mt-4 justify-between items-center">
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-[#7C3AED] mr-1"></div>
          <p className="font-nunito font-normal text-[10px] text-[#4B5563]">
            Delayed &lt; 30 days
          </p>
        </div>
        <p className="font-nunito font-semibold text-[10px] text-[#111827]">
          33%
        </p>
      </div>
      <div className="flex mt-4 justify-between items-center">
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-[#F43F5E] mr-1"></div>
          <p className="font-nunito font-normal text-[10px] text-[#4B5563]">
            Delayed &gt; 30 days
          </p>
        </div>
        <p className="font-nunito font-semibold text-[10px] text-[#111827]">
          27%
        </p>
      </div>
    </div>
  );
}

function ActualVEstimatedCashFlow() {
  return (
    <div className="border border-[#E2E8F0] rounded-2xl p-5 w-[70%]">
      <div className="relative w-full h-[90%]">
        <Image
          src="/bar-chart-2.svg"
          alt="Bar chart"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}

function ContractStatusCard() {
  return (
    <div className="p-5 border border-[#E2E8F0] rounded-2xl min-w-[300px]">
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
            Contract Status
          </p>
        </div>
        <Image src="/dots.svg" alt="dots" width={24} height={24} />
      </div>
      <p className="mt-6 font-nunito text-[32px] font-bold leading-[42px] text-[#0891B2]">
        Active
      </p>
    </div>
  );
}

function PendingPaymentsCard() {
  return (
    <div className="p-5 border border-[#E2E8F0] rounded-2xl min-w-[300px]">
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
            Pending Payments
          </p>
        </div>
        <Image src="/dots.svg" alt="dots" width={24} height={24} />
      </div>
      <p className="mt-6 font-nunito text-[32px] font-bold leading-[42px] text-[#111827]">
        ₹ 78,598.00
      </p>
      ;
    </div>
  );
}

function KeyMetrics() {
  return (
    <div className="p-5 border border-[#E2E8F0] rounded-2xl w-fit">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="/globe-icon.svg"
            alt="cart"
            width={24}
            height={24}
            className="mr-2"
          />
          <p className="font-nunito font-normal text-sm text-[#111827]">
            Key Metrics
          </p>
        </div>
        <Image src="/dots.svg" alt="dots" width={24} height={24} />
      </div>
      <div className="relative w-[300px] h-[120px] mt-4">
        <Image
          src="/key-metrics.svg"
          alt="dots"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}

function YearlyProjections() {
  return (
    <div className="p-5 border border-[#E2E8F0] rounded-2xl w-fit">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="/globe-icon.svg"
            alt="cart"
            width={24}
            height={24}
            className="mr-2"
          />
          <p className="font-nunito font-normal text-sm text-[#111827]">
            Yearly Projections
          </p>
        </div>
        <Image src="/dots.svg" alt="dots" width={24} height={24} />
      </div>
      <div className="relative w-[300px] h-[100px] mt-4">
        <Image
          src="/yearly-projections.svg"
          alt="dots"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}

export default ReviewDashboard;

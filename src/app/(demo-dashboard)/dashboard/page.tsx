"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Metric {
  title: string;
  value: string;
  subtext?: string;
  changePercentage?: number;
}

const Dashboard: React.FC = () => {
  return (
    <div className="w-full p-6 h-screen overflow-y-auto">
      <div className="flex justify-between items-center mb-8">
        <p className="font-poly text-xl font-normal text-black">Dashboard</p>
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
      <div className="flex mt-8">
        <div className="flex gap-10">
          <LinkCard label="Accounts Payable" link="accounts-payable" />
          <LinkCard label="Accounts Receivable" link="accounts-receivable" />
          <LinkCard label="CFO Companion" link="https://morrie.ai/" />
        </div>
      </div>
    </div>
  );
};

interface LinkCardProps {
  label: string;
  link: string;
}

function LinkCard({ label, link }: LinkCardProps) {
  const isExternalLink = link.startsWith("http") || link.startsWith("https");

  if (isExternalLink) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block p-5 border border-[#E2E8F0] rounded-2xl min-w-[300px] hover:shadow-lg transition-shadow duration-200 cursor-pointer"
      >
        <p className="mt-6 font-nunito text-[32px] font-bold leading-[42px] text-[#111827]">
          {label}
        </p>
      </a>
    );
  }

  return (
    <Link
      href={link}
      className="block p-5 border border-[#E2E8F0] rounded-2xl min-w-[300px] hover:shadow-lg transition-shadow duration-200 cursor-pointer"
    >
      <p className="mt-6 font-nunito text-[32px] font-bold leading-[42px] text-[#111827]">
        {label}
      </p>
    </Link>
  );
}

export default Dashboard;

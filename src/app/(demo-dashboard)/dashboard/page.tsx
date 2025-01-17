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
          <LinkCard
            label="Accounts Payable"
            link="accounts-payable"
            image="ap"
          />
          <LinkCard
            label="Accounts Receivable"
            link="accounts-receivable"
            image="ar"
          />
          <LinkCard
            label="CFO Companion"
            link="https://morrie.ai/"
            image="cfo-agent"
          />
        </div>
      </div>
    </div>
  );
};

interface LinkCardProps {
  label: string;
  link: string;
  image: string;
}

const LinkCard = ({ label, link, image }: LinkCardProps) => {
  const isExternalLink = link.startsWith("http") || link.startsWith("https");
  const cardContent = (
    <div className="p-5 border border-[#E2E8F0] rounded-2xl min-w-[300px] hover:shadow-lg transition-shadow duration-200">
      <div>
        <Image src={`/${image}.svg`} alt={label} width={280} height={280} />
        <p className="mt-6 font-nunito text-[32px] font-bold leading-[42px] text-[#111827]">
          {label}
        </p>
      </div>
    </div>
  );

  if (isExternalLink) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block cursor-pointer"
      >
        {cardContent}
      </a>
    );
  }

  return (
    <Link href={link} className="block cursor-pointer">
      {cardContent}
    </Link>
  );
};

export default Dashboard;

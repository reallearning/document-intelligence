"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Metric {
  title: string;
  value: string;
  subtext?: string;
  changePercentage?: number;
}

const Dashboard: React.FC = () => {
  const [origin, setOrigin] = useState("vista-smart");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const data = params.get("origin");
    if (data) {
      setOrigin(data);
    }
  }, []);

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
      <div className="mt-8 p-6">
        <div className="flex gap-x-10">
          <LinkCard
            label="Accounts Payable"
            link="accounts-payable"
            image="ap"
          />
          <LinkCard
            label="Accounts Receivable"
            link={`accounts-receivable${
              origin === "ava-retail" ? "?origin=ava-retail" : ""
            }`}
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
    <div className="p-5 border border-[#E2E8F0] rounded-2xl bg-white hover:bg-[#f9fafb] hover:shadow-xl transition-all duration-300">
      <div className="flex flex-col items-start">
        <Image src={`/${image}.svg`} alt={label} width={150} height={150} />
        <p className="mt-6 font-nunito text-xl md:text-2xl font-semibold text-gray-800 text-center">
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

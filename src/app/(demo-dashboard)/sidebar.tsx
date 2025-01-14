"use client";
import Image from "next/image";

export const Sidebar = () => {
  return (
    <div className="h-full flex flex-col justify-between items-center pt-[28px] pl-6 pb-6">
      <div className="w-8 h-8">
        <Image src="/cfo-logo.svg" width={32} height={32} alt="User" />
      </div>
      <div>
        <div className="w-6 h-6 mb-6">
          <Image src="/settings.svg" width={40} height={40} alt="User" />
        </div>
        <div className="w-6 h-6">
          <Image src="/question.svg" width={40} height={40} alt="User" />
        </div>
      </div>
    </div>
  );
};

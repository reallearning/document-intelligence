"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const Sidebar = () => {
  const [isARScreen, setIsARScreen] = useState(false);

  const router = useRouter();

  const handleClick = (to: string) => {
    router.push(to);
  };

  useEffect(() => {
    const url = window.location.href;
    if (url.includes("accounts-receivable")) {
      setIsARScreen(true);
    }
  }, []);

  return (
    <div className="h-full flex flex-col justify-between items-center pt-[28px] pl-6 pb-6">
      <div className="w-8 h-8">
        <Image src="/cfo-logo.svg" width={32} height={32} alt="Logo" />
        {isARScreen ? (
          <div className="mt-10 flex flex-col items-center space-y-8">
            <Image
              src="/home.svg"
              width={24}
              height={24}
              alt="Home"
              className="cursor-pointer"
              onClick={() => handleClick("/accounts-receivable")}
            />
            <Image
              src="/chart.svg"
              width={24}
              height={24}
              alt="Compliance"
              className="cursor-pointer"
              onClick={() => handleClick("/accounts-receivable/compliance")}
            />
            <Image
              src="/doc.svg"
              width={24}
              height={24}
              alt="Reconciliation"
              className="cursor-pointer"
              onClick={() =>
                handleClick("/accounts-receivable/compliance/active-invoice")
              }
            />
          </div>
        ) : (
          <div className="mt-10 flex flex-col items-center space-y-8">
            <Image
              src="/home.svg"
              width={24}
              height={24}
              alt="Home"
              className="cursor-pointer"
              onClick={() => handleClick("/accounts-payable")}
            />
            <Image
              src="/chart.svg"
              width={24}
              height={24}
              alt="Compliance"
              className="cursor-pointer"
              onClick={() => handleClick("/accounts-payable/contracts")}
            />
            <Image
              src="/doc.svg"
              width={24}
              height={24}
              alt="Reconciliation"
              className="cursor-pointer"
              onClick={() =>
                handleClick("/accounts-payable/invoices")
              }
            />
          </div>
        )}
      </div>

      <div>
        <div className="w-6 h-6 mb-6">
          <Image src="/settings.svg" width={40} height={40} alt="Settings" />
        </div>
        <div className="w-6 h-6">
          <Image src="/question.svg" width={40} height={40} alt="Help" />
        </div>
      </div>
    </div>
  );
};

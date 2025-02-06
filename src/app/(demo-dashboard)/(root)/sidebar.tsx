"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";

enum DashboardType {
  dashboard,
  accountsPayable,
  accountsReceivable,
}

interface NavigationItemProps {
  src: string;
  alt: string;
  onClick: () => void;
}

const NavigationItem: React.FC<NavigationItemProps> = ({
  src,
  alt,
  onClick,
}) => (
  <Image
    src={src}
    width={24}
    height={24}
    alt={alt}
    className="cursor-pointer"
    onClick={onClick}
  />
);

interface SideNavigationProps {
  dashboardType: DashboardType;
  handleClick: (path: string) => void;
}

const SideNavigation: React.FC<SideNavigationProps> = ({
  dashboardType,
  handleClick,
}) => {
  const navigationConfig = {
    [DashboardType.dashboard]: [
      {
        src: "/home.svg",
        alt: "Home",
        path: "/dashboard",
      },
    ],
    [DashboardType.accountsReceivable]: [
      {
        src: "/home.svg",
        alt: "Home",
        path: "/accounts-receivable",
      },
      {
        src: "/chart.svg",
        alt: "Compliance",
        path: "/accounts-receivable/compliance",
      },
      {
        src: "/doc.svg",
        alt: "Reconciliation",
        path: "/accounts-receivable/compliance/active-invoice",
      },
    ],
    [DashboardType.accountsPayable]: [
      {
        src: "/home.svg",
        alt: "Home",
        path: "/accounts-payable",
      },
      {
        src: "/chart.svg",
        alt: "Compliance",
        path: "/accounts-payable/contracts",
      },
      {
        src: "/doc.svg",
        alt: "Reconciliation",
        path: "/accounts-payable/invoices",
      },
    ],
  };

  const currentNavigation = navigationConfig[dashboardType];

  return (
    <div className="mt-10 flex flex-col items-center space-y-8">
      {currentNavigation?.map((item, index) => (
        <NavigationItem
          key={index}
          src={item.src}
          alt={item.alt}
          onClick={() => handleClick(item.path)}
        />
      ))}
    </div>
  );
};

export const Sidebar = () => {
  const [dashboardType, setDashboardType] = useState<DashboardType>(
    DashboardType.dashboard
  );

  const router = useRouter();
  const pathname = usePathname();
  const handleClick = (to: string) => {
    router.push(to);
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push("/sign-in");
  };

  useEffect(() => {
    if (pathname.includes("accounts-receivable")) {
      setDashboardType(DashboardType.accountsReceivable);
    } else if (pathname.includes("accounts-payable")) {
      setDashboardType(DashboardType.accountsPayable);
    } else {
      setDashboardType(DashboardType.dashboard);
    }
  }, [pathname]); // Now it will re-run when pathname changes

  return (
    <div className="h-full flex flex-col justify-between items-center pt-[28px] pl-6 pb-6">
      <div className="w-8 h-8">
        <Link href="dashboard">
          <Image src="/cfo-logo.svg" width={32} height={32} alt="Logo" />
        </Link>
        <SideNavigation
          dashboardType={dashboardType}
          handleClick={handleClick}
        />
      </div>

      <div>
        <div className="w-6 h-6 mb-6">
          <Image
            src="/settings.svg"
            width={40}
            height={40}
            alt="Settings"
            className="cursor-pointer"
          />
        </div>
        <div className="w-6 h-6 mb-6">
          <Image
            src="/question.svg"
            width={40}
            height={40}
            alt="Help"
            className="cursor-pointer"
          />
        </div>
        <div className="">
          <LogOut
            color="#000000"
            size={24}
            onClick={handleLogout}
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

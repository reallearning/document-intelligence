"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const data = [
  {
    id: 1,
    icon: "/deals.svg",
    route: "/deals",
  },
  {
    id: 2,
    icon: "/invoice.svg",
    route: "/invoices",
  },
];

export const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Handle click to redirect
  const handleClick = (redirectTo: string) => {
    if (redirectTo) {
      router.push(redirectTo);
    }
  };

  const isActive = (route: string) => pathname.includes(route);

  return (
    <div className="h-full w-16 bg-[#E0DBCF] flex flex-col justify-between items-center p-4">
      <div className="flex flex-col items-center space-y-6">
        <Image src="/logo.svg" width={30} height={30} alt="App Logo" />

        {data &&
          data.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col items-center justify-center h-10 w-10 ${
                isActive(item.route) ? "bg-[#BAAE92AD]" : "hover:bg-[#BAAE92AD]"
              } rounded-full mb-5 cursor-pointer`}
              onClick={() => handleClick(item.route)}
            >
              <Image
                src={item.icon}
                alt="Activity"
                width={10}
                height={10}
                className="w-6 h-6"
              />
            </div>
          ))}
      </div>

      <div
        className="flex flex-col items-center justify-center h-10 w-10 hover:bg-[#BAAE92AD] rounded-full cursor-pointer"
      >
        <Image
          src="/user.svg"
          width={32}
          height={32}
          alt="User"
          className="w-6 h-6"
        />
      </div>
    </div>
  );
};

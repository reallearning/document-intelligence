"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Loader from "@/components/loader";
import { useRouter } from "next/navigation";

const permissions = [
  { name: "Gmail", status: "Authorize", icon: "/gmail.svg" },
  { name: "Chargebee", status: "Authorize", icon: "/chargebee.svg" },
  { name: "Razorpay", status: "Authorize", icon: "/razorpay.svg" },
  { name: "Stripe", status: "Authorize", icon: "/stripe.svg" },
  { name: "SharePoint", status: "Authorize", icon: "/sharepoint.svg" },
  { name: "Google Drive", status: "Authorize", icon: "/gdrive.svg" },
  { name: "Outlook", status: "Authorize", icon: "/outlook.svg" },
  { name: "Dropbox", status: "Authorize", icon: "/dropbox.svg" },
  { name: "Jira", status: "Authorize", icon: "/jira.svg" },
  { name: "Trello", status: "Authorize", icon: "/trello.svg" },
  { name: "Xero", status: "Authorize", icon: "/xero.svg" },
  { name: "Zoho", status: "Authorize", icon: "/zoho.svg" },
];

const PermissionCard: React.FC = () => {
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const [authorized, setAuthorized] = useState<{ [key: string]: boolean }>({});

  const router = useRouter();

  const handleAuthorize = (name: string) => {
    setLoading((prev) => ({ ...prev, [name]: true }));

    // Simulate an API call
    setTimeout(() => {
      setLoading((prev) => ({ ...prev, [name]: false }));
      setAuthorized((prev) => ({ ...prev, [name]: true }));
    }, 2000);
  };

  useEffect(() => {
    if (Object.keys(authorized).length >= 4) {
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    }
  }, [authorized]);

  return (
    <div className="h-screen bg-morrie-background bg-hero-pattern bg-cover bg-center flex justify-center items-center p-4 sm:p-8 md:p-12 lg:p-16 xl:p-24">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg lg:max-w-3xl flex flex-col justify-center overflow-hidden">
        <div className="flex items-start space-x-3 mt-2 mb-2 w-full fade-in">
          <Image src="/cfo-logo.svg" alt="logo-black" width={30} height={30} />
          <div className="flex flex-col space-y-2 ml-8 w-full">
            <p className="text-black font-nunito font-bold">Morrie</p>
            <div className="text-black p-2 text-16px font-nunito !mt-[-5px] pl-[2px]">
              <span>
                I need the admin permission for each of these so I can get
                access to the most recent information.
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4 overflow-y-auto max-h-[60vh]">
          {permissions.map((permission, index) => (
            <div
              key={index}
              className="ml-10 mb-4 flex items-center justify-between border rounded-lg p-4 hover:shadow-md px-6 py-4 bg-[#F6F6F6]"
            >
              <div className="flex items-center">
                <div className="border border-gray-300 bg-white rounded-md mr-4 h-10 w-10 p-1 flex items-center">
                  <Image
                    src={permission.icon}
                    alt={`${permission.name} icon`}
                    height={36}
                    width={36}
                  />
                </div>
                <span className="font-poly font-normal text-base leading-6 text-black">
                  {permission.name}
                </span>
              </div>
              <button
                onClick={() => handleAuthorize(permission.name)}
                className={`font-nunito font-medium text-xs rounded-[80px] py-2 px-3.5 flex items-center min-w-20 justify-center text-white ${
                  loading[permission.name]
                    ? "bg-gray-300 cursor-not-allowed"
                    : authorized[permission.name]
                    ? "bg-green-400"
                    : "bg-[#7C3AED]"
                }`}
                disabled={
                  loading[permission.name] || authorized[permission.name]
                }
              >
                {loading[permission.name] ? (
                  <Loader />
                ) : authorized[permission.name] ? (
                  "Authorized"
                ) : (
                  "Authorize"
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PermissionCard;

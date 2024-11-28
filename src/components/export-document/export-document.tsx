"use client";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import Image from "next/image";
import { Button } from "../button";
import { useRouter } from "next/navigation";
import { IExportDocumentsProps } from "./types";

export const ExportDocuments = ({ closeModal }: IExportDocumentsProps) => {
  const data = [
    {
      id: 1,
      icon: "/netsuite.svg",
    },
    {
      id: 2,
      icon: "/sap.svg",
    },
    {
      id: 3,
      icon: "/oracle.svg",
    },
    {
      id: 4,
      icon: "/quickbooks.svg",
    },
    {
      id: 5,
      icon: "/salesforce.svg",
    },
  ];

  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const router = useRouter();

  const handleExportData = () => {
    router.push("/export-success");
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(id)
        ? prevSelectedItems.filter((item) => item !== id)
        : [...prevSelectedItems, id]
    );
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white w-[40%] rounded-lg p-8 overflow-auto flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mb-6">
            <p className="font-poly font-normal text-2xl leading-[18px] text-black">
              Where do you want to export this data?
            </p>
            <XMarkIcon
              className="h-5 w-5 text-black cursor-pointer"
              onClick={closeModal}
            />
          </div>

          {/* Grid layout for icons and checkboxes */}
          <div className="flex flex-col justify-center items-center mt-10">
            <div className="grid grid-cols-2 gap-12">
              {data.map((item: any, index: number) => (
                <div
                  key={item.id}
                  className={`flex items-center space-x-3 ${
                    index === data.length - 1 ? "col-span-2 justify-center" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleCheckboxChange(item.id)}
                    id={`checkbox-${item.id}`}
                    className="h-5 w-5 cursor-pointer accent-morrie-primary"
                  />
                  <label
                    htmlFor={`checkbox-${item.id}`}
                    className="flex items-center space-x-2"
                  >
                    <Image
                      src={item.icon}
                      alt={`Icon for ${item.icon}`}
                      height={150}
                      width={150}
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Button */}

        <div className="mx-10 mt-10">
          <Button
            color="primary-default"
            size="md"
            className={`px-4 border-[#D9D9D9] font-nunito text-white w-full rounded-full ${
              selectedItems.length === 0 ? "bg-gray-400" : ""
            }`}
            disabled={selectedItems.length === 0}
            onClick={handleExportData}
          >
            Export Data
          </Button>
        </div>
      </div>
    </div>
  );
};

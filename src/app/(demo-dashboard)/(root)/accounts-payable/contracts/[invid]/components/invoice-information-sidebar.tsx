"use client";

import { DataItem, Comment, Invoice } from "@/types/invoice-information";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useStorage } from "@/context/StorageContext";
import { CommentsSection } from "@/components/comments-section";
import { ExportDocuments } from "@/components/export-document";

interface IDataField {
  value: string | number;
  validation: boolean;
  matching_value?: string; // Optional, only present in some fields
}

interface IData {
  [key: string]: IDataField; // Dynamic keys with IDataField as value
}

export interface IInvoiceInformationProps {
  invoice: IData;
}

export const InvoiceInformationSidebar = ({
  invoice,
}: IInvoiceInformationProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sidebarRef = useRef<HTMLDivElement>(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { invoiceSidebarCollapsed, updateInvoiceSidebarCollapsed } =
    useStorage();

  return (
    <div className="flex h-screen" ref={sidebarRef}>
      <div className="w-[370px] flex flex-col no-scrollbar">
        <div className="px-5 pt-7">
          <p className="font-poly font-normal text-xl leading-5 text-black mb-5">
            Phoenix Supplies Ltd.
          </p>
        </div>

        {/* Steps and Data Section */}
        <div className="px-4 py-5 bg-[#BAAE921A] rounded-tl-xl rounded-tr-xl flex-1 overflow-y-auto no-scrollbar">
          {Object.entries(invoice).map(([key, step]) => (
            <div key={key} className="bg-white rounded-2xl p-4 mb-4">
              <p className="font-nunito text-xs font-normal text-[#A8A8A8]">
                {key}
              </p>
              <div className="flex justify-between items-center">
                <p className="font-nunito font-normal text-sm text-black">
                  {step.value}
                </p>
                {step.validation ? (
                  <Image
                    src="/valid.svg"
                    alt="search"
                    width={16}
                    height={16}
                    className="ml-4"
                  />
                ) : (
                  <Image
                    src="/invalid.svg"
                    alt="search"
                    width={16}
                    height={16}
                    className="ml-4"
                  />
                )}
              </div>
              {step.matching_value && (
                <div className="border-t border-[##E2E8F0] mt-2 pt-2">
                  <p className="font-nunito text-xs font-normal text-[#A8A8A8]">
                    Value in PO
                  </p>
                  <p className="font-nunito font-normal text-sm text-black">
                    {step.matching_value}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Fixed Export CTA at the bottom of the sidebar */}
        <div className="px-4 py-3 bg-[#D9D9D966] rounded-t-lg mt-auto">
          <button
            onClick={openModal}
            className="text-white w-full bg-[#7C3AED] px-4 py-2 rounded-lg"
          >
            Export
          </button>
        </div>
      </div>

      {isModalOpen && <ExportDocuments closeModal={closeModal} />}
    </div>
  );
};

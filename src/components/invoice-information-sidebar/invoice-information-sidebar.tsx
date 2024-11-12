"use client";

import { DataItem, Comment } from "@/types/invoice-information";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CommentsSection } from "../comments-section";
import { IInvoiceInformationProps } from "./types";
import { useStorage } from "@/context/StorageContext";
import { Button } from "../button";
import { ExportDocuments } from "../export-document";

export const InvoiceInformationSidebar = ({
  invoice,
}: IInvoiceInformationProps) => {
  const [selectedSection, setSelectedSection] = useState<DataItem | null>(null);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sidebarRef = useRef<HTMLDivElement>(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      setSelectedSection(null);
      updateInvoiceSidebarCollapsed(false);
    }
  };

  const handleAddComment = () => {
    if (selectedSection && newComment.trim()) {
      const newCommentObj: Comment = {
        id: (selectedSection.comments?.length || 0) + 1 + "",
        senderMail: "You",
        profileUrl: "",
        message: newComment,
        date: new Date().toISOString().split("T")[0],
        time: new Date().toLocaleTimeString(),
      };

      if (selectedSection.comments) {
        selectedSection.comments.push(newCommentObj);
      } else {
        selectedSection.comments = [newCommentObj];
      }

      setNewComment("");
    }
  };
  const { invoiceSidebarCollapsed, updateInvoiceSidebarCollapsed } =
    useStorage();

  const handleCommentClick = (section: DataItem) => {
    if (selectedSection?.id === section.id) {
      updateInvoiceSidebarCollapsed(!invoiceSidebarCollapsed);
      setShowComments(!showComments);
    } else {
      updateInvoiceSidebarCollapsed(true);
      setShowComments(true);
    }
  };

  const selectSection = (section: DataItem) => {
    setSelectedSection(section);
  };

  const closeComments = () => {
    setShowComments(false);
    updateInvoiceSidebarCollapsed(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex h-screen" ref={sidebarRef}>
      <div className="w-[370px] bg-[#F6F6F6] flex flex-col no-scrollbar">
        <div className="px-5 pt-7">
          <p className="font-poly font-normal text-xl leading-5 text-black mb-2">
            {invoice.invoiceName}
          </p>
          <p className="font-nunito font-normal text-sm leading-5 text-morrie-text mb-4">
            Assigned to: {invoice.assignedTo}
          </p>
          <div className="px-4 py-1 bg-[#3C716742] rounded-2xl max-w-[30%] flex justify-center items-center mb-6">
            <p className="font-nunito font-normal text-xs text-[#3C7167]">
              Invoice
            </p>
          </div>
        </div>

        {/* Steps and Data Section */}
        <div className="px-4 py-5 flex-1 overflow-y-auto no-scrollbar">
          {invoice.steps?.map((step) => (
            <div
              key={step.id}
              className="mb-4 font-nunito font-normal leading-[18px]"
            >
              {step.stepName && (
                <p className="text-sm text-morrie-text mb-5">{step.stepName}</p>
              )}

              {step.data.map((dataItem) => (
                <div
                  key={`${step.id}/${dataItem.id}`}
                  className={`bg-white px-4 py-3 rounded-xl mb-3 hover:border hover:border-morrie-primary ${
                    `${selectedSection?.header}/${selectedSection?.id}` ===
                    `${dataItem.header}/${dataItem.id}`
                      ? "border border-morrie-primary"
                      : ""
                  }`}
                  onClick={() => selectSection(dataItem)}
                >
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-[#A8A8A8] mb-2">
                      {dataItem.header}
                    </p>
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={() => handleCommentClick(dataItem)}
                    >
                      <Image
                        src="/comments.svg"
                        width={25}
                        height={25}
                        alt="comments"
                      />
                      <p className="text-xs text-[#7F7F7F] ml-1">
                        {dataItem.comments?.length || 0}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-black">{dataItem.data}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
        {/* Fixed Export CTA at the bottom of the sidebar */}
        <div className="px-4 py-3 bg-[#D9D9D966] rounded-t-lg mt-auto">
          <Button
            color="primary-default"
            size="md"
            className="px-4 border-[#D9D9D9] font-nunito text-white w-full"
            onClick={openModal}
          >
            Export
          </Button>
        </div>
      </div>
      {selectedSection?.comments && showComments && (
        <CommentsSection
          label={selectedSection.header}
          value={selectedSection.data}
          comments={selectedSection.comments}
          newComment={newComment}
          setNewComment={setNewComment}
          handleAddComment={handleAddComment}
          closeComments={closeComments}
        />
      )}

      {isModalOpen && <ExportDocuments closeModal={closeModal} />}
    </div>
  );
};

"use client";

import { DataItem, Comment } from "@/types/invoice-information";
import Image from "next/image";
import { useState } from "react";
import { CommentsSection } from "../comments-section";
import { IInvoiceInformationProps } from "./types";

export const InvoiceInformationSidebar = ({
  invoice,
}: IInvoiceInformationProps) => {
  const [selectedSection, setSelectedSection] = useState<DataItem | null>(null);
  const [newComment, setNewComment] = useState("");

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

  return (
    <div className="flex h-screen">
      <div className="w-[370px] bg-[#F6F6F6] overflow-y-auto">
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
        <div className="px-4 py-5">
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
                  key={dataItem.id}
                  className="bg-white px-4 py-3 rounded-xl mb-3"
                >
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-[#A8A8A8] mb-2">
                      {dataItem.header}
                    </p>
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={() => setSelectedSection(dataItem)}
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
      </div>
      {selectedSection?.comments && (
        <CommentsSection
          comments={selectedSection.comments}
          newComment={newComment}
          setNewComment={setNewComment}
          handleAddComment={handleAddComment}
        />
      )}
    </div>
  );
};

"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  DocumentInformation,
  Comment,
  Data,
  Review,
} from "@/types/annotations";
import { CommentsSection } from "../comments-section";
import { IAnnotationsSidebarProps } from "./types";

export const AnnotationsSidebar = ({
  documentInformation,
}: IAnnotationsSidebarProps) => {
  const [expandedSteps, setExpandedSteps] = useState<{
    [key: number]: boolean;
  }>({});
  const [selectedSection, setSelectedSection] = useState<Data | null>(null);
  const [newComment, setNewComment] = useState("");
  const [activeReview, setActiveReview] = useState<Review | null>(null);
  const [expandedMatchInfo, setExpandedMatchInfo] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleStep = (index: number) => {
    setExpandedSteps((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleCommentClick = (section: Data) => {
    setSelectedSection(section);
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

  const toggleMatchInfo = (stepIndex: number, sectionIndex: number) => {
    const key = `${stepIndex}-${sectionIndex}`;
    setExpandedMatchInfo((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  useEffect(() => {
    setActiveReview(documentInformation["l1Review"]);
  }, []);

  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <div className="w-[370px] bg-[#F6F6F6] overflow-y-auto">
        <div className="px-5 pt-7">
          <p className="font-poly font-normal text-xl leading-5 text-black mb-2">
            {documentInformation.clientName}
          </p>
          <p className="font-nunito font-normal text-sm leading-5 text-morrie-text mb-4">
            Assigned to: {documentInformation.assignedTo}
          </p>
          <div className="px-4 py-1 bg-[#EFB18045] rounded-2xl max-w-[40%] flex justify-center items-center mb-6">
            <p className="font-nunito font-normal text-xs text-[#EFB180]">
              {activeReview?.reviewName}
            </p>
          </div>
        </div>

        <div>
          {activeReview?.contracts?.[0]?.steps?.map((info, index) => (
            <div key={index} className="mb-3 px-2">
              <div className="bg-[#BAAE921A] p-4 rounded-xl cursor-pointer">
                <div className="flex justify-between items-center">
                  <span className="font-semibold font-nunito text-base leading-[18px] text-[#7F7F7F]">
                    {info.stepName}
                  </span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${
                      expandedSteps[index] ? "transform rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="#7F7F7F"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => toggleStep(index)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>

                {expandedSteps[index] && (
                  <div className="mt-3 space-y-3 font-nunito font-normal leading-[18px]">
                    {info.data?.map((item, secIndex) => (
                      <div
                        key={secIndex}
                        className="bg-white rounded-xl pt-3 pb-5 px-5 flex flex-col gap-y-2"
                      >
                        <div key={secIndex} className="flex flex-col gap-2">
                          <div className="flex justify-between">
                            <p className="text-xs text-[#A8A8A8]">
                              {item.header}
                            </p>
                            <div
                              className="flex items-center cursor-pointer"
                              onClick={() => handleCommentClick(item)}
                            >
                              <Image
                                src="/comments.svg"
                                width={25}
                                height={25}
                                alt="comments"
                              />
                              <p className="text-xs text-[#7F7F7F] ml-1">
                                {item.comments?.length || 0}
                              </p>
                            </div>
                          </div>
                          <p className="text-sm text-black">{item.title}</p>
                          <p className="text-xs text-[#A8A8A8] flex items-center">
                            <Image
                              src="/document.svg"
                              width={15}
                              height={15}
                              alt={item.contractName || ""}
                              className="mr-1"
                            />
                            {item.contractName}
                          </p>

                          {item.matches &&
                            Object.keys(item.matches || {}).length != 0 && (
                              <div className="mt-4 border-t border-gray-200 pt-4">
                                <div className="mb-1 text-[#00A1E0] cursor-pointer flex justify-between">
                                  <div className="flex gap-x-1">
                                    <p className="font-normal text-[10px] text-[#00A1E0]">
                                      Matches with{" "}
                                      {item.matches.numberOfMatches} fields in
                                    </p>
                                    <Image
                                      src="/salesforce.svg"
                                      width={15}
                                      height={15}
                                      alt="Source Image"
                                    />
                                  </div>
                                  <svg
                                    className={`w-4 h-4 transition-transform duration-300 ${
                                      expandedMatchInfo[`${index}-${secIndex}`]
                                        ? "transform rotate-180"
                                        : ""
                                    }`}
                                    fill="none"
                                    stroke="#7F7F7F"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    onClick={() =>
                                      toggleMatchInfo(index, secIndex)
                                    }
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M19 9l-7 7-7-7"
                                    />
                                  </svg>
                                </div>
                                {expandedMatchInfo[`${index}-${secIndex}`] && (
                                  <div>
                                    <p className="text-xs text-[#A8A8A8] mb-2">
                                      {item.matches.header}
                                    </p>
                                    <p className="text-sm text-black">
                                      {item.matches.data}
                                    </p>
                                  </div>
                                )}
                              </div>
                            )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Sidebar (Comments Section) */}
      {selectedSection && (
        <CommentsSection
          selectedSection={selectedSection}
          newComment={newComment}
          setNewComment={setNewComment}
          handleAddComment={handleAddComment}
        />
      )}
    </div>
  );
};

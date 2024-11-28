"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Comment, Data, Review } from "@/types/annotations";
import { CommentsSection } from "../comments-section";
import { IAnnotationsSidebarProps } from "./types";
import { useStorage } from "@/context/StorageContext";
import { Button } from "../button";
import { ExportDocuments } from "../export-document";

export const AnnotationsSidebar = ({
  documentInformation,
  activeContract,
}: IAnnotationsSidebarProps) => {
  console.log(activeContract, "activeContract");
  const [expandedSteps, setExpandedSteps] = useState<{
    [key: number]: boolean;
  }>({});
  const [showComments, setShowComments] = useState(false);

  const [selectedSection, setSelectedSection] = useState<Data | null>(null);
  const [newComment, setNewComment] = useState("");
  const [activeReview, setActiveReview] = useState<Review | null>(null);
  const [expandedMatchInfo, setExpandedMatchInfo] = useState<{
    [key: string]: boolean;
  }>({});
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
      updateSidebarCollapsed(false);
      updateSidebarCollapsed(false);
    }
  };

  const toggleStep = (index: number) => {
    setExpandedSteps((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  const { sidebarCollapsed, updateSidebarCollapsed } = useStorage();

  const handleCommentClick = (section: Data) => {
    if (selectedSection?.id === section.id) {
      updateSidebarCollapsed(!sidebarCollapsed);
      setShowComments(!showComments);
    } else {
      updateSidebarCollapsed(true);
      setShowComments(true);
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

  const toggleMatchInfo = (stepIndex: number, sectionIndex: number) => {
    const key = `${stepIndex}-${sectionIndex}`;
    setExpandedMatchInfo((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const selectSection = (section: Data) => {
    setSelectedSection(section);
  };

  const closeComments = () => {
    setShowComments(false);
    updateSidebarCollapsed(false);
  };

  useEffect(() => {
    setActiveReview(documentInformation["l1Review"]);
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex h-screen" ref={sidebarRef}>
      {/* Left Sidebar */}
      <div className="w-[370px] bg-[#F6F6F6] overflow-y-auto no-scrollbar">
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
          {activeReview?.contracts
            .filter((contract) => contract.id === activeContract)
            .map((contract) =>
              contract.steps.map((info, index) => (
                <div key={index} className="mb-3 px-2">
                  <div className="bg-[#BAAE921A] p-4 rounded-xl">
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => toggleStep(index)}
                    >
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
                            className={`bg-white rounded-xl border border-transparent pt-3 pb-5 px-5 flex flex-col gap-y-2 hover:border-morrie-primary ${
                              selectedSection?.id === item.id
                                ? "border border-morrie-primary"
                                : ""
                            }`}
                            onClick={() => selectSection(item)}
                          >
                            <div key={secIndex} className="flex flex-col gap-2">
                              <div className="flex justify-between items-center">
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

                              {item.compliance &&
                                Object.keys(item.compliance || {}).length !=
                                  0 && (
                                  <div className="mt-4 border-t-[0.5px] border-gray-200 pt-4 font-nunito font-normal leading-[18px]">
                                    <div className="flex justify-between items-center">
                                      <div className="flex items-center">
                                        <p className="text-xs text-[#9C9C9C] mb-1">
                                          {item.compliance.header}
                                        </p>
                                      </div>
                                      <div
                                        className={`px-4 py-[2px] rounded-full text-[10px] bg-opacity-[30%] mb-[1px] ${
                                          item.compliance.status === "Compliant"
                                            ? "bg-[#3C7167] text-[#3C7167]"
                                            : item.compliance.status ===
                                              "Partially compliant"
                                            ? "bg-[#E58F3C] text-[#E58F3C]"
                                            : "bg-[#D63735] text-[#D63735]"
                                        }`}
                                      >
                                        <p>{item.compliance.status}</p>
                                      </div>
                                    </div>
                                    <p className="text-xs text-[#5D6977] mt-1">
                                      {item.compliance.data}
                                    </p>
                                  </div>
                                )}

                              {item.matches &&
                                Object.keys(item.matches || {}).length != 0 && (
                                  <div className="mt-2 border-t border-gray-200 pt-4">
                                    <div
                                      className="mb-1 text-[#00A1E0] cursor-pointer flex justify-between"
                                      onClick={() =>
                                        toggleMatchInfo(index, secIndex)
                                      }
                                    >
                                      <div className="flex gap-x-1">
                                        <p className="font-normal text-[10px] text-[#00A1E0]">
                                          Matches with{" "}
                                          {item.matches.numberOfMatches} fields
                                          in
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
                                          expandedMatchInfo[
                                            `${index}-${secIndex}`
                                          ]
                                            ? "transform rotate-180"
                                            : ""
                                        }`}
                                        fill="none"
                                        stroke="#7F7F7F"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M19 9l-7 7-7-7"
                                        />
                                      </svg>
                                    </div>
                                    {expandedMatchInfo[
                                      `${index}-${secIndex}`
                                    ] && (
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
              ))
            )}
        </div>
        <div className="px-4 py-3 mt-auto">
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

      {/* Right Sidebar (Comments Section) */}
      {selectedSection?.comments && showComments && (
        <CommentsSection
          label={selectedSection.header ?? ""}
          value={selectedSection.title ?? ""}
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

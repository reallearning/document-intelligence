"use client";
import { useEffect, useState } from "react";
import PDFViewer from "../../components/pdf-viewer";

type StepData = {
  id: string;
  stepName: string;
  data: any[];
};

type ContractData = {
  id: string;
  name: string;
  pdfUrl: string;
  steps: StepData[];
};

type ReviewData = {
  reviewName: string;
  contracts: ContractData[];
};

type DealsTabsProps = {
  reviewData: ReviewData[];
};

const DealsTabs = ({ reviewData }: DealsTabsProps) => {
  const [activeTabId, setActiveTabId] = useState<string>(
    reviewData[0].contracts[0].id
  );

  const handleTabClick = (id: string) => {
    setActiveTabId(id);
  };

  const [pageWidth, setPageWidth] = useState(0);
  const sidebarWidth = 388;

  useEffect(() => {
    const updatePageWidth = () => {
      setPageWidth(window.innerWidth - sidebarWidth);
    };

    updatePageWidth(); // Set initial width
    window.addEventListener("resize", updatePageWidth); // Update width on window resize

    return () => {
      window.removeEventListener("resize", updatePageWidth);
    };
  }, []);

  return (
    <div className="flex flex-row gap-[24px] w-full">
      <div className="flex flex-col items-center w-full">
        {/* Render Tabs */}
        <div className="flex space-x-4 border-b-2 border-gray-300 mb-4 w-full">
          {reviewData.map((review) =>
            review.contracts.map((contract) => (
              <button
                key={contract.id}
                onClick={() => handleTabClick(contract.id)}
                className={`px-4 py-2 text-lg ${
                  activeTabId === contract.id
                    ? "text-black font-nunito font-normal text-md border-b-2 border-[#3C7167]"
                    : "text-gray-600"
                }`}
              >
                {contract.name} ({review.reviewName})
              </button>
            ))
          )}
        </div>

        {/* Render PDF Viewer */}
        <div className="w-full h-[100vh]">
          {reviewData.map((review) =>
            review.contracts.map(
              (contract) =>
                contract.id === activeTabId && (
                  <div key={contract.id} className="w-full h-full">
                    <PDFViewer
                      fileUrl={contract.pdfUrl}
                      pageWidth={pageWidth}
                    />
                  </div>
                )
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default DealsTabs;

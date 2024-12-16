import { Data } from "@/app/(dashboard)/demo/components/types";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { HighlightsContentData } from "@/app/(dashboard)/highlights/components/types";

interface DocumentDataContextProps {
  data: Data | null;
  highlightsData: HighlightsContentData | null;
  saveData: (responseData: Data) => void;
  saveHighlights: (responseData: HighlightsContentData) => void;
}

const DocumentDataContext = createContext<DocumentDataContextProps | undefined>(
  undefined
);

interface DocumentDataProviderProps {
  children: ReactNode;
}

export const DocumentDataProvider: React.FC<DocumentDataProviderProps> = ({
  children,
}) => {
  const [data, setData] = useState<Data | null>(null);
  const [highlightsData, setHighlightsData] =
    useState<HighlightsContentData | null>(null);

  // Function to save data into the context state
  const saveData = (responseData: Data) => {
    setData(responseData);
  };

  // Function to save highlights into the context state
  const saveHighlights = (responseData: HighlightsContentData) => {
    setHighlightsData(responseData);
  };

  return (
    <DocumentDataContext.Provider
      value={{ data, highlightsData, saveData, saveHighlights }}
    >
      {children}
    </DocumentDataContext.Provider>
  );
};

// Custom hook for accessing the document data context
export const useDocumentData = (): DocumentDataContextProps => {
  const context = useContext(DocumentDataContext);
  if (context === undefined) {
    throw new Error(
      "useDocumentData must be used within a DocumentDataProvider"
    );
  }
  return context;
};

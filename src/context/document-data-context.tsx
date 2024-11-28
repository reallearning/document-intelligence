import { Data, Highlights } from "@/app/(dashboard)/demo/components/types";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface DocumentDataContextProps {
  data: Data | null;
  highlightsData: Highlights | null;
  saveData: (responseData: Data) => void;
  saveHighlights: (responseData: Highlights) => void;
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
  const [highlightsData, setHighlightsData] = useState<Highlights | null>(null);

  // Function to save data into the context state
  const saveData = (responseData: Data) => {
    setData(responseData);
  };

  // Function to save highlights into the context state
  const saveHighlights = (responseData: Highlights) => {
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

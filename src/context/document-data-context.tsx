import {
  Data,
  GCPExtractedData,
  Highlights,
} from "@/app/(dashboard)/demo/components/types";
import { LivspaceData } from "@/types/livspace";
import { OtoData } from "@/types/oto";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface DocumentDataContextProps {
  data: Data | null;
  otoData: OtoData | null;
  gcpExtractedData: GCPExtractedData | null;
  highlightsData: Highlights | null;
  livspaceData: LivspaceData | null;
  saveData: (responseData: Data) => void;
  saveHighlights: (responseData: Highlights) => void;
  saveGcpExtractedData: (data: GCPExtractedData) => void;
  saveOtoData: (data: OtoData) => void;
  saveLivspaceData: (data: LivspaceData) => void;
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
  const [gcpExtractedData, setGcpExtractedData] =
    useState<GCPExtractedData | null>(null);
  const [highlightsData, setHighlightsData] = useState<Highlights | null>(null);
  const [otoData, setOtoData] = useState<OtoData | null>(null);
  const [livspaceData, setLivspaceData] = useState<LivspaceData | null>(null);

  // Function to save data into the context state
  const saveData = (responseData: Data) => {
    setData(responseData);
  };

  const saveGcpExtractedData = (data: GCPExtractedData) => {
    setGcpExtractedData(data);
  };

  // Function to save highlights into the context state
  const saveHighlights = (responseData: Highlights) => {
    setHighlightsData(responseData);
  };

  const saveOtoData = (responseData: OtoData) => {
    setOtoData(responseData);
  };

  const saveLivspaceData = (responseData: LivspaceData) => {
    setLivspaceData(responseData);
  };

  return (
    <DocumentDataContext.Provider
      value={{
        data,
        gcpExtractedData,
        highlightsData,
        otoData,
        livspaceData,
        saveData,
        saveHighlights,
        saveGcpExtractedData,
        saveOtoData,
        saveLivspaceData,
      }}
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

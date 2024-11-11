// context/StorageContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Define the shape of the context value
interface StorageContextType {
  sidebarCollapsed: boolean;
  updateSidebarCollapsed: (value: boolean) => void;
  invoiceSidebarCollapsed: boolean;
  updateInvoiceSidebarCollapsed: (value: boolean) => void;
}

// Create the context with an undefined initial value
const StorageContext = createContext<StorageContextType | undefined>(undefined);

interface StorageProviderProps {
  children: ReactNode;
}

// Define the StorageProvider component
export const StorageProvider: React.FC<StorageProviderProps> = ({
  children,
}) => {
  // State for each storage value
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [invoiceSidebarCollapsed, setInvoiceSidebarCollapsed] =
    useState<boolean>(false);

  // Initialize state with localStorage values on client-side
  useEffect(() => {
    const storedSidebarCollapsed =
      localStorage.getItem("sidebarCollapsed") === "true";
    const storedInvoiceSidebarCollapsed =
      localStorage.getItem("invoiceSidebarCollapsed") === "true";
    setSidebarCollapsed(storedSidebarCollapsed);
    setInvoiceSidebarCollapsed(storedInvoiceSidebarCollapsed);
  }, []);

  // Update localStorage whenever `sidebarCollapsed` changes
  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", sidebarCollapsed.toString());
  }, [sidebarCollapsed]);

  // Update localStorage whenever `invoiceSidebarCollapsed` changes
  useEffect(() => {
    localStorage.setItem(
      "invoiceSidebarCollapsed",
      invoiceSidebarCollapsed.toString()
    );
  }, [invoiceSidebarCollapsed]);

  // Functions to update each value
  const updateSidebarCollapsed = (newValue: boolean) => {
    setSidebarCollapsed(newValue);
  };

  const updateInvoiceSidebarCollapsed = (newValue: boolean) => {
    setInvoiceSidebarCollapsed(newValue);
  };

  return (
    <StorageContext.Provider
      value={{
        sidebarCollapsed,
        updateSidebarCollapsed,
        invoiceSidebarCollapsed,
        updateInvoiceSidebarCollapsed,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};

// Custom hook to use the context
export function useStorage(): StorageContextType {
  const context = useContext(StorageContext);
  if (!context) {
    throw new Error("useStorage must be used within a StorageProvider");
  }
  return context;
}

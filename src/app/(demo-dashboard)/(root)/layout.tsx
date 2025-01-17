"use client";
import { StorageProvider } from "@/context/StorageContext";
import { Sidebar } from "./sidebar";

interface IProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: IProps) {
  return (
    <StorageProvider>
      <div className="flex w-full h-screen">
        <Sidebar />
        <main className="flex-1 h-full">{children}</main>
      </div>
    </StorageProvider>
  );
}

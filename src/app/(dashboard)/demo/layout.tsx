"use client";
import { DocumentDataProvider } from "@/context/document-data-context";

interface IProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: IProps) {
  return <DocumentDataProvider>{children}</DocumentDataProvider>;
}

"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface IProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: IProps) {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("questt-ai-authenticated");
    if (isAuthenticated !== "true") {
      router.push("/sign-in");
    }
  }, [router]);

  return <div className="flex-1 h-full">{children}</div>;
}

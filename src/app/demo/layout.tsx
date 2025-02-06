"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface IProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: IProps) {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated !== "true") {
      router.push("/auth");
    }
  }, [router]);

  return <div className="">{children}</div>;
}

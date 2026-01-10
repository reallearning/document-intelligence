import type { Metadata } from "next";
import "./globals.css";
import { Public_Sans } from "next/font/google";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Morrie",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${publicSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

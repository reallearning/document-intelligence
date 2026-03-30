"use client";

import Link from "next/link";
import { IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";

const ibmPlex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-jetbrains",
});

const roles = [
  {
    initial: "S",
    name: "Sam",
    href: "/jio-collections/sam",
    role: "Collections Lead",
    description:
      "Portfolio overview, bucket migration, macro triggers, segment deep-dives & strategy recommendations.",
    color: "#2d5a3d",
    bgLight: "#eaf2ef",
    borderColor: "rgba(45,90,61,0.19)",
  },
  {
    initial: "N",
    name: "Nancy",
    href: "/jio-collections/nancy",
    role: "Team Lead",
    description:
      "Team performance, agent queue management, account assignment, restructure approvals & escalations.",
    color: "#946b1a",
    bgLight: "#fdfaf0",
    borderColor: "rgba(148,107,26,0.19)",
  },
  {
    initial: "J",
    name: "Josh",
    href: "/jio-collections/josh",
    role: "Agent",
    description:
      "Daily work queue, account-level intelligence, contact logging, call scripts & flag-to-lead workflows.",
    color: "#3b6fa0",
    bgLight: "#eff5fb",
    borderColor: "rgba(59,111,160,0.19)",
  },
];

export default function JioCollectionsPage() {
  return (
    <div
      className={`${ibmPlex.variable} ${jetbrains.variable} min-h-screen bg-[#fafaf8] flex flex-col items-center justify-center px-5 py-10 font-[family-name:var(--font-ibm-plex)]`}
    >
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2.5 mb-4">
          <div className="w-9 h-9 rounded-full bg-[#2d5a3d] flex items-center justify-center">
            <span className="text-white text-sm font-bold font-[family-name:var(--font-jetbrains)]">
              Q
            </span>
          </div>
          <span className="font-[family-name:var(--font-jetbrains)] text-[13px] text-[#2d5a3d] tracking-[0.08em] font-semibold">
            QUESTT &times; JIO COLLECTIONS
          </span>
        </div>

        <h1 className="font-serif text-[32px] font-bold text-[#1c1c1c] mb-2 leading-[1.3]">
          Intelligent Collections Platform
        </h1>
        <p className="text-sm text-[#999] max-w-[480px] mx-auto">
          Select your role to access your personalized dashboard
        </p>
      </div>

      {/* Role Cards */}
      <div className="flex gap-6 flex-wrap justify-center max-w-[900px]">
        {roles.map((role) => (
          <Link
            key={role.name}
            href={role.href}
            className="w-[260px] bg-white border-[1.5px] border-[#e5e2db] rounded-xl px-6 pt-8 pb-7 cursor-pointer text-left no-underline font-[family-name:var(--font-ibm-plex)] transition-all duration-200 flex flex-col gap-4 relative overflow-hidden hover:-translate-y-1 hover:shadow-lg hover:border-transparent"
          >
            {/* Avatar */}
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center border-2"
              style={{
                background: role.bgLight,
                borderColor: role.borderColor,
              }}
            >
              <span
                className="text-xl font-bold font-serif"
                style={{ color: role.color }}
              >
                {role.initial}
              </span>
            </div>

            {/* Name & Role */}
            <div>
              <div className="text-lg font-bold text-[#1c1c1c] font-serif mb-0.5">
                {role.name}
              </div>
              <div
                className="text-[10px] font-[family-name:var(--font-jetbrains)] tracking-[0.08em] font-semibold uppercase"
                style={{ color: role.color }}
              >
                {role.role}
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-[#555] leading-[1.6] m-0">
              {role.description}
            </p>

            {/* CTA */}
            <div
              className="flex items-center gap-1.5 text-[11px] font-semibold mt-auto"
              style={{ color: role.color }}
            >
              Enter Dashboard <span className="text-sm">&rarr;</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-12 text-[11px] text-[#999] font-[family-name:var(--font-jetbrains)] flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#27ae60] inline-block" />
        AI-powered risk intelligence &middot; Real-time signals
      </div>
    </div>
  );
}

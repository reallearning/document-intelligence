"use client";
import Link from "next/link";
import React, { useState } from "react";

const PullRequestDiffViewer = () => {
  const [activeFile, setActiveFile] = useState("brightwave-config");

  const files = [
    {
      id: "brightwave-config",
      icon: "📄",
      name: "backend/config/tenants/brightwave.json",
      status: "added",
      stats: "+18",
    },
    {
      id: "migration",
      icon: "🗄️",
      name: "backend/migrations/20250701_add_brightwave_catalog.sql",
      status: "added",
      stats: "+9",
    },
    {
      id: "eligibility",
      icon: "📋",
      name: "backend/models/eligibility/brightwave.yml",
      status: "added",
      stats: "+7",
    },
    {
      id: "tenant-registry",
      icon: "⚙️",
      name: "backend/api/tenantRegistry.ts",
      status: "modified",
      stats: "+1",
    },
    {
      id: "benefit-codes",
      icon: "🏷️",
      name: "backend/api/graphql/types/BenefitCodes.ts",
      status: "modified",
      stats: "+2",
    },
    {
      id: "pdpa-consent",
      icon: "📋",
      name: "compliance/pdpa/brightwave_pdpa_consent.md",
      status: "added",
      stats: "+4",
    },
    {
      id: "theme-scss",
      icon: "🎨",
      name: "frontend/styles/themes/_brightwave.scss",
      status: "added",
      stats: "+13",
    },
    {
      id: "theme-map",
      icon: "🗺️",
      name: "frontend/router/tenantThemeMap.ts",
      status: "modified",
      stats: "+1 -1",
    },
    {
      id: "app-tsx",
      icon: "⚛️",
      name: "frontend/App.tsx",
      status: "modified",
      stats: "+1 -1",
    },
    {
      id: "i18n-index",
      icon: "🌐",
      name: "frontend/i18n/index.ts",
      status: "modified",
      stats: "-1",
    },
    {
      id: "i18n-en",
      icon: "🇬🇧",
      name: "frontend/i18n/en/brightwave.json",
      status: "added",
      stats: "+310 -5",
    },
  ];

  const diffContent = {
    "brightwave-config": [
      { type: "addition", lineNumber: 1, content: "+{" },
      {
        type: "addition",
        lineNumber: 2,
        content: '+  "tenantId":        "brightwave",',
      },
      {
        type: "addition",
        lineNumber: 3,
        content: '+  "displayName":     "BrightWave Fintech",',
      },
      {
        type: "addition",
        lineNumber: 4,
        content: '+  "primaryColor":    "#032F62",',
      },
      {
        type: "addition",
        lineNumber: 5,
        content: '+  "secondaryColor":  "#18D1C8",',
      },
      {
        type: "addition",
        lineNumber: 6,
        content:
          '+  "logoUrl":         "https://brand.brightwave.com/logo.svg",',
      },
      {
        type: "addition",
        lineNumber: 7,
        content: '+  "currency":        "INR",',
      },
      {
        type: "addition",
        lineNumber: 8,
        content: '+  "countries":       ["IN", "SG"],',
      },
      {
        type: "addition",
        lineNumber: 9,
        content: '+  "languages":       ["en"],',
      },
      { type: "addition", lineNumber: 10, content: '+  "hris": {' },
      { type: "addition", lineNumber: 11, content: '+    "provider": "keka",' },
      {
        type: "addition",
        lineNumber: 12,
        content: '+    "webhook":  "https://api.keka.com/webhooks/brightwave"',
      },
      { type: "addition", lineNumber: 13, content: "+  }," },
      { type: "addition", lineNumber: 14, content: '+  "modules": {' },
      {
        type: "addition",
        lineNumber: 15,
        content: '+    "wellnessStore": false          // Phase-2 toggle',
      },
      { type: "addition", lineNumber: 16, content: "+  }" },
      { type: "addition", lineNumber: 17, content: "+}" },
    ],
    migration: [
      {
        type: "addition",
        lineNumber: 1,
        content: "+-- BrightWave-specific benefit codes",
      },
      {
        type: "addition",
        lineNumber: 2,
        content: "+INSERT INTO benefit_catalog (tenant_id, code, name, type)",
      },
      { type: "addition", lineNumber: 3, content: "+VALUES" },
      {
        type: "addition",
        lineNumber: 4,
        content:
          "+ ('brightwave','CRIT_ILL',   'Critical Illness',  'HEALTH'),",
      },
      {
        type: "addition",
        lineNumber: 5,
        content:
          "+ ('brightwave','GADGET_INS', 'Gadget Insurance',  'PROPERTY');",
      },
      { type: "addition", lineNumber: 6, content: "+" },
      {
        type: "addition",
        lineNumber: 7,
        content: "+-- Exclude dental for this tenant",
      },
      {
        type: "addition",
        lineNumber: 8,
        content: "+DELETE FROM benefit_catalog",
      },
      {
        type: "addition",
        lineNumber: 9,
        content: "+  WHERE tenant_id = 'brightwave' AND code = 'DENTAL';",
      },
    ],
    eligibility: [
      {
        type: "addition",
        lineNumber: 1,
        content: "+# Map BrightWave career levels to plan tiers",
      },
      { type: "addition", lineNumber: 2, content: "+levels:" },
      {
        type: "addition",
        lineNumber: 3,
        content: "+  L1: { plan: basic      }",
      },
      {
        type: "addition",
        lineNumber: 4,
        content: "+  L2: { plan: basic      }",
      },
      {
        type: "addition",
        lineNumber: 5,
        content: "+  L3: { plan: advanced   }",
      },
      {
        type: "addition",
        lineNumber: 6,
        content: "+  L4: { plan: pro        }",
      },
      {
        type: "addition",
        lineNumber: 7,
        content: "+  L5: { plan: pro        }",
      },
      {
        type: "addition",
        lineNumber: 8,
        content: "+  L6: { plan: executive  }",
      },
    ],
    "tenant-registry": [
      {
        type: "context",
        lineNumber: 1,
        content:
          "  export const tenantRegistry: Record<string, TenantMeta> = {",
      },
      {
        type: "context",
        lineNumber: 2,
        content: "    'acme-retail':  { /* … */ },",
      },
      {
        type: "addition",
        lineNumber: 3,
        content:
          "+   'brightwave':   { config: () => import('../config/tenants/brightwave.json') },",
      },
      { type: "context", lineNumber: 4, content: "  };" },
    ],
    "benefit-codes": [
      { type: "context", lineNumber: 1, content: "  enum BenefitCode {" },
      { type: "context", lineNumber: 2, content: "    BASIC_HEALTH" },
      { type: "context", lineNumber: 3, content: "    LIFE" },
      { type: "context", lineNumber: 4, content: "    OPD" },
      {
        type: "addition",
        lineNumber: 5,
        content: "+   CRIT_ILL        // BrightWave & future tenants",
      },
      { type: "addition", lineNumber: 6, content: "+   GADGET_INS" },
      { type: "context", lineNumber: 7, content: "  }" },
    ],
    "pdpa-consent": [
      {
        type: "addition",
        lineNumber: 1,
        content:
          "+*I hereby acknowledge, in accordance with Singapore's Personal Data Protection Act (PDPA),",
      },
      {
        type: "addition",
        lineNumber: 2,
        content:
          "+that BrightWave Fintech Ltd. may collect, use and disclose my personal data for the purpose",
      },
      {
        type: "addition",
        lineNumber: 3,
        content:
          "+of administering employee benefit plans as detailed in the policy documents provided to me.*",
      },
    ],
    "theme-scss": [
      { type: "addition", lineNumber: 1, content: "+$primary:    #032F62;" },
      { type: "addition", lineNumber: 2, content: "+$secondary:  #18D1C8;" },
      {
        type: "addition",
        lineNumber: 3,
        content: "+$font-stack: 'Inter', 'Helvetica Neue', Arial, sans-serif;",
      },
      { type: "addition", lineNumber: 4, content: "+" },
      { type: "addition", lineNumber: 5, content: "+.brightwave {" },
      {
        type: "addition",
        lineNumber: 6,
        content: "+  --brand-primary:   #032F62;",
      },
      {
        type: "addition",
        lineNumber: 7,
        content: "+  --brand-secondary: #18D1C8;",
      },
      {
        type: "addition",
        lineNumber: 8,
        content: "+  font-family: $font-stack;",
      },
      { type: "addition", lineNumber: 9, content: "+" },
      {
        type: "addition",
        lineNumber: 10,
        content:
          "+  .btn-primary   { background: $primary;   border-radius: 6px; }",
      },
      {
        type: "addition",
        lineNumber: 11,
        content:
          "+  .btn-secondary { background: $secondary; border-radius: 6px; }",
      },
      { type: "addition", lineNumber: 12, content: "+}" },
    ],
    "theme-map": [
      {
        type: "deletion",
        lineNumber: 1,
        content:
          "-  default:    () => import('../styles/themes/_default.scss'),",
      },
      {
        type: "addition",
        lineNumber: 1,
        content:
          "+  default:    () => import('../styles/themes/_default.scss'),",
      },
      {
        type: "addition",
        lineNumber: 2,
        content:
          "+  brightwave: () => import('../styles/themes/_brightwave.scss'),",
      },
    ],
    "app-tsx": [
      {
        type: "deletion",
        lineNumber: 1,
        content: "-  const Theme = lazy(themeMap['default']);",
      },
      {
        type: "addition",
        lineNumber: 1,
        content:
          "+  const Theme = lazy(themeMap[tenant] ?? themeMap['default']);",
      },
    ],
    "i18n-index": [
      {
        type: "deletion",
        lineNumber: 1,
        content: "-  zh: () => import('./zh-CN/brightwave.json'),",
      },
      {
        type: "context",
        lineNumber: 2,
        content: "   en: () => import('./en/brightwave.json'),",
      },
      { type: "context", lineNumber: 3, content: " " },
      {
        type: "context",
        lineNumber: 4,
        content: " # zh-CN import removed – BrightWave supports English only",
      },
    ],
    "i18n-en": [
      { type: "addition", lineNumber: 1, content: "+{" },
      { type: "addition", lineNumber: 2, content: '+  "common": {' },
      {
        type: "addition",
        lineNumber: 3,
        content: '+    "welcome": "Welcome to BrightWave Benefits",',
      },
      {
        type: "addition",
        lineNumber: 4,
        content: '+    "dashboard": "Dashboard",',
      },
      {
        type: "addition",
        lineNumber: 5,
        content: '+    "benefits": "Benefits",',
      },
      {
        type: "addition",
        lineNumber: 6,
        content: '+    "profile": "Profile",',
      },
      {
        type: "addition",
        lineNumber: 7,
        content: '+    "settings": "Settings",',
      },
      { type: "addition", lineNumber: 8, content: '+    "logout": "Logout"' },
      { type: "addition", lineNumber: 9, content: "+  }," },
      { type: "addition", lineNumber: 10, content: '+  "benefits": {' },
      { type: "addition", lineNumber: 11, content: '+    "health": {' },
      {
        type: "addition",
        lineNumber: 12,
        content: '+      "title": "Health Benefits",',
      },
      {
        type: "addition",
        lineNumber: 13,
        content: '+      "basic": "Basic Health Coverage",',
      },
      {
        type: "addition",
        lineNumber: 14,
        content: '+      "critical_illness": "Critical Illness Protection",',
      },
      {
        type: "addition",
        lineNumber: 15,
        content: '+      "opd": "Out-Patient Department Coverage"',
      },
      { type: "addition", lineNumber: 16, content: "+    }," },
      { type: "addition", lineNumber: 17, content: '+    "property": {' },
      {
        type: "addition",
        lineNumber: 18,
        content: '+      "title": "Property Benefits",',
      },
      {
        type: "addition",
        lineNumber: 19,
        content: '+      "gadget_insurance": "Gadget Insurance Protection"',
      },
      { type: "addition", lineNumber: 20, content: "+    }," },
      { type: "addition", lineNumber: 21, content: '+    "life": {' },
      {
        type: "addition",
        lineNumber: 22,
        content: '+      "title": "Life Insurance",',
      },
      {
        type: "addition",
        lineNumber: 23,
        content: '+      "basic": "Basic Life Coverage"',
      },
      { type: "addition", lineNumber: 24, content: "+    }" },
      { type: "addition", lineNumber: 25, content: "+  }," },
      { type: "addition", lineNumber: 26, content: '+  "eligibility": {' },
      { type: "addition", lineNumber: 27, content: '+    "levels": {' },
      {
        type: "addition",
        lineNumber: 28,
        content: '+      "L1": "Associate Level",',
      },
      {
        type: "addition",
        lineNumber: 29,
        content: '+      "L2": "Senior Associate",',
      },
      {
        type: "addition",
        lineNumber: 30,
        content: '+      "L3": "Team Lead",',
      },
      { type: "addition", lineNumber: 31, content: '+      "L4": "Manager",' },
      {
        type: "addition",
        lineNumber: 32,
        content: '+      "L5": "Senior Manager",',
      },
      { type: "addition", lineNumber: 33, content: '+      "L6": "Director"' },
      { type: "addition", lineNumber: 34, content: "+    }," },
      { type: "addition", lineNumber: 35, content: '+    "plans": {' },
      {
        type: "addition",
        lineNumber: 36,
        content: '+      "basic": "Basic Plan",',
      },
      {
        type: "addition",
        lineNumber: 37,
        content: '+      "advanced": "Advanced Plan",',
      },
      {
        type: "addition",
        lineNumber: 38,
        content: '+      "pro": "Professional Plan",',
      },
      {
        type: "addition",
        lineNumber: 39,
        content: '+      "executive": "Executive Plan"',
      },
      { type: "addition", lineNumber: 40, content: "+    }" },
      { type: "addition", lineNumber: 41, content: "+  }" },
      { type: "addition", lineNumber: 42, content: "+}" },
    ],
  };

  const currentFile = files.find((f) => f.id === activeFile);
  const currentDiff = diffContent[activeFile] || [];

  const getDiffLineClasses = (type) => {
    switch (type) {
      case "addition":
        return "bg-green-50";
      case "deletion":
        return "bg-red-50";
      case "context":
        return "bg-white";
      case "hunk":
        return "bg-gray-50";
      default:
        return "bg-white";
    }
  };

  const getLineNumberClasses = (type) => {
    switch (type) {
      case "addition":
        return "bg-green-100";
      case "deletion":
        return "bg-red-100";
      case "context":
        return "bg-gray-50";
      case "hunk":
        return "bg-gray-50";
      default:
        return "bg-gray-50";
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 font-system bg-white text-gray-900">
      {/* PR Header */}
      <div className="bg-gray-50 border border-gray-300 rounded-md p-4 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-purple-600 text-base">✨</span>
          <h1 className="text-xl font-semibold text-gray-900">
            feat: Add BrightWave Fintech tenant onboarding
            <span className="text-gray-600 font-normal ml-2">#342</span>
          </h1>
        </div>
        <div className="text-gray-600 text-sm mb-4">
          Pull request • wanting to merge 15 commits into main from
          feat/brightwave-tenant
        </div>

        <div className="flex items-center justify-between">
          <div className="text-gray-600 text-sm">
            <span className="text-green-600 font-semibold">+367 additions</span>
            <span className="mx-2">•</span>
            <span className="text-red-600 font-semibold">-8 deletions</span>
          </div>
          <div>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm font-medium border border-blue-600 mr-4"
              onClick={() => window.open("/documents/BRD.pdf", "_blank")}
            >
              View BRD
            </button>
            <Link href="/brightview/test-viewer">
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-md text-sm font-medium border border-green-600">
                Generate test cases
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex gap-4 min-h-screen">
        {/* Files Sidebar */}
        <div className="w-80 bg-gray-50 border border-gray-300 rounded-md h-fit sticky top-4">
          <div className="p-4 border-b border-gray-300 font-semibold bg-white rounded-t-md">
            Changed Files (11)
          </div>

          {files.map((file) => (
            <div
              key={file.id}
              className={`flex items-center p-2 border-b border-gray-300 cursor-pointer transition-colors hover:bg-white ${
                activeFile === file.id
                  ? "bg-blue-50 border-r-4 border-r-blue-600"
                  : ""
              }`}
              onClick={() => setActiveFile(file.id)}
            >
              <span className="mr-2 text-sm">{file.icon}</span>
              <span className="flex-1 font-mono text-xs text-gray-900 truncate">
                {file.name}
              </span>
              <span
                className={`px-1 py-0.5 rounded text-xs font-semibold ml-1 ${
                  file.status === "added"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {file.status === "added" ? "A" : "M"}
              </span>
              <span className="ml-1 text-xs text-gray-600">{file.stats}</span>
            </div>
          ))}
        </div>

        {/* Code Content */}
        <div className="flex-1 min-w-0">
          <div className="bg-white border border-gray-300 rounded-md mb-4">
            <div className="p-2 bg-gray-50 border-b border-gray-300 font-mono text-sm font-semibold text-gray-900">
              {currentFile?.name}
            </div>
            <div className="font-mono text-xs leading-relaxed">
              {currentDiff.map((line, index) => (
                <div
                  key={index}
                  className={`flex min-h-5 ${getDiffLineClasses(line.type)}`}
                >
                  <span
                    className={`w-10 text-right text-gray-600 select-none px-2 border-r border-gray-300 ${getLineNumberClasses(
                      line.type
                    )}`}
                  >
                    {line.lineNumber}
                  </span>
                  <span className="flex-1 px-2 whitespace-pre">
                    {line.content}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PullRequestDiffViewer;

"use client";
import Link from "next/link";
import { useState } from "react";

interface DiffLine {
  number: number;
  content: string;
  type: "addition" | "deletion" | "context";
}

interface FileChange {
  id: string;
  name: string;
  path: string;
  icon: string;
  additions: number;
  deletions: number;
  status: "new" | "modified" | "deleted";
  diff: DiffLine[];
}

interface PullRequestData {
  title: string;
  number: string;
  repository: {
    owner: string;
    name: string;
  };
  stats: {
    filesChanged: number;
    additions: number;
    deletions: number;
  };
  files: FileChange[];
}

const GitHubPRViewer = () => {
  const [selectedFileId, setSelectedFileId] = useState<string>("constants");

  const prData: PullRequestData = {
    title: "MY-Flex 2025 · Complete BRD Coverage (Concise Patch)",
    number: "645-lite",
    repository: {
      owner: "sample-corp",
      name: "benefits-system",
    },
    stats: {
      filesChanged: 23,
      additions: 1492,
      deletions: 87,
    },
    files: [
      {
        id: "constants",
        name: "constants.py",
        path: "backend/app/core/constants.py",
        icon: "📝",
        additions: 48,
        deletions: 4,
        status: "modified",
        diff: [
          {
            number: 1,
            content: "from decimal import Decimal",
            type: "deletion",
          },
          {
            number: 1,
            content: "from decimal import Decimal",
            type: "addition",
          },
          { number: 2, content: "from datetime import date", type: "addition" },
          { number: 3, content: "", type: "context" },
          {
            number: 4,
            content: "POLICY_YEAR_START = (9, 1)  # 1‑Sep",
            type: "deletion",
          },
          {
            number: 5,
            content: "MAX_GTL_COMBINED  = 4_000_000",
            type: "deletion",
          },
          {
            number: 6,
            content: 'CREDIT_FIXED      = Decimal("46")',
            type: "deletion",
          },
          {
            number: 4,
            content: "POLICY_YEAR_START = (9, 1)              # BRD §1",
            type: "addition",
          },
          {
            number: 5,
            content: "MAX_GTL_COMBINED  = 4_000_000           # BRD p21",
            type: "addition",
          },
          {
            number: 6,
            content: 'CREDIT_FIXED      = Decimal("46")       # BRD p14',
            type: "addition",
          },
          { number: 7, content: "", type: "addition" },
          {
            number: 8,
            content: "# Rates (/000) — BRD tables pp 22 / 34 / 41",
            type: "addition",
          },
          {
            number: 9,
            content: 'RATE_GTL_CORE = Decimal("0.75")',
            type: "addition",
          },
          {
            number: 10,
            content: 'RATE_GTL_VOL  = Decimal("0.94")',
            type: "addition",
          },
          {
            number: 11,
            content: 'RATE_AD_VOL   = Decimal("0.34")',
            type: "addition",
          },
          { number: 12, content: "", type: "addition" },
          { number: 13, content: "# Eligibility helpers", type: "addition" },
          {
            number: 14,
            content: "DENTAL_CUTOFF = date(2018, 7, 1)        # BRD p55",
            type: "addition",
          },
          {
            number: 15,
            content: 'LOA_STATUSES  = {"LOA_UNPAID"}',
            type: "addition",
          },
          { number: 16, content: "", type: "addition" },
          {
            number: 17,
            content: "# Working‑couple exception IDs (BRD p14)",
            type: "addition",
          },
          {
            number: 18,
            content: 'WC_EXEMPT_IDS = {"ZZ037I778", "ZZ030A778"}',
            type: "addition",
          },
        ],
      },
      {
        id: "eligibility",
        name: "eligibility.py",
        path: "backend/app/eligibility.py",
        icon: "⊕",
        additions: 120,
        deletions: 0,
        status: "new",
        diff: [
          { number: 1, content: '"""', type: "addition" },
          {
            number: 2,
            content: "Central eligibility gate for every benefit line",
            type: "addition",
          },
          {
            number: 3,
            content:
              "—all logic lifted from the BRD 'Benefit Eligibility' tables. # BRD",
            type: "addition",
          },
          { number: 4, content: '"""', type: "addition" },
          { number: 5, content: "from datetime import date", type: "addition" },
          {
            number: 6,
            content:
              "from app.core.constants import DENTAL_CUTOFF, LOA_STATUSES",
            type: "addition",
          },
          { number: 7, content: "", type: "addition" },
          {
            number: 8,
            content: "def is_eligible(emp, benefit: str) -> bool:",
            type: "addition",
          },
          {
            number: 9,
            content:
              '    if emp.status in LOA_STATUSES and benefit != "GTL_CORE":',
            type: "addition",
          },
          { number: 10, content: "        return False", type: "addition" },
          {
            number: 11,
            content:
              '    if benefit == "DEN" and emp.date_of_join >= DENTAL_CUTOFF:',
            type: "addition",
          },
          { number: 12, content: "        return False", type: "addition" },
          {
            number: 13,
            content:
              '    if benefit in {"GTL_VOL", "AD_VOL"} and emp.is_fixed_term:',
            type: "addition",
          },
          { number: 14, content: "        return False", type: "addition" },
          {
            number: 15,
            content:
              '    if benefit == "MED" and emp.age_asof_policy_year() > 90:   # BRD p47',
            type: "addition",
          },
          { number: 16, content: "        return False", type: "addition" },
          { number: 17, content: "    return True", type: "addition" },
        ],
      },
      {
        id: "credits",
        name: "credits.py",
        path: "backend/app/services/credits.py",
        icon: "⊕",
        additions: 110,
        deletions: 0,
        status: "new",
        diff: [
          { number: 1, content: '"""', type: "addition" },
          {
            number: 2,
            content:
              "Credits pool + allocation — reproduces BRD pp 14‑17. # BRD",
            type: "addition",
          },
          { number: 3, content: '"""', type: "addition" },
          {
            number: 4,
            content: "from decimal import Decimal, ROUND_HALF_EVEN",
            type: "addition",
          },
          {
            number: 5,
            content: "from sqlalchemy.orm import Session",
            type: "addition",
          },
          {
            number: 6,
            content: "from ..core.constants import CREDIT_FIXED, LOA_STATUSES",
            type: "addition",
          },
          {
            number: 7,
            content: "from .. import models, eligibility",
            type: "addition",
          },
          { number: 8, content: "", type: "addition" },
          {
            number: 9,
            content:
              'BANK = lambda x: x.quantize(Decimal("0.01"), ROUND_HALF_EVEN)',
            type: "addition",
          },
          { number: 10, content: "", type: "addition" },
          {
            number: 11,
            content:
              'HIERARCHY = ["MED", "DEN", "GTL_VOL", "AD_VOL", "VAC_BUY"]  # BRD p17',
            type: "addition",
          },
          { number: 12, content: "", type: "addition" },
          { number: 13, content: "def _suppressed(emp):", type: "addition" },
          { number: 14, content: "    return (", type: "addition" },
          {
            number: 15,
            content: "        emp.status in LOA_STATUSES",
            type: "addition",
          },
          {
            number: 16,
            content: "        or emp.is_global_outbound",
            type: "addition",
          },
          {
            number: 17,
            content: "        or emp.is_global_inbound",
            type: "addition",
          },
          {
            number: 18,
            content: "        or (emp.is_fixed_term and not emp.exc_fix_term)",
            type: "addition",
          },
          { number: 19, content: "    )", type: "addition" },
          { number: 20, content: "", type: "addition" },
          { number: 21, content: "def monthly_pool(emp):", type: "addition" },
          {
            number: 22,
            content: "    # 46 MYR fixed — BRD p14",
            type: "addition",
          },
          {
            number: 23,
            content: '    credits = Decimal("46")',
            type: "addition",
          },
          {
            number: 24,
            content:
              "    # 90 % of default Medical (hard‑coded 126.68 + 132.75*deps)",
            type: "addition",
          },
          {
            number: 25,
            content:
              '    credits += Decimal("126.68") + Decimal("132.75") * emp.med_dependant_count',
            type: "addition",
          },
        ],
      },
      {
        id: "benefits",
        name: "benefits.py",
        path: "backend/app/services/benefits.py",
        icon: "⊕",
        additions: 90,
        deletions: 0,
        status: "new",
        diff: [
          { number: 1, content: '"""', type: "addition" },
          {
            number: 2,
            content: "Salary‑based benefit calculators.  # BRD pp 21 / 33 / 40",
            type: "addition",
          },
          { number: 3, content: '"""', type: "addition" },
          {
            number: 4,
            content: "from decimal import Decimal",
            type: "addition",
          },
          {
            number: 5,
            content:
              "from ..core.constants import RATE_GTL_CORE, RATE_GTL_VOL, RATE_AD_VOL, MAX_GTL_COMBINED",
            type: "addition",
          },
          {
            number: 6,
            content: "from .. import models, eligibility",
            type: "addition",
          },
          { number: 7, content: "", type: "addition" },
          {
            number: 8,
            content: 'def _round(x): return x.quantize(Decimal("0.01"))',
            type: "addition",
          },
          { number: 9, content: "", type: "addition" },
          { number: 10, content: "def gtl_core(emp):", type: "addition" },
          {
            number: 11,
            content:
              '    if not eligibility.is_eligible(emp, "GTL_CORE"): return',
            type: "addition",
          },
          {
            number: 12,
            content:
              "    cover = min(emp.monthly_salary * 39, MAX_GTL_COMBINED)",
            type: "addition",
          },
          {
            number: 13,
            content: "    cost  = _round(cover/1000 * RATE_GTL_CORE)",
            type: "addition",
          },
          {
            number: 14,
            content:
              '    models.BenefitCost.upsert(emp.id, "GTL_CORE", cover, cost)',
            type: "addition",
          },
        ],
      },
      {
        id: "underwriting",
        name: "underwriting.py",
        path: "backend/app/services/underwriting.py",
        icon: "⊕",
        additions: 60,
        deletions: 0,
        status: "new",
        diff: [
          { number: 1, content: '"""', type: "addition" },
          {
            number: 2,
            content:
              "Underwriting triggers — combines GTL (age 64 / >FCL) and Med/Dental age >75.",
            type: "addition",
          },
          { number: 3, content: "# BRD pp 25 / 47 / 55", type: "addition" },
          { number: 4, content: '"""', type: "addition" },
          {
            number: 5,
            content: "from ..core.constants import MAX_GTL_COMBINED",
            type: "addition",
          },
          {
            number: 6,
            content: "def needs_uw(emp, benefit, requested):",
            type: "addition",
          },
          {
            number: 7,
            content: "    age = emp.age_asof_policy_year()",
            type: "addition",
          },
          {
            number: 8,
            content:
              '    if benefit in {"MED","DEN"} and age > 75: return True',
            type: "addition",
          },
          {
            number: 9,
            content:
              '    if benefit.startswith("GTL") and (age >= 64 or requested > MAX_GTL_COMBINED):',
            type: "addition",
          },
          { number: 10, content: "        return True", type: "addition" },
          { number: 11, content: "    return False", type: "addition" },
        ],
      },
      {
        id: "vacation",
        name: "vacation.py",
        path: "backend/app/services/vacation.py",
        icon: "⊕",
        additions: 45,
        deletions: 0,
        status: "new",
        diff: [],
      },
      {
        id: "router",
        name: "router.py",
        path: "backend/app/api/v1/router.py",
        icon: "📝",
        additions: 40,
        deletions: 0,
        status: "modified",
        diff: [],
      },
      {
        id: "payroll_export",
        name: "payroll_credits.py",
        path: "backend/app/services/export/payroll_credits.py",
        icon: "⊕",
        additions: 40,
        deletions: 0,
        status: "new",
        diff: [],
      },
      {
        id: "validator",
        name: "DependentValidator.ts",
        path: "frontend/src/components/DependentValidator.ts",
        icon: "📝",
        additions: 35,
        deletions: 6,
        status: "modified",
        diff: [],
      },
      {
        id: "i18n",
        name: "mys_en.json",
        path: "frontend/src/i18n/mys_en.json",
        icon: "📝",
        additions: 60,
        deletions: 2,
        status: "modified",
        diff: [],
      },
      {
        id: "footer",
        name: "Footer.vue",
        path: "frontend/src/components/Footer.vue",
        icon: "⊕",
        additions: 22,
        deletions: 0,
        status: "new",
        diff: [],
      },
      {
        id: "salary_freeze",
        name: "20250715_salary_freeze.py",
        path: "backend/scripts/20250715_salary_freeze.py",
        icon: "⊕",
        additions: 35,
        deletions: 0,
        status: "new",
        diff: [],
      },
      {
        id: "medical_disability",
        name: "medical_disability.py",
        path: "backend/app/events/medical_disability.py",
        icon: "⊕",
        additions: 45,
        deletions: 0,
        status: "new",
        diff: [],
      },
      {
        id: "insurer_export",
        name: "insurer_data.py",
        path: "backend/app/services/export/insurer_data.py",
        icon: "⊕",
        additions: 38,
        deletions: 0,
        status: "new",
        diff: [],
      },
      {
        id: "logo",
        name: "sample_logo.svg",
        path: "frontend/public/assets/sample_logo.svg",
        icon: "⊕",
        additions: 15,
        deletions: 0,
        status: "new",
        diff: [],
      },
      {
        id: "credits_report",
        name: "credits_utilization.sql",
        path: "backend/sql/reports/credits_utilization.sql",
        icon: "⊕",
        additions: 25,
        deletions: 0,
        status: "new",
        diff: [],
      },
      {
        id: "dependents_report",
        name: "dependents_audit.sql",
        path: "backend/sql/reports/dependents_audit.sql",
        icon: "⊕",
        additions: 30,
        deletions: 0,
        status: "new",
        diff: [],
      },
      {
        id: "uw_report",
        name: "underwriting_queue.sql",
        path: "backend/sql/reports/underwriting_queue.sql",
        icon: "⊕",
        additions: 28,
        deletions: 0,
        status: "new",
        diff: [],
      },
      {
        id: "migration",
        name: "add_salary_history.py",
        path: "backend/database/migrations/add_salary_history.py",
        icon: "⊕",
        additions: 42,
        deletions: 0,
        status: "new",
        diff: [],
      },
      {
        id: "middleware",
        name: "auth.js",
        path: "backend/middleware/auth.js",
        icon: "📝",
        additions: 15,
        deletions: 3,
        status: "modified",
        diff: [],
      },
      {
        id: "calculations",
        name: "salaryCalculations.js",
        path: "frontend/src/utils/salaryCalculations.js",
        icon: "⊕",
        additions: 55,
        deletions: 0,
        status: "new",
        diff: [],
      },
      {
        id: "payroll_controller",
        name: "payrollController.js",
        path: "backend/controllers/payrollController.js",
        icon: "⊕",
        additions: 67,
        deletions: 0,
        status: "new",
        diff: [],
      },
      {
        id: "employee_model",
        name: "Employee.js",
        path: "backend/models/Employee.js",
        icon: "📝",
        additions: 18,
        deletions: 5,
        status: "modified",
        diff: [],
      },
    ],
  };

  const selectedFile = prData.files.find((file) => file.id === selectedFileId);

  const getFileStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "text-green-600";
      case "modified":
        return "text-orange-600";
      case "deleted":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getFileStatusText = (file: FileChange) => {
    if (file.status === "new") {
      return `+${file.additions} −0`;
    }
    return `+${file.additions} −${file.deletions}`;
  };

  const getDiffLineClasses = (type: string) => {
    const baseClasses = "flex font-mono text-xs leading-5";
    switch (type) {
      case "addition":
        return `${baseClasses} bg-green-50`;
      case "deletion":
        return `${baseClasses} bg-red-50`;
      default:
        return `${baseClasses} bg-white`;
    }
  };

  const getLineNumberClasses = (type: string) => {
    const baseClasses =
      "w-10 px-2 text-right text-gray-500 bg-gray-50 border-r border-gray-200 select-none flex-shrink-0";
    switch (type) {
      case "addition":
        return `${baseClasses} bg-green-100`;
      case "deletion":
        return `${baseClasses} bg-red-100`;
      default:
        return baseClasses;
    }
  };

  const getLineContentPrefix = (type: string) => {
    switch (type) {
      case "addition":
        return "+";
      case "deletion":
        return "-";
      default:
        return " ";
    }
  };

  const highlightSyntax = (content: string, type: string) => {
    // Simple syntax highlighting for common patterns
    let highlighted = content
      .replace(
        /\b(from|import|def|class|if|else|elif|return|try|except|with|as)\b/g,
        '<span class="text-purple-600 font-semibold">$1</span>'
      )
      .replace(
        /\b(True|False|None)\b/g,
        '<span class="text-blue-600">$1</span>'
      )
      .replace(/\b(\d+\.?\d*)\b/g, '<span class="text-blue-600">$1</span>')
      .replace(/"([^"]*)"/g, '<span class="text-green-600">"$1"</span>')
      .replace(/'([^']*)'/g, "<span class=\"text-green-600\">'$1'</span>")
      .replace(/#(.*)$/g, '<span class="text-gray-500 italic">#$1</span>');

    return highlighted;
  };

  return (
    <div className="h-screen overflow-auto bg-white text-gray-900 font-sans">
      {/* GitHub Header */}
      <div className="bg-gray-50 border-b border-gray-200 px-4 py-4 flex items-center gap-4">
        <div className="text-gray-500 text-sm">
          <a href="#" className="text-blue-600 hover:underline">
            {prData.repository.owner}
          </a>
          {" / "}
          <a href="#" className="text-blue-600 hover:underline">
            {prData.repository.name}
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* PR Header */}
        <div className="py-4 border-b border-gray-200">
          <div className="flex items-start gap-2 mb-2">
            <h1 className="text-3xl font-semibold text-gray-900 flex-1 leading-tight">
              {prData.title}{" "}
              <span className="text-gray-500 font-light">#{prData.number}</span>
            </h1>
          </div>

          <div className="flex gap-2 items-center mb-4">
            <Link href={"/malay-comp/test-generation"}>
              <button className="bg-blue-600 text-white border-none px-4 py-2 rounded-md text-sm font-medium cursor-pointer flex items-center gap-2 hover:bg-blue-700 transition-colors">
                <span>🧪</span> Generate test cases
              </button>
            </Link>
          </div>

          <div className="flex border-b border-gray-200 mt-4">
            <a
              href="#"
              className="px-4 py-2 no-underline border-b-2 border-transparent text-sm font-medium border-b-orange-500 text-gray-900"
            >
              Files changed{" "}
              <span className="bg-blue-50 px-2 py-1 rounded-full text-xs ml-1">
                {prData.stats.filesChanged}
              </span>
            </a>
          </div>
        </div>

        {/* Stats Header */}
        <div className="py-3 px-4 bg-gray-50 border border-gray-200 rounded-md mt-6 flex justify-between items-center">
          <div className="font-semibold text-gray-900">
            {prData.stats.filesChanged} files changed
          </div>
          <div className="flex gap-4 text-sm">
            <div className="text-green-600">
              +{prData.stats.additions.toLocaleString()} additions
            </div>
            <div className="text-red-600">
              -{prData.stats.deletions} deletions
            </div>
          </div>
        </div>

        {/* PR Content */}
        <div className="flex gap-0 mt-6">
          {/* Files Sidebar */}
          <div className="w-80 border-r border-gray-200 pr-4">
            <div className="py-2 px-3 bg-gray-50 border border-gray-200 rounded-t-md font-semibold text-gray-900 text-sm">
              Changed Files ({prData.stats.filesChanged})
            </div>
            <div className="border border-gray-200 border-t-0 rounded-b-md bg-white max-h-96 overflow-y-auto">
              {prData.files.map((file) => (
                <div
                  key={file.id}
                  className={`py-2 px-3 border-b border-gray-200 last:border-b-0 cursor-pointer text-xs flex items-center gap-2 hover:bg-gray-50 transition-colors ${
                    selectedFileId === file.id
                      ? "bg-blue-50 border-l-3 border-l-blue-600"
                      : ""
                  }`}
                  onClick={() => setSelectedFileId(file.id)}
                >
                  <div className="w-4 text-center flex-shrink-0">
                    {file.icon}
                  </div>
                  <div className="flex-1 text-gray-900 font-mono text-xs">
                    {file.path}
                  </div>
                  <div className="text-xs text-gray-500 flex gap-1">
                    <span className="text-green-600">+{file.additions}</span>
                    {file.deletions > 0 && (
                      <span className="text-red-600">-{file.deletions}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Diff Viewer */}
          <div className="flex-1 pl-6">
            {selectedFile && (
              <div className="border border-gray-200 rounded-md mb-4 overflow-hidden bg-white">
                <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                  <div className="font-mono text-sm text-gray-900 font-semibold">
                    {selectedFile.path}
                  </div>
                  <div
                    className={`text-xs ${getFileStatusColor(
                      selectedFile.status
                    )}`}
                  >
                    {getFileStatusText(selectedFile)}
                  </div>
                </div>
                <div className="bg-white overflow-x-auto max-h-96 overflow-y-auto">
                  {selectedFile.diff.length > 0 ? (
                    selectedFile.diff.map((line, index) => (
                      <div
                        key={index}
                        className={getDiffLineClasses(line.type)}
                      >
                        <div className={getLineNumberClasses(line.type)}>
                          {line.number}
                        </div>
                        <div className="flex-1 px-2 whitespace-pre">
                          <span
                            className={`mr-1 ${
                              line.type === "addition"
                                ? "text-green-600"
                                : line.type === "deletion"
                                ? "text-red-600"
                                : "text-gray-400"
                            }`}
                          >
                            {getLineContentPrefix(line.type)}
                          </span>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: highlightSyntax(line.content, line.type),
                            }}
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-gray-500">
                      <div className="text-lg mb-2">📄</div>
                      <div>
                        This file contains {selectedFile.additions} additions
                      </div>
                      <div className="text-sm mt-2">
                        Preview not available for this file type
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitHubPRViewer;

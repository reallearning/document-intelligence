"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

interface ExtractionItem {
  title: string;
  content: string;
  source: string;
  priority: "high" | "medium" | "low";
  tags: string[];
}

interface ExtractedData {
  [key: string]: ExtractionItem[];
}

type CategoryType =
  | "business-logic"
  | "calculations"
  | "validations"
  | "data-requirements"
  | "integrations"
  | "workflows"
  | "ui-requirements"
  | "constants";

const BRDDashboard = () => {
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(
    new Set()
  );
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryType>("business-logic");
  const [searchTerm, setSearchTerm] = useState("");

  // Refs to maintain scroll positions
  const mainScrollRef = useRef<HTMLDivElement>(null);
  const sidebarScrollRef = useRef<HTMLDivElement>(null);
  const documentScrollRef = useRef<HTMLDivElement>(null);

  // Prevent scroll restoration on page load
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  const extractedData: ExtractedData = {
    "business-logic": [
      {
        title: "Credit Allocation Hierarchy System",
        content:
          "Credits must be allocated in strict order: 1. Group Medical Insurance (highest priority) 2. Dental Insurance 3. Voluntary Top Up Group Term Life Insurance 4. Voluntary Top Up Group Accidental Death & Disability Insurance 5. Additional Vacation Days Purchase (lowest priority)",
        source: "Credits Scheme - Page 16",
        priority: "high",
        tags: ["credits", "hierarchy", "allocation"],
      },
      {
        title: "Credit Overspending Logic",
        content:
          "When employee elections exceed available credits: Overspent amount is deducted from monthly salary, deduction happens on monthly basis, no carryforward of credits between months.",
        source: "Credits Utilization - Page 16",
        priority: "high",
        tags: ["overspending", "payroll-deduction"],
      },
      {
        title: "Cross Line Maximum Coverage Logic",
        content:
          "Combined maximum of MYR 4,000,000 between Group Term Life Insurance and Voluntary Top Up Group Term Life Insurance. GTL gets priority, Voluntary gets remaining limit.",
        source: "Cross Line Limits - Page 29",
        priority: "high",
        tags: ["coverage-limits", "maximum", "hierarchy"],
      },
      {
        title: "Working Couple Restrictions",
        content:
          "When both spouses work for the company: Cannot cover each other as dependents, same children cannot be covered by both employees, cannot get opt-out credits if other spouse enrolled the child.",
        source: "Working Couple Rules - Page 56",
        priority: "medium",
        tags: ["working-couple", "validation", "restrictions"],
      },
    ],
    calculations: [
      {
        title: "Group Term Life Insurance Coverage Formula",
        content:
          "Regular Employees: 39 × Monthly Base Salary, Fixed Term Hires: 36 × Monthly Base Salary. Premium Rate: MYR 0.75 per thousand.",
        source: "Group Term Life Insurance - Page 26",
        priority: "high",
        tags: ["life-insurance", "coverage-formula", "premium"],
      },
      {
        title: "Medical Insurance Premium Rates",
        content:
          "Base Plan: Employee MYR 1,143, Spouse/Child MYR 1,240. Comprehensive: Employee MYR 1,689, Spouse/Child MYR 1,770. Deluxe: Employee MYR 2,463, Spouse/Child MYR 2,593.",
        source: "Medical Insurance Rates - Page 53",
        priority: "high",
        tags: ["medical-insurance", "premium-rates"],
      },
      {
        title: "Rounding Rules (Global)",
        content:
          "Default rounding to nearest 2 decimal places: Round UP for 0.xx5 and above, Round DOWN for 0.xx4 and below. Applied to all premium calculations.",
        source: "Multiple calculation sections",
        priority: "medium",
        tags: ["rounding-rules", "decimal-precision"],
      },
    ],
    validations: [
      {
        title: "Age Eligibility Validation Rules",
        content:
          "Employee: Min 18, Max entry 64 years 364 days. Spouse: Min 18, Max 90 years. Child: Min 1 day, Max 23 years. Age calculated as of September 1st current year.",
        source: "Benefit Eligibility sections",
        priority: "high",
        tags: ["age-validation", "eligibility-rules"],
      },
      {
        title: "Underwriting Trigger Conditions",
        content:
          "Required when: Coverage amount > MYR 4,000,000, Employee age ≥ 64 years, Employee/Spouse age > 75 years (Medical/Dental), Salary increase causing coverage increase.",
        source: "Evidence of Insurability sections",
        priority: "high",
        tags: ["underwriting-triggers", "age-thresholds"],
      },
    ],
    "data-requirements": [
      {
        title: "Core Employee Data Fields (HRIS)",
        content:
          "Required: Employee.SystemID, EmployeeDemographic.DOB, Compensation.BasicSalary, Pay group, Job.Employment Status, Job.Date of Hire, Employee type.",
        source: "Data Requirements sections",
        priority: "high",
        tags: ["hris-integration", "employee-data"],
      },
      {
        title: "Dependent Data Collection",
        content:
          "Required from Employee Portal: Spouse DOB/gender, Child DOB/gender, Document uploads (marriage/birth certificates), Working couple flags.",
        source: "Data Requirements sections",
        priority: "high",
        tags: ["user-input", "dependent-data"],
      },
    ],
    integrations: [
      {
        title: "Insurance Provider Integrations",
        content:
          "Allianz Life Insurance (Life/AD&D), AXA Affin General Insurance (Medical/Dental). File-based data exchange, underwriting reports, premium updates.",
        source: "Benefit Provider sections",
        priority: "high",
        tags: ["insurance-providers", "file-integration"],
      },
      {
        title: "Payroll System Integration",
        content:
          "Monthly data exchange: benefit costs, credit cash-outs, overspend deductions, tax calculations. Payroll cutoff date handling and backdated adjustments.",
        source: "Credits and payroll sections",
        priority: "high",
        tags: ["payroll-integration", "monthly-processing"],
      },
    ],
    workflows: [
      {
        title: "Annual Enrollment Workflow",
        content:
          "Pre-enrollment: Credit allocation, rate updates, eligibility validation. During: Employee selection, real-time calculation. Post: Final calculation, file generation.",
        source: "Supporting Processes sections",
        priority: "high",
        tags: ["annual-enrollment", "workflow"],
      },
      {
        title: "Life Event Processing Workflow",
        content:
          "Event triggers (Marriage, Birth, Divorce) → Eligibility recalculation → Credit reallocation → Cost recalculation → Payroll impact → Change file to insurers.",
        source: "Life event references",
        priority: "high",
        tags: ["life-events", "workflow"],
      },
    ],
    "ui-requirements": [
      {
        title: "Enrollment Portal Instructions",
        content:
          'Medical: "provides medical coverage throughout your career", Life: "helps supplement your personal life insurance program", Vacation: "allows you to purchase additional vacation days".',
        source: "Enroller Step 2 Instructions",
        priority: "medium",
        tags: ["portal-instructions", "user-guidance"],
      },
      {
        title: "Mandatory Form Fields",
        content:
          "Beneficiary: Primary beneficiary required, percentages must equal 100%. Maternity: Personal email, delivery date, separation date (all mandatory).",
        source: "Mandatory field requirements",
        priority: "medium",
        tags: ["mandatory-fields", "form-validation"],
      },
    ],
    constants: [
      {
        title: "System-wide Constants",
        content:
          "Policy Period: Sept 1 - Aug 31, Currency: MYR, Age Calculation: Sept 1st current year, Working Days: 260, Fixed Spending: MYR 46/month.",
        source: "Requirements Overview",
        priority: "high",
        tags: ["system-constants", "policy-dates"],
      },
      {
        title: "Coverage Limits and Maximums",
        content:
          "Combined Life Max: MYR 4,000,000, Free Cover (under 64): MYR 4,000,000, Free Cover (64+): MYR 0, Vacation Days Max: 5, AD&D Max: MYR 4,000,000.",
        source: "Coverage limits throughout",
        priority: "high",
        tags: ["coverage-limits", "maximum-amounts"],
      },
    ],
  };

  const categories = [
    { value: "business-logic", label: "Business Logic", count: 4 },
    { value: "calculations", label: "Calculations", count: 3 },
    { value: "validations", label: "Validations", count: 2 },
    { value: "data-requirements", label: "Data Requirements", count: 2 },
    { value: "integrations", label: "Integrations", count: 2 },
    { value: "workflows", label: "Workflows", count: 2 },
    { value: "ui-requirements", label: "UI Requirements", count: 2 },
    { value: "constants", label: "Constants", count: 2 },
  ];

  const toggleSection = (sectionId: string) => {
    const newCollapsed = new Set(collapsedSections);
    if (newCollapsed.has(sectionId)) {
      newCollapsed.delete(sectionId);
    } else {
      newCollapsed.add(sectionId);
    }
    setCollapsedSections(newCollapsed);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // Store current scroll positions
    const mainScrollTop = mainScrollRef.current?.scrollTop || 0;
    const sidebarScrollTop = sidebarScrollRef.current?.scrollTop || 0;
    const documentScrollTop = documentScrollRef.current?.scrollTop || 0;

    // Update category
    setSelectedCategory(e.target.value as CategoryType);

    // Restore scroll positions after render
    requestAnimationFrame(() => {
      if (mainScrollRef.current) {
        mainScrollRef.current.scrollTop = mainScrollTop;
      }
      if (sidebarScrollRef.current) {
        sidebarScrollRef.current.scrollTop = sidebarScrollTop;
      }
      if (documentScrollRef.current) {
        documentScrollRef.current.scrollTop = documentScrollTop;
      }
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-600";
      case "medium":
        return "bg-orange-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-400";
    }
  };

  const getRiskBarColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-600 w-4/5";
      case "medium":
        return "bg-orange-500 w-3/5";
      case "low":
        return "bg-green-500 w-2/5";
      default:
        return "bg-gray-400 w-1/2";
    }
  };

  const getStatusBadgeClasses = (status: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-semibold border";
    switch (status) {
      case "high-risk":
        return `${baseClasses} bg-red-50 text-red-700 border-red-200`;
      case "medium-risk":
        return `${baseClasses} bg-orange-50 text-orange-700 border-orange-200`;
      case "low-risk":
        return `${baseClasses} bg-green-50 text-green-700 border-green-200`;
      default:
        return `${baseClasses} bg-gray-50 text-gray-700 border-gray-200`;
    }
  };

  const SectionCard = ({
    title,
    sectionId,
    children,
  }: {
    title: string;
    sectionId: string;
    children: React.ReactNode;
  }) => {
    const isCollapsed = collapsedSections.has(sectionId);

    return (
      <div className="bg-slate-50 border border-slate-200 rounded-lg mb-6 overflow-hidden">
        <div
          className="p-4 bg-white border-b border-slate-200 flex justify-between items-center cursor-pointer select-none hover:bg-slate-50 transition-colors"
          onClick={() => toggleSection(sectionId)}
        >
          <span className="font-semibold text-sm text-slate-800">{title}</span>
          <span
            className={`text-xs text-slate-500 transition-transform duration-200 ${
              isCollapsed ? "-rotate-90" : ""
            }`}
          >
            ▼
          </span>
        </div>
        {!isCollapsed && <div className="p-5">{children}</div>}
      </div>
    );
  };

  const ExtractionCard = ({ item }: { item: ExtractionItem }) => (
    <div className="bg-white border border-slate-200 rounded-lg p-4 transition-all duration-200 cursor-pointer hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <div className="font-semibold text-sm text-slate-800 leading-tight flex-1 mr-2">
          {item.title}
        </div>
        <div
          className={`w-2 h-2 rounded-full mt-1 ${getPriorityColor(
            item.priority
          )}`}
        ></div>
      </div>
      <div className="text-slate-600 text-xs leading-relaxed mb-3">
        {item.content}
      </div>
      <div className="flex justify-between items-center flex-wrap gap-2">
        <div className="text-slate-500 text-xs">{item.source}</div>
        <div className="flex flex-wrap gap-1">
          {item.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-slate-100 text-slate-600 px-2 py-1 rounded-xl text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div
      ref={mainScrollRef}
      className="h-screen bg-slate-50 text-slate-700 font-sans flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm flex-shrink-0">
        <div className="flex items-center gap-4">
          <button className="text-lg text-slate-500 hover:text-slate-700 transition-colors">
            ←
          </button>
          <div className="text-sm text-slate-500">
            / Business Requirements / Malaysia Requirements Document - AON
            Benefits System
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-md text-sm font-medium border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 transition-colors">
            Export
          </button>
          <Link href={"/malay-comp/generate-code"}>
            <button className="px-4 py-2 rounded-md text-sm font-medium border border-blue-600 text-white bg-blue-600 hover:bg-blue-700 transition-colors">
              Create Code
            </button>
          </Link>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-96 bg-white border-r border-slate-200 flex flex-col flex-shrink-0">
          <div ref={sidebarScrollRef} className="overflow-y-auto p-6">
            {/* Key Document Information */}
            <SectionCard
              title="Key Document Information"
              sectionId="document-info"
            >
              <div className="space-y-0">
                {[
                  {
                    label: "Document Name",
                    value: "Malaysia Requirements Document",
                  },
                  { label: "Source", value: "AON Consulting" },
                  { label: "Counterparty", value: "Malaysia Operations" },
                  {
                    label: "Document Value",
                    value: "Benefits System Implementation",
                  },
                  { label: "Start Date", value: "September 1, 2024" },
                  { label: "End Date", value: "August 31, 2025" },
                  { label: "Document Owner", value: "Benefits Team (Legal)" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-slate-100 last:border-b-0"
                  >
                    <span className="text-xs text-slate-500 font-medium">
                      {item.label}
                    </span>
                    <span className="text-xs text-slate-800 font-medium">
                      {item.value}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between items-center py-2">
                  <span className="text-xs text-slate-500 font-medium">
                    Status
                  </span>
                  <span className={getStatusBadgeClasses("medium-risk")}>
                    Development Analysis
                  </span>
                </div>
              </div>
            </SectionCard>

            {/* Complexity Assessment */}
            <SectionCard title="Complexity Assessment" sectionId="complexity">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500 font-medium">
                    Implementation Complexity
                  </span>
                  <span className={getStatusBadgeClasses("high-risk")}>
                    High
                  </span>
                </div>
                <div className="h-1 bg-slate-100 rounded-sm overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${getRiskBarColor(
                      "high"
                    )}`}
                  ></div>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Complex credit allocation system with multiple validation
                  rules and integration points.
                </p>
              </div>
            </SectionCard>

            {/* Development Extractions */}
            <SectionCard
              title="Development Extractions"
              sectionId="extractions"
            >
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="categorySelect"
                    className="block text-xs text-slate-500 mb-2"
                  >
                    Filter by Category:
                  </label>
                  <select
                    id="categorySelect"
                    className="w-full px-3 py-3 bg-white border border-slate-300 rounded-md text-sm font-medium text-slate-700 cursor-pointer transition-all duration-200 hover:border-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                  >
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label} ({category.count})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-4 max-h-96 overflow-y-auto">
                  {extractedData[selectedCategory]?.length > 0 ? (
                    extractedData[selectedCategory].map((item, index) => (
                      <ExtractionCard
                        key={`${selectedCategory}-${index}`}
                        item={item}
                      />
                    ))
                  ) : (
                    <div className="text-center text-slate-500 py-8 text-sm">
                      No items found for this category.
                    </div>
                  )}
                </div>
              </div>
            </SectionCard>
          </div>
        </div>

        {/* Document Panel */}
        <div className="flex-1 bg-white m-4 rounded-lg shadow-sm overflow-hidden flex flex-col min-w-0">
          {/* Document Toolbar */}
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex justify-between items-center">
            <div className="relative flex-1 max-w-xs">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 text-sm">
                🔍
              </span>
              <input
                type="text"
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-md text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="Search document..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 items-center">
              <span className="text-slate-500 text-sm">
                Page 1 of 82 - Malaysia Requirements Document
              </span>
              <button className="border border-slate-300 px-2 py-1 rounded text-xs text-slate-600 hover:bg-slate-50">
                100%
              </button>
              <button className="border border-slate-300 px-2 py-1 rounded text-xs text-slate-600 hover:bg-slate-50">
                📄
              </button>
              <button className="border border-slate-300 px-2 py-1 rounded text-xs text-slate-600 hover:bg-slate-50">
                ⬇
              </button>
            </div>
          </div>

          {/* Document Content */}
          <div
            ref={documentScrollRef}
            className="flex-1 p-8 overflow-y-auto leading-relaxed"
          >
            <h1 className="text-3xl font-bold text-slate-800 mb-2">
              MALAYSIA REQUIREMENTS DOCUMENT
            </h1>
            <div className="text-center my-8">
              <p>
                <strong>AON CONSULTING</strong>
                <br />
                Benefits System Implementation
                <br />
                Malaysia Operations
              </p>
              <p>
                <strong>POLICY PERIOD:</strong> September 1st - August 31st
              </p>
              <p>
                <strong>CURRENCY:</strong> Malaysian Ringgit (MYR)
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-slate-800 mt-8 mb-4 pb-2 border-b-2 border-slate-100">
              1. REQUIREMENTS OVERVIEW
            </h2>
            <p className="mb-4 text-slate-600">
              This section documents the overall requirements for Malaysia
              benefits system implementation including language, currency, and
              benefit categorization.
            </p>

            <div className="my-6 bg-white rounded-lg overflow-hidden shadow-sm">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="px-4 py-3 text-left font-semibold text-slate-700 text-sm border-b border-slate-100">
                      Requirement
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700 text-sm border-b border-slate-100">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Country Name", "Malaysia"],
                    ["Policy Period", "1st September – 31st August"],
                    ["Language(s)", "English"],
                    ["Currency", "Malaysian Ringgit (MYR)"],
                    ["Payroll Frequency", "Monthly"],
                  ].map(([req, desc], index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-slate-600 text-sm border-b border-slate-50">
                        {req}
                      </td>
                      <td className="px-4 py-3 text-slate-600 text-sm border-b border-slate-50">
                        {desc}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-semibold text-slate-800 mt-8 mb-4 pb-2 border-b-2 border-slate-100">
              2. CREDITS SCHEME
            </h2>
            <p className="mb-4 text-slate-600">
              <strong>2.1 Credit Allocations:</strong> The Credits Scheme allows
              employees to fund benefit premiums. Each employee except fixed
              term employees will receive their respective entitlement each
              month.
            </p>

            <h3 className="text-xl font-semibold text-slate-700 mt-6 mb-3">
              Flex Fund Credit Allocation
            </h3>
            <div className="my-6 bg-white rounded-lg overflow-hidden shadow-sm">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="px-4 py-3 text-left font-semibold text-slate-700 text-sm border-b border-slate-100">
                      Credit Type
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700 text-sm border-b border-slate-100">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700 text-sm border-b border-slate-100">
                      Conditions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    [
                      "Spending Account (Fixed)",
                      "MYR 46 per month",
                      "Prorated monthly allocation",
                    ],
                    [
                      "Medical Insurance (Employee Only)",
                      "MYR 126.68 per month",
                      "90% of Comprehensive Default plan",
                    ],
                    [
                      "Medical Insurance (Per Dependent)",
                      "MYR 132.75 per month",
                      "90% of Comprehensive Default plan",
                    ],
                    [
                      "Dental Insurance (Employee Only)",
                      "MYR 10.65 per month",
                      "90% of Dental plan (pre-July 2018 hires only)",
                    ],
                    [
                      "Dental Insurance (Per Dependent)",
                      "MYR 12.68 per month",
                      "90% of Dental plan (pre-July 2018 hires only)",
                    ],
                  ].map(([type, amount, conditions], index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-slate-600 text-sm border-b border-slate-50">
                        {type}
                      </td>
                      <td className="px-4 py-3 text-slate-600 text-sm border-b border-slate-50">
                        {amount}
                      </td>
                      <td className="px-4 py-3 text-slate-600 text-sm border-b border-slate-50">
                        {conditions}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-semibold text-slate-700 mt-6 mb-3">
              Credits Hierarchy
            </h3>
            <p className="mb-2 text-slate-600">
              Benefits are funded in the following priority order:
            </p>
            <ol className="ml-6 mb-6 text-slate-600 space-y-2">
              <li>
                <strong>Group Medical Insurance</strong> (Highest Priority)
              </li>
              <li>
                <strong>Dental Insurance</strong>
              </li>
              <li>
                <strong>Voluntary Top Up Group Term Life Insurance</strong>
              </li>
              <li>
                <strong>
                  Voluntary Top Up Group Accidental Death & Disability Insurance
                </strong>
              </li>
              <li>
                <strong>Additional Vacation Days Purchase</strong> (Lowest
                Priority)
              </li>
            </ol>

            <h2 className="text-2xl font-semibold text-slate-800 mt-8 mb-4 pb-2 border-b-2 border-slate-100">
              3. GROUP TERM LIFE INSURANCE
            </h2>
            <p className="mb-4 text-slate-600">
              <strong>3.1 Coverage Formula:</strong>
            </p>
            <ul className="ml-6 mb-4 text-slate-600 space-y-1">
              <li>
                <strong>Regular Employees:</strong> 39 × Monthly Base Salary
              </li>
              <li>
                <strong>Fixed Term Hires:</strong> 36 × Monthly Base Salary
              </li>
              <li>
                <strong>Premium Rate:</strong> MYR 0.75 per thousand
              </li>
            </ul>

            <p className="mb-2 text-slate-600">
              <strong>3.2 Eligibility:</strong>
            </p>
            <ul className="ml-6 mb-6 text-slate-600 space-y-1">
              <li>All Regular Employees (Full time and Part timers)</li>
              <li>Fixed Time Hires</li>
              <li>International assignees (MYS to any other country)</li>
              <li>
                Age Range: 18 to 64 years 364 days (entry), termination at 69
                years 364 days
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BRDDashboard;

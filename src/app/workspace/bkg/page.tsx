"use client";
import Link from "next/link";
import React, { useState } from "react";

// Type definitions
interface UploadedFile {
  name: string;
  size: number;
  type: string;
}

interface SampleDataItem {
  text: string;
  files: string[];
}

type SampleData = {
  [key: string]: SampleDataItem;
};

type Answers = {
  [key: string]: string;
};

type UploadedFiles = {
  [key: string]: UploadedFile[];
};

interface Question {
  id: string;
  question: string;
  placeholder?: string;
}

const CompanyFunctionsForm = () => {
  const [answers, setAnswers] = useState<Answers>({});
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFiles>({});
  const [isPrefilling, setIsPrefilling] = useState(false);

  const sampleData: SampleData = {
    products: {
      text: "We operate three main brands: AND (premium westernwear), Anita Dongre (luxury ethnic), and Global Desi (affordable fusion). Categories include: Womenswear → Kurtas, Dresses, Tops, Sarees, Lehengas; Menswear → Kurtas, Shirts; Accessories → Bags, Jewelry. Hero SKUs: AND Midi Dresses (₹3,999-₹6,999), Anita Dongre Bridal Lehengas (₹2L-₹15L), Global Desi Printed Kurtas (₹1,499-₹2,499). Key attributes: Size (XS-XXL), MRP bands, Color/Print, Fabric type, Occasion tags. We use: Core (year-round), Seasonal (SS/AW), Limited Edition, New Arrivals, End-of-Season.",
      files: ["Brand_Catalog_2024.pdf", "SKU_Master_List.xlsx"],
    },
    purchase_channels: {
      text: "Physical: 300+ EBOs (Exclusive Brand Outlets) in Tier 1/2 cities contributing 45% revenue, 150+ Shop-in-Shop in premium malls (Shoppers Stop, Lifestyle) at 25%, 50+ High-street standalone stores at 15%. Digital: Own website/app (anditadon.com) at 10% with pan-India delivery, Myntra/Ajio/Nykaa Fashion at 5% combined. Dark stores: 3 locations (Mumbai, Delhi, Bangalore) for quick commerce fulfillment.",
      files: ["Store_Network_Map.pdf", "Channel_Performance_Report.xlsx"],
    },
    geography: {
      text: "North Zone (Delhi NCR, Punjab, Chandigarh) - 30% of revenue, strong ethnic demand. West Zone (Mumbai, Pune, Gujarat) - 35%, highest premium segment. South Zone (Bangalore, Chennai, Hyderabad) - 25%, westernwear dominant. East Zone (Kolkata) - 10%, growing market. Tier definitions: Tier 1 (8 metro cities), Tier 2 (40 cities with malls), Tier 3 (emerging markets). We cluster stores by catchment: Premium (High Street/Luxury Malls), Mid-market (Regional Malls), Value (High-footfall locations).",
      files: ["Geographic_Strategy.pdf", "City_Tier_Classification.xlsx"],
    },
    pricing: {
      text: "MRP: Fixed nationally per product as per legal mandate. List Price: MRP for retail. Net Price: After markdowns/promotions (typically 70-85% of MRP during sales). Promo Price: Event-based discounts (EOSS 40-70%, Festive 20-30%, New Launch 10-15%). Prices don't vary by geo but channel margins differ: EBO (100% margin to company), SIS (60-65% post commission), Online (70-80% post marketplace fee, logistics). GST 12% on apparel, 3% on jewelry.",
      files: ["Pricing_Matrix_2024.xlsx", "Markdown_Calendar.pdf"],
    },
    demand_drivers: {
      text: "Festivals: Diwali (+150% demand Oct-Nov, ethnic heavy), Wedding Season (Nov-Feb, +200% for bridal). Seasonality: Summer (Mar-May) peak for cotton/light fabrics, Winter (Nov-Jan) for festive/occasion wear. Weather: Unexpected heat waves (-20% on layered clothing), early monsoons (+30% on quick-dry fabrics). Competitor: Zara sale start → our footfall -15%, followed by our own EOSS launch (+180%). Media: Influencer campaigns → +40% on featured styles within 48 hours, Celebrity wearing our outfit → +300% spike in that category.",
      files: [
        "Demand_Analysis_2023.pdf",
        "Festival_Calendar.xlsx",
        "Weather_Impact_Study.pdf",
      ],
    },
    inventory_flow: {
      text: "Manufacturing: Own factories in Jaipur + 50 vendor units across India/Bangladesh. DCs: 3 regional DCs (Mumbai, Delhi, Bangalore) operated by 3PL. Flow: Factory → QC → DC (1 week) → Store allocation (2-3 days transit). E-commerce: Separate inventory pool at main DC, ship-from-store enabled for 50 flagship locations. Quick commerce: Dark stores replenished daily from nearest DC. Exceptions: Bridal made-to-order ships direct factory → customer, Jewelry kept at limited stores only (security).",
      files: [
        "Supply_Chain_Map.pdf",
        "Inventory_Flow_Diagram.pptx",
        "Warehouse_Locations.xlsx",
      ],
    },
    time_bands: {
      text: "Vendor → DC: 15-21 days (domestic), 45-60 days (imports from Bangladesh/China). DC → Store: 2-3 days (metro), 4-7 days (Tier 2/3). Replenishment cycles: Flagship stores (twice weekly), Regular stores (weekly), Small format (fortnightly). Order cycles: Seasonal collections ordered 4-5 months advance, Core styles on monthly rolling basis, Fast-fashion drops weekly. Lead time compression: Express shipments available at 2x cost for urgent restocks.",
      files: ["Lead_Time_Analysis.xlsx"],
    },
    constraints: {
      text: "MOQ: Fabric vendors 500m per color, Trims 1000 units. Case packs: 6-12 pieces per carton depending on style, can't break packs for small stores. Shelf-life: None for most, but occasional wear items marked down after 6 months if unsold. Cold-chain: Not applicable except for leather goods in summer (ambient storage needed). Truck constraints: Full truck load (FTL) for stores >100km from DC, else consolidated shipments. Legal: Can't advertise >50% discount without prior intimation to authorities, mandatory E-way bills for inter-state moves >50k value. Display: Premium stores need minimum 1000 sq ft, planogram compliance mandatory for SIS locations.",
      files: ["Operational_Constraints.pdf", "MOQ_Guidelines.xlsx"],
    },
    assortment: {
      text: "Format rules: Flagships carry full range (200+ SKUs), Regular EBOs (120-150 SKUs), SIS (80-100 best-sellers only). Size: XL/XXL only in metros & Tier 1, limited in Tier 2. Fresh drops: New designs first in flagships for 2 weeks, then rolled to network. Occasion wear: 60% of assortment in Tier 1, 30% in Tier 2, minimal in Tier 3. Planogram: Premium stores follow brand book strictly (VM audited monthly), SIS stores get basic guidelines. OSA targets: 95% on core styles, 90% on seasonal, 85% on fashion-forward items (acceptable risk).",
      files: ["Assortment_Matrix.xlsx", "Planogram_Guidelines.pdf"],
    },
    digital_physical: {
      text: "Inventory: Separate pools but real-time visibility, can shift between channels. Pricing: Online gets exclusive web discounts, but base MRP same. Assortment: Online shows full catalog (500+ SKUs), stores curated by cluster. Fulfillment: BOPIS (Buy Online Pickup In Store) available in 80 locations, contributes 8% of online orders. Ship-from-store: Enabled in 50 stores, reduces delivery time by 1-2 days in that catchment. Returns: Online returns accepted in all stores, 15-day window. Cross-effects: Store visits up 20% after online campaigns, online searches spike 40% around store opening in new city.",
      files: ["Omnichannel_Strategy.pdf", "Digital_Physical_Performance.xlsx"],
    },
    kpis: {
      text: "Sell-through %: (Units sold / Units received) × 100, target >75% at full price. Stock cover days: (Current stock / Avg daily sales), target 45-60 days. OSA (On-Shelf Availability): % of time SKU available when customer walks in, target >90% core styles. Contribution margin: (Revenue - COGS - Direct costs) / Revenue, target >40%. NRM (Net Realized Margin): Actual margin after all discounts/markdowns, target >35%. GMROI: (Gross Margin / Avg Inventory Cost), target >2.5x. UPT (Units per Transaction): Avg items per bill, target 2.2. ATV (Average Transaction Value): Target ₹4,500. Markdown %: (Discount amount / Original value), keep <30% of season buys. We call it 'Contribution' not 'Gross Margin', 'Stock days' not 'Inventory turns', local teams say 'Aging' for slow-moving stock.",
      files: ["KPI_Dashboard_Template.xlsx", "Metrics_Definitions.pdf"],
    },
    cause_effect: {
      text: "Price ↓ 30% → Demand ↑ 120% (seen in last EOSS). Lead-time ↑ from 3 to 7 days → OSA ↓ from 92% to 78% (supply chain disruption Q2'23). Heatwave (>42°C) → Ice-silk fabric demand ↑ 250%, layered ethnic ↓ 40%. Influencer post → That specific style sells out in 36 hours, search traffic ↑ 8x. Competitor opens nearby → Our store footfall ↓ 15% first month, stabilizes to -8% after 3 months. Festival advance by 1 week → Demand curve shifts, stock-outs if not planned. Stock display (mannequin change) → That outfit's conversion ↑ 35%.",
      files: ["Cause_Effect_Analysis.pdf", "Business_Insights_Report.pptx"],
    },
  };

  const prefillSampleData = () => {
    setIsPrefilling(true);

    // Simulate gradual filling for visual effect
    const keys = Object.keys(sampleData);
    keys.forEach((key, index) => {
      setTimeout(() => {
        setAnswers((prev) => ({
          ...prev,
          [key]: sampleData[key].text,
        }));

        if (sampleData[key].files) {
          setUploadedFiles((prev) => ({
            ...prev,
            [key]: sampleData[key].files.map((filename) => ({
              name: filename,
              size: Math.floor(Math.random() * 1000000) + 100000,
              type: filename.endsWith(".pdf")
                ? "application/pdf"
                : filename.endsWith(".xlsx")
                ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                : filename.endsWith(".pptx")
                ? "application/vnd.openxmlformats-officedocument.presentationml.presentation"
                : "application/octet-stream",
            })),
          }));
        }

        if (index === keys.length - 1) {
          setTimeout(() => setIsPrefilling(false), 300);
        }
      }, index * 150);
    });
  };

  const handleTextChange = (id: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleFileUpload = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles: UploadedFile[] = Array.from(files).map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
      }));

      setUploadedFiles((prev) => ({
        ...prev,
        [id]: [...(prev[id] || []), ...newFiles],
      }));
    }
  };

  const removeFile = (id: string, idx: number) => {
    setUploadedFiles((prev) => ({
      ...prev,
      [id]: prev[id].filter((_, i) => i !== idx),
    }));
  };

  const hasContent = Object.keys(answers).length > 0;

  const questions: Question[] = [
    {
      id: "products",
      question: "What is sold?",
      placeholder:
        "Include brand portfolio, category hierarchy, representative SKUs, attribute schema (size/pack, color/flavor, price/MRP, shelf-life if applicable), and tagging taxonomy (core, seasonal, limited, new, retiring).",
    },
    {
      id: "purchase_channels",
      question: "Where are products sold?",
      placeholder:
        "Include channel structure (flagship, high-street, mall, outlet, kiosk, online store, app, marketplace, dark store), channel definitions and business relevance (share of sales, margin profile, service level).",
    },
    {
      id: "geography",
      question: "Where does the business operate?",
      placeholder:
        "Include market definitions (countries, regions, cities, or tier clusters), internal grouping logic (North/South, Metro/Tier-1/2), and any assigned ownership or planning regions.",
    },
    {
      id: "pricing",
      question: "What price constructs exist?",
      placeholder:
        "Include price levels (MRP, list, net, promo), regional/channel variance rules, and examples of price derivation (e.g., MRP → promo → net). Note any dependencies on taxes or location.",
    },
    {
      id: "demand_drivers",
      question: "What primary factors influence sales movement?",
      placeholder:
        "Include festivals/events, seasonal peaks, weather, promotions, competitor actions, visibility/placement, inventory availability. Indicate typical uplift patterns or seasonality by month/quarter.",
    },
    {
      id: "inventory_flow",
      question: "Where is inventory stored and how does it move?",
      placeholder:
        "Include physical nodes (factories/plants, DCs, 3PLs, stores, dark stores), standard flow paths (Plant → DC → Store, DC → Marketplace FC), and exceptions (direct ship, cross-dock, dropship).",
    },
    {
      id: "time_bands",
      question: "What are the typical cycle times?",
      placeholder:
        "Include transit and processing times (vendor → DC, DC → store), and replenishment cadence (daily, weekly, fortnightly). Ranges or median values are sufficient.",
    },
    {
      id: "constraints",
      question: "What hard limits govern operations?",
      placeholder:
        "Include minimum order quantities, case packs, shelf-life or cold-chain requirements, display or space constraints, truck/load limitations, and statutory or tax boundaries that materially impact flow.",
    },
    {
      id: "assortment",
      question: "How does assortment differ across formats or geographies?",
      placeholder:
        'Include explicit distribution logic (e.g., "XL packs only in large stores," "premium line = flagship + website," "fresh SKUs = Tier-1 only") and any rules encoded in allocation or listing systems.',
    },
    {
      id: "digital_physical",
      question: "How are online and offline inventories connected?",
      placeholder:
        "Include inventory segregation or sharing rules, price harmonization or deltas, fulfilment methods (ship-from-store, BOPIS, dark-store dispatch), and systemic dependencies between channels.",
    },
    {
      id: "kpis",
      question: "Which KPIs and internal terms are used operationally?",
      placeholder:
        "Include top metrics (sell-through %, stock cover days, OSA, contribution margin, NRM) with business definitions and any internal codes or abbreviations used in reporting.",
    },
    {
      id: "cause_effect",
      question: "What recurring cause–effect patterns are observed?",
      placeholder:
        'Include observed relationships such as "price ↓ → volume ↑ ~10%," "rainfall → soup sales ↑," "longer lead times → lower OSA," "festival week → premium mix ↑."',
    },
    {
      id: "additional-details",
      question: "Add any other information that you think is required",
    },
  ];

  return (
    <div className="h-screen overflow-auto bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-sm p-8 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-gray-400 mb-2">2/6</p>
              <h1 className="text-4xl font-serif text-gray-900 mb-3">
                Help us understand the business
              </h1>
              <p className="text-gray-500 text-lg">
                Share how the company plans, sells, and manages its operations.
                For each question, upload documents or describe the process in
                your own words - the richer the detail, the better the insights.
              </p>
            </div>
            <button
              onClick={prefillSampleData}
              disabled={isPrefilling}
              className={`px-6 py-3 rounded-xl font-medium text-sm transition-all whitespace-nowrap ${
                isPrefilling
                  ? "bg-gray-300 text-gray-500 cursor-wait"
                  : "bg-gradient-to-r from-teal-600 to-teal-700 text-white hover:from-teal-700 hover:to-teal-800 shadow-md hover:shadow-lg"
              }`}
            >
              {isPrefilling ? "Filling..." : "Try Sample Data"}
            </button>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {questions.map((q, index) => {
            const isAnswered = answers[q.id]?.trim().length > 0;
            const hasFiles = uploadedFiles[q.id]?.length > 0;

            return (
              <div
                key={q.id}
                className={`bg-white rounded-3xl shadow-sm p-8 transition-all ${
                  isAnswered || hasFiles
                    ? "ring-2 ring-teal-500 ring-opacity-30"
                    : ""
                }`}
              >
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <span
                      className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
                        isAnswered || hasFiles
                          ? "bg-teal-100 text-teal-700"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {q.question}
                    </h3>

                    {q.placeholder && (
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 mb-5 border border-gray-100">
                        <p className="text-sm text-gray-600 leading-relaxed">
                          <span className="font-semibold text-gray-700">
                            Include:{" "}
                          </span>
                          {q.placeholder}
                        </p>
                      </div>
                    )}

                    <textarea
                      value={answers[q.id] || ""}
                      onChange={(e) => handleTextChange(q.id, e.target.value)}
                      className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none mb-4 text-gray-700 placeholder-gray-400"
                      rows={5}
                      placeholder="Type your answer here..."
                    />

                    {uploadedFiles[q.id]?.length > 0 && (
                      <div className="space-y-2 mb-4">
                        {uploadedFiles[q.id].map((file, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-3 text-sm bg-teal-50 border border-teal-100 px-4 py-3 rounded-lg group hover:bg-teal-100 transition-colors"
                          >
                            <svg
                              className="w-4 h-4 text-teal-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                            <span className="flex-1 text-gray-700 font-medium">
                              {file.name}
                            </span>
                            <button
                              onClick={() => removeFile(q.id, idx)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                              type="button"
                              aria-label={`Remove ${file.name}`}
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <label className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 cursor-pointer px-5 py-3 rounded-xl border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                        />
                      </svg>
                      <span>Add document(s)</span>
                      <input
                        type="file"
                        multiple
                        onChange={(e) => handleFileUpload(q.id, e)}
                        className="hidden"
                        aria-label={`Upload documents for ${q.question}`}
                      />
                    </label>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="bg-white rounded-3xl shadow-sm p-8 mt-6">
          <Link href={"/workspace/edit-bkg"}>
            <button
              disabled={isPrefilling}
              type="button"
              className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
                isPrefilling
                  ? "bg-gray-300 text-gray-500 cursor-wait"
                  : hasContent
                  ? "bg-teal-700 hover:bg-teal-800 text-white hover:shadow-lg cursor-pointer"
                  : "bg-gray-200 text-gray-400 cursor-pointer hover:bg-gray-300"
              }`}
            >
              {isPrefilling ? "Filling with sample data..." : "Continue"}
            </button>
          </Link>
          <p className="text-center text-sm text-gray-400 mt-4">
            {hasContent
              ? "You can skip questions and come back to them later"
              : "Click continue to see sample data or start filling the form"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompanyFunctionsForm;

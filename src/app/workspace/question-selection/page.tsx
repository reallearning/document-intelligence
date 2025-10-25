"use client";
import Link from "next/link";
import React, { useState } from "react";

// Type definitions
interface Question {
  id: string;
  category: string;
  question: string;
}

interface FormData {
  category: string;
  question: string;
}

const QuestionsMarketplace = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedQuestions, setSelectedQuestions] = useState<Set<string>>(
    new Set()
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [formData, setFormData] = useState<FormData>({
    category: "",
    question: "",
  });
  const [questions, setQuestions] = useState<Question[]>([
    // Inventory & Replenishment
    {
      id: "inv1",
      category: "Inventory & Replenishment",
      question: "Which SKUs will stock out in the next 7/14 days by store?",
    },

    // Pricing & Discounting
    {
      id: "price1",
      category: "Pricing & Discounting",
      question: "Where do channel prices conflict with policy?",
    },

    // Sales & Performance
    {
      id: "sales1",
      category: "Sales & Performance",
      question: "Why did sales deviate from plan yesterday?",
    },
    {
      id: "sales2",
      category: "Sales & Performance",
      question: "Which styles drive 80% of revenue per channel?",
    },
    {
      id: "sales3",
      category: "Sales & Performance",
      question: "Which SKUs are margin accretive vs dilutive?",
    },
    {
      id: "sales4",
      category: "Sales & Performance",
      question: "Which styles are cannibalizing each other?",
    },
    {
      id: "sales5",
      category: "Sales & Performance",
      question: "What's the early success probability of new styles?",
    },
    {
      id: "sales6",
      category: "Sales & Performance",
      question: 'Where are geographic "pockets of growth" to lean into?',
    },

    // E-commerce & Funnel
    {
      id: "ecom1",
      category: "E-commerce & Funnel",
      question: "Which style attributes drive PDP→Cart conversion?",
    },
    {
      id: "ecom2",
      category: "E-commerce & Funnel",
      question: "Which search terms have poor product recall/precision?",
    },
    {
      id: "ecom3",
      category: "E-commerce & Funnel",
      question: "What is the lost demand from OOS online?",
    },

    // Promotions & Marketing
    {
      id: "promo1",
      category: "Promotions & Marketing",
      question: "Which cohorts respond best to a 20% coupon?",
    },
    {
      id: "promo2",
      category: "Promotions & Marketing",
      question: "True ROAS of each campaign after seasonality & promo overlap?",
    },
    {
      id: "promo3",
      category: "Promotions & Marketing",
      question: "Which promos are colliding or over-stacking?",
    },
    {
      id: "promo4",
      category: "Promotions & Marketing",
      question:
        "What content themes (workwear, festive, bridal) lift response?",
    },
    {
      id: "promo5",
      category: "Promotions & Marketing",
      question:
        "What is ad fill rate, CTR, CVR, and revenue per mille by placement and device?",
    },
    {
      id: "promo6",
      category: "Promotions & Marketing",
      question:
        "How incremental are retail-media impressions after controlling for promos/events?",
    },
    {
      id: "promo7",
      category: "Promotions & Marketing",
      question:
        "Which audiences have the highest reach overlap and diminishing returns?",
    },

    // Customer & Loyalty
    {
      id: "cust1",
      category: "Customer & Loyalty",
      question: "What is CLV by segment and channel?",
    },
    {
      id: "cust2",
      category: "Customer & Loyalty",
      question: "Who is at risk of churn (segment/cohort level)?",
    },
    {
      id: "cust3",
      category: "Customer & Loyalty",
      question: "Which categories cross-sell after purchase X?",
    },
    {
      id: "cust4",
      category: "Customer & Loyalty",
      question: "Occasion-based segments—how big and where?",
    },
    {
      id: "cust5",
      category: "Customer & Loyalty",
      question: "Discount sensitivity by segment?",
    },
    {
      id: "cust6",
      category: "Customer & Loyalty",
      question: "What's the loyalty benefit of early access drops?",
    },
    {
      id: "cust7",
      category: "Customer & Loyalty",
      question: "What drives NPS/CSAT variance by region and channel?",
    },
    {
      id: "cust8",
      category: "Customer & Loyalty",
      question:
        "Which contact reasons dominate tickets and how do they trend post-policy changes?",
    },
    {
      id: "cust9",
      category: "Customer & Loyalty",
      question:
        "How does review sentiment differ between private label vs national brands?",
    },

    // Returns & Quality
    {
      id: "ret1",
      category: "Returns & Quality",
      question: "Which SKUs/channels will have high returns next month?",
    },
    {
      id: "ret2",
      category: "Returns & Quality",
      question: "What are top root causes of returns for style X?",
    },
    {
      id: "ret3",
      category: "Returns & Quality",
      question: "Are certain vendors driving higher defect-related returns?",
    },
    {
      id: "ret4",
      category: "Returns & Quality",
      question: "Where is returns abuse likely?",
    },

    // Vendor, Marketplace & Supply
    {
      id: "vend1",
      category: "Vendor, Marketplace & Supply",
      question: "Lead-time drift—who's slipping?",
    },
    {
      id: "vend2",
      category: "Vendor, Marketplace & Supply",
      question: "Sourcing risk heatmap (compliance, single-source)?",
    },
    {
      id: "vend3",
      category: "Vendor, Marketplace & Supply",
      question:
        "Where do we lose the Buy Box and why (price index, delivery speed, ratings)?",
    },
    {
      id: "vend4",
      category: "Vendor, Marketplace & Supply",
      question: "Which 3P sellers contribute most to OOS risk or returns?",
    },
    {
      id: "vend5",
      category: "Vendor, Marketplace & Supply",
      question:
        "Are co-op/trade funds under- or over-utilized by brand/category?",
    },

    // Omnichannel & Last-Mile
    {
      id: "omni1",
      category: "Omnichannel & Last-Mile",
      question:
        "What is BOPIS promise accuracy by store and pickup slot, and what drives misses?",
    },
    {
      id: "omni2",
      category: "Omnichannel & Last-Mile",
      question: "How much GM do we lose to split shipments and re-shipments?",
    },
    {
      id: "omni3",
      category: "Omnichannel & Last-Mile",
      question:
        "Which stores are used as ship-from-store but underperform on pick speed or accuracy?",
    },

    // Grocery / Perishables
    {
      id: "groc1",
      category: "Grocery / Perishables",
      question:
        "Which SKUs have the highest predicted shrink by daypart and store temperature profile?",
    },
    {
      id: "groc2",
      category: "Grocery / Perishables",
      question:
        "How close are we to shelf-life breaches; what's the age distribution at shelf?",
    },
    {
      id: "groc3",
      category: "Grocery / Perishables",
      question:
        "What patterns precede cold-chain temperature violations in transit and backroom?",
    },

    // Consumer Electronics / High-Value
    {
      id: "elec1",
      category: "Consumer Electronics / High-Value",
      question:
        "What is the attach rate for warranties/accessories and which factors predict attachment?",
    },
    {
      id: "elec2",
      category: "Consumer Electronics / High-Value",
      question:
        "Where do serial number mismatches or gray-market risk cluster?",
    },
    {
      id: "elec3",
      category: "Consumer Electronics / High-Value",
      question:
        "How often do price-match requests occur and what's the close rate?",
    },

    // Private Label & Category Management
    {
      id: "pvt1",
      category: "Private Label & Category Management",
      question:
        "Where are we under-assorted vs category role (Destination/Routine/Convenience/KVI)?",
    },
    {
      id: "pvt2",
      category: "Private Label & Category Management",
      question:
        'What is our price index vs competitors for KVIs and "halo" items?',
    },
    {
      id: "pvt3",
      category: "Private Label & Category Management",
      question:
        "Which planogram changes historically improved sales per sqm in this category?",
    },

    // Payments & Tender Mix
    {
      id: "pay1",
      category: "Payments & Tender Mix",
      question:
        "What is auth-decline rate by issuer, card network, and channel?",
    },
    {
      id: "pay2",
      category: "Payments & Tender Mix",
      question:
        "How does tender mix (BNPL, wallets, cards, cash) affect margin by basket size?",
    },
    {
      id: "pay3",
      category: "Payments & Tender Mix",
      question:
        "Where are chargebacks concentrated and what dispute reasons dominate?",
    },

    // Loss Prevention & Risk
    {
      id: "loss1",
      category: "Loss Prevention & Risk",
      question:
        "Which stores show abnormal self-checkout rescans/voids vs baseline?",
    },
    {
      id: "loss2",
      category: "Loss Prevention & Risk",
      question:
        "What's the shrink heatmap by hour, zone, and associate roster?",
    },
    {
      id: "loss3",
      category: "Loss Prevention & Risk",
      question:
        "Are coupon/return abuse patterns spiking in particular categories?",
    },

    // Facilities, Energy & Sustainability
    {
      id: "fac1",
      category: "Facilities, Energy & Sustainability",
      question:
        "Which sites deviate from expected energy use after weather/footfall normalization?",
    },
    {
      id: "fac2",
      category: "Facilities, Energy & Sustainability",
      question: "What refrigeration outages correlate with waste events?",
    },
    {
      id: "fac3",
      category: "Facilities, Energy & Sustainability",
      question:
        "What is carbon per order (picking, packaging, transport) by fulfillment path?",
    },

    // Real Estate & Lease
    {
      id: "real1",
      category: "Real Estate & Lease",
      question: "Where is occupancy cost (% of sales) off target and trending?",
    },
    {
      id: "real2",
      category: "Real Estate & Lease",
      question: 'Which leases form an upcoming expiry "cliff" by region?',
    },
    {
      id: "real3",
      category: "Real Estate & Lease",
      question:
        "Which trade areas show unmet demand after accounting for cannibalization?",
    },

    // Workforce & Labor
    {
      id: "work1",
      category: "Workforce & Labor",
      question:
        "What is productivity (units/hour, sales/hour) by role and shift?",
    },
    {
      id: "work2",
      category: "Workforce & Labor",
      question:
        "Where do we see chronic schedule adherence gaps or overtime spikes?",
    },
    {
      id: "work3",
      category: "Workforce & Labor",
      question:
        "Which training modules correlate with faster ramp to productivity?",
    },

    // IT / Platform & Observability
    {
      id: "it1",
      category: "IT / Platform & Observability",
      question: "What's checkout latency and error rate by region and device?",
    },
    {
      id: "it2",
      category: "IT / Platform & Observability",
      question:
        "Which upstream jobs (ERP/EDI) most often delay allocation/price updates?",
    },
    {
      id: "it3",
      category: "IT / Platform & Observability",
      question:
        "How do page speed and image weight affect PDP conversion by bandwidth tier?",
    },

    // Data Governance & Compliance
    {
      id: "data1",
      category: "Data Governance & Compliance",
      question:
        "Where are price/tax inconsistencies between POS and e-com catalogs?",
    },
    {
      id: "data2",
      category: "Data Governance & Compliance",
      question:
        "Which data quality rules (IDs, effectivity dates) fail most frequently?",
    },
    {
      id: "data3",
      category: "Data Governance & Compliance",
      question:
        "Are there anomalous accesses of PII or role-based permission drifts?",
    },

    // New Store & Expansion
    {
      id: "new1",
      category: "New Store & Expansion",
      question: "Expected P&L for a candidate site?",
    },
    {
      id: "new2",
      category: "New Store & Expansion",
      question: "Cannibalization risk to nearby stores?",
    },
    {
      id: "new3",
      category: "New Store & Expansion",
      question: "Optimal cluster of locations to achieve coverage?",
    },
  ]);

  const categories = [
    "all",
    ...Array.from(new Set(questions.map((q) => q.category))),
  ];

  const filteredQuestions =
    selectedCategory === "all"
      ? questions
      : questions.filter((q) => q.category === selectedCategory);

  const toggleQuestion = (id: string) => {
    setSelectedQuestions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const openAddModal = () => {
    setFormData({ category: "", question: "" });
    setEditingQuestion(null);
    setIsModalOpen(true);
  };

  const openEditModal = (question: Question) => {
    setFormData({ category: question.category, question: question.question });
    setEditingQuestion(question);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingQuestion(null);
    setFormData({ category: "", question: "" });
  };

  const handleSave = () => {
    if (!formData.category.trim() || !formData.question.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    if (editingQuestion) {
      // Edit existing question
      setQuestions((prev) =>
        prev.map((q) =>
          q.id === editingQuestion.id
            ? { ...q, category: formData.category, question: formData.question }
            : q
        )
      );
    } else {
      // Add new question
      const newQuestion: Question = {
        id: `custom-${Date.now()}`,
        category: formData.category,
        question: formData.question,
      };
      setQuestions((prev) => [...prev, newQuestion]);
    }

    closeModal();
  };

  return (
    <div className="h-screen overflow-auto bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-sm p-8 mb-6">
          <p className="text-sm text-gray-400 mb-2">3/6</p>
          <h1 className="text-4xl font-serif text-gray-900 mb-3">
            What are the questions the company cares about the most?
          </h1>
          <p className="text-gray-500 text-lg">
            Add the ones the team look at often - these become the baseline
            questions for daily decisions.
          </p>
        </div>

        {/* Category Filter */}
        <div className="bg-white rounded-3xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Filter by Category
            </h2>
            <button
              onClick={openAddModal}
              className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white text-sm font-medium rounded-lg transition-colors"
              type="button"
            >
              Add Custom Question
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  selectedCategory === cat
                    ? "bg-teal-700 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                type="button"
              >
                {cat === "all" ? "All Categories" : cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredQuestions.map((q) => (
            <div
              key={q.id}
              className="bg-white rounded-2xl shadow-sm p-6 transition-all hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <input
                  type="checkbox"
                  checked={selectedQuestions.has(q.id)}
                  onChange={() => toggleQuestion(q.id)}
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-teal-700 focus:ring-teal-500"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full mb-2">
                        {q.category}
                      </span>
                      <p className="text-gray-900 font-medium text-lg">
                        {q.question}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => openEditModal(q)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        type="button"
                      >
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                      </button>
                      {selectedQuestions.has(q.id) && (
                        <div className="w-6 h-6 bg-teal-700 rounded flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-8 mt-6">
          <Link href={"/workspace/question-graph"}>
            <button
              className="w-full bg-teal-700 hover:bg-teal-800 text-white py-4 rounded-xl font-semibold text-lg transition-all hover:shadow-lg"
              type="button"
            >
              Continue to Next Step
            </button>
          </Link>
          <p className="text-center text-sm text-gray-400 mt-4">
            {selectedQuestions.size} question
            {selectedQuestions.size !== 1 ? "s" : ""} selected for your
            intelligence baseline
          </p>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900">
                {editingQuestion
                  ? "Edit Business Question"
                  : "Add Custom Business Question"}
              </h2>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Category <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  placeholder="e.g., Sales & Performance"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Question <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.question}
                  onChange={(e) =>
                    setFormData({ ...formData, question: e.target.value })
                  }
                  placeholder="What business question requires intelligence and insights?"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={closeModal}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                type="button"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors font-medium"
                type="button"
              >
                {editingQuestion ? "Save Changes" : "Add Question"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionsMarketplace;

"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { SiGooglecloud, SiDatabricks, SiOracle } from "react-icons/si";

// Type definitions
interface Stage {
  label: string;
}

interface Question {
  question: string;
  answer: string;
}

interface Source {
  id: string;
  name: string;
  stages: Stage[];
  questions: Question[];
}

interface ConversationMessage {
  type: "question" | "answer";
  text: string;
  source?: string;
}

const DataProcessingPage = () => {
  const [currentSourceIndex, setCurrentSourceIndex] = useState<number>(0);
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const [allComplete, setAllComplete] = useState<boolean>(false);
  const [showConversation, setShowConversation] = useState<boolean>(false);
  const [conversationMessages, setConversationMessages] = useState<
    ConversationMessage[]
  >([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState<number>(0);
  const conversationEndRef = useRef<HTMLDivElement>(null);

  const sources: Source[] = [
    {
      id: "sap-hana",
      name: "Databricks",
      stages: [
        { label: "Connecting to the data" },
        { label: "12 tables found, exploring the data" },
        { label: "Attaching business context to the data" },
        { label: "Listing down all of the clarifications needed" },
      ],
      questions: [
        {
          question:
            "Are plants and storage locations representing retail stores, distribution centers, or both?",
          answer:
            "In SAP, each retail store is configured as a plant with one storage location. Distribution Centers (DCs) are also defined as plants, but with multiple storage locations (bulk, pick-face, staging). Use the plant type and storage location description to distinguish.",
        },
        {
          question:
            "Should I map product codes directly (MATNR to SKU_ID) or through Style + Color + Size?",
          answer:
            "We maintain one-to-one mapping between SAP material number (MATNR) and SQL SKU_ID. Style, color, and size are separate master tables for analytics convenience, but MATNR is the global key across systems.",
        },
        {
          question: "What is the replication frequency between SAP and SQL?",
          answer:
            "SAP to SQL ETL runs nightly at 2 AM IST, capturing all transactions up to 11:59 PM. For planning and dashboards, always use the nightly batch.",
        },
      ],
    },
    {
      id: "sap-ewm",
      name: "SAP EWM",
      stages: [
        { label: "Connecting to the data" },
        { label: "8 tables found, exploring the data" },
        { label: "Attaching business context to the data" },
        { label: "Listing down all of the clarifications needed" },
      ],
      questions: [
        {
          question:
            "Do all EWM warehouses belong to fashion, or do they include jewelry and other categories?",
          answer:
            "Fashion brands (AND, Global Desi, Anita Dongre) use warehouses MUM-DC01 and BLR-DC02. Jewelry (PinkCity, Grassroot) uses separate non-integrated plants. Filter on plant_type = Fashion or use the DC master lookup.",
        },
        {
          question: "Are inventory values end-of-day or real-time?",
          answer:
            "The SQL inventory snapshot table holds end-of-day (EOD) values extracted nightly from SAP CAR and EWM. During the day, SAP/EWM has near real-time stock, but for analysis, EOD is the consistent baseline.",
        },
      ],
    },
    {
      id: "sql",
      name: "SQL Database",
      stages: [
        { label: "Connecting to the data" },
        { label: "24 tables found, exploring the data" },
        { label: "Attaching business context to the data" },
        { label: "Listing down all of the clarifications needed" },
      ],
      questions: [
        {
          question:
            "Should SAP SD deliveries/invoices or SQL orders be used as the source of truth for sales facts?",
          answer:
            "Use SQL sales_order_fact as the reporting source. It is already reconciled daily against SAP invoices and POS uploads and includes cancellations, returns, and delivery status. SAP SD deliveries remain the system of record but are not query-friendly.",
        },
        {
          question:
            "Are returns negative sales in SQL or separate movements in SAP?",
          answer:
            "In SQL, returns are stored as negative sales lines with reference to original invoice. In SAP, 602 movements exist, but for analytics, use the SQL-level net units per SKU-store-date (sales minus returns).",
        },
        {
          question:
            "Should I use SAP fiscal periods or SQL calendar for analysis?",
          answer:
            "Use SAP fiscal calendar (April to March). SQL has a calendar_dim table aligned to SAP periods (FISCPER). Seasonal tags (SS/AW/Resort) are separate and map via collection master, not fiscal periods.",
        },
      ],
    },
  ];

  // Progress through stages sequentially
  useEffect(() => {
    if (allComplete || showConversation) return;

    const timer = setTimeout(() => {
      if (currentStageIndex < sources[currentSourceIndex].stages.length - 1) {
        setCurrentStageIndex(currentStageIndex + 1);
      } else if (currentSourceIndex < sources.length - 1) {
        setCurrentSourceIndex(currentSourceIndex + 1);
        setCurrentStageIndex(0);
      } else {
        setAllComplete(true);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [
    currentSourceIndex,
    currentStageIndex,
    allComplete,
    showConversation,
    sources,
  ]);

  // Auto-play conversation
  useEffect(() => {
    if (!showConversation) return;

    const allMessages: ConversationMessage[] = sources.flatMap((source) =>
      source.questions.flatMap((q) => [
        { type: "question" as const, text: q.question, source: source.name },
        { type: "answer" as const, text: q.answer },
      ])
    );

    if (currentMessageIndex < allMessages.length) {
      const timer = setTimeout(
        () => {
          setConversationMessages([
            ...conversationMessages,
            allMessages[currentMessageIndex],
          ]);
          setCurrentMessageIndex(currentMessageIndex + 1);
        },
        currentMessageIndex === 0
          ? 500
          : allMessages[currentMessageIndex].type === "question"
          ? 1000
          : 1000
      );

      return () => clearTimeout(timer);
    }
  }, [showConversation, currentMessageIndex, conversationMessages, sources]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (showConversation && conversationEndRef.current) {
      conversationEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversationMessages, showConversation]);

  const handleAnswerAll = () => {
    setShowConversation(true);
    setConversationMessages([]);
    setCurrentMessageIndex(0);
  };

  if (showConversation) {
    return (
      <div className="h-screen overflow-auto bg-gray-50 flex items-center justify-center p-8">
        <div className="bg-white rounded-3xl shadow-sm w-full max-w-3xl h-[85vh] flex flex-col">
          <div className="flex-1 overflow-y-auto p-8 space-y-6">
            {conversationMessages.map((message, idx) => (
              <div key={idx} className="animate-fadeIn">
                {message.type === "answer" ? (
                  <div className="flex gap-3 items-start mb-6">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-gray-600 font-semibold text-sm">
                        Y
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 mb-2">
                        You
                      </p>
                      <div className="bg-gray-100 rounded-2xl px-5 py-3 inline-block">
                        <p className="text-sm text-gray-800 leading-relaxed">
                          {message.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-3 items-start mb-6">
                    <div className="w-10 h-10 bg-teal-700 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-semibold text-sm">
                        M
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 mb-2">
                        Morrie
                      </p>
                      <p className="text-sm text-gray-800 leading-relaxed">
                        {message.text}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div ref={conversationEndRef} />
          </div>

          {currentMessageIndex >=
            sources.flatMap((s) => s.questions).length * 2 && (
            <div className="p-6 border-t border-gray-200 flex-shrink-0">
              <Link href={"/workspace/dgk-bgk"}>
                <button
                  className="w-full bg-teal-700 hover:bg-teal-800 text-white py-4 rounded-xl font-semibold text-base transition-all hover:shadow-lg"
                  type="button"
                >
                  Next
                </button>
              </Link>
            </div>
          )}
        </div>

        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-out;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-auto bg-gray-50 flex items-center justify-center p-8">
      <div className="bg-white rounded-3xl shadow-sm p-12 w-full max-w-4xl">
        <p className="text-sm text-gray-400 mb-3">5/6</p>
        <h1 className="text-4xl font-serif text-gray-900 mb-3">
          Let me go through your data
        </h1>
        <p className="text-gray-500 mb-12">
          This might take some time. You can close this window and come back in
          some time.
        </p>

        <div className="space-y-6 mb-12">
          {sources.map((source, sourceIdx) => (
            <div
              key={source.id}
              className="border-2 border-gray-200 rounded-2xl p-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  {source.id === "sap-hana" ? (
                    <SiDatabricks className="text-red-500" size={20} />
                  ) : (
                    <svg
                      className="w-6 h-6 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                      />
                    </svg>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {source.name}
                    </h3>
                    {sourceIdx < currentSourceIndex && (
                      <div className="flex items-center gap-2 text-green-600">
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
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-sm font-medium">Complete</span>
                      </div>
                    )}
                  </div>

                  {allComplete && sourceIdx === sources.length - 1 ? (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">
                        Data understood, clarifications needed.
                      </p>
                      <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                        {source.questions.length} Questions
                      </span>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm text-gray-900 font-medium mb-3">
                        {sourceIdx < currentSourceIndex
                          ? "Data understood, clarifications needed."
                          : sourceIdx === currentSourceIndex
                          ? source.stages[currentStageIndex].label
                          : "Waiting..."}
                      </p>
                      {sourceIdx === currentSourceIndex && (
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-teal-600 h-2 rounded-full transition-all duration-500"
                            style={{
                              width: `${
                                ((currentStageIndex + 1) /
                                  source.stages.length) *
                                100
                              }%`,
                            }}
                          />
                        </div>
                      )}
                      {sourceIdx < currentSourceIndex && (
                        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                          {source.questions.length} Questions
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {allComplete ? (
          <button
            onClick={handleAnswerAll}
            className="w-full border-2 border-gray-900 text-gray-900 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all"
            type="button"
          >
            Answer all
          </button>
        ) : (
          <button
            disabled
            className="w-full bg-gray-300 text-gray-500 py-4 rounded-xl font-semibold text-lg cursor-not-allowed"
            type="button"
          >
            Processing...
          </button>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default DataProcessingPage;

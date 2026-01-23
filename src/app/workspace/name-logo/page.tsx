/* eslint-disable @next/next/no-img-element */
"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const WorkspaceSetup = () => {
  const router = useRouter();
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [logo, setLogo] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setLogo(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContinue = () => {
    if (!selectedIndustry) {
      // Optional: show error toast or message
      return;
    }

    setIsLoading(true);

    // Show loader for 2 seconds before navigating
    setTimeout(() => {
      router.push("/workspace/bkg");
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <div className="text-center">
          {/* Spinner */}
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-teal-700 rounded-full border-t-transparent animate-spin"></div>
          </div>

          {/* Loading text */}
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Setting up your workspace
          </h2>
          <p className="text-gray-600">This will only take a moment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-auto bg-gray-200 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-lg p-12">
        <div className="mb-8">
          <p className="text-sm text-gray-400 mb-2">1/6</p>
          <h1 className="text-4xl font-serif text-gray-900 mb-3">
            Set up the Client Workspace
          </h1>
          <p className="text-gray-500">
            Provide a few details about the company so the platform can tailor
            recommendations and decision workflows to their business context.
          </p>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-900 mb-3">
            Upload the company logo
            <br /> (This will be used on dashboards and reports.)
          </label>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              id="logo-upload"
              aria-label="Upload workspace logo"
            />
            <label
              htmlFor="logo-upload"
              className="block w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors cursor-pointer items-center justify-center"
            >
              {logo ? (
                <img
                  src={logo}
                  alt="Workspace logo preview"
                  className="w-full h-full object-contain rounded-lg"
                />
              ) : (
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              )}
            </label>
          </div>
        </div>

        <div className="mb-12">
          <label className="block text-sm font-medium text-gray-900 mb-3">
            Select the company’s primary industry{" "}
            <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setSelectedIndustry("retail")}
              className={`px-6 py-4 rounded-lg border transition-all text-left ${
                selectedIndustry === "retail"
                  ? "border-gray-900 bg-gray-50"
                  : "border-gray-200 bg-white hover:bg-gray-50"
              }`}
              type="button"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedIndustry === "retail"
                      ? "border-gray-900"
                      : "border-gray-300"
                  }`}
                >
                  {selectedIndustry === "retail" && (
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-900"></div>
                  )}
                </div>
                <span className="text-gray-700 font-medium">Retail</span>
              </div>
            </button>

            <button
              onClick={() => setSelectedIndustry("consumer")}
              className={`px-6 py-4 rounded-lg border transition-all text-left ${
                selectedIndustry === "consumer"
                  ? "border-gray-900 bg-gray-50"
                  : "border-gray-200 bg-white hover:bg-gray-50"
              }`}
              type="button"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedIndustry === "consumer"
                      ? "border-gray-900"
                      : "border-gray-300"
                  }`}
                >
                  {selectedIndustry === "consumer" && (
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-900"></div>
                  )}
                </div>
                <span className="text-gray-700 font-medium">Consumer</span>
              </div>
            </button>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={handleContinue}
            disabled={!selectedIndustry}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              selectedIndustry
                ? "bg-teal-700 hover:bg-teal-800 text-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Continue
          </button>
        </div>
      </div>

      <div className="fixed bottom-8 left-8 text-gray-400">
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
          />
        </svg>
      </div>
    </div>
  );
};

export default WorkspaceSetup;

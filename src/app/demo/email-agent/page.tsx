"use client";
import { useState } from "react";
import CustomMarkdown from "./custom-markdown";
import { sendContent } from "@/services/email-agent-instance";
import { IEmailAgentRequest, IEmailAgentResponse } from "@/types/email-agent";

export default function ApiRequestComponent() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState<IEmailAgentResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResponse(null);
    try {
      const { data: res } = await sendContent({ content: input });
      setResponse(res);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="flex h-screen p-4">
      {/* Left Section - 40% */}
      <div className="w-[35%] p-4 border-r">
        <p className="text-2xl font-poly text-black font-semibold mb-2">
          Morrie Email Agent
        </p>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 border rounded h-[80%] text-black"
          placeholder="Enter text..."
        />
        <button
          onClick={handleSubmit}
          className="mt-2 w-full p-2 bg-morrie-primary text-white rounded"
          disabled={loading}
        >
          Submit
        </button>
      </div>
      {/* Right Section - 60% */}
      <div className="w-[65%] p-4 h-screen overflow-y-auto text-black font-nunito font-normal text-base">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-morrie-primary"></div>
          </div>
        ) : response ? (
          <CustomMarkdown>{response.sop}</CustomMarkdown>
        ) : (
          <p className="text-gray-500">
            No data available. Enter text and submit to generate a response.
          </p>
        )}
      </div>
    </div>
  );
}

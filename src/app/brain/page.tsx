import Link from "next/link";
import React from "react";

const DigitalBrain: React.FC = () => {
  return (
    <div className="w-screen h-screen bg-gradient-to-br from-[#faf9f6] via-[#f5f3ed] to-[#ede9dd] p-6 overflow-hidden text-black font-['Inter',sans-serif]">
      <div className="h-full flex flex-col">
        <h1 className="text-2xl font-semibold mb-4 tracking-tight flex-shrink-0 bg-gradient-to-r from-[#2a2a2a] to-[#4a4a4a] bg-clip-text text-transparent">
          How the Digital Brain is created for an Enterprise
        </h1>

        <div className="flex-1 relative text-center">
          {/* SVG Container for Arrows */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 1 }}
          >
            <defs>
              {/* ===== Filled Arrow (Primary Direction) ===== */}
              <marker
                id="arrowFilled"
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="5"
                markerHeight="5"
                orient="auto"
              >
                <path d="M 0 0 L 10 5 L 0 10 Z" fill="#4a4a4a" />
              </marker>

              {/* ===== Tech Arrow (System / Infra) ===== */}
              <marker
                id="arrowTech"
                viewBox="0 0 12 12"
                refX="10"
                refY="6"
                markerWidth="9"
                markerHeight="9"
                orient="auto"
              >
                <path
                  d="M2 2 L10 6 L2 10"
                  fill="none"
                  stroke="#4a4a4a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </marker>

              {/* ===== Small Arrow (Animated Flow) ===== */}
              <marker
                id="arrowFlow"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="5"
                markerHeight="5"
                orient="auto"
              >
                <path d="M0 0 L10 5 L0 10 Z" fill="#4a4a4a" />
              </marker>
            </defs>

            {/* ================= Vertical Flows ================= */}

            {/* Tools → Network Container */}
            <line
              x1="14%"
              y1="596"
              x2="14%"
              y2="534"
              stroke="#4a4a4a"
              strokeWidth="2"
              markerEnd="url(#arrowFilled)"
            />

            {/* Databases → Network Container */}
            <line
              x1="33%"
              y1="596"
              x2="33%"
              y2="534"
              stroke="#4a4a4a"
              strokeWidth="2"
              markerEnd="url(#arrowFilled)"
            />

            {/* Planning → Network Container */}
            <line
              x1="53%"
              y1="596"
              x2="53%"
              y2="534"
              stroke="#4a4a4a"
              strokeWidth="2"
              markerEnd="url(#arrowFilled)"
            />

            {/* Network Container → Multi-Agentic Systems */}
            <line
              x1="12.5%"
              y1="184"
              x2="12.5%"
              y2="160"
              stroke="#4a4a4a"
              strokeWidth="2"
              markerEnd="url(#arrowFilled)"
            />
            <line
              x1="52.5%"
              y1="184"
              x2="52.5%"
              y2="160"
              stroke="#4a4a4a"
              strokeWidth="2"
              markerEnd="url(#arrowFilled)"
            />

            {/* ================= Cortex ================= */}

            {/* Multi-Agentic Systems → Cortex */}
            <line
              x1="16%"
              y1="120"
              x2="16%"
              y2="100"
              stroke="#4a4a4a"
              strokeWidth="2"
              markerEnd="url(#arrowFilled)"
            />

            {/* Multi-Agentic Systems → Cortex-X */}
            <line
              x1="49%"
              y1="120"
              x2="49%"
              y2="100"
              stroke="#4a4a4a"
              strokeWidth="2"
              markerEnd="url(#arrowFilled)"
            />

            {/* Cortex-X → Execution */}
            <path
              d="M 700 100 L 700 20 L 1037 20"
              stroke="#4a4a4a"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrowFilled)"
            />

            {/* ================= Context Graph (Bidirectional) ================= */}

            {/* Network → Context Graph */}
            <path
              d="M 900 340 L 1040 340 L 1045 340"
              stroke="#4a4a4a"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrowFilled)"
            />

            {/* Context Graph → Network */}
            <path
              d="M 1000 360 L 1045 360 L 905 360"
              stroke="#4a4a4a"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrowFilled)"
            />

            {/* ================= Dashed / Data Flow ================= */}

            {/* Cortex-X → Context Graph */}
            <path
              d="M 910 70 L 1100 70 L 1100 240"
              stroke="#4a4a4a"
              strokeWidth="2"
              strokeDasharray="6 6"
              fill="none"
              markerEnd="url(#arrowFlow)"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="-24"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </path>

            {/* Execution → Context Graph */}
            <line
              x1="85%"
              y1="40"
              x2="85%"
              y2="240"
              stroke="#4a4a4a"
              strokeWidth="2"
              strokeDasharray="6 6"
              markerEnd="url(#arrowFlow)"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="-24"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </line>
          </svg>

          {/* Cortex - Top Left */}
          <Link href={"https://demo.questt.ai"}>
            <div
              className="absolute top-0 left-0 bg-gradient-to-br from-[#ede9dd] to-[#e8e4d8] border-2 border-[#8a8a8a] rounded-xl p-4 hover:shadow-2xl hover:scale-[1.03] hover:border-[#6a6a6a] cursor-pointer duration-300 transition-all backdrop-blur-sm group"
              style={{ width: "32%", height: "100px", zIndex: 2 }}
            >
              <div className="text-2xl font-bold mb-1 tracking-tight bg-gradient-to-r from-[#2a2a2a] to-[#4a4a4a] bg-clip-text text-transparent group-hover:from-[#d97b5f] group-hover:to-[#2a2a2a] transition-all duration-300">
                CORTEX
              </div>
              <div className="text-[11px] leading-relaxed text-[#4a4a4a] font-medium">
                Conversational enterprise intelligence for all
              </div>
            </div>
          </Link>

          {/* Decision Systems - Top Middle */}
          <Link href={"/morrie"}>
            <div
              className="absolute top-0 bg-gradient-to-br from-[#ede9dd] to-[#e8e4d8] border-2 border-[#8a8a8a] rounded-xl p-4 hover:shadow-2xl hover:scale-[1.03] hover:border-[#6a6a6a] cursor-pointer duration-300 transition-all backdrop-blur-sm group"
              style={{ left: "33%", width: "32%", height: "100px", zIndex: 2 }}
            >
              <div className="text-2xl font-bold mb-1 tracking-tight bg-gradient-to-r from-[#2a2a2a] to-[#4a4a4a] bg-clip-text text-transparent group-hover:from-[#d97b5f] group-hover:to-[#2a2a2a] transition-all duration-300">
                DECISION <br /> SYSTEMS
              </div>
            </div>
          </Link>

          {/* Multi Agentic Systems */}
          <div
            className="absolute left-0 border-2 border-[#8a8a8a] rounded-xl p-2 text-center text-xs font-bold tracking-[0.12em] uppercase bg-gradient-to-r from-[#e8e4d8]/80 to-[#ede9dd]/80 backdrop-blur-sm shadow-lg"
            style={{ top: "120px", width: "65%", height: "40px", zIndex: 2 }}
          >
            <span className="bg-gradient-to-r from-[#2a2a2a] to-[#4a4a4a] bg-clip-text text-transparent">
              Multi Agentic Systems
            </span>
          </div>
          {/* Network Container */}
          <Link href={"https://document-intelligence.vercel.app/graph/gcpl"}>
            <div
              className="absolute left-0 bg-gradient-to-br from-[#c0cbc4] to-[#b4bfb8] border-2 border-[#8a8a8a] rounded-xl p-6 hover:shadow-2xl hover:scale-[1.02] hover:border-[#6a6a6a] cursor-pointer duration-300 transition-all backdrop-blur-sm group"
              style={{ top: "184px", width: "65%", height: "350px", zIndex: 2 }}
            >
              {/* Enterprise Network Graph */}
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Connection Lines */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  style={{ zIndex: 0 }}
                >
                  {/* Lines from Enterprise to each node */}
                  <line
                    x1="50%"
                    y1="50%"
                    x2="50%"
                    y2="28%"
                    stroke="#4a4a4a"
                    strokeWidth="2"
                    markerEnd="url(#arrowFilled)"
                  />
                  <line
                    x1="50%"
                    y1="50%"
                    x2="82%"
                    y2="22%"
                    stroke="#4a4a4a"
                    strokeWidth="2"
                    markerEnd="url(#arrowFilled)"
                  />
                  <line
                    x1="50%"
                    y1="50%"
                    x2="87%"
                    y2="50%"
                    stroke="#4a4a4a"
                    strokeWidth="2"
                    markerEnd="url(#arrowFilled)"
                  />
                  <line
                    x1="50%"
                    y1="50%"
                    x2="82%"
                    y2="77%"
                    stroke="#4a4a4a"
                    strokeWidth="2"
                    markerEnd="url(#arrowFilled)"
                  />
                  <line
                    x1="50%"
                    y1="50%"
                    x2="50%"
                    y2="71%"
                    stroke="#4a4a4a"
                    strokeWidth="2"
                    markerEnd="url(#arrowFilled)"
                  />
                  <line
                    x1="50%"
                    y1="50%"
                    x2="18%"
                    y2="77%"
                    stroke="#4a4a4a"
                    strokeWidth="2"
                    markerEnd="url(#arrowFilled)"
                  />
                  <line
                    x1="50%"
                    y1="50%"
                    x2="13%"
                    y2="50%"
                    stroke="#4a4a4a"
                    strokeWidth="2"
                    markerEnd="url(#arrowFilled)"
                  />
                  <line
                    x1="50%"
                    y1="50%"
                    x2="18%"
                    y2="23%"
                    stroke="#4a4a4a"
                    strokeWidth="2"
                    markerEnd="url(#arrowFilled)"
                  />
                </svg>

                {/* Enterprise - Center Node */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-[#e08567] to-[#d97b5f] rounded-full p-6 flex items-center justify-center text-xs font-bold tracking-[0.08em] uppercase border-2 border-[#8a8a8a] shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300"
                  style={{ width: "80px", height: "80px", zIndex: 1 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="drop-shadow-lg"
                  >
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                </div>

                {/* Sales - Top */}
                <div
                  className="absolute top-[5%] left-1/2 -translate-x-1/2 bg-gradient-to-br from-[#f5f0e8] to-[#e8e4d8] rounded-full p-4 flex flex-col items-center justify-center border-2 border-[#8a8a8a] shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
                  style={{ width: "70px", height: "70px", zIndex: 1 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                    <polyline points="17 6 23 6 23 12" />
                  </svg>
                  <span className="text-[8px] font-bold uppercase mt-1">
                    Sales
                  </span>
                </div>

                {/* Finance - Top Right */}
                <div
                  className="absolute top-[10%] right-[10%] bg-gradient-to-br from-[#f5f0e8] to-[#e8e4d8] rounded-full p-4 flex flex-col items-center justify-center border-2 border-[#8a8a8a] shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
                  style={{ width: "70px", height: "70px", zIndex: 1 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                  <span className="text-[8px] font-bold uppercase mt-1">
                    Finance
                  </span>
                </div>

                {/* Stores - Right */}
                <div
                  className="absolute top-1/2 right-[5%] -translate-y-1/2 bg-gradient-to-br from-[#f5f0e8] to-[#e8e4d8] rounded-full p-4 flex flex-col items-center justify-center border-2 border-[#8a8a8a] shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
                  style={{ width: "70px", height: "70px", zIndex: 1 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                    <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
                    <path d="M12 3v6" />
                  </svg>
                  <span className="text-[8px] font-bold uppercase mt-1">
                    Stores
                  </span>
                </div>

                {/* Supply Chain - Bottom Right */}
                <div
                  className="absolute bottom-[10%] right-[10%] bg-gradient-to-br from-[#f5f0e8] to-[#e8e4d8] rounded-full p-4 flex flex-col items-center justify-center border-2 border-[#8a8a8a] shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
                  style={{ width: "70px", height: "70px", zIndex: 1 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="1" y="3" width="15" height="13" />
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                  <span className="text-[7px] font-bold uppercase mt-1">
                    Supply Chain
                  </span>
                </div>

                {/* Procurement - Bottom */}
                <div
                  className="absolute bottom-[5%] left-1/2 -translate-x-1/2 bg-gradient-to-br from-[#f5f0e8] to-[#e8e4d8] rounded-full p-4 flex flex-col items-center justify-center border-2 border-[#8a8a8a] shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
                  style={{ width: "70px", height: "70px", zIndex: 1 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  <span className="text-[7px] font-bold uppercase mt-1">
                    Procurement
                  </span>
                </div>

                {/* External - Bottom Left */}
                <div
                  className="absolute bottom-[10%] left-[10%] bg-gradient-to-br from-[#f5f0e8] to-[#e8e4d8] rounded-full p-4 flex flex-col items-center justify-center border-2 border-[#8a8a8a] shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
                  style={{ width: "70px", height: "70px", zIndex: 1 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  <span className="text-[8px] font-bold uppercase mt-1">
                    External
                  </span>
                </div>

                {/* Product - Left */}
                <div
                  className="absolute top-1/2 left-[5%] -translate-y-1/2 bg-gradient-to-br from-[#f5f0e8] to-[#e8e4d8] rounded-full p-4 flex flex-col items-center justify-center border-2 border-[#8a8a8a] shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
                  style={{ width: "70px", height: "70px", zIndex: 1 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                  </svg>
                  <span className="text-[8px] font-bold uppercase mt-1">
                    Product
                  </span>
                </div>

                {/* Market - Top Left */}
                <div
                  className="absolute top-[10%] left-[10%] bg-gradient-to-br from-[#f5f0e8] to-[#e8e4d8] rounded-full p-4 flex flex-col items-center justify-center border-2 border-[#8a8a8a] shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
                  style={{ width: "70px", height: "70px", zIndex: 1 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  <span className="text-[8px] font-bold uppercase mt-1">
                    Market
                  </span>
                </div>

                <div
                  className="absolute text-base top-[300px] -translate-y-1/2 font-bold tracking-[0.15em] uppercase whitespace-nowrap text-[#4a4a4a] drop-shadow-sm"
                  style={{ zIndex: 2 }}
                >
                  Business Knowledge Graph
                </div>
              </div>
            </div>
          </Link>

          {/* Data Sources - Bottom Left */}
          <div
            className="absolute left-0 flex gap-4 justify-evenly"
            style={{ top: "596px", width: "65%", zIndex: 2 }}
          >
            {[
              "Tools/Platforms",
              "Databases/Warehouses",
              <>
                Planning/Forecasting
                <br />
                Tools/Models
              </>,
            ].map((label, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-[#c0cbc4] to-[#b4bfb8] border-2 border-[#8a8a8a] w-[160px] h-[80px] transform skew-x-[-15deg] flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-105 hover:border-[#6a6a6a] transition-all duration-300 cursor-pointer group"
              >
                <div className="transform skew-x-[15deg] text-[10px] font-bold tracking-wider uppercase text-center leading-tight px-3 text-[#2a2a2a] group-hover:text-[#d97b5f] transition-colors duration-300">
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* Execution Box - Top Right */}
          <div
            className="absolute right-0 top-0 bg-gradient-to-br from-[#ede9dd] to-[#e8e4d8] border-2 border-[#8a8a8a] rounded-xl p-4 text-center text-xs font-bold tracking-[0.12em] uppercase flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 backdrop-blur-sm"
            style={{ width: "22%", right: "50px", height: "40px", zIndex: 2 }}
          >
            <span className="bg-gradient-to-r from-[#2a2a2a] to-[#4a4a4a] bg-clip-text text-transparent">
              Execution
            </span>
          </div>

          {/* Context Graph Box - Right Center */}
          <div
            className="absolute right-0 bg-gradient-to-br from-[#ede9dd] to-[#e8e4d8] border-2 border-[#8a8a8a] rounded-xl p-4 text-center text-xs font-bold tracking-[0.12em] uppercase flex items-center justify-center overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 backdrop-blur-sm"
            style={{
              top: "240px",
              right: "70px",
              width: "20%",
              height: "200px",
              zIndex: 2,
            }}
          >
            <span className="bg-gradient-to-r from-[#2a2a2a] to-[#4a4a4a] bg-clip-text text-transparent">
              Context Graph
            </span>
          </div>
          <div
            className="absolute text-lg -right-20 top-1/2 -translate-y-1/2 rotate-90 text-[10px] font-bold tracking-[0.2em] uppercase whitespace-nowrap text-[#4a4a4a] drop-shadow-sm"
            style={{ zIndex: 2 }}
          >
            Neo-Digital Brain
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalBrain;

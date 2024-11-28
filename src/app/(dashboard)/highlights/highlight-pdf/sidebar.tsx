// "use client";

// import React from "react";
// import type { IHighlight } from "react-pdf-highlighter";

// interface Props {
//   highlights: Array<IHighlight>;
//   resetHighlights: () => void;
//   toggleDocument: () => void;
// }

// const updateHash = (highlight: IHighlight) => {
//   document.location.hash = `highlight-${highlight.id}`;
// };

// export function Sidebar({
//   highlights,
//   resetHighlights,
//   toggleDocument,
// }: Props) {
//   return (
//     <div
//       className="sidebar"
//       style={{
//         width: "25vw",
//         height: "100vh",
//         overflow: "hidden",
//         display: "flex",
//         flexDirection: "column",
//         backgroundColor: "#F6F6F6",
//       }}
//     >
//       <ul
//         className="sidebar__highlights"
//         style={{
//           listStyle: "none",
//           padding: 0,
//           margin: 0,
//           overflowY: "auto",
//           flex: 1,
//         }}
//       >
//         {highlights.map((highlight, index) => (
//           <li
//             key={index}
//             className="sidebar__highlight"
//             onClick={() => {
//               updateHash(highlight);
//             }}
//             style={{
//               padding: "1rem",
//               cursor: "pointer",
//               borderBottom: "1px solid #e2e8f0",
//               transition: "all 0.2s ease",
//               background: "white",
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.backgroundColor = "#f7fafc";
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.backgroundColor = "white";
//             }}
//           >
//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: "0.5rem",
//               }}
//             >
//               {highlight.comment.text && (
//                 <strong
//                   style={{
//                     color: "#2d3748",
//                     fontSize: "0.875rem",
//                     display: "block",
//                   }}
//                 >
//                   {highlight.comment.text}
//                 </strong>
//               )}

//               {highlight.content.text && (
//                 <blockquote
//                   style={{
//                     margin: 0,
//                     color: "#4a5568",
//                     fontSize: "0.875rem",
//                     borderLeft: "3px solid #e2e8f0",
//                     paddingLeft: "0.75rem",
//                     wordBreak: "break-word",
//                   }}
//                 >
//                   {`${highlight.content.text.slice(0, 90).trim()}…`}
//                 </blockquote>
//               )}

//               {highlight.content.image && (
//                 <div
//                   style={{
//                     marginTop: "0.5rem",
//                     padding: "0.5rem",
//                     border: "1px solid #e2e8f0",
//                     borderRadius: "4px",
//                     background: "#fff",
//                     width: "100%",
//                     boxSizing: "border-box",
//                     overflow: "hidden",
//                   }}
//                 >
//                   <div
//                     style={{
//                       width: "100%",
//                       position: "relative",
//                       display: "flex",
//                       justifyContent: "center",
//                       alignItems: "center",
//                     }}
//                   >
//                     <img
//                       src={highlight.content.image}
//                       alt="Highlight area"
//                       style={{
//                         maxWidth: "100%",
//                         height: "auto",
//                         display: "block",
//                         objectFit: "contain",
//                       }}
//                     />
//                   </div>
//                 </div>
//               )}

//               <div
//                 style={{
//                   marginTop: "0.25rem",
//                   fontSize: "0.75rem",
//                   color: "#718096",
//                   textAlign: "right",
//                 }}
//               >
//                 Page {highlight.position.pageNumber}
//               </div>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

"use client";

import React from "react";
import type { IHighlight } from "react-pdf-highlighter";

interface Props {
  highlights: Array<IHighlight>;
  resetHighlights: () => void;
  toggleDocument: () => void;
}

const updateHash = (highlight: IHighlight) => {
  document.location.hash = `highlight-${highlight.id}`;
};

export function Sidebar({
  highlights,
  resetHighlights,
  toggleDocument,
}: Props) {
  return (
    <div className="flex h-screen">
      <div className="w-[370px] bg-[#F6F6F6] flex flex-col">
        <div className="px-4 py-5 flex-1 overflow-y-auto no-scrollbar">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="bg-white px-4 py-3 rounded-xl mb-4 cursor-pointer transition-all duration-100 hover:border-[#BAAE92] hover:border"
              onClick={() => updateHash(highlight)}
            >
              <div className="flex flex-col gap-2">
                {/* Highlight Comment */}
                {highlight.comment.text && (
                  <p className="text-sm text-black font-semibold">
                    {highlight.comment.text}
                  </p>
                )}

                {/* Highlight Content Text */}
                {highlight.content.text && (
                  <div className="border border-[#E5E7EABF] rounded-md px-3 py-1">
                    <blockquote className="m-0 text-gray-600 text-sm break-words ">
                      {`${highlight.content.text.slice(0, 90).trim()}`}
                    </blockquote>
                  </div>
                )}

                {/* Highlight Content Image */}
                {highlight.content.image && (
                  <div className="mt-2 p-2 border border-gray-300 rounded bg-white overflow-hidden">
                    <div className="relative flex justify-center items-center">
                      <img
                        src={highlight.content.image}
                        alt="Highlight area"
                        className="max-w-full h-auto object-contain"
                      />
                    </div>
                  </div>
                )}

                {/* Page Information */}
                <div className="mt-1 text-xs text-gray-500 text-right">
                  Page {highlight.position.pageNumber}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Footer with Reset Button */}
        {/* <div className="px-4 py-3 bg-white border-t border-gray-300">
          <button
            onClick={resetHighlights}
            className="w-full bg-red-500 text-white text-sm py-2 rounded-md hover:bg-red-600 transition-all"
          >
            Reset Highlights
          </button>
        </div> */}
      </div>
    </div>
  );
}

// "use client";

// import { IDataProps, DataItem } from "./types";
// import { Button } from "@/components/button";
// import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
// import React, { useState } from "react";

// export const ActionSidebar = ({ data }: IDataProps) => {
//   const [expandedSections, setExpandedSections] = useState<Set<number>>(
//     new Set()
//   );

//   // Helper function to check if a value is effectively empty
//   const isEmptyValue = (value: any): boolean => {
//     if (value === null || value === undefined) return true;
//     if (value === "null") return true; // Handle string "null"
//     if (typeof value === "string" && value.trim() === "") return true;
//     return false;
//   };

//   // Function to render key-value pairs with null check
//   const renderKeyValuePair = (key: string, value: any): React.ReactNode => {
//     if (isEmptyValue(value)) return null;

//     return (
//       <div key={key} className="bg-white px-4 py-3 rounded-xl mb-3">
//         <p className="text-xs text-[#A8A8A8] mb-2">{key}</p>
//         <p className="text-sm text-black">{value}</p>
//       </div>
//     );
//   };

//   // Recursive function to render sections with null checks
//   const renderSection = (section: {
//     key: string;
//     value: any;
//   }): React.ReactNode => {
//     if (isEmptyValue(section.value)) return null;

//     if (Array.isArray(section.value)) {
//       // Filter out null items and render non-null values
//       const validItems = section.value.filter((item) => !isEmptyValue(item));
//       if (validItems.length === 0) return null;

//       return validItems.map((item, index) => (
//         <div key={index} className="bg-white px-4 py-3 rounded-xl mb-3">
//           {Object.entries(item)
//             .filter(([_, value]) => !isEmptyValue(value))
//             .map(([key, value]) => (
//               <div key={key}>
//                 {typeof value === "object" && !isEmptyValue(value) ? (
//                   renderSection({ key, value })
//                 ) : (
//                   <p className="text-sm text-black">
//                     {key}: {String(value)}
//                   </p>
//                 )}
//               </div>
//             ))}
//         </div>
//       ));
//     } else if (
//       typeof section.value === "object" &&
//       !isEmptyValue(section.value)
//     ) {
//       // Filter out null values in objects
//       const entries = Object.entries(section.value)
//         .filter(([_, value]) => !isEmptyValue(value))
//         .map(([key, value]) => renderSection({ key, value }));

//       return entries.length > 0 ? entries : null;
//     } else {
//       return renderKeyValuePair(section.key, section.value);
//     }
//   };

//   const toggleSection = (index: number) => {
//     setExpandedSections((prevExpandedSections) => {
//       const newExpandedSections = new Set(prevExpandedSections);
//       if (newExpandedSections.has(index)) {
//         newExpandedSections.delete(index);
//       } else {
//         newExpandedSections.add(index);
//       }
//       return newExpandedSections;
//     });
//   };

//   // Filter out sections with null values before rendering
//   // const validAdditionalData = data.additional_data.filter(
//   //   (section) =>
//   //     !isEmptyValue(section.value) &&
//   //     !(typeof section.value === "string" && section.value === "null")
//   // );

//   const validAdditionalData: any[] = [];

//   return (
//     <div className="flex h-screen">
//       <div className="w-[370px] bg-[#F6F6F6] flex flex-col no-scrollbar">
//         <div className="px-4 py-5 flex-1 overflow-y-auto no-scrollbar">
//           {/* Render pdf_key_value_pairs with null check */}
//           {data.pdf_key_value_pairs
//             .filter((item) => !isEmptyValue(item.value))
//             .map((item) => renderKeyValuePair(item.key, item.value))}

//           {/* Render only non-null additional_data sections */}
//           {validAdditionalData.map((section, index) => {
//             const sectionContent = renderSection(section);
//             if (!sectionContent) return null;

//             return (
//               <div key={index} className="mb-4">
//                 <div
//                   className="flex justify-between items-center bg-white px-4 py-3 rounded-xl cursor-pointer"
//                   onClick={() => toggleSection(index)}
//                 >
//                   <h2 className="font-nunito text-sm font-normal text-black">
//                     {section.key}
//                   </h2>
//                   {expandedSections.has(index) ? (
//                     <ChevronUpIcon className="text-gray-500 size-4" />
//                   ) : (
//                     <ChevronDownIcon className="text-gray-500 size-4" />
//                   )}
//                 </div>
//                 {expandedSections.has(index) && (
//                   <div className="mt-2 bg-[#BAAE921A] px-4 py-3 rounded-xl">
//                     {sectionContent}
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

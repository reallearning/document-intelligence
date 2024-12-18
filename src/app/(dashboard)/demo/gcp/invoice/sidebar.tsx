import { ExtractedField } from "../../components/types";

interface ISidebarProps {
  extractedData: ExtractedField[];
}

export default function Sidebar({ extractedData }: ISidebarProps) {
  return (
    <div className="w-[450px] bg-[#F6F6F6] overflow-y-auto no-scrollbar">
      <div>
        <h2 className="font-nunito font-semibold text-md text-black px-4 mt-4 py-2">
          Extracted Data
        </h2>
      </div>
      <div className="px-4 py-2">
        {extractedData.length > 0 ? (
          extractedData.map((field, index) => (
            <div key={index} className="bg-[#BAAE921A] rounded-lg p-4 mb-4">
              <p className="font-semibold text-sm text-gray-700">
                {field.field_name}
              </p>
              <p className="text-sm text-gray-500 text-wrap break-words">
                {field.value}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No data available</p>
        )}
      </div>
    </div>
  );
}

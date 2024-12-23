import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

interface ISidebarProps {
  data: Record<string, unknown>;
}
//bg-[#BAAE921A] rounded-lg
export default function Sidebar({ data }: ISidebarProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setOpenSections((prev) => {
      // Create a new object with all sections closed
      const allClosed: Record<string, boolean> = {};

      // Toggle the clicked section (if it was open, it will close; if it was closed, it will open)
      const isCurrentlyOpen = prev[section];
      if (!isCurrentlyOpen) {
        allClosed[section] = true;
      }

      return allClosed;
    });
  };
  // Render a key-value pair
  const renderKeyValuePair = (
    key: string,
    value: unknown,
    isNested: boolean
  ) => {
    if (value === null || value === "") return null;
    return (
      <div
        key={crypto.randomUUID()}
        className={`font-nunito ${
          isNested ? "px-4 py-2" : "px-4 py-4 bg-[#BAAE921A] rounded-lg mb-4"
        }`}
      >
        <p className="text-sm font-nunito font-medium text-gray-400">
          {formatKey(key)}
        </p>
        <p className="text-sm text-black">{String(value)}</p>
      </div>
    );
  };

  // Render an array of primitives
  const renderPrimitiveArray = (
    key: string,
    array: unknown[],
    isNested: boolean
  ) => {
    const isOpen = openSections[key] || false;
    return (
      <div
        key={crypto.randomUUID()}
        className={`${
          isNested ? "pt-2 pb-2" : "mb-4 bg-[#BAAE921A] rounded-lg px-4"
        } ${isOpen ? "pb-4" : ""}`}
      >
        <div
          className={`flex justify-between items-center ${
            isNested ? " px-4" : "py-4"
          } cursor-pointer`}
          onClick={() => toggleSection(key)}
        >
          <p
            className={`${
              isNested
                ? "text-sm font-medium font-nunito text-gray-400"
                : "text-md font-medium font-nunito text-black"
            }`}
          >
            {formatKey(key)}
          </p>
          {!isNested && (
            <span className="text-gray-400">
              {isOpen ? (
                <ChevronUpIcon className="w-4 h-4 text-[#7F7F7F]" />
              ) : (
                <ChevronDownIcon className="w-4 h-4 text-[#7F7F7F]" />
              )}
            </span>
          )}
        </div>
        {(isOpen || isNested) && (
          <ul
            className={`list-disc pl-8 ${
              isNested ? "" : "bg-white rounded-lg px-4 py-4"
            }`}
          >
            {array.map((item, index) => (
              <li key={crypto.randomUUID()} className="text-sm text-black">
                {String(item)}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  // Render an array of objects
  const renderObjectArray = (
    key: string,
    array: Array<Record<string, unknown>>
  ) => {
    const isOpen = openSections[key] || false;
    return (
      <div
        key={crypto.randomUUID()}
        className={`mb-4 bg-[#BAAE921A] rounded-lg ${isOpen ? "pb-4" : ""}`}
      >
        <div
          className="flex justify-between items-center px-4 py-4 cursor-pointer"
          onClick={() => toggleSection(key)}
        >
          <p className="text-md font-medium font-nunito text-black">
            {formatKey(key)}
          </p>
          <span className="text-gray-400">
            {isOpen ? (
              <ChevronUpIcon className="w-4 h-4 text-[#7F7F7F]" />
            ) : (
              <ChevronDownIcon className="w-4 h-4 text-[#7F7F7F]" />
            )}
          </span>
        </div>
        {isOpen && (
          <div className="px-4 ">
            {array.map((item, index) => (
              <div key={crypto.randomUUID()} className="bg-white rounded-lg">
                {Object.entries(item).map(([subKey, subValue]) =>
                  renderKeyValuePair(subKey, subValue, true)
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const isEmptyValues = (obj: Record<string, any>): boolean => {
    return Object.values(obj).every(
      (value) => value === null || value === undefined || value === ""
    );
  };

  // Render nested objects
  const renderNestedObject = (
    key: string,
    nestedObject: Record<string, unknown>,
    isNested: boolean
  ) => {
    const isEmpty = isEmptyValues(nestedObject);
    if (isEmpty) return null;

    const isOpen = openSections[key] || false;

    if (isNested) {
      return (
        <div className="px-4 py-2" key={crypto.randomUUID()}>
          <p className="text-sm font-nunito font-medium text-gray-400">
            {formatKey(key)}
          </p>
          <div className="mx-2 bg-white rounded-lg">
            {Object.entries(nestedObject).map(([subKey, subValue]) => {
              if (subValue === null || subValue === "") return null;

              return (
                <div key={crypto.randomUUID()} className={`font-nunito`}>
                  <p className="text-sm font-nunito font-medium text-gray-400">
                    {formatKey(subKey)}:{" "}
                    <span className="text-sm text-black">
                      {String(subValue)}
                    </span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    return (
      <div
        key={crypto.randomUUID()}
        className={`mb-4 bg-[#BAAE921A] rounded-lg ${isOpen ? "pb-4" : ""}`}
      >
        <div
          className="flex justify-between items-center px-4 py-4 cursor-pointer"
          onClick={() => toggleSection(key)}
        >
          <p className="text-md font-medium font-nunito text-black">
            {formatKey(key)}
          </p>
          <span className="text-gray-400">
            {isOpen ? (
              <ChevronUpIcon className="w-4 h-4 text-[#7F7F7F]" />
            ) : (
              <ChevronDownIcon className="w-4 h-4 text-[#7F7F7F]" />
            )}
          </span>
        </div>
        {isOpen && (
          <div className="mx-4  bg-white rounded-lg">
            {Object.entries(nestedObject).map(([subKey, subValue]) =>
              renderData(subKey, subValue, true)
            )}
          </div>
        )}
      </div>
    );
  };

  // Determine how to render the data based on its type
  const renderData = (key: string, value: unknown, isNested: boolean) => {
    if (Array.isArray(value)) {
      if (value.every((item) => typeof item === "object" && item !== null)) {
        return renderObjectArray(key, value as Record<string, unknown>[]);
      }
      return renderPrimitiveArray(key, value, isNested);
    } else if (typeof value === "object" && value !== null) {
      return renderNestedObject(
        key,
        value as Record<string, unknown>,
        isNested
      );
    } else {
      return renderKeyValuePair(key, value, isNested);
    }
  };

  const formatKey = (key: string) =>
    key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <div className="w-[450px] bg-[#F6F6F6] overflow-y-auto no-scrollbar p-4">
      <div>
        <h2 className="font-nunito font-semibold text-md text-black mb-4">
          Extracted Data
        </h2>
      </div>
      {Object.entries(data).map(([key, value]) =>
        renderData(key, value, false)
      )}
    </div>
  );
}

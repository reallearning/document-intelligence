import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function mergeClasses(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function center(...inputs: ClassValue[]) {
  return mergeClasses(["flex items-center justify-center", inputs]);
}

// Utility function to format timestamp
export const formatTimestamp = (timestamp: EpochTimeStamp): string => {
  const date = new Date(timestamp);

  const hours = date.getHours() % 12 || 12;
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = date.getHours() >= 12 ? "PM" : "AM";

  const day = date.getDate();
  const daySuffix =
    day === 1 ? "st" : day === 2 ? "nd" : day === 3 ? "rd" : "th";

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];

  const year = date.getFullYear();

  return `${hours}.${minutes} ${ampm} | ${day}${daySuffix} ${month}, ${year}`;
};

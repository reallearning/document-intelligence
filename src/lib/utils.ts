import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function mergeClasses(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function center(...inputs: ClassValue[]) {
  return mergeClasses(["flex items-center justify-center", inputs]);
}

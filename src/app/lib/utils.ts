import { ClassValue } from "tailwind-variants";

export function center(...inputs: ClassValue[]) {
    return mergeClasses(["flex items-center justify-center", inputs]);
  }

function mergeClasses(arg0: (string | ClassValue[])[]) {
    throw new Error("Function not implemented.");
}

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

type TailwindMerge = (...inputs: ClassValue[]) => string;

export const cn: TailwindMerge = (...inputs) => {
  return twMerge(clsx(inputs));
};

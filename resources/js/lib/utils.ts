import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/*
* Combine classnames with tailwindcss classes
* */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

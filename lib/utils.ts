import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateBR(isoString: string) {
  const [datePart, timePart] = isoString.split('T');
  const [year, month, day] = datePart.split('-');
  const [hour, minute] = timePart.split(':');

  return `${day}/${month}/${year} às ${hour}:${minute}`;
}
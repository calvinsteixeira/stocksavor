import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ExpirationStatus } from "@/types/Utils";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateBR(isoString: string) {
  const [datePart, timePart] = isoString.split('T');
  const [year, month, day] = datePart.split('-');
  const [hour, minute] = timePart.split(':');

  return `${day}/${month}/${year} às ${hour}:${minute}`;
}

export function getExpirationStatus(date: string): { message: string; color: string } {
  const [day, month, year] = date.split("/").map(Number);
  const productDate = new Date(year, month - 1, day);
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const diffTime = productDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays >= 0) {
    if (diffDays > 0) {
      return {
        message: `Vence em ${diffDays} dia${diffDays > 1 ? 's' : ''}`,
        color: diffDays <= 8 ? '#df972a' : '#278727'
      };
    } else {
      return {
        message: `Vence hoje`,
        color: diffDays <= 8 ? '#df972a' : '#278727'
      };
    }

  }

  if (diffDays == 1) {
    return {
      message: `Vencido há ${Math.abs(diffDays)} dia${diffDays > 1 ? 's' : ''} `,
      color: '#a93232'
    };
  } else {
    return {
      message: `Venceu ontem`,
      color: '#a93232'
    };
  }


}


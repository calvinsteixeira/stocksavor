import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, parse } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string, params: { originalFormat: string, targetFormat: string }) {
  return format(parse(date, params.originalFormat, new Date()), params.targetFormat);
}

export function trimObjValues<T extends Record<string, any>>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => 
      typeof value === "string" ? [key, value.trim()] : [key, value]
    )
  ) as T;
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
        color: diffDays <= 8 ? '#b99d10' : '#10b981'
      };
    } else {
      return {
        message: `Vence hoje`,
        color: diffDays <= 8 ? '#b99d10' : '#10b981'
      };
    }
  }

  if (diffDays == 1) {
    return {
      message: `Venceu ontem`,
      color: '#b91010'
    };
  } else {
    return {
      message: `Vencido há ${Math.abs(diffDays)} dias`,
      color: '#b91010'
    };

  }


}


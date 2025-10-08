import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getErrorMessage(error: unknown, fallback = "An unexpected error occurred"): string {
  if (!error) return fallback;

  if (error instanceof Error && error.message) return error.message;

  if (typeof error === "object" && error !== null && "message" in error) {
    const maybeMessage = (error as { message?: unknown }).message;
    if (typeof maybeMessage === "string") return maybeMessage;
  }

  return fallback;
}

interface CustomError {
  message: string;
  errorObj: unknown;
}

export async function tryCatch<T>(promise: Promise<T>): Promise<[T, null] | [null, CustomError]> {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    const customError = {
      message: getErrorMessage(error),
      errorObj: error,
    };
    return [null, customError];
  }
}

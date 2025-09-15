import { getErrorMessage } from "./utils";

interface ErrorObj {
  message: string;
  error: unknown;
}

export async function tryCatch<T>(
  promise: Promise<T>,
): Promise<[T | null, ErrorObj | null]> {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    const errorObj = {
      message: getErrorMessage(error),
      error,
    };
    return [null, errorObj];
  }
}

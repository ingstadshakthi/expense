type StatusResponse = {
  status: number;
  message: string;
};

export function getStatusMessage(status: number): StatusResponse {
  const messages: Record<number, string> = {
    204: "Action completed. No content to return.",
    400: "Oops! Something went wrong with your request.",
    401: "You're not authorized. Please login.",
    403: "You don't have permission to do this.",
    404: "We couldn’t find what you’re looking for.",
    409: "This already exists. Try something else.",
    422: "Validation failed. Please check your input.",
    429: "You're doing that too much. Please slow down.",
    500: "Something went wrong on our end. Please try again later.",
    503: "Service is temporarily unavailable. Try again soon.",
  };

  const defaultMessage = "Unexpected error. Please try again.";

  return {
    status,
    message: messages[status] ?? defaultMessage,
  };
}

export function getSuccessResponse(message: string): StatusResponse {
  return { status: 200, message };
}

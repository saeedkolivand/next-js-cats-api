import axios from "axios";

interface ErrorMessage {
  value: string;
}

interface ApiErrorResponse {
  response: {
    data: {
      error: {
        message: string | ValidationErrorObject;
      };
    };
  };
}

interface ValidationErrorDetail {
  key: string;
  message: ValidationErrorObject | string | ErrorMessage;
}

interface ValidationErrorObject {
  [key: string]: string | { value: string } | ValidationErrorObject;
}

export interface ErrorResponse {
  status: number;
  message: string;
}

export default class ErrorUtil {
  static normalizeError(error: unknown): ErrorResponse {
    if (axios.isAxiosError(error)) {
      // handle the validation error
      if (error.code === "ECONNREFUSED" || error.code === "ECONNABORTED") {
        return {
          status: 408,
          message: "Request Timeout",
        };
      }

      if (error?.response?.data) {
        return {
          status: error?.response?.status,
          message: error.response.data?.error?.message,
        };
      }
      return {
        status: error?.response?.status || 500,
        message: error?.response?.data.message,
      };
    } else if (
      typeof error === "object" &&
      error !== null &&
      "status" in error &&
      "message" in error &&
      error?.status &&
      error?.message
    ) {
      return error as ErrorResponse;
    } else if (typeof error === "string") {
      return {
        status: 500,
        message: error,
      };
    } else if (error instanceof Error) {
      return {
        status: 500,
        message: error.message,
      };
    } else {
      return {
        status: 500,
        message: "Unknown error occurred",
      };
    }
  }

  static parseValidationError(error: ApiErrorResponse | null) {
    const errorMessage = error?.response.data?.error?.message;
    if (!errorMessage) {
      return [{ key: "", message: "Unknown validation error." }];
    }

    if (typeof errorMessage === "string") {
      return [{ key: "", message: errorMessage }];
    }

    const extractMessages = (
      messageObj: ValidationErrorObject,
    ): ValidationErrorDetail[] => {
      return Object.entries(messageObj).flatMap(([key, value]) => {
        if (typeof value === "object" && value !== null) {
          if ("value" in value) {
            return {
              key,
              message: value.value || "Unknown validation error.",
            };
          } else {
            return extractMessages(value);
          }
        } else {
          return { key, message: value };
        }
      });
    };

    const validationErrors = extractMessages(errorMessage);

    return validationErrors;
  }
}

import ErrorUtil, { ErrorResponse } from "./Error";

describe("ErrorUtil", () => {
  describe("normalizeError", () => {
    it("should normalize axios error with response data", () => {
      const axiosError = {
        isAxiosError: true,
        response: {
          status: 404,
          data: {
            error: {
              message: "Not found",
            },
          },
        },
      } as any;

      const result = ErrorUtil.normalizeError(axiosError);

      expect(result).toEqual({
        status: 404,
        message: "Not found",
      });
    });

    it("should normalize axios error with connection refused", () => {
      const axiosError = {
        isAxiosError: true,
        code: "ECONNREFUSED",
      } as any;

      const result = ErrorUtil.normalizeError(axiosError);

      expect(result).toEqual({
        status: 408,
        message: "Request Timeout",
      });
    });

    it("should normalize axios error with connection aborted", () => {
      const axiosError = {
        isAxiosError: true,
        code: "ECONNABORTED",
      } as any;

      const result = ErrorUtil.normalizeError(axiosError);

      expect(result).toEqual({
        status: 408,
        message: "Request Timeout",
      });
    });

    it("should return error object as-is when it has status and message", () => {
      const errorObj: ErrorResponse = {
        status: 400,
        message: "Bad request",
      };

      const result = ErrorUtil.normalizeError(errorObj);

      expect(result).toEqual(errorObj);
    });

    it("should normalize string error", () => {
      const stringError = "Something went wrong";

      const result = ErrorUtil.normalizeError(stringError);

      expect(result).toEqual({
        status: 500,
        message: "Something went wrong",
      });
    });

    it("should normalize Error instance", () => {
      const error = new Error("Custom error message");

      const result = ErrorUtil.normalizeError(error);

      expect(result).toEqual({
        status: 500,
        message: "Custom error message",
      });
    });

    it("should handle unknown error type", () => {
      const unknownError = { someProperty: "someValue" };

      const result = ErrorUtil.normalizeError(unknownError);

      expect(result).toEqual({
        status: 500,
        message: "Unknown error occurred",
      });
    });

    it("should handle null error", () => {
      const result = ErrorUtil.normalizeError(null);

      expect(result).toEqual({
        status: 500,
        message: "Unknown error occurred",
      });
    });
  });

  describe("parseValidationError", () => {
    it("should return default error for null input", () => {
      const result = ErrorUtil.parseValidationError(null);

      expect(result).toEqual([
        {
          key: "",
          message: "Unknown validation error.",
        },
      ]);
    });

    it("should parse string error message", () => {
      const errorResponse = {
        response: {
          data: {
            error: {
              message: "Validation failed",
            },
          },
        },
      } as any;

      const result = ErrorUtil.parseValidationError(errorResponse);

      expect(result).toEqual([
        {
          key: "",
          message: "Validation failed",
        },
      ]);
    });

    it("should parse object error message with value properties", () => {
      const errorResponse = {
        response: {
          data: {
            error: {
              message: {
                email: { value: "Invalid email format" },
                password: { value: "Password too short" },
              },
            },
          },
        },
      } as any;

      const result = ErrorUtil.parseValidationError(errorResponse);

      expect(result).toEqual([
        { key: "email", message: "Invalid email format" },
        { key: "password", message: "Password too short" },
      ]);
    });

    it("should parse nested object error message", () => {
      const errorResponse = {
        response: {
          data: {
            error: {
              message: {
                user: {
                  profile: {
                    name: "Name is required",
                    age: "Age must be positive",
                  },
                },
              },
            },
          },
        },
      } as any;

      const result = ErrorUtil.parseValidationError(errorResponse);

      expect(result).toEqual([
        { key: "name", message: "Name is required" },
        { key: "age", message: "Age must be positive" },
      ]);
    });

    it("should parse mixed object error message", () => {
      const errorResponse = {
        response: {
          data: {
            error: {
              message: {
                email: { value: "Invalid email" },
                name: "Name is required",
                address: {
                  street: "Street is required",
                  city: { value: "City is invalid" },
                },
              },
            },
          },
        },
      } as any;

      const result = ErrorUtil.parseValidationError(errorResponse);

      expect(result).toEqual([
        { key: "email", message: "Invalid email" },
        { key: "name", message: "Name is required" },
        { key: "street", message: "Street is required" },
        { key: "city", message: "City is invalid" },
      ]);
    });

    it("should handle empty value in object property", () => {
      const errorResponse = {
        response: {
          data: {
            error: {
              message: {
                field: { value: "" },
              },
            },
          },
        },
      } as any;

      const result = ErrorUtil.parseValidationError(errorResponse);

      expect(result).toEqual([
        {
          key: "field",
          message: "Unknown validation error.",
        },
      ]);
    });

    it("should handle missing error message", () => {
      const errorResponse = {
        response: {
          data: {
            error: {},
          },
        },
      } as any;

      const result = ErrorUtil.parseValidationError(errorResponse);

      expect(result).toEqual([
        {
          key: "",
          message: "Unknown validation error.",
        },
      ]);
    });

    it("should handle missing response data", () => {
      const errorResponse = {
        response: {
          data: {},
        },
      } as any;

      const result = ErrorUtil.parseValidationError(errorResponse);

      expect(result).toEqual([
        {
          key: "",
          message: "Unknown validation error.",
        },
      ]);
    });
  });
});

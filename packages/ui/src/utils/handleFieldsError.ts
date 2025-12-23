import { FieldError } from "../types";

export const handleFieldsError = (
  error: unknown,
): Record<string, string> | null => {
  const fieldErrors: Record<string, string> = {};

  if (
    error &&
    typeof error === "object" &&
    "data" in error &&
    error.data &&
    typeof error.data === "object" &&
    "errors" in error.data &&
    Array.isArray(error.data.errors)
  ) {
    const errors = error.data.errors as FieldError[];
    errors.forEach(({ field, message }) => {
      if (!(field in fieldErrors)) {
        fieldErrors[field] = message;
      }
    });
  }

  return Object.keys(fieldErrors).length > 0 ? fieldErrors : null;
};

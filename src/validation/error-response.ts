import { ValidationErrorItem } from "joi";
import { ErrorResponse } from "../models/error-response.model";

export const errorResponse = (schemaErrors: ValidationErrorItem[]): ErrorResponse => {
  const errors = schemaErrors.map(error => {
    const { path, message } = error;
    return { path, message };
  });
  return {
    status: "failed",
    errors
  }
}

export interface FieldError {
  field: string;
  message: string;
}

export interface ApiErrorResponse {
  statusCode: number;
  message: string;
  errors?: FieldError[];
  timestamp: string;
  path: string;
}

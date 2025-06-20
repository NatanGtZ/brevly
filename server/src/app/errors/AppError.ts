export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code?: string;

  constructor(message: string, statusCode = 400, code?: string) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
/**
 * Reusable error utilities. Standardized error shape prevents scattered
 * try/catch handling and gives services + services a predictable envelope.
 */

import { logger } from "./logger";

export type AppErrorCode =
  | "unknown"
  | "not_found"
  | "unauthorized"
  | "forbidden"
  | "validation"
  | "conflict"
  | "network"
  | "service_unavailable";

export class AppError extends Error {
  readonly code: AppErrorCode;
  readonly status: number;
  readonly cause?: unknown;

  constructor(code: AppErrorCode, message: string, opts?: { status?: number; cause?: unknown }) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.status = opts?.status ?? defaultStatus(code);
    this.cause = opts?.cause;
  }
}

function defaultStatus(code: AppErrorCode): number {
  switch (code) {
    case "not_found": return 404;
    case "unauthorized": return 401;
    case "forbidden": return 403;
    case "validation": return 400;
    case "conflict": return 409;
    case "service_unavailable": return 503;
    case "network": return 502;
    default: return 500;
  }
}

export function toAppError(err: unknown): AppError {
  if (err instanceof AppError) return err;
  if (err instanceof Error) return new AppError("unknown", err.message, { cause: err });
  return new AppError("unknown", "Unexpected error", { cause: err });
}

export function formatErrorForClient(err: unknown): { code: AppErrorCode; message: string; status: number } {
  const e = toAppError(err);
  return { code: e.code, message: e.message, status: e.status };
}

export async function safeAsync<T>(fn: () => Promise<T>): Promise<[T, null] | [null, AppError]> {
  try {
    return [await fn(), null];
  } catch (err) {
    const e = toAppError(err);
    logger.error(e.message, { code: e.code, status: e.status });
    return [null, e];
  }
}

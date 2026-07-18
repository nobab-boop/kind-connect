/**
 * Lightweight structured logger. Works in browser and server runtimes.
 * In production, `debug` is silenced.
 */

type LogContext = Record<string, unknown>;

const isProd = typeof process !== "undefined" && process.env.NODE_ENV === "production";

function emit(level: "info" | "warn" | "error" | "debug", message: string, ctx?: LogContext) {
  const payload = { level, message, ...(ctx ?? {}), t: new Date().toISOString() };
  const line = JSON.stringify(payload);
  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else if (level === "debug") console.debug(line);
  else console.log(line);
}

export const logger = {
  info: (message: string, ctx?: LogContext) => emit("info", message, ctx),
  warn: (message: string, ctx?: LogContext) => emit("warn", message, ctx),
  error: (message: string, ctx?: LogContext) => emit("error", message, ctx),
  debug: (message: string, ctx?: LogContext) => {
    if (!isProd) emit("debug", message, ctx);
  },
};

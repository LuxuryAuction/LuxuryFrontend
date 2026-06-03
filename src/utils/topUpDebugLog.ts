/**
 * Debug logging for balance top-up flow. Filter browser console with `[TopUp]`.
 * Remove or gate behind env flag once issues are resolved.
 */

const PREFIX = "[TopUp]";

type TopUpLogData = Record<string, unknown>;

function withTimestamp(step: string, data?: TopUpLogData) {
  return {
    step,
    ts: new Date().toISOString(),
    ...data,
  };
}

export function topUpLog(step: string, data?: TopUpLogData): void {
  if (data !== undefined) {
    console.log(PREFIX, withTimestamp(step, data));
  } else {
    console.log(PREFIX, withTimestamp(step));
  }
}

export function topUpWarn(step: string, data?: TopUpLogData): void {
  if (data !== undefined) {
    console.warn(PREFIX, withTimestamp(step, data));
  } else {
    console.warn(PREFIX, withTimestamp(step));
  }
}

export function topUpError(step: string, error: unknown, data?: TopUpLogData): void {
  const errPayload =
    error instanceof Error
      ? { errorMessage: error.message, errorName: error.name, stack: error.stack }
      : { error };

  console.error(PREFIX, withTimestamp(step, { ...data, ...errPayload }));
}

/** Log form field names only (never log merchantSignature values). */
export function topUpLogWayForPayFields(fields: Record<string, string>): void {
  const safeFields: Record<string, string> = {};
  for (const [key, value] of Object.entries(fields)) {
    if (key.toLowerCase().includes("signature")) {
      safeFields[key] = value ? `[redacted len=${value.length}]` : "";
    } else {
      safeFields[key] = value;
    }
  }
  topUpLog("wayforpay.formFields", { fieldNames: Object.keys(fields), fields: safeFields });
}

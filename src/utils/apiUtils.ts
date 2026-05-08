export function filterApiParams<T extends Record<string, any>>(
  filters: T,
): Record<string, string | string[]> {
  const result: Record<string, string | string[]> = {};

  Object.entries(filters).forEach(([key, value]) => {
    if (!isValidValue(value)) return;

    if (Array.isArray(value)) {
      const validItems = value.filter((item) => isValidValue(item)).map(String);
      if (validItems.length > 0) {
        result[key] = validItems;
      }
    } else if (typeof value === "object") {
      result[key] = JSON.stringify(value);
    } else {
      result[key] = String(value);
    }
  });

  return result;
}

const isValidValue = (value: any): boolean => {
  if (typeof value === "number" && !Number.isFinite(value)) return false;
  if (Array.isArray(value) && value.length === 0) return false;
  if (typeof value === "string" && value.trim() === "") return false;
  return value !== undefined && value !== null && value !== "" && value !== "all";
};
export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, " ");
}


export const formatCurrency = (amount: string | number, symbolPosition: "before" | "after" = "after") => {
  if (typeof amount !== "number" || !amount) {
    return "—";
  }
  
  const formattedNumber = new Intl.NumberFormat("en-US").format(amount);
  
  return symbolPosition === "before" ? `₴${formattedNumber}` : `${formattedNumber} ₴`;
};

export const formatDateTime = (date: string | Date | undefined) => {
  if (!date || date === undefined) {
    return "N/A";
  }
  const d = new Date(date);
  const time = d.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });
  const datePart = d.toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' });
  
  return `${time} ${datePart}`;
};

export const formatDisplayValue = (value: string | undefined | null | unknown): string => {
  if (value === undefined || value === null) return "N/A";
  if (typeof value !== "string") {
    if (typeof value === "object") return "N/A";
    return String(value);
  }
  if (!value.trim()) return "N/A";

  return value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const getTimeAgo = (date: string | Date) => {
  const now = new Date();
  const past = new Date(date);
  const diffInMs = now.getTime() - past.getTime();
  const diffInSecs = Math.floor(diffInMs / 1000);
  const diffInMins = Math.floor(diffInSecs / 60);
  const diffInHours = Math.floor(diffInMins / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSecs < 60) return "Just now";
  if (diffInMins < 60) return `${diffInMins} min ago`;
  if (diffInHours < 24) return `${diffInHours}h ago`;
  if (diffInDays < 7) return `${diffInDays}d ago`;
  return past.toLocaleDateString('uk-UA', { day: 'numeric', month: 'short' });
};
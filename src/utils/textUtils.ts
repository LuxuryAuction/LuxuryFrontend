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

const pad2 = (n: number) => String(n).padStart(2, "0");

export type FormatDateTimeVariant = "compact" | "locale";

export const formatDateTime = (
  date: string | Date | undefined,
  variant: FormatDateTimeVariant = "compact",
) => {
  if (!date) {
    return "N/A";
  }
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) {
    return "N/A";
  }
  if (variant === "locale") {
    const time = d.toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" });
    const datePart = d.toLocaleDateString("uk-UA", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return `${time} ${datePart}`;
  }
  const datePart = `${pad2(d.getDate())}/${pad2(d.getMonth() + 1)}/${d.getFullYear()}`;
  const timePart = `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
  return `${datePart} ${timePart}`;
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

export const getUserDisplayName = (user: {
  firstName: string;
  lastName: string;
  userName: string;
}) => {
  const fullName = `${user.firstName} ${user.lastName}`.trim();
  return fullName || user.userName;
};
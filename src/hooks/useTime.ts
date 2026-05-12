import { useEffect, useState } from "react";

const formatUtcClock = () =>
  new Date().toISOString().replace("T", " ").slice(0, 19) + " UTC";

/**
 * UTC clock for client UI. Initial state is empty so SSR and the first
 * client paint match; time updates only after mount (avoids hydration mismatch).
 */
export const useCurrentUtcTime = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => setTime(formatUtcClock());
    const timeoutId = window.setTimeout(tick, 0);
    const intervalId = window.setInterval(tick, 1000);
    return () => {
      window.clearTimeout(timeoutId);
      window.clearInterval(intervalId);
    };
  }, []);

  return time;
};
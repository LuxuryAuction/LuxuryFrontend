import { useEffect } from "react";

/**
 * Custom hook to scroll the window to the top when a dependency changes (e.g., page number).
 * Uses smooth scrolling on desktop and instant scrolling on mobile to avoid delays.
 * 
 * @param dependency - The value to watch for changes (usually the current page number).
 */
export const usePaginationScroll = (dependency: any) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: window.innerWidth < 768 ? "auto" : "smooth",
    });
  }, [dependency]);
};

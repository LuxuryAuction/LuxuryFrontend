import { useEffect, RefObject } from 'react';

/**
 * Put on portaled UI (e.g. Select dropdown) so document-level outside-click
 * handlers do not treat interactions inside that subtree as "outside".
 */
export const BV_IGNORE_OUTSIDE_CLICK_ATTR = "data-bv-ignore-outside-click";

export function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      const el = ref?.current;
      if (!el || (target && el.contains(target))) {
        return;
      }
      if (
        target instanceof Element &&
        target.closest(`[${BV_IGNORE_OUTSIDE_CLICK_ATTR}]`)
      ) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

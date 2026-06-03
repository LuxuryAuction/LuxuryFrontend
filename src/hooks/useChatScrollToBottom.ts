import { RefObject, useLayoutEffect, useRef } from "react";

type UseChatScrollToBottomOptions = {
  disabled?: boolean;
  /** When true, only scroll if `isLastMessageOwn` is true (still scrolls on first load). */
  onlyWhenLastMessageIsOwn?: boolean;
  isLastMessageOwn?: boolean;
  smooth?: boolean;
};

function scrollContainerToBottom(container: HTMLElement, behavior: ScrollBehavior) {
  if (behavior === "smooth") {
    container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    return;
  }
  container.scrollTop = container.scrollHeight;
}

/**
 * Scrolls a chat message container to the bottom without affecting the page scroll position.
 */
export function useChatScrollToBottom(
  scrollContainerRef: RefObject<HTMLElement | null>,
  messageCount: number,
  lastMessageId: string | undefined,
  options?: UseChatScrollToBottomOptions,
) {
  const isInitialScrollRef = useRef(true);

  useLayoutEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || options?.disabled || messageCount === 0) return;

    const isInitial = isInitialScrollRef.current;
    if (
      !isInitial &&
      options?.onlyWhenLastMessageIsOwn &&
      !options.isLastMessageOwn
    ) {
      return;
    }

    const behavior: ScrollBehavior =
      isInitial ? "auto" : options?.smooth ? "smooth" : "auto";

    scrollContainerToBottom(container, behavior);
    isInitialScrollRef.current = false;
  }, [
    scrollContainerRef,
    messageCount,
    lastMessageId,
    options?.disabled,
    options?.onlyWhenLastMessageIsOwn,
    options?.isLastMessageOwn,
    options?.smooth,
  ]);
}

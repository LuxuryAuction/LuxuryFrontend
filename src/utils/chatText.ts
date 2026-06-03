/** Single-line preview for inbox / conversation list. */
export function collapseChatPreview(text: string, maxLength = 100): string {
  const flat = text.replace(/\r\n/g, "\n").replace(/\n+/g, " ").replace(/\s+/g, " ").trim();
  if (flat.length <= maxLength) return flat;
  return `${flat.slice(0, maxLength)}…`;
}

/** Trim outer whitespace; keep internal line breaks. */
export function normalizeOutgoingChatText(text: string): string {
  return text.replace(/^\s+/, "").replace(/\s+$/, "");
}

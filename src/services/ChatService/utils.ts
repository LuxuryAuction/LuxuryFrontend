/** Backend returns history newest-first; UI renders oldest-first. */
export function sortMessagesChronological<T extends { id: number }>(messages: T[]): T[] {
  return [...messages].sort((a, b) => a.id - b.id);
}

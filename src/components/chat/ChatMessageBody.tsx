interface ChatMessageBodyProps {
  text: string;
  className?: string;
}

export function ChatMessageBody({ text, className = "" }: ChatMessageBodyProps) {
  return (
    <div className={`whitespace-pre-wrap break-words [overflow-wrap:anywhere] ${className}`.trim()}>
      {text}
    </div>
  );
}

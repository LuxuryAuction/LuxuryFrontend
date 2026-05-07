"use client";

import { Avatar } from "@/src/components/common/Avatar";
import Link from "next/link";
import { getTimeAgo } from "@/src/utils/textUtils";
import { IChatMessage } from "../types";
import { useState } from "react";
import { SendIcon } from "@/public/assets/icons";

interface LotChatProps {
  messages: IChatMessage[];
  onSendMessage?: (message: string) => void;
}

export const LotChat = ({ messages, onSendMessage }: LotChatProps) => {
  const [newMessage, setNewMessage] = useState("");

  return (
    <div className="flex flex-col gap-0 p-6 rounded-[16px] bg-surface-secondary/50 border border-border-primary relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-linear-to-r from-brand-primary/40 to-transparent" />

      <div className="flex items-center justify-between pb-4 border-b border-border-primary/30 relative z-10">
        <div className="flex items-center gap-2">
          <div className="h-px w-4 bg-brand-primary/50" />
          <h2 className="text-[10px] font-mono font-bold uppercase tracking-widest text-content-tertiary">
            Community Chat
          </h2>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-surface-tertiary/50 border border-border-primary/50">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse shadow-[0_0_5px_#22c55e]" />
          <span className="text-[9px] text-content-secondary font-mono font-bold">12 online</span>
        </div>
      </div>

      <div className="flex flex-col gap-5 py-5 max-h-[400px] overflow-y-auto pr-2 relative z-10">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center gap-3 opacity-80">
            <div className="w-12 h-12 rounded-full bg-surface-tertiary border border-border-primary flex items-center justify-center shadow-inner">
              <svg className="w-5 h-5 text-content-tertiary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[13px] font-bold text-content-primary">No messages yet</span>
              <span className="text-[11px] text-content-tertiary">Be the first to ask a question!</span>
            </div>
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.userName === "You";
            const isSeller = msg.role === "seller";

            return (
              <div key={msg.id} className={`flex gap-3 group w-full ${isMe ? "flex-row-reverse" : ""}`}>
                <Link href={`/user/profile/${msg.userName}`} className="shrink-0 hover:opacity-80 transition-opacity cursor-pointer">
                  <Avatar name={msg.userName} src={msg.userAvatar} size="sm" className="mt-1" />
                </Link>
                <div className={`flex flex-col gap-1 min-w-0 max-w-[85%] ${isMe ? "items-end" : "items-start"}`}>
                  <div className={`flex items-baseline gap-2 ${isMe ? "flex-row-reverse" : ""}`}>
                    <div className={`flex items-center gap-2 ${isMe ? "flex-row-reverse" : ""}`}>
                      <Link href={`/user/profile/${msg.userName}`} className="text-[13px] font-bold text-content-primary hover:text-brand-primary transition-colors cursor-pointer hover:underline underline-offset-4">
                        {msg.userName}
                      </Link>
                      {isSeller && (
                        <span className="px-1.5 py-px rounded bg-brand-primary/10 text-brand-primary text-[9px] font-bold uppercase tracking-wider border border-brand-primary/20">
                          Seller
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-content-tertiary font-mono" suppressHydrationWarning>
                      {getTimeAgo(msg.timestamp)}
                    </span>
                  </div>
                  <div className={`p-3.5 mt-1 rounded-2xl text-[13px] leading-relaxed shadow-sm break-words
                  ${isMe ? "rounded-tr-sm bg-surface-tertiary border border-border-primary text-content-primary" :
                      isSeller ? "rounded-tl-sm bg-brand-primary/10 border border-brand-primary/20 text-content-primary" :
                        "rounded-tl-sm bg-surface-primary/40 border border-border-primary/50 text-content-secondary"}
                `}>
                    {msg.message}
                  </div>
                </div>
              </div>
            );
          }))}
      </div>

      <div className="flex items-center gap-3 mt-1 pt-4 border-t border-border-primary/30 relative z-10">
        <div className="flex-1 flex items-center gap-3 p-1.5 pl-4 rounded-xl bg-surface-tertiary/50 border border-border-primary focus-within:border-brand-primary/50 focus-within:bg-surface-primary transition-all group/input">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && newMessage.trim() && onSendMessage) {
                onSendMessage(newMessage.trim());
                setNewMessage("");
              }
            }}
            placeholder="Ask the seller a question..."
            className="flex-1 bg-transparent border-none outline-none text-content-primary text-[13px] placeholder:text-content-tertiary/70"
          />
          <button
            className="w-9 h-9 shrink-0 flex items-center justify-center rounded-lg bg-brand-primary text-black hover:bg-brand-primary/90 active:scale-95 transition-all shadow-[0_0_15px_rgba(240,165,0,0.15)] group-focus-within/input:shadow-[0_0_20px_rgba(240,165,0,0.3)] cursor-pointer"
            onClick={() => {
              if (newMessage.trim() && onSendMessage) {
                onSendMessage(newMessage.trim());
                setNewMessage("");
              }
            }}
          >
            <SendIcon className="w-4 h-4 translate-x-[-1px] translate-y-[1px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

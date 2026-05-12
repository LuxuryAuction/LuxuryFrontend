"use client";

import { INotification, NotificationType } from "../types";
import { getTimeAgo } from "@/src/utils/textUtils";
import { Link } from "@/src/i18n/navigation";

const TYPE_CONFIG: Record<NotificationType, { icon: string; color: string; bg: string }> = {
  outbid: { icon: "⚡", color: "text-[#f0a500]", bg: "bg-[#f0a500]/10" },
  win: { icon: "🏆", color: "text-green-400", bg: "bg-green-400/10" },
  bid: { icon: "💰", color: "text-blue-400", bg: "bg-blue-400/10" },
  approval: { icon: "✅", color: "text-brand-primary", bg: "bg-brand-primary/10" },
  payment: { icon: "💳", color: "text-purple-400", bg: "bg-purple-400/10" },
  system: { icon: "ℹ", color: "text-gray-400", bg: "bg-gray-400/10" },
  ended: { icon: "🔔", color: "text-orange-400", bg: "bg-orange-400/10" },
};

interface NotificationItemProps {
  notification: INotification;
  onMarkAsRead: (id: string) => void;
  index: number;
}

export const NotificationItem = ({ notification, onMarkAsRead, index }: NotificationItemProps) => {
  const config = TYPE_CONFIG[notification.type];

  const formatMessage = (msg: string) => {
    return msg.split(/(".*?"|₴\d+(?:,\d+)*)/g).map((part, i) => {
      if (part.startsWith('"') || part.startsWith('₴')) {
        return <span key={i} className="text-white font-semibold">{part}</span>;
      }
      return part;
    });
  };

  return (
    <div
      onClick={() => onMarkAsRead(notification.id)}
      className={`group relative p-6 transition-all duration-500 flex gap-5 cursor-pointer overflow-hidden animate-bvCatFadeUp ${!notification.isRead
        ? "bg-brand-primary/[0.015] hover:bg-brand-primary/[0.03]"
        : "bg-transparent hover:bg-white/[0.02]"
        }`}
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="absolute inset-0 -translate-x-full group-hover:animate-[bvShimmer_1s_ease-in-out] bg-gradient-to-r from-transparent via-white/[0.03] to-transparent pointer-events-none" />

      {!notification.isRead && (
        <>
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-brand-primary shadow-[0_0_15px_rgba(240,165,0,0.8)] z-10" />
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-brand-primary/5 to-transparent pointer-events-none" />
        </>
      )}

      <div className="relative shrink-0">
        <div className={`w-12 h-12 rounded-2xl ${config.bg} flex items-center justify-center text-xl relative z-10 border border-white/[0.05] shadow-inner group-hover:animate-bvFloat`}>
          <span className={`${config.color} filter drop-shadow-[0_0_8px_currentColor]`}>{config.icon}</span>
        </div>
        {!notification.isRead && (
          <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full bg-brand-primary border-2 border-[#0d0f14] z-20 shadow-[0_0_8px_rgba(240,165,0,0.5)] animate-bvPulseSoft`} />
        )}
      </div>


      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-4 mb-1.5">
          <div className="flex flex-col gap-0.5">
            <h3 className={`font-bold text-[15px] leading-tight transition-colors ${notification.isRead ? "text-content-secondary" : "text-white group-hover:text-brand-primary"
              }`}>
              {notification.title}
            </h3>
            <span className="font-mono text-[9px] text-brand-primary/50 uppercase tracking-[0.15em]">
              {notification.type.replace("-", " ")}
            </span>
          </div>
          <span className="font-mono text-[9px] text-content-tertiary uppercase tracking-wider whitespace-nowrap opacity-60 group-hover:opacity-100 transition-opacity">
            {getTimeAgo(notification.timestamp)}
          </span>
        </div>

        <p className="text-[13px] text-content-tertiary leading-relaxed mb-4 line-clamp-2">
          {formatMessage(notification.message)}
        </p>

        {notification.actionUrl && (
          <div className="flex items-center justify-between">
            <Link
              href={notification.actionUrl}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-primary hover:gap-3 transition-all group/link"
            >
              <span className="relative">
                {notification.type === "outbid" ? "Place new bid" :
                  notification.type === "win" ? "Complete Payment" : "View Details"}
                <div className="absolute -bottom-1 left-0 right-0 h-px bg-brand-primary/0 group-hover/link:bg-brand-primary/30 transition-all" />
              </span>
              <svg className="w-3 h-3 transition-transform group-hover/link:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>

            {!notification.isRead && (
              <span className="text-[9px] font-mono text-content-tertiary opacity-0 group-hover:opacity-40 transition-opacity uppercase tracking-tighter">
                Click to read
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

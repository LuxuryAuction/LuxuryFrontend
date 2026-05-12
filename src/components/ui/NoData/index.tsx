import React from "react";

export type NoDataVariant = "default" | "admin";

interface NoDataProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
  variant?: NoDataVariant;
}

const VARIANT_CLASS: Record<
  NoDataVariant,
  {
    glow: string;
    frameAccent: string;
    pulseDot: string;
    cornerBlob: string;
    descriptionAccent: string;
    hint: string;
  }
> = {
  default: {
    glow: "bg-brand-primary/20",
    frameAccent:
      "border border-brand-primary/20 from-brand-primary/10 to-transparent",
    pulseDot: "bg-brand-primary/30",
    cornerBlob: "bg-blue-500/20",
    descriptionAccent: "text-brand-primary/60",
    hint: "text-content-tertiary",
  },
  admin: {
    glow: "bg-admin-accent/20",
    frameAccent:
      "border border-admin-accent/25 from-admin-accent/12 to-transparent",
    pulseDot: "bg-admin-accent/35",
    cornerBlob: "bg-admin-accent/18",
    descriptionAccent: "text-admin-accent/65",
    hint: "text-white/45",
  },
};

export const NoData = ({
  title,
  description = "No data found in this category",
  icon = "📭",
  className = "",
  action,
  variant = "default",
}: NoDataProps) => {
  const v = VARIANT_CLASS[variant];

  return (
    <div className={`flex flex-col items-center justify-center py-20 px-6 text-center animate-bvCatFadeUp ${className}`}>
      <div className="relative mb-10 group">
        <div className={`absolute inset-0 ${v.glow} blur-[60px] rounded-full -z-10 animate-pulse`} />

        <div className="relative w-24 h-24 flex items-center justify-center">
          <div className="absolute inset-0 bg-linear-to-br from-white/10 to-white/2 border border-white/10 rounded-[32px] rotate-6 group-hover:rotate-0 transition-all duration-700 backdrop-blur-md shadow-2xl" />
          <div
            className={`absolute inset-0 bg-linear-to-br ${v.frameAccent} rounded-[32px] -rotate-6 group-hover:rotate-0 transition-all duration-700 delay-75`}
          />

          <div className="relative text-4xl animate-float drop-shadow-2xl">
            {icon}
          </div>
        </div>

        <div className={`absolute -top-2 -right-2 w-4 h-4 ${v.pulseDot} rounded-full blur-md animate-bounce`} />
        <div className={`absolute -bottom-4 -left-2 w-6 h-6 ${v.cornerBlob} rounded-full blur-lg animate-pulse`} />
      </div>

      <div className="max-w-md mx-auto space-y-3">
        <h3 className="text-xl font-black tracking-tight text-white/90">
          {title || "Nothing here yet"}
        </h3>

        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-8 bg-linear-to-r from-transparent to-white/10" />
          <p className={`text-[10px] font-mono font-medium uppercase tracking-[0.3em] ${v.descriptionAccent}`}>
            {description}
          </p>
          <div className="h-px w-8 bg-linear-to-l from-transparent to-white/10" />
        </div>


        {action && (
          <div className="pt-6 flex justify-center animate-bvCatFadeUp" style={{ animationDelay: "0.2s" }}>
            {action}
          </div>
        )}
      </div>
    </div>
  );
};

export default NoData;

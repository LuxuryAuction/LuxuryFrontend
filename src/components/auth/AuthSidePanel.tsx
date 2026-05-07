import React from "react";

interface AuthSidePanelProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
}

const AuthSidePanel: React.FC<AuthSidePanelProps> = ({ title, subtitle }) => {
  return (
    <div className="flex-1 border-r border-border-primary items-center justify-center relative overflow-hidden hidden lg:flex h-full">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(240,164,0,0.06)_0%,_transparent_60%)] pointer-events-none" />
      
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Layer 1: Forward Marquee */}
        <div className="absolute top-[5%] left-0 w-[200%] overflow-hidden opacity-40">
          <div className="flex w-max animate-bvMarquee whitespace-nowrap" style={{ animationDuration: "35s" }}>
            <div className="text-[18vw] font-extrabold text-[rgba(240,164,0,0.08)] mr-[10vw] select-none">
              Luxury
            </div>
            <div className="text-[18vw] font-extrabold text-[rgba(240,164,0,0.08)] mr-[10vw] select-none">
              Luxury
            </div>
          </div>
        </div>

        {/* Layer 2: Reverse Marquee with Text Stroke */}
        <div className="absolute top-[35%] left-0 w-[200%] overflow-hidden opacity-30">
          <div className="flex w-max animate-bvMarquee whitespace-nowrap" style={{ animationDuration: "45s", animationDirection: "reverse" }}>
            <div className="text-[14vw] font-extrabold text-transparent mr-[10vw] select-none" style={{ WebkitTextStroke: "2px rgba(240,164,0,0.12)" }}>
              Exclusive Bids
            </div>
            <div className="text-[14vw] font-extrabold text-transparent mr-[10vw] select-none" style={{ WebkitTextStroke: "2px rgba(240,164,0,0.12)" }}>
              Exclusive Bids
            </div>
          </div>
        </div>

        {/* Layer 3: Forward Marquee Bottom */}
        <div className="absolute bottom-[-10%] left-0 w-[200%] overflow-hidden opacity-70">
          <div className="flex w-max animate-bvMarquee whitespace-nowrap" style={{ animationDuration: "50s" }}>
            <div className="text-[30vw] font-extrabold text-[rgba(240,164,0,0.08)] mr-[12vw] select-none">
              Auction
            </div>
            <div className="text-[30vw] font-extrabold text-[rgba(240,164,0,0.08)] mr-[12vw] select-none">
              Auction
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Overlay for blending */}
      <div className="absolute inset-0 bg-gradient-to-t from-auth-primary via-transparent to-auth-primary opacity-60 pointer-events-none" />

      <div className="text-center z-10 p-8">
        <div className="text-[5.2rem] leading-[0.95] font-extrabold tracking-tight text-white mb-6 drop-shadow-2xl">
          {title}
        </div>
        {subtitle && (
          <div className="text-sm text-content-tertiary">
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthSidePanel;

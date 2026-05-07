export const CollapseToggle = ({
  isCollapsed,
  onToggle,
}: {
  isCollapsed: boolean;
  onToggle: () => void;
}) => {
  return (
    <button
      onClick={onToggle}
      aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      className={
        "absolute -right-[12px] top-[115px] z-10 cursor-pointer " +
        "w-6 h-6 flex items-center justify-center rounded-full " +
        "bg-[#1c1f27] border border-border-primary " +
        "text-[#4a5270] hover:text-brand-primary hover:border-brand-primary/40 " +
        "shadow-[0_2px_8px_rgba(0,0,0,0.4)] " +
        "transition-all duration-200 " +
        "hidden md:flex"
      }
    >
      <svg
        className={
          "w-3 h-3 transition-transform duration-300 " +
          (isCollapsed ? "rotate-180" : "")
        }
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <polyline points="15 18 9 12 15 6" />
      </svg>
    </button>
  );
};
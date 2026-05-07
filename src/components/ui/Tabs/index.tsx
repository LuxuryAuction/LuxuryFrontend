"use client";

export interface TabOption<T extends string = string> {
  id: T;
  label: string;
  icon?: React.ReactNode;
}

export interface TabsProps<T extends string = string> {
  tabs: TabOption<T>[];
  activeTab: T;
  onChange: (tabId: T) => void;
  variant?: "line" | "pill" | "switcher";
  className?: string;
}

export const Tabs = <T extends string = string>({
  tabs,
  activeTab,
  onChange,
  variant = "line",
  className = "",
}: TabsProps<T>) => {
  if (variant === "switcher") {
    return (
      <div
        className={`flex gap-1 p-1 rounded-xl bg-surface-secondary border border-border-primary ${className}`}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold uppercase tracking-widest rounded-lg transition-all cursor-pointer ${
              activeTab === tab.id
                ? "bg-brand-primary text-black shadow-lg shadow-brand-primary/20"
                : "text-content-tertiary hover:text-content-primary"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
    );
  }

  if (variant === "pill") {
    return (
      <div className={`flex flex-wrap items-center gap-2 ${className}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap border ${
              activeTab === tab.id
                ? "bg-brand-primary/10 text-brand-primary border-brand-primary/20"
                : "bg-surface-secondary text-content-tertiary border-border-primary hover:text-content-primary hover:border-border-secondary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={`flex border-b border-border-primary overflow-x-auto ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={
            "px-5 py-[0.7rem] text-[0.78rem] font-medium whitespace-nowrap border-b-2 transition-all cursor-pointer " +
            (activeTab === tab.id
              ? "text-brand-primary border-brand-primary"
              : "text-content-tertiary border-transparent hover:text-content-light")
          }
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;

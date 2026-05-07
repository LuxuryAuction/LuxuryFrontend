
interface SectionProps {
  step: number;
  title: string;
  description: string;
  children: React.ReactNode;
}

export const Section = ({ step, title, description, children }: SectionProps) => {
  return (
    <div className="relative flex gap-6 md:gap-8">
      <div className="hidden md:flex flex-col items-center gap-1 pt-1">
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#F0A50014] border border-[#F0A50030] text-brand-primary font-mono text-xs font-bold shrink-0">
          {step}
        </div>
        <div className="flex-1 w-px bg-gradient-to-b from-[#F0A50020] to-transparent min-h-[2rem]" />
      </div>
      <div className="flex-1 bg-surface-secondary border border-border-primary rounded-2xl p-5 md:p-6 mb-6 hover:border-[#F0A50020] transition-colors duration-300">
        <div className="mb-5">
          <h2 className="text-content-primary font-semibold text-md mb-1">{title}</h2>
          <p className="text-content-tertiary text-xs font-mono uppercase tracking-wider">{description}</p>
        </div>
        {children}
      </div>
    </div>
  );
};

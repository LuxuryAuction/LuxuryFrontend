import { SortIcon } from "@/public/assets/icons";
import Input from "@/src/components/ui/Input";

export const FilterBar = () => {
  return (
    <div
      className="flex justify-end items-center gap-3 mb-6 animate-bvCatFadeUp [animation-delay:0.12s]"
    >
      <div className="flex-1 min-w-[200px] md:max-w-[280px]">
        <Input
          type="search"
          placeholder="Search sellers…"
          inputSize="sm"
          variant="secondary"
        />
      </div>

      <div
        className="flex items-center gap-2 p-[10px] rounded-[8px] font-mono text-[10px] tracking-[0.1em] uppercase cursor-pointer bg-surface-primary border border-border-primary text-content-tertiary hover:border-border-secondary hover:text-content-secondary transition-all"
      >
        <SortIcon className="w-3.5 h-3.5" />
        <span className="hidden sm:block"> Sort: Most Sales</span>
      </div>
    </div>
  );
};

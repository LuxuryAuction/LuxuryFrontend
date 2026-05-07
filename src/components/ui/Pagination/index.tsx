import { ChevronLeftIcon, ChevronRightIcon } from "@/public/assets/icons";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({ currentPage, totalPages, onPageChange, className = "" }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="w-10 h-10 flex items-center justify-center rounded-xl border border-border-primary text-content-secondary hover:text-brand-primary hover:border-brand-primary/50 disabled:opacity-50 disabled:hover:text-content-secondary disabled:hover:border-border-primary transition-colors bg-surface-secondary cursor-pointer"
      >
        <ChevronLeftIcon className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-1 font-mono text-sm">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200 cursor-pointer
              ${currentPage === page
                ? "bg-brand-primary text-black font-semibold shadow-[0_0_15px_rgba(240,165,0,0.3)]"
                : "text-content-secondary hover:text-brand-primary hover:bg-surface-secondary border border-transparent hover:border-border-primary"
              }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="w-10 h-10 flex items-center justify-center rounded-xl border border-border-primary text-content-secondary hover:text-brand-primary hover:border-brand-primary/50 disabled:opacity-50 disabled:hover:text-content-secondary disabled:hover:border-border-primary transition-colors bg-surface-secondary cursor-pointer"
      >
        <ChevronRightIcon className="w-5 h-5" />
      </button>
    </div>
  );
}

import { formatCurrency, formatDateTime } from "@/src/utils/textUtils";
import { ICreateLotFormData } from "../types";
import { ICategory } from "@/src/services/CategoriesService/types";

export const PreviewCard = ({ form, categories }: { form: ICreateLotFormData; categories: ICategory[] }) => {

  const coverUrl = form.images.length > 0 ? URL.createObjectURL(form.images[0]) : "";

  return (
    <div className="bg-surface-secondary border border-border-primary rounded-2xl overflow-hidden shadow-lg shadow-black/20 flex flex-col">
      <div className="aspect-[4/3] bg-surface-primary relative overflow-hidden flex items-center justify-center">
        {coverUrl ? (
          <img src={coverUrl} alt="Preview cover" className="w-full h-full object-cover" />
        ) : (
          <div className="text-content-tertiary flex flex-col items-center gap-2">
            <svg className="w-8 h-8 opacity-50" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-xs font-mono uppercase tracking-wider">No Image</span>
          </div>
        )}
        <div className="absolute top-3 left-3 flex gap-2">
          {form.categoryId && (
            <span className="bg-[#1c1f27]/90 backdrop-blur text-content-primary text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-md border border-border-primary">
              {categories.find(c => String(c.id) === form.categoryId)?.name || form.categoryId}
            </span>
          )}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-content-primary font-semibold text-[17px] line-clamp-2 leading-tight mb-3 break-words">
          {form.title || "Lot Title Preview"}
        </h3>

        <div className="flex items-center gap-2 mb-5 text-xs text-content-tertiary font-mono uppercase tracking-wider">
          <svg className="w-3.5 h-3.5 text-brand-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          {form.startDate ? formatDateTime(form.startDate) : "Not scheduled"}
        </div>

        <div className="mt-auto pt-4 border-t border-border-primary flex items-end justify-between">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-wider text-content-tertiary mb-1">Starting Price</p>
            <p className="text-brand-primary font-semibold text-xl leading-none">
              {formatCurrency(form.startingPrice)}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase tracking-wider text-content-tertiary mb-1">Min. Step</p>
            <p className="text-content-primary font-medium text-sm leading-none">
              {formatCurrency(form.minBidIncrement)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

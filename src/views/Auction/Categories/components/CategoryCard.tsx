import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/public/assets/icons";
import { ICategory } from "@/src/services/CategoriesService/types";

interface CategoryCardProps {
  category: ICategory;
  index: number;
}

export const CategoryCard = ({ category, index }: CategoryCardProps) => {

  return (
    <Link
      href={`/user/auctions/${category.id}`}
      className="group relative flex flex-col overflow-hidden rounded-[12px] cursor-pointer bg-surface-primary border border-border-primary transition-all duration-220 ease-in-out opacity-0 translate-y-4 hover:border-brand-primary/30 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5),0_0_0_1px_rgba(240,164,0,0.15)] animate-bvCatFadeUp"
      style={{
        animationDelay: `${0.05 + index * 0.07}s`,
      }}
    >
      <div className="relative overflow-hidden aspect-4/5">
        <div className="absolute inset-0 bg-linear-to-br from-[#13151a] to-[#0f1219]" />

        {category.image && (
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover object-[center_15%] transition-transform duration-500 scale-100 group-hover:scale-105"
          />
        )}

        <div className="absolute inset-0 bg-linear-to-b from-[rgba(11,13,16,0.1)] to-[rgba(11,13,16,0.7)]" />

        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-[5px] rounded-full font-mono text-[9px] tracking-[0.12em] uppercase bg-[rgba(9,11,16,0.75)] border border-[rgba(42,46,58,0.8)] text-content-secondary">
          <span className="w-[4px] h-[4px] rounded-full shrink-0 bg-brand-primary" />
          Активно лотів MOCKED
        </div>


        <div className="absolute top-0 left-0 right-0 h-[1.5px] origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100 bg-linear-to-r from-brand-primary to-transparent" />
      </div>

      <div className="flex flex-col flex-1 px-4 pt-3.5 pb-4">
        <h3 className="font-semibold text-[15px] leading-tight mb-1.5 transition-colors duration-150 text-content-primary tracking-[-0.01em]">
          {category.name}
        </h3>
        <p className="text-[12px] leading-relaxed flex-1 text-content-secondary">
          {category.shortDescription}
        </p>

        <div className="flex items-center justify-between mt-3.5 pt-3 border-t border-border-primary/50">
          <span className="font-mono text-[10px] tracking-widest uppercase transition-colors duration-150 text-content-tertiary">
            View lots
          </span>
          <ArrowRightIcon className="w-4 h-4 transition-all duration-200 group-hover:translate-x-1 text-content-tertiary" />
        </div>
      </div>
    </Link>
  );
};

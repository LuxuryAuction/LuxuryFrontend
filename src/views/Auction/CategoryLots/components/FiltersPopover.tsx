"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Select } from "@/src/components/ui/Select";
import { PriceSlider } from "@/src/components/ui/PriceSlider";
import { SIZE_OPTIONS } from "../../CreateLot/createLotConfig";
import { buildConditionOptions } from "@/src/constants/itemCondition";
import { buildSexOptions } from "@/src/constants/lotSex";

interface FiltersPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: {
    sex: string;
    size: string;
    condition: string;
    minPrice: number;
    maxPrice: number;
  }) => void;
  initialFilters: {
    sex: string;
    size: string;
    condition: string;
    minPrice: number;
    maxPrice: number;
  };
}

type FiltersPopoverPanelProps = Omit<FiltersPopoverProps, "isOpen">;

function FiltersPopoverPanel({
  onClose,
  onApply,
  initialFilters,
}: FiltersPopoverPanelProps) {
  const t = useTranslations("CategoryLotsPage.filtersPanel");
  const tCondition = useTranslations("ItemCondition");
  const tSex = useTranslations("ItemSex");
  const conditionOptions = useMemo(
    () => buildConditionOptions((key) => tCondition(key)),
    [tCondition],
  );
  const sexOptions = useMemo(
    () => buildSexOptions((key) => tSex(key)),
    [tSex],
  );
  const [localSex, setLocalSex] = useState(initialFilters.sex);
  const [localSize, setLocalSize] = useState(initialFilters.size);
  const [localCondition, setLocalCondition] = useState(initialFilters.condition);
  const [localMinPrice, setLocalMinPrice] = useState(initialFilters.minPrice);
  const [localMaxPrice, setLocalMaxPrice] = useState(initialFilters.maxPrice);

  const handleApply = () => {
    onApply({
      sex: localSex,
      size: localSize,
      condition: localCondition,
      minPrice: localMinPrice,
      maxPrice: localMaxPrice,
    });
    onClose();
  };

  const handleReset = () => {
    const defaultFilters = {
      sex: "",
      size: "",
      condition: "",
      minPrice: 0,
      maxPrice: 100000,
    };
    setLocalSex(defaultFilters.sex);
    setLocalSize(defaultFilters.size);
    setLocalCondition(defaultFilters.condition);
    setLocalMinPrice(defaultFilters.minPrice);
    setLocalMaxPrice(defaultFilters.maxPrice);

    onApply(defaultFilters);
    onClose();
  };

  return (
    <div className="absolute top-14 right-0 z-100 w-[320px] bg-[#1c1f27]/98 backdrop-blur-xl border border-[#2a2e3a] rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.7)] animate-bvCatFadeUp origin-top-right max-h-[85vh] flex flex-col">
      <div className="bg-[#242835]/50 px-5 py-3.5 border-b border-[#2a2e3a] flex items-center justify-between shrink-0 rounded-t-2xl">
        <h3 className="font-semibold text-content-primary text-[14px] tracking-tight">{t("title")}</h3>
        <button
          onClick={handleReset}
          className="px-2 py-1 rounded-md bg-brand-primary/10 text-[9px] font-mono uppercase tracking-wider text-brand-primary hover:bg-brand-primary/20 transition-all active:scale-95 cursor-pointer"
        >
          {t("reset")}
        </button>
      </div>

      <div className="px-5 pb-10 pt-5 space-y-4 ">
        <Select
          label={t("sexLabel")}
          options={[{ value: "", label: t("optionAll") }, ...sexOptions]}
          value={localSex}
          onChange={setLocalSex}
        />
        <Select
          label={t("sizeLabel")}
          options={[{ value: "", label: t("optionAll") }, ...SIZE_OPTIONS]}
          value={localSize}
          onChange={setLocalSize}
        />
        <Select
          label={t("conditionLabel")}
          options={[{ value: "", label: t("optionAll") }, ...conditionOptions]}
          value={localCondition}
          onChange={setLocalCondition}
        />

        <PriceSlider
          label={t("priceRangeLabel")}
          min={0}
          max={100000}
          step={500}
          minVal={localMinPrice}
          maxVal={localMaxPrice}
          onChange={(vals) => {
            setLocalMinPrice(vals.min);
            setLocalMaxPrice(vals.max);
          }}
        />
      </div>

      <div className="p-4 bg-[#242835]/30 border-t border-[#2a2e3a] shrink-0 rounded-b-2xl">
        <button
          onClick={handleApply}
          className="w-full py-3 bg-brand-primary text-black font-bold rounded-xl text-sm transition-all hover:brightness-110 active:scale-[0.98] shadow-lg shadow-brand-primary/10 cursor-pointer"
        >
          {t("apply")}
        </button>
      </div>
    </div>
  );
}

export const FiltersPopover = ({ isOpen, ...rest }: FiltersPopoverProps) => {
  if (!isOpen) return null;
  return <FiltersPopoverPanel {...rest} />;
};

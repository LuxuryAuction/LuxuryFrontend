"use client";

import { useState, useEffect } from "react";
import { Select } from "@/src/components/ui/Select";
import { Input } from "@/src/components/ui/Input";
import { PriceSlider } from "@/src/components/ui/PriceSlider";
import { SEX_OPTIONS, SIZE_OPTIONS, CONDITION_OPTIONS } from "../../CreateLot/createLotConfig";

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

export const FiltersPopover = ({
  isOpen,
  onClose,
  onApply,
  initialFilters,
}: FiltersPopoverProps) => {
  const [localSex, setLocalSex] = useState(initialFilters.sex);
  const [localSize, setLocalSize] = useState(initialFilters.size);
  const [localCondition, setLocalCondition] = useState(initialFilters.condition);
  const [localMinPrice, setLocalMinPrice] = useState(initialFilters.minPrice);
  const [localMaxPrice, setLocalMaxPrice] = useState(initialFilters.maxPrice);

  useEffect(() => {
    if (isOpen) {
      setLocalSex(initialFilters.sex);
      setLocalSize(initialFilters.size);
      setLocalCondition(initialFilters.condition);
      setLocalMinPrice(initialFilters.minPrice);
      setLocalMaxPrice(initialFilters.maxPrice);
    }
  }, [isOpen, initialFilters]);

  if (!isOpen) return null;

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
      brand: "",
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
    <div className="absolute top-14 right-0 z-100 w-[320px] bg-[#1c1f27]/98 backdrop-blur-xl border border-[#2a2e3a] rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.7)] animate-bvCatFadeUp origin-top-right max-h-[85vh] flex flex-col">
      <div className="bg-[#242835]/50 px-5 py-3.5 border-b border-[#2a2e3a] flex items-center justify-between shrink-0">
        <h3 className="font-semibold text-content-primary text-[14px] tracking-tight">Search Filters</h3>
        <button
          onClick={handleReset}
          className="px-2 py-1 rounded-md bg-brand-primary/10 text-[9px] font-mono uppercase tracking-wider text-brand-primary hover:bg-brand-primary/20 transition-all active:scale-95 cursor-pointer"
        >
          Reset
        </button>
      </div>

      <div className="px-5 py-3 space-y-4 overflow-y-auto overflow-x-hidden">
        <Select
          label="Sex / Gender"
          options={[{ value: "", label: "All" }, ...SEX_OPTIONS]}
          value={localSex}
          onChange={setLocalSex}
        />
        <Select
          label="Item Size"
          options={[{ value: "", label: "All" }, ...SIZE_OPTIONS]}
          value={localSize}
          onChange={setLocalSize}
        />
        <Select
          label="Condition (Rating)"
          options={[{ value: "", label: "All" }, ...CONDITION_OPTIONS]}
          value={localCondition}
          onChange={setLocalCondition}
        />

        <PriceSlider
          label="Price Range (₴)"
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

      <div className="p-4 bg-[#242835]/30 border-t border-[#2a2e3a] shrink-0">
        <button
          onClick={handleApply}
          className="w-full py-3 bg-brand-primary text-black font-bold rounded-xl text-sm transition-all hover:brightness-110 active:scale-[0.98] shadow-lg shadow-brand-primary/10 cursor-pointer"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

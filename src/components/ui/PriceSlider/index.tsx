"use client";

import { useCallback, useEffect, useState, useRef } from "react";

interface PriceSliderProps {
  min: number;
  max: number;
  step?: number;
  minVal: number;
  maxVal: number;
  onChange: (vals: { min: number; max: number }) => void;
  label?: string;
  currencySymbol?: string;
}

export const PriceSlider = ({
  min,
  max,
  step = 1,
  minVal,
  maxVal,
  onChange,
  label,
  currencySymbol = "₴",
}: PriceSliderProps) => {
  const [minValState, setMinValState] = useState(minVal);
  const [maxValState, setMaxValState] = useState(maxVal);
  const range = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMinValState(minVal);
  }, [minVal]);

  useEffect(() => {
    setMaxValState(maxVal);
  }, [maxVal]);

  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    const minPercent = getPercent(minValState);
    const maxPercent = getPercent(maxValState);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minValState, maxValState, getPercent]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        {label && (
          <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-content-tertiary">
            {label}
          </label>
        )}
        <div className="font-mono text-[11px] font-bold text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded-md border border-brand-primary/20">
          {currencySymbol}{minValState.toLocaleString()} — {currencySymbol}{maxValState.toLocaleString()}
        </div>
      </div>

      <div className="relative h-1.5 w-full bg-[#242835] rounded-full mt-1 mb-1">
        <div
          ref={range}
          className="absolute h-full bg-brand-primary rounded-full transition-shadow duration-300 shadow-[0_0_10px_rgba(240,165,0,0.3)]"
        />

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minValState}
          onChange={(event) => {
            const value = Math.min(Number(event.target.value), maxValState - step);
            setMinValState(value);
            onChange({ min: value, max: maxValState });
          }}
          className={`thumb pointer-events-none absolute h-0 w-full outline-none top-1/2 -translate-y-1/2 z-[10] ${minValState > max - (max - min) / 2 ? "z-[11]" : ""}`}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxValState}
          onChange={(event) => {
            const value = Math.max(Number(event.target.value), minValState + step);
            setMaxValState(value);
            onChange({ min: minValState, max: value });
          }}
          className="thumb pointer-events-none absolute h-0 w-full outline-none top-1/2 -translate-y-1/2 z-[10]"
        />

        <div className="absolute top-6 left-0 right-0 flex justify-between font-mono text-[9px] text-content-tertiary uppercase tracking-widest opacity-50">
          <span>{currencySymbol}{min.toLocaleString()}</span>
          <span>{currencySymbol}{max.toLocaleString()}</span>
        </div>
      </div>

    </div>
  );
};

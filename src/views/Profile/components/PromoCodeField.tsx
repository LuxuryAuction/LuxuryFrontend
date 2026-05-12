import { useState } from "react";
import { Input } from "@/src/components/ui/Input";
import { Button } from "@/src/components/ui/Button";

interface PromoCodeFieldProps {
  onApply: (code: string) => void;
  promoBonus: number;
}

export const PromoCodeField = ({ onApply, promoBonus }: PromoCodeFieldProps) => {
  const [promoCode, setPromoCode] = useState("");
  const [showPromoInput, setShowPromoInput] = useState(false);

  return (
    <div className="my-3">
      {!showPromoInput && promoBonus === 0 ? (
        <button 
          type="button"
          onClick={() => setShowPromoInput(true)}
          className="text-[0.7rem] text-content-tertiary hover:text-brand-primary transition-colors font-medium underline underline-offset-4 cursor-pointer"
        >
          I have a promo code
        </button>
      ) : (
        <div className="animate-bvFadeIn">
          <label className="font-mono text-[0.6rem] uppercase tracking-widest text-content-tertiary block mb-2">
            Promo Code
          </label>
          <div className="flex gap-2">
            <Input
              placeholder="Enter code"
              value={promoCode}
              onChange={setPromoCode}
              className="flex-1"
              inputSize="sm"
            />
            <Button 
              variant="secondary" 
              className="px-4 h-[40px] text-xs" 
              onClick={() => onApply(promoCode)}
              disabled={!promoCode}
            >
              Apply
            </Button>
          </div>
          {promoBonus > 0 && (
            <div className="mt-2 text-[0.7rem] font-medium text-[#22c55e] flex items-center gap-1.5">
              <span className="flex h-1 w-1 rounded-full bg-[#22c55e]" />
              Code Applied: +{promoBonus}%
            </div>
          )}
        </div>
      )}
    </div>
  );
};

import { TickIcon } from "@/public/assets/icons";
import { Button } from "@/src/components/ui/Button";

interface LotPublishedProps {
  title: string;
  reset: () => void;
  setSubmitted: (submitted: boolean) => void;
}

export const LotPublished: React.FC<LotPublishedProps> = ({ title, reset, setSubmitted }) => {
  return (
    <div className="p-5 md:p-7 flex flex-col items-center justify-center min-h-[60vh] gap-6 animate-bvCatFadeUp">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-[#F0A50012] border border-[#F0A50030]">
        <TickIcon className="text-brand-primary w-9 h-9" />
      </div>
      <div className="text-center max-w-sm">
        <h2 className="text-content-primary text-2xl font-extrabold tracking-tight mb-2">Lot Published!</h2>
        <p className="text-content-tertiary text-sm">
          Your lot <span className="text-content-primary font-semibold">"{title}"</span> has been submitted for review. It will appear in the auction shortly.
        </p>
      </div>
      <div className="flex gap-3">
        <Button variant="secondary" size="sm" onClick={() => { reset(); setSubmitted(false); }}>
          Create Another
        </Button>
        <Button variant="primary" size="sm">
          View My Lots
        </Button>
      </div>
    </div>
  );
}
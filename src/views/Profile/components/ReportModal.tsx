"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Button from "@/src/components/ui/Button";
import Input from "@/src/components/ui/Input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/src/components/ui/Dialog";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    reason: string;
    lotNumber: string;
    proofs: string;
    telegramContact: string;
  }) => Promise<void>;
  userName: string;
}

export const ReportModal = ({
  isOpen,
  onClose,
  onSubmit,
  userName,
}: ReportModalProps) => {
  const t = useTranslations("ReportModal");
  const [reason, setReason] = useState("");
  const [lotNumber, setLotNumber] = useState("");
  const [proofs, setProofs] = useState("");
  const [telegramContact, setTelegramContact] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onSubmit({ reason, lotNumber, proofs, telegramContact });
      setReason("");
      setLotNumber("");
      setProofs("");
      setTelegramContact("");
      setErrors({});
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (isSubmitting) return;
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="p-0 sm:max-w-lg border-border-primary">
        <DialogHeader>
          <div>
            <DialogTitle>{t("title")}</DialogTitle>
            <DialogDescription>{t("subtitle", { userName })}</DialogDescription>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-content-tertiary hover:text-content-light hover:bg-surface-secondary transition-all cursor-pointer"
          >
            ✕
          </button>
        </DialogHeader>

        <div className="px-6 py-5 flex flex-col gap-4 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-border-primary scrollbar-track-transparent">
          <Input
            type="textarea"
            label={t("reasonLabel")}
            required
            rows={3}
            value={reason}
            onChange={setReason}
            placeholder={t("reasonPlaceholder")}
            error={errors.reason}
          />

          <Input
            label={`${t("lotNumberLabel")} (${t("optional")})`}
            value={lotNumber}
            onChange={setLotNumber}
            placeholder={t("lotNumberPlaceholder")}
          />

          <Input
            type="textarea"
            label={t("proofsLabel")}
            required
            rows={3}
            value={proofs}
            onChange={setProofs}
            placeholder={t("proofsPlaceholder")}
            error={errors.proofs}
          />

          <div className="relative">
            <Input
              label={t("telegramLabel")}
              required
              value={telegramContact}
              onChange={setTelegramContact}
              placeholder={t("telegramPlaceholder")}
              error={errors.telegram}
              className="[&>input]:pl-9"
            />
            <span className={`absolute left-3.5 ${errors.telegram ? "top-[32px]" : "top-[31px]"} text-brand-primary text-sm pointer-events-none`}>
              @
            </span>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="primary"
            size="sm"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            {t("cancel")}
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={handleSubmit}
            isLoading={isSubmitting}
            loadingText={t("submitting")}
          >
            {t("submit")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

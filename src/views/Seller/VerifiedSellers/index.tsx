"use client";

import React from "react";
import { MOCK_SELLERS } from "./sellerConfig";
import { SellerCard } from "./components/SellerCard";
import { TierLegend } from "./components/TierLegend";
import { FilterBar } from "./components/FilterBar";
import { PageHeader } from "@/src/components/ui/PageHeader";
import { Alert } from "@/src/components/ui/Alert";
import { ISeller } from "./types";

interface VerifiedSellersViewProps {
  sellers?: ISeller[];
}

export const VerifiedSellersView = ({
  sellers = MOCK_SELLERS,
}: VerifiedSellersViewProps) => {
  return (
    <div className="p-5 md:p-7">
      <div className="mx-auto">
        <PageHeader
          label="Community"
          title="Sellers by Activity"
          description={`${sellers.length} sellers with 50+ completed auction sales.`}
          actions={<TierLegend />}
        />

        <Alert variant="error" className="mb-7">
          Галочка показує лише кількість продажів на аукціоні. Вона{" "}
          <span>не гарантує чесності продавця</span> та{" "}
          <span>не є офіційною верифікацією</span>. Завжди перевіряйте репутацію, читайте відгуки та
          використовуйте механізм escrow. <span>Ваші гроші — це ваша відповідальність.</span>
        </Alert>

        <FilterBar />

        {sellers.length > 0 ? (
          <div className="flex flex-col">
            {sellers.map((seller, i) => (
              <SellerCard key={seller.id} seller={seller} index={i} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center animate-bvCatFadeUp">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-surface-primary border border-border-primary">
              <svg className="w-5 h-5 text-content-tertiary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-content-tertiary">
              No sellers found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

import React from "react";
import { Alert } from "@/src/components/ui/Alert";

export const Disclaimer = () => {
  return (
    <Alert
      variant="error"
      title="Important disclaimer"
      className="mb-7"
    >
      <span className="text-content-secondary">
        Галочка показує лише кількість продажів на аукціоні.
        Вона{" "}
        <span className="font-semibold text-[#ff4d6a]">
          не гарантує чесності продавця
        </span>{" "}
        та не є офіційною верифікацією.
      </span>
      {" "}Завжди перевіряйте репутацію, читайте відгуки та
      використовуйте механізм escrow.{" "}
      <span className="font-semibold text-[#ff4d6a]">
        Ваші гроші — це ваша відповідальність.
      </span>
    </Alert>
  );
};

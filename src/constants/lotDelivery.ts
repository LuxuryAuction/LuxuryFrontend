export const LotDelivery = {
  novaPoshta: "nova-poshta",
  ukrPoshta: "ukr-poshta",
  both: "both",
} as const;

export type LotDeliveryValue = (typeof LotDelivery)[keyof typeof LotDelivery];
export type DeliveryTranslateFn = (key: LotDeliveryValue) => string;

const DELIVERY_ORDER: LotDeliveryValue[] = [
  LotDelivery.novaPoshta,
  LotDelivery.ukrPoshta,
  LotDelivery.both,
];

const DELIVERY_ALIASES: Record<string, LotDeliveryValue> = {
  [LotDelivery.novaPoshta]: LotDelivery.novaPoshta,
  [LotDelivery.ukrPoshta]: LotDelivery.ukrPoshta,
  [LotDelivery.both]: LotDelivery.both,
};

export function parseDeliveryValue(
  delivery: string | null | undefined,
): LotDeliveryValue | null {
  if (!delivery) return null;
  const normalized = delivery.trim().toLowerCase();
  if (normalized in DELIVERY_ALIASES) {
    return DELIVERY_ALIASES[normalized];
  }
  if (DELIVERY_ORDER.includes(normalized as LotDeliveryValue)) {
    return normalized as LotDeliveryValue;
  }
  return null;
}

export function buildDeliveryOptions(translate: DeliveryTranslateFn) {
  return DELIVERY_ORDER.map((value) => ({
    value,
    label: translate(value),
  }));
}

export function formatDeliveryDisplay(
  delivery: string | null | undefined,
  translate?: DeliveryTranslateFn,
): string | null {
  const value = parseDeliveryValue(delivery);
  if (value === null) {
    return delivery ? delivery : null;
  }
  return translate ? translate(value) : value;
}

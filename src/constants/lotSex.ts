export const LotSex = {
  male: "male",
  female: "female",
  unisex: "unisex",
} as const;

export type LotSexValue = (typeof LotSex)[keyof typeof LotSex];
export type SexTranslateFn = (key: LotSexValue) => string;

const SEX_ORDER: LotSexValue[] = [LotSex.male, LotSex.female, LotSex.unisex];

export function parseSexValue(
  sex: string | null | undefined,
): LotSexValue | null {
  if (!sex) return null;
  const normalized = sex.trim().toLowerCase();
  if (SEX_ORDER.includes(normalized as LotSexValue)) {
    return normalized as LotSexValue;
  }
  return null;
}

export function buildSexOptions(translate: SexTranslateFn) {
  return SEX_ORDER.map((value) => ({
    value,
    label: translate(value),
  }));
}

export function formatSexDisplay(
  sex: string | null | undefined,
  translate?: SexTranslateFn,
): string | null {
  const value = parseSexValue(sex);
  if (value === null) {
    return sex ? sex : null;
  }
  return translate ? translate(value) : value;
}

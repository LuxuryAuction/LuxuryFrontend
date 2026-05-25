/** Matches backend `ItemCondition` enum (0–8). */
export const ItemCondition = {
  Broken: 0,
  VeryPoor: 1,
  Poor: 2,
  Fair: 3,
  Good: 4,
  VeryGood: 5,
  Excellent: 6,
  LikeNew: 7,
  New: 8,
} as const;

export type ItemConditionValue = (typeof ItemCondition)[keyof typeof ItemCondition];
export type ItemConditionKey = keyof typeof ItemCondition;
export type ConditionTranslateFn = (key: ItemConditionKey) => string;

const CONDITION_META: Record<
  ItemConditionValue,
  { label: string; score: number }
> = {
  [ItemCondition.Broken]: { label: "Broken", score: 1 },
  [ItemCondition.VeryPoor]: { label: "Very Poor", score: 2 },
  [ItemCondition.Poor]: { label: "Poor", score: 3 },
  [ItemCondition.Fair]: { label: "Fair", score: 4 },
  [ItemCondition.Good]: { label: "Good", score: 5 },
  [ItemCondition.VeryGood]: { label: "Very Good", score: 6 },
  [ItemCondition.Excellent]: { label: "Excellent", score: 7 },
  [ItemCondition.LikeNew]: { label: "Like New", score: 8 },
  [ItemCondition.New]: { label: "New", score: 10 },
};

const CONDITION_BY_NAME: Record<string, ItemConditionValue> = {};

for (const [name, value] of Object.entries(ItemCondition)) {
  if (typeof value === "number") {
    CONDITION_BY_NAME[name] = value;
    CONDITION_BY_NAME[String(value)] = value;
  }
}

for (const [value, { label }] of Object.entries(CONDITION_META) as [
  string,
  { label: string; score: number },
][]) {
  const enumValue = Number(value) as ItemConditionValue;
  CONDITION_BY_NAME[label] = enumValue;
  CONDITION_BY_NAME[label.replace(/\s+/g, "")] = enumValue;
}

const CONDITION_ORDER: ItemConditionValue[] = [
  ItemCondition.New,
  ItemCondition.LikeNew,
  ItemCondition.Excellent,
  ItemCondition.VeryGood,
  ItemCondition.Good,
  ItemCondition.Fair,
  ItemCondition.Poor,
  ItemCondition.VeryPoor,
  ItemCondition.Broken,
];

export function getConditionEnumKey(value: ItemConditionValue): ItemConditionKey {
  return Object.entries(ItemCondition).find(
    ([, v]) => v === value,
  )![0] as ItemConditionKey;
}

export function buildConditionOptions(translate: ConditionTranslateFn) {
  return CONDITION_ORDER.map((value) => {
    const key = getConditionEnumKey(value);
    const score = getConditionDisplayScore(value);
    return {
      value: String(value),
      label: `${score}/10 — ${translate(key)}`,
    };
  });
}

function isItemConditionValue(value: number): value is ItemConditionValue {
  return value >= ItemCondition.Broken && value <= ItemCondition.New;
}

export function parseConditionValue(
  condition: string | number | null | undefined,
): ItemConditionValue | null {
  if (condition === null || condition === undefined || condition === "") {
    return null;
  }

  if (typeof condition === "number") {
    return isItemConditionValue(condition) ? condition : null;
  }

  const trimmed = condition.trim();
  const asNum = Number(trimmed);
  if (!Number.isNaN(asNum) && isItemConditionValue(asNum)) {
    return asNum;
  }

  if (trimmed in CONDITION_BY_NAME) {
    return CONDITION_BY_NAME[trimmed];
  }

  const normalized = trimmed.replace(/\s+/g, "");
  if (normalized in CONDITION_BY_NAME) {
    return CONDITION_BY_NAME[normalized];
  }

  return null;
}

export function getConditionDisplayScore(value: ItemConditionValue): number {
  return CONDITION_META[value].score;
}

/** Short rating for cards, e.g. `0/10` … `8/10` (enum value). */
export function formatConditionDisplay(
  condition: string | number | null | undefined,
): string | null {
  const value = parseConditionValue(condition);
  if (value === null) {
    return condition != null && condition !== "" ? String(condition) : null;
  }
  return `${value}/10`;
}

export function formatConditionLabel(
  condition: string | number | null | undefined,
  translate?: ConditionTranslateFn,
): string | null {
  const value = parseConditionValue(condition);
  if (value === null) {
    return condition != null && condition !== "" ? String(condition) : null;
  }
  const key = getConditionEnumKey(value);
  const { score } = CONDITION_META[value];
  const label = translate ? translate(key) : CONDITION_META[value].label;
  return `${score}/10 — ${label}`;
}

import type { ICreateLotFormData } from "@/src/views/Auction/CreateLot/types";
import {
  PENDING_LOT_DRAFT_KEY,
  POST_TOP_UP_REDIRECT_KEY,
} from "@/src/constants/payment";
import { topUpLog } from "@/src/utils/topUpDebugLog";

interface StoredImage {
  name: string;
  type: string;
  dataUrl: string;
}

export interface PendingLotDraftPayload {
  form: Omit<ICreateLotFormData, "images">;
  images: StoredImage[];
  postingPrice: number;
  categoryId: number;
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error ?? new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

async function dataUrlToFile(stored: StoredImage): Promise<File> {
  const response = await fetch(stored.dataUrl);
  const blob = await response.blob();
  return new File([blob], stored.name, { type: stored.type || blob.type });
}

export async function savePendingLotDraft(
  form: ICreateLotFormData,
  postingPrice: number,
): Promise<void> {
  const { images, ...rest } = form;
  const storedImages = await Promise.all(
    images.map(async (file) => ({
      name: file.name,
      type: file.type,
      dataUrl: await readFileAsDataUrl(file),
    })),
  );

  const payload: PendingLotDraftPayload = {
    form: rest,
    images: storedImages,
    postingPrice,
    categoryId: Number(form.categoryId),
  };

  sessionStorage.setItem(PENDING_LOT_DRAFT_KEY, JSON.stringify(payload));
}

export async function loadPendingLotDraft(): Promise<{
  form: ICreateLotFormData;
  postingPrice: number;
} | null> {
  const raw = sessionStorage.getItem(PENDING_LOT_DRAFT_KEY);
  if (!raw) return null;

  try {
    const payload = JSON.parse(raw) as PendingLotDraftPayload;
    const images = await Promise.all(payload.images.map(dataUrlToFile));

    return {
      form: { ...payload.form, images },
      postingPrice: payload.postingPrice,
    };
  } catch {
    clearPendingLotDraft();
    return null;
  }
}

export function clearPendingLotDraft(): void {
  sessionStorage.removeItem(PENDING_LOT_DRAFT_KEY);
}

export function setPostTopUpRedirect(path: string): void {
  topUpLog("storage.setPostTopUpRedirect", { path, key: POST_TOP_UP_REDIRECT_KEY });
  sessionStorage.setItem(POST_TOP_UP_REDIRECT_KEY, path);
}

export function consumePostTopUpRedirect(): string | null {
  const path = sessionStorage.getItem(POST_TOP_UP_REDIRECT_KEY);
  sessionStorage.removeItem(POST_TOP_UP_REDIRECT_KEY);
  topUpLog("storage.consumePostTopUpRedirect", { path, hadValue: path != null });
  return path;
}

export function peekPostTopUpRedirect(): string | null {
  return sessionStorage.getItem(POST_TOP_UP_REDIRECT_KEY);
}

"use client";

import { useEffect, useRef, useState } from "react";
import { useToast } from "@/src/components/ui/Toast";
import { topUpError, topUpLog, topUpWarn } from "@/src/utils/topUpDebugLog";

const POLL_INTERVAL_MS = 2000;
const POLL_TIMEOUT_MS = 30000;

interface UseTopUpReturnPollingOptions {
  enabled: boolean;
  initialBalance?: number;
  onPoll: () => Promise<number | undefined>;
  onSuccess?: (newBalance: number) => void;
  successMessage?: string;
  timeoutMessage?: string;
}

export function useTopUpReturnPolling({
  enabled,
  initialBalance = 0,
  onPoll,
  onSuccess,
  successMessage = "Balance updated successfully.",
  timeoutMessage = "Payment is still processing. Refresh the page in a moment.",
}: UseTopUpReturnPollingOptions) {
  const { showToast } = useToast();
  const [isConfirming, setIsConfirming] = useState(enabled);
  const startedRef = useRef(false);

  useEffect(() => {
    topUpLog("poll.effect", {
      enabled,
      alreadyStarted: startedRef.current,
      initialBalance,
      pollIntervalMs: POLL_INTERVAL_MS,
      pollTimeoutMs: POLL_TIMEOUT_MS,
    });

    if (!enabled || startedRef.current) return;
    startedRef.current = true;

    let cancelled = false;
    let attempts = 0;
    const maxAttempts = Math.ceil(POLL_TIMEOUT_MS / POLL_INTERVAL_MS);
    let lastBalance = initialBalance;

    topUpLog("poll.started", { initialBalance, maxAttempts });

    const finish = (reason: string) => {
      topUpLog("poll.finished", { reason, attempts, lastBalance, cancelled });
      if (!cancelled) setIsConfirming(false);
    };

    const tick = async () => {
      if (cancelled) {
        topUpLog("poll.tick.skipped", { reason: "cancelled", attempts });
        return;
      }

      attempts += 1;
      topUpLog("poll.tick", { attempt: attempts, maxAttempts, lastBalance });

      try {
        const balance = await onPoll();
        topUpLog("poll.tick.result", {
          attempt: attempts,
          balance,
          lastBalance,
          increased: balance != null && balance > lastBalance,
        });

        if (balance != null && balance > lastBalance) {
          topUpLog("poll.success", {
            attempt: attempts,
            previousBalance: lastBalance,
            newBalance: balance,
            delta: balance - lastBalance,
          });
          onSuccess?.(balance);
          showToast("success", successMessage);
          finish("balance_increased");
          return;
        }
        if (balance != null) {
          lastBalance = balance;
        }
      } catch (err) {
        topUpError("poll.tick.error", err, { attempt: attempts, lastBalance });
      }

      if (attempts >= maxAttempts) {
        topUpWarn("poll.timeout", { attempts, lastBalance, maxAttempts });
        showToast("info", timeoutMessage);
        finish("timeout");
        return;
      }

      window.setTimeout(tick, POLL_INTERVAL_MS);
    };

    void tick();

    return () => {
      topUpLog("poll.cleanup", { attempts, lastBalance });
      cancelled = true;
      finish("unmount");
    };
  }, [
    enabled,
    initialBalance,
    onPoll,
    onSuccess,
    showToast,
    successMessage,
    timeoutMessage,
  ]);

  return { isConfirming };
}

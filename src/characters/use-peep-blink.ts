import { useEffect, useState } from "react";

interface UsePeepBlinkOptions {
  enabled: boolean;
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function usePeepBlink({ enabled }: UsePeepBlinkOptions) {
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    if (!enabled || prefersReducedMotion()) {
      setIsBlinking(false);
      return;
    }

    let blinkTimer: ReturnType<typeof setTimeout> | undefined;
    let reopenTimer: ReturnType<typeof setTimeout> | undefined;

    const scheduleBlink = () => {
      const delay = 2600 + Math.random() * 2400;
      blinkTimer = setTimeout(() => {
        setIsBlinking(true);
        reopenTimer = setTimeout(() => {
          setIsBlinking(false);
          scheduleBlink();
        }, 140);
      }, delay);
    };

    scheduleBlink();

    return () => {
      if (blinkTimer) clearTimeout(blinkTimer);
      if (reopenTimer) clearTimeout(reopenTimer);
    };
  }, [enabled]);

  return isBlinking;
}

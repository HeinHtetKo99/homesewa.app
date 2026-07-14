const ROADBLOCK_COOKIE = "homesewa_roadblock";
export const ROADBLOCK_DONE_EVENT = "homesewa:roadblock-done";

declare global {
  interface Window {
    __HS_ROADBLOCK_DONE?: boolean;
  }
}

let roadblockDone = false;

function isRoadblockFlagDone() {
  return typeof window !== "undefined" && window.__HS_ROADBLOCK_DONE === true;
}

export function localDateKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function secondsUntilLocalMidnight(date = new Date()) {
  const midnight = new Date(date);
  midnight.setHours(24, 0, 0, 0);
  return Math.max(1, Math.ceil((midnight.getTime() - date.getTime()) / 1000));
}

export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}=([^;]*)`)
  );
  return match ? decodeURIComponent(match[1]) : null;
}

export function hasSeenRoadblockToday(): boolean {
  return getCookie(ROADBLOCK_COOKIE) === localDateKey();
}

export function markRoadblockSeenToday(): void {
  if (typeof document === "undefined") return;
  const value = localDateKey();
  const maxAge = secondsUntilLocalMidnight();
  document.cookie = `${ROADBLOCK_COOKIE}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

export function notifyRoadblockDone(): void {
  if (roadblockDone) return;
  roadblockDone = true;
  if (typeof window !== "undefined") {
    window.__HS_ROADBLOCK_DONE = true;
    window.dispatchEvent(new Event(ROADBLOCK_DONE_EVENT));
  }
}

export function whenRoadblockDone(): Promise<void> {
  if (roadblockDone || isRoadblockFlagDone()) {
    roadblockDone = true;
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    window.addEventListener(
      ROADBLOCK_DONE_EVENT,
      () => {
        roadblockDone = true;
        resolve();
      },
      { once: true }
    );
  });
}

export function whenDocumentFullyLoaded(): Promise<void> {
  if (document.readyState === "complete") return Promise.resolve();
  return new Promise((resolve) => {
    window.addEventListener("load", () => resolve(), { once: true });
  });
}

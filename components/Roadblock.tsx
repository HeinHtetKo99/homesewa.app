'use client';

import { useEffect, useState, useCallback } from "react";
import {
  hasSeenRoadblockToday,
  markRoadblockSeenToday,
  notifyRoadblockDone,
} from "../lib/roadblock";

const DEFAULT_SRC = "/roadblock/default/default.jpg";
const DISPLAY_MS = 6_000;
const CLOSE_BUTTON_DELAY_MS = 3_000;

function loadImage(src: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => reject(new Error(`Failed to load ${src}`));
    img.src = src;
  });
}

const RoadBlock = () => {
  const today = new Date();
  const day = today.getDate();
  const monthNames = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];
  const month = monthNames[today.getMonth()];
  const daySrc = `/roadblock/${month}/${day}.jpg`;
  const monthDefaultSrc = `/roadblock/${month}/default.jpg`;

  const [showRoadBlock, setShowRoadBlock] = useState(false);
  const [imageSrc, setImageSrc] = useState(daySrc);
  const [canClose, setCanClose] = useState(false);
  const [closeCountdown, setCloseCountdown] = useState(3);

  const onClose = useCallback(() => {
    document.body.classList.remove("hideScroll");
    document.body.classList.add("showScroll");
    setShowRoadBlock(false);
    notifyRoadblockDone();
  }, []);

  // Show once per day (cookie). Preload image fully before opening.
  useEffect(() => {
    if (hasSeenRoadblockToday()) {
      notifyRoadblockDone();
      return;
    }

    let cancelled = false;

    (async () => {
      let src: string;
      try {
        src = await loadImage(daySrc);
      } catch {
        try {
          src = await loadImage(monthDefaultSrc);
        } catch {
          try {
            src = await loadImage(DEFAULT_SRC);
          } catch {
            if (!cancelled) notifyRoadblockDone();
            return;
          }
        }
      }

      if (cancelled) return;

      markRoadblockSeenToday();
      document.body.classList.add("hideScroll");
      setImageSrc(src);
      setShowRoadBlock(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [daySrc, monthDefaultSrc]);

  useEffect(() => {
    if (!showRoadBlock) return;

    const autoClose = window.setTimeout(onClose, DISPLAY_MS);
    const enableClose = window.setTimeout(() => setCanClose(true), CLOSE_BUTTON_DELAY_MS);
    const countdown = window.setInterval(() => {
      setCloseCountdown((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => {
      window.clearTimeout(autoClose);
      window.clearTimeout(enableClose);
      window.clearInterval(countdown);
    };
  }, [showRoadBlock, onClose]);

  if (!showRoadBlock) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#D0D0D0]">
      <div className="relative">
        <button
          type="button"
          onClick={canClose ? onClose : undefined}
          aria-label={canClose ? "Close advertisement" : undefined}
          className="absolute top-10 right-0 z-10 sm:-top-2.5 sm:-right-2.5"
          style={{
            backgroundColor: "#055d59",
            borderRadius: "50%",
            border: "0px",
            width: "40px",
            height: "40px",
            textAlign: "center",
            color: "white",
            fontSize: "20px",
            fontWeight: "bold",
            cursor: canClose ? "pointer" : "not-allowed",
          }}
        >
          {canClose ? "X" : closeCountdown}
        </button>

        <a href="#" target="_blank" rel="noopener noreferrer">
          <img
            src={imageSrc}
            className="img-fluid rounded"
            style={{
              borderRadius: "3%",
              objectFit: "contain",
              height: "550px",
              width: "550px",
              maxWidth: "92vw",
              maxHeight: "80vh",
            }}
            alt="Advertisement"
          />
        </a>
      </div>
    </div>
  );
};

export default RoadBlock;

"use client";

import { useEffect } from "react";
import { notifyRoadblockDone } from "../lib/roadblock";

/** Bridges the early boot script with React (Play Store banner wait, etc.). */
export default function RoadBlock() {
  useEffect(() => {
    if (window.__HS_ROADBLOCK_DONE) {
      notifyRoadblockDone();
      return;
    }

    const onDone = () => notifyRoadblockDone();
    window.addEventListener("homesewa:roadblock-done", onDone);
    return () => window.removeEventListener("homesewa:roadblock-done", onDone);
  }, []);

  return null;
}

// app/components/NotificationBar.tsx
"use client";

import React, { useState } from "react";

export default function NotificationBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-[#0E4541] text-white px-6 py-3 flex items-center justify-between">
      <p className="text-sm md:text-base">
     Announcement: RocketSingh is offering 20% off on all services this month!
      </p>
      <button
        onClick={() => setVisible(false)}
        className="ml-4 px-3 py-1 bg-white text-blue-700 font-semibold rounded hover:bg-gray-100 transition"
      >
        Close
      </button>
    </div>
  );
}
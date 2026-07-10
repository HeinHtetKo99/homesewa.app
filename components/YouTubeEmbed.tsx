"use client";

import { useState } from "react";
import { youtubeEmbedUrl } from "../lib/youtube";

type YouTubeEmbedProps = {
  videoId: string;
  title: string;
  autoPlay?: boolean;
  className?: string;
};

export default function YouTubeEmbed({
  videoId,
  title,
  autoPlay = false,
  className = "",
}: YouTubeEmbedProps) {
  const [active, setActive] = useState(autoPlay);

  if (!active) {
    return (
      <button
        type="button"
        onClick={() => setActive(true)}
        className={`group relative block h-full w-full cursor-pointer ${className}`}
        aria-label={`Play ${title}`}
      >
        <img
          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
          alt={title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <span className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/40">
          <span
            className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-lg"
            aria-hidden="true"
          >
            <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-current">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </span>
      </button>
    );
  }

  return (
    <iframe
      src={youtubeEmbedUrl(videoId)}
      title={title}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
      className={`h-full w-full ${className}`}
    />
  );
}

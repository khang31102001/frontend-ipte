"use client";

import React, { useMemo } from "react";

type VideoProvider = "YOUTUBE" | "VIMEO" | "FILE" | "UNKNOWN";

type UniversalVideoPlayerProps = {
  url: string;
  poster?: string;
  title?: string;

  /** <video> options */
  controls?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;

  className?: string;
};

function getProvider(url: string): VideoProvider {
  const u = url.toLowerCase();

  // youtube
  if (u.includes("youtube.com") || u.includes("youtu.be")) return "YOUTUBE";

  // vimeo
  if (u.includes("vimeo.com")) return "VIMEO";

  // direct file / stream
  if (/\.(mp4|webm|ogg)(\?.*)?$/.test(u)) return "FILE";
  if (/\.(m3u8)(\?.*)?$/.test(u)) return "FILE"; // HLS (native tùy browser)

  return "UNKNOWN";
}

function toYouTubeEmbed(url: string) {
  try {
    // youtu.be/<id>
    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1]?.split(/[?&]/)[0];
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }

    // youtube.com/watch?v=<id>
    const u = new URL(url);
    const id = u.searchParams.get("v");
    return id ? `https://www.youtube.com/embed/${id}` : null;
  } catch {
    return null;
  }
}

function toVimeoEmbed(url: string) {
  // vimeo.com/<id>
  const match = url.match(/vimeo\.com\/(\d+)/);
  const id = match?.[1];
  return id ? `https://player.vimeo.com/video/${id}` : null;
}

export function UniversalVideoPlayer({
  url,
  poster,
  title = "Video",
  controls = true,
  autoPlay = false,
  muted = false,
  loop = false,
  className = "absolute inset-0 w-full h-full",
}: UniversalVideoPlayerProps) {
  const provider = useMemo(() => getProvider(url), [url]);

  // query cho embed autoplay/mute (để autoplay không bị browser chặn)
  const embedQuery = useMemo(() => {
    const params = new URLSearchParams();
    if (autoPlay) params.set("autoplay", "1");
    if (muted) params.set("mute", "1");
    if (loop) params.set("loop", "1");
    return params.toString();
  }, [autoPlay, muted, loop]);

  if (provider === "YOUTUBE") {
    const embed = toYouTubeEmbed(url);
    if (!embed) return <FallbackUnsupported url={url} />;

    return (
      <iframe
        className={className}
        src={`${embed}${embedQuery ? `?${embedQuery}` : ""}`}
        title={title}
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    );
  }

  if (provider === "VIMEO") {
    const embed = toVimeoEmbed(url);
    if (!embed) return <FallbackUnsupported url={url} />;

    return (
      <iframe
        className={className}
        src={`${embed}${embedQuery ? `?${embedQuery}` : ""}`}
        title={title}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    );
  }

  if (provider === "FILE") {
    // NOTE: m3u8 có thể không chạy trên Chrome nếu không có hls.js.
    return (
      <video
        className={className}
        src={url}
        poster={poster}
        controls={controls}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline
        preload="metadata"
      />
    );
  }

  return <FallbackUnsupported url={url} />;
}

function FallbackUnsupported({ url }: { url: string }) {
  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-black text-white p-4 text-center">
      <div className="max-w-md">
        <p className="font-semibold">Không thể phát link này.</p>
        <p className="text-sm opacity-80 mt-2">
          Link có thể không phải video trực tiếp, hoặc website chặn embed (CSP/X-Frame-Options).
        </p>
        <p className="text-xs opacity-70 mt-3 break-all">{url}</p>
      </div>
    </div>
  );
}

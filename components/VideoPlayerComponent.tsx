"use client";

import React, { useEffect, useRef, useState } from "react";
import { Music } from "lucide-react";

interface VideoPlayerProps {
  videoId: string | null;
  isPlaying: boolean;
  onVideoEnd: () => void;
  onPlayerReady: (ready: boolean) => void;
  onProgress?: (currentTime: number, duration: number) => void;
  seekToTime?: number | null;
  onSeekComplete?: () => void;
  shouldRestart?: boolean;
}

// Declare YouTube types
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export const VideoPlayerComponent: React.FC<VideoPlayerProps> = ({
  videoId,
  isPlaying,
  onVideoEnd,
  onPlayerReady,
  onProgress,
  seekToTime,
  onSeekComplete,
  shouldRestart = false,
}) => {
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startProgressTimer = () => {
    stopProgressTimer();
    progressIntervalRef.current = setInterval(() => {
      if (playerRef.current && isPlayerReady && onProgress) {
        const currentTime = playerRef.current.getCurrentTime();
        const duration = playerRef.current.getDuration();
        if (duration > 0) {
          onProgress(currentTime, duration);
        }
      }
    }, 1000);
  };

  const stopProgressTimer = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  // Load YouTube IFrame API
  useEffect(() => {
    if (window.YT && window.YT.Player) {
      return;
    }

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
  }, []);

  // Initialize player when videoId changes
  useEffect(() => {
    if (!videoId || !window.YT || !window.YT.Player) return;

    setIsPlayerReady(false);
    onPlayerReady(false);
    stopProgressTimer();

    if (playerRef.current) {
      playerRef.current.destroy();
    }

    playerRef.current = new window.YT.Player(containerRef.current, {
      height: "400",
      width: "100%",
      videoId: videoId,
      playerVars: {
        autoplay: 0,
        controls: 0, // Disable native controls for custom ones
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        iv_load_policy: 3,
      },
      events: {
        onReady: (event: any) => {
          setIsPlayerReady(true);
          onPlayerReady(true);
          if (isPlaying) {
            event.target.playVideo();
            startProgressTimer();
          }
        },
        onStateChange: (event: any) => {
          // 1: playing
          if (event.data === 1) {
            startProgressTimer();
          } else {
            stopProgressTimer();
          }

          // 0: ended
          if (event.data === 0) {
            onVideoEnd();
          }
        },
      },
    });

    return () => {
      stopProgressTimer();
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [videoId]);

  // Handle seekToTime
  useEffect(() => {
    if (seekToTime !== undefined && seekToTime !== null && playerRef.current && isPlayerReady) {
      playerRef.current.seekTo(seekToTime, true);
      if (onSeekComplete) onSeekComplete();
    }
  }, [seekToTime, isPlayerReady]);

  // Handle play/pause changes
  useEffect(() => {
    if (!playerRef.current || !isPlayerReady) return;

    try {
      if (isPlaying) {
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    } catch (error) {
      console.error("Error controlling player:", error);
    }
  }, [isPlaying, isPlayerReady]);

  return (
    <div className="bg-black rounded-xl overflow-hidden relative">
      {videoId ? (
        <>
          <div ref={containerRef} className="w-full aspect-video" />
          {!isPlayerReady && (
            <div className="absolute inset-0 bg-black flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-white text-sm font-medium">
                  Loading Player...
                </p>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="w-full aspect-video bg-secondary flex items-center justify-center">
          <Music className="w-16 h-16 text-muted-foreground opacity-20" />
        </div>
      )}
    </div>
  );
};

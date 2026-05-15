"use client";

import React from "react";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Shuffle,
  Repeat,
  Repeat1,
} from "lucide-react";
import { RepeatMode } from "@/types/music";
import { ProgressBarComponent } from "./ProgressBarComponent";

interface PlaybackControlsProps {
  isPlaying: boolean;
  isShuffle: boolean;
  repeatMode: RepeatMode;
  currentIndex: number;
  playlistLength: number;
  canGoPrevious: boolean;
  isPlayerReady: boolean;
  currentTime: number;
  duration: number;
  onTogglePlay: () => void;
  onToggleShuffle: () => void;
  onToggleRepeat: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onSeek: (time: number) => void;
}

export const PlaybackControlsComponent: React.FC<PlaybackControlsProps> = ({
  isPlaying,
  isShuffle,
  repeatMode,
  playlistLength,
  canGoPrevious,
  isPlayerReady,
  currentTime,
  duration,
  onTogglePlay,
  onToggleShuffle,
  onToggleRepeat,
  onPrevious,
  onNext,
  onSeek,
}) => {
  return (
    <div className="flex flex-col items-center gap-2 flex-1 max-w-xl">
      <div className="flex items-center gap-6">
        <button
          onClick={onToggleShuffle}
          disabled={!isPlayerReady || playlistLength === 0}
          className={`p-2 rounded-md transition-all ${
            isShuffle ? "text-primary" : "text-muted-foreground hover:text-foreground"
          } disabled:opacity-30`}
        >
          <Shuffle className="w-4 h-4" />
        </button>

        <button
          onClick={onPrevious}
          disabled={!canGoPrevious || !isPlayerReady || playlistLength === 0}
          className="text-muted-foreground hover:text-foreground disabled:opacity-50 transition-colors"
        >
          <SkipBack className="h-5 w-5 fill-current" />
        </button>

        <button
          onClick={onTogglePlay}
          disabled={!isPlayerReady || playlistLength === 0}
          className="bg-primary text-primary-foreground p-3 rounded-full hover:scale-105 active:scale-95 disabled:opacity-50 transition-all shadow-lg"
        >
          {isPlaying ? (
            <Pause className="h-6 w-6 fill-current" />
          ) : (
            <Play className="h-6 w-6 fill-current ml-0.5" />
          )}
        </button>

        <button
          onClick={onNext}
          disabled={!isPlayerReady || playlistLength === 0}
          className="text-muted-foreground hover:text-foreground disabled:opacity-50 transition-colors"
        >
          <SkipForward className="h-5 w-5 fill-current" />
        </button>

        <button
          onClick={onToggleRepeat}
          disabled={!isPlayerReady || playlistLength === 0}
          className={`p-2 rounded-md transition-all ${
            repeatMode !== "none" ? "text-primary" : "text-muted-foreground hover:text-foreground"
          } disabled:opacity-30`}
        >
          {repeatMode === "one" ? (
            <Repeat1 className="w-4 h-4" />
          ) : (
            <Repeat className="w-4 h-4" />
          )}
        </button>
      </div>

      <ProgressBarComponent
        currentTime={currentTime}
        duration={duration}
        onSeek={onSeek}
        disabled={!isPlayerReady || playlistLength === 0}
      />
    </div>
  );
};

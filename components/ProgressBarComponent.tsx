"use client";

import React from "react";

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
  disabled?: boolean;
}

export const ProgressBarComponent: React.FC<ProgressBarProps> = ({
  currentTime,
  duration,
  onSeek,
  disabled = false,
}) => {
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    onSeek(newTime);
  };

  return (
    <div className="w-full flex items-center gap-3 group">
      <span className="text-[10px] font-medium text-muted-foreground w-10 text-right">
        {formatTime(currentTime)}
      </span>
      <div className="flex-1 relative h-6 flex items-center">
        <input
          type="range"
          min="0"
          max={duration || 0}
          step="1"
          value={currentTime}
          onChange={handleSeek}
          disabled={disabled}
          className="absolute inset-0 w-full h-1 bg-secondary rounded-full appearance-none cursor-pointer focus:outline-none accent-primary [&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:-mt-1 [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:opacity-0 group-hover:[&::-webkit-slider-thumb]:opacity-100 transition-opacity"
          style={{
            background: `linear-gradient(to right, hsl(var(--primary)) ${progress}%, hsl(var(--secondary)) ${progress}%)`,
          }}
        />
      </div>
      <span className="text-[10px] font-medium text-muted-foreground w-10">
        {formatTime(duration)}
      </span>
    </div>
  );
};

"use client";

import React from "react";
import { GripVertical, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { Song } from "@/types/music";

interface PlaylistItemProps {
  song: Song;
  isActive: boolean;
  isPlaying: boolean;
  onPlay: () => void;
  onDelete: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
}

export const PlaylistItemComponent: React.FC<PlaylistItemProps> = ({
  song,
  isActive,
  onPlay,
  onDelete,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}) => {
  return (
    <div
      className={`group flex items-center gap-4 p-4 rounded-xl border transition-all ${
        isActive
          ? "bg-primary/10 border-primary shadow-sm"
          : "bg-card border-border hover:border-primary/50"
      }`}
    >
      <div className="flex flex-col gap-1 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onMoveUp?.();
          }}
          disabled={isFirst}
          className="p-1 hover:text-primary disabled:opacity-30"
        >
          <ChevronUp className="h-4 w-4" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onMoveDown?.();
          }}
          disabled={isLast}
          className="p-1 hover:text-primary disabled:opacity-30"
        >
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 min-w-0 cursor-pointer" onClick={onPlay}>
        <h3 className={`font-medium truncate ${isActive ? "text-primary" : "text-foreground"}`}>
          {song.title}
        </h3>
        <p className="text-xs text-muted-foreground truncate">{song.url}</p>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-all opacity-0 group-hover:opacity-100"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
};

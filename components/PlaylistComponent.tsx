"use client";

import React from "react";
import { PlaylistItemComponent } from "./PlaylistItemComponent";
import { Song } from "@/types/music";

interface PlaylistProps {
  songs: Song[];
  currentIndex: number;
  isPlaying: boolean;
  onPlaySong: (index: number) => void;
  onDeleteSong: (index: number) => void;
}

export const PlaylistComponent: React.FC<PlaylistProps> = ({
  songs,
  currentIndex,
  isPlaying,
  onPlaySong,
  onDeleteSong,
}) => {
  if (songs.length === 0) {
    return (
      <div className="text-center py-20 bg-secondary/20 rounded-3xl border border-dashed border-border">
        <p className="text-muted-foreground">Your playlist is empty. Add some music!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {songs.map((song, index) => (
        <PlaylistItemComponent
          key={index}
          song={song}
          isActive={index === currentIndex}
          isPlaying={isPlaying && index === currentIndex}
          onPlay={() => onPlaySong(index)}
          onDelete={() => onDeleteSong(index)}
        />
      ))}
    </div>
  );
};

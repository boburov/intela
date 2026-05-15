"use client";

import React from "react";
import { Song } from "@/types/music";

interface NowPlayingProps {
  song: Song | null;
}

export const NowPlayingComponent: React.FC<NowPlayingProps> = ({ song }) => {
  return (
    <div className="flex-1 min-w-0">
      {song ? (
        <div>
          <p className="text-xs text-primary font-bold uppercase tracking-wider mb-0.5">
            NOW PLAYING
          </p>
          <h4 className="font-semibold truncate text-foreground">{song.title}</h4>
        </div>
      ) : (
        <p className="text-muted-foreground text-sm">Nothing is playing</p>
      )}
    </div>
  );
};

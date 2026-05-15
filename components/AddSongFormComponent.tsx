"use client";

import React, { useState } from "react";
import { Plus, Link as LinkIcon, Loader2 } from "lucide-react";
import { fetchYouTubeTitle, extractYouTubeId } from "@/utils/youtube";

interface AddSongFormProps {
  onAddSong: (title: string, url: string) => void;
}

export const AddSongFormComponent: React.FC<AddSongFormProps> = ({ onAddSong }) => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedUrl = url.trim();
    if (trimmedUrl) {
      const videoId = extractYouTubeId(trimmedUrl);
      if (!videoId) {
        alert("Please enter a valid YouTube URL");
        return;
      }

      setIsLoading(true);
      try {
        const title = await fetchYouTubeTitle(trimmedUrl);
        onAddSong(title, trimmedUrl);
        setUrl("");
      } catch (error) {
        console.error("Error adding song:", error);
        onAddSong("Unknown Title", trimmedUrl);
        setUrl("");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-2xl mx-auto mb-8">
      <div className="flex-1 relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
          <LinkIcon className="h-4 w-4" />
        </div>
        <input
          type="text"
          placeholder="Paste YouTube link here..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={isLoading}
          className="block w-full pl-9 pr-3 py-2.5 bg-secondary/50 border border-border rounded-xl text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground disabled:opacity-50"
        />
      </div>
      <button
        type="submit"
        disabled={!url.trim() || isLoading}
        className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 shadow-sm whitespace-nowrap min-w-[140px]"
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Plus className="h-4 w-4" />
        )}
        {isLoading ? "Fetching..." : "Add Music"}
      </button>
    </form>
  );
};

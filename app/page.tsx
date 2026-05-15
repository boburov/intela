"use client";

import { usePlaylist } from "@/hooks/usePlaylist";
import { VideoPlayerComponent } from "@/components/VideoPlayerComponent";
import { NowPlayingComponent } from "@/components/NowPlayingComponent";
import { PlaybackControlsComponent } from "@/components/PlaybackControlsComponent";
import { AddSongFormComponent } from "@/components/AddSongFormComponent";
import { PlaylistComponent } from "@/components/PlaylistComponent";
import { useState, useEffect } from "react";
import { Music2 } from "lucide-react";
import { title } from "process";

const initialPlaylist = [
  {
    title: "Rick Astley - Never Gonna Give You Up (Video)",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  }
];

export default function YouTubeMusicPlayer() {
  const {
    playlist,
    currentIndex,
    isPlaying,
    isShuffle,
    repeatMode,
    repeatCount,
    actualCurrentIndex,
    canGoPrevious,
    getCurrentVideoId,
    addSong,
    moveSong,
    deleteSong,
    playSong,
    nextSong,
    previousSong,
    toggleShuffle,
    toggleRepeat,
    setSpecificRepeat,
    setIsPlaying,
    handleVideoEnd,
    handleProgress,
    seekTo,
    handleSeekComplete,
    shouldRestart,
    currentTime,
    duration,
    seekToTime,
  } = usePlaylist(initialPlaylist);

  const [mounted, setMounted] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAddSong = (title: string, url: string) => {
    const success = addSong(title, url);
    if (!success) {
      alert("Please enter a valid YouTube URL");
    }
  };

  const currentVideoId = getCurrentVideoId();
  const currentSong = playlist[actualCurrentIndex] || null;

  if (!mounted) return null;

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8 pb-32">
      {/* Header */}
      <header className="w-full max-w-6xl flex justify-between items-center mb-12">
        <div className="flex items-center gap-2">
          <div className="bg-primary text-primary-foreground p-2 rounded-xl">
            <Music2 className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              YouTube Music Player
            </h1>
            <p className="text-xs text-muted-foreground font-medium">
              Play your favorites!
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="w-full max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <section>
          <AddSongFormComponent onAddSong={handleAddSong} />
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-lg font-semibold flex items-center gap-2 text-foreground">
              Playlist
            </h2>
          </div>
          <PlaylistComponent
            songs={playlist}
            currentIndex={actualCurrentIndex}
            isPlaying={isPlaying}
            onPlaySong={playSong}
            onDeleteSong={deleteSong}
          />
        </section>
      </div>

      {/* Player Section (Hidden as in original Intela) */}
      <div
        style={{
          position: "fixed",
          bottom: 80,
          right: 0,
          width: 1,
          height: 1,
          overflow: "hidden",
          zIndex: 40,
          pointerEvents: "none",
        }}
      >
        <div style={{ width: 320, height: 180, marginLeft: -319, marginTop: -179 }}>
          <VideoPlayerComponent
            videoId={currentVideoId}
            isPlaying={isPlaying}
            onVideoEnd={handleVideoEnd}
            onPlayerReady={setIsPlayerReady}
            onProgress={handleProgress}
            seekToTime={seekToTime}
            onSeekComplete={handleSeekComplete}
            shouldRestart={shouldRestart}
          />
        </div>
      </div>

      {/* Player Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t border-border p-4 z-50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1 w-full md:w-auto">
            <NowPlayingComponent song={currentSong} />
          </div>

          <PlaybackControlsComponent
            isPlaying={isPlaying}
            isShuffle={isShuffle}
            repeatMode={repeatMode}
            currentIndex={currentIndex}
            playlistLength={playlist.length}
            canGoPrevious={canGoPrevious}
            isPlayerReady={isPlayerReady}
            currentTime={currentTime}
            duration={duration}
            onTogglePlay={() => setIsPlaying(!isPlaying)}
            onToggleShuffle={toggleShuffle}
            onToggleRepeat={toggleRepeat}
            onPrevious={previousSong}
            onNext={nextSong}
            onSeek={seekTo}
          />

          <div className="flex-1 hidden md:flex justify-end items-center gap-2">
            <span className="text-xs text-muted-foreground font-medium">Repeat:</span>
            <div className="flex gap-1">
              {[1, 2, 3].map((count) => (
                <button
                  key={count}
                  onClick={() => setSpecificRepeat(count)}
                  className={`px-2 py-1 text-[10px] rounded-md border transition-all ${repeatMode === "one" && repeatCount === count
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-secondary/50 text-muted-foreground border-border hover:border-primary/50"
                    }`}
                >
                  {count}x
                </button>
              ))}
              <button
                onClick={() => setSpecificRepeat(-1)}
                className={`px-2 py-1 text-[10px] rounded-md border transition-all ${repeatMode === "one" && repeatCount === -1
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-secondary/50 text-muted-foreground border-border hover:border-primary/50"
                  }`}
              >
                ∞
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

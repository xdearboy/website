"use client"

import type React from "react"
import { Play, Pause, Volume2, Loader2 } from "lucide-react"
import { formatTime } from "@/hooks/use-music-player"

interface AudioPlayerProps {
  audioRef: React.RefObject<HTMLAudioElement>
  trackUrl: string | null
  isPlaying: boolean
  isLoaded: boolean
  isBuffering: boolean
  currentTime: number
  duration: number
  rgbColor: string
  onTogglePlay: () => void
  onTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function AudioPlayer({
  audioRef,
  trackUrl,
  isPlaying,
  isLoaded,
  isBuffering,
  currentTime,
  duration,
  rgbColor,
  onTogglePlay,
  onTimeChange,
}: AudioPlayerProps) {
  return (
    <>
      <div className="flex items-center">
        <button
          onClick={onTogglePlay}
          disabled={!isLoaded}
          className={`flex items-center justify-center rounded-full p-1.5 mr-3 transition-transform duration-200 transform hover:scale-110 active:scale-100 ${
            !isLoaded ? "opacity-50 cursor-not-allowed" : ""
          }`}
          style={{
            filter: "drop-shadow(0 0 2px rgba(0, 0, 0, 0.3))",
          }}
          aria-label={isPlaying ? "Пауза" : "Воспроизвести"}
          title={isPlaying ? "Пауза" : "Воспроизвести"}
        >
          {isBuffering ? (
            <Loader2 size={22} className="animate-spin text-black" />
          ) : isPlaying ? (
            <Pause size={22} className="text-black" strokeWidth={2.5} />
          ) : (
            <Play size={22} className="text-black ml-0.5" strokeWidth={2.5} />
          )}
        </button>

        <p className="font-mono text-xs text-black/70 flex items-center">
          <Volume2 size={14} className="mr-1" /> Активный трек из Я.Музыки
        </p>
      </div>

      <div className="mt-2">
        <div className="flex items-center space-x-2">
          <span className="font-mono text-xs text-black/70 w-10">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={onTimeChange}
            disabled={!isLoaded}
            className={`flex-1 h-2 appearance-none rounded-full bg-gradient-to-r from-transparent to-transparent bg-[length:100%_100%] bg-no-repeat transition-all duration-200 ${
              isLoaded
                ? "cursor-pointer bg-[image:linear-gradient(rgba(255,255,255,0.3),_rgba(255,255,255,0.3))]"
                : "cursor-not-allowed opacity-50 bg-[image:linear-gradient(rgba(255,255,255,0.1),_rgba(255,255,255,0.1))]"
            }`}
            style={{
              background: `linear-gradient(to right, rgba(${rgbColor}, 0.8) ${
                (currentTime / (duration || 1)) * 100
              }%, rgba(255, 255, 255, 0.3) ${(currentTime / (duration || 1)) * 100}%)`,
            }}
          />
          <span className="font-mono text-xs text-black/70 w-10">{formatTime(duration)}</span>
        </div>
      </div>
    </>
  )
}

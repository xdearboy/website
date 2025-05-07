"use client"
import Link from "next/link"
import { useMusicPlayer } from "@/hooks/use-music-player"
import { AudioPlayer } from "@/components/audio-player"
import { useEffect, useState, memo } from "react"

const MusicBlock = memo(function MusicBlock({
  trackData,
  error,
  isLoading,
  isPlaying,
  currentTime,
  duration,
  isLoaded,
  isBuffering,
  getRgbFromColor,
  togglePlay,
  handleTimeChange,
  audioRef,
  canvasRef,
  currentTrackUrl,
}) {
  return (
    <div
      style={{
        borderRadius: "8px",
        border: "1px solid #9BA3D6",
        background: "rgba(255, 255, 255, 0.50)",
        boxShadow: "0px 0px 26px 0px rgba(0, 0, 0, 0.30)",
        position: "relative",
        overflow: "hidden",
      }}
      className="w-full p-4"
    >
      <div className="relative z-20">
        <div className="flex items-center mb-3">
          <div
            className="w-[100px] h-[100px] bg-white rounded-lg overflow-hidden relative"
            style={{
              boxShadow: `0px 0px 25px 5px rgba(${getRgbFromColor()}, 0.9)`,
            }}
          >
            {!isLoading && trackData?.track?.img ? (
              <img
                src={trackData.track.img || "/placeholder.svg"}
                alt={`Обложка альбома ${trackData.track.title}`}
                className="w-full h-full object-cover"
                loading="eager"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-black/50 font-mono text-xs text-center p-2">
                {isLoading ? "Загрузка..." : "Нет обложки"}
              </div>
            )}
          </div>

          <div className="ml-6 flex flex-col justify-center flex-1">
            <h2 className="font-mono font-bold text-xl text-black">
              {isLoading ? "загрузка..." : trackData?.track?.title || "название"}
            </h2>
            <p className="font-mono text-black mb-2">
              {isLoading ? "загрузка..." : trackData?.track?.artist || "исполнитель"}
            </p>

            {!isLoading && (
              <AudioPlayer
                audioRef={audioRef}
                trackUrl={currentTrackUrl}
                isPlaying={isPlaying}
                isLoaded={isLoaded}
                isBuffering={isBuffering}
                currentTime={currentTime}
                duration={duration}
                rgbColor={getRgbFromColor()}
                onTogglePlay={togglePlay}
                onTimeChange={handleTimeChange}
              />
            )}

            {error && <p className="font-mono text-xs text-red-500">Ошибка загрузки данных</p>}
          </div>
        </div>
      </div>
    </div>
  )
})

const ProfileBlock = memo(function ProfileBlock() {
  return (
    <div
      style={{
        borderRadius: "8px",
        border: "1px solid #9BA3D6",
        background: "rgba(255, 255, 255, 0.50)",
        boxShadow: "0px 0px 26px 0px rgba(0, 0, 0, 0.30)",
      }}
      className="w-full p-6 text-center"
    >
      <pre className="font-mono text-black text-xl mb-4">
        {`/\\_/\\
( o.o )
> ^ <`}
      </pre>
      <h1 className="font-mono font-bold text-2xl text-black mb-2">xdearboy</h1>
      <p className="font-mono text-black">programmer, designer, and just a chill guy</p>
    </div>
  )
})

const LinksBlock = memo(function LinksBlock() {
  return (
    <div
      style={{
        borderRadius: "8px",
        border: "1px solid #9BA3D6",
        background: "rgba(255, 255, 255, 0.50)",
        boxShadow: "0px 0px 26px 0px rgba(0, 0, 0, 0.30)",
      }}
      className="w-full p-4 text-center"
    >
      <nav className="font-mono text-black flex flex-wrap justify-center gap-x-2">
        <a
          href="https://github.com/xdearboy"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:opacity-90 active:opacity-80 hover:scale-[98%] active:scale-[96%] transition-all duration-200 inline-block"
        >
          [github]
        </a>
        <span>|</span>
        <a
          href="https://t.me/contactfiuimwix_bot"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:opacity-90 active:opacity-80 hover:scale-[98%] active:scale-[96%] transition-all duration-200 inline-block"
        >
          [telegram]
        </a>
        <span>|</span>
        <a
          href="https://github.com/xdearboy/pterodactyl-crasher"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:opacity-90 active:opacity-80 hover:scale-[98%] active:scale-[96%] transition-all duration-200 inline-block"
        >
          [ptero-crasher]
        </a>
        <span>|</span>
        <span
          className="cursor-pointer underline hover:opacity-90 active:opacity-80 hover:scale-[98%] active:scale-[96%] transition-all duration-200 inline-block"
          onClick={() => {
            navigator.clipboard.writeText("feeeeelbaaaaad")
            alert("Юзернейм скопирован!")
          }}
        >
          [discord]
        </span>
        <span>|</span>
        <Link href="/blog" className="underline hover:opacity-90 active:opacity-80 hover:scale-[98%] active:scale-[96%] transition-all duration-200 inline-block">
          [blog]
        </Link>
        <span>|</span>
        <a
          href="https://t.me/vroffteam"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:opacity-90 active:opacity-80 hover:scale-[98%] active:scale-[96%] transition-all duration-200 inline-block"
        >
          [blog in tg]
        </a>
        <span>|</span>
        <a
          href="/donate"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:opacity-90 active:opacity-80 hover:scale-[98%] active:scale-[96%] transition-all duration-200 inline-block"
        >
          [donate]
        </a>
      </nav>
    </div>
  )
})

export default function Home() {
  const [isMounted, setIsMounted] = useState(false)
  const musicPlayer = useMusicPlayer()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div
        className="flex min-h-screen flex-col items-center justify-center px-4 py-8 gap-4"
        style={{
          background:
            "linear-gradient(108deg, rgba(85, 102, 221, 0.84) 0%, rgba(140, 134, 198, 0.90) 50%, rgba(90, 160, 152, 0.90) 100%)",
        }}
      >
        <div className="flex flex-col items-center w-full max-w-[500px] gap-4">
          <div className="w-full h-[150px] rounded-lg bg-white/50 animate-pulse"></div>
          <div className="w-full h-[200px] rounded-lg bg-white/50 animate-pulse"></div>
          <div className="w-full h-[100px] rounded-lg bg-white/50 animate-pulse"></div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center px-4 py-8 gap-4"
      style={{
        background:
          "linear-gradient(108deg, rgba(85, 102, 221, 0.84) 0%, rgba(140, 134, 198, 0.90) 50%, rgba(90, 160, 152, 0.90) 100%)",
      }}
    >
      <div className="flex flex-col items-center w-full max-w-[500px] gap-4">
        <canvas ref={musicPlayer.canvasRef} className="hidden" />

        <MusicBlock {...musicPlayer} />
        <ProfileBlock />
        <LinksBlock />
      </div>

      <div className="mt-2 rounded-full border-2 border-black bg-white px-6 py-1 shadow-md">
        <p className="font-mono text-sm text-black">Made by xdearboy</p>
      </div>
    </div>
  )
}

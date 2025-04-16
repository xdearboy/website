"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [track, setTrack] = useState({ title: "", artist: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const response = await fetch("https://lively-limit-c955.arsd3v.workers.dev/", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          // Добавляем параметры для предотвращения кэширования
          cache: "no-store",
        })

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data = await response.json()
        setTrack(data || { title: "", artist: "" })
      } catch (err) {
        console.error("Ошибка получения данных:", err)
        setError(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTrack()
  }, [])

  return (
    <div
      className="flex min-h-screen items-center justify-center px-4"
      style={{
        background:
          "linear-gradient(108deg, rgba(85, 102, 221, 0.84) 0%, rgba(140, 134, 198, 0.90) 50%, rgba(90, 160, 152, 0.90) 100%)",
      }}
    >
      <div className="flex flex-col items-center">
        <div className="w-full max-w-[400px] p-6 sm:p-8 text-center rounded-lg border border-[#9BA3D6] bg-white/50 shadow-[0_0_26px_0_rgba(0,0,0,0.3)]">
          <p className="mb-8 font-mono text-black">
            сейчас играет у меня в Я.Музыке: <br /> <b>{isLoading ? "загрузка..." : track.title}</b> -{" "}
            <b>{isLoading ? "" : track.artist}</b>
          </p>
          <pre className="mb-4 font-mono text-black text-xl sm:text-2xl">
            {`/\\_/\\
( o.o )
> ^ <`}
          </pre>

          <h1 className="mb-2 font-mono text-black text-xl sm:text-2xl">
            xdearboy
          </h1>
          <h1 className="mb-2 font-mono text-black">
            programmer, designer, and just a chill guy
          </h1>

          <nav className="font-mono text-black">
            <a
              href="https://github.com/xdearboy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:opacity-90 active:opacity-80 hover:scale-[98%] active:scale-[96%] transition-all duration-200 inline-block"
            >
              [github]
            </a>
            <span className="mx-2">|</span>
            <a
              href="https://t.me/contactfiuimwix_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:opacity-90 active:opacity-80 hover:scale-[98%] active:scale-[96%] transition-all duration-200 inline-block"
            >
              [telegram]
            </a>
            <span className="mx-2">|</span>
            <a
              href="https://github.com/xdearboy/pterodactyl-crasher"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:opacity-90 active:opacity-80 hover:scale-[98%] active:scale-[96%] transition-all duration-200 inline-block"
            >
              [ptero-crasher]
            </a>
            <span className="mx-2">|</span>
            <span
              className="underline cursor-pointer hover:opacity-90 active:opacity-80 hover:scale-[98%] active:scale-[96%] transition-all duration-200 inline-block"
              onClick={() => {
                navigator.clipboard.writeText("feeeeelbaaaaad");
                alert("Юзернейм скопирован!");
              }}
            >
              [discord]
            </span>
            <span className="mx-2">|</span>
            <Link
              href="/blog"
              className="underline hover:opacity-90 active:opacity-80 hover:scale-[98%] active:scale-[96%] transition-all duration-200 inline-block"
            >
              [blog]
            </Link>
            <span className="mx-2">|</span>
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

        <div className="mt-4 rounded-[var(--Corner-Extra-large,28px)] border-2 border-black bg-[var(--Miscellaneous-Floating-Tab---Pill-Fill,#FFF)] px-4 py-1 shadow-[0_0_10px_0_rgba(0,0,0,0.25)]">
          <p className="font-mono text-sm text-black">Made by xdearboy</p>
        </div>
      </div>
    </div>
  );
}

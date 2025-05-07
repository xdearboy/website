"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import useSWR from "swr"

export interface TrackData {
  paused: boolean
  duration_ms: string
  progress_ms: string
  entity_id: string
  entity_type: string
  track: {
    track_id: number
    title: string
    artist: string
    img: string
    duration: number
    minutes: number
    seconds: number
    album: number
    download_link: string
  }
}

const fetcher = async (url: string) => {
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
    })

    if (!res.ok) return null

    const contentType = res.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) return null

    return await res.json()
  } catch (error) {
    return null
  }
}

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

const UPDATE_INTERVAL = 120000

export function useMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isBuffering, setIsBuffering] = useState(false)
  const [dominantColor, setDominantColor] = useState("rgba(85, 102, 221, 0.3)")
  const [currentTrackUrl, setCurrentTrackUrl] = useState<string | null>(null)
  const [trackMetadata, setTrackMetadata] = useState<TrackData | null>(null)
  const [lastTrackId, setLastTrackId] = useState<number | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const isInitialLoadRef = useRef(true)
  const audioElementRef = useRef<HTMLAudioElement | null>(null)
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const trackChangedRef = useRef(false)

  const defaultVolume = 0.3

  const {
    data: trackData,
    error,
    isLoading,
    mutate,
  } = useSWR<TrackData>("https://lively-limit-c955.arsd3v.workers.dev/", fetcher, {
    refreshInterval: UPDATE_INTERVAL,
    revalidateOnFocus: false,
    dedupingInterval: UPDATE_INTERVAL,
    fallbackData: null,
  })

  const updateMetadata = useCallback(async () => {
    try {
      const newData = await fetcher("https://lively-limit-c955.arsd3v.workers.dev/")
      if (!newData) return null

      setTrackMetadata(newData)

      const newTrackId = newData?.track?.track_id
      const trackChanged = newTrackId !== lastTrackId && newTrackId !== undefined

      if (trackChanged && newData?.track?.download_link) {
        trackChangedRef.current = true
        setCurrentTrackUrl(newData.track.download_link)
        setLastTrackId(newTrackId)
        setCurrentTime(0)

        if (newData.track?.img) {
          extractDominantColor(newData.track.img)
        }
      }

      return newData
    } catch (error) {
      return null
    }
  }, [lastTrackId])

  useEffect(() => {
    if (trackData) {
      const newTrackId = trackData?.track?.track_id
      const trackChanged = newTrackId !== lastTrackId && newTrackId !== undefined

      setTrackMetadata(trackData)

      if (trackChanged && trackData?.track?.download_link) {
        trackChangedRef.current = true
        setCurrentTrackUrl(trackData.track.download_link)
        setLastTrackId(newTrackId)
        setCurrentTime(0)

        if (trackData.track?.img) {
          extractDominantColor(trackData.track.img)
        }
      }
    }
  }, [trackData, lastTrackId])

  useEffect(() => {
    if (!audioElementRef.current) {
      const audioElement = new Audio()
      audioElement.preload = "auto"
      audioElement.volume = defaultVolume
      audioRef.current = audioElement
      audioElementRef.current = audioElement
    }

    return () => {
      if (audioElementRef.current) {
        audioElementRef.current.pause()
        audioElementRef.current.src = ""
      }

      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (audioRef.current && currentTrackUrl) {
      const wasPlaying = !audioRef.current.paused && !isInitialLoadRef.current

      audioRef.current.src = currentTrackUrl

      if (trackChangedRef.current) {
        audioRef.current.currentTime = 0
        setCurrentTime(0)
        trackChangedRef.current = false
      } else if (!isInitialLoadRef.current) {
        const progressFromApi = trackData?.progress_ms ? Number.parseInt(trackData.progress_ms) / 1000 : 0
        audioRef.current.currentTime = progressFromApi || 0
        setCurrentTime(progressFromApi || 0)
      }
      if (wasPlaying) {
        audioRef.current.play().catch(() => {
          setIsPlaying(false)
        })
      }

      isInitialLoadRef.current = false
    }
  }, [currentTrackUrl, trackData?.progress_ms])

  const togglePlay = useCallback(() => {
    if (!audioRef.current || !isLoaded || !currentTrackUrl) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current
        .play()
        .catch(() => {
          setIsPlaying(false)
        })
        .then(() => {
          setIsPlaying(true)
        })
    }
  }, [isPlaying, isLoaded, currentTrackUrl])

  const handleTimeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number.parseFloat(e.target.value)
    setCurrentTime(newTime)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }, [])

  const extractDominantColor = useCallback((imgSrc: string) => {
    if (!canvasRef.current) return

    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data

      let r = 0,
        g = 0,
        b = 0,
        count = 0
      for (let i = 0; i < data.length; i += 4) {
        r += data[i]
        g += data[i + 1]
        b += data[i + 2]
        count++
      }

      r = Math.floor(r / count)
      g = Math.floor(g / count)
      b = Math.floor(b / count)

      setDominantColor(`rgba(${r}, ${g}, ${b}, 0.3)`)
    }

    img.onerror = () => {
      setDominantColor("rgba(85, 102, 221, 0.3)")
    }

    img.src = imgSrc
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)

    const updateDuration = () => {
      if (!isNaN(audio.duration)) {
        setDuration(audio.duration)
      }
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)

      updateMetadata().then((newData) => {
        if (newData && newData.track?.download_link) {
          if (newData.track.track_id === lastTrackId) {
            if (audioRef.current) {
              audioRef.current.currentTime = 0
              setCurrentTime(0)
            }
          }
        }
      })
    }

    const handleLoaded = () => {
      setIsLoaded(true)
      setIsBuffering(false)

      if (isInitialLoadRef.current && trackData?.progress_ms) {
        const progressSeconds = Number.parseInt(trackData.progress_ms) / 1000
        audio.currentTime = progressSeconds
        setCurrentTime(progressSeconds)
        isInitialLoadRef.current = false
      }
    }

    const handleWaiting = () => setIsBuffering(true)
    const handlePlaying = () => {
      setIsBuffering(false)
      setIsPlaying(true)
    }
    const handlePause = () => {
      setIsPlaying(false)
    }
    const handleCanPlay = () => {
      setIsLoaded(true)
      setIsBuffering(false)
    }

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("durationchange", updateDuration)
    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("loadeddata", handleLoaded)
    audio.addEventListener("waiting", handleWaiting)
    audio.addEventListener("playing", handlePlaying)
    audio.addEventListener("pause", handlePause)
    audio.addEventListener("canplay", handleCanPlay)

    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("durationchange", updateDuration)
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("loadeddata", handleLoaded)
      audio.removeEventListener("waiting", handleWaiting)
      audio.removeEventListener("playing", handlePlaying)
      audio.removeEventListener("pause", handlePause)
      audio.removeEventListener("canplay", handleCanPlay)
    }
  }, [audioRef.current, trackData?.progress_ms, updateMetadata, lastTrackId])

  useEffect(() => {
    if (trackData && !currentTrackUrl && trackData.track?.download_link) {
      setTrackMetadata(trackData)
      setLastTrackId(trackData.track.track_id)
      setCurrentTrackUrl(trackData.track.download_link)

      const progressFromApi = trackData.progress_ms ? Number.parseInt(trackData.progress_ms) / 1000 : 0
      setCurrentTime(progressFromApi)

      if (trackData.track?.img) {
        extractDominantColor(trackData.track.img)
      }

      isInitialLoadRef.current = true
    }
  }, [trackData, currentTrackUrl, extractDominantColor])

  const getRgbFromColor = useCallback(() => {
    const match = dominantColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
    if (match) {
      return `${match[1]}, ${match[2]}, ${match[3]}`
    }
    return "85, 102, 221"
  }, [dominantColor])

  const displayData = trackMetadata || trackData

  const refreshData = useCallback(() => {
    mutate()
  }, [mutate])

  return {
    trackData: displayData,
    error,
    isLoading: isLoading && !displayData,
    isPlaying,
    currentTime,
    duration,
    isLoaded,
    isBuffering,
    dominantColor,
    getRgbFromColor,
    togglePlay,
    handleTimeChange,
    audioRef,
    canvasRef,
    currentTrackUrl,
    refreshData,
  }
}

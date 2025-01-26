"use client"

import { useState, useEffect } from "react"
import { JetBrains_Mono } from 'next/font/google'


const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin', 'cyrillic'],
    weight: ['400', '700'],
    variable: '--font-jetbrains',
})

export default function DonateCard() {
    const [copiedAddress, setCopiedAddress] = useState<string | null>(null)
    const [showNotification, setShowNotification] = useState(false)

    const cryptoAddresses = [
        {
            title: "Cloudtips",
            value: "pay.cloudtips.ru/p/fdaea5a6",
            isLink: true,
        },
        {
            title: "Crypto-bot",
            value: "t.me/send?start=IVTISEyPdXCn",
            isLink: true,
        },
        {
            title: "BTC",
            value: "bc1q0jp4772me2hxhqvf7vx286slzpm4z0m9n4mljk",
        },
        {
            title: "USDT - ERC20",
            value: "0xa22865D447cEdCf46bD61c5026DCacfBd25804D6",
        },
        {
            title: "TON",
            value: "UQCErKzWZGFTKO_oyRvpDn_5452RmMmQh9s-GWz9-9ygjxiy",
        },
        {
            title: (
                <span className="flex items-center gap-2">
                    <span className="text-[16px]">TRON</span>
                    <span className="text-[14px] text-gray-600">мин. сумма - 10 TRX</span>
                </span>
            ),
            value: "TUFk7BZJWUNCQQtSLparZxyBeGei461sfP",
        },
    ]

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text)
            setCopiedAddress(text)
            setShowNotification(true)
        } catch (err) {
            console.error("Failed to copy text: ", err)
        }
    }

    useEffect(() => {
        if (showNotification) {
            const timer = setTimeout(() => {
                setShowNotification(false)
            }, 2000)
            return () => clearTimeout(timer)
        }
    }, [showNotification])

    return (
        <div
            className={`min-h-screen flex items-center justify-center ${jetbrainsMono.variable}`}
            style={{
                background:
                    "linear-gradient(108deg, rgba(85, 102, 221, 0.84) 0%, rgba(140, 134, 198, 0.90) 50%, rgba(90, 160, 152, 0.90) 100%)",
            }}
        >
            <div className="relative w-full max-w-[460px] flex flex-col gap-[15px] p-[30px_15px] rounded-[8px] border border-[#9BA3D6] bg-[rgba(255,255,255,0.50)] shadow-[0px_0px_26px_0px_rgba(0,0,0,0.30)]">
                <h2 className="text-center font-mono font-bold text-[20px] text-black">donate me :3</h2>
                <div className="flex flex-col gap-[15px] w-full">
                    {cryptoAddresses.map((crypto) => (
                        <div
                            key={typeof crypto.value === "string" ? crypto.value : ""}
                            onClick={() =>
                                crypto.isLink ? window.open(`https://${crypto.value}`, "_blank") : copyToClipboard(crypto.value)
                            }
                            className={`
                cursor-pointer
                flex flex-col gap-[5px] 
                p-[15px] rounded-[8px] 
                border border-[#B8C1D3] 
                ${crypto.highlight ? "bg-[rgba(85,102,221,0.15)]" : "bg-[rgba(255,255,255,0.36)]"}
                backdrop-blur-[23.4px] 
                w-full
                font-mono
                transition-all duration-200 hover:scale-[1.02] hover:shadow-lg
                text-black
              `}
                        >
                            <div className="flex flex-col gap-[5px]">
                                <h3 className="text-[16px]">{crypto.title}</h3>
                                <p className="text-[14px] break-all opacity-80">{crypto.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div
                    className={`
            fixed bottom-8 left-1/2 -translate-x-1/2
            flex items-center justify-center
            w-[170px] h-[32px] px-2
            rounded-[8px] border border-[#9BA3D6] 
            bg-[rgba(255,255,255,0.50)]
            font-mono font-bold
            opacity-0 translate-y-2
            transition-all duration-300
            ${showNotification ? "opacity-100 translate-y-0" : ""}
          `}
                    style={{
                        boxShadow: "0px 0px 26px 0px rgba(0, 0, 0, 0.30)",
                    }}
                >
                    <span className="text-[14px] leading-none whitespace-nowrap text-black">copied to clipboard</span>
                </div>
            </div>
        </div>
    )
}


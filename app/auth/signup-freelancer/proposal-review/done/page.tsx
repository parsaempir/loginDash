"use client"

import Image from "next/image"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DoneSuccessPage() {
    const router = useRouter()

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("/auth/login")
        }, 3000)
        return () => clearTimeout(timer)
    }, [router])

    return (
        <div className="flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-700 min-h-screen w-full relative bg-white">
            {/* Background Image */}
            <div className="absolute inset-0 -z-10 h-full w-full">
                <Image
                    src="/signup.png"
                    alt="Success Background"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
            </div>

            {/* Content Container */}
            <div className="flex flex-col items-center justify-center p-6 text-center">
                <div className="flex flex-col md:flex-row items-center gap-4 mb-3">
                    <div className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-[#F2F2F2]">
                        <svg
                            className="h-6 w-6 md:h-8 md:w-8 text-[#4CAF50]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-[28px] md:text-[36px] font-bold text-[#1D1D1F] tracking-tight">Done</h2>
                </div>
                <p className="text-[#1D1D1F] text-[14px] md:text-[16px] font-medium opacity-80 max-w-[280px] md:max-w-none">
                    you'll jump into Login page in a few seconds
                </p>
            </div>
        </div>
    )
}

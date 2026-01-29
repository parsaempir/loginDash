"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function InviteClientPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [error, setError] = useState(false)
    const [isSent, setIsSent] = useState(false)
    const [isWaiting, setIsWaiting] = useState(false)

    const validateEmail = (email: string) => {
        const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        return regex.test(email) && email.length > 5
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (validateEmail(email)) {
            setError(false)
            setIsSent(true)

            // Step 1: Show "Invite sent!" for 1s
            setTimeout(() => {
                setIsSent(false)
                setIsWaiting(true)

                // Step 2: Show "Waiting for client..." for 1.5s then navigate
                setTimeout(() => {
                    router.push("/auth/signup-freelancer/proposal-review")
                }, 1500)
            }, 1000)
        } else {
            setError(true)
        }
    }

    return (
        <div className="flex min-h-screen lg:h-screen bg-white overflow-y-auto lg:overflow-hidden">
            {/* Left Column - Form */}
            <div className="flex w-full flex-col p-6 md:p-12 lg:w-1/2 lg:p-16 xl:p-24 xl:pr-10 2xl:px-40 transition-all duration-300">
                <div className="mx-auto lg:ml-auto lg:mr-0 w-full max-w-[480px] animate-in fade-in slide-in-from-bottom-4 duration-500 py-10 lg:py-0">
                    {/* Logo Section */}
                    <div className="mb-10 lg:mb-24 flex items-center">
                     
                  
                        <div className="flex items-center gap-2 mb-50">
                            <Image
                                src="/Vector 16.svg"
                                alt="Projio Logo"
                                width={24}
                                height={24}
                                className="h-8 w-8"
                            />
                            <span className="text-xl font-bold tracking-tight text-[#1D1D1F]">Projio</span>
                        </div>
                    </div>

                    <div className="mb-8 lg:mb-10 space-y-4">
                        <h1 className="text-[28px] md:text-[32px] font-bold tracking-tight text-[#1D1D1F]">Invite Client</h1>
                        <p className="text-[14px] md:text-[15px] text-[#86868B] leading-relaxed">
                            Add your client to Kick-off your project
                        </p>
                    </div>

                    <form className="space-y-8" onSubmit={handleSubmit} noValidate>
                        <div className="space-y-2">
                            <div className="relative group">
                                <div className={`absolute left-4 top-[14px] w-5 h-5 z-10 transition-all ${error ? "invert-[17%] sepia-[89%] saturate-[6154%] hue-rotate-[353deg] brightness-[94%] contrast-[103%]" : "opacity-60"}`}>
                                    <Image
                                        src="/icon-envelope.svg"
                                        alt="Email Icon"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <Input
                                    type="text"
                                    value={email}
                                    disabled={isSent || isWaiting}
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                        if (error) setError(false)
                                    }}
                                    placeholder="e.g: example@domain.com"
                                    className={`h-12 pl-12 rounded-xl text-[15px] placeholder:text-[#86868B]/50 transition-all ${error ? "border-[#FF4D4D] text-[#FF4D4D] bg-[#FFF5F5]" : "border-[#919191] focus:border-[#0C6FFF] text-[#1D1D1F]"
                                        } ${isSent || isWaiting ? "opacity-50 cursor-not-allowed" : ""}`}
                                />
                            </div>
                            {error && (
                                <div className="flex items-center gap-1.5 mt-1 text-[#FF4D4D] animate-in fade-in slide-in-from-top-1 duration-200">
                                    <div className="flex items-center justify-center w-[14px] h-[14px] rounded-full border border-[#FF4D4D] text-[10px] font-bold">
                                        !
                                    </div>
                                    <span className="text-[11px] font-medium">Invalid email, try again</span>
                                </div>
                            )}
                        </div>

                        <Button
                            variant="primary"
                            type="submit"
                            disabled={!email || isSent || isWaiting}
                            className={`w-full text-base h-[52px] rounded-xl shadow-none font-semibold transition-all duration-300 ${isSent || isWaiting
                                ? "bg-[#E5E5E5] text-[#1D1D1F] cursor-default"
                                : email
                                    ? "bg-[#0C6FFF] hover:bg-[#0056D2] text-white"
                                    : "bg-[#F5F8FF] text-[#0C6FFF]/30 cursor-not-allowed"
                                }`}
                        >
                            {isSent ? "Invite sent!" : isWaiting ? "Waiting for client..." : email ? "Send invite" : "Send invite & continue"}
                        </Button>
                    </form>
                </div>
            </div>

            {/* Right Column - Illustration */}
            <div className="hidden lg:block lg:flex-1 py-2 px-4 xl:pl-10 xl:pr-22 2xl:py-20 2xl:px-20">
                <div className="relative h-full w-full rounded-[100px]">
                    <Image
                        src="/right-column.png"
                        alt="Login Illustration"
                        fill
                        className="object-contain scale-118"
                        priority
                    />
                </div>
            </div>
        </div>
    )
}

"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Info } from "lucide-react"

export default function CreateWorkspacePage() {
    const router = useRouter()
    const [profileImage, setProfileImage] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const savedImage = localStorage.getItem("userProfileImage")
        if (savedImage) {
            setProfileImage(savedImage)
        }
    }, [])

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            setProfileImage(imageUrl)
            localStorage.setItem("userProfileImage", imageUrl)
        }
    }

    const handleCircleClick = () => {
        fileInputRef.current?.click()
    }

    return (
        <div className="flex min-h-screen lg:h-screen bg-white overflow-y-auto lg:overflow-hidden">
            {/* Left Column - Form */}
            <div className="flex w-full flex-col p-6 md:p-12 lg:w-1/2 lg:p-16 xl:p-24 xl:pr-10 2xl:px-40 transition-all duration-300">
                <div className="mx-auto lg:ml-auto lg:mr-0 w-full max-w-[480px] animate-in fade-in slide-in-from-bottom-4 duration-500 py-10 lg:py-0">
                    {/* Logo Section */}
                    <div className="mb-10 lg:mb-14 flex items-center">
                        <div className="flex items-center gap-2">
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
                        <h1 className="text-[28px] md:text-[32px] font-bold tracking-tight text-[#1D1D1F]">Create your workspace</h1>
                        <p className="text-[14px] md:text-[15px] text-[#86868B] leading-relaxed">
                            Your account has been successfully verified.<br className="hidden md:block" />
                            Next, provide your organization's name and address to proceed.
                        </p>
                    </div>

                    {/* Image Upload Persistence */}
                    <div className="flex flex-col items-center mb-10">
                        <div className="relative mb-6">
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            <div
                                onClick={handleCircleClick}
                                className="h-[100px] w-[100px] md:h-[128px] md:w-[128px] rounded-full bg-[#F5F8FF] flex items-center justify-center cursor-pointer hover:bg-[#EEF3FF] transition-all overflow-hidden border-none group relative"
                            >
                                {profileImage ? (
                                    <Image
                                        src={profileImage}
                                        alt="Workspace Logo"
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="relative w-10 h-10 transition-transform group-hover:scale-110">
                                        <Image
                                            src="/Upload Icon.svg"
                                            alt="Upload"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center gap-2 opacity-60">
                            <Info size={14} className="text-[#86868B]" />
                            <p className="text-[11px] text-[#86868B]">Upload your workspace logo or image</p>
                        </div>
                    </div>

                    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); router.push("/auth/invite-client"); }}>
                        <div className="space-y-2">
                            <p className="text-[13px] font-medium text-[#1D1D1F]">Workspace Name<span className="text-[#EB4335]">*</span></p>
                            <Input
                                placeholder="e.g. Design Studio, Team Nova"
                                className="h-11 border-[#E5E5E5] focus:border-[#0C6FFF] rounded-xl"
                            />
                        </div>

                        <div className="space-y-2">
                            <p className="text-[13px] font-medium text-[#1D1D1F]">Description</p>
                            <textarea
                                placeholder="A short note about what this workspace is for"
                                className="w-full min-h-[100px] md:min-h-[120px] p-4 rounded-xl border border-[#E5E5E5] focus:border-[#0C6FFF] outline-none transition-all resize-none text-[15px] placeholder:text-[#86868B]/50"
                            />
                        </div>

                        <Button variant="primary" type="submit" className="w-full text-base h-[52px] bg-[#0C6FFF] hover:bg-[#0056D2] rounded-xl shadow-none mt-4 font-semibold">
                            Next
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

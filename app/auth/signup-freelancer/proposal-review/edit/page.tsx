"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function EditProposalPage() {
    const router = useRouter()

    const handleSubmit = () => {
        router.push("/auth/signup-freelancer/proposal-review/done")
    }

    return (
        <div className="min-h-screen bg-white flex flex-col items-center relative gap-8">
            {/* Branded Header */}
            <div className="w-full h-[100px] md:h-[150px] relative flex items-center px-6 md:px-12 overflow-hidden bg-[#FBFBFB]">
                <Image
                    src="/Frame 2147228857.png"
                    alt="Background Pattern"
                    fill
                    className="object-cover opacity-60"
                />
                <div className="relative z-10 flex items-center gap-2">
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

            {/* Main Content Area */}
            <div className="w-full max-w-[800px] px-6 md:px-8 pb-24 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Progress Stepper */}
                <div className="flex items-center justify-center gap-4 md:gap-8 mb-12 md:mb-16 relative">
                    <div className="flex flex-col items-center gap-2 relative">
                        <div className="h-9 w-9 rounded-full bg-[#EBF3FF] flex items-center justify-center">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0C6FFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </div>
                    </div>
                    <div className="h-[1px] w-[50px] bg-[#E5E5E5]" />
                    <div className="flex flex-col items-center gap-2 relative">
                        <div className="h-9 w-9 rounded-full bg-[#F2F2F2] flex items-center justify-center text-[15px] font-medium text-[#1D1D1F]">
                            2
                        </div>
                        <span className="text-[12px] font-medium text-[#1D1D1F] absolute -bottom-6">Proposal</span>
                    </div>
                </div>

                <div className="w-full max-w-[600px] space-y-12">
                    {/* Header Text */}
                    <div className="text-left">
                        <h1 className="text-[28px] md:text-[36px] font-[500] tracking-tight text-[#1D1D1F]">Edit Proposal</h1>
                    </div>

                    {/* From/To Display */}
                    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 py-4">
                        <div className="h-9 w-9 relative flex-shrink-0">
                            <Image
                                src="/Leading Icon.svg"
                                alt="User Icon"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-3 text-[15px]">
                            <div className="flex items-center gap-3">
                                <span className="text-[#86868B]">From</span>
                                <span className="font-semibold text-[#1D1D1F]">Alex Miller</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-[#86868B] md:ml-4">To</span>
                                <span className="font-semibold text-[#1D1D1F]">John Doe</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-10">
                        {/* Timing Section */}
                        <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
                            <div className="mt-1 md:mt-4 h-9 w-9 relative flex-shrink-0">
                                <Image
                                    src="/Leading Icon (2).svg"
                                    alt="Time Icon"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div className="flex-1 grid grid-cols-2 gap-4 w-full">
                                <div className="space-y-2">
                                    <label className="text-[13px] text-[#86868B] font-medium ml-1">Start Date</label>
                                    <Input
                                        defaultValue="2025/04/02"
                                        className="h-[52px] rounded-xl border-[#C7C7CC] focus:border-[#0C6FFF] focus:ring-0 text-[15px] font-medium"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[13px] text-[#86868B] font-medium ml-1">End Date</label>
                                    <Input
                                        defaultValue="2025/04/02"
                                        className="h-[52px] rounded-xl border-[#C7C7CC] focus:border-[#0C6FFF] focus:ring-0 text-[15px] font-medium"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Pricing Section */}
                        <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
                            <div className="mt-1 md:mt-4 h-9 w-9 relative flex-shrink-0">
                                <Image
                                    src="/Leading Icon (3).svg"
                                    alt="Pricing Icon"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div className="flex-1 grid grid-cols-2 gap-4 w-full">
                                <div className="space-y-2">
                                    <label className="text-[13px] text-[#86868B] font-medium ml-1">Currency</label>
                                    <div className="relative">
                                        <select className="w-full h-[52px] rounded-xl border border-[#C7C7CC] focus:border-[#0C6FFF] outline-none text-[15px] font-medium px-4 bg-white appearance-none cursor-pointer">
                                            <option value="USD">USD</option>
                                            <option value="EUR">EUR</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#86868B]">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[13px] text-[#86868B] font-medium ml-1">Pricing Model</label>
                                    <div className="relative">
                                        <select className="w-full h-[52px] rounded-xl border border-[#C7C7CC] focus:border-[#0C6FFF] outline-none text-[15px] font-medium px-4 bg-white appearance-none cursor-pointer">
                                            <option value="Monthly">Monthly</option>
                                            <option value="Fixed">Fixed Rate</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#86868B]">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Note Section */}
                        <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
                            <div className="mt-1 md:mt-4 text-[15px] font-medium text-[#1D1D1F] md:w-[22px]">Note</div>
                            <div className="flex-1 w-full">
                                <textarea
                                    defaultValue="Lorem ipsum volutpat molestie sed sed pulvinar sagittis eget duis mattis ipsum ullamcorper suspendisse purus."
                                    className="w-full min-h-[120px] p-4 rounded-xl border border-[#C7C7CC] focus:border-[#0C6FFF] outline-none transition-all resize-none text-[15px] font-medium leading-relaxed"
                                />
                                <div className="flex justify-end mt-1">
                                    <span className="text-[10px] text-[#C7C7CC] uppercase tracking-widest font-bold">800</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                        onClick={handleSubmit}
                        className="w-full h-[56px] text-[16px] font-bold bg-[#0C6FFF] hover:bg-[#0056D2] rounded-xl shadow-none transition-all mt-8"
                    >
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    )
}

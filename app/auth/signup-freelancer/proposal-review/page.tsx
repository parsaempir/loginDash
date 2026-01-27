"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function ProposalReviewPage() {
    const router = useRouter()
    const [showNotification, setShowNotification] = useState(true)

    // Auto-dismiss notification after 10 seconds
    useEffect(() => {
        if (showNotification) {
            const timer = setTimeout(() => {
                setShowNotification(false)
            }, 10000)
            return () => clearTimeout(timer)
        }
    }, [showNotification])

    return (
        <div className="min-h-screen bg-white flex flex-col items-center relative">
            {/* Success Notification Bar - Floating Overlay */}
            {showNotification && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full flex justify-center px-6 pointer-events-none">
                    <div className="bg-[#E8F5E9] border border-[#C8E6C9] rounded-2xl px-6 py-4 flex items-center gap-4 max-w-[540px] animate-in fade-in slide-in-from-top-4 duration-500 shadow-xl pointer-events-auto backdrop-blur-sm bg-opacity-95">
                        <p className="text-[15px] text-[#2E7D32] font-medium leading-relaxed">
                            The client successfully logged in and submitted the requirement.
                        </p>
                        <button
                            onClick={() => setShowNotification(false)}
                            className="text-[#2E7D32] hover:opacity-50 transition-all p-1 hover:bg-[#2E7D32]/10 rounded-full"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>
                </div>
            )}

            {/* Branded Header */}
            <div className="w-full h-[140px] relative flex items-center px-12 overflow-hidden bg-[#FBFBFB]">
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

            {/* Progress Stepper */}
            <div className="flex items-center justify-center gap-8 mt-12 mb-16 px-6">
                <div className="flex flex-col items-center gap-2 relative">
                    <div className="h-9 w-9 rounded-full bg-[#F2F2F2] flex items-center justify-center text-[15px] font-medium text-[#1D1D1F]">
                        1
                    </div>
                    <span className="text-[12px] font-medium text-[#1D1D1F] absolute -bottom-6">Requirements</span>
                </div>
                <div className="h-[1px] w-[40px] bg-[#E5E5E5]" />
                <div className="flex flex-col items-center gap-2">
                    <div className="h-9 w-9 rounded-full bg-[#F2F2F2] flex items-center justify-center text-[15px] font-medium text-[#86868B]">
                        2
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="w-full max-w-[1000px] px-8 pb-24 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="space-y-12">
                    {/* Page Header */}
                    <div className="space-y-4">
                        <h1 className="text-[32px] font-bold tracking-tight text-[#1D1D1F]">Review Project Requierements</h1>
                        <p className="text-[15px] text-[#424245] leading-relaxed max-w-[440px]">
                            The freelancer sent a proposal for this project.<br />
                            Review the details below and choose an action.
                        </p>
                    </div>

                    {/* Section: Project Goals */}
                    <div className="space-y-3">
                        <h2 className="text-[18px] font-bold text-[#1D1D1F]">Project Goals</h2>
                        <p className="text-[15px] text-[#424245] leading-relaxed">
                            Lorem ipsum dolor sit amet consectetur. Turpis sollicitudin morbi et malesuada adipiscing massa. Lorem ipsum dolor sit amet consectetur. Turpis sollicitudin morbi et malesuada adipiscing massa. Lorem ipsum dolor sit amet consectetur. Turpis sollicitudin morbi et malesuada adipiscing massa.
                        </p>
                    </div>

                    {/* Section: Scope of Work */}
                    <div className="space-y-3">
                        <h2 className="text-[18px] font-bold text-[#1D1D1F]">Scope of Work (Deliverables)</h2>
                        <div className="text-[15px] text-[#424245] leading-relaxed space-y-1">
                            <p>Lorem ipsum dolor sit amet consectetur</p>
                            <p>sit amet consectetur.</p>
                            <p>Turpis sollicitudin morbi et malesuada adipiscing massa.</p>
                        </div>
                    </div>

                    {/* Section: Acceptance Criteria */}
                    <div className="space-y-3">
                        <h2 className="text-[18px] font-bold text-[#1D1D1F]">Acceptance Criteria</h2>
                        <p className="text-[15px] text-[#424245] leading-relaxed">
                            Lorem ipsum dolor sit amet consectetur. Turpis sollicitudin morbi et malesuada adipiscing massa. Lorem ipsum dolor sit amet consectetur. Turpis sollicitudin morbi et
                        </p>
                    </div>

                    {/* Section: Reference Files */}
                    <div className="space-y-4">
                        <h2 className="text-[18px] font-bold text-[#1D1D1F]">Reference Files</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[1, 2].map((i) => (
                                <div key={i} className="flex items-center p-3 bg-[#F9F9F9] rounded-xl border border-[#F2F2F2] hover:bg-[#F2F2F2] transition-colors cursor-pointer group">
                                    <div className="h-12 w-12 bg-[#FFF0E6] rounded-lg flex flex-col items-center justify-center mr-3 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-3 h-3 bg-[#FF9500]/20 rounded-bl-lg" />
                                        <span className="text-[10px] font-bold text-[#FF9500] mt-1">png</span>
                                        <div className="w-6 h-0.5 bg-[#FF9500]/40 rounded-full mt-1" />
                                        <div className="w-4 h-0.5 bg-[#FF9500]/40 rounded-full mt-0.5" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[14px] font-semibold text-[#1D1D1F]">image.png</span>
                                        <span className="text-[11px] text-[#86868B]">3.3 MB</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="">
                        <Button
                            variant="primary"
                            onClick={() => router.push("/auth/signup-freelancer/proposal-review/review")}
                            className="w-[200px] h-[48px] text-[16px] font-semibold bg-[#0C6FFF] hover:bg-[#0056D2] rounded-xl shadow-none transition-all"
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

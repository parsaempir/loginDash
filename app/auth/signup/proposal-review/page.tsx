"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function ClientReviewProposalPage() {
    const router = useRouter()
    const [showRequestModal, setShowRequestModal] = useState(false)
    const [showAcceptModal, setShowAcceptModal] = useState(false)
    const [requestMessage, setRequestMessage] = useState("")
    const [modalError, setModalError] = useState(false)

    const handleSendRequest = () => {
        if (!requestMessage.trim()) {
            setModalError(true)
            return
        }
        setModalError(false)
        setShowRequestModal(false)
    }

    const handleAccept = () => {
        setShowAcceptModal(false)
        router.push("/auth/signup/proposal-review/done")
    }

    return (
        <div className="min-h-screen bg-white flex flex-col items-center relative">
            {/* Branded Header */}
            <div className="w-full h-[150px] relative flex items-center px-12 overflow-hidden bg-[#FBFBFB]">
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
            <div className="flex items-center justify-center gap-8 mt-12 mb-20 px-6">
                <div className="flex flex-col items-center gap-2 relative">
                    <div className="h-9 w-9 rounded-full bg-[#E5F1FF] flex items-center justify-center transition-all duration-300">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0C6FFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    </div>
                </div>
                <div className="h-[1px] w-[50px] bg-[#E5E5E5]" />
                <div className="flex flex-col items-center gap-2 relative">
                    <div className="h-9 w-9 rounded-full bg-[#F2F2F2] flex items-center justify-center text-[15px] font-medium text-[#1D1D1F] border border-[#1D1D1F]/5">
                        2
                    </div>
                    <span className="text-[12px] font-medium text-[#1D1D1F] absolute -bottom-6">Proposal</span>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="w-full max-w-[720px] px-8 pb-32 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="space-y-16">
                    {/* Page Header */}
                    <div className="space-y-4">
                        <h1 className="text-[40px] font-bold tracking-tight text-[#1D1D1F]">Review Proposal</h1>
                        <p className="text-[16px] text-[#424245] leading-relaxed max-w-[480px]">
                            The freelancer sent a proposal for this project.<br />
                            Review the details below and choose an action.
                        </p>
                    </div>

                    {/* Proposal Details Sections */}
                    <div className="space-y-12">
                        {/* Users Section */}
                        <div className="flex items-center gap-8">
                            <div className="h-14 w-14 rounded-full   flex items-center justify-center flex-shrink-0">
                                <Image src="/Leading Icon.svg" alt="User Icon" width={32} height={32} />
                            </div>
                            <div className="flex items-center gap-14 text-[15px]">
                                <div className="flex items-center gap-3">
                                    <span className="text-[#86868B] font-medium">From</span>
                                    <span className="font-[400] text-[#303030] text-[17px]">Alex Miller</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-[#86868B] font-medium">To</span>
                                    <span className="font-[400]  text-[#303030] text-[17px]">John Doe</span>
                                </div>
                            </div>
                        </div>

                        {/* Dates Section */}
                        <div className="flex items-center gap-8">
                            <div className="h-14 w-14 rounded-full  flex items-center justify-center flex-shrink-0">
                                <Image src="/Leading Icon (2).svg" alt="Clock Icon" width={32} height={32} />
                            </div>
                            <div className="flex items-center gap-20 text-[15px]">
                                <div className="space-y-1.5">
                                    <p className="text-[13px] text-[#86868B] font-medium">Start Date</p>
                                    <p className="font-[400] text-[#303030] text-[18px]">June,01,2026</p>
                                </div>
                                <div className="space-y-1.5">
                                    <p className="text-[13px] text-[#86868B] font-medium">End Date</p>
                                    <p className="font-[400] text-[#303030] text-[18px]">June,30,2026</p>
                                </div>
                            </div>
                        </div>

                        {/* Pricing Section */}
                        <div className="flex items-center gap-8">
                            <div className="h-14 w-14 rounded-full flex items-center justify-center flex-shrink-0">
                                <Image src="/Leading Icon (3).svg" alt="Pricing Icon" width={32} height={32} />
                            </div>
                            <div className="flex items-center gap-20 text-[15px]">
                                <div className="space-y-1.5">
                                    <p className="text-[13px] text-[#86868B] font-medium">Currency</p>
                                    <p className="font-[400] text-[#303030] text-[18px]">USD</p>
                                </div>
                                <div className="space-y-1.5">
                                    <p className="text-[13px] text-[#86868B] font-medium">Pricing Model</p>
                                    <p className="font-[400] text-[#303030] text-[18px]">Monthly</p>
                                </div>
                            </div>
                        </div>

                        {/* Note Section */}
                        <div className="space-y-4 pt-6">
                            <h3 className="text-[18px] font-bold text-[#1D1D1F]">Note</h3>
                            <p className="text-[15px] text-[#424245] leading-relaxed max-w-[640px] font-medium">
                                Lorem ipsum volutpat molestie sed sed pulvinar sagittis eget duis mattis ipsum ullamcorper suspendisse purus.
                            </p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-start gap-4 pt-10">
                        <Button
                            onClick={() => setShowAcceptModal(true)}
                            className="h-[56px] w-[280px] bg-[#0C6FFF] hover:bg-[#0056D2] text-white font-bold rounded-xl shadow-none transition-all text-base"
                        >
                            Accept
                        </Button>
                        <Button
                            onClick={() => setShowRequestModal(true)}
                            variant="outline"
                            className="h-[56px] w-[280px] bg-[#F2F2F2] hover:bg-[#E5E5E5] text-[#1D1D1F] border-none font-bold rounded-xl shadow-none transition-all text-base"
                        >
                            Request Changes
                        </Button>
                    </div>
                </div>
            </div>

            {/* Request Changes Modal */}
            {showRequestModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
                        onClick={() => setShowRequestModal(false)}
                    />
                    <div className="relative w-full max-w-[640px] bg-white rounded-[24px] p-8 shadow-2xl animate-in zoom-in-95 fade-in duration-300">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-[24px] font-bold text-[#1D1D1F]">Request Changes</h2>
                            <button
                                onClick={() => setShowRequestModal(false)}
                                className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-[#F2F2F2] transition-colors"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1D1D1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>

                        <p className="text-[16px] text-[#424245] mb-6">
                            Let the freelancer know what needs to be updated.
                        </p>

                        <div className="mb-8">
                            <textarea
                                value={requestMessage}
                                onChange={(e) => {
                                    setRequestMessage(e.target.value)
                                    if (modalError) setModalError(false)
                                }}
                                className={`w-full h-[140px] px-5 py-4 rounded-2xl border text-[15px] text-[#1D1D1F] placeholder-[#86868B] outline-none resize-none leading-relaxed transition-all ${modalError
                                    ? "bg-[#FFF5F5] border-[#FF4D4D] focus:ring-2 focus:ring-[#FF4D4D]/10"
                                    : "bg-[#F2F2F2] border-none focus:ring-2 focus:ring-[#0C6FFF]/20"
                                    }`}
                                placeholder="Enter your message..."
                            />
                            {modalError && (
                                <div className="flex items-center gap-2 mt-3 text-[#FF4D4D] animate-in fade-in slide-in-from-top-1 duration-200">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="12" y1="8" x2="12" y2="12"></line>
                                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                    </svg>
                                    <span className="text-[14px] font-medium">This field cannot be empty</span>
                                </div>
                            )}
                        </div>

                        <Button
                            onClick={handleSendRequest}
                            className="w-full h-[56px] bg-[#0C6FFF] hover:bg-[#0056D2] text-white font-bold rounded-xl shadow-none transition-all text-[16px]"
                        >
                            Send Request
                        </Button>
                    </div>
                </div>
            )}

            {/* Accept Proposal Modal */}
            {showAcceptModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
                        onClick={() => setShowAcceptModal(false)}
                    />
                    <div className="relative w-full max-w-[640px] bg-white rounded-[24px] p-10  shadow-2xl animate-in zoom-in-95 fade-in duration-300 text-start">
                        <h2 className="text-[28px] font-bold text-[#1D1D1F] mb-4">Accept Proposal?</h2>
                        <p className="text-[17px] text-[#424245] mb-10 leading-relaxed font-medium">
                            Are you sure you want to accept the proposal?
                        </p>

                        <div className="flex items-center justify-between  ">
                            <button
                                onClick={() => setShowAcceptModal(false)}
                                className="text-[18px] font-bold text-[#1D1D1F] hover:opacity-70 pl-20 transition-opacity"
                            >
                                Back
                            </button>
                            <Button
                                onClick={handleAccept}
                                className="h-[50px] w-[280px] bg-[#0C6FFF] hover:bg-[#0056D2] text-white font-bold rounded-2xl shadow-none transition-all text-[18px]"
                            >
                                Accept
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

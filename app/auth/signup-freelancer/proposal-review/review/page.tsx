"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export default function SetProposalPage() {
    const router = useRouter()
    const [subStep, setSubStep] = useState(1)
    const [showModal, setShowModal] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [showNotification, setShowNotification] = useState(false)
    const [status, setStatus] = useState<'waiting' | 'changes' | 'message'>('waiting')

    // Form State
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [currency, setCurrency] = useState("")
    const [pricingModel, setPricingModel] = useState("")
    const [fullName, setFullName] = useState("")
    const [note, setNote] = useState("")

    // Error State
    const [errors, setErrors] = useState<Record<string, string>>({})

    // Auto-dismiss notification after 10 seconds
    useEffect(() => {
        if (showNotification) {
            const timer = setTimeout(() => {
                setShowNotification(false)
            }, 10000)
            return () => clearTimeout(timer)
        }
    }, [showNotification])

    // State transition simulation
    useEffect(() => {
        if (isSubmitted && status === 'waiting') {
            const timer = setTimeout(() => {
                setStatus('changes')
            }, 6000)
            return () => clearTimeout(timer)
        }
    }, [isSubmitted, status])

    const nextStep = () => {
        const newErrors: Record<string, string> = {}

        if (subStep === 1) {
            if (!startDate) newErrors.startDate = "Start date is required"
        } else if (subStep === 2) {
            if (!currency) newErrors.currency = "Currency is required"
            if (!pricingModel) newErrors.pricingModel = "Pricing model is required"
        } else if (subStep === 3) {
            if (!fullName) newErrors.fullName = "Full name is required"
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        setErrors({})
        if (subStep < 3) {
            setSubStep(subStep + 1)
        } else {
            setShowModal(true)
        }
    }

    const handleSubmit = () => {
        setShowModal(false)
        setIsSubmitted(true)
        setShowNotification(true)
        setStatus('waiting')
    }

    return (
        <div className="min-h-screen bg-white flex flex-col items-center relative gap-8">
            {/* Success Notification Bar - Floating Overlay */}
            {showNotification && (
                <div className="fixed top-2 left-1/2 -translate-x-1/2 z-[100] w-full flex justify-center px-6 pointer-events-none">
                    <div className="bg-[#E8F5E9] border border-[#C8E6C9] rounded-2xl px-6 py-4 flex items-center justify-between gap-8 w-full max-w-[480px] animate-in fade-in slide-in-from-top-4 duration-500 shadow-sm pointer-events-auto backdrop-blur-sm bg-opacity-90">
                        <div className="flex flex-col">
                            <p className="text-[14px] text-[#2E7D32] font-semibold leading-tight">
                                Proposal Submitted.
                            </p>
                            <p className="text-[14px] text-[#2E7D32] font-medium opacity-80">
                                Waiting for client response
                            </p>
                        </div>
                        <button
                            onClick={() => setShowNotification(false)}
                            className="text-[#2E7D32] hover:opacity-50 transition-all p-1 cursor-pointer"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>
                </div>
            )}
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
            <div className={`w-full max-w-[640px] px-6 md:px-8 pb-12 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700 ${isSubmitted ? 'blur-[2px] opacity-40 pointer-events-none' : ''}`}>
                {/* Progress Stepper */}
                <div className="flex items-center justify-center gap-4 md:gap-8 mb-12 md:mb-20 relative">
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

                <div className="w-full max-w-[480px]">
                    {/* Header Text */}
                    <div className="space-y-12 mb-8 md:mb-10">
                        <h1 className="text-[28px] md:text-[36px] font-bold tracking-tight text-[#1D1D1F]">Set Your Proposal</h1>
                    </div>

                    <div className="w-full">
                        <h2 className="text-[18px] md:text-[20px] font-[500] text-[#1D1D1F] mb-6 md:mb-10">
                            {subStep === 1 ? "Set up project timing" : subStep === 2 ? "Choose the Pricing plan" : "Final Details"}
                        </h2>
                    </div>

                    {/* Form Fields: Sub-step 1 (Timing) */}
                    {subStep === 1 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-10 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="space-y-3">
                                <label className="text-[14px] text-[#454545]">
                                    Start Date<span className="text-[#EB4335] ml-0.5">*</span>
                                </label>
                                <div className="relative group">
                                    <Input
                                        value={startDate}
                                        onChange={(e) => {
                                            setStartDate(e.target.value)
                                            if (errors.startDate) setErrors({ ...errors, startDate: "" })
                                        }}
                                        error={errors.startDate}
                                        placeholder="MM/DD/YY"
                                        className="h-[52px] rounded-xl border-[#686868] focus:border-[#0C6FFF] focus:ring-0 text-[15px] placeholder:text-[#C7C7CC] transition-all"
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[14px] text-[#454545]">
                                    End Date
                                </label>
                                <div className="relative group">
                                    <Input
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        placeholder="MM/DD/YY"
                                        className="h-[52px] rounded-xl border-[#686868] focus:border-[#0C6FFF] focus:ring-0 text-[15px] placeholder:text-[#C7C7CC] transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Form Fields: Sub-step 2 (Pricing) */}
                    {subStep === 2 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-10 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="space-y-3">
                                <label className="text-[14px] text-[#454545]">
                                    Currency<span className="text-[#EB4335] ml-0.5">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        value={currency}
                                        onChange={(e) => {
                                            setCurrency(e.target.value)
                                            if (errors.currency) setErrors({ ...errors, currency: "" })
                                        }}
                                        className={cn(
                                            "w-full h-[52px] rounded-xl border border-[#686868] focus:border-[#0C6FFF] outline-none text-[15px] px-4 bg-white appearance-none cursor-pointer",
                                            errors.currency && "border-red-500"
                                        )}
                                    >
                                        <option value="">Select</option>
                                        <option value="USD">USD</option>
                                        <option value="EUR">EUR</option>
                                    </select>
                                    <div className="absolute right-4 top-[26px] -translate-y-1/2 pointer-events-none text-[#86868B]">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                    </div>
                                    {errors.currency && <p className="text-[11px] text-red-500 mt-1">{errors.currency}</p>}
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[14px] text-[#454545]">
                                    Pricing Model<span className="text-[#EB4335] ml-0.5">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        value={pricingModel}
                                        onChange={(e) => {
                                            setPricingModel(e.target.value)
                                            if (errors.pricingModel) setErrors({ ...errors, pricingModel: "" })
                                        }}
                                        className={cn(
                                            "w-full h-[52px] rounded-xl border border-[#686868] focus:border-[#0C6FFF] outline-none text-[15px] px-4 bg-white appearance-none cursor-pointer",
                                            errors.pricingModel && "border-red-500"
                                        )}
                                    >
                                        <option value="">Select</option>
                                        <option value="Fixed">Fixed Rate</option>
                                        <option value="Hourly">Hourly Rate</option>
                                    </select>
                                    <div className="absolute right-4 top-[26px] -translate-y-1/2 pointer-events-none text-[#86868B]">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                    </div>
                                    {errors.pricingModel && <p className="text-[11px] text-red-500 mt-1">{errors.pricingModel}</p>}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Form Fields: Sub-step 3 (Final Details) */}
                    {subStep === 3 && (
                        <div className="space-y-8 mb-10 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="space-y-3">
                                <label className="text-[15px] font-medium text-[#1D1D1F]">
                                    Enter your full name<span className="text-[#EB4335] ml-0.5">*</span>
                                </label>
                                <Input
                                    value={fullName}
                                    onChange={(e) => {
                                        setFullName(e.target.value)
                                        if (errors.fullName) setErrors({ ...errors, fullName: "" })
                                    }}
                                    error={errors.fullName}
                                    placeholder="e.g: Alex Miller"
                                    className="h-[52px] rounded-xl border-[#686868] focus:border-[#0C6FFF] focus:ring-0 text-[15px] placeholder:text-[#C7C7CC] transition-all"
                                />
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-1">
                                    <label className="text-[15px] font-medium text-[#1D1D1F]">
                                        Add a note
                                    </label>
                                    <span className="text-[13px] text-[#86868B] font-normal">(optional)</span>
                                </div>
                                <textarea
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    placeholder="A short note about what this workspace is for"
                                    className="w-full min-h-[120px] p-4 rounded-xl border border-[#686868] focus:border-[#0C6FFF] outline-none transition-all resize-none text-[15px] placeholder:text-[#C7C7CC]"
                                />
                            </div>
                        </div>
                    )}

                    {/* Action Button */}
                    <div className="space-y-6">
                        <Button
                            variant="primary"
                            onClick={nextStep}
                            className="w-full h-[52px] text-[16px] font-bold bg-[#0C6FFF] hover:bg-[#0056D2] rounded-xl shadow-none transition-all flex items-center justify-center"
                        >
                            Next
                        </Button>

                        {/* Visual Progress Bar */}
                        <div className="w-full h-1.5 bg-[#F2F2F2] rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[#0C6FFF] rounded-full transition-all duration-500 ease-out"
                                style={{
                                    width: subStep === 1 ? "15%" : subStep === 2 ? "35%" : "90%"
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Waiting/Changes Success Modal */}
            {isSubmitted && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-in fade-in duration-500">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

                    <div className="relative w-full max-w-[640px] bg-white rounded-[24px] md:rounded-[40px] p-8 md:p-16 shadow-2xl flex flex-col items-center text-center space-y-6 md:space-y-10 animate-in zoom-in-95 slide-in-from-bottom-8 duration-700">
                        {status === 'waiting' ? (
                            <div className="flex flex-col items-center text-center space-y-10 animate-in zoom-in-95 slide-in-from-bottom-8 duration-700">
                                <div className="relative w-64 h-64">
                                    <Image
                                        src="/State icon (1).png"
                                        alt="Waiting for client response"
                                        fill
                                        className="object-contain"
                                        priority
                                    />
                                </div>

                                <div className="space-y-4">
                                    <h2 className="text-[32px] font-bold text-[#1D1D1F] tracking-tight">Waiting for client response</h2>
                                    <div className="space-y-1">
                                        <p className="text-[16px] text-[#86868B] font-medium">We've sent proposal to client.</p>
                                        <p className="text-[16px] text-[#86868B] font-medium">Please wait for their response</p>
                                    </div>
                                </div>
                            </div>
                        ) : status === 'changes' ? (
                            <div className="flex flex-col items-center text-center space-y-10 animate-in zoom-in-95 slide-in-from-bottom-8 duration-700">
                                <div className="relative w-64 h-64">
                                    <Image
                                        src="/State icon (2).png"
                                        alt="Changes Requested"
                                        fill
                                        className="object-contain"
                                        priority
                                    />
                                </div>

                                <div className="space-y-8 w-full">
                                    <div className="space-y-4 text-center">
                                        <h2 className="text-[32px] font-bold text-[#1D1D1F] tracking-tight">Changes Requested</h2>
                                        <div className="space-y-1">
                                            <p className="text-[16px] text-[#86868B] font-medium leading-relaxed">The client requested changes to your Proposal.</p>
                                            <p className="text-[16px] text-[#86868B] font-medium leading-relaxed">Review their message and update the relevant fields.</p>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={() => setStatus('message')}
                                        className="w-full h-[56px] text-[16px] font-bold bg-[#0C6FFF] hover:bg-[#0056D2] rounded-xl shadow-none transition-all"
                                    >
                                        View message
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-start text-left space-y-6 md:space-y-10 w-full animate-in zoom-in-95 fade-in duration-500">
                                <div className="space-y-4 md:space-y-6 w-full">
                                    <h2 className="text-[28px] md:text-[32px] font-bold text-[#1D1D1F] tracking-tight">Requested Changes</h2>
                                    <p className="text-[14px] md:text-[16px] text-[#86868B] font-medium leading-relaxed max-w-[480px]">
                                        The client requested changes to your Proposal. Review their message and update the relevant fields.
                                    </p>
                                </div>

                                <div className="w-full bg-[#F5F5F7] rounded-3xl p-8">
                                    <p className="text-[16px] text-[#1D1D1F] font-medium leading-relaxed italic">
                                        Please clarify total price <br />
                                        is it fixed or per revision?
                                    </p>
                                </div>

                                <Button
                                    onClick={() => router.push('/auth/signup-freelancer/proposal-review/edit')}
                                    className="w-full h-[56px] text-[16px] font-bold bg-[#0C6FFF] hover:bg-[#0056D2] rounded-xl shadow-none transition-all"
                                >
                                    Edit Requirements
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Submission Confirmation Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-in fade-in duration-300">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
                        onClick={() => setShowModal(false)}
                    />

                    {/* Modal Content */}
                    <div className="relative w-full max-w-[700px] bg-white rounded-2xl p-6 md:p-10 shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
                        <div className="space-y-6">
                            <h3 className="text-[24px] md:text-[28px] font-bold text-[#1D1D1F]">Submit Proposal?</h3>
                            <div className="space-y-4">
                                <p className="text-[14px] md:text-[16px] text-[#424245] leading-relaxed">
                                    Once submitted, you won't be able to edit this proposal unless the client requests changes.
                                </p>
                                <p className="text-[14px] md:text-[16px] text-[#424245] leading-relaxed">
                                    Please review your information before sending.
                                </p>
                            </div>

                            <div className="flex flex-col-reverse md:flex-row items-center gap-4 pt-4">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="w-full md:flex-1 h-[56px] text-[16px] font-semibold text-[#1D1D1F] hover:bg-gray-100 rounded-xl transition-all cursor-pointer"
                                >
                                    Back
                                </button>
                                <Button
                                    variant="primary"
                                    onClick={handleSubmit}
                                    className="w-full md:flex-1 h-[56px] text-[16px] font-bold bg-[#0C6FFF] hover:bg-[#0056D2] rounded-xl shadow-none"
                                >
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

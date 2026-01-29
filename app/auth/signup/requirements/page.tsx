"use client"

import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function RequirementsPage() {
    const router = useRouter()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [subStep, setSubStep] = useState(1)
    const [showModal, setShowModal] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [countdown, setCountdown] = useState(6)
    const [formData, setFormData] = useState({
        goals: "",
        scope: "",
        criteria: "",
        files: [] as File[]
    })
    const [errors, setErrors] = useState<Record<string, string>>({})

    // Countdown logic
    useEffect(() => {
        if (isSubmitted && countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
            return () => clearTimeout(timer)
        } else if (isSubmitted && countdown === 0) {
            router.push("/auth/signup/proposal-review")
        }
    }, [isSubmitted, countdown, router])

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault()

        const newErrors: Record<string, string> = {}
        if (subStep === 1 && !formData.goals.trim()) {
            newErrors.goals = "Project goals are required"
        } else if (subStep === 2 && !formData.scope.trim()) {
            newErrors.scope = "Scope of work is required"
        } else if (subStep === 3 && !formData.criteria.trim()) {
            newErrors.criteria = "Acceptance criteria is required"
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        if (subStep < 4) {
            setSubStep(subStep + 1)
        } else {
            setShowModal(true)
        }
    }

    const handleSubmit = () => {
        setShowModal(false)
        setIsSubmitted(true)
    }

    const handleBack = () => {
        if (subStep > 1) {
            setSubStep(subStep - 1)
        } else {
            router.back()
        }
    }

    const updateField = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        if (errors[field]) {
            setErrors(prev => {
                const newErrors = { ...prev }
                delete newErrors[field]
                return newErrors
            })
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files
        if (selectedFiles) {
            const newFiles = Array.from(selectedFiles)
            updateField("files", [...formData.files, ...newFiles])
        }
    }

    return (
        <div className="min-h-screen bg-white flex flex-col items-center relative">
            {/* Branded Header */}
            <div className="w-full h-[100px] md:h-[140px] relative flex items-center px-6 md:px-12 overflow-hidden bg-[#FBFBFB]">
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
            <div className="flex items-center justify-center gap-4 md:gap-8 mt-8 mb-10 md:mt-12 md:mb-16 px-6">
                <div className="flex flex-col items-center gap-2 relative">
                    <div className={cn(
                        "h-9 w-9 rounded-full flex items-center justify-center text-[15px] font-medium transition-all duration-300",
                        subStep >= 1 ? "bg-[#F2F2F2] text-[#1D1D1F] border border-[#1D1D1F]/5" : "bg-[#F2F2F2] text-[#86868B]"
                    )}>
                        1
                    </div>
                    <span className="text-[12px] font-medium text-[#1D1D1F] absolute -bottom-6">Requirements</span>
                </div>
                <div className="h-[1px] w-[50px] bg-[#E5E5E5]" />
                <div className="flex flex-col items-center gap-2 relative">
                    <div className={cn(
                        "h-9 w-9 rounded-full flex items-center justify-center text-[15px] font-medium transition-all duration-300",
                        subStep >= 4 ? "bg-[#F2F2F2] text-[#1D1D1F] border border-[#1D1D1F]/5" : "bg-[#F2F2F2] text-[#86868B]"
                    )}>
                        2
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="w-full max-w-[640px] px-6 md:px-8 pb-24 flex flex-col">
                <div className="space-y-12">
                    {/* Header Text */}
                    <h1 className="text-[28px] md:text-[36px] font-bold tracking-tight text-[#1D1D1F]">Add Project Requirements</h1>

                    <form onSubmit={handleNext} className="space-y-10">
                        {subStep === 1 && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                                <div className="space-y-1">
                                    <label className="text-[16px] font-bold text-[#1D1D1F]">
                                        Project Goals<span className="text-[#EB4335] ml-0.5">*</span>
                                    </label>
                                    <p className="text-[14px] text-[#86868B] font-medium opacity-80">
                                        What do you want to achieve with this project?
                                    </p>
                                </div>

                                <div className="relative">
                                    <textarea
                                        value={formData.goals}
                                        onChange={(e) => updateField("goals", e.target.value)}
                                        placeholder="Type here.."
                                        className={cn(
                                            "w-full min-h-[120px] md:min-h-[160px] p-4 md:p-6 rounded-xl border bg-white outline-none transition-all resize-none text-[16px] leading-relaxed placeholder:text-[#86868B]/40",
                                            errors.goals ? "border-red-500 ring-1 ring-red-500" : "border-[#C7C7CC] focus:border-[#0C6FFF] focus:ring-1 focus:ring-[#0C6FFF]"
                                        )}
                                    />
                                    {errors.goals && (
                                        <p className="text-[12px] text-red-500 mt-2 font-medium">{errors.goals}</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {subStep === 2 && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                                <div className="space-y-1">
                                    <label className="text-[16px] font-bold text-[#1D1D1F]">
                                        Scope of Work (Deliverables)<span className="text-[#EB4335] ml-0.5">*</span>
                                    </label>
                                    <p className="text-[14px] text-[#86868B] font-medium opacity-80">
                                        List expected deliverables. If possible, separate items with line breaks.
                                    </p>
                                </div>

                                <div className="relative">
                                    <textarea
                                        value={formData.scope}
                                        onChange={(e) => updateField("scope", e.target.value)}
                                        placeholder="Type here.."
                                        className={cn(
                                            "w-full min-h-[120px] md:min-h-[160px] p-4 md:p-6 rounded-xl border bg-white outline-none transition-all resize-none text-[16px] leading-relaxed placeholder:text-[#86868B]/40",
                                            errors.scope ? "border-red-500 ring-1 ring-red-500" : "border-[#C7C7CC] focus:border-[#0C6FFF] focus:ring-1 focus:ring-[#0C6FFF]"
                                        )}
                                    />
                                    {errors.scope && (
                                        <p className="text-[12px] text-red-500 mt-2 font-medium">{errors.scope}</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {subStep === 3 && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                                <div className="space-y-1">
                                    <label className="text-[16px] font-bold text-[#1D1D1F]">
                                        Acceptance Criteria<span className="text-[#EB4335] ml-0.5">*</span>
                                    </label>
                                    <p className="text-[14px] text-[#86868B] font-medium opacity-80">
                                        How will you know the work is "done" and acceptable?
                                    </p>
                                </div>

                                <div className="relative">
                                    <textarea
                                        value={formData.criteria}
                                        onChange={(e) => updateField("criteria", e.target.value)}
                                        placeholder="Type here.."
                                        className={cn(
                                            "w-full min-h-[120px] md:min-h-[160px] p-4 md:p-6 rounded-xl border bg-white outline-none transition-all resize-none text-[16px] leading-relaxed placeholder:text-[#86868B]/40",
                                            errors.criteria ? "border-red-500 ring-1 ring-red-500" : "border-[#C7C7CC] focus:border-[#0C6FFF] focus:ring-1 focus:ring-[#0C6FFF]"
                                        )}
                                    />
                                    {errors.criteria && (
                                        <p className="text-[12px] text-red-500 mt-2 font-medium">{errors.criteria}</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {subStep === 4 && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                                <div className="space-y-1">
                                    <label className="text-[16px] font-bold text-[#1D1D1F]">
                                        Add Reference Files <span className="text-[#86868B] font-normal text-[14px] ml-1">(optional)</span>
                                    </label>
                                </div>

                                <div className="relative">
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        className="hidden"
                                        multiple
                                    />
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className="w-full min-h-[120px] md:min-h-[160px] border-2 border-dashed border-[#C7C7CC] rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-all gap-2 group"
                                    >
                                        <div className="text-[15px] text-[#86868B] font-medium flex items-center gap-1 group-hover:text-[#1D1D1F]">
                                            <span className="text-[18px]">+</span> Click here to upload
                                        </div>
                                    </div>

                                    {formData.files.length > 0 && (
                                        <div className="mt-4 space-y-2">
                                            {formData.files.map((file, idx) => (
                                                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                                                    <div className="flex items-center gap-3 overflow-hidden">
                                                        <div className="h-8 w-8 bg-white rounded border border-gray-200 flex items-center justify-center flex-shrink-0">
                                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#86868B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
                                                        </div>
                                                        <span className="text-[14px] text-[#1D1D1F] font-medium truncate">{file.name}</span>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            updateField("files", formData.files.filter((_, i) => i !== idx));
                                                        }}
                                                        className="text-[#86868B] hover:text-red-500 p-1"
                                                    >
                                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="space-y-8 pt-4">
                            <div className="flex gap-4">
                                {subStep > 1 && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handleBack}
                                        className="flex-1 h-[56px] text-[16px] font-bold border-[#F2F2F2] bg-[#F2F2F2] hover:bg-[#E5E5E5] text-[#1D1D1F] rounded-xl shadow-none transition-all"
                                    >
                                        Pervious
                                    </Button>
                                )}
                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="flex-1 h-[56px] text-[16px] font-bold bg-[#0C6FFF] hover:bg-[#0056D2] rounded-xl shadow-none transition-all"
                                >
                                    {subStep === 4 ? "Submit" : "Next"}
                                </Button>
                            </div>

                            {/* bottom progress indicator */}
                            <div className="w-full h-1.5 bg-[#F2F2F2] rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-[#0C6FFF] rounded-full transition-all duration-700 ease-out"
                                    style={{ width: subStep === 1 ? "40%" : subStep === 2 ? "65%" : subStep === 3 ? "85%" : "98%" }}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* Confirmation Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-300"
                        onClick={() => setShowModal(false)}
                    />
                    <div className="relative w-full max-w-[640px] bg-white rounded-[24px] p-10 shadow-2xl animate-in zoom-in-95 fade-in duration-300">
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <h2 className="text-[24px] md:text-[28px] font-bold text-[#1D1D1F] tracking-tight">
                                    Submit Requirements?
                                </h2>
                                <p className="text-[15px] md:text-[17px] text-[#424245] leading-relaxed">
                                    Once submitted, you won't be able to edit this form again<br className="hidden md:block" />
                                    Please review your information before sending.
                                </p>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <Button
                                    variant="outline"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 h-[56px] text-[16px] font-bold border-none bg-[#F2F2F2] hover:bg-[#E5E5E5] text-[#1D1D1F] rounded-xl shadow-none transition-all"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleSubmit}
                                    className="flex-1 h-[56px] text-[16px] font-bold bg-[#0C6FFF] hover:bg-[#0056D2] text-white rounded-xl shadow-none transition-all"
                                >
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Modal */}
            {isSubmitted && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-300" />
                    <div className="relative w-full max-w-[640px] bg-white rounded-[24px] p-12 shadow-2xl animate-in zoom-in-95 fade-in duration-300 text-center">
                        <div className="space-y-8 flex flex-col items-center">
                            <div className="relative h-40 w-full flex items-center justify-center overflow-hidden">
                                <Image
                                    src="/State icon.png"
                                    alt="Success"
                                    width={240}
                                    height={240}
                                    className="object-contain animate-in slide-in-from-bottom-8 duration-700"
                                />
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-[28px] md:text-[32px] font-bold text-[#1D1D1F] tracking-tight">
                                    Requirements Submitted!
                                </h2>
                                <p className="text-[15px] md:text-[17px] text-[#424245] leading-relaxed max-w-[320px] mx-auto">
                                    These requirements are now locked.<br className="hidden md:block" />
                                    Continue to see proposal
                                </p>
                            </div>

                            <div className="w-full pt-4">
                                <Button
                                    onClick={() => router.push("/auth/signup/proposal-review")}
                                    className="w-full h-[56px] text-[16px] font-bold bg-[#F2F2F2] hover:bg-[#E5E5E5] text-[#1D1D1F] rounded-xl shadow-none transition-all"
                                >
                                    Continue 00:0{countdown}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

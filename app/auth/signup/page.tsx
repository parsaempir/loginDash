"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Info } from "lucide-react"

type SignupStep = "signup" | "verify" | "profile"

export default function SignupPage() {
    const [step, setStep] = useState<SignupStep>("signup")
    const [email, setEmail] = useState("mail@example.com")
    const router = useRouter()

    return (
        <div className="flex min-h-screen lg:h-screen bg-white overflow-y-auto lg:overflow-hidden">
            {/* Left Column - Form */}
            <div className={`flex w-full flex-col p-6 md:p-12 lg:w-1/2 transition-all duration-300 ${step === "profile" ? "lg:p-8 xl:p-12 2xl:px-20" : "lg:p-16 xl:p-24 xl:pr-10 2xl:px-40"}`}>
                {/* Content Section */}
                <div className="mx-auto lg:ml-auto lg:mr-0 w-full max-w-[480px] py-10 lg:py-0">
                    {/* Logo Section & Back Button */}
                    <div className="mb-10 lg:mb-16 flex items-center gap-4">
                        {(step === "verify" || step === "profile") && (
                            <button
                                onClick={() => setStep(step === "profile" ? "verify" : "signup")}
                                className="p-1 -ml-6 hover:bg-gray-100 rounded-full transition-colors group cursor-pointer"
                            >
                                <ArrowLeft size={20} className="text-gray-500 group-hover:text-black" />
                            </button>
                        )}
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

                    <div className="transition-all duration-500 ease-in-out">
                        {step === "signup" && (
                            <SignupForm
                                email={email}
                                setEmail={setEmail}
                                onContinue={() => setStep("verify")}
                            />
                        )}
                        {step === "verify" && (
                            <SignupVerificationForm
                                email={email}
                                onSuccess={() => setStep("profile")}
                            />
                        )}
                        {step === "profile" && (
                            <ProfileSetupForm email={email} onNext={() => router.push("/auth/signup/requirements")} />
                        )}
                    </div>
                </div>
            </div>

            {/* Right Column - Image */}
            <div className="hidden lg:block lg:flex-1 lg:py-20 px-4 xl:pl-10 xl:pr-22 2xl:py-22 2xl:px-20">
                <div className="relative h-full w-full  rounded-[100px]">
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

function SignupForm({ email, setEmail, onContinue }: { email: string; setEmail: (e: string) => void; onContinue: () => void }) {
    const [password, setPassword] = useState("")
    const [agreed, setAgreed] = useState(false)
    const [errors, setErrors] = useState<{ email?: string; password?: string; agreed?: string }>({})

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const newErrors: { email?: string; password?: string; agreed?: string } = {}

        if (!email) newErrors.email = "Email is required"
        if (!password) newErrors.password = "Password is required"
        else if (password.length < 8) newErrors.password = "Password must be at least 8 characters"
        if (!agreed) newErrors.agreed = "You must agree to the terms"

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        setErrors({})
        onContinue()
    }

    return (
        <div className="animate-in fade-in slide-in-from-left-4 duration-500">
            <div className="mb-8 lg:mb-10 space-y-3">
                <h1 className="text-[28px] md:text-[32px] font-bold tracking-tight text-[#1D1D1F]">
                    Welcome to <span className="text-[#0C6FFF]">Projio</span>
                </h1>
                <p className="text-[14px] md:text-[15px] text-[#86868B]">Please enter your email address to create an account.</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-2">
                    <p className="text-[13px] font-normal text-[#1D1D1F]">Email address</p>
                    <Input
                        placeholder="mail@example.com"
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                            if (errors.email) setErrors({ ...errors, email: undefined })
                        }}
                        error={errors.email}
                    />
                </div>

                <div className="space-y-2">
                    <p className="text-[13px] font-normal text-[#1D1D1F]">Password</p>
                    <div className="relative">
                        <Input
                            placeholder="Enter your password"
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                                if (errors.password) setErrors({ ...errors, password: undefined })
                            }}
                            error={errors.password}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2 py-2">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                        <div className="relative h-5 w-5 flex items-center justify-center">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                id="agreement"
                                checked={agreed}
                                onChange={(e) => {
                                    setAgreed(e.target.checked)
                                    if (errors.agreed) setErrors({ ...errors, agreed: undefined })
                                }}
                            />
                            <div className="absolute inset-0 rounded border border-[#D2D2D7] bg-white transition-all peer-checked:bg-[#1D61F2] peer-checked:border-[#1D61F2] hover:border-[#1D61F2]" />
                            <svg
                                className="relative h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={4}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <span className="text-[13px] text-[#1D1D1F]">
                            I have read and agree to the{" "}
                            <Link href="#" className="text-[#0C6FFF] hover:underline cursor-pointer">User Agreement</Link> &{" "}
                            <Link href="#" className="text-[#0C6FFF] hover:underline cursor-pointer">Privacy Policy</Link>
                        </span>
                    </label>
                    {errors.agreed && <p className="text-xs text-red-500">{errors.agreed}</p>}
                </div>

                <Button variant="primary" type="submit" className="w-full text-base h-11 bg-[#0C6FFF] hover:bg-[#0056D2]">
                    Sign up
                </Button>
            </form>

            <p className="mt-12 text-center text-sm font-medium text-[#1D1D1F]">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-[#0C6FFF] hover:underline cursor-pointer">
                    Sign in
                </Link>
            </p>
        </div>
    )
}

function SignupVerificationForm({ email, onSuccess }: { email: string; onSuccess: () => void }) {
    const [timer, setTimer] = useState(6)
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null)
    const [otp, setOtp] = useState(["", "", "", ""])
    const [status, setStatus] = useState<"idle" | "error" | "success">("idle")

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => setTimer(timer - 1), 1000)
            return () => clearInterval(interval)
        }
    }, [timer])

    const handleOtpChange = (index: number, value: string) => {
        if (value.length > 1) value = value[value.length - 1]
        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)

        if (newOtp.every(d => d !== "")) {
            if (newOtp.join("") === "1111") {
                setStatus("success")
                setTimeout(onSuccess, 500)
            } else {
                setStatus("error")
            }
        } else {
            setStatus("idle")
        }

        if (value && index < 3) {
            const nextInput = document.getElementById(`otp - ${index + 1} `)
            nextInput?.focus()
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp - ${index - 1} `)
            prevInput?.focus()
        }
    }

    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="mb-8 lg:mb-10 space-y-3">
                <h1 className="text-[28px] md:text-[32px] font-bold tracking-tight text-[#1D1D1F]">Check your inbox.</h1>
                <p className="text-[14px] text-[#5E5E5E] leading-relaxed">
                    We've sent a 6-digit confirmation code to your email. Please <br className="hidden md:block" />enter the code in the box below to verify your account creation<br className="hidden md:block" /> request.
                </p>
            </div>

            <div className="mb-8 space-y-2">
                <p className="text-[14px] font-medium text-[#1D1D1F]">Please enter the verification code sent to</p>
                <p className="text-[14px] font-medium text-[#86868B]">{email}</p>
            </div>

            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="flex gap-2 md:gap-4">
                    {otp.map((digit, i) => (
                        <div key={i} className="relative h-32 md:h-48 flex-1">
                            <input
                                id={`otp - ${i} `}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onFocus={() => setFocusedIndex(i)}
                                onBlur={() => setFocusedIndex(null)}
                                onChange={(e) => handleOtpChange(i, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(i, e)}
                                placeholder={focusedIndex === i ? "|" : ""}
                                className={[
                                    "h-full w-full rounded-[10px] bg-white text-center text-3xl font-light",
                                    "border-2 outline-none transition-all duration-300",
                                    status === "error" ? "border-red-500 text-red-500" :
                                        status === "success" ? "border-green-500 text-green-500" :
                                            focusedIndex === i ? "border-[#0C6FFF]" : "border-[#535353]",
                                    "placeholder:text-[#1D1D1F] placeholder:font-light"
                                ].join(" ")}
                            />

                            {focusedIndex === i && status === "idle" && (
                                <div className="absolute inset-[2px] pointer-events-none overflow-hidden rounded-[8px]">
                                    <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-[#FFB800] via-[#FFB800]/50 to-transparent" />
                                    <div className="absolute bottom-0 left-0 w-[1.5px] h-50 bg-[#FFAE00] blur-[1px] opacity-40" />
                                    <div className="absolute bottom-0 right-0 w-[1.5px] h-50 bg-[#FFAE00] blur-[1px] opacity-40" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-between">
                    <button type="button" className="text-sm text-[#474747] hover:text-[#1D1D1F] cursor-pointer">
                        Didn't receive the code?
                    </button>
                    <span className="text-sm font-medium text-[#0C6FFF]">
                        00:0{timer}
                    </span>
                </div>
            </form>
        </div>
    )
}

import { useUser } from "@/app/context/UserContext"

function ProfileSetupForm({ email, onNext }: { email: string; onNext: () => void }) {
    const { updateUser } = useUser()
    const [profileImage, setProfileImage] = useState<string | null>(null)
    const [fullName, setFullName] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!profileImage) {
            setError("Profile image is required")
            return
        }
        if (!fullName) {
            setError("Full name is required")
            return
        }
        setError("")

        updateUser({ email, name: fullName, profileImage });
        onNext();
    }

    return (

        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <input
                type="file"
                accept="image/*"
                id="profileImageInput"
                className="hidden"
                onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            setProfileImage(reader.result as string);
                            if (error === "Profile image is required") setError("");
                        };
                        reader.readAsDataURL(file);
                    }
                }}
            />

            <div className="mb-8 lg:mb-10 mt-10 md:mt-20 lg:mt-45">
                <h1 className="text-[28px] md:text-[32px] font-bold tracking-tight text-[#1D1D1F]">Set up your profile</h1>
            </div>

            <div className="flex flex-col items-center mb-10">
                <div className="relative mb-4">
                    <div
                        onClick={() => document.getElementById("profileImageInput")?.click()}
                        className={`relative h-32 w-32 rounded-full overflow-hidden bg-[#F5F8FF] cursor-pointer border ${error === "Profile image is required" ? "border-red-500" : "border-[#EDF2FF]"}`}
                    >
                        {profileImage ? (
                            <Image
                                src={profileImage}
                                alt="Profile"
                                fill
                                className="object-contain"
                            />
                        ) : (
                            <Image
                                src="/Upload Icon.svg"
                                alt="Upload"
                                width={50}
                                height={50}
                                className="relative z-10 top-[35px] left-[35px]"
                            />
                        )}
                    </div>
                </div>
                <span className="text-[20px] font-semibold text-[#1D1D1F]">You</span>
                {error === "Profile image is required" && <p className="text-xs text-red-500 mt-2">{error}</p>}
            </div>


            <div className="flex items-center gap-2 mb-8 justify-center">
                <Info size={14} className="text-[#86868B]" />
                <p className="text-[11px] text-[#86868B]">Upload a picture you want to set as your profile.</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                    <p className="text-[13px] font-normal text-[#1D1D1F]">Full name</p>
                    <Input
                        placeholder="e.g: Emma Watson"
                        className="h-11 border-[#D2D2D7] focus:border-[#0C6FFF]"
                        value={fullName}
                        onChange={(e) => {
                            setFullName(e.target.value)
                            if (error) setError("")
                        }}
                        error={error}
                    />
                </div>

                <Button variant="primary" type="submit" className="w-full text-base h-11 bg-[#0C6FFF] hover:bg-[#0056D2]">
                    Next
                </Button>
            </form>
        </div>
    )
}

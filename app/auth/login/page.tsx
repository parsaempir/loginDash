"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft } from "lucide-react"

type AuthStep = "login" | "reset-password" | "verify-code" | "new-password" | "success"

export default function LoginPage() {
    const [step, setStep] = useState<AuthStep>("login")
    const [userEmail, setUserEmail] = useState("mail@example.com")

    return (
        <div className="flex min-h-screen lg:h-screen bg-white overflow-y-auto lg:overflow-hidden">
            {/* Left Column - Form */}
            <div className={`flex flex-col transition-all duration-300 ${step === "success" ? "w-full" : "w-full lg:w-1/2 p-6 md:p-12 lg:p-16 xl:p-24 xl:pr-10 2xl:px-40"}`}>
                {/* Content Section */}
                <div className={`mx-auto lg:ml-auto lg:mr-0 w-full ${step === "success" ? "max-w-none h-full flex items-center justify-center relative py-20" : "max-w-[480px]"}`}>
                    {step === "success" && (
                        <div className="absolute inset-0 -z-10 h-full w-full">
                            <Image
                                src="/signup.png"
                                alt="Success Background"
                                fill
                                className="object-cover opacity-60"
                                priority
                            />
                        </div>
                    )}

                    {/* Logo Section & Back Button */}
                    {step !== "success" && (
                        <div className="mb-8 lg:mb-16 flex items-center gap-4">
                            {(step === "reset-password" || step === "verify-code" || step === "new-password") && (
                                <button
                                    onClick={() => {
                                        if (step === "verify-code") setStep("reset-password")
                                        else if (step === "new-password") setStep("verify-code")
                                        else setStep("login")
                                    }}
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
                    )}

                    <div className={`transition-all duration-500 ease-in-out ${step === "success" ? "w-full" : ""}`}>
                        {step === "login" && (
                            <LoginForm
                                onForgotPassword={() => setStep("reset-password")}
                            />
                        )}
                        {step === "reset-password" && (
                            <ResetPasswordForm
                                email={userEmail}
                                setEmail={setUserEmail}
                                onVerify={() => setStep("verify-code")}
                            />
                        )}
                        {step === "verify-code" && (
                            <ResetPasswordVerificationForm
                                email={userEmail}
                                onSuccess={() => setStep("new-password")}
                            />
                        )}
                        {step === "new-password" && (
                            <SetNewPasswordForm
                                onSuccess={() => setStep("success")}
                            />
                        )}
                        {step === "success" && (
                            <SuccessScreen />
                        )}
                    </div>
                </div>
            </div>

            {/* Right Column - Image */}
            {step !== "success" && (
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
            )}
        </div>
    )
}

function LoginForm({ onForgotPassword }: { onForgotPassword: () => void }) {
    const router = useRouter()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        router.push("/dashboard")
    }

    return (
        <div className="animate-in fade-in slide-in-from-left-4 duration-500">
            <div className="mb-8 lg:mb-10 space-y-3">
                <h1 className="text-[28px] md:text-[32px] font-bold tracking-tight text-[#1D1D1F]">Welcome Back!</h1>
                <p className="text-[14px] md:text-[15px] text-[#86868B]">Please login to continue to your account.</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
                <Input
                    label="Email"
                    placeholder="mail@example.com"
                    type="email"
                    required
                />

                <div className="space-y-1">
                    <Input
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                        required
                    />
                </div>

                <div className="flex items-center justify-between py-2">
                    <label className="flex items-center gap-2 cursor-pointer select-none px-2">
                        <div className="relative h-5 w-5 flex items-center justify-center">
                            <input type="checkbox" className="sr-only peer" id="remember" />
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
                        <span className="text-sm font-medium text-[#1D1D1F]">Keep me logged in</span>
                    </label>
                    <button
                        type="button"
                        onClick={onForgotPassword}
                        className="text-sm text-[#0C6FFF] hover:underline cursor-pointer"
                    >
                        Forgot Password?
                    </button>
                </div>

                <Button variant="primary" type="submit" className="w-full text-base font-semibold px-12">
                    Sign in
                </Button>
            </form>

            {/* Divider */}
            <div className="relative my-10 flex items-center justify-center">
                <div className="h-px w-full bg-[#E4E4E4]" />
                <span className="absolute bg-white px-4 text-sm font-medium text-[#86868B]">or</span>
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Button variant="social" className="gap-2 px-4 md:px-8 whitespace-nowrap overflow-hidden">
                    <Image
                        src="/linked_in.svg"
                        alt="Linkedin"
                        width={18}
                        height={18}
                    />
                    Sign in with Linkedin
                </Button>
                <Button variant="social" className="gap-2 px-8 whitespace-nowrap">
                    <Image
                        src="/icon-google.svg"
                        alt="Google"
                        width={18}
                        height={18}
                    />
                    Sign in with Google
                </Button>
            </div>

            {/* Footer Text */}
            <p className="mt-12 text-center text-sm font-medium text-[#1D1D1F]">
                Need an account?{" "}
                <Link href="/auth/signup" className="text-[#0C6FFF] hover:underline cursor-pointer">
                    Create one
                </Link>
            </p>
        </div>
    )
}

interface StepProps {
    email: string
    setEmail: (email: string) => void
    onVerify: () => void
}

function ResetPasswordForm({ email, setEmail, onVerify }: StepProps) {
    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500 py-10 lg:mt-40">
            <div className="mb-8 lg:mb-10 space-y-3">
                <h1 className="text-[28px] md:text-[32px] font-bold tracking-tight text-[#1D1D1F]">Reset your password</h1>
                <p className="text-[14px] md:text-[15px] text-[#86868B] leading-relaxed">
                    You'll receive an email shortly with a link to reset your password.
                </p>
            </div>

            <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); onVerify(); }}>
                <div className="space-y-4">
                    <p className="text-sm font-medium text-[#1D1D1F]">Enter your email</p>
                    <Input
                        placeholder="mail@example.com"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-[52px]"
                    />
                </div>

                <Button variant="primary" className="w-full h-[44px] text-base font-semibold px-10">
                    Get verification code
                </Button>
            </form>
        </div>
    )
}

function ResetPasswordVerificationForm({ email, onSuccess }: { email: string, onSuccess: () => void }) {
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

    const validateOtp = (completedOtp: string[]) => {
        const code = completedOtp.join("")
        if (code.length === 4) {
            if (code === "1111") {
                setStatus("success")
            } else {
                setStatus("error")
            }
        } else {
            setStatus("idle")
        }
    }

    const handleOtpChange = (index: number, value: string) => {
        if (value.length > 1) value = value[value.length - 1]
        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)

        // Auto validate if all filled
        if (newOtp.every(d => d !== "")) {
            validateOtp(newOtp)
        } else {
            setStatus("idle")
        }

        // Auto focus next
        if (value && index < 3) {
            const nextInput = document.getElementById(`otp-${index + 1}`)
            nextInput?.focus()
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`)
            prevInput?.focus()
        }
    }

    const handleConfirm = () => {
        if (status === "success") {
            onSuccess()
        }
    }

    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500 py-10 lg:mt-40">
            <div className="mb-8 lg:mb-10 space-y-3">
                <h1 className="text-[28px] md:text-[32px] font-bold tracking-tight text-[#1D1D1F]">Check your inbox.</h1>
                <p className="text-[14px] text-[#5E5E5E] leading-relaxed">
                    To reset your password, please enter the 6-digit verification code sent to your email address.
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
                                id={`otp-${i}`}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onFocus={() => {
                                    setFocusedIndex(i)
                                    if (status === "error") {
                                        setOtp(["", "", "", ""])
                                        setStatus("idle")
                                    }
                                }}
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
                                    {/* Full "Fire" Glow - Surrounding bottom and sides */}
                                    <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-[#FFB800] via-[#FFB800]/50 to-transparent opacity-100 transition-opacity duration-500" />

                                    {/* Left Fire - Sharp and thin, reduced opacity */}
                                    <div className="absolute bottom-0 left-0 w-[1.5px] h-50 bg-[#FFAE00] blur-[1px] opacity-40" />

                                    {/* Right Fire - Sharp and thin, reduced opacity */}
                                    <div className="absolute bottom-0 right-0 w-[1.5px] h-50 bg-[#FFAE00] blur-[1px] opacity-40" />

                                    {/* Solid accent points at corners - Lighter */}
                                    <div className="absolute bottom-0 left-0 w-2 h-[2px] bg-[#FFC700] opacity-60" />
                                    <div className="absolute bottom-0 right-0 w-2 h-[2px] bg-[#FFC700] opacity-60" />
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-[2px] bg-[#FFB800]/50" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {status === "error" && (
                    <p className="text-center text-red-500 text-[14px] animate-in fade-in slide-in-from-top-2 duration-300">
                        Invalid code. Please try again.
                    </p>
                )}

                <div className="flex items-center justify-between">
                    <button type="button" className="text-sm  text-[#474747] hover:text-[#1D1D1F] cursor-pointer">
                        Didn't receive the code?
                    </button>
                    <span className="text-sm font-medium text-[#0C6FFF]">
                        00:0{timer}
                    </span>
                </div>

                <Button
                    variant="primary"
                    onClick={handleConfirm}
                    disabled={status !== "success"}
                    className={`w-full h-11 text-base font-semibold px-10 transition-colors border-none shadow-none ${status === "success"
                        ? "bg-[#0C6FFF] text-white hover:bg-[#0056D2]"
                        : "bg-[#E5E9F5] text-[#A6AFC9] cursor-not-allowed"
                        }`}
                >
                    Confirm
                </Button>
            </form>
        </div>
    )
}

function SetNewPasswordForm({ onSuccess }: { onSuccess: () => void }) {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")

    const handleDone = () => {
        if (password.length < 8) {
            setError("Password must be at least 8 characters")
            return
        }
        if (password !== confirmPassword) {
            setError("Passwords not match")
            return
        }
        setError("")
        onSuccess()
    }

    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500 py-10 lg:mt-40">
            <div className="mb-8 lg:mb-10 space-y-3">
                <h1 className="text-[28px] md:text-[32px] font-bold tracking-tight text-[#1D1D1F]">Reset Password</h1>
                <p className="text-[14px] md:text-[15px] text-[#5E5E5E] leading-relaxed">
                    Enter a new password below to change your password.
                </p>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                    <Input
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        error={error && error.includes("at least 8 characters") ? error : undefined}
                        onChange={(e) => {
                            setPassword(e.target.value)
                            if (error) setError("")
                        }}
                    />
                    <p className="text-[12px] text-[#555555]">Password must be at least 8 characters</p>
                </div>

                <div className="space-y-2">
                    <Input
                        label="Re-enter your password"
                        type="password"
                        placeholder="Re-enter your password"
                        value={confirmPassword}
                        error={error === "Passwords not match" ? "Passwords not match" : undefined}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value)
                            if (error) setError("")
                        }}
                    />
                </div>

                <Button
                    variant="primary"
                    onClick={handleDone}
                    disabled={!password || !confirmPassword}
                    className="w-full h-11 text-base font-semibold px-10 bg-[#0C6FFF] hover:bg-[#0056D2] text-white disabled:bg-[#E5E9F5] disabled:text-[#A6AFC9]"
                >
                    Done
                </Button>
            </form>
        </div>
    )
}

function SuccessScreen() {
    const router = useRouter()

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("/dashboard")
        }, 3000)
        return () => clearTimeout(timer)
    }, [router])

    return (
        <div className="flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-700 min-h-[500px] lg:min-h-screen w-full px-4 text-center">
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
                you'll jump into dashboard in a few seconds
            </p>
        </div>
    )
}

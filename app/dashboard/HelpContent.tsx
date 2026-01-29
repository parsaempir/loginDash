"use client";
import Image from "next/image";

interface HelpContentProps {
    onNotificationClick?: () => void;
    onProfileClick?: () => void;
}

export default function HelpContent({ onNotificationClick, onProfileClick }: HelpContentProps) {
    return (
        <div className="flex-1 flex flex-col min-h-0 relative overflow-hidden px-4 lg:px-0 lg:pr-4 pt-8">
            {/* Standard Dashboard Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 relative rounded-2xl overflow-hidden px-4 sm:px-6 py-5 sm:py-6 gap-4 sm:gap-0" style={{
                backgroundImage: "url('/Frame 2147228857 (1).png')",
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}>
                <div className="flex flex-col gap-1 relative z-10">
                    <div className="text-[15px] pl-5 text-[#black]">Help Center</div>
                    <h1 className="text-[22px] font-semibold text-[#111111]">
                        Help Center
                    </h1>
                    <p className="text-[13px] text-[#black] mt-1">
                        Everything you need from getting started to answers.
                    </p>
                </div>

                <div className="flex items-center gap-4 relative z-10">
                    <div className="relative">
                        <button
                            onClick={onProfileClick}
                            className="relative w-9 h-9 rounded-full overflow-hidden border border-[#E5E5EA] cursor-pointer"
                        >
                            <Image
                                src="/right-column.png"
                                alt="User avatar"
                                fill
                                sizes="36px"
                                className="object-cover"
                            />
                        </button>
                        <div className="absolute top-0 right-0 w-[11px] h-[11px] bg-[#0C6FFF] border-2 border-white rounded-full z-20"></div>
                    </div>
                    <button
                        onClick={onNotificationClick}
                        className="cursor-pointer hover:opacity-70 transition-opacity"
                    >
                        <img src='/ellipsis.svg' alt="menu" />
                    </button>
                </div>
            </div>

            {/* Main Content Area (Cards) */}
            <div className="flex-1 flex flex-col items-center justify-start px-4 lg:px-10 z-10 overflow-y-auto min-h-0 pb-8">
                {/* Cards Grid Container */}
                <div className="flex flex-col items-center gap-6 w-full max-w-[1200px]">
                    {/* Top Row: 2 Cards */}
                    <div className="flex flex-wrap justify-center gap-4 lg:gap-8 w-full">
                        {/* Getting Started Card */}
                        <div className="bg-white rounded-[20px] p-6 lg:p-7 flex flex-col items-center text-center shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-[#F2F2F7] w-full sm:w-[310px] h-auto min-h-[240px] lg:h-[260px]">
                            <div className="w-13 h-12 bg-[#F5F5F7] rounded-[8px] flex items-center justify-center mb-4 flex-shrink-0">
                                <Image src="/vector (13).svg" alt="Getting Started" width={24} height={24} className="object-contain" />
                            </div>
                            <h3 className="text-[17px] font-bold text-[#111111] mb-2">Getting Started</h3>
                            <p className="text-[12px] text-[#8E8E93] leading-relaxed mb-4 flex-1 overflow-hidden">
                                Learn the basics of Projio and start managing your work effortlessly.
                            </p>
                            <button className="h-[38px] w-full max-w-[100px] rounded-full border border-[#1D61F2] text-[#1D61F2] text-[13px] font-semibold hover:bg-[#F2F9FF] transition-colors mt-auto flex-shrink-0">
                                Get Started
                            </button>
                        </div>

                        {/* Using Projio Card */}
                        <div className="bg-white rounded-[20px] p-6 lg:p-7 flex flex-col items-center text-center shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-[#F2F2F7] w-full sm:w-[310px] h-auto min-h-[240px] lg:h-[260px]">
                            <div className="w-13 h-12 bg-[#F5F5F7] rounded-[8px] flex items-center justify-center mb-4 overflow-hidden p-2 flex-shrink-0">
                                <Image src="/Vector 16.svg" alt="Projio" width={22} height={22} className="object-contain" />
                            </div>
                            <h3 className="text-[17px] font-bold text-[#111111] mb-2">Using Projio</h3>
                            <p className="text-[12px] text-[#8E8E93] leading-relaxed mb-4 flex-1 overflow-hidden">
                                Discover how to use Projio's tools and features.
                            </p>
                            <button className="h-[38px] w-full max-w-[100px] rounded-full border border-[#1D61F2] text-[#1D61F2] text-[13px] font-semibold hover:bg-[#F2F9FF] transition-colors mt-auto flex-shrink-0">
                                Learn More
                            </button>
                        </div>
                    </div>

                    {/* Bottom Row: 1 Card Centered */}
                    <div className="flex justify-center w-full">
                        {/* Workspace Page Card */}
                        <div className="bg-white rounded-[20px] p-6 lg:p-7 flex flex-col items-center text-center shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-[#F2F2F7] w-full sm:w-[310px] h-auto min-h-[240px] lg:h-[260px]">
                            <div className="w-13 h-12 bg-[#F5F5F7] rounded-[8px] flex items-center justify-center mb-4 px-3 flex-shrink-0 overflow-hidden">
                                <Image src="/icon-check-square.svg" alt="Workspace" width={40} height={40} className="object-contain" />
                            </div>
                            <h3 className="text-[17px] font-bold text-[#111111] mb-2">Workspace Page</h3>
                            <p className="text-[12px] text-[#8E8E93] leading-relaxed mb-4 flex-1 overflow-hidden">
                                Explore how to customize and navigate your workspace for better collaboration.
                            </p>
                            <button className="h-[38px] w-full max-w-[100px] rounded-full border border-[#1D61F2] text-[#1D61F2] text-[13px] font-semibold hover:bg-[#F2F9FF] transition-colors mt-auto flex-shrink-0">
                                Open Tutorial
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

"use client";
import Image from "next/image";
import { useState } from "react";

interface AgreementContentProps {
    onNotificationClick?: () => void;
    onProfileClick?: () => void;
}

export default function AgreementContent({ onNotificationClick, onProfileClick }: AgreementContentProps) {
    const [activeTab, setActiveTab] = useState("requirements");

    return (
        <div className="flex-1 overflow-y-auto px-4 lg:px-0 lg:pr-4 pt-8">
            {/* Top bar with background */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 relative rounded-2xl overflow-hidden px-4 sm:px-6 py-5 sm:py-6 gap-4 sm:gap-0" style={{
                backgroundImage: "url('/Frame 2147228857 (1).png')",
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}>
                <div className="flex flex-col gap-1 relative z-10">
                    {activeTab === "requirements" ? (
                        <div className="text-[15px] pl-5 text-[#black]">Overview</div>
                    ) : (
                        <div className="text-[15px] pl-5 text-[#black]">Agreement</div>
                    )}
                    <h1 className="text-[22px] font-semibold text-[#111111]">
                        Agreement
                    </h1>
                    <p className="text-[13px] text-[#black] mt-1">
                        This is the approved project requirement and proposal
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

            {/* Tabs */}
            <div className="flex gap-4 mb-6 ">
                <button
                    onClick={() => setActiveTab("requirements")}
                    className={`text-[13px] pb-2 ${activeTab === "requirements" ? "text-[#1D61F2] border-b-2 border-[#1D61F2]" : "text-[#8E8E93]"}`}
                >
                    Requirements
                </button>
                <button
                    onClick={() => setActiveTab("proposal")}
                    className={`text-[13px] pb-2 ${activeTab === "proposal" ? "text-[#1D61F2] border-b-2 border-[#1D61F2]" : "text-[#8E8E93]"}`}
                >
                    Proposal
                </button>
            </div>

            {/* Content based on active tab */}
            {activeTab === "requirements" ? (
                <div className="space-y-6">
                    {/* Project Goals */}
                    <section className="rounded-2xl p-6">
                        <h2 className="text-[16px] font-semibold text-[#111111] mb-3">
                            Project Goals
                        </h2>
                        <p className="text-[14px] text-[#4B4B4D] leading-relaxed">
                            Lorem ipsum dolor sit amet consectetur. Turpis sollicitudin morbi et malesuada adipiscing massa. Lorem ipsum dolor sit amet consectetur. Turpis sollicitudin morbi et malesuada adipiscing massa. Lorem ipsum dolor sit amet consectetur. Turpis sollicitudin morbi et malesuada adipiscing massa.
                        </p>
                    </section>

                    {/* Scope of Work */}
                    <section className="rounded-2xl p-6">
                        <h2 className="text-[16px] font-semibold text-[#111111] mb-3">
                            Scope of Work (Deliverables)
                        </h2>
                        <div className="text-[14px] text-[#4B4B4D] leading-relaxed space-y-2">
                            <p>Lorem ipsum dolor sit amet consectetur</p>
                            <p>sit amet consectetur.</p>
                            <p>Turpis sollicitudin morbi et malesuada adipiscing massa.</p>
                        </div>
                    </section>

                    {/* Acceptance Criteria */}
                    <section className="rounded-2xl p-6">
                        <h2 className="text-[16px] font-semibold text-[#111111] mb-3">
                            Acceptance Criteria
                        </h2>
                        <p className="text-[14px] text-[#4B4B4D] leading-relaxed">
                            Lorem ipsum dolor sit amet consectetur. Turpis sollicitudin morbi et malesuada adipiscing massa. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur et
                        </p>
                    </section>

                    {/* Reference Files */}
                    <section className="rounded-2xl p-6">
                        <h2 className="text-[16px] font-semibold text-[#111111] mb-4">
                            Reference Files
                        </h2>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-3 bg-[#FFF5E6] rounded-lg p-3 w-[200px]">
                                <div className="relative w-10 h-10">
                                    <Image
                                        src="/Document file icon.svg"
                                        alt="Document"
                                        width={40}
                                        height={40}
                                        className="object-contain"
                                    />
                                </div>
                                <div>
                                    <div className="text-[13px] font-medium text-[#111111]">image.png</div>
                                    <div className="text-[11px] text-[#8E8E93]">3.3 MB</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-[#FFF5E6] rounded-lg p-3 w-[200px]">
                                <div className="relative w-10 h-10">
                                    <Image
                                        src="/Document file icon.svg"
                                        alt="Document"
                                        width={40}
                                        height={40}
                                        className="object-contain"
                                    />
                                </div>
                                <div>
                                    <div className="text-[13px] font-medium text-[#111111]">image.png</div>
                                    <div className="text-[11px] text-[#8E8E93]">3.3 MB</div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            ) : (
                <div className="space-y-8 mt-15">
                    {/* Proposal Details */}
                    <div className="flex gap-4 items-center">
                        {/* Icon on the left */}
                        <div className="relative w-8 h-8 flex-shrink-0 flex items-center">
                            <Image
                                src="/Leading Icon.svg"
                                alt="User"
                                width={32}
                                height={32}
                                className="object-contain"
                            />
                        </div>

                        {/* From and To in one row */}
                        <div className="flex gap-8 items-center">
                            <div className="flex items-center gap-2">
                                <span className="text-[11px] text-[#8E8E93]">From</span>
                                <span className="text-[14px] text-[#111111] font-medium">Alex Miller</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[11px] text-[#8E8E93]">To</span>
                                <span className="text-[14px] text-[#111111] font-medium">John Doe</span>
                            </div>
                        </div>
                    </div>

                    {/* Start and End Date */}
                    <div className="flex gap-4 items-center">
                        {/* Icon on the left */}
                        <div className="relative w-8 h-8 flex-shrink-0 ">
                            <Image
                                src="/Leading Icon (2).svg"
                                alt="Calendar"
                                width={32}
                                height={32}
                                className="object-contain"
                            />
                        </div>

                        {/* Dates in one row */}
                        <div className="flex gap-8">
                            <div>
                                <div className="text-[11px] text-[#8E8E93] mb-1">Start Date</div>
                                <div className="text-[14px] text-[#111111] font-medium">June,01,2026</div>
                            </div>
                            <div>
                                <div className="text-[11px] text-[#8E8E93] mb-1">End Date</div>
                                <div className="text-[14px] text-[#111111] font-medium">June,30,2026</div>
                            </div>
                        </div>
                    </div>

                    {/* Currency and Pricing Model */}
                    <div className="flex gap-4 items-center">
                        {/* Icon on the left */}
                        <div className="relative w-8 h-8 flex-shrink-0">
                            <Image
                                src="/Leading Icon (3).svg"
                                alt="Currency"
                                width={32}
                                height={32}
                                className="object-contain"
                            />
                        </div>

                        {/* Currency and Pricing in one row */}
                        <div className="flex gap-8">
                            <div>
                                <div className="text-[11px] text-[#8E8E93] mb-1">Currency</div>
                                <div className="text-[14px] text-[#111111] font-medium">USD</div>
                            </div>
                            <div>
                                <div className="text-[11px] text-[#8E8E93] mb-1">Pricing Model</div>
                                <div className="text-[14px] text-[#111111] font-medium">Monthly</div>
                            </div>
                        </div>
                    </div>

                    {/* Note */}
                    <section className="rounded-2xl p-6 mt-6">
                        <h2 className="text-[16px]  font-semibold text-[#111111] mb-3">
                            Note
                        </h2>
                        <p className="text-[14px] max-w-[380px] text-[#4B4B4D] leading-relaxed">
                            Lorem ipsum volutpat molestie sed sed pulvinar sagittis eget duis mattis ipsum ullamcorper suspendisse purus.
                        </p>
                    </section>
                </div>
            )}
        </div>
    );
}

"use client";
import Image from "next/image";

import { useState } from "react";

interface PaymentContentProps {
    onNotificationClick?: () => void;
    onProfileClick?: () => void;
}

export default function PaymentContent({ onNotificationClick, onProfileClick }: PaymentContentProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPaidModalOpen, setIsPaidModalOpen] = useState(false);
    const [hasPayments, setHasPayments] = useState(false);

    // Form states
    const [amount, setAmount] = useState("");
    const [currency, setCurrency] = useState("");
    const [note, setNote] = useState("");

    return (
        <div className="flex-1 overflow-y-auto px-4 lg:px-0 lg:pr-4 pt-8 relative">
            {/* Top bar with background */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 relative rounded-2xl overflow-hidden px-4 sm:px-6 py-5 sm:py-6 gap-4 sm:gap-0" style={{
                backgroundImage: "url('/Frame 2147228857 (1).png')",
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}>
                <div className="flex flex-col gap-1 relative z-10">
                    <div className="text-[15px] pl-5 text-[#black]">Overview</div>
                    <h1 className="text-[22px] font-semibold text-[#111111]">
                        Payment
                    </h1>
                    <p className="text-[13px] text-[#black] mt-1">
                        All submitted files and versions will appear here.
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

            {/* Add Payment Button section */}
            <div className="flex justify-end mb-6">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-[#1D61F2] text-white rounded-lg text-[14px] font-medium hover:bg-[#0C6FFF] transition-all flex items-center justify-center gap-2 min-w-[150px] h-11 px-6 shadow-[0_4px_12px_rgba(29,97,242,0.3)]"
                >
                    <span className="text-[18px]">+</span>
                    Add Payment
                </button>
            </div>

            {hasPayments ? (
                /* Payment List Table */
                <div className="mt-8 overflow-x-auto">
                    <div className="min-w-[500px]">
                        {/* Table Header */}
                        <div className="grid grid-cols-[1.5fr_1fr_1fr] gap-4 px-6 py-4 border-b border-[#E5E5EA]">
                            <div className="text-[14px] font-medium text-[black]">Name</div>
                            <div className="text-[14px] font-medium text-[black]">Version badge</div>
                            <div className="text-[14px] font-medium text-[black] text-right pr-4">Status</div>
                        </div>

                        {/* Table Rows */}
                        <div className="divide-y divide-[#E5E5EA]/50">
                            {/* Payment 03 */}
                            <div className="grid grid-cols-[1.5fr_1fr_1fr] gap-4 px-6 py-5 items-center">
                                <div className="text-[15px] text-[#111111] font-medium">Payment 03</div>
                                <div className="text-[14px] text-[#2C2C2E] font-medium">v03</div>
                                <div className="flex justify-end pr-4">
                                    <span className="bg-[#FFF9F2] text-[#FF9500] text-[10px] px-4 py-1.5 rounded-full font-bold min-w-[80px] text-center">Issued</span>
                                </div>
                            </div>

                            {/* Payment 02 */}
                            <div className="grid grid-cols-[1.5fr_1fr_1fr] gap-4 px-6 py-5 items-center bg-[#F9F9F9]/30">
                                <div className="text-[15px] text-[#111111] font-medium">Payment 02</div>
                                <div className="text-[14px] text-[#2C2C2E] font-medium">v02</div>
                                <div className="flex justify-end pr-4">
                                    <span className="bg-[#F2F2F7] text-[#8E8E93] text-[10px] px-4 py-1.5 rounded-full font-bold min-w-[80px] text-center">Confirmed</span>
                                </div>
                            </div>

                            {/* Payment 01 */}
                            <div className="grid grid-cols-[1.5fr_1fr_1fr] gap-4 px-6 py-5 items-center">
                                <div className="text-[15px] text-[#111111] font-medium">Payment 01</div>
                                <div className="text-[14px] text-[#2C2C2E] font-medium">v01</div>
                                <div className="flex justify-end pr-4">
                                    <span className="bg-[#EBFAF2] text-[#34C759] text-[10px] px-4 py-1.5 rounded-full font-bold min-w-[80px] text-center">Paid</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                /* Empty State */
                <div className="flex flex-col items-center justify-center mt-32">
                    <div className="relative w-[200px] h-[200px] mb-6">
                        <Image
                            src="/Frame 2147228642.png"
                            alt="No payment records"
                            width={200}
                            height={200}
                            className="object-contain"
                        />
                    </div>
                    <h2 className="text-[18px] font-semibold text-[#111111] mb-2">
                        No Payment records yet.
                    </h2>
                    <p className="text-[14px] text-[#8E8E93] text-center max-w-[400px]">
                        Once you start a payment, it will appear here.
                    </p>
                </div>
            )}

            {/* Add Payment Modal Overlay */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px] p-4">
                    <div className="bg-white w-full max-w-[560px] max-h-[90vh] overflow-y-auto rounded-[24px] lg:rounded-[32px] shadow-2xl p-6 lg:p-10">
                        <h2 className="text-[24px] lg:text-[28px] font-bold text-[#111111] mb-6 lg:mb-8">Add Payment</h2>

                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-[13px] font-medium text-[#111111] mb-2">
                                        Amount <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="e.g. 3000"
                                        className="w-full h-12 px-4 rounded-lg border border-[#A1A1A6] text-[14px] focus:outline-none focus:border-[#1D61F2] placeholder:text-[#AEAEB2]"
                                    />
                                </div>
                                <div className="w-[80px]">
                                    <label className="block text-[13px] font-medium text-[#8E8E93] mb-2 text-center">Number</label>
                                    <div className="w-full h-12 flex items-center justify-center bg-[#F2F2F7] rounded-lg text-[14px] font-medium text-[#111111]">
                                        04
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-[13px] font-medium text-[#111111] mb-2">
                                        Currency <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={currency}
                                            onChange={(e) => setCurrency(e.target.value)}
                                            className="w-full h-12 px-4 rounded-lg border border-[#A1A1A6] text-[14px] focus:outline-none focus:border-[#1D61F2] appearance-none bg-white"
                                        >
                                            <option value="">Select</option>
                                            <option value="USD">USD</option>
                                            <option value="EUR">EUR</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M19 9L12 16L5 9" stroke="#8E8E93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <label className="block text-[13px] font-medium text-[#8E8E93] mb-2">Pricing Model</label>
                                    <div className="w-full h-12 flex items-center px-4 bg-[#F2F2F7] rounded-lg text-[14px] font-medium text-[#111111]">
                                        Monthly
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[13px] font-medium text-[#111111] mb-2">Note</label>
                                <textarea
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    placeholder="A short note about what this workspace is for"
                                    className="w-full h-32 p-4 rounded-lg border border-[#A1A1A6] text-[14px] focus:outline-none focus:border-[#1D61F2] placeholder:text-[#AEAEB2] resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-[13px] font-medium text-[#8E8E93] mb-2">Invoice</label>
                                <div className="w-full h-32 border-2 border-dashed border-[#A1A1A6] rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-2 text-[#8E8E93]">
                                        <span className="text-[18px]">+</span>
                                        <span className="text-[14px]">Click here to upload</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 flex gap-3">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="flex-1 h-12 rounded-lg text-[14px] font-bold text-[#111111] hover:bg-gray-100 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    setIsModalOpen(false);
                                    setIsPaidModalOpen(true);
                                }}
                                className="flex-1 h-12 rounded-lg bg-[#1D61F2] text-[14px] font-bold text-white hover:bg-[#0C6FFF] transition-colors shadow-[0_4px_12px_rgba(29,97,242,0.3)]"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Payment Confirmation (Mark as Paid) Modal Overlay */}
            {isPaidModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px] p-4">
                    <div className="bg-white w-full max-w-[560px] max-h-[90vh] overflow-y-auto rounded-[24px] lg:rounded-[32px] shadow-2xl p-6 lg:p-10">
                        <h2 className="text-[24px] lg:text-[28px] font-bold text-[#111111] mb-6 lg:mb-8">Payment 04</h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-[13px] font-medium text-[#111111] mb-2 opacity-60">Note</label>
                                <div className="w-full min-h-[100px] bg-[#F2F2F7] rounded-lg p-4 text-[14px] text-[#111111] leading-relaxed">
                                    {note || "No note provided"}
                                </div>
                            </div>

                            <div className="w-1/2 pr-2">
                                <label className="block text-[13px] font-medium text-[#111111] mb-2 opacity-60">Amount</label>
                                <div className="h-12 flex items-center px-4 bg-[#F2F2F7] rounded-lg text-[14px] font-medium text-[#111111]">
                                    {amount || "0"}
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-[13px] font-medium text-[#111111] mb-2 opacity-60">Currency</label>
                                    <div className="h-12 flex items-center px-4 bg-[#F2F2F7] rounded-lg text-[14px] font-medium text-[#111111]">
                                        {currency || "Not selected"}
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <label className="block text-[13px] font-medium text-[#111111] mb-2 opacity-60">Pricing Model</label>
                                    <div className="h-12 flex items-center px-4 bg-[#F2F2F7] rounded-lg text-[14px] font-medium text-[#111111]">
                                        Monthly
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[13px] font-medium text-[#111111] mb-2 opacity-60">Receipt</label>
                                <div className="w-full h-32 border-2 border-dashed border-[#D1D1D6] rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-2 text-[#8E8E93]">
                                        <span className="text-[18px]">+</span>
                                        <span className="text-[14px]">Click here to upload</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 flex gap-3">
                            <button
                                onClick={() => setIsPaidModalOpen(false)}
                                className="flex-1 h-12 rounded-lg text-[14px] font-bold text-[#111111] hover:bg-gray-100 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    setIsPaidModalOpen(false);
                                    setHasPayments(true);
                                }}
                                className="flex-1 h-12 rounded-lg bg-[#1D61F2] text-[14px] font-bold text-white hover:bg-[#0C6FFF] transition-colors shadow-[0_4px_12px_rgba(29,97,242,0.3)]"
                            >
                                Mark as paid
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


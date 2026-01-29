"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

interface DeliveryContentProps {
    onNotificationClick?: () => void;
    onProfileClick?: () => void;
}

export default function DeliveryContent({ onNotificationClick, onProfileClick }: DeliveryContentProps) {
    const [hasDeliveries, setHasDeliveries] = useState(false);
    const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
    const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
    const [isRequestChangesModalOpen, setIsRequestChangesModalOpen] = useState(false);
    const [isViewRequestedChangesModalOpen, setIsViewRequestedChangesModalOpen] = useState(false);
    const [showSuccessNotification, setShowSuccessNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");

    // Status states
    const [delivery03Status, setDelivery03Status] = useState("Pending");
    const [delivery01Status, setDelivery01Status] = useState("Approved");
    const [isProjectCompleted, setIsProjectCompleted] = useState(false);
    const [isCantMarkModalOpen, setIsCantMarkModalOpen] = useState(false);
    const [isConfirmCompletionModalOpen, setIsConfirmCompletionModalOpen] = useState(false);
    const [isProjectFinished, setIsProjectFinished] = useState(false);
    const [isCompleting, setIsCompleting] = useState(false);

    useEffect(() => {
        if (showSuccessNotification) {
            const timer = setTimeout(() => {
                setShowSuccessNotification(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [showSuccessNotification]);

    return (
        <div className="flex-1 overflow-y-auto px-4 lg:px-0 lg:pr-4 pt-8">
            {/* Top bar with background */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 relative rounded-2xl overflow-hidden px-4 sm:px-6 py-5 sm:py-6 gap-4 sm:gap-0" style={{
                backgroundImage: "url('/Frame 2147228857 (1).png')",
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}>
                <div className="flex flex-col gap-1 relative z-10">
                    <div className="text-[15px] pl-5 text-[#black]">Delivery</div>
                    <h1 className="text-[22px] font-semibold text-[#111111]">
                        Delivery files
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

            {/* Add Delivery / Mark as completed / Finished Status */}
            <div className="flex justify-end mb-6">
                {isProjectFinished ? (
                    <div className="bg-[#F2F2F7] text-[#8E8E93] px-6 py-2 rounded-lg text-[14px] font-medium min-w-[210px] h-11 flex items-center justify-center">
                        Marked as completed
                    </div>
                ) : (
                    <button
                        onClick={() => {
                            if (isProjectCompleted) {
                                setIsProjectFinished(true);
                                setIsConfirmCompletionModalOpen(true);
                            } else if (!hasDeliveries) {
                                setHasDeliveries(true);
                            } else {
                                // Second click logic: Backdrop then Error Modal
                                setIsCompleting(true);
                                setTimeout(() => {
                                    setIsCompleting(false);
                                    setIsCantMarkModalOpen(true);
                                }, 3000);
                            }
                        }}
                        className="bg-[#1D61F2] text-white rounded-lg text-[14px] font-medium hover:bg-[#0C6FFF] transition-all flex items-center justify-center gap-2 min-w-[210px] h-11"
                    >
                        {!isProjectCompleted && <span className="text-[18px]">+</span>}
                        {isProjectCompleted ? "Mark project as completed" : "Add Delivery"}
                    </button>
                )}
            </div>

            {/* Loading Backdrop Overlay (during second click delay) */}
            {isCompleting && (
                <div className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-[2px] animate-in fade-in duration-300 pointer-events-auto cursor-wait" />
            )}

            {/* Main Content Area with Relative Positioning */}
            <div className="relative">
                {/* Confirmation Block (Absolute, small, centered above green banner) */}
                {isConfirmCompletionModalOpen && (
                    <div className="absolute top-[-250px] left-1/2 -translate-x-1/2 z-[80] w-[600px] bg-white border border-[#E5E5EA] rounded-[32px] shadow-2xl p-8 transition-all animate-in fade-in zoom-in duration-300">
                        <h2 className="text-[20px] font-bold text-[#111111] mb-3 text-center">Mark  project as completed?</h2>
                        <p className="text-[14px] text-[#8E8E93] mb-8 text-center leading-relaxed px-4">
                            Are you sure you want to Mark project as completed? this<br /> action locks the workspace and cannot be back.
                        </p>

                        <div className="flex gap-4">
                            <button
                                onClick={() => {
                                    setIsConfirmCompletionModalOpen(false);
                                    setIsProjectFinished(false);
                                    setShowSuccessNotification(false);
                                }}
                                className="flex-1 h-11 rounded-[16px] bg-[#F2F2F7] text-[14px] font-bold text-[#111111] hover:bg-[#E5E5EA] transition-colors"
                            >
                                Back
                            </button>
                            <button
                                onClick={() => {
                                    setIsConfirmCompletionModalOpen(false);
                                }}
                                className="flex-1 h-11 rounded-[16px] bg-[#1D61F2] text-[14px] font-bold text-white hover:bg-[#0C6FFF] transition-colors shadow-[0_4px_16px_rgba(29,97,242,0.3)]"
                            >
                                Accept
                            </button>
                        </div>
                    </div>
                )}

                {/* Success Banner */}
                {isProjectFinished && (
                    <div className="mb-8 bg-[#F2FAF3] rounded-[24px] py-12 flex items-center justify-center">
                        <span className="text-[18px] font-medium text-[#1E4620]">
                            Project has been marked as completed
                        </span>
                    </div>
                )}
            </div>

            {hasDeliveries ? (
                /* Delivery Files Table */
                <div className="rounded-xl overflow-x-auto">
                    <div className="min-w-[800px]">
                        {/* Table Header */}
                        <div className="grid grid-cols-5 gap-4 px-6 py-4 border-b border-[#E5E5EA]">
                            <div className="text-[12px] font-medium text-[#8E8E93]">Name</div>
                            <div className="text-[12px] font-medium text-[#8E8E93]">Version badge</div>
                            <div className="text-[12px] font-medium text-[#8E8E93]">Status</div>
                            <div className="text-[12px] font-medium text-[#8E8E93]">Files</div>
                            <div className="text-[12px] font-medium text-[#8E8E93]">Uploaded by</div>
                        </div>

                        {/* Table Rows */}
                        <div className="divide-y divide-[#E5E5EA]/50">
                            {/* Delivery 03 */}
                            <div className="grid grid-cols-5 gap-4 px-6 py-5 items-center bg-[#F7FAFF]">
                                <div className="flex items-center gap-2">
                                    <span className="text-[15px] font-medium text-[#111111]">Delivery_03</span>
                                    <span className="bg-[#EBF3FF] text-[#1D61F2] text-[10px] px-2 py-0.5 rounded-full font-medium">Latest</span>
                                </div>
                                <div className="text-[14px] text-[#2C2C2E] font-medium">v03</div>
                                <div>
                                    {isProjectFinished ? (
                                        <span className="bg-[#F2F2F7] text-[#8E8E93] text-[12px] px-4 py-1.5 rounded-full font-medium inline-block min-w-[100px] text-center opacity-60">Approved</span>
                                    ) : delivery03Status === "Pending" ? (
                                        <button
                                            onClick={() => setIsSubmitModalOpen(true)}
                                            className="bg-[#FFF9F2] text-[#FF9500] text-[12px] px-4 py-1.5 rounded-full font-medium inline-block min-w-[100px] text-center hover:bg-[#FFF2E0] transition-colors"
                                        >
                                            Pending
                                        </button>
                                    ) : (
                                        <span className="bg-[#E8F5E9] text-[#34C759] text-[12px] px-4 py-1.5 rounded-full font-medium inline-block min-w-[100px] text-center">Approved</span>
                                    )}
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="relative w-8 h-8">
                                        <Image src="/Document file icon.svg" alt="file" width={32} height={32} />
                                    </div>
                                    <div>
                                        <div className="text-[14px] text-[#111111] font-medium">image.png</div>
                                        <div className="text-[11px] text-[#8E8E93]">3.3 MB</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="relative w-9 h-9 rounded-xl overflow-hidden shadow-sm">
                                        <Image src="/right-column.png" alt="user" fill className="object-cover" />
                                    </div>
                                    <div>
                                        <div className="text-[13px] text-[#111111] font-semibold">Liam Parker</div>
                                        <div className="text-[11px] text-[#A9ABB0]">Liamparker@gmail.com</div>
                                    </div>
                                </div>
                            </div>

                            {/* Delivery 02 */}
                            <div className="grid grid-cols-5 gap-4 px-6 py-5 items-center text-[#8E8E93]">
                                <div className="text-[15px]">Delivery_02</div>
                                <div className="text-[14px]">v02</div>
                                <div>
                                    <span className={`bg-[#F2F2F7] text-[#8E8E93] text-[12px] px-4 py-1.5 rounded-full font-medium inline-block min-w-[100px] text-center ${isProjectFinished ? 'opacity-60' : ''}`}>Changes requested</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="relative w-8 h-8 opacity-80" style={{ filter: 'hue-rotate(320deg) saturate(3)' }}>
                                        <Image src="/Document file icon.svg" alt="file" width={32} height={32} />
                                    </div>
                                    <div>
                                        <div className="text-[14px] font-medium">image.png</div>
                                        <div className="text-[11px]">3.3 MB</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="relative w-9 h-9 rounded-xl overflow-hidden opacity-80">
                                        <Image src="/right-column.png" alt="user" fill className="object-cover" />
                                    </div>
                                    <div>
                                        <div className="text-[13px] font-semibold">Liam Parker</div>
                                        <div className="text-[11px]">Liamparker@gmail.com</div>
                                    </div>
                                </div>
                            </div>

                            {/* Delivery 01 */}
                            <div className="grid grid-cols-5 gap-4 px-6 py-5 items-center text-[#8E8E93]">
                                <div className="text-[15px]">Delivery_01</div>
                                <div className="text-[14px]">v01</div>
                                <div>
                                    {isProjectFinished ? (
                                        <span className="bg-[#F2F2F7] text-[#8E8E93] text-[12px] px-4 py-1.5 rounded-full font-medium inline-block min-w-[100px] text-center opacity-60">Changes requested</span>
                                    ) : delivery01Status === "Approved" ? (
                                        <button
                                            onClick={() => setIsViewRequestedChangesModalOpen(true)}
                                            className="bg-[#E8F5E9] text-[#34C759] text-[12px] px-4 py-1.5 rounded-full font-medium inline-block min-w-[100px] text-center hover:bg-[#DCF5E1] transition-colors"
                                        >
                                            Approved
                                        </button>
                                    ) : (
                                        <span className="bg-[#F2F2F7] text-[#8E8E93] text-[12px] px-4 py-1.5 rounded-full font-medium inline-block min-w-[100px] text-center">Changes requested</span>
                                    )}
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="relative w-8 h-8 opacity-80">
                                        <Image src="/Document file icon.svg" alt="file" width={32} height={32} />
                                    </div>
                                    <div>
                                        <div className="text-[14px] font-medium">image.png</div>
                                        <div className="text-[11px]">3.3 MB</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="relative w-9 h-9 rounded-xl overflow-hidden opacity-80">
                                        <Image src="/right-column.png" alt="user" fill className="object-cover" />
                                    </div>
                                    <div>
                                        <div className="text-[13px] font-semibold">Liam Parker</div>
                                        <div className="text-[11px]">Liamparker@gmail.com</div>
                                    </div>
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
                            alt="No delivery items"
                            width={200}
                            height={200}
                            className="object-contain"
                        />
                    </div>
                    <h2 className="text-[18px] font-semibold text-[#111111] mb-2">
                        No Delivery items yet.
                    </h2>
                    <p className="text-[14px] text-[#8E8E93] text-center max-w-[400px]">
                        Once you upload and deliver a file, it will appear here.
                    </p>
                </div>
            )}

            {/* Submit Delivery Modal Overlay */}
            {isSubmitModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px] p-4">
                    <div className="bg-white w-full max-w-[560px] max-h-[90vh] overflow-y-auto rounded-[20px] lg:rounded-[24px] shadow-2xl p-6 lg:p-8">
                        <h2 className="text-[20px] font-semibold text-[#111111] mb-8">Submit Delivery</h2>

                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-[13px] font-medium text-[#111111] mb-2">
                                        Title <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Design Studio, Team Nova"
                                        className="w-full h-12 px-4 rounded-xl border border-[#D1D1D6] text-[14px] focus:outline-none focus:border-[#1D61F2] placeholder:text-[#AEAEB2]"
                                    />
                                </div>
                                <div className="w-[80px]">
                                    <label className="block text-[13px] font-medium text-[#8E8E93] mb-2 text-center">Version</label>
                                    <div className="w-full h-12 flex items-center justify-center bg-[#F2F2F7] rounded-xl text-[14px] font-medium text-[#111111]">
                                        04
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[13px] font-medium text-[#111111] mb-2">Description</label>
                                <textarea
                                    placeholder="A short note about what this workspace is for"
                                    className="w-full h-32 p-4 rounded-xl border border-[#D1D1D6] text-[14px] focus:outline-none focus:border-[#1D61F2] placeholder:text-[#AEAEB2] resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-[13px] font-medium text-[#111111] mb-2">
                                    Upload files <span className="text-red-500">*</span>
                                </label>
                                <div className="w-full h-32 border-2 border-dashed border-[#D1D1D6] rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors">
                                    <span className="text-[20px] text-[#A9ABB0]">+</span>
                                    <span className="text-[14px] text-[#8E8E93]">Click here to upload</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 flex gap-3">
                            <button
                                onClick={() => setIsSubmitModalOpen(false)}
                                className="flex-1 h-12 rounded-xl text-[14px] font-medium text-[#111111] hover:bg-gray-100 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    setIsSubmitModalOpen(false);
                                    setIsApprovalModalOpen(true);
                                }}
                                className="flex-1 h-12 rounded-xl bg-[#1D61F2] text-[14px] font-medium text-white hover:bg-[#0C6FFF] transition-colors shadow-[0_4px_12px_rgba(29,97,242,0.3)]"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delivery Approval Modal Overlay */}
            {isApprovalModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px] p-4">
                    <div className="bg-white w-full max-w-[600px] max-h-[90vh] overflow-y-auto rounded-[24px] lg:rounded-[32px] shadow-2xl p-6 lg:p-10">
                        <h2 className="text-[24px] font-bold text-[#111111] mb-8">Delivery 03</h2>

                        <div className="space-y-8">
                            <div>
                                <label className="block text-[15px] font-medium text-[#111111] mb-3 opacity-60">Description</label>
                                <div className="w-full bg-[#F2F2F2] rounded-[16px] p-5 text-[14px] text-[#111111] leading-relaxed">
                                    Lorem Ipsum dolo sit amet Lorem Ipsum dolo sit amet Lorem Ipsum dolo sit amet Lorem Ipsum dolo sit amet
                                </div>
                            </div>

                            <div>
                                <label className="block text-[15px] font-medium text-[#111111] mb-3 opacity-60">Uploaded files</label>
                                <div className="space-y-3">
                                    {/* File 1 */}
                                    <div className="flex items-center gap-4 bg-[#F7F9FF] p-4 rounded-[16px] border border-[#EBF1FF]">
                                        <div className="relative w-9 h-9">
                                            <Image src="/Document file icon.svg" alt="file" width={36} height={36} />
                                        </div>
                                        <div>
                                            <div className="text-[14px] font-semibold text-[#111111]">image.png</div>
                                            <div className="text-[11px] text-[#8E8E93]">3.3 MB</div>
                                        </div>
                                    </div>
                                    {/* File 2 */}
                                    <div className="flex items-center gap-4 bg-[#F7F9FF] p-4 rounded-[16px] border border-[#EBF1FF]">
                                        <div className="relative w-9 h-9">
                                            <Image src="/Document file icon.svg" alt="file" width={36} height={36} />
                                        </div>
                                        <div>
                                            <div className="text-[14px] font-semibold text-[#111111]">image.png</div>
                                            <div className="text-[11px] text-[#8E8E93]">3.3 MB</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 flex gap-4">
                            <button
                                onClick={() => {
                                    setNotificationMessage("Delivery approved successfully.");
                                    setDelivery03Status("Approved");
                                    setDelivery01Status("Changes requested");
                                    setIsProjectCompleted(true);
                                    setIsApprovalModalOpen(false);
                                    setShowSuccessNotification(true);
                                }}
                                className="flex-1 h-12 rounded-[16px] bg-[#1D61F2] text-[15px] font-bold text-white hover:bg-[#0C6FFF] transition-colors shadow-[0_4px_16px_rgba(29,97,242,0.3)]"
                            >
                                Approve
                            </button>
                            <button
                                onClick={() => {
                                    setIsApprovalModalOpen(false);
                                    setIsRequestChangesModalOpen(true);
                                }}
                                className="flex-1 h-12 rounded-[16px] bg-[#F2F2F2] text-[15px] font-bold text-[#111111] hover:bg-[#E5E5E5] transition-colors"
                            >
                                Request changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Request Changes Modal Overlay */}
            {isRequestChangesModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px] p-4">
                    <div className="bg-white w-full max-w-[560px] max-h-[90vh] overflow-y-auto rounded-[24px] lg:rounded-[32px] shadow-2xl p-6 lg:p-10 relative">
                        <button
                            onClick={() => setIsRequestChangesModalOpen(false)}
                            className="absolute top-8 right-8 text-[#111111] hover:opacity-60 transition-opacity"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        <h2 className="text-[28px] font-bold text-[#111111] mb-2 text-left">Request Changes</h2>
                        <p className="text-[17px] text-[#48484A] mb-8 text-left">Let the freelancer know what needs to be updated.</p>

                        <div className="space-y-6">
                            <div className="w-full bg-[#F5F5F5] rounded-[24px] p-8 min-h-[160px]">
                                <textarea
                                    className="w-full bg-transparent border-none focus:outline-none text-[16px] text-[#111111] resize-none leading-relaxed placeholder:text-[#AEAEB2]"
                                    defaultValue="Please fix spacing on hero text"
                                />
                            </div>

                            <button
                                onClick={() => {
                                    setNotificationMessage("Change request submitted successfully.");
                                    setDelivery03Status("Approved");
                                    setDelivery01Status("Changes requested");
                                    setIsProjectCompleted(true);
                                    setIsRequestChangesModalOpen(false);
                                    setShowSuccessNotification(true);
                                }}
                                className="w-full h-12 rounded-[18px] bg-[#1D61F2] text-[17px] font-bold text-white hover:bg-[#0C6FFF] transition-colors shadow-[0_4px_16px_rgba(29,97,242,0.3)] mt-2"
                            >
                                Send Request
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Notification */}
            {showSuccessNotification && (
                <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-top duration-300">
                    <div className="bg-[#E6F4EA] rounded-[10px] px-8 py-4 flex items-center gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
                        <span className="text-[15px] font-medium text-[#111111]">
                            {notificationMessage}
                        </span>
                        <button
                            onClick={() => setShowSuccessNotification(false)}
                            className="text-[#111111] hover:opacity-60 transition-opacity"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
            {/* View Requested Changes Modal Overlay */}
            {isViewRequestedChangesModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px] p-4">
                    <div className="bg-white w-full max-w-[560px] max-h-[90vh] overflow-y-auto rounded-[24px] lg:rounded-[32px] shadow-2xl p-6 lg:p-10 relative">
                        <button
                            onClick={() => setIsViewRequestedChangesModalOpen(false)}
                            className="absolute top-8 right-8 text-[#111111] hover:opacity-60 transition-opacity"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        <h2 className="text-[28px] font-bold text-[#111111] mb-8 text-left">Requested Changes</h2>

                        <div className="space-y-6">
                            <div className="w-full bg-[#F5F5F5] rounded-[24px] p-8 min-h-[160px]">
                                <p className="text-[16px] text-[#111111] leading-relaxed">
                                    Please fix spacing on hero text
                                </p>
                            </div>

                            <button
                                onClick={() => setIsViewRequestedChangesModalOpen(false)}
                                className="w-full h-12 rounded-[18px] bg-[#1D61F2] text-[17px] font-bold text-white hover:bg-[#0C6FFF] transition-colors shadow-[0_4px_16px_rgba(29,97,242,0.3)] mt-2"
                            >
                                Back
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Can't Mark as Completed Modal Overlay */}
            {isCantMarkModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px] p-4">
                    <div className="bg-white w-full max-w-[500px] max-h-[90vh] overflow-y-auto rounded-[24px] lg:rounded-[32px] shadow-2xl p-6 lg:p-10 flex flex-col items-center">
                        <div className="relative w-40 h-40 mb-6">
                            <Image
                                src="/state icon (3).png"
                                alt="error"
                                fill
                                className="object-contain"
                            />
                        </div>

                        <h2 className="text-[24px] font-bold text-[#111111] mb-3 text-center">Can't mark as completed</h2>
                        <p className="text-[16px] text-[#8E8E93] mb-10 text-center px-4 leading-relaxed">
                            Can't mark as completed because there's no approved deliveries yet.
                        </p>

                        <button
                            onClick={() => setIsCantMarkModalOpen(false)}
                            className="w-full h-12 rounded-[16px] bg-[#F2F2F7] text-[15px] font-bold text-[#111111] hover:bg-[#E5E5EA] transition-colors"
                        >
                            Back
                        </button>
                    </div>
                </div>
            )}

            {/* Can't Mark as Completed Modal Overlay */}
            {isCantMarkModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px] p-4">
                    <div className="bg-white w-full max-w-[500px] max-h-[90vh] overflow-y-auto rounded-[24px] lg:rounded-[32px] shadow-2xl p-6 lg:p-10 flex flex-col items-center">
                        <div className="relative w-40 h-40 mb-6">
                            <Image
                                src="/state icon (3).png"
                                alt="error"
                                fill
                                className="object-contain"
                            />
                        </div>

                        <h2 className="text-[24px] font-bold text-[#111111] mb-3 text-center">Can't mark as completed</h2>
                        <p className="text-[16px] text-[#8E8E93] mb-10 text-center px-4 leading-relaxed">
                            Can't mark as completed because there's no approved deliveries yet.
                        </p>

                        <button
                            onClick={() => setIsCantMarkModalOpen(false)}
                            className="w-full h-12 rounded-[16px] bg-[#F2F2F7] text-[15px] font-bold text-[#111111] hover:bg-[#E5E5EA] transition-colors"
                        >
                            Back
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

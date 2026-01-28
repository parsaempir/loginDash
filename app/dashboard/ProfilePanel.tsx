"use client";
import Image from "next/image";

interface ProfilePanelProps {
    show: boolean;
    onClose: () => void;
    onEditClick?: () => void;
}

export default function ProfilePanel({ show, onClose, onEditClick }: ProfilePanelProps) {
    if (!show) return null;

    return (
        <>
            {/* Backdrop - Transparent to match Notification Panel style */}
            <div
                className="fixed inset-0 z-40 bg-transparent"
                onClick={onClose}
            ></div>

            {/* Profile Panel */}
            <div className="absolute top-[125px] right-[80px] z-50 w-[320px] bg-white rounded-[24px] shadow-[0_30px_70px_rgba(0,0,0,0.15)] border border-[#E5E5EA] animate-in fade-in slide-in-from-top-4 duration-200">
                <div className="p-7 relative z-10 bg-white rounded-[24px]">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 text-[#111111] hover:opacity-60 transition-opacity"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>

                    {/* Main Profile Info */}
                    <div className="flex flex-col items-center mb-6">
                        <div className="relative w-20 h-20 rounded-full overflow-hidden mb-4">
                            <Image
                                src="/right-column.png"
                                alt="Mark Bernard"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <h3 className="text-[18px] font-bold text-[#111111] mb-0.5">Mark Bernard</h3>
                        <p className="text-[13px] text-[#8E8E93]">Markber004@mail.com</p>
                    </div>

                    {/* Edit Profile Button */}
                    <div className="flex justify-center mb-6">
                        <button
                            onClick={onEditClick}
                            className="px-2 h-[38px] rounded-[10px] border border-[#1D61F2] text-[#1D61F2] flex items-center justify-center gap-2 hover:bg-[#F2F9FF] transition-all"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                            <span className="font-bold text-[14px]">Edit profile</span>
                        </button>
                    </div>

                    <div className="h-[1px] bg-[#E5E5EA] w-full mb-6"></div>

                    {/* Switch Account */}
                    <div className="mb-6">
                        <h4 className="text-[13px] font-medium text-[#8E8E93] mb-4">Switch Account</h4>

                        <div className="flex items-center gap-3 mb-6">
                            <div className="text-[#8E8E93]">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                                    <Image src="/right-column.png" alt="Avatar" fill className="object-cover" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[15px] font-bold text-[#111111]">Mark Bernard</span>
                                    <span className="text-[12px] text-[#8E8E93]">Markber004@mail.com</span>
                                </div>
                            </div>
                        </div>

                        <button className="flex items-center gap-3 text-[#111111] hover:opacity-7 transition-opacity group">
                            <div className="w-9 h-9 flex items-center justify-center text-[#8E8E93]">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                            </div>
                            <span className="text-[15px] font-medium">Add Account</span>
                        </button>
                    </div>

                    <div className="h-[1px] bg-[#E5E5EA] w-full mb-6"></div>

                    {/* Log Out */}
                    <button className="flex items-center gap-3 text-[#111111] hover:text-red-500 transition-colors group">
                        <div className="w-9 h-9 flex items-center justify-center text-[#8E8E93] group-hover:text-red-500">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                        </div>
                        <span className="text-[15px] font-medium">Log Out</span>
                    </button>
                </div>
            </div>
        </>
    );
}

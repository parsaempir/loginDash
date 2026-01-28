"use client";
import { Dispatch, SetStateAction } from "react";

interface NotificationPanelProps {
    show: boolean;
    onClose: () => void;
}

export default function NotificationPanel({ show, onClose }: NotificationPanelProps) {
    if (!show) return null;

    return (
        <>
            {/* Backdrop - Transparent to satisfy "no muting" request */}
            <div
                className="fixed inset-0 z-40 bg-transparent"
                onClick={onClose}
            ></div>

            {/* Notification Panel */}
            <div className="absolute top-[135px] right-8 z-50 w-[450px] bg-white rounded-[24px] shadow-[0_30px_70px_rgba(0,0,0,0.15)] border border-[#E5E5EA] animate-in fade-in slide-in-from-top-4 duration-200">
                {/* Arrow Tail - Smaller and narrower pointed style */}
                <div className="absolute -top-[8px] right-[24px] w-[14px] h-[14px] bg-white border-t border-l border-[#E5E5EA] rotate-45 transform"></div>

                <div className="p-6 relative z-10 bg-white rounded-[24px]">
                    <h3 className="text-[20px] font-bold text-[#111111] mb-6">Notifications</h3>

                    <div className="space-y-4">
                        {/* Notification Item 1 */}
                        <div className="flex items-start gap-4 p-4 bg-[#F9F9F9] hover:bg-[#F2F2F7] rounded-xl transition-colors cursor-pointer">
                            <div className="w-12 h-12 bg-[#C7C7CC] rounded-xl flex-shrink-0"></div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between mb-1">
                                    <h4 className="text-[15px] font-semibold text-[#111111]">Example Notification</h4>
                                    <span className="text-[12px] text-[#8E8E93] whitespace-nowrap ml-2">Yesterday</span>
                                </div>
                                <p className="text-[13px] text-[#8E8E93]">Lorem ipsum dolor sit amet</p>
                            </div>
                        </div>

                        {/* Notification Item 2 */}
                        <div className="flex items-start gap-4 p-4 bg-[#F9F9F9] hover:bg-[#F2F2F7] rounded-xl transition-colors cursor-pointer">
                            <div className="w-12 h-12 bg-[#C7C7CC] rounded-xl flex-shrink-0"></div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between mb-1">
                                    <h4 className="text-[15px] font-semibold text-[#111111]">Example Notification</h4>
                                    <span className="text-[12px] text-[#8E8E93] whitespace-nowrap ml-2">Yesterday</span>
                                </div>
                                <p className="text-[13px] text-[#8E8E93]">Lorem ipsum dolor sit amet</p>
                            </div>
                        </div>

                        {/* Notification Item 3 */}
                        <div className="flex items-start gap-4 p-4 bg-[#F9F9F9] hover:bg-[#F2F2F7] rounded-xl transition-colors cursor-pointer">
                            <div className="w-12 h-12 bg-[#C7C7CC] rounded-xl flex-shrink-0"></div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between mb-1">
                                    <h4 className="text-[15px] font-semibold text-[#111111]">Example Notification</h4>
                                    <span className="text-[12px] text-[#8E8E93] whitespace-nowrap ml-2">Yesterday</span>
                                </div>
                                <p className="text-[13px] text-[#8E8E93]">Lorem ipsum dolor sit amet</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

interface EditProfileModalProps {
    show: boolean;
    onClose: () => void;
    initialAppNotifications: boolean;
    initialEmailNotifications: boolean;
    onSave: (settings: { appNotifications: boolean, emailNotifications: boolean }) => void;
}

export default function EditProfileModal({
    show,
    onClose,
    initialAppNotifications,
    initialEmailNotifications,
    onSave
}: EditProfileModalProps) {
    const [activeTab, setActiveTab] = useState("account");
    const [appNotifications, setAppNotifications] = useState(initialAppNotifications);
    const [emailNotifications, setEmailNotifications] = useState(initialEmailNotifications);
    const [currentUser, setCurrentUser] = useState<any>(null);

    // Load user profile from localStorage
    useEffect(() => {
        if (typeof window !== "undefined") {
            try {
                const u = JSON.parse(localStorage.getItem("currentUser") || "null");
                setCurrentUser(u);
            } catch (err) {
                setCurrentUser(null);
            }
        }
    }, []);

    // Sync state when modal becomes visible
    useEffect(() => {
        if (show) {
            setAppNotifications(initialAppNotifications);
            setEmailNotifications(initialEmailNotifications);
        }
    }, [show, initialAppNotifications, initialEmailNotifications]);

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-[#00000040] animate-in fade-in duration-300"
                onClick={onClose}
            ></div>

            {/* Modal Container */}
            <div className="relative w-full max-w-[580px] bg-white rounded-[32px] overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.25)] animate-in zoom-in-95 fade-in duration-300">
                {/* Header with Topographic Background */}
                <div className="h-[100px] relative" style={{
                    backgroundImage: "url('/Frame 2147228857 (1).png')",
                    backgroundSize: "cover",
                    backgroundPosition: "top center"
                }}>
                    <button
                        onClick={onClose}
                        className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center bg-white/20 hover:bg-white/40 rounded-full transition-colors text-black"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>

                {/* Avatar Section */}
                <div className="flex flex-col items-center -mt-14 relative px-8 pb-5">
                    <div className="relative mb-3">
                        <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg">
                            {currentUser?.profileImage ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={currentUser.profileImage}
                                    alt={currentUser?.name || "User"}
                                    className="w-full h-full object-contain bg-[#F5F8FF]"
                                />
                            ) : (
                                <div className="w-full h-full bg-[#0C6FFF] flex items-center justify-center text-white font-bold text-4xl">
                                    {currentUser?.name?.charAt(0)?.toUpperCase() || "U"}
                                </div>
                            )}
                        </div>
                        {/* Status Dot */}
                        <div className="absolute top-0 right-0 w-[22px] h-[22px] bg-[#0C6FFF] border-[3px] border-white rounded-full z-20"></div>
                        {/* Edit Icon Overlay using Container.svg */}
                        <div className="absolute bottom-0 right-0 w-8 h-8 bg-[#1C1C1E] border-2 border-white rounded-[9px] flex items-center justify-center cursor-pointer hover:bg-black transition-colors overflow-hidden">
                            <Image src="/Container.svg" alt="edit" width={32} height={32} className="scale-125" />
                        </div>
                    </div>
                    <h3 className="text-[22px] font-bold text-[#111111]">{currentUser?.name || "User"}</h3>
                    <p className="text-[14px] text-[#8E8E93]">{currentUser?.email || "user@example.com"}</p>
                </div>

                {/* Content Area */}
                <div className="px-8 pb-8">
                    {/* Tabs */}
                    <div className="bg-[#F2F2F7] p-1 rounded-full flex items-center mb-8">
                        <button
                            onClick={() => setActiveTab("account")}
                            className={`flex-1 h-10 rounded-full text-[13px] font-semibold transition-all ${activeTab === "account" ? "bg-white text-[#1D61F2] shadow-sm border border-[#00000008]" : "text-[#8E8E93] hover:text-[#111111]"}`}
                        >
                            Account
                        </button>
                        <button
                            onClick={() => setActiveTab("privacy")}
                            className={`flex-1 h-10 rounded-full text-[13px] font-semibold transition-all ${activeTab === "privacy" ? "bg-white text-[#1D61F2] shadow-sm border border-[#00000008]" : "text-[#8E8E93] hover:text-[#111111]"}`}
                        >
                            Privacy and Security
                        </button>
                        <button
                            onClick={() => setActiveTab("notifications")}
                            className={`flex-1 h-10 rounded-full text-[13px] font-semibold transition-all ${activeTab === "notifications" ? "bg-white text-[#1D61F2] shadow-sm border border-[#00000008]" : "text-[#8E8E93] hover:text-[#111111]"}`}
                        >
                            Notifications
                        </button>
                    </div>

                    {/* Section: Account (Default) */}
                    {activeTab === "account" && (
                        <div>
                            <h4 className="text-[17px] font-bold text-[#111111] mb-5">Personal Information</h4>

                            <div className="flex gap-4 mb-6">
                                <div className="flex-1">
                                    <label className="block text-[13px] font-medium text-[#8E8E93] mb-1.5 ml-1">Name</label>
                                    <input
                                        type="text"
                                        value={currentUser?.name || ""}
                                        readOnly
                                        className="w-full h-[46px] bg-[#F9F9FB] border border-[#E5E5EA] rounded-[12px] px-4 text-[15px] text-[#8E8E93] cursor-not-allowed focus:outline-none transition-colors"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-[13px] font-medium text-[#8E8E93] mb-1.5 ml-1">Email</label>
                                    <input
                                        type="text"
                                        value={currentUser?.email || ""}
                                        readOnly
                                        className="w-full h-[46px] bg-[#F9F9FB] border border-[#E5E5EA] rounded-[12px] px-4 text-[15px] text-[#8E8E93] cursor-not-allowed focus:outline-none transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="h-[1px] bg-[#E5E5EA] w-full mb-5"></div>

                            {/* List Actions */}
                            <div className="space-y-2">
                                <button className="w-full flex items-center justify-between group py-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-5 h-5 flex items-center justify-center text-[#111111]">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                        </div>
                                        <span className="text-[15px] font-medium text-[#111111]">Change password</span>
                                    </div>
                                    <div className="text-[#8E8E93] group-hover:translate-x-1 transition-transform">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                    </div>
                                </button>

                                <button className="w-full flex items-center justify-between group py-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-5 h-5 flex items-center justify-center text-[#111111]">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                                        </div>
                                        <span className="text-[15px] font-medium text-[#111111]">Change language</span>
                                    </div>
                                    <div className="text-[#8E8E93] group-hover:translate-x-1 transition-transform">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                    </div>
                                </button>
                            </div>

                            <div className="h-[1px] bg-[#E5E5EA] w-full mt-4 mb-6"></div>

                            {/* Dangerous Action */}
                            <button className="flex items-center gap-3 text-[#FF3B30] hover:opacity-70 transition-opacity">
                                <div className="w-5 h-5 flex items-center justify-center">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                </div>
                                <span className="text-[15px] font-semibold">Delete account</span>
                            </button>
                        </div>
                    )}

                    {/* Section: Privacy and Security */}
                    {activeTab === "privacy" && (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-6 h-6 flex items-center justify-center">
                                    <Image src="/icon-activity-circle.svg" alt="activity" width={22} height={22} />
                                </div>
                                <h4 className="text-[18px] font-bold text-[#111111]">Active Sessions</h4>
                            </div>

                            <div className="space-y-4 ml-1">
                                <p className="text-[15px] text-[#8E8E93]">Current session</p>
                                <div className="space-y-1">
                                    <p className="text-[16px] font-medium text-[#111111]">Chrome 141</p>
                                    <p className="text-[15px] text-[#636366]">Unknown, Windows 10.1</p>
                                    <p className="text-[14px] text-[#AEAEB2]">152.32.45.67  New York, United States</p>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Section: Notifications */}
                    {activeTab === "notifications" && (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="space-y-6 mb-10">
                                {/* App Notifications Toggle */}
                                <div className="flex items-center justify-between">
                                    <span className="text-[16px] font-medium text-[#111111]">App notifications</span>
                                    <button
                                        onClick={() => setAppNotifications(!appNotifications)}
                                        className={`w-[51px] h-[31px] rounded-full relative transition-all duration-300 cursor-pointer ${appNotifications ? 'bg-[#34C759]' : 'bg-[#E5E5EA]'}`}
                                    >
                                        <div className={`absolute top-[2px] w-[27px] h-[27px] bg-white rounded-full shadow-md transition-all duration-300 ${appNotifications ? 'right-[2px]' : 'right-[22px]'}`}></div>
                                    </button>
                                </div>

                                {/* Email Notifications Toggle */}
                                <div className="flex items-center justify-between">
                                    <span className="text-[16px] font-medium text-[#111111]">Email notifications</span>
                                    <button
                                        onClick={() => setEmailNotifications(!emailNotifications)}
                                        className={`w-[51px] h-[31px] rounded-full relative transition-all duration-300 cursor-pointer ${emailNotifications ? 'bg-[#34C759]' : 'bg-[#E5E5EA]'}`}
                                    >
                                        <div className={`absolute top-[2px] w-[27px] h-[27px] bg-white rounded-full shadow-md transition-all duration-300 ${emailNotifications ? 'right-[2px]' : 'right-[22px]'}`}></div>
                                    </button>
                                </div>
                            </div>

                            {/* Save Changes Button */}
                            <div className="flex justify-center">
                                <button
                                    className="w-full h-11 bg-[#1D61F2] hover:bg-[#1652D1] text-white text-[15px] font-bold rounded-2xl transition-all shadow-md active:scale-[0.98]"
                                    onClick={() => onSave({ appNotifications, emailNotifications })}
                                >
                                    Save changes
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

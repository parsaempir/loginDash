"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useUser } from "@/app/context/UserContext";

interface ProfilePanelProps {
    show: boolean;
    onClose: () => void;
    onEditClick?: () => void;
}

export default function ProfilePanel({ show, onClose, onEditClick }: ProfilePanelProps) {
    const { currentUser, updateUser, logout } = useUser();
    const [showEditModal, setShowEditModal] = useState(false);
    const [editName, setEditName] = useState("");
    const [editImage, setEditImage] = useState<string | null>(null);

    useEffect(() => {
        if (currentUser) {
            setEditName(currentUser.name || "");
            setEditImage(currentUser.profileImage || null);
        }
    }, [currentUser]);

    if (!show) return null;

    const displayName = currentUser?.name || "You";
    const displayEmail = currentUser?.email || "";
    const displayImage = currentUser?.profileImage || null;

    const handleProfileUpdate = () => {
        updateUser({ name: editName, profileImage: editImage || undefined });
        setShowEditModal(false);
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-40 bg-transparent"
                onClick={onClose}
            ></div>

            {/* Profile Panel */}
            <div className="absolute top-[80px] lg:top-[125px] right-4 lg:right-[80px] z-50 w-[calc(100vw-32px)] sm:w-[320px] bg-white rounded-[24px] shadow-[0_30px_70px_rgba(0,0,0,0.15)] border border-[#E5E5EA] animate-in fade-in slide-in-from-top-4 duration-200">
                <div className="p-7 relative z-10 bg-white rounded-[24px]">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 text-[#111111] hover:opacity-60 transition-opacity"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>

                    {/* Main Profile Info */}
                    <div className="flex flex-col items-center mb-6 px-6 pt-4 pb-2">
                        <div className="relative">
                            <div className="relative w-20 h-20 rounded-full overflow-hidden mb-4 bg-[#F5F8FF] flex items-center justify-center">
                                {displayImage ? (
                                    <img src={displayImage} alt={displayName} className="object-contain w-full h-full" />
                                ) : (
                                    <div className="w-20 h-20 rounded-full bg-[#0C6FFF] flex items-center justify-center text-white font-semibold text-2xl">{displayName.charAt(0).toUpperCase()}</div>
                                )}
                            </div>
                            <div className="absolute top-0 right-0 w-[18px] h-[18px] bg-[#0C6FFF] border-2 border-white rounded-full z-20"></div>
                        </div>
                        <h3 className="text-[18px] font-bold text-[#111111] mb-0.5">{displayName}</h3>
                        <p className="text-[13px] text-[#8E8E93]">{displayEmail}</p>
                    </div>

                    {/* Edit Profile Button */}
                    <div className="flex justify-center mb-6">
                        <button
                            onClick={() => {
                                if (onEditClick) {
                                    onEditClick();
                                } else {
                                    setShowEditModal(true);
                                }
                            }}
                            className="px-4 h-[38px] rounded-[10px] border border-[#1D61F2] text-[#1D61F2] flex items-center justify-center gap-2 hover:bg-[#F2F9FF] transition-all"
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
                                <div className="relative">
                                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#F5F8FF] flex items-center justify-center">
                                        {displayImage ? (
                                            <img src={displayImage} alt={displayName} className="object-contain w-full h-full" />
                                        ) : (
                                            <div className="w-8 h-8 rounded-full bg-[#EEF3FF] flex items-center justify-center text-[#0C6FFF] font-semibold">{displayName.charAt(0)}</div>
                                        )}
                                    </div>
                                    <div className="absolute top-0 right-0 w-[11px] h-[11px] bg-[#0C6FFF] border-2 border-white rounded-full z-20"></div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[15px] font-bold text-[#111111]">{displayName}</span>
                                    <span className="text-[12px] text-[#8E8E93]">{displayEmail}</span>
                                </div>
                            </div>
                        </div>

                        <button className="flex items-center gap-3 text-[#111111] hover:opacity-70 transition-opacity group">
                            <div className="w-9 h-9 flex items-center justify-center text-[#8E8E93]">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                            </div>
                            <span className="text-[15px] font-medium">Add Account</span>
                        </button>
                    </div>

                    <div className="h-[1px] bg-[#E5E5EA] w-full mb-6"></div>

                    {/* Log Out */}
                    <button
                        onClick={() => {
                            logout();
                            window.location.href = "/auth/login";
                        }}
                        className="flex items-center gap-3 text-[#111111] hover:text-red-500 transition-colors group w-full text-left"
                    >
                        <div className="w-9 h-9 flex items-center justify-center text-[#8E8E93] group-hover:text-red-500">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                        </div>
                        <span className="text-[15px] font-medium">Log Out</span>
                    </button>
                </div>
            </div>

            {/* Edit Profile Modal */}
            {showEditModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowEditModal(false)}></div>
                    <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-[400px] z-[70] animate-in zoom-in-95 duration-200">
                        <h3 className="text-xl font-bold mb-6 text-[#111111]">Edit profile</h3>
                        <div className="space-y-6">
                            <div className="flex flex-col items-center">
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="profileEditInput"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onloadend = () => {
                                                setEditImage(reader.result as string);
                                            };
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                />
                                <div
                                    onClick={() => document.getElementById("profileEditInput")?.click()}
                                    className="h-24 w-24 rounded-full bg-[#F5F8FF] overflow-hidden flex items-center justify-center cursor-pointer border-2 border-[#E5E5EA] hover:border-[#0C6FFF] transition-all relative group"
                                >
                                    {editImage ? (
                                        <img src={editImage} alt="preview" className="object-cover w-full h-full" />
                                    ) : (
                                        <div className="w-24 h-24 rounded-full bg-[#EEF3FF] flex items-center justify-center text-[#0C6FFF] font-semibold text-2xl">{displayName.charAt(0)}</div>
                                    )}
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#8E8E93]">Full Name</label>
                                <input
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    placeholder="Full name"
                                    className="w-full border border-[#E5E5EA] rounded-xl px-4 h-12 outline-none focus:border-[#0C6FFF] transition-all"
                                />
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    className="flex-1 h-12 bg-gray-100 text-[#111111] font-semibold rounded-xl hover:bg-gray-200 transition-all"
                                    onClick={() => setShowEditModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="flex-1 h-12 bg-[#0C6FFF] text-white font-semibold rounded-xl hover:bg-[#0056D2] transition-all"
                                    onClick={handleProfileUpdate}
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

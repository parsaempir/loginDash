"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

interface Message {
    id: number;
    sender: string;
    avatar: string;
    content: string;
    time: string;
    isUser: boolean;
    attachment?: {
        name: string;
        size: string;
        type: string;
    };
}

interface UserProfile {
    name: string;
    avatar: string;
    status: string;
    email: string;
}

const USER_DATA: Record<string, UserProfile> = {
    "Mark Bernard": {
        name: "Mark Bernard",
        avatar: "/right-column.png",
        status: "Last seen recently",
        email: "Mrkber004@gmail.com"
    },
    "John Miles": {
        name: "John Miles",
        avatar: "/right-column (1).png",
        status: "Online",
        email: "john.miles@example.com"
    }
};

interface ChatContentProps {
    onNotificationClick?: () => void;
    onProfileClick?: () => void;
}

export default function ChatContent({ onNotificationClick, onProfileClick }: ChatContentProps) {
    const [messages, setMessages] = useState<Message[]>([]);

    const [inputText, setInputText] = useState("");
    const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
    const [replyingTo, setReplyingTo] = useState<Message | null>(null);
    const [hoveredMessageId, setHoveredMessageId] = useState<number | null>(null);
    const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
    const [activeMenuId, setActiveMenuId] = useState<number | null>(null);
    const [isSelectionMode, setIsSelectionMode] = useState(false);
    const [selectedMessageIds, setSelectedMessageIds] = useState<number[]>([]);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentResultIndex, setCurrentResultIndex] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const resultRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

    const filteredMessages = messages.filter(msg =>
        msg.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.sender.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalResults = filteredMessages.length;

    useEffect(() => {
        if (totalResults > 0) {
            setCurrentResultIndex(0);
        } else {
            setCurrentResultIndex(-1);
        }
    }, [searchQuery, totalResults]);

    const navigateResults = (direction: 'up' | 'down') => {
        if (totalResults === 0) return;
        if (direction === 'up') {
            setCurrentResultIndex(prev => (prev > 0 ? prev - 1 : totalResults - 1));
        } else {
            setCurrentResultIndex(prev => (prev < totalResults - 1 ? prev + 1 : 0));
        }
    };

    useEffect(() => {
        if (currentResultIndex >= 0 && filteredMessages[currentResultIndex]) {
            const activeMsgId = filteredMessages[currentResultIndex].id;
            const element = resultRefs.current[activeMsgId];
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [currentResultIndex]);
    const toggleSelectionMode = () => {
        setIsSelectionMode(!isSelectionMode);
        setSelectedMessageIds([]);
        setActiveMenuId(null);
    };

    const toggleMessageSelection = (id: number) => {
        setSelectedMessageIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleCopy = (content: string) => {
        navigator.clipboard.writeText(content);
        setActiveMenuId(null);
    };

    const handleDelete = (id: number) => {
        setMessages(prev => prev.filter(m => m.id !== id));
        setActiveMenuId(null);
    };

    const handleBulkDelete = () => {
        setMessages(prev => prev.filter(m => !selectedMessageIds.includes(m.id)));
        setIsSelectionMode(false);
        setSelectedMessageIds([]);
        setShowDeleteConfirm(false);
    };

    const openProfile = (name: string) => {
        const user = USER_DATA[name];
        if (user) {
            setSelectedUser(user);
        }
    };

    const handleSend = () => {
        if (!inputText.trim()) return;
        const newMessage: Message = {
            id: messages.length + 1,
            sender: "John Miles",
            avatar: "/right-column (1).png",
            content: inputText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isUser: true,
            // In a real app, you'd store the replyTo ID here
        };
        setMessages([...messages, newMessage]);
        setInputText("");
        setReplyingTo(null);
    };

    return (
        <div className="flex flex-col h-full rounded-2xl overflow-hidden relative" onClick={() => { setShowAttachmentMenu(false); setActiveMenuId(null); }}>
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-8 py-4 bg-transparent flex-shrink-0 min-h-[73px] gap-2 sm:gap-0">
                <h1 className="text-[16px] sm:text-[18px] font-semibold text-[#111111]">
                    {isSearchVisible ? 'Search result' : 'Rode wing Chat'}
                </h1>

                <div className="flex items-center gap-4">
                    {isSearchVisible && (
                        <div className="flex items-center bg-[#F2F2F7] rounded-xl px-4 h-[40px] w-full sm:w-[280px] animate-in fade-in slide-in-from-right-4 duration-300 relative group">
                            <input
                                autoFocus
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Hello"
                                className="flex-1 bg-transparent border-none focus:outline-none text-[14px] text-[#2C2C2E] placeholder:text-[#2C2C2E]"
                            />
                            <div className="text-[#8E8E93] ml-2">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            </div>
                        </div>
                    )}

                    {!isSearchVisible && (
                        <button
                            className="text-[#8E8E93] hover:text-[#111111] transition-colors"
                            onClick={() => setIsSearchVisible(true)}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        </button>
                    )}

                    {isSearchVisible && totalResults > 0 && (
                        <div className="flex items-center gap-3">
                            <span className="text-[14px] font-bold text-[#1D61F2] whitespace-nowrap">
                                {currentResultIndex + 1} of {totalResults}
                            </span>
                            <div className="flex flex-col items-center -space-y-1">
                                <button onClick={() => navigateResults('up')} className="text-[#1D61F2] hover:opacity-70 transition-opacity">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                                </button>
                                <button onClick={() => navigateResults('down')} className="text-[#1D61F2] hover:opacity-70 transition-opacity">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                </button>
                            </div>
                        </div>
                    )}

                    {!isSearchVisible && (
                        <button
                            className="text-[#8E8E93] hover:text-[#111111] cursor-default"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                        </button>
                    )}

                    {isSearchVisible && (
                        <button
                            onClick={() => {
                                setIsSearchVisible(false);
                                setSearchQuery("");
                            }}
                            className="text-[#8E8E93] hover:text-[#111111]"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    )}
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 lg:p-8 flex flex-col" ref={scrollContainerRef}>
                {messages.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center animate-in fade-in duration-500">
                        <div className="relative w-[240px] h-[160px] mb-6">
                            <Image
                                src="/Frame 2147228642.png"
                                alt="No messages"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <h3 className="text-[20px] font-bold text-[#111111] opacity-70">No messages yet</h3>
                    </div>
                ) : (
                    <div className="space-y-1">
                        {filteredMessages.map((msg, index) => {
                            const isSameSender = index > 0 && filteredMessages[index - 1].sender === msg.sender;
                            const isActiveResult = isSearchVisible && currentResultIndex === index;

                            return (
                                <div
                                    key={msg.id}
                                    ref={el => { resultRefs.current[msg.id] = el; }}
                                    className={`relative group transition-colors duration-200 ${selectedMessageIds.includes(msg.id) ? 'bg-[#F2F9FF]' : ''} ${isActiveResult ? 'bg-[#FFF9C4]' : ''} ${isSameSender ? 'mt-0' : 'mt-5'}`}
                                    onClick={() => isSelectionMode && toggleMessageSelection(msg.id)}
                                >
                                    {index === 3 && (
                                        <div className="flex justify-center mb-8 mt-8">
                                            <span className="bg-[#E5E5EA] text-[#8E8E93] text-[12px] px-4 py-1 rounded-full">September 14</span>
                                        </div>
                                    )}
                                    <div className="flex gap-4 p-2 relative items-center">
                                        {/* Selection Circle - Only in Selection Mode */}
                                        {isSelectionMode && (
                                            <div className="flex items-center justify-center pl-2 pr-0">
                                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${selectedMessageIds.includes(msg.id) ? 'bg-[#1D61F2] border-[#1D61F2]' : 'border-[#E5E5EA] bg-white'}`}>
                                                    {selectedMessageIds.includes(msg.id) && (
                                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                        {/* Avatar - Only show if sender changed */}
                                        <div
                                            className={`relative w-8 h-8 lg:w-10 lg:h-10 flex-shrink-0 ${!isSameSender ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
                                            onClick={() => !isSameSender && openProfile(msg.sender)}
                                        >
                                            {!isSameSender && (
                                                <Image
                                                    src={msg.avatar}
                                                    alt={msg.sender}
                                                    fill
                                                    className="rounded-full object-cover"
                                                />
                                            )}
                                        </div>

                                        {/* Message Content Area */}
                                        <div className="flex flex-col flex-1 min-w-0">
                                            {!isSameSender && (
                                                <div className="flex items-center gap-3 mb-1">
                                                    <span
                                                        className="text-[15px] font-bold text-[#111111] cursor-pointer hover:underline"
                                                        onClick={() => openProfile(msg.sender)}
                                                    >
                                                        {msg.sender}
                                                    </span>
                                                    <span className="text-[11px] text-[#8E8E93]">{msg.time}</span>
                                                    {msg.isUser && (
                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                    )}
                                                </div>
                                            )}

                                            <div
                                                onMouseEnter={() => setHoveredMessageId(msg.id)}
                                                onMouseLeave={() => setHoveredMessageId(null)}
                                                className={`relative px-3 py-0 -ml-3 rounded-lg transition-all flex items-center justify-between min-h-[24px] group/content ${(hoveredMessageId === msg.id || activeMenuId === msg.id) ? 'bg-[#F2F2F7]' : 'bg-transparent'}`}
                                            >
                                                <div className="text-[15px] text-[#2C2C2E] leading-snug whitespace-pre-wrap flex-1">
                                                    {isSearchVisible && searchQuery ? (
                                                        msg.content.split(new RegExp(`(${searchQuery})`, 'gi')).map((part, i) =>
                                                            part.toLowerCase() === searchQuery.toLowerCase()
                                                                ? <mark key={i} className={`rounded-sm px-0.5 ${isActiveResult ? 'bg-[#1D61F2] text-white' : 'bg-[#CFE1FF] text-[#1D61F2]'}`}>{part}</mark>
                                                                : part
                                                        )
                                                    ) : (
                                                        msg.content
                                                    )}
                                                </div>

                                                {/* Message Actions (Reply/More) */}
                                                {!isSelectionMode && (hoveredMessageId === msg.id || activeMenuId === msg.id) && (
                                                    <div className="flex items-center gap-2 ml-4 animate-in fade-in slide-in-from-right-2">
                                                        <button
                                                            className="p-1.5 text-[#8E8E93] hover:text-[#1D61F2] transition-all"
                                                            onClick={(e) => { e.stopPropagation(); setReplyingTo(msg); }}
                                                        >
                                                            <img src="/corner-down-left.svg" alt="Reply" className="w-[18px] h-[18px]" />
                                                        </button>
                                                        <div className="relative">
                                                            <button
                                                                className="p-1.5 text-[#8E8E93] hover:text-[#111111] transition-all"
                                                                onClick={(e) => { e.stopPropagation(); setActiveMenuId(activeMenuId === msg.id ? null : msg.id); }}
                                                            >
                                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                                                            </button>

                                                            {/* Context Menu */}
                                                            {activeMenuId === msg.id && (
                                                                <div className="absolute right-0 top-full mt-1 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.12)] border border-[#E5E5EA] py-2 min-w-[160px] z-30 animate-in zoom-in-95 duration-150" onClick={(e) => e.stopPropagation()}>
                                                                    <button
                                                                        className="w-full flex items-center gap-4 px-4 py-2.5 hover:bg-[#F2F2F7] transition-colors"
                                                                        onClick={() => handleCopy(msg.content)}
                                                                    >
                                                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2C2C2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                                                                        <span className="text-[15px] font-medium text-[#2C2C2E]">Copy</span>
                                                                    </button>
                                                                    <button
                                                                        className="w-full flex items-center gap-4 px-4 py-2.5 hover:bg-[#F2F2F7] transition-colors"
                                                                        onClick={() => toggleSelectionMode()}
                                                                    >
                                                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2C2C2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 8 8 12 12 16"></polyline></svg>
                                                                        <span className="text-[15px] font-medium text-[#2C2C2E]">Select</span>
                                                                    </button>
                                                                    <button
                                                                        className="w-full flex items-center gap-4 px-4 py-2.5 hover:bg-[#F2F2F7] transition-colors"
                                                                        onClick={() => handleDelete(msg.id)}
                                                                    >
                                                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF453A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path></svg>
                                                                        <span className="text-[15px] font-medium text-[#FF453A]">Delete</span>
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {msg.attachment && (
                                                <div className="mt-3 flex items-center gap-3 p-3 bg-white rounded-xl border border-[#E5E5EA] w-fit">
                                                    <div className="w-10 h-10 bg-[#E54B4B] rounded-lg flex items-center justify-center text-white font-bold text-[10px]">
                                                        PDF
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[13px] font-semibold text-[#111111]">{msg.attachment.name}</span>
                                                        <span className="text-[11px] text-[#8E8E93]">{msg.attachment.size}</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            <div className="px-2 pb-8 pt-4 bg-transparent relative">
                {/* Attachment Menu Popup */}
                {showAttachmentMenu && (
                    <div
                        className="absolute bottom-[90px] left-8 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-[#E5E5EA] p-2 min-w-[280px] z-20 overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="w-full flex items-center gap-4 px-4 py-3 hover:bg-[#F2F2F7] rounded-lg transition-colors group">
                            <div className="text-[#111111]">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                            </div>
                            <span className="text-[15px] font-medium text-[#111111]">Photo & Video</span>
                        </button>
                        <button className="w-full flex items-center gap-4 px-4 py-3 hover:bg-[#F2F2F7] rounded-lg transition-colors group">
                            <div className="text-[#111111]">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                            </div>
                            <span className="text-[15px] font-medium text-[#111111]">Document</span>
                        </button>
                    </div>
                )}

                <div className={`flex flex-col bg-white rounded-xl border border-[#E5E5EA] shadow-sm overflow-hidden ${replyingTo ? 'min-h-[110px]' : 'h-[72px]'}`}>
                    {/* Reply Preview - Inside Input Box */}
                    {replyingTo && (
                        <div className="flex items-center gap-2 px-4 py-3">
                            <div className="flex items-center justify-center">
                                <img src="/corner-down-left (1).svg" alt="Reply" className="w-[18px] h-[18px]" />
                            </div>
                            <div className="flex-1 flex items-center bg-[#F2F9FF] rounded-lg overflow-hidden h-[44px]">
                                <div className="w-[4px] h-full bg-[#1D61F2]" />
                                <div className="flex-1 pl-3 py-1">
                                    <div className="text-[12px] font-bold text-[#1D61F2]">Reply to {replyingTo.sender}</div>
                                    <div className="text-[11px] text-[#8E8E93] truncate max-w-[500px]">{replyingTo.content}</div>
                                </div>
                            </div>
                            <button
                                className="flex items-center justify-center text-[#1D61F2] hover:opacity-70 transition-colors"
                                onClick={() => setReplyingTo(null)}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>
                    )}

                    {/* Input Row */}
                    <div className="flex items-center gap-2 lg:gap-4 px-3 lg:px-6 h-[72px]">
                        <button
                            className={`text-[#1D61F2] hover:opacity-70 transition-transform ${showAttachmentMenu ? 'rotate-45' : ''}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowAttachmentMenu(!showAttachmentMenu);
                            }}
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
                        </button>
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Type a Message..."
                            className="flex-1 bg-transparent border-none focus:outline-none text-[14px] placeholder:text-[#AEAEB2] caret-[#1D61F2]"
                        />
                        <div className="flex items-center gap-4">
                            <img src="/􀎸.svg" alt="Logo" className="w-[20px] h-[20px] brightness-0" />
                            <button
                                onClick={handleSend}
                                className="text-[#1D61F2] hover:opacity-70 transition-opacity"
                            >
                                <img src="/sd.svg" alt="Send" className="w-[22px] h-[22px]" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Selection Bar */}
            {isSelectionMode && (
                <div className="absolute bottom-[100px] left-4 right-4 lg:left-1/2 lg:right-auto lg:-translate-x-1/2 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-[#E5E5EA] px-4 lg:px-6 h-[56px] flex items-center justify-center gap-4 lg:gap-6 z-40 animate-in slide-in-from-bottom-4 duration-300">
                    <button
                        onClick={() => toggleSelectionMode()}
                        className="p-1 hover:bg-[#F2F2F7] rounded-lg transition-colors"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                    <span className="text-[15px] font-bold text-[#111111] min-w-[100px]">
                        {selectedMessageIds.length} {selectedMessageIds.length === 1 ? 'Message' : 'Messages'}
                    </span>
                    <button
                        onClick={() => setShowDeleteConfirm(true)}
                        disabled={selectedMessageIds.length === 0}
                        className="flex items-center gap-2 text-[#FF453A] font-bold hover:opacity-70 transition-opacity disabled:opacity-30 ml-auto"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path></svg>
                        Delete
                    </button>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div
                    className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 animate-in fade-in duration-200"
                    onClick={() => setShowDeleteConfirm(false)}
                >
                    <div
                        className="bg-white rounded-[32px] w-full max-w-[500px] p-8 shadow-2xl animate-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-[22px] font-bold text-[#111111] mb-6">Delete Message</h3>
                        <p className="text-[16px] text-[#48484A] leading-relaxed mb-10">
                            Are you sure you want to Delete message? this cannot be undone
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="flex-1 h-[52px] rounded-[16px] text-[17px] font-bold text-[#111111] hover:bg-[#F2F2F7] transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleBulkDelete}
                                className="flex-1 h-[52px] rounded-[16px] bg-[#EE463E] text-white text-[17px] font-bold hover:opacity-90 transition-opacity"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Profile Modal */}
            {selectedUser && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-in fade-in duration-200"
                    onClick={() => setSelectedUser(null)}
                >
                    <div
                        className="bg-white rounded-[32px] w-full max-w-[480px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-8 py-6">
                            <h2 className="text-[20px] font-bold text-[#111111]">Profile</h2>
                            <button
                                onClick={() => setSelectedUser(null)}
                                className="text-[#111111] hover:opacity-60 transition-opacity"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="px-6 lg:px-10 pb-8 lg:pb-10 flex flex-col items-center">
                            <div className="relative w-[180px] h-[180px] lg:w-[220px] lg:h-[220px] mb-6 lg:mb-8">
                                <Image
                                    src={selectedUser.avatar}
                                    alt={selectedUser.name}
                                    fill
                                    className="rounded-[40px] object-cover"
                                />
                                {/* Status Dot */}
                                <div className="absolute top-0 right-0 w-[40px] h-[40px] bg-[#0C6FFF] border-[6px] border-white rounded-full z-20 -translate-x-1 underline-offset-4"></div>
                            </div>

                            <h3 className="text-[32px] font-bold text-[#111111] mb-2">{selectedUser.name}</h3>
                            <p className="text-[15px] text-[#8E8E93] mb-10">{selectedUser.status}</p>

                            <button className="w-full bg-[#1D61F2] text-white h-[52px] rounded-[16px] flex items-center justify-center gap-3 text-[17px] font-bold hover:opacity-90 transition-opacity mb-6">
                                <img src="/chat.svg" alt="Message" className="w-[20px] h-[20px] brightness-0 invert" />
                                Message
                            </button>

                            <div className="w-full h-[1px] bg-[#E5E5EA] mb-8" />

                            <div className="w-full text-left">
                                <h4 className="text-[18px] font-bold text-[#111111] mb-4">Contact Info</h4>
                                <p className="text-[16px] text-[#2C2C2E] font-medium">{selectedUser.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

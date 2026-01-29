"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import AgreementContent from "./AgreementContent";
import DeliveryContent from "./DeliveryContent";
import PaymentContent from "./PaymentContent";
import ChatContent from "./ChatContent";
import HelpContent from "./HelpContent";
import NotificationPanel from "./NotificationPanel";
import ProfilePanel from "./ProfilePanel";
import EditProfileModal from "./EditProfileModal";
import { useUser } from "@/app/context/UserContext";

export default function DashboardPage() {
  const { currentUser } = useUser();
  // Default to has data for demonstration (true = has data, false = empty)
  const [hasData, setHasData] = useState(true);
  // Active page state
  const [activePage, setActivePage] = useState("overview");
  // Notification/Profile panel states
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [appNotifications, setAppNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSaveProfileSettings = (settings: { appNotifications: boolean, emailNotifications: boolean }) => {
    setAppNotifications(settings.appNotifications);
    setEmailNotifications(settings.emailNotifications);
    setShowEditProfile(false);
  };

  return (
    <div className="h-screen bg-[#F5F5F7] flex overflow-hidden">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-[#E5E5EA] flex items-center justify-between px-4 z-[40]">
        <div className="flex items-center gap-2">
          <img src='/Vector 16.svg' className="h-6 w-6" />
          <span className="text-lg font-bold text-[#1D1D1F]">Projio</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-[#F5F5F7] rounded-lg transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1D1D1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-[45] animate-in fade-in duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Left rail */}
      <div className="hidden lg:flex w-[80px] bg-white flex-col items-center py-6 gap-6 my-4 rounded-2xl ml-2">
        <div className="w-10 h-10 flex items-center justify-center text-white text-xl font-semibold">
          <img src='/Vector 16.svg' />
        </div>
        <div className="flex-1" />
        <img src='/setting.svg' />
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-[50]
        w-[260px] bg-white flex flex-col justify-between py-6 px-6 lg:my-4 rounded-r-2xl lg:rounded-2xl lg:mx-2
        transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-[8] bg-[#FFAE00] flex items-center justify-center font-semibold text-sm flex-shrink-0 text-white">
              {(currentUser?.name || "U").charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className="text-[16px] font-[500] text-[#303030] leading-none">
                {currentUser?.name || "User"}
              </span>
              <span className="text-[12px] text-[#8E8E93]">
                {currentUser?.email || ""}
              </span>
            </div>
          </div>

          <nav className="space-y-1 text-[13px]">
            <NavItem
              active={activePage === "overview"}
              label="Overview"
              icon={activePage === "overview" ? "/Leading Icon8.svg" : "/Leading Icon7.svg"}
              onClick={() => { setActivePage("overview"); setSidebarOpen(false); }}
            />
            <NavItem
              active={activePage === "agreement"}
              label="Agreement"
              icon={activePage === "agreement" ? "/Leading Icon9.svg" : "/Leading Icon1.svg"}
              onClick={() => { setActivePage("agreement"); setSidebarOpen(false); }}
            />
            <NavItem
              active={activePage === "delivery"}
              label="Delivery"
              icon={activePage === "delivery" ? "/Leading Icon10.svg" : "/Leading Icon4.svg"}
              onClick={() => { setActivePage("delivery"); setSidebarOpen(false); }}
            />
            <NavItem
              active={activePage === "payment"}
              label="Payment"
              icon={activePage === "payment" ? "/Leading Icon11.svg" : "/Leading Icon2.svg"}
              onClick={() => { setActivePage("payment"); setSidebarOpen(false); }}
            />
            <NavItem
              active={activePage === "chat"}
              label="Chat"
              icon={activePage === "chat" ? "/Leading Icon12.svg" : "/Leading Icon3.svg"}
              onClick={() => { setActivePage("chat"); setSidebarOpen(false); }}
            />
          </nav>

          <div className="mt-8 pt-5 border-t border-[#E5E5EA]">
            <div className="text-[15px] text-[black] mb-3">Resources</div>
            <div className="space-y-1 text-[14px] text-[black]">
              <button
                onClick={() => { setActivePage("help"); setSidebarOpen(false); }}
                className={`block w-full text-left hover:text-black flex items-center gap-2 mb-3 ${activePage === "help" ? "text-[#0C6FFF]" : ""}`}
              >
                <span className={`w-1 h-1 rounded-full flex-shrink-0 ${activePage === "help" ? "bg-[#0C6FFF]" : "bg-[#C7C7CC]"}`}></span>
                Get help
              </button>
              <button className="block w-full text-left hover:text-black flex items-center gap-2 mb-3">
                <span className="w-1 h-1 rounded-full bg-[#C7C7CC] flex-shrink-0"></span>
                Give us feedback
              </button>
              <button className="block w-full text-left hover:text-black flex items-center gap-2 mb-3">
                <span className="w-1 h-1 rounded-full bg-[#C7C7CC] flex-shrink-0"></span>
                Contact support
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-[#C7C7CC] mt-6">

        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 mr-5 pl-1 flex flex-col min-h-0 pt-16 lg:pt-0 overflow-hidden">
        {/* Global Panels */}
        <NotificationPanel
          show={showNotifications}
          onClose={() => setShowNotifications(false)}
        />
        <ProfilePanel
          show={showProfile}
          onClose={() => setShowProfile(false)}
          onEditClick={() => {
            setShowProfile(false);
            setShowEditProfile(true);
          }}
        />
        <EditProfileModal
          show={showEditProfile}
          onClose={() => setShowEditProfile(false)}
          initialAppNotifications={appNotifications}
          initialEmailNotifications={emailNotifications}
          onSave={handleSaveProfileSettings}
        />

        {activePage === "agreement" ? (
          <AgreementContent
            onNotificationClick={() => setShowNotifications(!showNotifications)}
            onProfileClick={() => setShowProfile(!showProfile)}
          />
        ) : activePage === "delivery" ? (
          <DeliveryContent
            onNotificationClick={() => setShowNotifications(!showNotifications)}
            onProfileClick={() => setShowProfile(!showProfile)}
          />
        ) : activePage === "payment" ? (
          <PaymentContent
            onNotificationClick={() => setShowNotifications(!showNotifications)}
            onProfileClick={() => setShowProfile(!showProfile)}
          />
        ) : activePage === "chat" ? (
          <ChatContent
            onNotificationClick={() => setShowNotifications(!showNotifications)}
            onProfileClick={() => setShowProfile(!showProfile)}
          />
        ) : activePage === "help" ? (
          <HelpContent
            onNotificationClick={() => setShowNotifications(!showNotifications)}
            onProfileClick={() => setShowProfile(!showProfile)}
          />
        ) : (
          <div className="flex-1 overflow-y-auto px-4 lg:px-0 lg:pr-4 pt-8">
            {/* Top bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 relative rounded-2xl overflow-hidden px-4 sm:px-6 py-5 sm:py-6 gap-4 sm:gap-0" style={{
              backgroundImage: "url('/Frame 2147228857 (1).png')",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}>
              <div className="flex flex-col gap-1 relative z-10">
                <div className="text-[15px] pl-5 text-[#black]">Overview</div>
                <h1 className="text-[22px] font-semibold text-[#111111]">
                  Overview
                </h1>
                <p className="text-[13px] text-[#black] mt-1">
                  A quick summary of your workspace progress
                </p>
              </div>

              <div className="flex items-center gap-4 relative z-10">
                <div className="relative">
                  <button
                    onClick={() => setShowProfile(!showProfile)}
                    className="relative w-9 h-9 rounded-full overflow-hidden border border-[#E5E5EA] cursor-pointer bg-[#F5F8FF] flex items-center justify-center"
                  >
                    {currentUser?.profileImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={currentUser.profileImage} alt={currentUser?.name || "User"} className="w-full h-full object-contain bg-[#F5F8FF]" />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-[#0C6FFF] flex items-center justify-center text-white font-semibold text-sm">
                        {currentUser?.name?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                    )}
                  </button>
                  <div className="absolute top-0 right-0 w-[11px] h-[11px] bg-[#0C6FFF] border-2 border-white rounded-full z-20"></div>
                </div>
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="cursor-pointer hover:opacity-70 transition-opacity"
                >
                  <img src='/ellipsis.svg' alt="menu" />
                </button>
              </div>
            </div>

            {/* Stats cards */}
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10 bg-[#ffffff] rounded-2xl p-5">
              <StatCard
                tone="success"
                title="Deliveries approved"
                value={hasData ? "3" : "0"}
                suffix={hasData ? "/5" : "/0"}
                icon="✓"
              />
              <StatCard
                tone="info"
                title="Last payment"
                value={hasData ? "300$" : "0"}
                icon="/Cards Overview Icons.svg"
                iconType="svg"
              />
              <StatCard
                tone="neutral"
                title="Remaining balance"
                value={hasData ? "900" : "0"}
                suffix={hasData ? "/1200$" : "/0"}
                icon="/Cards Overview Icons (1).svg"
                iconType="svg"
              />
              <StatCard
                tone="warning"
                title="Deliveries Pending Approval"
                value={hasData ? "2" : "0"}
                suffix={hasData ? "/5" : "/0"}
                icon="/Cards Overview Icons (2).svg"
                iconType="svg"
              />
            </section>

            <section className="flex flex-col lg:flex-row gap-6">
              {/* Latest deliveries table */}
              <div className="flex-1 rounded-2xl px-6 py-5 overflow-x-auto">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[14px] font-semibold text-[#111111]">
                    Latest Deliveries
                  </h2>
                  <button className="text-[11px] text-[#1D61F2]">see more</button>
                </div>

                <div className="min-w-[400px]">
                  <div className="grid grid-cols-[1.5fr_1fr_1.2fr] text-[13px] text-[black] border-b border-[#E5E5EA] pb-2 mb-2">
                    <span>Name</span>
                    <span>Version badge</span>
                    <span className="text-right pr-4">Status</span>
                  </div>

                  {hasData ? (
                    <>
                      <DeliveryRow
                        name="Delivery  02"
                        version="v02"
                        status="Changes requested"
                      />
                      <DeliveryRow
                        name="Delivery  01"
                        version="v01"
                        status="Changes requested"
                      />
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12">
                      <Image
                        src="/Frame 2147228642.png"
                        alt="No deliveries"
                        width={200}
                        height={200}
                        className="mb-4"
                      />
                      <p className="text-[14px] font-semibold text-[#111111]">No Delivery items yet</p>
                      <p className="text-[11px] text-[#8E8E93] mt-1">Once you upload a delivery item, it will appear here</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment summary */}
              <div className="w-full lg:w-[260px] h-auto lg:h-[300px] rounded-2xl border border-[4px] border-[white] px-6 py-5 flex flex-col gap-4">
                <div className="text-[15px] font-semibold text-[#111111]">
                  Payment Summary
                </div>
                <div className="relative flex items-center justify-center">
                  <div className="relative w-56 h-56 rounded-full flex items-center justify-center">
                    <svg
                      className="relative w-56 h-56 -rotate-90"
                      viewBox="0 0 100 100"
                    >
                      {/* Background circle - light gray */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#E5E5EA"
                        strokeWidth="3"
                        fill="none"
                      />
                      {/* Progress circle - blue, 75% (900/1200) or 0% when empty */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#1D61F2"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray="251.2"
                        strokeDashoffset={hasData ? "62.8" : "251.2"}
                      />
                    </svg>
                    <div className="absolute text-center">
                      <div className="text-[24px] font-semibold text-[#111111]">
                        {hasData ? "900" : "0"}
                        <span className="text-[13px] font-normal text-[#4B4B4D]">
                          {hasData ? " /1200$" : " /0"}
                        </span>
                      </div>
                      <div className="mt-1 text-[13px] font-normal text-[#4B4B4D]">
                        Remaining balance
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}

type Tone = "success" | "info" | "neutral" | "warning";

interface StatCardProps {
  tone: Tone;
  title: string;
  value: string;
  suffix?: string;
  icon: string;
  iconType?: "svg" | "text";
}

function StatCard({ tone, title, value, suffix, icon, iconType = "text" }: StatCardProps) {
  const bgMap: Record<Tone, string> = {
    success: "bg-[#E7F7EC]",
    info: "bg-[#E7F0FF]",
    neutral: "bg-[#F5F5F7]",
    warning: "bg-[#FFEFD9]",
  };

  const iconBgMap: Record<Tone, string> = {
    success: "bg-[#34C759]",
    info: "bg-[#1D61F2]",
    neutral: "bg-[#C7C7CC]",
    warning: "bg-[#FF9500]",
  };

  return (
    <div
      className={`${bgMap[tone]} rounded-2xl px-5 py-4 flex flex-col justify-between`}
    >
      <div className="flex items-start justify-between mb-4">
        {iconType === "svg" ? (
          <div className="relative w-11 h-11">
            <Image
              src={icon}
              alt={title}
              width={44}
              height={44}
              className="object-contain"
            />
          </div>
        ) : (
          <div
            className={`${iconBgMap[tone]} w-8 h-8 rounded-full flex items-center justify-center text-white text-sm`}
          >
            {icon}
          </div>
        )}
      </div>
      <div className="text-[15px] text-[black] mb-1">{title}</div>
      <div className="text-[18px] font-semibold text-[#111111]">
        {value}
        {suffix && (
          <span className="text-[11px] text-[#8E8E93] ml-1">{suffix}</span>
        )}
      </div>
    </div>
  );
}

interface DeliveryRowProps {
  name: string;
  version: string;
  status: string;
}

function DeliveryRow({ name, version, status }: DeliveryRowProps) {
  return (
    <div className="grid grid-cols-[1.5fr_1fr_1.2fr] items-center text-[11px] text-[#4B4B4D] py-3 border-b border-[#E5E5EA] last:border-b-0">
      <span>{name}</span>
      <span className="text-[black]">{version}</span>
      <div className="flex justify-end pr-4">
        <span className="inline-flex items-center h-6 px-3 rounded-full bg-[#757575] text-[10px] text-white">
          {status}
        </span>
      </div>
    </div>
  );
}

interface NavItemProps {
  label: string;
  active?: boolean;
  icon: string;
  onClick?: () => void;
}

function NavItem({ label, active, icon, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-2 py-2 rounded-lg text-left transition ${active
        ? "text-[#111111] font-semibold"
        : "text-[#4B4B4D]"
        }`}
    >
      <div className="relative w-[34px] h-[34px] flex-shrink-0">
        <Image
          src={icon}
          alt={label}
          width={34}
          height={34}
          className="object-contain"
        />
      </div>
      <span className="text-[13px]">{label}</span>
    </button>
  );
}



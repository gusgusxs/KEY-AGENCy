// app/agent/team/page.tsx
"use client";

import { Bell } from 'lucide-react';
import AgentBottomNav from '@/app/components/AgentBottomNav';

export default function AgentTeam() {
  return (
    <div className="min-h-screen bg-gray-50 pb-24 font-sans text-slate-800">
      
      {/* --- Header --- */}
      <header className="flex justify-between items-center px-6 pt-8 pb-4 bg-white sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#dc2626] rounded-lg flex items-center justify-center">
             <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
          </div>
          <span className="text-xl font-bold text-[#dc2626]">KEY Agent</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative p-2 hover:bg-gray-100 rounded-full transition">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute top-1.5 right-2 w-2 bg-red-500 h-2 rounded-full border border-white"></span>
          </button>
          <div className="w-9 h-9 bg-gray-200 rounded-full overflow-hidden border border-gray-100">
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jane" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      {/* --- Page Title --- */}
      <div className="px-6 pt-6 pb-4">
        <h1 className="text-xl font-bold text-slate-800 mb-1">My Team</h1>
        <p className="text-sm text-gray-500">Manage your team members and earnings</p>
      </div>

      {/* --- Total Team Override Card --- */}
      <div className="px-6 mb-6">
        <div className="bg-red-50 border border-red-100 rounded-2xl p-5 shadow-sm">
            <h2 className="text-[#dc2626] font-bold text-sm mb-1">Total Team Override</h2>
            <p className="text-3xl font-extrabold text-slate-800 mb-2">฿23,000</p>
            <p className="text-xs text-slate-500 font-medium">Upcoming payout on 15 Feb</p>
        </div>
      </div>

      {/* --- Pending Requests Section --- */}
      <div className="px-6 mb-6">
        <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <h2 className="font-bold text-slate-800 text-base">Pending Requests</h2>
            <span className="bg-orange-100 text-orange-600 text-xs font-bold px-2 py-0.5 rounded-full ml-1">2</span>
        </div>

        <div className="space-y-3">
            {/* Request 1 */}
            <PendingCard 
                name="คุณสมศักดิ์"
                date="17 Feb 2024"
                avatarSeed="Somsak"
            />
            {/* Request 2 */}
            <PendingCard 
                name="คุณมารี"
                date="16 Feb 2024"
                avatarSeed="Marie"
            />
        </div>
      </div>

      {/* --- Active Members Section --- */}
      <div className="px-6 mb-6">
        <div className="flex items-center gap-2 mb-3">
            <h2 className="font-bold text-slate-800 text-base">Active Members (2)</h2>
        </div>

        <div className="space-y-3">
             {/* Active Member 1 */}
             <ActiveMemberCard 
                name="คุณวิชัย"
                sales="฿15,000,000"
                override="+฿15,000"
                avatarSeed="Wichai"
             />
             {/* Active Member 2 (จำลองเพิ่มให้ดูเต็มๆ) */}
             <ActiveMemberCard 
                name="คุณแนนซี่"
                sales="฿8,000,000"
                override="+฿8,000"
                avatarSeed="Nancy"
             />
        </div>
      </div>

      {/* ✅ แถบเมนูด้านล่าง (ส่วนกลาง) */}
      <AgentBottomNav />

    </div>
  );
}

// --- Component ย่อย: การ์ดสำหรับคนรออนุมัติ ---
function PendingCard({ name, date, avatarSeed }: any) {
    return (
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeed}`} alt={name} className="w-full h-full object-cover" />
                </div>
                <div>
                    <h3 className="font-bold text-slate-800 text-sm">{name} (รออนุมัติ)</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Applied: {date}</p>
                </div>
            </div>
            <div className="flex gap-3">
                <button className="flex-1 py-2.5 bg-gray-50 hover:bg-gray-100 text-slate-600 rounded-xl text-sm font-bold border border-gray-100 transition active:scale-95">
                    Decline
                </button>
                <button className="flex-1 py-2.5 bg-[#dc2626] hover:bg-red-700 text-white rounded-xl text-sm font-bold shadow-sm transition active:scale-95">
                    Approve
                </button>
            </div>
        </div>
    );
}

// --- Component ย่อย: การ์ดสำหรับลูกทีมปัจจุบัน ---
function ActiveMemberCard({ name, sales, override, avatarSeed }: any) {
    return (
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex justify-between items-center">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded-full overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeed}`} alt={name} className="w-full h-full object-cover" />
                </div>
                <div>
                    <h3 className="font-bold text-slate-800 text-sm">{name} (ลูกทีม)</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Sales: {sales}</p>
                </div>
            </div>
            <div className="text-right">
                <p className="font-bold text-[#10b981] text-sm">{override}</p>
                <p className="text-[10px] text-gray-400 font-medium">Override</p>
            </div>
        </div>
    );
}
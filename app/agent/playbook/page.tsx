"use client";

import { Bell, ChevronRight } from 'lucide-react';
import AgentBottomNav from '@/app/components/AgentBottomNav';

export default function AgentPlaybook() {
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
      <div className="px-6 pt-6 pb-2">
        <h1 className="text-xl font-extrabold text-slate-800 mb-1">Knowledge Base</h1>
        <p className="text-sm text-gray-500 font-medium">Learn and grow</p>
      </div>

      {/* --- Menu List --- */}
      <div className="px-6 mt-4 space-y-4">
        
        {/* Card 1 */}
        <KnowledgeItem 
            emoji="👋"
            bg="bg-green-50"
            title="5 Steps to Close"
            subtitle="ปิดการขายแบบมือโปร"
        />

        {/* Card 2 */}
        <KnowledgeItem 
            emoji="🔒"
            bg="bg-blue-50"
            title="วิธีล็อกห้อง (Lock Unit)"
            subtitle="ขั้นตอนการจองสิทธิ์"
        />

        {/* Card 3 */}
        <KnowledgeItem 
            emoji="📋"
            bg="bg-yellow-50"
            title="Viewing Checklist"
            subtitle="เตรียมตัวก่อนพาลูกค้าดู"
        />

        {/* Card 4 */}
        <KnowledgeItem 
            emoji="💬"
            bg="bg-purple-50"
            title="Objection Handling"
            subtitle="ตอบคำถามเมื่อลูกค้าลังเล"
        />

        {/* Card 5 */}
        <KnowledgeItem 
            emoji="💡"
            bg="bg-orange-50"
            title="Top Agent Tips"
            subtitle="เคล็ดลับจากรุ่นพี่"
        />

      </div>

      {/* ✅ แถบเมนูด้านล่างส่วนกลาง */}
      <AgentBottomNav />

    </div>
  );
}

// --- Component ย่อย: รายการความรู้ ---
function KnowledgeItem({ emoji, bg, title, subtitle }: any) {
    return (
        <button className="w-full bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition active:scale-95 group">
            <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center text-2xl`}>
                    {emoji}
                </div>
                <div className="text-left">
                    <h3 className="font-bold text-slate-800 text-sm mb-0.5">{title}</h3>
                    <p className="text-[11px] text-gray-400 font-medium">{subtitle}</p>
                </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-500 transition" />
        </button>
    )
}
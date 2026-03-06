"use client";

import { useState } from 'react';
import { 
  Bell, 
  Save, 
  User, 
  Phone, 
  CheckCircle2, 
  Trash2,
  History
} from 'lucide-react';
import AgentBottomNav from '@/app/components/AgentBottomNav';

export default function AgentDeals() {
  // State สำหรับสลับ Tab ระหว่าง "บันทึกไว้" และ "ประวัติ"
  const [activeTab, setActiveTab] = useState("saved");

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
        <h1 className="text-xl font-bold text-slate-800">รายการที่บันทึกไว้ (Saved Items)</h1>
      </div>

      {/* --- Tabs --- */}
      <div className="px-6 mb-6">
        <div className="bg-gray-100 p-1 rounded-xl flex text-sm font-bold">
            <button
                onClick={() => setActiveTab("saved")}
                className={`flex-1 py-2.5 rounded-lg transition-all ${
                    activeTab === "saved" 
                    ? "bg-[#dc2626] text-white shadow-sm" 
                    : "text-gray-500 hover:text-gray-700"
                }`}
            >
                บันทึกไว้ (1)
            </button>
            <button
                onClick={() => setActiveTab("history")}
                className={`flex-1 py-2.5 rounded-lg transition-all ${
                    activeTab === "history" 
                    ? "bg-[#dc2626] text-white shadow-sm" 
                    : "text-gray-500 hover:text-gray-700"
                }`}
            >
                ประวัติ (1)
            </button>
        </div>
      </div>

      {/* --- Content Area --- */}
      <div className="px-6">
        {activeTab === "saved" ? (
            // แท็บ: บันทึกไว้
            <div className="space-y-4">
                <DealCard 
                    title="Lumpini Park Riverside"
                    commission="฿63,000"
                    customerName="คุณสมศรี"
                    customerPhone="081-234-xxxx"
                    status="saved"
                />
            </div>
        ) : (
            // แท็บ: ประวัติ (ใส่ข้อมูลจำลองไว้ให้ดูเป็นตัวอย่างครับ)
            <div className="space-y-4">
                 <DealCard 
                    title="The Line Jatujak"
                    commission="฿35,000"
                    customerName="คุณสมชาย"
                    customerPhone="089-999-xxxx"
                    status="sold"
                />
            </div>
        )}
      </div>

      {/* ✅ แถบเมนูด้านล่าง */}
      <AgentBottomNav />

    </div>
  );
}

// --- Component ย่อย: การ์ดแสดงดีล (ใช้ซ้ำได้) ---
function DealCard({ title, commission, customerName, customerPhone, status }: any) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden p-4 pl-5">
            {/* เส้นสีแดงตกแต่งด้านซ้าย */}
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#dc2626]"></div>

            {/* ป้าย Tag (Badge) */}
            {status === "saved" ? (
                <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-600 text-[10px] rounded-md font-bold mb-3">
                    <Save className="w-3 h-3" /> บันทึกไว้
                </div>
            ) : (
                <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-50 text-green-600 text-[10px] rounded-md font-bold mb-3">
                    <History className="w-3 h-3" /> ปิดการขายแล้ว
                </div>
            )}

            {/* หัวข้อและคอมมิชชัน */}
            <h2 className="text-lg font-bold text-slate-800 leading-tight mb-1">{title}</h2>
            <div className="text-sm text-gray-500 font-medium flex items-center gap-1 mb-4">
                คอมมิชชัน: <span className="text-[#dc2626] font-bold">{commission}</span>
            </div>

            {/* กล่องข้อมูลลูกค้า */}
            <div className="bg-gray-50 p-3 rounded-xl space-y-2 mb-4">
                <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2 text-gray-500">
                        <User className="w-4 h-4" /> ลูกค้า
                    </div>
                    <span className="font-bold text-slate-700">{customerName}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2 text-gray-500">
                        <Phone className="w-4 h-4" /> เบอร์โทร
                    </div>
                    <span className="font-bold text-[#dc2626]">{customerPhone}</span>
                </div>
            </div>

            {/* ปุ่ม Actions */}
            {status === "saved" && (
                <div className="flex gap-2">
                    <button className="flex-1 bg-[#10b981] hover:bg-[#059669] text-white py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition active:scale-95">
                        <CheckCircle2 className="w-5 h-5" /> ปิดการขาย (Sold)
                    </button>
                    <button className="p-2.5 bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-red-500 rounded-xl transition active:scale-95 border border-gray-100">
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div>
    )
}
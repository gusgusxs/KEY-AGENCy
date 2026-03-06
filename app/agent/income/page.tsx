"use client";

import { Bell, DollarSign } from 'lucide-react';
import AgentBottomNav from '@/app/components/AgentBottomNav';

export default function AgentIncome() {
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
        <h1 className="text-2xl font-bold text-slate-800 mb-1">Earnings</h1>
        <p className="text-sm text-gray-500">Financial history & payouts</p>
      </div>

      {/* --- Total Earnings Card --- */}
      <div className="px-6 mb-8">
        <div className="bg-[#1e293b] rounded-3xl p-6 shadow-md text-white relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>

            <p className="text-white/70 text-sm font-medium mb-1 relative z-10">Total Earnings</p>
            <h2 className="text-4xl font-extrabold mb-5 relative z-10">฿458,500</h2>
            
            <button className="bg-white/10 hover:bg-white/20 text-white text-sm font-bold py-2.5 px-5 rounded-xl transition active:scale-95 relative z-10">
                Request Payout
            </button>
        </div>
      </div>

      {/* --- Recent Payouts Section --- */}
      <div className="px-6 mb-6">
        <h3 className="text-xs font-bold tracking-widest text-slate-800 uppercase mb-4">
            Recent Payouts
        </h3>

        <div className="space-y-4">
            {/* Transaction 1 (Paid) */}
            <PayoutCard 
                iconBg="bg-green-100"
                iconColor="text-[#10b981]"
                date="1-7 Feb"
                transactions="15 transactions"
                amount="฿450,000"
                status="Paid"
                statusColor="text-[#10b981]"
            />

            {/* Transaction 2 (Processing) */}
            <PayoutCard 
                iconBg="bg-yellow-100"
                iconColor="text-yellow-600"
                date="8-14 Feb"
                transactions="12 transactions"
                amount="฿320,000"
                status="Processing"
                statusColor="text-orange-500"
            />
        </div>
      </div>

      {/* ✅ แถบเมนูด้านล่าง (ส่วนกลาง) */}
      <AgentBottomNav />

    </div>
  );
}

// --- Component ย่อย: การ์ดประวัติการโอนเงิน ---
function PayoutCard({ iconBg, iconColor, date, transactions, amount, status, statusColor }: any) {
    return (
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${iconBg} rounded-full flex items-center justify-center`}>
                    <DollarSign className={`w-6 h-6 ${iconColor}`} />
                </div>
                <div>
                    <h4 className="font-bold text-slate-800 text-base">{date}</h4>
                    <p className="text-xs text-gray-500">{transactions}</p>
                </div>
            </div>
            <div className="text-right">
                <p className="font-bold text-slate-800 text-base mb-0.5">{amount}</p>
                <p className={`text-[10px] font-bold ${statusColor}`}>{status}</p>
            </div>
        </div>
    );
}
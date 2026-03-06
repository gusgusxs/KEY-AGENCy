"use client";

import { useState } from 'react';
import Link from 'next/link';
import {
    Bell,
    Search,
    Filter,
    Heart,
    EyeOff,
    BedDouble,
    Ruler,
    MapPin,
    FileText,
    ClipboardCheck
} from 'lucide-react';
import AgentBottomNav from '@/app/components/AgentBottomNav';

export default function AgentUnits() {
    const [activeTab, setActiveTab] = useState("ทั้งหมด");

    return (
        <div className="min-h-screen bg-gray-50 pb-24 font-sans text-slate-800 w-full">

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

            {/* --- Search & Filter Section --- */}
            <div className="bg-white px-4 md:px-8 pb-4 rounded-b-3xl shadow-sm mb-6">
                <div className="flex gap-2 mb-4 mt-2">
                    <div className="relative flex-1 max-w-2xl">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="ค้นหาทำเล, โครงการ..."
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-red-500 placeholder:text-gray-400"
                        />
                    </div>
                    <button className="p-3 bg-white border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 active:scale-95 transition">
                        <Filter className="w-5 h-5" />
                    </button>
                </div>

                {/* Filter Tabs */}
                <div className="bg-gray-100 p-1 rounded-xl flex text-sm font-bold max-w-md">
                    {["ทั้งหมด", "เช่า", "ขาย"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-2 rounded-lg transition-all ${activeTab === tab
                                ? "bg-white text-slate-800 shadow-sm"
                                : "text-gray-400 hover:text-gray-600"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* --- Results List --- */}
            <div className="px-4 md:px-8">
                <p className="text-sm text-gray-500 mb-4 font-medium px-1">พบ 2 ประกาศ</p>

                {/* ✅ เปลี่ยนเป็น Grid เพื่อให้การ์ดเรียงตัวสวยงามเมื่อจอใหญ่ขึ้น */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

                    {/* Card 1: ขาย */}
                    <UnitCard
                        image="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600"
                        tagType="ขาย"
                        tagStatus="ว่าง"
                        title="Lumpini Park Riverside"
                        location="บางซื่อ, กรุงเทพมหานคร"
                        price="฿3.00M"
                        size="30 ตร.ม."
                        bed="1 นอน"
                    />

                    {/* Card 2: เช่า */}
                    <UnitCard
                        image="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=600"
                        tagType="ให้เช่า"
                        tagStatus="ว่าง"
                        title="Noble Ploenchit"
                        location="ปทุมวัน, กรุงเทพมหานคร"
                        price="฿35,000/ด"
                        size="45 ตร.ม."
                        bed="1 นอน"
                    />

                </div>
                <div className="h-20"></div>
            </div>

            {/* --- Bottom Navigation --- */}
            <AgentBottomNav />
            
        </div>
    );
}

// --- Component ย่อย: การ์ดห้อง ---
function UnitCard({ image, tagType, tagStatus, title, location, price, size, bed }: any) {
    const typeColor = tagType === 'ขาย' ? 'bg-slate-600' : 'bg-[#5c4d3c]';

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition flex flex-col h-full">
            
            {/* Image Section */}
            <Link href="/agent/units/0001" className="relative h-56 w-full block group cursor-pointer overflow-hidden shrink-0">
                <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                
                {/* Badges Top Left */}
                <div className="absolute top-3 left-3 flex gap-2">
                    <span className={`${typeColor} text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-sm`}>
                        {tagType}
                    </span>
                    <span className="bg-[#22c55e] text-white text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1 shadow-sm">
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        {tagStatus}
                    </span>
                </div>

                {/* Icons Top Right */}
                <div className="absolute top-3 right-3 flex gap-2">
                    <button className="bg-white/90 backdrop-blur-sm p-1.5 rounded-full text-gray-500 hover:text-red-500 transition shadow-sm active:scale-95">
                        <Heart className="w-4 h-4" />
                    </button>
                    <button className="bg-white/90 backdrop-blur-sm p-1.5 rounded-full text-gray-500 hover:text-slate-900 transition shadow-sm active:scale-95">
                        <EyeOff className="w-4 h-4" />
                    </button>
                </div>
            </Link>

            {/* Content Section */}
            <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-1.5">
                    <h3 className="font-bold text-slate-800 text-lg leading-tight line-clamp-1">{title}</h3>
                    <span className="font-extrabold text-[#dc2626] text-lg shrink-0 pl-2">{price}</span>
                </div>

                <p className="text-gray-500 text-xs flex items-center gap-1 mb-4">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" /> {location}
                </p>

                {/* Specs */}
                <div className="flex gap-2 text-xs font-bold text-gray-600 mb-5 border-t border-gray-50 pt-4">
                    <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg">
                        <Ruler className="w-4 h-4 text-slate-500" /> {size}
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg">
                        <BedDouble className="w-4 h-4 text-slate-500" /> {bed}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-auto">
                    <Link
                        href="/agent/units/0001"
                        className="flex-1 h-[42px] rounded-xl border border-gray-200 flex items-center justify-center gap-1.5 text-slate-600 hover:bg-gray-50 hover:border-gray-300 transition active:scale-95 font-bold text-sm"
                    >
                        <FileText className="w-4 h-4 stroke-[2.5]" />
                        <span>ดูรายละเอียด</span>
                    </Link>

                    <Link
                        href="/agent/deals"
                        className="flex-1 h-[42px] bg-[#dc2626] text-white rounded-xl font-bold flex items-center justify-center gap-1.5 hover:bg-red-700 shadow-sm shadow-red-100 transition active:scale-95 text-sm"
                    >
                        <ClipboardCheck className="w-4 h-4 stroke-[2.5]" />
                        <span>บันทึกดีล</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
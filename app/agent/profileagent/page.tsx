"use client";

import { useState, useRef } from 'react';
import Link from 'next/link';
import {
    Edit, Camera, User, Smartphone, Mail, Shield,
    Lock, LogOut, FileText, CheckCircle,
    LayoutGrid, Building2, Search, ClipboardList
} from 'lucide-react';
import AgentBottomNav from '@/app/components/AgentBottomNav';

export default function AgentProfile() {
    // --- State ---
    const [phoneVerified, setPhoneVerified] = useState(false);
    const avatarInputRef = useRef<HTMLInputElement>(null);
    const docInputRef = useRef<HTMLInputElement>(null);

    // --- Actions ---
    const handleEditProfile = () => alert("✏️ เปิดโหมดแก้ไขข้อมูลส่วนตัว");
    const handleAvatarClick = () => avatarInputRef.current?.click();
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
        if (e.target.files && e.target.files[0]) {
            alert(`✅ เลือกไฟล์ ${type} สำเร็จ: ${e.target.files[0].name}`);
        }
    };
    const handleVerifyPhone = () => {
        if (!phoneVerified && window.confirm("ส่งรหัส OTP เพื่อยืนยันเบอร์?")) {
            alert("📲 ส่ง OTP แล้ว");
            setPhoneVerified(true);
        }
    };
    const handleSubmitKYC = () => alert("📝 ส่งเอกสารแล้ว รอตรวจสอบ 24 ชม.");
    const handleChangePassword = () => alert("🔒 เปลี่ยนรหัสผ่านสำเร็จ");
    const handleLogout = () => {
        if (window.confirm("ต้องการออกจากระบบ?")) alert("👋 ออกจากระบบเรียบร้อย");
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24 font-sans text-slate-800">

            {/* Hidden Inputs */}
            <input type="file" ref={avatarInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, "โปรไฟล์")} />
            <input type="file" ref={docInputRef} className="hidden" accept="image/*,application/pdf" onChange={(e) => handleFileChange(e, "เอกสาร")} />

            {/* --- Header & Profile Card --- */}
            <div className="relative">
                <div className="h-40 bg-[#dc2626] rounded-b-[2.5rem] relative"> {/* สีแดง Agent */}
                    <div className="absolute top-6 right-6">
                        <button onClick={handleEditProfile} className="bg-white/20 p-2 rounded-full text-white backdrop-blur-sm hover:bg-white/30 transition">
                            <Edit className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="mx-4 -mt-20 bg-white rounded-2xl shadow-sm p-6 flex flex-col items-center relative z-10">
                    <div className="relative mb-3 cursor-pointer" onClick={handleAvatarClick}>
                        <div className="w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden bg-gray-200">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jane" alt="Profile" className="w-full h-full object-cover" />
                        </div>
                        <button className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow border border-gray-100 text-gray-500 hover:text-[#dc2626]">
                            <Camera className="w-4 h-4" />
                        </button>
                    </div>

                    <h1 className="text-xl font-bold text-slate-800 mb-2">คุณสมชาย ใจดี</h1>

                    <div className="flex gap-2">
                        <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs font-bold rounded-full border border-gray-200">
                            Agent
                        </span>
                        <span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-full border border-green-100 flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" /> ยืนยันแล้ว
                        </span>
                    </div>
                </div>
            </div>

            {/* --- Content Sections --- */}
            <div className="px-4 mt-4 space-y-4">

                {/* 1. เกี่ยวกับฉัน */}
                <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-sm font-bold text-[#dc2626] flex items-center gap-2">
                            <User className="w-4 h-4" /> เกี่ยวกับฉัน
                        </h2>
                        <button onClick={handleEditProfile} className="text-xs text-gray-400 hover:text-[#dc2626]">แก้ไข</button>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        นายหน้ามืออาชีพ เชี่ยวชาญพื้นที่สุขุมวิท-ทองหล่อ พร้อมดูแลทั้งซื้อ-ขาย-เช่า
                    </p>
                </section>

                {/* 2. ช่องทางติดต่อ */}
                <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-sm font-bold text-[#dc2626] flex items-center gap-2 mb-4">
                        <Smartphone className="w-4 h-4" /> ช่องทางติดต่อ
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 pb-3 border-b border-gray-50">
                            <div className="w-10 h-10 bg-[#C4EBC6] rounded-full flex items-center justify-center text-[#06C755] font-bold text-lg">L</div>
                            <div>
                                <p className="text-xs text-gray-400">LINE ID</p>
                                <p className="font-medium text-slate-700">@somchai_agent</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center text-white">
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">WhatsApp</p>
                                <p className="font-medium text-slate-700">+66812345678</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. ยืนยันตัวตน (KYC) */}
                <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-sm font-bold text-[#dc2626] flex items-center gap-2 mb-4">
                        <Shield className="w-4 h-4" /> ยืนยันตัวตน (KYC)
                    </h2>

                    {/* Email */}
                    <div className="mb-4">
                        <div className="flex justify-between items-start mb-1">
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-gray-400" />
                                <div>
                                    <p className="text-sm font-medium">อีเมล</p>
                                    <p className="text-xs text-gray-500">somchai@gmail.com</p>
                                </div>
                            </div>
                            <span className="text-[10px] bg-green-50 text-green-600 px-2 py-1 rounded-md font-bold flex items-center gap-1 border border-green-100">
                                <CheckCircle className="w-3 h-3" /> ยืนยันแล้ว
                            </span>
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="mb-6 pb-6 border-b border-gray-100">
                        <div className="flex justify-between items-center mb-1">
                            <div className="flex items-center gap-2">
                                <Smartphone className="w-4 h-4 text-gray-400" />
                                <div>
                                    <p className="text-sm font-medium">เบอร์โทรศัพท์</p>
                                    <p className="text-xs text-gray-500">081-234-5678</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {phoneVerified ? (
                                    <span className="text-[10px] bg-green-50 text-green-600 px-2 py-1 rounded-md font-bold flex items-center gap-1 border border-green-100">
                                        <CheckCircle className="w-3 h-3" /> ยืนยันแล้ว
                                    </span>
                                ) : (
                                    <>
                                        <span className="text-[10px] text-red-500 font-bold">ยังไม่ยืนยัน</span>
                                        <button onClick={handleVerifyPhone} className="text-[10px] bg-[#dc2626] text-white px-2 py-1 rounded-md font-bold hover:bg-[#b91c1c]">ยืนยันเบอร์</button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* KYC Form */}
                    <div className="space-y-3">
                        <p className="text-sm font-bold text-gray-700">เอกสารยืนยันตัวตน</p>
                        <select className="w-full p-2.5 text-sm bg-white border border-gray-200 rounded-xl outline-none focus:border-red-500">
                            <option>บัตรประจำตัวนายหน้า (ถ้ามี)</option>
                            <option>บัตรประจำตัวประชาชน</option>
                        </select>
                        <input type="text" placeholder="ระบุเลขที่เอกสาร" className="w-full p-2.5 text-sm bg-white border border-gray-200 rounded-xl outline-none focus:border-red-500 placeholder:text-gray-300" />

                        <div onClick={() => docInputRef.current?.click()} className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 cursor-pointer transition">
                            <FileText className="w-8 h-8 mb-2 text-gray-300" />
                            <span className="text-xs">อัปโหลดรูปถ่ายเอกสาร</span>
                        </div>

                        <button onClick={handleSubmitKYC} className="w-full bg-[#1e293b] text-white py-3 rounded-xl text-sm font-bold hover:bg-black transition">
                            ส่งตรวจสอบ
                        </button>
                    </div>
                </section>

                {/* 4. เปลี่ยนรหัสผ่าน */}
                <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-sm font-bold text-[#dc2626] flex items-center gap-2 mb-4">
                        <Lock className="w-4 h-4" /> เปลี่ยนรหัสผ่าน
                    </h2>
                    <div className="space-y-3">
                        <input type="password" placeholder="รหัสผ่านใหม่" className="w-full p-2.5 text-sm bg-white border border-gray-200 rounded-xl outline-none focus:border-red-500 placeholder:text-gray-300" />
                        <input type="password" placeholder="ยืนยันรหัสผ่านใหม่" className="w-full p-2.5 text-sm bg-white border border-gray-200 rounded-xl outline-none focus:border-red-500 placeholder:text-gray-300" />
                        <button onClick={handleChangePassword} className="w-full border border-[#dc2626] text-[#dc2626] py-2.5 rounded-xl text-sm font-bold hover:bg-red-50 transition">
                            เปลี่ยนรหัสผ่าน
                        </button>
                    </div>
                </section>

                {/* Logout Button */}
                <Link
                    href="/"
                    className="w-full bg-white border border-red-100 text-[#dc2626] py-3.5 rounded-2xl text-sm font-bold hover:bg-red-50 transition flex items-center justify-center gap-2 shadow-sm"
                >
                    <LogOut className="w-4 h-4" /> ออกจากระบบ
                </Link>

            </div>

            {/* --- Bottom Navigation (Agent Style) --- */}
            <div className="fixed bottom-0 w-full bg-white border-t border-gray-100 px-4 py-3 pb-5 flex justify-between items-end text-[10px] font-medium z-30 text-gray-400">

                <Link href="/agent/dashboard" className="flex flex-col items-center gap-1 hover:text-[#dc2626] transition min-w-[50px]">
                    <LayoutGrid className="w-6 h-6" />
                    <span>หน้าหลัก</span>
                </Link>
                <Link href="/agent/units" className="flex flex-col items-center gap-1 hover:text-[#dc2626] transition min-w-[50px]">
                    <Building2 className="w-6 h-6" />
                    <span>Units</span>
                </Link>
                <button className="flex flex-col items-center gap-1 hover:text-[#dc2626] transition min-w-[50px]">
                    <div className="bg-gray-50 p-1.5 rounded-full -mt-2 mb-0.5">
                        <Search className="w-6 h-6" strokeWidth={2.5} />
                    </div>
                    <span>สำรวจ</span>
                </button>
                <button className="flex flex-col items-center gap-1 hover:text-[#dc2626] transition min-w-[50px] relative">
                    <div className="relative">
                        <ClipboardList className="w-6 h-6" />
                        <span className="absolute -top-1 -right-1 bg-[#dc2626] text-white text-[8px] w-3.5 h-3.5 flex items-center justify-center rounded-full border border-white">1</span>
                    </div>
                    <span>ดีล</span>
                </button>

                {/* Active Profile */}
                <Link href="/agent/profileagent" className="flex flex-col items-center gap-1 text-[#dc2626] min-w-[50px]">
                    <User className="w-6 h-6" />
                    <span>โปรไฟล์</span>
                </Link>

            </div>
            <AgentBottomNav />
        </div>
    );
}
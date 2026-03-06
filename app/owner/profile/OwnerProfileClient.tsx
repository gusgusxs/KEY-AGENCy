"use client";

import { useState, useRef, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react'; 
import {
    Edit, Camera, User, Smartphone, Mail, Shield,
    Lock, LogOut, FileText, CheckCircle
} from 'lucide-react';
import OwnerBottomNav from '@/app/components/OwnerBottomNav';

import {
    toggleHideListingsAction,
    updateAvatar,
    submitKYCDocument
} from '@/lib/actions/user-actions';

// ✅ เอาคอมเมนต์ออก เพื่อใช้งานฟังก์ชันส่งอีเมลจริง
import { sendVerificationEmail } from '@/lib/actions/email-actions'; 

export default function OwnerProfileClient({ user }: { user: any }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [isEmailSending, setIsEmailSending] = useState(false);

    const [hideListings, setHideListings] = useState(user?.hideListings || false);

    const avatarInputRef = useRef<HTMLInputElement>(null);
    const docInputRef = useRef<HTMLInputElement>(null);

    // --- Action Handlers ---
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        startTransition(async () => {
            const formData = new FormData();
            formData.append("avatar", file);

            const result = await updateAvatar(formData);
            if (result.success) alert("อัปเดตรูปโปรไฟล์สำเร็จ");
            else alert(result.error || "เกิดข้อผิดพลาดในการอัปเดตรูปภาพ");
        });
    };

    const handleKYCUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        startTransition(async () => {
            const formData = new FormData();
            formData.append("document", file);

            const result = await submitKYCDocument(formData);
            if (result.success) alert("ส่งเอกสารเรียบร้อย กรุณารอเจ้าหน้าที่ตรวจสอบ");
            else alert(result.error || "เกิดข้อผิดพลาดในการอัปโหลดเอกสาร");
        });
    };

    const handleToggleHideListings = () => {
        const newValue = !hideListings;
        setHideListings(newValue);
        startTransition(async () => {
            await toggleHideListingsAction(newValue);
        });
    };

    // ✅ ฟังก์ชันสำหรับกดยืนยันอีเมล (ใช้งานจริงแล้ว!)
    const handleVerifyEmail = async () => {
        if (!user?.email) {
            alert("กรุณาเพิ่มอีเมลในหน้าแก้ไขข้อมูลส่วนตัวก่อน");
            return;
        }

        setIsEmailSending(true);
        try {
            // เรียกใช้ฟังก์ชันส่งอีเมลจากหลังบ้าน
            const result = await sendVerificationEmail(user.email);
            
            if (result.success) {
                alert("ส่งลิงก์ยืนยันไปที่อีเมลของคุณแล้ว กรุณาตรวจสอบกล่องข้อความ (หากไม่พบให้ดูในโฟลเดอร์จดหมายขยะครับ)");
            } else {
                alert(result.error || "เกิดข้อผิดพลาดในการส่งอีเมล");
            }
        } catch (error) {
            alert("ไม่สามารถติดต่อเซิร์ฟเวอร์เพื่อส่งอีเมลได้ กรุณาลองใหม่");
        } finally {
            setIsEmailSending(false);
        }
    };

    const handleLogout = async () => {
        const confirm = window.confirm("คุณต้องการออกจากระบบใช่หรือไม่?");
        if (confirm) await signOut({ callbackUrl: '/login' });
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24 font-sans text-slate-800">

            <input type="file" ref={avatarInputRef} className="hidden" accept="image/*" onChange={handleAvatarChange} />
            <input type="file" ref={docInputRef} className="hidden" accept="image/*,application/pdf" onChange={handleKYCUpload} />

            {/* --- Header & Profile Card --- */}
            <div className="relative">
                <div className="h-40 bg-[#a51c24] rounded-b-[2.5rem] relative">
                    <div className="absolute top-6 right-6">
                        <Link href="/owner/profile/edit" className="bg-white/20 p-2 rounded-full text-white backdrop-blur-sm hover:bg-white/30 transition active:scale-95 block">
                            <Edit className="w-5 h-5" />
                        </Link>
                    </div>
                </div>

                <div className="mx-4 -mt-20 bg-white rounded-2xl shadow-sm p-6 flex flex-col items-center relative z-10">
                    <div className="relative mb-3 group cursor-pointer" onClick={() => !isPending && avatarInputRef.current?.click()}>
                        <div className="w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden bg-gray-100 flex items-center justify-center">
                            {user?.image ? (
                                <img src={user.image} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <User className="w-12 h-12 text-gray-400" />
                            )}
                        </div>
                        <button className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow border border-gray-100 text-gray-500 group-hover:text-[#a51c24] transition">
                            <Camera className="w-4 h-4" />
                        </button>
                    </div>

                    <h1 className="text-xl font-bold text-slate-800 mb-2">{user?.name || 'ไม่ได้ระบุชื่อ'}</h1>

                    <div className="flex gap-2">
                        <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs font-bold rounded-full border border-gray-200 uppercase tracking-wide">
                            {user?.role === "AGENT" ? "Agent" : "Owner"}
                        </span>
                        {user?.kycStatus === "VERIFIED" && (
                            <span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-full border border-green-100 flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" /> ยืนยันแล้ว
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* --- Content Sections --- */}
            <div className="px-4 mt-4 space-y-4">

                {/* 1. เกี่ยวกับฉัน */}
                <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-sm font-bold text-[#a51c24] flex items-center gap-2">
                            <User className="w-4 h-4" /> เกี่ยวกับฉัน
                        </h2>
                        <Link href="/owner/profile/edit" className="text-xs text-gray-400 hover:text-[#a51c24]">แก้ไข</Link>
                    </div>
                    <p className={`text-sm leading-relaxed ${user?.bio ? 'text-gray-600' : 'text-gray-400 italic'}`}>
                        {user?.bio || 'ยังไม่มีข้อมูลแนะนำตัว (เพิ่มข้อมูลส่วนตัวได้ที่ปุ่มแก้ไข)'}
                    </p>
                </section>

                {/* 2. ช่องทางติดต่อ */}
                <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-sm font-bold text-[#a51c24] flex items-center gap-2 mb-4">
                        <Smartphone className="w-4 h-4" /> ช่องทางติดต่อ
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 pb-3 border-b border-gray-50">
                            <div className="w-10 h-10 bg-[#C4EBC6] rounded-full flex items-center justify-center text-[#06C755] font-bold text-lg">L</div>
                            <div>
                                <p className="text-xs text-gray-400">LINE ID</p>
                                <p className={`font-medium ${user?.lineId ? 'text-slate-700' : 'text-gray-400 italic text-xs mt-0.5'}`}>
                                    {user?.lineId || 'ยังไม่ได้ระบุ'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center text-white font-bold text-lg">W</div>
                            <div>
                                <p className="text-xs text-gray-400">WhatsApp</p>
                                <p className={`font-medium ${user?.whatsapp ? 'text-slate-700' : 'text-gray-400 italic text-xs mt-0.5'}`}>
                                    {user?.whatsapp || 'ยังไม่ได้ระบุ'}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. ยืนยันตัวตน (KYC) & อีเมล */}
                <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-sm font-bold text-[#a51c24] flex items-center gap-2 mb-4">
                        <Shield className="w-4 h-4" /> ยืนยันตัวตน (KYC)
                    </h2>

                    {/* ✅ ส่วนจัดการอีเมล */}
                    <div className="mb-4 pb-4 border-b border-gray-100">
                        <div className="flex justify-between items-center mb-1">
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-gray-400" />
                                <div>
                                    <p className="text-sm font-medium">อีเมล</p>
                                    <p className={`text-xs ${user?.email ? 'text-gray-500' : 'text-gray-400 italic'}`}>
                                        {user?.email || 'ยังไม่ได้ระบุอีเมล'}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                                {/* เช็คจากฐานข้อมูลว่า emailVerified มีค่าหรือไม่ */}
                                {user?.emailVerified ? (
                                    <span className="text-[10px] bg-green-50 text-green-600 px-2 py-1 rounded-md font-bold flex items-center gap-1 border border-green-100">
                                        <CheckCircle className="w-3 h-3" /> ยืนยันแล้ว
                                    </span>
                                ) : (
                                    <>
                                        <span className="text-[10px] text-red-500 font-bold">ยังไม่ยืนยัน</span>
                                        <button 
                                            onClick={handleVerifyEmail} 
                                            disabled={isEmailSending || !user?.email} 
                                            className="text-[10px] bg-[#dc2626] text-white px-2 py-1 rounded-md font-bold hover:bg-[#b91c1c] active:scale-95 transition disabled:opacity-50"
                                        >
                                            {isEmailSending ? 'รอ...' : 'ส่งลิงก์ยืนยัน'}
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* เบอร์โทรศัพท์ (เอาปุ่มยืนยัน OTP ออกไปแล้ว โชว์แค่เบอร์เฉยๆ) */}
                    <div className="mb-6 pb-6 border-b border-gray-100">
                        <div className="flex justify-between items-center mb-1">
                            <div className="flex items-center gap-2">
                                <Smartphone className="w-4 h-4 text-gray-400" />
                                <div>
                                    <p className="text-sm font-medium">เบอร์โทรศัพท์</p>
                                    <p className={`text-xs ${user?.phone ? 'text-gray-500' : 'text-red-400 font-medium'}`}>
                                        {user?.phone || 'ยังไม่ได้ระบุเบอร์โทร'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {user?.kycStatus !== "VERIFIED" && (
                        <div className="space-y-3">
                            <p className="text-sm font-bold text-gray-700">เอกสารยืนยันตัวตน</p>

                            {user?.kycStatus === "PENDING" ? (
                                <div className="border-2 border-dashed border-orange-200 bg-orange-50 rounded-xl p-6 flex flex-col items-center justify-center text-orange-600">
                                    <FileText className="w-8 h-8 mb-2 opacity-80" />
                                    <span className="text-xs font-bold">กำลังรอเจ้าหน้าที่ตรวจสอบเอกสาร</span>
                                    <span className="text-[10px] opacity-70 mt-1">ใช้เวลาประมาณ 1-2 วันทำการ</span>
                                </div>
                            ) : (
                                <div onClick={() => !isPending && docInputRef.current?.click()} className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 hover:border-red-200 cursor-pointer transition">
                                    <FileText className="w-8 h-8 mb-2 text-gray-300" />
                                    <span className="text-xs">{isPending ? "กำลังอัปโหลด..." : "แตะเพื่ออัปโหลดรูปถ่ายบัตรประชาชน/พาสปอร์ต"}</span>
                                </div>
                            )}
                        </div>
                    )}
                </section>

                {/* 4. Settings */}
                <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
                    <div className="flex justify-between items-center cursor-pointer" onClick={handleToggleHideListings}>
                        <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                            <EyeOffIcon /> ซ่อนหน้าประกาศทั้งหมด
                        </div>
                        <div className={`w-11 h-6 rounded-full relative transition-colors duration-200 ${hideListings ? 'bg-[#a51c24]' : 'bg-gray-200'}`}>
                            <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-sm transition-transform duration-200 ${hideListings ? 'translate-x-5' : 'translate-x-0.5'}`}></div>
                        </div>
                    </div>
                </section>
                
                {/* Logout Button */}
                <button onClick={handleLogout} className="w-full bg-white border border-red-100 text-[#dc2626] py-3.5 rounded-2xl text-sm font-bold hover:bg-red-50 transition flex items-center justify-center gap-2 shadow-sm">
                    <LogOut className="w-4 h-4" /> ออกจากระบบ
                </button>

            </div>

            <OwnerBottomNav />

        </div>
    );
}

function EyeOffIcon() {
    return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
        </svg>
    )
}
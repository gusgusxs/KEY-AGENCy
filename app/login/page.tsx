"use client";

import { signIn } from "next-auth/react";
import { Home, User, ChevronRight, CheckCircle2, Search, Briefcase } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {

  const handleLogin = (role: "USER" | "AGENT" | "OWNER") => {
    // กำหนดปลายทางตามบทบาท
    let callbackUrl = "/";
    if (role === "AGENT") callbackUrl = "/agent/dashboard";
    if (role === "OWNER") callbackUrl = "/owner/dashboard";
    if (role === "USER") callbackUrl = "/"; // ผู้เช่าให้ไปหน้าหลักเพื่อค้นหาทรัพย์

    signIn("line", { callbackUrl });
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-[#a51c24] -skew-y-6 -translate-y-24 z-0" />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-10 text-white">
          {/* Container ของ Logo ที่โค้งมนและมีเงา */}
          <div className="inline-flex bg-white p-4 rounded-[2rem] shadow-2xl mb-6 items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-14 h-14" xmlns="http://www.w3.org/2000/svg">
              {/* โครงบ้านและปล่องไฟ */}
              <path
                d="M20 48 L50 25 L80 48 M70 40 V30 H76 V45"
                fill="none"
                stroke="#b12a27"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M25 48 V75 H75 V48"
                fill="none"
                stroke="#b12a27"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* รูพุญแจตรงกลาง */}
              <circle cx="50" cy="56" r="8" fill="#b12a27" />
              <path
                d="M44 58 L38 75 H62 L56 58 Z"
                fill="#b12a27"
              />
            </svg>
          </div>

          {/* ส่วนข้อความชื่อแบรนด์ */}
          <div className="space-y-0">
            <h1 className="text-4xl font-black tracking-tighter text-white leading-none">
              KEY <span className="block text-2xl font-bold opacity-90 tracking-widest mt-1">PLATFORM</span>
            </h1>
            <p className="opacity-70 text-sm mt-4 font-light tracking-wide">
              เข้าสู่ระบบเพื่อรับประสบการณ์ที่เหนือกว่า
            </p>
          </div>
        </div>

        {/* 2. User Role Cards */}
        <div className="grid gap-4">

          {/* Card: Tenant (ผู้เช่า) */}
          <button
            onClick={() => handleLogin("USER")}
            className="group relative bg-white border-2 border-transparent hover:border-[#a51c24] p-5 rounded-2xl shadow-lg transition-all duration-300 hover:-translate-y-1 text-left overflow-hidden"
          >
            <div className="flex items-center gap-4">
              <div className="bg-blue-50 p-3 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Search size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 leading-tight">ฉันต้องการเช่า / ซื้อ</h3>
                <p className="text-gray-500 text-xs mt-0.5">ค้นหาบ้านและคอนโดที่ถูกใจในทำเลที่ดีที่สุด</p>
              </div>
              <ChevronRight className="text-gray-300 group-hover:text-[#a51c24]" size={20} />
            </div>
          </button>

          {/* Card: Agent (นายหน้า) */}
          <button
            onClick={() => handleLogin("AGENT")}
            className="group relative bg-white border-2 border-transparent hover:border-[#a51c24] p-5 rounded-2xl shadow-lg transition-all duration-300 hover:-translate-y-1 text-left overflow-hidden"
          >
            <div className="flex items-center gap-4">
              <div className="bg-red-50 p-3 rounded-xl text-[#a51c24] group-hover:bg-[#a51c24] group-hover:text-white transition-colors">
                <Briefcase size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 leading-tight">ฉันเป็นนายหน้า</h3>
                <p className="text-gray-500 text-xs mt-0.5">จัดการทรัพย์ที่รับฝาก และดูแลลูกค้าผู้เช่า</p>
              </div>
              <ChevronRight className="text-gray-300 group-hover:text-[#a51c24]" size={20} />
            </div>
          </button>

          {/* Card: Owner (เจ้าของ) */}
          <button
            onClick={() => handleLogin("OWNER")}
            className="group relative bg-white border-2 border-transparent hover:border-[#a51c24] p-5 rounded-2xl shadow-lg transition-all duration-300 hover:-translate-y-1 text-left overflow-hidden"
          >
            <div className="flex items-center gap-4">
              <div className="bg-orange-50 p-3 rounded-xl text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                <Home size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 leading-tight">ฉันเป็นเจ้าของทรัพย์</h3>
                <p className="text-gray-500 text-xs mt-0.5">ลงประกาศ ฝากเช่า/ขาย และติดตามสถานะทรัพย์</p>
              </div>
              <ChevronRight className="text-gray-300 group-hover:text-[#a51c24]" size={20} />
            </div>
          </button>

        </div>

        {/* 3. Social Proof & Footer */}
        <div className="mt-10 space-y-4">
          <div className="flex items-center justify-center gap-6 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
          </div>
          <div className="text-center">
            <Link href="/" className="text-sm text-gray-400 hover:text-[#a51c24] transition-colors">
              กลับไปหน้าหลัก
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
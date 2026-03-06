"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, Building2, Search, ClipboardList, User } from 'lucide-react';

export default function AgentBottomNav() {
  const pathname = usePathname() || "";

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 px-4 py-2 pb-5 flex justify-between items-end text-[10px] font-medium z-[100] text-gray-400 h-[80px]">
      
      {/* 1. หน้าหลัก */}
      <Link 
        href="/agent/dashboard" 
        className={`flex flex-col items-center gap-1 transition min-w-[50px] mb-1 ${
          pathname === '/agent/dashboard' || pathname === '/agent' ? 'text-[#dc2626]' : 'hover:text-[#dc2626]'
        }`}
      >
        <LayoutGrid className="w-6 h-6" />
        <span>หน้าหลัก</span>
      </Link>

      {/* 2. Units */}
      <Link 
        href="/agent/units" 
        className={`flex flex-col items-center gap-1 transition min-w-[50px] mb-1 ${
          pathname.includes('/agent/units') ? 'text-[#dc2626]' : 'hover:text-[#dc2626]'
        }`}
      >
        <Building2 className="w-6 h-6" />
        <span>Units</span>
      </Link>

      {/* 3. สำรวจ (แก้ไข: ให้เป็นปุ่มธรรมดาเหมือนปุ่มอื่น) */}
      <Link 
        href="/agent/explore" 
        className={`flex flex-col items-center gap-1 transition min-w-[50px] mb-1 relative ${
          pathname.includes('/agent/explore') ? 'text-[#dc2626]' : 'hover:text-[#dc2626]'
        }`}
      >
        {/* เปลี่ยนสีพื้นหลังไอคอนเมื่อ Active */}
        <div className={`p-1.5 rounded-full -mt-2 mb-0.5 ${pathname.includes('/agent/explore') ? 'bg-red-50' : 'bg-gray-50'}`}>
          <Search className="w-6 h-6" strokeWidth={2.5} />
        </div>
        <span>สำรวจ</span>
      </Link>

      {/* 4. ดีล */}
      <Link 
        href="/agent/deals" 
        className={`flex flex-col items-center gap-1 transition min-w-[50px] relative mb-1 ${
          pathname.includes('/agent/deals') ? 'text-[#dc2626]' : 'hover:text-[#dc2626]'
        }`}
      >
        <div className="relative">
          <ClipboardList className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 bg-[#dc2626] text-white text-[8px] w-3.5 h-3.5 flex items-center justify-center rounded-full border border-white">1</span>
        </div>
        <span>ดีล</span>
      </Link>

      {/* 5. โปรไฟล์ */}
      <Link 
        href="/agent/profileagent" 
        className={`flex flex-col items-center gap-1 transition min-w-[50px] mb-1 ${
          pathname.includes('/agent/profileagent') ? 'text-[#dc2626]' : 'hover:text-[#dc2626]'
        }`}
      >
        <User className="w-6 h-6" />
        <span>โปรไฟล์</span>
      </Link>

    </nav>
  );
}
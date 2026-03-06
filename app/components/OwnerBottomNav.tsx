"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // ✅ ใช้เช็คว่าอยู่หน้าไหน
import { Home, User, LogOut } from 'lucide-react';

export default function OwnerBottomNav() {
  const pathname = usePathname(); // ดึงที่อยู่ URL ปัจจุบันมา

  return (
    <nav className="fixed bottom-0 w-full bg-white border-t border-gray-100 py-2 z-40 min-h-[64px]">
      <div className="flex justify-between items-center max-w-sm mx-auto px-6">
        
        {/* 1. หน้าหลัก (เช็คว่าถ้า url คือ /owner/dashboard ให้เป็นสีแดง) */}
        <Link 
          href="/owner/dashboard" 
          className={`flex flex-col items-center justify-center gap-1 w-16 transition ${
            pathname === '/owner/dashboard' ? 'text-[#dc2626]' : 'text-gray-400 hover:text-[#dc2626]'
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-bold">หน้าหลัก</span>
        </Link>
        
        {/* 2. โปรไฟล์ (เช็คว่าถ้า url คือ /owner/profile ให้เป็นสีแดง) */}
        <Link 
          href="/owner/profile" 
          className={`flex flex-col items-center justify-center gap-1 w-16 transition ${
            pathname === '/owner/profile' ? 'text-[#dc2626]' : 'text-gray-400 hover:text-[#dc2626]'
          }`}
        >
          <User className="w-6 h-6" />
          <span className="text-[10px] font-medium">โปรไฟล์</span>
        </Link>

        {/* 3. ปุ่มออก (สีเทา โฮเวอร์/กดแล้วเป็นสีแดง) */}
        <Link 
          href="/" 
          className="flex items-center justify-center gap-1.5 text-gray-400 hover:text-[#dc2626] active:text-[#dc2626] hover:bg-red-50 px-3 py-2 rounded-xl transition font-bold text-sm"
        >
          <LogOut className="w-5 h-5" />
          <span>ออก</span>
        </Link>

      </div>
    </nav>
  );
}
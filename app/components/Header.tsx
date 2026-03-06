'use client';

import Link from 'next/link';
import { Menu, X, LayoutDashboard, LogOut, Home, User } from 'lucide-react'; 
import { useState } from "react";
import { useSession, signOut } from "next-auth/react"; 

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession(); 

  const isAuth = status === "authenticated";
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          
          {/* Logo Section */}
          <Link href="/" onClick={closeMenu} className="flex items-center gap-3">
            <div className="bg-[#B72E25] w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
               <Home className="text-white w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-[#B72E25] leading-none">KEY</span>
              <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">PLATFORM</span>
            </div>
          </Link>

          {/* Right Section: Hamburger Button */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors active:scale-95"
            >
              {isMobileMenuOpen ? (
                <X className="h-7 w-7 text-gray-700" />
              ) : (
                <Menu className="h-7 w-7 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Content (Dropdown) */}
      <div className={`fixed inset-x-0 top-[73px] z-50 bg-white border-b shadow-2xl transition-all duration-300 transform ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
        <nav className="flex flex-col p-6 space-y-3">
          
          <Link href="/" onClick={closeMenu} className="flex items-center gap-4 px-4 py-4 text-gray-700 hover:bg-gray-50 rounded-2xl font-bold transition-colors">
            <Home size={22} className="text-gray-400" />
            หน้าแรก
          </Link>

          {isAuth ? (
            <>
              {/* ✅ ย้ายแดชบอร์ดมาไว้ในนี้ */}
              <Link href="/dashboard" onClick={closeMenu} className="flex items-center gap-4 px-4 py-4 text-[#B72E25] bg-red-50 rounded-2xl font-bold transition-colors border border-red-100">
                <LayoutDashboard size={22} />
                แผงควบคุม (Dashboard)
              </Link>
              <div className="h-px bg-gray-100 my-2 mx-4" />

              {/* ✅ ย้ายปุ่มออกจากระบบมาไว้ในนี้ */}
              <button 
                onClick={() => { signOut(); closeMenu(); }}
                className="flex items-center gap-4 px-4 py-4 text-gray-400 hover:text-red-600 rounded-2xl font-bold transition-colors w-full text-left"
              >
                <LogOut size={22} />
                ออกจากระบบ
              </button>
            </>
          ) : (
            <Link 
              href="/login" 
              onClick={closeMenu}
              className="mt-4 px-4 py-4 bg-[#B72E25] text-white text-center font-black rounded-2xl hover:bg-red-700 transition-all shadow-lg active:scale-95"
            >
              เข้าสู่ระบบ / ลงทะเบียน
            </Link>
          )}
        </nav>
      </div>

      {/* Overlay สำหรับปิดเมนูเมื่อคลิกด้านนอก */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[2px]" onClick={closeMenu} />
      )}
    </>
  );
}
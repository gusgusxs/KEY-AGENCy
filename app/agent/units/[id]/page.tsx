"use client";

import Link from 'next/link';
import { 
  ChevronLeft, Heart, EyeOff, MapPin, 
  CheckCircle2, Train, Plus, Footprints
} from 'lucide-react';

export default function UnitDetailPage() {
  return (
    <div className="min-h-screen bg-white pb-28 font-sans text-slate-800">
      
      {/* --- 1. Hero Image & Top Nav --- */}
      <div className="relative h-[320px] w-full bg-gray-200">
        <img 
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800" 
          alt="Lumpini Park Riverside" 
          className="w-full h-full object-cover"
        />
        {/* Top Overlay Gradient (เพื่อให้เห็นปุ่มชัดขึ้น) */}
        <div className="absolute top-0 w-full h-24 bg-gradient-to-b from-black/30 to-transparent pointer-events-none"></div>

        {/* Buttons */}
        <div className="absolute top-6 left-4 z-10">
          <Link href="/agent/units" className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-700 shadow-sm hover:bg-white active:scale-95 transition">
            <ChevronLeft className="w-6 h-6" />
          </Link>
        </div>
        <div className="absolute top-6 right-4 z-10 flex gap-2">
          <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-700 shadow-sm hover:bg-white active:scale-95 transition">
            <Heart className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-700 shadow-sm hover:bg-white active:scale-95 transition">
            <EyeOff className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* --- 2. Title & Basic Info --- */}
      <div className="px-5 pt-5 pb-4">
        <div className="flex justify-between items-start">
          <div className="pr-4">
            <h1 className="text-2xl font-bold text-slate-800 leading-tight">Lumpini Park Riverside</h1>
            <div className="flex items-center gap-1 text-sm text-gray-500 mt-2">
              <MapPin className="w-4 h-4" />
              <span>บางซื่อ, กรุงเทพมหานคร</span>
            </div>
          </div>
          <div className="text-right shrink-0">
            <h2 className="text-2xl font-extrabold text-[#dc2626]">฿3.00M</h2>
            <p className="text-[10px] text-gray-500 font-medium mt-1">คอมมิชชัน 3%</p>
          </div>
        </div>
      </div>

      {/* --- 3. Key Stats (ห้องนอน, ห้องน้ำ, พื้นที่) --- */}
      <div className="grid grid-cols-3 border-y border-gray-100 py-4 mx-5 mb-5">
        <div className="text-center border-r border-gray-100">
          <p className="font-extrabold text-lg text-slate-800">1</p>
          <p className="text-xs text-gray-500 font-medium mt-0.5">ห้องนอน</p>
        </div>
        <div className="text-center border-r border-gray-100">
          <p className="font-extrabold text-lg text-slate-800">1</p>
          <p className="text-xs text-gray-500 font-medium mt-0.5">ห้องน้ำ</p>
        </div>
        <div className="text-center">
          <p className="font-extrabold text-lg text-slate-800">30</p>
          <p className="text-xs text-gray-500 font-medium mt-0.5">ตร.ม.</p>
        </div>
      </div>

      {/* --- 4. รายละเอียด (Description) --- */}
      <div className="px-5 mb-6">
        <h3 className="font-bold text-slate-800 text-base mb-2">รายละเอียด</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          คอนโดหรู ใจกลางเมือง เดินทางสะดวก ใกล้รถไฟฟ้า เฟอร์นิเจอร์ครบ พร้อมเข้าอยู่
        </p>
      </div>

      {/* --- 5. จุดเด่น (Highlights) --- */}
      <div className="px-5 mb-6">
        <h3 className="font-bold text-slate-800 text-base mb-3">จุดเด่น</h3>
        <div className="flex flex-wrap gap-2">
          <span className="bg-orange-50 text-orange-600 px-3 py-1.5 rounded-full text-xs font-bold">ใกล้ BTS เพียง 300 เมตร</span>
          <span className="bg-orange-50 text-orange-600 px-3 py-1.5 rounded-full text-xs font-bold">ห้องมุม วิวแม่น้ำ</span>
          <span className="bg-orange-50 text-orange-600 px-3 py-1.5 rounded-full text-xs font-bold">ตกแต่งครบ พร้อมเข้าอยู่</span>
        </div>
      </div>

      {/* --- 6. สิ่งอำนวยความสะดวก (Amenities) --- */}
      <div className="px-5 mb-8">
        <h3 className="font-bold text-slate-800 text-base mb-4">สิ่งอำนวยความสะดวกในห้อง</h3>
        <div className="grid grid-cols-2 gap-y-3 gap-x-4">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <CheckCircle2 className="w-4 h-4 text-[#22c55e] shrink-0" />
            <span>เฟอร์นิเจอร์</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <CheckCircle2 className="w-4 h-4 text-[#22c55e] shrink-0" />
            <span>เครื่องปรับอากาศ</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <CheckCircle2 className="w-4 h-4 text-[#22c55e] shrink-0" />
            <span>TV</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <CheckCircle2 className="w-4 h-4 text-[#22c55e] shrink-0" />
            <span className="leading-tight">อินเตอร์เน็ตไร้สาย (WIFI) ในห้อง</span>
          </div>
        </div>
      </div>

      <div className="h-2 bg-gray-50 w-full mb-6"></div> {/* Section Divider */}

      {/* --- 7. เกี่ยวกับทำเลนี้ (Location & Transit) --- */}
      <div className="px-5 mb-6">
        <h3 className="font-bold text-slate-800 text-base mb-4">เกี่ยวกับทำเลนี้</h3>
        
        {/* Tabs เลื่อน */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-4" style={{ scrollbarWidth: 'none' }}>
          <button className="whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold border border-gray-200 text-gray-500 bg-white">สถานที่ที่บันทึกไว้</button>
          <button className="whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold bg-[#1e293b] text-white">รถไฟ</button>
          <button className="whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold border border-gray-200 text-gray-500 bg-white">โรงเรียน</button>
          <button className="whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold border border-gray-200 text-gray-500 bg-white">แหล่งช้อปปิ้ง</button>
        </div>

        {/* รายการรถไฟฟ้า */}
        <div className="bg-gray-50 rounded-2xl p-4 space-y-3 border border-gray-100">
          
          {/* Station 1 */}
          <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 shrink-0">
                <Train className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-slate-800">BTS เพลินจิต</h4>
                  <span className="bg-[#84cc16] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">E2</span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">460 ม.</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end gap-1 font-bold text-sm text-slate-800">
                <Footprints className="w-4 h-4 text-orange-500" /> 6 นาที
              </div>
              {/* Note: ยึดตัวเลข 46000ม. ตามรูปภาพต้นฉบับครับ */}
              <p className="text-[10px] text-gray-400 mt-0.5">46000 ม.</p> 
            </div>
          </div>

          {/* Station 2 */}
          <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 shrink-0">
                <Train className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-slate-800">BTS ชิดลม</h4>
                  <span className="bg-[#84cc16] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">E1</span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">830 ม.</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end gap-1 font-bold text-sm text-slate-800">
                <Footprints className="w-4 h-4 text-orange-500" /> 10 นาที
              </div>
              <p className="text-[10px] text-gray-400 mt-0.5">83000 ม.</p>
            </div>
          </div>

          {/* Add Location Button */}
          <button className="w-full py-3 flex items-center justify-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-700 transition">
            เพิ่มทำเล <Plus className="w-4 h-4" />
          </button>
          
        </div>
      </div>

      {/* --- 8. Bottom Fixed Action Bar --- */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 p-4 pb-6 z-40">
        <button className="w-full bg-[#dc2626] hover:bg-red-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-red-200 flex items-center justify-center gap-2 active:scale-95 transition">
          จองสิทธิ์ทรัพย์นี้
        </button>
      </div>

    </div>
  );
}
"use client";

import { useState } from 'react';
import {
  Key, Eye, MousePointer2, User, Download, Phone, Mail,
  MessageCircle, Plus, Calendar
} from 'lucide-react';
import Link from 'next/link';
import * as XLSX from 'xlsx'; // ✅ Import เครื่องมือทำ Excel
import ListingsContent from './ListingsContent';
import OwnerBottomNav from '@/app/components/OwnerBottomNav';

export default function OwnerDashboardClient({ user, listings = [] }: any) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'listings'>('dashboard'); // ✅ ให้ Default เป็นหน้า Dashboard ก่อน
  const listingsCount = listings.length;

  return (
    <div className="min-h-screen bg-gray-50 pb-24 font-sans text-slate-800">
      {/* Header */}
      <header className="flex justify-between items-center px-6 pt-8 pb-4 bg-white sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-11 h-11 bg-[#a51c24] rounded-xl flex items-center justify-center shadow-sm">
            <Key className="w-6 h-6 text-white" strokeWidth={2} />
          </div>
          <h1 className="text-xl font-bold text-[#a51c24]">KEY Owner</h1>
        </div>
        <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden border border-gray-100">
          <img src={user?.image || "/default-avatar.png"} alt="Profile" className="w-full h-full object-cover" />
        </div>
      </header>

      {/* Tabs */}
      <div className="px-4 mt-2 sticky top-20 z-10 bg-gray-50 pb-2">
        <div className="bg-white p-1 rounded-xl flex shadow-sm border border-gray-100">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'dashboard' ? 'bg-red-50 text-[#a51c24]' : 'text-gray-400 hover:text-gray-600'}`}
          >
            ภาพรวม
          </button>
          <button
            onClick={() => setActiveTab('listings')}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'listings' ? 'bg-[#a51c24] text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
          >
            ประกาศของฉัน ({listingsCount})
          </button>
        </div>
      </div>

      {/* Content Area */}
      {activeTab === 'dashboard' ? (
        <DashboardContent listings={listings} />
      ) : (
        <ListingsContent listings={listings} />
      )}

      {/* FAB Button */}
      <div className="fixed bottom-24 right-4 z-30">
        <Link href="/owner/create-listing" className="flex items-center gap-2 bg-[#dc2626] text-white px-5 py-3 rounded-full shadow-lg active:scale-95 hover:bg-red-700 transition-colors">
          <Plus className="w-5 h-5" strokeWidth={3} />
          <span className="font-bold">ลงประกาศ</span>
        </Link>
      </div>

      <OwnerBottomNav />
    </div>
  );
}

// --- Dashboard Content (มีระบบ Filter วันที่ และ Export Excel) ---
function DashboardContent({ listings }: { listings: any[] }) {
  // 1. State สำหรับจัดการตัวกรองวันที่
  const [dateFilter, setDateFilter] = useState('7'); // ค่าเริ่มต้น 7 วัน

  // 2. ฟังก์ชันกรองข้อมูลตามวันที่
  // 💡 หมายเหตุ: ตอนนี้เราใช้ createdAt ของประกาศมากรอง หากอนาคตมีระบบ Track คลิรายวัน ค่อยนำมาปรับใช้ตรงนี้
  const filteredListings = listings.filter((item) => {
    if (dateFilter === 'all') return true;
    
    const days = parseInt(dateFilter);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    // สมมติว่า item.createdAt เป็นวันที่ลงประกาศ
    return new Date(item.createdAt) >= cutoffDate;
  });

  // 3. คำนวณผลรวมจากข้อมูลที่ "ถูกกรองแล้ว"
  const totalViews = filteredListings.reduce((sum, item) => sum + (item.views || 0), 0);
  const totalClicks = filteredListings.reduce((sum, item) => sum + (item.clicks || 0), 0);
  
  // สมมติว่าใน DB คุณมีฟิลด์เหล่านี้แล้ว ถ้ายังไม่มีสามารถเพิ่มใน schema.prisma ได้เลย
  const lineContacts = filteredListings.reduce((sum, item) => sum + (item.lineClicks || 0), 0);
  const phoneContacts = filteredListings.reduce((sum, item) => sum + (item.phoneClicks || 0), 0);
  const emailContacts = filteredListings.reduce((sum, item) => sum + (item.emailClicks || 0), 0);
  
  const totalContacts = lineContacts + phoneContacts + emailContacts;
  const getPercent = (value: number) => totalContacts === 0 ? 0 : Math.round((value / totalContacts) * 100);

  // ✅ 4. ฟังก์ชัน Export Excel
  const handleExportExcel = () => {
    // เตรียมข้อมูลเป็น Array 2 มิติ (แถว และ คอลัมน์)
    const exportData = [
      ['รายงานสถิติหน้า Dashboard', ''],
      ['วันที่ดึงข้อมูล:', new Date().toLocaleDateString('th-TH')],
      ['ช่วงเวลาที่เลือก:', dateFilter === 'all' ? 'ทั้งหมด' : `${dateFilter} วันล่าสุด`],
      ['', ''], // บรรทัดว่าง
      ['หัวข้อสถิติ', 'จำนวน (ครั้ง)'],
      ['การมองเห็นประกาศทั้งหมด (Views)', totalViews],
      ['การคลิกเข้าชมประกาศ (Clicks)', totalClicks],
      ['รวมการกดติดต่อทั้งหมด', totalContacts],
      ['- ติดต่อผ่าน LINE', lineContacts],
      ['- ติดต่อผ่านเบอร์โทรศัพท์', phoneContacts],
      ['- ติดต่อผ่าน Email', emailContacts],
    ];

    // สร้าง Workbook และ Worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Dashboard Stats");

    // กำหนดชื่อไฟล์และสั่งดาวน์โหลด
    const fileName = `KEY_Owner_Stats_${new Date().getTime()}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  return (
    <div className="animate-in fade-in duration-300">
      
      {/* ส่วนเลือกวันที่ และ ปุ่ม Excel */}
      <div className="px-6 mt-6 flex justify-between items-center bg-white py-3 mx-4 rounded-xl shadow-sm border border-gray-100 mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#a51c24]" />
          <select 
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="text-sm font-bold text-gray-800 bg-transparent outline-none cursor-pointer"
          >
            <option value="7">7 วันล่าสุด</option>
            <option value="30">30 วันล่าสุด</option>
            <option value="all">เวลาทั้งหมด</option>
          </select>
        </div>
        
        <button 
          onClick={handleExportExcel}
          className="flex items-center gap-1.5 text-green-600 border-2 border-green-500 bg-green-50 px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-green-600 hover:text-white active:scale-95 transition-all duration-200 shadow-sm"
        >
          <Download className="w-3.5 h-3.5" /> Export Excel
        </button>
      </div>

      {/* สถิติ 3 กล่องบน */}
      <div className="px-4 grid grid-cols-3 gap-3">
        <StatCard icon={<Eye className="w-5 h-5 text-[#a51c24]" />} number={totalViews.toLocaleString()} label="มองเห็น" />
        <StatCard icon={<MousePointer2 className="w-5 h-5 text-[#a51c24]" />} number={totalClicks.toLocaleString()} label="เข้าชม" />
        <StatCard icon={<User className="w-5 h-5 text-[#a51c24]" />} number={totalContacts.toLocaleString()} label="ติดต่อ" />
      </div>

      {/* สถิติช่องทางติดต่อ */}
      <div className="px-4 mt-6">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
            <MessageCircle size={18} className="text-[#a51c24]" /> ช่องทางการติดต่อ
          </h3>
          
          {totalContacts === 0 ? (
             <div className="text-center text-sm text-gray-400 py-6 bg-gray-50 rounded-xl border border-dashed border-gray-200">
               ยังไม่มีสถิติการติดต่อในช่วงเวลานี้
             </div>
          ) : (
            <div className="space-y-5">
              <ContactItem icon={<MessageCircle size={16} fill="white" />} iconBg="bg-[#06C755]" label="LINE" count={lineContacts} percent={getPercent(lineContacts)} barColor="bg-[#06C755]" />
              <ContactItem icon={<Phone size={16} fill="white" />} iconBg="bg-blue-500" label="โทรศัพท์" count={phoneContacts} percent={getPercent(phoneContacts)} barColor="bg-blue-500" />
              <ContactItem icon={<Mail size={16} fill="white" />} iconBg="bg-red-500" label="อีเมล" count={emailContacts} percent={getPercent(emailContacts)} barColor="bg-red-500" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, number, label }: any) {
  return (
    <div className="bg-white p-3 py-4 rounded-2xl shadow-sm flex flex-col items-center border border-gray-100">
      <div className="p-2 bg-red-50 rounded-lg mb-2">{icon}</div>
      <span className="text-lg font-black text-slate-800">{number}</span>
      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{label}</span>
    </div>
  );
}

function ContactItem({ icon, iconBg, label, count, percent, barColor }: any) {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1.5">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 ${iconBg} text-white rounded-full flex items-center justify-center shadow-sm`}>{icon}</div>
          <span className="text-sm font-bold text-gray-600">{label}</span>
        </div>
        <span className="font-bold text-slate-800 text-sm">{count.toLocaleString()} ครั้ง</span>
      </div>
      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full ${barColor} rounded-full transition-all duration-700 ease-out`} style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
}
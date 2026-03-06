'use client';
import { Building2, MapPin, Eye, MousePointer2, Search, Filter, Trash2, Zap } from 'lucide-react'; 
import Link from 'next/link';
import { useState, useTransition } from 'react'; 
import { deleteListing } from '@/lib/actions/deleteListing';

export default function ListingsContent({ listings = [] }: { listings: any[] }) {
  const [activeTab, setActiveTab] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [isPending, startTransition] = useTransition();

  const filteredListings = listings.filter((item) => {
    const matchTab = activeTab === 'ALL' || item.status === activeTab;
    const searchLower = searchQuery.toLowerCase();
    const matchSearch = !searchQuery || 
      (item.title && item.title.toLowerCase().includes(searchLower)) ||
      (item.location && item.location.toLowerCase().includes(searchLower));
    return matchTab && matchSearch;
  });

  const handleDelete = (id: string) => {
    if (window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบประกาศนี้? ข้อมูลจะหายไปอย่างถาวร")) {
      startTransition(async () => {
        const result = await deleteListing(id);
        if (result.success) {
          alert("ลบประกาศเรียบร้อยแล้ว");
        } else {
          alert(result.error || "เกิดข้อผิดพลาดในการลบ");
        }
      });
    }
  };

  // นับจำนวนแต่ละสถานะเพื่อแสดงบน Tab
  const counts = {
    ALL: listings.length,
    AVAILABLE: listings.filter(l => l.status === 'AVAILABLE').length,
    DRAFT: listings.filter(l => l.status === 'DRAFT').length
  };

  if (!listings || listings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <Building2 size={48} strokeWidth={1.5} className="mb-4 opacity-20" />
        <p className="font-medium">คุณยังไม่มีประกาศในระบบ</p>
        <Link href="/owner/create-listing" className="text-[#E02424] text-sm font-bold mt-2 underline">
          เริ่มลงประกาศแรกของคุณ
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-none px-4 sm:px-6 lg:px-10 mt-4 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Tab Navigation พร้อมตัวเลขกำกับ */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2">
        {[
          { id: 'ALL', label: 'ทั้งหมด', count: counts.ALL },
          { id: 'AVAILABLE', label: 'ออนไลน์', count: counts.AVAILABLE },
          { id: 'DRAFT', label: 'ฉบับร่าง', count: counts.DRAFT },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-[#a51c24] text-white shadow-md' 
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200' 
            }`}
          >
            {tab.label}
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white/20' : 'bg-gray-200 text-gray-600'}`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="ค้นหาโครงการ, ทำเล..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E02424]/20 focus:border-[#E02424] transition-all"
          />
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-10">
        {filteredListings.map((item) => (
          <article key={item.id} className={`group bg-white rounded-3xl p-3 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col relative overflow-hidden ${isPending ? 'opacity-50 pointer-events-none' : ''}`}>
            
            {/* 1. รูปภาพและ Badge สถานะที่มุมขวา */}
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-gray-100 shadow-inner">
              {item.images?.[0] ? (
                <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300"><Building2 size={32} /></div>
              )}

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />

              {/* ✅ ป้ายประเภททรัพย์ มุมซ้ายบน */}
              <div className="absolute top-3 left-3">
                <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-lg border border-white/20">
                  {item.propertyType === 'HOUSE' ? 'บ้าน' : item.propertyType === 'LAND' ? 'ที่ดิน' : 'คอนโด'}
                </span>
              </div>

              {/* ✅ ป้ายสถานะ มุมขวาบน (ตามที่คุณต้องการ) */}
              <div className="absolute top-3 right-3">
                {item.status === 'AVAILABLE' ? (
                  <span className="bg-green-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 border border-white/30">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                    Online
                  </span>
                ) : (
                  <span className="bg-gray-700 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg border border-white/20">
                    Draft
                  </span>
                )}
              </div>

              {/* ข้อมูลพื้นฐานบนรูป */}
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h3 className="font-bold text-sm line-clamp-1 mb-1">{item.title || 'ไม่มีชื่อหัวข้อ'}</h3>
                <div className="flex items-center gap-1 text-[10px] opacity-90">
                  <MapPin size={10} />
                  <span className="line-clamp-1">{item.location || 'ไม่ระบุทำเล'}</span>
                </div>
              </div>
            </div>

            {/* 2. รายละเอียดและราคา */}
            <div className="pt-4 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-[10px] text-gray-400 font-medium mb-1 uppercase tracking-wider">Property ID: {String(item.id).slice(-4)}</p>
                  <p className="text-[#E02424] font-black text-xl tracking-tight leading-none">
                    ฿{item.price?.toLocaleString() || '0'}
                  </p>
                </div>
                <span className="bg-gray-50 text-gray-600 text-[10px] font-bold px-2 py-1 rounded-md border border-gray-100">
                  {item.listingType === 'RENT' ? 'เช่า' : 'ขาย'}
                </span>
              </div>

              <div className="flex items-center gap-4 text-gray-400 text-[11px] mb-4">
                <span className="flex items-center gap-1"><Eye size={14} /> {item.views ?? 0}</span>
                <span className="flex items-center gap-1"><MousePointer2 size={13} /> {item.clicks ?? 0}</span>
              </div>

              {/* 3. ปุ่ม Action */}
              <div className="grid grid-cols-5 gap-2 mt-auto">
                <Link
                  href={`/owner/edit-listing/${item.id}`}
                  className="col-span-2 py-2 rounded-xl border border-gray-200 text-gray-600 font-bold text-xs flex items-center justify-center hover:bg-gray-50 transition-all active:scale-95"
                >
                  แก้ไข
                </Link>
                <button
                  onClick={() => handleDelete(item.id)}
                  disabled={isPending}
                 className="col-span-2 py-2 rounded-xl border border-red-200 text-[#a51c24] font-bold text-xs flex items-center justify-center hover:bg-red-50 transition-all active:scale-95"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
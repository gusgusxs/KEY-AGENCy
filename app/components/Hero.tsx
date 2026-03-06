"use client";  
  
import { Search, SlidersHorizontal } from 'lucide-react';  
import { useState } from 'react';  
import { cn } from '@/lib/utils';  
import { FiltersModal } from './FiltersModal';  
  
export function Hero() {  
  const [activeTab, setActiveTab] = useState<'rent' | 'buy'>('rent');  
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);  
  
  return (  
    <div className="relative w-full bg-gray-50 pb-8">  
      <FiltersModal isOpen={isFiltersOpen} onClose={() => setIsFiltersOpen(false)} />  
  
      {/* Background Section */}
      <div className="relative h-[320px] w-full overflow-hidden">  
        <div className="absolute inset-0 bg-black/40 z-10" />  
        <img  
          src="https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"  
          alt="Lifestyle"  
          className="w-full h-full object-cover object-center"  
        />  
        <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:items-center md:text-center pb-10">  
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 shadow-sm drop-shadow-lg">
            ค้นหาบ้านที่ใช่สำหรับคุณ
          </h1>  
          <p className="text-white/90 text-base md:text-lg font-medium drop-shadow-md">
            พบกับอสังหาริมทรัพย์ให้เช่าที่ดีที่สุด
          </p>  
        </div>  
      </div>  
  
      {/* Search Box Container */}
      <div className="container mx-auto px-4 -mt-24 relative z-30 max-w-4xl">  
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-1">  
          
          {/* Tabs */}  
          <div className="flex mb-2">  
            <button 
              onClick={() => setActiveTab('rent')} 
              className={cn(  
                "flex-1 py-4 text-sm font-bold text-center transition-colors rounded-t-xl border-b-2",  
                activeTab === 'rent'  
                  ? "bg-white text-gray-900 border-red-600"  
                  : "bg-gray-50 text-gray-500 border-transparent hover:bg-gray-100"  
              )}  
            >  
              เช่า  
            </button>  
            <button 
              onClick={() => setActiveTab('buy')} 
              className={cn(  
                "flex-1 py-4 text-sm font-bold text-center transition-colors rounded-t-xl border-b-2",  
                activeTab === 'buy'  
                  ? "bg-white text-gray-900 border-red-600"  
                  : "bg-gray-50 text-gray-500 border-transparent hover:bg-gray-100"  
              )}  
            >  
              ซื้อ  
            </button>  
          </div>  
  
          <div className="p-4 md:p-6 space-y-5">  
            {/* 1. Location Input */}  
            <div>  
              <label className="block text-sm font-bold text-gray-800 mb-2 ml-1">ทำเลที่ตั้ง</label>  
              <div className="relative">  
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />  
                <input 
                  type="text" 
                  placeholder="เมือง, ย่าน, รหัสไปรษณีย์..." 
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all text-gray-700" 
                />  
              </div>  
            </div>  
            
            {/* 2. Dropdowns Row (Price & Bedrooms) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">  
              
              {/* Max Price Dropdown */}
              <div>  
                <label className="block text-sm font-bold text-gray-800 mb-2 ml-1">ราคาสูงสุด</label>  
                <div className="relative">
                  <select className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white text-gray-700 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all appearance-none cursor-pointer">  
                    <option value="">ทุกช่วงราคา</option>  
                    <option value="5000">฿5,000</option>  
                    <option value="10000">฿10,000</option>  
                    <option value="20000">฿20,000</option>  
                    <option value="50000">฿50,000</option>  
                  </select>
                  {/* Custom Arrow for Select */}
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>  
  
              {/* Bedrooms Dropdown */}
              <div>  
                <label className="block text-sm font-bold text-gray-800 mb-2 ml-1">จำนวนห้องนอน</label>  
                <div className="relative">
                  <select className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white text-gray-700 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all appearance-none cursor-pointer">  
                    <option value="">ไม่ระบุ</option>  
                    <option value="studio">สตูดิโอ</option>  
                    <option value="1">1 ห้องนอน</option>  
                    <option value="2">2 ห้องนอน</option>  
                    <option value="3">3 ห้องนอน</option>  
                    <option value="4+">4+ ห้องนอน</option>  
                  </select>
                  {/* Custom Arrow for Select */}
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>  

            </div>  
  
            {/* 3. Action Buttons */}
            <div className="flex flex-col md:flex-row gap-3 pt-2">  
              <button 
                onClick={() => setIsFiltersOpen(true)} 
                className="flex-1 py-3.5 px-4 rounded-xl border border-red-200 text-red-600 font-bold text-base bg-white hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
              >  
                <SlidersHorizontal className="h-5 w-5" /> ตัวกรองเพิ่มเติม  
              </button>  
              <button className="flex-1 py-3.5 px-4 rounded-xl bg-red-600 text-white font-bold text-base hover:bg-red-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-red-200">  
                <Search className="h-5 w-5" /> ค้นหา  
              </button>  
            </div>  

          </div>  
        </div>  
      </div>  
    </div>  
  );  
}
"use client";  
  
import { useState, useEffect } from 'react';  
import { X } from 'lucide-react';  
import { cn } from '@/lib/utils';  
  
interface FiltersModalProps {  
  isOpen: boolean;  
  onClose: () => void;  
}  
  
export function FiltersModal({ isOpen, onClose }: FiltersModalProps) {  
  const [activeTab, setActiveTab] = useState<'buy' | 'rent'>('buy');  
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);  
  
  // Prevent scrolling when modal is open  
  useEffect(() => {  
    if (isOpen) {  
      document.body.style.overflow = 'hidden';  
    } else {  
      document.body.style.overflow = 'unset';  
    }  
    return () => {  
      document.body.style.overflow = 'unset';  
    };  
  }, [isOpen]);  
  
  if (!isOpen) return null;  
  
  const togglePropertyType = (type: string) => {  
    setPropertyTypes(prev =>  
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]  
    );  
  };  
  
  const PropertyTypeButton = ({ label, value }: { label: string, value: string }) => (  
    <button  
      onClick={() => togglePropertyType(value)}  
      className={cn(  
        "py-2 px-4 rounded-lg border text-sm font-medium transition-all",  
        propertyTypes.includes(value)  
          ? "border-red-600 bg-red-50 text-red-600"  
          : "border-gray-200 text-gray-700 hover:border-gray-300"  
      )}  
    >  
      {label}  
    </button>  
  );  
  
  return (  
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">  
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={onClose} />  
  
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200">  
        {/* Header */}  
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">  
          <h2 className="text-xl font-bold text-gray-900">ตัวกรอง</h2>  
          <button  
            onClick={onClose}  
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"  
          >  
            <X className="h-5 w-5 text-gray-500" />  
          </button>  
        </div>  
  
        {/* Scrollable Content */}  
        <div className="flex-1 overflow-y-auto p-6 space-y-8">  
  
          {/* Rent/Buy Toggle */}  
          <div className="flex p-1 bg-gray-100 rounded-xl w-full max-w-sm mx-auto">  
            <button  
              onClick={() => setActiveTab('buy')}  
              className={cn(  
                "flex-1 py-2 text-sm font-bold rounded-lg transition-all shadow-sm",  
                activeTab === 'buy' ? "bg-white text-gray-900" : "text-gray-500 hover:text-gray-700"  
              )}  
            >  
              ซื้อ  
            </button>  
            <button  
              onClick={() => setActiveTab('rent')}  
              className={cn(  
                "flex-1 py-2 text-sm font-bold rounded-lg transition-all shadow-sm",  
                activeTab === 'rent' ? "bg-white text-gray-900" : "text-gray-500 hover:text-gray-700"  
              )}  
            >  
              เช่า  
            </button>  
          </div>  
  
          {/* Property Types */}  
          <section>  
            <h3 className="text-lg font-bold text-gray-900 mb-4">ประเภทอสังหาฯ</h3>  
            <div className="flex flex-wrap gap-2 mb-3">  
              <button className="py-2 px-4 rounded-full border border-gray-200 text-sm font-medium hover:bg-gray-50">  
                อสังหาฯ เพื่ออยู่อาศัยทั้งหมด  
              </button>  
            </div>  
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">  
              <PropertyTypeButton label="คอนโด" value="condo" />  
              <PropertyTypeButton label="บ้านเดี่ยว" value="detached_house" />  
              <PropertyTypeButton label="บ้านแฝด" value="twin_house" />  
              <PropertyTypeButton label="วิลล่า" value="villa" />  
              <PropertyTypeButton label="ทาวน์เฮ้าส์" value="townhouse" />  
              <PropertyTypeButton label="ที่ดิน" value="land" />  
              <PropertyTypeButton label="อพาร์ทเมนท์" value="apartment" />  
            </div>  
          </section>  
  
          {/* Price */}  
          <section>  
            <h3 className="text-lg font-bold text-gray-900 mb-4">ราคา</h3>  
            <div className="flex items-center gap-4">  
              <div className="flex-1">  
                <label className="block text-xs text-gray-500 mb-1">ต่ำสุด</label>  
                <div className="relative">  
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">฿</span>  
                  <input  
                    type="number"  
                    placeholder="ขั้นต่ำ"  
                    className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"  
                  />  
                </div>  
              </div>  
              <span className="text-gray-400">-</span>  
              <div className="flex-1">  
                <label className="block text-xs text-gray-500 mb-1">สูงสุด</label>  
                <div className="relative">  
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">฿</span>  
                  <input  
                    type="number"  
                    placeholder="สูงสุด"  
                    className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"  
                  />  
                </div>  
              </div>  
            </div>  
          </section>  
  
          {/* Bedrooms & Bathrooms */}  
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">  
            <div>  
              <h3 className="text-lg font-bold text-gray-900 mb-4">ห้องนอน</h3>  
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">  
                {["ไม่ระบุ", "สตูดิโอ", "1", "2", "3", "4", "5+"].map((num) => (  
                  <button key={num} className="h-10 w-10 min-w-[2.5rem] px-2 rounded-full border border-gray-200 flex items-center justify-center text-sm font-medium hover:border-red-500 hover:text-red-600 hover:bg-red-50 transition-colors">  
                    {num}  
                  </button>  
                ))}  
              </div>  
            </div>  
            <div>  
              <h3 className="text-lg font-bold text-gray-900 mb-4">ห้องน้ำ</h3>  
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">  
                {["ไม่ระบุ", "1", "2", "3", "4", "5+"].map((num) => (  
                  <button key={num} className="h-10 w-10 min-w-[2.5rem] px-2 rounded-full border border-gray-200 flex items-center justify-center text-sm font-medium hover:border-red-500 hover:text-red-600 hover:bg-red-50 transition-colors">  
                    {num}  
                  </button>  
                ))}  
              </div>  
            </div>  
          </section>  
  
          {/* Floor Area */}  
          <section>  
            <h3 className="text-lg font-bold text-gray-900 mb-4">พื้นที่ใช้สอย</h3>  
            <div className="flex items-center gap-4">  
              <div className="flex-1">  
                <label className="block text-xs text-gray-500 mb-1">ต่ำสุด</label>  
                <div className="relative">  
                  <input  
                    type="number"  
                    placeholder="ตร.ม."  
                    className="w-full pl-4 pr-3 py-2.5 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"  
                  />  
                </div>  
              </div>  
              <span className="text-gray-400">-</span>  
              <div className="flex-1">  
                <label className="block text-xs text-gray-500 mb-1">สูงสุด</label>  
                <div className="relative">  
                  <input  
                    type="number"  
                    placeholder="ตร.ม."  
                    className="w-full pl-4 pr-3 py-2.5 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"  
                  />  
                </div>  
              </div>  
            </div>  
          </section>  
  
          {/* Distance from Station */}  
          <section>  
            <h3 className="text-lg font-bold text-gray-900 mb-4">ระยะทางจากสถานีรถไฟฟ้า</h3>  
            <div className="flex flex-wrap gap-2">  
              {["ห่างเท่าใดก็ได้", "< 250 ม.", "< 500 ม.", "< 750 ม.", "< 1 กม.", "< 1.5 กม."].map((dist) => (  
                <button key={dist} className="py-2 px-4 rounded-full border border-gray-200 text-sm font-medium text-gray-600 hover:border-red-500 hover:text-red-600 hover:bg-red-50 transition-colors">  
                  {dist}  
                </button>  
              ))}  
            </div>  
          </section>  
  
          {/* Price per Sq.m. */}  
          <section>  
            <h3 className="text-lg font-bold text-gray-900 mb-4">ราคาต่อตร.ม.</h3>  
            <div className="flex items-center gap-4">  
              <div className="flex-1">  
                <label className="block text-xs text-gray-500 mb-1">ต่ำสุด</label>  
                <div className="relative">  
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">฿</span>  
                  <input  
                    type="number"  
                    placeholder="ขั้นต่ำ"  
                    className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"  
                  />  
                </div>  
              </div>  
              <span className="text-gray-400">-</span>  
              <div className="flex-1">  
                <label className="block text-xs text-gray-500 mb-1">สูงสุด</label>  
                <div className="relative">  
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">฿</span>  
                  <input  
                    type="number"  
                    placeholder="สูงสุด"  
                    className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"  
                  />  
                </div>  
              </div>  
            </div>  
          </section>  
  
          {/* Highlights & Amenities */}  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">  
            <section>  
              <h3 className="text-lg font-bold text-gray-900 mb-4">จุดเด่น</h3>  
              <div className="space-y-3">  
                {["โครงการใหม่", "พร้อมอยู่", "เลี้ยงสัตว์ได้", "รับชาวต่างชาติ"].map((feat) => (  
                  <label key={feat} className="flex items-center gap-3 cursor-pointer group">  
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-500" />  
                    <span className="text-sm text-gray-700">{feat}</span>  
                  </label>  
                ))}  
              </div>  
            </section>  
            <section>  
              <h3 className="text-lg font-bold text-gray-900 mb-4">สิ่งอำนวยความสะดวก</h3>  
              <div className="space-y-3">  
                {["เครื่องปรับอากาศ", "กล้องวงจรปิด", "ฟิตเนส", "สระว่ายน้ำ", "ที่จอดรถ"].map((amenity) => (  
                  <label key={amenity} className="flex items-center gap-3 cursor-pointer group">  
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-500" />  
                    <span className="text-sm text-gray-700">{amenity}</span>  
                  </label>  
                ))}  
              </div>  
            </section>  
          </div>  
  
          {/* Furniture */}  
          <section>  
            <h3 className="text-lg font-bold text-gray-900 mb-4">เฟอร์นิเจอร์</h3>  
            <div className="flex flex-wrap gap-2">  
              {["ไม่ระบุ", "ไม่มี", "บางส่วน", "ครบครัน"].map((furn) => (  
                <button key={furn} className="py-2 px-4 rounded-full border border-gray-200 text-sm font-medium text-gray-600 hover:border-red-500 hover:text-red-600 hover:bg-red-50 transition-colors">  
                  {furn}  
                </button>  
              ))}  
            </div>  
          </section>  
  
          {/* Listed Date & Extra Features */}  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">  
            <section>  
              <h3 className="text-lg font-bold text-gray-900 mb-4">ลงประกาศเมื่อ</h3>  
              <div className="flex flex-col gap-2">  
                {["Any date", "ภายใน 2 สัปดาห์", "ภายใน 3 วัน", "ภายใน 1 เดือน", "ภายใน 1 สัปดาห์"].map((time) => (  
                  <label key={time} className="flex items-center gap-3 cursor-pointer">  
                    <input type="radio" name="listed_date" className="w-5 h-5 border-gray-300 text-red-600 focus:ring-red-500" />  
                    <span className="text-sm text-gray-700">{time}</span>  
                  </label>  
                ))}  
              </div>  
            </section>  
            <section>  
              <h3 className="text-lg font-bold text-gray-900 mb-4">ฟีเจอร์เพิ่มเติมของประกาศ</h3>  
              <div className="space-y-3">  
                {["มีวิดีโอและ VirtualTour", "เอเจนต์ที่ยืนยันตัวตนแล้ว"].map((feat) => (  
                  <label key={feat} className="flex items-center gap-3 cursor-pointer group">  
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-500" />  
                    <span className="text-sm text-gray-700">{feat}</span>  
                  </label>  
                ))}  
              </div>  
            </section>  
          </div>  
  
        </div>  
  
        {/* Footer */}  
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl">  
          <button  
            className="text-gray-600 font-semibold text-sm hover:text-gray-900 underline decoration-gray-300 underline-offset-4"  
            onClick={() => {  
              setPropertyTypes([]);  
            }}  
          >  
            ล้างค่าทั้งหมด  
          </button>  
          <button className="py-3 px-8 bg-red-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-red-200 hover:bg-red-700 hover:scale-[1.02] active:scale-[0.98] transition-all">  
            ดู 46 รายการ  
          </button>  
        </div>  
      </div>  
    </div>  
  );  
}
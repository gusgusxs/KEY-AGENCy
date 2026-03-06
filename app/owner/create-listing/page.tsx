"use client";

import { useState, useActionState } from "react";
import { useRouter } from "next/navigation";
import { createListing } from "@/lib/actions/listing-actions";
import {
  Building2, Home, Map, ChevronLeft, Camera, Trash2, CheckCircle2, MapPin
} from "lucide-react";

export default function CreateListingPage() {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);

  const [propType, setPropType] = useState("CONDO");
  const [listType, setListType] = useState("SALE");

  const [state, formAction, isPending] = useActionState(createListing, { message: "" });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => setImages((prev) => [...prev, reader.result as string]);
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  const removeImage = (idx: number) => {
    setImages(images.filter((_, i) => i !== idx));
  };

  return (
    // 1. บังคับพื้นหลังขาวล้วนเต็มจอ (w-full bg-white) เพื่อลบสีดำรอบนอก
    <div className="min-h-screen w-full bg-white text-[#2D3139] font-sans pb-32 lg:pb-20">

      {/* Header */}
      <div className="w-full bg-white border-b border-gray-100 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.back()}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft size={24} className="sm:w-7 sm:h-7" />
          </button>
          <h1 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">ลงประกาศใหม่</h1>
          <div className="w-10 sm:w-12"></div> {/* Spacer */}
        </div>
      </div>

      {/* Main Form Container */}
      <form action={formAction} className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-8 sm:space-y-10">

        {/* Error Message */}
        {state?.message && (
          <div className="bg-red-50 border border-red-200 text-[#a51c24] px-3 sm:px-4 py-2 sm:py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 sm:gap-3">
            <CheckCircle2 size={18} className="text-[#a51c24] min-w-[18px] sm:min-w-[20px]" />
            {state.message}
          </div>
        )}

        {/* ส่วนที่ 1: รูปภาพทรัพย์ */}
        <div className="space-y-3 sm:space-y-4">
          <h2 className="flex items-center gap-2 font-bold text-sm sm:text-base lg:text-lg text-gray-900">
            <span className="bg-[#a51c24] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0">1</span>
            รูปภาพทรัพย์
          </h2>

          <div className="border border-gray-200 rounded-lg sm:rounded-2xl p-4 sm:p-6 lg:p-8 bg-white">
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
              {images.map((img, idx) => (
                <div key={idx} className="relative aspect-square rounded-lg sm:rounded-xl overflow-hidden border-2 border-gray-200 group">
                  <img src={img} className="w-full h-full object-cover" alt={`รูปที่ ${idx + 1}`} />
                  {/* Overlay ทับรูปเมื่อ hover - แสดงไอคอนถังขยะตรงกลาง */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="bg-red-500 hover:bg-red-600 text-white p-3 sm:p-4 rounded-full shadow-xl transition-all transform hover:scale-110"
                      title="ลบรูปนี้"
                      aria-label="ลบรูปนี้"
                    >
                      <Trash2 size={20} strokeWidth={2} className="sm:w-6 sm:h-6" />
                    </button>
                  </div>
                  <input type="hidden" name="images" value={img} />
                </div>
              ))}

              <label className="aspect-square rounded-lg sm:rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center text-gray-400 hover:bg-red-50 hover:border-[#a51c24] cursor-pointer transition-all">
                <Camera size={18} className="mb-1 sm:mb-2 sm:w-6 sm:h-6" />
                <span className="text-[10px] sm:text-xs font-bold text-center px-1">เพิ่มรูปภาพ</span>
                <input type="file" accept="image/*" multiple onChange={handleImageChange} className="hidden" />
              </label>
            </div>
          </div>
        </div>

        {/* ส่วนที่ 2: ข้อมูลทั่วไป */}
        <div className="space-y-3 sm:space-y-4">
          <h2 className="flex items-center gap-2 font-bold text-sm sm:text-base lg:text-lg text-gray-900">
            <span className="bg-[#a51c24] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0">2</span>
            ข้อมูลทั่วไป
          </h2>

          <div className="border border-gray-200 rounded-lg sm:rounded-2xl p-4 sm:p-6 lg:p-8 bg-white space-y-4 sm:space-y-5">
            <div className="space-y-3">
              <label className="text-xs sm:text-sm font-bold text-gray-700">หัวข้อประกาศ</label>
              <input
                name="title"
                placeholder="เช่น คอนโดติด BTS อ่อนนุช..."
                required
                className="w-full p-2.5 sm:p-3.5 border-2 border-gray-300 rounded-lg sm:rounded-xl outline-none focus:border-[#a51c24] focus:border-2 text-sm sm:text-base transition-all text-gray-900 placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-3">
              <label className="text-xs sm:text-sm font-bold text-gray-700">ราคา (บาท/เดือน)</label>
              <input
                name="price"
                type="text"
                inputMode="numeric"
                onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '')}
                placeholder="ระบุราคา"
                required
                className="w-full p-2.5 sm:p-3.5 border-2 border-gray-300 rounded-lg sm:rounded-xl outline-none focus:border-[#a51c24] focus:border-2 font-bold text-sm sm:text-base transition-all text-gray-900 placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>

        {/* ส่วนที่ 3: รายละเอียดประกาศ */}
        <div className="space-y-3 sm:space-y-4">
          <h2 className="flex items-center gap-2 font-bold text-sm sm:text-base lg:text-lg text-gray-900">
            <span className="bg-[#a51c24] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0">3</span>
            รายละเอียด
          </h2>

          <div className="border border-gray-200 rounded-lg sm:rounded-2xl p-4 sm:p-6 lg:p-8 bg-white space-y-5 sm:space-y-6">

            {/* เลือกประเภทอสังหาฯ */}
            <div className="space-y-3">
              <label className="text-xs sm:text-sm font-bold text-gray-700">ประเภทอสังหาริมทรัพย์</label>
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {[
                  { id: "CONDO", label: "คอนโด", icon: <Building2 size={20} strokeWidth={2} className="sm:w-6 sm:h-6" /> },
                  { id: "HOUSE", label: "บ้าน", icon: <Home size={20} strokeWidth={2} className="sm:w-6 sm:h-6" /> },
                  { id: "LAND", label: "ที่ดิน", icon: <Map size={20} strokeWidth={2} className="sm:w-6 sm:h-6" /> }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPropType(item.id)}
                    className={`flex flex-col items-center gap-1 sm:gap-2 py-2 sm:py-4 px-2 rounded-lg sm:rounded-xl border transition-all duration-200 ${propType === item.id
                        ? "border-[#a51c24] bg-white text-[#a51c24] ring-1 ring-[#a51c24]"
                        : "border-gray-200 bg-white text-gray-400 hover:border-gray-300"
                      }`}
                  >
                    {item.icon}
                    <span className="text-xs sm:text-sm font-bold text-center">{item.label}</span>
                  </button>
                ))}
                <input type="hidden" name="propertyType" value={propType} />
              </div>
            </div>

            {/* ประเภทประกาศ */}
            <div className="space-y-3">
              <label className="text-xs sm:text-sm font-bold text-gray-700">ประเภทประกาศ</label>
              <div className="flex gap-2 bg-[#F8F9FA] p-2 rounded-lg sm:rounded-xl border border-gray-100 flex-wrap sm:flex-nowrap">
                {[
                  { id: "SALE", label: "ขาย" },
                  { id: "RENT", label: "เช่า" },
                  { id: "DOWN", label: "ขายดาวน์" }
                ].map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setListType(type.id)}
                    className={`flex-1 py-1.5 sm:py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-all ${listType === type.id
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                      }`}
                  >
                    {type.label}
                  </button>
                ))}
                <input type="hidden" name="listingType" value={listType} />
              </div>
            </div>

            {/* ตัวเลขรายละเอียด */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-2">
              <div className="space-y-1 sm:space-y-2">
                <label className="text-xs font-bold text-gray-500 text-center block">ห้องนอน</label>
                <input name="bedrooms" placeholder="0" className="w-full p-2 sm:p-3.5 border-2 border-gray-300 rounded-lg sm:rounded-xl text-center outline-none focus:border-[#a51c24] focus:border-2 text-sm sm:text-base transition-all text-gray-900 placeholder:text-gray-400" />
              </div>
              <div className="space-y-1 sm:space-y-2">
                <label className="text-xs font-bold text-gray-500 text-center block">ห้องน้ำ</label>
                <input name="bathrooms" placeholder="0" className="w-full p-2 sm:p-3.5 border-2 border-gray-300 rounded-lg sm:rounded-xl text-center outline-none focus:border-[#a51c24] focus:border-2 text-sm sm:text-base transition-all text-gray-900 placeholder:text-gray-400" />
              </div>
              <div className="space-y-1 sm:space-y-2">
                <label className="text-xs font-bold text-gray-500 text-center block">ขนาด (ตร.ม.)</label>
                <input name="area" placeholder="0" required className="w-full p-2 sm:p-3.5 border-2 border-gray-300 rounded-lg sm:rounded-xl text-center outline-none focus:border-[#a51c24] focus:border-2 text-sm sm:text-base transition-all text-gray-900 placeholder:text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* ส่วนที่ 4: ทำเลที่ตั้ง */}
        <div className="space-y-3 sm:space-y-4">
          <h2 className="flex items-center gap-2 font-bold text-sm sm:text-base lg:text-lg text-gray-900">
            <span className="bg-[#a51c24] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0">4</span>
            ทำเลที่ตั้ง
          </h2>

          <div className="border border-gray-200 rounded-lg sm:rounded-2xl p-4 sm:p-6 lg:p-8 bg-white space-y-4 sm:space-y-5">
            <div className="space-y-3">
              <label className="text-xs sm:text-sm font-bold text-gray-700 flex items-center gap-2">
                <MapPin size={16} className="text-[#a51c24]" />
                ที่อยู่ / ตำแหน่งโครงการ
              </label>
              <textarea
                name="location"
                placeholder="เช่น ซ.สุขุมวิท 101 ตำบลบางจาก อำเภอพระโขนง กรุงเทพ..."
                required
                rows={3}
                className="w-full p-2.5 sm:p-3.5 border-2 border-gray-300 rounded-lg sm:rounded-xl outline-none focus:border-[#a51c24] focus:border-2 text-sm sm:text-base transition-all text-gray-900 placeholder:text-gray-400 resize-none"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Footer Button - ติดขอบล่างพอดีกับขนาดเนื้อหา */}
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 p-3 sm:p-4 z-40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-3 sm:gap-4">
            <button
              type="submit" 
              name="submitAction"
              value="DRAFT"
              disabled={isPending}
              className="flex-1 py-2.5 sm:py-3 lg:py-4 bg-white border-2 border-[#a51c24] text-[#a51c24] font-bold text-sm sm:text-base rounded-lg sm:rounded-xl hover:bg-red-50 transition-all disabled:opacity-50 flex items-center justify-center"
            >
              {isPending ? "กำลังบันทึก..." : "บันทึกเป็นฉบับร่าง"}
            </button>
            <button
              type="submit"
              name="submitAction"
              value="PUBLISH"
              disabled={isPending}
              className="flex-1 py-2.5 sm:py-3 lg:py-4 bg-[#a51c24] text-white font-bold text-sm sm:text-base rounded-lg sm:rounded-xl hover:bg-red-800 transition-all disabled:opacity-50 flex items-center justify-center shadow-md"
            >
              {isPending ? "กำลังเผยแพร่..." : "ยืนยันลงประกาศ"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { updateListing } from "@/lib/actions/listing-actions";
import { Building2, MapPin, BedDouble, ChevronLeft, Coins, Camera, ImagePlus, X } from "lucide-react";

export default function EditListingClient({ listing }: { listing: any }) {
  const router = useRouter();
  const [images, setImages] = useState<string[]>(listing?.images || []);
  const [state, formAction, isPending] = useActionState(updateListing, { message: "" });

  // Debug: ตรวจสอบว่า listing มีค่าไหม
  console.log("EditListingClient received listing:", listing);
  
  if (!listing || !listing.id) {
    return (
      <div className="min-h-screen bg-gray-50 pb-10 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl max-w-md text-center">
          <p className="font-bold mb-2">ไม่พบข้อมูลประกาศ</p>
          <p className="text-sm mb-4">กรุณากลับไปแล้วเลือกประกาศที่ต้องการแก้ไข</p>
          <button onClick={() => router.back()} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
            กลับไป
          </button>
        </div>
      </div>
    );
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });

    e.target.value = ''; 
  };

  const removeImage = (indexToRemove: number) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-10 font-sans">
      {/* Header */}
      <div className="bg-white border-b px-4 py-4 sticky top-0 z-10 flex items-center gap-4">
        <button type="button" onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full">
          <ChevronLeft size={24} className="text-gray-700" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">แก้ไขประกาศ</h1>
      </div>

      <form action={formAction} className="max-w-2xl mx-auto p-4 space-y-6">
        
        {/* ✅ ซ่อน ID ไว้ส่งไปให้ Server (ใส่ ? กันพลาด) */}
        <input type="hidden" name="id" value={listing?.id || ''} />

        {/* แสดง Error Message */}
        {state.message && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-sm">
            {state.message}
          </div>
        )}

        {/* รูปภาพ */}
        <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4">
          <h2 className="flex items-center gap-2 font-bold text-gray-800 mb-4">
            <ImagePlus size={20} className="text-[#a51c24]" /> รูปภาพทรัพย์
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {images.map((img, idx) => (
              <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-gray-200">
                <img src={img} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                <button type="button" onClick={() => removeImage(idx)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600">
                  <X size={14} />
                </button>
                <input type="hidden" name="images" value={img} />
              </div>
            ))}
            <label className="aspect-square rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-[#a51c24] hover:border-[#a51c24] cursor-pointer">
              <Camera size={24} className="mb-1" />
              <span className="text-xs font-bold">เพิ่มรูป</span>
              <input type="file" accept="image/*" multiple onChange={handleImageChange} className="hidden" />
            </label>
          </div>
        </section>

        {/* ข้อมูลทั่วไป */}
        <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4">
          <h2 className="flex items-center gap-2 font-bold text-gray-800 mb-4">
            <Building2 size={20} className="text-[#a51c24]" /> ข้อมูลทั่วไป
          </h2>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-600">ชื่อประกาศ</label>
            {/* ✅ ใส่ ? ให้ค่า defaultValue ทุกจุด */}
            <input name="title" defaultValue={listing?.title || ''} required className="w-full p-4 bg-gray-50 rounded-2xl outline-none text-gray-900" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-600">ราคา (บาท/เดือน)</label>
            <div className="relative">
              <Coins className="absolute left-4 top-4 text-gray-400" size={20} />
              <input name="price" type="number" defaultValue={listing?.price || ''} required className="w-full p-4 pl-12 bg-gray-50 rounded-2xl outline-none text-gray-900" />
            </div>
          </div>
        </section>

        {/* รายละเอียดทรัพย์ */}
        <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="flex items-center gap-2 font-bold text-gray-800 mb-6">
            <BedDouble size={20} className="text-[#a51c24]" /> รายละเอียดภายใน
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase">ห้องนอน</label>
              <input name="beds" type="number" defaultValue={listing?.bedrooms || 1} className="w-full p-4 bg-gray-50 rounded-2xl text-center font-bold outline-none text-gray-900" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase">ห้องน้ำ</label>
              <input name="baths" type="number" defaultValue={listing?.bathrooms || 1} className="w-full p-4 bg-gray-50 rounded-2xl text-center font-bold outline-none text-gray-900" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase">พื้นที่ (ตร.ม.)</label>
              <input name="area" type="number" defaultValue={listing?.size || ''} required className="w-full p-4 bg-gray-50 rounded-2xl text-center font-bold outline-none text-gray-900" />
            </div>
          </div>
        </section>

        {/* ทำเลที่ตั้ง */}
        <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4">
          <h2 className="flex items-center gap-2 font-bold text-gray-800 mb-2">
            <MapPin size={20} className="text-[#a51c24]" /> ทำเลที่ตั้ง
          </h2>
          <textarea name="location" rows={3} defaultValue={listing?.location || ''} required className="w-full p-4 bg-gray-50 rounded-2xl outline-none resize-none text-gray-900"></textarea>
        </section>

        <button type="submit" disabled={isPending} className="w-full py-5 bg-[#a51c24] text-white font-black text-lg rounded-2xl shadow-lg active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed">
          {isPending ? "กำลังบันทึก..." : "บันทึกการแก้ไข"}
        </button>
      </form>
    </div>
  );
}
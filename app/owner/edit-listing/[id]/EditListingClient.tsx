"use client";

import { useState, useActionState } from "react";
import { useRouter } from "next/navigation";
import { updateListing } from "@/lib/actions/listing-actions";
import { Building2, Home, Map, ChevronLeft, Camera, X, Trash2 } from "lucide-react";

// --- Helpers ---
const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });

export default function EditListingClient({ listing }: { listing: any }) {
  const router = useRouter();
  
  const [state, formAction, isPending] = useActionState(updateListing, { message: "" });
  
  const [propType, setPropType] = useState(listing?.propertyType || "CONDO");
  const [listType, setListType] = useState(listing?.listingType || "SALE");
  const [previewImages, setPreviewImages] = useState<{ url: string; file: File }[]>([]);
  const [base64Images, setBase64Images] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>(listing?.images || []);

  // กฎ Hooks: เช็ค listing หลังเรียก Hooks ทั้งหมด
  if (!listing) return <div className="p-10 text-center font-bold">ไม่พบข้อมูล...</div>;

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (!files) return;
    const newImages = Array.from(files).map((file) => ({
      url: URL.createObjectURL(file),
      file,
    }));
    setPreviewImages([...previewImages, ...newImages]);

    // แปลงรูปภาพเป็น base64 ทันที
    const imageDataUrls = await Promise.all(
      newImages.map((img) => fileToBase64(img.file))
    );
    setBase64Images([...base64Images, ...imageDataUrls]);
    
    // Reset input เพื่อให้สามารถเพิ่มรูปเดิมได้อีก
    e.currentTarget.value = "";
  };

  const removeExistingImage = (index: number) => {
    const updated = existingImages.filter((_, i) => i !== index);
    setExistingImages(updated);
  };

  const removePreviewImage = (index: number) => {
    setPreviewImages(previewImages.filter((_, i) => i !== index));
    setBase64Images(base64Images.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen w-full bg-white text-[#2D3139] font-sans pb-32 lg:pb-20">
      <Header onBack={() => router.back()} />

      <form action={formAction} className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-8 sm:space-y-10">
        <input type="hidden" name="id" value={listing.id} />
        <input type="hidden" name="propertyType" value={propType} />
        <input type="hidden" name="listingType" value={listType} />
        {existingImages.map((img, index) => (
          <input key={`existing-${index}`} type="hidden" name="existingImages" value={img} />
        ))}
        {base64Images.map((img, index) => (
          <input key={`new-${index}`} type="hidden" name="images" value={img} />
        ))}

        <StatusMessage message={state.message} />

        <FormSection number={1} title="รูปภาพทรัพย์">
          <ImageSection 
            listingImages={existingImages} 
            previews={previewImages} 
            onImageChange={handleImageChange}
            onRemoveExisting={removeExistingImage}
            onRemovePreview={removePreviewImage}
          />
        </FormSection>

        <FormSection number={2} title="ข้อมูลทั่วไป">
          <PropertyTypePicker value={propType} onChange={setPropType} />
          <ListingTypePicker value={listType} onChange={setListType} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <InputGroup label="ราคา (บาท)" name="price" defaultValue={listing.price} type="number" />
            <InputGroup label="ห้องนอน" name="bedrooms" defaultValue={listing.bedrooms} />
            <InputGroup label="ห้องน้ำ" name="bathrooms" defaultValue={listing.bathrooms} />
            <InputGroup label="ขนาด (ตร.ม.)" name="size" defaultValue={listing.size} type="number" />
          </div>
        </FormSection>

        <FormSection number={3} title="รายละเอียดประกาศ">
          <InputGroup label="หัวข้อประกาศ" name="title" defaultValue={listing.title} placeholder="ระบุหัวข้อประกาศ" />
          <div className="space-y-3">
            <label className="text-sm sm:text-base font-bold text-gray-700">รายละเอียดเพิ่มเติม</label>
            <textarea
              name="description"
              defaultValue={listing.description || ""}
              placeholder="ระบุรายละเอียดประกาศ"
              rows={6}
              className="w-full p-4 sm:p-5 border-2 border-gray-300 rounded-xl outline-none focus:border-[#a51c24] focus:border-2 text-base sm:text-lg transition-all text-gray-900 placeholder:text-gray-400 resize-none"
            />
          </div>
        </FormSection>

        <FormSection number={4} title="ทำเลที่ตั้ง">
          <InputGroup label="สถานที่ / ทำเล" name="location" defaultValue={listing.location} placeholder="ระบุทำเลที่ตั้ง หรือชื่อโครงการ" />
        </FormSection>

        {/* ใช้ isPending จาก useActionState */}
        <Footer isPending={isPending} onCancel={() => router.back()} />
      </form>
    </div>
  );
}

// --- 🧩 ส่วนที่เหลือ (Sub-Components) เหมือนเดิมทุกประการ ---

const Header = ({ onBack }: { onBack: () => void }) => (
  <div className="w-full bg-white border-b border-gray-100 px-4 py-4 sm:py-5 sticky top-0 z-30">
    <div className="max-w-6xl mx-auto flex items-center justify-between">
      <button type="button" onClick={onBack} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
        <ChevronLeft size={28} />
      </button>
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900">แก้ไขประกาศ</h1>
      <div className="w-10"></div>
    </div>
  </div>
);

const FormSection = ({ number, title, children }: any) => (
  <div className="space-y-3 sm:space-y-4">
    <h2 className="flex items-center gap-2 font-bold text-lg sm:text-xl text-gray-900">
      <span className="bg-[#a51c24] text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">{number}</span>
      {title}
    </h2>
    <div className="border border-gray-200 rounded-2xl p-6 sm:p-8 bg-white space-y-6 shadow-sm">
      {children}
    </div>
  </div>
);

const InputGroup = ({ label, ...props }: any) => (
  <div className="space-y-3">
    <label className="text-sm sm:text-base font-bold text-gray-700">{label}</label>
    <input
      {...props}
      className="w-full p-4 sm:p-5 border-2 border-gray-300 rounded-xl outline-none focus:border-[#a51c24] focus:border-2 text-base sm:text-lg text-gray-900 transition-all"
    />
  </div>
);

// Component สำหรับแสดงรูปเก่าที่มีอยู่แล้ว
const ExistingImageCard = ({ imageUrl, index, onRemove }: { imageUrl: string; index: number; onRemove: (i: number) => void }) => (
  <div className="relative aspect-square rounded-lg border-2 border-gray-200 group overflow-hidden">
    <img src={imageUrl} className="w-full h-full object-cover" alt={`รูปเดิม ${index + 1}`} />
    {/* Overlay ทับรูปเมื่อ hover */}
    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
      <button
        type="button"
        onClick={() => onRemove(index)}
        className="bg-red-500 hover:bg-red-600 text-white p-4 rounded-full shadow-xl transition-all transform hover:scale-110"
        title="ลบรูปเดิม"
        aria-label="ลบรูปเดิม"
      >
        <Trash2 size={24} strokeWidth={2} />
      </button>
    </div>
  </div>
);

// Component สำหรับแสดงรูปใหม่ที่เพิ่งเลือก (ยังไม่บันทึก)
const NewImageCard = ({ imageUrl, index, onRemove }: { imageUrl: string; index: number; onRemove: (i: number) => void }) => (
  <div className="relative aspect-square rounded-lg border-2 border-[#a51c24] group overflow-hidden">
    <img src={imageUrl} className="w-full h-full object-cover" alt={`รูปใหม่ ${index + 1}`} />
    {/* Badge แสดงว่าเป็นรูปใหม่ - มุมซ้ายบน */}
    <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg z-10">
      ใหม่
    </div>
    {/* Overlay ทับรูปเมื่อ hover */}
    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
      <button
        type="button"
        onClick={() => onRemove(index)}
        className="bg-red-500 hover:bg-red-600 text-white p-4 rounded-full shadow-xl transition-all transform hover:scale-110"
        title="ลบรูปใหม่"
        aria-label="ลบรูปใหม่"
      >
        <Trash2 size={24} strokeWidth={2} />
      </button>
    </div>
  </div>
);

const ImageSection = ({ listingImages, previews, onImageChange, onRemoveExisting, onRemovePreview }: any) => {
  const totalImages = (listingImages?.length || 0) + (previews?.length || 0);
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm sm:text-base font-bold text-gray-700">จัดการรูปภาพ</label>
        <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-semibold">
          {totalImages} รูป
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {/* แสดงรูปเก่าทั้งหมด */}
        {listingImages?.map((img: string, i: number) => (
          <ExistingImageCard
            key={`existing-${i}`}
            imageUrl={img}
            index={i}
            onRemove={onRemoveExisting}
          />
        ))}
        
        {/* แสดงรูปใหม่ทั้งหมด */}
        {previews?.map((item: any, i: number) => (
          <NewImageCard
            key={`new-${i}`}
            imageUrl={item.url}
            index={i}
            onRemove={onRemovePreview}
          />
        ))}
        
        {/* ปุ่มเพิ่มรูปใหม่ */}
        <label className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:bg-red-50 hover:border-[#a51c24] hover:text-[#a51c24] cursor-pointer transition-all">
          <Camera size={32} strokeWidth={1.5} />
          <span className="text-xs sm:text-sm font-bold mt-2">เพิ่มรูป</span>
          <input type="file" multiple accept="image/*" onChange={onImageChange} className="hidden" />
        </label>
      </div>
    </div>
  );
};

const PropertyTypePicker = ({ value, onChange }: any) => (
  <div className="space-y-3">
    <label className="text-sm sm:text-base font-bold text-gray-700">ประเภทอสังหาริมทรัพย์</label>
    <div className="grid grid-cols-3 gap-3">
      {[
        { id: "CONDO", label: "คอนโด", icon: Building2 },
        { id: "HOUSE", label: "บ้าน", icon: Home },
        { id: "LAND", label: "ที่ดิน", icon: Map },
      ].map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onChange(item.id)}
          className={`flex flex-col items-center gap-2 py-5 sm:py-6 rounded-xl border-2 transition-all ${
            value === item.id ? "border-[#a51c24] bg-red-50 text-[#a51c24]" : "border-gray-100 bg-white text-gray-400"
          }`}
        >
          <item.icon size={28} />
          <span className="text-sm sm:text-base font-bold">{item.label}</span>
        </button>
      ))}
    </div>
  </div>
);

const ListingTypePicker = ({ value, onChange }: any) => (
  <div className="space-y-3">
    <label className="text-sm sm:text-base font-bold text-gray-700">ประเภทประกาศ</label>
    <div className="flex gap-2 bg-gray-50 p-2 rounded-xl border border-gray-100 shadow-inner">
      {["SALE", "RENT", "DOWN"].map((id) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          className={`flex-1 py-3 sm:py-3.5 text-base sm:text-lg font-bold rounded-lg transition-all ${
            value === id ? "bg-white text-gray-900 shadow-md" : "text-gray-400 hover:text-gray-600"
          }`}
        >
          {id === "SALE" ? "ขาย" : id === "RENT" ? "เช่า" : "ขายดาวน์"}
        </button>
      ))}
    </div>
  </div>
);

const StatusMessage = ({ message }: { message: string }) => {
  if (!message) return null;
  const isSuccess = message.includes("สำเร็จ") || message.includes("บันทึก");
  return (
    <div className={`p-4 sm:p-5 rounded-xl text-base sm:text-lg font-bold border-2 ${isSuccess ? "bg-green-50 text-green-700 border-green-100" : "bg-red-50 text-red-700 border-red-100"}`}>
      {message}
    </div>
  );
};

const Footer = ({ isPending, onCancel }: any) => (
  <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-gray-100 p-3 sm:p-4 z-40 shadow-lg">
    <div className="max-w-6xl mx-auto flex gap-3 sm:gap-4">
      <button 
        type="button" 
        onClick={onCancel}
        className="flex-1 py-4 sm:py-5 border-2 border-gray-200 text-gray-600 text-base sm:text-lg font-bold rounded-xl hover:bg-gray-50 transition-all"
      >
        ยกเลิก
      </button>
      <button
        type="submit"
        disabled={isPending}
        className="flex-1 py-4 sm:py-5 bg-[#a51c24] text-white text-base sm:text-lg font-bold rounded-xl hover:bg-red-800 transition-all disabled:opacity-50 flex items-center justify-center shadow-lg shadow-red-100"
      >
        {isPending ? (
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>กำลังบันทึก...</span>
          </div>
        ) : "บันทึกการแก้ไข"}
      </button>
    </div>
  </div>  
);
"use client";

import { useState } from "react";
import { ImageIcon, X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // ป้องกัน Error ถ้าไม่มีรูป
  if (!images || images.length === 0) return null;

  // ฟังก์ชันเลื่อนรูปสำหรับมือถือ
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation(); // ป้องกันไม่ให้ทะลุไปกดเปิด Modal ค้าง
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <>
      {/* 📱 ส่วนที่ 1: มุมมองมือถือ (Mobile Slider) */}
      {/* จะแสดงเฉพาะจอมือถือ (md:hidden) */}
      <div className="md:hidden relative w-full h-[300px] mb-8 rounded-2xl overflow-hidden group shadow-sm">
        {/* รูปหลักที่กำลังแสดงอยู่ (กดที่รูปเพื่อเปิดดูรูปทั้งหมดได้) */}
        <div onClick={() => setIsOpen(true)} className="w-full h-full cursor-pointer">
          <img 
            src={images[currentIndex]} 
            alt={`${title} - image ${currentIndex + 1}`} 
            className="w-full h-full object-cover transition-transform duration-500"
          />
        </div>
        
        {/* ปุ่มลูกศรซ้าย-ขวา (โชว์เมื่อมีรูปมากกว่า 1 รูป) */}
        {images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full text-gray-900 shadow-md transition-all active:scale-95 z-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full text-gray-900 shadow-md transition-all active:scale-95 z-10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            
            {/* ป้ายบอกจำนวนรูปภาพมุมขวาล่าง (เช่น 1 / 5) */}
            <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-md z-10 shadow-sm">
              {currentIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {/* 💻 ส่วนที่ 2: มุมมองคอมพิวเตอร์ (Desktop Grid) */}
      {/* จะซ่อนในมือถือ และแสดงเมื่อจอใหญ่ขึ้นไป (hidden md:grid) */}
      <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-3 h-[480px] mb-12 rounded-3xl overflow-hidden shadow-sm">
        {/* รูปหลัก (ซ้าย) */}
        <div className="col-span-2 row-span-2 h-full cursor-pointer" onClick={() => setIsOpen(true)}>
          <img src={images[0]} alt={title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
        </div>

        {/* รูปเล็ก 1-3 */}
        <div className="col-span-1 row-span-1 h-full bg-gray-100 cursor-pointer" onClick={() => setIsOpen(true)}>
          {images[1] && <img src={images[1]} alt="Gallery" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />}
        </div>
        <div className="col-span-1 row-span-1 h-full bg-gray-100 cursor-pointer" onClick={() => setIsOpen(true)}>
           {images[2] && <img src={images[2]} alt="Gallery" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />}
        </div>
        <div className="col-span-1 row-span-1 h-full bg-gray-100 cursor-pointer" onClick={() => setIsOpen(true)}>
           {images[3] && <img src={images[3]} alt="Gallery" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />}
        </div>

        {/* รูปเล็ก 4 + ปุ่มดูรูปทั้งหมด */}
        <div className="col-span-1 row-span-1 h-full relative group cursor-pointer overflow-hidden bg-gray-100" onClick={() => setIsOpen(true)}>
           {images[4] && <img src={images[4]} alt="Gallery" className="w-full h-full object-cover brightness-[0.6] group-hover:scale-105 transition-transform duration-500" />}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex items-center gap-2 text-white font-medium border-2 border-white px-5 py-2.5 rounded-full backdrop-blur-sm group-hover:bg-white/20 transition-colors shadow-sm">
              <ImageIcon className="w-4 h-4" /> ดูรูปทั้งหมด
            </span>
          </div>
        </div>
      </div>

      {/* 🎬 ส่วนที่ 3: Modal Pop-up (โรงหนังดูรูปขนาดใหญ่) */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/95 z-50 overflow-y-auto backdrop-blur-sm">
          {/* ปุ่มปิด */}
          <button 
            onClick={() => setIsOpen(false)} 
            className="fixed top-4 right-4 md:top-6 md:right-6 z-50 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-md transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* กล่องใส่รูปทั้งหมด เลื่อนลงได้เรื่อยๆ */}
          <div className="max-w-4xl mx-auto py-16 md:py-20 px-4 flex flex-col gap-6 md:gap-8">
            <h2 className="text-white text-xl md:text-2xl font-bold mb-2 text-center">{title}</h2>
            {images.map((img, index) => (
              <div key={index} className="relative w-full rounded-2xl overflow-hidden bg-gray-900">
                <img 
                  src={img} 
                  alt={`${title} - image ${index + 1}`} 
                  className="w-full h-auto" 
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
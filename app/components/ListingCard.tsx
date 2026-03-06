"use client"; 

import { useState } from 'react';
import { Heart, EyeOff, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface ListingProps {
  id: string | number;
  title: string;
  price: string;
  location: string;
  specs: string;
  images: string[];
  verified?: boolean;
  pricePerSqm?: string;
}

export function ListingCard({
  id,
  title,
  price,
  location,
  specs,
  images,
  verified = false,
  pricePerSqm
}: ListingProps) {
  // 🌟 State เก็บตำแหน่งของรูปภาพปัจจุบัน (เริ่มต้นที่ 0 คือรูปแรก)
  const [currentIndex, setCurrentIndex] = useState(0);

  // ฟังก์ชันเลื่อนไปรูปถัดไป
  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault(); // ป้องกันไม่ให้คลิกปุ่มแล้วเด้งเปลี่ยนหน้า
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // ฟังก์ชันย้อนกลับรูปก่อนหน้า
  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // ฟังก์ชันกดเลือกจุดไข่ปลา
  const goToImage = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    setCurrentIndex(index);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4 group/card hover:shadow-lg transition-all duration-300">
      {/* Header / Agent Name */}
      <div className="px-4 py-3 flex items-center gap-2 border-b border-gray-50">
        <span className="font-medium text-sm text-gray-900">สุริยา เบียดนอก</span>
        {verified && <CheckCircle2 className="h-4 w-4 text-green-500" fill="currentColor" stroke="white" />}
      </div>

      {/* Image Container */}
      <div className="relative aspect-[4/3] bg-gray-100 group">
        <Link href={`/property/${id}`} className="block w-full h-full relative overflow-hidden">
          {/* 🌟 แสดงรูปภาพตาม currentIndex */}
          <img
            src={images[currentIndex]}
            alt={`${title} - image ${currentIndex + 1}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>

        {/* 🌟 ปุ่มเลื่อนซ้าย-ขวา (จะโชว์เฉพาะเวลามีรูปมากกว่า 1 รูป และเอาเมาส์ชี้ไปที่รูป) */}
        {images && images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/80 rounded-full hover:bg-white text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm z-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/80 rounded-full hover:bg-white text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm z-10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Overlay Icons */}
        <div className="absolute top-3 right-3 flex gap-2">
          <button className="p-1.5 bg-black/30 rounded-full hover:bg-black/50 backdrop-blur-sm z-10">
            <EyeOff className="h-4 w-4 text-white" />
          </button>
          <button className="p-1.5 bg-black/30 rounded-full hover:bg-black/50 backdrop-blur-sm z-10">
            <Heart className="h-4 w-4 text-white" />
          </button>
        </div>

        {/* 🌟 จุดไข่ปลา (Carousel Dots) */}
        {images && images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => goToImage(e, i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentIndex ? 'bg-white w-4' : 'bg-white/50 w-1.5 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-baseline gap-2 mb-2">
          <h3 className="text-xl font-black text-[#a51c24]">{price} <span className="text-xs font-normal text-gray-500">/เดือน</span></h3>
          <span className="text-xs text-gray-400">{pricePerSqm}</span>
        </div>

        <Link href={`/property/${id}`}>
          <h4 className="font-bold text-gray-900 mb-1 hover:text-[#a51c24] transition-colors line-clamp-1">{title}</h4>
        </Link>
        <p className="text-sm font-medium text-gray-500 mb-3 line-clamp-1">{location}</p>

        <div className="text-sm text-gray-600 mb-4">
          <span className="bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600">
            {specs}
          </span>
        </div>

        <Link href={`/property/${id}`} className="w-full py-2.5 rounded-xl border border-gray-200 font-bold text-sm hover:bg-gray-50 hover:border-gray-300 flex items-center justify-center gap-2 text-gray-700 transition-all shadow-sm">
          รายละเอียด
        </Link>
      </div>
    </div>
  );
}
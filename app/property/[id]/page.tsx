// app/property/[id]/page.tsx
import { Header } from "@/app/components/Header";
import { ChevronRight, MapPin, BedDouble, Bath, Ruler, Building2 } from "lucide-react";
import Link from "next/link";
import { ImageGallery } from "@/app/components/ImageGallery";
import prisma from "@/lib/prisma"; // ✅ 1. นำเข้า Prisma

export default async function PropertyDetail({ params }: { params: Promise<{ id: string }> }) {
  
  const resolvedParams = await params;
  const currentId = resolvedParams.id;

  // ✅ 2. ดึงข้อมูลจาก Database โดยตรงแทนการใช้ RECOMMENDED_LISTINGS
  const property = await prisma.listing.findUnique({
    where: { id: currentId },
    include: { owner: true } // ถ้าอยากโชว์ข้อมูลผู้ลงประกาศด้วย
  });

  if (!property) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">ไม่พบข้อมูลอสังหาฯ ที่คุณค้นหา</h1>
          <Link href="/" className="text-red-600 hover:underline font-medium">กลับไปหน้าแรก</Link>
        </div>
      </div>
    );
  }

  // ✅ 3. ไม่ต้องใช้ regex แล้ว เพราะใน DB เราเก็บแยกฟิลด์ไว้ชัดเจน (size, bedrooms, bathrooms)
  const pricePerSqm = property.size 
    ? `฿${Math.round(property.price / property.size).toLocaleString()}/ตร.ม.` 
    : '';

  return (
    <div className="min-h-screen bg-white pb-20">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-gray-900 transition-colors">หน้าแรก</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-red-600 font-medium cursor-default">{property.title}</span>
        </div>

        {/* Title & Price */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{property.title}</h1>
            <div className="flex items-center gap-2 text-gray-500">
              <MapPin className="w-5 h-5 text-red-600" />
              <span className="text-base">{property.location}</span>
            </div>
          </div>
          <div className="text-left md:text-right shrink-0">
            <div className="text-4xl font-bold text-red-600">
              ฿{property.price.toLocaleString()} <span className="text-lg font-normal text-gray-500">/เดือน</span>
            </div>
            <div className="text-sm text-gray-400 mt-2">
              {pricePerSqm}
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <ImageGallery images={property.images} title={property.title} />

        {/* Overview Bar */}
        <div className="mb-12 mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">ภาพรวมอสังหาฯ</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200 border-y border-gray-200 py-6">
            <div className="flex flex-col items-center justify-center gap-2 p-2">
              <BedDouble className="w-7 h-7 text-red-600" />
              <div className="font-bold text-gray-900 text-xl">{property.bedrooms}</div>
              <div className="text-sm text-gray-500">ห้องนอน</div>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 p-2">
              <Bath className="w-7 h-7 text-red-600" />
              <div className="font-bold text-gray-900 text-xl">{property.bathrooms}</div>
              <div className="text-sm text-gray-500">ห้องน้ำ</div>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 p-2">
              <Ruler className="w-7 h-7 text-red-600" />
              <div className="font-bold text-gray-900 text-xl">{property.size}</div>
              <div className="text-sm text-gray-500">ตร.ม.</div>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 p-2">
              <Building2 className="w-7 h-7 text-red-600" />
              <div className="font-bold text-gray-900 text-xl capitalize">{property.propertyType}</div>
              <div className="text-sm text-gray-500">ประเภท</div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-12 text-gray-600 leading-relaxed whitespace-pre-line">
          <h2 className="text-xl font-bold text-gray-900 mb-4">รายละเอียด</h2>
          <p>{property.description}</p>
        </div>

        {/* Amenities & Highlights */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-7 bg-red-600 rounded-full"></div>
            <h2 className="text-xl font-bold text-gray-900">สิ่งอำนวยความสะดวก & จุดเด่น</h2>
          </div>
          
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 px-2">
            {property.amenities.map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-700">
                <div className="min-w-2 w-2 h-2 rounded-full bg-red-600"></div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  ); 
}
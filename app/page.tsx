import { Header } from "@/app/components/Header";
import { Hero } from "@/app/components/Hero";
import { SearchBar } from "@/app/components/SearchBar";
import { ListingCard } from "@/app/components/ListingCard";
import prisma from "../lib/prisma";

export const dynamic = 'force-dynamic';

export default async function Home() {
  // 1. ✅ เพิ่ม where: { status: "AVAILABLE" } เพื่อซ่อนฉบับร่าง
  const dbListings = await prisma.listing.findMany({
    where: {
      status: "AVAILABLE" 
    },
    orderBy: { createdAt: 'desc' },
    take: 6,
  });

  const formattedListings = dbListings.map((listing: any) => {
    const pricePerSqm = listing.size 
      ? `฿${Math.round(listing.price / listing.size).toLocaleString()}/ตร.ม.` 
      : '';

    return {
      id: listing.id,
      title: listing.title || 'ไม่มีหัวข้อ',
      price: `฿${listing.price.toLocaleString()}`,
      pricePerSqm: pricePerSqm,
      location: listing.location || 'ไม่ระบุทำเล',
      
      // 2. ✅ แก้จาก listing.bedroom เป็น listing.bedrooms ให้ตรงกับ schema
      specs: `${listing.size || 0} ตร.ม. • ${listing.bedrooms || 'ไม่ระบุ'} ห้องนอน`, 
      
      // 3. ✅ แก้การดึงรูปภาพ เพราะใน schema เราตั้งชื่อว่า images และเก็บเป็น Array
      images: listing.images && listing.images.length > 0 
        ? [listing.images[0]] 
        : ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800"],
      verified: true,
    };
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      <Hero />
      <SearchBar />

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">ประกาศแนะนำ</h2>
        
        {/* ตรวจสอบว่ามีข้อมูลไหม ถ้ามีให้แสดงการ์ด ถ้าไม่มีให้ขึ้นข้อความ */}
        {formattedListings.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {formattedListings.map((listing: any) => (
              <ListingCard 
                key={listing.id}
                {...listing} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
            <p className="text-gray-500 font-medium">ยังไม่มีประกาศในระบบ ณ ขณะนี้</p>
          </div>
        )}
      </main>
    </div>
  );
}
// components/Map.tsx
"use client";

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Navigation } from 'lucide-react';
import { OpenStreetMapProvider } from 'leaflet-geosearch'; // 1. เพิ่มตัวค้นหา

// Icon หมุด
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// 2. Component พิเศษสำหรับจัดการการค้นหา (Logic อยู่ตรงนี้)
function SearchController({ query }: { query: string }) {
  const map = useMap();

  useEffect(() => {
    if (!query) return;

    const provider = new OpenStreetMapProvider();

    const handleSearch = async () => {
      // ค้นหาพิกัดจากชื่อ
      const results = await provider.search({ query: query });

      if (results && results.length > 0) {
        const { x, y, label } = results[0]; // เอาผลลัพธ์แรกที่เจอ
        const lat = y;
        const lng = x;

        // บินไปที่จุดนั้น
        map.flyTo([lat, lng], 16, { duration: 1.5 });

        // ปักหมุดชั่วคราว
        L.marker([lat, lng], { icon })
          .addTo(map)
          .bindPopup(`<b>เจอแล้ว!</b><br/>${label}`)
          .openPopup();
      } else {
        alert("ไม่พบสถานที่นี้ครับ ลองระบุให้ชัดเจนขึ้น เช่น 'สยามพารากอน กรุงเทพ'");
      }
    };

    handleSearch();
  }, [query, map]); // ทำงานเมื่อ query เปลี่ยน

  return null; // Component นี้ไม่มีหน้าตา แค่ทำงานเบื้องหลัง
}

function LocationButton() {
  const map = useMap();
  const handleLocate = () => {
    map.locate().on("locationfound", function (e) {
      map.flyTo(e.latlng, 16);
      L.marker(e.latlng, { icon }).addTo(map).bindPopup("คุณอยู่ที่นี่!").openPopup();
    });
  };
  return (
    <button onClick={handleLocate} className="absolute bottom-24 right-4 z-[1000] bg-white p-3 rounded-full shadow-lg border border-gray-200 text-[#dc2626] hover:bg-gray-50 active:scale-95 transition">
      <Navigation className="w-6 h-6" fill="currentColor" />
    </button>
  );
}

// 3. รับ Prop `searchQuery` เข้ามา
export default function Map({ searchQuery }: { searchQuery?: string }) {
  return (
    <div className="w-full h-full relative">
      <MapContainer center={[13.7563, 100.5018]} zoom={12} scrollWheelZoom={true} className="w-full h-full z-0">
        
        {/* ใช้ธีม CartoDB Light สวยๆ */}
        <TileLayer
          attribution='&copy; CARTO'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {/* ใส่ Controller ค้นหาลงไปในแมพ */}
        <SearchController query={searchQuery || ""} />

        <LocationButton />
      </MapContainer>
    </div>
  );
}
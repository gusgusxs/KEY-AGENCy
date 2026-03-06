"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Search, Filter, MapPin } from 'lucide-react';
import AgentBottomNav from '@/app/components/AgentBottomNav';

const Map = dynamic(() => import('../../components/Map'), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">กำลังโหลดแผนที่...</div>
});

export default function AgentExplore() {
  const [searchText, setSearchText] = useState(""); 
  const [suggestions, setSuggestions] = useState<any[]>([]); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // ฟังก์ชันดึงข้อมูลจาก Nominatim (OpenStreetMap ออริจินัล)
  useEffect(() => {
    if (searchText.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchText)}&countrycodes=th&limit=5`);
        if (!res.ok) throw new Error("Network response was not ok");
        
        const data = await res.json();
        setSuggestions(data || []);
        setIsDropdownOpen(true);
      } catch (error) {
        console.error("ค้นหาล้มเหลว", error);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 500);
    return () => clearTimeout(timeoutId);
  }, [searchText]);

  const handleSelectPlace = (place: any) => {
    const shortName = place.name || place.display_name.split(',')[0];
    setSearchText(shortName); 
    setSearchQuery(place.display_name); 
    setIsDropdownOpen(false); 
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col font-sans text-slate-800 overflow-hidden">
      
      {/* Header + Auto-complete Search */}
      <div className="absolute top-0 left-0 w-full z-20 px-4 pt-8 pb-2 pointer-events-none">
        <div className="bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-gray-100 flex gap-2 pointer-events-auto relative">
             <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                    type="text" 
                    placeholder="ค้นหาสถานที่ (เช่น สยาม, อโศก)..." 
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />

                {/* Dropdown แสดงผลการค้นหา */}
                {isDropdownOpen && suggestions.length > 0 && (
                  <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                    {suggestions.map((item, index) => {
                      const shortName = item.name || item.display_name.split(',')[0];
                      return (
                        <button 
                          key={index}
                          onClick={() => handleSelectPlace(item)}
                          className="w-full text-left px-4 py-3 hover:bg-red-50 border-b border-gray-50 flex items-start gap-2 active:bg-red-100 transition"
                        >
                          <MapPin className="w-4 h-4 text-[#dc2626] mt-0.5 shrink-0" />
                          <div>
                            <p className="text-sm font-bold text-slate-800">{shortName}</p>
                            <p className="text-[10px] text-gray-400 line-clamp-1">
                              {item.display_name}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
            </div>
            <button className="p-2 bg-white border border-gray-200 rounded-xl text-gray-500 hover:text-[#dc2626]">
                <Filter className="w-5 h-5" />
            </button>
        </div>
      </div>

      {/* Map Section */}
      <div className="flex-1 w-full h-full relative z-0">
         <Map searchQuery={searchQuery} />
      </div>

      <AgentBottomNav />

    </div>
  );
}
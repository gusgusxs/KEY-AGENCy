import { Search, MapPin, SlidersHorizontal, Building2, TicketCheck, Bookmark, ChevronDown } from 'lucide-react';  
import { cn } from '@/lib/utils';  
  
export function SearchBar() {  
  return (  
    <div className="sticky top-[72px] z-40 bg-white/95 backdrop-blur-sm shadow-sm pb-4 pt-2">  
      <div className="container mx-auto px-4 space-y-4">  
        {/* Search Input Row */}  
        <div className="flex items-center gap-3">  
          <div className="relative flex-1 group">  
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">  
              <Search className="h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />  
            </div>  
            <input  
              type="text"  
              placeholder="ค้นหา ทำเล, ชื่อคอนโด..."  
              className="block w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all shadow-sm text-sm"  
            />  
          </div>  
          <button className="p-3 rounded-2xl border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm group">  
            <Bookmark className="h-5 w-5 text-gray-400 group-hover:text-red-500 transition-colors" />  
            <span className="sr-only">Saved</span>  
          </button>  
        </div>  
  
        {/* Filter Chips Row */}  
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 mask-linear-fade">  
          <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white whitespace-nowrap text-sm font-semibold text-gray-700 hover:border-red-200 hover:bg-red-50 transition-all shadow-sm active:scale-95">  
            <SlidersHorizontal className="h-4 w-4" />  
            ตัวกรอง  
            <span className="flex items-center justify-center bg-red-600 text-white text-[10px] h-5 w-5 rounded-full ml-1 font-bold">1</span>  
          </button>  
  
          <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white whitespace-nowrap text-sm font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-all shadow-sm active:scale-95">  
            <Building2 className="h-4 w-4" />  
            คอนโด  
          </button>  
  
          <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white whitespace-nowrap text-sm font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-all shadow-sm active:scale-95">  
            <TicketCheck className="h-4 w-4" />  
            ราคา  
          </button>  
  
          <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white whitespace-nowrap text-sm font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-all shadow-sm active:scale-95">  
            <MapPin className="h-4 w-4" />  
            แผนที่  
          </button>  
        </div>  
  
        {/* Results Count & Sort */}  
        <div className="flex items-center justify-between px-1">  
          <p className="text-sm font-medium text-gray-500">  
            พบ <span className="text-gray-900 font-bold">46</span> รายการใน <span className="text-gray-900 font-bold">ขอนแก่น</span>  
          </p>  
          <button className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900">  
            เรียงตาม  
            <ChevronDown className="h-4 w-4" />  
          </button>  
        </div>  
      </div>  
    </div>  
  );  
}
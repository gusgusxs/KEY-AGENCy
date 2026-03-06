import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from 'next/link';
import AgentBottomNav from '@/app/components/AgentBottomNav'; 
import {
  Bell, Building2, Users, DollarSign, Briefcase
} from 'lucide-react';

export default async function AgentDashboard() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const user = session.user as any;

  if (user.role !== "AGENT") {
    await prisma.user.update({
      where: { id: user.id },
      data: { role: "AGENT" },
    });
  }

  // 3. (Optional)
  const unitCount = await prisma.listing.count({ where: { ownerId: user.id } });

  return (
    <div className="min-h-screen bg-gray-50 pb-24 font-sans text-slate-800">

      {/* --- Header --- */}
      <header className="flex justify-between items-center px-6 pt-8 pb-4 bg-white sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#dc2626] rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <span className="text-xl font-bold text-[#dc2626]">KEY Agent</span>
        </div>

        <div className="flex items-center gap-3">
          <button className="relative p-2 hover:bg-gray-100 rounded-full transition">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute top-1.5 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          
          {/* ✅ ใช้รูปจริงจาก LINE */}
          <div className="w-9 h-9 bg-gray-200 rounded-full overflow-hidden border border-gray-100">
            <img 
              src={user.image || "https://api.dicebear.com/7.x/avataaars/svg?seed=fallback"} 
              alt="Agent Profile" 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>
      </header>

      {/* --- Greeting Section --- */}
      <div className="px-6 py-6">
        <h1 className="text-2xl font-bold text-slate-800 mb-1">สวัสดี, คุณ{user.name}</h1>
        <p className="text-gray-500 text-sm">ยินดีต้อนรับเข้าสู่ระบบนายหน้า พร้อมลุยงานวันนี้หรือยัง?</p>
      </div>

      {/* --- Menu Grid --- */}
      <div className="px-6 grid grid-cols-2 gap-4">

        {/* 1. ค้นหาห้อง */}
        <Link href="/agent/units" className="h-full">
          <MenuCard
            icon={<Building2 className="w-6 h-6 text-[#dc2626]" />}
            title="ทรัพย์ในระบบ"
            subtitle={`${unitCount} รายการที่ดูแล`}
          />
        </Link>

        {/* 2. ดีลของฉัน */}
        <Link href="/agent/deals" className="h-full">
          <MenuCard
            icon={<Briefcase className="w-6 h-6 text-[#dc2626]" />}
            title="ดีลของฉัน"
            subtitle="ติดตามสถานะปิดการขาย"
          />
        </Link>

        {/* 3. ทีมของฉัน */}
        <Link href="/agent/team" className="h-full">
          <MenuCard
            icon={<Users className="w-6 h-6 text-[#dc2626]" />}
            title="ทีมของฉัน"
            subtitle="ดูผลงานทีมงาน"
          />
        </Link>

        {/* 4. รายได้ */}
        <Link href="/agent/income" className="h-full">
          <MenuCard
            icon={<DollarSign className="w-6 h-6 text-[#dc2626]" />}
            title="รายได้"
            subtitle="สรุปค่าคอมมิชชั่น"
          />
        </Link>

      </div>

      <AgentBottomNav />

    </div>
  );
}

// --- Sub Component: Menu Card ---
function MenuCard({ icon, title, subtitle }: { icon: React.ReactNode, title: string, subtitle: string }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-start hover:shadow-md transition active:scale-95 text-left h-full w-full cursor-pointer">
      <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-base font-bold text-slate-800 mb-1">{title}</h3>
      <p className="text-xs text-gray-400">{subtitle}</p>
    </div>
  )
}
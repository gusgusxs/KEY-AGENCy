"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, User, Smartphone, FileText, Mail } from "lucide-react";
import { updateProfileDetails } from "@/lib/actions/edituser-actions";

export default function EditProfileClient({ user }: { user: any }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleFormSubmit = (formData: FormData) => {
        startTransition(async () => {
            const result = await updateProfileDetails(formData);

            if (result.success) {
                alert("บันทึกข้อมูลส่วนตัวเรียบร้อยแล้ว!");
                router.push("/owner/profile"); // เซฟเสร็จแล้วเด้งกลับหน้าโปรไฟล์
            } else {
                alert(result.error || "เกิดข้อผิดพลาดในการบันทึก");
            }
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20 font-sans text-slate-800">

            {/* Header */}
            <div className="w-full bg-white border-b border-gray-100 px-4 py-4 sticky top-0 z-30 flex items-center justify-between shadow-sm">
                <button type="button" onClick={() => router.back()} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                    <ChevronLeft size={24} />
                </button>
                <h1 className="text-lg font-bold">แก้ไขข้อมูลส่วนตัว</h1>
                <div className="w-10"></div> {/* Spacer ดันให้ตัวหนังสืออยู่ตรงกลาง */}
            </div>

            <form action={handleFormSubmit} className="max-w-3xl mx-auto px-4 mt-6 space-y-6">

                {/* 1. ข้อมูลพื้นฐาน */}
                <section className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 space-y-4">
                    <h2 className="text-sm font-bold text-[#a51c24] flex items-center gap-2 mb-2">
                        <User className="w-4 h-4" /> ข้อมูลพื้นฐาน
                    </h2>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-600 ml-1">ชื่อ - นามสกุล (หรือชื่อนามแฝง)</label>
                        <input
                            type="text"
                            name="name"
                            defaultValue={user?.name || ""}
                            placeholder="ระบุชื่อของคุณ"
                            className="w-full p-3.5 bg-gray-50 border-2 border-transparent focus:border-[#a51c24] rounded-xl outline-none transition-all text-sm font-medium"
                            required
                        />
                    </div>

                    {/* ✅ แก้ไขตรงนี้: ทำให้ช่องอีเมลพิมพ์แก้ไขได้ */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-600 ml-1">อีเมลติดต่อ</label>
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <Mail className="w-4 h-4" />
                            </div>
                            <input
                                type="email"
                                name="email"
                                defaultValue={user?.email || ""}
                                placeholder="ระบุอีเมลของคุณ"
                                className="w-full p-3.5 pl-10 bg-gray-50 border-2 border-transparent focus:border-[#a51c24] rounded-xl outline-none transition-all text-sm font-medium"
                                required
                            />
                        </div>
                    </div>
                </section>

                {/* 2. ช่องทางการติดต่อ */}
                <section className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 space-y-4">
                    <h2 className="text-sm font-bold text-[#a51c24] flex items-center gap-2 mb-2">
                        <Smartphone className="w-4 h-4" /> ช่องทางการติดต่อ
                    </h2>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-600 ml-1">เบอร์โทรศัพท์</label>
                        <input
                            type="tel"
                            name="phone"
                            defaultValue={user?.phone || ""}
                            placeholder="08x-xxx-xxxx"
                            className="w-full p-3.5 bg-gray-50 border-2 border-transparent focus:border-[#a51c24] rounded-xl outline-none transition-all text-sm font-medium"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-600 ml-1">LINE ID</label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#06C755] rounded-full flex items-center justify-center text-white font-bold text-[10px]">L</div>
                                <input
                                    type="text"
                                    name="lineId"
                                    defaultValue={user?.lineId || ""}
                                    placeholder="LINE ID ของคุณ"
                                    className="w-full p-3.5 pl-12 bg-gray-50 border-2 border-transparent focus:border-[#06C755] rounded-xl outline-none transition-all text-sm font-medium"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-600 ml-1">WhatsApp</label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#25D366] rounded-full flex items-center justify-center text-white font-bold text-[10px]">W</div>
                                <input
                                    type="text"
                                    name="whatsapp"
                                    defaultValue={user?.whatsapp || ""}
                                    placeholder="เบอร์ WhatsApp"
                                    className="w-full p-3.5 pl-12 bg-gray-50 border-2 border-transparent focus:border-[#25D366] rounded-xl outline-none transition-all text-sm font-medium"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. แนะนำตัว (Bio) */}
                <section className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 space-y-4">
                    <h2 className="text-sm font-bold text-[#a51c24] flex items-center gap-2 mb-2">
                        <FileText className="w-4 h-4" /> แนะนำตัว
                    </h2>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-600 ml-1">ข้อความแนะนำตัว (แสดงที่หน้าประกาศ)</label>
                        <textarea
                            name="bio"
                            defaultValue={user?.bio || ""}
                            placeholder="เช่น: นักลงทุนอสังหาฯ ยินดีรับ Co-agent สนใจติดต่อได้ตลอด 24 ชม. ครับ"
                            rows={4}
                            className="w-full p-3.5 bg-gray-50 border-2 border-transparent focus:border-[#a51c24] rounded-xl outline-none transition-all text-sm resize-none font-medium"
                        />
                    </div>
                </section>

                {/* ปุ่มบันทึก */}
                <div className="pt-4 pb-10">
                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-[#a51c24] text-white py-4 rounded-2xl text-base font-bold shadow-lg shadow-red-100 hover:bg-red-800 active:scale-95 transition-all disabled:opacity-50 flex justify-center items-center gap-2"
                    >
                        {isPending ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                กำลังบันทึกข้อมูล...
                            </>
                        ) : "บันทึกการแก้ไข"}
                    </button>
                </div>

            </form>
        </div>
    );
}
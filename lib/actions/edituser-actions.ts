"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; 
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

async function requireAuth() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user || !(session.user as any).id) {
    throw new Error("Unauthorized: กรุณาเข้าสู่ระบบ");
  }
  
  return (session.user as any).id as string;
}

export async function updateProfileDetails(formData: FormData) {
  try {
    const userId = await requireAuth();
    
    // ดึงข้อมูลจากฟอร์มที่ส่งมา
    const name = formData.get("name") as string;
    const email = formData.get("email") as string; // ✅ ดึงค่าอีเมลมาด้วย
    const phone = formData.get("phone") as string;
    const lineId = formData.get("lineId") as string;
    const whatsapp = formData.get("whatsapp") as string;
    const bio = formData.get("bio") as string;

    // เช็คกรณีเปลี่ยนอีเมล (ห้ามซ้ำกับคนอื่น)
    if (email) {
      const existingUser = await prisma.user.findFirst({
        where: { email: email, id: { not: userId } }
      });
      if (existingUser) {
        return { error: "อีเมลนี้มีผู้ใช้งานแล้ว โปรดใช้อีเมลอื่น" };
      }
    }

    // อัปเดตลง Database
    await prisma.user.update({
      where: { id: userId },
      data: { 
        name, 
        email, // ✅ สั่งบันทึกอีเมล
        phone, 
        lineId, 
        whatsapp, 
        bio 
      },
    });

    // รีเฟรชหน้าเว็บ
    revalidatePath("/owner/profile");
    revalidatePath("/owner/profile/edit");
    
    return { success: true };
  } catch (error) {
    console.error("Error updating profile details:", error);
    return { error: "ไม่สามารถอัปเดตข้อมูลได้ โปรดลองอีกครั้ง" };
  }
}
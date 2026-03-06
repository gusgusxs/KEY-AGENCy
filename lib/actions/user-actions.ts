"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; 
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";
import { writeFile } from "fs/promises";

// ฟังก์ชัน Helper เช็คสิทธิ์ผู้ใช้ (ป้องกันคนอื่นแอบยิง API)
async function requireAuth() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user || !(session.user as any).id) {
    throw new Error("Unauthorized: กรุณาเข้าสู่ระบบ");
  }
  
  return (session.user as any).id as string;
}

export async function toggleHideListingsAction(hideListings: boolean) {
  try {
    const userId = await requireAuth();

    await prisma.user.update({
      where: { id: userId },
      data: { hideListings },
    });

    // ล้าง Cache เพื่อให้หน้าเว็บแสดงผลค่าใหม่ทันที
    revalidatePath("/owner/profile");
    return { success: true };
  } catch (error) {
    console.error("Error toggling hide listings:", error);
    return { error: "ไม่สามารถอัปเดตการตั้งค่าได้" };
  }
}

// 2. อัปเดตรูปโปรไฟล์ (Avatar)
export async function updateAvatar(formData: FormData) {
  try {
    const userId = await requireAuth();
    const file = formData.get("avatar") as File;

    if (!file) {
      return { error: "ไม่พบไฟล์รูปภาพ" };
    }

    const imageUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=" + userId; // URL จำลอง

    await prisma.user.update({
      where: { id: userId },
      data: { image: imageUrl },
    });

    revalidatePath("/owner/profile");
    return { success: true };
  } catch (error) {
    console.error("Error updating avatar:", error);
    return { error: "อัปเดตรูปโปรไฟล์ไม่สำเร็จ" };
  }
}

// 3. ส่งเอกสารยืนยันตัวตน (KYC)
export async function submitKYCDocument(formData: FormData) {
  try {
    const userId = await requireAuth();
    const document = formData.get("document") as File;

    if (!document || document.size === 0) {
      return { error: "ไม่พบไฟล์เอกสาร" };
    }

    // 1. แปลงไฟล์เป็น Buffer เพื่อเตรียมเซฟ
    const bytes = await document.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uniqueSuffix = Date.now();
    const fileExtension = document.name.split('.').pop();
    const filename = `kyc-${userId}-${uniqueSuffix}.${fileExtension}`;

    const uploadDir = path.join(process.cwd(), "public/uploads/kyc");
    
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // 4. เซฟไฟล์ลงในโฟลเดอร์
    const filepath = path.join(uploadDir, filename);
    await writeFile(filepath, buffer);

    // 5. สร้าง URL สำหรับเข้าถึงไฟล์นี้
    const fileUrl = `/uploads/kyc/${filename}`;

    // 6. 📌 บันทึก URL และเปลี่ยนสถานะลง Database
    await prisma.user.update({
      where: { id: userId },
      data: { 
        kycStatus: "PENDING", 
        kycDocumentUrl: fileUrl, // เก็บ URL ของเอกสารจริงแล้ว!
      },
    });

    revalidatePath("/owner/profile");
    return { success: true };
  } catch (error) {
    console.error("Error submitting KYC:", error);
    return { error: "ส่งเอกสารไม่สำเร็จ หรือไฟล์ขนาดใหญ่เกินไป" };
  }
}

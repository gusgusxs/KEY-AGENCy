"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

// 1. ฟังก์ชันขอรับรหัส OTP
export async function sendOtpAction(phone: string) {
  try {
    // สุ่มรหัส 6 หลัก
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // หมดอายุใน 5 นาที

    // บันทึกลง Database
    await prisma.otpCode.create({
      data: { phone, code: otp, expiresAt }
    });

    // 💡 ตรงนี้คือจุดที่คุณจะเอา API ของผู้ให้บริการ SMS มาใส่ในอนาคต
    // ตอนนี้ให้จำลองการส่งโดยปริ้นท์ลง Terminal ไปก่อน
    console.log(`\n📲 [MOCK SMS] กำลังส่งข้อความไปที่ ${phone}`);
    console.log(`🔑 รหัส OTP ของคุณคือ: ${otp} (หมดอายุใน 5 นาที)\n`);

    return { success: true, message: "ส่งรหัส OTP ไปยังเบอร์โทรศัพท์ของคุณแล้ว" };
  } catch (error) {
    console.error("OTP Send Error:", error);
    return { success: false, error: "ไม่สามารถส่งรหัส OTP ได้" };
  }
}

// 2. ฟังก์ชันตรวจสอบรหัส OTP
export async function verifyOtpAction(phone: string, code: string) {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;
    if (!userId) return { success: false, error: "กรุณาเข้าสู่ระบบ" };

    // ค้นหารหัส OTP ที่ตรงกันและยังไม่หมดอายุ
    const validOtp = await prisma.otpCode.findFirst({
      where: { 
        phone, 
        code, 
        expiresAt: { gt: new Date() } // ต้องยังไม่หมดอายุ
      }
    });

    if (!validOtp) {
      return { success: false, error: "รหัส OTP ไม่ถูกต้องหรือหมดอายุแล้ว" };
    }

    // ถ้ารหัสถูก ให้อัปเดตสถานะ User เป็นยืนยันแล้ว
    await prisma.user.update({
      where: { id: userId },
      data: { phoneVerified: true }
    });

    // ลบรหัส OTP ของเบอร์นี้ทิ้งทั้งหมด (ป้องกันการใช้ซ้ำ)
    await prisma.otpCode.deleteMany({
      where: { phone }
    });

    // รีเฟรชหน้าต่างเพื่อให้ป้ายเปลี่ยนเป็นสีเขียว
    revalidatePath("/owner/profile");

    return { success: true };
  } catch (error) {
    console.error("OTP Verify Error:", error);
    return { success: false, error: "เกิดข้อผิดพลาดในการตรวจสอบรหัส" };
  }
}
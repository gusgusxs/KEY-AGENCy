import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache"; // ✅ 1. Import revalidatePath เข้ามา

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) return NextResponse.redirect(new URL("/login?error=InvalidToken", request.url));

    const verification = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!verification || verification.expiresAt < new Date()) {
      return NextResponse.redirect(new URL("/login?error=TokenExpired", request.url));
    }

    // อัปเดตสถานะ User เป็นยืนยันแล้ว
    await prisma.user.update({
      where: { email: verification.email },
      data: { emailVerified: new Date() },
    });

    // ลบ Token ทิ้ง
    await prisma.verificationToken.delete({
      where: { id: verification.id },
    });

    // ✅ 2. สั่งล้าง Cache ของหน้า Profile เพื่อให้มันดึงข้อมูลใหม่ (สีเขียว) มาโชว์
    revalidatePath("/owner/profile");
    revalidatePath("/owner/dashboard");

    return NextResponse.redirect(new URL("/owner/profile", request.url));
  } catch (error) {
    console.error("Verify Email Error:", error);
    return NextResponse.redirect(new URL("/login?error=ServerError", request.url));
  }
}